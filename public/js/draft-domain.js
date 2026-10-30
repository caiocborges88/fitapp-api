export const draftVersion=1;
export const draftPrefix='fitapp_workout_draft:';
const kinds=new Set(['new','session','template','plan','cycle']);
const routineShape=routine=>Array.isArray(routine)&&routine.length>0&&routine.length<=100&&routine.every(block=>block&&typeof block.title==='string'&&['traditional','superset','circuit',undefined].includes(block.type)&&Array.isArray(block.exercises)&&block.exercises.length<=100&&block.exercises.every(ex=>ex&&typeof ex.name==='string'&&ex.name.length<=300&&typeof ex.target==='string'&&ex.target.length<=50&&Number.isFinite(Number(ex.sets))));
// Drafts may be unfinished: do not normalize or silently fill missing exercises.
export function validDraft(value,userId){
    if(!value||value.version!==draftVersion||!userId||value.userId!==userId||typeof value.id!=='string'||!/^[-\w]{1,80}$/.test(value.id))return false;
    if(!kinds.has(value.context?.kind)||typeof value.type!=='string'||typeof value.name!=='string'||value.name.length>120)return false;
    if(!Number.isFinite(value.updatedAt)||!routineShape(value.routine))return false;
    if(value.coverage!=null&&!routineShape(value.coverage))return false;
    if(value.proposal!=null){
        const review=value.proposal,proposal=review.proposal;
        if(!['pending','accepted'].includes(review.status)||typeof review.signature!=='string'||!routineShape(review.source)||!routineShape(proposal?.routine)||!Number.isFinite(proposal.originalCount)||!Number.isFinite(proposal.proposedCount)||!Array.isArray(proposal.omitted)||!proposal.omitted.every(item=>item&&typeof item.name==='string'&&typeof item.subLevel==='string'&&Number.isFinite(Number(item.sets))))return false;
    }
    if(value.context.kind==='cycle')return Array.isArray(value.context.days)&&value.context.days.length>0&&value.context.days.length<=4&&value.context.days.every(day=>/^[A-D]$/.test(day))&&['abc','abcd','biset_sinergista','circuito','abc_tradicional','abc_sinergista'].includes(value.context.method);
    return true;
}
export function draftSourceChanged(draft,plan,templates){
    const context=draft.context;
    if(context.kind==='template')return !templates.some(item=>String(item.id)===String(context.id)&&(item.revision||0)===context.revision);
    if(['plan','cycle'].includes(context.kind))return (plan?.id||null)!==context.planId||(plan?.revision||0)!==context.revision;
    return false;
}
