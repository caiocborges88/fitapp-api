'use strict';

const FitApp = (() => {
    let totalSets = 0, checkedSets = 0, audioEnabled = false, restTimer = null, currentRestTime = 60;
    let todayLog = [];
    let currentRoutine = []; 
    let currentWorkoutType = ''; 
    
    // Novas variáveis do Relógio Global
    let globalTimer = null;
    let workoutStartTime = null; 
    const els = {};

    const safeSet = (k, v) => { try { localStorage.setItem(k, v); return true; } catch(e) { return false; } };
    const safeGet = (k) => { try { return localStorage.getItem(k); } catch(e) { return null; } };

    function showToast(msg) { els.toast.textContent = msg; els.toast.classList.add('show'); setTimeout(() => els.toast.classList.remove('show'), 3000); }
    function speak(text) { if (!audioEnabled || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'pt-BR'; utterance.rate = 1.1; window.speechSynthesis.speak(utterance); }
    function toggleAudio() { audioEnabled = !audioEnabled; const btn = document.getElementById('btnAudio'); if (audioEnabled) { btn.classList.add('active'); btn.innerHTML = '🔊 <span>Áudio On</span>'; speak("Assistente ativado."); } else { btn.classList.remove('active'); btn.innerHTML = '🔈 <span>Áudio Off</span>'; window.speechSynthesis.cancel(); } }

    function startRestTimer() {
        const containerEl = document.getElementById('timerContainer'), displayEl = document.getElementById('timerDisplay');
        containerEl.style.display = 'block'; clearInterval(restTimer); let timeLeft = currentRestTime;
        speak(`Descanso. ${timeLeft} segundos.`);
        
        const updateUI = () => { let m = Math.floor(timeLeft/60).toString().padStart(2,'0'), s = (timeLeft%60).toString().padStart(2,'0'); displayEl.textContent = `${m}:${s}`; };
        updateUI();

        restTimer = setInterval(() => {
            timeLeft--; updateUI();
            if (timeLeft === 10) speak("Dez segundos.");
            if (timeLeft <= 0) { clearInterval(restTimer); containerEl.style.display = 'none'; speak("Fim do descanso."); }
        }, 1000);
    }
    function stopRestTimer() { clearInterval(restTimer); document.getElementById('timerContainer').style.display = 'none'; }

    function getMuscleGroup(focus) {
        const f = (focus || "").toLowerCase();
        if (f.includes("peit")) return "peito";
        if (f.includes("tríceps") || f.includes("triceps")) return "triceps";
        if (f.includes("cost") || f.includes("dorsal") || f.includes("lombar")) return "costas";
        if (f.includes("bíc") || f.includes("bic") || f.includes("antebraço")) return "biceps";
        if (f.includes("ombro") || f.includes("delt") || f.includes("trapézio")) return "ombros";
        if (f.includes("pern") || f.includes("quadr") || f.includes("post") || f.includes("glút") || f.includes("adut") || f.includes("abdut") || f.includes("pant")) return "pernas";
        if (f.includes("core") || f.includes("oblíq") || f.includes("abd")) return "core";
        return "outros";
    }

    function openSwapModal(bIndex, eIndex) {
        const ex = currentRoutine[bIndex].exercises[eIndex];
        const currentName = ex.name;
        const currentDict = dictionaryData.find(d => d.name === currentName);
        const currentGroup = getMuscleGroup(currentDict ? currentDict.focus : "");
        const pool = dictionaryData.filter(d => getMuscleGroup(d.focus) === currentGroup && d.name !== currentName);

        const style = els.styleSelector ? els.styleSelector.value : 'biset';
        const level = els.levelSelector ? els.levelSelector.value : 'intermediario';
        const type = currentWorkoutType;
        const originalName = dbWorkouts[style][level][type][bIndex].exercises[eIndex].name;

        let modal = document.getElementById('swapModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'swapModal';
            modal.className = 'swap-modal-overlay';
            document.body.appendChild(modal);
        }

        let html = `
            <div class="swap-modal-content">
                <div class="swap-modal-header">
                    <h3>Trocar: ${currentName}</h3>
                    <button class="btn-close-modal" onclick="document.getElementById('swapModal').style.display='none'">&times;</button>
                </div>
                <div class="swap-list">
        `;

        if (currentName !== originalName) {
            html += `
                <div class="swap-item" style="border-left: 4px solid #ffaa00; background: rgba(255, 170, 0, 0.1);" onclick="FitApp.confirmSwap(${bIndex}, ${eIndex}, '${originalName}')">
                    <div class="swap-item-name">↩️ Restaurar Original</div>
                    <div class="swap-item-focus">${originalName}</div>
                </div>
            `;
        }

        html += `<p style="color: #bbb; font-size: 13px; margin: 15px 0 10px 0;">Sugestões compatíveis com este músculo:</p>`;

        if (pool.length === 0) {
            html += `<div style="color: #ff4444; text-align: center; padding: 20px;">Nenhuma variação cadastrada para este músculo.</div>`;
        } else {
            pool.forEach(item => {
                html += `
                    <div class="swap-item" onclick="FitApp.confirmSwap(${bIndex}, ${eIndex}, '${item.name}')">
                        <div class="swap-item-name">${item.name}</div>
                        <div class="swap-item-focus">${item.focus}</div>
                    </div>
                `;
            });
        }
        
        html += `
                </div>
                <button onclick="document.getElementById('swapModal').style.display='none'" style="width: 100%; padding: 12px; margin-top: 15px; background: #333; color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Cancelar</button>
            </div>
        `;
        
        modal.innerHTML = html;
        modal.style.display = 'flex';
    }

    function confirmSwap(bIndex, eIndex, newName) {
        currentRoutine[bIndex].exercises[eIndex].name = newName;
        document.getElementById('swapModal').style.display = 'none';
        renderCurrentRoutine(); 
        if(audioEnabled) speak("Exercício atualizado.");
    }

    function checkSequence() {
        let history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        let total = history.length;
        let lastType = total > 0 ? history[total - 1].tipo : null;

        const statTotal = document.getElementById('statTotal');
        const statLast = document.getElementById('statLast');
        if(statTotal) statTotal.textContent = total;
        if(statLast) statLast.textContent = lastType ? 'Treino ' + lastType : 'Nenhum';

        ['A', 'B', 'C'].forEach(t => {
            const card = document.getElementById('card-' + t);
            if(card) card.classList.add('locked');
        });

        let nextType = 'A'; 
        if (lastType === 'A') nextType = 'B';
        if (lastType === 'B') nextType = 'C';
        if (lastType === 'C') nextType = 'A';

        const nextCard = document.getElementById('card-' + nextType);
        if (nextCard) nextCard.classList.remove('locked');
    }

    function unlockAll() {
        ['A', 'B', 'C'].forEach(t => {
            const card = document.getElementById('card-' + t);
            if(card) card.classList.remove('locked');
        });
        showToast("Travas manuais liberadas.");
    }

    function startWorkout(type) {
        const card = document.getElementById('card-' + type);
        if (card && card.classList.contains('locked')) {
            showToast("Sequência bloqueada. Conclua o treino anterior.");
            return;
        }
        currentWorkoutType = type;
        loadWorkout();
    }

    function updateGlobalTimer() {
        if (!workoutStartTime) return;
        const now = Date.now();
        const diffInSeconds = Math.floor((now - workoutStartTime) / 1000);
        const h = Math.floor(diffInSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((diffInSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (diffInSeconds % 60).toString().padStart(2, '0');
        const display = document.getElementById('globalTimerDisplay');
        if (display) display.textContent = `${h}:${m}:${s}`;
    }

    function loadWorkout() {
        const style = els.styleSelector ? els.styleSelector.value : 'biset';
        const level = els.levelSelector ? els.levelSelector.value : 'intermediario';
        const type = currentWorkoutType;
        if (!type) return;

        // Oculta Dashboard principal
        document.getElementById('workoutCards').style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'none';
        
        // Exibe a nova Sala de Preparação (Preview)
        const preview = document.getElementById('workoutPreview');
        if (preview) {
            document.getElementById('previewTitle').textContent = `Treino ${type}`;
            const styleName = style === 'biset' ? 'Modo Bi-set' : 'Modo Tradicional';
            document.getElementById('previewDesc').textContent = `${styleName} - Nível ${level.charAt(0).toUpperCase() + level.slice(1)}`;
            preview.style.display = 'block';
        }
    }

    function cancelWorkoutPreview() {
        document.getElementById('workoutPreview').style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';
        currentWorkoutType = '';
    }

    function beginWorkoutExecution() {
        const style = els.styleSelector ? els.styleSelector.value : 'biset';
        const level = els.levelSelector ? els.levelSelector.value : 'intermediario';
        const type = currentWorkoutType;

        // Oculta Preparação, Mostra Área de Ação
        document.getElementById('workoutPreview').style.display = 'none';
        els.workoutArea.style.display = 'block'; 
        els.btnFinishArea.style.display = 'block';

        // Trava a hora inicial e liga o cronômetro
        workoutStartTime = Date.now();
        if (globalTimer) clearInterval(globalTimer);
        globalTimer = setInterval(updateGlobalTimer, 1000);
        updateGlobalTimer(); // Força renderização imediata de 00:00:00

        currentRoutine = JSON.parse(JSON.stringify(dbWorkouts[style][level][type] || dbWorkouts['biset']['intermediario']['A']));
        renderCurrentRoutine();
    }

    function renderCurrentRoutine() {
        els.exerciseList.innerHTML = ''; totalSets = 0; checkedSets = 0; todayLog = [];
        
        currentRoutine.forEach((bloco, bIndex) => {
            const isBiset = bloco.exercises.length > 1;
            const cardClass = isBiset ? 'biset-card' : 'tradicional-card'; 
            
            const card = document.createElement('div'); card.className = cardClass; 
            if (!isBiset) card.style.borderLeft = '4px solid #44aaff'; 
            
            card.innerHTML = `<div class="biset-title">${bloco.title}</div>`;
            
            bloco.exercises.forEach((ex, eIndex) => {
                const blockDiv = document.createElement('div'); blockDiv.className = 'exercise-block';
                const linkIcon = (isBiset && eIndex < bloco.exercises.length - 1) ? ' <span style="color:#00ff88;">🔗</span>' : '';
                
                blockDiv.innerHTML = `
                    <div class="exercise-header">
                        <span class="ex-name" onclick="FitApp.openDict('${ex.name}')">${ex.name}${linkIcon}</span>
                        <div class="ex-controls">
                            <span class="target-reps">${ex.target}</span>
                            <button class="btn-swap" onclick="FitApp.openSwapModal(${bIndex}, ${eIndex})" title="Substituir Exercício">🔄</button>
                        </div>
                    </div>`;
                
                for(let s = 1; s <= ex.sets; s++) {
                    totalSets++; const row = document.createElement('div'); row.className = 'set-row';
                    row.innerHTML = `<div class="set-label">S${s}</div><input type="number" class="kg-val" placeholder="Kg"><input type="number" class="rp-val" placeholder="Reps"><input type="checkbox" class="chk-set">`;
                    
                    const chk = row.querySelector('.chk-set');
                    chk.addEventListener('change', () => {
                        if (chk.checked) { 
                            checkedSets++; 
                            if(checkedSets < totalSets) startRestTimer();
                            todayLog.push({ exercise: ex.name, set: s, kg: row.querySelector('.kg-val').value || 0, reps: row.querySelector('.rp-val').value || 0 });
                        } else { checkedSets--; stopRestTimer(); }
                        updateProgress();
                    });
                    blockDiv.appendChild(row);
                }
                card.appendChild(blockDiv);
            });
            els.exerciseList.appendChild(card);
        });
        updateProgress();
    }

    function updateProgress() {
        const pct = totalSets === 0 ? 0 : Math.round((checkedSets / totalSets) * 100);
        els.progressBar.style.width = pct + '%';
        const btn = document.getElementById('btnFinishAction');
        if(pct === 100) { btn.className = 'btn-action btn-success'; btn.textContent = '🏆 Concluir Treino'; stopRestTimer(); speak("Treino finalizado."); } 
        else { btn.className = 'btn-action btn-warning'; btn.textContent = '⚠️ Encerrar Incompleto'; }
    }

    async function finishWorkout() {
        const isComplete = checkedSets === totalSets;
        const tipoTreino = currentWorkoutType; 
        const dataHoje = new Date().toISOString().split('T')[0];
        
        // Pára o relógio e calcula a duração total em segundos
        let totalTimeSecs = 0;
        if (workoutStartTime) {
            totalTimeSecs = Math.floor((Date.now() - workoutStartTime) / 1000);
            clearInterval(globalTimer);
            workoutStartTime = null;
        }

        // Injeta a duração no pacote de dados para o AI Coach
        const payload = { date: dataHoje, tipo: tipoTreino, duration_secs: totalTimeSecs, data: todayLog };

        try {
            document.getElementById('btnFinishAction').textContent = "⏳ Salvando...";
            const response = await fetch('/api/salvar-treino', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) console.error("Erro ao salvar no servidor Python.");
        } catch (error) { showToast("Modo offline: Servidor não encontrado."); }

        let weekLog = JSON.parse(safeGet('fitapp_week_log') || '[]');
        weekLog.push(payload);
        safeSet('fitapp_week_log', JSON.stringify(weekLog));

        els.workoutArea.style.display = 'none'; 
        els.btnFinishArea.style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';

        currentWorkoutType = '';
        checkSequence(); 

        if(isComplete) { showPackModal(); } else { showToast('Treino salvo no sistema.'); switchTab('tab-calendario', 'nav-calendario'); }
    }

    async function fetchAIFeedback() {
        document.getElementById('aiLoader').style.display = 'block';
        document.getElementById('aiResponse').style.display = 'none';
        document.getElementById('btnAnalyzeAI').disabled = true;

        try {
            const response = await fetch('/api/coach');
            if (!response.ok) throw new Error("Erro no servidor local");
            const data = await response.json();
            
            document.getElementById('aiResponse').innerHTML = `<strong>Feedback do Coach:</strong><br>${data.feedback}`;
            document.getElementById('aiResponse').style.display = 'block';
            if(audioEnabled) speak("Análise concluída.");
        } catch (error) { showToast("Erro ao contatar o servidor."); } 
        finally { document.getElementById('aiLoader').style.display = 'none'; document.getElementById('btnAnalyzeAI').disabled = false; }
    }

    function showPackModal() { document.getElementById('packEnvelope').style.display = 'flex'; document.getElementById('packRevealArea').style.display = 'none'; document.getElementById('btnClosePack').style.display = 'none'; document.getElementById('packModal').style.display = 'flex'; }
    
    function openPack() {
        document.getElementById('packEnvelope').style.display = 'none'; const revealArea = document.getElementById('packRevealArea'); revealArea.innerHTML = ''; revealArea.style.display = 'flex';
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        
        for(let i=0; i<2; i++) {
            const roll = Math.random(); let pool = stickersDB.filter(s => s.rarity === 'comum');
            if(roll > 0.90) pool = stickersDB.filter(s => s.rarity === 'brilhante'); else if(roll > 0.60) pool = stickersDB.filter(s => s.rarity === 'prata');
            const drawn = pool[Math.floor(Math.random() * pool.length)];
            if(!savedCollection.includes(drawn.id)) savedCollection.push(drawn.id);
            const div = document.createElement('div'); div.className = `sticker-slot filled ${drawn.rarity}`; div.innerHTML = `<div class="sticker-icon">${drawn.icon}</div><div>${drawn.name}</div>`; revealArea.appendChild(div);
        }
        safeSet('fitapp_album', JSON.stringify(savedCollection));
        document.getElementById('btnClosePack').style.display = 'block'; if(audioEnabled) speak("Figurinhas reveladas.");
    }

    function renderAlbum() {
        const grid = document.getElementById('albumGrid'); grid.innerHTML = '';
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        const progressEl = document.getElementById('albumProgress');
        if (progressEl) progressEl.textContent = `${savedCollection.length} / 9 Figurinhas`;

        if (grid) {
            stickersDB.forEach(sticker => {
                const div = document.createElement('div');
                if(savedCollection.includes(sticker.id)) { div.className = `sticker-slot filled ${sticker.rarity}`; div.innerHTML = `<div class="sticker-icon">${sticker.icon}</div><div>${sticker.name}</div>`; } 
                else { div.className = 'sticker-slot'; div.innerHTML = `<span>${sticker.id}</span>`; }
                grid.appendChild(div);
            });
        }
    }

    function renderLibrary() {
        const grid = document.getElementById('libraryGrid');
        if (!grid) return;
        grid.innerHTML = '';
        dictionaryData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'library-card';
            card.innerHTML = `<div class="lib-name">${item.name}</div><div class="lib-focus">${item.focus}</div><div class="lib-desc">${item.desc}</div>`;
            grid.appendChild(card);
        });
    }

    function filterLibrary() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const cards = document.querySelectorAll('.library-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    }

    function switchTab(tabId, navId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        document.getElementById(tabId).classList.add('active'); document.getElementById(navId).classList.add('active');
        
        if (tabId === 'tab-calendario') renderAlbum();
        if (tabId === 'tab-biblioteca') renderLibrary(); 
        if (tabId === 'tab-treino') {
            if (!currentWorkoutType) {
                document.getElementById('workoutCards').style.display = 'flex';
                const header = document.querySelector('.dashboard-header');
                if (header) header.style.display = 'block';
                els.workoutArea.style.display = 'none';
                els.btnFinishArea.style.display = 'none';
                checkSequence();
            }
        }
    }

    function init() {
        els.styleSelector = document.getElementById('styleSelector');
        els.levelSelector = document.getElementById('levelSelector'); 
        els.workoutArea = document.getElementById('workoutArea'); 
        els.exerciseList = document.getElementById('exerciseList');
        els.progressBar = document.getElementById('progressBar'); 
        els.btnFinishArea = document.getElementById('btnFinishArea');
        els.toast = document.getElementById('toast');

        const savedStyle = safeGet('fitapp_style');
        if (savedStyle && els.styleSelector) els.styleSelector.value = savedStyle;
        const savedLevel = safeGet('fitapp_level');
        if (savedLevel && els.levelSelector) els.levelSelector.value = savedLevel;

        ['treino', 'calendario', 'biblioteca'].forEach(tab => { 
            const navBtn = document.getElementById(`nav-${tab}`);
            if (navBtn) navBtn.addEventListener('click', () => switchTab(`tab-${tab}`, `nav-${tab}`)); 
        });
        
        if (els.styleSelector) els.styleSelector.addEventListener('change', () => {
            safeSet('fitapp_style', els.styleSelector.value);
            if(currentWorkoutType) loadWorkout(); 
        }); 

        if (els.levelSelector) els.levelSelector.addEventListener('change', () => {
            safeSet('fitapp_level', els.levelSelector.value);
            if(currentWorkoutType) loadWorkout(); 
        }); 
        
        const btnAudio = document.getElementById('btnAudio');
        if (btnAudio) btnAudio.addEventListener('click', toggleAudio);
        
        const btnFinishAction = document.getElementById('btnFinishAction');
        if (btnFinishAction) btnFinishAction.addEventListener('click', finishWorkout);
        
        const btnAnalyzeAI = document.getElementById('btnAnalyzeAI');
        if (btnAnalyzeAI) btnAnalyzeAI.addEventListener('click', fetchAIFeedback);
        
        document.querySelectorAll('.time-btn').forEach(btn => { 
            btn.addEventListener('click', (e) => { 
                document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active')); 
                e.target.classList.add('active'); 
                currentRestTime = parseInt(e.target.getAttribute('data-time')); 
            }); 
        });

        const packEnvelope = document.getElementById('packEnvelope');
        if (packEnvelope) packEnvelope.addEventListener('click', openPack);
        
        const btnClosePack = document.getElementById('btnClosePack');
        if (btnClosePack) btnClosePack.addEventListener('click', () => { 
            document.getElementById('packModal').style.display = 'none'; 
            switchTab('tab-calendario', 'nav-calendario'); 
        });
        
        checkSequence(); 
        renderAlbum();
    }
    
    return { 
        init, filterLibrary, openSwapModal, confirmSwap, unlockAll, startWorkout,
        beginWorkoutExecution, cancelWorkoutPreview, // <- Novas funções adicionadas aqui
        openDict: (name) => { 
            switchTab('tab-biblioteca', 'nav-biblioteca'); 
            const searchInp = document.getElementById('searchInput');
            if (searchInp) {
                searchInp.value = name;
                filterLibrary(); 
            } 
        } 
    };
})();

document.addEventListener('DOMContentLoaded', FitApp.init);