import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {matchesMovementRequirement} from '../public/js/movement-requirements.js';
import {availableInEnvironment} from '../public/js/environment.js';
import {state} from '../public/js/state.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=JSON.parse(JSON.stringify(context.window.dictionaryData));
globalThis.window={dictionaryData:catalogue};
globalThis.document={getElementById:id=>id==='profileSelector'?{value:'hipertrofia'}:null,querySelectorAll:()=>[]};
state.els.levelSelector={value:'iniciante'};
const {executeForgeLogic}=await import('../public/js/forge.js');
const home={environment:'casa',resources:['dumbbells','bench','pullup-bar'],allEquipment:true};
const exercises=routine=>routine.flatMap(block=>block.exercises);

test('seleção canônica aceita rótulos variantes e rejeita padrão incompatível',()=>{
    const row=catalogue.find(item=>item.name==='Remada Unilateral (Serrote)');
    assert.equal(matchesMovementRequirement(row,'Costas','Espessura (Romboides)'),true);
    assert.equal(matchesMovementRequirement(row,'Costas','Latíssimo do Dorso'),false);
    const hammer=catalogue.find(item=>item.name==='Rosca Martelo com Halteres');
    assert.equal(matchesMovementRequirement(hammer,'Bíceps','Braquial / Antebraço'),true);
    assert.equal(matchesMovementRequirement({...hammer,movementPattern:'flexao-cotovelo-supinada'},'Bíceps','Braquial / Antebraço'),false);
    assert.equal(matchesMovementRequirement({...hammer,muscleFocus:[]},'Bíceps','Braquial / Antebraço'),false);
});

test('gerador B em casa usa barra assistida e mantém padrões de remada e rosca neutra/pronada',()=>{
    const routine=executeForgeLogic('abc','pull',[],home);
    const names=exercises(routine).map(ex=>ex.name);
    assert.ok(names.includes('Barra Fixa com Apoio dos Pés'));
    assert.ok(names.some(name=>matchesMovementRequirement(catalogue.find(item=>item.name===name),'Bíceps','Braquial / Antebraço')));
    assert.ok(names.some(name=>matchesMovementRequirement(catalogue.find(item=>item.name===name),'Costas','Espessura (Romboides)')));
    assert.ok(names.every(name=>availableInEnvironment(catalogue.find(item=>item.name===name),home)));
    assert.equal(names.length,6); // Five requested slots plus the final abdominal block.
    assert.equal(routine.at(-1).title,'Abdominal');
});

test('rótulos visuais renomeados não alteram cobertura do tradicional',()=>{
    const previous=window.dictionaryData;
    window.dictionaryData=catalogue.map(item=>({...item,subLevel:'Rótulo de apresentação revisado'}));
    try{
        for(const [day,count]of [['push',8],['pull',6],['legs',7]]){
            assert.equal(exercises(executeForgeLogic('abc',day,[],{environment:'academia',allEquipment:true})).length,count);
        }
    }finally{window.dictionaryData=previous;}
});

test('sem barra a remada não preenche a solicitação de puxada vertical',()=>{
    assert.throws(()=>executeForgeLogic('abc','pull',[],{...home,resources:['dumbbells','bench']}),/Latíssimo do Dorso/);
});

test('exclusão por nome antigo continua valendo na seleção e na reutilização',()=>{
    // Keep a single long-head variant to exercise alias exclusions even when a slot could be reused.
    const previous=window.dictionaryData;
    const source=catalogue.find(item=>item.aliases?.length&&item.muscleFocus?.includes('triceps-longa'));
    assert.ok(source);
    window.dictionaryData=catalogue.filter(item=>!item.muscleFocus.includes('triceps-longa')||item.name===source.name);
    try{
        assert.throws(()=>executeForgeLogic('abc','push',[source.aliases[0]],{environment:'academia',allEquipment:true}),/Cabeça Longa/);
    }finally{window.dictionaryData=previous;}
});

test('ABCD não completa peitoral ou tríceps com repetição de um único subnível',()=>{
    const previous=window.dictionaryData;
    const names=new Set(['Supino Reto com Barra','Tríceps Coice (Kickback)','Abdominal Supra no Solo']);
    window.dictionaryData=catalogue.filter(item=>names.has(item.name));
    try{
        assert.throws(()=>executeForgeLogic('abcd','A',[],{environment:'academia',allEquipment:true}),/Clavicular.*Abdominal.*Longa/);
        assert.throws(()=>executeForgeLogic('abcd','A',['Tríceps Coice (Kickback)'],{environment:'academia',allEquipment:true}),/Tríceps/);
    }finally{window.dictionaryData=previous;}
});

test('extensão de quadril e flexão de joelho permanecem solicitações distintas',()=>{
    const hinge=catalogue.find(item=>item.name==='RDL com Halteres');
    assert.equal(matchesMovementRequirement(hinge,'Isquiotibiais','Isquiotibiais (extensão de quadril)'),true);
    assert.equal(matchesMovementRequirement(hinge,'Isquiotibiais','Isquiotibiais (flexão de joelho)'),false);
    const unrelated={agonist:'Peitoral',subLevel:'Esternocostal inventado'};
    assert.equal(matchesMovementRequirement(unrelated,'Peitoral','Esternocostal'),false);
});
