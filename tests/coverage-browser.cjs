const auditPath=name=>'audit/'+(process.env.FITAPP_AUDIT_PREFIX?process.env.FITAPP_AUDIT_PREFIX+'-':'')+name;
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let browser;const checks=[];
 try{
  browser=await chromium.launch({channel:'msedge',headless:true});
  async function run(name,test){
   const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
   await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
   const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
   try{await page.goto(`http://127.0.0.1:${server.address().port}`);await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));await test(page);assert.deepEqual(errors,[]);checks.push(name);console.log('OK: '+name);}finally{await context.close();}
  }
  await run('título abdominal não promete core; duplicatas e séries editadas são refletidas sem reescrever legado',async page=>{
   const original=await page.evaluate(()=>{
    const routine=[{title:'Abdominal',type:'traditional',exercises:[1,2].map(()=>({name:'Supino Reto com Barra',sets:3,target:'10 rep'}))}];
    const plan={method:'abc',level:'iniciante',profile:'hipertrofia',workouts:{A:routine,B:structuredClone(routine),C:structuredClone(routine)}};
    for(const [id,value]of Object.entries({mainMethodSelector:'abc',profileSelector:'hipertrofia',levelSelector:'iniciante'}))document.getElementById(id).value=value;
    FitStore.set('fitapp_campaign_data',JSON.stringify(plan));FitApp.startWorkout('A');return JSON.stringify(routine);
   });
   if(!await page.locator('#previewMore').evaluate(el=>el.open))await page.locator('#previewMore>summary').click();await page.locator('#sessionCoverage>summary').click();
   let text=await page.locator('#sessionCoverage').textContent();assert.match(text,/2 posições · 1 movimento distinto/);assert.match(text,/Sem movimento de core/);assert.match(text,/Movimentos repetidos/);
   await page.locator('.exercise-settings').first().locator('summary').click();await page.locator('.editor-sets').first().fill('5');await page.locator('.editor-sets').first().dispatchEvent('change');
   assert.match(await page.locator('#sessionCoverage').textContent(),/8 séries previstas/);
   assert.equal(await page.evaluate(()=>JSON.stringify(JSON.parse(FitStore.get('fitapp_campaign_data')).workouts.A)),original);
   await page.locator('#btnStartWorkout').click();assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
  });
  await run('jornada completa: Casa, lacuna, edição da sessão, ficha nova, execução, recarga e registro',async page=>{
   const saved=await page.evaluate(()=>{
    const templates=[{id:'coverage',name:'Ficha de referência',routine:[{title:'Meu bloco',type:'traditional',exercises:[{name:'Supino Reto com Barra',sets:3,target:'10 rep'},{name:'Cadeira Extensora',sets:3,target:'12 rep'}]}]}];
    FitStore.set('fitapp_custom_workouts',JSON.stringify(templates));FitApp.startWorkout('custom_coverage');return templates[0];
   });
   await page.evaluate(()=>FitApp.toggleGlobalEnv());if(!await page.locator('#previewMore').evaluate(el=>el.open))await page.locator('#previewMore>summary').click();await page.locator('#sessionCoverage>summary').click();
   let text=await page.locator('#sessionCoverage').textContent();assert.match(text,/1 posição com pendência/);assert.match(text,/Extensão de joelho/);assert.match(text,/Peitoral/);
   await page.locator('#btnStartWorkout').click();assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),false);
   await page.evaluate(()=>FitApp.removeExercise(0,1));
   text=await page.locator('#sessionCoverage').textContent();assert.match(text,/referência sem representação/);assert.match(text,/Extensão de joelho/);
   await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));
   await page.locator('#sessionCoverage').scrollIntoViewIfNeeded();await page.screenshot({path:auditPath('coverage-mobile.png')});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await page.locator('#showCopyName').click();await page.locator('#customWorkoutName').fill('Versão Casa revisada');await page.locator('#saveTemplateButton').click();
   const templates=await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts')));assert.equal(templates.length,2);assert.deepEqual(templates.find(item=>item.id==='coverage'),saved);
   await page.evaluate(id=>FitApp.startWorkout('custom_'+id),templates.find(item=>item.id!=='coverage').id);
   await page.locator('#btnStartWorkout').click();await page.locator('.rp-val').first().fill('10');await page.locator('.chk-set').first().check();
   await page.reload();await page.waitForFunction(()=>document.querySelector('.chk-set')?.checked);
   assert.equal(await page.locator('.rp-val').first().inputValue(),'10');
   await page.evaluate(async()=>{(await import('/js/state.js')).state.workoutStartTime=Date.now()-180000;});
   await page.locator('#btnFinishAction').click();await page.waitForFunction(()=>JSON.parse(FitStore.get('fitapp_week_log')||'[]').length===1);
   const log=await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_week_log'))[0]);assert.equal(log.data.length,1);assert.equal(log.data[0].reps,10);assert.equal(log.data[0].exercise,'Flexão de Braço (Padrão)');
   assert.deepEqual(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts')).find(item=>item.id==='coverage')),saved);
  });
  await run('ciclo mostra core real por dia e mantém ficha manual sem impor cobertura automática',async page=>{
   await page.setViewportSize({width:1280,height:900});
   const coreIndex=await page.evaluate(async()=>{
    FitApp.openForgeModal();document.getElementById('forgeMethod').value='ppl';FitApp.generateForgedWorkout();
    const {state}=await import('/js/state.js');const index=state.currentRoutine.findIndex(block=>block.day==='A'&&block.title==='Abdominal');
    FitApp.removeExercise(index,0);FitApp.openAddExerciseModal();return index;
   });
   await page.locator('#addBlockTarget').selectOption(String(coreIndex));
   await page.locator('#searchAddInput').fill('Agachamento com peso corporal');
   await page.locator('#addExerciseList .swap-item').first().click();
   await page.getByRole('button',{name:'Adicionar à ficha',exact:true}).click();
   assert.match(await page.locator('.cycle-overview').textContent(),/Core sem pendência em 2\/3 dias/);
   await page.locator('#cycle-day-panel .coverage-review>summary').click();
   assert.match(await page.locator('#cycle-day-panel .coverage-review').textContent(),/Sem movimento de core/);
   await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));
   await page.locator('#cycle-day-panel .coverage-review').scrollIntoViewIfNeeded();await page.screenshot({path:auditPath('coverage-desktop.png')});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await page.locator('#saveTemplateButton').click();
   const plan=await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_campaign_data')));assert.equal(plan.workouts.A.at(-1).exercises[0].name,'Agachamento com peso corporal');
   await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitApp.startWorkout('A');});
   assert.match(await page.locator('#sessionCoverage').textContent(),/Sem movimento de core/);
   assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_campaign_data')).workouts.A.at(-1).exercises[0].name),'Agachamento com peso corporal');
  });
  await run('Parque não conta puxada indisponível e recalcula quando barra alta e banco são declarados',async page=>{
   await page.evaluate(()=>{
    FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'park',name:'Puxada',routine:[{type:'traditional',exercises:[{name:'Barra Fixa com Apoio dos Pés',sets:3,target:'8 rep'}]}]}]));
    FitStore.set('fitapp_global_env','praia');FitStore.set('fitapp_resources_praia',JSON.stringify(['low-bar']));FitApp.startWorkout('custom_park');
   });
   assert.match(await page.locator('#sessionCoverage').textContent(),/0 posições sem pendência/);
   await page.evaluate(()=>FitApp.setEnvironmentResources(['bench','pullup-bar']));
   const text=await page.locator('#sessionCoverage').textContent();assert.match(text,/1 posição sem pendência/);assert.match(text,/Puxada vertical/);assert.doesNotMatch(text,/referência sem representação/);
  });
  fs.writeFileSync(auditPath('coverage-validation.json'),JSON.stringify({status:'ok',environment:'local Edge; Firebase simulated',checks},null,2)+'\n');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
