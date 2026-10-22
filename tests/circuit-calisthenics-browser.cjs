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
  page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  for(const method of ['circuito'])for(const environment of ['academia','praia']){
   const result=await page.evaluate(async({method,environment})=>{
    FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env',environment);
    FitStore.set('fitapp_resources_'+environment,JSON.stringify(['bench','pullup-bar','low-bar']));
    document.getElementById('profileSelector').value='hipertrofia';document.getElementById('levelSelector').value='iniciante';
    FitApp.openForgeModal();document.getElementById('forgeMethod').value=method;FitApp.generateForgedWorkout();
    const {state}=await import('/js/state.js');return {kind:state.editorContext.kind,routine:state.currentRoutine};
   },{method,environment});
   assert.equal(result.kind,'cycle');
   for(const day of ['A','B','C']){
    const blocks=result.routine.filter(block=>block.day===day),items=blocks.flatMap(block=>block.exercises);
    assert.equal(items.length,method==='circuito'?8:6);
    if(method==='calistenia')assert.ok(blocks.every(block=>block.equipmentPolicy==='bodyweight'));
    else{assert.equal(blocks[0].type,'circuit');assert.equal(blocks[0].exercises.length,7);}
   }
   await page.click('#saveTemplateButton');
   await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitApp.startWorkout('A');});
   assert.equal(await page.locator('.environment-warning').count(),0);
   await page.evaluate(()=>FitApp.beginWorkoutExecution());
   assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
   await page.evaluate(()=>window.abortarMissao());
   checks.push(method+' · '+environment+' · geração, salvamento e início');
  }
  for(const method of ['circuito']){
   const blocked=await page.evaluate(async method=>{
    FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env','casa');FitStore.set('fitapp_resources_casa','[]');FitApp.startWorkout('A');
    const {state}=await import('/js/state.js');const previous=JSON.stringify(state.currentRoutine),saved=FitStore.get('fitapp_campaign_data');
    FitApp.openForgeModal();document.getElementById('forgeMethod').value=method;FitApp.generateForgedWorkout();
    return {same:previous===JSON.stringify(state.currentRoutine),saved:saved===FitStore.get('fitapp_campaign_data'),message:document.getElementById('toast').textContent,open:document.getElementById('forgeModal').style.display==='flex'};
   },method);
   assert.equal(blocked.same,true);assert.equal(blocked.saved,true);assert.equal(blocked.open,true);assert.match(blocked.message,/Sem movimentos compatíveis/);
   await page.evaluate(()=>{document.getElementById('forgeModal').style.display='none';FitApp.cancelWorkoutPreview();});
   checks.push(method+' · falta de recursos preserva plano e prévia');
  }
  const home=await page.evaluate(async()=>{
   FitStore.set('fitapp_global_env','casa');FitStore.set('fitapp_resources_casa','[]');FitApp.startWorkout('Casa');
   const {state}=await import('/js/state.js');const env=await import('/js/environment.js');
   return {count:state.currentRoutine.flatMap(block=>block.exercises).length,compatible:state.currentRoutine.every(block=>block.exercises.every(ex=>env.availableInEnvironment(dictionaryData.find(item=>item.name===ex.name),{environment:'casa',resources:[],equipmentPolicy:block.equipmentPolicy})))};
  });assert.equal(home.count,5);assert.equal(home.compatible,true);
  assert.equal(await page.locator('.environment-warning').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  fs.writeFileSync('audit/circuit-calisthenics-validation.json',JSON.stringify({status:'ok',environment:'local; Firebase simulated',checks:[...checks,'modelo de calistenia retirado','atalho Casa compatível sem equipamentos','largura móvel'],pageErrors:errors},null,2)+'\n');
  console.log('Circuitos e legado corporal: completude, recursos, política corporal, execução e preservação aprovados.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
