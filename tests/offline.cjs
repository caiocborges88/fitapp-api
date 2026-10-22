const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const server=require('../scripts/serve.cjs');
(async()=>{
    await new Promise(r=>server.listen(0,'127.0.0.1',r));
    const browser=await chromium.launch({...(process.platform==='win32'?{channel:'msedge'}:{}),headless:true});
    const context=await browser.newContext();
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    try{
        await page.goto(`http://127.0.0.1:${server.address().port}/`);
        await page.evaluate(()=>navigator.serviceWorker.ready);
        await page.waitForFunction(()=>navigator.serviceWorker.controller);
        const assets=await page.evaluate(async()=>{const keys=await caches.keys();const cache=await caches.open(keys.find(k=>k.startsWith('fitapp-')));return(await cache.keys()).length;});
        assert.ok(assets>=20);
        const newAssets=await page.evaluate(async()=>{
            const cache=await caches.open((await caches.keys()).find(k=>k.startsWith('fitapp-')));
            return Promise.all(['/css/design.css','/fonts/Manrope.ttf','/js/experience.js','/js/icons.js','/js/editor.js','/js/editor-domain.js','/js/routine-review.js','/js/model-settings.js','/js/routine-coverage.js','/js/coverage-view.js'].map(async path=>Boolean(await cache.match(path))));
        });
        assert.deepEqual(newAssets,[true,true,true,true,true,true,true,true,true,true]);
        await context.setOffline(true);await page.reload();
        await page.waitForFunction(()=>window.FitApp&&window.dictionaryData.length);
        assert.equal(await page.locator('#loginOverlay').isVisible(),true);
        assert.deepEqual(errors,[]);
        fs.writeFileSync(path.resolve(__dirname,'../audit/offline-validation.json'),JSON.stringify({status:'ok',cachedAssets:assets,checks:['instalação atômica do cache','SDKs locais','recarga offline','inicialização offline sem exceções'],authenticatedSync:'verificado separadamente pelos testes de fila; este teste não autentica em produção'},null,2)+'\n');
        console.log('Offline: aplicação e dependências carregadas sem rede.');
    }finally{await context.close();await browser.close();await new Promise(r=>server.close(r));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
