const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const errors=[];
 try{
  const contexts=await Promise.all([browser.newContext(),browser.newContext()]);
  const pages=await Promise.all(contexts.map(c=>c.newPage()));const [a,b]=pages;
  for(const page of pages){page.on('pageerror',e=>errors.push(e.message));page.on('console',message=>{if(message.type()==='warning'||message.type()==='error')console.log(message.text().slice(0,400));});page.on('dialog',d=>d.accept());await page.goto('http://127.0.0.1:5000/?emulator=1');await page.waitForFunction(()=>window.FitApp);}
  const email=`sync-${Date.now()}@example.invalid`;
  await a.evaluate(email=>firebase.auth().createUserWithEmailAndPassword(email,'test-password-123'),email);
  await b.evaluate(email=>firebase.auth().signInWithEmailAndPassword(email,'test-password-123'),email);
  for(const page of pages)await page.waitForFunction(()=>FitStore.get('fitapp_cloud_base'));
  await a.evaluate(async()=>{
   FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'shared',name:'Original',revision:1,routine:[{title:'Bloco',type:'traditional',exercises:[{id:'ex',name:'Supino Reto',sets:3,target:10}]}]}]));
   await(await import('/js/sync.js')).saveCampaignToCloud();
  });
  await b.evaluate(async()=>{await(await import('/js/sync.js')).loadCampaignFromCloud();});
  // Both devices edit from the same acknowledged baseline.
  await Promise.all(pages.map((page,index)=>page.evaluate(async index=>{
   const templates=JSON.parse(FitStore.get('fitapp_custom_workouts'));templates[0].name=index?'Dispositivo B':'Dispositivo A';templates[0].revision++;
   FitStore.set('fitapp_custom_workouts',JSON.stringify(templates));await(await import('/js/sync.js')).saveCampaignToCloud();
  },index)));
  const saved=await a.evaluate(async()=>{await(await import('/js/sync.js')).loadCampaignFromCloud();return JSON.parse(FitStore.get('fitapp_custom_workouts'));});
  if(saved.length!==2)console.log('sync diagnostics',await Promise.all(pages.map(p=>p.evaluate(()=>({dirty:FitStore.get('fitapp_campaign_dirty'),base:FitStore.get('fitapp_cloud_base'),templates:FitStore.get('fitapp_custom_workouts')})))));
  assert.equal(saved.length,2);assert.equal(new Set(saved.map(t=>t.id)).size,2);assert.ok(saved.some(t=>t.name.includes('cópia de conflito')));
  // Lost acknowledgement: the transaction committed but its response was lost.
  await a.evaluate(async()=>{
   const sync=await import('/js/sync.js');const db=firebase.firestore(),original=db.runTransaction.bind(db);let once=true;
   db.runTransaction=async fn=>{const result=await original(fn);if(once){once=false;throw Error('resposta perdida após commit');}return result;};
   FitStore.set('fitapp_campaign_count','1');await sync.saveCampaignToCloud();
   if(!FitStore.get('fitapp_campaign_dirty'))throw Error('A operação deve aguardar confirmação');
   db.runTransaction=original;
   // Uma nova alteração chega antes da confirmação da anterior.
   FitStore.set('fitapp_campaign_count','2');await sync.saveCampaignToCloud();
   if(FitStore.get('fitapp_campaign_count')!=='2'||FitStore.get('fitapp_campaign_dirty'))throw Error('Contagem duplicada ou envio não confirmado');
  });
  await b.evaluate(async()=>{await(await import('/js/sync.js')).loadCampaignFromCloud();});
  await a.evaluate(async()=>{
   FitStore.set('fitapp_deleted_templates','["shared"]');FitStore.set('fitapp_custom_workouts',JSON.stringify(JSON.parse(FitStore.get('fitapp_custom_workouts')).filter(t=>t.id!=='shared')));
   await(await import('/js/sync.js')).saveCampaignToCloud();
  });
  await b.evaluate(async()=>{await(await import('/js/sync.js')).saveCampaignToCloud();});
  assert.ok(!(await b.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts')))).some(t=>t.id==='shared'));
  // Seed enough sessions to cross two page boundaries using client security rules.
  await a.evaluate(async()=>{
   const db=firebase.firestore(),uid=FitStore.uid;
   for(let start=0;start<115;start+=10){const batch=db.batch();
   for(let i=start;i<Math.min(start+10,115);i++)batch.set(db.collection('treinos_concluidos').doc(`history-${uid}-${i}`),{userId:uid,date:'2026-10-15',tipo:'A',workoutName:`Ficha ${i}`,method:'abc',duration_secs:60,data:[{exercise:'Supino Reto',kg:20,reps:10}],createdAt:Date.now()+i,complete:true,campaignId:null,timestamp:firebase.firestore.FieldValue.serverTimestamp()});
   await batch.commit();}
  });
  const pagination=await a.evaluate(async()=>{
   const first=await FitAPI.carregarHistoricoNuvem(),all=await FitAPI.carregarHistoricoCompleto(),second=await FitAPI.carregarHistoricoPagina(),third=await FitAPI.carregarHistoricoPagina();
   FitStore.set('fitapp_week_log',JSON.stringify(first));
   return{sizes:[first.length,second.length,third.length],unique:new Set([...first,...second,...third].map(s=>s._id)).size,all:all.length,more:FitAPI.temMaisHistorico(),id:first[0]._id};
  });
  assert.deepEqual(pagination.sizes,[50,50,15]);assert.equal(pagination.unique,115);assert.equal(pagination.all,115);assert.equal(pagination.more,false);
  await a.evaluate(async id=>{await FitAPI.deletarTreino(id);},pagination.id);
  const resurrected=await b.evaluate(async id=>{
   await FitAPI.carregarExclusoes();
   const result=await FitAPI.salvarTreino({_id:id,userId:FitStore.uid,date:'2026-10-15',tipo:'A',method:'abc',duration_secs:60,data:[{exercise:'Supino Reto',kg:20,reps:10}],complete:true});
   return{result,deleted:JSON.parse(FitStore.get('fitapp_deleted_sessions'))};
  },pagination.id);
  assert.equal(resurrected.result.deleted,true);assert.ok(resurrected.deleted.includes(pagination.id));
  const offlineId=await a.evaluate(id=>JSON.parse(FitStore.get('fitapp_week_log')).find(item=>item._id!==id)._id,pagination.id);
  await contexts[0].setOffline(true);
  await a.evaluate(async id=>{await FitApp.deleteHistoryLog(id);},offlineId);
  assert.ok(await a.evaluate(id=>JSON.parse(FitStore.get('fitapp_sync_queue')).some(item=>item._id===id&&item._action==='delete'),offlineId));
  // A consulta completa não pode apresentar cache parcial como exportação completa.
  const offlineExport=await a.evaluate(async()=>{try{await FitAPI.carregarHistoricoCompleto();return false;}catch{return true;}});
  assert.equal(offlineExport,true);
  await contexts[0].setOffline(false);
  await a.waitForFunction(()=>JSON.parse(FitStore.get('fitapp_sync_queue')||'[]').length===0);
  const deletedOffline=await b.evaluate(async()=>FitAPI.carregarExclusoes());assert.ok(deletedOffline.includes(offlineId));
  await a.evaluate(()=>FitApp.switchTab('tab-perfil','nav-perfil'));
  const downloaded=a.waitForEvent('download');await a.click('#exportTrainingData');const download=await downloaded;
  const exported=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(exported.format,'fitapp-backup');assert.equal(exported.history.length,113);assert.equal(exported.userId,await a.evaluate(()=>FitStore.uid));
  // Plan conflicts are visible and the preserved local version can be restored explicitly.
  await a.evaluate(()=>{
   FitStore.set('fitapp_sync_conflicts',JSON.stringify([{id:'plan-choice',kind:'plan',local:{campaign_data:'{"id":"restored-plan","workouts":{}}',campaign_count:'3',main_method:'abc',profile:'hipertrofia',level:'iniciante',blacklist:'[]'}}]));
   FitApp.switchTab('tab-workouts','nav-workouts');
  });
  await a.getByRole('button',{name:'Usar minha versão preservada'}).click();
  await a.waitForFunction(()=>JSON.parse(FitStore.get('fitapp_campaign_data')||'null')?.id==='restored-plan');
  // New recipes round-trip through real emulated rules without flattening per-block metadata.
  await a.evaluate(async()=>{
   const {executeForgePlan}=await import('/js/forge.js');
   const workouts=executeForgePlan('abc_sinergista',[],{environment:'academia',allEquipment:true});
   const plan={id:'models-sync',schemaVersion:2,modelVersion:1,method:'abc_sinergista',level:'padrao',profile:'hipertrofia',workouts,revision:1,startDate:new Date().toISOString()};
   FitStore.setMany({fitapp_campaign_data:JSON.stringify(plan),fitapp_main_method:plan.method,fitapp_level:'padrao',fitapp_profile:'hipertrofia'});
   await(await import('/js/sync.js')).saveCampaignToCloud();
  });
  const modelCopy=await b.evaluate(async()=>{await(await import('/js/sync.js')).loadCampaignFromCloud();return JSON.parse(FitStore.get('fitapp_campaign_data'));});
  assert.equal(modelCopy.id,'models-sync');assert.equal(modelCopy.modelVersion,1);assert.equal(modelCopy.workouts.A[0].restSeconds,120);
  assert.equal(modelCopy.workouts.B.at(-1).exercises[0].sideMode,'alternating');
  // The immutable session context also survives real rules, another device and export.
  const trackingId='tracking-context-'+Date.now();
  const trackingSource=await a.evaluate(async id=>{
   const {snapshotRoutine,encodeTrainingContext}=await import('/js/training-tracking.js');
   const {completedSets}=await import('/js/domain.js');
   const plan=JSON.parse(FitStore.get('fitapp_campaign_data')),routine=structuredClone(plan.workouts.A);
   const planned=snapshotRoutine(routine,window.dictionaryData);
   routine[0].exercises[0].setsData=[{checked:true,kg:20,reps:10}];
   const trainingContext=encodeTrainingContext(planned,routine,window.dictionaryData,{[routine[0].id]:150});
   await FitAPI.salvarTreino({_id:id,userId:FitStore.uid,date:'2026-10-29',tipo:'A',method:plan.method,duration_secs:180,data:completedSets(routine),complete:false,campaignId:plan.id,trainingContext});
   return trainingContext;
  },trackingId);
  const tracked=await b.evaluate(async id=>{
   const logs=await FitAPI.carregarHistoricoNuvem(),log=logs.find(item=>item._id===id);
   return {context:log.trainingContext,comparison:(await import('/js/training-tracking.js')).compareSession(log)};
  },trackingId);
  assert.equal(tracked.context,trackingSource);assert.equal(tracked.comparison.rows[0].done,1);assert.equal(tracked.comparison.rows[0].planned,3);assert.equal(tracked.comparison.rows[0].restSeconds,150);
  await a.evaluate(()=>FitApp.switchTab('tab-perfil','nav-perfil'));
  const contextDownload=a.waitForEvent('download');await a.click('#exportTrainingData');
  const contextBackup=JSON.parse(fs.readFileSync(await(await contextDownload).path(),'utf8'));
  assert.equal(contextBackup.history.find(item=>item._id===trackingId).trainingContext,trackingSource);
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.resolve(__dirname,'../audit/sync-browser-validation.json'),JSON.stringify({status:'ok',project:'demo-fitapp',productionWrites:false,checks:['dois dispositivos concorrentes','cópia de conflito independente','resposta perdida após commit seguida de nova edição sem duplicar progresso','exclusão não reaparece','115 sessões paginadas sem lacunas','cursor de exportação independente','exclusão permanente de sessão','exclusão offline e retomada','exportação completa recusada offline','exportação JSON com 113 sessões','escolha explícita do plano preservado'],pageErrors:errors},null,2)+'\n');
  console.log('Sincronização, paginação e exportação validadas em dois dispositivos com emuladores.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
