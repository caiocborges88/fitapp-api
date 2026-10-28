// Captures only release identifiers, never account credentials.
const fs=require('node:fs'),path=require('node:path');
const cli=path.join(process.env.APPDATA,'npm/node_modules/firebase-tools/lib');
(async()=>{
 const phase=process.argv[2];if(!['before','after'].includes(phase))throw Error('Use before or after');
 const project='fitapp-operacional',options={project,nonInteractive:true};
 const auth=require(path.join(cli,'auth.js')),account=auth.selectAccount(undefined,process.cwd());
 if(account)auth.setActiveAccount(options,account);
 await require(path.join(cli,'requireAuth.js')).requireAuth(options);
 const channel=await require(path.join(cli,'hosting/api.js')).getChannel(project,project,'live');
 const app=await(await fetch('https://fitapp-operacional.web.app/version.json',{cache:'no-store'})).json();
 const result={url:'https://fitapp-operacional.web.app',project,release:channel.release?.name,hostingVersion:channel.release?.version?.name,releaseTime:channel.release?.releaseTime,appVersion:app.version,capturedAt:new Date().toISOString()};
 if(!result.release||!result.hostingVersion)throw Error('Hosting metadata incomplete');
 fs.writeFileSync(`audit/energy-hosting-${phase}.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
})().catch(error=>{console.error(error.message);process.exitCode=1;});
