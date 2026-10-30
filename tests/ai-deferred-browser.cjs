const auditPath=name=>'audit/'+(process.env.FITAPP_AUDIT_PREFIX?process.env.FITAPP_AUDIT_PREFIX+'-':'')+name;
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
  const page=await context.newPage(),errors=[],requests=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/api/**',route=>{const url=route.request().url();if(/coach|importar-treino-ia/.test(url))requests.push(url);return route.fulfill({status:409,contentType:'application/json',body:'{"code":"ai-deferred"}'});});
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  await page.evaluate(()=>FitApp.switchTab('tab-workouts','nav-workouts'));
  assert.equal(await page.locator('[onclick*="openImportAiModal"]').count(),0);
  assert.equal(await page.locator('#importAiModal').count(),0);
  await page.click('#workoutAddButton');assert.equal(await page.getByRole('button',{name:'Cadastrar minha ficha',exact:false}).isVisible(),true);await page.keyboard.press('Escape');
  assert.equal(await page.locator('.creation-card').count(),2);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  await page.screenshot({path:auditPath('ai-deferred-mobile.png'),fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:auditPath('ai-deferred-desktop.png'),fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:390,height:844});
  const queue=await page.evaluate(()=>{
   const text=JSON.stringify([{nome_treino:'Rascunho anterior',exercicios:[{nome:'Flexão de Braço (Padrão)',series:3,repeticoes:'10 rep'}]}]);
   FitStore.set('fitapp_fila_ia',text);return text;
  });
  const calls=await page.evaluate(async()=>{
   const saved=FitStore.get('fitapp_fila_ia');
   FitApp.openImportAiModal();FitApp.switchAiTab('criar');
   await FitApp.processWorkoutWithAI();await FitApp.fetchAIFeedback();FitApp.carregarProximoTreinoIA();
   const failures=[];
   for(const call of [()=>FitAPI.importarTreinoIA('Treino'),()=>FitAPI.getCoachFeedback()]){
    try{await call();}catch(error){failures.push(error.message);}
   }
   return {failures,queueSame:saved===FitStore.get('fitapp_fila_ia')};
  });
  assert.equal(calls.queueSame,true);assert.equal(calls.failures.length,2);
  assert.ok(calls.failures.every(message=>message.includes('próxima fase')));
  assert.equal(requests.length,0);
  await page.reload();await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  assert.equal(await page.evaluate(()=>FitStore.get('fitapp_fila_ia')),queue);
  assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.filaDeTreinosIA.length),0);
  assert.equal(await page.locator('#workoutPreview').isVisible(),false);
  await page.evaluate(()=>FitApp.createManualWorkout());
  assert.equal(await page.locator('#workoutPreview').isVisible(),true);
  await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitApp.openForgeModal();document.getElementById('forgeMethod').value='ppl';FitApp.generateForgedWorkout();});
  assert.equal(await page.getByRole('tab').locator('strong').count(),3);
  assert.equal(await page.evaluate(()=>FitStore.get('fitapp_fila_ia')),queue);
  assert.equal(requests.length,0);assert.deepEqual(errors,[]);
  fs.writeFileSync(auditPath('ai-deferred-validation.json'),JSON.stringify({status:'ok',environment:'local; Firebase simulated; no AI provider calls',checks:['entradas de IA removidas','chamadas legadas locais bloqueadas','cliente não envia requisições de IA','fila antiga preservada sem restauração automática','cadastro manual disponível','modelo validado gera ciclo'],aiRequests:requests,pageErrors:errors},null,2)+'\n');
  console.log('IA adiada: interface, bloqueios, rascunhos preservados e montagem sem IA aprovados.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
