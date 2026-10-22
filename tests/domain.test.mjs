import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {normalizeDictionary,normalizeRoutine,completedSets,mergeHistory} from '../public/js/domain.js';
const source=fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8');
const context=vm.createContext({window:{}});vm.runInContext(source,context);
const dictionary=normalizeDictionary(context.window.dictionaryData);
globalThis.window={dictionaryData:dictionary,FitApp:{adjustRestTime(){}}};
globalThis.document={getElementById:id=>id==='profileSelector'?{value:'hipertrofia'}:null,querySelectorAll:()=>['Pesos_Livres','Maquinas_Polias','Barras_Anilhas','Peso_Corporal,Calistenia'].map(tag=>({getAttribute:()=>tag}))};
const {state}=await import('../public/js/state.js');
const {executeForgeLogic,executeForgePlan}=await import('../public/js/forge.js');
test('todos os dias e métodos oferecidos produzem rotinas válidas',()=>{
  state.els.levelSelector={value:'iniciante'};
  for(const [method,days] of Object.entries({abc:['push','pull','legs'],abcd:['A','B','C','D'],biset_sinergista:['peito_triceps','costa_biceps','perna_ombro'],circuito:['A']})){
    for(const day of days){const routine=executeForgeLogic(method,day);assert.ok(routine.flatMap(b=>b.exercises).length>0,method+day);assert.doesNotThrow(()=>normalizeRoutine(routine));}
  }
});
test('tradicional iniciante não entrega dia incompleto quando faltam subníveis',()=>{
  state.els.levelSelector={value:'iniciante'};
  for(const environment of ['casa','parque']){
    for(const day of ['push','pull','legs']){
      assert.throws(()=>executeForgeLogic('abc',day,[],{environment,resources:[],allEquipment:true}),/Sem movimentos compatíveis para os focos:/);
    }
  }
});

test('tradicional informa o subnível ausente mesmo com halteres em casa',()=>{
  state.els.levelSelector={value:'iniciante'};
  assert.throws(()=>executeForgeLogic('abc','legs',[],{environment:'casa',resources:['dumbbells','bench','incline-bench'],allEquipment:true}),/Reto Femoral/);
});

test('tradicional iniciante de academia mantém todos os focos solicitados',()=>{
  state.els.levelSelector={value:'iniciante'};
  const expected={push:['peitoral-esternocostal','peitoral-clavicular','peitoral-inferior','deltoide-anterior','deltoide-lateral','triceps-longa','triceps-lateral-medial'],pull:['costas-latissimo','costas-remada','deltoide-posterior','biceps','braquial-antebraco'],legs:['quadriceps-vastos','quadriceps-reto','isquiotibiais','gluteo-maximo','gastrocnemios']};
  for(const [day,focus] of Object.entries(expected)){
    const routine=executeForgeLogic('abc',day,[],{environment:'academia',allEquipment:true});
    const movements=routine.flatMap(b=>b.exercises).map(ex=>dictionary.find(d=>d.name===ex.name));
    const actual=new Set(movements.flatMap(ex=>ex.muscleFocus));
    for(const item of focus)assert.ok(actual.has(item),day+': '+item);
    if(day==='legs'){
      assert.ok(movements.some(ex=>ex.subLevel==='Isquiotibiais (extensão de quadril)'));
      assert.ok(movements.some(ex=>ex.subLevel==='Isquiotibiais (flexão de joelho)'));
    }
    assert.ok(movements.every(ex=>ex.nivel!==3));
  }
});

test('ABC não salva um ciclo parcial e ABCD não omite grupos indisponíveis',()=>{
  state.els.levelSelector={value:'iniciante'};
  for(const method of ['abc','abcd']){
    assert.throws(()=>executeForgePlan(method,[],{environment:'casa',resources:[],allEquipment:true}),/Sem movimentos compatíveis/);
  }
});
test('catálogo normalizado mantém contrato completo e IDs únicos',()=>{
  assert.equal(new Set(dictionary.map(d=>d.id)).size,dictionary.length);
  assert.ok(dictionary.every(d=>d.focus&&d.subLevel&&d.desc));
});
test('rotina vazia ou séries inválidas são rejeitadas',()=>{
  for(const sets of [0,-1,11,NaN,1.5])assert.throws(()=>normalizeRoutine([{exercises:[{name:'A',sets}]}]));
  assert.throws(()=>normalizeRoutine([]));
});
test('edição depois da marcação e exercícios repetidos conservam identidade',()=>{
  const routine=normalizeRoutine([{exercises:[{name:'Supino',sets:1,setsData:[{checked:true,kg:'22',reps:'10'}]},{name:'Supino',sets:1,setsData:[{checked:true,kg:'18',reps:'8'}]}]}]);
  routine[0].exercises[0].setsData[0].kg='24';
  const log=completedSets(routine);assert.equal(log[0].kg,24);assert.notEqual(log[0].exerciseId,log[1].exerciseId);
});
test('reconciliação preserva pendentes e não duplica registros',()=>{
  const a={_id:'a',date:'2026-10-14'},b={_id:'b',date:'2026-10-15',_sync:'pending'};
  assert.deepEqual(mergeHistory([a,b],[{...a,_sync:'synced'}],[b]).map(r=>r._id),['a','b']);
});

test('séries por tempo conservam segundos sem inventar repetições',()=>{
  const routine=normalizeRoutine([{exercises:[{name:'Prancha',sets:2,setsData:[{checked:true,kg:'5',reps:'12',measurementType:'duration',durationSecs:'45'},{checked:true,kg:'0',reps:'10'}]}]}]);
  const [timed,legacy]=completedSets(routine);
  assert.equal(timed.measurementType,'duration');assert.equal(timed.durationSecs,45);assert.equal(timed.reps,0);
  assert.equal(legacy.reps,10);assert.equal(legacy.measurementType,undefined);
  assert.equal(timed.kg*timed.reps,0);
});


test('ficha completa contém todos os dias e abdominal final sem desfazer bi-sets',()=>{
  const options={environment:'academia',allEquipment:true};
  for(const method of ['abc','abcd','biset_sinergista']){
    const plan=executeForgePlan(method,[],options);
    assert.deepEqual(Object.keys(plan),method==='abcd'?['A','B','C','D']:['A','B','C']);
    for(const routine of Object.values(plan)){
      assert.equal(routine.at(-1).title,'Abdominal');
      assert.equal(routine.at(-1).type,'traditional');
      assert.ok(routine.at(-1).exercises.length);
      assert.ok(routine.at(-1).exercises.every(ex=>dictionary.find(d=>d.name===ex.name).group==='Core'));
      if(method.startsWith('biset'))assert.ok(routine.some(b=>b.type==='superset'&&b.exercises.length===2));
    }
    const reopened=executeForgePlan(method,[],options,plan);
    assert.deepEqual(reopened,plan);
  }
});

test('reabrir ficha antiga preserva edição manual sem acrescentar core pelo título do bloco',()=>{
  const original=[{title:'Personalizado',type:'traditional',exercises:[{id:'saved',name:dictionary[0].name,sets:5,target:'6-8'}]}];
  const plan=executeForgePlan('abc',[],{environment:'academia',allEquipment:true},{A:original});
  assert.deepEqual(plan.A,original);
  assert.equal(original.length,1);
  assert.notEqual(plan.A,original);
  assert.deepEqual(executeForgePlan('abc',[],{environment:'academia',allEquipment:true},plan),plan);
});


test('cada estrutura gera ciclo com peito, costas, braços, pernas e core',()=>{
  for(const method of ['ppl','biset_sinergista','circuito']){
    for(let iteration=0;iteration<8;iteration++){
      const plan=executeForgePlan(method,[],{environment:'academia',allEquipment:true});
      const groups=new Set(Object.values(plan).flatMap(r=>r.flatMap(b=>b.exercises)).map(ex=>{const movement=dictionary.find(d=>d.name===ex.name);return movement.agonist||movement.group;}));
      for(const group of ['Peitoral','Costas','Bíceps','Tríceps','Quadríceps','Core'])assert.ok(groups.has(group),method+': '+group);
    }
  }
});
