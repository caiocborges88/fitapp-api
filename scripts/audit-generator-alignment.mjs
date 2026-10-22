import fs from 'node:fs';
import vm from 'node:vm';
import {expansionScenarios} from './expansion-audit-scenarios.mjs';
import {availableInEnvironment} from '../public/js/environment.js';
import {state} from '../public/js/state.js';
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
globalThis.window={dictionaryData:catalogue};
globalThis.document={getElementById:id=>id==='profileSelector'?{value:'hipertrofia'}:null,querySelectorAll:()=>[]};
state.els.levelSelector={value:'iniciante'};
const {executeForgeLogic}=await import('../public/js/forge.js');
const scenarios=[
    ...expansionScenarios,
    {name:'academia',environment:'academia',resources:[]},
    {name:'casa-sem-recursos',environment:'casa',resources:[]},
    {name:'casa-halteres-bancos',environment:'casa',resources:['dumbbells','bench','incline-bench']},
    {name:'casa-halteres-bancos-barra',environment:'casa',resources:['dumbbells','bench','incline-bench','pullup-bar']},
    {name:'parque-banco-barras',environment:'parque',resources:['bench','pullup-bar','low-bar']}
];
const rows=[];
for(const scenario of scenarios)for(const [day,focus]of [['A','push'],['B','pull'],['C','legs']]){
    const options={...scenario,allEquipment:true};
    let routine;
    try{routine=executeForgeLogic('abc',focus,[],options);}
    catch(error){rows.push({scenario:scenario.name,day,status:'bloqueado',reason:error.message});continue;}
    const exercises=routine.flatMap(block=>block.exercises);
    if(exercises.some(ex=>{const movement=catalogue.find(item=>item.name===ex.name);return !availableInEnvironment(movement,options)||movement.nivel===3;}))throw new Error('Movimento incompatível em '+scenario.name+' / '+day);
    rows.push({scenario:scenario.name,day,status:'compatível',movements:exercises.map(ex=>ex.name)});
}
const report={scope:'Gerador ABC, perfil hipertrofia, nível iniciante. Equipamentos amplos liberados no seletor, respeitando recursos por ambiente. Não valida prescrição.',rows};
fs.writeFileSync(new URL('../audit/generator-alignment.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.table(rows.map(row=>({scenario:row.scenario,day:row.day,status:row.status})));
