// Public and unauthenticated checks only. No sign-in and no writes to user data.
/* global window, firebase, caches, document, innerWidth */
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium,devices}=require('playwright');
const origin='https://fitapp-operacional.web.app';
const prefix=process.env.FITAPP_RELEASE_PREFIX||'abc';
if(!/^[a-z][a-z0-9-]*$/.test(prefix))throw Error('Prefixo de release inválido.');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
(async()=>{
    const expected=JSON.parse(fs.readFileSync('public/version.json','utf8')).version;
    const remote=await(await fetch(origin+'/version.json',{cache:'no-store'})).json();assert.equal(remote.version,expected);
    const files=[];const walk=dir=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const name=dir+'/'+entry.name;if(entry.isDirectory())walk(name);else files.push(name);}};walk('public');
    for(let i=0;i<files.length;i+=8)await Promise.all(files.slice(i,i+8).map(async file=>{
        const response=await fetch(origin+file.slice(6),{cache:'no-store'});assert.equal(response.status,200,file);
        assert.equal(hash(Buffer.from(await response.arrayBuffer())),hash(fs.readFileSync(file)),file);
    }));
    const headers=await fetch(origin,{cache:'no-store'});assert.equal(headers.headers.get('x-content-type-options'),'nosniff');assert.equal(headers.headers.get('x-frame-options'),'DENY');
    const api=[];for(const [route,method]of [['coach','GET'],['importar-treino-ia','POST'],['recompensas','POST']]){
        const response=await fetch(origin+'/api/'+route,{method,headers:{'content-type':'application/json'},...(method==='POST'?{body:'{}'}:{})});
        assert.equal(response.status,401,route);api.push({route,status:response.status});
    }
    const browser=await chromium.launch({channel:'msedge',headless:true}),errors=[];let cached;
    try{
        const context=await browser.newContext({...devices['Pixel 7'],reducedMotion:'reduce'}),page=await context.newPage();
        page.on('pageerror',error=>errors.push(error.message));
        await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.FitApp&&window.dictionaryData?.length);
        assert.equal(await page.locator('#loginOverlay').isVisible(),true);
        assert.equal(await page.evaluate(()=>firebase.app().options.projectId),'fitapp-operacional');
        assert.equal(await page.locator('#forgeMethod option:not([hidden])').count(),2);
        await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>navigator.serviceWorker.controller);
        cached=await page.evaluate(async()=>{
            const cache=await caches.open((await caches.keys()).find(k=>k.startsWith('fitapp-')));
            return Promise.all(['/js/workout-models.js','/js/model-controls.js','/js/editor-domain.js','/css/energy.css','/js/model-coverage.js','/js/model-coverage-view.js','/js/training-tracking.js','/js/training-tracking-view.js'].map(async path=>({path,cached:Boolean(await cache.match(path))})));
        });assert.ok(cached.every(item=>item.cached));
        for(const theme of ['light','dark']){
            await page.emulateMedia({colorScheme:theme});await page.waitForFunction(theme=>document.documentElement.dataset.theme===theme,theme);
            assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
            await page.screenshot({path:`audit/${prefix}-production-login-${theme}.png`});
        }
        await context.setOffline(true);await page.reload();await page.waitForFunction(()=>window.FitApp&&window.dictionaryData?.length);
        assert.equal(await page.locator('#loginOverlay').isVisible(),true);assert.deepEqual(errors,[]);
    }finally{await browser.close();}
    const report={status:'passed',url:origin,version:expected,checkedAt:new Date().toISOString(),matchingPublicFiles:files.length,api,cached,offlineReload:true,browserErrors:errors,
        authenticatedProductionFlow:false,productionUserDataWrites:false,physicalDevices:false,scope:'Hosting e regras Firestore; API e índices não publicados'};
    fs.writeFileSync(`audit/${prefix}-production-validation.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
