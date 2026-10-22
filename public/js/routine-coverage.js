import {findMovement,sameMuscleFocus} from './environment.js';
import {movementEmphases} from './movement-requirements.js';
import {reviewRoutine} from './routine-review.js';

const groupOf=movement=>movement.agonist||movement.group;
const unique=values=>[...new Set(values.filter(Boolean))];
export const isCoreMovement=movement=>Boolean(movement)&&(groupOf(movement)||'').toLowerCase()==='core';

// Describes declared primary emphasis, not synergist activity or physiological volume.
export function analyzeCoverage(routine,catalogue,options={},sourceRoutine=routine){
    const issues=reviewRoutine(routine,catalogue,options);
    const days=unique([...(options.days||[]),...routine.map(block=>block.day||'Sessão'),...sourceRoutine.map(block=>block.day||'Sessão')]);
    return days.map(day=>{
        const entries=routine.flatMap((block,bi)=>(block.day||'Sessão')===day?(block.exercises||[]).map((exercise,ei)=>({exercise,movement:findMovement(catalogue,exercise.name),pending:issues.some(issue=>issue.blockIndex===bi&&(issue.exerciseIndex===undefined||issue.exerciseIndex===ei))})):[]);
        const ready=entries.filter(entry=>entry.movement&&!entry.pending);
        const movements=ready.map(entry=>entry.movement);
        const counts=new Map();
        for(const {exercise,movement} of entries){const name=movement?.name||exercise.name;counts.set(name,(counts.get(name)||0)+1);}
        const groups=unique(movements.map(groupOf)).map(group=>{
            const items=movements.filter(item=>groupOf(item)===group);
            const subLevels=unique(items.flatMap(movementEmphases));
            return {group,subLevels,patterns:unique(items.map(item=>item.movementPattern)),
                otherSubLevels:unique(catalogue.filter(item=>groupOf(item)===group).flatMap(movementEmphases)).filter(subLevel=>!subLevels.includes(subLevel))};
        });
        const source=sourceRoutine.filter(block=>(block.day||'Sessão')===day).flatMap(block=>block.exercises||[]);
        const lost=unique(source.filter(ex=>{
            const original=findMovement(catalogue,ex._environmentOriginal?.name||ex.name);
            return original&&!movements.some(item=>sameMuscleFocus(original,item));
        }).map(ex=>{
            const original=findMovement(catalogue,ex._environmentOriginal?.name||ex.name);
            return `${original.subLevel||groupOf(original)} · ${original.movementPattern||'padrão não identificado'}`;
        }));
        return {day,positions:entries.length,uniqueCount:counts.size,readyCount:ready.length,pendingCount:entries.length-ready.length,
            sets:ready.reduce((total,{exercise})=>total+Number(exercise.sets),0),groups,hasCore:movements.some(isCoreMovement),lost,
            duplicates:[...counts].filter(([,count])=>count>1).map(([name,count])=>({name,count})),
            unknown:unique(entries.filter(entry=>!entry.movement).map(entry=>entry.exercise.name))};
    });
}
