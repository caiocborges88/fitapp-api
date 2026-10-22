export const retiredBiset=method=>['biset_agonista','biset_antagonista'].includes(method);
export const retiredMethod=method=>retiredBiset(method)||method==='calistenia';
export const retiredMethodMessage='Este modelo foi removido. Escolha um modelo disponível ou monte sua ficha manualmente.';

// A retired method can identify an existing plan, but is never a new-plan option.
export function selectSavedMethod(select,value,plan){
    if(retiredMethod(value)&&!(plan?.method===value&&Object.values(plan.workouts||{}).some(routine=>Array.isArray(routine)&&routine.length)))value=retiredBiset(value)?'biset_sinergista':'abc';
    if(retiredMethod(value)&&![...select.options].some(option=>option.value===value)){
        const option=document.createElement('option');
        option.value=value;option.textContent='Plano salvo · personalizado';
        option.hidden=true;option.disabled=true;select.append(option);
    }
    select.value=value;
    if(!select.value)select.value='abc';
}
