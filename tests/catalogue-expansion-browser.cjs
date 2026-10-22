const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');
const legacy=require('./fixtures/legacy-calisthenics.cjs');
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try{
  browser=await chromium.launch({channel:'msedge',headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  const original=await page.evaluate(()=>{
   FitStore.set('fitapp_global_env','casa');FitStore.set('fitapp_resources_casa',JSON.stringify(['dumbbells']));
   FitApp.updateEnvUI();document.getElementById('levelSelector').value='iniciante';
   const routine=[{type:'traditional',title:'Expansão sem bandas',exercises:[
    {id:'chest',name:'Voador (Peck Deck)',sets:3,target:'12 rep'},
    {id:'rear',name:'Crucifixo Invertido na Máquina (Peck Deck)',sets:3,target:'12 rep'},
    {id:'calf',name:'Panturrilha Sentado (Máquina)',sets:3,target:'15 rep'}]}];
   const saved=JSON.stringify([{id:'expansion',name:'Expansão',routine}]);
   FitStore.set('fitapp_custom_workouts',saved);FitApp.startWorkout('custom_expansion');return saved;
  });
  assert.equal(await page.locator('.environment-warning').count(),1);
  const names=()=>page.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine.flatMap(block=>block.exercises).map(ex=>ex.name));
  assert.deepEqual((await names()).slice(0,2),['Crucifixo no Solo com Halteres','Crucifixo Invertido Curvado em Pé com Halteres']);
  await page.locator('[data-environment-resource="balance-support"]').check();
  assert.equal(await page.locator('.environment-warning').count(),0);
  assert.equal((await names())[2],'Panturrilha em Pé com Joelhos Flexionados e Apoio');
  assert.equal(await page.locator('[data-environment-resource="bench"]').isChecked(),false);
  await page.locator('[data-environment-resource="balance-support"]').uncheck();
  assert.equal(await page.locator('.environment-warning').count(),1);
  await page.locator('[data-environment-resource="balance-support"]').check();
  await page.click('#btnStartWorkout');
  assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
  assert.equal(await page.locator('[data-environment-resource="balance-support"]').isDisabled(),true);
  await page.evaluate(()=>window.abortarMissao());
  assert.equal(await page.evaluate(()=>FitStore.get('fitapp_custom_workouts')),original);
  await page.evaluate(()=>{FitStore.set('fitapp_global_env','academia');FitApp.startWorkout('custom_expansion');});
  assert.deepEqual(await names(),['Voador (Peck Deck)','Crucifixo Invertido na Máquina (Peck Deck)','Panturrilha Sentado (Máquina)']);
  const generated=await page.evaluate(async workouts=>{
   FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env','praia');FitStore.set('fitapp_resources_praia',JSON.stringify(['bench','pullup-bar']));
   const plan={id:'legacy-calisthenics',method:'calistenia',profile:'hipertrofia',level:'iniciante',workouts};
   FitStore.set('fitapp_campaign_data',JSON.stringify(plan));FitStore.set('fitapp_main_method','calistenia');
   (await import('/js/workout-methods.js')).selectSavedMethod(document.getElementById('mainMethodSelector'),'calistenia',plan);
   FitApp.switchTab('tab-treino','nav-treino');FitApp.updateEnvUI();FitApp.startWorkout('A');
   return (await import('/js/state.js')).state.currentRoutine;
  },legacy());
  assert.equal(generated.flatMap(block=>block.exercises).length,6);
  assert.ok(generated.every(block=>block.equipmentPolicy==='bodyweight'));
  assert.ok(generated.flatMap(block=>block.exercises).some(ex=>ex.name==='Rosca Corporal Sentada com Resistência da Perna'));
  assert.equal(await page.locator('.environment-warning').count(),0);
  await page.waitForFunction(()=>!document.body.classList.contains('session-active'));
  assert.equal(await page.locator('[data-environment-resource="balance-support"]').isVisible(),true);
  assert.equal(await page.locator('[data-environment-resource="low-bar"]').isChecked(),false);
  await page.click('#btnStartWorkout');
  assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
  await page.evaluate(()=>window.abortarMissao());
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  await page.screenshot({path:'audit/catalogue-expansion-mobile.png',fullPage:true});
  fs.writeFileSync('audit/catalogue-expansion-validation.json',JSON.stringify({status:'ok',environment:'local; Firebase simulated',checks:['casa com halteres sem banco','apoio declarado remove lacuna de sóleo','remover apoio restaura bloqueio','apoio bloqueado durante execução','original preservado e academia restaurada','legado corporal com banco e barra alta sem barra baixa','política corporal mantida','execução do legado corporal','controle de apoio visível no parque','largura móvel'],pageErrors:errors},null,2)+'\n');
  console.log('Expansão sem bandas: seleção, apoio, calistenia, execução e restauração aprovados.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
