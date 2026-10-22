const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 try{
  await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  await page.goto(`http://127.0.0.1:${server.address().port}`);await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  await page.evaluate(async()=>{
   const routine=[{title:'Ficha de teste',type:'traditional',exercises:[{id:'chest',name:'Supino Reto com Barra',sets:3,target:'10 rep'},{id:'legs',name:'Agachamento Livre (Back/Front Squat)',sets:3,target:'12 rep'}]}];
   FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'environment-test',name:'Ficha academia',routine}]));
   await(await import('/js/sync.js')).saveCampaignToCloud();FitApp.startWorkout('custom_environment-test');
  });
  const original=await page.evaluate(()=>FitStore.get('fitapp_custom_workouts'));
  const names=()=>page.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine.flatMap(b=>b.exercises).map(ex=>ex.name));
  const gym=await names();await page.click('#btnEnvToggle');assert.equal(await page.locator('#envText').textContent(),'Casa');
  assert.ok(await page.locator('#environmentResources').isVisible());
  await page.locator('[data-environment-resource="dumbbells"]').check();
  assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_resources_casa')).includes('dumbbells')),true);
  await page.locator('[data-environment-resource="dumbbells"]').uncheck();
  assert.notDeepEqual(await names(),gym);
  async function compatible(){return page.evaluate(async()=>{const {state}=await import('/js/state.js'),env=await import('/js/environment.js');return state.currentRoutine.flatMap(b=>b.exercises).every(ex=>!ex.needsReview&&env.availableInEnvironment(dictionaryData.find(d=>d.name===ex.name),env.environmentOptions()));});}
  assert.equal(await compatible(),true);assert.equal(await page.evaluate(()=>FitStore.get('fitapp_custom_workouts')),original);
  await page.click('#btnEnvToggle');assert.match(await page.locator('#envText').textContent(),/Parque/);assert.equal(await compatible(),true);
  assert.equal(await page.locator('[data-environment-resource="dumbbells"]').isVisible(),false);
  await page.locator('[data-environment-resource="bench"]').check();
  await page.locator('[data-environment-resource="bench"]').uncheck();
  await page.click('#btnEnvToggle');assert.deepEqual(await names(),gym);assert.equal(await page.locator('#environmentResources').isVisible(),false);
  await page.click('#btnEnvToggle');await page.click('#btnStartWorkout');
  assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
  assert.equal(await compatible(),true);assert.equal(await page.evaluate(()=>FitStore.get('fitapp_custom_workouts')),original);
  await page.evaluate(()=>window.abortarMissao());
  await page.evaluate(()=>{FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'pull',name:'Treino de puxada',routine:[{title:'Puxada',type:'traditional',exercises:[{id:'pull-ex',name:'Barra Fixa (Pull-up / Chin-up)',sets:3,target:'8 rep'}]}]}]));FitApp.startWorkout('custom_pull');});
  assert.ok(await page.locator('.environment-warning').count());await page.click('#btnStartWorkout');
  assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),false);
  await page.locator('[data-environment-resource="pullup-bar"]').check();
  assert.equal(await compatible(),false);
  assert.match(await page.locator('.environment-warning').textContent(),/complexidade alta/);
  await page.locator('[data-environment-resource="bench"]').check();
  assert.equal(await compatible(),true);assert.equal(await page.locator('.environment-warning').count(),0);
  // Switching back and forth retains the per-environment choices.
  await page.click('#btnEnvToggle');assert.equal(await page.locator('[data-environment-resource="pullup-bar"]').isChecked(),false);
  await page.click('#btnEnvToggle');await page.click('#btnEnvToggle');assert.equal(await page.locator('[data-environment-resource="pullup-bar"]').isChecked(),true);
  await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitApp.setEnvironmentResources([]);FitApp.lockCampaign();FitApp.startWorkout('A');});
  const honestPlan=await page.evaluate(async()=>{
   const {state}=await import('/js/state.js'),env=await import('/js/environment.js');
   return state.currentRoutine.flatMap(b=>b.exercises).every(ex=>ex.needsReview||env.availableInEnvironment(dictionaryData.find(d=>d.name===ex.name),env.environmentOptions()));
  });assert.equal(honestPlan,true);
  const planUnchanged=await page.evaluate(async()=>{
   const saved=JSON.parse(FitStore.get('fitapp_campaign_data')).workouts.A.flatMap(b=>b.exercises),env=await import('/js/environment.js');
   return saved.some(ex=>!env.availableInEnvironment(dictionaryData.find(item=>item.name===ex.name),env.environmentOptions()));
  });assert.equal(planUnchanged,true);
  await page.screenshot({path:'audit/environment-mobile.png',fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  fs.writeFileSync('audit/environment-validation.json',JSON.stringify({status:'ok',environment:'local; Firebase simulated',checks:['ficha pessoal adaptada em casa e parque','ficha original preservada','volta à academia reversível','execução sem equipamentos de academia','movimento sem alternativa bloqueado','barra apenas quando declarada','recursos independentes por ambiente','plano adaptado sem gravar substituições no original','largura móvel'],pageErrors:errors},null,2)+'\n');
  console.log('Ambientes: adaptação, recursos declarados, reversão e execução aprovados.');
 }finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
