import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {analyzeCoverage} from '../public/js/routine-coverage.js';
import {adaptRoutineToEnvironment} from '../public/js/environment.js';
const context={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
const routine=(names,options={})=>[{title:'Treino',type:'traditional',...options,exercises:names.map(name=>({name,sets:3,target:'10 rep'}))}];

test('cobertura ignora títulos e não confunde peitoral inferior com core',()=>{
    const inferior=catalogue.find(item=>item.muscleFocus.includes('peitoral-inferior'));
    assert.equal(analyzeCoverage(routine([inferior.name],{title:'Abdominal'}),catalogue)[0].hasCore,false);
    const core=catalogue.find(item=>(item.agonist||item.group)==='Core');
    assert.equal(analyzeCoverage(routine([core.name],{title:'Pernas'}),catalogue)[0].hasCore,true);
});
test('relatório distingue posições e nomes canônicos por dia sem somar aliases como movimentos distintos',()=>{
    const item=catalogue.find(item=>item.aliases?.length),source=[...routine([item.name,item.aliases[0]],{day:'A'}),...routine([item.name],{day:'B'})];
    const snapshot=JSON.stringify(source),report=analyzeCoverage(source,catalogue);
    assert.equal(report[0].positions,2);assert.equal(report[0].uniqueCount,1);assert.equal(report[0].sets,6);
    assert.equal(report[0].duplicates[0].count,2);assert.deepEqual(report[1].duplicates,[]);assert.equal(JSON.stringify(source),snapshot);
});
test('pendências não contam como cobertura disponível; cadastros ausentes não são adivinhados',()=>{
    const source=routine(['Barra Fixa Pronada (Pull-up)','Cadastro ausente','Prancha Isométrica Frontal']);
    const result=analyzeCoverage(source,catalogue,{environment:'casa',resources:[],blacklist:['Prancha Isométrica Frontal']})[0];
    assert.equal(result.readyCount,0);assert.equal(result.pendingCount,3);assert.equal(result.hasCore,false);assert.equal(result.sets,0);assert.deepEqual(result.unknown,['Cadastro ausente']);
    assert.equal(analyzeCoverage(routine(['Prancha Isométrica Frontal'],{type:'superset'}),catalogue)[0].hasCore,false);
});
test('subníveis e padrões mostram a flexão de joelho sem presumir extensão de quadril',()=>{
    const item=catalogue.find(item=>item.agonist==='Isquiotibiais'&&item.movementPattern==='flexao-joelho');
    const report=analyzeCoverage(routine([item.name]),catalogue)[0];
    assert.ok(report.groups[0].patterns.includes('flexao-joelho'));
    assert.ok(!report.groups[0].patterns.includes('extensao-quadril'));
    assert.ok(report.groups[0].otherSubLevels.includes('Isquiotibiais (extensão de quadril)'));
});
test('adaptação equivalente mantém referência; remoção ou alternativa de outro padrão aparece como perda',()=>{
    const source=routine(['Supino Reto com Barra','Cadeira Extensora']);
    const adapted=adaptRoutineToEnvironment(source,catalogue,{environment:'casa',resources:[]}).routine;
    const report=analyzeCoverage(adapted,catalogue,{environment:'casa',resources:[]},source)[0];
    assert.ok(report.groups.some(item=>item.group==='Peitoral'));assert.equal(report.lost.length,1);assert.match(report.lost[0],/extensao-joelho/);
    const wrong=routine(['Agachamento com peso corporal']);
    assert.match(analyzeCoverage(wrong,catalogue,{},routine(['Cadeira Extensora']))[0].lost[0],/extensao-joelho/);
    const reduced=routine(['Supino Reto com Barra']);
    assert.equal(analyzeCoverage(reduced,catalogue,{},source)[0].lost.length,1);
});
test('dias declarados vazios e séries editadas são refletidos sem preencher ficha',()=>{
    const source=routine(['Supino Reto com Barra'],{day:'A'});source[0].exercises[0].sets=5;
    const report=analyzeCoverage(source,catalogue,{days:['A','B']});
    assert.equal(report[0].sets,5);assert.equal(report[1].positions,0);assert.equal(report[1].hasCore,false);
});
test('rótulos de isolamento não criam lacuna fictícia da mesma ênfase peitoral',()=>{
    const report=analyzeCoverage(routine(['Supino Reto com Barra']),catalogue)[0];
    assert.ok(report.groups[0].subLevels.includes('Esternocostal'));
    assert.ok(!report.groups[0].otherSubLevels.some(label=>label.startsWith('Esternocostal')));
});
