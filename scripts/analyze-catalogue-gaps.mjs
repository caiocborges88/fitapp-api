import fs from 'node:fs';
import vm from 'node:vm';
import {expansionScenarios} from './expansion-audit-scenarios.mjs';
import {sameMuscleFocus,findMovement,availableInEnvironment} from '../public/js/environment.js';
const read=path=>JSON.parse(fs.readFileSync(new URL(path,import.meta.url),'utf8'));
const audit=read('../audit/workout-alignment.json');
const proposal=read('../audit/movement-candidates.json');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const positions=audit.rows.flatMap(row=>row.issues.map(issue=>({...issue,scenario:row.scenario,family:row.family,method:row.method,level:row.level,day:row.day})));
const categories=new Map();
for(const position of positions){
    const key=position.subLevel+' | '+position.pattern;
    categories.set(key,(categories.get(key)||0)+1);
}
const activeResources=new Set(['bench','pullup-bar','low-bar','dumbbells','incline-bench','decline-bench','parallel-bars','rope','balance-support']);
const scenarios={
    ...Object.fromEntries(expansionScenarios.map(scenario=>[scenario.name,scenario])),
    academia:{environment:'academia',resources:[]},
    'casa-sem-recursos':{environment:'casa',resources:[]},
    'casa-halteres-bancos':{environment:'casa',resources:['dumbbells','bench','incline-bench']},
    'parque-sem-recursos':{environment:'parque',resources:[]},
    'parque-banco-barras':{environment:'parque',resources:['bench','pullup-bar','low-bar']}
};
const candidates=proposal.candidates.map(candidate=>{
    const existingRegistration=catalogue.find(item=>item.id===candidate.id||normalize(item.name)===normalize(candidate.name));
    if(candidate.status==='ja-cadastrado'&&!existingRegistration)throw new Error('Cadastro existente não localizado: '+candidate.name);
    const matches=positions.filter(position=>sameMuscleFocus(findMovement(catalogue,position.movement),candidate));
    const reachable=matches.filter(position=>availableInEnvironment(candidate,scenarios[position.scenario])&&(position.level!=='iniciante'||candidate.nivel!==3));
    return {id:candidate.id,name:candidate.name,priority:candidate.priority,status:candidate.status,existingRegistration:existingRegistration?.id??null,structuralMatchesUnderProposedClassification:matches.length,pendingPositionsReachableWithoutResourceChanges:reachable.length,existingEquivalentNames:catalogue.filter(item=>sameMuscleFocus(candidate,item)).map(item=>item.name),sourceMovements:[...new Set(matches.map(position=>position.movement))],newResourceIds:candidate.resources.filter(resource=>!activeResources.has(resource)),selectableInCurrentHomePolicy:availableInEnvironment(candidate,{environment:'casa',resources:candidate.resources}),notes:candidate.notes,sources:candidate.sources};
});
const report={scope:'Análise de propostas isoladas; não altera catálogo nem ambiente. Contagens são posições pendentes em cenários repetidos e podem sobrepor entre candidatos. Correspondência de metadados não comprova equivalência de resistência, execução ou prescrição.',activeCatalogueSize:catalogue.length,totalPendingPositions:positions.length,categories:[...categories].map(([category,positions])=>({category,positions})).sort((a,b)=>b.positions-a.positions),candidates};
fs.writeFileSync(new URL('../audit/catalogue-expansion-analysis.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.table(report.categories.slice(0,8));
console.table(candidates.map(candidate=>({name:candidate.name,matches:candidate.structuralMatchesUnderProposedClassification,reachableNow:candidate.pendingPositionsReachableWithoutResourceChanges,newResources:candidate.newResourceIds.join(', ')})));
