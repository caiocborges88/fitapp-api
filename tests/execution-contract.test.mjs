import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createModelDay,roleCandidates} from '../public/js/workout-models.js';
import {prepareSwap,withExecution,referenceCompatible,referenceKey,recordVolume,missingExecutionResources} from '../public/js/execution-contract.js';
import {completedSets,normalizeRoutine} from '../public/js/domain.js';
import {routineForTemplate,duplicateTemplate} from '../public/js/editor-domain.js';
import {snapshotRoutine,encodeTrainingContext,readTrainingContext,compareSession} from '../public/js/training-tracking.js';
import {mergeCampaign,emptyCampaign} from '../public/js/sync-domain.js';
import {adaptRoutineToEnvironment} from '../public/js/environment.js';
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),ctx);
const catalogue=JSON.parse(JSON.stringify(ctx.window.dictionaryData));globalThis.window={dictionaryData:catalogue};
const movement=name=>catalogue.find(m=>m.name===name),base=(name,sets=2)=>withExecution({id:'position',name,sets,target:'10–15 rep'},movement(name));
test('catálogo contém 122 orientações específicas e sete retirados legíveis; identidade e variantes são explícitas',()=>{
    assert.equal(catalogue.filter(m=>m.selectable).length,122);assert.equal(catalogue.filter(m=>!m.selectable).length,7);
    assert.equal(new Set(catalogue.map(m=>m.id)).size,129);
    assert.ok(catalogue.filter(m=>m.selectable).every(m=>m.desc.length>80&&!m.desc.startsWith('Execute a variante')&&m.executionProfile.movementId===m.id&&m.classification.version===1));
    assert.ok(movement('Desenvolvimento com Halteres').executionProfile.resources.includes('backrest-bench'));
    assert.equal(movement('Tríceps Francês com Halter').executionProfile.weights,1);
    assert.equal(movement('Elevação de Panturrilhas Sentado com Halteres').executionProfile.weights,2);
    assert.equal(movement('Rosca Martelo com Halteres').classification.grip,'neutra');assert.equal(movement('Rosca Inversa com Halteres').classification.grip,'pronada');
    assert.deepEqual(movement('Extensão Lombar (Banco Romano)').classification.emphasis,['gluteo-maximo','isquiotibiais']);
    assert.equal(movement('Extensão Lombar (Banco Romano)').classification.region,'Pernas');
    assert.throws(()=>base('Pular Corda'),/novas escolhas/);
});
test('as 52 trocas dirigidas conservam séries, descanso e posição; cinco funções alteram a contagem',()=>{
    const roles=new Map();for(const day of ['A','B','C'])for(const b of createModelDay('abc_sinergista',day,catalogue))for(const ex of b.exercises)roles.set(ex.slotId,{b,ex});
    let swaps=0,counts=0;for(const {b,ex} of roles.values()){
        const options=roleCandidates(ex,catalogue,{environment:'academia'});
        for(const a of options)for(const z of options)if(a.id!==z.id){
            const source=withExecution({...ex,setsData:[{kg:'40',reps:'12',checked:false}]},a),before=JSON.stringify(source),next=prepareSwap(source,z);
            assert.equal(JSON.stringify(source),before);assert.equal(next.id,source.id);assert.equal(next.slotId,source.slotId);assert.equal(next.sets,source.sets);assert.equal(next.setsData,undefined);assert.equal(b.restSeconds,ex.slotId==='side'?75:b.restSeconds);
            assert.equal(next.target.includes('por lado'),next.execution.count==='per-side'||next.execution.count==='duration-side');
            if(source.execution.count!==next.execution.count)counts++;swaps++;
        }
    }
    assert.equal(swaps,52);assert.equal(counts,10);
});
test('unilateral tem uma linha por série, notas de diferenças e não transporta realizado à ficha',()=>{
    const ex=base('Tríceps Francês com Halter');ex.setsData=[{checked:true,reps:10,kg:20},{checked:true,reps:8,kg:20,sideDifference:true,notes:'E 10; D 8'}];
    const routine=[{id:'block',title:'Francês',type:'traditional',restSeconds:90,exercises:[ex]}];
    const records=completedSets(routine);assert.equal(records.length,2);assert.equal(records[0].reps,10);assert.match(records[1].notes,/E 10; D 8/);
    assert.equal(recordVolume(records[0]),400);assert.equal(recordVolume(records[1]),null);
    const saved=routineForTemplate(routine);assert.equal(saved[0].exercises[0].setsData,undefined);assert.deepEqual(saved[0].exercises[0].execution,ex.execution);
    const copy=duplicateTemplate({id:'old',name:'Ficha',routine});copy.routine[0].exercises[0].execution.count='total';assert.equal(ex.execution.count,'per-side');
    assert.throws(()=>prepareSwap(ex,movement('Tríceps Francês no Cabo')),/registradas/);
});
test('soma dos halteres é interpretada uma vez, incluindo alternada; legados não produzem equivalência',()=>{
    const record=(name,kg)=>completedSets([{exercises:[{...base(name,1),setsData:[{kg,reps:10,checked:true}]}]}])[0];
    assert.equal(recordVolume(record('Supino Reto com Halteres',40)),400);
    assert.equal(recordVolume(record('Rosca Alternada com Halteres',20)),200);
    assert.equal(recordVolume(record('Tríceps Francês com Halter',20)),400);
    assert.equal(recordVolume({kg:20,reps:10}),null);
    const ex=base('Rosca Alternada com Halteres'),r=record(ex.name,20);assert.equal(referenceCompatible(ex,r),true);assert.equal(referenceCompatible(ex,{...r,executionKey:undefined}),false);
    assert.equal(referenceCompatible(base('Rosca Direta com Barra'),r),false);
});
test('contexto e sincronização preservam variante e unidade; planejamento inicial não é reescrito',()=>{
    const routine=[{id:'block',title:'Rosca',type:'traditional',restSeconds:90,exercises:[base('Rosca Direta com Barra')]}],planned=snapshotRoutine(routine,catalogue);
    routine[0].exercises[0]=prepareSwap(routine[0].exercises[0],movement('Rosca Alternada com Halteres'));
    routine[0].exercises[0].setsData=[{kg:20,reps:10,checked:true}];
    const context=encodeTrainingContext(planned,routine,catalogue),log={trainingContext:context,data:completedSets(routine)};
    assert.equal(readTrainingContext(context).version,2);assert.equal(planned[0].exercises[0].execution.count,'total');assert.equal(compareSession(log).rows[0].changed,true);
    assert.equal(readTrainingContext(JSON.stringify({...JSON.parse(context),version:1})).version,1);
    assert.equal(readTrainingContext(JSON.stringify({...JSON.parse(context),version:99})),null);
    assert.throws(()=>normalizeRoutine([{...routine[0],exercises:[{...routine[0].exercises[0],execution:{version:99}}]}]),/versão/);
    const empty=emptyCampaign(),local={...empty,custom_workouts:JSON.stringify([{id:'one',name:'Ficha',routine:routineForTemplate(routine)}])};
    const merged=mergeCampaign(empty,local,empty).payload;assert.equal(JSON.parse(merged.custom_workouts)[0].routine[0].exercises[0].execution.count,'per-side');
});
test('recursos confirmados são específicos; variantes de barra não compartilham referência',()=>{
    const ex=base('Desenvolvimento com Halteres'),routine=[{exercises:[ex]}];
    assert.ok(missingExecutionResources(routine,{environment:'academia',resources:['dumbbells','bench']}).includes('backrest-bench'));
    assert.equal(missingExecutionResources(routine,{environment:'academia',resources:ex.execution.resources}).length,0);
    const scott=base('Rosca Scott com Barra'),key=referenceKey(scott);scott.execution.choice='Barra W';assert.notEqual(referenceKey(scott),key);
});

test('alias legado mantém o nome e a semântica; troca com kg na meta exige revisão explícita',()=>{
    const item=catalogue.find(m=>m.aliases?.length&&m.selectable),alias=item.aliases[0];
    const legacy=normalizeRoutine([{exercises:[{name:alias,sets:2,target:'10 rep'}]}])[0].exercises[0];
    assert.equal(legacy.name,alias);assert.equal(legacy.execution,undefined);
    const adapted=adaptRoutineToEnvironment([{exercises:[legacy]}],catalogue,{environment:'academia'}).routine[0].exercises[0];
    assert.equal(adapted.name,alias);assert.equal(adapted.execution,undefined);
    const next=prepareSwap({...base('Rosca Direta com Barra'),target:'10 rep · 20 kg'},movement('Rosca Alternada com Halteres'));
    assert.equal(next.reviewCode,'target-review');assert.equal(next.needsReview,true);assert.match(next.target,/20 kg/);
});
