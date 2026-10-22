const cp=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const directory of ['public/js','functions'])for(const file of fs.readdirSync(path.join(root,directory)).filter(f=>f.endsWith('.js'))){
    const result=cp.spawnSync(process.execPath,['--check',path.join(root,directory,file)],{encoding:'utf8'});
    if(result.status!==0){console.error(result.stderr);process.exit(1);}
}
const lint=cp.spawnSync(process.execPath,[path.join(root,'node_modules/eslint/bin/eslint.js'),'public/js','functions/*.js','scripts'],{cwd:root,encoding:'utf8'});
process.stdout.write(lint.stdout);process.stderr.write(lint.stderr);process.exitCode=lint.status;
