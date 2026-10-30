import {newId,normalizeRoutine,blockMetadata,exerciseMetadata} from './domain.js';
import {availableInEnvironment,findMovement} from './environment.js';

// Uma ficha é uma prescrição editável; séries executadas pertencem à sessão.
export function routineForTemplate(routine,{newIds=false,validatePairs=false}={}){
    const normalized=normalizeRoutine(routine).filter(block=>block.exercises.length);
    if(validatePairs&&normalized.some(block=>block.type==='superset'&&block.exercises.length!==2))throw new Error('Revise os pares: cada bloco em par precisa de exatamente dois exercícios.');
    if(validatePairs&&normalized.some(block=>block.type==='superset'&&new Set(block.exercises.map(ex=>ex.name)).size!==2))throw new Error('Revise os pares: use dois movimentos distintos em cada par.');
    if(validatePairs&&normalized.some(block=>block.modelVersion&&block.type==='superset'&&block.exercises[0].sets!==block.exercises[1].sets))throw new Error('Iguale as voltas do par ou escolha séries convencionais antes de salvar.');
    if(validatePairs&&normalized.some(block=>block.exercises.some(ex=>ex.sideMode==='alternating'&&(ex.sets%2!==0||ex.measurementType!=='duration'))))throw new Error('Use séries por tempo para ambos os lados, em número par.');
    if(validatePairs&&normalized.some(block=>block.equipmentPolicy==='bodyweight'&&block.exercises.some(ex=>!availableInEnvironment(findMovement(globalThis.window?.dictionaryData||[],ex.name),{environment:'academia',equipmentPolicy:'bodyweight'}))))throw new Error('Este bloco aceita somente peso corporal ou calistenia. Revise os movimentos antes de salvar.');
    return normalized.map(block=>({
        ...blockMetadata(block),...(newIds&&block.id?{id:newId()}:{}),title:block.title,type:block.type,...(block.equipmentPolicy==='bodyweight'?{equipmentPolicy:'bodyweight'}:{}),
        exercises:block.exercises.map(ex=>({
            ...exerciseMetadata(ex),id:newIds?newId():ex.id,name:ex.name,sets:ex.sets,target:ex.target,...(ex.measurementType?{measurementType:ex.measurementType}:{}),
            ...(ex.antagonist?{antagonist:ex.antagonist}:{}),
            ...(ex.notes?{notes:String(ex.notes).slice(0,1000)}:{})
        }))
    }));
}
export function duplicateTemplate(template){
    return {id:newId(),name:(template.name.slice(0,110)+' (cópia)').slice(0,120),routine:routineForTemplate(template.routine,{newIds:true}),revision:1,updatedAt:Date.now()};
}
export function moveItem(items,index,direction){
    const next=index+direction;
    if(!Number.isInteger(index)||![-1,1].includes(direction)||index<0||next<0||index>=items.length||next>=items.length)return [...items];
    const result=[...items];[result[index],result[next]]=[result[next],result[index]];return result;
}
