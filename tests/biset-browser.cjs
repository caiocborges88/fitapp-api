const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try{
  browser=await chromium.launch({channel:'msedge',headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
  await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
  const page=await context.newPage(),errors=[],checks=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('dialog',dialog=>dialog.accept());
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  for(const selector of ['#mainMethodSelector','#forgeMethod']){
   assert.deepEqual(await page.locator(selector+' option').evaluateAll(options=>options.filter(option=>option.value.startsWith('biset_')).map(option=>({value:option.value,label:option.textContent}))),[{value:'biset_sinergista',label:'Bi-set complementar'}]);
  }
  for(const method of ['biset_sinergista']){
   const result=await page.evaluate(async method=>{
    FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env','academia');
    document.getElementById('profileSelector').value='hipertrofia';document.getElementById('levelSelector').value='iniciante';
    FitApp.openForgeModal();document.getElementById('forgeMethod').value=method;FitApp.generateForgedWorkout();
    const {state}=await import('/js/state.js');
    return {kind:state.editorContext.kind,blocks:state.currentRoutine.filter(block=>block.type==='superset').map(block=>({day:block.day,names:block.exercises.map(ex=>ex.name),groups:block.exercises.map(ex=>dictionaryData.find(item=>item.name===ex.name).agonist)}))};
   },method);
   assert.equal(result.kind,'cycle');
   assert.equal(result.blocks.length,12);
   for(const block of result.blocks){
    assert.equal(block.names.length,2);assert.notEqual(block.names[0],block.names[1]);
    if(method==='biset_sinergista'&&block.day==='B')assert.deepEqual(block.groups,['Costas','Bíceps']);
   }
   checks.push(method+' · pares completos em academia');
   await page.click('#saveTemplateButton');
   await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env','casa');FitStore.set('fitapp_resources_casa','[]');FitApp.startWorkout('A');});
   const rejected=await page.evaluate(async method=>{
    const {state}=await import('/js/state.js');
    const source=JSON.stringify(state.currentRoutine),saved=FitStore.get('fitapp_campaign_data');
    FitApp.openForgeModal();document.getElementById('forgeMethod').value=method;FitApp.generateForgedWorkout();
    return {unchanged:source===JSON.stringify(state.currentRoutine),saved:saved===FitStore.get('fitapp_campaign_data'),open:document.getElementById('forgeModal').style.display==='flex',message:document.getElementById('toast').textContent};
   },method);
   assert.equal(rejected.unchanged,true);assert.equal(rejected.saved,true);assert.equal(rejected.open,true);assert.match(rejected.message,/Par/);
   checks.push(method+' · falha preserva plano e prévia');
   await page.evaluate(()=>{document.getElementById('forgeModal').style.display='none';FitApp.cancelWorkoutPreview();});
  }
  // The editor and execution reject repeated exercises even for a legacy saved pair.
  await page.evaluate(()=>{
   FitStore.set('fitapp_global_env','academia');
   FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'same',name:'Par repetido',routine:[{type:'superset',exercises:[{name:'Supino Reto com Barra',sets:3,target:'10 rep'},{name:'Supino Reto com Barra',sets:3,target:'10 rep'}]}]}]));
   FitApp.startWorkout('custom_same');FitApp.beginWorkoutExecution();
  });
  assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),false);
  assert.match(await page.locator('#toast').textContent(),/movimentos distintos/);
  // One compatible home alternative cannot silently occupy both sides of an adapted pair.
  await page.evaluate(()=>{
   FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env','praia');FitStore.set('fitapp_resources_praia',JSON.stringify(['bench']));
   FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'adapt',name:'Par inclinado',routine:[{type:'superset',exercises:[{name:'Supino Inclinado com Barra',sets:3,target:'10 rep'},{name:'Supino Inclinado com Halteres',sets:3,target:'10 rep'}]}]}]));
   FitApp.startWorkout('custom_adapt');FitApp.beginWorkoutExecution();
  });
  assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),false);
  assert.equal(await page.locator('.environment-warning').count(),1);
  assert.match(await page.locator('.environment-warning').textContent(),/segundo movimento distinto/);
  for(const [index,names]of [
   ['Supino Reto com Barra','Crucifixo Reto com Halteres'],
   ['Supino Reto com Barra','Remada Curvada com Barra'],
   ['Rosca Direta com Barra','Agachamento com peso corporal']
  ].entries()){
   const name='Par manual '+index;
   await page.evaluate(names=>{
    FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env','academia');FitApp.createManualWorkout();
    for(const exercise of names){FitApp.openAddExerciseModal();document.getElementById('selectedExerciseName').textContent=exercise;document.getElementById('customSets').value='3';document.getElementById('customReps').value='10 rep';FitApp.confirmAddExercise();}
    FitEditor.changeBlock(0,'type','superset');
   },names);
   assert.equal(await page.locator('[data-block-type]').first().inputValue(),'superset');
   await page.fill('#customWorkoutName',name);await page.click('#saveTemplateButton');
   const saved=await page.evaluate(name=>JSON.parse(FitStore.get('fitapp_custom_workouts')).find(item=>item.name===name),name);
   assert.deepEqual(saved.routine[0].exercises.map(ex=>ex.name),names);
   await page.evaluate(id=>{FitApp.cancelWorkoutPreview();FitApp.startWorkout('custom_'+id);FitApp.beginWorkoutExecution();},saved.id);
   assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
   await page.evaluate(()=>window.abortarMissao());
  }
  checks.push('três combinações manuais livres criadas, salvas e executadas');
  for(const method of ['biset_agonista','biset_antagonista']){
   const original=await page.evaluate(async method=>{
    FitApp.cancelWorkoutPreview();
    const workouts={A:[{type:'superset',title:'Par salvo',exercises:[{name:'Supino Reto com Barra',sets:3,target:'10 rep'},{name:'Remada Curvada com Barra',sets:4,target:'8 rep'}]}]};
    for(const [key,value]of [['main_method',method],['profile','hipertrofia'],['level','iniciante'],['campaign_count','7']])FitApp.safeSet('fitapp_'+key,value);
    FitApp.safeSet('fitapp_campaign_data',JSON.stringify({id:'legacy-'+method,method,level:'iniciante',profile:'hipertrofia',workouts}));
    await(await import('/js/sync.js')).saveCampaignToCloud();return workouts;
   },method);
   await page.reload();await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
   assert.equal(await page.locator('#mainMethodSelector').inputValue(),method);
   assert.equal(await page.locator('#mainMethodSelector option:checked').textContent(),'Plano salvo · personalizado');
   assert.equal(await page.locator('#mainMethodSelector option:checked').evaluate(option=>option.hidden&&option.disabled),true);
   assert.equal(await page.locator('#card-B').isVisible(),false);
   await page.evaluate(()=>{FitApp.lockCampaign();FitApp.startWorkout('A');});
   const loaded=await page.evaluate(async()=>({routine:(await import('/js/state.js')).state.currentRoutine,campaign:JSON.parse(FitStore.get('fitapp_campaign_data')),count:FitStore.get('fitapp_campaign_count')}));
   assert.deepEqual(loaded.campaign.workouts,original);assert.equal(loaded.count,'7');
   assert.deepEqual(loaded.routine[0].exercises.map(ex=>ex.name),original.A[0].exercises.map(ex=>ex.name));
   await page.evaluate(()=>FitApp.beginWorkoutExecution());
   assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
   await page.evaluate(()=>window.abortarMissao());
   checks.push(method+' · plano salvo reabre sem geração ou perda de pares');
  }
  await page.evaluate(async()=>{FitApp.safeSet('fitapp_campaign_data','');await(await import('/js/sync.js')).saveCampaignToCloud();});
  await page.reload();await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  assert.equal(await page.locator('#mainMethodSelector').inputValue(),'abc_tradicional');
  checks.push('preferência antiga sem plano usa o ABC atual; planos antigos continuam preservados');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  fs.writeFileSync('audit/'+(process.env.FITAPP_AUDIT_PREFIX?process.env.FITAPP_AUDIT_PREFIX+'-':'')+'biset-browser-validation.json',JSON.stringify({status:'ok',environment:'local; Firebase simulated',checks:[...checks,'execução de par repetido bloqueada','adaptação com alternativa única sinalizada','largura móvel'],pageErrors:errors},null,2)+'\n');
  console.log('Bi-sets: pares completos, divisões, bloqueios e preservação de plano aprovados.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
