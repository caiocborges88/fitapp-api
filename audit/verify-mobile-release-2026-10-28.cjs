const fs=require('node:fs');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const {chromium,devices}=require('playwright');
const origin='https://fitapp-operacional.web.app';
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');

(async()=>{
    const expected=JSON.parse(fs.readFileSync('public/version.json','utf8')).version;
    const version=await(await fetch(origin+'/version.json',{cache:'no-store'})).json();
    assert.equal(version.version,expected);
    const files=[];
    const walk=directory=>{for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const file=directory+'/'+entry.name;if(entry.isDirectory())walk(file);else files.push(file);}};
    walk('public');
    for(let index=0;index<files.length;index+=8)await Promise.all(files.slice(index,index+8).map(async file=>{
        const response=await fetch(origin+file.slice(6),{cache:'no-store'});assert.equal(response.status,200,file);
        assert.equal(hash(Buffer.from(await response.arrayBuffer())),hash(fs.readFileSync(file)),file);
    }));
    const headers=await fetch(origin,{cache:'no-store'});
    assert.equal(headers.headers.get('x-content-type-options'),'nosniff');assert.equal(headers.headers.get('x-frame-options'),'DENY');
    const api=[];
    for(const [route,method]of [['coach','GET'],['importar-treino-ia','POST'],['recompensas','POST']]){
        const response=await fetch(origin+'/api/'+route,{method,headers:{'content-type':'application/json'},...(method==='POST'?{body:'{}'}:{})});
        assert.equal(response.status,401,route);api.push({route,status:response.status});
    }
    const browser=await chromium.launch({channel:'msedge',headless:true});const errors=[];
    let cacheAssets;
    try{
        const context=await browser.newContext({...devices['Pixel 7'],reducedMotion:'reduce'}),page=await context.newPage();
        page.on('pageerror',error=>errors.push(error.message));
        await page.goto(origin,{waitUntil:'domcontentloaded'});
        await page.waitForFunction(()=>window.FitApp&&window.dictionaryData?.length);
        assert.equal(await page.locator('#loginOverlay').isVisible(),true);
        assert.equal(await page.evaluate(()=>firebase.app().options.projectId),'fitapp-operacional');
        await page.waitForFunction(()=>navigator.serviceWorker.controller);
        cacheAssets=await page.evaluate(async()=>{
            const names=await caches.keys(),cache=await caches.open(names.find(name=>name.startsWith('fitapp-')));
            const paths=['/css/mobile-flow.css','/js/mobile-flow.js','/js/drafts.js','/js/draft-domain.js','/js/equipment-settings.js'];
            return Promise.all(paths.map(async path=>({path,cached:Boolean(await cache.match(path))})));
        });
        assert.ok(cacheAssets.every(asset=>asset.cached));
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
        await page.screenshot({path:'audit/mobile-release-login-2026-10-28.png',fullPage:true});
        await context.setOffline(true);await page.reload();await page.waitForFunction(()=>window.FitApp&&window.dictionaryData?.length);
        assert.equal(await page.locator('#loginOverlay').isVisible(),true);assert.deepEqual(errors,[]);
    }finally{await browser.close();}
    const result={status:'ok',url:origin,version:expected,checkedAt:new Date().toISOString(),matchingFiles:files.length,api,cacheAssets,offlineReload:true,browserErrors:errors,productionDataWrites:false,scope:'Hosting only; no database, rules, indexes or API deployment',physicalAndroidTest:'a realizar pelo usuário'};
    fs.writeFileSync('audit/mobile-release-validation-2026-10-28.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
