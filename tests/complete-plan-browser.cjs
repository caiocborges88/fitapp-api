const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block',reducedMotion:'reduce'});
 await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
 const page=await context.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
 try{
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>globalThis.FitStore?.uid==='browser-test');
  for(const method of ['abc','abcd','biset_sinergista']){
   await page.evaluate(method=>{document.getElementById('mainMethodSelector').value=method;FitApp.lockCampaign();},method);
   assert.equal(await page.locator('.plan-card').count(),1);
   assert.equal(await page.locator('.plan-card #card-A').count(),1);
   assert.equal(await page.locator('.plan-card #card-B').count(),1);
   assert.equal(await page.locator('.plan-card #card-C').count(),1);
   const plan=await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_campaign_data')));
   assert.equal(Object.keys(plan.workouts).length,method==='abcd'?4:3);
   assert.ok(Object.values(plan.workouts).every(r=>r.at(-1).title==='Abdominal'));
   await page.click('#card-B');
   assert.ok(await page.locator('#previewList').textContent().then(text=>text.includes('Abdominal')));
   await page.evaluate(()=>FitApp.cancelWorkoutPreview());
  }
  for(const method of ['ppl','biset_sinergista','circuito']){
   const before=await page.evaluate(()=>FitStore.get('fitapp_campaign_data'));
   await page.evaluate(()=>FitApp.openForgeModal());
   await page.selectOption('#forgeMethod',method);
   assert.equal(await page.locator('#forgeSubSelect').count(),0);
   await page.locator('#forgeModal button').filter({hasText:'Gerar e revisar'}).click();
   assert.deepEqual(await page.getByRole('tab').locator('strong').allTextContents(),['Treino A','Treino B','Treino C']);
   assert.equal(await page.getByRole('tab',{name:/Treino A/}).getAttribute('aria-selected'),'true');
   assert.equal(await page.locator('.cycle-block-editor[open]').count(),0);
   assert.equal(await page.locator('#customWorkoutName').isVisible(),false);
   await page.getByRole('tab',{name:/Treino A/}).focus();
   await page.keyboard.press('ArrowRight');
   assert.equal(await page.getByRole('tab',{name:/Treino B/}).getAttribute('aria-selected'),'true');
   await page.keyboard.press('Home');
   assert.equal(await page.getByRole('tab',{name:/Treino A/}).getAttribute('aria-selected'),'true');
   assert.equal(await page.locator('#btnStartWorkout').isVisible(),false);
   assert.equal(await page.evaluate(()=>FitStore.get('fitapp_campaign_data')),before);
   const draft=await page.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine);
   for(const day of ['A','B','C'])assert.equal(draft.filter(b=>b.day===day).at(-1).title,'Abdominal');
   if(method==='biset_sinergista'){
    await page.emulateMedia({colorScheme:'dark'});
    await page.screenshot({path:'audit/forge-cycle-review-desktop.png',animations:'disabled'});
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:'audit/forge-cycle-review-mobile.png',animations:'disabled'});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
    await page.setViewportSize({width:1440,height:1000});
    await page.emulateMedia({colorScheme:'light'});
   }
   await page.getByRole('tab',{name:/Treino C/}).click();
   assert.equal(await page.getByRole('tabpanel').locator('h3').textContent(),'Treino C');
   await page.locator('.cycle-block-editor').last().locator('summary').click();
   await page.locator('.editor-target').last().fill('18 rep');
   await page.getByRole('tab',{name:/Treino A/}).click();
   await page.getByRole('tab',{name:/Treino C/}).click();
   assert.equal(await page.locator('.editor-target').last().inputValue(),'18 rep');
   assert.match(await page.locator('.cycle-exercise-list').last().textContent(),/18 rep/);

   await page.click('#saveTemplateButton');
   const saved=await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_campaign_data')));
   assert.deepEqual(Object.keys(saved.workouts),['A','B','C']);
   assert.equal(saved.workouts.C.at(-1).exercises.at(-1).target,'18 rep');
   assert.equal(saved.method,method==='ppl'?'abc':method);
   await page.click('#card-C');
   assert.equal(await page.locator('#btnStartWorkout').isVisible(),true);
   const session=await page.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine);
   assert.equal(session.length,saved.workouts.C.length);
   await page.evaluate(()=>FitApp.cancelWorkoutPreview());
  }
  // Cancelling a generated cycle preserves the saved plan.
  const retained=await page.evaluate(()=>FitStore.get('fitapp_campaign_data'));
  await page.evaluate(()=>{FitApp.openForgeModal();document.getElementById('forgeMethod').value='ppl';FitApp.generateForgedWorkout();});
  await page.getByRole('tab',{name:/Treino B/}).click();
  await page.getByRole('button',{name:'Adicionar bloco',exact:true}).click();
  const extra=await page.evaluate(async()=>{const {state}=await import('/js/state.js');return state.currentRoutine.filter(b=>!b.exercises.length).map(b=>b.day);});
  assert.deepEqual(extra,['B']);
  assert.equal(await page.getByRole('tabpanel').locator('.cycle-block-editor[open]').count(),1);
  await page.evaluate(()=>FitApp.cancelWorkoutPreview());
  assert.equal(await page.evaluate(()=>FitStore.get('fitapp_campaign_data')),retained);
  // An unavailable traditional focus must stop generation before replacing the preview or saved plan.
  for(const environment of ['casa','parque']){
   const result=await page.evaluate(async environment=>{
    FitStore.set('fitapp_global_env',environment);
    FitStore.set('fitapp_resources_'+environment,'[]');
    FitApp.openForgeModal();
    document.getElementById('forgeMethod').value='ppl';
    const {state}=await import('/js/state.js');
    const before=JSON.stringify(state.currentRoutine);
    const messages=[],showToast=FitApp.showToast;
    FitApp.showToast=message=>messages.push(message);
    try{FitApp.generateForgedWorkout();}finally{FitApp.showToast=showToast;}
    return {messages,unchanged:before===JSON.stringify(state.currentRoutine),modalOpen:document.getElementById('forgeModal').style.display==='flex'};
   },environment);
   assert.ok(result.messages.some(message=>message.includes('Sem movimentos compatíveis para os focos:')));
   assert.equal(result.unchanged,true);
   assert.equal(result.modalOpen,true);
   assert.equal(await page.evaluate(()=>FitStore.get('fitapp_campaign_data')),retained);
  }
  await page.evaluate(()=>{FitStore.set('fitapp_global_env','academia');document.getElementById('forgeModal').style.display='none';});
  await page.evaluate(()=>{document.getElementById('mainMethodSelector').value='abc';FitApp.lockCampaign();});
  await page.screenshot({path:'audit/complete-plan-desktop.png',fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'audit/complete-plan-mobile.png',fullPage:true,animations:'disabled'});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  assert.deepEqual(errors,[]);
  console.log('Ficha completa: dias agrupados, geração conjunta, abdominal final e largura móvel aprovados.');
 }finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
