const fs=require('node:fs');
const path=require('node:path');
if(!require('../functions/ai-policy.json').workouts){console.log(JSON.stringify({status:'deferred',providerCalled:false,message:'IA adiada nesta fase; nenhuma chamada ao provedor foi realizada.'}));process.exit(0);}
process.loadEnvFile(path.resolve(__dirname,'../.env'));
const {createWorkoutGenerator}=require('../functions/ai');
const catalogue=require('../functions/catalogue.json');
(async()=>{
    if(!process.env.GEMINI_API_KEY)throw new Error('missing_key');
    const result=await createWorkoutGenerator(catalogue)('Importe um dia com Flexão de Braço (Padrão), 3 séries de 10 repetições.',{env:'peso_corporal'});
    const report={status:'ok',days:result.length,exercises:result[0].exercicios.length,primary:'gemini-3.5-flash-lite',fallback:'gemini-3.8-flash'};
    fs.writeFileSync(path.resolve(__dirname,'../audit/gemini-validation.json'),JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify(report));
})().catch(error=>{
    const message=String(error.message).replaceAll(process.env.GEMINI_API_KEY || 'no-key','[redacted]').slice(0,1600);
    console.error(JSON.stringify({status:'failed',code:error.status||error.code||'unavailable',message}));process.exitCode=1;
});
