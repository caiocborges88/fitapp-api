// Somente leitura: usa a sessão da CLI e salva o código das regras, nunca tokens.
const fs=require('node:fs');
const path=require('node:path');
const cli=path.join(process.env.APPDATA,'npm/node_modules/firebase-tools/lib');
(async()=>{
  const auth=require(path.join(cli,'auth'));
  const account=auth.getGlobalDefaultAccount();
  if(!account)throw new Error('Execute firebase login --reauth.');
  const options={project:'fitapp-operacional',nonInteractive:true,...account};
  await require(path.join(cli,'requireAuth')).requireAuth(options);
  const rules=require(path.join(cli,'gcp/rules'));
  const releases=await rules.listAllReleases(options.project);
  const release=releases.find(r=>r.name.endsWith('/cloud.firestore'));
  if(!release)throw new Error('Release de regras não localizado.');
  const files=await rules.getRulesetContent(release.rulesetName);
  const output=path.resolve(__dirname,'../audit/regras-publicadas-antes-da-correcao.json');
  fs.writeFileSync(output,JSON.stringify({release,files},null,2)+'\n');
  console.log('Regras publicadas preservadas para revisão e recuperação. Nenhuma mudança na nuvem.');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
