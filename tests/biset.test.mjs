import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {state} from '../public/js/state.js';
import {availableInEnvironment} from '../public/js/environment.js';
import {routineForTemplate} from '../public/js/editor-domain.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=JSON.parse(JSON.stringify(context.window.dictionaryData));
globalThis.window={dictionaryData:catalogue};
let profile='hipertrofia';
globalThis.document={getElementById:id=>id==='profileSelector'?{value:profile}:null,querySelectorAll:()=>[]};
state.els.levelSelector={value:'iniciante'};
const {executeForgeLogic,executeForgePlan}=await import('../public/js/forge.js');
const gym={environment:'academia',allEquipment:true};
const home={environment:'casa',resources:['dumbbells','bench','incline-bench','pullup-bar'],allEquipment:true};
const divisions={biset_sinergista:['peito_triceps','costa_biceps','perna_ombro']};
const movement=ex=>window.dictionaryData.find(item=>item.name===ex.name);
const pairs=routine=>routine.filter(block=>block.type==='superset');

test('todas as modalidades mantêm pares completos e distintos em academia para os níveis e perfis',()=>{
    try{
        for(const selectedProfile of ['hipertrofia','definicao','feminino','tatico'])for(const level of ['iniciante','intermediario','avancado']){
            profile=selectedProfile;state.els.levelSelector.value=level;
            for(const [method,days]of Object.entries(divisions))for(const day of days){
                const routine=executeForgeLogic(method,day,[],gym),blocks=pairs(routine);
                assert.equal(blocks.length,4,method+' '+day+' '+selectedProfile+' '+level);
                for(const block of blocks){
                    assert.equal(block.exercises.length,2);
                    assert.notEqual(block.exercises[0].name,block.exercises[1].name);
                    if(level==='iniciante')assert.ok(block.exercises.every(ex=>movement(ex).nivel!==3));
                    assert.ok(block.exercises.every(ex=>!['Core','Panturrilhas'].includes(movement(ex).agonist)));
                }
                assert.equal(routine.at(-1).title,'Abdominal');
                assert.ok(routine.filter(block=>block.type!=='superset').every(block=>block.exercises.every(ex=>['Core','Corpo Todo'].includes(movement(ex).agonist))));
            }
        }
    }finally{profile='hipertrofia';state.els.levelSelector.value='iniciante';}
});

test('sinergista respeita peito/tríceps, costas/bíceps e pernas/ombros em todos os pares',()=>{
    for(const [day,expected]of [['peito_triceps',['Peitoral','Tríceps']],['costa_biceps',['Costas','Bíceps']]]){
        for(const block of pairs(executeForgeLogic('biset_sinergista',day,[],gym)))assert.deepEqual(block.exercises.map(ex=>movement(ex).agonist),expected);
    }
    for(const block of pairs(executeForgeLogic('biset_sinergista','perna_ombro',[],gym))){
        assert.ok(['Quadríceps','Isquiotibiais','Glúteos'].includes(movement(block.exercises[0]).agonist));
        assert.equal(movement(block.exercises[1]).agonist,'Ombros');
    }
});

test('falta de um lado bloqueia o dia em vez de omitir par ou introduzir core/panturrilha',()=>{
    const previous=window.dictionaryData;
    window.dictionaryData=catalogue.filter(item=>item.agonist!=='Tríceps');
    try{
        for(const [method,day]of [['biset_sinergista','peito_triceps']])assert.throws(()=>executeForgeLogic(method,day,[],gym),/Par .*Tríceps/);
    }finally{window.dictionaryData=previous;}
});

test('em casa pares de costas/bíceps são completos e dependem da barra quando há puxada vertical',()=>{
    const routine=executeForgeLogic('biset_sinergista','costa_biceps',[],home);
    assert.equal(pairs(routine).length,4);
    assert.ok(routine.flatMap(block=>block.exercises).every(ex=>availableInEnvironment(movement(ex),home)));
    assert.throws(()=>executeForgeLogic('biset_sinergista','costa_biceps',[],{...home,resources:['dumbbells','bench']}),/Latíssimo do Dorso/);
    for(const environment of ['casa','parque'])for(const [method,days]of Object.entries(divisions))for(const day of days){
        const options={environment,resources:[],allEquipment:true};
        assert.throws(()=>executeForgeLogic(method,day,[],options),/Sem movimentos compatíveis/);
    }
});

test('ciclo incompleto não retorna plano e exclusões continuam valendo na reutilização entre pares',()=>{
    assert.throws(()=>executeForgePlan('biset_sinergista',[],home),/Reto Femoral/);
    const inverse=catalogue.filter(item=>item.muscleFocus.includes('braquial-antebraco')).map(item=>item.name);
    assert.throws(()=>executeForgeLogic('biset_sinergista','costa_biceps',inverse,home),/Braquial/);
    assert.throws(()=>executeForgeLogic('biset_sinergista','divisao_inexistente',[],gym),/divisão válida/);
});

test('bi-sets usam códigos musculares mesmo com rótulos visuais renomeados',()=>{
    const previous=window.dictionaryData;
    window.dictionaryData=catalogue.map(item=>({...item,subLevel:'Rótulo revisado'}));
    try{for(const [method,days]of Object.entries(divisions))for(const day of days)assert.equal(pairs(executeForgeLogic(method,day,[],gym)).length,4);}
    finally{window.dictionaryData=previous;}
});

test('modelos retirados não geram planos, mas fichas antigas são preservadas sem completar ou converter pares',()=>{
    for(const method of ['biset_agonista','biset_antagonista']){
        assert.throws(()=>executeForgeLogic(method,'A',[],gym),/removido/);
        assert.throws(()=>executeForgePlan(method,[],gym),/removido/);
        const saved={A:[{type:'superset',title:'Meu par antigo',exercises:[{name:'Supino Reto com Barra',sets:3,target:'10 rep'},{name:'Remada Curvada com Barra',sets:4,target:'8 rep'}]}]};
        const snapshot=JSON.stringify(saved);
        const loaded=executeForgePlan(method,[],gym,saved);
        assert.deepEqual(loaded,saved);assert.deepEqual(Object.keys(loaded),['A']);
        loaded.A[0].exercises[0].sets=8;
        assert.equal(JSON.stringify(saved),snapshot);
    }
});

test('edição manual aceita pares do mesmo grupo, opostos ou livres sem impor o modelo complementar',()=>{
    for(const names of [
        ['Supino Reto com Barra','Crucifixo Reto com Halteres'],
        ['Supino Reto com Barra','Remada Curvada com Barra'],
        ['Rosca Direta com Barra','Agachamento com peso corporal']
    ]){
        const routine=[{type:'superset',exercises:names.map(name=>({name,sets:3,target:'10 rep'}))}];
        const saved=routineForTemplate(routine,{validatePairs:true});
        assert.deepEqual(saved[0].exercises.map(ex=>ex.name),names);
    }
});
