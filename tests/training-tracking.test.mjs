import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createModelDay} from '../public/js/workout-models.js';
import {analyzeModelContract} from '../public/js/model-coverage.js';
import {snapshotRoutine,encodeTrainingContext,readTrainingContext,compareSession,trackingRecords,latestModelPassage,periodTracking,sideLabel,contextLimit,daysSince} from '../public/js/training-tracking.js';
import {completedSets} from '../public/js/domain.js';
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),sandbox);
const catalogue=JSON.parse(JSON.stringify(sandbox.window.dictionaryData));
const day=(letter='A',method='abc_tradicional')=>createModelDay(method,letter,catalogue,{environment:'academia'});
const saved=(routine,planned=snapshotRoutine(routine,catalogue),overrides={})=>({data:completedSets(routine),trainingContext:encodeTrainingContext(planned,routine,catalogue,overrides)});

test('contratos descrevem os dois ciclos sem promover opcionais a principais',()=>{
    for(const method of ['abc_tradicional','abc_sinergista']){
        const routine=['A','B','C'].flatMap(letter=>day(letter,method).map(block=>({...block,day:letter})));
        const before=JSON.stringify(routine),report=analyzeModelContract(routine,catalogue);
        assert.equal(report.pending.length,0);assert.equal(JSON.stringify(routine),before);
        const hip=report.requirements.find(item=>item.role==='hip');assert.equal(hip.status,method==='abc_tradicional'?'optional':'principal');
        assert.equal(report.requirements.find(item=>item.role==='triceps').expected,method==='abc_tradicional'?'optional':'principal');
        assert.deepEqual(report.days,['A','B','C']);
    }
});
test('contrato detecta remoção, recurso ausente e troca de função disfarçada pelo slot',()=>{
    const routine=day(),first=routine[0];
    first.exercises[0].name='Voador (Peck Deck)';
    assert.equal(analyzeModelContract(routine,catalogue).requirements.find(r=>r.role==='incline').status,'unknown');
    routine.shift();assert.equal(analyzeModelContract(routine,catalogue).requirements.find(r=>r.role==='incline').status,'missing');
    assert.equal(analyzeModelContract(routine,catalogue,{days:['A','B','C']}).requirements.filter(r=>r.day==='C'&&r.needsAttention).length,8);
    assert.ok(analyzeModelContract(day(),catalogue,{blacklist:['Supino Inclinado com Halteres']}).pending.length);
    const manual=day();delete manual[0].exercises[0].slotId;
    assert.equal(analyzeModelContract(manual,catalogue).requirements.find(r=>r.role==='incline').status,'principal');
    const replacement=manual.shift();delete replacement.roleId;manual.push(replacement);
    assert.equal(analyzeModelContract(manual,catalogue).requirements.find(r=>r.role==='incline').status,'principal');
    assert.equal(analyzeModelContract([{title:'Manual',exercises:[]}],catalogue),null);
});
test('comparação preserva previsão inicial independente da ficha atual e conta apenas realizado',()=>{
    const routine=day(),planned=snapshotRoutine(routine,catalogue);
    routine[0].exercises[0].setsData=[{checked:true,kg:20,reps:10}];
    routine[0].exercises[0].sets=4;
    const log=saved(routine,planned),row=compareSession(log).rows[0];
    assert.equal(row.planned,3);assert.equal(row.done,1);assert.equal(row.remaining,2);assert.equal(row.changed,true);
    routine[0].exercises[0].sets=1;assert.equal(compareSession(log).rows[0].planned,3);
    assert.equal(readTrainingContext(log.trainingContext).execution[0].exercises[0].sets,4);
});
test('descanso e execução configurados são preservados; troca mantém identidade e informa nome',()=>{
    const routine=day('A','abc_sinergista'),planned=snapshotRoutine(routine,catalogue);
    routine[0].type='traditional';routine[0].exercises[0].name='Supino Inclinado com Barra';
    routine[0].exercises[0].setsData=[{checked:true,reps:10}];
    const row=compareSession(saved(routine,planned,{[routine[0].id]:150})).rows[0];
    assert.equal(row.changed,true);assert.equal(row.restSeconds,150);assert.equal(row.blockType,'traditional');
    assert.equal(row.performedName,'Supino Inclinado com Barra');
    const period=periodTracking([{...saved(routine,planned),date:'2026-10-29',duration_secs:300,tipo:'A'}],'2026-10-29');
    assert.equal(period.swaps[0].sessions,1);assert.equal(period.durations[0].meanMinutes,5);
    routine.shift();assert.equal(compareSession(saved(routine,planned)).rows[0].changed,true);
});
test('opcional desativado não gera falta; opcional incluído depois não inventa previsão',()=>{
    const routine=day(),planned=snapshotRoutine(routine,catalogue);
    assert.equal(compareSession(saved(routine,planned)).rows.length,6);
    routine.at(-1).enabled=true;
    const row=compareSession(saved(routine,planned)).rows.at(-1);
    assert.equal(row.optional,true);assert.equal(row.planned,null);assert.equal(row.remaining,null);
});
test('série por lado mantém unidade e lado sem presumir execução do oposto',()=>{
    const routine=day('B'),ex=routine.at(-1).exercises[0],planned=snapshotRoutine(routine,catalogue);
    ex.setsData=[{checked:true,measurementType:'duration',durationSecs:21}];
    const log=saved(routine,planned),row=compareSession(log).rows.at(-1);
    assert.equal(row.done,1);assert.equal(row.remaining,3);assert.equal(sideLabel(log.data[0]),'E1');
    assert.equal(sideLabel({set:4,notes:'Lado direito. teste'}),'D2');
    assert.equal(log.data[0].durationSecs,21);assert.equal(log.data[0].reps,0);
});
test('legado e versões desconhecidas não recebem planejamento reconstruído',()=>{
    const legacy={data:[{exercise:'Supino',set:1}]};assert.equal(compareSession(legacy).known,false);
    const routine=day(),log=saved(routine,null);assert.equal(compareSession(log).known,false);
    const future=JSON.stringify({...JSON.parse(log.trainingContext),version:99});
    assert.equal(readTrainingContext(future),null);assert.equal(readTrainingContext('{'),null);
    assert.equal(readTrainingContext('x'.repeat(contextLimit+1)),null);
    assert.throws(()=>encodeTrainingContext([{bad:true}],routine,catalogue),/preservar/);
});
test('fila mesclada não duplica sessões e respeita exclusões',()=>{
    const a={_id:'a',createdAt:1,date:'2026-10-01'},b={_id:'b',createdAt:2,date:'2026-10-02'};
    assert.equal(trackingRecords([a],[{...a,_sync:'pending'}]).length,1);
    assert.deepEqual(trackingRecords([a,b],[{_id:'a',_action:'delete'}],['b']),[]);
});
test('passagem começa no último A do mesmo plano, sem esconder repetição nem presumir dias',()=>{
    const plan={id:'p',method:'abc_tradicional'},logs=[{campaignId:'p',tipo:'A'},{campaignId:'p',tipo:'C'},{campaignId:'p',tipo:'A'},{campaignId:'p',tipo:'B'},{campaignId:'p',tipo:'B'},{campaignId:'other',tipo:'C'}];
    assert.deepEqual(latestModelPassage(plan,logs).logs.map(log=>log.tipo),['A','B','B']);
    assert.equal(latestModelPassage(plan,[{campaignId:'p',tipo:'B'}]).startsAtA,false);
});
test('período usa datas inclusivas, separa faltas principais e não inventa contexto para legado',()=>{
    const routine=day(),planned=snapshotRoutine(routine,catalogue);
    routine[0].exercises[0].setsData=[{checked:true,reps:10}];
    const log={...saved(routine,planned),date:'2026-10-29',complete:false};
    const period=periodTracking([log,{date:'2026-09-29',complete:false},{date:'2026-10-30',complete:false},{date:'2026-09-30',complete:false,data:[]}],'2026-10-29');
    assert.equal(period.count,2);assert.equal(period.known,1);assert.equal(period.remaining,12);
    assert.deepEqual(period.groups,[{group:'Peitoral',sets:1}]);
    assert.equal(period.unfinished.find(item=>item.name==='Supino Inclinado com Halteres').remaining,2);
    assert.equal(daysSince('2026-10-28','2026-10-29'),1);assert.equal(daysSince('2026-10-30','2026-10-29'),null);
});
