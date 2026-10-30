const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fakeFirebase=require('./fixtures/firebase.cjs');
const auditPrefix=process.env.FITAPP_AUDIT_PREFIX||'energy-design';
(async()=>{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    const origin=`http://127.0.0.1:${server.address().port}`;
    const browser=await chromium.launch({channel:'msedge',headless:true});
    const evidence=[];
    async function contextFor(viewport,colorScheme,signedIn=true){
        const context=await browser.newContext({viewport,colorScheme,serviceWorkers:'block',reducedMotion:'reduce'});
        await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?(signedIn?fakeFirebase:fakeFirebase.replace('currentUser:user','currentUser:null')):''}));
        await context.route('**/api/**',route=>route.fulfill({json:{}}));
        return context;
    }
    try{
        for(const scheme of ['light','dark'])for(const [device,viewport]of [['mobile',{width:390,height:844}],['desktop',{width:1440,height:1000}]]){
            const context=await contextFor(viewport,scheme);
            const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
            const capture=async(name)=>{
                await page.evaluate(()=>document.fonts.ready);
                assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${device}/${scheme}/${name}: overflow`);
                await page.screenshot({path:`audit/${auditPrefix}-${device}-${scheme}-${name}.png`,fullPage:true});
            };
            try{
                await page.goto(origin);await page.waitForFunction(()=>globalThis.FitStore?.uid==='browser-test');
                await page.waitForFunction(()=>document.getElementById('profileName').textContent==='Atleta de teste');
                const contrasts=await page.evaluate(()=>{
                    const styles=getComputedStyle(document.documentElement);
                    const luminance=name=>{
                        let hex=styles.getPropertyValue(name).trim().slice(1);
                        if(hex.length===3)hex=[...hex].map(c=>c+c).join('');
                        const channels=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
                        return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
                    };
                    return [['--ink','--bg'],['--muted','--surface'],['--on-accent','--accent'],['--accent','--accent-soft']].map(pair=>{const[a,b]=pair.map(luminance);return{pair,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};});
                });
                assert.ok(contrasts.every(pair=>pair.ratio>=4.5),JSON.stringify(contrasts));
                assert.equal(await page.locator('#snapModal').count(),0);
                await capture('home');
                for(const id of ['workouts','evolucao','perfil']){await page.click('#nav-'+id);await capture(id);}
                await page.click('#nav-workouts');await page.getByRole('button',{name:/Cadastrar minha ficha/}).click();
                await page.fill('#customWorkoutName','Minha ficha de teste');
                await page.getByRole('button',{name:'Exercício',exact:true}).click();
                await page.fill('#searchAddInput','Prancha');await page.locator('#addExerciseList .swap-item').first().click();
                await page.fill('#customSets','1');await page.getByRole('button',{name:'Adicionar à ficha',exact:true}).click();
                await page.getByRole('button',{name:'Salvar ficha',exact:true}).click();
                const id=await page.evaluate(()=>JSON.parse(FitApp.safeGet('fitapp_custom_workouts'))[0].id);
                await page.evaluate(id=>FitApp.startWorkout('custom_'+id),id);
                await page.click('#btnStartWorkout');
                await page.locator('.set-measure').first().selectOption('duration');
                await page.locator('.rp-val').first().fill('45');await page.locator('.kg-val').first().fill('0');
                await capture('session');
                await page.locator('.chk-set').first().check();
                await page.click('#btnFinishAction');
                await page.waitForFunction(()=>document.getElementById('sessionSummary').open);
                assert.equal(await page.locator('#summaryReward').isVisible(),false);
                const saved=await page.evaluate(()=>JSON.parse(FitApp.safeGet('fitapp_week_log'))[0]);
                assert.ok(saved.duration_secs<120);assert.equal(saved.data[0].durationSecs,45);assert.equal(saved.data[0].reps,0);
                await capture('summary');
                if(device==='desktop' && scheme==='light'){
                    const consoleErrors=[];page.on('console',message=>{if(message.type()==='error')consoleErrors.push(message.text());});
                    await page.evaluate(()=>Object.defineProperty(navigator,'canShare',{value:()=>false,configurable:true}));
                    const download=page.waitForEvent('download').catch(()=>null);
                    await page.evaluate(()=>FitApp.exportStravaCard(-1));
                    assert.doesNotMatch(await page.locator('#toast').textContent(),/Falha/,consoleErrors.join('\n'));
                    const file=await download;assert.ok(file,consoleErrors.join('\n'));await file.saveAs(`audit/${auditPrefix}-shared-summary.png`);
                }
                await page.evaluate(()=>document.getElementById('sessionSummary').close());
                await page.evaluate(()=>FitApp.openHistoryModal());await page.locator('#historyListView .toggle-arrow').first().click();
                assert.match(await page.locator('#historyListView').textContent(),/45 s/);
                await capture('history');
                assert.deepEqual(errors,[]);
                evidence.push({device,scheme,status:'ok',checks:['navigation','account identity','manual template','direct start','timed set','short session saved','optional reward','history units','no horizontal overflow'],pageErrors:errors});
            }finally{await context.close();}
            const login=await contextFor(viewport,scheme,false);
            try{const page=await login.newPage();await page.goto(origin);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`audit/${auditPrefix}-${device}-${scheme}-login.png`,fullPage:true});}finally{await login.close();}
        }
        fs.writeFileSync(`audit/${auditPrefix}-validation.json`,JSON.stringify({checkedAt:new Date().toISOString(),environment:'local; Firebase simulated',evidence},null,2)+'\n');
        console.log('Reformulação: celular e desktop nos dois temas; registro por tempo e sessão curta aprovados.');
    }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
