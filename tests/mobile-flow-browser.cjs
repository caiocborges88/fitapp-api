const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs');
const auditPrefix=process.env.FITAPP_AUDIT_PREFIX||'mobile-flow';

(async()=>{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    let browser;const checks=[],metrics=[];
    try{
        browser=await chromium.launch({channel:'msedge',headless:true});
        const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
        await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
        const page=await context.newPage(),errors=[];
        page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
        const origin='http://127.0.0.1:'+server.address().port;
        await page.goto(origin);await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
        await page.evaluate(async()=>{
            FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'quick',name:'Minha ficha de hoje',revision:1,routine:[{title:'Principal',type:'traditional',exercises:[{id:'s',name:'Supino Reto com Barra',sets:3,target:'10 rep'},{id:'c',name:'Prancha Isométrica Frontal',sets:3,target:'30 seg'}]}]}]));
            FitStore.set('fitapp_quick_workout','custom_quick');FitApp.renderCustomWorkouts();await (await import('/js/sync.js')).saveCampaignToCloud();
        });
        await page.waitForFunction(()=>document.getElementById('quickWorkoutName')?.textContent.includes('Minha ficha'));
        await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`audit/${auditPrefix}-home.png`});
        await page.evaluate(()=>FitApp.openForgeModal());await page.screenshot({path:`audit/${auditPrefix}-creation.png`});
        await page.evaluate(()=>document.getElementById('forgeModal').style.display='none');
        for(const [scheme,width,height]of [['light',390,844],['dark',360,740],['light',1280,900]]){
            await page.emulateMedia({colorScheme:scheme});await page.setViewportSize({width,height});
            await page.click('#quickWorkoutOpen');
            await page.waitForFunction(()=>document.body.classList.contains('preview-active'));
            assert.equal(await page.locator('.exercise-settings[open]').count(),0);
            assert.equal(await page.locator('#customWorkoutName').isVisible(),false);
            assert.equal(await page.locator('#bottomNav').isVisible(),false);
            const geometry=await page.evaluate(()=>{const b=document.getElementById('btnStartWorkout').getBoundingClientRect();return {scrollY,top:b.top,bottom:b.bottom,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth+1};});
            assert.equal(geometry.scrollY,0);assert.ok(geometry.top>=0&&geometry.bottom<=geometry.height);assert.equal(geometry.overflow,false);
            await page.screenshot({path:`audit/${auditPrefix}-preview-${width}-${scheme}.png`});
            await page.click('#btnStartWorkout');
            assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
            assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts'))[0].routine[0].exercises[0].sets),3);
            metrics.push({width,height,scheme,touchesToStart:2,requiredScrollToStart:0});
            await page.evaluate(()=>window.abortarMissao());
        }
        checks.push('acesso rápido em dois toques sem rolagem; revisão compacta e ficha original preservada');
        await page.setViewportSize({width:390,height:844});
        await page.click('#quickWorkoutOpen');await page.locator('.exercise-settings').first().locator('summary').click();
        await page.locator('.editor-sets').first().fill('5');await page.locator('.editor-sets').first().dispatchEvent('change');
        await page.waitForFunction(()=>FitStore.keys().some(key=>key.startsWith('fitapp_workout_draft:')));
        const draftKey=await page.evaluate(()=>FitStore.keys().find(key=>key.startsWith('fitapp_workout_draft:')));
        await page.reload();await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
        await page.click('#draftHomeShortcut');await page.getByRole('button',{name:'Continuar',exact:true}).first().click();
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentRoutine[0].exercises[0].sets),5);
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts'))[0].routine[0].exercises[0].sets),3);
        await page.click('#btnStartWorkout');
        assert.equal(await page.evaluate(()=>FitStore.keys().some(key=>key.startsWith('fitapp_workout_draft:'))),false);
        await page.evaluate(()=>window.abortarMissao());checks.push('rascunho de sessão sobrevive à recarga e é removido após início durável');

        await page.click('#nav-workouts');await page.getByRole('button',{name:/Cadastrar minha ficha/}).click();
        await page.fill('#customWorkoutName','Nova ficha móvel');await page.getByRole('button',{name:'Exercício',exact:true}).click();
        await page.fill('#searchAddInput','Supino Reto com Barra');await page.locator('#addExerciseList .swap-item').first().click();
        await page.getByRole('button',{name:'Adicionar à ficha',exact:true}).click();
        await page.locator('#previewMore>summary').click();await page.selectOption('#sessionRestSeconds','90');await page.locator('#previewMore>summary').click();
        await page.screenshot({path:`audit/${auditPrefix}-manual.png`});
        await page.reload();await page.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
        await page.click('#draftHomeShortcut');await page.getByRole('button',{name:'Continuar',exact:true}).first().click();
        assert.equal(await page.locator('#customWorkoutName').inputValue(),'Nova ficha móvel');
        await page.click('#saveAndTrainButton');
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentRestTime),90);
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts')).length),2);
        await page.evaluate(()=>window.abortarMissao());checks.push('montagem manual, recuperação e salvar para iniciar sem retornar à lista');

        await page.click('#btnEnvToggle');await page.selectOption('#environmentSelect','casa');
        await page.locator('[data-environment-resource="dumbbells"]').check();
        await page.getByRole('dialog').getByRole('button',{name:'Concluir',exact:true}).click();
        await page.evaluate(()=>FitApp.openForgeModal());
        assert.match(await page.locator('#forgeEnvironmentSummary').textContent(),/Casa.*halteres/);
        assert.equal(await page.locator('.forge-equip-chip[data-equip="Pesos_Livres"]').getAttribute('aria-pressed'),'true');
        await page.evaluate(()=>{document.getElementById('forgeModal').style.display='none';FitApp.setGlobalEnvironment('academia');});
        await page.click('#btnEnvToggle');await page.locator('[data-environment-equipment="Barras_Anilhas"]').uncheck();
        await page.getByRole('dialog').getByRole('button',{name:'Concluir',exact:true}).click();
        await page.evaluate(()=>FitApp.startWorkout('custom_quick'));
        assert.match(await page.locator('#routineReview').textContent(),/não atende/);
        await page.click('#btnStartWorkout');assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),false);
        await page.evaluate(()=>{FitApp.cancelWorkoutPreview();FitApp.setEnvironmentEquipment(['Pesos_Livres','Maquinas_Polias','Barras_Anilhas','Peso_Corporal','Calistenia']);});
        checks.push('ambiente e recursos compartilhados; academia bloqueia equipamento desmarcado');

        await page.evaluate(()=>{FitApp.openForgeModal();document.getElementById('forgeMethod').value='ppl';FitApp.generateForgedWorkout();});
        await page.getByRole('tab',{name:/Treino B/}).click();
        assert.equal(await page.locator('#saveAndTrainButton').textContent(),'Salvar e treinar B');
        await page.screenshot({path:`audit/${auditPrefix}-cycle.png`});
        await page.click('#saveAndTrainButton');
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.currentWorkoutType),'B');
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.isWorkoutActive),true);
        await page.evaluate(()=>window.abortarMissao());checks.push('ciclo completo salvo e início do dia escolhido');

        await page.evaluate(()=>FitEditor.editTemplate('quick'));
        await page.fill('#customWorkoutName','Edição recuperável');await page.evaluate(()=>FitApp.cancelWorkoutPreview());
        const staleKey=await page.evaluate(()=>FitStore.keys().find(key=>key.startsWith('fitapp_workout_draft:')&&JSON.parse(FitStore.get(key)).context.kind==='template'));
        await page.evaluate(()=>{const list=JSON.parse(FitStore.get('fitapp_custom_workouts'));list[0].revision++;FitStore.set('fitapp_custom_workouts',JSON.stringify(list));});
        await page.evaluate(async key=>(await import('/js/drafts.js')).restoreDraft(key),staleKey);
        assert.equal(await page.evaluate(async()=>(await import('/js/state.js')).state.editorContext.kind),'new');
        await page.click('#saveTemplateButton');
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts')).length),3);
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_custom_workouts'))[0].name),'Minha ficha de hoje');
        checks.push('rascunho de revisão antiga recuperado como cópia sem sobrescrever ficha atual');

        await page.evaluate(()=>FitApp.createManualWorkout());await page.fill('#customWorkoutName','Falha de armazenamento');
        const quota=await page.evaluate(()=>{
            const previous=FitStore.set;FitStore.set=(key,value)=>{if(key.startsWith('fitapp_workout_draft:'))throw new Error('quota');return previous(key,value);};
            document.getElementById('customWorkoutName').value='Não perder';const result=FitApp.cancelWorkoutPreview();FitStore.set=previous;return result;
        });assert.equal(quota,false);assert.equal(await page.locator('#workoutPreview').isVisible(),true);
        checks.push('falha ao guardar rascunho mantém edição aberta');
        await page.evaluate(()=>FitApp.cancelWorkoutPreview());

        await page.evaluate(()=>FitApp.startWorkout('custom_quick'));
        const startQuota=await page.evaluate(async()=>{
            const previous=FitStore.set;FitStore.set=(key,value)=>{if(key==='fitapp_active_state')throw new Error('quota');return previous(key,value);};
            try{FitApp.beginWorkoutExecution();return (await import('/js/state.js')).state.isWorkoutActive;}finally{FitStore.set=previous;}
        });assert.equal(startQuota,false);assert.equal(await page.locator('#workoutPreview').isVisible(),true);
        await page.evaluate(()=>FitApp.cancelWorkoutPreview());checks.push('falha ao gravar sessão impede início e preserva revisão');

        await page.evaluate(()=>FitApp.createManualWorkout());await context.setOffline(true);await page.fill('#customWorkoutName','Rascunho offline');
        const forkKey=await page.evaluate(async()=>{const {state}=await import('/js/state.js');return 'fitapp_workout_draft:'+state.draftId;});
        assert.equal(await page.evaluate(key=>JSON.parse(FitStore.get(key)).name,forkKey),'Rascunho offline');await context.setOffline(false);
        const mock=await page.evaluate(()=>sessionStorage.getItem('mock-firebase'));
        const other=await context.newPage();other.on('pageerror',error=>errors.push(error.message));other.on('dialog',dialog=>dialog.accept());
        await other.addInitScript(value=>sessionStorage.setItem('mock-firebase',value),mock);
        await other.goto(origin);await other.waitForFunction(()=>window.FitStore?.get('fitapp_cloud_base'));
        assert.equal(await other.evaluate(async key=>(await import('/js/drafts.js')).restoreDraft(key),forkKey),true);
        await other.fill('#customWorkoutName','Edição em outra aba');
        await page.fill('#customWorkoutName','Edição na primeira aba');
        const independent=await page.evaluate(()=>FitStore.keys().filter(key=>key.startsWith('fitapp_workout_draft:')).map(key=>JSON.parse(FitStore.get(key)).name));
        assert.ok(independent.includes('Edição em outra aba'));assert.ok(independent.includes('Edição na primeira aba'));
        await other.close();await page.evaluate(()=>FitApp.cancelWorkoutPreview());
        checks.push('edição offline e recuperação em outra aba conservam rascunhos independentes');

        const unsupported=await page.evaluate(async()=>{
            const key='fitapp_workout_draft:future',raw=JSON.stringify({version:2,userId:FitStore.uid,id:'future'});FitStore.set(key,raw);
            const restored=await (await import('/js/drafts.js')).restoreDraft(key);return {restored,preserved:FitStore.get(key)===raw};
        });assert.deepEqual(unsupported,{restored:false,preserved:true});checks.push('formato futuro de rascunho não é executado nem apagado');
        await page.evaluate(()=>FitApp.createManualWorkout());await page.fill('#customWorkoutName','Pertence à primeira conta');
        const userIsolation=await page.evaluate(async()=>{
            const mine=FitStore.keys().filter(key=>key.startsWith('fitapp_workout_draft:'));FitStore.bindUser('other-account');
            const mayReload=(await import('/js/drafts.js')).persistDraft();
            const other=FitStore.keys().filter(key=>key.startsWith('fitapp_workout_draft:'));FitStore.bindUser('browser-test');return {mine:mine.length,other:other.length,mayReload};
        });assert.ok(userIsolation.mine>0);assert.equal(userIsolation.other,0);assert.equal(userIsolation.mayReload,true);
        checks.push('rascunhos isolados por conta');
        assert.deepEqual(errors,[]);
        fs.writeFileSync(`audit/${auditPrefix}-validation.json`,JSON.stringify({status:'ok',environment:'local Edge; Firebase simulated; no physical device',checks,metrics,originalDraft:draftKey},null,2)+'\n');
        for(const check of checks)console.log('OK: '+check);
        await context.close();
    }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
