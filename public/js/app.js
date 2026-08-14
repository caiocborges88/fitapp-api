'use strict';

var FitApp = (() => {
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

    // NOVO: Escudo Numérico (Neutraliza vírgulas, letras e pontos duplos)
    const parseSafeFloat = (val) => {
        if (!val) return 0;
        let str = String(val).replace(',', '.').replace(/[^0-9.]/g, ''); 
        const parts = str.split('.');
        if (parts.length > 2) str = parts[0] + '.' + parts.slice(1).join('');
        return parseFloat(str) || 0;
    };

    function showToast(msg) { els.toast.textContent = msg; els.toast.classList.add('show'); setTimeout(() => els.toast.classList.remove('show'), 3000); }
    function speak(text) { if (!audioEnabled || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'pt-BR'; utterance.rate = 1.1; window.speechSynthesis.speak(utterance); }
    function toggleAudio() { audioEnabled = !audioEnabled; const btn = document.getElementById('btnAudio'); if (audioEnabled) { btn.classList.add('active'); btn.innerHTML = '🔊 <span>Áudio On</span>'; speak("Assistente ativado."); } else { btn.classList.remove('active'); btn.innerHTML = '🔈 <span>Áudio Off</span>'; window.speechSynthesis.cancel(); } }

    let currentTimerEl = null;
    let currentTimerTarget = null;

    // Função para alterar o tempo de descanso em tempo real
    function adjustRestTime(newTime) {
        currentRestTime = newTime;
        if(currentTimerTarget) {
            startRestTimer(currentTimerTarget); // Reinicia o cronômetro no mesmo bloco com o novo tempo
        }
    }

    function startRestTimer(targetContainer) {
        currentTimerTarget = targetContainer;
        
        // Esconde o cronômetro antigo do topo da tela (se ainda estiver lá)
        const oldGlobalTimer = document.getElementById('timerContainer');
        if(oldGlobalTimer) oldGlobalTimer.style.display = 'none';

        clearInterval(restTimer); 
        
        // Remove o cronômetro ativo de outro exercício, caso o usuário pule etapas
        if (currentTimerEl && currentTimerEl.parentNode) {
            currentTimerEl.parentNode.removeChild(currentTimerEl);
        }

        // Cria a nova cápsula visual de tempo do zero
        currentTimerEl = document.createElement('div');
        currentTimerEl.className = 'inline-rest-timer';
        currentTimerEl.style.cssText = 'background: #1a1a1a; padding: 15px; border-radius: 8px; text-align: center; margin-top: 15px; border: 1px solid #333; transition: all 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.5);';
        
        // Acopla exatamente abaixo das séries que acabaram de ser concluídas
        targetContainer.appendChild(currentTimerEl);
        
        let duration = currentRestTime;
        const endTime = Date.now() + (duration * 1000); 
        let alert10sGiven = false; 

        if(audioEnabled) speak(`Descanso. ${duration} segundos.`);
        
        const updateUI = () => { 
            let timeLeft = Math.ceil((endTime - Date.now()) / 1000);
            if (timeLeft < 0) timeLeft = 0;
            
            let m = Math.floor(timeLeft/60).toString().padStart(2,'0');
            let s = (timeLeft%60).toString().padStart(2,'0'); 
            
            let timerContent = '';

            // Lógica Progressiva de Cores e Engajamento
            if (timeLeft > 10) {
                currentTimerEl.style.borderColor = '#333';
                currentTimerEl.style.background = '#1a1a1a';
                timerContent = `<div style="color: #aaa; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Recuperação Tática</div><div style="font-size: 32px; color: #fff; font-weight: bold; font-family: monospace;">${m}:${s}</div>`;
            } else if (timeLeft <= 10 && timeLeft > 5) {
                currentTimerEl.style.borderColor = '#ffaa00';
                currentTimerEl.style.background = 'rgba(255, 170, 0, 0.15)';
                timerContent = `<div style="color: #ffaa00; font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 5px; animation: blink 1s infinite;">⚠️ Prepare-se</div><div style="font-size: 32px; color: #ffaa00; font-weight: bold; font-family: monospace;">${m}:${s}</div>`;
                if (!alert10sGiven && audioEnabled) { speak("Dez segundos. Assuma a posição."); alert10sGiven = true; }
            } else if (timeLeft <= 5 && timeLeft > 0) {
                currentTimerEl.style.borderColor = '#ff4444';
                currentTimerEl.style.background = 'rgba(255, 68, 68, 0.2)';
                timerContent = `<div style="color: #ff4444; font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 5px;">Contagem Final</div><div style="font-size: 42px; color: #ff4444; font-weight: bold; text-shadow: 0 0 15px rgba(255,68,68,0.8);">${timeLeft}</div>`;
            } else if (timeLeft === 0) {
                currentTimerEl.style.borderColor = '#00ff88';
                currentTimerEl.style.background = 'rgba(0, 255, 136, 0.2)';
                timerContent = `<div style="font-size: 36px; color: #00ff88; font-weight: bold; text-shadow: 0 0 15px rgba(0,255,136,0.8); text-transform: uppercase;">🔥 Vai!</div>`;
                if(audioEnabled) speak("Fim do descanso. Ação!");
                clearInterval(restTimer);
                // Remove o cronômetro 3 segundos após zerar para limpar a tela
                setTimeout(() => {
                    if (currentTimerEl && currentTimerEl.parentNode) currentTimerEl.parentNode.removeChild(currentTimerEl);
                }, 3000);
            }

            // Injeta os botões de controle de tempo dentro do próprio cronômetro
            if (timeLeft > 0) {
                timerContent += `
                    <div style="display: flex; justify-content: center; gap: 10px; margin-top: 15px;">
                        <button onclick="FitApp.adjustRestTime(60)" style="background: ${currentRestTime===60?'#00ff88':'#222'}; color: ${currentRestTime===60?'#000':'#aaa'}; border: 1px solid #444; padding: 6px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; font-weight: bold; transition: all 0.2s;">60s</button>
                        <button onclick="FitApp.adjustRestTime(90)" style="background: ${currentRestTime===90?'#00ff88':'#222'}; color: ${currentRestTime===90?'#000':'#aaa'}; border: 1px solid #444; padding: 6px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; font-weight: bold; transition: all 0.2s;">90s</button>
                        <button onclick="FitApp.adjustRestTime(120)" style="background: ${currentRestTime===120?'#00ff88':'#222'}; color: ${currentRestTime===120?'#000':'#aaa'}; border: 1px solid #444; padding: 6px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; font-weight: bold; transition: all 0.2s;">120s</button>
                    </div>
                `;
            }
            
            currentTimerEl.innerHTML = timerContent;
        };
        
        updateUI();
        restTimer = setInterval(updateUI, 1000); 
    }

    function stopRestTimer() { 
        clearInterval(restTimer); 
        if (currentTimerEl && currentTimerEl.parentNode) {
            currentTimerEl.parentNode.removeChild(currentTimerEl);
        }
    }

    // Função para adicionar ou remover séries dinamicamente durante o treino
    function changeSets(bIndex, eIndex, delta) {
        const ex = currentRoutine[bIndex].exercises[eIndex];
        
        if (delta > 0) {
            ex.sets++;
            if(!ex.setsData) ex.setsData = [];
            ex.setsData.push({ kg: '', reps: '', checked: false });
        } else if (delta < 0 && ex.sets > 1) {
            ex.sets--;
            const removedSet = ex.setsData.pop();
            // Desfaz a contabilidade se a série removida já estava marcada como concluída
            if (removedSet && removedSet.checked) {
                checkedSets--;
                todayLog = todayLog.filter(log => !(log.exercise === ex.name && log.set === (ex.sets + 1)));
            }
        }
        
        saveWorkoutState();
        renderCurrentRoutine(); // Recarrega a tela instantaneamente
        if(audioEnabled && delta > 0) speak("Série adicionada.");
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
        
        let originalName = currentName; 
        const isStandardWorkout = !type.startsWith('custom_') && type !== 'Livre' && type !== 'Casa' && type !== 'novo_customizado';
        
        if (isStandardWorkout && typeof dbWorkouts !== 'undefined') {
            originalName = dbWorkouts[style][level][type][bIndex].exercises[eIndex].name;
        }

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
        
        if (isWorkoutActive) {
            renderCurrentRoutine(); 
            saveWorkoutState(); 
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
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            
            const offset = d.getTimezoneOffset() * 60000;
            const localISOTime = (new Date(d.getTime() - offset)).toISOString().slice(0, 10);
            
            let dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
            dayName = dayName.substring(0, 3);
            
            const workedOut = history.slice().reverse().find(h => h.date === localISOTime);
            
            const dayEl = document.createElement('div');
            dayEl.style.display = 'flex';
            dayEl.style.flexDirection = 'column';
            dayEl.style.alignItems = 'center';
            dayEl.style.gap = '8px';
            dayEl.style.cursor = 'pointer'; 
            dayEl.onclick = () => {         
                FitApp.openHistoryModal();
                FitApp.switchHistoryTab('calendar');
            };
            
            let dotColor = '#2a2a2a';
            let textColor = '#555';
            let typeLabel = '';
            let shadow = 'none';
            
            if (workedOut) {
                dotColor = workedOut.tipo === 'Livre' ? '#a64dff' : '#00ff88';
                textColor = '#000';
                typeLabel = workedOut.tipo === 'Livre' ? 'L' : workedOut.tipo;
                shadow = `0 0 10px ${dotColor}80`;
            }
            
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
        
        // NOVO: Força o redirecionamento tático para a linha de frente (Aba Treinar)
        const tabTreino = document.getElementById('nav-treino');
        if (tabTreino) {
            tabTreino.click();
        }
        
        // Garante que o scroll volte para o topo ao trocar de tela
        window.scrollTo({ top: 0, behavior: 'smooth' });

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
        const list = document.getElementById('previewList');
        if (!list) return;
        list.innerHTML = '';
        
        currentRoutine.forEach((bloco, bIndex) => {
            const blockTitle = document.createElement('h4');
            blockTitle.style.color = '#a64dff';
            blockTitle.style.marginTop = '15px';
            blockTitle.style.marginBottom = '10px';
            blockTitle.style.borderBottom = '1px solid #333';
            blockTitle.style.paddingBottom = '5px';
            blockTitle.textContent = bloco.title;
            list.appendChild(blockTitle);

            bloco.exercises.forEach((ex, eIndex) => {
                const item = document.createElement('div');
                item.className = 'preview-item'; // Conecta ao nosso novo CSS premium

                // NOVO: Higienização de Variáveis Dinâmicas
                const safeName = escapeHTML(ex.name);
                const safeTarget = escapeHTML(ex.target);
                
                // O Motor de Busca Automática no YouTube
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;

                item.innerHTML = `
                    <div style="flex: 1;">
                        <div style="font-weight: bold; color: #fff; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                            ${safeName}
                            <a href="${ytLink}" target="_blank" title="Ver execução no YouTube" style="text-decoration: none; font-size: 16px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🎥</a>
                        </div>
                        <div style="font-size: 12px; color: #00ff88; margin-top: 4px; font-weight: bold;">${ex.sets}x ${safeTarget}</div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="FitApp.openSwapModal(${bIndex}, ${eIndex})" style="background: #333; border: none; color: #fff; padding: 6px 10px; border-radius: 4px; cursor: pointer;">🔄</button>
                        <button onclick="FitApp.removeExercise(${bIndex}, ${eIndex})" style="background: #333; border: none; color: #ff4d4d; padding: 6px 10px; border-radius: 4px; cursor: pointer;">❌</button>
                    </div>
                `;
                list.appendChild(item);
            });
        });
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
        
        const chips = document.querySelectorAll('.filter-chip');
        chips.forEach(chip => {
            chip.style.background = '#2a2a2a';
            chip.style.color = '#aaa';
            chip.style.borderColor = '#444';
        });
        
        btnElement.style.background = 'rgba(166, 77, 255, 0.2)';
        btnElement.style.color = '#a64dff';
        btnElement.style.borderColor = '#a64dff';

        filterAddModal(); 
    }

    function filterAddModal() {
        const query = document.getElementById('searchAddInput').value.toLowerCase();
        const list = document.getElementById('addExerciseList');
        list.innerHTML = '';
        
        const filtered = dictionaryData.filter(d => {
            const matchesText = d.name.toLowerCase().includes(query) || d.focus.toLowerCase().includes(query);
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
        const profile = els.profileSelector ? els.profileSelector.value : 'masculino'; // NOVO: Leitura do Perfil
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
                if(nameInput) nameInput.value = ''; 
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
            // NOVO: Roteamento tático de múltiplos bancos de dados
            let activeDB = dbWorkouts;
            let profileLabel = '👨 Padrão';
            
            if (profile === 'feminino') {
                activeDB = dbWorkoutsFeminino;
                profileLabel = '👩 Foco Inferiores';
            } else if (profile === 'tatico') {
                activeDB = dbWorkoutsTatico;
                profileLabel = '⚽ Tático (Society)';
            }
            
            currentRoutine = JSON.parse(JSON.stringify(activeDB[style][level][type] || activeDB['biset']['intermediario']['A']));
            
            if(preview) {
                document.getElementById('previewTitle').textContent = `Treino ${type}`;
                const styleName = style === 'biset' ? 'Modo Bi-set' : 'Modo Tradicional';
                document.getElementById('previewDesc').textContent = `${styleName} - Nível ${level.charAt(0).toUpperCase() + level.slice(1)} | ${profileLabel}`;
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

    let snapActive = false; // Memória tática da aposta

    function beginWorkoutExecution() {
        // Intercepta o clique de iniciar e bloqueia a tela
        document.getElementById('snapModal').style.display = 'flex';
        if(audioEnabled) speak("Atenção. Oportunidade de evolução detectada. Aceita o desafio?");
    }

    function acceptSnap() {
        document.getElementById('snapModal').style.display = 'none';
        snapActive = true;
        showToast("Contrato selado. Mostre sua força.");
        if(audioEnabled) speak("Contrato selado. Iniciando protocolo de combate.");
        executeWorkoutStart();
    }

    function declineSnap() {
        document.getElementById('snapModal').style.display = 'none';
        snapActive = false;
        showToast("Treino padrão iniciado.");
        executeWorkoutStart();
    }

    // A função original que realmente inicia o cronômetro
    function executeWorkoutStart() {
        isWorkoutActive = true; 
        
        document.getElementById('workoutPreview').style.display = 'none';
        els.workoutArea.style.display = 'block'; 
        els.btnFinishArea.style.display = 'block';

        // ATIVA MODO FOCO: Oculta o Menu Inferior
        const navBar = document.querySelector('nav');
        if(navBar) navBar.style.display = 'none';

        workoutStartTime = Date.now();
        if (globalTimer) clearInterval(globalTimer);
        globalTimer = setInterval(updateGlobalTimer, 1000);
        updateGlobalTimer(); 

        renderCurrentRoutine();
        saveWorkoutState(); 
    }

    function renderCurrentRoutine() {
        els.exerciseList.innerHTML = ''; 
        totalSets = 0; 
        checkedSets = 0; 
        todayLog = [];
        
        // NOVO: Spotter Digital (Motor de Busca do Histórico)
        const historyLog = JSON.parse(safeGet('fitapp_week_log') || '[]');
        
        currentRoutine.forEach((bloco, bIndex) => {
            const isBiset = bloco.exercises.length > 1;
            const cardClass = isBiset ? 'biset-card' : 'tradicional-card'; 
            
            const card = document.createElement('div'); card.className = cardClass; 
            if (!isBiset) card.style.borderLeft = '4px solid #44aaff'; 
            
            card.innerHTML = `<div class="biset-title">${bloco.title}</div>`;
            
            bloco.exercises.forEach((ex, eIndex) => {
                const blockDiv = document.createElement('div'); blockDiv.className = 'exercise-block';
                const linkIcon = (isBiset && eIndex < bloco.exercises.length - 1) ? ' <span style="color:#00ff88;">🔗</span>' : '';
                
                // Higienização
                const safeName = escapeHTML(ex.name);
                const safeTarget = escapeHTML(ex.target);
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;
                
                const savedNotes = ex.notes ? escapeHTML(ex.notes) : '';
                
                // NOVO: Spotter Digital (Cálculo da Progressão Preditiva)
                let aiSuggestionHTML = '';
                // Busca de trás pra frente (mais recente primeiro)
                const lastWorkoutMatch = historyLog.slice().reverse().find(log => 
                    log.data && log.data.some(d => d.exercise === ex.name)
                );

                if (lastWorkoutMatch) {
                    // Pega a carga e repetições da ÚLTIMA SÉRIE desse exercício no treino passado
                    const lastSets = lastWorkoutMatch.data.filter(d => d.exercise === ex.name);
                    if (lastSets.length > 0) {
                        const finalSet = lastSets[lastSets.length - 1]; 
                        let suggestedKg = parseFloat(finalSet.kg) || 0;
                        const repsDone = parseInt(finalSet.reps) || 0;
                        
                        // Extrai a meta do formato "10-12 rep" ou "12"
                        const targetStr = ex.target.replace(/[^0-9-]/g, '');
                        let targetHigh = parseInt(targetStr.split('-').pop()) || 10; // Pega o limite superior
                        
                        // REGRA: Se bateu o teto de repetições, IA sugere progressão de +2kg
                        if (repsDone >= targetHigh && suggestedKg > 0) {
                            suggestedKg += 2;
                        }
                        
                        if (suggestedKg > 0) {
                            aiSuggestionHTML = `<span style="font-size: 10px; background: rgba(166, 77, 255, 0.2); color: #a64dff; padding: 2px 6px; border-radius: 4px; border: 1px solid #a64dff; font-weight: bold; margin-right: auto;" title="Sugestão baseada no seu último treino">🎯 Alvo IA: ${suggestedKg}kg</span>`;
                        }
                    }
                }
                
                blockDiv.innerHTML = `
                    <div class="exercise-header">
                        <span class="ex-name" onclick="FitApp.openDict('${safeName.replace(/'/g, "\\'")}')">${safeName}${linkIcon}</span>
                        <div class="ex-controls" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            ${aiSuggestionHTML}
                            <!-- NOVO: Controles de Edição de Série Dinâmica -->
                            <div style="display: flex; align-items: center; background: #222; border-radius: 12px; padding: 2px 6px; border: 1px solid #444;">
                                <button class="btn-edit-set" onclick="FitApp.changeSets(${bIndex}, ${eIndex}, -1)" style="background: none; border: none; color: #ff4444; font-weight: bold; font-size: 16px; padding: 0 5px; cursor: pointer;">-</button>
                                <span style="font-size: 12px; color: #ccc; margin: 0 5px;">${ex.sets}x</span>
                                <button class="btn-edit-set" onclick="FitApp.changeSets(${bIndex}, ${eIndex}, 1)" style="background: none; border: none; color: #00ff88; font-weight: bold; font-size: 16px; padding: 0 5px; cursor: pointer;">+</button>
                            </div>
                            <!-- NOVO: Botão Piloto Automático -->
                            <button id="btnAuto_${bIndex}_${eIndex}" onclick="FitApp.toggleAutoPilot(${bIndex}, ${eIndex})" style="background: rgba(0, 255, 136, 0.1); border: 1px solid #00ff88; color: #00ff88; border-radius: 8px; padding: 4px 8px; font-size: 12px; font-weight: bold; cursor: pointer; margin-left: 5px; transition: all 0.2s;" title="Modo Hands-Free">🤖 Auto</button>
                            
                            <button class="btn-notes" style="background: none; border: none; cursor: pointer; font-size: 16px; padding: 0;" title="Log de Combate (Anotações)">📝</button>
                            <a href="${ytLink}" target="_blank" style="text-decoration: none; font-size: 18px;" title="Ver execução no YouTube">🎥</a>
                            <span class="target-reps">${safeTarget}</span>
                            <button class="btn-swap" onclick="FitApp.openSwapModal(${bIndex}, ${eIndex})" title="Substituir Exercício">🔄</button>
                        </div>
                    </div>
                    <div class="notes-container" style="display: none; background: #1a1a1a; padding: 10px; border-radius: 6px; border-left: 2px solid #a64dff; margin-bottom: 12px; margin-top: 5px;">
                        <textarea class="ex-notes-input" placeholder="Anotações táticas (ex: banco inclinado no nível 3, fadiga no ombro...)" style="width: 100%; background: transparent; border: none; color: #ccc; font-size: 12px; resize: vertical; min-height: 45px; outline: none;">${savedNotes}</textarea>
                    </div>`;
                
                // Motor de Eventos da Sanfona de Anotações
                const btnNotes = blockDiv.querySelector('.btn-notes');
                const notesContainer = blockDiv.querySelector('.notes-container');
                const notesInput = blockDiv.querySelector('.ex-notes-input');

                btnNotes.addEventListener('click', () => {
                    const isHidden = notesContainer.style.display === 'none';
                    notesContainer.style.display = isHidden ? 'block' : 'none';
                    if (isHidden) notesInput.focus();
                });

                notesInput.addEventListener('input', () => {
                    ex.notes = notesInput.value;
                    saveWorkoutState(); 
                });

                if (!ex.setsData) ex.setsData = [];
                
                for(let s = 1; s <= ex.sets; s++) {
                    totalSets++; 
                    const data = ex.setsData[s-1] || { kg: '', reps: '', checked: false };
                    
                    if (data.checked) {
                        checkedSets++;
                        todayLog.push({ exercise: ex.name, set: s, kg: parseSafeFloat(data.kg), reps: parseInt(data.reps) || 0 });
                    }

                    const row = document.createElement('div'); row.className = 'set-row';
                    
                    // NOVO: Criando uma "Dog Tag" única para que o Piloto Automático localize o alvo
                    const chkId = `chk_set_${bIndex}_${eIndex}_${s}`;
                    row.innerHTML = `<div class="set-label">S${s}</div><input type="number" class="kg-val" placeholder="Kg" value="${data.kg}"><input type="number" class="rp-val" placeholder="Reps / s" value="${data.reps}"><button class="btn-iso" style="background:none; border:none; cursor:pointer; font-size:16px; padding:0 5px;" title="Iniciar Isometria">⏱️</button><input type="checkbox" id="${chkId}" class="chk-set" ${data.checked ? 'checked' : ''}>`;
                    
                    const chk = row.querySelector('.chk-set');
                    const kgInp = row.querySelector('.kg-val');
                    const rpInp = row.querySelector('.rp-val');
                    const btnIso = row.querySelector('.btn-iso'); 

                    const updateState = () => {
                        ex.setsData[s-1] = { kg: kgInp.value, reps: rpInp.value, checked: chk.checked };
                        saveWorkoutState(); 
                    };

                    let localIsoTimer = null;
                    btnIso.addEventListener('click', () => {
                        if (localIsoTimer) {
                            clearInterval(localIsoTimer);
                            localIsoTimer = null;
                            btnIso.textContent = '⏱️';
                            btnIso.style.textShadow = 'none';
                        } else {
                            btnIso.textContent = '⏸️';
                            btnIso.style.textShadow = '0 0 8px #00ff88';
                            let currentSecs = parseInt(rpInp.value) || 0;
                            localIsoTimer = setInterval(() => {
                                currentSecs++;
                                rpInp.value = currentSecs;
                                updateState(); 
                            }, 1000);
                        }
                    });

                    kgInp.addEventListener('input', updateState);
                    rpInp.addEventListener('input', updateState);

                    chk.addEventListener('change', () => {
                        if (localIsoTimer) {
                            clearInterval(localIsoTimer);
                            localIsoTimer = null;
                            btnIso.textContent = '⏱️';
                            btnIso.style.textShadow = 'none';
                        }
                        
                        if (chk.checked) { 
                            checkedSets++; 
                            // O cronômetro agora recebe 'blockDiv' como alvo para nascer debaixo da série
                            if(checkedSets < totalSets) startRestTimer(blockDiv);
                            todayLog.push({ exercise: ex.name, set: s, kg: parseSafeFloat(kgInp.value), reps: parseInt(rpInp.value) || 0 });
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
        stopRestTimer(); // NOVO: Garante a destruição do cronômetro ao sair da tela de combate
        
        const isComplete = checkedSets === totalSets;
        const tipoTreino = currentWorkoutType; 
        
        const d = new Date();
        const offset = d.getTimezoneOffset() * 60000;
        const dataHoje = (new Date(d.getTime() - offset)).toISOString().split('T')[0];
        
        let totalTimeSecs = 0;
        if (workoutStartTime) {
            totalTimeSecs = Math.floor((Date.now() - workoutStartTime) / 1000);
            clearInterval(globalTimer);
            workoutStartTime = null;
        }

        const payload = { date: dataHoje, tipo: tipoTreino, duration_secs: totalTimeSecs, data: todayLog };

        try {
            document.getElementById('btnFinishAction').textContent = "⏳ Salvando...";
            await FitAPI.salvarTreino(payload);
        } catch (error) {
            let syncQueue = JSON.parse(safeGet('fitapp_sync_queue') || '[]');
            syncQueue.push(payload);
            safeSet('fitapp_sync_queue', JSON.stringify(syncQueue));
            showToast("Modo offline ativo. Treino salvo na fila de sincronização."); 
        }

        let weekLog = JSON.parse(safeGet('fitapp_week_log') || '[]');
        weekLog.push(payload);

        if (weekLog.length > 100) {
            weekLog = weekLog.slice(-100); 
        }

        safeSet('fitapp_week_log', JSON.stringify(weekLog));
        clearWorkoutState(); 

        els.workoutArea.style.display = 'none'; 
        els.btnFinishArea.style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        
        // DESATIVA MODO FOCO: Devolve o Menu Inferior
        const navBar = document.querySelector('nav');
        if(navBar) navBar.style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';

        currentWorkoutType = '';
        checkSequence(); 
        renderWeeklyCalendar(); 
        if (typeof renderMetricsChart === 'function') renderMetricsChart(); 

        if(isComplete) { FitGamification.showPackModal(snapActive); snapActive = false; } else { showToast('Treino salvo no sistema.'); switchTab('tab-evolucao', 'nav-evolucao'); }
    }

    async function fetchAIFeedback() {
        document.getElementById('aiLoader').style.display = 'block';
        document.getElementById('aiResponse').style.display = 'none';
        document.getElementById('btnAnalyzeAI').disabled = true;

        try {
            const data = await FitAPI.getCoachFeedback();
            
            document.getElementById('aiResponse').innerHTML = `<strong>Feedback do Coach:</strong><br>${data.feedback}`;
            document.getElementById('aiResponse').style.display = 'block';
            if(audioEnabled) speak("Análise concluída.");
        } catch (error) { showToast("Erro ao contatar o servidor."); } 
        finally { document.getElementById('aiLoader').style.display = 'none'; document.getElementById('btnAnalyzeAI').disabled = false; }
    }

    function renderLibrary() {
        const grid = document.getElementById('libraryGrid');
        if (!grid) return;
        grid.innerHTML = '';

        const groups = {};
        dictionaryData.forEach(item => {
            const groupName = getMuscleGroup(item.focus);
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(item);
        });

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
            
            header.style.cursor = 'pointer';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.innerHTML = `<span>${title}</span><span style="font-size: 14px; color: #888; transition: transform 0.3s;">▼</span>`;
            categorySection.appendChild(header);

            const cardContainer = document.createElement('div');
            cardContainer.className = 'library-card-container';
            cardContainer.style.display = 'grid'; 
            cardContainer.style.gap = '15px';
            
            header.onclick = () => {
                const isVisible = cardContainer.style.display === 'grid';
                cardContainer.style.display = isVisible ? 'none' : 'grid';
                header.querySelector('span:last-child').style.transform = isVisible ? 'rotate(-90deg)' : 'rotate(0deg)';
            };

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
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        const query = searchInput.value.toLowerCase();
        const grid = document.getElementById('libraryGrid');
        if (!grid) return;
        grid.innerHTML = '';

        const groups = {
            'Peito': [], 'Costas': [], 'Pernas': [], 'Ombros': [], 
            'Tríceps': [], 'Bíceps': [], 'Core': [], 'Mobilidade / Cardio': [], 'Outros': []
        };

        const groupIcons = {
            'Peito': '🦍', 'Costas': '🛡️', 'Pernas': '🦵', 'Ombros': '🥥', 
            'Tríceps': '🐎', 'Bíceps': '💪', 'Core': '🧱', 'Mobilidade / Cardio': '🏃', 'Outros': '🔧'
        };

        dictionaryData.forEach(ex => {
            if (query && !ex.name.toLowerCase().includes(query) && !ex.focus.toLowerCase().includes(query)) return;
            
            const focusLow = ex.focus.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            let cat = 'Outros';
            
            if (focusLow.includes('peito') || focusLow.includes('peitoral')) cat = 'Peito';
            else if (focusLow.includes('costa') || focusLow.includes('dorsal') || focusLow.includes('lombar')) cat = 'Costas';
            else if (focusLow.includes('perna') || focusLow.includes('gluteo') || focusLow.includes('panturrilha') || focusLow.includes('quadriceps') || focusLow.includes('posterior') || focusLow.includes('adutor') || focusLow.includes('abdutor') || focusLow.includes('coxa')) cat = 'Pernas';
            else if (focusLow.includes('ombro') || focusLow.includes('deltoide') || focusLow.includes('trapezio')) cat = 'Ombros';
            else if (focusLow.includes('triceps')) cat = 'Tríceps';
            else if (focusLow.includes('biceps') || focusLow.includes('antebraco')) cat = 'Bíceps';
            else if (focusLow.includes('core') || focusLow.includes('abdom') || focusLow.includes('obliquo')) cat = 'Core';
            else if (focusLow.includes('mobilidade') || focusLow.includes('cardio')) cat = 'Mobilidade / Cardio';
            
            groups[cat].push(ex);
        });

        for (const [groupName, exercises] of Object.entries(groups)) {
            if (exercises.length === 0) continue;

            const groupContainer = document.createElement('div');
            groupContainer.style.marginBottom = '10px';
            groupContainer.style.background = '#1e1e1e';
            groupContainer.style.borderRadius = '8px';
            groupContainer.style.border = '1px solid #333';
            groupContainer.style.overflow = 'hidden';

            const header = document.createElement('div');
            header.style.padding = '15px';
            header.style.background = '#2a2a2a';
            header.style.cursor = 'pointer';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.fontWeight = 'bold';
            header.style.color = '#a64dff';
            
            const isOpen = query.length > 0;
            const icon = groupIcons[groupName] || '🏋️';
            header.innerHTML = `<span style="display: flex; align-items: center; gap: 8px;"><span style="font-size: 18px;">${icon}</span> ${groupName} <span style="color: #666; font-size: 12px; font-weight: normal;">(${exercises.length})</span></span> <span style="transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.3s; color: #fff;">▼</span>`;
            
            const listContainer = document.createElement('div');
            listContainer.style.display = isOpen ? 'block' : 'none';
            listContainer.style.padding = '10px';
            listContainer.style.background = '#151515';

            header.onclick = () => {
                const isCurrentlyOpen = listContainer.style.display === 'block';
                listContainer.style.display = isCurrentlyOpen ? 'none' : 'block';
                header.querySelector('span:last-child').style.transform = isCurrentlyOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            };

            exercises.forEach(ex => {
                const exDiv = document.createElement('div');
                exDiv.style.background = '#111';
                exDiv.style.padding = '12px';
                exDiv.style.marginBottom = '8px';
                exDiv.style.borderRadius = '6px';
                exDiv.style.border = '1px solid #444';
                
                let equipIcon = "🏋️";
                if(ex.equip === "peso_corporal") equipIcon = "🏠";
                if(ex.equip === "calistenia") equipIcon = "🏖️";
                if(ex.equip === "cabo") equipIcon = "⛓️";

                const ytQuery = encodeURIComponent(`Como executar o exercício ${ex.name}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;

                exDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div style="flex: 1; padding-right: 10px;">
                            <div style="font-weight: bold; color: #fff; font-size: 14px; margin-bottom: 5px;">
                                ${ex.name}
                            </div>
                            <div style="font-size: 11px; color: #aaa; margin-bottom: 8px;">${ex.desc}</div>
                            <span style="font-size: 10px; background: #333; padding: 2px 6px; border-radius: 4px; color: #00ff88;">${ex.focus}</span>
                            <span style="font-size: 10px; background: #333; padding: 2px 6px; border-radius: 4px; color: #aaa; margin-left: 5px;">${equipIcon} ${ex.equip ? ex.equip.replace('_', ' ') : 'academia'}</span>
                        </div>
                        <a href="${ytLink}" target="_blank" style="text-decoration: none; font-size: 22px; padding: 8px; background: rgba(255, 0, 0, 0.1); border-radius: 6px; border: 1px solid rgba(255,0,0,0.3); transition: all 0.2s; display: flex; align-items: center; justify-content: center;" title="Ver no YouTube">🎥</a>
                    </div>
                `;
                listContainer.appendChild(exDiv);
            });

            groupContainer.appendChild(header);
            groupContainer.appendChild(listContainer);
            grid.appendChild(groupContainer);
        }
    }

    function switchTab(tabId, navId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        document.getElementById(tabId).classList.add('active'); document.getElementById(navId).classList.add('active');
        
        // Distribuição tática das renderizações
        if (tabId === 'tab-arena') FitGamification.loadLeaderboard(); // Injeta o carregamento do Ranking
        if (tabId === 'tab-conquistas') FitGamification.renderAlbum();
        if (tabId === 'tab-evolucao') {
            renderWeeklyCalendar();
            if (typeof renderMetricsChart === 'function') renderMetricsChart();
        }
        if (tabId === 'tab-biblioteca') filterLibrary();
        if (tabId === 'tab-treino') {
            if (!currentWorkoutType) {
                document.getElementById('workoutCards').style.display = 'flex';
                // Remove o comportamento de esconder/mostrar o cabeçalho (que agora está na aba Perfil)
                els.workoutArea.style.display = 'none';
                els.btnFinishArea.style.display = 'none';
                checkSequence();
            }
        }
    }

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
            customId = parseInt(currentWorkoutType.split('_')[1]);
        } else {
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
            savedCustoms[existingIndex] = workoutData; 
        } else {
            savedCustoms.push(workoutData); 
        }
        
        safeSet('fitapp_custom_workouts', JSON.stringify(savedCustoms));
        
        renderCustomWorkouts();
        showToast(`Template "${name}" salvo.`);
        if(audioEnabled) speak("Template customizado salvo no sistema.");

        if (typeof filaDeTreinosIA !== 'undefined' && filaDeTreinosIA.length > 0) {
            currentWorkoutType = 'novo_customizado';
            carregarProximoTreinoIA(); 
        } else {
            const botoes = document.querySelectorAll('button');
            botoes.forEach(btn => { 
                if(btn.innerText.includes('Salvar e Revisar') || btn.innerText.includes('Salvar Template Final')) {
                    btn.innerText = 'Salvar Template'; 
                }
            });
            cancelWorkoutPreview(); 
        }
    }

    function deleteCustomWorkout(id, event) {
        event.stopPropagation(); 
        if(!confirm('Atenção: Tem certeza que deseja excluir este template?')) return;
        
        let savedCustoms = JSON.parse(safeGet('fitapp_custom_workouts') || '[]');
        savedCustoms = savedCustoms.filter(w => w.id !== id);
        safeSet('fitapp_custom_workouts', JSON.stringify(savedCustoms));
        
        renderCustomWorkouts();
        showToast('Template excluído da base.');
    }

    function openHistoryModal() {
        document.getElementById('historyModal').style.display = 'flex';
        switchHistoryTab('list'); 
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

        history.slice().reverse().forEach((log) => {
            const dateObj = new Date(log.date + 'T12:00:00'); 
            const dateStr = dateObj.toLocaleDateString('pt-BR');
            const durationStr = log.duration_secs ? Math.floor(log.duration_secs / 60) + ' min' : '--';
            
            const block = document.createElement('div');
            block.style.background = '#2a2a2a';
            block.style.borderRadius = '8px';
            block.style.marginBottom = '10px';
            block.style.border = '1px solid #333';

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
                dayCell.style.boxShadow = 'inset 0 0 0 2px #a64dff'; 
            }
            
            dayCell.textContent = day;
            grid.appendChild(dayCell);
        }
        
        container.appendChild(grid);
    }

    function openImportAiModal() {
        document.getElementById('importAiModal').style.display = 'flex';
        const nameInput = document.getElementById('aiWorkoutName');
        const textInput = document.getElementById('aiWorkoutText');
        if (nameInput) nameInput.value = '';
        if (textInput) textInput.value = '';
    }

    async function processWorkoutWithAI() {
        const days = document.getElementById('aiDays').value;
        const env = document.getElementById('aiEnv').value;
        const workoutName = document.getElementById('aiWorkoutName').value || `Rotina IA (${days} Dias)`;
        const pastedText = document.getElementById('aiWorkoutText').value.trim();
        
        const loader = document.getElementById('aiImportLoader');
        const btn = document.getElementById('btnProcessAi');
        
        loader.style.display = 'block';
        btn.disabled = true;
        
        let megaPrompt = "";

        if (pastedText !== "") {
            megaPrompt = `
            O usuário quer importar este treino:
            "${pastedText}"
            
            Se for apenas um dia de treino, chame-o de "${workoutName}".
            Retorne APENAS um JSON válido.
            `;
        } else {
            const allowedExercises = dictionaryData.filter(d => {
                if (env === 'academia') return true; 
                if (env === 'calistenia') return d.equip === 'peso_corporal' || d.equip === 'calistenia';
                return d.equip === 'peso_corporal';
            }).map(d => d.name).join(", ");
            
            megaPrompt = `
            Crie uma rotina de treino de ${days} dias. 
            REGRA ABSOLUTA: Você SÓ PODE usar os exercícios exatos desta lista abaixo. Não invente nenhum outro nome.
            LISTA PERMITIDA: [${allowedExercises}].
            
            Para cada dia, escolha de 5 a 6 exercícios coerentes com o grupamento muscular do dia.
            Defina séries lógicas (ex: 3 ou 4) e repetições de hipertrofia (ex: 8-12).
            Retorne APENAS o JSON válido.
            `;
        }

        try {
            const data = await FitAPI.importarTreinoIA(megaPrompt);
            
            if (data.resultado && data.resultado !== "[]") {
                const parsed = JSON.parse(data.resultado);
                currentWorkoutType = 'custom_ia'; 
                
                currentRoutine = parsed.map((dia, index) => {
                    const idLetra = String.fromCharCode(65 + index); 
                    return {
                        title: pastedText === "" && days > 1 ? `Treino ${idLetra} - ${dia.nome_treino}` : dia.nome_treino,
                        exercises: dia.exercicios.map(ex => ({ name: ex.nome, sets: parseInt(ex.series) || 4, target: ex.repeticoes || "10-12 rep" }))
                    };
                });
                
                document.getElementById('importAiModal').style.display = 'none';
                
                const customControls = document.getElementById('customWorkoutControls');
                const nameContainer = document.getElementById('customWorkoutNameContainer');
                const nameInput = document.getElementById('customWorkoutName');
                
                if(customControls) customControls.style.display = 'flex';
                if(nameContainer) nameContainer.style.display = 'block';
                if(nameInput) nameInput.value = workoutName;
                
                document.getElementById('previewTitle').textContent = pastedText ? `🤖 Treino Importado` : `🤖 Periodização Criada`;
                document.getElementById('previewDesc').textContent = `Revise os movimentos. Clique em 'Salvar Template' para guardá-lo permanentemente na sua estante.`;
                
                const workoutCards = document.getElementById('workoutCards');
                if (workoutCards) workoutCards.style.display = 'none';
                
                const dashHeader = document.querySelector('.dashboard-header');
                if (dashHeader) dashHeader.style.display = 'none';
                
                const workoutPreview = document.getElementById('workoutPreview');
                if (workoutPreview) workoutPreview.style.display = 'block';

                renderPreviewList();
                showToast("A inteligência artificial processou os dados com sucesso!");
                
                document.getElementById('aiWorkoutText').value = "";
                document.getElementById('aiWorkoutName').value = "";
            } else {
                showToast("Falha na geração do treino. Tente novamente.");
            }
        } catch (error) {
            console.error(error);
            showToast("Erro de conexão com o servidor de IA.");
        } finally {
            loader.style.display = 'none';
            btn.disabled = false;
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

    function adaptWorkoutToHome() {
    const envChoice = document.getElementById('envSelector') ? document.getElementById('envSelector').value : 'casa';
    const allowedEquips = envChoice === 'praia' ? ['peso_corporal', 'calistenia'] : ['peso_corporal'];
    const preferredEquip = envChoice === 'praia' ? 'calistenia' : 'peso_corporal';
    
    let changed = 0;
    let usedSubstitutes = []; 
    
    const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const getBroadGroup = (focusString) => {
        if (!focusString) return 'geral';
        const f = removeAccents(focusString);
        if (f.includes('peito')) return 'peito';
        if (f.includes('costa') || f.includes('dorsal') || f.includes('lombar')) return 'costas';
        if (f.includes('perna') || f.includes('quadriceps') || f.includes('gluteo') || f.includes('posterior') || f.includes('panturrilha') || f.includes('adutor') || f.includes('abdutor') || f.includes('coxa')) return 'pernas';
        if (f.includes('ombro') || f.includes('deltoide') || f.includes('trapezio')) return 'ombro';
        if (f.includes('triceps')) return 'triceps';
        if (f.includes('biceps') || f.includes('antebraco')) return 'biceps';
        if (f.includes('core') || f.includes('abdom') || f.includes('obliquo')) return 'core';
        return 'geral';
    };
    
    currentRoutine.forEach(bloco => {
        bloco.exercises.forEach(ex => {
            const dictItem = dictionaryData.find(d => d.name === ex.name);
            
            if (dictItem) {
                const isForbidden = !allowedEquips.includes(dictItem.equip);
                const canUpgradeToCalisthenics = (envChoice === 'praia' && dictItem.equip === 'peso_corporal');
                
                if (isForbidden || canUpgradeToCalisthenics) {
                    const targetGroup = getBroadGroup(dictItem.focus);
                    
                    let pool = dictionaryData.filter(d => 
                        getBroadGroup(d.focus) === targetGroup && 
                        d.equip === preferredEquip &&
                        !usedSubstitutes.includes(d.name)
                    );
                    
                    if (pool.length === 0) {
                        pool = dictionaryData.filter(d => 
                            getBroadGroup(d.focus) === targetGroup && 
                            allowedEquips.includes(d.equip) &&
                            !usedSubstitutes.includes(d.name)
                        );
                    }
                    
                    if (pool.length === 0) {
                        pool = dictionaryData.filter(d => getBroadGroup(d.focus) === targetGroup && allowedEquips.includes(d.equip));
                    }
                    
                    if (pool.length > 0) {
                        const newEx = pool[Math.floor(Math.random() * pool.length)];
                        if (ex.name !== newEx.name) {
                            ex.name = newEx.name;
                            usedSubstitutes.push(newEx.name); 
                            changed++;
                        }
                    }
                }
            }
        });
    });
    
    if (changed > 0) {
            const nameInput = document.getElementById('customWorkoutName');
            const envName = envChoice === 'praia' ? 'Praia/Praça' : 'Quarto/Casa';
            
            // Trava de conversão para modo Livre
            if (currentWorkoutType !== 'Livre' && !currentWorkoutType.startsWith('custom_')) {
                currentWorkoutType = 'Livre';
                const customControls = document.getElementById('customWorkoutControls');
                const nameContainer = document.getElementById('customWorkoutNameContainer');
                
                if(customControls) customControls.style.display = 'flex';
                if(nameContainer) nameContainer.style.display = 'block';
            }
            
            // A atualização do nome agora ocorre livremente fora da trava
            if(nameInput) nameInput.value = `Treino Adaptado (${envName})`;
            
            document.getElementById('previewTitle').textContent = `⚡ Adaptação Concluída`;
            document.getElementById('previewDesc').textContent = `${changed} exercícios alterados para o terreno: ${envName}.`;
            renderPreviewList();
            
            if(typeof audioEnabled !== 'undefined' && audioEnabled) speak("Protocolo de ambiente executado.");
            showToast(`Adaptação para ${envName} aplicada!`);
        } else {
            const envName = envChoice === 'praia' ? 'Praia/Praça' : 'Quarto/Casa';
            showToast(`A rotina já está alinhada para ${envName}. Mude o seletor para trocar.`);
        }
    }

    async function syncOfflineWorkouts() {
        let syncQueue = JSON.parse(safeGet('fitapp_sync_queue') || '[]');
        if (syncQueue.length === 0) return;

        console.log(`Iniciando sincronização de ${syncQueue.length} treinos pendentes...`);
        showToast("Sincronizando treinos pendentes com a nuvem...");

        let remainingQueue = [];

        for (let i = 0; i < syncQueue.length; i++) {
            const payload = syncQueue[i];
            try {
                await FitAPI.salvarTreino(payload);
                console.log(`Treino de ${payload.date} sincronizado com sucesso.`);
            } catch (error) {
                console.warn("Rede instável. Sincronização interrompida.");
                remainingQueue = syncQueue.slice(i);
                break; 
            }
        }

        safeSet('fitapp_sync_queue', JSON.stringify(remainingQueue));
        
        if (remainingQueue.length === 0) {
            showToast("Sincronização concluída! Dados atualizados.");
            if(audioEnabled) speak("Base de dados sincronizada com a nuvem.");
        }
    }

function renderMetricsChart() {
        const ctx = document.getElementById('metricsChart');
        const container = document.getElementById('metricsContainer');
        if (!ctx || !container) return;

        // Resgata o histórico do banco de dados local
        let history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        
        // Se houver menos de 2 treinos, o gráfico não tem o que comparar, então fica oculto
        if (history.length < 2) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';

        // Filtra apenas os últimos 7 treinos para não espremer o gráfico no celular
        const recentHistory = history.slice(-7);
        
        // Extrai as datas para o eixo X
        const labels = recentHistory.map(h => {
            const dateObj = new Date(h.date + 'T12:00:00');
            return dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        });

        // Calcula o Volume Total (Carga x Repetições) para o eixo Y
        const dataPoints = recentHistory.map(h => {
            let volume = 0;
            if (h.data && h.data.length > 0) {
                h.data.forEach(set => {
                    volume += (parseFloat(set.kg) || 0) * (parseInt(set.reps) || 0);
                });
            }
            return volume;
        });

        // Destrói o gráfico anterior caso ele já exista para evitar sobreposição
        if (metricsChartInstance) {
            metricsChartInstance.destroy();
        }

        // Constrói o novo gráfico de elite
        metricsChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Volume Total (Kg x Reps)',
                    data: dataPoints,
                    borderColor: '#a64dff', // Roxo elétrico da nossa identidade
                    backgroundColor: 'rgba(166, 77, 255, 0.2)', // Fundo de vidro translúcido
                    borderWidth: 3,
                    pointBackgroundColor: '#00ff88', // Ponto verde neon
                    pointBorderColor: '#00ff88',
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.4 // Curvatura suave e futurista
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: '#00ff88',
                        bodyColor: '#fff',
                        borderColor: '#a64dff',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#888' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#888' }
                    }
                }
            }
        });
    }
    
    function init() {
        els.profileSelector = document.getElementById('profileSelector'); // NOVO: Mapeamento do Perfil
        els.styleSelector = document.getElementById('styleSelector');
        els.levelSelector = document.getElementById('levelSelector'); 
        els.workoutArea = document.getElementById('workoutArea'); 
        els.exerciseList = document.getElementById('exerciseList');
        els.progressBar = document.getElementById('progressBar'); 
        els.btnFinishArea = document.getElementById('btnFinishArea');
        els.toast = document.getElementById('toast');

        window.addEventListener('online', syncOfflineWorkouts);
        syncOfflineWorkouts();

        // NOVO: Resgata o perfil salvo no cache do celular
        const savedProfile = safeGet('fitapp_profile');
        if (savedProfile && els.profileSelector) els.profileSelector.value = savedProfile;

        const savedStyle = safeGet('fitapp_style');
        if (savedStyle && els.styleSelector) els.styleSelector.value = savedStyle;
        
        const savedLevel = safeGet('fitapp_level');
        if (savedLevel && els.levelSelector) els.levelSelector.value = savedLevel;

        // Mapeia todas as 6 abas da nova arquitetura (incluindo a Arena)
        ['treino', 'evolucao', 'conquistas', 'arena', 'biblioteca', 'perfil'].forEach(tab => { 
            const navBtn = document.getElementById(`nav-${tab}`);
            if (navBtn) navBtn.addEventListener('click', () => switchTab(`tab-${tab}`, `nav-${tab}`)); 
        });
        
        // NOVO: Ouve as mudanças no seletor de perfil, salva e recarrega o treino
        if (els.profileSelector) els.profileSelector.addEventListener('change', () => {
            safeSet('fitapp_profile', els.profileSelector.value);
            if(currentWorkoutType) loadWorkout(); 
            showToast(els.profileSelector.value === 'feminino' ? 'Perfil Feminino ativado.' : 'Perfil Padrão ativado.');
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
        if (packEnvelope) packEnvelope.addEventListener('click', FitGamification.openPack);
        
        const btnClosePack = document.getElementById('btnClosePack');
        if (btnClosePack) btnClosePack.addEventListener('click', () => { 
            document.getElementById('packModal').style.display = 'none'; 
            switchTab('tab-evolucao', 'nav-evolucao');
        });
        
        checkSequence(); 
        FitGamification.renderAlbum();
        renderWeeklyCalendar(); 
        renderCustomWorkouts(); 
        if (typeof renderMetricsChart === 'function') renderMetricsChart();   
        
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
            
            // GARANTE O MODO FOCO: Caso a página seja recarregada no meio do treino
            const navBar = document.querySelector('nav');
            if(navBar) navBar.style.display = 'none';
            
            if (globalTimer) clearInterval(globalTimer);
            globalTimer = setInterval(updateGlobalTimer, 1000);
            updateGlobalTimer();
            
            renderCurrentRoutine(); 
            showToast('Treino em andamento restaurado.');
        }
    }
// --- NOVO: MOTOR DO PILOTO AUTOMÁTICO (HANDS-FREE) ---
    let autoBIndex = null, autoEIndex = null;
    let autoExec = 0, autoRest = 0;
    let autoTimeout = null;
    let isAutoActive = false;

    function toggleAutoPilot(bIndex, eIndex) {
        if (isAutoActive && autoBIndex === bIndex && autoEIndex === eIndex) {
            stopAutoPilot();
        } else {
            if (isAutoActive) stopAutoPilot(); // Aborta se estiver rodando em outro exercício
            autoBIndex = bIndex;
            autoEIndex = eIndex;
            document.getElementById('autoPilotModal').style.display = 'flex';
        }
    }

    function startAutoPilot() {
        autoExec = parseInt(document.getElementById('autoExecTime').value) || 40;
        autoRest = parseInt(document.getElementById('autoRestTime').value) || 45;
        
        document.getElementById('autoPilotModal').style.display = 'none';
        isAutoActive = true;
        
        const btn = document.getElementById(`btnAuto_${autoBIndex}_${autoEIndex}`);
        if (btn) {
            btn.innerHTML = '🛑 Parar';
            btn.style.color = '#ff4444';
            btn.style.borderColor = '#ff4444';
            btn.style.background = 'rgba(255, 68, 68, 0.1)';
        }
        
        if(audioEnabled) speak("Protocolo hands-free ativado. Prepare-se.");
        showToast("Modo Auto iniciado. Guarde o dispositivo.");
        
        // Timer de respiro de 3 segundos antes do combate iniciar
        autoTimeout = setTimeout(() => { executeAutoPhase(); }, 3000);
    }

    function executeAutoPhase() {
        if (!isAutoActive) return;
        
        const ex = currentRoutine[autoBIndex].exercises[autoEIndex];
        
        // Escaneia qual é a próxima série que ainda não foi concluída
        let nextSet = -1;
        for(let i = 0; i < ex.sets; i++) {
            if(!ex.setsData[i] || !ex.setsData[i].checked) {
                nextSet = i + 1;
                break;
            }
        }
        
        if (nextSet === -1) {
            stopAutoPilot();
            if(audioEnabled) speak("Ciclo de séries concluído com sucesso.");
            showToast("Automação finalizada. Alvo abatido.");
            return;
        }

        if(audioEnabled) speak("Ação.");
        showToast(`Auto: Executando Série ${nextSet}... (${autoExec}s)`);
        
        // Simula o tempo de execução físico do atleta
        autoTimeout = setTimeout(() => {
            if (!isAutoActive) return;
            
            // Localiza a caixa de seleção específica via ID e marca
            const chk = document.getElementById(`chk_set_${autoBIndex}_${autoEIndex}_${nextSet}`);
            if (chk && !chk.checked) {
                adjustRestTime(autoRest); // Seta o cronômetro para o tempo definido no Piloto
                chk.click(); // O clique fantasma dispara os alertas e o salvamento em nuvem
            }
            
            // Aguarda o término do descanso (+2s de margem de segurança para o áudio respirar)
            autoTimeout = setTimeout(() => {
                executeAutoPhase(); // Chama o loop novamente para a próxima série
            }, (autoRest + 2) * 1000);
            
        }, autoExec * 1000);
    }

    function stopAutoPilot() {
        isAutoActive = false;
        clearTimeout(autoTimeout);
        const btn = document.getElementById(`btnAuto_${autoBIndex}_${autoEIndex}`);
        if (btn) {
            btn.innerHTML = '🤖 Auto';
            btn.style.color = '#00ff88';
            btn.style.borderColor = '#00ff88';
            btn.style.background = 'rgba(0, 255, 136, 0.1)';
        }
        showToast("Piloto Automático desativado.");
    }   
    return { 
        init, filterLibrary, openSwapModal, confirmSwap, unlockAll, startWorkout,
        beginWorkoutExecution, acceptSnap, declineSnap, cancelWorkoutPreview, adaptWorkoutToHome,
        openAddExerciseModal, filterAddModal, confirmAddExercise, removeExercise, setCategoryFilter,
        adjustRestTime, changeSets, // NOVAS ENGRENAGENS
        toggleAutoPilot, startAutoPilot, stopAutoPilot, // Piloto Automático (Hands-Free)
        openHistoryModal, switchHistoryTab,
        saveCustomWorkout, deleteCustomWorkout,
        openImportAiModal, processWorkoutWithAI,
        safeGet, safeSet, showToast, speak,
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