import {adaptRoutineToEnvironment,findMovement,sameMuscleFocus} from './environment.js';

// A reduced session is an explicit change of coverage, never an equivalent replacement.
export function buildEnvironmentProposal(source,catalogue,options){
    if(options.environment==='academia'||options.level!=='iniciante')throw new Error('A proposta por ambiente está disponível para sessões tradicionais iniciantes em casa ou no parque.');
    if(!source.length||source.some(block=>block.type&&block.type!=='traditional'))throw new Error('Revise pares e circuitos no método próprio; esta proposta aceita apenas séries tradicionais.');
    const adapted=adaptRoutineToEnvironment(source,catalogue,options);
    const omitted=[];
    const routine=adapted.routine.map(block=>({...block,exercises:block.exercises.filter(ex=>{
        if(!ex.needsReview)return true;
        const original=findMovement(catalogue,ex._environmentOriginal?.name||ex.name);
        omitted.push({name:ex._environmentOriginal?.name||ex.name,subLevel:original?.subLevel||'Cadastro ausente',pattern:original?.movementPattern||'Não identificado',reason:ex.reviewReason,code:ex.reviewCode,sets:ex.sets});
        return false;
    })})).filter(block=>block.exercises.length);
    const remaining=routine.flatMap(block=>block.exercises);
    if(!remaining.length)throw new Error('Não há movimentos compatíveis para propor uma sessão. Declare os recursos disponíveis ou revise a ficha.');
    const originals=source.flatMap(block=>block.exercises.map(ex=>findMovement(catalogue,ex._environmentOriginal?.name||ex.name)));
    if(originals.some(item=>!item))throw new Error('Revise os movimentos ausentes do catálogo antes de propor uma versão por ambiente.');
    const groups=new Set(remaining.map(ex=>{const item=findMovement(catalogue,ex.name);return item.agonist||item.group;}));
    const missingGroups=[...new Set(originals.map(item=>item.agonist||item.group))].filter(group=>!groups.has(group));
    if(missingGroups.length)throw new Error('Não é possível propor uma sessão sem movimentos para: '+missingGroups.join(', ')+'. Declare outros recursos ou revise a ficha.');
    for(const item of omitted){
        const original=findMovement(catalogue,item.name);
        item.covered=remaining.some(ex=>sameMuscleFocus(original,findMovement(catalogue,ex.name)));
    }
    // Keep proposal edits isolated from the source, including nested performed sets.
    return JSON.parse(JSON.stringify({routine,omitted,environment:options.environment,resources:options.resources,originalCount:source.reduce((count,block)=>count+block.exercises.length,0),proposedCount:remaining.length}));
}

export const proposalSignature=(routine,options)=>JSON.stringify({routine,environment:options.environment,resources:[...(options.resources||[])].sort(),blacklist:[...(options.blacklist||[])].sort(),level:options.level});
