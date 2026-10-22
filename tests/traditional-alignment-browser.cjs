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
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
  const page=await context.newPage(),errors=[],checks=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  for(const day of ['A','B','C']){
   for(const scenario of [
    {environment:'academia',resources:[],missing:[]},
    {environment:'casa',resources:[],missing:day==='A'?['Voador (Peck Deck)','Tríceps Pulley (Barra Reta/V)','Tríceps Máquina / Dip Machine']:day==='B'?['Puxada Alta na Máquina','Remada Máquina Apoiada no Peito','Rosca Direta com Barra','Rosca Scott na Máquina']:['Cadeira Extensora']},
    {environment:'casa',resources:['dumbbells','bench','incline-bench'],missing:day==='A'?[]:day==='B'?['Puxada Alta na Máquina']:['Cadeira Extensora']},
    {environment:'casa',resources:['dumbbells','bench','incline-bench','pullup-bar'],missing:day==='C'?['Cadeira Extensora']:[]},
    {environment:'parque',resources:['bench','pullup-bar','low-bar'],missing:day==='A'?['Voador (Peck Deck)','Tríceps Pulley (Barra Reta/V)']:day==='B'?[]:['Cadeira Extensora']}
   ]){
    const result=await page.evaluate(async({day,scenario})=>{
     FitApp.cancelWorkoutPreview();
     document.getElementById('levelSelector').value='iniciante';
     FitStore.set('fitapp_global_env',scenario.environment);
     FitStore.set('fitapp_resources_'+scenario.environment,JSON.stringify(scenario.resources));
     const routine=window.dbWorkouts.tradicional.iniciante[day];
     FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'alignment',name:'Tradicional iniciante '+day,routine}]));
     const original=FitStore.get('fitapp_custom_workouts');
     FitApp.startWorkout('custom_alignment');
     const {state}=await import('/js/state.js');
     const env=await import('/js/environment.js');
     const exercises=state.currentRoutine.flatMap(block=>block.exercises);
     const missing=exercises.filter(ex=>ex.needsReview).map(ex=>ex._environmentOriginal.name);
     const valid=exercises.filter(ex=>!ex.needsReview).every(ex=>env.availableInEnvironment(env.findMovement(dictionaryData,ex.name),scenario)&&env.findMovement(dictionaryData,ex.name).nivel!==3);
     if(missing.length)FitApp.beginWorkoutExecution();
     return {missing,valid,unchanged:original===FitStore.get('fitapp_custom_workouts'),active:state.isWorkoutActive};
    },{day,scenario});
    assert.deepEqual(result.missing,scenario.missing,day+' '+JSON.stringify(scenario));
    assert.equal(result.valid,true);assert.equal(result.unchanged,true);assert.equal(result.active,false);
    assert.equal(await page.locator('.environment-warning').count(),scenario.missing.length);
    if(scenario.missing.length)assert.match(await page.locator('.environment-warning').first().textContent(),/foco muscular e padrão de movimento/);
    checks.push({day,...scenario,status:'ok'});
   }
  }
  const generator=await page.evaluate(async()=>{
   const {executeForgeLogic}=await import('/js/forge.js');
   const {matchesMovementRequirement}=await import('/js/movement-requirements.js');
   const options={environment:'casa',resources:['dumbbells','bench','pullup-bar'],allEquipment:true};
   const routine=executeForgeLogic('abc','pull',[],options);
   const names=routine.flatMap(block=>block.exercises.map(ex=>ex.name));
   let noBar;
   try{executeForgeLogic('abc','pull',[],{...options,resources:['dumbbells','bench']});}catch(error){noBar=error.message;}
   const movements=names.map(name=>dictionaryData.find(item=>item.name===name));
   return {names,noBar,hasNeutralOrPronatedCurl:movements.some(item=>matchesMovementRequirement(item,'Bíceps','Braquial / Antebraço')),hasHorizontalRow:movements.some(item=>matchesMovementRequirement(item,'Costas','Espessura (Romboides)'))};
  });
  assert.equal(generator.hasNeutralOrPronatedCurl,true);
  assert.ok(generator.names.includes('Barra Fixa com Apoio dos Pés'));
  assert.equal(generator.hasHorizontalRow,true);
  assert.match(generator.noBar,/Latíssimo do Dorso/);
  assert.deepEqual(errors,[]);
  fs.writeFileSync('audit/traditional-alignment-validation.json',JSON.stringify({environment:'local; Firebase simulated',checks,generator,pageErrors:errors},null,2)+'\n');
  console.log('Tradicional iniciante: 15 cenários de interface aprovados; avisos, recursos e fichas preservados.');
 }finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
 }
})().catch(error=>{console.error(error);process.exitCode=1;});
