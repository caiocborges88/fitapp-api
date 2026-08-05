'use strict';

const FitApp = (() => {
    let totalSets = 0, checkedSets = 0, audioEnabled = false, restTimer = null, currentRestTime = 60;
    let todayLog = [];
    let currentRoutine = []; 
    let currentWorkoutType = ''; 
    
    // Novas variáveis do Relógio Global
    let globalTimer = null;
    let workoutStartTime = null;
    let isWorkoutActive = false; 
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
        
        // Verifica se atualiza as caixas de execução ou a lista de preparação
        if (isWorkoutActive) {
            renderCurrentRoutine(); 
        } else {
            renderPreviewList();
        }
        
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

function renderWeeklyCalendar() {
        const grid = document.getElementById('weeklyGrid');
        if (!grid) return;
        grid.innerHTML = '';
        
        const history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        
        // Gera os últimos 7 dias (incluindo hoje)
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            
            // Corrige o fuso horário para bater com o padrão YYYY-MM-DD local
            const offset = d.getTimezoneOffset() * 60000;
            const localISOTime = (new Date(d.getTime() - offset)).toISOString().slice(0, 10);
            
            let dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
            dayName = dayName.substring(0, 3);
            
            const workedOut = history.find(h => h.date === localISOTime);
            
            const dayEl = document.createElement('div');
            dayEl.style.display = 'flex';
            dayEl.style.flexDirection = 'column';
            dayEl.style.alignItems = 'center';
            dayEl.style.gap = '8px';
            
            let dotColor = '#2a2a2a';
            let textColor = '#555';
            let typeLabel = '';
            let shadow = 'none';
            
            if (workedOut) {
                // Se foi treino livre, pinta de roxo. Se não, verde.
                dotColor = workedOut.tipo === 'Livre' ? '#a64dff' : '#00ff88';
                textColor = '#000';
                typeLabel = workedOut.tipo === 'Livre' ? 'L' : workedOut.tipo;
                shadow = `0 0 10px ${dotColor}80`;
            }
            
            // Destaca o dia de hoje
            const isToday = i === 0;
            const dayLabelColor = isToday ? '#fff' : '#aaa';
            const fontWeight = isToday ? 'bold' : 'normal';
            
            dayEl.innerHTML = `
                <span style="font-size: 11px; color: ${dayLabelColor}; font-weight: ${fontWeight}; text-transform: capitalize;">${dayName}</span>
                <div style="width: 34px; height: 34px; border-radius: 50%; background: ${dotColor}; display: flex; justify-content: center; align-items: center; font-size: 14px; font-weight: bold; color: ${textColor}; box-shadow: ${shadow}; border: 1px solid #444;">
                    ${typeLabel}
                </div>
            `;
            grid.appendChild(dayEl);
        }
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

function saveWorkoutState() {
        if (!isWorkoutActive) return;
        const state = { 
            currentRoutine, 
            currentWorkoutType, 
            workoutStartTime 
        };
        safeSet('fitapp_active_state', JSON.stringify(state));
    }

    function clearWorkoutState() {
        localStorage.removeItem('fitapp_active_state');
    }

    function renderPreviewList() {
        const listEl = document.getElementById('previewList');
        const btnStart = document.getElementById('btnStartWorkout');
        if (!listEl) return;
        listEl.innerHTML = '';
        
        let totalExercises = 0;

        currentRoutine.forEach((bloco, bIndex) => {
            const blockDiv = document.createElement('div');
            blockDiv.style.marginBottom = '12px';
            blockDiv.style.textAlign = 'left';
            
            if (currentWorkoutType !== 'Livre') {
                blockDiv.innerHTML = `<div style="color: #4da3ff; font-weight: bold; font-size: 13px; margin-bottom: 5px;">${bloco.title}</div>`;
            }
            
            bloco.exercises.forEach((ex, eIndex) => {
                totalExercises++;
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.justifyContent = 'space-between';
                row.style.alignItems = 'center';
                row.style.background = '#1e1e1e';
                row.style.padding = '8px 10px';
                row.style.borderRadius = '6px';
                row.style.marginBottom = '4px';
                
                row.innerHTML = `
                    <div style="font-size: 14px; color: #fff; line-height: 1.2;">${ex.name}</div>
                    <div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0;">
                        <span style="font-size: 12px; color: #aaa; background: #111; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${ex.sets}x ${ex.target}</span>
                        <button class="btn-swap" onclick="FitApp.openSwapModal(${bIndex}, ${eIndex})" title="Substituir" style="font-size: 14px; padding: 4px;">🔄</button>
                        <button class="btn-swap" onclick="FitApp.removeExercise(${bIndex}, ${eIndex})" title="Remover" style="font-size: 14px; padding: 4px; color: #ff4444;">❌</button>
                    </div>
                `;
                blockDiv.appendChild(row);
            });
            listEl.appendChild(blockDiv);
        });

        if (totalExercises === 0) {
            listEl.innerHTML = `<div style="text-align: center; color: #666; padding: 20px; font-size: 13px;">Nenhum exercício adicionado.<br><br>Que tal iniciar puxando um Peck Deck na Polia ou uma Variação de Mesa Flexora da biblioteca?</div>`;
            if(btnStart) { btnStart.style.opacity = '0.3'; btnStart.style.pointerEvents = 'none'; }
        } else {
            if(btnStart) { btnStart.style.opacity = '1'; btnStart.style.pointerEvents = 'auto'; }
        }
    }
function removeExercise(bIndex, eIndex) {
        currentRoutine[bIndex].exercises.splice(eIndex, 1);
        renderPreviewList();
    }

    function openAddExerciseModal() {
        document.getElementById('addExerciseModal').style.display = 'flex';
        document.getElementById('searchAddInput').value = '';
        document.getElementById('addExerciseConfig').style.display = 'none';
        filterAddModal();
    }

    let currentCategoryFilter = 'todos';

    function setCategoryFilter(category, btnElement) {
        currentCategoryFilter = category;
        
        // Remove destaque de todos os chips da interface
        const chips = document.querySelectorAll('.filter-chip');
        chips.forEach(chip => {
            chip.style.background = '#2a2a2a';
            chip.style.color = '#aaa';
            chip.style.borderColor = '#444';
        });
        
        // Aplica destaque brilhante ao chip clicado
        btnElement.style.background = 'rgba(166, 77, 255, 0.2)';
        btnElement.style.color = '#a64dff';
        btnElement.style.borderColor = '#a64dff';

        filterAddModal(); // Força a re-filtragem imediata
    }

    function filterAddModal() {
        const query = document.getElementById('searchAddInput').value.toLowerCase();
        const list = document.getElementById('addExerciseList');
        list.innerHTML = '';
        
        const filtered = dictionaryData.filter(d => {
            // Regra 1: Valida o texto digitado na busca
            const matchesText = d.name.toLowerCase().includes(query) || d.focus.toLowerCase().includes(query);
            
            // Regra 2: Cruzamento com a categoria utilizando a inteligência do motor base
            const muscleGroup = getMuscleGroup(d.focus);
            const matchesCategory = currentCategoryFilter === 'todos' || muscleGroup === currentCategoryFilter;
            
            return matchesText && matchesCategory;
        });
        
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'swap-item';
            div.innerHTML = `<div class="swap-item-name">${item.name}</div><div class="swap-item-focus">${item.focus}</div>`;
            div.onclick = () => {
                document.getElementById('selectedExerciseName').textContent = item.name;
                document.getElementById('addExerciseConfig').style.display = 'block';
                document.getElementById('addExerciseModal').querySelector('.swap-modal-content').scrollTop = 1000;
            };
            list.appendChild(div);
        });
    }

    function confirmAddExercise() {
        const name = document.getElementById('selectedExerciseName').textContent;
        const sets = document.getElementById('customSets').value;
        const target = document.getElementById('customReps').value;
        
        if (currentRoutine.length === 0) {
            currentRoutine.push({ title: "Meu Treino Livre", exercises: [] });
        }
        
        currentRoutine[0].exercises.push({ name, sets: parseInt(sets), target });
        
        document.getElementById('addExerciseModal').style.display = 'none';
        renderPreviewList();
        if(audioEnabled) speak("Exercício adicionado.");
    }

    function loadWorkout() {
        const style = els.styleSelector ? els.styleSelector.value : 'biset';
        const level = els.levelSelector ? els.levelSelector.value : 'intermediario';
        const type = currentWorkoutType;
        if (!type) return;

        document.getElementById('workoutCards').style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'none';
        
        isWorkoutActive = false; 
        
        const preview = document.getElementById('workoutPreview');
        const btnAdd = document.getElementById('btnAddExercise');

        if (type === 'Livre') {
            currentRoutine = [{ title: "Meu Treino Livre", exercises: [] }];
            if(preview) {
                document.getElementById('previewTitle').textContent = `🛠️ Treino Livre`;
                document.getElementById('previewDesc').textContent = `Monte sua rotina personalizada do zero.`;
                if(btnAdd) btnAdd.style.display = 'block';
            }
        } else {
            currentRoutine = JSON.parse(JSON.stringify(dbWorkouts[style][level][type] || dbWorkouts['biset']['intermediario']['A']));
            if(preview) {
                document.getElementById('previewTitle').textContent = `Treino ${type}`;
                const styleName = style === 'biset' ? 'Modo Bi-set' : 'Modo Tradicional';
                document.getElementById('previewDesc').textContent = `${styleName} - Nível ${level.charAt(0).toUpperCase() + level.slice(1)}`;
                if(btnAdd) btnAdd.style.display = 'none';
            }
        }
        
        if (preview) {
            renderPreviewList();
            preview.style.display = 'block';
        }
    }

    function cancelWorkoutPreview() {
        document.getElementById('workoutPreview').style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';
        currentWorkoutType = '';
        currentRoutine = [];
    }

    function beginWorkoutExecution() {
        isWorkoutActive = true; 
        
        document.getElementById('workoutPreview').style.display = 'none';
        els.workoutArea.style.display = 'block'; 
        els.btnFinishArea.style.display = 'block';

        workoutStartTime = Date.now();
        if (globalTimer) clearInterval(globalTimer);
        globalTimer = setInterval(updateGlobalTimer, 1000);
        updateGlobalTimer(); 

        renderCurrentRoutine();
        saveWorkoutState(); // <-- Gatilho inicial do Autosave
    }

    function renderCurrentRoutine() {
        els.exerciseList.innerHTML = ''; 
        totalSets = 0; 
        checkedSets = 0; 
        todayLog = [];
        
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
                
                if (!ex.setsData) ex.setsData = []; // Prepara a memória individual do exercício
                
                for(let s = 1; s <= ex.sets; s++) {
                    totalSets++; 
                    const data = ex.setsData[s-1] || { kg: '', reps: '', checked: false };
                    
                    if (data.checked) {
                        checkedSets++;
                        todayLog.push({ exercise: ex.name, set: s, kg: data.kg || 0, reps: data.reps || 0 });
                    }

                    const row = document.createElement('div'); row.className = 'set-row';
                    row.innerHTML = `<div class="set-label">S${s}</div><input type="number" class="kg-val" placeholder="Kg" value="${data.kg}"><input type="number" class="rp-val" placeholder="Reps" value="${data.reps}"><input type="checkbox" class="chk-set" ${data.checked ? 'checked' : ''}>`;
                    
                    const chk = row.querySelector('.chk-set');
                    const kgInp = row.querySelector('.kg-val');
                    const rpInp = row.querySelector('.rp-val');

                    const updateState = () => {
                        ex.setsData[s-1] = { kg: kgInp.value, reps: rpInp.value, checked: chk.checked };
                        saveWorkoutState(); // Dispara o save automático
                    };

                    kgInp.addEventListener('input', updateState);
                    rpInp.addEventListener('input', updateState);

                    chk.addEventListener('change', () => {
                        if (chk.checked) { 
                            checkedSets++; 
                            if(checkedSets < totalSets) startRestTimer();
                            todayLog.push({ exercise: ex.name, set: s, kg: kgInp.value || 0, reps: rpInp.value || 0 });
                        } else { 
                            checkedSets--; 
                            stopRestTimer(); 
                            todayLog = todayLog.filter(log => !(log.exercise === ex.name && log.set === s));
                        }
                        updateState();
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
        
        let totalTimeSecs = 0;
        if (workoutStartTime) {
            totalTimeSecs = Math.floor((Date.now() - workoutStartTime) / 1000);
            clearInterval(globalTimer);
            workoutStartTime = null;
        }

        const payload = { date: dataHoje, tipo: tipoTreino, duration_secs: totalTimeSecs, data: todayLog };

        try {
            document.getElementById('btnFinishAction').textContent = "⏳ Salvando...";
            const response = await fetch('/api/salvar-treino', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) console.error("Erro ao salvar no servidor.");
        } catch (error) { showToast("Modo offline: Servidor não encontrado."); }

        let weekLog = JSON.parse(safeGet('fitapp_week_log') || '[]');
        weekLog.push(payload);
        safeSet('fitapp_week_log', JSON.stringify(weekLog));

        clearWorkoutState(); // <-- Limpa a memória de treino ativo

        els.workoutArea.style.display = 'none'; 
        els.btnFinishArea.style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';

        currentWorkoutType = '';
        checkSequence(); 
        renderWeeklyCalendar(); 

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
        document.getElementById('packEnvelope').style.display = 'none'; 
        const revealArea = document.getElementById('packRevealArea'); 
        revealArea.innerHTML = ''; 
        revealArea.style.display = 'flex';
        revealArea.style.flexDirection = 'column';
        
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        let repetidas = parseInt(safeGet('fitapp_repetidas') || '0');
        
        const roll = Math.random(); 
        let pool = stickersDB.filter(s => s.rarity === 'comum');
        
        // Distribuição Tática de Raridades
        // 5% Holográfico, 15% Ouro, 30% Prata, 50% Comum
        if (roll > 0.95) pool = stickersDB.filter(s => s.rarity === 'holografico'); 
        else if (roll > 0.80) pool = stickersDB.filter(s => s.rarity === 'ouro'); 
        else if (roll > 0.50) pool = stickersDB.filter(s => s.rarity === 'prata');
        
        if (pool.length === 0) pool = stickersDB.filter(s => s.rarity === 'comum'); // Failsafe
        
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
        
        safeSet('fitapp_album', JSON.stringify(savedCollection));
        safeSet('fitapp_repetidas', repetidas.toString());
        
        document.getElementById('btnClosePack').style.display = 'block'; 
        if(audioEnabled) speak(isRepeated ? "Conquista repetida detectada." : "Nova conquista revelada.");
    }

    function renderAlbum() {
        const grid = document.getElementById('albumGrid'); 
        if (!grid) return;
        grid.innerHTML = '';
        
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        let repetidas = parseInt(safeGet('fitapp_repetidas') || '0');
        
        const progressEl = document.getElementById('albumProgress');
        if (progressEl) progressEl.textContent = `${savedCollection.length} / ${stickersDB.length} Conquistas`;

        // Engenharia de Páginas Dinâmicas
        const pages = [...new Set(stickersDB.map(s => s.page))].sort((a,b) => a - b);
        const pageNames = ["Seleção Base", "Campo de Batalha", "Titãs do Movimento", "Escudos de Elite"];
        
        pages.forEach(pageNum => {
            const title = document.createElement('div');
            title.className = 'album-page-title';
            title.textContent = `Página ${pageNum} - ${pageNames[pageNum-1] || 'Expansão'}`;
            grid.appendChild(title);
            
            const pageGrid = document.createElement('div');
            pageGrid.style.display = 'grid';
            pageGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            pageGrid.style.gap = '10px';
            pageGrid.style.marginBottom = '20px';
            
            const pageStickers = stickersDB.filter(s => s.page === pageNum);
            
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
        });
        
        // Renderização do Painel de Forja
        const forge = document.createElement('div');
        forge.className = 'forge-panel';
        forge.innerHTML = `
            <h4 style="color: #ffaa00; margin-bottom: 10px;">🔥 Forja de Conquistas</h4>
            <p style="font-size: 13px; color: #aaa; margin-bottom: 15px;">Pontos de Suor (Repetidas): <strong style="color: #fff; font-size: 16px;">${repetidas}</strong></p>
            <button id="btnForge" class="btn-action" style="background: ${repetidas >= 3 ? '#ffaa00' : '#444'}; color: ${repetidas >= 3 ? '#000' : '#888'}; pointer-events: ${repetidas >= 3 ? 'auto' : 'none'}; border: none;">Forjar Nova Peça (Custa 3)</button>
        `;
        grid.appendChild(forge);
        
        const btnForge = document.getElementById('btnForge');
        if (btnForge && repetidas >= 3) {
            btnForge.onclick = () => FitApp.craftSticker();
        }
    }

    // Função Executora da Forja
    function craftSticker() {
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        let repetidas = parseInt(safeGet('fitapp_repetidas') || '0');
        
        if (repetidas < 3) return;
        
        const faltantes = stickersDB.filter(s => !savedCollection.includes(s.id));
        if (faltantes.length === 0) {
            showToast("Sua galeria já está completa!");
            return;
        }
        
        const nova = faltantes[Math.floor(Math.random() * faltantes.length)];
        savedCollection.push(nova.id);
        repetidas -= 3;
        
        safeSet('fitapp_album', JSON.stringify(savedCollection));
        safeSet('fitapp_repetidas', repetidas.toString());
        
        renderAlbum();
        showToast(`Forja concluída: ${nova.name} desbloqueada!`);
        if(audioEnabled) speak("Conquista forjada com sucesso.");
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
        renderWeeklyCalendar(); 
        
        // --- INTERCEPTADOR DE TREINO ATIVO ---
        const savedState = safeGet('fitapp_active_state');
        if (savedState) {
            const state = JSON.parse(savedState);
            currentRoutine = state.currentRoutine;
            currentWorkoutType = state.currentWorkoutType;
            workoutStartTime = state.workoutStartTime;
            isWorkoutActive = true;
            
            document.getElementById('workoutCards').style.display = 'none';
            const header = document.querySelector('.dashboard-header');
            if (header) header.style.display = 'none';
            els.workoutArea.style.display = 'block'; 
            els.btnFinishArea.style.display = 'block';
            
            if (globalTimer) clearInterval(globalTimer);
            globalTimer = setInterval(updateGlobalTimer, 1000);
            updateGlobalTimer();
            
            renderCurrentRoutine(); // Desenha a tela restaurando as caixas preenchidas
            showToast('Treino em andamento restaurado.');
        }
    }
    
    return { 
        init, filterLibrary, openSwapModal, confirmSwap, unlockAll, startWorkout,
        beginWorkoutExecution, cancelWorkoutPreview, 
        openAddExerciseModal, filterAddModal, confirmAddExercise, removeExercise, setCategoryFilter, craftSticker,
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