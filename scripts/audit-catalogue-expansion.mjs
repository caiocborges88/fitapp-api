import fs from 'node:fs';
import vm from 'node:vm';
import {adaptRoutineToEnvironment,availableInEnvironment} from '../public/js/environment.js';
import {state} from '../public/js/state.js';
import {expansionScenarios} from './expansion-audit-scenarios.mjs';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
const addedIds=new Set([
    'crucifixo-no-solo-com-halteres','crucifixo-invertido-curvado-em-pe-com-halteres',
    'rosca-inversa-com-halteres','remada-bilateral-curvada-com-halteres',
    'panturrilha-em-pe-joelhos-flexionados-com-apoio','rosca-corporal-sentada-resistencia-da-perna'
]);
const before=catalogue.filter(item=>!addedIds.has(item.id));
if(catalogue.length-before.length!==addedIds.size)throw new Error('Cadastros de expansão ausentes ou duplicados.');
const scenarios=[...expansionScenarios,
    {name:'academia',environment:'academia',resources:[]},
    {name:'casa-sem-recursos',environment:'casa',resources:[]},
    {name:'casa-halteres-bancos',environment:'casa',resources:['dumbbells','bench','incline-bench']},
    {name:'parque-sem-recursos',environment:'parque',resources:[]},
    {name:'parque-banco-barras',environment:'parque',resources:['bench','pullup-bar','low-bar']}
];
const summary=[];
for(const scenario of scenarios){
    const totals={scenario:scenario.name,routines:0,compatibleBefore:0,compatibleAfter:0,pendingBefore:0,pendingAfter:0};
    for(const family of ['dbWorkouts','dbWorkoutsFeminino','dbWorkoutsTatico']){
        for(const levels of Object.values(context.window[family]))for(const [level,days]of Object.entries(levels))for(const routine of Object.values(days)){
            const old=adaptRoutineToEnvironment(routine,before,{...scenario,level});
            const current=adaptRoutineToEnvironment(routine,catalogue,{...scenario,level});
            if(current.missing.length>old.missing.length)throw new Error('Regressão de cobertura: '+scenario.name);
            totals.routines++;
            totals.compatibleBefore+=Number(!old.missing.length);totals.compatibleAfter+=Number(!current.missing.length);
            totals.pendingBefore+=old.missing.length;totals.pendingAfter+=current.missing.length;
        }
    }
    summary.push(totals);
}
globalThis.window={dictionaryData:catalogue};
globalThis.document={getElementById:id=>id==='profileSelector'?{value:'hipertrofia'}:null,querySelectorAll:()=>[]};
state.els.levelSelector={value:'iniciante'};
const {executeForgeLogic}=await import('../public/js/forge.js');
const requests=[['abc','push'],['abc','pull'],['abc','legs'],
    ...['peito_triceps','costa_biceps','perna_ombro'].map(day=>['biset_sinergista',day]),
    ['circuito','A']];
function generate(items,method,day,scenario){
    window.dictionaryData=items;
    let routine;
    try{routine=executeForgeLogic(method,day,[],{...scenario,allEquipment:true});}
    catch(error){return {status:'bloqueado',reason:error.message};}
    if(routine.some(block=>block.exercises.some(ex=>{
        const item=items.find(candidate=>candidate.name===ex.name);
        return !availableInEnvironment(item,{...scenario,equipmentPolicy:block.equipmentPolicy})||item.nivel===3;
    })))throw new Error('Gerador retornou movimento incompatível.');
    return {status:'compatível',movements:routine.flatMap(block=>block.exercises).map(ex=>ex.name)};
}
const generators=[];
for(const scenario of scenarios)for(const [method,day]of requests){
    const old=generate(before,method,day,scenario),current=generate(catalogue,method,day,scenario);
    if(old.status==='compatível'&&current.status!=='compatível')throw new Error('Regressão no gerador: '+scenario.name+' '+method+' '+day);
    generators.push({scenario:scenario.name,method,day,before:old,after:current});
}
const report={scope:'Comparação estrutural com e sem os seis registros adicionados, usando as mesmas regras atuais. Fichas prontas: todos os perfis e níveis existentes. Geradores: hipertrofia iniciante. Não valida resistência, prescrição ou equivalência clínica. Não somar posições sobrepostas como treinos diferentes.',catalogueBefore:before.length,catalogueAfter:catalogue.length,addedIds:[...addedIds],summary,generators};
fs.writeFileSync(new URL('../audit/expansion-without-bands-comparison.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.table(summary);
console.table(generators.filter(row=>row.before.status!==row.after.status).map(row=>({scenario:row.scenario,method:row.method,day:row.day,before:row.before.status,after:row.after.status})));
