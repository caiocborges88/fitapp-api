const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
    const browser=await chromium.launch({...(process.platform==='win32'?{channel:'msedge'}:{}),headless:true});
    const context=await browser.newContext({viewport:{width:390,height:844}});
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',dialog=>dialog.accept());
    try{
        await page.goto('http://127.0.0.1:5000/?emulator=1');
        await page.waitForFunction(()=>window.FitApp);
        await page.evaluate(async()=>{
            await firebase.auth().createUserWithEmailAndPassword(`test-${Date.now()}@example.invalid`,'test-password-123');
        });
        await page.waitForFunction(()=>window.FitStore.uid);
        await page.evaluate(()=>{FitApp.lockCampaign();FitApp.startWorkout('A');FitApp.declineSnap();});
        await page.locator('.kg-val').first().fill('15');await page.locator('.rp-val').first().fill('10');
        await page.locator('.chk-set').first().check();
        await page.reload();await page.waitForFunction(()=>document.querySelector('.chk-set')?.checked);
        assert.equal(await page.locator('.kg-val').first().inputValue(),'15');
        for(const checkbox of await page.locator('.chk-set').all()){
            const row=checkbox.locator('..');
            await row.locator('.kg-val').fill('15');await row.locator('.rp-val').fill('10');
            await checkbox.check();
        }
        await page.evaluate(async()=>{(await import('/js/state.js')).state.workoutStartTime=Date.now()-180000;});
        await page.click('#btnFinishAction');
        await page.waitForFunction(()=>JSON.parse(FitApp.safeGet('fitapp_week_log')||'[]').length===1);
        await page.evaluate(()=>{const dialog=document.getElementById('sessionSummary');dialog.close();FitGamification.showPackModal(false,dialog.dataset.sessionId);});
        await page.evaluate(()=>FitGamification.openPack());
        await page.waitForFunction(()=>document.getElementById('packRevealArea').textContent.includes('Compartilhar Vitória'),{timeout:30000});
        const sessionId=await page.evaluate(()=>JSON.parse(FitApp.safeGet('fitapp_week_log'))[0]._id);
        const names=await page.evaluate(async id=>({local:JSON.parse(FitApp.safeGet('fitapp_week_log')).find(s=>s._id===id).workoutName,cloud:(await FitAPI.carregarHistoricoNuvem()).find(s=>s._id===id).workoutName}),sessionId);
        assert.ok(names.local);assert.equal(names.local,names.cloud);
        const rewards=await page.evaluate(async id=>{
            const first=await FitAPI.solicitarRecompensa(id);const again=await FitAPI.solicitarRecompensa(id);
            return{first:first.drawn.id,again:again.drawn.id,album:again.profile.album.length,points:again.profile.repetidas};
        },sessionId);
        assert.equal(rewards.first,rewards.again);assert.equal(rewards.album,1);assert.equal(rewards.points,0);
        await page.evaluate(()=>{document.getElementById('packModal').style.display='none';FitApp.startWorkout('B');FitApp.declineSnap();});
        await page.locator('.kg-val').first().fill('18');await page.locator('.rp-val').first().fill('8');await page.locator('.chk-set').first().check();
        await context.setOffline(true);await page.reload();await page.waitForFunction(()=>document.querySelector('.chk-set')?.checked);
        assert.equal(await page.locator('.kg-val').first().inputValue(),'18');
        assert.equal(await page.locator('#bottomNav').isVisible(),false);
        assert.equal(await page.locator('#campaignDashboard').isVisible(),false);
        await page.screenshot({path:path.resolve(__dirname,'../audit/fitapp-validacao.png'),fullPage:true});
        assert.deepEqual(errors,[]);
        fs.writeFileSync(path.resolve(__dirname,'../audit/emulator-browser-validation.json'),JSON.stringify({status:'ok',viewport:'390x844',checks:['Firebase Auth real no emulador','Firestore real no emulador','função HTTP autenticada','salvamento','restauração','recompensa idempotente','recarga offline autenticada'],pageErrors:errors,project:'demo-fitapp',productionWrites:false},null,2)+'\n');
        console.log('Integração completa aprovada: Auth, Firestore, API, recompensa e retomada offline.');
    }finally{await context.close();await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
