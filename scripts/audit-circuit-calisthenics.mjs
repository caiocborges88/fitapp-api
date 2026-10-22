import fs from 'node:fs';
import vm from 'node:vm';
import {expansionScenarios} from './expansion-audit-scenarios.mjs';
import {state} from '../public/js/state.js';
import {availableInEnvironment} from '../public/js/environment.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
globalThis.window={dictionaryData:context.window.dictionaryData};
globalThis.document={getElementById:id=>id==='profileSelector'?{value:'hipertrofia'}:null,querySelectorAll:()=>[]};
state.els.levelSelector={value:'iniciante'};
const {executeForgeLogic}=await import('../public/js/forge.js');
const scenarios=[
    ...expansionScenarios,
    {name:'academia',environment:'academia',resources:[]},
    {name:'casa-sem-recursos',environment:'casa',resources:[]},
    {name:'casa-halteres-bancos',environment:'casa',resources:['dumbbells','bench','incline-bench']},
    {name:'casa-banco-barras',environment:'casa',resources:['bench','pullup-bar','low-bar']},
    {name:'parque-sem-recursos',environment:'parque',resources:[]},
    {name:'parque-banco-barras',environment:'parque',resources:['bench','pullup-bar','low-bar']}
];
const rows=[];
for(const scenario of scenarios)for(const method of ['circuito']){
    const options={...scenario,allEquipment:true};
    let routine;
    try{routine=executeForgeLogic(method,'A',[],options);}
    catch(error){rows.push({scenario:scenario.name,method,status:'bloqueado',reason:error.message});continue;}
    const items=routine.flatMap(block=>block.exercises);
    if(items.length!==(method==='circuito'?8:6)||routine.some(block=>block.exercises.some(ex=>!availableInEnvironment(window.dictionaryData.find(item=>item.name===ex.name),{...options,equipmentPolicy:block.equipmentPolicy}))))throw new Error('Montagem inválida: '+method+' '+scenario.name);
    rows.push({scenario:scenario.name,method,status:'compatível',count:items.length,movements:items.map(ex=>ex.name)});
}
fs.writeFileSync(new URL('../audit/circuit-calisthenics-alignment.json',import.meta.url),JSON.stringify({scope:'Circuito, hipertrofia iniciante, por recursos; geração de calistenia retirada. Não valida prescrição.',rows},null,2)+'\n');
console.table(rows.map(({scenario,method,status})=>({scenario,method,status})));
