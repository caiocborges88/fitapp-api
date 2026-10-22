import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {buildEnvironmentProposal,proposalSignature} from '../public/js/environment-proposal.js';
import {availableInEnvironment,findMovement} from '../public/js/environment.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
const days=context.window.dbWorkouts.tradicional.iniciante;
const home={environment:'casa',resources:['dumbbells','bench','incline-bench'],level:'iniciante'};

test('proposta B mantém remada e bíceps e declara a puxada vertical ausente',()=>{
    const snapshot=JSON.stringify(days.B);
    const proposal=buildEnvironmentProposal(days.B,catalogue,home);
    assert.equal(proposal.omitted.length,1);
    assert.equal(proposal.omitted[0].name,'Puxada Alta na Máquina');
    assert.equal(proposal.omitted[0].covered,false);
    assert.equal(proposal.omitted[0].pattern,'puxar-vertical');
    const movements=proposal.routine.flatMap(block=>block.exercises);
    assert.equal(movements.length,proposal.originalCount-1);
    assert.ok(movements.every(ex=>availableInEnvironment(findMovement(catalogue,ex.name),home)));
    assert.ok(movements.some(ex=>findMovement(catalogue,ex.name).movementPattern==='puxar-horizontal'));
    movements[0].sets=1;
    assert.equal(JSON.stringify(days.B),snapshot);
});

test('proposta C declara perda de subnível sem trocar extensora por agachamento',()=>{
    for(const environment of ['casa','parque']){
        const proposal=buildEnvironmentProposal(days.C,catalogue,{environment,resources:[],level:'iniciante'});
        assert.equal(proposal.omitted[0].name,'Cadeira Extensora');
        assert.equal(proposal.omitted[0].subLevel,'Reto Femoral');
        assert.equal(proposal.omitted[0].covered,false);
        assert.ok(!proposal.routine.flatMap(block=>block.exercises).some(ex=>ex.name==='Cadeira Extensora'));
    }
});

test('proposta rejeita eliminar grupos inteiros e não entrega só core',()=>{
    for(const day of [days.A,days.B])assert.throws(()=>buildEnvironmentProposal(day,catalogue,{...home,resources:[]}),/sem movimentos para:/);
    assert.throws(()=>buildEnvironmentProposal([{exercises:[{name:'Cadeira Extensora',sets:3,target:'10 rep'}]}],catalogue,home),/Não há movimentos compatíveis/);
});

test('proposta não altera pares, circuitos ou movimentos desconhecidos',()=>{
    for(const type of ['superset','circuit'])assert.throws(()=>buildEnvironmentProposal([{...days.C[0],type}],catalogue,home),/apenas séries tradicionais/);
    const source=[{exercises:[{name:'Movimento desconhecido',sets:3,target:'10 rep'},{name:'Abdominal Supra no Solo',sets:3,target:'10 rep'}]}];
    assert.throws(()=>buildEnvironmentProposal(source,catalogue,home),/ausentes do catálogo/);
});

test('a adição de recursos remove lacunas sem modificar a ficha ou propostas anteriores',()=>{
    const limited=buildEnvironmentProposal(days.B,catalogue,home);
    const complete=buildEnvironmentProposal(days.B,catalogue,{...home,resources:[...home.resources,'pullup-bar']});
    assert.equal(complete.omitted.length,0);
    assert.equal(complete.proposedCount,complete.originalCount);
    assert.equal(limited.omitted.length,1);
    assert.equal(proposalSignature(days.B,home),proposalSignature(days.B,{...home,resources:[...home.resources].reverse()}));
    assert.notEqual(proposalSignature(days.B,home),proposalSignature(days.B,{...home,resources:[]}));
    assert.notEqual(proposalSignature(days.B,home),proposalSignature(days.C,home));
});
