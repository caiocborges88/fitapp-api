import { FitAudio } from './audio.js';
import { escapeHTML } from './utils.js';
// static/js/gamification.js
'use strict';

var FitGamification = (() => {
    let currentAlbumPage = 1;
    let openingPack = false;
    let rewardSessionId = null;

    // --- 1. MOTORES DE NUVEM (CLOUD SYNC) ---
    // Busca o cofre criptografado do usuário ativo
    async function getPlayerProfile() {
        const user = firebase.auth().currentUser;
        if (!user) return { album: [], repetidas: 0 };
        
        try {
            const doc = await firebase.firestore().collection('jogadores').doc(user.uid).get();
            if (doc.exists) {
                return doc.data();
            } else {
                return { album: [], repetidas: 0 }; // Cofre novo/vazio
            }
        } catch (error) {
            console.error("Erro ao ler o cofre na nuvem:", error);
            return { album: [], repetidas: 0 }; 
        }
    }

    function showPackModal(snapActive = false, sessionId = null) {
        rewardSessionId = sessionId || JSON.parse(window.FitApp.safeGet('fitapp_week_log') || '[]').at(-1)?._id;
        
        const envelope = document.getElementById('packEnvelope');
        
        // Injeta o Design Premium da Caixa de Suprimentos via JS
        envelope.innerHTML = `
            <div style="z-index: 2; position: relative;">
                <div style="font-size: 55px; filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.8)); margin-bottom: 10px;">📦</div>
                <div style="font-size: 15px; text-transform: uppercase; letter-spacing: 2px; color: var(--ink); font-weight: 900;">Drop Tático</div>
                <div style="font-size: 10px; color: var(--accent); margin-top: 15px; letter-spacing: 3px; animation: pulse 1s infinite;">TOCAR PARA ABRIR</div>
            </div>
        `;
        
        envelope.style.display = 'flex'; 
        document.getElementById('packRevealArea').style.display = 'none'; 
        document.getElementById('btnClosePack').style.display = 'none'; 
        document.getElementById('packModal').style.display = 'flex'; 
    }
    
    async function openPack() {
        if (openingPack) return;
        openingPack = true;
        try {
        FitAudio.packRip(); // Som do pacote abrindo
        const envelope = document.getElementById('packEnvelope');
        const revealArea = document.getElementById('packRevealArea'); 
        
        // 💥 EFEITO FLASH DE EXPLOSÃO (Imersão 100%)
        const flash = document.createElement('div');
        flash.style.position = 'fixed'; flash.style.top = '0'; flash.style.left = '0'; flash.style.width = '100%'; flash.style.height = '100%';
        flash.style.background = 'var(--ink)'; flash.style.zIndex = '3000'; flash.style.transition = 'opacity 0.8s ease-out'; flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);
        
        setTimeout(() => { flash.style.opacity = '0'; }, 50);
        setTimeout(() => { flash.remove(); }, 850);

        envelope.style.display = 'none'; 
        
        // Status visual de comunicação militar
        revealArea.innerHTML = '<div style="color: var(--accent); font-weight: bold; margin-top: 20px; font-family: monospace; letter-spacing: 1px;">Descriptografando... 📡</div>';
        revealArea.style.display = 'flex';
        
        await window.FitApp.syncOfflineWorkouts();
        const result = await FitAPI.solicitarRecompensa(rewardSessionId);
        const { drawn, isRepeated } = result;
        revealArea.innerHTML = ''; // Limpa o aviso de sincronização
        
        const div = document.createElement('div'); 
        div.className = `sticker-slot filled ${drawn.rarity}`; 
        div.innerHTML = `<div class="sticker-icon">${drawn.icon}</div><div style="font-size: 13px; font-weight: 800; text-transform: uppercase;">${drawn.name}</div>`; 
        revealArea.appendChild(div);
        
        if (isRepeated) {
            FitAudio.repeated(); 
            const repMsg = document.createElement('div');
            repMsg.style.color = 'var(--warning)';
            repMsg.style.marginTop = '45px'; 
            repMsg.style.fontSize = '14px';
            repMsg.style.fontWeight = 'bold';
            repMsg.style.textAlign = 'center';
            repMsg.style.animation = 'popInDelayed 0.5s forwards';
            repMsg.style.animationDelay = '1s';
            repMsg.style.opacity = '0';
            repMsg.textContent = "⚠️ Conquista Repetida! (+1 Ponto de Suor)";
            revealArea.appendChild(repMsg);
        } else {
            if (drawn.rarity === 'ouro' || drawn.rarity === 'holografico') {
                FitAudio.revealEpic(); 
            } else {
                FitAudio.revealNormal(); 
            }
        }
        
        // Motor de Compartilhamento Nativo
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn-action btn-start-pulse';
        shareBtn.style.marginTop = isRepeated ? '15px' : '50px'; 
        shareBtn.style.background = 'var(--accent)';
        shareBtn.style.color = 'var(--on-accent)';
        shareBtn.style.border = 'none';
        shareBtn.style.width = '100%';
        shareBtn.style.maxWidth = '300px';
        shareBtn.style.animation = 'popInDelayed 0.5s forwards';
        shareBtn.style.animationDelay = '1.2s';
        shareBtn.style.opacity = '0';
        shareBtn.innerHTML = '📲 Compartilhar Vitória';
        
        shareBtn.onclick = async () => {
            const historyLog = JSON.parse(FitApp.safeGet('fitapp_week_log') || '[]');
            const lastLog = historyLog.length > 0 ? historyLog[historyLog.length - 1] : null;
            
            const duration = lastLog && lastLog.duration_secs ? Math.floor(lastLog.duration_secs / 60) : '--';
            const workoutType = lastLog ? lastLog.tipo : 'Customizado';
            
            const shareText = `Registrei mais um treino no FitApp.\nDuração: ${duration} min.\nCarta da coleção: ${drawn.name} (${drawn.rarity}).`;
            
            if (navigator.share) {
                try {
                    await navigator.share({ title: 'Vitória no FitApp', text: shareText });
                } catch (err) {
                    console.log('Compartilhamento minimizado.');
                }
            } else {
                navigator.clipboard.writeText(shareText);
                FitApp.showToast('Relatório copiado para a área de transferência!');
            }
        };
        
        revealArea.appendChild(shareBtn);

        const btnClose = document.getElementById('btnClosePack');
        btnClose.style.display = 'block'; 
        btnClose.style.animation = 'popInDelayed 0.5s forwards';
        btnClose.style.animationDelay = '1.5s';
        btnClose.style.opacity = '0';

        if(window.FitApp) FitApp.speak(isRepeated ? "Conquista repetida detectada." : "Nova conquista revelada.");
        } catch (error) {
            window.FitApp.showToast(error.message || 'Recompensa pendente. Tente novamente quando estiver online.');
            document.getElementById('packEnvelope').style.display = 'flex';
            document.getElementById('packRevealArea').style.display = 'none';
            document.getElementById('btnClosePack').style.display = 'block';
        } finally { openingPack = false; }
    }

    async function renderAlbum() {
        const grid = document.getElementById('albumGrid'); 
        if (!grid) return;
        
        grid.style.display = 'block';
        grid.innerHTML = '<div style="color: var(--secondary); text-align: center; padding: 20px; font-weight: bold;">Acessando Cofre de Elite... 📡</div>';
        
        const profile = await getPlayerProfile();
        let savedCollection = profile.album || [];
        let repetidas = profile.repetidas || 0; 
        
        grid.innerHTML = ''; // Limpa aviso de carregamento
        
        const progressEl = document.getElementById('albumProgress');
        if (progressEl) progressEl.textContent = `${savedCollection.length} / ${stickersDB.length} Conquistas`;

        const pages = [...new Set(stickersDB.map(s => s.page))].sort((a,b) => a - b);
        const pageNames = ["Seleção Base", "Campo de Batalha", "Titãs do Movimento", "Escudos de Elite"];
        
        const navContainer = document.createElement('div');
        navContainer.style.display = 'flex';
        navContainer.style.gap = '10px';
        navContainer.style.overflowX = 'auto';
        navContainer.style.marginBottom = '20px';
        navContainer.style.paddingBottom = '5px';
        navContainer.style.scrollbarWidth = 'none'; 

        pages.forEach(pageNum => {
            const btn = document.createElement('button');
            const isActive = pageNum === currentAlbumPage;
            
            btn.textContent = `Página ${pageNum}`;
            btn.style.padding = '8px 16px';
            btn.style.borderRadius = '20px';
            btn.style.border = isActive ? '1px solid var(--secondary)' : '1px solid var(--line)';
            btn.style.background = isActive ? 'var(--secondary-soft)' : 'var(--surface-soft)';
            btn.style.color = isActive ? 'var(--secondary)' : 'var(--muted)';
            btn.style.cursor = 'pointer';
            btn.style.whiteSpace = 'nowrap';
            btn.style.fontWeight = isActive ? 'bold' : 'normal';
            btn.style.transition = 'all 0.2s';
            
            btn.onclick = () => {
                currentAlbumPage = pageNum;
                renderAlbum(); 
            };
            navContainer.appendChild(btn);
        });
        grid.appendChild(navContainer);

        const title = document.createElement('div');
        title.className = 'album-page-title';
        title.style.textAlign = 'center';
        title.style.borderBottom = 'none';
        title.textContent = pageNames[currentAlbumPage-1] || 'Expansão';
        grid.appendChild(title);

        const pageGrid = document.createElement('div');
        pageGrid.style.display = 'grid';
        pageGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        pageGrid.style.gap = '15px';
        pageGrid.style.justifyItems = 'center';
        pageGrid.style.marginBottom = '30px';
        
        const pageStickers = stickersDB.filter(s => s.page === currentAlbumPage);
        
        pageStickers.forEach(sticker => {
            const div = document.createElement('div');
            if (savedCollection.includes(sticker.id)) { 
                div.className = `sticker-slot filled ${sticker.rarity}`; 
                div.innerHTML = `<div class="sticker-icon">${sticker.icon}</div><div>${sticker.name}</div>`; 
            } else { 
                div.className = 'sticker-slot missing'; 
                div.innerHTML = `<div class="sticker-icon">${sticker.icon}</div><div style="font-size: 11px; margin-top: 5px;">?</div>`; 
            }
            pageGrid.appendChild(div);
        });
        
        grid.appendChild(pageGrid);
        
        const forge = document.createElement('div');
        forge.className = 'forge-panel';
        forge.innerHTML = `
            <h4 style="color: var(--warning); margin-bottom: 10px;">🔥 Forja de Conquistas</h4>
            <p style="font-size: 13px; color: var(--muted); margin-bottom: 15px;">Pontos de Suor (Repetidas): <strong style="color: var(--ink); font-size: 16px;">${repetidas}</strong></p>
            <button id="btnForge" class="btn-action" style="background: ${repetidas >= 3 ? 'var(--warning)' : 'var(--line)'}; color: ${repetidas >= 3 ? 'var(--on-accent)' : 'var(--subtle)'}; pointer-events: ${repetidas >= 3 ? 'auto' : 'none'}; border: none; width: 100%;">Forjar Nova Peça (Custa 3)</button>
        `;
        grid.appendChild(forge);
        
        const btnForge = document.getElementById('btnForge');
        if (btnForge && repetidas >= 3) {
            btnForge.onclick = () => craftSticker();
        }
    }

    async function craftSticker() {
        const button = document.getElementById('btnForge');
        if (button?.disabled) return;
        if (button) button.disabled = true;
        try {
            const result = await FitAPI.solicitarRecompensa(null, 'craft');
            FitAudio.forge();
            await renderAlbum();
            window.FitApp.showToast(`Peça fabricada: ${result.drawn.name}`);
        } catch (error) { window.FitApp.showToast(error.message); }
        finally { if (button) button.disabled = false; }
    }

// --- NOVO: ARENA PVP (Cálculo do Poder de Combate e Radar Cloud) ---
    async function loadLeaderboard() {
        const container = document.getElementById('leaderboardContainer');
        if (!container) return;

        // Efeito de escaneamento militar
        container.innerHTML = '<div style="text-align: center; color: var(--warning); padding: 20px; font-weight: bold; font-family: monospace;">Escaneando Base de Dados... 📡</div>';

        try {
            // ESCUDO FINANCEIRO: Baixa apenas os 50 melhores, já ordenados pelo banco
            const snapshot = await firebase.firestore().collection('rankings')
                .orderBy('poder_combate', 'desc')
                .limit(50)
                .get();
                
            let players = [];

            snapshot.forEach(doc => {
                const data = doc.data();
                const albumLength = Number(data.cartas) || 0;
                const repetidas = data.repetidas || 0;
                const nome = data.nome || 'Atleta Anônimo';
                const combatPower = data.poder_combate || 0;

                players.push({
                    uid: doc.id,
                    nome: nome,
                    poder: combatPower,
                    cartas: albumLength,
                    suor: repetidas
                });
            });
            
            container.innerHTML = ''; // Limpa o radar

            if (players.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: var(--subtle); padding: 20px;">Nenhum atleta na base de dados.</div>';
                return;
            }

            const currentUser = firebase.auth().currentUser;
            const currentUid = currentUser ? currentUser.uid : null;

            players.forEach((player, index) => {
                const isMe = player.uid === currentUid;
                const position = index + 1;
                
                // Design das Medalhas do Top 3
                let rankVisual = `<span style="font-size: 18px; font-weight: bold; color: var(--subtle); width: 30px; text-align: center;">${position}º</span>`;
                if (position === 1) rankVisual = `<span style="font-size: 24px; text-shadow: 0 0 10px var(--warning); width: 30px; text-align: center;">🥇</span>`;
                if (position === 2) rankVisual = `<span style="font-size: 24px; text-shadow: 0 0 10px #c0c0c0; width: 30px; text-align: center;">🥈</span>`;
                if (position === 3) rankVisual = `<span style="font-size: 24px; text-shadow: 0 0 10px #cd7f32; width: 30px; text-align: center;">🥉</span>`;

                const block = document.createElement('div');
                block.style.display = 'flex';
                block.style.alignItems = 'center';
                block.style.justifyContent = 'space-between';
                block.style.padding = '15px';
                block.style.borderRadius = '8px';
                block.style.background = isMe ? 'rgba(255, 170, 0, 0.1)' : 'var(--surface)';
                block.style.border = isMe ? '1px solid var(--warning)' : '1px solid var(--line)';
                block.style.boxShadow = isMe ? '0 0 15px rgba(255, 170, 0, 0.2)' : 'none';

                block.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        ${rankVisual}
                        <div>
                            <div style="font-weight: bold; color: ${isMe ? 'var(--warning)' : 'var(--ink)'}; font-size: 15px;">${escapeHTML(player.nome)} ${isMe ? '(Você)' : ''}</div>
                            <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">
                                <span style="background: var(--surface); padding: 2px 6px; border-radius: 4px;">🏆 ${player.cartas}/24</span>
                                <span style="background: var(--surface); padding: 2px 6px; border-radius: 4px; margin-left: 5px;">💧 ${player.suor} pts</span>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 20px; font-weight: bold; color: var(--warning); font-family: monospace;">${player.poder}</div>
                        <div style="font-size: 10px; color: var(--subtle); text-transform: uppercase;">Poder</div>
                    </div>
                `;
                container.appendChild(block);
            });

        } catch (error) {
            console.error("Falha no radar da Arena:", error);
            container.innerHTML = '<div style="color: var(--danger); text-align: center; padding: 20px;">Falha ao conectar com o servidor da Arena.</div>';
        }
    }

    return {
        showPackModal,
        openPack,
        renderAlbum,
        craftSticker,
        loadLeaderboard
    };
})();
window.FitGamification = FitGamification;
