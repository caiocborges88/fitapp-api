import {state} from './state.js';
import {readJSON} from './domain.js';
import {roleCandidates,enabledBlock,reviewDue,modelLabel} from './workout-models.js';
import {environmentOptions} from './environment.js';
import {reviewRoutine} from './routine-review.js';
import {routineForTemplate} from './editor-domain.js';
import {persistDraft} from './drafts.js';
import {saveCampaignToCloud} from './sync.js';
import {prepareSwap,missingExecutionResources,withExecution,executionHint} from './execution-contract.js';
import {resourceLabels} from './equipment-settings.js';

const app=()=>window.FitApp;
const el=(tag,text,className)=>{const node=document.createElement(tag);if(text)node.textContent=text;if(className)node.className=className;return node;};
function persist(){
    if(state.previewOwner&&state.previewOwner!==window.FitStore.uid){app().showToast('A conta mudou. Reabra a ficha antes de ajustar o treino.');return false;}
    return state.isWorkoutActive?app().saveWorkoutState():persistDraft();
}
function render(){if(state.isWorkoutActive)app().renderCurrentRoutine();else app().renderPreviewList();}
function button(text,fn){const b=el('button',text,'button secondary');b.type='button';b.addEventListener('click',fn);return b;}
function registered(block){return block.exercises.some(ex=>ex.setsData?.some(set=>set.checked));}
const resourceLabel=key=>resourceLabels.find(([id])=>id===key)?.[1]||window.dictionaryData.find(m=>m.executionProfile?.resources.includes(key))?.displayName||key;
export function confirmExecutionResources(routine,{ask=true}={}){
    const options=environmentOptions(),missing=missingExecutionResources(routine,options);
    if(!missing.length)return true;
    if(ask&&!confirm('Você conferiu a disponibilidade destes recursos?\n'+missing.map(resourceLabel).join('\n')))return false;
    if(!app().safeSet('fitapp_resources_academia',JSON.stringify([...new Set([...options.resources,...missing])])) )return false;
    window.dispatchEvent(new Event('fitapp:environmentchange'));return true;
}
export function appendResourceReview(container){
    for(const block of state.currentRoutine.filter(enabledBlock))for(const ex of block.exercises){
        const choices=ex.execution?.choices;if(!choices)continue;
        const label=el('label',(ex.execution.label||ex.name)+' · barra/acessório','field'),select=el('select');
        select.append(el('option','Escolha a variante'));select.firstChild.value='';
        for(const choice of choices){const option=el('option',choice);option.value=choice;select.append(option);}
        select.value=ex.execution.choice||'';select.disabled=Boolean(ex.setsData?.some(s=>s.checked));
        select.addEventListener('change',()=>{const previous=ex.execution.choice;ex.execution.choice=select.value;if(!persist()){ex.execution.choice=previous;select.value=previous||'';return;}render();});
        label.append(select);container.append(label);
    }
    const missing=missingExecutionResources(state.currentRoutine,environmentOptions());
    if(!missing.length)return;
    const panel=el('section',null,'panel'),text=el('p','Confira os recursos específicos desta ficha: '+missing.map(resourceLabel).join(', ')+'.');
    panel.id='executionResourcesReview';panel.append(text,button('Conferi os equipamentos desta ficha',()=>{if(confirmExecutionResources(state.currentRoutine,{ask:false})){render();}}));
    container.append(panel);
}
export function appendExecutionControl(container,ex){
    if(ex.execution)return;
    const movement=window.dictionaryData.find(m=>m.name===ex.name);
    if(!movement?.executionProfile||movement.selectable===false||ex.setsData?.some(s=>s.checked))return;
    container.append(button('Revisar execução e convenção de carga',()=>{
        if(!confirm(movement.displayName+'\n'+movement.desc+'\n'+executionHint(withExecution(ex,movement))+'\nAplicar somente a esta sessão/edição? Os dados antigos permanecem preservados.'))return;
        const previous=structuredClone(ex),next=prepareSwap(ex,movement);for(const key of Object.keys(ex))delete ex[key];Object.assign(ex,next);
        if(!persist()){for(const key of Object.keys(ex))delete ex[key];Object.assign(ex,previous);return;}render();
    }));
}

export function appendBlockControls(container,block,index){
    if(!block.modelVersion)return;
    const tools=el('details',null,'model-block-tools');
    tools.id='model-tools-'+block.id;
    tools.append(el('summary','Execução e descanso · '+block.restSeconds+' s'));
    state.modelOpenBlocks=state.modelOpenBlocks||new Set();tools.open=state.modelOpenBlocks.has(block.id);
    tools.addEventListener('toggle',()=>{if(tools.open)state.modelOpenBlocks.add(block.id);else state.modelOpenBlocks.delete(block.id);});
    const controls=el('div',null,'model-block-controls');
    const label=el('label','Descanso do bloco (s)','field'),input=el('input');
    input.type='number';input.min=15;input.max=600;input.step=1;input.value=block.restSeconds;
    input.id='model-rest-'+block.id;
    input.setAttribute('aria-label','Descanso de '+block.title+' em segundos');
    input.addEventListener('change',()=>{
        const value=Number(input.value),previous=block.restSeconds,oldOverride=state.blockRestOverrides?.[block.id];
        if(!Number.isInteger(value)||value<15||value>600){input.value=previous;app().showToast('Use um descanso entre 15 e 600 segundos.');return;}
        block.restSeconds=value;
        if(state.blockRestOverrides)delete state.blockRestOverrides[block.id];
        if(!persist()){block.restSeconds=previous;if(oldOverride!=null)state.blockRestOverrides[block.id]=oldOverride;input.value=previous;return;}
        tools.firstChild.textContent='Execução e descanso · '+value+' s';
    });
    label.append(input);controls.append(label);
    if(block.exercises.length===2&&!block.exercises.some(ex=>ex.sideMode)){
        controls.append(button(block.type==='superset'?'Fazer em séries convencionais':'Voltar a executar em par',()=>{
            const previous=block.type;
            if(previous!=='superset'&&block.exercises[0].sets!==block.exercises[1].sets){app().showToast('Iguale as séries dos dois movimentos antes de executar em par.');return;}
            block.type=previous==='superset'?'traditional':'superset';
            if(!persist()){block.type=previous;return;}render();document.getElementById(tools.id)?.querySelector('summary')?.focus();
        }));
        if(block.type==='superset')controls.append(button('Escolher outro par',()=>choosePair(index)));
    }
    if(block.exercises.some(ex=>ex.slotId==='row'))controls.append(el('p','Remada apoiada: confira a variante e a execução para participação do deltoide posterior.'));
    tools.append(controls);container.append(tools);
}

function choosePair(index){
    const block=state.currentRoutine[index];
    if(registered(block)){app().showToast('Este par já tem registros. Preserve os movimentos realizados nesta sessão.');return;}
    const dialog=el('dialog',null,'model-dialog'),heading=el('h2','Escolher outro par');
    heading.id='model-pair-title';dialog.setAttribute('aria-labelledby',heading.id);
    dialog.append(heading);const selects=[];
    for(const exercise of block.exercises){
        const label=el('label',exercise.name,'field'),select=el('select');
        for(const movement of roleCandidates(exercise,window.dictionaryData,environmentOptions())||[]){const option=el('option',movement.name);option.value=movement.name;select.append(option);}
        select.value=exercise.name;label.append(select);dialog.append(label);selects.push(select);
    }
    dialog.append(button('Aplicar somente nesta sessão',()=>{
        const names=selects.map(s=>s.value);
        if(names.some(name=>!name)||new Set(names).size!==2){app().showToast('Escolha dois movimentos distintos e disponíveis.');return;}
        if(names.some((name,i)=>!(roleCandidates(block.exercises[i],window.dictionaryData,environmentOptions())||[]).some(m=>m.name===name))){app().showToast('Os recursos ou as exclusões mudaram. Reabra a escolha do par.');return;}
        const previous=structuredClone(block.exercises);
        let next;try{next=block.exercises.map((ex,i)=>ex.name===names[i]?ex:prepareSwap(ex,window.dictionaryData.find(m=>m.name===names[i])));}catch(error){app().showToast(error.message);return;}
        if(!confirmExecutionResources([{...block,exercises:next}]))return;
        block.exercises=next;
        if(!persist()){block.exercises=previous;return;}dialog.close();render();document.getElementById('model-tools-'+block.id)?.querySelector('summary')?.focus();
    }),button('Cancelar',()=>dialog.close()));
    dialog.addEventListener('close',()=>dialog.remove());document.body.append(dialog);dialog.showModal();
}

export function appendOptionalControls(container){
    const blocks=state.currentRoutine.map((block,index)=>({block,index})).filter(({block})=>block.optional&&(!block.day||state.editorContext?.kind!=='cycle'||block.day===state.editorContext.activeDay));
    if(!blocks.length)return;
    const panel=el('details',null,'model-optionals panel');panel.append(el('summary','Complementos opcionais'),el('p','Escolha antes de iniciar ou durante a sessão. Eles não são necessários para concluir a parte principal.'));
    for(const {block}of blocks){
        const label=el('label',null,'model-optional-choice'),input=el('input');input.type='checkbox';input.checked=enabledBlock(block);
        input.id='model-optional-'+block.id;
        input.addEventListener('change',()=>{
            const previous=block.enabled;
            if(!input.checked&&registered(block)){input.checked=true;app().showToast('Este complemento já tem registros e será preservado.');return;}
            block.enabled=input.checked;
            const issues=block.enabled?reviewRoutine([block],window.dictionaryData,environmentOptions()):[];
            if(issues.length){block.enabled=previous;input.checked=previous;app().showToast(issues[0].message);return;}
            if(!persist()){block.enabled=previous;input.checked=previous;return;}render();
        });
        label.append(input,el('span',block.title+' · '+block.exercises.map(ex=>ex.sets+' × '+ex.target).join(' / ')));panel.append(label);
    }
    container.append(panel);
}

export function appendSaveSessionChanges(container){
    if(!state.currentRoutine.some(block=>block.modelVersion)||(!state.isWorkoutActive&&state.editorContext?.kind!=='session'))return;
    container.append(button('Salvar alterações na ficha original',()=>{
        const origin=state.sessionOrigin;
        if(origin?.userId&&origin.userId!==window.FitStore.uid){app().showToast('A conta mudou. A ficha original foi preservada.');return;}
        if(!origin?.templateId&&(!origin?.planId||!origin.day)){app().showToast('Abra a ficha salva para editar permanentemente ou salve uma nova cópia.');return;}
        const templates=origin.templateId?readJSON(window.FitStore.get('fitapp_custom_workouts'),[]):null;
        const plan=templates?templates.find(item=>item.id===origin.templateId):readJSON(window.FitStore.get('fitapp_campaign_data'),null);
        if(plan?.id!==(origin.templateId||origin.planId)||(plan.revision||0)!==origin.revision){app().showToast('A ficha original mudou. Seus ajustes estão preservados nesta sessão; salve uma cópia ou reabra a ficha.');return;}
        const issues=reviewRoutine(state.currentRoutine,window.dictionaryData,environmentOptions());
        if(issues.length){app().showToast(issues[0].message);return;}
        if(!confirm('Salvar estes exercícios, séries e descansos na ficha original? Os registros realizados e o histórico serão preservados.'))return;
        let routine;try{routine=routineForTemplate(state.currentRoutine.map(block=>({...block,restSeconds:state.blockRestOverrides?.[block.id]??block.restSeconds})),{validatePairs:true});}catch(error){app().showToast(error.message);return;}
        const next={...plan,...(templates?{routine}:{workouts:{...plan.workouts,[origin.day]:routine}}),revision:(plan.revision||0)+1,updatedAt:Date.now()};
        if(!app().safeSet(templates?'fitapp_custom_workouts':'fitapp_campaign_data',JSON.stringify(templates?templates.map(item=>item.id===next.id?next:item):next)))return;
        state.sessionOrigin={...origin,revision:next.revision};
        for(const block of state.currentRoutine)if(state.blockRestOverrides?.[block.id]!=null)block.restSeconds=state.blockRestOverrides[block.id];
        state.blockRestOverrides={};persist();saveCampaignToCloud();render();app().showToast('Alterações salvas na ficha original. O histórico foi preservado.');
    }));
}

export function renderReviewReminder(container,plan){
    if(!reviewDue(plan))return;
    const panel=el('section',null,'model-review-reminder panel');panel.setAttribute('aria-label','Revisão do plano');
    panel.append(el('h2','Hora de revisar seu '+modelLabel(plan.method)),el('p','Seu plano tem cerca de três meses desde a última revisão. Exercícios e parâmetros continuam preservados.'));
    panel.append(button('Ver meu acompanhamento',()=>app().switchTab('tab-evolucao','nav-evolucao')),button('Revisar minha ficha',()=>window.FitEditor.editPlanDay('A')),button('Registrar revisão sem mudar a ficha',()=>{
        const current=readJSON(window.FitStore.get('fitapp_campaign_data'),null);
        if(current?.id!==plan.id)return;
        if(!app().safeSet('fitapp_campaign_data',JSON.stringify({...current,reviewedAt:new Date().toISOString(),updatedAt:Date.now()})))return;
        saveCampaignToCloud();panel.remove();
    }));container.append(panel);
}

