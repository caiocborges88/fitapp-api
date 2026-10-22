import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(new URL('../functions/package.json',import.meta.url));
test('recompensa é concedida uma única vez em chamadas concorrentes',{skip:!process.env.FIRESTORE_EMULATOR_HOST},async()=>{
  const {initializeApp,deleteApp}=require('firebase-admin/app');
  const {getFirestore}=require('firebase-admin/firestore');
  const {createRewardService}=require('./rewards.js');
  const catalogue=require('./catalogue.json');
  const app=initializeApp({projectId:'demo-fitapp-rewards'},'reward-test');
  const db=getFirestore(app);const reward=createRewardService(db,catalogue);
  const user={uid:'reward-user',name:'Teste'};
  try{
    await db.doc('jogadores/reward-user').delete();await db.doc('recompensas/reward-user_session-test').delete();
    await db.doc('treinos_concluidos/session-test').set({userId:user.uid,complete:true,duration_secs:180});
    const results=await Promise.all([reward(user,'session-test','claim'),reward(user,'session-test','claim')]);
    assert.equal(results[0].drawn.id,results[1].drawn.id);
    const player=(await db.doc('jogadores/reward-user').get()).data();assert.equal(player.album.length,1);assert.equal(player.repetidas,0);
    const publicProfile=(await db.doc('rankings/reward-user').get()).data();assert.ok(!('email'in publicProfile));assert.ok(!('album'in publicProfile));
    await assert.rejects(reward({uid:'other'},'session-test','claim'));
    await db.doc('jogadores/reward-user').set({repetidas:6},{merge:true});
    await db.doc('recompensas/reward-user_craft_craft-test').delete();
    const crafted=await Promise.all([reward(user,'craft-test','craft'),reward(user,'craft-test','craft')]);
    assert.equal(crafted[0].drawn.id,crafted[1].drawn.id);
    assert.equal((await db.doc('jogadores/reward-user').get()).data().repetidas,3);
  }finally{await deleteApp(app);}
});
