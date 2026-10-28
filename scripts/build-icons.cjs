// Rasterize the single vector source using the existing local browser runtime.
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
    const root=path.resolve(__dirname,'..');
    const svg=fs.readFileSync(path.join(root,'public/icon.svg'),'utf8');
    const browser=await chromium.launch({...(process.platform==='win32'?{channel:'msedge'}:{}),headless:true});
    try {
        const page=await browser.newPage({viewport:{width:512,height:512},deviceScaleFactor:1});
        await page.setContent('<style>html,body{margin:0;background:transparent}svg{display:block;width:100vw;height:100vh}</style>'+svg);
        for(const size of [192,512]){
            await page.setViewportSize({width:size,height:size});
            await page.screenshot({path:path.join(root,`public/icon-${size}.png`),omitBackground:true});
        }
    } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
