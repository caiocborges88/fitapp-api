const auditPath=name=>'audit/'+(process.env.FITAPP_AUDIT_PREFIX?process.env.FITAPP_AUDIT_PREFIX+'-':'')+name;
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const server=require('../scripts/serve.cjs');
const fakeFirebase=require('./fixtures/firebase.cjs');
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch({...(process.platform==='win32'?{channel:'msedge'}:{}),headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const errors=[];
  const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
  page.on('dialog',dialog=>dialog.accept());
  await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fakeFirebase:''}));
  await context.route('**/api/**',async route=>{
    const url=route.request().url();
    if(url.endsWith('/importar-treino-ia'))return route.fulfill({json:{resultado:JSON.stringify([{nome_treino:'Importado',exercicios:[{nome:'Flexão de Braço (Padrão)',series:3,repeticoes:'10-12'}]}])}});
    if(url.endsWith('/recompensas'))return route.fulfill({json:{drawn:{id:1,name:'Halter de Ferro',icon:'🏋️',rarity:'comum'},isRepeated:false,profile:{album:[1],repetidas:0}}});
    return route.fulfill({json:{feedback:'Respeite seus limites.'}});
  });
  try{
    await page.goto(origin);await page.waitForFunction(()=>window.FitApp&&window.FitStore.uid==='browser-test');
    assert.equal(await page.locator('#loginOverlay').isVisible(),false);
    for(const method of ['abc','abcd','biset_sinergista','circuito']){
      await page.evaluate(method=>{document.getElementById('mainMethodSelector').value=method;FitApp.lockCampaign();FitApp.startWorkout('A');},method);
      assert.ok(await page.locator('#previewList .preview-item').count()>0,method);
      await page.evaluate(()=>FitApp.cancelWorkoutPreview());
    }
    await page.evaluate(()=>{FitApp.openForgeModal();FitApp.generateForgedWorkout();});
    assert.ok(await page.locator('#previewList .cycle-exercise-list li').count()>0);await page.locator('#cycleNameOptions>summary').click();
    await page.fill('#customWorkoutName','Template de teste');
    await page.evaluate(()=>{FitApp.saveCustomWorkout();FitApp.startWorkout('A');FitApp.saveCustomWorkout();});
    const templateId=await page.evaluate(()=>JSON.parse(FitApp.safeGet('fitapp_custom_workouts'))[0].id);
    assert.match(templateId,/^[\w-]+$/);
    await page.evaluate(id=>{FitApp.startWorkout('custom_'+id);FitApp.declineSnap();},templateId);
    const firstKg=page.locator('.kg-val').first(),firstReps=page.locator('.rp-val').first();
    await firstKg.fill('20');await firstReps.fill('10');await page.locator('.chk-set').first().check();
    await firstKg.fill('22');
    await page.reload();await page.waitForFunction(()=>document.querySelector('.chk-set')?.checked);
    assert.equal(await page.locator('.kg-val').first().inputValue(),'22');
    assert.equal(await page.locator('.rp-val').first().inputValue(),'10');
    await page.evaluate(async()=>{const {state}=await import('/js/state.js');state.workoutStartTime=Date.now()-180000;});
    await page.click('#btnFinishAction');await page.waitForFunction(()=>JSON.parse(FitApp.safeGet('fitapp_week_log')||'[]').length===1);
    assert.equal(await page.evaluate(()=>JSON.parse(FitApp.safeGet('fitapp_week_log'))[0].data[0].kg),22);
    await page.evaluate(()=>document.getElementById('sessionSummary').close());
    await page.evaluate(()=>FitApp.openHistoryModal());
    assert.ok(await page.locator('#historyListView').textContent());
    await page.evaluate(()=>{document.getElementById('historyModal').style.display='none';FitApp.openImportAiModal();});
    await page.evaluate(()=>FitApp.processWorkoutWithAI());
    assert.equal(await page.locator('#aiWorkoutText').count(),0);
    await page.evaluate(id=>FitEditor.duplicateWorkout(id),templateId);
    assert.equal(await page.evaluate(()=>JSON.parse(FitApp.safeGet('fitapp_custom_workouts')).length),2);
    await page.reload();await page.waitForFunction(()=>window.FitStore?.uid==='browser-test');
    await page.evaluate(()=>{FitApp.startWorkout('A');FitApp.declineSnap();});
    assert.equal(await page.locator('#btnFinishAction').isDisabled(),false);
    await page.evaluate(()=>window.abortarMissao());
    const {active}=await page.evaluate(async()=>({active:(await import('/js/state.js')).state.isWorkoutActive}));assert.equal(active,false);
    await page.evaluate(()=>{FitApp.switchTab('tab-biblioteca','nav-biblioteca');FitApp.openAddExerciseModal();document.getElementById('searchAddInput').value='zzzz';FitApp.filterAddModal();});
    await page.screenshot({path:path.join(__dirname,'../',auditPath('fitapp-validacao.png')),fullPage:true});
    assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(__dirname,'../',auditPath('browser-validation.json')),JSON.stringify({viewport:'390x844',methods:6,checks:['inicialização','forja','templates','registro','edição','restauração','histórico','IA adiada; duplicação de ficha','nova sessão','abortamento','busca'],pageErrors:errors,cloud:'Firebase e respostas de IA simulados; testes de autorização separados.'},null,2));
    console.log('Navegador: fluxos principais aprovados, sem exceções.');
  }finally{await context.close();await browser.close();await new Promise(r=>server.close(r));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
