const fs=require('node:fs'),cp=require('node:child_process');
const suites=['browser','design','editor-browser','environment-browser','environment-proposal-browser','workout-priorities-browser','coverage-browser','model-settings-browser','biset-browser','catalogue-admin','offline'];
const report={environment:'Local Edge; Firebase simulated except unauthenticated offline test; no production writes',startedAt:new Date().toISOString(),suites:[]};
for(const suite of suites){
 const started=Date.now(),result=cp.spawnSync(process.execPath,[`tests/${suite}.cjs`],{encoding:'utf8',timeout:180000});
 report.suites.push({suite,status:result.status===0?'passed':'failed',durationMs:Date.now()-started,output:result.stdout,errors:result.stderr,error:result.error?.message});
 fs.writeFileSync('audit/energy-regressions.json',JSON.stringify(report,null,2)+'\n');
 console.log(suite+': '+(result.status===0?'passed':'FAILED'));
 if(result.status!==0){console.error(result.stderr||result.error);process.exitCode=1;break;}
}
