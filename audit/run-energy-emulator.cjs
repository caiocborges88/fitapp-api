const fs=require('node:fs'),cp=require('node:child_process');
const suites=[['unit',['--test','tests/*.test.mjs']],['sync',['tests/sync-browser.cjs']],['integration',['tests/emulator-browser.cjs']]];
const report={environment:'demo-fitapp; local auth, Firestore, functions and hosting emulators; no physical device',startedAt:new Date().toISOString(),suites:[]};
for(const [suite,args]of suites){
 const started=Date.now(),result=cp.spawnSync(process.execPath,args,{encoding:'utf8',timeout:180000,maxBuffer:8*1024*1024});
 fs.writeFileSync(`audit/energy-${suite}-test.log`,(result.stdout||'')+'\n'+(result.stderr||''));
 report.suites.push({suite,status:result.status===0?'passed':'failed',durationMs:Date.now()-started,log:`energy-${suite}-test.log`,error:result.error?.message});
 fs.writeFileSync('audit/energy-emulator-validation.json',JSON.stringify(report,null,2)+'\n');
 console.log(suite+': '+(result.status===0?'passed':'FAILED'));
 if(result.status!==0){console.error((result.stderr||result.stdout||String(result.error)).slice(-3000));process.exitCode=1;break;}
}
