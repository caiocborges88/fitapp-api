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
const divisions={biset_sinergista:['peito_triceps','costa_biceps','perna_ombro']};
const scenarios=[
    ...expansionScenarios,
    {name:'academia',environment:'academia',resources:[]},
    {name:'casa-sem-recursos',environment:'casa',resources:[]},
    {name:'casa-halteres-bancos',environment:'casa',resources:['dumbbells','bench','incline-bench']},
    {name:'casa-halteres-bancos-barra',environment:'casa',resources:['dumbbells','bench','incline-bench','pullup-bar']},
    {name:'parque-banco-barras',environment:'parque',resources:['bench','pullup-bar','low-bar']}
];
const rows=[];
for(const scenario of scenarios)for(const [method,days]of Object.entries(divisions))for(const day of days){
    const options={...scenario,allEquipment:true};
    let routine;
    try{routine=executeForgeLogic(method,day,[],options);}
    catch(error){rows.push({scenario:scenario.name,method,day,status:'bloqueado',reason:error.message});continue;}
    const pairs=routine.filter(block=>block.type==='superset');
    if(pairs.length!==4||pairs.some(block=>block.exercises.length!==2||block.exercises[0].name===block.exercises[1].name))throw new Error('Par inválido: '+method+' '+day);
    if(routine.flatMap(block=>block.exercises).some(ex=>!availableInEnvironment(window.dictionaryData.find(item=>item.name===ex.name),options)))throw new Error('Ambiente incompatível');
    rows.push({scenario:scenario.name,method,day,status:'compatível',pairs:pairs.map(block=>block.exercises.map(ex=>ex.name))});
}
const summary=scenarios.map(s=>{const subset=rows.filter(row=>row.scenario===s.name);return {scenario:s.name,compatible:subset.filter(row=>row.status==='compatível').length,blocked:subset.filter(row=>row.status==='bloqueado').length};});
fs.writeFileSync(new URL('../audit/biset-alignment.json',import.meta.url),JSON.stringify({scope:'Gerador de bi-set complementar, perfil hipertrofia, iniciante; não valida prescrição.',summary,rows},null,2)+'\n');
console.table(summary);
