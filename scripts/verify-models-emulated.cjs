const cp=require('node:child_process');
const fs=require('node:fs');
if(!process.env.FIRESTORE_EMULATOR_HOST||!process.env.FIREBASE_AUTH_EMULATOR_HOST)throw new Error('Execute dentro de firebase emulators:exec com auth,firestore,hosting e projeto demo-fitapp.');
for(const args of [['--test',...fs.readdirSync('tests').filter(name=>name.endsWith('.test.mjs')).map(name=>'tests/'+name)],['tests/sync-browser.cjs']]){
    const result=cp.spawnSync(process.execPath,args,{stdio:'inherit',env:process.env});
    if(result.status!==0)process.exit(result.status||1);
}
