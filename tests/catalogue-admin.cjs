const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs').replace('claims:{}}','claims:{admin:true}}');
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({serviceWorkers:'block'});
 try{
  await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const origin=`http://127.0.0.1:${server.address().port}`;
  await page.goto(origin+'/admin.html');await page.waitForFunction(()=>document.getElementById('adminStatus').textContent.includes('logado'));
  const exercise=await page.evaluate(()=>dictionaryData[0]);
  await page.fill('#dictName','Exercício inexistente');await page.fill('#dictTip','Dica');await page.evaluate(()=>salvarDicionario());
  assert.match(await page.locator('#dictStatus').textContent(),/catálogo publicado/);
  await page.fill('#dictName',exercise.name);assert.equal(await page.locator('#dictGroup').inputValue(),exercise.group);
  await page.fill('#dictTip','Dica complementar verificada.');await page.evaluate(()=>salvarDicionario());
  assert.match(await page.locator('#dictStatus').textContent(),/gravada/);
  // A record outside the published catalogue cannot change client structure.
  await page.evaluate(()=>firebase.firestore().collection('dicionario').doc('foreign').set({nome:'Fora do catálogo',grupo:'Outro',dica:'Dica externa'}));
  await page.goto(origin);await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
  const result=await page.evaluate(async name=>{await(await import('/js/sync.js')).syncTacticalDictionary();return{record:dictionaryData.find(ex=>ex.name===name),unknown:dictionaryData.some(ex=>ex.name==='Fora do catálogo')};},exercise.name);
  assert.equal(result.record.desc,'Dica complementar verificada.');assert.equal(result.record.group,exercise.group);assert.equal(result.unknown,false);
  assert.deepEqual(errors,[]);console.log('Catálogo: dicas administrativas funcionam sem alterar a estrutura publicada.');
 }finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
