import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {reviewRoutine} from '../public/js/routine-review.js';
import {adaptRoutineToEnvironment,findMovement} from '../public/js/environment.js';
import {proposalSignature} from '../public/js/environment-proposal.js';
const context={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
const routine=(names,extra={})=>[{type:'traditional',...extra,exercises:names.map(name=>({name,sets:3,target:'10 rep'}))}];

test('ficha salva é revisada sem mutação e exclusões posteriores impedem execução, inclusive aliases',()=>{
    const item=catalogue.find(ex=>ex.aliases?.length),source=routine([item.aliases[0]]),snapshot=JSON.stringify(source);
    assert.equal(reviewRoutine(source,catalogue,{environment:'academia'}).length,0);
    for(const excluded of [item.name,item.aliases[0]])assert.equal(reviewRoutine(source,catalogue,{blacklist:[excluded]})[0].code,'excluded-movement');
    assert.equal(JSON.stringify(source),snapshot);
});
test('academia diagnostica cadastro ausente e política corporal sem reconstruir ficha manual',()=>{
    for(const [source,code] of [[routine(['Cadastro removido']),'missing-movement'],[routine(['Supino Reto com Barra'],{equipmentPolicy:'bodyweight'}),'equipment-policy']]){
        const snapshot=JSON.stringify(source),adapted=adaptRoutineToEnvironment(source,catalogue,{environment:'academia'});
        assert.equal(adapted.routine[0].exercises[0].reviewCode,code);
        assert.equal(adapted.missing.length,1);assert.equal(JSON.stringify(source),snapshot);
        assert.ok(reviewRoutine(adapted.routine,catalogue,{environment:'academia'}).length);
    }
    const advanced=catalogue.find(item=>item.nivel===3);
    assert.equal(reviewRoutine(routine([advanced.name]),catalogue,{environment:'academia',level:'iniciante'}).length,0,'edição manual não herda restrição de geração');
});
test('adaptação em casa não escolhe alternativa excluída e devolve original ao retornar',()=>{
    const source=routine(['Supino Reto com Barra']),blacklist=['Flexão de Braço (Padrão)'];
    const result=adaptRoutineToEnvironment(source,catalogue,{environment:'casa',resources:[],blacklist});
    for(const ex of result.routine[0].exercises)if(!ex.needsReview)assert.ok(!blacklist.includes(ex.name));
    const original=adaptRoutineToEnvironment(result.routine,catalogue,{environment:'academia',blacklist:['Supino Reto com Barra']});
    assert.equal(original.routine[0].exercises[0].name,source[0].exercises[0].name);
    assert.equal(reviewRoutine(original.routine,catalogue,{blacklist:['Supino Reto com Barra']})[0].code,'excluded-movement');
});
test('revisão aceita pares manuais livres e detecta duplicatas, inclusive nomes antigos, recursos e séries',()=>{
    const pair=routine(['Supino Reto com Barra','Supino Inclinado com Barra'],{type:'superset'});
    assert.deepEqual(reviewRoutine(pair,catalogue),[]);
    const item=catalogue.find(ex=>ex.aliases?.length);
    assert.equal(reviewRoutine(routine([item.name,item.aliases[0]],{type:'superset'}),catalogue)[0].code,'pair-distinct');
    assert.equal(reviewRoutine(routine(['Supino Reto com Barra'],{type:'superset'}),catalogue)[0].code,'pair-size');
    assert.equal(reviewRoutine(routine(['Barra Fixa Pronada (Pull-up)']),catalogue,{environment:'parque',resources:[]})[0].code,'unavailable');
    const invalid=routine(['Supino Reto com Barra']);invalid[0].exercises[0].sets=0;
    assert.equal(reviewRoutine(invalid,catalogue)[0].code,'sets');
    assert.equal(reviewRoutine([{exercises:[]}],catalogue)[0].code,'empty');
    assert.ok(findMovement(catalogue,item.aliases[0]));
});
test('mudança da lista de exclusões invalida a proposta anterior',()=>{
    const source=routine(['Supino Reto com Barra']),options={environment:'casa',resources:[]};
    assert.notEqual(proposalSignature(source,options),proposalSignature(source,{...options,blacklist:['Flexão de Braço (Padrão)']}));
});
test('retirar uma exclusão resolve o diagnóstico antigo sem exigir regenerar a ficha',()=>{
    const source=routine(['Supino Reto com Barra']);
    const adapted=adaptRoutineToEnvironment(source,catalogue,{environment:'academia',blacklist:['Supino Reto com Barra']});
    assert.equal(reviewRoutine(adapted.routine,catalogue,{blacklist:['Supino Reto com Barra']})[0].code,'excluded-movement');
    assert.deepEqual(reviewRoutine(adapted.routine,catalogue,{blacklist:[]}),[]);
});
