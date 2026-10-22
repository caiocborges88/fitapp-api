const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
require('./build.cjs');
const env={...process.env};
const bundled=path.join(root,'.tools/java');
if(fs.existsSync(bundled)){
    const java=fs.readdirSync(bundled).find(folder=>fs.existsSync(path.join(bundled,folder,'bin',process.platform==='win32'?'java.exe':'java')));
    if(java)env.PATH=path.join(bundled,java,'bin')+path.delimiter+env.PATH;
}
if(fs.existsSync(path.join(root,'.env')))process.loadEnvFile(path.join(root,'.env'));
const secret=path.join(root,'functions/.secret.local');
if(!fs.existsSync(secret))fs.writeFileSync(secret,'GEMINI_API_KEY='+(process.env.GEMINI_API_KEY || 'not-configured')+'\n');
const args=['emulators:start','--only','auth,firestore,functions,hosting','--project','demo-fitapp'];
const windowsCli=path.join(process.env.APPDATA || '', 'npm/node_modules/firebase-tools/lib/bin/firebase.js');
const child=process.platform==='win32' && fs.existsSync(windowsCli)
    ? cp.spawn(process.execPath,[windowsCli,...args],{cwd:root,env,stdio:'inherit'})
    : cp.spawn('firebase',args,{cwd:root,env,stdio:'inherit'});
child.on('error',()=>{console.error('Instale a CLI Firebase e o Java 21 para iniciar os emuladores.');process.exitCode=1;});
child.on('exit',code=>{process.exitCode=code||0;});
