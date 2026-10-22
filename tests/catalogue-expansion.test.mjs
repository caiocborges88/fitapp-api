import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {availableInEnvironment,adaptRoutineToEnvironment,movementCompatibility} from '../public/js/environment.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
const movement=id=>catalogue.find(item=>item.id===id);

test('casa somente com halteres atende adução peitoral e deltoide posterior sem presumir banco',()=>{
    const source=[{type:'traditional',exercises:[{name:'Voador (Peck Deck)',sets:3,target:'12 rep'},{name:'Crucifixo Invertido na Máquina (Peck Deck)',sets:3,target:'12 rep'}]}];
    const options={environment:'casa',resources:['dumbbells'],level:'iniciante'};
    const adapted=adaptRoutineToEnvironment(source,catalogue,options);
    assert.equal(adapted.missing.length,0);
    assert.deepEqual(adapted.routine[0].exercises.map(ex=>ex.name),['Crucifixo no Solo com Halteres','Crucifixo Invertido Curvado em Pé com Halteres']);
    const without=adaptRoutineToEnvironment(source,catalogue,{...options,resources:[]});
    assert.equal(without.missing.length,2);
    for(const exercise of adapted.routine[0].exercises){
        const selected=catalogue.find(item=>item.name===exercise.name);
        assert.equal(availableInEnvironment(selected,{environment:'parque',resources:['dumbbells']}),false);
        assert.equal(availableInEnvironment(selected,{...options,equipmentPolicy:'bodyweight'}),false);
    }
    assert.deepEqual(adaptRoutineToEnvironment(adapted.routine,catalogue,{environment:'academia'}).routine[0].exercises.map(ex=>ex.name),source[0].exercises.map(ex=>ex.name));
});

test('sóleo sem banco exige apoio de equilíbrio declarado e nunca troca para gastrocnêmios',()=>{
    const calf=movement('panturrilha-em-pe-joelhos-flexionados-com-apoio');
    const source=[{exercises:[{name:'Panturrilha Sentado (Máquina)',sets:3,target:'15 rep'}]}];
    for(const environment of ['casa','parque','praia']){
        const options={environment,resources:['balance-support'],level:'iniciante'};
        assert.equal(availableInEnvironment(calf,options),true);
        assert.equal(availableInEnvironment(calf,{...options,resources:[]}),false);
        assert.equal(availableInEnvironment(calf,{...options,resources:['dumbbells','pullup-bar']}),false);
        const result=adaptRoutineToEnvironment(source,catalogue,options);
        assert.equal(result.missing.length,0);
        assert.equal(result.routine[0].exercises[0].name,calf.name);
        assert.equal(adaptRoutineToEnvironment(result.routine,catalogue,{...options,resources:[]}).routine[0].exercises[0].needsReview,true);
        assert.equal(adaptRoutineToEnvironment(result.routine,catalogue,{environment:'academia'}).routine[0].exercises[0].name,'Panturrilha Sentado (Máquina)');
    }
    assert.equal(calf.movementPattern,'flexao-plantar-joelho-flexionado');
    assert.equal(calf.muscleFocus.includes('gastrocnemios'),false);
});

test('rosca corporal sentada permite bíceps sem halter ou barra, mas não sem assento',()=>{
    const curl=movement('rosca-corporal-sentada-resistencia-da-perna');
    for(const environment of ['casa','parque']){
        const options={environment,resources:['bench'],equipmentPolicy:'bodyweight',level:'iniciante'};
        const result=adaptRoutineToEnvironment([{equipmentPolicy:'bodyweight',exercises:[{name:'Rosca Corporal em Barra Baixa',sets:3,target:'10 rep/lado'}]}],catalogue,options);
        assert.equal(result.missing.length,0);
        assert.equal(result.routine[0].exercises[0].name,curl.name);
        assert.equal(availableInEnvironment(curl,{...options,resources:['balance-support']}),false);
        assert.equal(availableInEnvironment(curl,{...options,resources:[]}),false);
    }
});

test('opções sem banda preservam direção de puxada, extensora e pares distintos',()=>{
    const options={environment:'casa',resources:['dumbbells','bench','balance-support'],level:'iniciante'};
    const vertical=movementCompatibility(movement('puxada-alta-na-maquina'),catalogue,options);
    assert.equal(vertical.candidates.length,0);
    assert.equal(movementCompatibility(movement('cadeira-extensora'),catalogue,options).candidates.length,0);
    const source=[{type:'superset',exercises:[{name:'Remada Baixa no Cabo (Triângulo)',sets:3,target:'10 rep'},{name:'Remada Máquina Apoiada no Peito',sets:3,target:'10 rep'}]}];
    const result=adaptRoutineToEnvironment(source,catalogue,{...options,resources:['dumbbells']});
    assert.equal(result.missing.length,0);
    const names=result.routine[0].exercises.map(ex=>ex.name);
    assert.equal(new Set(names).size,2);
    assert.ok(names.every(name=>catalogue.find(item=>item.name===name).movementPattern==='puxar-horizontal'));
    const reverse=movement('rosca-inversa-com-halteres');
    assert.equal(availableInEnvironment(reverse,{...options,resources:['dumbbells']}),true);
    assert.equal(reverse.movementPattern,'flexao-cotovelo-neutra-pronada');
});
