'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const usersTable = document.getElementById('usersTableBody');
    
    // 1. Verificação de Crachá do Comandante
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            document.getElementById('adminStatus').innerHTML = `Comandante logado: <strong style="color:#00ff88;">${user.email || 'Admin'}</strong>`;
            executarVarreduraDeTropa();
        } else {
            document.getElementById('adminStatus').innerHTML = `<span style="color:#ff4444;">Acesso Negado. Faça login via App principal.</span>`;
            usersTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#ff4444; padding: 30px;">Acesso restrito. Faça login como instrutor no celular primeiro.</td></tr>`;
        }
    });

    // 2. Operação de Coleta de Inteligência
    async function executarVarreduraDeTropa() {
        try {
            // Vasculha a coleção de usuários (A mesma que grava os perfis de figurinhas)
            const snapshot = await db.collection('users').get();
            
            document.getElementById('totalUsers').innerText = snapshot.size;
            
            let html = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                
                // Mapeamento dos dados do banco
                const suor = data.repetidas || 0; // Pontos de Suor
                let lastSyncDate = 'Dados ausentes';
                let status = "INATIVO";
                let statusClass = "status-inactive";

                if (data.lastSync) {
                    const dataUltimoTreino = new Date(data.lastSync);
                    lastSyncDate = dataUltimoTreino.toLocaleDateString('pt-BR') + ' às ' + dataUltimoTreino.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
                    
                    // Inteligência: Calcula dias ociosos
                    const daysAgo = (Date.now() - dataUltimoTreino.getTime()) / (1000 * 3600 * 24);
                    
                    // Se o recruta treinou nos últimos 5 dias, ele está ATIVO. Se não, está INATIVO/AWOL.
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
            usersTable.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #ff4444;">Falha de comunicação com o Firestore. Verifique as Regras de Segurança do Banco de Dados.</td></tr>`;
        }
    }
});

// 3. Ação de Carga Pessoal (Será expandida na próxima etapa)
window.abrirDossie = function(uid) {
    alert(`Solicitando arquivos da inteligência...\nID do Recruta: ${uid}\n\n(Na próxima atualização, este botão abrirá os gráficos de progressão de carga e treinos realizados deste aluno!)`);
};