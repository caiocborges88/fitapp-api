'use strict';

const FitGamification = (() => {
    let currentAlbumPage = 1;

    function showPackModal() { 
        document.getElementById('packEnvelope').style.display = 'flex'; 
        document.getElementById('packRevealArea').style.display = 'none'; 
        document.getElementById('btnClosePack').style.display = 'none'; 
        document.getElementById('packModal').style.display = 'flex'; 
    }
    
    function openPack() {
        document.getElementById('packEnvelope').style.display = 'none'; 
        const revealArea = document.getElementById('packRevealArea'); 
        revealArea.innerHTML = ''; 
        revealArea.style.display = 'flex';
        revealArea.style.flexDirection = 'column';
        
        let savedCollection = JSON.parse(FitApp.safeGet('fitapp_album') || '[]');
        let repetidas = parseInt(FitApp.safeGet('fitapp_repetidas') || '0') || 0; 
        
        const roll = Math.random(); 
        let pool = stickersDB.filter(s => s.rarity === 'comum');
        
        if (roll > 0.95) pool = stickersDB.filter(s => s.rarity === 'holografico'); 
        else if (roll > 0.80) pool = stickersDB.filter(s => s.rarity === 'ouro'); 
        else if (roll > 0.50) pool = stickersDB.filter(s => s.rarity === 'prata');
        
        if (pool.length === 0) pool = stickersDB.filter(s => s.rarity === 'comum'); 
        
        const drawn = pool[Math.floor(Math.random() * pool.length)];
        let isRepeated = false;
        
        if (!savedCollection.includes(drawn.id)) {
            savedCollection.push(drawn.id);
        } else {
            isRepeated = true;
            repetidas++;
        }
        
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
        
        FitApp.safeSet('fitapp_album', JSON.stringify(savedCollection));
        FitApp.safeSet('fitapp_repetidas', repetidas.toString());
        
        document.getElementById('btnClosePack').style.display = 'block'; 
        FitApp.speak(isRepeated ? "Conquista repetida detectada." : "Nova conquista revelada.");
    }

    function renderAlbum() {
        const grid = document.getElementById('albumGrid'); 
        if (!grid) return;
        
        grid.style.display = 'block';
        grid.innerHTML = '';
        
        let savedCollection = JSON.parse(FitApp.safeGet('fitapp_album') || '[]');
        let repetidas = parseInt(FitApp.safeGet('fitapp_repetidas') || '0') || 0; 
        
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

    function craftSticker() {
        let savedCollection = JSON.parse(FitApp.safeGet('fitapp_album') || '[]');
        let repetidas = parseInt(FitApp.safeGet('fitapp_repetidas') || '0') || 0; 
        
        if (repetidas < 3) return;
        
        const faltantes = stickersDB.filter(s => !savedCollection.includes(s.id));
        if (faltantes.length === 0) {
            FitApp.showToast("Sua galeria já está completa!");
            return;
        }
        
        const nova = faltantes[Math.floor(Math.random() * faltantes.length)];
        savedCollection.push(nova.id);
        repetidas -= 3;
        
        FitApp.safeSet('fitapp_album', JSON.stringify(savedCollection));
        FitApp.safeSet('fitapp_repetidas', repetidas.toString());
        
        renderAlbum();
        FitApp.showToast(`Forja concluída: ${nova.name} desbloqueada!`);
        FitApp.speak("Conquista forjada com sucesso.");
    }

    return {
        showPackModal,
        openPack,
        renderAlbum,
        craftSticker
    };
})();