import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {modelSettings,validRestSeconds} from '../public/js/model-settings.js';
import {state} from '../public/js/state.js';
import {executeForgePlan} from '../public/js/forge.js';

test('parâmetros declarados mantêm os descansos e séries já usados pelos modelos',()=>{
    for(const method of ['abc','ppl','abcd','biset_sinergista','circuito','casa'])for(const profile of ['hipertrofia','definicao','feminino','tatico'])for(const level of ['iniciante','intermediario','avancado']){
        const settings=modelSettings(method,profile,level);
        const base=profile==='definicao'?(method==='circuito'?30:45):profile==='tatico'?45:60;
        assert.equal(settings.restSeconds,base+(level==='iniciante'?15:0));
        assert.equal(settings.baseSets,level==='iniciante'?3:4);
        assert.match(settings.description,new RegExp(`${settings.restSeconds} s`));
    }
    assert.match(modelSettings('abc','definicao').description,/mantém os exercícios solicitados e as metas/);
    assert.match(modelSettings('biset_sinergista','feminino').description,/não altera a divisão/);
    assert.match(modelSettings('abc','hipertrofia','avancado').description,/não há progressão automática/);
});
test('descanso restaurado é limitado e sessões antigas recebem padrão de 60 segundos',()=>{
    for(const value of [undefined,null,NaN,'incorreto',0,-1,14,601,60.5])assert.equal(validRestSeconds(value),60);
    for(const value of [15,30,45,60,75,90,120,600,'90'])assert.equal(validRestSeconds(value),Number(value));
});
test('gerar ou rejeitar um ciclo não agenda efeitos no descanso da sessão',()=>{
    const context={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
    const oldWindow=globalThis.window,oldDocument=globalThis.document,oldTimeout=globalThis.setTimeout,oldLevel=state.els.levelSelector;
    let timers=0,adjustments=0;
    globalThis.window={dictionaryData:context.window.dictionaryData};
    globalThis.document={getElementById:id=>id==='profileSelector'?{value:'definicao'}:null,querySelectorAll:()=>[]};
    globalThis.setTimeout=()=>{timers++;return 0;};globalThis.FitApp={adjustRestTime(){adjustments++;}};
    state.els.levelSelector={value:'iniciante'};state.currentRestTime=120;
    try{
        const plan=executeForgePlan('abc',[],{environment:'academia',allEquipment:true});
        assert.equal(Object.keys(plan).length,3);
        assert.throws(()=>executeForgePlan('abc',[],{environment:'casa',resources:[],allEquipment:true}));
        assert.equal(state.currentRestTime,120);assert.equal(timers,0);assert.equal(adjustments,0);
    }finally{globalThis.window=oldWindow;globalThis.document=oldDocument;globalThis.setTimeout=oldTimeout;delete globalThis.FitApp;state.els.levelSelector=oldLevel;}
});
