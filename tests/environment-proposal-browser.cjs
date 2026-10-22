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
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  const snapshot=await page.evaluate(()=>{
   FitApp.cancelWorkoutPreview();
   document.getElementById('levelSelector').value='iniciante';
   FitStore.set('fitapp_global_env','casa');
   FitStore.set('fitapp_resources_casa',JSON.stringify(['dumbbells','bench','incline-bench']));
   FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'proposal',name:'Tradicional B',routine:window.dbWorkouts.tradicional.iniciante.B}]));
   FitApp.startWorkout('custom_proposal');
   return FitStore.get('fitapp_custom_workouts');
  });
  const read=()=>page.evaluate(async()=>{const {state}=await import('/js/state.js');return {routine:JSON.stringify(state.currentRoutine),active:state.isWorkoutActive,status:state.environmentProposal?.status};});
  const original=await read();
  await page.getByRole('button',{name:'Revisar versão para este ambiente',exact:true}).click();
  assert.equal((await read()).routine,original.routine);
  assert.equal((await read()).status,'pending');
  await page.getByRole('button',{name:'Salvar como nova ficha',exact:true}).click();
  assert.equal(await page.evaluate(()=>FitStore.get('fitapp_custom_workouts')),snapshot);
  await page.evaluate(()=>FitApp.beginWorkoutExecution());assert.equal((await read()).active,false);
  assert.match(await page.locator('#environmentProposalReview').textContent(),/Puxada Alta na Máquina/);
  assert.match(await page.locator('#environmentProposalReview').textContent(),/não serão atendidos/);
  await page.getByRole('button',{name:'Voltar sem aplicar',exact:true}).click();
  assert.equal((await read()).routine,original.routine);
  await page.getByRole('button',{name:'Revisar versão para este ambiente',exact:true}).click();
  await page.getByRole('button',{name:'Usar versão reduzida nesta sessão',exact:true}).click();
  assert.equal((await read()).status,'accepted');
  assert.equal(await page.locator('.environment-warning').count(),0);
  assert.equal(await page.evaluate(()=>FitStore.get('fitapp_custom_workouts')),snapshot);
  await page.getByRole('button',{name:'Restaurar ficha completa',exact:true}).click();
  assert.equal((await read()).routine,original.routine);
  // Stale proposals cannot overwrite a user's edits.
  await page.getByRole('button',{name:'Revisar versão para este ambiente',exact:true}).click();
  await page.evaluate(async()=>{const {state}=await import('/js/state.js');state.currentRoutine[0].exercises[0].sets=2;FitApp.acceptEnvironmentProposal();});
  assert.equal((await read()).status,undefined);
  assert.equal(await page.locator('.environment-warning').count(),1);
  // New resources restore the full source and recalculate from its original movements.
  await page.getByRole('button',{name:'Revisar versão para este ambiente',exact:true}).click();
  await page.getByRole('button',{name:'Usar versão reduzida nesta sessão',exact:true}).click();
  await page.locator('[data-environment-resource="pullup-bar"]').check();
  assert.equal((await read()).status,undefined);
  assert.equal(await page.locator('.environment-warning').count(),0);
  assert.equal(await page.getByRole('button',{name:'Revisar versão para este ambiente',exact:true}).count(),0);
  // In park without resources an entire pulling day cannot become an abdominal-only proposal.
  await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitStore.set('fitapp_global_env','praia');FitStore.set('fitapp_resources_praia','[]');FitApp.startWorkout('custom_proposal');});
  await page.evaluate(()=>FitApp.reviewEnvironmentProposal());
  assert.equal((await read()).status,undefined);
  assert.match(await page.locator('#toast').textContent(),/sem movimentos para:/);
  assert.equal(await page.getByRole('button',{name:'Revisar versão para este ambiente',exact:true}).count(),0);
  assert.match(await page.locator('#environmentProposalReview').textContent(),/sem movimentos para:/);
  // Day C can be reviewed with an explicit missing knee-extension focus, then restored in gym.
  await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'proposal',name:'Tradicional C',routine:window.dbWorkouts.tradicional.iniciante.C}]));FitApp.startWorkout('custom_proposal');});
  const savedC=await page.evaluate(()=>FitStore.get('fitapp_custom_workouts'));
  await page.getByRole('button',{name:'Revisar versão para este ambiente',exact:true}).click();
  assert.match(await page.locator('#environmentProposalReview').textContent(),/Reto Femoral/);
  await page.getByRole('button',{name:'Usar versão reduzida nesta sessão',exact:true}).click();
  await page.screenshot({path:'audit/environment-proposal-mobile.png',fullPage:true,animations:'disabled'});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
  await page.click('#btnEnvToggle');
  assert.equal((await read()).status,undefined);
  assert.equal(await page.evaluate(async()=>{const {state}=await import('/js/state.js');return state.currentRoutine.some(block=>block.exercises.some(ex=>ex.name==='Cadeira Extensora'));}),true);
  assert.equal(await page.evaluate(()=>FitStore.get('fitapp_custom_workouts')),savedC);
  // Applying is separate from starting the session.
  await page.click('#btnEnvToggle');
  await page.getByRole('button',{name:'Revisar versão para este ambiente',exact:true}).click();
  await page.getByRole('button',{name:'Usar versão reduzida nesta sessão',exact:true}).click();
  assert.equal((await read()).active,false);
  await page.evaluate(()=>FitApp.beginWorkoutExecution());assert.equal((await read()).active,true);
  assert.equal(await page.evaluate(()=>FitStore.get('fitapp_custom_workouts')),savedC);
  assert.deepEqual(errors,[]);
  fs.writeFileSync('audit/environment-proposal-validation.json',JSON.stringify({status:'ok',environment:'local; Firebase simulated',checks:['revisão não altera prévia','cobertura ausente visível','salvamento e execução bloqueados durante revisão','cancelamento sem aplicar','aplicação explícita somente na sessão','restauração da ficha','proposta obsoleta rejeitada','mudança de recursos recalcula ficha completa','grupo inteiro ausente bloqueado','volta à academia restaura extensora','início separado da aplicação','largura móvel'],pageErrors:errors},null,2)+'\n');
  console.log('Propostas por ambiente: revisão, cobertura explícita, aplicação, execução e restauração aprovadas.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
