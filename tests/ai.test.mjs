import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {createWorkoutGenerator}=require('../functions/ai.js');
const catalogue={exercises:[{name:'Flexão',equip:'Peso Corporal'},{name:'Supino',equip:'Barra'}]};
const valid=[{nome_treino:'A',exercicios:[{nome:'Flexão',series:3,repeticoes:'10-12'}]}];
test('IA rejeita exercícios fora do catálogo ou do ambiente e séries inválidas',async()=>{
  for(const exercise of [{nome:'Inventado',series:3,repeticoes:'10'},{nome:'Supino',series:3,repeticoes:'10'},{nome:'Flexão',series:-1,repeticoes:'10'}]){
    const generate=createWorkoutGenerator(catalogue,()=>({models:{generateContent:async()=>({text:JSON.stringify([{nome_treino:'A',exercicios:[exercise]}])})}}));
    await assert.rejects(generate('Teste',{env:'peso_corporal'}));
  }
});
test('IA usa contingência somente para falha transitória e valida o resultado',async()=>{
  const requested=[];
  const generate=createWorkoutGenerator(catalogue,()=>({models:{generateContent:async request=>{
    requested.push(request.model);if(requested.length===1)throw Object.assign(Error('busy'),{status:503});return{text:JSON.stringify(valid)};
  }}}));
  assert.deepEqual(await generate('Teste',{env:'peso_corporal'}),valid);assert.equal(requested.length,2);assert.notEqual(requested[0],requested[1]);
});
