import {readJSON} from './domain.js';

export const equipmentGroups = [
    ['Pesos_Livres','Halteres',['Halter']],
    ['Maquinas_Polias','Máquinas e polias',['Máquina','Cabo']],
    ['Barras_Anilhas','Barras e anilhas',['Barra']],
    ['Peso_Corporal','Peso corporal',['Peso Corporal']],
    ['Calistenia','Barras fixas e baixas',['Calistenia']]
];
export const resourceLabels = [
    ['bench','Banco firme'],['balance-support','Apoio para equilíbrio'],
    ['pullup-bar','Barra fixa'],['low-bar','Barra baixa'],['dumbbells','Halteres'],
    ['incline-bench','Banco inclinado'],['decline-bench','Banco declinado'],
    ['parallel-bars','Barras paralelas'],['backrest-bench','Banco com encosto'],['dual-cable','Duas polias'],['cable-handles','Alças de polia'],['cable-rope','Acessório de corda para polia'],['wall','Parede firme'],['barbell','Barra'],['plates','Anilhas'],['machine','Máquinas'],['cable','Polia'],['rack','Rack com suportes'],['roman-bench','Banco romano'],['preacher-bench','Banco Scott'],['landmine','Suporte landmine'],['row-handle','Empunhadura para remada']
];
for(const item of globalThis.window?.dictionaryData||[]){for(const resource of item.executionProfile?.resources||[])if(resource.startsWith('apparatus:')&&!resourceLabels.some(([id])=>id===resource))resourceLabels.push([resource,item.displayName||item.name]);}
export function equipmentForEnvironment(store,environment,resources=[]){
    if(environment==='academia'){
        const saved=readJSON(store?.get('fitapp_equipment_academia'),null);
        return Array.isArray(saved)?saved.filter(value=>equipmentGroups.some(([key])=>key===value)):equipmentGroups.map(([key])=>key);
    }
    return ['Peso_Corporal',...(environment==='casa'&&resources.includes('dumbbells')?['Pesos_Livres']:[]),...(resources.some(value=>['pullup-bar','low-bar'].includes(value))?['Calistenia']:[])];
}
export function equipmentNames(groups){
    return equipmentGroups.filter(([key])=>groups.includes(key)).flatMap(([, ,names])=>names);
}
export function environmentSummary(options){
    const name=options.environment==='academia'?'Academia':options.environment==='casa'?'Casa':'Parque/praia';
    const labels=options.environment==='academia'
        ?equipmentGroups.filter(([key])=>options.equipment?.includes(key)).map(([,label])=>label.toLocaleLowerCase('pt-BR'))
        :resourceLabels.filter(([key])=>options.resources?.includes(key)).map(([,label])=>label.toLocaleLowerCase('pt-BR'));
    const summary=labels.length>2?labels.slice(0,2).join(', ')+' e mais '+(labels.length-2):labels.join(', ');
    return name+' · '+(summary||'sem equipamentos');
}
