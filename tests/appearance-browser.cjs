const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const server=require('../scripts/serve.cjs');
const fake=require('./fixtures/firebase.cjs').replace("uid:'browser-test'","uid:sessionStorage.getItem('appearance-test-uid')||'browser-test'");
(async()=>{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    const browser=await chromium.launch({...(process.platform==='win32'?{channel:'msedge'}:{}),headless:true});
    const origin=`http://127.0.0.1:${server.address().port}`;
    const checks=[],matrix=[],errors=[];
    const context=await browser.newContext({viewport:{width:390,height:844},colorScheme:'light',reducedMotion:'no-preference',serviceWorkers:'block'});
    await context.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
    await context.route('**/api/**',route=>route.fulfill({json:{drawn:{id:1,name:'Halter de Ferro',icon:'🏋️',rarity:'comum'},isRepeated:true}}));
    const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
    page.on('dialog',dialog=>dialog.accept());
    const ready=async p=>{await p.waitForFunction(()=>globalThis.FitStore?.uid&&FitStore.get('fitapp_cloud_base'));await p.waitForFunction(()=>document.documentElement.dataset.theme);await p.evaluate(()=>document.fonts.ready);};
    const attr=async(name,value)=>{await page.waitForFunction(({name,value})=>document.documentElement.getAttribute(name)===value,{name,value});assert.equal(await page.locator('html').getAttribute(name),value);};
    const capture=async name=>{await page.screenshot({path:`audit/energy-${name}.png`,animations:'disabled',fullPage:!name.endsWith('-treino')});};
    try{
        await page.goto(origin);await ready(page);
        await attr('data-theme','light');await attr('data-effects','full');
        await page.click('#nav-perfil');
        await page.selectOption('#appearanceTheme','dark');await attr('data-theme','dark');
        assert.equal(await page.locator('meta[name=theme-color]').getAttribute('content'),'#080d1b');
        await page.selectOption('#appearanceEffects','reduced');await attr('data-effects','reduced');
        await page.reload();await ready(page);await attr('data-theme','dark');await attr('data-effects','reduced');
        await page.click('#nav-perfil');
        assert.equal(await page.locator('#appearanceTheme').inputValue(),'dark');
        const saved=await page.evaluate(()=>FitStore.get('fitapp_appearance'));
        const second=await context.newPage();await second.goto(origin);await ready(second);
        await page.selectOption('#appearanceTheme','light');
        await second.waitForFunction(()=>document.documentElement.dataset.theme==='light');
        await second.close();checks.push('manual theme, persistence and live update between tabs');
        await page.selectOption('#appearanceTheme','system');
        await page.emulateMedia({colorScheme:'dark'});await attr('data-theme','dark');
        await page.selectOption('#appearanceEffects','full');
        await page.emulateMedia({reducedMotion:'reduce'});await attr('data-effects','reduced');
        assert.equal(await page.locator('#appearanceEffects').inputValue(),'full');
        await page.emulateMedia({reducedMotion:'no-preference'});await attr('data-effects','full');
        checks.push('system theme and reduced motion override, including returning to full effects');
        await page.evaluate(()=>{window.appearanceOriginalSet=FitStore.set;FitStore.set=(key,value)=>{if(key==='fitapp_appearance')throw Error('quota');return window.appearanceOriginalSet(key,value);};});
        await page.selectOption('#appearanceTheme','light');await attr('data-theme','dark');
        assert.equal(await page.locator('#appearanceTheme').inputValue(),'system');
        assert.match(await page.locator('#appearanceStatus').textContent(),/Não foi possível/);
        await page.evaluate(()=>FitStore.set=window.appearanceOriginalSet);
        checks.push('storage failure preserves previous theme and reports failure');
        await page.evaluate(()=>{FitStore.set('fitapp_appearance',JSON.stringify({version:99,theme:'light',effects:'full'}));});
        await attr('data-theme','dark');
        assert.equal(await page.evaluate(()=>JSON.parse(FitStore.get('fitapp_appearance')).version),99);
        await page.evaluate(value=>FitStore.set('fitapp_appearance',value),saved);
        await page.evaluate(()=>sessionStorage.setItem('appearance-test-uid','other-test-account'));
        await page.reload();await ready(page);await attr('data-theme','dark');await attr('data-effects','full');
        assert.equal(await page.evaluate(()=>FitStore.get('fitapp_appearance')),null);
        await page.click('#nav-perfil');await page.selectOption('#appearanceTheme','light');
        await page.evaluate(()=>sessionStorage.removeItem('appearance-test-uid'));
        await page.reload();await ready(page);await attr('data-theme','dark');await attr('data-effects','reduced');
        checks.push('account isolation and unknown versions preserved');
        // Seed an existing compatible saved routine, never production data.
        await page.evaluate(async()=>{
            FitStore.set('fitapp_custom_workouts',JSON.stringify([{id:'energy',name:'Minha ficha de hoje',revision:1,routine:[{title:'Principal',type:'traditional',exercises:[{id:'supino',name:'Supino Reto com Barra',sets:2,target:'10 rep'}]}]}]));
            FitStore.set('fitapp_quick_workout','custom_energy');FitApp.renderCustomWorkouts();await(await import('/js/sync.js')).saveCampaignToCloud();
        });
        await page.waitForSelector('#quickWorkoutOpen');
        for(const [device,width,height]of [['small',360,740],['mobile',390,844],['tablet',820,1180],['desktop',1440,1000]]){
            await page.setViewportSize({width,height});
            for(const theme of ['light','dark'])for(const effects of ['full','reduced']){
                await page.evaluate(({theme,effects})=>FitStore.set('fitapp_appearance',JSON.stringify({version:1,theme,effects})),{theme,effects});
                await page.click('#nav-treino');await page.evaluate(()=>scrollTo(0,0));
                const geometry=await page.locator('#quickWorkoutOpen').boundingBox();
                assert.ok(geometry.y>=0&&geometry.y+geometry.height<=height,`${device}/${theme}/${effects}: start reachable`);
                for(const tab of ['treino','workouts','evolucao','perfil']){
                    await page.click('#nav-'+tab);
                    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${device}/${theme}/${effects}/${tab}: overflow`);
                    if(effects==='full')await capture(`${device}-${theme}-${tab}`);
                }
                const contrast=await page.evaluate(()=>{
                    const lum=hex=>{const c=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
                    const style=getComputedStyle(document.documentElement),color=n=>style.getPropertyValue(n).trim();
                    return [['--ink','--bg',4.5],['--muted','--surface',4.5],['--accent','--accent-soft',4.5],['--secondary','--secondary-soft',4.5],['--on-action','--action',4.5],['--control-line','--surface-soft',3],['--success','--success-soft',4.5],['--danger','--surface',4.5]].map(([a,b,min])=>({a,b,min,ratio:(Math.max(lum(color(a)),lum(color(b)))+.05)/(Math.min(lum(color(a)),lum(color(b)))+.05)}));
                });
                assert.ok(contrast.every(item=>item.ratio>=item.min),JSON.stringify(contrast));
                matrix.push({device,width,height,theme,effects,status:'ok',contrast});
            }
        }
        checks.push('16 viewport/theme/effects combinations, reachable start and contrast');
        await page.setViewportSize({width:360,height:740});
        await page.click('#nav-perfil');await page.selectOption('#appearanceEffects','reduced');
        await page.evaluate(()=>{const sizes=[...document.querySelectorAll('#tab-perfil *')].map(el=>[el,getComputedStyle(el).fontSize]);for(const [el,size]of sizes)el.style.fontSize=(parseFloat(size)*2)+'px';});
        await capture('profile-text-200');
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('#tab-perfil *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,id:el.id,cl:el.className})))));
        await page.reload();await ready(page);
        await page.click('#nav-treino');await page.click('#quickWorkoutOpen');await page.click('#btnStartWorkout');
        await page.locator('.rp-val').first().fill('10');await page.locator('.kg-val').first().fill('20');
        await page.locator('.chk-set').first().check();
        assert.equal(await page.locator('.set-confirmed').count(),1);
        await page.waitForSelector('.rest-timer-active');
        assert.ok(Number(await page.locator('.rest-timer-active').evaluate(el=>el.style.getPropertyValue('--rest-progress')))>0);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'session at 360px must not overflow');
        await capture('session-small-dark');
        await page.click('#btnFinishAction');
        await page.waitForFunction(()=>document.getElementById('sessionSummary').open);
        await capture('summary-small-dark');
        assert.equal(await page.locator('.summary-illustration').isVisible(),true);
        await page.evaluate(()=>document.getElementById('sessionSummary').close());
        await page.click('#nav-evolucao');
        assert.equal(await page.locator('#historyEmpty').isVisible(),false);
        assert.equal(await page.evaluate(()=>Chart.getChart(document.getElementById('radarChart')).options.animation),false);
        await page.evaluate(()=>FitGamification.showPackModal(false,JSON.parse(FitStore.get('fitapp_week_log')).at(-1)._id));
        await page.locator('#packEnvelope').press('Enter');
        await page.waitForSelector('.pack-result');
        assert.equal(await page.locator('#btnClosePack').isVisible(),true);
        assert.equal(await page.locator('#packRevealArea .btn-action').isVisible(),true);
        await capture('collection-reduced');
        checks.push('series feedback, existing rest clock, saved summary, reduced charts and keyboard reward opening');
        assert.deepEqual(errors,[]);
        const offlineContext=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'allow'});
        await offlineContext.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake:''}));
        await offlineContext.route('**/api/**',route=>route.fulfill({json:{}}));
        const offline=await offlineContext.newPage();await offline.goto(origin);await ready(offline);
        await offline.evaluate(()=>navigator.serviceWorker.ready);
        await offline.waitForFunction(()=>navigator.serviceWorker.controller);
        await offline.evaluate(async fixture=>{
            const cache=await caches.open((await caches.keys()).find(key=>key.startsWith('fitapp-')));
            for(const name of ['app','auth','firestore'])await cache.put('/vendor/firebase-'+name+'.js',new Response(name==='app'?fixture:'',{headers:{'Content-Type':'text/javascript'}}));
            FitStore.set('fitapp_appearance',JSON.stringify({version:1,theme:'dark',effects:'reduced'}));
        },fake);
        await offlineContext.setOffline(true);await offline.reload();await ready(offline);
        assert.equal(await offline.locator('html').getAttribute('data-theme'),'dark');
        assert.equal(await offline.locator('html').getAttribute('data-effects'),'reduced');
        await offline.click('#nav-perfil');await offline.selectOption('#appearanceTheme','light');
        await offline.reload();await ready(offline);
        assert.equal(await offline.locator('html').getAttribute('data-theme'),'light');
        assert.ok(await offline.evaluate(async()=>{const results=await Promise.all(['preparation','movement','celebration'].map(name=>fetch('/illustrations/'+name+'.svg').then(res=>res.ok)));return results.every(Boolean);}));
        await offlineContext.close();checks.push('authenticated offline reload, preference changes and all illustrations cached; Firebase simulated');
        // Signed-out login follows the system and has all decorative assets available.
        const loginContext=await browser.newContext({viewport:{width:390,height:844},colorScheme:'light',serviceWorkers:'block'});
        await loginContext.route('**/vendor/firebase-*.js',route=>route.fulfill({contentType:'text/javascript',body:route.request().url().endsWith('firebase-app.js')?fake.replace('currentUser:user','currentUser:null'):''}));
        const login=await loginContext.newPage();await login.goto(origin);await login.evaluate(()=>document.fonts.ready);
        await login.screenshot({path:'audit/energy-login-light.png',fullPage:false});
        await login.emulateMedia({colorScheme:'dark'});await login.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
        await login.screenshot({path:'audit/energy-login-dark.png',fullPage:false});await loginContext.close();
        await page.setViewportSize({width:1280,height:1000});await page.goto(origin+'/design-reference.html');await page.waitForFunction(()=>[...document.querySelectorAll('iframe')].every(frame=>parseFloat(frame.style.height)>1100));await page.screenshot({path:'audit/energy-reference.png',fullPage:true});
        fs.writeFileSync('audit/energy-validation.json',JSON.stringify({checkedAt:new Date().toISOString(),environment:'Local Edge automation; Firebase simulated; no physical devices',checks,matrix,errors},null,2)+'\n');
        console.log('Aparência: preferências, contas, contraste, 16 combinações e sessão aprovados.');
    }finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
