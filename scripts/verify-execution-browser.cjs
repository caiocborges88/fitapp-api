const cp=require('node:child_process'),fs=require('node:fs');
const suites=process.argv.includes('--visual')?['appearance-browser','design','offline']:['execution-contract-browser','workout-models-browser','training-tracking-browser','editor-browser','environment-browser','workout-priorities-browser','coverage-browser','simple-flow-browser','mobile-flow-browser'];
const results=[];
for(const name of suites){
    const result=cp.spawnSync(process.execPath,['tests/'+name+'.cjs'],{encoding:'utf8',env:{...process.env,FITAPP_AUDIT_PREFIX:'catalogo'}});
    const output=(result.stdout||'')+(result.stderr||'');
    fs.writeFileSync('audit/catalogo-'+name+'.log',output);results.push({suite:name,status:result.status,log:'audit/catalogo-'+name+'.log'});
    console.log(name+': '+(result.status===0?'aprovado':'falhou')+'\n'+output.slice(-1800));
}
fs.writeFileSync('audit/catalogo-'+(process.argv.includes('--visual')?'visual':'functional')+'-checks.json',JSON.stringify({simulation:true,physicalDevices:false,results},null,2));
if(results.some(r=>r.status!==0))process.exitCode=1;
