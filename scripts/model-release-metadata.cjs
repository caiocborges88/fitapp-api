// Read-only cloud inspection. Never logs credentials or reads user documents.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const project='fitapp-operacional',cli=path.join(process.env.APPDATA,'npm/node_modules/firebase-tools/lib');
const prefix=process.env.FITAPP_RELEASE_PREFIX||'abc';
if(!/^[a-z][a-z0-9-]*$/.test(prefix))throw Error('Prefixo de release inválido.');
(async()=>{
    const phase=process.argv[2];if(!['before','after','rules'].includes(phase))throw Error('Use before, rules or after.');
    const options={project,nonInteractive:true},auth=require(path.join(cli,'auth.js'));
    const account=auth.selectAccount(undefined,process.cwd());if(account)auth.setActiveAccount(options,account);
    await require(path.join(cli,'requireAuth.js')).requireAuth(options);
    const hosting=await require(path.join(cli,'hosting/api.js')).getChannel(project,project,'live');
    const rulesApi=require(path.join(cli,'gcp/rules.js'));
    const releases=await rulesApi.listAllReleases(project);
    const ruleset=await rulesApi.getLatestRulesetName(project,'cloud.firestore',releases);
    const files=await rulesApi.getRulesetContent(ruleset);
    const remote=(files.find(f=>f.name==='firestore.rules')||files[0]).content.replace(/\r\n/g,'\n').trim();
    const local=fs.readFileSync('firestore.rules','utf8').replace(/\r\n/g,'\n').trim();
    const version=await(await fetch('https://fitapp-operacional.web.app/version.json',{cache:'no-store'})).json();
    const result={project,url:'https://fitapp-operacional.web.app',phase,capturedAt:new Date().toISOString(),appVersion:version.version,
        release:hosting?.release?.name,hostingVersion:hosting?.release?.version?.name,releaseTime:hosting?.release?.releaseTime,
        ruleset,rulesMatchLocal:remote===local,rulesHash:crypto.createHash('sha256').update(remote).digest('hex'),rulesFiles:files,
        cloudUserDocumentsRead:false,cloudUserDataWrites:false};
    if(!result.release||!result.hostingVersion)throw Error('Não foi possível preservar os identificadores do Hosting.');
    if(phase!=='before'&&!result.rulesMatchLocal)throw Error('As regras públicas não correspondem às regras testadas.');
    fs.writeFileSync(`audit/${prefix}-release-${phase}.json`,JSON.stringify(result,null,2)+'\n');
    console.log(JSON.stringify({project,phase,appVersion:result.appVersion,release:result.release,hostingVersion:result.hostingVersion,ruleset,rulesMatchLocal:result.rulesMatchLocal}));
})().catch(error=>{console.error(error.message);process.exitCode=1;});
