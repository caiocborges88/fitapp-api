import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {createApp}=require('../functions/app.js');
test('API autentica, valida entradas, aplica quotas e esconde erros internos',async()=>{
  let generated=0;let quota=0;
  const app=createApp({aiPolicy:{workouts:true,coach:true},verifyToken:async token=>{if(token!=='valid')throw Error('secret');return{uid:'a'};},useQuota:async()=>{if(++quota>2)throw Object.assign(Error('private'),{status:429});},generateWorkout:async()=>{generated++;return[{nome_treino:'A',exercicios:[]}];},coach:async()=>'Mensagem',reward:async()=>{throw Error('secret');}});
  const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
  const url=`http://127.0.0.1:${server.address().port}/api`;
  try{
    assert.equal((await fetch(url+'/coach')).status,401);
    assert.equal((await fetch(url+'/coach',{headers:{Authorization:'Bearer invalid'}})).status,401);
    assert.equal((await fetch(url+'/importar-treino-ia',{method:'POST',headers:{Authorization:'Bearer valid','Content-Type':'application/json'},body:JSON.stringify({texto:123})})).status,400);
    assert.equal(generated,0);
    assert.equal((await fetch(url+'/importar-treino-ia',{method:'POST',headers:{Authorization:'Bearer valid','Content-Type':'application/json'},body:JSON.stringify({texto:'Treino A'})})).status,200);
    const failure=await fetch(url+'/recompensas',{method:'POST',headers:{Authorization:'Bearer valid','Content-Type':'application/json'},body:JSON.stringify({sessionId:'test'})});
    assert.equal(failure.status,503);assert.ok(!(await failure.text()).includes('secret'));
    assert.equal((await fetch(url+'/coach',{headers:{Authorization:'Bearer valid'}})).status,429);
    assert.equal(generated,1);
  }finally{await new Promise(r=>server.close(r));}
});

test('política atual bloqueia toda IA antes de quota/provedor e mantém recompensas disponíveis',async()=>{
  let quota=0,generated=0,coached=0;
  const app=createApp({verifyToken:async()=>({uid:'a'}),useQuota:async()=>{quota++;},generateWorkout:async()=>{generated++;return[];},coach:async()=>{coached++;return'Mensagem';},reward:async()=>({ok:true})});
  const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
  const url=`http://127.0.0.1:${server.address().port}/api`,headers={Authorization:'Bearer valid','Content-Type':'application/json'};
  try{
    for(const path of ['/coach','/importar-treino-ia']){
      const response=await fetch(url+path,{headers,...(path.includes('importar')?{method:'POST',body:JSON.stringify({texto:'Crie um treino'})}:{})});
      assert.equal(response.status,409);assert.equal((await response.json()).code,'ai-deferred');
    }
    assert.equal(quota,0);assert.equal(generated,0);assert.equal(coached,0);
    assert.equal((await fetch(url+'/coach')).status,401);
    const rewards=await fetch(url+'/recompensas',{method:'POST',headers,body:JSON.stringify({sessionId:'sample'})});
    assert.equal(rewards.status,200);assert.equal(quota,1);
  }finally{await new Promise(resolve=>server.close(resolve));}
});
