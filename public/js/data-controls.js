import {mergeHistory,readJSON} from './domain.js';
import {saveCampaignToCloud} from './sync.js';
import {state} from './state.js';
import {listDrafts} from './drafts.js';

const store=()=>window.FitStore;
const read=(key,fallback=[])=>readJSON(store().get(key),fallback);
const notice=message=>window.FitApp.showToast(message);
let loading=false;
function refreshHistory(){
    window.FitApp.renderHistoryList();window.FitApp.renderWeeklyCalendar();window.FitApp.renderMetricsChart();
}
function refresh(){
    const status=document.getElementById('historyCoverage');
    const count=read('fitapp_week_log').length;
    if(status)status.textContent=`${count} ${count===1?'registro':'registros'} no dispositivo. Gráficos e calendário usam os registros carregados.`;
    const more=document.getElementById('loadMoreHistory');
    if(more){more.disabled=loading;more.textContent=loading?'Carregando…':window.FitAPI.temMaisHistorico()?'Carregar registros anteriores':'Todos os registros consultados';more.hidden=!window.FitAPI.temMaisHistorico();}
    const list=document.getElementById('syncConflicts');if(!list)return;
    list.replaceChildren();
    for(const conflict of read('fitapp_sync_conflicts')){
        const panel=document.createElement('article');panel.className='panel';
        const title=document.createElement('h3');title.textContent='Plano alterado em outro dispositivo';
        const description=document.createElement('p');description.textContent='O plano da nuvem está em uso. Sua outra versão está preservada neste dispositivo e pode ser exportada antes de decidir.';
        const apply=document.createElement('button');apply.className='button primary';apply.textContent='Usar minha versão preservada';
        apply.onclick=()=>resolve(conflict,true);
        const keep=document.createElement('button');keep.className='text-button';keep.textContent='Manter plano da nuvem';keep.onclick=()=>resolve(conflict,false);
        panel.append(title,description,apply,keep);list.append(panel);
    }
}
function resolve(conflict,local){
    if(state.isWorkoutActive||document.body.classList.contains('preview-active')){notice('Conclua o treino ou feche o editor antes de escolher um plano.');return;}
    if(!confirm(local?'Substituir o plano atual pela versão preservada?':'Descartar a versão preservada e manter o plano da nuvem?'))return;
    try{
        if(local){for(const [key,value]of Object.entries(conflict.local))store().set('fitapp_'+key,value);saveCampaignToCloud();}
        store().set('fitapp_sync_conflicts',JSON.stringify(read('fitapp_sync_conflicts').filter(item=>item.id!==conflict.id)));
        window.dispatchEvent(new Event('fitapp:cloudchange'));refresh();notice('Escolha salva.');
    }catch(error){notice('Não foi possível gravar sua escolha. Libere espaço no dispositivo.');console.error(error);}
}
async function loadMore(){
    if(loading)return;loading=true;refresh();const uid=store().uid;
    try{
        await window.FitAPI.carregarExclusoes();
        const page=await window.FitAPI.carregarHistoricoPagina();if(store().uid!==uid)return;
        const deleted=new Set(read('fitapp_deleted_sessions'));
        store().set('fitapp_week_log',JSON.stringify(mergeHistory(read('fitapp_week_log'),page).filter(item=>!deleted.has(item._id))));refreshHistory();
    }catch(error){notice('Não foi possível buscar registros. Tente novamente quando estiver online.');console.error(error);}
    finally{loading=false;refresh();}
}
async function exportData(button){
    const uid=store().uid;if(!uid)return;
    button.disabled=true;
    try{
        // A consulta completa tem cursor próprio e não altera a paginação da tela.
        const cloud=await window.FitAPI.carregarHistoricoCompleto();await window.FitAPI.carregarExclusoes();
        const account=await firebase.firestore().collection('usuarios').doc(uid).get({source:'server'});
        if(store().uid!==uid)throw Error('A conta da sessão mudou.');
        const deleted=new Set(read('fitapp_deleted_sessions'));
        const data={format:'fitapp-backup',version:1,exportedAt:new Date().toISOString(),userId:uid,
            history:mergeHistory(cloud,read('fitapp_week_log')).filter(item=>!deleted.has(item._id)),
            templates:read('fitapp_custom_workouts'),plan:read('fitapp_campaign_data',null),
            preferences:{method:store().get('fitapp_main_method'),profile:store().get('fitapp_profile'),level:store().get('fitapp_level'),blacklist:read('fitapp_blacklist')},
            campaignCount:Number(store().get('fitapp_campaign_count'))||0,
            pendingOperations:read('fitapp_sync_queue'),pendingCampaign:read('fitapp_campaign_dirty',null),
            cloudCampaign:account.data()?.campanha||null,cloudVersion:account.data()?.syncVersion||0,
            conflicts:read('fitapp_sync_conflicts'),deletedSessions:[...deleted],deletedTemplates:read('fitapp_deleted_templates'),
            localDrafts:listDrafts().map(({key})=>({key,raw:store().get(key)}))};
        const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
        const link=document.createElement('a');link.href=url;link.download=`fitapp-dados-${new Date().toISOString().slice(0,10)}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
        notice('Arquivo de treinos, fichas e plano exportado.');
    }catch(error){notice('Exportação não concluída. Confira a conexão e tente novamente.');console.error(error);}
    finally{button.disabled=false;}
}
function setup(){
    const history=document.createElement('section');history.className='panel';
    const status=document.createElement('p');status.id='historyCoverage';
    const more=document.createElement('button');more.id='loadMoreHistory';more.className='button';more.onclick=loadMore;
    history.append(status,more);document.getElementById('tab-evolucao').append(history);
    const section=document.createElement('section');section.className='panel';
    const title=document.createElement('h2');title.textContent='Seus dados de treino';
    const description=document.createElement('p');description.textContent='Baixe o histórico completo, fichas, plano e alterações pendentes em JSON. A consulta requer conexão. Coleção e dados administrativos não fazem parte deste arquivo.';
    const button=document.createElement('button');button.id='exportTrainingData';button.className='button';button.textContent='Exportar dados de treino';button.onclick=()=>exportData(button);
    section.append(title,description,button);document.getElementById('tab-perfil').append(section);
    const conflicts=document.createElement('div');conflicts.id='syncConflicts';document.getElementById('tab-workouts').prepend(conflicts);
    for(const event of ['fitapp:datachange','fitapp:cloudchange'])window.addEventListener(event,refresh);
    refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
