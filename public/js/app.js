'use strict';

// 🌐 IMPORTAÇÕES MODULARES GLOBAIS (Devem estar sempre no topo)
import { state } from './state.js';
import { FitAudio } from './audio.js';
import { escapeHTML, parseSafeFloat, getMuscleGroup } from './utils.js';
import { syncOfflineWorkouts, saveCampaignToCloud, loadCampaignFromCloud, syncTacticalDictionary } from './sync.js';
import { openForgeModal, updateForgeOptions, generateForgedWorkout, executeForgeLogic } from './forge.js';
import { fetchAIFeedback, openImportAiModal, switchAiTab, processWorkoutWithAI, carregarProximoTreinoIA } from './ai.js';
import { adjustRestTime, startRestTimer, stopRestTimer, changeSets, cloneFirstSet, updateGlobalTimer, startCooldownTimer, skipCooldown, toggleAutoPilot, startAutoPilot, executeAutoPhase, stopAutoPilot } from './combat.js';
import { renderLibrary, filterLibrary, renderPreviewList, renderCurrentRoutine, updateDynamicCards, applyTheme, switchTab, renderWeeklyCalendar, renderMonthlyCalendar, renderCustomWorkouts, renderHistoryList, renderMetricsChart, renderIsolationChart, removeExercise, openAddExerciseModal, setCategoryFilter, filterAddModal, confirmAddExercise, checkCompletedCards } from './ui.js';
var FitApp = (() => {
    // 🛡️ As variáveis de combate foram transferidas para o js/state.js

    // 🛡️ GESTOR DE MEMÓRIA (Garbage Collector): Evita o bloqueio total se o limite de 5MB do Safari for atingido
    const safeSet = (k, v) => { 
        try { 
            localStorage.setItem(k, v); 
            return true; 
        } catch(e) { 
            // Interceta o erro de memória cheia
            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                console.warn("Memória crítica detetada. Iniciando expurgo de ficheiros temporários...");
                
                // 1. Apaga a fila de IA pendente (não é vital)
                localStorage.removeItem('fitapp_fila_ia');
                
                // 2. Comprime o histórico (guarda apenas os últimos 30 treinos)
                let historyStr = localStorage.getItem('fitapp_week_log');
                if (historyStr) {
                    let log = JSON.parse(historyStr);
                    if (log.length > 30) {
                        localStorage.setItem('fitapp_week_log', JSON.stringify(log.slice(-30)));
                    }
                }
                
                showToast("⚠️ O armazenamento local do telemóvel atingiu o limite. Os ficheiros antigos foram limpos para salvar a sua missão atual.");
                
                // Tenta gravar o ficheiro novamente após a limpeza
                try { localStorage.setItem(k, v); return true; } catch(e2) { return false; }
            }
            return false; 
        } 
    };
    const safeGet = (k) => { try { return localStorage.getItem(k); } catch(e) { return null; } };

    function showToast(msg) { state.els.toast.textContent = msg; state.els.toast.classList.add('show'); setTimeout(() => state.els.toast.classList.remove('show'), 3000); }
    function speak(text) { if (!state.audioEnabled || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'pt-BR'; utterance.rate = 1.1; window.speechSynthesis.speak(utterance); }
    function toggleAudio() { 
        state.audioEnabled = !state.audioEnabled; 
        const btn = document.getElementById('btnAudio'); 
        if (state.audioEnabled) { 
            btn.classList.add('active'); 
            btn.innerHTML = '🔊 <span>Áudio On</span>'; 
            if (typeof FitAudio !== 'undefined' && FitAudio.unlock) FitAudio.unlock(); // 🛡️ Aciona a chave da Apple
            speak("Assistente ativado."); 
        } else { 
            btn.classList.remove('active'); 
            btn.innerHTML = '🔈 <span>Áudio Off</span>'; 
            window.speechSynthesis.cancel(); 
        } 
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
        const ex = state.currentRoutine[bIndex].exercises[eIndex];
        const currentName = ex.name;
        const currentDict = window.dictionaryData.find(d => d.name === currentName);
        
        // CÉREBRO DE SUBSTITUIÇÃO CORRIGIDO: Chama a função local diretamente
        const broadGroup = currentDict ? getMuscleGroup(currentDict.group) : getMuscleGroup(currentName);
        
        const style = state.els.styleSelector ? state.els.styleSelector.value : 'biset';
        const level = state.els.levelSelector ? state.els.levelSelector.value : 'intermediario';
        const type = state.currentWorkoutType;
        const currentEnv = safeGet('fitapp_global_env') || 'academia';

        // 1. Busca todos os exercícios da mesma gaveta muscular
        let pool = window.dictionaryData.filter(d => 
            getMuscleGroup(d.group) === broadGroup && d.name !== currentName
        );

        // Blindagem de Ambiente
        const method = document.getElementById('mainMethodSelector') ? document.getElementById('mainMethodSelector').value : '';
        if (type === 'Casa' || method === 'calistenia' || currentEnv === 'casa') {
            pool = pool.filter(d => d.equip.includes('Peso Corporal') || d.equip.includes('Calistenia'));
        }

        // 2. ORDENAÇÃO INTELIGENTE (Prioridade de Ferro)
        pool.sort((a, b) => {
            const aFocusMatch = currentDict && a.focus === currentDict.focus ? 1 : 0;
            const bFocusMatch = currentDict && b.focus === currentDict.focus ? 1 : 0;
            if (aFocusMatch !== bFocusMatch) return bFocusMatch - aFocusMatch;
            
            if (currentEnv === 'academia') {
                const aIsBw = a.equip === 'Peso Corporal' || a.equip === 'Calistenia';
                const bIsBw = b.equip === 'Peso Corporal' || b.equip === 'Calistenia';
                if (aIsBw && !bIsBw) return 1;
                if (!aIsBw && bIsBw) return -1;
            }
            return 0;
        });

        let originalName = currentName; 
        const isStandardWorkout = !type.startsWith('custom_') && type !== 'Livre' && type !== 'Casa' && type !== 'novo_customizado';
        
        if (isStandardWorkout && typeof window.dbWorkouts !== 'undefined') {
            try {
                originalName = window.dbWorkouts[style][level][type][bIndex].exercises[eIndex].name;
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
                <div class="swap-item" style="border-left: 4px solid #ffaa00; background: rgba(255, 170, 0, 0.1);" onclick="window.FitApp.confirmSwap(${bIndex}, ${eIndex}, '${originalName}')">
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
                    <div class="swap-item" onclick="window.FitApp.confirmSwap(${bIndex}, ${eIndex}, '${item.name}')">
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
        state.currentRoutine[bIndex].exercises[eIndex].name = newName;
        document.getElementById('swapModal').style.display = 'none';
        
        if (state.isWorkoutActive) {
            renderstate.currentRoutine(); 
            saveWorkoutState(); 
        } else {
            renderPreviewList();
        }
        
        if(state.audioEnabled) speak("Exercício atualizado.");
    }

    function checkSequence() {
        let history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        let total = history.length;
        let lastType = total > 0 ? history[total - 1].tipo : null;

        const statTotal = document.getElementById('statTotal');
        const statLast = document.getElementById('statLast');
        if(statTotal) statTotal.textContent = total;
        if(statLast) statLast.textContent = lastType ? 'Treino ' + lastType : 'Nenhum';
    }



    function startWorkout(type) {
        const tabTreino = document.getElementById('nav-treino');
        if (tabTreino) {
            tabTreino.click();
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

        state.currentWorkoutType = type;
        loadWorkout();
    }

    // --- NOVO MOTOR DE AERÓBICO (Imune à Hibernação Mobile) ---
    let cardioTimerInterval = null;
    let cardioElapsedSeconds = 0;
    let cardioStartTime = 0;
    let cardioPausedTime = 0;
    let isCardioRunning = false;

    function startCardio() {
        const tabTreino = document.getElementById('nav-treino');
        if (tabTreino) tabTreino.click();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        state.currentWorkoutType = 'Cardio';
        state.isWorkoutActive = true; 
        
        // Esconde painéis principais
        document.getElementById('workoutCards').style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'none';
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'none';
        const templatesFront = document.getElementById('templatesFrontline');
        if (templatesFront) templatesFront.style.display = 'none';
        const navBar = document.querySelector('nav');
        if(navBar) navBar.style.display = 'none';

        // Esconde HUD de hipertrofia
        document.getElementById('workoutHud').style.display = 'none';
        document.getElementById('exerciseList').style.display = 'none';
        
        // Mostra HUD de Cardio
        state.els.workoutArea.style.display = 'block';
        document.getElementById('cardioArea').style.display = 'block';
        state.els.btnFinishArea.style.display = 'flex';
        
        // Ajusta botão de finalizar para ficar padrão
        const btnFinish = document.getElementById('btnFinishAction');
        if (btnFinish) {
            btnFinish.className = 'btn-action btn-success'; 
            btnFinish.textContent = '🏆 Salvar Aeróbico';
        }

        // Reseta variáveis e inputs
        cardioElapsedSeconds = 0;
        cardioPausedTime = 0;
        isCardioRunning = false;
        clearInterval(cardioTimerInterval);
        document.getElementById('cardioTimerDisplay').textContent = "00:00:00";
        
        const btnToggle = document.getElementById('btnToggleCardioTimer');
        if(btnToggle) {
            btnToggle.innerHTML = "▶ Iniciar Relógio";
            btnToggle.style.color = '#4da3ff'; btnToggle.style.borderColor = '#4da3ff'; btnToggle.style.background = 'rgba(77, 163, 255, 0.2)';
        }
        
        document.getElementById('cardioDist').value = '';
        document.getElementById('cardioKcal').value = '';
        document.getElementById('cardioBpm').value = '';
        
        state.workoutStartTime = Date.now();
        if(state.audioEnabled) speak("Motor aeróbico ativado.");
    }

    function toggleCardioTimer() {
        const btn = document.getElementById('btnToggleCardioTimer');
        if (!btn) return;
        
        if (isCardioRunning) {
            isCardioRunning = false;
            clearInterval(cardioTimerInterval);
            cardioPausedTime = cardioElapsedSeconds; // Salva o tempo congelado
            btn.innerHTML = "▶ Retomar Relógio";
            btn.style.color = '#00ff88'; btn.style.borderColor = '#00ff88'; btn.style.background = 'rgba(0, 255, 136, 0.2)';
            if(state.audioEnabled) speak("Relógio pausado.");
        } else {
            isCardioRunning = true;
            // Desloca o tempo de início baseado no quanto já foi percorrido (matemática pura)
            cardioStartTime = Date.now() - (cardioPausedTime * 1000); 
            
            btn.innerHTML = "⏸ Pausar Relógio";
            btn.style.color = '#ffaa00'; btn.style.borderColor = '#ffaa00'; btn.style.background = 'rgba(255, 170, 0, 0.2)';
            if(state.audioEnabled) speak("Ação.");
            
            cardioTimerInterval = setInterval(() => {
                // Cálculo imune ao sono do celular
                cardioElapsedSeconds = Math.floor((Date.now() - cardioStartTime) / 1000); 
                const h = Math.floor(cardioElapsedSeconds / 3600).toString().padStart(2, '0');
                const m = Math.floor((cardioElapsedSeconds % 3600) / 60).toString().padStart(2, '0');
                const s = (cardioElapsedSeconds % 60).toString().padStart(2, '0');
                
                const display = document.getElementById('cardioTimerDisplay');
                if (display) display.textContent = `${h}:${m}:${s}`;
            }, 1000);
        }
    }
    // ----------------------------



function saveWorkoutState() {
        if (!state.isWorkoutActive) return;
        const activeState = { 
            currentRoutine: state.currentRoutine, 
            currentWorkoutType: state.currentWorkoutType, 
            workoutStartTime: state.workoutStartTime 
        };
        safeSet('fitapp_active_state', JSON.stringify(activeState));
    }

    function clearWorkoutState() {
        localStorage.removeItem('fitapp_active_state');
    }



    function loadWorkout() {
        const style = state.els.styleSelector ? state.els.styleSelector.value : 'biset';
        const level = state.els.levelSelector ? state.els.levelSelector.value : 'intermediario';
        const profile = state.els.profileSelector ? state.els.profileSelector.value : 'masculino'; // NOVO: Leitura do Perfil
        const type = state.currentWorkoutType;
        if (!type) return;

        document.getElementById('workoutCards').style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'none';
        
        // NOVO: Esconde o painel biomecânico para limpar a visão de revisão
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'none';
        
        state.isWorkoutActive = false;
        
        const preview = document.getElementById('workoutPreview');
        const customControls = document.getElementById('customWorkoutControls');
        const nameContainer = document.getElementById('customWorkoutNameContainer');
        const nameInput = document.getElementById('customWorkoutName');

        if (type === 'Livre') {
            // A Forja cuida da montagem, este bloco só renderiza se vier vazio por erro
            if (state.currentRoutine.length === 0) state.currentRoutine = [{ title: "Treino Personalizado", exercises: [] }];
            if(preview) {
                document.getElementById('previewTitle').textContent = `🛠️ Forja Concluída`;
                document.getElementById('previewDesc').textContent = `Rotina gerada. Ajuste as cargas e salve o template.`;
                if(customControls) customControls.style.display = 'flex';
                if(nameContainer) nameContainer.style.display = 'block';
            }
        } else if (type === 'Casa') {
            // CÉREBRO TÁTICO: Gerador Dinâmico de Treino em Casa por Nível
            const removeAccents = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
            // 🛡️ TRAVA DE TAXONOMIA: Atualizado para ler "Peso Corporal" (sem underline) do novo banco
            const isHomeReady = (item) => item.equip && item.equip.includes('Peso Corporal') && !item.equip.includes('Calistenia');
            
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

            state.currentRoutine = [{
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
                state.currentRoutine = JSON.parse(JSON.stringify(customWorkout.routine));
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
                state.currentRoutine = JSON.parse(JSON.stringify(campaignData.workouts[type])); 
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
                state.currentRoutine = executeForgeLogic(method, subOpt, blacklist);
                
                campaignData.workouts[type] = state.currentRoutine;
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
        document.getElementById('prepArea').style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';
        state.currentWorkoutType = '';
        state.currentRoutine = [];
        
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
        if(state.audioEnabled) speak("Atenção. Oportunidade de evolução detectada. Aceita o desafio?");
    }

    function acceptSnap() {
        document.getElementById('snapModal').style.display = 'none';
        snapActive = true;
        showToast("Contrato selado. Mostre sua força.");
        if(state.audioEnabled) speak("Contrato selado. Iniciando protocolo de combate.");
        executeWorkoutStart();
    }

    function declineSnap() {
        document.getElementById('snapModal').style.display = 'none';
        snapActive = false;
        showToast("Treino padrão iniciado.");
        executeWorkoutStart();
    }

    // A função original que realmente inicia o cronômetro (Fase 2)
    function executeWorkoutStart() {
        state.isWorkoutActive = true; 
        safeSet('fitapp_onboarding_done', 'true'); // TRAVA BLINDADA: Se o usuário iniciou um combate, ele não é mais novato. Banner morto.
        
        // Garante que todas as telas de staging fechem
        document.getElementById('workoutPreview').style.display = 'none';
        document.getElementById('prepArea').style.display = 'none';
        
        state.els.workoutArea.style.display = 'block'; 
        state.els.btnFinishArea.style.display = 'block';

        // ATIVA MODO FOCO: Oculta o Menu Inferior e o Cabeçalho
        const navBar = document.querySelector('nav');
        if(navBar) navBar.style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if(header) header.style.display = 'none';

        // Oculta o bloco de Treino Pessoal
        const templatesFront = document.getElementById('templatesFrontline');
        if (templatesFront) templatesFront.style.display = 'none';

        state.workoutStartTime = Date.now();
        if (state.globalTimer) clearInterval(state.globalTimer);
        state.globalTimer = setInterval(updateGlobalTimer, 1000);
        updateGlobalTimer(); 
        
        // PONTO 8: Esconde o seletor biomecânico de forma segura
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'none';
        
        renderCurrentRoutine();
        saveWorkoutState(); 
    }



    function updateProgress() {
        const pct = state.totalSets === 0 ? 0 : Math.round((state.checkedSets / state.totalSets) * 100);
        state.els.progressBar.style.width = pct + '%';
        const btn = document.getElementById('btnFinishAction');
        if(pct === 100) { btn.className = 'btn-action btn-success'; btn.textContent = '🏆 Concluir Treino'; stopRestTimer(); speak("Treino finalizado."); } 
        else { btn.className = 'btn-action btn-warning'; btn.textContent = '⚠️ Encerrar Incompleto'; }
    }

    async function finishWorkout() {
        // --- INÍCIO DA TRAVA ANTI-EXPLOIT ---
        let tempTotalTimeSecs = 0;
        if (state.workoutStartTime) {
            tempTotalTimeSecs = Math.floor((Date.now() - state.workoutStartTime) / 1000);
        }

        // NOVO: Ramificação Tática (Cardio vs Hipertrofia)
        if (state.currentWorkoutType === 'Cardio') {
            const dist = parseSafeFloat(document.getElementById('cardioDist').value);
            const kcal = parseInt(document.getElementById('cardioKcal').value) || 0;
            const bpm = parseInt(document.getElementById('cardioBpm').value) || 0;
            
            if (cardioElapsedSeconds < 120 && dist === 0 && kcal === 0) {
                showToast("⚠️ Comando Negado: Insira os dados do relógio ou corra pelo menos 2 minutos.");
                return;
            }
            
            // Empacota os dados sem interferir na hipertrofia
            state.todayLog = [{ exercise: 'Cardio', dist_km: dist, kcal: kcal, bpm_medio: bpm, tempo_segundos: cardioElapsedSeconds }];
            state.checkedSets = 1; state.totalSets = 1; // Hack para liberar gamificação
            clearInterval(cardioTimerInterval);
        } else {
            if (state.checkedSets === 0) {
                showToast("⚠️ Comando Negado: Marque ao menos uma série para registrar combate.");
                return; 
            }
            if (tempTotalTimeSecs < 120) {
                showToast("⚠️ Abortado: Tempo operacional mínimo não atingido (2 minutos).");
                return; 
            }
        }
        // --- FIM DA TRAVA ANTI-EXPLOIT ---

        // 🛡️ OPÇÃO HOTEL: Trava de Duplo Clique ativada apenas após passar nas validações
        const btnFinish = document.getElementById('btnFinishAction');
        if (btnFinish) {
            if (btnFinish.disabled) return; 
            btnFinish.disabled = true;
            btnFinish.style.opacity = '0.5';
            btnFinish.textContent = "⏳ A processar...";
        }

        stopRestTimer(); 
        
        const isComplete = state.checkedSets === state.totalSets;
        const tipoTreino = state.currentWorkoutType; 
        
        const d = new Date();
        // BLINDAGEM DE FUSO HORÁRIO (Salvamento): Registra a data com base no calendário local do atleta
        const dataHoje = d.getFullYear() + "-" + 
                         String(d.getMonth() + 1).padStart(2, '0') + "-" + 
                         String(d.getDate()).padStart(2, '0');
        
        let totalTimeSecs = tempTotalTimeSecs; // Resgata o tempo já calculado
        if (state.workoutStartTime) {
            clearInterval(state.globalTimer);
            state.workoutStartTime = null;
        }

        // NOVO: Registra qual foi o método utilizado para não misturar marcações de 'Feito'
        const currentMethod = document.getElementById('mainMethodSelector') ? document.getElementById('mainMethodSelector').value : 'ppl';
        const payload = { date: dataHoje, tipo: tipoTreino, method: currentMethod, duration_secs: totalTimeSecs, data: state.todayLog };

        try {
            document.getElementById('btnFinishAction').textContent = "⏳ Salvando...";
            const response = await FitAPI.salvarTreino(payload);
            // Salva a assinatura da nuvem no treino local para podermos apagar depois
            if (response && response.id) {
                payload._id = response.id;
            }
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
                if (state.els.levelSelector) {
                    if (state.els.levelSelector.value === 'iniciante') state.els.levelSelector.value = 'intermediario';
                    else if (state.els.levelSelector.value === 'intermediario') state.els.levelSelector.value = 'avancado';
                    safeSet('fitapp_level', state.els.levelSelector.value);
                }
            }
        }
        // --- FIM DO SISTEMA DE GATILHO DUPLO ---
        saveCampaignToCloud(); // NOVO: Atualiza a contagem de treinos do mesociclo na nuvem
        clearWorkoutState(); 
        state.isPromotionPending = isPromotionTime; // Guarda o status de promoção para depois da Fase 3

        state.els.workoutArea.style.display = 'none';
        document.getElementById('cardioArea').style.display = 'none'; 
        state.els.btnFinishArea.style.display = 'none';

        // ROTEAMENTO DE FASE: Direciona para a Volta à Calma
        if (isComplete && state.currentWorkoutType !== 'Cardio') {
            document.getElementById('workoutHud').style.display = 'none'; 
            document.getElementById('exerciseList').style.display = 'none'; 
            document.getElementById('cooldownArea').style.display = 'block';
            
            document.getElementById('cooldownTimerDisplay').textContent = "01:30";
            const btnCd = document.getElementById('btnStartCooldown');
            btnCd.style.display = 'block';
            btnCd.textContent = "▶️ Iniciar Alongamento";
        } else {
            // Se for cardio ou treino incompleto, vai direto para as recompensas
            finalizeSession(false, isComplete);
        }
    }
// ==========================================
    // FASE 3: VOLTA À CALMA & FINALIZAÇÃO
    // ==========================================




    function finalizeSession(earnedBonus, showPack) {
        document.getElementById('cooldownArea').style.display = 'none';
        
        // Restaura a Interface Padrão
        document.getElementById('workoutHud').style.display = 'block'; 
        document.getElementById('exerciseList').style.display = 'block'; 
        document.getElementById('workoutCards').style.display = 'flex';
        
        const navBar = document.querySelector('nav');
        if(navBar) navBar.style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';

        const templatesFront = document.getElementById('templatesFrontline');
        if (templatesFront) templatesFront.style.display = 'block';

        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'block';

        state.currentWorkoutType = '';
        checkSequence(); 
        renderWeeklyCalendar(); 
        if (typeof renderMetricsChart === 'function') renderMetricsChart(); 
        updateCampaignDashboard();

        // 🧠 SISTEMA DE RECOMPENSAS BLINDADO (Conectado à Nuvem)
        if (earnedBonus) {
            if (typeof window.FitGamification !== 'undefined' && window.FitGamification.addBonusSweat) {
                window.FitGamification.addBonusSweat(1);
            }
        }

        if (showPack) { 
            window.FitGamification.showPackModal(snapActive || earnedBonus); 
            snapActive = false; 
        } else { 
            showToast('Treino salvo no sistema.'); 
            switchTab('tab-evolucao', 'nav-evolucao'); 
        }
        
        // Disparo de Promoção de Patente (Atrasado para não conflitar com a tela final)
        if (state.isPromotionPending) {
            setTimeout(() => {
                alert("🎖️ MESOCICLO CONCLUÍDO!\n\nAdaptação neural máxima atingida.\nSua patente foi elevada e seu arsenal anterior enviado para a Lista Negra.\n\nEscolha seu novo destino tático na Forja.");
                switchTab('tab-treino', 'nav-treino');
                openForgeModal();
                if(typeof state.audioEnabled !== 'undefined' && state.audioEnabled) speak("Adaptação neural máxima atingida. Patente elevada.");
            }, 1500);
            state.isPromotionPending = false;
        }
    }

    // ==========================================
    // FASE 1: INTELIGÊNCIA DE PREPARAÇÃO
    // ==========================================
    function startPrepPhase() {
        document.getElementById('workoutPreview').style.display = 'none';
        document.getElementById('prepArea').style.display = 'block';
        
        const prepList = document.getElementById('prepList');
        prepList.innerHTML = '';
        
        // Puxa exercícios de mobilidade do Dicionário (Com Contingência)
        let mobilityPool = dictionaryData.filter(d => 
            (d.group || '').toLowerCase().includes('mobilidade') || 
            (d.focus || '').toLowerCase().includes('mobilidade') || 
            (d.group || '').toLowerCase().includes('alongamento')
        );
        
        // FALLBACK TÁTICO: Se o Dicionário falhar, injeta o protocolo raiz.
        if(mobilityPool.length < 3) {
            mobilityPool = [
                {name: "Rotação Articular (Ombros e Punhos)", desc: "Gire os braços lentamente. 20s cada lado.", equip: "Peso Corporal"},
                {name: "Mobilidade de Tornozelo e Quadril", desc: "Agachamento profundo segurando a posição por 30s.", equip: "Peso Corporal"},
                {name: "Ativação de Core (Prancha Curta)", desc: "Acorde os estabilizadores sem fatigar. 30s.", equip: "Peso Corporal"},
                {name: "Gato-Vaca (Mobilidade Torácica)", desc: "Flexão e extensão da coluna no chão. 10 repetições.", equip: "Peso Corporal"}
            ];
        }

        // Embaralha e pesca 3
        let selectedPrep = mobilityPool.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        selectedPrep.forEach(ex => {
            prepList.innerHTML += `
                <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; border-left: 3px solid #4da3ff; display: flex; align-items: center; gap: 10px;">
                    <div style="font-size: 24px;">🔄</div>
                    <div>
                        <div style="font-weight: bold; color: #fff; font-size: 14px;">${ex.name}</div>
                        <div style="font-size: 11px; color: #aaa; margin-top: 4px;">${ex.desc || 'Realize movimentos controlados.'}</div>
                    </div>
                </div>
            `;
        });
        if(state.audioEnabled) speak("Fase de preparação iniciada. Prepare as articulações.");
    }

// ==========================================
// ROTA DE FUGA: CANCELAMENTO DE TREINO
// ==========================================
window.abortarMissao = function() {
    if (confirm("ATENÇÃO: Deseja realmente abortar a missão? O treino será encerrado e NENHUM dado ou ponto de suor será salvo.")) {
        
        // 1. Desliga os Motores
        stopRestTimer();
        if (state.globalTimer) clearInterval(state.globalTimer);
        clearInterval(cardioTimerInterval);
        if (state.cooldownTimerInterval) clearInterval(state.cooldownTimerInterval); // Limpa relógio F3
        state.workoutStartTime = null;
        
        // 2. Limpa o Estado de Combate
        clearWorkoutState();
        state.currentWorkoutType = '';
        
        // 3. Restaura o Esconderijo Visual
        state.els.workoutArea.style.display = 'none'; 
        document.getElementById('cardioArea').style.display = 'none'; 
        document.getElementById('prepArea').style.display = 'none'; 
        document.getElementById('cooldownArea').style.display = 'none';
        document.getElementById('workoutHud').style.display = 'block'; 
        document.getElementById('exerciseList').style.display = 'block'; 
        state.els.btnFinishArea.style.display = 'none';
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
        
        // Atualiza a tela base se necessário e restaura a gamificação visual
        checkSequence(); 
        if (typeof checkCompletedCards === 'function') checkCompletedCards();
        if (typeof updateCampaignDashboard === 'function') updateCampaignDashboard();
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

    function saveCustomWorkout() {
        const nameInput = document.getElementById('customWorkoutName');
        const name = nameInput ? nameInput.value.trim() : '';
        
        if (!name) {
            showToast('Alerta: Dê um nome ao seu treino.');
            if(nameInput) nameInput.focus();
            return;
        }
        
        if (state.currentRoutine.length === 0 || state.currentRoutine[0].exercises.length === 0) {
            showToast('Alerta: Adicione pelo menos um exercício.');
            return;
        }

        let savedCustoms = JSON.parse(safeGet('fitapp_custom_workouts') || '[]');
        
        let customId = null;
        if (state.currentWorkoutType.startsWith('custom_')) {
            customId = parseInt(state.currentWorkoutType.split('_')[1]);
        } else {
            customId = Date.now(); 
            state.currentWorkoutType = 'custom_' + customId; 
        }
        
        const existingIndex = savedCustoms.findIndex(w => w.id === customId);
        
        const workoutData = {
            id: customId,
            name: name,
            routine: state.currentRoutine
        };
        
        if (existingIndex >= 0) {
            savedCustoms[existingIndex] = workoutData; 
        } else {
            savedCustoms.push(workoutData); 
        }
        
        safeSet('fitapp_custom_workouts', JSON.stringify(savedCustoms));
        
        renderCustomWorkouts();
        showToast(`Template "${name}" salvo.`);
        if(state.audioEnabled) speak("Template customizado salvo no sistema.");

        if (typeof state.filaDeTreinosIA !== 'undefined' && state.filaDeTreinosIA.length > 0) {
            state.currentWorkoutType = 'novo_customizado';
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



    async function deleteHistoryLog(docId) {
        if (!confirm("Excluir este treino? Ele será apagado do radar e da nuvem.")) return;
        
        try {
            document.getElementById('btnTabList').textContent = "Limpando...";
            
            // 1. Aciona o Cérebro Neural para destruir o documento
            await FitAPI.deletarTreino(docId);
            
            // 2. Limpa o cache local
            let history = JSON.parse(safeGet('fitapp_week_log') || '[]');
            history = history.filter(h => h._id !== docId);
            safeSet('fitapp_week_log', JSON.stringify(history));
            
            // 3. Decrementa a Campanha (Aviso Tático)
            let campCount = parseInt(safeGet('fitapp_campaign_count') || '0');
            if (campCount > 0) {
                safeSet('fitapp_campaign_count', campCount - 1);
                updateCampaignDashboard();
                saveCampaignToCloud();
            }

            // 4. Força a atualização de todos os radares visuais
            checkSequence();
            if (typeof checkCompletedCards === 'function') checkCompletedCards();
            renderWeeklyCalendar();
            if (typeof renderMetricsChart === 'function') renderMetricsChart();
            renderHistoryList();
            
            document.getElementById('btnTabList').textContent = "📋 Lista";
            showToast("Registro aniquilado com sucesso.");
            
        } catch(error) {
            document.getElementById('btnTabList').textContent = "📋 Lista";
            showToast("Falha. Verifique a conexão com a rede.");
            console.error(error);
        }
    }

    function init() {
        state.els.profileSelector = document.getElementById('profileSelector');
        state.els.styleSelector = document.getElementById('styleSelector');
        state.els.levelSelector = document.getElementById('levelSelector'); 
        state.els.workoutArea = document.getElementById('workoutArea'); 
        state.els.exerciseList = document.getElementById('exerciseList');
        state.els.progressBar = document.getElementById('progressBar'); 
        state.els.btnFinishArea = document.getElementById('btnFinishArea');
        state.els.toast = document.getElementById('toast');

        // Escuta quando a internet volta, mas só sincroniza se estiver logado
        window.addEventListener('online', () => {
            if (firebase.auth().currentUser) syncOfflineWorkouts();
        });
        
        // Aguarda o sinal verde do Firebase Auth para iniciar a sincronização
        firebase.auth().onAuthStateChanged(async (user) => {
            const loginOverlay = document.getElementById('loginOverlay');
            const bottomNav = document.getElementById('bottomNav');
            
            if (user) {
                // Usuário logado: Destrói o escudo de login, mostra a barra e sincroniza
                if (loginOverlay) loginOverlay.style.display = 'none';
                if (bottomNav) bottomNav.style.display = 'flex';
                
                // --- INÍCIO DO RESGATE DE MEMÓRIA CLOUD ---
                try {
                    const nuvemLogs = await FitAPI.carregarHistoricoNuvem();
                    if (nuvemLogs && nuvemLogs.length > 0) {
                        safeSet('fitapp_week_log', JSON.stringify(nuvemLogs));
                        // Força a repintura das abas baseadas no histórico recém-baixado
                        checkSequence();
                        if (typeof checkCompletedCards === 'function') checkCompletedCards();
                        renderWeeklyCalendar();
                        if (typeof renderMetricsChart === 'function') renderMetricsChart();
                    }
                    // NOVO: Resgata a Campanha Ativa (Frente 2)
                    await loadCampaignFromCloud();
                    applyTheme();
                    updateDynamicCards();
                    updateCampaignDashboard();
                } catch(e) {
                    console.error("Falha ao puxar histórico da nuvem na inicialização.", e);
                }
                // --- FIM DO RESGATE ---

                syncOfflineWorkouts();
            } else {
                // Deslogado: Levanta o escudo de login e oculta a barra
                if (loginOverlay) loginOverlay.style.display = 'flex';
                if (bottomNav) bottomNav.style.display = 'none';
            }
        });

        // NOVO: Resgata o perfil salvo no cache do celular
        const savedProfile = safeGet('fitapp_profile');
        if (savedProfile && state.els.profileSelector) state.els.profileSelector.value = savedProfile;
        applyTheme(); // 🎨 Aplica a identidade visual instantaneamente no boot do app
        const savedStyle = safeGet('fitapp_style');
        if (savedStyle && state.els.styleSelector) state.els.styleSelector.value = savedStyle;
        
        const savedLevel = safeGet('fitapp_level');
        if (savedLevel && state.els.levelSelector) state.els.levelSelector.value = savedLevel;

        // Mapeia todas as 6 abas da nova arquitetura (incluindo a Arena)
        ['treino', 'evolucao', 'conquistas', 'arena', 'biblioteca', 'perfil'].forEach(tab => { 
            const navBtn = document.getElementById(`nav-${tab}`);
            if (navBtn) navBtn.addEventListener('click', () => switchTab(`tab-${tab}`, `nav-${tab}`)); 
        });
       
        // NOVO: Vigia de Visibilidade - Força ressincronização ao voltar pro app
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                updateGlobalTimer(); // Acorda o relógio de cima (Hipertrofia)
                
                // Acorda o relógio Aeróbico
                if (isCardioRunning) {
                    cardioElapsedSeconds = Math.floor((Date.now() - cardioStartTime) / 1000);
                    const h = Math.floor(cardioElapsedSeconds / 3600).toString().padStart(2, '0');
                    const m = Math.floor((cardioElapsedSeconds % 3600) / 60).toString().padStart(2, '0');
                    const s = (cardioElapsedSeconds % 60).toString().padStart(2, '0');
                    const cardioDisplay = document.getElementById('cardioTimerDisplay');
                    if (cardioDisplay) cardioDisplay.textContent = `${h}:${m}:${s}`;
                }
            }
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
                state.currentRestTime = parseInt(e.target.getAttribute('data-time')); 
            }); 
        });

        const packEnvelope = document.getElementById('packEnvelope');
        if (packEnvelope) packEnvelope.addEventListener('click', window.FitGamification.openPack);
        
        const btnClosePack = document.getElementById('btnClosePack');
        if (btnClosePack) btnClosePack.addEventListener('click', () => { 
            document.getElementById('packModal').style.display = 'none'; 
            switchTab('tab-evolucao', 'nav-evolucao');
        });
        
        checkSequence(); 
        updateDynamicCards(); // NOVO: Atualiza o nome dos cartões ao iniciar
        checkCompletedCards(); // NOVO: Checa se há cartões concluídos hoje
        window.FitGamification.renderAlbum();
        renderWeeklyCalendar();
        renderCustomWorkouts(); 
        if (typeof renderMetricsChart === 'function') renderMetricsChart();   
        
        const savedState = safeGet('fitapp_active_state');
        if (savedState) {
            const state = JSON.parse(savedState);
            state.currentRoutine = state.state.currentRoutine;
            state.currentWorkoutType = state.state.currentWorkoutType;
            state.workoutStartTime = state.state.workoutStartTime;
            state.isWorkoutActive = true;
            
            document.getElementById('workoutCards').style.display = 'none';
            const header = document.querySelector('.dashboard-header');
            if (header) header.style.display = 'none';
            state.els.workoutArea.style.display = 'block'; 
            state.els.btnFinishArea.style.display = 'block';
            
            // GARANTE O MODO FOCO: Caso a página seja recarregada no meio do treino
            const navBar = document.querySelector('nav');
            if(navBar) navBar.style.display = 'none';
            
            // Restaura o foco ocultando painéis secundários
            const mainSelector = document.getElementById('mainMethodSelector');
            const bioPanel = mainSelector ? mainSelector.closest('div') : null;
            if (bioPanel) bioPanel.style.display = 'none';
            
            const templatesFront = document.getElementById('templatesFrontline');
            if (templatesFront) templatesFront.style.display = 'none';
            
            if (state.globalTimer) clearInterval(state.globalTimer);
            state.globalTimer = setInterval(updateGlobalTimer, 1000);
            updateGlobalTimer();
            
            renderstate.currentRoutine(); 
            showToast('Treino em andamento restaurado.');
        }

        // NOVO: Recupera a Fila de Inteligência Artificial interrompida
        const savedAIFila = safeGet('fitapp_fila_ia');
        if (savedAIFila && savedAIFila !== '[]') {
            try {
                state.filaDeTreinosIA = JSON.parse(savedAIFila);
                if (state.filaDeTreinosIA.length > 0) {
                    showToast(`Detectado ${state.filaDeTreinosIA.length} treino(s) da IA pendentes para revisão.`);
                    // Restaura a interface de continuação
                    state.currentWorkoutType = 'novo_customizado';
                    carregarProximoTreinoIA();
                }
            } catch(e) { console.error("Fila IA corrompida."); }
        }
       
        updateEnvUI();
        updateCampaignDashboard();
        syncTacticalDictionary(); 

        // 🛡️ ESCUDO ANTI-RECARREGAMENTO: Evita F5 ou fechar a aba por engano
        window.addEventListener('beforeunload', (e) => {
            if (state.isWorkoutActive) {
                e.preventDefault();
                e.returnValue = ''; // Exigido pelos navegadores modernos
            }
        });

        // 🛡️ INTERCETOR DE GESTOS (SWIPE BACK): Impede o "deslizar para trás" do Android/iOS de fechar a PWA
        history.pushState(null, null, location.href);
        window.addEventListener('popstate', () => {
            if (state.isWorkoutActive) {
                // Se estiver num combate, empurra o estado de volta e ignora o deslize
                history.pushState(null, null, location.href);
                showToast("⚠️ Combate em curso. Utilize o botão 'Abortar Missão' para sair.");
            } else {
                // Mantém a PWA viva mesmo fora de treinos para evitar ecrãs pretos indesejados
                history.pushState(null, null, location.href);
            }
        });
        
    } 

// ==========================================
    // 🧬 A FORJA DE TREINOS (MOTOR FISIOLÓGICO)
    // ==========================================

function lockCampaign() {
        const methodSelector = document.getElementById('mainMethodSelector');
        const profileSelector = document.getElementById('profileSelector');
        const levelSelector = document.getElementById('levelSelector');
        
        if (!methodSelector || !profileSelector || !levelSelector) return;
        
        const method = methodSelector.value;
        const profile = profileSelector.value;
        const level = levelSelector.value;
        
        const currentMethod = safeGet('fitapp_main_method');
        const currentLevel = safeGet('fitapp_level');
        
        // TRAVA TÁTICA: Só aborta e reseta o mesociclo se o Método ou Nível tiverem sido alterados
        if (currentMethod && (currentMethod !== method || currentLevel !== level)) {
            safeSet('fitapp_campaign_data', '');
            safeSet('fitapp_campaign_count', 0);
        }
        
        // Salva as escolhas definitivamente no cofre
        safeSet('fitapp_main_method', method);
        safeSet('fitapp_profile', profile);
        safeSet('fitapp_level', level);
        safeSet('fitapp_onboarding_done', 'true');
        
        // Aplica as mudanças no motor
        applyTheme();
        updateDynamicCards();
        updateCampaignDashboard();
        saveCampaignToCloud(); // NOVO: Envia o plano recém-criado para a nuvem
        showToast("Plano Tático Travado com Sucesso!");
        if(state.audioEnabled) speak("Plano tático travado. Motor biomecânico atualizado.");
        
        // Roteamento automático para a Linha de Frente (Aba Treinar)
        switchTab('tab-treino', 'nav-treino');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


// --- NOVO: FUNÇÕES DE TERRENO E CAMPANHA ---
    function toggleGlobalEnv() {
        if (state.isWorkoutActive) {
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
        if(typeof state.audioEnabled !== 'undefined' && state.audioEnabled) speak(`Modo ${envText} ativado.`);
        showToast(`Terreno alterado para: ${envText}`);

        // Recarregamento Automático
        if (state.currentWorkoutType && !state.isWorkoutActive) {
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
                icon.textContent = '🌲'; text.textContent = 'Parque/Praia';
                btn.style.borderColor = '#4da3ff'; btn.style.color = '#4da3ff'; btn.style.background = 'rgba(77, 163, 255, 0.1)';
            }
        }

        // 🛡️ SINCRONIZAÇÃO DE ARSENAL: Força a Forja a respeitar o ambiente selecionado
        const equipChips = document.querySelectorAll('.forge-equip-chip');
        if (equipChips.length > 0) {
            equipChips.forEach(chip => {
                const eq = chip.getAttribute('data-equip') || '';
                chip.classList.remove('active'); // Desliga todos primeiro
                
                if (currentEnv === 'casa' && eq.includes('Peso_Corporal')) {
                    chip.classList.add('active'); // Liga só peso corporal
                } else if (currentEnv === 'praia' && (eq.includes('Peso_Corporal') || eq.includes('Calistenia'))) {
                    chip.classList.add('active'); // Liga barras e peso corporal
                } else if (currentEnv === 'academia') {
                    chip.classList.add('active'); // Liga tudo
                }
            });
        }
    }

    function updateCampaignDashboard() {
        const campaignStr = safeGet('fitapp_campaign_data');
        const bioPanel = document.getElementById('biomechanicsPanel');
        const dash = document.getElementById('campaignDashboard');
        const banner = document.getElementById('smartBannerSetup'); // NOVO
        const history = JSON.parse(safeGet('fitapp_week_log') || '[]'); // NOVO
        const onboardingDone = safeGet('fitapp_onboarding_done') === 'true'; // NOVO
        
        // 1. Puxamos a leitura da contagem para ANTES do IF
        let count = parseInt(safeGet('fitapp_campaign_count') || '0');
        
        // 2. Adicionamos a trava "&& count > 0" para evitar o bloqueio precoce
        if (campaignStr && campaignStr.trim() !== '' && count > 0) {
            if(bioPanel) bioPanel.style.display = 'none';
            if(dash) dash.style.display = 'block';
            if(banner) banner.style.display = 'none'; // Esconde banner na campanha
            
            const campData = JSON.parse(campaignStr);
            
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
            
            // LÓGICA DO SMART BANNER
            if (banner) {
                if (!onboardingDone && history.length === 0) {
                    banner.style.display = 'block'; // Mostra apenas para novatos absolutos
                } else {
                    banner.style.display = 'none'; // Esconde se já treinou ou configurou
                }
            }
            
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
            saveCampaignToCloud();
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

        // 🛡️ ADAPTAÇÃO SILENCIOSA: Atualizado para a nova nomenclatura de Peso Corporal
        const allowedEquips = envTarget === 'praia' ? ['Peso Corporal', 'Calistenia'] : ['Peso Corporal'];
        const preferredEquip = envTarget === 'praia' ? 'Calistenia' : 'Peso Corporal';

        state.currentRoutine.forEach(bloco => {
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
                        } else {
                            // 🛡️ FALLBACK ABSOLUTO: Se não houver substituto perfeito, força um movimento corporal básico do mesmo grupo
                            const fallbackPool = dictionaryData.filter(d => 
                                getBroadGroup(d.group + " " + d.focus) === targetGroup && 
                                (d.equip || '').includes('Peso_Corporal')
                            );
                            if (fallbackPool.length > 0) {
                                ex.name = fallbackPool[Math.floor(Math.random() * fallbackPool.length)].name;
                            } else {
                                // Último recurso: Abdominal ou Agachamento genérico para não deixar a máquina na lista
                                ex.name = targetGroup === 'pernas' ? "Agachamento Livre (Peso Corporal)" : "Prancha Isométrica";
                            }
                        }
                    }
                }
            });
        });
    }
    return { 
        init, filterLibrary, openSwapModal, confirmSwap, startWorkout, startCardio, toggleCardioTimer, updateDynamicCards,
        beginWorkoutExecution, acceptSnap, declineSnap, cancelWorkoutPreview,
        toggleGlobalEnv, updateEnvUI, updateCampaignDashboard, resetCampaign, lockCampaign,
        openAddExerciseModal, filterAddModal, confirmAddExercise, removeExercise, setCategoryFilter,
        renderIsolationChart, exportStravaCard,
        openHistoryModal, switchHistoryTab, deleteHistoryLog,
        saveCustomWorkout, deleteCustomWorkout,
        finalizeSession, checkSequence, startPrepPhase,
        safeGet, safeSet, showToast, speak, saveWorkoutState, updateProgress, clearWorkoutState,
        openDict: (name) => { 
            switchTab('tab-biblioteca', 'nav-biblioteca'); 
            const searchInp = document.getElementById('searchInput');
            if (searchInp) {
                searchInp.value = name;
                filterLibrary(); 
            } 
        } 
    };
})(); // 🛡️ FECHAMENTO CRÍTICO DO MÓDULO FITAPP (Não apagar)

// ==========================================
// 🌐 DECLARAÇÕES GLOBAIS (ESTRITAMENTE FORA DO FITAPP)
// ==========================================
window.FitApp = FitApp;

// Conexão do Motor de Combate (combat.js)
window.FitApp.adjustRestTime = adjustRestTime;
window.FitApp.startRestTimer = startRestTimer;
window.FitApp.stopRestTimer = stopRestTimer;
window.FitApp.changeSets = changeSets;
window.FitApp.cloneFirstSet = cloneFirstSet;
window.FitApp.updateGlobalTimer = updateGlobalTimer;
window.FitApp.startCooldownTimer = startCooldownTimer;
window.FitApp.skipCooldown = skipCooldown;
window.FitApp.toggleAutoPilot = toggleAutoPilot;
window.FitApp.startAutoPilot = startAutoPilot;
window.FitApp.executeAutoPhase = executeAutoPhase;
window.FitApp.stopAutoPilot = stopAutoPilot;

// Conexão do Cérebro Neural (forge.js)
window.FitApp.openForgeModal = openForgeModal;
window.FitApp.updateForgeOptions = updateForgeOptions;
window.FitApp.generateForgedWorkout = generateForgedWorkout;
window.FitApp.executeForgeLogic = executeForgeLogic;

// Conexão da Inteligência Artificial (ai.js)
window.FitApp.fetchAIFeedback = fetchAIFeedback;
window.FitApp.openImportAiModal = openImportAiModal;
window.FitApp.switchAiTab = switchAiTab;
window.FitApp.processWorkoutWithAI = processWorkoutWithAI;
window.FitApp.carregarProximoTreinoIA = carregarProximoTreinoIA;
// Conexão da Interface Visual (ui.js)
window.FitApp.renderLibrary = renderLibrary;
window.FitApp.filterLibrary = filterLibrary;
window.FitApp.renderPreviewList = renderPreviewList;
window.FitApp.renderCurrentRoutine = renderCurrentRoutine;
window.FitApp.updateDynamicCards = updateDynamicCards;
window.FitApp.applyTheme = applyTheme;
window.FitApp.switchTab = switchTab;
window.FitApp.renderWeeklyCalendar = renderWeeklyCalendar;
window.FitApp.renderMonthlyCalendar = renderMonthlyCalendar;
window.FitApp.renderCustomWorkouts = renderCustomWorkouts;
window.FitApp.renderHistoryList = renderHistoryList;
window.FitApp.renderMetricsChart = renderMetricsChart;
window.FitApp.renderIsolationChart = renderIsolationChart;

window.FitApp.removeExercise = removeExercise;
window.FitApp.openAddExerciseModal = openAddExerciseModal;
window.FitApp.setCategoryFilter = setCategoryFilter;
window.FitApp.filterAddModal = filterAddModal;
window.FitApp.confirmAddExercise = confirmAddExercise;
window.FitApp.checkCompletedCards = checkCompletedCards;
window.FitApp.checkSequence = FitApp.checkSequence;
window.FitApp.startPrepPhase = FitApp.startPrepPhase;
window.FitApp.saveWorkoutState = FitApp.saveWorkoutState;
window.FitApp.updateProgress = FitApp.updateProgress;
window.FitApp.clearWorkoutState = FitApp.clearWorkoutState;

// Ignição do Sistema
document.addEventListener('DOMContentLoaded', FitApp.init);

