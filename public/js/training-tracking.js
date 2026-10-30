import {blockEnabled,readJSON,measurementForTarget} from './domain.js';
import {findMovement} from './environment.js';
import {movementEmphases} from './movement-requirements.js';
import {executionMetadata,validExecution} from './execution-contract.js';

export const trackingVersion=2;
export const contextLimit=90000;
const text=(value,max=120)=>String(value||'').slice(0,max);
const positive=value=>Number.isInteger(value)&&value>=1&&value<=10;
const rest=value=>Number.isInteger(value)&&value>=15&&value<=600?value:null;
export function snapshotRoutine(routine,catalogue,overrides={},defaultRest=null){
    return routine.map((block,bi)=>({
        id:String(block.id||`block-${bi}`),title:text(block.title),type:block.type||'traditional',
        optional:block.optional===true,enabled:blockEnabled(block),
        restSeconds:rest(overrides[block.id]??block.restSeconds??defaultRest),
        exercises:block.exercises.map((ex,ei)=>{
            const movement=findMovement(catalogue,ex.name);
            return {...executionMetadata(ex),id:String(ex.id||`${bi}-${ei}`),name:text(ex.name),sets:Number(ex.sets),target:text(ex.target,50),
                measurementType:ex.measurementType||measurementForTarget(ex.target),sideMode:ex.sideMode==='alternating'?'alternating':null,
                group:movement?text(movement.agonist||movement.group):null,
                emphases:movement?movementEmphases(movement).map(value=>text(value)):[]};
        })
    }));
}
const validBlocks=blocks=>Array.isArray(blocks)&&blocks.length<=200&&blocks.every(block=>block&&typeof block.id==='string'&&typeof block.title==='string'&&['traditional','superset','circuit'].includes(block.type)&&typeof block.optional==='boolean'&&typeof block.enabled==='boolean'&&(block.restSeconds===null||rest(block.restSeconds)!==null)&&Array.isArray(block.exercises)&&block.exercises.length<=200&&block.exercises.every(ex=>ex&&typeof ex.id==='string'&&typeof ex.name==='string'&&typeof ex.target==='string'&&positive(ex.sets)&&['reps','duration'].includes(ex.measurementType)&&(ex.sideMode===null||ex.sideMode==='alternating')&&(ex.group===null||typeof ex.group==='string')&&Array.isArray(ex.emphases)&&ex.emphases.every(value=>typeof value==='string')));
export function readTrainingContext(value){
    if(typeof value!=='string'||value.length>contextLimit)return null;
    const context=readJSON(value,null);
    const semantics=blocks=>blocks.every(b=>b.exercises.every(ex=>!ex.execution||validExecution(ex.execution)));
    return [1,trackingVersion].includes(context?.version)&&(context.planned===null||(validBlocks(context.planned)&&semantics(context.planned)))&&validBlocks(context.execution)&&semantics(context.execution)?context:null;
}
export function encodeTrainingContext(planned,routine,catalogue,overrides={},origin=null,defaultRest=null){
    const execution=snapshotRoutine(routine,catalogue,overrides,defaultRest);
    const context={version:trackingVersion,planned,execution,
        origin:origin?{planId:origin.planId?String(origin.planId):null,templateId:origin.templateId?String(origin.templateId):null,revision:Number(origin.revision)||0,day:text(origin.day)||null}:null};
    const encoded=JSON.stringify(context);
    if(!readTrainingContext(encoded))throw new Error('Não foi possível preservar o planejamento desta sessão. Reduza o tamanho da ficha ou revise os parâmetros antes de salvar.');
    return encoded;
}
const entries=blocks=>(blocks||[]).flatMap(block=>block.enabled?block.exercises.map(ex=>({block,ex})):[]);
export function compareSession(log){
    const context=readTrainingContext(log.trainingContext);
    if(!context)return {known:false,rows:[],context:null};
    const planned=entries(context.planned),execution=entries(context.execution);
    const rows=planned.map(({block,ex})=>{
        const current=execution.find(item=>item.ex.id===ex.id);
        const records=(log.data||[]).filter(item=>item.exerciseId===ex.id);
        return {id:ex.id,name:ex.name,performedName:current?.ex.name||ex.name,
            target:current?.ex.target||ex.target,plannedTarget:ex.target,planned:ex.sets,done:records.length,remaining:Math.max(0,ex.sets-records.length),
            optional:block.optional,sideMode:ex.sideMode,blockType:current?.block.type||block.type,
            restSeconds:current?.block.restSeconds??block.restSeconds,
            changed:!current||current.ex.name!==ex.name||JSON.stringify(current.ex.execution)!==JSON.stringify(ex.execution)||current.ex.sets!==ex.sets||current.ex.target!==ex.target||current.ex.measurementType!==ex.measurementType||current.block.type!==block.type||current.block.restSeconds!==block.restSeconds};
    });
    for(const {block,ex} of execution.filter(item=>!planned.some(p=>p.ex.id===item.ex.id))){
        const records=(log.data||[]).filter(item=>item.exerciseId===ex.id);
        if(records.length||context.planned!==null)rows.push({id:ex.id,name:ex.name,performedName:ex.name,planned:null,done:records.length,remaining:null,optional:block.optional,sideMode:ex.sideMode,blockType:block.type,restSeconds:block.restSeconds,changed:true});
    }
    return {known:context.planned!==null,context,rows};
}
export function trackingRecords(history,pending=[],deleted=[]){
    const removed=new Set([...deleted,...pending.filter(item=>item._action==='delete').map(item=>item._id)]),map=new Map();
    for(const item of [...history,...pending]){
        if(item._action==='delete'||removed.has(item._id))continue;
        const key=item._id||JSON.stringify([item.date,item.createdAt,item.tipo,item.data]);
        map.set(key,item);
    }
    return [...map.values()].sort((a,b)=>(a.createdAt||Date.parse(a.date+'T12:00:00'))-(b.createdAt||Date.parse(b.date+'T12:00:00')));
}
export function latestModelPassage(plan,records){
    if(!plan?.id||!['abc_tradicional','abc_sinergista'].includes(plan.method))return null;
    const logs=records.filter(log=>log.campaignId===plan.id&&['A','B','C'].includes(log.tipo));
    if(!logs.length)return {logs:[],startsAtA:false};
    const start=logs.findLastIndex(log=>log.tipo==='A');
    return {logs:start<0?logs:logs.slice(start),startsAtA:start>=0};
}
const dayNumber=date=>{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return null;
    const [y,m,d]=date.split('-').map(Number);return Math.floor(Date.UTC(y,m-1,d)/86400000);
};
export function periodTracking(records,today){
    const end=dayNumber(today),logs=records.filter(log=>{const day=dayNumber(log.date);return day!==null&&day<=end&&day>end-30;});
    const groups=new Map(),unfinished=new Map(),swaps=new Map(),durations=new Map();let known=0,remaining=0,changed=0;
    for(const log of logs){
        const compared=compareSession(log);if(compared.known){known++;remaining+=compared.rows.filter(row=>!row.optional).reduce((sum,row)=>sum+row.remaining,0);}
        if(compared.rows.some(row=>row.changed))changed++;
        for(const row of compared.rows){
            if(!row.optional&&row.remaining>0){const entry=unfinished.get(row.name)||{name:row.name,sessions:0,remaining:0};entry.sessions++;entry.remaining+=row.remaining;unfinished.set(row.name,entry);}
            if(row.performedName!==row.name){const label=`${row.name} → ${row.performedName}`;swaps.set(label,(swaps.get(label)||0)+1);}
        }
        if(Number.isFinite(log.duration_secs)&&log.duration_secs>0){const entry=durations.get(log.tipo)||{day:log.tipo,total:0,sessions:0};entry.total+=log.duration_secs;entry.sessions++;durations.set(log.tipo,entry);}
        for(const record of log.data||[]){
            const ex=entries(compared.context?.execution).find(item=>item.ex.id===record.exerciseId&&item.ex.name===record.exercise)?.ex;
            if(ex?.group)groups.set(ex.group,(groups.get(ex.group)||0)+1);
        }
    }
    return {logs,count:logs.length,partial:logs.filter(log=>log.complete===false).length,known,remaining,changed,groups:[...groups].map(([group,sets])=>({group,sets})),
        unfinished:[...unfinished.values()].sort((a,b)=>b.sessions-a.sessions||b.remaining-a.remaining),
        swaps:[...swaps].map(([label,sessions])=>({label,sessions})),
        durations:[...durations.values()].map(item=>({day:item.day,sessions:item.sessions,meanMinutes:Math.round(item.total/item.sessions/60)}))};
}
export function daysSince(date,today){const from=dayNumber(date),to=dayNumber(today);return from===null||to===null||to<from?null:to-from;}
export function sideLabel(record){
    const side=/^Lado esquerdo\./.test(record.notes||'')?'E':/^Lado direito\./.test(record.notes||'')?'D':null;
    return side?`${side}${Math.ceil(Number(record.set)/2)}`:`S${Number(record.set)||0}`;
}
