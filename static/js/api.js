// static/js/api.js
'use strict';

const FitAPI = (() => {
    const BASE_URL = '/api';

    // Interceptador global de respostas
    async function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    }

    async function salvarTreino(payload) {
        const response = await fetch(`${BASE_URL}/salvar-treino`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return handleResponse(response);
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