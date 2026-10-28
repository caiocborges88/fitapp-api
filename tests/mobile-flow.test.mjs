import test from 'node:test';
import assert from 'node:assert/strict';
import {draftSourceChanged,validDraft} from '../public/js/draft-domain.js';
import {equipmentForEnvironment} from '../public/js/equipment-settings.js';
import {availableInEnvironment} from '../public/js/environment.js';

const draft=()=>({version:1,userId:'one',id:'draft-one',updatedAt:1,type:'Livre',name:'',context:{kind:'new'},routine:[{title:'Minha ficha',type:'traditional',exercises:[]}]});
test('rascunho permite montagem incompleta, mas rejeita conta ou versão diferentes e estruturas inválidas',()=>{
    assert.equal(validDraft(draft(),'one'),true);
    assert.equal(validDraft(draft(),'two'),false);
    assert.equal(validDraft({...draft(),version:2},'one'),false);
    assert.equal(validDraft({...draft(),routine:[{title:'X',exercises:[{name:'X',sets:3}]}]},'one'),false);
    assert.equal(validDraft({...draft(),id:'../other'},'one'),false);
    assert.equal(validDraft({...draft(),coverage:[{}]},'one'),false);
    assert.equal(validDraft({...draft(),proposal:{status:'accepted'}},'one'),false);
    assert.equal(validDraft({...draft(),context:{kind:'cycle',method:'abc',days:['A','B','C']}},'one'),true);
    assert.equal(validDraft({...draft(),context:{kind:'cycle',method:'retired',days:['A']}},'one'),false);
});
test('rascunhos detectam revisão da ficha ou substituição do plano antes de gravar sobre a origem',()=>{
    const template={...draft(),context:{kind:'template',id:'x',revision:2}};
    assert.equal(draftSourceChanged(template,null,[{id:'x',revision:2}]),false);
    assert.equal(draftSourceChanged(template,null,[{id:'x',revision:3}]),true);
    assert.equal(draftSourceChanged(template,null,[]),true);
    const cycle={...draft(),context:{kind:'cycle',planId:'p',revision:1}};
    assert.equal(draftSourceChanged(cycle,{id:'p',revision:1},[]),false);
    assert.equal(draftSourceChanged(cycle,{id:'other',revision:1},[]),true);
});
test('equipamentos são independentes por ambiente e academia respeita escolhas também na revisão',()=>{
    const store={get:()=>JSON.stringify(['Pesos_Livres','Peso_Corporal'])};
    assert.deepEqual(equipmentForEnvironment(store,'academia'),['Pesos_Livres','Peso_Corporal']);
    assert.deepEqual(equipmentForEnvironment(store,'casa',[]),['Peso_Corporal']);
    assert.deepEqual(equipmentForEnvironment(store,'casa',['dumbbells','pullup-bar']),['Peso_Corporal','Pesos_Livres','Calistenia']);
    const options={environment:'academia',equipment:equipmentForEnvironment(store,'academia')};
    assert.equal(availableInEnvironment({equip:'Halter'},options),true);
    assert.equal(availableInEnvironment({equip:'Máquina'},options),false);
    assert.equal(availableInEnvironment({equip:'Peso Corporal',resources:['pullup-bar']},options),false);
    assert.equal(availableInEnvironment({equip:'Peso Corporal',resourcesAny:[['pullup-bar','bench'],['low-bar']]},options),false);
    assert.equal(availableInEnvironment({equip:'Peso Corporal',resources:[]},options),true);
});
