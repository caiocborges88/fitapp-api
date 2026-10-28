import './data-controls.js';
import './environment-controls.js';
import {state} from './state.js';
import {readJSON} from './domain.js';
import {flushCampaign,syncOfflineWorkouts} from './sync.js';
import {setupMobileFlow} from './mobile-flow.js';

const text = (id,value) => {const el=document.getElementById(id);if(el && el.textContent!==String(value))el.textContent=value;};
let scheduled=false;
function refresh(){
    scheduled=false;
    const user=globalThis.firebase?.auth().currentUser;
    const history=readJSON(globalThis.FitStore?.get('fitapp_week_log'),[]);
    const queue=readJSON(globalThis.FitStore?.get('fitapp_sync_queue'),[]);
    const dirty=globalThis.FitStore?.get('fitapp_campaign_dirty');
    const name=user?.displayName?.trim() || user?.email?.split('@')[0] || 'Atleta';
    const initial=Array.from(name)[0]?.toLocaleUpperCase('pt-BR') || '?';
    text('profileName',name);text('profileEmail',user?.email || '');text('profileAvatar',initial);text('headerAvatar',initial);
    text('profileLevelDisplay',({iniciante:'Iniciante',intermediario:'Intermediário',avancado:'Avançado'})[globalThis.FitStore?.get('fitapp_level')]||'Não informada');
    text('greetingName',user ? ', '+name.split(/\s/)[0] : '');
    text('homeTotal',history.length);text('statWorkouts',history.length);
    const last=history.at(-1);
    text('homeLast',last?new Date(last.date+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}):'—');
    text('todayLabel',new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'}));
    const sync=document.getElementById('syncStatus');
    if(sync){
        const pending=queue.length || Boolean(dirty);
        const status=!navigator.onLine?'offline':pending?'pending':'synced';
        sync.dataset.state=status;
        sync.textContent=!user?'Entre para sincronizar':!navigator.onLine?'Offline · salvo no dispositivo':pending?(queue.length?`${queue.length} ${queue.length===1?'envio pendente':'envios pendentes'}`:'Plano pendente')+' · tentar novamente':'Sem envios pendentes';
        sync.title='Os dados são gravados primeiro no dispositivo. Clique para tentar enviar registros pendentes.';
    }
    if(document.body.classList.contains('session-active')!==state.isWorkoutActive)document.body.classList.toggle('session-active',state.isWorkoutActive);
    const restPanel=document.getElementById('timerContainer');
    if(restPanel)restPanel.hidden=state.currentWorkoutType==='Cardio';
    const preview=!state.isWorkoutActive && document.getElementById('tab-treino').classList.contains('active') && ['workoutPreview','prepArea'].some(id=>{const el=document.getElementById(id);return el && getComputedStyle(el).display!=='none';});
    if(document.body.classList.contains('preview-active')!==preview)document.body.classList.toggle('preview-active',preview);
}
function requestRefresh(){if(!scheduled){scheduled=true;requestAnimationFrame(refresh);}}

function setup(){
    setupMobileFlow();
    globalThis.firebase.auth().onAuthStateChanged(requestRefresh);
    for(const event of ['fitapp:datachange','storage','online','offline'])window.addEventListener(event,requestRefresh);
    document.getElementById('syncStatus')?.addEventListener('click',()=>{
        syncOfflineWorkouts();flushCampaign();
    });
    document.addEventListener('visibilitychange',requestRefresh);
    const titles={'tab-treino':'Visão geral','tab-workouts':'Suas fichas','tab-evolucao':'Histórico e evolução','tab-perfil':'Perfil e preferências','tab-biblioteca':'Biblioteca','tab-conquistas':'Sua coleção','tab-arena':'Em revisão'};
    const observer=new MutationObserver(()=>{
        const active=document.querySelector('.tab-content.active');
        text('headerPageTitle',titles[active?.id] || 'Seu treino');
        document.querySelectorAll('#bottomNav button').forEach(button=>{
            if(button.classList.contains('active'))button.setAttribute('aria-current','page');
            else button.removeAttribute('aria-current');
        });
        requestRefresh();
    });
    document.querySelectorAll('.tab-content').forEach(tab=>observer.observe(tab,{attributes:true,attributeFilter:['class']}));
    const viewObserver=new MutationObserver(requestRefresh);
    for(const id of ['workoutPreview','prepArea','workoutArea'])viewObserver.observe(document.getElementById(id),{attributes:true,attributeFilter:['style']});
    const media=matchMedia('(prefers-color-scheme: dark)');
    const theme=()=>{
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content',media.matches?'#0c1520':'#f4f7f9');
        if(document.getElementById('tab-evolucao')?.classList.contains('active'))globalThis.FitApp.renderMetricsChart();
    };
    media.addEventListener('change',theme);theme();
    document.addEventListener('keydown',event=>{
        if(document.querySelector('dialog[open]'))return;
        const open=[...document.querySelectorAll('.swap-modal-overlay,.pack-modal')].filter(el=>getComputedStyle(el).display!=='none').at(-1);
        if(!open)return;
        if(event.key==='Escape'){open.style.display='none';event.preventDefault();return;}
        if(event.key==='Tab'){
            const controls=[...open.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(el=>!el.disabled && el.getClientRects().length);
            if(!controls.length)return;
            const first=controls[0],last=controls.at(-1);
            if(event.shiftKey&&(document.activeElement===first||!open.contains(document.activeElement))){last.focus();event.preventDefault();}
            else if(!event.shiftKey&&(document.activeElement===last||!open.contains(document.activeElement))){first.focus();event.preventDefault();}
        }
    });
    requestRefresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
