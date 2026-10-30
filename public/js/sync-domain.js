import {readJSON} from './domain.js';
export const emptyCampaign=()=>({campaign_data:'',campaign_count:'0',blacklist:'[]',main_method:'abc_tradicional',profile:'hipertrofia',level:'padrao',custom_workouts:'[]',deleted_templates:'[]',updatedAt:0});
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const hash=value=>{let n=2166136261;for(const c of JSON.stringify(value)){n^=c.charCodeAt(0);n=Math.imul(n,16777619);}return(n>>>0).toString(16);};
const bundleKeys=['campaign_data','blacklist','main_method','profile','level'];
const bundle=p=>Object.fromEntries(bundleKeys.map(k=>[k,p[k]]));
export function mergeCampaign(baseInput,localInput,remoteInput){
    const base={...emptyCampaign(),...baseInput},local={...emptyCampaign(),...localInput},remote={...emptyCampaign(),...remoteInput};
    const result={...remote},conflicts=[];
    const maps=[base,local,remote].map(p=>new Map(readJSON(p.custom_workouts,[]).map(t=>[String(t.id),t])));
    const [b,l,r]=maps;
    const deleted=new Set([...readJSON(local.deleted_templates,[]),...readJSON(remote.deleted_templates,[])]);
    for(const id of b.keys())if(!l.has(id)||!r.has(id))deleted.add(id);
    const merged=new Map();
    const copy=(id,record)=>{
        const copyId=`conflict-${id.slice(0,70)}-${hash(record)}`;
        merged.set(copyId,{...record,id:copyId,name:(record.name.slice(0,95)+' (cópia de conflito)').slice(0,120),routine:record.routine.map((block,bi)=>({...block,exercises:block.exercises.map((ex,ei)=>({...ex,id:`${copyId}-${bi}-${ei}`}))}))});
    };
    for(const id of new Set([...r.keys(),...l.keys(),...b.keys()])){
        const bv=b.get(id),lv=l.get(id),rv=r.get(id);
        if(deleted.has(id)){
            if(bv&&lv&&!equal(lv,bv))copy(id,lv);
            if(bv&&rv&&!equal(rv,bv))copy(id,rv);
            continue;
        }
        if(equal(lv,bv)){if(rv)merged.set(id,rv);}
        else if(equal(rv,bv)||equal(lv,rv)){if(lv)merged.set(id,lv);}
        else {if(rv)merged.set(id,rv);if(lv)copy(id,lv);}
    }
    // A ordem da nuvem prevalece se os dois dispositivos a modificarem.
    const orderChanged=!equal([...l.keys()],[...b.keys()]);
    const remoteOrderChanged=!equal([...r.keys()],[...b.keys()]);
    const order=orderChanged&&!remoteOrderChanged?[...l.keys()]:[...r.keys()];
    result.custom_workouts=JSON.stringify([...new Set([...order,...merged.keys()])].filter(id=>merged.has(id)).map(id=>merged.get(id)));
    result.deleted_templates=JSON.stringify([...deleted]);
    const bb=bundle(base),lb=bundle(local),rb=bundle(remote);
    if(equal(lb,bb)||equal(lb,rb))Object.assign(result,rb);
    else if(equal(rb,bb))Object.assign(result,lb);
    else conflicts.push({id:'plan-'+hash(lb),kind:'plan',local:{...lb,campaign_count:local.campaign_count},remote:{...rb,campaign_count:remote.campaign_count},createdAt:Date.now()});
    const planId=p=>readJSON(p.campaign_data,null)?.id;
    if(planId(base)===planId(local)&&planId(base)===planId(remote))result.campaign_count=String(Math.max(0,(Number(remote.campaign_count)||0)+(Number(local.campaign_count)||0)-(Number(base.campaign_count)||0)));
    else result.campaign_count=equal(bundle(result),lb)?local.campaign_count:remote.campaign_count;
    result.updatedAt=Date.now();
    return {payload:result,conflicts};
}
