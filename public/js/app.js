'use strict';

// NOVO: Sintetizador de Áudio Tático (Web Audio API)
const FitAudio = (() => {
    let audioCtx = null;
    function init() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }
    function playTone(freq, type, duration, vol = 0.1) {
        const btnAudio = document.getElementById('btnAudio');
        if (!btnAudio || !btnAudio.classList.contains('active')) return; // Respeita o botão de mudo
        init();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }
    return {
        beepShort: () => playTone(800, 'sine', 0.1, 0.2),
        beepLong: () => playTone(1200, 'sine', 0.6, 0.3),
        packRip: () => { playTone(150, 'sawtooth', 0.1, 0.1); setTimeout(() => playTone(200, 'sawtooth', 0.2, 0.1), 100); },
        revealNormal: () => { playTone(400, 'square', 0.1, 0.1); setTimeout(() => playTone(600, 'square', 0.3, 0.1), 100); },
        revealEpic: () => { playTone(600, 'square', 0.1, 0.1); setTimeout(() => playTone(800, 'square', 0.1, 0.1), 100); setTimeout(() => playTone(1200, 'square', 0.5, 0.15), 200); },
        repeated: () => { playTone(300, 'triangle', 0.2, 0.1); setTimeout(() => playTone(250, 'triangle', 0.4, 0.1), 200); },
        forge: () => { playTone(800, 'square', 0.05, 0.2); setTimeout(() => playTone(400, 'sawtooth', 0.3, 0.1), 50); }
    };
})();

var FitApp = (() => {
    let totalSets = 0, checkedSets = 0, audioEnabled = false, restTimer = null, currentRestTime = 60;
    let todayLog = [];
    let currentRoutine = []; 
    let currentWorkoutType = ''; 
    let filaDeTreinosIA = [];
    
    // Variáveis do Gráfico e Relógio Global
    let metricsChartInstance = null; // Obsoleto (mantido por segurança)
    let radarChartInstance = null;   // NOVO: Memória do Radar
    let isolationChartInstance = null; // NOVO: Memória do Gráfico de Isolamento
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

    // NOVO: Motor de Classificação Muscular Universal (Adaptado CSV)
    const getMuscleGroup = (item) => {
        const text = typeof item === 'string' ? item : (item.group || item.focus || '');
        if (!text) return 'outros';
        const g = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (g.includes('peito') || g.includes('peitoral')) return 'peito';
        if (g.includes('costa') || g.includes('dorsal') || g.includes('lombar') || g.includes('trapézio')) return 'costas';
        if (g.includes('perna') || g.includes('gluteo') || g.includes('panturrilha') || g.includes('quadriceps') || g.includes('isquio') || g.includes('adutor')) return 'pernas';
        if (g.includes('ombro') || g.includes('deltoide')) return 'ombros';
        if (g.includes('triceps') || g.includes('tríceps')) return 'triceps';
        if (g.includes('biceps') || g.includes('bíceps') || g.includes('antebraço')) return 'biceps';
        if (g.includes('core') || g.includes('abdom') || g.includes('obliquo') || g.includes('estabilização')) return 'core';
        if (g.includes('mobilidade') || g.includes('cardio') || g.includes('deslocamento')) return 'outros';
        return 'outros';
    };

    function showToast(msg) { els.toast.textContent = msg; els.toast.classList.add('show'); setTimeout(() => els.toast.classList.remove('show'), 3000); }
    function speak(text) { if (!audioEnabled || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'pt-BR'; utterance.rate = 1.1; window.speechSynthesis.speak(utterance); }
    function toggleAudio() { audioEnabled = !audioEnabled; const btn = document.getElementById('btnAudio'); if (audioEnabled) { btn.classList.add('active'); btn.innerHTML = '🔊 <span>Áudio On</span>'; speak("Assistente ativado."); } else { btn.classList.remove('active'); btn.innerHTML = '🔈 <span>Áudio Off</span>'; window.speechSynthesis.cancel(); } }

    let currentTimerEl = null;
    let currentTimerTarget = null;
    let currentTimerExercise = null; // Memória do exercício atual
    let currentTacticalTip = ""; // Memória da dica para não recarregar a cada segundo

    // Função para alterar o tempo de descanso em tempo real
    function adjustRestTime(newTime) {
        currentRestTime = newTime;
        if(currentTimerTarget) {
            // O 'true' avisa ao motor que é apenas um ajuste, para ele não repetir o áudio do dicionário
            startRestTimer(currentTimerTarget, currentTimerExercise, true); 
        }
    }

    // --- NOVO MOTOR DE ALTA PRECISÃO (Substitui o setInterval) ---
    let rafTimerId = null;
    let isRestTimerRunning = false;

    function startRestTimer(targetContainer, exerciseName = null, isAdjustment = false) {
        currentTimerTarget = targetContainer;
        currentTimerExercise = exerciseName;
        
        // Esconde o cronômetro antigo do topo da tela
        const oldGlobalTimer = document.getElementById('timerContainer');
        if(oldGlobalTimer) oldGlobalTimer.style.display = 'none';

        // Desliga o motor anterior, se houver
        stopRestTimer(); 
        isRestTimerRunning = true;

        // CÉREBRO TÁTICO: Busca a dica no dicionário
        if (!isAdjustment) {
            currentTacticalTip = "";
            if (exerciseName && typeof dictionaryData !== 'undefined') {
                const dictItem = dictionaryData.find(d => d.name === exerciseName);
                if (dictItem && dictItem.desc) {
                    currentTacticalTip = dictItem.desc; 
                }
            }
            if (!currentTacticalTip) {
                const genericTips = [
                    "Controle a respiração. Inspire na fase excêntrica, expire na concêntrica.", 
                    "Mantenha o foco. O descanso converte suor em hipertrofia.", 
                    "Aproveite para oxigenar a musculatura alvo.",
                    "Hidrate-se. A água é o combustível da contração muscular."
                ];
                currentTacticalTip = genericTips[Math.floor(Math.random() * genericTips.length)];
            }
        }

        // Cria a nova cápsula visual
        currentTimerEl = document.createElement('div');
        currentTimerEl.className = 'inline-rest-timer';
        currentTimerEl.style.cssText = 'background: #1a1a1a; padding: 15px; border-radius: 8px; text-align: center; margin-top: 15px; border: 1px solid #333; transition: all 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.5);';
        
        targetContainer.appendChild(currentTimerEl);
        
        let duration = currentRestTime;
        const endTime = Date.now() + (duration * 1000); 
        let alert10sGiven = false; 

        if (audioEnabled) {
            if (isAdjustment) {
                speak(`Tempo ajustado para ${duration} segundos.`);
            } else {
                speak(`Descanso. ${duration} segundos. Foco tático: ${currentTacticalTip}`);
            }
        }
        
        let lastBeep = -1;
        let lastVisualUpdate = -1;

        // O Núcleo do Motor de Alta Precisão
        const tick = () => { 
            if (!isRestTimerRunning) return;

            let timeLeft = Math.ceil((endTime - Date.now()) / 1000);
            if (timeLeft < 0) timeLeft = 0;
            
            // Só atualiza a interface (HTML) se o segundo realmente virou, economizando processador
            if (timeLeft !== lastVisualUpdate) {
                lastVisualUpdate = timeLeft;
                
                let m = Math.floor(timeLeft/60).toString().padStart(2,'0');
                let s = (timeLeft%60).toString().padStart(2,'0'); 
                
                let timerContent = '';

                // Lógica Progressiva de Cores e Áudios
                if (timeLeft > 10) {
                    currentTimerEl.style.borderColor = '#333';
                    currentTimerEl.style.background = '#1a1a1a';
                    timerContent = `
                        <div style="color: #a64dff; font-size: 11px; text-transform: uppercase; margin-bottom: 2px; font-weight: bold; letter-spacing: 1px;">🧠 Spotter Digital</div>
                        <div style="color: #ccc; font-size: 13px; margin-bottom: 12px; font-style: italic; max-width: 90%; margin-left: auto; margin-right: auto;">"${currentTacticalTip}"</div>
                        <div style="font-size: 32px; color: #fff; font-weight: bold; font-family: monospace;">${m}:${s}</div>`;
                } else if (timeLeft <= 10 && timeLeft > 5) {
                    currentTimerEl.style.borderColor = '#ffaa00';
                    currentTimerEl.style.background = 'rgba(255, 170, 0, 0.15)';
                    timerContent = `<div style="color: #ffaa00; font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 5px; animation: blink 1s infinite;">⚠️ Prepare-se</div><div style="font-size: 32px; color: #ffaa00; font-weight: bold; font-family: monospace;">${m}:${s}</div>`;
                    if (!alert10sGiven && audioEnabled) { speak("Dez segundos. Assuma a posição."); alert10sGiven = true; }
                } else if (timeLeft <= 5 && timeLeft > 0) {
                    currentTimerEl.style.borderColor = '#ff4444';
                    currentTimerEl.style.background = 'rgba(255, 68, 68, 0.2)';
                    timerContent = `<div style="color: #ff4444; font-size: 14px; font-weight: bold; text-transform: uppercase; margin-bottom: 5px;">Contagem Final</div><div style="font-size: 42px; color: #ff4444; font-weight: bold; text-shadow: 0 0 15px rgba(255,68,68,0.8);">${timeLeft}</div>`;
                    
                    if (timeLeft !== lastBeep) {
                        FitAudio.beepShort();
                        lastBeep = timeLeft;
                    }
                } else if (timeLeft === 0) {
                    currentTimerEl.style.borderColor = '#00ff88';
                    currentTimerEl.style.background = 'rgba(0, 255, 136, 0.2)';
                    timerContent = `<div style="font-size: 36px; color: #00ff88; font-weight: bold; text-shadow: 0 0 15px rgba(0,255,136,0.8); text-transform: uppercase;">🔥 Vai!</div>`;
                    
                    if (timeLeft !== lastBeep) {
                        FitAudio.beepLong();
                        if(audioEnabled) speak("Ação!");
                        lastBeep = timeLeft;
                    }

                    stopRestTimer();
                    setTimeout(() => { 
                        if (currentTimerEl && currentTimerEl.parentNode) currentTimerEl.parentNode.removeChild(currentTimerEl); 
                    }, 3000);
                }

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
            }

            if (isRestTimerRunning) {
                rafTimerId = requestAnimationFrame(tick);
            }
        };
        
        rafTimerId = requestAnimationFrame(tick); 
    }

    function stopRestTimer() { 
        isRestTimerRunning = false;
        if (rafTimerId) cancelAnimationFrame(rafTimerId);
        // Garante a compatibilidade com navegadores mais antigos (fallback)
        if (typeof restTimer !== 'undefined') clearInterval(restTimer); 
        
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

    function cloneFirstSet(bIndex, eIndex) {
        const ex = currentRoutine[bIndex].exercises[eIndex];
        if (!ex.setsData || ex.setsData.length === 0) return;
        
        const baseKg = ex.setsData[0].kg;
        const baseReps = ex.setsData[0].reps;
        
        for (let i = 1; i < ex.sets; i++) {
            if (!ex.setsData[i]) ex.setsData[i] = { kg: '', reps: '', checked: false };
            if (!ex.setsData[i].checked) { // Só substitui as séries que não foram concluídas ainda
                ex.setsData[i].kg = baseKg;
                ex.setsData[i].reps = baseReps;
            }
        }
        saveWorkoutState();
        renderCurrentRoutine(); 
        showToast("Cargas da S1 replicadas.");
        if(audioEnabled) speak("Cargas replicadas.");
    }
async function exportStravaCard(historyIndex = -1) {
        showToast("📸 Focando lente... aguarde.");
        
        let history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        if (history.length === 0) {
            showToast("Nenhum treino encontrado.");
            return;
        }
        
        // Puxa o último treino (se -1) ou o treino específico da lista
        let log = historyIndex === -1 ? history[history.length - 1] : history[historyIndex];
        
        // CÉREBRO TÁTICO: Cálculo de Volume Total (Séries x Reps x Kg)
        let totalVolume = 0;
        if (log.data) {
            log.data.forEach(s => {
                totalVolume += (parseFloat(s.kg) || 0) * (parseInt(s.reps) || 0);
            });
        }
        
        // Injeta os dados na placa (Card) escondida
        document.getElementById('stravaWorkoutType').textContent = `Treino ${log.tipo}`;
        document.getElementById('stravaDuration').textContent = log.duration_secs ? Math.floor(log.duration_secs / 60) + ' min' : '-- min';
        document.getElementById('stravaVolume').textContent = totalVolume > 0 ? (totalVolume / 1000).toFixed(1) + 'k kg' : '0 kg';
        
        const card = document.getElementById('stravaCard');
        
        try {
            // A mágica: Redesenha o HTML num Canvas invisível
            const canvas = await html2canvas(card, { 
                backgroundColor: '#121212', 
                scale: 2, // Escala 2 garante alta resolução no Instagram
                logging: false
            });
            
            canvas.toBlob(async (blob) => {
                const file = new File([blob], 'fitapp_treino.png', { type: 'image/png' });
                
                // Abre a gaveta nativa do celular (Web Share API)
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: 'Relatório FitApp',
                        text: 'Mais um combate finalizado no FitApp Elite! 💪🔥'
                    });
                } else {
                    // PLANO B: Se for PC ou navegador antigo, força o Download
                    const link = document.createElement('a');
                    link.download = 'fitapp_treino.png';
                    link.href = canvas.toDataURL();
                    link.click();
                    showToast("Imagem salva! Poste nos Stories.");
                }
            }, 'image/png');
            
        } catch(e) {
            showToast("Falha ao revelar foto tática.");
            console.error(e);
        }
    }

    function openSwapModal(bIndex, eIndex) {
        const ex = currentRoutine[bIndex].exercises[eIndex];
        const currentName = ex.name;
        const currentDict = dictionaryData.find(d => d.name === currentName);
        const currentGroup = currentDict ? currentDict.group : "Geral";
        
        const style = els.styleSelector ? els.styleSelector.value : 'biset';
        const level = els.levelSelector ? els.levelSelector.value : 'intermediario';
        const type = currentWorkoutType;

        // PONTO 7: Busca hierárquica no Swap (Escudo Duplo)
        let pool = dictionaryData.filter(d => d.focus === (currentDict ? currentDict.focus : '') && d.name !== currentName);
        
        // Se a busca cirúrgica falhar, busca pelo Grupo Muscular pai
        if (pool.length === 0) {
            pool = dictionaryData.filter(d => d.group === currentGroup && d.name !== currentName);
        }

        // Blindagem de Ambiente
        const method = document.getElementById('mainMethodSelector') ? document.getElementById('mainMethodSelector').value : '';
        if (type === 'Casa' || method === 'calistenia') {
            pool = pool.filter(d => d.equip.includes('Peso_Corporal') || d.equip.includes('Calistenia'));
        }
        
        let originalName = currentName; 
        const isStandardWorkout = !type.startsWith('custom_') && type !== 'Livre' && type !== 'Casa' && type !== 'novo_customizado';
        
        if (isStandardWorkout && typeof dbWorkouts !== 'undefined') {
            // ESCUDO ANTI-CRASH: Se a campanha foi gerada dinamicamente, não haverá "Original" na base legada.
            try {
                originalName = dbWorkouts[style][level][type][bIndex].exercises[eIndex].name;
            } catch (error) {
                originalName = currentName; 
            }
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
                        <div class="swap-item-focus">🎯 Foco: ${item.focus}</div>
                        <div class="swap-item-focus" style="color: #00ff88; margin-top: 4px;">🎒 Requer: ${item.equip ? item.equip.replace(/_/g, ' ') : 'N/A'}</div>
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

        // Lê a preferência do usuário (Livre por padrão)
        const seqMode = safeGet('fitapp_sequence_mode') || 'livre';

        // Destranca todos ou tranca todos inicialmente com base no modo
        ['A', 'B', 'C'].forEach(t => {
            const card = document.getElementById('card-' + t);
            if(card) {
                if (seqMode === 'livre') {
                    card.classList.remove('locked');
                } else {
                    card.classList.add('locked');
                }
            }
        });

        // Se o modo for estrito, destranca apenas o próximo da fila
        if (seqMode === 'estrita') {
            let nextType = 'A'; 
            if (lastType === 'A') nextType = 'B';
            if (lastType === 'B') nextType = 'C';
            if (lastType === 'C') nextType = 'A';

            const nextCard = document.getElementById('card-' + nextType);
            if (nextCard) nextCard.classList.remove('locked');
        }
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
        
        // 1. Apaga as luzes de todo o Corpo Humano primeiro
        const allMuscles = ['svg-peito', 'svg-ombro', 'svg-biceps', 'svg-triceps', 'svg-costas', 'svg-trapezio', 'svg-core', 'svg-quadriceps', 'svg-posterior', 'svg-gluteo', 'svg-panturrilha'];
        allMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.style.fill = '#222'; el.style.stroke = '#444'; }
        });

        // 2. Rastreador de Músculos (Quais músculos serão usados hoje?)
        const activeMuscles = new Set();
        
        currentRoutine.forEach((bloco, bIndex) => {
            const blockTitle = document.createElement('h4');
            blockTitle.style.color = 'var(--theme-secondary)';
            blockTitle.style.marginTop = '15px';
            blockTitle.style.marginBottom = '10px';
            blockTitle.style.borderBottom = '1px solid #333';
            blockTitle.style.paddingBottom = '5px';
            blockTitle.textContent = bloco.title;
            list.appendChild(blockTitle);

            bloco.exercises.forEach((ex, eIndex) => {
                
                // 🧠 CÉREBRO ANATÔMICO: Descobre onde o exercício bate e aciona o Radar
                const dictItem = typeof dictionaryData !== 'undefined' ? dictionaryData.find(d => d.name === ex.name) : null;
                const focusStr = dictItem ? (dictItem.group + ' ' + dictItem.focus).toLowerCase() : ex.name.toLowerCase();
                
                // Remove acentos para facilitar o match
                const f = focusStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                
                if (f.includes('peito')) activeMuscles.add('svg-peito');
                if (f.includes('ombro') || f.includes('deltoide')) activeMuscles.add('svg-ombro');
                if (f.includes('biceps') || f.includes('braco')) activeMuscles.add('svg-biceps');
                if (f.includes('triceps')) activeMuscles.add('svg-triceps');
                if (f.includes('costa') || f.includes('dorsal') || f.includes('lombar')) activeMuscles.add('svg-costas');
                if (f.includes('trapezio')) activeMuscles.add('svg-trapezio');
                if (f.includes('core') || f.includes('abdom')) activeMuscles.add('svg-core');
                if (f.includes('quadriceps') || f.includes('perna') && !f.includes('posterior') && !f.includes('gluteo')) activeMuscles.add('svg-quadriceps');
                if (f.includes('posterior') || f.includes('isquio')) activeMuscles.add('svg-posterior');
                if (f.includes('gluteo')) activeMuscles.add('svg-gluteo');
                if (f.includes('panturrilha') || f.includes('gastro')) activeMuscles.add('svg-panturrilha');

                const item = document.createElement('div');
                item.className = 'preview-item';
                
                // NOVO: Higienização e montagem do UI do Exercício
                const safeName = escapeHTML(ex.name);
                const safeTarget = escapeHTML(ex.target);
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;

                item.innerHTML = `
                    <div style="flex: 1;">
                        <div style="font-weight: bold; color: #fff; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                            ${safeName}
                            <a href="${ytLink}" target="_blank" title="Ver execução no YouTube" style="text-decoration: none; font-size: 16px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🎥</a>
                        </div>
                        <div style="font-size: 12px; color: var(--theme-primary); margin-top: 4px; font-weight: bold;">${ex.sets}x ${safeTarget}</div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="FitApp.openSwapModal(${bIndex}, ${eIndex})" style="background: #333; border: none; color: #fff; padding: 6px 10px; border-radius: 4px; cursor: pointer;">🔄</button>
                        <button onclick="FitApp.removeExercise(${bIndex}, ${eIndex})" style="background: #333; border: none; color: #ff4d4d; padding: 6px 10px; border-radius: 4px; cursor: pointer;">❌</button>
                    </div>
                `;
                list.appendChild(item);
            });
        });

        // 3. Acende o Heatmap com as cores do Tema Atual
        activeMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) { 
                el.style.fill = 'var(--theme-primary)'; 
                el.style.stroke = '#fff';
            }
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
        
        // NOVO: Esconde o painel biomecânico para limpar a visão de revisão
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'none';
        
        isWorkoutActive = false;
        
        const preview = document.getElementById('workoutPreview');
        const customControls = document.getElementById('customWorkoutControls');
        const nameContainer = document.getElementById('customWorkoutNameContainer');
        const nameInput = document.getElementById('customWorkoutName');

        if (type === 'Livre') {
            // A Forja cuida da montagem, este bloco só renderiza se vier vazio por erro
            if (currentRoutine.length === 0) currentRoutine = [{ title: "Treino Personalizado", exercises: [] }];
            if(preview) {
                document.getElementById('previewTitle').textContent = `🛠️ Forja Concluída`;
                document.getElementById('previewDesc').textContent = `Rotina gerada. Ajuste as cargas e salve o template.`;
                if(customControls) customControls.style.display = 'flex';
                if(nameContainer) nameContainer.style.display = 'block';
            }
        } else if (type === 'Casa') {
            // CÉREBRO TÁTICO: Gerador Dinâmico de Treino em Casa por Nível
            const removeAccents = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
            const isHomeReady = (item) => item.equip && (item.equip.includes('Peso_Corporal') || item.equip.includes('Calistenia'));
            
            // Separa o arsenal da nuvem/local por grupamentos
            const poolPeito = dictionaryData.filter(d => isHomeReady(d) && getMuscleGroup(d) === 'peito');
            const poolPernas = dictionaryData.filter(d => isHomeReady(d) && getMuscleGroup(d) === 'pernas');
            const poolCore = dictionaryData.filter(d => isHomeReady(d) && getMuscleGroup(d) === 'core');
            const poolCardio = dictionaryData.filter(d => isHomeReady(d) && (getMuscleGroup(d) === 'outros'));
            
            // Função para pescar um exercício aleatório com redundância (fallback)
            const getRandom = (arr, fallbackName) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)].name : fallbackName;
            
            // Calibragem de Esforço baseada na chave seletora
            let setsLevel = level === 'iniciante' ? 3 : 4;
            let repLevel = level === 'iniciante' ? "10-12 rep" : (level === 'avancado' ? "Até a falha" : "15-20 rep");
            let timeLevel = level === 'iniciante' ? "30s" : (level === 'avancado' ? "1 min" : "45s");

            currentRoutine = [{
                title: `Circuito Corporal (${level.charAt(0).toUpperCase() + level.slice(1)})`,
                exercises: [
                    { name: getRandom(poolCardio, "Polichinelos (Jumping Jacks)"), sets: 3, target: timeLevel },
                    { name: getRandom(poolPeito, "Flexão de Braço (Padrão)"), sets: setsLevel, target: repLevel },
                    { name: getRandom(poolPernas, "Agachamento Livre (Back/Front Squat)"), sets: setsLevel, target: repLevel },
                    { name: getRandom(poolPernas, "Afundo / Avanço"), sets: setsLevel, target: "12/perna" },
                    { name: getRandom(poolCore, "Prancha Isométrica (Frontal/Lateral)"), sets: setsLevel, target: timeLevel }
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
        } else if (type === 'A' || type === 'B' || type === 'C' || type === 'D') {
            const method = document.getElementById('mainMethodSelector') ? document.getElementById('mainMethodSelector').value : 'ppl';
            
            // TRAVA DE MESOCICLO: Congela o treino para garantir a Sobrecarga Progressiva
            const campaignKey = 'fitapp_campaign_data';
            const savedCampaignStr = safeGet(campaignKey);
            let campaignData = savedCampaignStr ? JSON.parse(savedCampaignStr) : { method: method, level: level, workouts: {}, startDate: new Date().toISOString() };

            // Se o usuário alterou o método ou nível manualmente na tela, quebra a campanha atual
            if (campaignData.method !== method || campaignData.level !== level) {
                campaignData = { method: method, level: level, workouts: {}, startDate: new Date().toISOString() };
                safeSet('fitapp_campaign_count', 0);
            }

            if (campaignData.workouts[type]) {
                // CLONAGEM PROFUNDA: Garante que alterações de "Casa" não salvem por cima do treino Oficial
                currentRoutine = JSON.parse(JSON.stringify(campaignData.workouts[type])); 
            } else {
                let subOpt = '';
                if (method === 'ppl' || method === 'abc') subOpt = type === 'A' ? 'push' : (type === 'B' ? 'pull' : 'legs');
                else if (method === 'biset_antagonista') subOpt = type === 'A' ? 'peito_costa' : (type === 'B' ? 'biceps_triceps' : 'quad_post');
                else if (method === 'biset_agonista') subOpt = type === 'A' ? 'peito' : (type === 'B' ? 'costa' : 'perna');
                else if (method === 'biset_sinergista') subOpt = type === 'A' ? 'peito_triceps' : (type === 'B' ? 'costa_biceps' : 'perna_ombro');
                else subOpt = type;

                // Carrega a Lista Negra (Exercícios do Mesociclo Anterior)
                let blacklist = JSON.parse(safeGet('fitapp_blacklist') || '[]');
                
                // Chama o motor da forja com a Lista Negra
                currentRoutine = executeForgeLogic(method, subOpt, blacklist);
                
                campaignData.workouts[type] = currentRoutine;
                safeSet(campaignKey, JSON.stringify(campaignData));
            }
            // GATILHO GLOBAL DE TERRENO: Se o botão estiver em Casa ou Praia, adapta as armas silenciosamente!
            const currentEnv = safeGet('fitapp_global_env') || 'academia';
            if (currentEnv !== 'academia') {
                silentAdaptToEnv(currentEnv);
            }
            if(preview) {
                const cardRef = document.getElementById('card-' + type);
                document.getElementById('previewTitle').textContent = cardRef ? cardRef.querySelector('h3').textContent : `Treino ${type}`;
                document.getElementById('previewDesc').textContent = cardRef ? cardRef.querySelector('p').textContent : `Nível ${level}`;
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
        
        // Restaura o painel biomecânico
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'block';

        // Restaura o bloco de Treino Pessoal
        const templatesFront = document.getElementById('templatesFrontline');
        if (templatesFront) templatesFront.style.display = 'block';
        updateCampaignDashboard();
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

        // ATIVA MODO FOCO: Oculta o Menu Inferior e o Cabeçalho
        const navBar = document.querySelector('nav');
        if(navBar) navBar.style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if(header) header.style.display = 'none';

        // Oculta o bloco de Treino Pessoal
        const templatesFront = document.getElementById('templatesFrontline');
        if (templatesFront) templatesFront.style.display = 'none';

        workoutStartTime = Date.now();
        if (globalTimer) clearInterval(globalTimer);
        globalTimer = setInterval(updateGlobalTimer, 1000);
        updateGlobalTimer(); 
        
        // PONTO 8: Esconde o seletor biomecânico de forma segura
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'none';
        
        renderCurrentRoutine();
        saveWorkoutState(); 
    }

    function renderCurrentRoutine() {
        els.exerciseList.innerHTML = ''; 
        totalSets = 0; 
        checkedSets = 0; 
        todayLog = [];
        
        const historyLog = JSON.parse(safeGet('fitapp_week_log') || '[]');
        
        currentRoutine.forEach((bloco, bIndex) => {
            const isBiset = bloco.exercises.length > 1;
            const cardClass = isBiset ? 'biset-card' : 'tradicional-card'; 
            
            const card = document.createElement('div'); card.className = cardClass; 
            if (!isBiset) card.style.borderLeft = '4px solid #44aaff'; 
            
            card.innerHTML = `<div class="biset-title">${bloco.title}</div>`;
            
            // PONTO 4: Permite reabrir o bloco sanfona com um clique
            card.querySelector('.biset-title').addEventListener('click', () => {
                if (card.classList.contains('collapsed-block')) {
                    card.classList.remove('collapsed-block');
                }
            });
            
            bloco.exercises.forEach((ex, eIndex) => {
                const blockDiv = document.createElement('div'); blockDiv.className = 'exercise-block';
                const linkIcon = (isBiset && eIndex < bloco.exercises.length - 1) ? ' <span style="color:#00ff88;">🔗</span>' : '';
                
                const safeName = escapeHTML(ex.name);
                const safeTarget = escapeHTML(ex.target);
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;
                const savedNotes = ex.notes ? escapeHTML(ex.notes) : '';
                
                let aiSuggestionHTML = '';
                const lastWorkoutMatch = historyLog.slice().reverse().find(log => 
                    log.data && log.data.some(d => d.exercise === ex.name)
                );

                if (lastWorkoutMatch) {
                    const lastSets = lastWorkoutMatch.data.filter(d => d.exercise === ex.name);
                    if (lastSets.length > 0) {
                        const finalSet = lastSets[lastSets.length - 1]; 
                        let suggestedKg = parseFloat(finalSet.kg) || 0;
                        const repsDone = parseInt(finalSet.reps) || 0;
                        
                        const targetStr = ex.target ? ex.target.replace(/[^0-9-]/g, '') : "10";
                        let targetHigh = parseInt(targetStr.split('-').pop()) || 10; 
                        
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
                            <div style="display: flex; align-items: center; background: #222; border-radius: 12px; padding: 2px 6px; border: 1px solid #444;">
                                <button class="btn-edit-set" onclick="FitApp.changeSets(${bIndex}, ${eIndex}, -1)" style="background: none; border: none; color: #ff4444; font-weight: bold; font-size: 16px; padding: 0 5px; cursor: pointer;">-</button>
                                <span style="font-size: 12px; color: #ccc; margin: 0 5px;">${ex.sets}x</span>
                                <button class="btn-edit-set" onclick="FitApp.changeSets(${bIndex}, ${eIndex}, 1)" style="background: none; border: none; color: #00ff88; font-weight: bold; font-size: 16px; padding: 0 5px; cursor: pointer;">+</button>
                            </div>
                            <button id="btnAuto_${bIndex}_${eIndex}" onclick="FitApp.toggleAutoPilot(${bIndex}, ${eIndex})" style="background: rgba(0, 255, 136, 0.1); border: 1px solid #00ff88; color: #00ff88; border-radius: 8px; padding: 4px 8px; font-size: 12px; font-weight: bold; cursor: pointer; margin-left: 5px; transition: all 0.2s;" title="Modo Hands-Free">🤖 Auto</button>
                            
                            <button onclick="FitApp.cloneFirstSet(${bIndex}, ${eIndex})" style="background: none; border: none; cursor: pointer; font-size: 16px; padding: 0; filter: grayscale(100%) brightness(200%);" title="Replicar valores da Série 1 em todas">📋</button>
                            <button class="btn-notes" style="background: none; border: none; cursor: pointer; font-size: 16px; padding: 0;" title="Log de Combate (Anotações)">📝</button>
                            <a href="${ytLink}" target="_blank" style="text-decoration: none; font-size: 18px;" title="Ver execução no YouTube">🎥</a>
                            <span class="target-reps">${safeTarget}</span>
                            <button class="btn-swap" onclick="FitApp.openSwapModal(${bIndex}, ${eIndex})" title="Substituir Exercício">🔄</button>
                        </div>
                    </div>
                    <div class="notes-container" style="display: none; background: #1a1a1a; padding: 10px; border-radius: 6px; border-left: 2px solid #a64dff; margin-bottom: 12px; margin-top: 5px;">
                        <textarea class="ex-notes-input" placeholder="Anotações táticas (ex: banco inclinado no nível 3, fadiga no ombro...)" style="width: 100%; background: transparent; border: none; color: #ccc; font-size: 12px; resize: vertical; min-height: 45px; outline: none;">${savedNotes}</textarea>
                    </div>`;
                
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
                    const chkId = `chk_set_${bIndex}_${eIndex}_${s}`;
                    const kgId = `kg_set_${bIndex}_${eIndex}_${s}`;
                    const rpId = `rp_set_${bIndex}_${eIndex}_${s}`;
                    
                    // CÉREBRO TÁTICO: Auto-Preenchimento Fantasma (Sobrecarga Progressiva)
                    let ghostKg = '';
                    let ghostReps = '';
                    if (lastWorkoutMatch) {
                        const lastSets = lastWorkoutMatch.data.filter(d => d.exercise === ex.name);
                        const pastSet = lastSets.find(d => parseInt(d.set) === s) || lastSets[lastSets.length - 1];
                        if (pastSet) {
                            if (pastSet.kg) ghostKg = pastSet.kg;
                            if (pastSet.reps) ghostReps = pastSet.reps;
                        }
                    }
                    
                    // Se o usuário não preencheu ainda, o input herda a carga da sessão anterior automaticamente
                    let displayKg = data.kg;
                    let displayReps = data.reps;
                    
                    if (displayKg === '' && ghostKg !== '') { displayKg = ghostKg; ex.setsData[s-1].kg = ghostKg; }
                    if (displayReps === '' && ghostReps !== '') { displayReps = ghostReps; ex.setsData[s-1].reps = ghostReps; }

                    row.innerHTML = `<div class="set-label">S${s}</div><input type="number" id="${kgId}" class="kg-val" placeholder="Kg" value="${displayKg}"><input type="number" id="${rpId}" class="rp-val" placeholder="Reps" value="${displayReps}"><button class="btn-iso" style="background:none; border:none; cursor:pointer; font-size:16px; padding:0 5px;" title="Iniciar Isometria">⏱️</button><input type="checkbox" id="${chkId}" class="chk-set" ${data.checked ? 'checked' : ''}>`;
                    
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
                        if (localIsoTimer) { clearInterval(localIsoTimer); localIsoTimer = null; btnIso.textContent = '⏱️'; btnIso.style.textShadow = 'none'; }
                        
                        if (chk.checked) { 
                            checkedSets++; 
                            
                            // PONTO 10: Efeito Cascata (Auto-preenchimento para a linha abaixo)
                            if (s < ex.sets) {
                                const nextKgInp = document.getElementById(`kg_set_${bIndex}_${eIndex}_${s+1}`);
                                const nextRpInp = document.getElementById(`rp_set_${bIndex}_${eIndex}_${s+1}`);
                                if (nextKgInp && nextRpInp && !nextKgInp.value && !nextRpInp.value) {
                                    nextKgInp.value = kgInp.value; nextRpInp.value = rpInp.value;
                                    ex.setsData[s] = { kg: kgInp.value, reps: rpInp.value, checked: false };
                                }
                            }

                            // PONTO 1: Trava de Descanso do Bi-Set
                            const allInSetChecked = currentRoutine[bIndex].exercises.every(e => e.setsData[s-1] && e.setsData[s-1].checked);
                            if (allInSetChecked && checkedSets < totalSets) {
                                startRestTimer(card, ex.name);
                            }

                            todayLog.push({ exercise: ex.name, set: s, kg: parseSafeFloat(kgInp.value), reps: parseInt(rpInp.value) || 0 });
                        } else { 
                            checkedSets--; 
                            stopRestTimer(); 
                            todayLog = todayLog.filter(log => !(log.exercise === ex.name && log.set === s));
                        }
                        updateState();
                        updateProgress();

                        // PONTO 4: Encolhimento Automático do Bloco Sanfona (Corrigido)
                        const allBlockChecked = currentRoutine[bIndex].exercises.every(e => {
                            // Conta exatamente quantas caixas verdadeiras existem na memória
                            const checkedCount = e.setsData ? e.setsData.filter(sd => sd && sd.checked).length : 0;
                            return checkedCount === e.sets; // Só fecha se a contagem bater com a meta de séries
                        });
                        
                        if (allBlockChecked) card.classList.add('collapsed-block');
                        else card.classList.remove('collapsed-block');
                    });
                    blockDiv.appendChild(row);
                } // fim do laço de séries (s)
                card.appendChild(blockDiv); // <-- Garante a injeção do bloco no cartão
            });
            
            // NOVO: Verifica se o bloco já foi 100% concluído ao recarregar a tela (Impede reabertura)
            const isBlockFinishedOnLoad = currentRoutine[bIndex].exercises.every(e => {
                const checkedCount = e.setsData ? e.setsData.filter(sd => sd && sd.checked).length : 0;
                return checkedCount === e.sets;
            });
            if (isBlockFinishedOnLoad && currentRoutine[bIndex].exercises.length > 0) {
                card.classList.add('collapsed-block');
            }

            els.exerciseList.appendChild(card); // <-- Garante a injeção do cartão na tela
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
        // --- INÍCIO DA TRAVA ANTI-EXPLOIT ---
        let tempTotalTimeSecs = 0;
        if (workoutStartTime) {
            tempTotalTimeSecs = Math.floor((Date.now() - workoutStartTime) / 1000);
        }

        // Bloqueio 1: Treino vazio
        if (checkedSets === 0) {
            showToast("⚠️ Comando Negado: Marque ao menos uma série para registrar combate.");
            return; 
        }

        // Bloqueio 2: Speedrun (Menos de 2 minutos)
        if (tempTotalTimeSecs < 120) {
            showToast("⚠️ Abortado: Tempo operacional mínimo não atingido (2 minutos).");
            return; 
        }
        // --- FIM DA TRAVA ANTI-EXPLOIT ---

        stopRestTimer(); // NOVO: Garante a destruição do cronômetro ao sair da tela de combate
        
        const isComplete = checkedSets === totalSets;
        const tipoTreino = currentWorkoutType; 
        
        const d = new Date();
        const offset = d.getTimezoneOffset() * 60000;
        const dataHoje = (new Date(d.getTime() - offset)).toISOString().split('T')[0];
        
        let totalTimeSecs = tempTotalTimeSecs; // Resgata o tempo já calculado
        if (workoutStartTime) {
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
        
        // --- INÍCIO DO SISTEMA DE GATILHO DUPLO (Ponto 9) ---
        let campCount = parseInt(safeGet('fitapp_campaign_count') || '0');
        campCount++;
        safeSet('fitapp_campaign_count', campCount);
        
        let campaignDataStr = safeGet('fitapp_campaign_data');
        let isPromotionTime = false;
        
        if (campaignDataStr) {
            let campData = JSON.parse(campaignDataStr);
            let startDate = new Date(campData.startDate || Date.now());
            let daysPassed = Math.floor((Date.now() - startDate) / (1000 * 60 * 60 * 24));
            
            // Verifica Gatilhos (24 Treinos ou 56 Dias)
            if (campCount >= 24 || daysPassed >= 56) {
                isPromotionTime = true;
                
                // 1. Envia as armas do ciclo atual para a Lista Negra
                let newBlacklist = [];
                Object.values(campData.workouts).forEach(routine => {
                    routine.forEach(bloco => {
                        bloco.exercises.forEach(ex => {
                            if (!newBlacklist.includes(ex.name)) newBlacklist.push(ex.name);
                        });
                    });
                });
                safeSet('fitapp_blacklist', JSON.stringify(newBlacklist));
                
                // 2. Destrói a campanha atual
                safeSet('fitapp_campaign_data', '');
                safeSet('fitapp_campaign_count', 0);
                
                // 3. Sobe a Patente Oficial
                if (els.levelSelector) {
                    if (els.levelSelector.value === 'iniciante') els.levelSelector.value = 'intermediario';
                    else if (els.levelSelector.value === 'intermediario') els.levelSelector.value = 'avancado';
                    safeSet('fitapp_level', els.levelSelector.value);
                }
            }
        }
        // --- FIM DO SISTEMA DE GATILHO DUPLO ---

        clearWorkoutState(); 

        els.workoutArea.style.display = 'none';
        els.btnFinishArea.style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        
        // DESATIVA MODO FOCO: Devolve o Menu Inferior
        const navBar = document.querySelector('nav');
        if(navBar) navBar.style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';

        // Restaura o bloco de Treino Pessoal
        const templatesFront = document.getElementById('templatesFrontline');
        if (templatesFront) templatesFront.style.display = 'block';

        currentWorkoutType = '';
        checkSequence(); 
        renderWeeklyCalendar(); 
        if (typeof renderMetricsChart === 'function') renderMetricsChart(); 

        if(isComplete) { FitGamification.showPackModal(snapActive); snapActive = false; } else { showToast('Treino salvo no sistema.'); switchTab('tab-evolucao', 'nav-evolucao'); }
        
        // Restaura o painel biomecânico
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'block';
        
        // Dispara o Evento de Promoção
        if (isPromotionTime) {
            setTimeout(() => {
                alert("🎖️ MESOCICLO CONCLUÍDO!\n\nAdaptação neural máxima atingida.\nSua patente foi elevada e seu arsenal anterior enviado para a Lista Negra.\n\nEscolha seu novo destino tático na Forja.");
                switchTab('tab-treino', 'nav-treino');
                openForgeModal();
                if(typeof audioEnabled !== 'undefined' && audioEnabled) speak("Adaptação neural máxima atingida. Patente elevada. Iniciando protocolo de nova forja.");
            }, 1500);
        }
    updateCampaignDashboard();
    }

// ==========================================
// ROTA DE FUGA: CANCELAMENTO DE TREINO
// ==========================================
window.abortarMissao = function() {
    if (confirm("ATENÇÃO: Deseja realmente abortar a missão? O treino será encerrado e NENHUM dado ou ponto de suor será salvo.")) {
        
        // 1. Desliga os Motores
        stopRestTimer();
        if (globalTimer) clearInterval(globalTimer);
        workoutStartTime = null;
        
        // 2. Limpa o Estado de Combate
        clearWorkoutState();
        currentWorkoutType = '';
        
        // 3. Restaura o Esconderijo Visual
        els.workoutArea.style.display = 'none'; 
        els.btnFinishArea.style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        
        // 4. Devolve as Barras de Navegação (Desativa Modo Foco)
        const navBar = document.querySelector('nav');
        if(navBar) navBar.style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';

        // Restaura o painel biomecânico
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'block';

        // Restaura o bloco de Treino Pessoal
        const templatesFront = document.getElementById('templatesFrontline');
        if (templatesFront) templatesFront.style.display = 'block';

        // 5. Confirmação Visual
        showToast('Missão abortada. O combate não foi registrado.');
        
        // Atualiza a tela base se necessário
        checkSequence(); 
    }
};
// ==========================================
// LOG OUT E DESTRUIÇÃO DE CACHE LOCAL
// ==========================================
window.encerrarSessao = function() {
    if (confirm("Tem certeza que deseja sair? O aplicativo será desconectado e o cachê local será apagado.")) {
        firebase.auth().signOut().then(() => {
            // Expurgo tático da memória
            localStorage.clear(); 
            // Recarrega a página para levantar o escudo de login novamente
            window.location.reload(); 
        }).catch((error) => {
            console.error("Erro ao sair:", error);
            showToast("Falha ao desconectar.");
        });
    }
};
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

        // NOVO: Leitura Dinâmica do Banco de Dados 
        const groups = {};
        
        dictionaryData.forEach(ex => {
            const exName = ex.name || 'Exercício Desconhecido';
            const exGroup = ex.group || 'Outros'; 
            const exFocus = ex.focus || 'Geral';
            const exEquip = ex.equip || '';
            
            // Motor de Busca Rápida (pesquisa por nome, grupo, subnível ou equipamento)
            if (query && !exName.toLowerCase().includes(query) && 
                !exGroup.toLowerCase().includes(query) && 
                !exFocus.toLowerCase().includes(query) &&
                !exEquip.toLowerCase().includes(query)) return;
            
            // Agrupador 3D: Grupo > Subnível > Array de Exercícios
            if (!groups[exGroup]) groups[exGroup] = {};
            if (!groups[exGroup][exFocus]) groups[exGroup][exFocus] = [];
            
            groups[exGroup][exFocus].push(ex);
        });

        // Mapeamento Tático de Ícones para a Nova Base
        const groupIcons = {
            'Peitoral': '🦍', 'Costas': '🛡️', 'Pernas': '🦵', 'Ombros': '🥥', 
            'Tríceps': '🐎', 'Bíceps': '💪', 'Core': '🧱', 'Mobilidade': '🧘', 
            'Cardio/HIIT': '🏃', 'Deslocamento/Esporte': '⚡', 'Antebraço': '🦾', 'Outros': '🔧'
        };

        const orderedGroups = Object.keys(groups).sort();

        orderedGroups.forEach(groupName => {
            const subGroups = groups[groupName];
            let groupTotal = 0;
            for(let sub in subGroups) groupTotal += subGroups[sub].length;

            if (groupTotal === 0) return;

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
            header.innerHTML = `<span style="display: flex; align-items: center; gap: 8px;"><span style="font-size: 18px;">${icon}</span> ${groupName} <span style="color: #666; font-size: 12px; font-weight: normal;">(${groupTotal})</span></span> <span style="transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.3s; color: #fff;">▼</span>`;
            
            const listContainer = document.createElement('div');
            listContainer.style.display = isOpen ? 'block' : 'none';
            listContainer.style.padding = '10px';
            listContainer.style.background = '#151515';

            header.onclick = () => {
                const isCurrentlyOpen = listContainer.style.display === 'block';
                listContainer.style.display = isCurrentlyOpen ? 'none' : 'block';
                header.querySelector('span:last-child').style.transform = isCurrentlyOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            };

            // Renderiza os Subníveis Musculares DENTRO do Grupo
            const orderedSubGroups = Object.keys(subGroups).sort();
            orderedSubGroups.forEach(subName => {
                
                // Título Separador do Subnível (ex: Fibras Superiores)
                const subTitle = document.createElement('div');
                subTitle.style.color = '#4da3ff';
                subTitle.style.fontSize = '13px';
                subTitle.style.fontWeight = 'bold';
                subTitle.style.borderBottom = '1px dashed #333';
                subTitle.style.paddingBottom = '4px';
                subTitle.style.marginBottom = '10px';
                subTitle.style.marginTop = '10px';
                subTitle.textContent = `🎯 ${subName}`;
                listContainer.appendChild(subTitle);

                subGroups[subName].forEach(ex => {
                    const exDiv = document.createElement('div');
                    exDiv.style.background = '#111';
                    exDiv.style.padding = '12px';
                    exDiv.style.marginBottom = '8px';
                    exDiv.style.borderRadius = '6px';
                    exDiv.style.border = '1px solid #444';
                    
                    let equipIcon = "🏋️";
                    if(ex.equip && ex.equip.includes("Peso_Corporal")) equipIcon = "🏠";
                    if(ex.equip && ex.equip.includes("Calistenia")) equipIcon = "🏖️";
                    if(ex.equip && ex.equip.includes("Maquinas")) equipIcon = "⛓️";

                    const ytQuery = encodeURIComponent(`Como executar o exercício ${ex.name}`);
                    const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;

                    exDiv.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div style="flex: 1; padding-right: 10px;">
                                <div style="font-weight: bold; color: #fff; font-size: 14px; margin-bottom: 5px;">
                                    ${ex.name}
                                </div>
                                <div style="font-size: 11px; color: #aaa; margin-bottom: 8px;">${ex.desc || 'Instrução pendente.'}</div>
                                <span style="font-size: 10px; background: #333; padding: 2px 6px; border-radius: 4px; color: #00ff88;">${ex.focus}</span>
                                <span style="font-size: 10px; background: #333; padding: 2px 6px; border-radius: 4px; color: #aaa; margin-left: 5px;">${equipIcon} ${ex.equip ? ex.equip.replace(/_/g, ' ') : 'N/A'}</span>
                            </div>
                            <a href="${ytLink}" target="_blank" style="text-decoration: none; font-size: 22px; padding: 8px; background: rgba(255, 0, 0, 0.1); border-radius: 6px; border: 1px solid rgba(255,0,0,0.3); transition: all 0.2s; display: flex; align-items: center; justify-content: center;" title="Ver no YouTube">🎥</a>
                        </div>
                    `;
                    listContainer.appendChild(exDiv);
                });
            });

            groupContainer.appendChild(header);
            groupContainer.appendChild(listContainer);
            grid.appendChild(groupContainer);
        });
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

        // PONTO 11: Inverte apenas a ordem dos dias, mas mantém a ordem dos exercícios intacta
        const reversedHistory = history.slice().reverse();
        reversedHistory.forEach((log) => {
            // NOVO: Desmembramento bruto da data (YYYY-MM-DD para DD/MM/YYYY)
            const parts = log.date.split('-');
            const dateStr = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : log.date;
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
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: #fff;">Treino ${log.tipo}</div>
                    <div style="font-size: 12px; color: #aaa;">${dateStr} • ⏱️ ${durationStr}</div>
                </div>
                <button onclick="event.stopPropagation(); FitApp.exportStravaCard(${history.length - 1 - reversedHistory.indexOf(log)})" style="background: transparent; border: none; font-size: 20px; margin-right: 15px; cursor: pointer; filter: drop-shadow(0 0 5px rgba(255,255,255,0.2));" title="Exportar para Instagram">📸</button>
                <div class="toggle-arrow" style="color: #888; font-size: 12px; transition: transform 0.3s;">▼</div>
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
                const arrow = header.querySelector('.toggle-arrow');
                if(arrow) arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
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
                // Modificado: Se for academia, barra estritamente o peso corporal e calistenia
                if (env === 'academia') return d.equip !== 'peso_corporal' && d.equip !== 'calistenia'; 
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
        const history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        const radarCtx = document.getElementById('radarChart');
        const radarContainer = document.getElementById('radarContainer');
        const isolationContainer = document.getElementById('isolationContainer');
        const exSelect = document.getElementById('exerciseIsolationSelect');
        
        if (!radarCtx || !radarContainer || !isolationContainer || history.length === 0) {
            if(radarContainer) radarContainer.style.display = 'none';
            if(isolationContainer) isolationContainer.style.display = 'none';
            return;
        }

        radarContainer.style.display = 'block';
        isolationContainer.style.display = 'block';

        // --- MATRIZ 1: RADAR DE SIMETRIA (Últimos 30 Dias) ---
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const muscleCounts = { 'Peitoral': 0, 'Costas': 0, 'Pernas': 0, 'Ombros': 0, 'Braços': 0, 'Core': 0 };
        const allExecutedExercises = new Set(); // Para popular o seletor do Gráfico 2

        history.forEach(log => {
            const logDate = new Date(log.date + 'T12:00:00');
            const isRecent = logDate >= thirtyDaysAgo;

            if (log.data && log.data.length > 0) {
                log.data.forEach(set => {
                    allExecutedExercises.add(set.exercise); // Adiciona ao arsenal usado
                    
                    if (isRecent) {
                        const dictItem = typeof dictionaryData !== 'undefined' ? dictionaryData.find(d => d.name === set.exercise) : null;
                        const focus = dictItem ? dictItem.focus : set.exercise;
                        const broadGroup = getMuscleGroup(focus);
                        
                        if (broadGroup === 'peito') muscleCounts['Peitoral']++;
                        else if (broadGroup === 'costas') muscleCounts['Costas']++;
                        else if (broadGroup === 'pernas') muscleCounts['Pernas']++;
                        else if (broadGroup === 'ombros') muscleCounts['Ombros']++;
                        else if (broadGroup === 'triceps' || broadGroup === 'biceps') muscleCounts['Braços']++;
                        else if (broadGroup === 'core') muscleCounts['Core']++;
                    }
                });
            }
        });

        if (radarChartInstance) radarChartInstance.destroy();

        radarChartInstance = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: Object.keys(muscleCounts),
                datasets: [{
                    label: 'Séries no Mês',
                    data: Object.values(muscleCounts),
                    backgroundColor: 'rgba(0, 255, 136, 0.2)',
                    borderColor: '#00ff88',
                    pointBackgroundColor: '#a64dff',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#a64dff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#aaa', font: { size: 10, weight: 'bold' } },
                        ticks: { display: false, backdropColor: 'transparent' }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });

        // --- PREPARAÇÃO DO SELETOR: RASTREADOR DE SOBRECARGA ---
        if (exSelect) {
            const currentSelection = exSelect.value;
            exSelect.innerHTML = '<option value="">Selecione um exercício do histórico...</option>';
            Array.from(allExecutedExercises).sort().forEach(ex => {
                exSelect.innerHTML += `<option value="${ex}">${ex}</option>`;
            });
            if (currentSelection && allExecutedExercises.has(currentSelection)) {
                exSelect.value = currentSelection;
            }
            renderIsolationChart(); // Dispara a renderização inicial do segundo gráfico
        }
    }

    function renderIsolationChart() {
        const ctx = document.getElementById('isolationChart');
        const select = document.getElementById('exerciseIsolationSelect');
        const history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        
        if (!ctx || !select || !select.value) {
            if (isolationChartInstance) isolationChartInstance.destroy();
            return;
        }

        const targetExercise = select.value;
        const chartDataMap = {}; // Agrupar por data para achar a Carga Máxima do dia

        history.forEach(log => {
            if (log.data) {
                const setsOfExercise = log.data.filter(set => set.exercise === targetExercise);
                if (setsOfExercise.length > 0) {
                    const dateStr = new Date(log.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                    // Encontra a maior carga levantada naquele dia específico para este exercício
                    const maxKg = Math.max(...setsOfExercise.map(s => parseFloat(s.kg) || 0));
                    
                    if (maxKg > 0) {
                        chartDataMap[dateStr] = maxKg;
                    }
                }
            }
        });

        const labels = Object.keys(chartDataMap);
        const dataPoints = Object.values(chartDataMap);

        if (isolationChartInstance) isolationChartInstance.destroy();

        if (labels.length === 0) return;

        isolationChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Carga Máxima (Kg)',
                    data: dataPoints,
                    borderColor: '#a64dff',
                    backgroundColor: 'rgba(166, 77, 255, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#00ff88',
                    pointRadius: 4,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', titleColor: '#00ff88', bodyColor: '#fff', borderColor: '#a64dff', borderWidth: 1 }
                },
                scales: {
                    y: { beginAtZero: false, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#888' } },
                    x: { grid: { display: false }, ticks: { color: '#888', maxTicksLimit: 6 } }
                }
            }
        });
    }
    
    function applyTheme() {
        // Fallback agora é hipertrofia
        const profile = safeGet('fitapp_profile') || 'hipertrofia';
        
        // 1. Zera a prancheta de pintura
        document.body.classList.remove('theme-feminino', 'theme-definicao', 'theme-tatico');
        
        // 2. Aplica a classe correspondente. 
        // Nota: O perfil 'hipertrofia' NÃO recebe classe extra, caindo nas cores Verde/Roxo padrão do sistema.
        if (profile === 'feminino') {
            document.body.classList.add('theme-feminino');
        } else if (profile === 'definicao') {
            document.body.classList.add('theme-definicao');
        } else if (profile === 'tatico') {
            document.body.classList.add('theme-tatico');
        }
    }

    function init() {
        els.profileSelector = document.getElementById('profileSelector');
        els.styleSelector = document.getElementById('styleSelector');
        els.levelSelector = document.getElementById('levelSelector'); 
        els.workoutArea = document.getElementById('workoutArea'); 
        els.exerciseList = document.getElementById('exerciseList');
        els.progressBar = document.getElementById('progressBar'); 
        els.btnFinishArea = document.getElementById('btnFinishArea');
        els.toast = document.getElementById('toast');

        // Escuta quando a internet volta, mas só sincroniza se estiver logado
        window.addEventListener('online', () => {
            if (firebase.auth().currentUser) syncOfflineWorkouts();
        });
        
        // Aguarda o sinal verde do Firebase Auth para iniciar a sincronização
        firebase.auth().onAuthStateChanged((user) => {
            const loginOverlay = document.getElementById('loginOverlay');
            const bottomNav = document.getElementById('bottomNav');
            
            if (user) {
                // Usuário logado: Destrói o escudo de login, mostra a barra e sincroniza
                if (loginOverlay) loginOverlay.style.display = 'none';
                if (bottomNav) bottomNav.style.display = 'flex';
                syncOfflineWorkouts();
            } else {
                // Deslogado: Levanta o escudo de login e oculta a barra
                if (loginOverlay) loginOverlay.style.display = 'flex';
                if (bottomNav) bottomNav.style.display = 'none';
            }
        });

        // NOVO: Resgata o perfil salvo no cache do celular
        const savedProfile = safeGet('fitapp_profile');
        if (savedProfile && els.profileSelector) els.profileSelector.value = savedProfile;
        applyTheme(); // 🎨 Aplica a identidade visual instantaneamente no boot do app
        const savedStyle = safeGet('fitapp_style');
        if (savedStyle && els.styleSelector) els.styleSelector.value = savedStyle;
        
        const savedLevel = safeGet('fitapp_level');
        if (savedLevel && els.levelSelector) els.levelSelector.value = savedLevel;

        // NOVO: Resgata e escuta a Chave Seletora de Bloqueio
        const sequenceSelector = document.getElementById('sequenceSelector');
        const savedSeq = safeGet('fitapp_sequence_mode');
        if (savedSeq && sequenceSelector) sequenceSelector.value = savedSeq;

        if (sequenceSelector) {
            sequenceSelector.addEventListener('change', () => {
                safeSet('fitapp_sequence_mode', sequenceSelector.value);
                checkSequence(); // Atualiza os cadeados instantaneamente
                showToast(sequenceSelector.value === 'livre' ? 'Ordem livre ativada.' : 'Sequência estrita ativada.');
            });
        }

        // Mapeia todas as 6 abas da nova arquitetura (incluindo a Arena)
        ['treino', 'evolucao', 'conquistas', 'arena', 'biblioteca', 'perfil'].forEach(tab => { 
            const navBtn = document.getElementById(`nav-${tab}`);
            if (navBtn) navBtn.addEventListener('click', () => switchTab(`tab-${tab}`, `nav-${tab}`)); 
        });
       
        // NOVO: Vigia de Visibilidade - Força ressincronização ao voltar pro app
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                updateGlobalTimer(); // Acorda o relógio de cima
            }
        });

        // NOVO: Ouve as mudanças no seletor de perfil, salva e recarrega o treino
        if (els.profileSelector) els.profileSelector.addEventListener('change', () => {
            safeSet('fitapp_profile', els.profileSelector.value);
            applyTheme(); // 🎨 Troca a paleta de cores em tempo real
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
        updateDynamicCards(); // NOVO: Atualiza o nome dos cartões ao iniciar
        checkCompletedCards(); // NOVO: Checa se há cartões concluídos hoje
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
            
            // Restaura o foco ocultando painéis secundários
            const mainSelector = document.getElementById('mainMethodSelector');
            const bioPanel = mainSelector ? mainSelector.closest('div') : null;
            if (bioPanel) bioPanel.style.display = 'none';
            
            const templatesFront = document.getElementById('templatesFrontline');
            if (templatesFront) templatesFront.style.display = 'none';
            
            if (globalTimer) clearInterval(globalTimer);
            globalTimer = setInterval(updateGlobalTimer, 1000);
            updateGlobalTimer();
            
            renderCurrentRoutine(); 
            showToast('Treino em andamento restaurado.');
        }

       
        updateEnvUI();
        updateCampaignDashboard();
        syncTacticalDictionary(); 
        
    } // <-- A função init() termina aqui
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
// ==========================================
    // 🧬 A FORJA DE TREINOS (MOTOR FISIOLÓGICO)
    // ==========================================
    function openForgeModal() {
        document.getElementById('forgeModal').style.display = 'flex';
        updateForgeOptions();
    }

    function updateForgeOptions() {
        const method = document.getElementById('forgeMethod').value;
        const subBox = document.getElementById('forgeSubOptionsBox');
        const subSelect = document.getElementById('forgeSubSelect');
        const subLabel = document.getElementById('forgeSubLabel');
        
        subSelect.innerHTML = '';
        subBox.style.display = 'block';

        if (method === 'ppl') {
            subLabel.textContent = "Selecione o Eixo:";
            subSelect.innerHTML = `
                <option value="push">Empurrar (Peito, Ombro, Tríceps)</option>
                <option value="pull">Puxar (Costas, Trapézio, Bíceps)</option>
                <option value="legs">Pernas e Core (Quadríceps, Isquios, Glúteo)</option>
            `;
        } else if (method === 'biset_agonista') {
            subLabel.textContent = "Músculo Alvo (Pré-Exaustão):";
            subSelect.innerHTML = `
                <option value="peito">Peitoral</option>
                <option value="costa">Dorsais</option>
                <option value="perna">Pernas Completas</option>
                <option value="ombro">Deltoides</option>
                <option value="braco">Braços (Bíceps e Tríceps Isolados)</option>
            `;
        } else if (method === 'biset_antagonista') {
            subLabel.textContent = "Pares de Combate (Opostos & Mistos):";
            subSelect.innerHTML = `
                <option value="peito_costa">Peito + Costas (Opostos Clássico)</option>
                <option value="biceps_triceps">Bíceps + Tríceps (Braços Insanos)</option>
                <option value="quad_post">Quadríceps + Posterior (Perna Opostos)</option>
                <option value="peito_biceps">Peito (Grande) + Bíceps (Pequeno)</option>
                <option value="costa_triceps">Costas (Grande) + Tríceps (Pequeno)</option>
                <option value="ombro_perna">Ombros + Pernas</option>
            `;
        } else if (method === 'biset_sinergista') {
            subLabel.textContent = "Pares Sinergistas (Principal + Auxiliar):";
            subSelect.innerHTML = `
                <option value="peito_triceps">Peito + Tríceps</option>
                <option value="costa_biceps">Costas + Bíceps</option>
                <option value="perna_ombro">Pernas + Ombros</option>
            `;
        } else {
            subBox.style.display = 'none'; // Circuito e Calistenia não precisam de sub-opção
        }
    }

    function generateForgedWorkout() {
        const method = document.getElementById('forgeMethod').value;
        const subOpt = document.getElementById('forgeSubSelect').value;
        
        const removeAccents = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
        const getEx = (focusTerms, equipPref, avoidNames, isStrictEquip = false) => {
            let pool = dictionaryData.filter(d => {
                const f = removeAccents(d.focus);
                const matchFocus = focusTerms.some(term => f.includes(term));
                let matchEquip = true;
                if (equipPref) {
                    if (isStrictEquip) matchEquip = (d.equip === equipPref);
                    else matchEquip = (d.equip === equipPref || !d.equip);
                }
                return matchFocus && matchEquip && !avoidNames.includes(d.name);
            });
            if (pool.length === 0 && !isStrictEquip) {
                pool = dictionaryData.filter(d => focusTerms.some(term => removeAccents(d.focus).includes(term)) && !avoidNames.includes(d.name));
            }
            return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
        };

        let generatedBlocks = [];
        let used = [];
        let finalTitle = "";

        // 1. PUSH / PULL / LEGS (Sinergia de Eixos)
        if (method === 'ppl') {
            if (subOpt === 'push') {
                finalTitle = "Push Day (Hipertrofia)";
                let e1 = getEx(['peito'], 'barra', used); if(e1) used.push(e1.name);
                let e2 = getEx(['ombro'], 'haltere', used); if(e2) used.push(e2.name);
                if(e1) generatedBlocks.push({ title: "Força Base", exercises: [ {name: e1.name, sets: 4, target: "8-10"}, ...(e2 ? [{name: e2.name, sets: 4, target: "10-12"}] : []) ]});
                
                let e3 = getEx(['peito'], 'haltere', used); if(e3) used.push(e3.name);
                let e4 = getEx(['triceps'], 'cabo', used); if(e4) used.push(e4.name);
                if(e3) generatedBlocks.push({ title: "Dano Muscular", exercises: [ {name: e3.name, sets: 4, target: "10-12"}, ...(e4 ? [{name: e4.name, sets: 4, target: "12"}] : []) ]});
            } else if (subOpt === 'pull') {
                finalTitle = "Pull Day (Hipertrofia)";
                let e1 = getEx(['costa', 'dorsal'], 'barra', used); if(e1) used.push(e1.name);
                let e2 = getEx(['trapezio', 'posterior'], 'haltere', used); if(e2) used.push(e2.name);
                if(e1) generatedBlocks.push({ title: "Tração Pesada", exercises: [ {name: e1.name, sets: 4, target: "8-10"}, ...(e2 ? [{name: e2.name, sets: 4, target: "10-12"}] : []) ]});
                
                let e3 = getEx(['costa', 'dorsal'], 'maquina', used); if(e3) used.push(e3.name);
                let e4 = getEx(['biceps'], 'cabo', used); if(e4) used.push(e4.name);
                if(e3) generatedBlocks.push({ title: "Volume de Contração", exercises: [ {name: e3.name, sets: 4, target: "10-12"}, ...(e4 ? [{name: e4.name, sets: 4, target: "12"}] : []) ]});
            } else {
                finalTitle = "Legs Day (Hipertrofia)";
                let e1 = getEx(['perna', 'quadriceps'], 'barra', used); if(e1) used.push(e1.name);
                let e2 = getEx(['posterior'], 'haltere', used); if(e2) used.push(e2.name);
                if(e1) generatedBlocks.push({ title: "Eixo de Força", exercises: [ {name: e1.name, sets: 4, target: "8-10"}, ...(e2 ? [{name: e2.name, sets: 4, target: "10-12"}] : []) ]});
                
                let e3 = getEx(['panturrilha'], null, used); if(e3) used.push(e3.name);
                let e4 = getEx(['core', 'abdom'], null, used); if(e4) used.push(e4.name);
                if(e3) generatedBlocks.push({ title: "Isolamento", exercises: [ {name: e3.name, sets: 4, target: "15"}, ...(e4 ? [{name: e4.name, sets: 3, target: "Falha"}] : []) ]});
            }
        }
        // 2. BI-SET AGONISTA (Pré/Pós Exaustão - Mesmo Músculo)
        else if (method === 'biset_agonista') {
            finalTitle = "Agonista: " + subOpt.toUpperCase();
            let focus = [subOpt];
            if(subOpt === 'braco') focus = ['biceps', 'triceps'];
            
            // Cria 3 blocos massacrantes para a mesma região
            for(let i=1; i<=3; i++) {
                let e1 = getEx(focus, i===1 ? 'barra' : 'haltere', used); if(e1) used.push(e1.name);
                let e2 = getEx(focus, i===3 ? 'cabo' : 'maquina', used); if(e2) used.push(e2.name);
                if(e1 && e2) {
                    generatedBlocks.push({ title: `Bi-Set Agonista ${i} (Fadiga Extrema)`, exercises: [ {name: e1.name, sets: 3, target: "10 rep"}, {name: e2.name, sets: 3, target: "Até a falha"} ]});
                }
            }
        }
        // 3. BI-SET ANTAGONISTA / MISTO
        else if (method === 'biset_antagonista') {
            finalTitle = "Bi-Set Dinâmico: " + subOpt.split('_').join(' + ').toUpperCase();
            let g1 = [subOpt.split('_')[0]];
            let g2 = [subOpt.split('_')[1]];
            
            // Traduz siglas curtas
            if(g1[0]==='quad') g1=['quadriceps']; if(g2[0]==='post') g2=['posterior'];
            
            for(let i=1; i<=3; i++) {
                let e1 = getEx(g1, null, used); if(e1) used.push(e1.name);
                let e2 = getEx(g2, null, used); if(e2) used.push(e2.name);
                if(e1 && e2) {
                    generatedBlocks.push({ title: `Bloco Oposto ${i}`, exercises: [ {name: e1.name, sets: 4, target: "10-12"}, {name: e2.name, sets: 4, target: "10-12"} ]});
                }
            }
        }
        // 4. CIRCUITO METABÓLICO (FullBody)
        else if (method === 'circuito') {
            finalTitle = "Circuito Metabólico Extreme";
            let cExs = [];
            let fP = getEx(['perna'], 'peso_corporal', used) || getEx(['perna'], null, used); if(fP) { used.push(fP.name); cExs.push({name: fP.name, sets: 4, target: "15-20 rep"}); }
            let fC = getEx(['peito'], 'peso_corporal', used) || getEx(['peito'], null, used); if(fC) { used.push(fC.name); cExs.push({name: fC.name, sets: 4, target: "15-20 rep"}); }
            let fB = getEx(['costa'], 'maquina', used); if(fB) { used.push(fB.name); cExs.push({name: fB.name, sets: 4, target: "15-20 rep"}); }
            let fS = getEx(['ombro'], 'haltere', used); if(fS) { used.push(fS.name); cExs.push({name: fS.name, sets: 4, target: "15-20 rep"}); }
            let fA = getEx(['core'], 'peso_corporal', used); if(fA) { used.push(fA.name); cExs.push({name: fA.name, sets: 4, target: "1 min"}); }
            
            if(cExs.length > 0) generatedBlocks.push({ title: "Rodada FullBody (Minímo Descanso)", exercises: cExs });
            
            // Altera o descanso padrão no motor para 30s-45s conforme o manual
            FitApp.adjustRestTime(45); 
        }
        // 5. CALISTENIA PURA
        else if (method === 'calistenia') {
            finalTitle = "Calistenia (Dominando o Corpo)";
            let cal1 = getEx(['peito', 'triceps'], 'calistenia', used, true) || getEx(['peito'], 'peso_corporal', used, true); if(cal1) used.push(cal1.name);
            let cal2 = getEx(['costa', 'biceps'], 'calistenia', used, true) || getEx(['costa'], 'peso_corporal', used, true); if(cal2) used.push(cal2.name);
            if(cal1) generatedBlocks.push({ title: "Bloco Superior", exercises: [ {name: cal1.name, sets: 4, target: "Falha"}, ...(cal2 ? [{name: cal2.name, sets: 4, target: "Falha"}] : []) ]});
            
            let cal3 = getEx(['perna'], 'peso_corporal', used, true); if(cal3) used.push(cal3.name);
            let cal4 = getEx(['core'], 'calistenia', used, true) || getEx(['core'], 'peso_corporal', used, true); if(cal4) used.push(cal4.name);
            if(cal3) generatedBlocks.push({ title: "Base e Core", exercises: [ {name: cal3.name, sets: 4, target: "20 rep"}, ...(cal4 ? [{name: cal4.name, sets: 4, target: "Isometria Máx"}] : []) ]});
        }

        if(generatedBlocks.length === 0) {
            FitApp.showToast("Erro tático: Sem exercícios suficientes no dicionário para esta métrica.");
            return;
        }

        currentRoutine = generatedBlocks;
        currentWorkoutType = 'Livre';
        document.getElementById('forgeModal').style.display = 'none';
        
        // Dispara o motor de carregamento para abrir a tela de visualização (Preview)
        loadWorkout();
        
        // Atualiza o nome da input para refletir a escolha
        const nameInput = document.getElementById('customWorkoutName');
        if (nameInput) nameInput.value = finalTitle;
        
        FitApp.showToast("Rotina forjada com sucesso. Verifique o plano.");
        if(audioEnabled) FitApp.speak("Treino gerado conforme literatura biomecânica.");
    }
function updateDynamicCards() {
        const selector = document.getElementById('mainMethodSelector');
        if (!selector) return;
        
        const method = selector.value;
        safeSet('fitapp_main_method', method);
        
        // NOVO: Padrão fallback agora é hipertrofia
        const profile = document.getElementById('profileSelector') ? document.getElementById('profileSelector').value : 'hipertrofia';
        
        const cA = document.getElementById('card-A'); const cB = document.getElementById('card-B');
        const cC = document.getElementById('card-C'); const cD = document.getElementById('card-D');
        
        if (!cA || !cB || !cC) return;

        let tA="Treino A", sA="", tB="Treino B", sB="", tC="Treino C", sC="", tD="Treino D", sD="";

        if (cD) cD.style.display = (method === 'abcd') ? 'block' : 'none';

        if (method === 'abc' || method === 'ppl') {
            if (profile === 'feminino') {
                tA="Treino A (Posterior)"; sA="Glúteos & Isquiotibiais";
                tB="Treino B (Superiores)"; sB="Costas, Peito & Braços";
                tC="Treino C (Anterior)"; sC="Quadríceps & Panturrilhas";
            } else if (profile === 'definicao') {
                tA="Push + Cardio"; sA="Peito, Ombro, Tri & Motor";
                tB="Pull + Core"; sB="Costas, Bi, Trapézio & Abs";
                tC="Legs + Agilidade"; sC="Pernas Completas & Sprint";
            } else { // Hipertrofia (Padrão)
                tA="Treino Push"; sA="Peito, Ombro, Tríceps";
                tB="Treino Pull"; sB="Costas, Trapézio, Bíceps";
                tC="Treino Legs"; sC="Pernas & Panturrilhas";
            }
        } else if (method === 'abcd') {
            if (profile === 'feminino') {
                tA="Treino A (Anterior)"; sA="Quadríceps & Panturrilhas";
                tB="Treino B (Superiores)"; sB="Tônus Superior Completo";
                tC="Treino C (Posterior)"; sC="Isquiotibiais & Lombar";
                tD="Treino D (Glúteos)"; sD="Foco Glúteo Máximo & Médio";
            } else if (profile === 'definicao') {
                tA="Peito & Tríceps"; sA="Hipertrofia Clássica";
                tB="Anterior + Pliometria"; sB="Quadríceps, Panturrilha & Salto";
                tC="Costas & Bíceps"; sC="Puxadas & Motor Aeróbico";
                tD="Posterior + Esporte"; sD="Posterior, Glúteo & Arrancada";
            } else { // Hipertrofia (Padrão)
                tA="Treino A (Push)"; sA="Peito & Tríceps";
                tB="Treino B (Foco Anterior)"; sB="Quadríceps & Panturrilhas";
                tC="Treino C (Pull)"; sC="Costas & Bíceps";
                tD="Treino D (Foco Posterior)"; sD="Isquiotibiais & Ombros";
            }
        } else if (method === 'biset_agonista') {
            if (profile === 'feminino') {
                tA="Fritura Posterior"; sA="Glúteos & Isquiotibiais";
                tB="Fritura Superior"; sB="Superiores (Tônus)";
                tC="Fritura Anterior"; sC="Quadríceps & Panturrilha";
            } else if (profile === 'definicao') {
                tA="Exaustão Push"; sA="Peito/Ombro/Tri + Core";
                tB="Exaustão Pull"; sB="Costas/Bi + Metabólico";
                tC="Exaustão Legs"; sC="Pernas Completas + Cardio";
            } else { // Hipertrofia (Padrão)
                tA="Bi-Set Push"; sA="Peitoral, Ombro & Tríceps";
                tB="Bi-Set Pull"; sB="Dorsais, Trapézio & Bíceps";
                tC="Bi-Set Legs"; sC="Pernas Completas";
            }
        } else if (method === 'biset_antagonista') {
            if (profile === 'feminino') {
                tA="Pernas Opostas"; sA="Quadríceps vs Posterior";
                tB="Superiores Opostos"; sB="Costas vs Peito";
                tC="Glúteo & Core"; sC="Glúteos vs Estabilizadores";
            } else if (profile === 'definicao') {
                tA="Derretedor A"; sA="Peito/Costas + Cardio";
                tB="Derretedor B"; sB="Pernas/Core + Pliometria";
                tC="Derretedor C"; sC="Ombros/Braços + Resistência";
            } else { // Hipertrofia (Padrão)
                tA="Antagonista A"; sA="Peito + Costas";
                tB="Antagonista B"; sB="Pernas + Core";
                tC="Antagonista C"; sC="Ombros + Braços";
            }
        } else if (method === 'biset_sinergista') {
            if (profile === 'feminino') {
                tA="Sinergia Posterior"; sA="Glúteo + Posterior";
                tB="Sinergia Superior"; sB="Costas/Bíceps & Peito/Tríceps";
                tC="Sinergia Anterior"; sC="Quadríceps + Adutores";
            } else if (profile === 'definicao') {
                tA="Sinergista A"; sA="Peito/Tri + Metabólico";
                tB="Sinergista B"; sB="Costas/Bi + Aeróbico";
                tC="Sinergista C"; sC="Pernas/Ombro + Agilidade";
            } else { // Hipertrofia (Padrão)
                tA="Sinergista Push"; sA="Peito + Tríceps + Ombro";
                tB="Sinergista Pull"; sB="Costas + Bíceps + Trapézio";
                tC="Sinergista Legs"; sC="Pernas Completas";
            }
        } else if (method === 'circuito') {
            if (profile === 'definicao') {
                tA="Seca Extrema 1"; sA="Cardio & Pliometria Base";
                tB="Seca Extrema 2"; sB="FullBody Dinâmico";
                tC="Seca Extrema 3"; sC="Resistência Anaeróbica";
            } else {
                tA="Circuito 1"; sA="Metabólico FullBody";
                tB="Circuito 2"; sB="Cardio & Força";
                tC="Circuito 3"; sC="Resistência Extrema";
            }
        }

        if(cA.querySelector('h3')) { cA.querySelector('h3').textContent = tA; cA.querySelector('p').textContent = sA; }
        if(cB.querySelector('h3')) { cB.querySelector('h3').textContent = tB; cB.querySelector('p').textContent = sB; }
        if(cC.querySelector('h3')) { cC.querySelector('h3').textContent = tC; cC.querySelector('p').textContent = sC; }
        if(cD && cD.querySelector('h3')) { cD.querySelector('h3').textContent = tD; cD.querySelector('p').textContent = sD; }
    }

    function executeForgeLogic(method, subOpt, avoidNamesGlobal = []) {
        const removeAccents = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
        const includeAbs = document.getElementById('toggleAbs') ? document.getElementById('toggleAbs').checked : false;

        const getEx = (focusTerms, equipPref, avoidNames, allowBodyweight = false) => {
            // A Pedra de Roseta: Expandida para abranger a biomecânica avançada e metabólica
            const mapFocus = {
                'peito_esternocostal': ['Fibras Médias'], 'peito_clavicular': ['Fibras Superiores'], 'peito_costal': ['Fibras Inferiores'], 'peito': ['Fibras Médias', 'Fibras Superiores', 'Fibras Inferiores'],
                'costa_largura': ['Latíssimo (Largura)'], 'costa_espessura': ['Romboides/Miolo (Espessura)'], 'costa_isolado': ['Latíssimo (Largura)'], 'costa': ['Latíssimo (Largura)', 'Romboides/Miolo (Espessura)'],
                'ombro_anterior': ['Deltoide Anterior'], 'ombro_lateral': ['Deltoide Lateral'], 'ombro_posterior': ['Deltoide Posterior'], 'ombro': ['Deltoide Anterior', 'Deltoide Lateral'], 'trapezio': ['Trapézio Superior'],
                'perna_quadriceps': ['Quadríceps', 'Reto Femoral'], 
                'perna_posterior_gluteo': ['Isquiotibiais', 'Glúteos/Abdutores', 'Glúteo Máximo', 'Glúteo Médio/Mínimo', 'Isquiotibiais (Porção Alongada)', 'Isquiotibiais (Porção Encurtada)'], 
                'perna_adutor_abdutor': ['Adutores', 'Glúteos/Abdutores', 'Glúteo Médio/Mínimo'], 
                'perna': ['Quadríceps', 'Reto Femoral', 'Isquiotibiais', 'Glúteo Máximo', 'Isquiotibiais (Porção Alongada)', 'Isquiotibiais (Porção Encurtada)'],
                'panturrilha_gastro': ['Panturrilhas', 'Panturrilhas (Gastrocnêmios)'], 
                'panturrilha_soleo': ['Panturrilhas', 'Panturrilhas (Sóleo)'], 
                'panturrilha': ['Panturrilhas', 'Panturrilhas (Gastrocnêmios)', 'Panturrilhas (Sóleo)', 'Tibial Anterior'],
                'triceps_longa': ['Cabeça Longa'], 'triceps_lateral_medial': ['Lateral/Medial'], 'triceps_global': ['Todas'], 'triceps': ['Todas', 'Lateral/Medial', 'Cabeça Longa'],
                'biceps_longa': ['Cabeça Curta/Longa'], 'biceps_curta': ['Cabeça Curta/Longa'], 'biceps_braquial': ['Braquial/Antebraço'], 'biceps_global': ['Cabeça Curta/Longa'], 'biceps': ['Cabeça Curta/Longa'],
                'core_supra': ['Superior'], 'core_infra': ['Inferior'], 'core_obliquo': ['Oblíquos / Rotação'], 'core_profundo': ['Estabilização/Anti-extensão'], 'core': ['Superior', 'Inferior', 'Estabilização/Anti-extensão'],
                
                // NOVO: Integração Metabólica (Cutting)
                'cardio_motor': ['Motor Aeróbico'],
                'cardio_resistencia': ['Resistência Anaeróbica'],
                'esporte_pliometria': ['Pliometria'],
                'esporte_agilidade': ['Agilidade e Frenagem'],
                'esporte_aceleracao': ['Aceleração e Velocidade']
            };
            const mapEquip = { 'barra': 'Barras_Anilhas', 'halter': 'Pesos_Livres', 'maquina': 'Maquinas_Polias', 'cabo': 'Maquinas_Polias', 'peso_corporal': 'Peso_Corporal', 'calistenia': 'Calistenia' };

            let pool = dictionaryData.filter(d => {
                const exEquip = d.equip || '';
                const exGroup = d.group || '';
                const exFocus = d.focus || '';

                const validFocuses = focusTerms.flatMap(term => mapFocus[term] || [term]);
                const matchFocus = validFocuses.includes(exFocus) || validFocuses.some(f => exGroup.includes(f));
                
                let isCalisthenics = exEquip.includes('Peso_Corporal') || exEquip.includes('Calistenia');
                if (!allowBodyweight && isCalisthenics) return false;

                let matchEquip = true;
                if (equipPref) {
                    const translatedEquip = mapEquip[equipPref] || equipPref;
                    matchEquip = exEquip.includes(translatedEquip);
                }
                return matchFocus && matchEquip && !avoidNames.includes(d.name);
            });

            if (pool.length === 0) {
                pool = dictionaryData.filter(d => {
                    const exEquip = d.equip || '';
                    const exGroup = d.group || '';
                    const exFocus = d.focus || '';

                    let isCalisthenics = exEquip.includes('Peso_Corporal') || exEquip.includes('Calistenia');
                    if (!allowBodyweight && isCalisthenics) return false;
                    
                    const validFocuses = focusTerms.flatMap(term => mapFocus[term] || [term]);
                    return (validFocuses.includes(exFocus) || validFocuses.some(f => exGroup.includes(f))) && !avoidNames.includes(d.name);
                });
            }
            return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
        };

        let generatedBlocks = [];
        let used = [...avoidNamesGlobal]; 
        
        const rawProfile = document.getElementById('profileSelector') ? document.getElementById('profileSelector').value : 'hipertrofia';
        const routeProfile = (rawProfile === 'definicao' || rawProfile === 'masculino') ? 'hipertrofia' : rawProfile;

        // 🛡️ O ESCUDO BIOMECÂNICO (Uso Global para as Plantas Baixas)
        const safeSlot = (focusArr, equip = null, target = "10-12 rep") => {
            let ex = getEx(focusArr, equip, used);
            if (!ex && equip) ex = getEx(focusArr, null, used);
            if (!ex) ex = getEx(focusArr, null, []); 
            if (!ex) {
                const parentTerm = focusArr[0].split('_')[0]; 
                ex = getEx([parentTerm], null, []);
            }
            if (ex) used.push(ex.name);
            return ex ? { name: ex.name, sets: 4, target: target } : null;
        };

        // --- SISTEMA ABC / PPL (Etapa Alpha: Plantas Baixas) ---
        if (method === 'abc' || method === 'ppl') {
            let blueprint = [];
            
            if (routeProfile === 'feminino') {
                if (subOpt === 'push' || subOpt === 'A') { // Treino A (Posterior Expandido)
                    blueprint = [
                        { title: "Bloco 1: Glúteos & Posteriores Base", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                        { title: "Bloco 2: Abdução & Isolamento", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep"), safeSlot(['perna_adutor_abdutor'], 'cabo', "12-15 rep") ] },
                        { title: "Bloco 3: Posteriores Encurtados", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'halter', "12-15 rep") ] },
                        { title: "Bloco 4: Finalização & Core", slots: [ safeSlot(['perna_posterior_gluteo'], 'peso_corporal', "Até a falha"), safeSlot(['core_supra', 'core_infra'], null, "15-20 rep") ] }
                    ];
                } else if (subOpt === 'pull' || subOpt === 'B') { // Treino B (Superiores Completo)
                    blueprint = [
                        { title: "Bloco 1: Costas (Puxadas e Remadas)", slots: [ safeSlot(['costa_largura'], 'maquina', "10-12 rep"), safeSlot(['costa_espessura'], 'barra', "10-12 rep") ] },
                        { title: "Bloco 2: Peitoral e Ombro Frontal", slots: [ safeSlot(['peito_esternocostal'], 'halter', "12-15 rep"), safeSlot(['ombro_anterior'], 'halter', "10-12 rep") ] },
                        { title: "Bloco 3: Deltoides Lateral e Posterior", slots: [ safeSlot(['ombro_lateral'], 'halter', "12-15 rep"), safeSlot(['ombro_posterior', 'trapezio'], 'cabo', "12-15 rep") ] },
                        { title: "Bloco 4: Braços e Core", slots: [ safeSlot(['triceps_global', 'biceps_global'], 'cabo', "12-15 rep"), safeSlot(['core_obliquo'], null, "15-20 rep") ] }
                    ];
                } else { // Treino C (Anterior Expandido)
                    blueprint = [
                        { title: "Bloco 1: Base Anterior (Quadríceps)", slots: [ safeSlot(['perna_quadriceps'], 'barra', "10-12 rep"), safeSlot(['perna_quadriceps'], 'halter', "10-12 rep") ] },
                        { title: "Bloco 2: Isolamento Articular", slots: [ safeSlot(['perna_quadriceps'], 'maquina', "12-15 rep"), safeSlot(['perna_quadriceps'], 'maquina', "12-15 rep") ] },
                        { title: "Bloco 3: Panturrilhas", slots: [ safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep"), safeSlot(['panturrilha_soleo'], 'maquina', "15-20 rep") ] },
                        { title: "Bloco 4: Core e Estabilização", slots: [ safeSlot(['core_profundo'], 'peso_corporal', "1 min"), safeSlot(['panturrilha_gastro'], 'peso_corporal', "Até a falha") ] }
                    ];
                }
            } else {
                if (subOpt === 'push' || subOpt === 'A') {
                    blueprint = [
                        { title: "Bloco 1: Peitoral Base", slots: [ safeSlot(['peito_clavicular'], 'barra', "8-10 rep"), safeSlot(['peito_esternocostal'], 'halter', "8-10 rep") ] },
                        { title: "Bloco 2: Peitoral Isolado & Ombro Frontal", slots: [ safeSlot(['peito_costal'], 'cabo', "10-12 rep"), safeSlot(['ombro_anterior'], 'halter', "10-12 rep") ] },
                        { title: "Bloco 3: Ombro Lateral & Tríceps Base", slots: [ safeSlot(['ombro_lateral'], 'halter', "12-15 rep"), safeSlot(['triceps_longa'], 'halter', "10-12 rep") ] },
                        { title: "Bloco 4: Tríceps Foco", slots: [ safeSlot(['triceps_lateral_medial'], 'cabo', "12-15 rep") ] }
                    ];
                    if(rawProfile === 'definicao') blueprint[3].slots.push(safeSlot(['cardio_motor'], 'peso_corporal', "1 min"));
                } else if (subOpt === 'pull' || subOpt === 'B') {
                    blueprint = [
                        { title: "Bloco 1: Dorsais Base", slots: [ safeSlot(['costa_largura'], 'barra', "8-10 rep"), safeSlot(['costa_espessura'], 'maquina', "8-10 rep") ] },
                        { title: "Bloco 2: Posterior & Lombar", slots: [ safeSlot(['costa_isolado', 'costa'], 'cabo', "10-12 rep"), safeSlot(['ombro_posterior'], 'halter', "10-12 rep") ] },
                        { title: "Bloco 3: Trapézio & Bíceps Base", slots: [ safeSlot(['trapezio'], 'halter', "12-15 rep"), safeSlot(['biceps_longa', 'biceps_curta'], 'barra', "10-12 rep") ] },
                        { title: "Bloco 4: Braquial Foco", slots: [ safeSlot(['biceps_braquial'], 'cabo', "12-15 rep") ] }
                    ];
                    if(rawProfile === 'definicao') blueprint[3].slots.push(safeSlot(['cardio_resistencia'], 'peso_corporal', "1 min"));
                } else { // Legs
                    blueprint = [
                        { title: "Bloco 1: Quadríceps Primário", slots: [ safeSlot(['perna_quadriceps'], 'barra', "8-10 rep"), safeSlot(['perna_quadriceps'], 'maquina', "10-12 rep") ] },
                        { title: "Bloco 2: Cadeia Posterior", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                        { title: "Bloco 3: Panturrilhas Sinergistas", slots: [ safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep"), safeSlot(['panturrilha_soleo'], 'maquina', "15-20 rep") ] },
                        { title: "Bloco 4: Core & Estabilização", slots: [ safeSlot(['core_profundo', 'core_supra'], null, "15-20 rep") ] }
                    ];
                    if(rawProfile === 'definicao') blueprint[3].slots.push(safeSlot(['esporte_agilidade', 'cardio_motor'], 'peso_corporal', "1 min"));
                }
            }

            blueprint.forEach(b => {
                const validExs = b.slots.filter(s => s !== null);
                if (validExs.length > 0) {
                    generatedBlocks.push({ title: b.title, exercises: validExs });
                }
            });
        }
        
        // --- SISTEMA ABCD (Etapa Bravo: Plantas Baixas) ---
        else if (method === 'abcd') {
            let blueprint = [];
            
            if (routeProfile === 'feminino') {
                if (subOpt === 'A') { 
                    blueprint = [
                        { title: "Bloco 1: Foco Frontal Base", slots: [ safeSlot(['perna_quadriceps'], 'barra', "10-12 rep"), safeSlot(['perna_quadriceps'], 'maquina', "10-12 rep") ] },
                        { title: "Bloco 2: Isolamento Quadríceps", slots: [ safeSlot(['perna_quadriceps'], 'maquina', "12-15 rep"), safeSlot(['perna_quadriceps'], 'peso_corporal', "12-15 rep") ] },
                        { title: "Bloco 3: Panturrilhas", slots: [ safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep"), safeSlot(['panturrilha_soleo'], 'maquina', "15-20 rep") ] },
                        { title: "Bloco 4: Core & Estabilização", slots: [ safeSlot(['core_supra', 'core_infra'], 'peso_corporal', "15-20 rep") ] }
                    ];
                } else if (subOpt === 'B') { 
                    blueprint = [
                        { title: "Bloco 1: Costas e Peito", slots: [ safeSlot(['costa_largura'], 'maquina', "10-12 rep"), safeSlot(['peito_esternocostal'], 'halter', "10-12 rep") ] },
                        { title: "Bloco 2: Ombros", slots: [ safeSlot(['ombro_lateral'], 'halter', "12-15 rep"), safeSlot(['ombro_anterior', 'ombro_posterior'], 'halter', "12-15 rep") ] },
                        { title: "Bloco 3: Braços", slots: [ safeSlot(['triceps_lateral_medial'], 'cabo', "12-15 rep"), safeSlot(['biceps_curta'], 'halter', "12-15 rep") ] },
                        { title: "Bloco 4: Postura", slots: [ safeSlot(['costa_espessura', 'trapezio'], 'maquina', "15-20 rep") ] }
                    ];
                } else if (subOpt === 'C') { 
                    blueprint = [
                        { title: "Bloco 1: Cadeia Posterior", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                        { title: "Bloco 2: Foco Isquiotibiais", slots: [ safeSlot(['perna_posterior_gluteo'], 'cabo', "12-15 rep"), safeSlot(['perna_posterior_gluteo'], 'peso_corporal', "15-20 rep") ] },
                        { title: "Bloco 3: Lombar & Core", slots: [ safeSlot(['costa'], 'peso_corporal', "12-15 rep"), safeSlot(['core_obliquo'], 'peso_corporal', "15-20 rep") ] },
                        { title: "Bloco 4: Finalização", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina', "Até a falha") ] }
                    ];
                } else if (subOpt === 'D') { 
                    blueprint = [
                        { title: "Bloco 1: Força Glútea", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                        { title: "Bloco 2: Abdução e Adução", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep"), safeSlot(['perna_adutor_abdutor'], 'cabo', "12-15 rep") ] },
                        { title: "Bloco 3: Isolamento Glúteo", slots: [ safeSlot(['perna_posterior_gluteo'], 'cabo', "12-15 rep"), safeSlot(['perna_posterior_gluteo'], 'peso_corporal', "15-20 rep") ] },
                        { title: "Bloco 4: Core Frontal", slots: [ safeSlot(['core_supra', 'core_infra'], 'peso_corporal', "15-20 rep") ] }
                    ];
                }
            } else {
                if (subOpt === 'A') { // Peito e Tríceps
                    blueprint = [
                        { title: "Bloco 1: Peitoral", slots: [ safeSlot(['peito_clavicular'], 'barra', "8-10 rep"), safeSlot(['peito_esternocostal'], 'halter', "10-12 rep"), safeSlot(['peito_costal'], 'cabo', "12-15 rep") ] },
                        { title: "Bloco 2: Tríceps", slots: [ safeSlot(['triceps_longa'], 'halter', "10-12 rep"), safeSlot(['triceps_lateral_medial'], 'cabo', "12-15 rep") ] },
                        { title: "Bloco 3: Core Superior", slots: [ safeSlot(['core_supra'], null, "15-20 rep") ] }
                    ];
                    if(rawProfile === 'definicao') blueprint[2].slots.push(safeSlot(['cardio_motor'], 'peso_corporal', "1 min"));
                }
                else if (subOpt === 'B') { // Foco Anterior
                    blueprint = [
                        { title: "Bloco 1: Quadríceps", slots: [ safeSlot(['perna_quadriceps'], 'barra', "8-10 rep"), safeSlot(['perna_quadriceps'], 'maquina', "10-12 rep") ] },
                        { title: "Bloco 2: Adutores & Tibial", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep"), safeSlot(['panturrilha'], 'peso_corporal', "15-20 rep") ] },
                        { title: "Bloco 3: Panturrilhas & Core", slots: [ safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep"), safeSlot(['panturrilha_soleo'], 'maquina', "15-20 rep") ] }
                    ];
                    if(rawProfile === 'definicao') blueprint[2].slots.push(safeSlot(['esporte_pliometria'], 'peso_corporal', "1 min"));
                }
                else if (subOpt === 'C') { // Costas e Bíceps
                    blueprint = [
                        { title: "Bloco 1: Dorsais", slots: [ safeSlot(['costa_largura'], 'barra', "8-10 rep"), safeSlot(['costa_espessura'], 'maquina', "10-12 rep"), safeSlot(['costa_isolado'], 'cabo', "12-15 rep") ] },
                        { title: "Bloco 2: Trapézio & Bíceps", slots: [ safeSlot(['trapezio'], 'halter', "12-15 rep"), safeSlot(['biceps_longa', 'biceps_curta'], 'barra', "10-12 rep") ] },
                        { title: "Bloco 3: Braquial", slots: [ safeSlot(['biceps_braquial'], 'cabo', "12-15 rep") ] }
                    ];
                    if(rawProfile === 'definicao') blueprint[2].slots.push(safeSlot(['cardio_motor'], 'peso_corporal', "1 min"));
                }
                else if (subOpt === 'D') { // Ombros e Posterior
                    blueprint = [
                        { title: "Bloco 1: Deltoides", slots: [ safeSlot(['ombro_anterior'], 'halter', "8-10 rep"), safeSlot(['ombro_lateral'], 'halter', "10-12 rep"), safeSlot(['ombro_posterior'], 'cabo', "12-15 rep") ] },
                        { title: "Bloco 2: Glúteo & Isquio", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep") ] },
                        { title: "Bloco 3: Posteriores Encurtados", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina', "12-15 rep") ] }
                    ];
                    if(rawProfile === 'definicao') blueprint[2].slots.push(safeSlot(['esporte_aceleracao'], 'peso_corporal', "1 min"));
                }
            }

            blueprint.forEach(b => {
                const validExs = b.slots.filter(s => s !== null);
                if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
            });
        } 
        // --- BI-SETS ANTAGONISTA & MISTO ---
        else if (method === 'biset_antagonista') {
            let blueprint = [];
            
            // Normalizando o Eixo (A, B ou C) baseado no legado do subOpt
            let isA = (subOpt === 'A' || subOpt.includes('peito_costa'));
            let isB = (subOpt === 'B' || subOpt.includes('biceps_triceps') || (routeProfile === 'feminino' && subOpt.includes('quad_post')));
            let isC = (!isA && !isB);

            if (routeProfile === 'feminino') {
                if (isA) { // Peito e Costas
                    blueprint = [
                        { title: "Série 1: Peito Sup + Costas Largura", slots: [ safeSlot(['peito_clavicular'], 'halter'), safeSlot(['costa_largura'], 'maquina') ] },
                        { title: "Série 2: Peito Med + Costas Espessura", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['costa_espessura'], 'barra') ] },
                        { title: "Série 3: Peito Inf + Costas Lombar", slots: [ safeSlot(['peito_costal'], 'cabo'), safeSlot(['costa'], 'peso_corporal') ] },
                        { title: "Série 4: Trapézio + Core", slots: [ safeSlot(['trapezio'], 'halter'), safeSlot(['core_obliquo'], 'peso_corporal') ] }
                    ];
                } else if (isB) { // Pernas e Core
                    blueprint = [
                        { title: "Série 1: Quadríceps + Isquiotibiais", slots: [ safeSlot(['perna_quadriceps'], 'barra'), safeSlot(['perna_posterior_gluteo'], 'maquina') ] },
                        { title: "Série 2: Glúteos + Adutores", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra'), safeSlot(['perna_adutor_abdutor'], 'maquina') ] },
                        { title: "Série 3: Quad Isolado + Panturrilha", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['panturrilha_gastro'], 'maquina') ] },
                        { title: "Série 4: Panturrilha + Core", slots: [ safeSlot(['panturrilha_soleo'], 'maquina'), safeSlot(['core_infra'], 'peso_corporal') ] }
                    ];
                } else { // Ombros e Braços
                    blueprint = [
                        { title: "Série 1: Bíceps + Tríceps Longa", slots: [ safeSlot(['biceps_longa'], 'halter'), safeSlot(['triceps_longa'], 'halter') ] },
                        { title: "Série 2: Braquial + Tríceps Lat/Med", slots: [ safeSlot(['biceps_braquial'], 'cabo'), safeSlot(['triceps_lateral_medial'], 'cabo') ] },
                        { title: "Série 3: Ombro Ant + Ombro Post", slots: [ safeSlot(['ombro_anterior'], 'halter'), safeSlot(['ombro_posterior'], 'halter') ] },
                        { title: "Série 4: Ombro Lat + Estabilização", slots: [ safeSlot(['ombro_lateral'], 'halter'), safeSlot(['core_profundo'], 'peso_corporal') ] }
                    ];
                }
            } else {
                // Hipertrofia / Definição
                if (isA) { 
                    blueprint = [
                        { title: "Série 1: Peitoral Sup + Costas Largura", slots: [ safeSlot(['peito_clavicular'], 'barra'), safeSlot(['costa_largura'], 'maquina') ] },
                        { title: "Série 2: Peitoral Med + Costas Espessura", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['costa_espessura'], 'barra') ] },
                        { title: "Série 3: Peitoral Inf + Costas Lombar", slots: [ safeSlot(['peito_costal'], 'cabo'), safeSlot(['costa'], 'peso_corporal') ] },
                        { title: "Série 4: Trapézio + Finisher", slots: [ safeSlot(['trapezio'], 'halter'), safeSlot(rawProfile==='definicao'?['cardio_motor']:['panturrilha_gastro'], 'peso_corporal') ] }
                    ];
                } else if (isB) {
                    blueprint = [
                        { title: "Série 1: Quadríceps Vastos + Isquio Alongada", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'barra') ] },
                        { title: "Série 2: Quad Reto + Isquio Encurtada", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'maquina') ] },
                        { title: "Série 3: Glúteo + Core", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra'), safeSlot(['core_profundo'], 'peso_corporal') ] },
                        { title: "Série 4: Panturrilhas + Finisher", slots: [ safeSlot(['panturrilha_gastro'], 'maquina'), safeSlot(rawProfile==='definicao'?['esporte_pliometria']:['panturrilha_soleo'], 'peso_corporal') ] }
                    ];
                } else {
                    blueprint = [
                        { title: "Série 1: Bíceps + Tríceps Longa", slots: [ safeSlot(['biceps_longa'], 'barra'), safeSlot(['triceps_longa'], 'halter') ] },
                        { title: "Série 2: Braquial + Tríceps Lateral", slots: [ safeSlot(['biceps_braquial'], 'cabo'), safeSlot(['triceps_lateral_medial'], 'cabo') ] },
                        { title: "Série 3: Deltoide Ant + Deltoide Post", slots: [ safeSlot(['ombro_anterior'], 'halter'), safeSlot(['ombro_posterior'], 'halter') ] },
                        { title: "Série 4: Deltoide Lat + Finisher", slots: [ safeSlot(['ombro_lateral'], 'halter'), safeSlot(rawProfile==='definicao'?['cardio_resistencia']:['core_obliquo'], 'peso_corporal') ] }
                    ];
                }
            }

            blueprint.forEach(b => {
                const validExs = b.slots.filter(s => s !== null);
                if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
            });
        }
        
        // --- BI-SETS AGONISTA (PRÉ-EXAUSTÃO) ---
        else if (method === 'biset_agonista') {
            let blueprint = [];
            let isA = (subOpt === 'A' || subOpt.includes('peito'));
            let isB = (subOpt === 'B' || subOpt.includes('costa'));
            let isC = (!isA && !isB);

            if (routeProfile === 'feminino') {
                if (isA) { // Push
                    blueprint = [
                        { title: "Série 1: Peito Sup Isolado + Composto", slots: [ safeSlot(['peito_clavicular'], 'halter'), safeSlot(['peito_clavicular'], 'barra') ] },
                        { title: "Série 2: Peito Médio + Ombro Ant", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['ombro_anterior'], 'halter') ] },
                        { title: "Série 3: Deltoide Lateral Exaustão", slots: [ safeSlot(['ombro_lateral'], 'halter'), safeSlot(['ombro_lateral'], 'cabo') ] },
                        { title: "Série 4: Tríceps Longa + Lateral", slots: [ safeSlot(['triceps_longa'], 'halter'), safeSlot(['triceps_lateral_medial'], 'cabo') ] }
                    ];
                } else if (isB) { // Pull
                    blueprint = [
                        { title: "Série 1: Costas Largura Iso + Comp", slots: [ safeSlot(['costa_largura'], 'cabo'), safeSlot(['costa_largura'], 'maquina') ] },
                        { title: "Série 2: Costas Espessura + Ombro Post", slots: [ safeSlot(['costa_espessura'], 'barra'), safeSlot(['ombro_posterior'], 'halter') ] },
                        { title: "Série 3: Lombar + Trapézio", slots: [ safeSlot(['costa'], 'peso_corporal'), safeSlot(['trapezio'], 'halter') ] },
                        { title: "Série 4: Bíceps + Braquial", slots: [ safeSlot(['biceps_longa'], 'barra'), safeSlot(['biceps_braquial'], 'cabo') ] }
                    ];
                } else { // Legs
                    blueprint = [
                        { title: "Série 1: Quadríceps Iso + Comp", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_quadriceps'], 'barra') ] },
                        { title: "Série 2: Isquiotibiais Iso + Comp", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'barra') ] },
                        { title: "Série 3: Glúteos + Adutores", slots: [ safeSlot(['perna_posterior_gluteo'], 'cabo'), safeSlot(['perna_adutor_abdutor'], 'maquina') ] },
                        { title: "Série 4: Panturrilhas", slots: [ safeSlot(['panturrilha_gastro'], 'maquina'), safeSlot(['panturrilha_soleo'], 'maquina') ] }
                    ];
                }
            } else {
                if (isA) { // Push
                    blueprint = [
                        { title: "Série 1: Peitoral Médio + Superior", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['peito_clavicular'], 'barra') ] },
                        { title: "Série 2: Deltoide Lateral + Anterior", slots: [ safeSlot(['ombro_lateral'], 'halter'), safeSlot(['ombro_anterior'], 'halter') ] },
                        { title: "Série 3: Tríceps Lateral + Longa", slots: [ safeSlot(['triceps_lateral_medial'], 'cabo'), safeSlot(['triceps_longa'], 'halter') ] },
                        { title: "Série 4: Core + Finisher", slots: [ safeSlot(['core_supra'], 'peso_corporal'), safeSlot(rawProfile==='definicao'?['cardio_motor']:['core_infra'], 'peso_corporal') ] }
                    ];
                } else if (isB) { // Pull
                    blueprint = [
                        { title: "Série 1: Costas Largura + Espessura", slots: [ safeSlot(['costa_largura'], 'cabo'), safeSlot(['costa_espessura'], 'barra') ] },
                        { title: "Série 2: Deltoide Posterior + Trapézio", slots: [ safeSlot(['ombro_posterior'], 'halter'), safeSlot(['trapezio'], 'halter') ] },
                        { title: "Série 3: Braquial + Bíceps", slots: [ safeSlot(['biceps_braquial'], 'cabo'), safeSlot(['biceps_longa'], 'barra') ] },
                        { title: "Série 4: Core + Finisher", slots: [ safeSlot(['core_obliquo'], 'peso_corporal'), safeSlot(rawProfile==='definicao'?['cardio_resistencia']:['core_profundo'], 'peso_corporal') ] }
                    ];
                } else { // Legs
                    blueprint = [
                        { title: "Série 1: Quadríceps Reto + Vastos", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_quadriceps'], 'barra') ] },
                        { title: "Série 2: Isquio Encurtada + Alongada", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'barra') ] },
                        { title: "Série 3: Glúteo + Adutores", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra'), safeSlot(['perna_adutor_abdutor'], 'maquina') ] },
                        { title: "Série 4: Panturrilhas", slots: [ safeSlot(['panturrilha_gastro'], 'maquina'), safeSlot(['panturrilha_soleo'], 'maquina') ] }
                    ];
                }
            }

            blueprint.forEach(b => {
                const validExs = b.slots.filter(s => s !== null);
                if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
            });
        }
        
        // --- BI-SETS SINERGISTA ---
        else if (method === 'biset_sinergista') {
            let blueprint = [];
            let isA = (subOpt === 'A' || subOpt.includes('peito'));
            let isB = (subOpt === 'B' || subOpt.includes('costa'));
            let isC = (!isA && !isB);

            if (routeProfile === 'feminino') {
                if (isA) { // Sinergia Posterior
                    blueprint = [
                        { title: "Série 1: Quadríceps + Glúteo", slots: [ safeSlot(['perna_quadriceps'], 'barra'), safeSlot(['perna_posterior_gluteo'], 'barra') ] },
                        { title: "Série 2: Isquiotibiais + Glúteo Isolado", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'cabo') ] },
                        { title: "Série 3: Adutores + Core", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina'), safeSlot(['core_supra'], 'peso_corporal') ] },
                        { title: "Série 4: Panturrilhas", slots: [ safeSlot(['panturrilha_gastro'], 'maquina'), safeSlot(['panturrilha_soleo'], 'maquina') ] }
                    ];
                } else if (isB) { // Superiores
                    blueprint = [
                        { title: "Série 1: Costas + Bíceps", slots: [ safeSlot(['costa_largura'], 'maquina'), safeSlot(['biceps_longa'], 'halter') ] },
                        { title: "Série 2: Peito + Tríceps", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['triceps_lateral_medial'], 'cabo') ] },
                        { title: "Série 3: Ombros Globais", slots: [ safeSlot(['ombro_anterior'], 'halter'), safeSlot(['ombro_lateral'], 'halter') ] },
                        { title: "Série 4: Core Oblíquo", slots: [ safeSlot(['core_obliquo'], 'peso_corporal'), safeSlot(['core_profundo'], 'peso_corporal') ] }
                    ];
                } else { // Quadriceps + Pant
                    blueprint = [
                        { title: "Série 1: Quadríceps Foco", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_quadriceps'], 'halter') ] },
                        { title: "Série 2: Isquiotibiais Foco", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'halter') ] },
                        { title: "Série 3: Panturrilhas + Core", slots: [ safeSlot(['panturrilha_gastro'], 'maquina'), safeSlot(['core_infra'], 'peso_corporal') ] },
                        { title: "Série 4: Glúteo + Lombar", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra'), safeSlot(['costa'], 'peso_corporal') ] }
                    ];
                }
            } else {
                if (isA) { // Push
                    blueprint = [
                        { title: "Série 1: Peitoral Sup + Tríceps Longa", slots: [ safeSlot(['peito_clavicular'], 'barra'), safeSlot(['triceps_longa'], 'halter') ] },
                        { title: "Série 2: Peitoral Med + Tríceps Lateral", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['triceps_lateral_medial'], 'cabo') ] },
                        { title: "Série 3: Deltoide Ant + Deltoide Lat", slots: [ safeSlot(['ombro_anterior'], 'halter'), safeSlot(['ombro_lateral'], 'halter') ] },
                        { title: "Série 4: Core + Finisher", slots: [ safeSlot(['core_obliquo'], 'peso_corporal'), safeSlot(rawProfile==='definicao'?['cardio_motor']:['core_supra'], 'peso_corporal') ] }
                    ];
                } else if (isB) { // Pull
                    blueprint = [
                        { title: "Série 1: Costas Largura + Bíceps", slots: [ safeSlot(['costa_largura'], 'maquina'), safeSlot(['biceps_longa'], 'barra') ] },
                        { title: "Série 2: Costas Espessura + Braquial", slots: [ safeSlot(['costa_espessura'], 'barra'), safeSlot(['biceps_braquial'], 'cabo') ] },
                        { title: "Série 3: Deltoide Post + Trapézio", slots: [ safeSlot(['ombro_posterior'], 'halter'), safeSlot(['trapezio'], 'halter') ] },
                        { title: "Série 4: Lombar + Finisher", slots: [ safeSlot(['costa'], 'peso_corporal'), safeSlot(rawProfile==='definicao'?['cardio_resistencia']:['core_profundo'], 'peso_corporal') ] }
                    ];
                } else { // Legs
                    blueprint = [
                        { title: "Série 1: Quadríceps + Panturrilha", slots: [ safeSlot(['perna_quadriceps'], 'barra'), safeSlot(['panturrilha_gastro'], 'maquina') ] },
                        { title: "Série 2: Isquio + Glúteo", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra'), safeSlot(['perna_posterior_gluteo'], 'maquina') ] },
                        { title: "Série 3: Quad + Isquio Encurtada", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'maquina') ] },
                        { title: "Série 4: Core + Finisher", slots: [ safeSlot(['core_infra'], 'peso_corporal'), safeSlot(rawProfile==='definicao'?['esporte_agilidade']:['panturrilha_soleo'], 'maquina') ] }
                    ];
                }
            }

            blueprint.forEach(b => {
                const validExs = b.slots.filter(s => s !== null);
                if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
            });
        }
        // --- CIRCUITO ---
        else if (method === 'circuito') {
            let cExs = [];
            if (rawProfile === 'definicao') {
                // Circuito Extremo de Definição (8 Estações para Secar)
                let f1 = getEx(['esporte_aceleracao'], 'peso_corporal', used, true) || getEx(['cardio_motor'], null, used); if(f1) { used.push(f1.name); cExs.push({name: f1.name, sets: 4, target: "30 seg"}); }
                let f2 = getEx(['perna_quadriceps'], 'peso_corporal', used, true) || getEx(['perna_quadriceps'], null, used); if(f2) { used.push(f2.name); cExs.push({name: f2.name, sets: 4, target: "15-20 rep"}); }
                let f3 = getEx(['costa_largura'], 'maquina', used) || getEx(['costa_espessura'], null, used); if(f3) { used.push(f3.name); cExs.push({name: f3.name, sets: 4, target: "15-20 rep"}); }
                let f4 = getEx(['perna_posterior_gluteo'], 'halter', used) || getEx(['perna_posterior_gluteo'], null, used); if(f4) { used.push(f4.name); cExs.push({name: f4.name, sets: 4, target: "15-20 rep"}); }
                let f5 = getEx(['peito_esternocostal'], 'peso_corporal', used, true) || getEx(['peito_esternocostal'], null, used); if(f5) { used.push(f5.name); cExs.push({name: f5.name, sets: 4, target: "15-20 rep"}); }
                let f6 = getEx(['esporte_pliometria'], 'peso_corporal', used, true) || getEx(['cardio_resistencia'], null, used); if(f6) { used.push(f6.name); cExs.push({name: f6.name, sets: 4, target: "45 seg"}); }
                let f7 = getEx(['core_profundo', 'core_supra'], 'peso_corporal', used, true) || getEx(['core_supra'], null, used); if(f7) { used.push(f7.name); cExs.push({name: f7.name, sets: 4, target: "1 min"}); }
                let f8 = getEx(['cardio_resistencia'], 'peso_corporal', used, true) || getEx(['cardio_motor'], null, used); if(f8) { used.push(f8.name); cExs.push({name: f8.name, sets: 4, target: "Até a falha"}); }
                if(cExs.length > 0) generatedBlocks.push({ title: "Circuito Extremo (Derretedor)", exercises: cExs });
            } else {
                // Circuito FullBody Padrão
                let fP = getEx(['perna_quadriceps'], 'peso_corporal', used, true) || getEx(['perna_quadriceps'], null, used); if(fP) { used.push(fP.name); cExs.push({name: fP.name, sets: 4, target: "15-20 rep"}); }
                let fC = getEx(routeProfile === 'feminino' ? ['perna_posterior_gluteo'] : ['peito_esternocostal'], 'peso_corporal', used, true) || getEx(routeProfile === 'feminino' ? ['perna_posterior_gluteo'] : ['peito_esternocostal'], null, used); if(fC) { used.push(fC.name); cExs.push({name: fC.name, sets: 4, target: "15-20 rep"}); }
                let fB = getEx(['costa_espessura', 'costa_largura'], 'maquina', used) || getEx(['costa_espessura'], null, used); if(fB) { used.push(fB.name); cExs.push({name: fB.name, sets: 4, target: "15-20 rep"}); }
                let fS = getEx(['ombro_anterior', 'ombro_lateral'], 'halter', used) || getEx(['ombro_anterior'], null, used); if(fS) { used.push(fS.name); cExs.push({name: fS.name, sets: 4, target: "15-20 rep"}); }
                if(cExs.length > 0) generatedBlocks.push({ title: "Rodada Metabólica", exercises: cExs });
            }
        }
        // --- CALISTENIA ---
        else if (method === 'calistenia') {
            let isA = (subOpt === 'A' || subOpt === 'push');
            let isB = (subOpt === 'B' || subOpt === 'pull');
            
            let f1;
            if (routeProfile === 'feminino') {
                f1 = isA ? ['perna_quadriceps', 'perna_posterior_gluteo'] : (isB ? ['core_supra', 'core_infra', 'perna_adutor_abdutor'] : ['perna_quadriceps', 'perna_posterior_gluteo']);
            } else {
                f1 = isA ? ['peito_esternocostal', 'peito_clavicular', 'triceps_global'] : (isB ? ['costa_largura', 'costa_espessura', 'biceps_global'] : ['perna_quadriceps', 'perna_posterior_gluteo']);
            }
            
            let cal1 = getEx(f1, 'calistenia', used, true) || getEx(f1, 'peso_corporal', used, true); if(cal1) used.push(cal1.name);
            let cal2 = getEx(f1, 'peso_corporal', used, true); if(cal2) used.push(cal2.name);
            let cal3 = getEx(['core_profundo', 'core_infra'], 'peso_corporal', used, true); if(cal3) used.push(cal3.name);
            
            if(cal1) generatedBlocks.push({ title: "Força Relativa Primária", exercises: [ {name: cal1.name, sets: 4, target: "Falha"}, ...(cal2 ? [{name: cal2.name, sets: 4, target: "Falha"}] : []) ]});
            if(cal3) generatedBlocks.push({ title: "Core Isométrico", exercises: [ {name: cal3.name, sets: 3, target: "Isometria Máx"} ]});
        }

        // ==========================================================
        // 🔥 MÓDULO DE PÓS-PROCESSAMENTO PARA DEFINIÇÃO (CUTTING)
        // ==========================================================
        if (rawProfile === 'definicao' && method !== 'circuito' && method !== 'calistenia') {
            // 1. Aumenta os alvos de repetição em todo o treino para esgotamento
            generatedBlocks.forEach(b => {
                b.exercises.forEach(ex => {
                    const t = ex.target.toLowerCase();
                    if (t.includes('8-10')) ex.target = '12-15 rep';
                    else if (t.includes('10-12')) ex.target = '15-20 rep';
                    else if (t.includes('12-15')) ex.target = '15-20 rep';
                    else if (!t.includes('falha') && !t.includes('seg') && !t.includes('min')) ex.target = '15-20 rep';
                });
            });

            // 2. Anexa o "Finisher" Metabólico de forma contextual
            let fName = "";
            let fFocus = [];
            
            if (subOpt === 'push' || subOpt === 'A' || subOpt === 'peito_costa' || subOpt === 'peito_triceps' || subOpt === 'peito') {
                fFocus = ['cardio_motor', 'cardio_resistencia'];
                fName = "🔥 Finisher: Esgotamento Aeróbico";
            } else if (subOpt === 'pull' || subOpt === 'B' || subOpt === 'biceps_triceps' || subOpt === 'costa_biceps' || subOpt === 'costa') {
                fFocus = ['cardio_resistencia', 'core_obliquo'];
                fName = "🔥 Finisher: Queima Anaeróbica";
            } else { 
                fFocus = ['esporte_pliometria', 'esporte_agilidade', 'esporte_aceleracao'];
                fName = "🔥 Finisher: Pliometria e Esporte";
            }
            
            let finisherEx = getEx(fFocus, 'peso_corporal', used, true) || getEx(fFocus, null, used);
            if (finisherEx) {
                used.push(finisherEx.name);
                generatedBlocks.push({
                    title: fName,
                    exercises: [{ name: finisherEx.name, sets: 4, target: "45-60 seg (Máxima Intensidade)" }]
                });
            }
        }

        // ==========================================================
        // 🕒 MANIPULAÇÃO DINÂMICA DO RELÓGIO DE DESCANSO
        // ==========================================================
        setTimeout(() => {
            if (typeof FitApp !== 'undefined' && FitApp.adjustRestTime) {
                if (rawProfile === 'definicao') FitApp.adjustRestTime(method === 'circuito' ? 30 : 45);
                else FitApp.adjustRestTime(method === 'circuito' ? 45 : 60);
            }
        }, 500);

        // ADIÇÃO DO BLOCO DE ABDÔMEN (Se a chave estiver ativada e já não for circuito)
        if (includeAbs && method !== 'circuito') {
            let abs1 = getEx(['core_supra', 'core_infra'], 'peso_corporal', used, true) || getEx(['core_supra'], null, used, true); if(abs1) used.push(abs1.name);
            let abs2 = getEx(['core_obliquo'], 'peso_corporal', used, true) || getEx(['core_profundo'], 'peso_corporal', used, true); if(abs2 && abs2.name !== (abs1?abs1.name:'')) used.push(abs2.name);
            
            if (abs1) {
                generatedBlocks.push({ 
                    title: "Bloco Bônus: Core & Abdômen", 
                    exercises: [ 
                        {name: abs1.name, sets: 3, target: "15-20 rep"}, 
                        ...(abs2 ? [{name: abs2.name, sets: 3, target: "Até a falha"}] : []) 
                    ]
                });
            }
        }

        if(generatedBlocks.length === 0) generatedBlocks = [{ title: "Rotina de Contingência", exercises: [] }];
        return generatedBlocks;
    }
// --- NOVO: FUNÇÕES DE TERRENO E CAMPANHA ---
    function toggleGlobalEnv() {
        if (isWorkoutActive) {
            showToast("⚠️ Operação Negada: O cronômetro está rodando. Cancele o combate primeiro.");
            return;
        }

        let currentEnv = safeGet('fitapp_global_env') || 'academia';
        
        if (currentEnv === 'academia') currentEnv = 'casa';
        else if (currentEnv === 'casa') currentEnv = 'praia';
        else currentEnv = 'academia';
        
        safeSet('fitapp_global_env', currentEnv);
        updateEnvUI();
        
        let envText = currentEnv === 'academia' ? 'Academia' : (currentEnv === 'casa' ? 'Casa' : 'Praia');
        if(typeof audioEnabled !== 'undefined' && audioEnabled) speak(`Modo ${envText} ativado.`);
        showToast(`Terreno alterado para: ${envText}`);

        // Recarregamento Automático
        if (currentWorkoutType && !isWorkoutActive) {
            loadWorkout();
        }
    }

    function updateEnvUI() {
        let currentEnv = safeGet('fitapp_global_env') || 'academia';
        const icon = document.getElementById('envIcon');
        const text = document.getElementById('envText');
        const btn = document.getElementById('btnEnvToggle');
        if(icon && text && btn) {
            if(currentEnv === 'academia') {
                icon.textContent = '🏋️'; text.textContent = 'Academia';
                btn.style.borderColor = '#00ff88'; btn.style.color = '#00ff88'; btn.style.background = 'rgba(0, 255, 136, 0.1)';
            } else if (currentEnv === 'casa') {
                icon.textContent = '🏠'; text.textContent = 'Casa';
                btn.style.borderColor = '#ffaa00'; btn.style.color = '#ffaa00'; btn.style.background = 'rgba(255, 170, 0, 0.1)';
            } else {
                icon.textContent = '🏖️'; text.textContent = 'Praia';
                btn.style.borderColor = '#4da3ff'; btn.style.color = '#4da3ff'; btn.style.background = 'rgba(77, 163, 255, 0.1)';
            }
        }
    }

    function updateCampaignDashboard() {
        const campaignStr = safeGet('fitapp_campaign_data');
        const bioPanel = document.getElementById('biomechanicsPanel');
        const dash = document.getElementById('campaignDashboard');
        
        if (campaignStr && campaignStr.trim() !== '') {
            if(bioPanel) bioPanel.style.display = 'none';
            if(dash) dash.style.display = 'block';
            
            const campData = JSON.parse(campaignStr);
            let count = parseInt(safeGet('fitapp_campaign_count') || '0');
            
            const title = document.getElementById('campaignDashTitle');
            const subtitle = document.getElementById('campaignDashSubtitle');
            const countText = document.getElementById('campaignDashCount');
            const bar = document.getElementById('campaignDashBar');
            
            if(title) title.textContent = `Operação: ${campData.method ? campData.method.toUpperCase() : 'LIVRE'}`;
            if(subtitle) subtitle.textContent = `Nível: ${campData.level || 'Padrão'}`;
            if(countText) countText.textContent = `${count}/24`;
            if(bar) bar.style.width = `${Math.min(100, (count / 24) * 100)}%`;

            // HERO CARD (Destaque Visual da Próxima Missão)
            const history = JSON.parse(safeGet('fitapp_week_log') || '[]');
            const total = history.length;
            const lastType = total > 0 ? history[total - 1].tipo : null;
            const method = safeGet('fitapp_main_method') || 'abc';
            
            let nextType = 'A';
            if (lastType === 'A') nextType = 'B';
            else if (lastType === 'B') nextType = 'C';
            else if (lastType === 'C' && method === 'abcd') nextType = 'D';
            else if (lastType === 'C') nextType = 'A';
            else if (lastType === 'D') nextType = 'A';

            ['A', 'B', 'C', 'D'].forEach(t => {
                const card = document.getElementById('card-' + t);
                if (card) {
                    card.style.transform = 'scale(1)';
                    card.style.border = '1px solid #333';
                    card.style.opacity = '1';
                    const heroBtn = card.querySelector('.hero-btn');
                    if(heroBtn) heroBtn.remove();
                    
                    if (t === nextType) {
                        card.style.transform = 'scale(1.03)';
                        card.style.border = '2px solid #a64dff';
                        card.style.boxShadow = '0 0 20px rgba(166, 77, 255, 0.2)';
                        card.innerHTML += `<div class="hero-btn" style="background: #a64dff; color: #fff; text-align: center; padding: 8px; border-radius: 6px; font-weight: bold; margin-top: 10px; text-transform: uppercase; font-size: 12px; pointer-events: none;">▶ Próxima Missão</div>`;
                    }
                }
            });
        } else {
            if(bioPanel) bioPanel.style.display = 'block';
            if(dash) dash.style.display = 'none';
            
            ['A', 'B', 'C', 'D'].forEach(t => {
                const card = document.getElementById('card-' + t);
                if (card) {
                    card.style.transform = 'scale(1)';
                    card.style.border = '1px solid #333';
                    const heroBtn = card.querySelector('.hero-btn');
                    if(heroBtn) heroBtn.remove();
                }
            });
        }
    }

    function resetCampaign() {
        if(confirm("ATENÇÃO: Deseja abortar a campanha atual? O mesociclo será zerado e você poderá forjar um novo plano.")) {
            safeSet('fitapp_campaign_data', '');
            safeSet('fitapp_campaign_count', 0);
            updateCampaignDashboard();
            showToast("Campanha abortada. O Cérebro Biomecânico foi liberado.");
        }
    }

    function silentAdaptToEnv(envTarget) {
        let usedSubstitutes = []; 
        const removeAccents = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
        const getBroadGroup = (focusString) => {
            const f = removeAccents(focusString || '');
            if (f.includes('peito')) return 'peitoral';
            if (f.includes('costa') || f.includes('dorsal') || f.includes('lombar') || f.includes('trap')) return 'costas';
            if (f.includes('perna') || f.includes('quadriceps') || f.includes('gluteo') || f.includes('isquio') || f.includes('panturrilha') || f.includes('adutor') || f.includes('abdutor')) return 'pernas';
            if (f.includes('ombro') || f.includes('deltoide')) return 'ombros';
            if (f.includes('triceps') || f.includes('biceps') || f.includes('antebraço')) return 'bracos';
            if (f.includes('core') || f.includes('abdom')) return 'core';
            return 'geral';
        };

        const allowedEquips = envTarget === 'praia' ? ['Peso_Corporal', 'Calistenia'] : ['Peso_Corporal'];
        const preferredEquip = envTarget === 'praia' ? 'Calistenia' : 'Peso_Corporal';

        currentRoutine.forEach(bloco => {
            bloco.exercises.forEach(ex => {
                const dictItem = dictionaryData.find(d => d.name === ex.name);
                if (dictItem) {
                    const exEquip = dictItem.equip || '';
                    const isForbidden = !allowedEquips.some(eq => exEquip.includes(eq));
                    const canUpgradeToCalisthenics = (envTarget === 'praia' && exEquip.includes('Peso_Corporal') && !exEquip.includes('Calistenia'));
                    
                    if (isForbidden || canUpgradeToCalisthenics) {
                        const targetGroup = getBroadGroup(dictItem.group + " " + dictItem.focus);
                        
                        let pool = dictionaryData.filter(d => 
                            getBroadGroup(d.group + " " + d.focus) === targetGroup && 
                            (d.equip || '').includes(preferredEquip) &&
                            !usedSubstitutes.includes(d.name)
                        );
                        
                        if(pool.length === 0) {
                            pool = dictionaryData.filter(d => 
                                getBroadGroup(d.group + " " + d.focus) === targetGroup && 
                                allowedEquips.some(eq => (d.equip || '').includes(eq)) &&
                                !usedSubstitutes.includes(d.name)
                            );
                        }

                        if(pool.length === 0) {
                            pool = dictionaryData.filter(d => 
                                getBroadGroup(d.group + " " + d.focus) === targetGroup && 
                                allowedEquips.some(eq => (d.equip || '').includes(eq))
                            );
                        }
                        
                        if(pool.length > 0) {
                            const newEx = pool[Math.floor(Math.random() * pool.length)];
                            ex.name = newEx.name;
                            usedSubstitutes.push(newEx.name);
                        }
                    }
                }
            });
        });
    }
    return { 
        init, filterLibrary, openSwapModal, confirmSwap, startWorkout, openForgeModal, updateForgeOptions, generateForgedWorkout, updateDynamicCards,
        beginWorkoutExecution, acceptSnap, declineSnap, cancelWorkoutPreview,
        toggleGlobalEnv, updateEnvUI, updateCampaignDashboard, resetCampaign,
        openAddExerciseModal, filterAddModal, confirmAddExercise, removeExercise, setCategoryFilter,
        renderIsolationChart,
        adjustRestTime, changeSets, cloneFirstSet, exportStravaCard,
        adjustRestTime, changeSets, 
        toggleAutoPilot, startAutoPilot, stopAutoPilot, 
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
function checkCompletedCards() {
        const history = JSON.parse(FitApp.safeGet('fitapp_week_log') || '[]');
        if (history.length === 0) return;

        const d = new Date();
        const offset = d.getTimezoneOffset() * 60000;
        const dataHoje = (new Date(d.getTime() - offset)).toISOString().split('T')[0];

        // Filtra apenas os treinos feitos HOJE
        const treinosHoje = history.filter(h => h.date === dataHoje).map(h => h.tipo);
        
        // Remove a classe de todos os cartões primeiro
        ['A', 'B', 'C', 'D'].forEach(t => {
            const card = document.getElementById('card-' + t);
            if (card) card.classList.remove('completed-card');
        });

        // Aplica a opacidade apenas nos treinos concluídos hoje
        treinosHoje.forEach(tipo => {
            const card = document.getElementById('card-' + tipo);
            if (card) card.classList.add('completed-card');
        });
        
        // Regra do Ciclo: Se ele fez A, B e C hoje (improvável, mas possível), reseta as cartas para o usuário poder clicar livremente.
        const method = document.getElementById('mainMethodSelector') ? document.getElementById('mainMethodSelector').value : 'ppl';
        let cycleComplete = false;
        
        if (method === 'abcd' && treinosHoje.includes('A') && treinosHoje.includes('B') && treinosHoje.includes('C') && treinosHoje.includes('D')) cycleComplete = true;
        else if (method !== 'abcd' && treinosHoje.includes('A') && treinosHoje.includes('B') && treinosHoje.includes('C')) cycleComplete = true;

        if (cycleComplete) {
            ['A', 'B', 'C', 'D'].forEach(t => {
                const card = document.getElementById('card-' + t);
                if (card) card.classList.remove('completed-card');
            });
        }
    }

// ==========================================
// 📡 UPLINK COM A TORRE DE CONTROLE (B2B)
// ==========================================
async function syncTacticalDictionary() {
    try {
        const db = firebase.firestore();
        // Tenta baixar as diretrizes do Comandante
        const snapshot = await db.collection('dicionario').get();

        if (snapshot.empty) return; // Se a nuvem estiver vazia, segue a vida normal

        if (typeof dictionaryData === 'undefined') return;

        let atualizados = 0;
        let novos = 0;

        snapshot.forEach(doc => {
            const data = doc.data();
            const exerciseName = data.nome;
            const newTip = data.dica;
            const newGroup = data.grupo;

            // Procura se o exercício já existe no 'dados.js'
            const existingIndex = dictionaryData.findIndex(item => item.name.toLowerCase() === exerciseName.toLowerCase());

            if (existingIndex !== -1) {
                // OVERRIDE: Substitui a dica de fábrica pela diretriz da Nuvem
                dictionaryData[existingIndex].desc = newTip;
                if(newGroup) dictionaryData[existingIndex].group = newGroup;
                atualizados++;
            } else {
                // ADD: Se for uma arma nova criada na Torre de Controle, adiciona ao arsenal
                dictionaryData.push({
                    name: exerciseName,
                    group: newGroup || 'Geral',
                    desc: newTip
                });
                novos++;
            }
        });
        
        console.log(`📡 Spotter Digital Sincronizado: ${atualizados} atualizados, ${novos} novos padrões adotados.`);
        
        // Se a aba da biblioteca estiver aberta, recarrega a lista para mostrar os novos exercícios
        if (typeof filterLibrary === 'function') {
            filterLibrary();
        }

    } catch (error) {
        console.log("⚠️ Modo Offline: Utilizando dicionário de fábrica (dados.js).");
    }
}
document.addEventListener('DOMContentLoaded', FitApp.init);