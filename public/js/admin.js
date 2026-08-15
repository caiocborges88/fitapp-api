'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const usersTable = document.getElementById('usersTableBody');
    
    // 1. Verificação de Crachá do Comandante
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById('adminStatus').innerHTML = `Comandante logado: <strong style="color:#00ff88;">${user.email || 'Admin'}</strong>`;
            executarVarreduraDeTropa();
            carregarDicionario(); // NOVO: Manda baixar o Dicionário de Áudio
        } else {
            document.getElementById('adminStatus').innerHTML = `<span style="color:#ff4444;">Acesso Negado. Faça login via App principal.</span>`;
            usersTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#ff4444; padding: 30px;">Acesso restrito. Faça login como instrutor no celular primeiro.</td></tr>`;
        }
    });

    // 2. Operação de Coleta de Inteligência
    async function executarVarreduraDeTropa() {
        try {
            // CORREÇÃO: Apontando para a coleção "jogadores"
            const snapshot = await db.collection('jogadores').get();
            
            document.getElementById('totalUsers').innerText = snapshot.size;
            
            let html = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                
                // Mapeamento dos dados do banco
                const suor = data.repetidas || 0; // Pontos de Suor
                let lastSyncDate = 'Dados ausentes';
                let status = "INATIVO";
                let statusClass = "status-inactive";

                // CORREÇÃO: Lendo o campo "ultimoAcesso"
                if (data.ultimoAcesso) {
                    // Como o Firebase salva como Timestamp, usamos o .toDate()
                    const dataUltimoTreino = data.ultimoAcesso.toDate ? data.ultimoAcesso.toDate() : new Date(data.ultimoAcesso);
                    lastSyncDate = dataUltimoTreino.toLocaleDateString('pt-BR') + ' às ' + dataUltimoTreino.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
                    
                    // Inteligência: Calcula dias ociosos
                    const daysAgo = (Date.now() - dataUltimoTreino.getTime()) / (1000 * 3600 * 24);
                    
                    if (daysAgo <= 5) {
                        status = "ATIVO";
                        statusClass = "status-active";
                    }
                }

                // Renderiza a linha do soldado
                html += `
                    <tr>
                        <td>
                            <strong style="font-size: 15px;">${data.nome || doc.id}</strong><br>
                            <span style="color:#666; font-size:11px; font-family: monospace;">ID: ${doc.id.substring(0,8)}...</span>
                        </td>
                        <td><span style="color:#00ff88; font-weight:bold;">${suor}</span> pts</td>
                        <td style="color:#bbb; font-size:13px;">${lastSyncDate}</td>
                        <td><span class="${statusClass}">${status}</span></td>
                        <td>
                            <button class="btn-audit" onclick="abrirDossie('${doc.id}')">Ver Dossiê</button>
                        </td>
                    </tr>
                `;
            });
            
            usersTable.innerHTML = html || '<tr><td colspan="5" style="text-align: center; color: #888;">Base de dados vazia. Nenhum recruta alistado ainda.</td></tr>';
            
        } catch (error) {
            console.error("Erro tático ao puxar dados da tropa:", error);
            usersTable.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #ff4444;">Falha de comunicação com o Firestore.</td></tr>`;
        }
    }
}); 

// --- MOTOR GRÁFICO: Dossiê de Evolução ---
let chartInstance = null;
let currentUid = null;
let rawHistoryData = [];

window.abrirDossie = async function(uid) {
    currentUid = uid;
    document.getElementById('dossierModal').style.display = 'flex';
    document.getElementById('dossierStatus').innerText = "Baixando registros de combate da nuvem...";
    
    // Destrói o gráfico antigo ao abrir um novo aluno
    if (chartInstance) { chartInstance.destroy(); }
    
    try {
        const db = firebase.firestore();
        // CORREÇÃO: Apontando o radar para a subcoleção 'treinos_concluidos' dentro de 'jogadores'
        const snapshot = await db.collection('jogadores').doc(uid).collection('treinos_concluidos').get();
        
        rawHistoryData = [];
        snapshot.forEach(doc => {
            rawHistoryData.push(doc.data());
        });

        // Ordena os treinos pela data (do mais antigo para o mais novo)
        rawHistoryData.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        document.getElementById('dossierStatus').innerText = `${rawHistoryData.length} treinos analisados com sucesso.`;
        renderizarGrafico(); 

    } catch (error) {
        console.error("Falha na varredura do histórico:", error);
        document.getElementById('dossierStatus').innerHTML = `<span style="color:#ff4444;">Erro ao puxar histórico. Arquivos corrompidos ou inexistentes.</span>`;
    }
};

// Se o treinador trocar o exercício na caixa, o gráfico recalcula na hora
document.getElementById('exerciseSelect').addEventListener('change', renderizarGrafico);

function renderizarGrafico() {
    const targetExercise = document.getElementById('exerciseSelect').value;
    const labels = [];
    const dataPoints = [];
    
    // Mineração de Dados: Procura qual foi a maior carga levantada naquele exercício em cada dia
    rawHistoryData.forEach(session => {
        if (!session.log) return;
        
        let maxCarga = 0;
        let achouExercicio = false;
        
        session.log.forEach(set => {
            if (set.exercise && set.exercise.toLowerCase() === targetExercise.toLowerCase() && set.kg > maxCarga) {
                maxCarga = set.kg;
                achouExercicio = true;
            }
        });
        
        if (achouExercicio) {
            // Se o app salva como 'YYYY-MM-DD', transformamos para o padrão visual
            let dataFormatada = session.date;
            try {
                let d = new Date(session.date);
                dataFormatada = d.toLocaleDateString('pt-BR');
            } catch(e) {}
            
            labels.push(dataFormatada);
            dataPoints.push(maxCarga);
        }
    });
    
    if (labels.length === 0) {
        document.getElementById('dossierStatus').innerHTML = `<span style="color:#ffaa00;">Nenhum registro encontrado para <strong>${targetExercise}</strong>.</span>`;
        if (chartInstance) chartInstance.destroy();
        return;
    } else {
        document.getElementById('dossierStatus').innerText = `Evolução de ${targetExercise} mapeada.`;
    }

    const ctx = document.getElementById('progressionChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    
    // Renderização Tática (Neon Line Chart)
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Carga Máxima - ${targetExercise} (kg)`,
                data: dataPoints,
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#a64dff',
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.3 // Deixa a linha suave/curvada
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa' } },
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#aaa' } }
            },
            plugins: {
                legend: { labels: { color: '#fff', font: { size: 14 } } }
            }
        }
    });
}
// ==========================================
// 🛡️ MÓDULO B2B: DICIONÁRIO DE MOVIMENTOS
// ==========================================

async function carregarDicionario() {
    const db = firebase.firestore();
    const dictTable = document.getElementById('dictTableBody');
    
    try {
        const snapshot = await db.collection('dicionario').orderBy('nome').get();
        let html = '';
        
        snapshot.forEach(doc => {
            const data = doc.data();
            html += `
                <tr>
                    <td>
                        <strong style="color: #ffaa00; font-size: 14px;">${data.nome}</strong><br>
                        <span style="color: #666; font-size: 11px; text-transform: uppercase;">ALVO: ${data.grupo}</span>
                    </td>
                    <td style="font-size: 13px; color: #ccc; font-style: italic; max-width: 300px; line-height: 1.4;">"${data.dica}"</td>
                    <td style="text-align: center;">
                        <button onclick="deletarDicionario('${doc.id}')" style="background: transparent; border: 1px solid #ff4444; color: #ff4444; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">Excluir</button>
                    </td>
                </tr>
            `;
        });
        
        dictTable.innerHTML = html || '<tr><td colspan="3" style="text-align: center; color: #888; padding: 30px;">Dicionário vazio. O sistema está aguardando as suas diretrizes, Comandante.</td></tr>';
    } catch (error) {
        console.error("Erro ao carregar dicionário:", error);
        dictTable.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #ff4444; padding: 30px;">Falha ao comunicar com o servidor de dicionários.</td></tr>`;
    }
}

window.salvarDicionario = async function() {
    const nome = document.getElementById('dictName').value.trim();
    const grupo = document.getElementById('dictGroup').value.trim();
    const dica = document.getElementById('dictTip').value.trim();
    const status = document.getElementById('dictStatus');

    if (!nome || !dica) {
        status.innerHTML = '<span style="color: #ff4444;">Erro tático: O nome do exercício e a instrução são obrigatórios.</span>';
        return;
    }

    status.innerHTML = '<span style="color: #aaa;">Estabelecendo conexão uplink... 📡</span>';
    const db = firebase.firestore();

    try {
        // Cria um ID limpo para evitar duplicatas (Ex: "Supino Reto" vira "supino_reto")
        const docId = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
        
        await db.collection('dicionario').doc(docId).set({
            nome: nome,
            grupo: grupo || 'Base',
            dica: dica,
            atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

        status.innerHTML = '<span style="color: #00ff88;">✅ Padrão Biomecânico gravado com sucesso!</span>';
        
        // Limpa a ficha para um novo cadastro
        document.getElementById('dictName').value = '';
        document.getElementById('dictGroup').value = '';
        document.getElementById('dictTip').value = '';
        
        carregarDicionario(); // Recarrega a tabela na hora
        setTimeout(() => { status.innerHTML = ''; }, 4000);

    } catch (error) {
        console.error("Erro no uplink:", error);
        status.innerHTML = '<span style="color: #ff4444;">Erro de gravação no banco central.</span>';
    }
};

window.deletarDicionario = async function(docId) {
    if (confirm("ATENÇÃO: Deseja realmente remover essa instrução do servidor de IA? Os alunos pararão de ouvir esta dica imediatamente.")) {
        const db = firebase.firestore();
        try {
            await db.collection('dicionario').doc(docId).delete();
            carregarDicionario(); // Atualiza a tabela
        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Falha ao remover o registro tático.");
        }
    }
};