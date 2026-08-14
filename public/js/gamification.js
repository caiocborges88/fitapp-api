// static/js/gamification.js
'use strict';

var FitGamification = (() => {
    let currentAlbumPage = 1;

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

    // Tranca e salva as novas conquistas na nuvem
    async function savePlayerProfile(album, repetidas) {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            await firebase.firestore().collection('jogadores').doc(user.uid).set({
                album: album,
                repetidas: repetidas,
                nome: user.displayName,
                email: user.email,
                ultimoAcesso: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.error("Erro ao selar o cofre na nuvem:", error);
        }
    }
    // ----------------------------------------

    function showPackModal() { 
        document.getElementById('packEnvelope').style.display = 'flex'; 
        document.getElementById('packRevealArea').style.display = 'none'; 
        document.getElementById('btnClosePack').style.display = 'none'; 
        document.getElementById('packModal').style.display = 'flex'; 
    }
    
    async function openPack() {
        document.getElementById('packEnvelope').style.display = 'none'; 
        const revealArea = document.getElementById('packRevealArea'); 
        
        // Status visual de comunicação militar com a nuvem
        revealArea.innerHTML = '<div style="color: #a64dff; font-weight: bold; margin-top: 20px;">Sincronizando com a Base de Dados... 📡</div>'; 
        revealArea.style.display = 'flex';
        revealArea.style.flexDirection = 'column';
        
        const profile = await getPlayerProfile();
        let savedCollection = profile.album || [];
        let repetidas = profile.repetidas || 0; 
        
        const roll = Math.random(); 
        let targetRarity = 'comum';
        
        if (roll > 0.95) targetRarity = 'holografico'; 
        else if (roll > 0.85) targetRarity = 'ouro'; 
        else if (roll > 0.60) targetRarity = 'prata';

        let pool = stickersDB.filter(s => s.rarity === targetRarity);
        if (pool.length === 0) pool = stickersDB.filter(s => s.rarity === 'comum'); 

        let missingInPool = pool.filter(s => !savedCollection.includes(s.id));
        
        let drawn;
        let isRepeated = false;

        if ((targetRarity === 'ouro' || targetRarity === 'holografico') && missingInPool.length > 0) {
            drawn = missingInPool[Math.floor(Math.random() * missingInPool.length)];
        } else {
            drawn = pool[Math.floor(Math.random() * pool.length)];
        }
        
        if (!savedCollection.includes(drawn.id)) {
            savedCollection.push(drawn.id);
        } else {
            isRepeated = true;
            repetidas++;
        }
        
        // Grava o resultado permanentemente no Firestore (Resgate Concluído)
        await savePlayerProfile(savedCollection, repetidas);

        revealArea.innerHTML = ''; // Limpa o aviso de sincronização
        
        const div = document.createElement('div'); 
        div.className = `sticker-slot filled ${drawn.rarity}`; 
        div.innerHTML = `<div class="sticker-icon">${drawn.icon}</div><div>${drawn.name}</div>`; 
        revealArea.appendChild(div);
        
        if (isRepeated) {
            const repMsg = document.createElement('div');
            repMsg.style.color = '#ffaa00';
            repMsg.style.marginTop = '15px';
            repMsg.style.fontSize = '14px';
            repMsg.style.fontWeight = 'bold';
            repMsg.style.textAlign = 'center';
            repMsg.textContent = "⚠️ Conquista Repetida! (+1 Ponto de Suor)";
            revealArea.appendChild(repMsg);
        }
        
        // Motor de Compartilhamento Nativo (Efeito Strava) preservado
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn-action btn-start-pulse';
        shareBtn.style.marginTop = '25px';
        shareBtn.style.background = '#25D366'; 
        shareBtn.style.color = '#000';
        shareBtn.style.border = 'none';
        shareBtn.style.width = '100%';
        shareBtn.style.maxWidth = '300px';
        shareBtn.innerHTML = '📲 Compartilhar Vitória';
        
        shareBtn.onclick = async () => {
            const historyLog = JSON.parse(FitApp.safeGet('fitapp_week_log') || '[]');
            const lastLog = historyLog.length > 0 ? historyLog[historyLog.length - 1] : null;
            
            const duration = lastLog && lastLog.duration_secs ? Math.floor(lastLog.duration_secs / 60) : '--';
            const workoutType = lastLog ? lastLog.tipo : 'Customizado';
            
            const shareText = `🔥 Sobrevivi ao Treino ${workoutType} no FitApp!\n⏱️ Tempo de Combate: ${duration} min\n🏆 Recompensa: Carta ${drawn.name} (${drawn.rarity.toUpperCase()})\n🤖 O Spotter Digital calibrou minhas cargas.\n\nMonte seu esquadrão. Link na bio.`;
            
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

        document.getElementById('btnClosePack').style.display = 'block'; 
        if(window.FitApp) FitApp.speak(isRepeated ? "Conquista repetida detectada." : "Nova conquista revelada.");
    }

    async function renderAlbum() {
        const grid = document.getElementById('albumGrid'); 
        if (!grid) return;
        
        grid.style.display = 'block';
        grid.innerHTML = '<div style="color: #a64dff; text-align: center; padding: 20px; font-weight: bold;">Acessando Cofre de Elite... 📡</div>';
        
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
            btn.style.border = isActive ? '1px solid #a64dff' : '1px solid #444';
            btn.style.background = isActive ? 'rgba(166, 77, 255, 0.2)' : '#2a2a2a';
            btn.style.color = isActive ? '#a64dff' : '#aaa';
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
            <h4 style="color: #ffaa00; margin-bottom: 10px;">🔥 Forja de Conquistas</h4>
            <p style="font-size: 13px; color: #aaa; margin-bottom: 15px;">Pontos de Suor (Repetidas): <strong style="color: #fff; font-size: 16px;">${repetidas}</strong></p>
            <button id="btnForge" class="btn-action" style="background: ${repetidas >= 3 ? '#ffaa00' : '#444'}; color: ${repetidas >= 3 ? '#000' : '#888'}; pointer-events: ${repetidas >= 3 ? 'auto' : 'none'}; border: none; width: 100%;">Forjar Nova Peça (Custa 3)</button>
        `;
        grid.appendChild(forge);
        
        const btnForge = document.getElementById('btnForge');
        if (btnForge && repetidas >= 3) {
            btnForge.onclick = () => craftSticker();
        }
    }

    async function craftSticker() {
        if(window.FitApp) FitApp.showToast("Forjando conquista na nuvem...");
        
        const profile = await getPlayerProfile();
        let savedCollection = profile.album || [];
        let repetidas = profile.repetidas || 0; 
        
        if (repetidas < 3) return;
        
        const faltantesForja = stickersDB.filter(s => !savedCollection.includes(s.id) && (s.rarity === 'comum' || s.rarity === 'prata'));
        
        if (faltantesForja.length === 0) {
            if(window.FitApp) FitApp.showToast("Alerta: A Forja só fabrica Prata e Comum. Treine para achar as raras!");
            return;
        }
        
        const nova = faltantesForja[Math.floor(Math.random() * faltantesForja.length)];
        savedCollection.push(nova.id);
        repetidas -= 3;
        
        await savePlayerProfile(savedCollection, repetidas);
        
        renderAlbum();
        if(window.FitApp) FitApp.showToast(`Forja concluída: ${nova.name} desbloqueada!`);
        if(window.FitApp) FitApp.speak("Conquista forjada com sucesso.");
    }

    return {
        showPackModal,
        openPack,
        renderAlbum,
        craftSticker
    };
})();