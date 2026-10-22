import fs from 'node:fs';
import vm from 'node:vm';
import {state} from '../public/js/state.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
let profile='hipertrofia',seed=1;
globalThis.window={dictionaryData:catalogue};
globalThis.document={getElementById:id=>id==='profileSelector'?{value:profile}:null,querySelectorAll:()=>[]};
state.els.levelSelector={value:'iniciante'};
const {executeForgePlan}=await import('../public/js/forge.js');
const realRandom=Math.random,realTimeout=globalThis.setTimeout;
Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
globalThis.setTimeout=()=>0;
const options={environment:'academia',allEquipment:true};
const project=plan=>Object.fromEntries(Object.entries(plan).map(([day,blocks])=>[day,blocks.map(block=>({type:block.type,title:block.title,exercises:block.exercises.map(({name,sets,target})=>({name,sets,target}))}))]));
function generate(method,selectedProfile,level,initialSeed){profile=selectedProfile;state.els.levelSelector.value=level;seed=initialSeed;return executeForgePlan(method,[],options);}
const coverage=[];
const profiles={};
let intermediate,advanced;
try{
for(const method of ['abc','abcd'])for(const selectedProfile of ['hipertrofia','feminino']){
    const row={method,profile:selectedProfile,plans:30,missingHorizontal:0,missingVertical:0,missingKneeFlexion:0,missingKneeExtension:0,samples:{}};
    for(let initialSeed=1;initialSeed<=30;initialSeed++){
        const plan=generate(method,selectedProfile,'iniciante',initialSeed);
        for(const [day,blocks]of Object.entries(plan)){
            const items=blocks.flatMap(block=>block.exercises).map(ex=>catalogue.find(item=>item.name===ex.name));
            const groups=[
                ['Costas','puxar-horizontal','missingHorizontal'],['Costas','puxar-vertical','missingVertical'],
                ['Isquiotibiais','flexao-joelho','missingKneeFlexion'],['Quadríceps','extensao-joelho','missingKneeExtension']
            ];
            for(const [group,pattern,key]of groups){
                const requests=items.filter(ex=>ex.agonist===group);
                if(requests.length>=2&&!requests.some(ex=>ex.movementPattern===pattern)){
                    row[key]++;row.samples[key]??={seed:initialSeed,day,movements:requests.map(ex=>({name:ex.name,pattern:ex.movementPattern}))};
                }
            }
        }
    }
    coverage.push(row);
}
for(const selectedProfile of ['hipertrofia','definicao','tatico'])profiles[selectedProfile]=project(generate('abc',selectedProfile,'iniciante',17));
intermediate=project(generate('abc','hipertrofia','intermediario',17));
advanced=project(generate('abc','hipertrofia','avancado',17));
}finally{Math.random=realRandom;globalThis.setTimeout=realTimeout;}
const report={scope:'Sondas em academia com todos os equipamentos, sem exclusões. A ausência de um padrão é lacuna de contrato e não prova prescrição inadequada. Comparações ignoram UUIDs e o descanso ajustado fora da rotina.',coverage,profileComparisons:{abcHypertrophyEqualsDefinition:JSON.stringify(profiles.hipertrofia)===JSON.stringify(profiles.definicao),abcHypertrophyEqualsTactical:JSON.stringify(profiles.hipertrofia)===JSON.stringify(profiles.tatico),abcIntermediateEqualsAdvanced:JSON.stringify(intermediate)===JSON.stringify(advanced)},profileExamples:profiles};
fs.writeFileSync(new URL('../audit/workout-assumptions-probes.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,profileExamples:undefined},null,2));
