import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {state} from '../public/js/state.js';
import {availableInEnvironment,adaptRoutineToEnvironment} from '../public/js/environment.js';
import {routineForTemplate} from '../public/js/editor-domain.js';
import legacyCalisthenics from './fixtures/legacy-calisthenics.cjs';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=JSON.parse(JSON.stringify(context.window.dictionaryData));
globalThis.window={dictionaryData:catalogue};
let profile='hipertrofia';
globalThis.document={getElementById:id=>id==='profileSelector'?{value:profile}:null,querySelectorAll:()=>[]};
state.els.levelSelector={value:'iniciante'};
const {executeForgeLogic,executeForgePlan}=await import('../public/js/forge.js');
const gym={environment:'academia',allEquipment:true};
const park={environment:'parque',resources:['bench','pullup-bar','low-bar'],allEquipment:true};
const exercises=routine=>routine.flatMap(block=>block.exercises);
const movement=ex=>window.dictionaryData.find(item=>item.name===ex.name);

test('circuito mantém sete estações e abdominal final nos perfis e ambientes',()=>{
    try{
        for(const selectedProfile of ['hipertrofia','definicao','feminino','tatico'])for(const level of ['iniciante','intermediario','avancado']){
            profile=selectedProfile;state.els.levelSelector.value=level;
            for(const options of [gym,park])for(const method of ['circuito']){
                const routine=executeForgeLogic(method,'A',[],options),items=exercises(routine);
                assert.equal(items.length,method==='circuito'?8:6);
                assert.equal(routine.at(-1).title,'Abdominal');
                assert.ok(items.every(ex=>availableInEnvironment(movement(ex),options)));
                if(level==='iniciante')assert.ok(items.every(ex=>movement(ex).nivel!==3));
                if(method==='circuito'){
                    assert.equal(routine[0].type,'circuit');assert.equal(routine[0].exercises.length,7);
                    assert.ok(items.some(ex=>movement(ex).subLevel==='Sistema Anaeróbico'));
                }else assert.ok(items.every(ex=>['Peso Corporal','Calistenia'].includes(movement(ex).equip)));
                const groups=new Set(items.map(ex=>movement(ex).agonist));
                for(const group of ['Peitoral','Costas','Bíceps','Tríceps','Quadríceps','Core'])assert.ok(groups.has(group));
            }
        }
    }finally{profile='hipertrofia';state.els.levelSelector.value='iniciante';}
});

test('estações ausentes bloqueiam o circuito inteiro, incluindo cardio',()=>{
    const previous=window.dictionaryData;
    for(const group of ['Costas','Bíceps','Corpo Todo']){
        window.dictionaryData=catalogue.filter(item=>item.agonist!==group);
        try{assert.throws(()=>executeForgeLogic('circuito','A',[],gym),/Sem movimentos compatíveis/);}
        finally{window.dictionaryData=previous;}
    }
});

test('calistenia retirada não gera novos planos, mas mantém os dias e movimentos salvos',()=>{
    assert.throws(()=>executeForgeLogic('calistenia','A',[],gym),/removido/);
    assert.throws(()=>executeForgePlan('calistenia',[],gym),/removido/);
    const original=legacyCalisthenics(),snapshot=JSON.stringify(original);
    const loaded=executeForgePlan('calistenia',[],gym,original);
    assert.deepEqual(loaded,original);loaded.A[0].exercises[0].sets=8;
    assert.equal(JSON.stringify(original),snapshot);
});

test('movimentos corporais continuam disponíveis em casa conforme o recurso declarado',()=>{
    const options={environment:'casa',resources:['bench','pullup-bar'],level:'iniciante'};
    const original=legacyCalisthenics().A;
    const adapted=adaptRoutineToEnvironment(original,catalogue,options);
    assert.equal(adapted.missing.length,0);
    assert.ok(exercises(adapted.routine).some(ex=>ex.name==='Rosca Corporal Sentada com Resistência da Perna'));
    assert.ok(exercises(adapted.routine).every(ex=>availableInEnvironment(movement(ex),{...options,equipmentPolicy:'bodyweight'})));
    const noBench=adaptRoutineToEnvironment(original,catalogue,{...options,resources:['pullup-bar']});
    assert.ok(noBench.missing.length>0);
});

test('circuito sem recursos não retorna versão silenciosamente incompleta',()=>{
    for(const environment of ['casa','parque'])for(const method of ['circuito'])assert.throws(()=>executeForgeLogic(method,'A',[],{environment,resources:[],allEquipment:true}),/Sem movimentos compatíveis/);
});

test('atalho de casa gera somente movimentos sem recursos e respeita exclusões e complexidade',()=>{
    const options={environment:'casa',resources:[],allEquipment:true};
    for(const level of ['iniciante','intermediario','avancado']){
        state.els.levelSelector.value=level;
        const routine=executeForgeLogic('casa','A',[],options);
        assert.equal(exercises(routine).length,5);
        assert.equal(routine[0].type,'circuit');assert.equal(routine.at(-1).title,'Abdominal');
        assert.ok(exercises(routine).every(ex=>movement(ex).equip==='Peso Corporal'&&availableInEnvironment(movement(ex),options)));
        assert.ok(exercises(routine).filter(ex=>movement(ex).agonist==='Quadríceps').every(ex=>movement(ex).muscleFocus.includes('quadriceps-vastos')));
        if(level==='iniciante')assert.ok(exercises(routine).every(ex=>movement(ex).nivel!==3));
    }
    state.els.levelSelector.value='iniciante';
    const avoided=catalogue.filter(item=>item.agonist==='Peitoral').map(item=>item.name);
    assert.throws(()=>executeForgeLogic('casa','A',avoided,options),/Peitoral/);
    const withResources=executeForgeLogic('casa','A',[],{environment:'academia',resources:['bench','pullup-bar','low-bar','dumbbells'],allEquipment:true});
    assert.ok(exercises(withResources).every(ex=>availableInEnvironment(movement(ex),options)));
});

test('restrição corporal acompanha a ficha salva e impede adaptação para halteres',()=>{
    const original=executeForgePlan('calistenia',[],gym,legacyCalisthenics()).A;
    const saved=routineForTemplate(original,{validatePairs:true});
    assert.ok(saved.every(block=>block.equipmentPolicy==='bodyweight'));
    const adapted=adaptRoutineToEnvironment(saved,catalogue,{environment:'casa',resources:['dumbbells','bench','pullup-bar'],level:'iniciante'});
    const biceps=exercises(adapted.routine).find(ex=>ex._environmentOriginal?.name==='Rosca Corporal em Barra Baixa');
    assert.equal(biceps.needsReview,undefined);
    assert.equal(biceps.name,'Rosca Corporal Sentada com Resistência da Perna');
    const withoutBench=adaptRoutineToEnvironment(saved,catalogue,{environment:'casa',resources:['dumbbells','pullup-bar'],level:'iniciante'});
    assert.equal(exercises(withoutBench.routine).find(ex=>ex._environmentOriginal?.name==='Rosca Corporal em Barra Baixa').needsReview,true);
    assert.equal(availableInEnvironment(catalogue.find(item=>item.name==='Rosca Direta com Barra'),{environment:'academia',equipmentPolicy:'bodyweight'}),false);
    const invalid=[{type:'traditional',equipmentPolicy:'bodyweight',exercises:[{name:'Rosca Alternada com Halteres',sets:3,target:'10 rep'}]}];
    assert.throws(()=>routineForTemplate(invalid,{validatePairs:true}),/somente peso corporal/);
});
