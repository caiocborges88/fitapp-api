import {state} from './state.js';
import {readJSON} from './domain.js';
import {environmentOptions} from './environment.js';
import {proposalSignature} from './environment-proposal.js';
import {draftPrefix,draftVersion,validDraft,draftSourceChanged} from './draft-domain.js';

const store=()=>window.FitStore;
let warningShown=false;
export function beginDraft(){
    state.previewOwner=store()?.uid;state.draftId=null;state.draftBaseline=null;state.previewSaved=false;
    state.restoredDraft=null;
    warningShown=false;
}
export function listDrafts(){
    try{return (store()?.keys()||[]).filter(key=>key.startsWith(draftPrefix)).map(key=>({key,value:readJSON(store().get(key),null)})).sort((a,b)=>(b.value?.updatedAt||0)-(a.value?.updatedAt||0));}
    catch{return [];}
}
export function persistDraft(){
    if(!state.editorContext||state.isWorkoutActive||state.previewSaved||!state.currentRoutine.length)return true;
    // Account transitions must be allowed to reload; never write another owner's memory.
    if(!store()?.uid||state.previewOwner!==store().uid)return true;
    const snapshot={version:draftVersion,userId:store().uid,name:document.getElementById('customWorkoutName').value.slice(0,120),title:document.getElementById('previewTitle').textContent,type:state.currentWorkoutType,context:{...state.editorContext,editingBlock:undefined},routine:state.currentRoutine,model:state.previewModel,coverage:state.coverageReference,proposal:state.environmentProposal,rest:state.currentRestTime,environment:environmentOptions(),sessionOrigin:state.sessionOrigin};
    const signature=JSON.stringify(snapshot);
    if(signature===state.draftBaseline)return true;
    if(state.draftBaseline===null&&state.editorContext.kind==='session'){state.draftBaseline=signature;return true;}
    try{
        const id=state.draftId||crypto.randomUUID();
        const value={...snapshot,id,updatedAt:Date.now()};
        const serialized=JSON.stringify(value);
        if(serialized.length>1000000||!validDraft(value,store().uid))throw new Error('invalid-draft');
        store().set(draftPrefix+id,serialized);state.draftId=id;state.draftBaseline=signature;warningShown=false;
        // A restored tab writes to a new key so another open tab keeps its own work.
        if(state.restoredDraft){
            const previous=state.restoredDraft;state.restoredDraft=null;
            if(store().get(previous.key)===previous.raw)store().remove(previous.key);
        }
        window.dispatchEvent(new Event('fitapp:draftschange'));return true;
    }catch{
        if(!warningShown)window.FitApp.showToast('Não foi possível guardar o rascunho. Sua edição continua aberta; libere espaço antes de sair.');
        warningShown=true;return false;
    }
}
export function finishDraft(){
    state.previewSaved=true;
    if(state.previewOwner===store()?.uid&&state.draftId){
        try{store().remove(draftPrefix+state.draftId);}catch{window.FitApp.showToast('A ficha foi salva, mas o rascunho local não pôde ser removido.');}
    }
    state.draftId=null;window.dispatchEvent(new Event('fitapp:draftschange'));
}
export function discardDraft(key){
    if(!key.startsWith(draftPrefix)||!store()?.uid)return false;
    try{store().remove(key);window.dispatchEvent(new Event('fitapp:draftschange'));return true;}
    catch{window.FitApp.showToast('Não foi possível remover o rascunho do dispositivo.');return false;}
}
export function restoreDraft(key){
    if(state.isWorkoutActive){window.FitApp.showToast('Conclua ou descarte a sessão antes de recuperar um rascunho.');return false;}
    if(!key.startsWith(draftPrefix)||!store()?.uid)return false;
    let draft;
    try{draft=readJSON(store().get(key),null);}catch{return false;}
    if(!validDraft(draft,store().uid)){window.FitApp.showToast('Este rascunho usa um formato incompatível ou está incompleto. O arquivo local foi preservado.');return false;}
    if(!persistDraft())return false;
    const current=readJSON(store().get('fitapp_campaign_data'),null),templates=readJSON(store().get('fitapp_custom_workouts'),[]);
    const stale=draftSourceChanged(draft,current,templates);
    state.currentRoutine=structuredClone(draft.routine);state.currentWorkoutType=draft.type;
    window.FitEditor.configureEditor(stale&&['template','plan'].includes(draft.context.kind)?'new':draft.context.kind,draft.context.id);
    if(!(stale&&['template','plan'].includes(draft.context.kind)))Object.assign(state.editorContext,draft.context);
    if(stale&&draft.context.kind==='cycle')Object.assign(state.editorContext,{planId:current?.id||null,revision:current?.revision||0});
    state.previewModel=draft.model;state.coverageReference=draft.coverage;state.environmentProposal=draft.proposal;state.sessionOrigin=draft.sessionOrigin||null;
    if(state.environmentProposal&&proposalSignature(state.environmentProposal.source,{...environmentOptions(),level:state.els.levelSelector?.value})!==state.environmentProposal.signature){
        state.currentRoutine=structuredClone(state.environmentProposal.source);state.environmentProposal=null;
    }
    state.draftId=crypto.randomUUID();state.draftBaseline='restored';state.restoredDraft={key,raw:JSON.stringify(draft)};
    document.getElementById('customWorkoutName').value=draft.name;
    document.getElementById('previewTitle').textContent=stale?'Rascunho recuperado · origem alterada':draft.title||'Rascunho recuperado';
    window.FitApp.switchTab('tab-treino','nav-treino');
    document.getElementById('workoutCards').style.display='none';document.getElementById('workoutPreview').style.display='block';
    document.querySelector('#tab-treino .page-heading').style.display='none';
    window.FitApp.adjustRestTime(draft.rest);
    if(state.editorContext.kind==='session'&&!state.environmentProposal)window.FitApp.adaptCurrentEnvironment();
    window.FitApp.renderPreviewList();
    if(stale)window.FitApp.showToast(draft.context.kind==='cycle'?'O plano mudou. Revise todos os dias; salvar este ciclo exigirá confirmar a substituição.':'A origem mudou. Este rascunho será salvo como uma nova ficha.');
    else window.FitApp.showToast('Rascunho recuperado. Confira o ambiente e as pendências antes de continuar.');
    window.scrollTo({top:0});return true;
}
