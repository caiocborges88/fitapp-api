import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {commitWorkoutPlan} from '../public/js/campaign-store.js';
import {measurementForTarget,newExerciseSet,normalizeRoutine,completedSets} from '../public/js/domain.js';
import {routineForTemplate} from '../public/js/editor-domain.js';
import {state} from '../public/js/state.js';
import {adaptRoutineToEnvironment} from '../public/js/environment.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
let profile='hipertrofia',tags=['Pesos_Livres','Maquinas_Polias','Barras_Anilhas','Peso_Corporal','Calistenia'];
globalThis.window={dictionaryData:catalogue};
globalThis.document={getElementById:id=>id==='profileSelector'?{value:profile}:null,querySelectorAll:()=>tags.map(tag=>({getAttribute:()=>tag}))};
state.els.levelSelector={value:'iniciante'};
const {executeForgeLogic,executeForgePlan}=await import('../public/js/forge.js');
function storage(){
    const data=new Map(),events=[];let failKey=null;
    const localStorage={getItem:key=>data.get(key)??null,setItem:(key,value)=>{if(key===failKey){failKey=null;throw Error('QuotaExceededError');}data.set(key,String(value));},removeItem:key=>data.delete(key)};
    const scope={window:{dispatchEvent:event=>events.push(event)},localStorage,CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail;}}};
    vm.runInNewContext(fs.readFileSync(new URL('../public/js/storage.js',import.meta.url),'utf8'),scope);
    return {store:scope.window.FitStore,data,events,fail:key=>{failKey='fitapp:user:signed-out:'+key;}};
}
test('gravação de plano preserva dados e contador se preferências ou plano falharem',()=>{
    for(const key of ['fitapp_level','fitapp_campaign_data']){
        const s=storage();
        const old={id:'old',method:'abc',profile:'hipertrofia',level:'iniciante',workouts:{A:[]}};
        commitWorkoutPlan(s.store,old);s.store.set('fitapp_campaign_count','5');
        const snapshot=[...s.data];s.events.length=0;s.fail(key);
        assert.throws(()=>commitWorkoutPlan(s.store,{...old,id:'new',method:'abcd',level:'intermediario'},{resetCount:true}),/Quota/);
        assert.deepEqual([...s.data],snapshot);assert.equal(s.events.length,0);
    }
});
test('gravação concluída atualiza plano e preferências e emite apenas um evento consistente',()=>{
    const s=storage();s.store.set('fitapp_campaign_count','5');s.events.length=0;
    const next={id:'new',method:'abc',profile:'hipertrofia',level:'iniciante',workouts:{A:[]}};
    commitWorkoutPlan(s.store,next,{resetCount:true});
    assert.equal(s.store.get('fitapp_campaign_count'),'0');assert.deepEqual(JSON.parse(s.store.get('fitapp_campaign_data')),next);
    assert.equal(s.events.length,1);assert.equal(s.events[0].detail.keys.at(-1),'fitapp_campaign_data');
});
test('unidade de séries por tempo é preservada no cadastro, na sessão e no registro',()=>{
    for(const target of ['20-30 seg','45 segundos','1 min','1,5 minutos','30 s','30seg','1min','30s']){
        assert.equal(measurementForTarget(target),'duration');
        const saved=routineForTemplate([{exercises:[{name:'Prancha Isométrica Frontal',sets:1,target}]}]);
        const exercise=saved[0].exercises[0];assert.equal(exercise.measurementType,'duration');
        const set={...newExerciseSet(exercise),durationSecs:'25',checked:true};
        const log=completedSets([{exercises:[{...exercise,setsData:[set]}]}]);
        assert.equal(log[0].durationSecs,25);assert.equal(log[0].reps,0);
    }
    for(const target of ['10-12 rep','12 rep/lado','Até Falha'])assert.equal(measurementForTarget(target),'reps');
    const explicit=normalizeRoutine([{exercises:[{name:'Prancha',sets:1,target:'30 seg',measurementType:'reps'}]}]);
    assert.equal(explicit[0].exercises[0].measurementType,'reps');
});
test('troca de equipamento não apresenta carga textual antiga como meta já validada',()=>{
    const source=[{type:'traditional',exercises:[{name:'Panturrilha Sentado (Máquina)',sets:3,target:'Máximo de repetições com 50 kg'}]}];
    const adapted=adaptRoutineToEnvironment(source,catalogue,{environment:'casa',resources:['balance-support'],level:'iniciante'});
    assert.equal(adapted.routine[0].exercises[0].reviewCode,'target-review');
    assert.equal(adapted.routine[0].exercises[0].needsReview,true);
    const restored=adaptRoutineToEnvironment(adapted.routine,catalogue,{environment:'academia'});
    assert.equal(restored.routine[0].exercises[0].name,source[0].exercises[0].name);
    assert.equal(restored.routine[0].exercises[0].target,source[0].exercises[0].target);
    assert.equal(restored.routine[0].exercises[0].needsReview,undefined);
});
test('chips de recursos bloqueiam barras fixas e não são contornados por Peso Corporal',()=>{
    tags=['Pesos_Livres','Maquinas_Polias','Barras_Anilhas','Peso_Corporal'];
    try{
        for(let index=0;index<8;index++){
            const plan=executeForgePlan('abc',[],{environment:'academia'});
            for(const ex of Object.values(plan).flatMap(blocks=>blocks.flatMap(block=>block.exercises))){
                const movement=catalogue.find(item=>item.name===ex.name);
                assert.ok(!movement.resources.some(resource=>['pullup-bar','low-bar'].includes(resource)));
            }
        }
        assert.throws(()=>executeForgeLogic('circuito','A',[],{environment:'casa',resources:['bench','pullup-bar']}),/Latíssimo/);
    }finally{tags=['Pesos_Livres','Maquinas_Polias','Barras_Anilhas','Peso_Corporal','Calistenia'];}
});
test('ABCD e inferiores mantêm funções distintas dos posteriores e das costas em sorteios repetidos',()=>{
    for(const selectedProfile of ['hipertrofia','feminino']){
        profile=selectedProfile;
        for(let seed=0;seed<30;seed++){
            const plan=executeForgePlan('abcd',[],{environment:'academia',allEquipment:true});
            const hamstrings=Object.values(plan).flatMap(blocks=>blocks.flatMap(block=>block.exercises)).map(ex=>catalogue.find(item=>item.name===ex.name)).filter(item=>item.agonist==='Isquiotibiais');
            assert.ok(hamstrings.some(ex=>ex.movementPattern==='flexao-joelho'));
            assert.ok(hamstrings.some(ex=>['extensao-quadril','dobrar-quadril'].includes(ex.movementPattern)));
            if(profile==='hipertrofia'){
                const back=plan.C.flatMap(block=>block.exercises).map(ex=>catalogue.find(item=>item.name===ex.name)).filter(item=>item.agonist==='Costas');
                assert.ok(back.some(ex=>ex.movementPattern==='puxar-vertical'));
                assert.ok(back.some(ex=>ex.movementPattern==='puxar-horizontal'));
            }
        }
        if(profile==='feminino'){
            const day=executeForgeLogic('abc','push',[],{environment:'academia',allEquipment:true});
            assert.ok(day.flatMap(block=>block.exercises).some(ex=>catalogue.find(item=>item.name===ex.name).movementPattern==='flexao-joelho'));
        }
    }
    profile='hipertrofia';
    assert.throws(()=>executeForgeLogic('abcd','B',[],{environment:'casa',resources:['dumbbells'],allEquipment:true}),/Reto Femoral/);
});
