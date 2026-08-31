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

// 2. INICIALIZAÇÃO DO MOTOR E PROVEDORES
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

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

            // Adiciona a "Dog Tag" do atleta no pacote de dados antes de enviar
            payload.timestamp = firebase.firestore.FieldValue.serverTimestamp();
            payload.userId = user.uid; // Chave mestre que impede o cruzamento de dados
            payload.userName = user.displayName;
            payload.userEmail = user.email;
            
            const docRef = await db.collection("treinos_concluidos").add(payload);
            console.log("Treino assinado e cravado na nuvem. ID:", docRef.id);
            
            return { sucesso: true, id: docRef.id };
        } catch (error) {
            console.error("Erro no link com a base Firestore:", error);
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

    // 6. RESGATE DE MEMÓRIA (Amnésia Resolvida)
    async function carregarHistoricoNuvem() {
        try {
            const user = auth.currentUser;
            if (!user) return [];

            // Puxa todos os treinos daquele usuário específico
            const snapshot = await db.collection("treinos_concluidos")
                .where("userId", "==", user.uid)
                .get();

            let historico = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                historico.push({
                    date: data.date,
                    tipo: data.tipo,
                    method: data.method,
                    duration_secs: data.duration_secs,
                    data: data.data,
                    // Usa o timestamp para ordenar. Se for null (ainda gravando), usa Date.now
                    _ts: data.timestamp ? data.timestamp.toMillis() : Date.now() 
                });
            });

            // Ordena localmente do mais antigo para o mais novo (Evita erro de Índice no Firebase)
            historico.sort((a, b) => a._ts - b._ts);
            
            // Retorna limpando a variável temporária
            return historico.map(h => { delete h._ts; return h; });
        } catch (error) {
            console.error("Erro ao resgatar histórico da nuvem:", error);
            return [];
        }
    }

    return {
        salvarTreino,
        getCoachFeedback,
        importarTreinoIA,
        carregarHistoricoNuvem, // NOVO: Expõe a função de resgate
        loginComGoogle // Expõe a função para o botão do index.html
    };
})();