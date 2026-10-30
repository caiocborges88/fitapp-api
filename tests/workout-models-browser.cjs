const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');

(async()=>{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    let browser,page;const checks=[],errors=[];
    try{
        browser=await chromium.launch({channel:'msedge',headless:true});
        const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
        await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
        page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
        await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>FitStore.get('fitapp_cloud_base'));
        await page.evaluate(()=>FitApp.openForgeModal());
        assert.equal(await page.locator('#forgeMethod option:not([hidden])').count(),2);
        assert.equal(await page.locator('#forgeLevel').isVisible(),false);
        await page.evaluate(()=>FitApp.generateForgedWorkout());
        assert.equal(await page.getByRole('tab').count(),3);
        await page.getByRole('tab',{name:/Treino B/}).click();assert.match(await page.locator('#cycle-day-panel').textContent(),/2 × 20–30 seg por lado/);
        await page.getByRole('tab',{name:/Treino A/}).click();
        assert.match(await page.locator('#cycle-day-panel').textContent(),/120|Descanso/);
        await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));
        await page.screenshot({path:'audit/workout-models-cycle-light.png'});
        await page.click('#saveAndTrainButton');
        await page.waitForFunction(async()=>(await import('/js/state.js')).state.isWorkoutActive);
        const plan=await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_campaign_data')));
        assert.equal(plan.method,'abc_tradicional');assert.equal(plan.schemaVersion,2);assert.equal(plan.level,'padrao');
        assert.equal(plan.workouts.A[0].restSeconds,120);
        assert.equal(await page.locator('.chk-set').count(),13);
        const original=JSON.stringify(plan.workouts.A);
        await page.locator('.rp-val').first().fill('10');await page.locator('.chk-set').first().check();
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentRestTime),120);
        await page.evaluate(()=>FitApp.adjustRestTime(150));
        await page.reload();await page.waitForFunction(async()=>window.FitStore?.get('fitapp_cloud_base')&&(await import('/js/state.js')).state.isWorkoutActive);
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentRestTime),150);
        assert.equal(await page.locator('.chk-set:checked').count(),1);
        assert.equal(await page.evaluate(()=>JSON.stringify(JSON.parse(FitStore.get('fitapp_campaign_data')).workouts.A)),original);
        checks.push('ABC fixo, parâmetros por bloco, nível neutro, sessão e descanso recuperados sem sobrescrever ficha');

        await page.evaluate(()=>{window.realQueue=FitStore.updateQueue;FitStore.updateQueue=async()=>{throw new Error('simulated storage failure');};});
        await page.click('#btnFinishAction');
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
        await page.evaluate(()=>{FitStore.updateQueue=window.realQueue;});await page.click('#btnFinishAction');
        await page.waitForFunction(()=>document.getElementById('sessionSummary').open);
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_week_log')).at(-1).complete),false);
        await page.evaluate(()=>document.getElementById('sessionSummary').close());
        await page.click('#nav-treino');await page.waitForFunction(()=>document.getElementById('quickWorkoutName')?.textContent.startsWith('Treino B'));
        checks.push('falha de salvamento mantém sessão; parcial confirmado avança de A para B');

        await page.click('#quickWorkoutOpen');await page.click('#btnStartWorkout');
        const side=await page.evaluate(async()=>{const {state}=await import('/js/state.js');return state.currentRoutine.findIndex(b=>b.exercises.some(e=>e.sideMode==='alternating'));});
        assert.equal(await page.locator(`#chk_set_${side}_0_1`).getAttribute('aria-label'),'Série 1, lado esquerdo realizada');
        await page.locator(`#rp_set_${side}_0_1`).fill('21');await page.locator(`#chk_set_${side}_0_1`).check();
        assert.equal(await page.locator('.rest-timer-active').count(),0);
        await page.locator(`#rp_set_${side}_0_2`).fill('27');await page.locator(`#chk_set_${side}_0_2`).check();
        assert.equal(await page.locator('.rest-timer-active').count(),1);
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentRestTime),75);
        await page.evaluate(()=>window.abortarMissao());
        checks.push('lados têm campos e registros separados; descanso somente após ambos');

        await page.evaluate(()=>{FitApp.openForgeModal();document.getElementById('forgeMethod').value='abc_sinergista';FitApp.updateForgeOptions();FitApp.generateForgedWorkout();});
        await page.click('#saveAndTrainButton');await page.waitForFunction(async()=>(await import('/js/state.js')).state.isWorkoutActive);
        const before=await page.evaluate(()=>JSON.stringify(JSON.parse(FitStore.get('fitapp_campaign_data')).workouts.A));
        await page.locator('#exerciseList .model-block-tools>summary').first().click();
        await page.getByRole('button',{name:'Fazer em séries convencionais',exact:true}).first().click();
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine[0].type),'traditional');
        await page.getByRole('button',{name:'Voltar a executar em par',exact:true}).first().click();
        await page.getByRole('button',{name:'Escolher outro par',exact:true}).first().click();
        const dialog=page.locator('.model-dialog');assert.equal(await dialog.isVisible(),true);
        await dialog.locator('select').first().selectOption({label:'Supino Inclinado com Barra'});
        await dialog.getByRole('button',{name:'Aplicar somente nesta sessão'}).click();
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine[0].exercises[0].name),'Supino Inclinado com Barra');
        assert.equal(await page.evaluate(()=>JSON.stringify(JSON.parse(FitStore.get('fitapp_campaign_data')).workouts.A)),before);
        await page.locator('#rp_set_0_0_1').fill('10');await page.locator('#chk_set_0_0_1').check();
        assert.equal(await page.locator('.rest-timer-active').count(),0);
        await page.locator('#rp_set_0_1_1').fill('12');await page.locator('#chk_set_0_1_1').check();
        assert.equal(await page.locator('.rest-timer-active').count(),1);
        await page.getByRole('button',{name:'Salvar alterações na ficha original',exact:true}).click();
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_campaign_data')).workouts.A[0].exercises[0].name),'Supino Inclinado com Barra');
        assert.equal(await page.locator('.chk-set:checked').count(),2);
        checks.push('par pode virar convencional ou trocar por candidatos revisados; salvar na ficha é separado e preserva registros');
        for(const [scheme,width,height]of [['dark',360,800],['light',1280,900]]){
            await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));
            await page.emulateMedia({colorScheme:scheme});await page.setViewportSize({width,height});
            await page.evaluate(()=>{document.querySelectorAll('#exerciseList .model-block-tools').forEach(d=>d.open=false);scrollTo(0,0);});
            await page.screenshot({path:'audit/workout-models-session-'+scheme+'.png'});
            assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
        }
        await page.setViewportSize({width:390,height:844});
        await page.evaluate(()=>window.abortarMissao());

        await page.evaluate(()=>{FitApp.openForgeModal();document.getElementById('forgeMethod').value='abc_tradicional';FitApp.generateForgedWorkout();});
        await page.click('#saveAndTrainButton');
        await page.locator('#exerciseList .model-optionals>summary').click();await page.locator('#exerciseList .model-optionals input').check();
        assert.equal(await page.locator('.chk-set').count(),15);
        await page.locator('#exerciseList .model-optionals>summary').click();await page.locator('#exerciseList .model-optionals input').uncheck();assert.equal(await page.locator('.chk-set').count(),13);
        await page.locator('#exerciseList .model-optionals>summary').click();await page.locator('#exerciseList .model-optionals input').check();
        await page.evaluate(async()=>{
            const {state}=await import('/js/state.js');
            for(const block of state.currentRoutine.filter(b=>!b.optional))for(const ex of block.exercises)ex.setsData=Array.from({length:ex.sets},()=>({kg:'',reps:'10',measurementType:'reps',checked:true}));
            FitApp.renderCurrentRoutine();FitApp.saveWorkoutState();
        });
        assert.equal(await page.locator('#btnFinishAction').textContent(),'Concluir parte principal');
        await page.click('#btnFinishAction');await page.waitForFunction(()=>document.getElementById('sessionSummary').open);
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_week_log')).at(-1).complete),true);
        await page.evaluate(()=>document.getElementById('sessionSummary').close());
        checks.push('complemento pode ser ativado na sessão e não impede conclusão da parte principal');

        await page.evaluate(()=>{const plan=JSON.parse(FitStore.get('fitapp_campaign_data'));plan.startDate='2026-01-01T12:00:00Z';FitStore.set('fitapp_campaign_data',JSON.stringify(plan));});
        await page.click('#nav-treino');await page.waitForFunction(()=>document.querySelector('.model-review-reminder'));
        const reminderSnapshot=await page.evaluate(()=>JSON.stringify(JSON.parse(FitStore.get('fitapp_campaign_data')).workouts));
        await page.getByRole('button',{name:'Registrar revisão sem mudar a ficha'}).click();
        assert.equal(await page.evaluate(()=>JSON.stringify(JSON.parse(FitStore.get('fitapp_campaign_data')).workouts)),reminderSnapshot);
        assert.equal(await page.locator('.model-review-reminder').count(),0);
        checks.push('revisão trimestral só sugere ação e mantém a ficha');
        const offlineContext=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});
        await offlineContext.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
        await offlineContext.route('**/api/**',route=>route.fulfill({json:{}}));
        const offline=await offlineContext.newPage();offline.on('pageerror',error=>errors.push(error.message));offline.on('dialog',d=>d.accept());
        await offline.goto('http://127.0.0.1:'+server.address().port);await offline.waitForFunction(()=>FitStore.get('fitapp_cloud_base'));
        await offline.evaluate(()=>navigator.serviceWorker.ready);await offline.waitForFunction(()=>navigator.serviceWorker.controller);
        await offline.evaluate(async fixture=>{
            const cache=await caches.open((await caches.keys()).find(key=>key.startsWith('fitapp-')));
            for(const name of ['app','auth','firestore'])await cache.put('/vendor/firebase-'+name+'.js',new Response(name==='app'?fixture:'',{headers:{'Content-Type':'text/javascript'}}));
            if(!(await cache.match('/js/workout-models.js'))||!(await cache.match('/js/model-controls.js')))throw new Error('Módulos novos fora do cache');
            FitApp.openForgeModal();document.getElementById('forgeMethod').value='abc_sinergista';FitApp.generateForgedWorkout();
            if(!FitEditor.saveEditor())throw new Error('Plano não salvo');
            FitApp.startWorkout('C');FitApp.beginWorkoutExecution();
        },fake);
        await offline.locator('#rp_set_0_0_1').fill('10');await offline.locator('#chk_set_0_0_1').check();
        await offlineContext.setOffline(true);await offline.reload();
        await offline.waitForFunction(async()=>window.FitStore?.uid&&(await import('/js/state.js')).state.isWorkoutActive);
        assert.equal(await offline.locator('.chk-set:checked').count(),1);
        assert.equal(await offline.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine[0].restSeconds),150);
        await offline.click('#btnFinishAction');await offline.waitForFunction(()=>document.getElementById('sessionSummary').open);
        assert.equal(await offline.evaluate(()=>JSON.parse(FitStore.get('fitapp_sync_queue')).at(-1).complete),false);
        assert.equal(await offline.evaluate(()=>JSON.parse(FitStore.get('fitapp_campaign_data')).method),'abc_sinergista');
        await offlineContext.close();checks.push('modelo novo, scripts e sessão autenticada recuperados offline; parcial permanece na fila local');
        assert.deepEqual(errors,[]);
        fs.writeFileSync('audit/workout-models-browser-validation.json',JSON.stringify({date:'2026-10-29',browser:'Edge headless',services:'Firebase simulado',physicalDevices:false,checks,errors},null,2));
        console.log('Novos modelos:',checks.length,'cenários aprovados');
    }catch(error){console.error(error);if(page)console.log(await page.evaluate(async()=>({toast:document.getElementById('toast')?.textContent,optional:(await import('/js/state.js')).state.currentRoutine.filter(b=>b.optional).map(b=>({enabled:b.enabled,checked:b.exercises.map(e=>e.setsData?.map(s=>s.checked))}))})));process.exitCode=1;}
    finally{await browser?.close();server.close();}
})();
