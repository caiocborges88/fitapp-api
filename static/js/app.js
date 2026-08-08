'use strict';

const FitApp = (() => {
    let totalSets = 0, checkedSets = 0, audioEnabled = false, restTimer = null, currentRestTime = 60;
    let todayLog = [];
    let currentRoutine = []; 
    let currentWorkoutType = ''; 
    let filaDeTreinosIA = [];
    
    // Variáveis do Gráfico e Relógio Global
    let metricsChartInstance = null; // Guarda a memória do gráfico
    let globalTimer = null;
    let workoutStartTime = null;
    let isWorkoutActive = false; 
    const els = {};

    const safeSet = (k, v) => { try { localStorage.setItem(k, v); return true; } catch(e) { return false; } };
    const safeGet = (k) => { try { return localStorage.getItem(k); } catch(e) { return null; } };

    // ESCUDO ANTI-XSS: Neutraliza scripts maliciosos injetados via texto
    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    };

    function showToast(msg) { els.toast.textContent = msg; els.toast.classList.add('show'); setTimeout(() => els.toast.classList.remove('show'), 3000); }
    function speak(text) { if (!audioEnabled || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'pt-BR'; utterance.rate = 1.1; window.speechSynthesis.speak(utterance); }
    function toggleAudio() { audioEnabled = !audioEnabled; const btn = document.getElementById('btnAudio'); if (audioEnabled) { btn.classList.add('active'); btn.innerHTML = '🔊 <span>Áudio On</span>'; speak("Assistente ativado."); } else { btn.classList.remove('active'); btn.innerHTML = '🔈 <span>Áudio Off</span>'; window.speechSynthesis.cancel(); } }

    function startRestTimer() {
        const containerEl = document.getElementById('timerContainer'), displayEl = document.getElementById('timerDisplay');
        containerEl.style.display = 'block'; 
        clearInterval(restTimer); 
        
        let duration = currentRestTime;
        const endTime = Date.now() + (duration * 1000); // Marca o alvo no tempo real
        let alertGiven = false; // Trava para o áudio de 10s não engasgar

        speak(`Descanso. ${duration} segundos.`);
        
        const updateUI = (timeToFormat) => { 
            let m = Math.floor(timeToFormat/60).toString().padStart(2,'0');
            let s = (timeToFormat%60).toString().padStart(2,'0'); 
            displayEl.textContent = `${m}:${s}`; 
        };
        
        updateUI(duration);

        restTimer = setInterval(() => {
            // Calcula a diferença entre o relógio do celular AGORA e o alvo
            let timeLeft = Math.ceil((endTime - Date.now()) / 1000);
            
            if (timeLeft < 0) timeLeft = 0;
            
            updateUI(timeLeft);
            
            if (timeLeft <= 10 && !alertGiven) {
                speak("Dez segundos.");
                alertGiven = true;
            }

            if (timeLeft <= 0) { 
                clearInterval(restTimer); 
                containerEl.style.display = 'none'; 
                speak("Fim do descanso."); 
            }
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
        
        // --- INÍCIO DA MANOBRA: PREVENÇÃO DE CRASH EM TREINOS CUSTOMIZADOS ---
        let originalName = currentName; 
        const isStandardWorkout = !type.startsWith('custom_') && type !== 'Livre' && type !== 'Casa' && type !== 'novo_customizado';
        
        if (isStandardWorkout && typeof dbWorkouts !== 'undefined') {
            originalName = dbWorkouts[style][level][type][bIndex].exercises[eIndex].name;
        }
        // --- FIM DA MANOBRA ---

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
            saveWorkoutState(); // <-- MANOBRA: Força a gravação imediata no Autosave
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
            
            // --- MANOBRA: INVERTE A BUSCA PARA PEGAR SEMPRE O ÚLTIMO TREINO DO DIA ---
            const workedOut = history.slice().reverse().find(h => h.date === localISOTime);
            
            const dayEl = document.createElement('div');
            dayEl.style.display = 'flex';
            dayEl.style.flexDirection = 'column';
            dayEl.style.alignItems = 'center';
            dayEl.style.gap = '8px';
            dayEl.style.cursor = 'pointer'; // Adicionado
            dayEl.onclick = () => {         // Adicionado
                FitApp.openHistoryModal();
                FitApp.switchHistoryTab('calendar');
            };
            
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
        const customControls = document.getElementById('customWorkoutControls');
        const nameContainer = document.getElementById('customWorkoutNameContainer');
        const nameInput = document.getElementById('customWorkoutName');

        if (type === 'Livre') {
            currentRoutine = [{ title: "Treino Personalizado", exercises: [] }];
            if(preview) {
                document.getElementById('previewTitle').textContent = `🛠️ Novo Treino`;
                document.getElementById('previewDesc').textContent = `Monte sua rotina do zero e salve o template.`;
                if(customControls) customControls.style.display = 'flex';
                if(nameContainer) nameContainer.style.display = 'block';
                if(nameInput) nameInput.value = ''; // Inicia em branco
            }
        } else if (type === 'Casa') {
            currentRoutine = [{
                title: "Circuito Corporal",
                exercises: [
                    { name: "Polichinelo (Aquecimento)", sets: 3, target: "1 min" },
                    { name: "Flexão de Braço", sets: 4, target: "Máx" },
                    { name: "Agachamento Livre", sets: 4, target: "15-20" },
                    { name: "Afundo Alternado", sets: 3, target: "12/perna" },
                    { name: "Prancha Isométrica", sets: 3, target: "45s" }
                ]
            }];
            if(preview) {
                document.getElementById('previewTitle').textContent = `🏠 Treino em Casa`;
                document.getElementById('previewDesc').textContent = `Rotina FullBody de contingência. Sem desculpas.`;
                if(customControls) customControls.style.display = 'none';
                if(nameContainer) nameContainer.style.display = 'none';
            }
        } else if (type.startsWith('custom_')) {
            const customId = type.split('_')[1];
            const savedCustoms = JSON.parse(safeGet('fitapp_custom_workouts') || '[]');
            const customWorkout = savedCustoms.find(w => w.id == customId);
            
            if (customWorkout) {
                currentRoutine = JSON.parse(JSON.stringify(customWorkout.routine));
                if(preview) {
                    document.getElementById('previewTitle').textContent = `🛠️ Editando Treino`;
                    document.getElementById('previewDesc').textContent = `Altere os exercícios ou renomeie seu template.`;
                    if(customControls) customControls.style.display = 'flex';
                    if(nameContainer) nameContainer.style.display = 'block';
                    if(nameInput) nameInput.value = customWorkout.name;
                }
            }
        } else {
            currentRoutine = JSON.parse(JSON.stringify(dbWorkouts[style][level][type] || dbWorkouts['biset']['intermediario']['A']));
            if(preview) {
                document.getElementById('previewTitle').textContent = `Treino ${type}`;
                const styleName = style === 'biset' ? 'Modo Bi-set' : 'Modo Tradicional';
                document.getElementById('previewDesc').textContent = `${styleName} - Nível ${level.charAt(0).toUpperCase() + level.slice(1)}`;
                if(customControls) customControls.style.display = 'none';
                if(nameContainer) nameContainer.style.display = 'none';
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
                    }if (data.checked) {
                        checkedSets++;
                        // Converte vírgula para ponto e transforma string em Float (Número)
                        let rawKgInit = String(data.kg || "0").replace(',', '.');
                        todayLog.push({ exercise: ex.name, set: s, kg: parseFloat(rawKgInit) || 0, reps: parseInt(data.reps) || 0 });
                    }

                    const row = document.createElement('div'); row.className = 'set-row';
                    
                    // --- MANOBRA 1: BOTÃO DE ISOMETRIA INJETADO AO HTML ---
                    row.innerHTML = `<div class="set-label">S${s}</div><input type="number" class="kg-val" placeholder="Kg" value="${data.kg}"><input type="number" class="rp-val" placeholder="Reps / s" value="${data.reps}"><button class="btn-iso" style="background:none; border:none; cursor:pointer; font-size:16px; padding:0 5px;" title="Iniciar Isometria">⏱️</button><input type="checkbox" class="chk-set" ${data.checked ? 'checked' : ''}>`;
                    
                    const chk = row.querySelector('.chk-set');
                    const kgInp = row.querySelector('.kg-val');
                    const rpInp = row.querySelector('.rp-val');
                    const btnIso = row.querySelector('.btn-iso'); // Captura o novo botão

                    const updateState = () => {
                        ex.setsData[s-1] = { kg: kgInp.value, reps: rpInp.value, checked: chk.checked };
                        saveWorkoutState(); // Dispara o save automático
                    };

                    // --- MANOBRA 2: LÓGICA DO CRONÔMETRO ATIVO ---
                    let localIsoTimer = null;
                    btnIso.addEventListener('click', () => {
                        if (localIsoTimer) {
                            // Pausa o relógio se já estiver rodando
                            clearInterval(localIsoTimer);
                            localIsoTimer = null;
                            btnIso.textContent = '⏱️';
                            btnIso.style.textShadow = 'none';
                        } else {
                            // Inicia a contagem em segundos direto na caixa de Repetições
                            btnIso.textContent = '⏸️';
                            btnIso.style.textShadow = '0 0 8px #00ff88';
                            let currentSecs = parseInt(rpInp.value) || 0;
                            localIsoTimer = setInterval(() => {
                                currentSecs++;
                                rpInp.value = currentSecs;
                                updateState(); // Salva a cada segundo
                            }, 1000);
                        }
                    });
                    // --- FIM DA MANOBRA 2 ---

                    kgInp.addEventListener('input', updateState);
                    rpInp.addEventListener('input', updateState);

                    chk.addEventListener('change', () => {
                        // --- MANOBRA 3: DESARMA O RELÓGIO AO MARCAR COMO CONCLUÍDO ---
                        if (localIsoTimer) {
                            clearInterval(localIsoTimer);
                            localIsoTimer = null;
                            btnIso.textContent = '⏱️';
                            btnIso.style.textShadow = 'none';
                        }
                        // -------------------------------------------------------------
                        
                        if (chk.checked) { 
                            checkedSets++; 
                            if(checkedSets < totalSets) startRestTimer();
                            let rawKgInput = String(kgInp.value || "0").replace(',', '.');
                            todayLog.push({ exercise: ex.name, set: s, kg: parseFloat(rawKgInput) || 0, reps: parseInt(rpInp.value) || 0 });
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
        
        // --- INÍCIO DA MANOBRA: CORREÇÃO DO FUSO HORÁRIO ---
        const d = new Date();
        const offset = d.getTimezoneOffset() * 60000;
        const dataHoje = (new Date(d.getTime() - offset)).toISOString().split('T')[0];
        // --- FIM DA MANOBRA ---
        
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

        // --- INÍCIO DA MANOBRA: TRAVA DE MEMÓRIA (MÁX 100 TREINOS LOCAIS) ---
        if (weekLog.length > 100) {
            weekLog = weekLog.slice(-100); // Fica apenas com as 100 entradas mais recentes
        }
        // --- FIM DA MANOBRA ---

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
        renderMetricsChart(); // <-- Atualiza o gráfico com o novo treino

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
        let repetidas = parseInt(safeGet('fitapp_repetidas') || '0') || 0; // O "|| 0" blinda contra o vírus 'NaN'
        
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

    let currentAlbumPage = 1; // Memória da aba atual

    function renderAlbum() {
        const grid = document.getElementById('albumGrid'); 
        if (!grid) return;
        
        // Neutraliza o conflito do CSS antigo
        grid.style.display = 'block';
        grid.innerHTML = '';
        
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        let repetidas = parseInt(safeGet('fitapp_repetidas') || '0') || 0; // O "|| 0" blinda contra o vírus 'NaN'
        
        const progressEl = document.getElementById('albumProgress');
        if (progressEl) progressEl.textContent = `${savedCollection.length} / ${stickersDB.length} Conquistas`;

        const pages = [...new Set(stickersDB.map(s => s.page))].sort((a,b) => a - b);
        const pageNames = ["Seleção Base", "Campo de Batalha", "Titãs do Movimento", "Escudos de Elite"];
        
        // 1. Construtor da Faixa de Abas (Navegação)
        const navContainer = document.createElement('div');
        navContainer.style.display = 'flex';
        navContainer.style.gap = '10px';
        navContainer.style.overflowX = 'auto';
        navContainer.style.marginBottom = '20px';
        navContainer.style.paddingBottom = '5px';
        navContainer.style.scrollbarWidth = 'none'; // Oculta barra de rolagem

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
                renderAlbum(); // Recarrega a tela com a nova aba
            };
            navContainer.appendChild(btn);
        });
        grid.appendChild(navContainer);

        // 2. Título da Página Atual
        const title = document.createElement('div');
        title.className = 'album-page-title';
        title.style.textAlign = 'center';
        title.style.borderBottom = 'none';
        title.textContent = pageNames[currentAlbumPage-1] || 'Expansão';
        grid.appendChild(title);

        // 3. Renderização do Grid Exclusivo da Aba
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
        
        // 4. Renderização do Painel da Forja
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
            btnForge.onclick = () => FitApp.craftSticker();
        }
    }

    // Função Executora da Forja
    function craftSticker() {
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        let repetidas = parseInt(safeGet('fitapp_repetidas') || '0') || 0; // O "|| 0" blinda contra o vírus 'NaN'
        
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

        // Agrupa os dados usando a inteligência da função getMuscleGroup
        const groups = {};
        dictionaryData.forEach(item => {
            const groupName = getMuscleGroup(item.focus);
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(item);
        });

        // Define a ordem desejada de exibição e os títulos bonitos
        const groupTitles = {
            'peito': '🟦 Peito',
            'costas': '🟩 Costas',
            'pernas': '🟨 Pernas',
            'ombros': '🟪 Ombros',
            'triceps': '🟦 Tríceps',
            'biceps': '🟩 Bíceps',
            'core': '🟧 Core',
            'outros': '⬜ Outros'
        };

        // Renderiza cada grupo
        for (const [key, title] of Object.entries(groupTitles)) {
            if (!groups[key] || groups[key].length === 0) continue;

            const categorySection = document.createElement('div');
            categorySection.className = 'library-category-section';
            
            const header = document.createElement('h3');
            header.style.color = '#fff';
            header.style.marginTop = '20px';
            header.style.marginBottom = '10px';
            header.style.borderBottom = '1px solid #333';
            header.style.paddingBottom = '5px';
            header.style.textTransform = 'uppercase';
            header.textContent = title;
            categorySection.appendChild(header);

            const cardContainer = document.createElement('div');
            cardContainer.className = 'library-card-container';
            cardContainer.style.display = 'grid';
            cardContainer.style.gap = '15px';

            groups[key].forEach(item => {
                const card = document.createElement('div');
                card.className = 'library-card';
                card.innerHTML = `<div class="lib-name">${item.name}</div><div class="lib-focus">${item.focus}</div><div class="lib-desc">${item.desc}</div>`;
                cardContainer.appendChild(card);
            });

            categorySection.appendChild(cardContainer);
            grid.appendChild(categorySection);
        }
    }

    function filterLibrary() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        
        // Primeiro, filtra os cartões individuais
        const cards = document.querySelectorAll('.library-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });

        // Segundo, oculta categorias inteiras se todos os cartões dentro dela estiverem ocultos
        const sections = document.querySelectorAll('.library-category-section');
        sections.forEach(section => {
            const visibleCards = Array.from(section.querySelectorAll('.library-card')).filter(c => c.style.display === 'block');
            section.style.display = visibleCards.length > 0 ? 'block' : 'none';
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

// --- SISTEMA CRUD DE TREINOS CUSTOMIZADOS ---
    function renderCustomWorkouts() {
        const listEl = document.getElementById('customWorkoutsList');
        if (!listEl) return;
        listEl.innerHTML = '';
        
        const savedCustoms = JSON.parse(safeGet('fitapp_custom_workouts') || '[]');
        
        if (savedCustoms.length === 0) {
            listEl.innerHTML = '<div style="color: #666; font-size: 13px; text-align: center; padding: 10px; border: 1px dashed #333; border-radius: 8px;">Nenhum treino criado.</div>';
            return;
        }
        
        savedCustoms.forEach(workout => {
            const div = document.createElement('div');
            div.className = 'card-treino';
            div.style.borderLeftColor = '#a64dff';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            div.style.padding = '15px';
            
            div.innerHTML = `
                <div style="flex: 1;" onclick="FitApp.startWorkout('custom_${workout.id}')">
                    <h3 style="margin: 0; color: #fff; font-size: 16px;">${escapeHTML(workout.name)}</h3>
                    <p style="margin: 0; color: #aaa; font-size: 12px; margin-top: 5px;">${workout.routine[0].exercises.length} exercícios estruturados</p>
                </div>
                <button onclick="FitApp.deleteCustomWorkout(${workout.id}, event)" style="background: none; border: none; color: #ff4444; font-size: 18px; cursor: pointer; padding: 5px; margin-left: 10px;" title="Excluir">🗑️</button>
            `;
            listEl.appendChild(div);
        });
    }

    function saveCustomWorkout() {
        const nameInput = document.getElementById('customWorkoutName');
        const name = nameInput ? nameInput.value.trim() : '';
        
        if (!name) {
            showToast('Alerta: Dê um nome ao seu treino.');
            if(nameInput) nameInput.focus();
            return;
        }
        
        if (currentRoutine.length === 0 || currentRoutine[0].exercises.length === 0) {
            showToast('Alerta: Adicione pelo menos um exercício.');
            return;
        }

        let savedCustoms = JSON.parse(safeGet('fitapp_custom_workouts') || '[]');
        
        let customId = null;
        if (currentWorkoutType.startsWith('custom_')) {
            // Atualiza o template existente
            customId = parseInt(currentWorkoutType.split('_')[1]);
        } else {
            // Cria um template totalmente novo
            customId = Date.now(); 
            currentWorkoutType = 'custom_' + customId; 
        }
        
        const existingIndex = savedCustoms.findIndex(w => w.id === customId);
        
        const workoutData = {
            id: customId,
            name: name,
            routine: currentRoutine
        };
        
        if (existingIndex >= 0) {
            savedCustoms[existingIndex] = workoutData; // Update
        } else {
            savedCustoms.push(workoutData); // Create
        }
        
        safeSet('fitapp_custom_workouts', JSON.stringify(savedCustoms));
        
        renderCustomWorkouts();
        showToast(`Template "${name}" salvo.`);
        if(audioEnabled) speak("Template customizado salvo no sistema.");

        // --- INÍCIO DA MANOBRA: CARROSSEL DA IA ---
        if (typeof filaDeTreinosIA !== 'undefined' && filaDeTreinosIA.length > 0) {
            currentWorkoutType = 'novo_customizado';
            carregarProximoTreinoIA(); // Puxa o próximo treino da fila
        } else {
            // Se a fila acabou, restaura os botões e fecha a tela
            const botoes = document.querySelectorAll('button');
            botoes.forEach(btn => { 
                if(btn.innerText.includes('Salvar e Revisar') || btn.innerText.includes('Salvar Template Final')) {
                    btn.innerText = 'Salvar Template'; 
                }
            });
            // Usa a sua função nativa para fechar o editor
            cancelWorkoutPreview(); 
        }
        // --- FIM DA MANOBRA ---
    }

    function deleteCustomWorkout(id, event) {
        event.stopPropagation(); // Evita que o clique abra o treino acidentalmente
        if(!confirm('Atenção: Tem certeza que deseja excluir este template?')) return;
        
        let savedCustoms = JSON.parse(safeGet('fitapp_custom_workouts') || '[]');
        savedCustoms = savedCustoms.filter(w => w.id !== id);
        safeSet('fitapp_custom_workouts', JSON.stringify(savedCustoms));
        
        renderCustomWorkouts();
        showToast('Template excluído da base.');
    }

// --- SISTEMA DE HISTÓRICO E CALENDÁRIO MENSAL ---
    function openHistoryModal() {
        document.getElementById('historyModal').style.display = 'flex';
        switchHistoryTab('list'); // Abre na aba lista por padrão
    }

    function switchHistoryTab(tab) {
        const btnList = document.getElementById('btnTabList');
        const btnCalendar = document.getElementById('btnTabCalendar');
        const viewList = document.getElementById('historyListView');
        const viewCalendar = document.getElementById('historyCalendarView');

        if (tab === 'list') {
            btnList.classList.add('active'); 
            btnCalendar.classList.remove('active');
            viewList.style.display = 'block';
            viewCalendar.style.display = 'none';
            renderHistoryList();
        } else {
            btnCalendar.classList.add('active'); 
            btnList.classList.remove('active');
            viewList.style.display = 'none';
            viewCalendar.style.display = 'block';
            renderMonthlyCalendar();
        }
    }

    function renderHistoryList() {
        const container = document.getElementById('historyListView');
        container.innerHTML = '';
        let history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        
        if (history.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">Nenhum treino salvo ainda.</div>';
            return;
        }

        // Clona e inverte o array para mostrar os mais recentes no topo
        history.slice().reverse().forEach((log) => {
            // Corrige o fuso horário para exibição correta
            const dateObj = new Date(log.date + 'T12:00:00'); 
            const dateStr = dateObj.toLocaleDateString('pt-BR');
            const durationStr = log.duration_secs ? Math.floor(log.duration_secs / 60) + ' min' : '--';
            
            const block = document.createElement('div');
            block.style.background = '#2a2a2a';
            block.style.borderRadius = '8px';
            block.style.marginBottom = '10px';
            block.style.border = '1px solid #333';

            // Cabeçalho do Accordion (Sanfona)
            const header = document.createElement('div');
            header.style.padding = '12px';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.cursor = 'pointer';
            header.style.borderLeft = log.tipo === 'Livre' ? '4px solid #a64dff' : '4px solid #00ff88';
            
            header.innerHTML = `
                <div>
                    <div style="font-weight: bold; color: #fff;">Treino ${log.tipo}</div>
                    <div style="font-size: 12px; color: #aaa;">${dateStr} • ⏱️ ${durationStr}</div>
                </div>
                <div style="color: #888; font-size: 12px; transition: transform 0.3s;">▼</div>
            `;

            // Corpo do Accordion (Oculto por padrão)
            const body = document.createElement('div');
            body.style.padding = '0 12px 12px 12px';
            body.style.display = 'none';
            body.style.borderTop = '1px dashed #444';
            body.style.marginTop = '5px';
            body.style.paddingTop = '10px';
            
            if (log.data && log.data.length > 0) {
                const exMap = {};
                log.data.forEach(item => {
                    if (!exMap[item.exercise]) exMap[item.exercise] = [];
                    exMap[item.exercise].push(item);
                });
                
                for (const [exName, sets] of Object.entries(exMap)) {
                    const exDiv = document.createElement('div');
                    exDiv.style.marginBottom = '8px';
                    exDiv.innerHTML = `<div style="color: #4da3ff; font-size: 13px; font-weight: bold;">${exName}</div>`;
                    
                    const setStr = sets.map(s => `<span style="font-size: 11px; color: #ccc; background: #111; padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid #333;">S${s.set}: ${s.kg}kg x ${s.reps}</span>`).join('');
                    exDiv.innerHTML += `<div style="margin-top: 4px; line-height: 1.8;">${setStr}</div>`;
                    body.appendChild(exDiv);
                }
            } else {
                body.innerHTML = '<div style="font-size: 12px; color: #666;">Sem dados detalhados.</div>';
            }

            header.onclick = () => {
                const isVisible = body.style.display === 'block';
                body.style.display = isVisible ? 'none' : 'block';
                header.querySelector('div:last-child').style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
            };

            block.appendChild(header);
            block.appendChild(body);
            container.appendChild(block);
        });
    }

    function renderMonthlyCalendar() {
        const container = document.getElementById('historyCalendarView');
        container.innerHTML = '';
        
        const history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        const historyDates = history.map(h => h.date); 
        
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        
        // Matemática do calendário
        const firstDay = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        
        const header = document.createElement('div');
        header.style.textAlign = 'center';
        header.style.fontWeight = 'bold';
        header.style.color = '#fff';
        header.style.marginBottom = '15px';
        header.style.fontSize = '16px';
        header.textContent = `${monthNames[month]} ${year}`;
        container.appendChild(header);
        
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        grid.style.gap = '5px';
        grid.style.textAlign = 'center';
        
        const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        weekDays.forEach(d => {
            const dayLabel = document.createElement('div');
            dayLabel.style.color = '#aaa';
            dayLabel.style.fontSize = '12px';
            dayLabel.style.fontWeight = 'bold';
            dayLabel.style.marginBottom = '5px';
            dayLabel.textContent = d;
            grid.appendChild(dayLabel);
        });
        
        for (let i = 0; i < firstDay; i++) {
            grid.appendChild(document.createElement('div'));
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isWorkoutDay = historyDates.includes(dateStr);
            const isToday = day === today.getDate();
            
            const dayCell = document.createElement('div');
            dayCell.style.padding = '10px 0';
            dayCell.style.borderRadius = '6px';
            dayCell.style.fontSize = '14px';
            dayCell.style.background = isWorkoutDay ? 'rgba(0, 255, 136, 0.2)' : '#1e1e1e';
            dayCell.style.color = isWorkoutDay ? '#00ff88' : '#fff';
            dayCell.style.border = isWorkoutDay ? '1px solid #00ff88' : '1px solid #333';
            dayCell.style.fontWeight = isWorkoutDay ? 'bold' : 'normal';
            
            if (isToday) {
                dayCell.style.boxShadow = 'inset 0 0 0 2px #a64dff'; // Destaque visual para HOJE
            }
            
            dayCell.textContent = day;
            grid.appendChild(dayCell);
        }
        
        container.appendChild(grid);
    }

// --- SISTEMA DE IMPORTAÇÃO COM INTELIGÊNCIA ARTIFICIAL (GEMINI) ---
    function openImportAiModal() {
        document.getElementById('importAiModal').style.display = 'flex';
        const nameInput = document.getElementById('aiWorkoutName');
        const textInput = document.getElementById('aiWorkoutText');
        if (nameInput) nameInput.value = '';
        if (textInput) textInput.value = '';
    }

    async function processWorkoutWithAI() {
        const nameInput = document.getElementById('aiWorkoutName').value.trim();
        const textInput = document.getElementById('aiWorkoutText').value.trim();
        
        if (!nameInput || !textInput) {
            showToast("Alerta: Preencha o nome e cole o texto do treino.");
            return;
        }

        const btn = document.getElementById('btnProcessAi');
        const loader = document.getElementById('aiImportLoader');
        
        btn.style.display = 'none';
        loader.style.display = 'block';

        try {
            const response = await fetch('/api/importar-treino-ia', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto: textInput })
            });

            const data = await response.json();
            
            if (data.erro) {
                throw new Error("Servidor Python: " + data.erro);
            }
            
            const jsonMatch = data.resultado.match(/\[[\s\S]*\]/);
            if (!jsonMatch) throw new Error("A IA não retornou um formato de dados válido.");
            
            const parsedData = JSON.parse(jsonMatch[0]);
            if (parsedData.length === 0) throw new Error("A IA não identificou nenhum exercício.");

            // Verifica se é a nova estrutura de múltiplos treinos (Periodização)
            if (parsedData[0].nome_treino && parsedData[0].exercicios) {
                filaDeTreinosIA = parsedData; // Coloca todos na fila
                document.getElementById('importAiModal').style.display = 'none'; // ID corrigido
                carregarProximoTreinoIA(); // Inicia o carrossel
            } else {
                throw new Error("A estrutura do JSON não corresponde à periodização de treinos.");
            }

        } catch (error) {
            console.error(error);
            // Exibe o erro real na interface para facilitar a depuração
            showToast("Falha: " + error.message);
        } finally {
            btn.style.display = 'block';
            loader.style.display = 'none';
        }
    }

function carregarProximoTreinoIA() {
        if (filaDeTreinosIA.length === 0) {
            showToast("Periodização importada e salva com sucesso!");
            cancelWorkoutPreview(); 
            renderCustomWorkouts();
            return;
        }

        const treinoAtual = filaDeTreinosIA.shift(); 

        document.getElementById('workoutCards').style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'none';
        
        const preview = document.getElementById('workoutPreview');
        const customControls = document.getElementById('customWorkoutControls');
        const nameContainer = document.getElementById('customWorkoutNameContainer');
        const nameInput = document.getElementById('customWorkoutName');

        if(customControls) customControls.style.display = 'flex';
        if(nameContainer) nameContainer.style.display = 'block';

        if (nameInput) nameInput.value = treinoAtual.nome_treino;
        document.getElementById('previewTitle').textContent = `Revisando IA`;
        document.getElementById('previewDesc').textContent = `Ajuste os exercícios e salve para puxar o próximo dia.`;

        currentWorkoutType = 'novo_customizado';

        currentRoutine = [{
            title: "Treino Importado",
            exercises: treinoAtual.exercicios.map(ex => ({
                name: ex.nome,
                sets: parseInt(ex.series) || 4,
                target: ex.repeticoes || "10"
            }))
        }];

        renderPreviewList(); 
        
        const botoes = document.querySelectorAll('button');
        botoes.forEach(btn => {
            if (btn.innerText.includes('Salvar Template') || btn.innerText.includes('Salvar e Revisar')) {
                if (filaDeTreinosIA.length > 0) {
                    btn.innerText = `Salvar e Revisar Próximo (${filaDeTreinosIA.length} restantes)`;
                } else {
                    btn.innerText = "Salvar Template Final";
                }
            }
        });

        if (preview) preview.style.display = 'block';
    }

    // --- INÍCIO DA MANOBRA: MOTOR DO GRÁFICO DE EVOLUÇÃO ---
    function renderMetricsChart() {
        const container = document.getElementById('metricsContainer');
        const canvas = document.getElementById('metricsChart');
        if (!container || !canvas || typeof Chart === 'undefined') return;

        let history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        if (history.length === 0) {
            container.style.display = 'none';
            return;
        }

        const exStats = {};
        const dateSet = new Set();

        // 1. Mineração de Dados: Busca a carga máxima de cada exercício por dia
        history.forEach(log => {
            if (!log.data || log.data.length === 0) return;
            
            // Converte YYYY-MM-DD para DD/MM para o gráfico ficar limpo
            const parts = log.date.split('-');
            if(parts.length !== 3) return;
            const shortDate = `${parts[2]}/${parts[1]}`; 
            
            let hasValidWeight = false;

            log.data.forEach(item => {
                if (item.kg > 0) {
                    hasValidWeight = true;
                    if (!exStats[item.exercise]) exStats[item.exercise] = { count: 0, maxKgByDate: {} };
                    
                    const currentMax = exStats[item.exercise].maxKgByDate[log.date] || 0;
                    if (item.kg > currentMax) {
                        exStats[item.exercise].maxKgByDate[log.date] = item.kg; // Guarda usando a data completa YYYY-MM-DD para ordenar certo
                    }
                }
            });
            if (hasValidWeight) dateSet.add(log.date);
        });

        // 2. Filtro de Relevância: Pega os 3 exercícios mais frequentes
        const topExercises = Object.keys(exStats)
            .map(ex => ({ name: ex, count: Object.keys(exStats[ex].maxKgByDate).length }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map(obj => obj.name);

        if (topExercises.length === 0) {
            container.style.display = 'none';
            return;
        }

        // Exibe a moldura do gráfico
        container.style.display = 'block';

        // Ordena cronologicamente e gera os rótulos do Eixo X (DD/MM)
        const sortedDates = Array.from(dateSet).sort();
        const labels = sortedDates.map(d => `${d.split('-')[2]}/${d.split('-')[1]}`); 
        
        const colors = ['#00ff88', '#a64dff', '#4da3ff'];
        
        // 3. Montagem das Linhas (Datasets)
        const datasets = topExercises.map((exName, index) => {
            // Se não treinou esse músculo no dia, o valor é null. A linha "pula" o dia e conecta direto.
            const dataPoints = sortedDates.map(date => exStats[exName].maxKgByDate[date] || null);
            return {
                label: exName.length > 15 ? exName.substring(0, 15) + '...' : exName,
                data: dataPoints,
                borderColor: colors[index],
                backgroundColor: colors[index],
                tension: 0.3, // Curva suave
                borderWidth: 2,
                pointRadius: 4,
                spanGaps: true // Diretriz Tática: Conecta a linha ignorando os dias nulos
            };
        });

        // Destrói o gráfico antigo antes de desenhar o novo (previne flickering)
        if (metricsChartInstance) metricsChartInstance.destroy();

        // Renderiza o gráfico
        metricsChartInstance = new Chart(canvas, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                color: '#fff',
                plugins: {
                    legend: { labels: { color: '#aaa', font: { size: 10, family: 'monospace' }, boxWidth: 12 } },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    x: { ticks: { color: '#888', font: { size: 10 } }, grid: { color: '#333' } },
                    y: { ticks: { color: '#888', font: { size: 10 } }, grid: { color: '#333' }, beginAtZero: true }
                }
            }
        });
    }
    // --- FIM DA MANOBRA ---

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
        renderCustomWorkouts(); // <-- Renderiza a estante 
        renderMetricsChart();   // <-- Desenha o gráfico inicial
        
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
        openHistoryModal, switchHistoryTab,
        saveCustomWorkout, deleteCustomWorkout,
        openImportAiModal, processWorkoutWithAI,
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