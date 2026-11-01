// Explicit execution semantics. Absence means legacy/unspecified, never inferred.
export const executionVersion=1;
export function validExecution(value){
    return Boolean(value&&value.version===executionVersion&&typeof value.movementId==='string'&&value.movementId.length<=160&&typeof value.variant==='string'&&value.variant.length<=240
        &&['total','per-side','cycle','duration','duration-side'].includes(value.count)
        &&['dumbbells-total','bar-total','machine','bodyweight'].includes(value.load)
        &&[0,1,2].includes(value.weights)&&Array.isArray(value.resources)&&value.resources.length<=16&&value.resources.every(x=>typeof x==='string'&&x.length<=160)
        &&typeof value.label==='string'&&value.label.length<=160
        &&(value.choices===undefined||(Array.isArray(value.choices)&&value.choices.length<=5&&value.choices.every(x=>typeof x==='string'&&x.length<=80)&&(value.choice===undefined||value.choice===''||value.choices.includes(value.choice)))));
}
export function executionFor(movement){
    if(movement?.selectable===false||!validExecution(movement?.executionProfile))return null;
    const p=structuredClone(movement.executionProfile);if(p.choices)p.choice=p.choices[0];return p;
}
export function executionMetadata(ex){return ex.execution?{execution:structuredClone(ex.execution)}:{};}
export function executionHint(ex){
    const p=ex.execution;if(!validExecution(p))return '';
    const count=p.count==='per-side'?'Repetições por lado · conclua a série após ambos os lados':p.count==='cycle'?'Uma ida e volta completa = 1 repetição':p.count.startsWith('duration')?'Duração real em segundos':'Repetições dos dois lados juntos';
    const load=p.load==='dumbbells-total'?(p.weights===1?'Carga: peso do halter utilizado':'Carga: soma dos dois halteres'):p.load==='bar-total'?'Carga: barra + anilhas':p.load==='machine'?'Carga indicada no equipamento':'Peso corporal · sem equivalência em kg';
    return count+' · '+load+(p.choice?' · '+p.choice:'');
}
export function targetForExecution(target,execution){
    const base=String(target||'').replace(/\s+por\s+(?:lado|braço|perna)s?/gi,'').trim();
    return execution?.count==='per-side'?base+' por lado':execution?.count==='duration-side'?base+' por lado':base;
}
export function withExecution(ex,movement){
    const execution=executionFor(movement);
    if(!execution)throw new Error('Este movimento não está disponível para novas escolhas.');
    const next={...ex,name:movement.name,execution,target:targetForExecution(ex.target,execution)};
    if(execution.count.startsWith('duration')){
        next.measurementType='duration';
        if(execution.count==='duration-side'&&ex.sideMode!=='alternating'){next.sideMode='alternating';next.sets=Number(ex.sets)*2;}
    }
    else {next.measurementType='reps';delete next.sideMode;}
    return next;
}
export function prepareSwap(ex,movement){
    if(ex.setsData?.some(s=>s.checked))throw new Error('Preserve as séries já registradas. Adicione o novo movimento separadamente.');
    const next=withExecution(ex,movement);
    delete next.setsData;delete next._environmentOriginal;delete next.needsReview;delete next.reviewCode;delete next.reviewReason;
    if(/\d\s*kg\b/i.test(next.target)){next.needsReview=true;next.reviewCode='target-review';next.reviewReason='revise a carga escrita na meta após a troca; não há equivalência automática entre exercícios.';}
    return next;
}
export function missingExecutionResources(routine,options={}){
    if(options.environment!=='academia'||!Array.isArray(options.resources))return [];
    return [...new Set(routine.filter(b=>!b.optional||b.enabled).flatMap(b=>b.exercises.flatMap(ex=>validExecution(ex.execution)?ex.execution.resources:[])))].filter(r=>!(options.resources||[]).includes(r));
}
export function referenceKey(ex){
    const p=ex.execution;
    return validExecution(p)?JSON.stringify([p.version,p.movementId,p.variant+(p.choice?'|'+p.choice:''),p.count,p.load,p.weights,ex.measurementType||'reps']):null;
}
export function referenceCompatible(ex,record){return Boolean(referenceKey(ex)&&record.executionKey===referenceKey(ex)&&!record.notes?.includes('Diferença entre os lados:'));}
export function recordUnit(record){
    if(record.measurementType==='duration')return 's';
    try{const p=JSON.parse(record.executionKey);return p[3]==='per-side'?'rep por lado':p[3]==='cycle'?'ciclos':'rep';}catch{return 'rep · contagem anterior não especificada';}
}
export function classificationLabel(item){
    const labels={'flexao-cotovelo':'Flexão de cotovelo','extensao-cotovelo':'Extensão de cotovelo','empurrar-horizontal':'Empurrar horizontal','empurrar-vertical':'Empurrar acima da cabeça','puxar-horizontal':'Puxada horizontal','puxar-vertical':'Puxada vertical','flexao-plantar':'Flexão plantar','anti-extensao':'Estabilização anterior','anti-flexao-lateral':'Estabilização lateral','aducao-horizontal':'Aproximação dos braços','abducao-horizontal':'Abertura dos braços','abducao-horizontal-rotacao-externa':'Abertura dos braços e rotação externa','abducao-ombro':'Elevação lateral','flexao-ombro':'Elevação frontal','aducao-quadril':'Adução de quadril','abducao-quadril':'Abdução de quadril','extensao-quadril':'Extensão de quadril','dobrar-quadril':'Dobrar o quadril','extensao-tronco':'Extensão do tronco','flexao-tronco':'Flexão do tronco','extensao-joelho':'Extensão de joelho','flexao-joelho':'Flexão de joelho','rotacao-tronco':'Rotação do tronco','retroversao-pelvica':'Movimento da pelve','agachar':'Agachar','mergulho':'Mergulho','extensao-ombro':'Extensão do ombro'};
    const c=item?.classification;
    return c?[c.region,labels[c.action]||c.action,c.grip?'Pegada '+c.grip:null].filter(Boolean).join(' · '):item?.subLevel||item?.group||'';
}
// A record's kg/reps only has meaning under its captured convention.
export function recordVolume(record){
    if(!record.executionKey||record.measurementType==='duration'||record.notes?.includes('Diferença entre os lados:'))return null;
    let p;try{p=JSON.parse(record.executionKey);}catch{return null;}
    if(!Array.isArray(p)||p.length!==7||p[0]!==1||!['total','per-side','cycle'].includes(p[3])||p[4]==='bodyweight')return null;
    const factor=p[3]==='per-side'&&(p[4]!=='dumbbells-total'||p[5]===1)?2:1;
    return Math.max(0,Number(record.kg)||0)*Math.max(0,Number(record.reps)||0)*factor;
}
