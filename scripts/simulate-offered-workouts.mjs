import fs from 'node:fs';
import vm from 'node:vm';
import {state} from '../public/js/state.js';
import {availableInEnvironment,adaptRoutineToEnvironment} from '../public/js/environment.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=JSON.parse(JSON.stringify(context.window.dictionaryData));
const methods=['abc','ppl','abcd','biset_sinergista','circuito','casa'];
const scenarios=[
    ['academia','academia',[]],['casa-vazia','casa',[]],['casa-halteres','casa',['dumbbells']],
    ['casa-banco','casa',['bench']],['casa-halteres-bancos','casa',['dumbbells','bench','incline-bench']],
    ['casa-banco-barras','casa',['bench','pullup-bar','low-bar']],
    ['casa-completa','casa',['dumbbells','bench','incline-bench','pullup-bar','low-bar','balance-support']],
    ['casa-apoio','casa',['balance-support']],['parque-vazio','parque',[]],['parque-banco','parque',['bench']],
    ['parque-barra-alta','parque',['pullup-bar']],['parque-barra-baixa','parque',['low-bar']],
    ['parque-banco-barra-alta','parque',['bench','pullup-bar']],
    ['parque-completo','parque',['bench','pullup-bar','low-bar','balance-support']],['parque-apoio','parque',['balance-support']]
].map(([name,environment,resources])=>({name,environment,resources}));
const arsenals={todos:['Pesos_Livres','Maquinas_Polias','Barras_Anilhas','Peso_Corporal','Calistenia'],halteres:['Pesos_Livres'],corporal:['Peso_Corporal','Calistenia']};
const exclusions={nenhuma:[],extensora:['Cadeira Extensora'],biceps:catalogue.filter(x=>x.agonist==='Bíceps').map(x=>x.name),core:catalogue.filter(x=>x.agonist==='Core').map(x=>x.name),remadas:catalogue.filter(x=>x.movementPattern==='puxar-horizontal').map(x=>x.name)};
let profile='hipertrofia',tags=arsenals.todos,seed=1;
globalThis.window={dictionaryData:catalogue};
globalThis.document={getElementById:id=>id==='profileSelector'?{value:profile}:null,querySelectorAll:()=>tags.map(tag=>({getAttribute:()=>tag}))};
state.els.levelSelector={value:'iniciante'};
const {executeForgePlan,executeForgeLogic}=await import('../public/js/forge.js');
const realRandom=Math.random,realTimeout=globalThis.setTimeout;
Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
globalThis.setTimeout=()=>0; // Discard UI rest callbacks in this isolated simulation process.
const summary=new Map(),violations=new Map(),blindSpots=new Map();
let attempts=0,succeeded=0,blocked=0,routines=0;
function record(map,key,sample){const current=map.get(key)||{type:key,count:0,sample};current.count++;map.set(key,current);}
try{
for(profile of ['hipertrofia','definicao','feminino','tatico'])for(const level of ['iniciante','intermediario','avancado']){
state.els.levelSelector.value=level;
for(const method of methods)for(const scenario of scenarios)for(const [arsenal,selectedTags]of Object.entries(arsenals))for(const [exclusion,avoided]of Object.entries(exclusions)){
    tags=selectedTags;
    const row={profile,level,method,scenario:scenario.name,arsenal,exclusion,attempts:0,succeeded:0,blocked:0,reasons:[],seeds:[]};
    for(const initialSeed of [1,17,314159]){
        seed=initialSeed;attempts++;row.attempts++;
        const options={environment:scenario.environment,resources:scenario.resources};
        const sample={profile,level,method,scenario:scenario.name,arsenal,exclusion,seed:initialSeed};
        let plan;
        try{plan=method==='casa'?{A:executeForgeLogic(method,'A',avoided,options)}:executeForgePlan(method,avoided,options);}
        catch(error){blocked++;row.blocked++;if(!row.reasons.includes(error.message))row.reasons.push(error.message);continue;}
        succeeded++;row.succeeded++;row.seeds.push(initialSeed);
        for(const [day,routine]of Object.entries(plan)){
            routines++;
            const items=routine.flatMap(block=>block.exercises),names=items.map(ex=>ex.name);
            const movements=names.map(name=>catalogue.find(item=>item.name===name));
            const details={...sample,day,names};
            if(!items.length)record(violations,'empty-routine',details);
            if(items.some((ex,i)=>!movements[i]||!availableInEnvironment(movements[i],{...options,equipmentPolicy:routine.find(block=>block.exercises.includes(ex))?.equipmentPolicy})))record(violations,'environment-or-policy',details);
            if(level==='iniciante'&&movements.some(ex=>ex?.nivel===3))record(violations,'advanced-for-beginner',details);
            if(names.some(name=>avoided.includes(name)))record(violations,'excluded-movement',details);
            if(routine.some(block=>block.type==='superset'&&(block.exercises.length!==2||new Set(block.exercises.map(ex=>ex.name)).size!==2)))record(violations,'invalid-pair',details);
            if(routine.at(-1)?.title!=='Abdominal'||routine.at(-1).exercises.some(ex=>catalogue.find(item=>item.name===ex.name)?.agonist!=='Core'))record(violations,'invalid-core-finisher',details);
            if(new Set(names).size<names.length)record(blindSpots,'repeated-movement-within-day',details);
            if(arsenal==='halteres'&&movements.some(ex=>ex?.equip==='Peso Corporal'&&ex.resources.some(resource=>['pullup-bar','low-bar'].includes(resource))))record(blindSpots,'bar-used-with-only-dumbbell-chip',details);
            if(method==='abcd'||(['abc','ppl'].includes(method)&&profile==='feminino')){
                const back=movements.filter(ex=>ex.agonist==='Costas');
                if(back.length>=2&&!back.some(ex=>ex.movementPattern==='puxar-vertical'))record(blindSpots,'broad-back-slots-without-vertical-pull',details);
                const hamstrings=movements.filter(ex=>ex.agonist==='Isquiotibiais');
                if(hamstrings.length>=2&&!hamstrings.some(ex=>ex.movementPattern==='flexao-joelho'))record(blindSpots,'broad-hamstring-slots-without-knee-flexion',details);
                const quads=movements.filter(ex=>ex.agonist==='Quadríceps');
                if(quads.length>=2&&!quads.some(ex=>ex.movementPattern==='extensao-joelho'))record(blindSpots,'broad-quad-slots-without-knee-extension',details);
            }
        }
    }
    summary.set([profile,level,method,scenario.name,arsenal,exclusion].join('|'),row);
}
}
}finally{Math.random=realRandom;globalThis.setTimeout=realTimeout;}
const probes=[];
function probe(name,run){try{probes.push({name,result:run()});}catch(error){probes.push({name,error:error.message});}}
state.els.levelSelector.value='iniciante';profile='hipertrofia';tags=arsenals.todos;
probe('saved-plan-reuse-ignores-new-exclusions',()=>{
    const old=executeForgePlan('abc',[],{environment:'academia',allEquipment:true});
    const result=executeForgePlan('abc',['Cadeira Extensora'],{environment:'academia',allEquipment:true},old);
    return {excludedStillPresent:result.C.flatMap(b=>b.exercises).some(ex=>ex.name==='Cadeira Extensora'),sameReference:result.C===old.C};
});
probe('saved-core-title-is-not-core-validation',()=>{
    const routine=[{title:'Abdominal',type:'traditional',exercises:[{name:'Cadeira Extensora',sets:3,target:'12 rep'}]}];
    const result=executeForgePlan('abc',[],{environment:'academia',allEquipment:true},{A:routine,B:routine,C:routine});
    return {daysWithoutCore:Object.entries(result).filter(([,blocks])=>!blocks.flatMap(b=>b.exercises).some(ex=>catalogue.find(x=>x.name===ex.name)?.agonist==='Core')).map(([day])=>day)};
});
probe('gym-adaptation-bypasses-bodyweight-and-beginner',()=>{
    const source=[{type:'traditional',equipmentPolicy:'bodyweight',exercises:[{name:'Supino Reto com Barra',sets:3,target:'10 rep'},{name:'Barra Fixa Pronada (Pull-up)',sets:3,target:'8 rep'}]}];
    const result=adaptRoutineToEnvironment(source,catalogue,{environment:'academia',resources:[],level:'iniciante'});
    return {missing:result.missing,flags:result.routine[0].exercises.map(ex=>({name:ex.name,needsReview:ex.needsReview||false})),policyActuallySatisfied:availableInEnvironment(catalogue.find(x=>x.name==='Supino Reto com Barra'),{environment:'academia',equipmentPolicy:'bodyweight'})};
});
probe('same-focus-with-different-target-unit',()=>{
    const source=[{exercises:[{name:'Panturrilha Sentado (Máquina)',sets:3,target:'Máximo de repetições com 50 kg'}]}];
    return adaptRoutineToEnvironment(source,catalogue,{environment:'parque',resources:['balance-support'],level:'iniciante'}).routine[0].exercises[0];
});
const report={scope:'Simulação estrutural determinística do código local, sem provedor, dados pessoais ou alteração funcional. Bloqueio por recurso/exclusão não é automaticamente defeito. Contagens de alertas podem sobrepor. Pontos de cobertura ampla são premissas para revisão, não conclusão clínica.',catalogueSize:catalogue.length,attempts,succeeded,blocked,routines,configurations:summary.size,seeds:[1,17,314159],violations:[...violations.values()],blindSpots:[...blindSpots.values()],seedSensitiveCases:[...summary.values()].filter(row=>row.succeeded&&row.blocked),baseline:[...summary.values()].filter(row=>row.arsenal==='todos'&&row.exclusion==='nenhuma'),probes};
fs.writeFileSync(new URL('../audit/offered-workouts-simulation.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,baseline:undefined,probes:undefined,blindSpots:report.blindSpots.map(({type,count})=>({type,count}))},null,2));
console.log(JSON.stringify(probes,null,2));
