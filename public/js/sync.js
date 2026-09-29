// js/sync.js

export async function syncOfflineWorkouts() {
    let syncQueue = JSON.parse(window.FitApp.safeGet('fitapp_sync_queue') || '[]');
    if (syncQueue.length === 0) return;

    console.log(`Iniciando sincronização de ${syncQueue.length} treinos pendentes...`);
    window.FitApp.showToast("Sincronizando treinos pendentes com a nuvem...");

    let remainingQueue = [];
    for (let i = 0; i < syncQueue.length; i++) {
        const payload = syncQueue[i];
        try {
            await window.FitAPI.salvarTreino(payload);
            console.log(`Treino de ${payload.date} sincronizado com sucesso.`);
        } catch (error) {
            console.warn("Rede instável. Sincronização interrompida.");
            remainingQueue = syncQueue.slice(i);
            break; 
        }
    }

    window.FitApp.safeSet('fitapp_sync_queue', JSON.stringify(remainingQueue));
    if (remainingQueue.length === 0) {
        window.FitApp.showToast("Sincronização concluída! Dados atualizados.");
        window.FitApp.speak("Base de dados sincronizada com a nuvem.");
    }
}

export async function saveCampaignToCloud() {
    if (typeof firebase === 'undefined') return;
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const db = firebase.firestore();
    const payload = {
        campaign_data: window.FitApp.safeGet('fitapp_campaign_data') || '',
        campaign_count: window.FitApp.safeGet('fitapp_campaign_count') || '0',
        blacklist: window.FitApp.safeGet('fitapp_blacklist') || '[]',
        main_method: window.FitApp.safeGet('fitapp_main_method') || 'abc',
        profile: window.FitApp.safeGet('fitapp_profile') || 'hipertrofia',
        level: window.FitApp.safeGet('fitapp_level') || 'intermediario'
    };
    
    try {
        await db.collection('usuarios').doc(user.uid).set({ campanha: payload }, { merge: true });
    } catch (error) {
        console.warn("Aviso Tático: Falha ao sincronizar campanha com a nuvem.", error);
    }
}

export async function loadCampaignFromCloud() {
    if (typeof firebase === 'undefined') return;
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const db = firebase.firestore();
    try {
        const doc = await db.collection('usuarios').doc(user.uid).get();
        if (doc.exists && doc.data().campanha) {
            const data = doc.data().campanha;
            
            if (data.campaign_data) window.FitApp.safeSet('fitapp_campaign_data', data.campaign_data);
            if (data.campaign_count) window.FitApp.safeSet('fitapp_campaign_count', data.campaign_count);
            if (data.blacklist) window.FitApp.safeSet('fitapp_blacklist', data.blacklist);
            if (data.main_method) window.FitApp.safeSet('fitapp_main_method', data.main_method);
            if (data.profile) window.FitApp.safeSet('fitapp_profile', data.profile);
            if (data.level) window.FitApp.safeSet('fitapp_level', data.level);
            
            const elsProfile = document.getElementById('profileSelector');
            if (elsProfile && data.profile) elsProfile.value = data.profile;
            const elsMethod = document.getElementById('mainMethodSelector');
            if (elsMethod && data.main_method) elsMethod.value = data.main_method;
            const elsLevel = document.getElementById('levelSelector');
            if (elsLevel && data.level) elsLevel.value = data.level;
        }
    } catch (error) {
        console.warn("Aviso Tático: Falha ao resgatar campanha da nuvem.", error);
    }
}

export async function syncTacticalDictionary() {
    try {
        const db = firebase.firestore();
        const snapshot = await db.collection('dicionario').get();
        if (snapshot.empty) return; 

        if (typeof window.dictionaryData === 'undefined') return;

        let atualizados = 0, novos = 0;
        snapshot.forEach(doc => {
            const data = doc.data();
            const exerciseName = data.nome || data.name; 
            if (!exerciseName) return; 
            
            const newTip = data.dica || data.desc;
            const newGroup = data.grupo || data.group;
            const newFocus = data.foco || data.focus || 'Geral';
            const newEquip = data.equipamento || data.equip || 'Peso Corporal';
            const newNivel = parseInt(data.nivel) || 1;

            const existingIndex = window.dictionaryData.findIndex(item => item.name.toLowerCase() === exerciseName.toLowerCase());

            if (existingIndex !== -1) {
                if(newTip) window.dictionaryData[existingIndex].desc = newTip;
                if(newGroup) window.dictionaryData[existingIndex].group = newGroup;
                if(data.foco || data.focus) window.dictionaryData[existingIndex].focus = newFocus;
                if(data.equipamento || data.equip) window.dictionaryData[existingIndex].equip = newEquip;
                if(data.nivel) window.dictionaryData[existingIndex].nivel = newNivel;
                atualizados++;
            } else {
                window.dictionaryData.push({
                    name: exerciseName, group: newGroup || 'Geral', focus: newFocus, equip: newEquip, desc: newTip || 'Instrução pendente.', nivel: newNivel
                });
                novos++;
            }
        });
        console.log(`📡 Spotter Digital Sincronizado: ${atualizados} atualizados, ${novos} novos padrões.`);
        if (typeof window.FitApp.filterLibrary === 'function') window.FitApp.filterLibrary();
    } catch (error) {
        console.log("⚠️ Modo Offline: Utilizando dicionário de fábrica.");
    }
}