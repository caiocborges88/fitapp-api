import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createModelDay,roleCandidates,principalComplete,nextModelDay,reviewDue} from '../public/js/workout-models.js';
import {completedSets,newExerciseSet,normalizeRoutine} from '../public/js/domain.js';
import {routineForTemplate} from '../public/js/editor-domain.js';
import {reviewRoutine} from '../public/js/routine-review.js';
import {analyzeCoverage} from '../public/js/routine-coverage.js';
import {executeForgePlan} from '../public/js/forge.js';
import {mergeCampaign,emptyCampaign} from '../public/js/sync-domain.js';
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),ctx);
const catalogue=JSON.parse(JSON.stringify(ctx.window.dictionaryData));globalThis.window={dictionaryData:catalogue};
const gym={environment:'academia',allEquipment:true};
const active=blocks=>blocks.filter(b=>!b.optional||b.enabled);
const signature=blocks=>blocks.map(b=>({type:b.type,rest:b.restSeconds,exercises:b.exercises.map(e=>[e.name,e.sets,e.target])}));

test('novos ABCs são fixos e independem de nível, foco e sorteio; C inclui adutora/abdutora e não acrescenta core',()=>{
    const random=Math.random;Math.random=()=>{throw new Error('não sortear');};
    try{
        for(const method of ['abc_tradicional','abc_sinergista']){
            const base=executeForgePlan(method,[],gym);
            for(const level of ['iniciante','intermediario','avancado','padrao'])for(const profile of ['hipertrofia','definicao','feminino','tatico']){
                const plan=executeForgePlan(method,[],{...gym,level,profile});
                for(const day of ['A','B','C'])assert.deepEqual(signature(plan[day]),signature(base[day]));
            }
            assert.ok(base.C.some(b=>b.exercises.some(e=>e.name==='Cadeira Adutora')&&!b.optional));
            assert.ok(base.C.some(b=>b.exercises.some(e=>e.name==='Cadeira Abdutora')&&!b.optional));
            assert.ok(base.C.some(b=>b.exercises.some(e=>e.name==='Cadeira Extensora')));
            assert.equal(base.C.some(b=>b.exercises.some(e=>e.slotId==='flexion'||e.slotId==='side')),false);
            assert.ok(base.A.every(b=>b.restSeconds&&b.modelVersion===2));
        }
    }finally{Math.random=random;}
});
test('falha de recursos/exclusões não entrega ficha reduzida e ficha salva não é reconstruída',()=>{
    assert.throws(()=>createModelDay('abc_tradicional','C',catalogue,{environment:'casa',resources:[]}),/requer/);
    assert.throws(()=>executeForgePlan('abc_sinergista',['Puxada Alta Neutra'],gym),/Puxada Alta Neutra/);
    const saved={A:createModelDay('abc_tradicional','A',catalogue,gym)};
    saved.A[0].exercises[0].sets=5;
    const reopened=executeForgePlan('abc_tradicional',[],{environment:'casa'},saved);
    assert.deepEqual(reopened,saved);assert.notEqual(reopened.A,saved.A);assert.equal('B'in reopened,false);
});
test('trocas preservam função e não oferecem crucifixo como primeiro movimento de empurrar',()=>{
    const day=createModelDay('abc_sinergista','A',catalogue,gym),first=day[0].exercises[0];
    const candidates=roleCandidates(first,catalogue,gym);
    assert.ok(candidates.length>1);assert.ok(candidates.every(m=>m.movementPattern==='empurrar-horizontal'));
    assert.equal(candidates.some(m=>/Crucifixo|Crossover/.test(m.name)),false);
    assert.equal(roleCandidates(day[1].exercises[0],catalogue,gym).some(m=>m.name==='Elevação Frontal com Halteres'),false);
    assert.equal(roleCandidates(first,catalogue,{...gym,blacklist:candidates.map(m=>m.name)}).length,0);
});
test('salvar e duplicar preservam descanso, opcionais e lados; retiram séries executadas',()=>{
    const source=createModelDay('abc_tradicional','B',catalogue,gym);
    source[0].exercises[0].setsData=[{checked:true,kg:12,reps:10}];
    const saved=routineForTemplate(source,{validatePairs:true});
    assert.equal(saved[0].restSeconds,120);assert.equal(saved[0].id,source[0].id);assert.equal(saved[0].exercises[0].setsData,undefined);
    assert.equal(saved.at(-1).exercises[0].sideMode,'alternating');
    assert.equal(saved.at(-1).exercises[0].slotId,'side');
    assert.throws(()=>normalizeRoutine([{...source[0],restSeconds:undefined}]),/descanso/);
    assert.throws(()=>normalizeRoutine([{...source[0],exercises:[{...source[0].exercises[0],target:''}]}]),/meta/);
    assert.throws(()=>routineForTemplate([{...source[0],modelVersion:99}]),/versão/);
});
test('opcionais não contam como cobertura disponível nem impedem concluir principal',()=>{
    const routine=createModelDay('abc_tradicional','A',catalogue,gym),optional=routine.at(-1);
    assert.equal(optional.optional,true);assert.equal(optional.enabled,false);
    for(const block of active(routine))for(const ex of block.exercises)ex.setsData=Array.from({length:ex.sets},()=>({...newExerciseSet(ex),checked:true}));
    const before=completedSets(routine).length;assert.equal(before,13);assert.equal(principalComplete(routine),true);
    assert.equal(analyzeCoverage(routine,catalogue,gym)[0].positions,6);
    assert.equal(reviewRoutine(routine,catalogue,{...gym,blacklist:[optional.exercises[0].name]}).length,0);
    optional.enabled=true;
    assert.equal(principalComplete(routine),true);assert.equal(completedSets(routine).length,before);
    assert.ok(reviewRoutine(routine,catalogue,{...gym,blacklist:[optional.exercises[0].name]}).length);
});
test('prancha lateral registra cada lado separadamente sem inventar duração ou repetições',()=>{
    const routine=createModelDay('abc_tradicional','B',catalogue,gym),ex=routine.at(-1).exercises[0];
    assert.equal(ex.sets,4);
    ex.setsData=[{measurementType:'duration',checked:true,durationSecs:21},{measurementType:'duration',checked:true,durationSecs:27}];
    const records=completedSets(routine);assert.deepEqual(records.map(s=>s.durationSecs),[21,27]);
    assert.ok(records[0].notes.includes('esquerdo'));assert.ok(records[1].notes.includes('direito'));
    assert.ok(records.every(s=>s.reps===0));
});
test('pares novos exigem voltas iguais; legado manual continua livre',()=>{
    const blocks=createModelDay('abc_sinergista','A',catalogue,gym);blocks[0].exercises[0].sets++;
    assert.ok(reviewRoutine(blocks,catalogue,gym).some(i=>i.code==='pair-rounds'));
    const legacy=[{title:'Manual',type:'superset',exercises:blocks[0].exercises}];
    assert.equal(reviewRoutine(legacy,catalogue,gym).length,0);
});
test('sequência usa registros salvos do mesmo plano incluindo parciais; revisão não depende de frequência',()=>{
    const plan={id:'plan',method:'abc_tradicional',startDate:'2026-01-01T12:00:00Z'};
    assert.equal(nextModelDay(plan,[]),'A');
    assert.equal(nextModelDay(plan,[],[{campaignId:'plan',tipo:'B',createdAt:1}]),'C');
    assert.equal(nextModelDay(plan,[{campaignId:'other',tipo:'B',createdAt:9},{campaignId:'plan',tipo:'A',createdAt:1,complete:false}]),'B');
    assert.equal(nextModelDay(plan,[{campaignId:'plan',tipo:'C',createdAt:1}]),'A');
    assert.equal(reviewDue(plan,Date.parse(plan.startDate)+89*86400000),false);
    assert.equal(reviewDue(plan,Date.parse(plan.startDate)+90*86400000),true);
    assert.equal(reviewDue({...plan,reviewedAt:'2026-03-31T12:00:00Z'},Date.parse('2026-04-01T12:00:00Z')),false);
});
test('sincronização conserva versões de modelo e cópia de conflito com parâmetros de bloco',()=>{
    const base=emptyCampaign(),workouts=executeForgePlan('abc_tradicional',[],gym);
    const local={...base,main_method:'abc_tradicional',level:'padrao',campaign_data:JSON.stringify({id:'new',schemaVersion:2,modelVersion:1,workouts})};
    const merged=mergeCampaign(base,local,base);
    assert.equal(merged.payload.campaign_data,local.campaign_data);
    const remote={...base,campaign_data:JSON.stringify({id:'legacy',method:'abc',workouts:{A:[]}})};
    assert.equal(mergeCampaign(base,local,remote).conflicts.length,1);
});
