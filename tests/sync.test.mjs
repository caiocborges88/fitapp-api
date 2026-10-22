import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const data={};
const localStorage={getItem:k=>data[k]??null,setItem:(k,v)=>{data[k]=String(v);},removeItem:k=>{delete data[k];}};
globalThis.window={};
globalThis.firebase={auth:()=>({currentUser:{uid:'a'}})};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/storage.js',import.meta.url),'utf8'),{window,localStorage,navigator,crypto});
window.FitStore.bindUser('a');
window.FitApp={safeGet:window.FitStore.get};
const {syncOfflineWorkouts}=await import('../public/js/sync.js');
test('sincronização concorrente envia uma vez e preserva novo item',async()=>{
  const first={_id:'1',userId:'a',date:'2026-10-15'};
  window.FitStore.set('fitapp_sync_queue',JSON.stringify([first]));
  const sent=[];
  window.FitAPI={salvarTreino:async payload=>{
    sent.push(payload._id);
    if(payload._id==='1')await window.FitStore.updateQueue(q=>[...q,{_id:'2',userId:'a',date:'2026-10-15'}]);
    await new Promise(r=>setTimeout(r,5));return{id:payload._id};
  }};
  await Promise.all([syncOfflineWorkouts(),syncOfflineWorkouts()]);
  assert.deepEqual(sent,['1','2']);assert.equal(window.FitStore.readJSON('fitapp_sync_queue',[]).length,0);
  assert.equal(window.FitStore.readJSON('fitapp_week_log',[]).length,2);
});
test('contas distintas não enxergam fila/histórico uma da outra',()=>{
  window.FitStore.bindUser('b');assert.equal(window.FitStore.get('fitapp_week_log'),null);
  window.FitStore.bindUser('a');assert.ok(window.FitStore.get('fitapp_week_log'));
});
test('rede indisponível preserva a fila original',async()=>{
  window.FitStore.set('fitapp_sync_queue',JSON.stringify([{_id:'offline',userId:'a',date:'2026-10-15'}]));
  window.FitAPI={salvarTreino:async()=>{throw Error('offline');}};
  await syncOfflineWorkouts();assert.equal(window.FitStore.readJSON('fitapp_sync_queue',[])[0]._id,'offline');
});
test('exclusão solicitada durante envio permanece na fila e não reaparece',async()=>{
  window.FitStore.set('fitapp_sync_queue',JSON.stringify([{_id:'race',userId:'a',date:'2026-10-15'}]));
  const deleted=[];
  window.FitAPI={salvarTreino:async()=>{
    await window.FitStore.updateQueue(q=>[...q,{_id:'race',userId:'a',_action:'delete'}]);
    window.FitStore.set('fitapp_deleted_sessions','["race"]');return{id:'race'};
  },deletarTreino:async id=>deleted.push(id)};
  await syncOfflineWorkouts();assert.deepEqual(deleted,['race']);
  assert.equal(window.FitStore.readJSON('fitapp_sync_queue',[]).length,0);
  assert.ok(!window.FitStore.readJSON('fitapp_week_log',[]).some(item=>item._id==='race'));
});
