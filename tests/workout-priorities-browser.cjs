const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');
const legacy=require('./fixtures/legacy-calisthenics.cjs');
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;const checks=[];
 try{
  browser=await chromium.launch({channel:'msedge',headless:true});
  async function run(name,test){
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
   await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
   const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
   try{
    await page.goto(`http://127.0.0.1:${server.address().port}`);await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
    await test(page);assert.deepEqual(errors,[]);checks.push(name);console.log('OK: '+name);
   }finally{await context.close();}
  }
  await run('geração inválida preserva plano, contador e preferências',async page=>{
   const result=await page.evaluate(()=>{
    document.getElementById('mainMethodSelector').value='abc';document.getElementById('profileSelector').value='hipertrofia';document.getElementById('levelSelector').value='iniciante';
    FitApp.lockCampaign();FitApp.safeSet('fitapp_campaign_count','5');
    const before=FitStore.get('fitapp_campaign_data');
    if(!JSON.parse(before).workouts.A.length)throw Error('Plano inicial inválido');
    FitApp.safeSet('fitapp_blacklist',JSON.stringify(dictionaryData.filter(ex=>ex.agonist==='Core').map(ex=>ex.name)));
    document.getElementById('mainMethodSelector').value='abcd';FitApp.lockCampaign();
    return {preserved:FitStore.get('fitapp_campaign_data')===before,count:FitStore.get('fitapp_campaign_count'),method:FitStore.get('fitapp_main_method'),message:document.getElementById('toast').textContent};
   });
   assert.equal(result.preserved,true);assert.equal(result.count,'5');assert.equal(result.method,'abc');assert.match(result.message,/abdominal/);
  });
  await run('quota local preserva plano e reverte contador e preferências',async page=>{
   const result=await page.evaluate(()=>{
    document.getElementById('mainMethodSelector').value='abc';document.getElementById('profileSelector').value='hipertrofia';document.getElementById('levelSelector').value='iniciante';FitApp.lockCampaign();FitApp.safeSet('fitapp_campaign_count','5');
    const keys=['campaign_data','campaign_count','main_method','profile','level'],snapshot=()=>Object.fromEntries(keys.map(key=>[key,FitStore.get('fitapp_'+key)])),before=snapshot();
    const original=Storage.prototype.setItem;let fail=true;
    Storage.prototype.setItem=function(key,value){if(fail&&key.endsWith(':fitapp_campaign_data')){fail=false;throw new DOMException('simulated quota','QuotaExceededError');}return original.call(this,key,value);};
    try{document.getElementById('mainMethodSelector').value='abcd';FitApp.lockCampaign();}
    finally{Storage.prototype.setItem=original;}
    return {before,after:snapshot(),message:document.getElementById('toast').textContent};
   });
   assert.deepEqual(result.after,result.before);assert.match(result.message,/anterior foi mantido/);
  });
  await run('modal respeita exclusão e mantém o plano quando o ciclo não pode fechar',async page=>{
   const result=await page.evaluate(async()=>{
    FitApp.lockCampaign();const previous=FitStore.get('fitapp_campaign_data');FitApp.safeSet('fitapp_blacklist',JSON.stringify(['Cadeira Extensora']));
    document.getElementById('profileSelector').value='hipertrofia';document.getElementById('levelSelector').value='iniciante';
    FitApp.openForgeModal();document.getElementById('forgeMethod').value='ppl';FitApp.generateForgedWorkout();
    const {state}=await import('/js/state.js');return {same:previous===FitStore.get('fitapp_campaign_data'),open:document.getElementById('forgeModal').style.display==='flex',kind:state.editorContext?.kind,message:document.getElementById('toast').textContent};
   });
   assert.equal(result.same,true);assert.equal(result.open,true);assert.notEqual(result.kind,'cycle');assert.match(result.message,/Reto Femoral/);
  });
  await run('série por tempo inicia em segundos e registra duração sem repetições fictícias',async page=>{
   await page.evaluate(()=>{FitStore.set('fitapp_global_env','casa');FitApp.updateEnvUI();FitApp.startWorkout('Casa');FitApp.beginWorkoutExecution();});
   const row=page.locator('#exerciseList .exercise-block').last().locator('.set-row').first();
   assert.equal(await row.locator('.set-measure').inputValue(),'duration');assert.equal(await row.locator('.btn-iso').isDisabled(),false);
   await row.locator('.rp-val').fill('25');await row.locator('.chk-set').check();
   const log=await page.evaluate(async()=>{const {state}=await import('/js/state.js');return (await import('/js/domain.js')).completedSets(state.currentRoutine);});
   assert.equal(log.length,1);assert.equal(log[0].durationSecs,25);assert.equal(log[0].measurementType,'duration');assert.equal(log[0].reps,0);
   await page.screenshot({path:'audit/priorities-duration-mobile.png',fullPage:true});
  });
  await run('barras desmarcadas bloqueiam circuito dependente e não geram sessão incompleta',async page=>{
   const result=await page.evaluate(async()=>{
    FitApp.openForgeModal();document.getElementById('forgeMethod').value='circuito';
    for(const chip of document.querySelectorAll('.forge-equip-chip'))chip.classList.toggle('active',chip.dataset.equip==='Peso_Corporal');
    FitApp.generateForgedWorkout();
    const rejected=document.getElementById('forgeModal').style.display==='flex',reason=document.getElementById('toast').textContent;
    document.querySelector('[data-equip="Calistenia"]').classList.add('active');FitApp.generateForgedWorkout();
    const {state}=await import('/js/state.js');return {rejected,reason,kind:state.editorContext.kind,days:new Set(state.currentRoutine.map(block=>block.day)).size,count:state.currentRoutine.filter(block=>block.day==='A').flatMap(block=>block.exercises).length};
   });
   assert.equal(result.rejected,true);assert.match(result.reason,/Latíssimo/);assert.equal(result.kind,'cycle');assert.equal(result.days,3);assert.equal(result.count,8);
  });
  await run('calistenia retirada; legado preservado e movimentos continuam nas trocas de Casa',async page=>{
   for(const selector of ['#mainMethodSelector','#forgeMethod'])assert.equal(await page.locator(selector+' option[value="calistenia"]').count(),0);
   const workouts=legacy();
   await page.evaluate(async workouts=>{
    const plan={id:'legacy-calisthenics',method:'calistenia',profile:'hipertrofia',level:'iniciante',workouts};
    for(const [key,value]of Object.entries({campaign_data:JSON.stringify(plan),campaign_count:'5',main_method:'calistenia',profile:'hipertrofia',level:'iniciante'}))FitApp.safeSet('fitapp_'+key,value);
    await(await import('/js/sync.js')).saveCampaignToCloud();
   },workouts);
   await page.reload();await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
   assert.equal(await page.locator('#mainMethodSelector').inputValue(),'calistenia');
   assert.equal(await page.locator('#mainMethodSelector option:checked').evaluate(option=>option.hidden&&option.disabled),true);
   await page.evaluate(()=>{FitStore.set('fitapp_global_env','casa');FitStore.set('fitapp_resources_casa',JSON.stringify(['bench','pullup-bar']));FitApp.updateEnvUI();FitApp.startWorkout('A');});
   const result=await page.evaluate(async()=>({campaign:JSON.parse(FitStore.get('fitapp_campaign_data')),count:FitStore.get('fitapp_campaign_count'),routine:(await import('/js/state.js')).state.currentRoutine}));
   assert.deepEqual(result.campaign.workouts,workouts);assert.equal(result.count,'5');
   assert.ok(result.routine.flatMap(block=>block.exercises).some(ex=>ex.name==='Rosca Corporal Sentada com Resistência da Perna'));
   assert.equal(await page.locator('.environment-warning').count(),0);
   await page.evaluate(()=>FitApp.beginWorkoutExecution());assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
   await page.evaluate(()=>window.abortarMissao());
   await page.evaluate(()=>{
    FitStore.set('fitapp_global_env','academia');
    FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'free',name:'Ficha livre',routine:[{type:'traditional',exercises:[{name:'Supino Reto com Barra',sets:3,target:'10 rep'}]}]}]));
    FitApp.startWorkout('custom_free');FitApp.openSwapModal(0,0);
   });
   assert.ok((await page.locator('#swapModal .swap-item-name').allTextContents()).includes('Supino Reto com Halteres'));
   await page.evaluate(()=>{document.getElementById('swapModal').style.display='none';FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env','casa');FitStore.set('fitapp_resources_casa','[]');FitApp.startWorkout('custom_free');});
   assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine[0].exercises[0].name),'Flexão de Braço (Padrão)');
   assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts'))[0].routine[0].exercises[0].name),'Supino Reto com Barra');
  });
  await run('trocas sugeridas ao iniciante respeitam complexidade e a ficha pessoal não herda método global',async page=>{
   const result=await page.evaluate(async()=>{
    document.getElementById('mainMethodSelector').value='abc';document.getElementById('levelSelector').value='iniciante';
    FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'beginner',name:'Puxada inicial',routine:[{type:'traditional',exercises:[{name:'Barra Fixa com Apoio dos Pés',sets:3,target:'8 rep'}]}]}]));
    FitApp.startWorkout('custom_beginner');FitApp.openSwapModal(0,0);
    const suggestions=[...document.querySelectorAll('#swapModal .swap-item-name')].map(el=>el.textContent.trim());
    FitApp.confirmSwap(0,0,'Barra Fixa Pronada (Pull-up)');
    return {advanced:suggestions.filter(name=>dictionaryData.find(ex=>ex.name===name)?.nivel===3),after:(await import('/js/state.js')).state.currentRoutine[0].exercises[0].name};
   });
   assert.deepEqual(result.advanced,[]);assert.equal(result.after,'Barra Fixa com Apoio dos Pés');
  });
  await run('carga textual antiga exige revisão da meta e não impede restaurar o original',async page=>{
   await page.evaluate(()=>{
    FitStore.set('fitapp_global_env','casa');FitStore.set('fitapp_resources_casa',JSON.stringify(['balance-support']));
    FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'loaded',name:'Panturrilha com carga',routine:[{type:'traditional',exercises:[{name:'Panturrilha Sentado (Máquina)',sets:3,target:'15 rep com 50 kg'}]}]}]));
    FitApp.startWorkout('custom_loaded');FitApp.beginWorkoutExecution();
   });
   assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),false);
   assert.match(await page.locator('.environment-warning').textContent(),/carga do equipamento anterior/);
   const target=page.locator('.editor-target').first();await target.fill('15 rep');await target.dispatchEvent('change');
   assert.equal(await page.locator('.environment-warning').count(),0);
   await page.evaluate(()=>FitApp.beginWorkoutExecution());assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
   await page.evaluate(()=>window.abortarMissao());
   const original=await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts'))[0].routine[0].exercises[0]);
   assert.equal(original.name,'Panturrilha Sentado (Máquina)');assert.equal(original.target,'15 rep com 50 kg');
  });
  await run('ficha salva mostra exclusão posterior, revalida ao iniciar e permite corrigir só a sessão',async page=>{
   const snapshot=await page.evaluate(()=>{
    FitStore.set('fitapp_global_env','academia');
    const saved=[{id:'review',name:'Minha ficha preservada',routine:[{title:'Peito',type:'traditional',exercises:[{name:'Supino Reto com Barra',sets:3,target:'10 rep'}]}]}];
    FitStore.set('fitapp_custom_workouts',JSON.stringify(saved));FitApp.startWorkout('custom_review');
    FitStore.set('fitapp_blacklist',JSON.stringify(['Supino Reto com Barra']));FitApp.beginWorkoutExecution();
    return FitStore.get('fitapp_custom_workouts');
   });
   assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),false);
   assert.match(await page.locator('#routineReview').textContent(),/lista de exercícios excluídos/);
   await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));
   await page.screenshot({path:'audit/saved-routine-review-mobile.png',fullPage:true});
   await page.evaluate(()=>FitApp.openSwapModal(0,0));
   assert.ok(!(await page.locator('#swapModal .swap-item-name').allTextContents()).includes('Supino Reto com Barra'));
   await page.evaluate(()=>FitApp.confirmSwap(0,0,'Supino Reto com Halteres'));
   assert.equal(await page.locator('#routineReview').count(),0);
   await page.evaluate(()=>FitApp.beginWorkoutExecution());
   assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
   assert.equal(await page.evaluate(()=>FitStore.get('fitapp_custom_workouts')),snapshot);
  });
  await run('academia sinaliza cadastro desconhecido e bloco corporal inválido antes de começar',async page=>{
   await page.setViewportSize({width:1280,height:900});
   await page.evaluate(()=>{
    FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'invalid',name:'Legado com pendências',routine:[{title:'Bloco antigo',type:'traditional',equipmentPolicy:'bodyweight',exercises:[{name:'Cadastro removido',sets:3,target:'10 rep'},{name:'Supino Reto com Barra',sets:3,target:'10 rep'}]}]}]));
    FitApp.startWorkout('custom_invalid');FitApp.beginWorkoutExecution();
   });
   assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),false);
   const review=await page.locator('#routineReview').textContent();assert.match(review,/não encontrado no catálogo/);assert.match(review,/tipo de equipamento/);
   assert.equal(await page.locator('#routineReview li').count(),2);
   await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));
   await page.screenshot({path:'audit/saved-routine-review-desktop.png',fullPage:true});
  });
  fs.writeFileSync('audit/workout-priorities-validation.json',JSON.stringify({status:'ok',environment:'local Edge; Firebase simulated',checks},null,2)+'\n');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
