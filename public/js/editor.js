import {state} from './state.js';
import {newId,readJSON,measurementForTarget} from './domain.js';
import {commitWorkoutPlan} from './campaign-store.js';
import {duplicateTemplate,moveItem,routineForTemplate} from './editor-domain.js';
import {saveCampaignToCloud} from './sync.js';
import {beginDraft,finishDraft,persistDraft} from './drafts.js';
import {isWorkoutModel,modelVersion} from './workout-models.js';

const app=()=>window.FitApp;
const templates=()=>readJSON(app().safeGet('fitapp_custom_workouts'),[]);
const plan=()=>readJSON(app().safeGet('fitapp_campaign_data'),null);
function allowed(){if(state.isWorkoutActive){app().showToast('Conclua ou descarte a sessão antes de editar uma ficha.');return false;}return true;}
export function configureEditor(kind='session',id=null){
    beginDraft();
    document.getElementById('previewMore')?.removeAttribute('open');
    if(kind!=='session')state.environmentProposal=null;
    document.getElementById('workoutPreview').classList.toggle('cycle-review-mode',kind==='cycle');
    const nameContainer=document.getElementById('customWorkoutNameContainer');
    let nameOptions=document.getElementById('cycleNameOptions');
    if(kind==='cycle'&&!nameOptions){
        nameOptions=document.createElement('details');
        nameOptions.id='cycleNameOptions';nameOptions.className='cycle-name-options';
        const summary=document.createElement('summary');summary.textContent='Nome do ciclo';
        nameContainer.before(nameOptions);nameOptions.append(summary,nameContainer);
    }else if(kind!=='cycle'&&nameOptions)nameOptions.replaceWith(nameContainer);
    state.editorContext={kind,id,revision:kind==='template'?(templates().find(t=>String(t.id)===String(id))?.revision||0):['plan','cycle'].includes(kind)?(plan()?.revision||0):0,planId:plan()?.id||null};
    if(kind==='session'&&/^[A-D]$/.test(state.currentWorkoutType))document.getElementById('customWorkoutName').value=plan()?.workoutNames?.[state.currentWorkoutType]||document.getElementById('previewTitle').textContent;
    document.getElementById('customWorkoutControls').style.display=kind==='cycle'?'':'flex';
    document.getElementById('customWorkoutNameContainer').style.display='block';
    const status=document.getElementById('editorScope');
    status.textContent=kind==='template'?'Editando a ficha salva. As mudanças só valem após salvar.':kind==='plan'?'Editando este dia do plano. O histórico e os demais dias serão preservados.':kind==='new'?'Nova ficha. Revise e salve para reutilizar.':'Ajustes para esta sessão. Sua ficha salva não muda ao começar o treino.';
    document.getElementById('previewDesc').textContent=kind==='template'?'Altere o nome, os exercícios e a estrutura da ficha. Salvar não modifica treinos anteriores.':kind==='plan'?'Revise este dia do plano sem substituir os demais dias.':kind==='new'?'Revise os exercícios, a ordem e as metas antes de salvar.':'Adapte o treino de hoje sem sobrescrever a versão salva.';
    document.getElementById('saveTemplateButton').textContent=kind==='template'?'Salvar alterações':kind==='plan'?'Salvar dia do plano':kind==='new'?'Salvar ficha':'Salvar como nova ficha';
    document.getElementById('editOriginalButton').hidden=kind!=='session'||!(/^custom_/.test(state.currentWorkoutType)||/^[A-D]$/.test(state.currentWorkoutType));
    document.getElementById('btnStartWorkout').hidden=['new','template','plan','cycle'].includes(kind);
    document.getElementById('btnStartPrep').hidden=['new','template','plan','cycle'].includes(kind);
    if(kind==='cycle'){
        status.textContent='Revisando o ciclo completo. Salve o plano e depois escolha o dia para treinar.';
        document.getElementById('previewDesc').textContent='Seu ciclo completo está pronto. Navegue pelos dias e abra a edição apenas quando precisar ajustar.';
        document.getElementById('saveTemplateButton').textContent='Salvar ciclo como meu plano';
    }
}
function render(){app().renderPreviewList();}
function persistTemplates(next){if(!app().safeSet('fitapp_custom_workouts',JSON.stringify(next)))return false;saveCampaignToCloud();app().renderCustomWorkouts();return true;}
export function editTemplate(id){
    if(!allowed())return;
    const saved=templates().find(t=>String(t.id)===String(id));if(!saved)return;
    app().startWorkout('custom_'+id);
    state.currentRoutine=routineForTemplate(saved.routine);
    configureEditor('template',id);render();
    document.getElementById('previewTitle').textContent='Editar ficha salva';
}
export function editPlanDay(day){
    if(!allowed())return;
    app().startWorkout(day);
    const saved=plan();if(!saved?.workouts?.[day])return;
    state.currentRoutine=routineForTemplate(saved.workouts[day]);
    document.getElementById('customWorkoutName').value=saved.workoutNames?.[day]||document.getElementById('previewTitle').textContent;
    configureEditor('plan',day);render();
}
export function editOriginal(){
    if(!allowed())return;
    if(!confirm('Abrir a versão salva para edição permanente? Os ajustes ainda não salvos desta prévia serão descartados.'))return;
    if(state.currentWorkoutType.startsWith('custom_'))editTemplate(state.currentWorkoutType.slice(7));
    else editPlanDay(state.currentWorkoutType);
}
export function saveEditor(){
    if(!allowed())return false;
    if(state.currentRoutine.some(block=>!block.exercises.length)){app().showToast('Preencha ou remova os blocos vazios antes de salvar.');return false;}
    if(state.environmentProposal?.status==='pending'){app().showToast('Revise a proposta do ambiente ou volte sem aplicar antes de salvar.');return false;}
    if(state.currentRoutine.some(block=>block.exercises.some(ex=>ex.reviewCode==='target-review'))){app().showToast('Edite as metas de carga sinalizadas antes de salvar a ficha adaptada.');return false;}
    const name=document.getElementById('customWorkoutName').value.trim();
    if(!name||name.length>120){app().showToast('Dê um nome à ficha com até 120 caracteres.');return false;}
    let routine;
    try{routine=routineForTemplate(state.currentRoutine,{validatePairs:true});}catch(error){app().showToast(error.message);return false;}
    const context=state.editorContext||{kind:'new'};
    if(context.kind==='cycle'){
        const saved=plan();
        if((saved?.id||null)!==context.planId||(saved?.revision||0)!==context.revision){app().showToast('O plano mudou durante a revisão. Gere novamente o ciclo antes de salvar.');return false;}
        const workouts={};
        try{
            for(const day of context.days)workouts[day]=routineForTemplate(state.currentRoutine.filter(block=>block.day===day),{validatePairs:true});
        }catch(error){app().showToast(error.message);return false;}
        if(saved&&!confirm('Salvar este ciclo substituirá o plano atual e reiniciará seu contador. As fichas pessoais e o histórico serão preservados. Continuar?'))return false;
        const next={id:newId(),name,method:context.method,level:context.level,profile:context.profile,workouts,startDate:new Date().toISOString(),revision:1,updatedAt:Date.now(),...(isWorkoutModel(context.method)?{schemaVersion:2,modelVersion}: {})};
        try{commitWorkoutPlan(window.FitStore,next,{resetCount:true});}
        catch(error){app().showToast('Não foi possível gravar o novo plano. O plano anterior foi mantido.');return false;}
        document.getElementById('mainMethodSelector').value=context.method;
        document.getElementById('profileSelector').value=context.profile;
        document.getElementById('levelSelector').value=context.level;
        saveCampaignToCloud();app().updateDynamicCards();app().updateCampaignDashboard();
        state.savedWorkoutType=context.activeDay||context.days[0];finishDraft();
        app().showToast('Ciclo completo salvo. Escolha o dia para treinar.');return true;
    }else if(context.kind==='plan'){
        const saved=plan();
        if(!saved||(saved.id||null)!==context.planId||(saved.revision||0)!==context.revision){app().showToast('O plano mudou enquanto você editava. Reabra o dia antes de salvar.');return false;}
        saved.id=saved.id||newId();
        saved.workouts[context.id]=routine;saved.workoutNames={...saved.workoutNames,[context.id]:name};saved.revision=(saved.revision||0)+1;saved.updatedAt=Date.now();
        if(!app().safeSet('fitapp_campaign_data',JSON.stringify(saved)))return false;
        saveCampaignToCloud();app().updateDynamicCards();app().updateCampaignDashboard();
        state.savedWorkoutType=context.id;
    }else{
        const list=templates();const previous=context.kind==='template'?list.find(t=>String(t.id)===String(context.id)):null;
        if(context.kind==='template'&&(!previous||(previous.revision||0)!==context.revision)){app().showToast('A ficha mudou enquanto você editava. Reabra a versão salva.');return false;}
        const next={id:previous?.id||newId(),name,routine,revision:(previous?.revision||0)+1,updatedAt:Date.now()};
        if(!persistTemplates(previous?list.map(t=>String(t.id)===String(previous.id)?next:t):[...list,next]))return false;
        state.savedWorkoutType='custom_'+next.id;
    }
    finishDraft();
    app().showToast('Ficha salva. Os registros anteriores foram preservados.');return true;
}
export function duplicateWorkout(id){
    if(!allowed())return;
    const list=templates(),saved=list.find(t=>String(t.id)===String(id));if(!saved)return;
    try{if(persistTemplates([...list,duplicateTemplate(saved)]))app().showToast('Cópia criada como uma ficha independente.');}catch(error){app().showToast(error.message);}
}
export function reorderTemplate(id,direction){
    if(!allowed())return;const list=templates();persistTemplates(moveItem(list,list.findIndex(t=>String(t.id)===String(id)),direction));
}
export function moveExercise(block,index,direction){if(!allowed())return;state.currentRoutine[block].exercises=moveItem(state.currentRoutine[block].exercises,index,direction);render();}
export function moveBlock(index,direction){if(!allowed())return;if(state.editorContext?.kind==='cycle'&&state.currentRoutine[index]?.day!==state.currentRoutine[index+direction]?.day)return;state.currentRoutine=moveItem(state.currentRoutine,index,direction);render();}
export function addBlock(){
    if(!allowed())return;
    const cycle=state.editorContext?.kind==='cycle';
    const day=state.editorContext?.activeDay||'A';
    const block={title:`Bloco ${state.currentRoutine.length+1}`,type:'traditional',...(cycle?{day}:{}),...(state.currentRoutine.length&&state.currentRoutine.every(item=>item.equipmentPolicy==='bodyweight')?{equipmentPolicy:'bodyweight'}:{}),exercises:[]};
    if(cycle){
        const last=state.currentRoutine.findLastIndex(item=>item.day===day);
        state.currentRoutine.splice(last+1,0,block);
        state.editorContext.editingBlock=block;
    }else state.currentRoutine.push(block);
    render();
}
export function removeBlock(index){
    if(!allowed())return;
    const block=state.currentRoutine[index];if(!block)return;
    if(state.currentRoutine.filter(item=>item.day===block.day).length<=1){app().showToast('Mantenha pelo menos um bloco por dia.');return;}
    if(block.exercises.length&&!confirm('Remover este bloco e seus exercícios da edição? A ficha salva só muda após salvar.'))return;
    state.currentRoutine.splice(index,1);render();
}
export function changeExercise(block,index,field,value){
    if(!allowed()||!['sets','target'].includes(field))return;
    if(field==='sets'&&(!Number.isInteger(Number(value))||Number(value)<1||Number(value)>10)){app().showToast('Use de 1 a 10 séries.');return;}
    state.currentRoutine[block].exercises[index][field]=field==='sets'?Number(value):String(value).slice(0,50);
    if(field==='target')state.currentRoutine[block].exercises[index].measurementType=measurementForTarget(value);
    app().refreshCoverage?.();
    persistDraft();
    if(field==='target'&&state.currentRoutine[block].exercises[index].reviewCode==='target-review'){
        const exercise=state.currentRoutine[block].exercises[index];
        delete exercise.needsReview;delete exercise.reviewCode;delete exercise.reviewReason;render();
    }
}
export function changeBlock(index,field,value){
    if(!allowed())return;
    const block=state.currentRoutine[index];
    if(field==='title')block.title=String(value).trim().slice(0,120)||'Bloco';
    if(field==='type'&&['traditional','superset','circuit'].includes(value)){
        if(value==='superset'&&block.exercises.length!==2){app().showToast('Um par precisa de exatamente dois exercícios neste bloco.');render();return;}
        block.type=value;
        render();
    }
}
window.FitEditor={configureEditor,editTemplate,editPlanDay,editOriginal,saveEditor,duplicateWorkout,reorderTemplate,moveExercise,moveBlock,addBlock,removeBlock,changeExercise,changeBlock};
