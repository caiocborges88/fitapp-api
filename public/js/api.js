// static/js/api.js
'use strict';

// 1. CHAVES DE IGNIÇÃO DA NUVEM
const firebaseConfig = {
    apiKey: "AIzaSyDaFhCNgg53Toaqhiz9LNAgqapBAMOqJUk",
    authDomain: "fitapp-operacional.firebaseapp.com",
    projectId: "fitapp-operacional",
    storageBucket: "fitapp-operacional.firebasestorage.app",
    messagingSenderId: "1068510399423",
    appId: "1:1068510399423:web:6edf28fca8bae113206f0a"
};

const useEmulators = ['localhost','127.0.0.1'].includes(location.hostname) && (location.port === '5000' || new URLSearchParams(location.search).get('emulator') === '1');
if (useEmulators) { firebaseConfig.projectId = 'demo-fitapp'; }

// 2. INICIALIZAÇÃO DO MOTOR E PROVEDORES
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Emulação é explícita, restrita ao localhost e usa projeto sem produção.
if (useEmulators) {
    auth.useEmulator('http://127.0.0.1:9099', {disableWarnings:true});
    db.useEmulator('127.0.0.1',8080);
}

var FitAPI = (() => {
    const BASE_URL = '/api';

    // 3. MONITOR DE RADAR (Fica vigiando se alguém logou ou deslogou)
    auth.onAuthStateChanged((user) => {
        const overlay = document.getElementById('loginOverlay');
        if (user) {
            // Se logou, derruba o escudo visual e libera o app
            if (overlay) overlay.style.display = 'none';
            console.log("Comandante a bordo:", user.displayName);
        } else {
            // Se não tem ninguém logado, levanta o escudo
            if (overlay) overlay.style.display = 'flex';
        }
    });

    // 4. FUNÇÃO DE LOGIN
    async function loginComGoogle() {
        try {
            await auth.signInWithPopup(googleProvider);
        } catch (error) {
            console.error("Falha na biometria do Google:", error);
            alert("Não foi possível acessar. Tente novamente.");
        }
    }

    // Interceptador global de respostas
    async function handleResponse(response) {
        if (!response.ok) {
            let errorMsg = `Erro HTTP: ${response.status}`;
            try {
                // Tenta extrair a mensagem real enviada pelo nosso Cérebro Neural
                const errBody = await response.json();
                if (errBody.error) {
                    errorMsg = errBody.error;
                }
            } catch(e) {
                // Se não conseguir ler o JSON, mantém o erro genérico
            }
            console.error("Mensagem real do Servidor:", errorMsg);
            throw new Error(errorMsg);
        }
        return response.json();
    }

    // 5. SALVAMENTO COM ASSINATURA DIGITAL
    async function salvarTreino(payload) {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Acesso negado. Usuário fantasma.");
            if (payload.userId !== user.uid || !payload._id) throw new Error('Identidade da sessão inválida.');

            // Adiciona a "Dog Tag" do atleta no pacote de dados antes de enviar
            const { _id, _sync, timestamp, userEmail, userName, ...data } = payload;
            const record = {...data, createdAt:data.createdAt || Date.now(), complete:Boolean(data.complete), campaignId:data.campaignId || null};
            const docRef = db.collection('treinos_concluidos').doc(_id);
            await db.runTransaction(async transaction => {
                const deleted=await transaction.get(db.collection('usuarios').doc(user.uid).collection('exclusoes').doc(_id));
                if(deleted.exists)throw Object.assign(new Error('Registro já excluído.'),{code:'session-deleted'});
                const existing = await transaction.get(docRef);
                if (existing.exists) {
                    if (existing.data().userId !== user.uid) throw new Error('Sessão pertence a outra conta.');
                    return;
                }
                transaction.set(docRef, {...record, timestamp: firebase.firestore.FieldValue.serverTimestamp()});
            });
            console.log("Treino assinado e cravado na nuvem. ID:", docRef.id);
            
            return { sucesso: true, id: docRef.id };
        } catch (error) {
            if(error.code==='session-deleted')return{id:payload._id,deleted:true};
            console.error("Erro no link com a base Firestore:", error);
            throw new Error("Falha na conexão Cloud.");
        }
    }

    async function getCoachFeedback() {
        if(globalThis.FitAIPolicy?.coach!==true)throw new Error('Os recursos de IA ficaram para a próxima fase.');
        const response = await authorizedFetch('/coach');
        return handleResponse(response);
    }

    async function importarTreinoIA(megaPrompt, env = 'academia') {
        if(globalThis.FitAIPolicy?.workouts!==true)throw new Error('A criação e a importação por IA ficaram para a próxima fase.');
        const response = await authorizedFetch('/importar-treino-ia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: megaPrompt, env })
        });
        return handleResponse(response);
    }

    async function authorizedFetch(route, options = {}) {
        const user = auth.currentUser;
        if (!user) throw new Error('Entre na sua conta para usar este recurso.');
        const token = await user.getIdToken();
        return fetch(BASE_URL + route, { ...options, headers: { ...options.headers, Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(55000) });
    }

    async function solicitarRecompensa(sessionId, action = 'claim') {
        const uid = auth.currentUser?.uid;
        if (action === 'craft') {
            sessionId = window.FitStore.get('fitapp_craft_request') || crypto.randomUUID();
            window.FitStore.set('fitapp_craft_request', sessionId);
        }
        const result = await handleResponse(await authorizedFetch('/recompensas', {
            method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({sessionId, action})
        }));
        if (auth.currentUser?.uid !== uid) throw new Error('A conta da sessão mudou.');
        if (action === 'craft') window.FitStore.remove('fitapp_craft_request');
        return result;
    }

    // 6. RESGATE DE MEMÓRIA (Amnésia Resolvida)
    let historyCursor=null,historyUid=null,historyMore=true;
    const historyQuery=uid=>db.collection('treinos_concluidos').where('userId','==',uid).orderBy('timestamp','desc');
    const sessionRecord=(doc,uid)=>({...doc.data(),_id:doc.id,userId:uid,_sync:'synced'});
    async function carregarHistoricoPagina(reset=false){
        const uid=auth.currentUser?.uid;if(!uid)return[];
        if(reset||historyUid!==uid){historyUid=uid;historyCursor=null;historyMore=true;}
        if(!historyMore)return[];
        let query=historyQuery(uid).limit(50);if(historyCursor)query=query.startAfter(historyCursor);
        const snapshot=await query.get({source:'server'});if(auth.currentUser?.uid!==uid)throw new Error('A conta da sessão mudou.');
        const docs=snapshot.docs;historyCursor=docs.at(-1)||historyCursor;historyMore=docs.length===50;
        return docs.map(doc=>sessionRecord(doc,uid));
    }
    async function carregarHistoricoNuvem(){return carregarHistoricoPagina(true);}
    async function carregarHistoricoRecente(){
        const uid=auth.currentUser?.uid;if(!uid)return[];
        const snapshot=await historyQuery(uid).limit(50).get({source:'server'});
        if(auth.currentUser?.uid!==uid)throw new Error('A conta da sessão mudou.');
        return snapshot.docs.map(doc=>sessionRecord(doc,uid));
    }
    async function carregarHistoricoCompleto(){
        const uid=auth.currentUser?.uid;if(!uid)throw new Error('Entre na sua conta.');
        const records=[];let cursor=null;
        while(true){let query=historyQuery(uid).limit(200);if(cursor)query=query.startAfter(cursor);const snapshot=await query.get({source:'server'});
            if(auth.currentUser?.uid!==uid)throw new Error('A conta da sessão mudou.');
            records.push(...snapshot.docs.map(doc=>sessionRecord(doc,uid)));if(snapshot.docs.length<200)return records;cursor=snapshot.docs.at(-1);
        }
    }
    async function carregarExclusoes(){
        const uid=auth.currentUser?.uid;if(!uid)return[];
        const ids=new Set(JSON.parse(window.FitStore.get('fitapp_deleted_sessions')||'[]'));
        const since=Number(window.FitStore.get('fitapp_deletions_checkpoint'))||0;let maxTime=since,cursor=null;
        while(true){let query=db.collection('usuarios').doc(uid).collection('exclusoes').orderBy('deletedAt').limit(200);
            if(since)query=query.where('deletedAt','>=',new Date(since));if(cursor)query=query.startAfter(cursor);
            const snapshot=await query.get({source:'server'});if(auth.currentUser?.uid!==uid)throw new Error('A conta da sessão mudou.');
            for(const doc of snapshot.docs){ids.add(doc.id);maxTime=Math.max(maxTime,doc.data().deletedAt?.toMillis?.()||0);}
            if(snapshot.docs.length<200)break;cursor=snapshot.docs.at(-1);
        }
        window.FitStore.set('fitapp_deleted_sessions',JSON.stringify([...ids]));window.FitStore.set('fitapp_deletions_checkpoint',String(maxTime));return [...ids];
    }

    // 7. DESTRUIÇÃO DE REGISTRO
    async function deletarTreino(docId) {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Usuário não autenticado.");
            
            const deletion=db.collection('usuarios').doc(user.uid).collection('exclusoes').doc(docId);
            await db.runTransaction(async tx=>{
                const previous=await tx.get(deletion);
                const session=await tx.get(db.collection('treinos_concluidos').doc(docId));
                if(session.exists&&session.data().userId!==user.uid)throw new Error('Registro de outra conta.');
                if(!previous.exists)tx.set(deletion,{deletedAt:firebase.firestore.FieldValue.serverTimestamp()});
                tx.delete(db.collection('treinos_concluidos').doc(docId));
            });
            console.log("Treino aniquilado da base:", docId);
            return true;
        } catch (error) {
            console.error("Erro ao deletar treino:", error);
            throw new Error("Falha na exclusão Cloud.");
        }
    }

    return {
        salvarTreino, carregarHistoricoPagina, carregarHistoricoCompleto, carregarHistoricoRecente, carregarExclusoes, temMaisHistorico:()=>historyMore,
        deletarTreino,
        getCoachFeedback,
        importarTreinoIA,
        carregarHistoricoNuvem, // NOVO: Expõe a função de resgate
        loginComGoogle // Expõe a função para o botão do index.html
        , solicitarRecompensa
    };
})();
