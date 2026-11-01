import {emptyCampaign,mergeCampaign} from './sync-domain.js';
import { mergeHistory, newId, normalizeDictionary, readJSON } from './domain.js';

const inFlight = new Map();
export function syncOfflineWorkouts() {
    if(globalThis.navigator?.onLine===false)return Promise.resolve();
    const uid = window.FitStore.uid;
    if (!uid || firebase.auth().currentUser?.uid !== uid) return Promise.resolve();
    if (inFlight.has(uid)) return inFlight.get(uid);
    const run = async () => {
        while (window.FitStore.uid === uid && firebase.auth().currentUser?.uid === uid) {
            const queue = readJSON(window.FitApp.safeGet('fitapp_sync_queue'), []);
            const payload = queue.find(item => item.userId === uid);
            if (!payload) return;
            if (!payload._id) {
                payload._id = newId();
                window.FitStore.set('fitapp_sync_queue', JSON.stringify(queue));
            }
            try {
                const deleting = payload._action === 'delete';
                const response = deleting ? await window.FitAPI.deletarTreino(payload._id) : await window.FitAPI.salvarTreino(payload);
                if (window.FitStore.uid !== uid) return;
                // Releitura após await: não apaga itens que chegaram durante o envio.
                await window.FitStore.updateQueue(latest => latest.filter(item => item._id !== payload._id || item._action !== payload._action));
                const deleted = new Set(readJSON(window.FitStore.get('fitapp_deleted_sessions'), []));
                const saved = deleting || response?.deleted || deleted.has(payload._id) ? [] : [{...payload, _id: response.id, _sync:'synced'}];
                window.FitStore.set('fitapp_week_log', JSON.stringify(mergeHistory(readJSON(window.FitApp.safeGet('fitapp_week_log'), []), saved).filter(item => !deleted.has(item._id))));
            } catch (error) {
                console.warn('Sincronização pendente:', error.message);
                return;
            }
        }
    };
    const task = (navigator.locks ? navigator.locks.request(`fitapp-sync:${uid}`, run) : run()).finally(() => inFlight.delete(uid));
    inFlight.set(uid, task);
    return task;
}

const campaignFlights=new Map();
const sameCampaign=(a,b)=>JSON.stringify({...a,updatedAt:0})===JSON.stringify({...b,updatedAt:0});
export function captureCampaign(){
    const get=key=>window.FitStore.get(key);
    const main_method=get('fitapp_main_method')||'abc_tradicional';
    return {campaign_data:get('fitapp_campaign_data')||'',campaign_count:get('fitapp_campaign_count')||'0',blacklist:get('fitapp_blacklist')||'[]',main_method,profile:get('fitapp_profile')||'hipertrofia',level:get('fitapp_level')||(['abc_tradicional','abc_sinergista'].includes(main_method)?'padrao':'iniciante'),custom_workouts:get('fitapp_custom_workouts')||'[]',deleted_templates:get('fitapp_deleted_templates')||'[]',updatedAt:Date.now()};
}
function applyCampaign(payload){
    for(const [field,key]of Object.entries({campaign_data:'campaign_data',campaign_count:'campaign_count',blacklist:'blacklist',main_method:'main_method',profile:'profile',level:'level',custom_workouts:'custom_workouts',deleted_templates:'deleted_templates'}))window.FitStore.set('fitapp_'+key,payload[field]??emptyCampaign()[field]);
    window.dispatchEvent?.(new Event('fitapp:cloudchange'));
}
function preserveConflicts(conflicts){
    if(!conflicts.length)return;
    const existing=readJSON(window.FitStore.get('fitapp_sync_conflicts'),[]);
    window.FitStore.set('fitapp_sync_conflicts',JSON.stringify([...new Map([...existing,...conflicts].map(c=>[c.id,c])).values()]));
}
export function saveCampaignToCloud(){
    const uid=window.FitStore.uid;
    if(!uid||firebase.auth().currentUser?.uid!==uid)return Promise.resolve();
    const previous=readJSON(window.FitStore.get('fitapp_campaign_dirty'),null);
    // Confirma a operação anterior antes de atribuir outra identidade. Se o
    // servidor já a gravou e a resposta se perdeu, suas diferenças não se repetem.
    // Novas edições ficam nas chaves locais e são rebaseadas após essa confirmação.
    if(previous?.payload)return flushCampaign();
    const base=readJSON(window.FitStore.get('fitapp_cloud_base'),null)?.payload||previous?.base||emptyCampaign();
    window.FitStore.set('fitapp_campaign_dirty',JSON.stringify({id:newId(),base,payload:captureCampaign()}));
    return flushCampaign();
}
export function flushCampaign(){
    const uid=window.FitStore.uid;
    if(!uid||firebase.auth().currentUser?.uid!==uid)return Promise.resolve();
    if(campaignFlights.has(uid))return campaignFlights.get(uid);
    const run=async()=>{
        const db=firebase.firestore(),ref=db.collection('usuarios').doc(uid);let collisionRetries=0;
        while(window.FitStore.uid===uid&&firebase.auth().currentUser?.uid===uid){
            let job=readJSON(window.FitStore.get('fitapp_campaign_dirty'),null);if(!job)return;
            if(!job.payload){job={id:newId(),base:emptyCampaign(),payload:job};window.FitStore.set('fitapp_campaign_dirty',JSON.stringify(job));}
            let observedVersion=null;
            try{
                const receipt=ref.collection('sync_operations').doc(job.id);
                const committed=await db.runTransaction(async tx=>{
                    const [doc,ack]=await Promise.all([tx.get(ref),tx.get(receipt)]);
                    observedVersion=doc.data()?.syncVersion||0;
                    const remote=doc.data()?.campanha||emptyCampaign();
                    if(ack.exists)return{payload:remote,version:doc.data().syncVersion||0,conflicts:readJSON(ack.data().conflicts,[])};
                    const merged=mergeCampaign(job.base,job.payload,remote),version=(doc.data()?.syncVersion||0)+1;
                    tx.set(ref,{campanha:merged.payload,syncVersion:version,lastOperation:job.id},{merge:true});
                    tx.set(receipt,{version,conflicts:JSON.stringify(merged.conflicts),createdAt:firebase.firestore.FieldValue.serverTimestamp()});
                    return{...merged,version};
                });
                if(window.FitStore.uid!==uid)return;
                preserveConflicts(committed.conflicts);
                const latest=readJSON(window.FitStore.get('fitapp_campaign_dirty'),null);
                const live=captureCampaign();
                window.FitStore.set('fitapp_cloud_base',JSON.stringify({payload:committed.payload,version:committed.version}));
                if(latest?.id===job.id&&sameCampaign(live,latest.payload)){applyCampaign(committed.payload);window.FitStore.remove('fitapp_campaign_dirty');}
                else if(latest){
                    const rebased=mergeCampaign(job.payload,live,committed.payload);preserveConflicts(rebased.conflicts);
                    applyCampaign(rebased.payload);window.FitStore.set('fitapp_campaign_dirty',JSON.stringify({id:newId(),base:committed.payload,payload:rebased.payload}));
                }
                collisionRetries=0;
            }catch(error){
                // Uma escrita concorrente pode fazer as regras rejeitarem a versão
                // antes de o SDK receber ABORTED. Releia somente nesse caso comprovado.
                if(error.code==='permission-denied'&&observedVersion!==null&&collisionRetries<5){
                    try{const fresh=await ref.get({source:'server'});
                        if(window.FitStore.uid===uid&&(fresh.data()?.syncVersion||0)>observedVersion){collisionRetries++;continue;}
                    }catch{/* Mantém a operação pendente se a rede também falhou. */}
                }
                console.warn('Plano e fichas aguardam sincronização:',error.code||error.message);return;
            }
        }
    };
    const task=(navigator.locks?navigator.locks.request('fitapp-campaign:'+uid,run):run()).finally(()=>campaignFlights.delete(uid));campaignFlights.set(uid,task);return task;
}
export async function loadCampaignFromCloud(){
    const uid=window.FitStore.uid;if(!uid||firebase.auth().currentUser?.uid!==uid)return;
    if(window.FitStore.get('fitapp_campaign_dirty'))await flushCampaign();
    if(window.FitStore.get('fitapp_campaign_dirty'))return;
    try{
        const doc=await firebase.firestore().collection('usuarios').doc(uid).get({source:'server'});if(window.FitStore.uid!==uid)return;
        if(!window.FitStore.get('fitapp_cloud_base')){
            const local=captureCampaign();
            if(!sameCampaign(local,emptyCampaign())){await saveCampaignToCloud();return;}
        }
        const payload={...emptyCampaign(),...doc.data()?.campanha};
        applyCampaign(payload);window.FitStore.set('fitapp_cloud_base',JSON.stringify({payload,version:doc.data()?.syncVersion||0}));
    }catch(error){console.warn('Dados locais preservados. Nuvem indisponível:',error.code||error.message);}
}

export async function syncTacticalDictionary() {
    try {
        const db = firebase.firestore();
        const snapshot = await db.collection('dicionario').get();
        if (snapshot.empty) return; 

        if (typeof window.dictionaryData === 'undefined') return;

        // Estrutura publicada junto ao catálogo utilizado no servidor.
        snapshot.forEach(doc => {
            const data = doc.data();
            const name = data.nome || data.name;
            const existing = window.dictionaryData.find(item => item.name.toLowerCase() === name?.toLowerCase());
            if (existing && !existing.catalogueRevision && typeof data.dica === 'string') existing.desc = data.dica;
        });
        window.dictionaryData = normalizeDictionary(window.dictionaryData);
        if (typeof window.FitApp.filterLibrary === 'function') window.FitApp.filterLibrary();
    } catch (error) {
        console.log("⚠️ Modo Offline: Utilizando dicionário de fábrica.");
    }
}
