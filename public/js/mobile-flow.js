import {state} from './state.js';
import {readJSON,blockEnabled} from './domain.js';
import {isWorkoutModel,nextModelDay} from './workout-models.js';
import {renderReviewReminder} from './model-controls.js';
import {persistDraft,listDrafts,restoreDraft,discardDraft} from './drafts.js';
import {validDraft} from './draft-domain.js';

const element=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text)node.textContent=text;return node;};
function disclosure(label,className){const details=element('details',className);details.append(element('summary','',label));return details;}

export function decoratePreview(list,issues){
    const kind=state.editorContext?.kind||'session';
    const preview=document.getElementById('workoutPreview');
    preview.dataset.kind=kind;
    let summary=document.getElementById('previewSummary');
    if(!summary){summary=element('p','preview-summary');summary.id='previewSummary';list.before(summary);}
    const exercises=state.currentRoutine.filter(blockEnabled).flatMap(block=>block.exercises);
    const series=exercises.reduce((total,ex)=>total+Number(ex.sets||0),0);
    summary.textContent=`${exercises.length} ${exercises.length===1?'exercício':'exercícios'} · ${series} ${series===1?'série':'séries'}${issues.length?' · '+issues.length+' pendências':''}`;
    summary.setAttribute('role','status');
    for(const fields of list.querySelectorAll(':scope > .editor-block-fields')){
        const tools=fields.previousElementSibling;
        const settings=disclosure('Organizar bloco','block-settings');fields.before(settings);
        if(tools?.classList.contains('editor-block-tools'))settings.append(tools);
        settings.append(fields);settings.open=['template','plan'].includes(kind);
        const index=Number(fields.dataset.blockIndex??Array.from(list.querySelectorAll('.block-settings')).indexOf(settings)),block=state.currentRoutine[index];
        const remove=element('button','text-button','Remover bloco');remove.type='button';remove.disabled=state.currentRoutine.filter(item=>item.day===block.day).length<=1;
        remove.addEventListener('click',()=>window.FitEditor.removeBlock(index));settings.append(remove);
    }
    let position=0;
    for(const item of list.querySelectorAll(':scope > .preview-item')){
        const exercise=exercises[position++];
        const fields=item.nextElementSibling;
        const settings=disclosure('Ajustar','exercise-settings');
        const accessibleName=element('span','visually-hidden',' '+exercise.name);settings.firstChild.append(accessibleName);
        const tools=item.children[1];
        if(tools){
            tools.classList.add('exercise-edit-actions');
            const buttons=tools.querySelectorAll('button');
            buttons[0]?.setAttribute('aria-label','Trocar '+exercise.name);buttons[1]?.setAttribute('aria-label','Remover '+exercise.name);
            settings.append(tools);
        }
        const focus=item.querySelector('.exercise-focus');if(focus)settings.append(focus);
        item.querySelector('a')?.setAttribute('aria-label','Buscar demonstração de '+exercise.name);
        const wrapper=element('article','preview-exercise');item.before(wrapper);wrapper.append(item,settings);
        if(fields?.classList.contains('editor-exercise-fields'))settings.append(fields);
        settings.open=['template','plan'].includes(kind)||Boolean(exercise.needsReview);
    }
    for(const [index,entry]of Array.from(list.querySelector('#routineReview ul')?.children||[]).entries()){
        const issue=issues[index];
        if(issue?.blockIndex===undefined)continue;
        const button=element('button','text-button','Resolver');button.type='button';
        button.addEventListener('click',()=>{
            const block=state.currentRoutine[issue.blockIndex];
            if(kind==='cycle'){
                state.editorContext.activeDay=block.day;
                window.FitApp.renderPreviewList();
                const card=document.querySelectorAll('.cycle-block-editor')[[...state.currentRoutine.slice(0,issue.blockIndex)].filter(item=>item.day===block.day).length];
                if(card){card.open=true;card.scrollIntoView({block:'center'});}return;
            }
            const offset=state.currentRoutine.slice(0,issue.blockIndex).reduce((total,item)=>total+item.exercises.length,0);
            const target=list.querySelectorAll('.preview-exercise')[offset+(issue.exerciseIndex||0)];
            if(target){target.querySelector('details').open=true;target.scrollIntoView({block:'center'});target.querySelector('summary').focus({preventScroll:true});}
            else document.querySelector('#customWorkoutControls button')?.focus();
        });entry.append(' ',button);
    }
    arrangeActions(kind);
    queueMicrotask(persistDraft);
}

function arrangeActions(kind){
    const controls=document.getElementById('customWorkoutControls'),bar=document.querySelector('.preview-actions');
    const save=document.getElementById('saveTemplateButton');
    let more=document.getElementById('previewMore');
    if(!more){more=disclosure('Mais opções','preview-more');more.id='previewMore';controls.after(more);}
    const name=document.getElementById('customWorkoutNameContainer');name.hidden=kind==='session';
    if(kind==='session'){
        if(!document.getElementById('showCopyName')){
            const rename=element('button','text-button','Nome para salvar uma cópia');rename.id='showCopyName';rename.type='button';
            rename.addEventListener('click',()=>{name.hidden=false;document.getElementById('customWorkoutName').focus();});more.append(rename);
        }
        more.append(controls);controls.append(save);save.className='button secondary';
    }else{
        more.before(controls);bar.prepend(save);save.className='button primary';
    }
    const rename=document.getElementById('showCopyName');if(rename)rename.hidden=kind!=='session';
    for(const id of ['sessionParameters','sessionCoverage']){const panel=document.getElementById(id);if(panel)more.append(panel);}
    const addBlock=[...controls.querySelectorAll('button'),...more.querySelectorAll('button')].find(button=>button.textContent==='Adicionar bloco');
    if(addBlock)more.append(addBlock);
    more.append(document.getElementById('btnStartPrep'));
    let combined=document.getElementById('saveAndTrainButton');
    if(!combined){combined=element('button','button primary');combined.type='button';combined.id='saveAndTrainButton';combined.addEventListener('click',()=>window.FitApp.saveAndStartWorkout());bar.prepend(combined);}
    combined.hidden=!['new','cycle'].includes(kind);
    combined.textContent=kind==='cycle'?'Salvar e treinar '+(state.editorContext.activeDay||'A'):'Salvar e treinar';
    if(['new','cycle'].includes(kind))save.className='button secondary';
    bar.dataset.issues=String(issuesCount());
    let status=document.getElementById('previewDraftStatus');
    if(!status){status=element('p','draft-status');status.id='previewDraftStatus';status.setAttribute('role','status');bar.append(status);}
    status.textContent='';
}
const issuesCount=()=>document.querySelectorAll('#routineReview li').length;

function refreshHome(){
    if(!window.FitStore?.uid)return;
    const templates=readJSON(window.FitStore.get('fitapp_custom_workouts'),[]),plan=readJSON(window.FitStore.get('fitapp_campaign_data'),null);
    document.getElementById('planReviewReminder')?.remove();
    if(isWorkoutModel(plan?.method)){
        const reminder=element('div');reminder.id='planReviewReminder';
        document.querySelector('.home-overview').before(reminder);renderReviewReminder(reminder,plan);
    }
    const choices=[...Object.entries(plan?.workouts||{}).map(([day,routine])=>({type:day,name:plan.workoutNames?.[day]||'Treino '+day,routine})),...templates.map(item=>({type:'custom_'+item.id,...item}))];
    document.body.classList.toggle('has-saved-workouts',choices.length>0);
    let panel=document.getElementById('quickWorkout');
    if(!panel){
        panel=element('section','quick-workout panel');panel.id='quickWorkout';
        const art=element('img','quick-illustration');art.src='illustrations/preparation.svg';art.alt='';art.width=80;art.height=60;panel.append(art);
        const title=element('h2');title.id='quickWorkoutTitle';
        panel.append(element('span','eyebrow','PRÓXIMO TREINO'),title);
        const name=element('p');name.id='quickWorkoutName';panel.append(name);
        const button=element('button','button primary','Começar treino');button.id='quickWorkoutOpen';button.type='button';panel.append(button);
        const actions=element('div','quick-secondary-actions');
        const review=element('button','text-button','Ver exercícios e ajustar');review.id='quickWorkoutReview';review.type='button';actions.append(review);panel.append(actions);
        const change=disclosure('Trocar dia ou ficha','quick-workout-choice'),label=element('label','field','Treino para hoje'),select=element('select');select.id='quickWorkoutSelect';label.append(select);change.append(label);actions.append(change);
        document.querySelector('.home-overview').before(panel);
    }
    panel.hidden=!choices.length;
    if(!choices.length)return;
    const preferred=window.FitStore.get('fitapp_quick_workout')||window.FitStore.get('fitapp_last_workout');
    const owner=window.FitStore.uid;
    const history=readJSON(window.FitStore.get('fitapp_week_log'),[]),pending=readJSON(window.FitStore.get('fitapp_sync_queue'),[]);
    const durableRecords=[...new Set([...history,...pending.filter(item=>item._action!=='delete')].filter(item=>item.campaignId===plan?.id).map(item=>JSON.stringify([item._id,item.tipo,item.createdAt,item.date])))].sort();
    const sequence=JSON.stringify([owner,plan?.id,durableRecords]);
    if(state.quickSequence!==sequence){state.quickSequence=sequence;state.quickDayOverride=null;}
    const next=isWorkoutModel(plan?.method)?nextModelDay(plan,history,pending):null;
    const pinned=window.FitStore.get('fitapp_quick_workout');
    const current=choices.find(item=>item.type===(state.quickDayOverride||(next&&!pinned?.startsWith('custom_')?next:preferred)))||choices[0];
    const select=document.getElementById('quickWorkoutSelect');
    if(JSON.stringify(choices.map(item=>[item.type,item.name]))!==select.dataset.choices){
        select.replaceChildren(...choices.map(item=>{const option=element('option','',item.name);option.value=item.type;return option;}));
        select.dataset.choices=JSON.stringify(choices.map(item=>[item.type,item.name]));
    }
    select.value=current.type;
    select.onchange=()=>{state.quickDayOverride=select.value;window.FitApp.safeSet('fitapp_quick_workout',select.value);refreshHome();};
    document.getElementById('quickWorkoutTitle').textContent=current.type.startsWith('custom_')?'Sua ficha para hoje':'Próximo treino: '+current.type;
    document.getElementById('quickWorkoutName').textContent=current.name+' · '+current.routine.filter(blockEnabled).reduce((total,block)=>total+block.exercises.length,0)+' exercícios';
    document.getElementById('quickWorkoutOpen').onclick=()=>window.FitApp.startSavedWorkout(select.value);
    document.getElementById('quickWorkoutReview').onclick=()=>window.FitApp.startWorkout(select.value);
}

function refreshDrafts(){
    let panel=document.getElementById('draftsPanel');
    if(!panel){panel=element('section','panel');panel.id='draftsPanel';document.getElementById('workoutAddButton').before(panel);}
    const drafts=listDrafts();panel.hidden=!drafts.length;panel.replaceChildren(element('h2','','Continuar um rascunho'),element('p','','Salvo apenas neste dispositivo. Sua ficha original permanece preservada.'));
    for(const {key,value}of drafts){
        const valid=validDraft(value,window.FitStore?.uid),row=element('article','draft-row');
        row.append(element('strong','',valid?(value.name||'Ficha sem nome'):'Rascunho de formato incompatível'));
        if(valid)row.append(element('small','',new Date(value.updatedAt).toLocaleString('pt-BR')));
        const actions=element('div','action-row');
        const restore=element('button','button secondary','Continuar');restore.type='button';restore.disabled=!valid;restore.onclick=()=>restoreDraft(key);actions.append(restore);
        const discard=element('button','text-button','Descartar');discard.type='button';discard.onclick=()=>{if(confirm('Descartar este rascunho local? A ficha salva e o histórico serão preservados.'))discardDraft(key);};actions.append(discard);
        row.append(actions);panel.append(row);
    }
    let shortcut=document.getElementById('draftHomeShortcut');
    if(!shortcut){shortcut=element('button','button secondary');shortcut.id='draftHomeShortcut';shortcut.type='button';shortcut.onclick=()=>{document.getElementById('nav-workouts').click();panel.scrollIntoView({block:'start'});};document.querySelector('.home-overview').before(shortcut);}
    shortcut.hidden=!drafts.length;shortcut.textContent='Continuar rascunho'+(drafts.length>1?'s ('+drafts.length+')':'');
}

export function setupMobileFlow(){
    let scheduled=false;
    const refresh=()=>{scheduled=false;refreshHome();refreshDrafts();};
    const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(refresh);}};
    for(const name of ['fitapp:datachange','fitapp:cloudchange','fitapp:draftschange','fitapp:accountchange','storage'])window.addEventListener(name,schedule);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')schedule();});
    for(const name of ['input','change'])document.getElementById('workoutPreview').addEventListener(name,()=>{persistDraft();const status=document.getElementById('previewDraftStatus');if(status)status.textContent=state.draftId?'Rascunho salvo neste dispositivo':'';});
    window.addEventListener('pagehide',persistDraft);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persistDraft();});
    window.addEventListener('beforeunload',event=>{if(!persistDraft()){event.preventDefault();event.returnValue='';}});
    const viewport=window.visualViewport;
    new ResizeObserver(entries=>document.documentElement.style.setProperty('--preview-action-height',(entries[0].borderBoxSize?.[0]?.blockSize||entries[0].contentRect.height)+'px')).observe(document.querySelector('.preview-actions'));
    const resize=()=>{const offset=viewport?Math.max(0,window.innerHeight-viewport.height-viewport.offsetTop):0;document.documentElement.style.setProperty('--keyboard-offset',offset+'px');};
    viewport?.addEventListener('resize',resize);viewport?.addEventListener('scroll',resize);
    resize();schedule();
}
