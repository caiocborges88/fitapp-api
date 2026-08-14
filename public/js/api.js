// static/js/api.js
'use strict';

// 1. CHAVES DE IGNIÇÃO DA NUVEM (Credenciais do Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyDaFhCNgg53Toaqhiz9LNAgqapBAMOqJUk",
    authDomain: "fitapp-operacional.firebaseapp.com",
    projectId: "fitapp-operacional",
    storageBucket: "fitapp-operacional.firebasestorage.app",
    messagingSenderId: "1068510399423",
    appId: "1:1068510399423:web:6edf28fca8bae113206f0a"
};

// 2. INICIALIZAÇÃO DO MOTOR
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

var FitAPI = (() => {
    const BASE_URL = '/api'; // Mantido para futuras implementações de IA

    // Interceptador global de respostas
    async function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    }

    // 3. NOVA ROTA DE SALVAMENTO DIRETO NO FIRESTORE
    async function salvarTreino(payload) {
        try {
            // Injeta o carimbo de tempo real do servidor do Google para evitar fraudes ou erros de fuso horário
            payload.timestamp = firebase.firestore.FieldValue.serverTimestamp();
            
            // Dispara o pacote de dados para a coleção 'treinos_concluidos' na nuvem
            const docRef = await db.collection("treinos_concluidos").add(payload);
            console.log("Treino cravado na nuvem. ID do Documento: ", docRef.id);
            
            return { sucesso: true, id: docRef.id };
        } catch (error) {
            console.error("Erro de comunicação com a base Firestore: ", error);
            throw new Error("Falha na conexão Cloud.");
        }
    }

    async function getCoachFeedback() {
        const response = await fetch(`${BASE_URL}/coach`);
        return handleResponse(response);
    }

    async function importarTreinoIA(megaPrompt) {
        const response = await fetch(`${BASE_URL}/importar-treino-ia`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: megaPrompt })
        });
        return handleResponse(response);
    }

    return {
        salvarTreino,
        getCoachFeedback,
        importarTreinoIA
    };
})();