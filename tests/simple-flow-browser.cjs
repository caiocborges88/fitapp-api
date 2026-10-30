const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');
const prefix=(process.env.FITAPP_AUDIT_PREFIX||'simplificacao')+'-simple-flow';

(async()=>{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    let browser;const checks=[],errors=[],metrics=[];
    try{
        browser=await chromium.launch({channel:'msedge',headless:true});
        const context=await browser.newContext({viewport:{width:360,height:740},serviceWorkers:'block',reducedMotion:'reduce'});
        await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
        const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
        await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>FitStore.get('fitapp_cloud_base'));
        const active=()=>page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive);
        const planValue=()=>page.evaluate(()=>FitStore.get('fitapp_campaign_data'));
        const abort=async()=>{await page.evaluate(()=>window.abortarMissao());await page.waitForFunction(()=>!document.body.classList.contains('session-active'));};
        await page.locator('#chooseInitialModel').click();
        assert.equal(await page.locator('#forgeMethod option:not([hidden])').count(),2);
        for(const id of ['forgeProfile','forgeLevel'])assert.equal(await page.locator('#'+id).isVisible(),false);
        await page.locator('#forgeMethod').selectOption('abc_sinergista');assert.match(await page.locator('#forgeModelDescription').textContent(),/pares/);
        await page.locator('#forgeMethod').selectOption('abc_tradicional');
        await page.emulateMedia({colorScheme:'dark'});await page.screenshot({path:`audit/${prefix}-choose-dark.png`});
        await page.getByRole('button',{name:'Conferir modelo',exact:true}).click();
        assert.equal(await page.getByRole('tab').count(),3);assert.ok(!await planValue());
        await page.click('#saveAndTrainButton');assert.equal(await active(),true);
        const saved=await planValue();checks.push('primeiro uso escolhe dois modelos, confere ABC completo e salva antes de iniciar');
        await abort();

        for(const [width,height,scheme]of [[360,740,'dark'],[390,844,'light'],[1440,1000,'dark']]){
            await page.setViewportSize({width,height});await page.emulateMedia({colorScheme:scheme});
            await page.click('#nav-treino');await page.evaluate(()=>scrollTo(0,0));
            await page.waitForFunction(()=>document.getElementById('quickWorkoutOpen')?.getBoundingClientRect().height>0);
            assert.equal(await page.locator('.home-overview').isVisible(),false);
            assert.equal(await page.locator('#workoutCards').isVisible(),false);
            assert.equal(await page.locator('#otherActivities').getAttribute('open'),null);
            const box=await page.locator('#quickWorkoutOpen').boundingBox();assert.ok(box.y>=0&&box.y+box.height<=height);
            assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
            await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));await page.screenshot({path:`audit/${prefix}-home-${width}-${scheme}.png`});
            await page.click('#quickWorkoutOpen');assert.equal(await active(),true);
            assert.equal(await planValue(),saved);assert.equal(await page.locator('.chk-set:checked').count(),0);
            metrics.push({width,height,scheme,touchesToStart:1,requiredScrollToStart:0});
            await abort();
        }
        checks.push('início em um toque, sem rolagem, sem reconstruir ficha; abandonar não avança');

        await page.setViewportSize({width:390,height:844});await page.click('#quickWorkoutReview');
        await page.locator('.exercise-settings').first().locator('summary').click();
        await page.locator('.editor-sets').first().fill('4');await page.locator('.editor-sets').first().dispatchEvent('change');
        assert.equal(await planValue(),saved);await page.click('#btnStartWorkout');assert.equal(await active(),true);
        await page.locator('.rp-val').first().fill('10');await page.locator('.chk-set').first().check();
        const sessionId=await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_active_state')).sessionId);
        await page.reload();await page.waitForFunction(async()=>FitStore.get('fitapp_cloud_base')&&(await import('/js/state.js')).state.isWorkoutActive);
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_active_state')).sessionId),sessionId);
        assert.equal(await page.locator('.chk-set:checked').count(),1);assert.equal(await planValue(),saved);
        await context.setOffline(true);await page.click('#btnFinishAction');await page.waitForFunction(()=>document.getElementById('sessionSummary').open);
        await page.evaluate(()=>document.getElementById('sessionSummary').close());
        await page.click('#nav-treino');await page.waitForFunction(()=>document.getElementById('quickWorkoutName').textContent.startsWith('Treino B'));
        await context.setOffline(false);checks.push('ajustes sob demanda, recarga da sessão e parcial offline avançam sem alterar o plano');

        // A queue acknowledgement represents the same durable record, not another workout.
        await context.setOffline(true);
        await page.evaluate(()=>FitStore.set('fitapp_sync_queue',JSON.stringify([JSON.parse(FitStore.get('fitapp_week_log')).at(-1)])));
        await page.locator('.quick-workout-choice>summary').click();await page.selectOption('#quickWorkoutSelect','C');
        await page.evaluate(()=>FitStore.set('fitapp_sync_queue','[]'));
        await page.waitForFunction(()=>document.getElementById('quickWorkoutName').textContent.startsWith('Treino C'));
        await page.selectOption('#quickWorkoutSelect','B');await context.setOffline(false);
        checks.push('troca manual do dia permanece ao confirmar o envio do mesmo registro');

        // A failed durable start leaves the review open and the previous plan intact.
        const failed=await page.evaluate(()=>{
            const original=FitStore.set;FitStore.set=(key,value)=>{if(key==='fitapp_active_state')throw new Error('quota');return original(key,value);};
            try{return FitApp.startSavedWorkout('B');}finally{FitStore.set=original;}
        });
        assert.equal(failed,false);assert.equal(await active(),false);assert.equal(await page.locator('#workoutPreview').isVisible(),true);
        assert.equal(await planValue(),saved);await page.evaluate(()=>FitApp.cancelWorkoutPreview());
        await page.click('#btnEnvToggle');await page.locator('[data-environment-equipment="Barras_Anilhas"]').uncheck();
        await page.getByRole('dialog').getByRole('button',{name:'Concluir',exact:true}).click();
        await page.click('#quickWorkoutOpen');assert.equal(await active(),false);
        assert.equal(await page.locator('#workoutPreview').isVisible(),true);assert.ok(await page.locator('#routineReview li').count()>0);
        assert.equal(await planValue(),saved);
        await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitApp.setEnvironmentEquipment(['Pesos_Livres','Maquinas_Polias','Barras_Anilhas','Peso_Corporal','Calistenia']);});
        checks.push('falha de armazenamento e equipamentos incompatíveis mantêm conferência aberta; nenhuma alteração silenciosa');

        await page.click('#nav-workouts');await page.waitForSelector('#currentPlanPanel');
        assert.equal(await page.locator('#planDaysList .plan-day-row').count(),3);
        await page.emulateMedia({colorScheme:'light'});await page.waitForFunction(()=>!document.getElementById('toast').classList.contains('show'));await page.screenshot({path:`audit/${prefix}-workouts-light.png`,fullPage:true});
        assert.equal(await page.getByRole('button',{name:'Cadastrar minha ficha',exact:false}).isVisible(),false);
        await page.click('#workoutAddButton');assert.equal(await page.getByRole('button',{name:'Cadastrar minha ficha',exact:false}).isVisible(),true);
        await page.keyboard.press('Escape');await page.click('#nav-perfil');
        for(const id of ['mainMethodSelector','profileSelector','levelSelector'])assert.equal(await page.locator('#'+id).isVisible(),false);
        assert.doesNotMatch(await page.locator('#tab-perfil').innerText(),/Preferências de treino|Experiência:/);
        checks.push('plano atual antes da criação; cadastro secundário e perfil sem prescrição');

        await page.evaluate(()=>{
            FitStore.set('fitapp_campaign_data',JSON.stringify({id:'legacy-fixed',method:'abcd',revision:7,workouts:{A:[{title:'Legado',type:'traditional',exercises:[{name:'Supino Reto com Barra',sets:2,target:'10 rep'}]}]}}));
            FitStore.set('fitapp_main_method','abc_tradicional');FitApp.updateDynamicCards();
        });
        const legacy=await planValue();assert.equal(await page.evaluate(()=>FitApp.startSavedWorkout('A')),true);assert.equal(await planValue(),legacy);await abort();
        const unknown=await page.evaluate(()=>{const plan=JSON.parse(FitStore.get('fitapp_campaign_data'));plan.schemaVersion=99;const value=JSON.stringify(plan);FitStore.set('fitapp_campaign_data',value);return value;});
        assert.equal(await page.evaluate(()=>FitApp.startSavedWorkout('A')),false);assert.equal(await planValue(),unknown);
        const pending='{"version":99,"userId":"browser-test","doNotLose":true}';
        await page.evaluate(value=>FitStore.set('fitapp_active_state',value),pending);
        assert.equal(await page.evaluate(()=>FitApp.startSavedWorkout('A')),false);assert.equal(await page.evaluate(()=>FitStore.get('fitapp_active_state')),pending);
        checks.push('legado incompleto não é reconstruído; versões desconhecidas de plano e sessão são preservadas');
        assert.deepEqual(errors,[]);
        fs.writeFileSync(`audit/${prefix}-validation.json`,JSON.stringify({status:'ok',environment:'Edge automatizado; Firebase simulado; sem aparelhos físicos ou produção',checks,metrics,pageErrors:errors},null,2)+'\n');
        console.log(checks.join('\n'));
    }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
