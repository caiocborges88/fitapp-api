const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {chromium} = require('playwright');
const origin = 'https://fitapp-operacional.web.app';
(async () => {
    const local = JSON.parse(fs.readFileSync('public/version.json', 'utf8'));
    const version = await (await fetch(origin + '/version.json', {cache:'no-store'})).json();
    assert.equal(version.version, local.version);
    const paths = [];
    function walk(dir) {
        for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
            const file = dir + '/' + entry.name;
            if (entry.isDirectory()) walk(file);
            else paths.push(file);
        }
    }
    walk('public');
    await Promise.all(paths.map(async file => {
        const response = await fetch(origin + file.slice(6), {cache:'no-store'});
        assert.equal(response.status, 200, file);
        const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
        assert.equal(hash(Buffer.from(await response.arrayBuffer())), hash(fs.readFileSync(file)), file);
    }));
    const root = await fetch(origin);
    assert.equal(root.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(root.headers.get('x-frame-options'), 'DENY');
    const api = [];
    for (const [path, method] of [['coach','GET'], ['importar-treino-ia','POST'], ['recompensas','POST']]) {
        const response = await fetch(origin + '/api/' + path, {method, headers:{'content-type':'application/json'}, ...(method==='POST'?{body:'{}'}:{})});
        assert.equal(response.status, 401, path);
        assert.equal(typeof (await response.json()).error, 'string');
        api.push({path, status:response.status});
    }
    const browser = await chromium.launch({channel:'msedge', headless:true});
    let report;
    try {
        const page = await browser.newPage({viewport:{width:390,height:844}});
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(origin, {waitUntil:'domcontentloaded'});
        await page.waitForFunction(() => globalThis.FitApp && globalThis.FitAPI);
        assert.equal(await page.locator('#loginOverlay').isVisible(), true);
        const project = await page.evaluate(() => globalThis.firebase.app().options.projectId);
        assert.equal(project, 'fitapp-operacional');
        await page.evaluate(async () => { await navigator.serviceWorker.ready; });
        assert.deepEqual(errors, []);
        await page.screenshot({path:'audit/production-validation.png', fullPage:true});
        report = {project, version:version.version, checkedAt:new Date().toISOString(), matchingFiles:paths.length, api, loginVisible:true, serviceWorkerReady:true, browserErrors:errors, authenticatedProductionFlow:'not exercised; validated in emulators'};
    } finally { await browser.close(); }
    fs.writeFileSync('audit/production-validation.json', JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify(report,null,2));
})().catch(error => {console.error(error); process.exitCode=1;});
