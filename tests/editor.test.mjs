import test from 'node:test';
import assert from 'node:assert/strict';
import {routineForTemplate,duplicateTemplate,moveItem} from '../public/js/editor-domain.js';
const routine=[{title:'Bloco',type:'traditional',exercises:[{id:'ex-a',name:'Supino',sets:3,target:'8-12',setsData:[{kg:20,reps:10,checked:true}],needsReview:true},{id:'ex-b',name:'Remada',sets:3,target:'10-12'}]}];
test('ficha e cópia não transportam séries realizadas nem referências mutáveis',()=>{
    const original=JSON.stringify(routine);const clean=routineForTemplate(routine);const copy=duplicateTemplate({id:'a',name:'Minha ficha',routine});
    assert.equal(clean[0].exercises[0].setsData,undefined);assert.equal(clean[0].exercises[0].needsReview,undefined);
    assert.notEqual(copy.id,'a');assert.notEqual(copy.routine[0].exercises[0].id,'ex-a');
    copy.routine[0].exercises[0].sets=8;assert.equal(JSON.stringify(routine),original);
});
test('ordenação preserva elementos e limites sem alterar a origem',()=>{
    const source=['a','b','c'];assert.deepEqual(moveItem(source,1,-1),['b','a','c']);assert.deepEqual(moveItem(source,0,-1),source);
    assert.deepEqual(moveItem(source,2,1),source);assert.deepEqual(source,['a','b','c']);
});
test('editor permite ler legado mas exige pares completos ao salvar',()=>{
    const legacy=[{title:'Par',type:'superset',exercises:[routine[0].exercises[0]]}];
    assert.doesNotThrow(()=>routineForTemplate(legacy));assert.throws(()=>routineForTemplate(legacy,{validatePairs:true}),/exatamente dois/);
    assert.equal(routineForTemplate([...routine,{title:'Vazio',exercises:[]}]).length,1);
});

test('editor não salva um bi-set formado pelo mesmo movimento duas vezes',()=>{
    const repeated=[{type:'superset',exercises:[routine[0].exercises[0],{...routine[0].exercises[0],id:'other'}]}];
    assert.throws(()=>routineForTemplate(repeated,{validatePairs:true}),/movimentos distintos/);
    assert.doesNotThrow(()=>routineForTemplate([{...repeated[0],type:'traditional'}],{validatePairs:true}));
});
