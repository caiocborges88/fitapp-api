import {adaptRoutineToEnvironment,availableInEnvironment,environmentOptions,sameMuscleFocus,findMovement} from './environment.js';
import {buildEnvironmentProposal,proposalSignature} from './environment-proposal.js';
import {aiWorkoutsEnabled} from './ai-features.js';
import {configureEditor,saveEditor} from './editor.js';
import {routineForTemplate} from './editor-domain.js';
import {retiredMethod,selectSavedMethod} from './workout-methods.js';
import {commitWorkoutPlan} from './campaign-store.js';
import {reviewRoutine} from './routine-review.js';
import {modelSettings} from './model-settings.js';
import {refreshCoverage} from './ui.js';
import {persistDraft,finishDraft} from './drafts.js';
import {equipmentGroups} from './equipment-settings.js';
'use strict';

// 🌐 IMPORTAÇÕES MODULARES GLOBAIS (Devem estar sempre no topo)
import { state } from './state.js';
import { completedSets, mergeHistory, newId, normalizeDictionary, normalizeRoutine, readJSON, workoutLabel, sessionLabel } from './domain.js';
import { FitAudio } from './audio.js';
import { escapeHTML, parseSafeFloat, getMuscleGroup } from './utils.js';
import { syncOfflineWorkouts, saveCampaignToCloud, flushCampaign, loadCampaignFromCloud, syncTacticalDictionary } from './sync.js';
import { openForgeModal, updateForgeOptions, generateForgedWorkout, executeForgeLogic, executeForgePlan } from './forge.js';
import { fetchAIFeedback, openImportAiModal, switchAiTab, processWorkoutWithAI, carregarProximoTreinoIA } from './ai.js';
import { adjustRestTime, startRestTimer, stopRestTimer, changeSets, cloneFirstSet, updateGlobalTimer, startCooldownTimer, skipCooldown, toggleAutoPilot, startAutoPilot, executeAutoPhase, stopAutoPilot } from './combat.js';
import { renderLibrary, filterLibrary, renderPreviewList, renderCurrentRoutine, updateDynamicCards, applyTheme, switchTab, renderWeeklyCalendar, renderMonthlyCalendar, renderCustomWorkouts, renderHistoryList, renderMetricsChart, renderIsolationChart, removeExercise, openAddExerciseModal, setCategoryFilter, filterAddModal, confirmAddExercise, checkCompletedCards } from './ui.js';
var FitApp = (() => {
    window.dictionaryData = normalizeDictionary(window.dictionaryData || []);
    // 🛡️ As variáveis de combate foram transferidas para o js/state.js

    const safeSet = (key, value) => {
        try { return window.FitStore.set(key, value); }
        catch (error) { console.error('Falha na persistência local:', error); showToast('Não foi possível gravar no dispositivo. Libere espaço e tente novamente.'); return false; }
    };
    const safeGet = (k) => { try { return window.FitStore.get(k); } catch(e) { return null; } };

    function showToast(msg) { const toast = state.els.toast || document.getElementById('toast'); if (!toast) return; toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 5000); }
    function speak(text) { if (!state.audioEnabled || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'pt-BR'; utterance.rate = 1.1; window.speechSynthesis.speak(utterance); }
    function toggleAudio() { 
        state.audioEnabled = !state.audioEnabled; 
        const btn = document.getElementById('btnAudio'); 
        if (state.audioEnabled) { 
            btn.classList.add('active'); 
            if (typeof FitAudio !== 'undefined' && FitAudio.unlock) FitAudio.unlock(); // 🛡️ Aciona a chave da Apple
            speak("Assistente ativado."); 
        } else { 
            btn.classList.remove('active'); 
            window.speechSynthesis.cancel(); 
        }
        btn.setAttribute('aria-pressed', String(state.audioEnabled));
        btn.setAttribute('aria-label', state.audioEnabled ? 'Desativar avisos por voz' : 'Ativar avisos por voz');
    }


async function exportStravaCard(historyIndex = -1) {
        showToast("📸 Focando lente... aguarde.");
        
        let history = readJSON(safeGet('fitapp_week_log'), []);
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
                if (s.measurementType !== 'duration') totalVolume += (parseFloat(s.kg) || 0) * (parseInt(s.reps) || 0);
            });
        }
        
        // Injeta os dados na placa (Card) escondida
        document.getElementById('stravaWorkoutType').textContent = sessionLabel(log,readJSON(safeGet('fitapp_custom_workouts'),[]));
        document.getElementById('stravaDuration').textContent = log.duration_secs < 60 ? `${log.duration_secs || 0} s` : Math.floor(log.duration_secs / 60) + ' min';
        document.getElementById('stravaVolume').textContent = totalVolume > 0 ? (totalVolume / 1000).toFixed(1) + 'k kg' : '—';
        
        const card = document.getElementById('stravaCard');
        
        try {
            // A mágica: Redesenha o HTML num Canvas invisível
            const canvas = await html2canvas(card, { 
                backgroundColor: getComputedStyle(card).backgroundColor,
                scale: 2, // Escala 2 garante alta resolução no Instagram
                logging: false
            });
            
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            if (!blob) throw new Error('A imagem não pôde ser gerada.');
            const file = new File([blob], 'fitapp_treino.png', { type: 'image/png' });
                
                // Abre a gaveta nativa do celular (Web Share API)
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: 'Relatório FitApp',
                        text: 'Mais um treino registrado no FitApp.'
                    });
                } else {
                    // PLANO B: Se for PC ou navegador antigo, força o Download
                    const link = document.createElement('a');
                    link.download = 'fitapp_treino.png';
                    link.href = canvas.toDataURL();
                    link.click();
                    showToast('Resumo salvo como imagem.');
                }
            
        } catch(e) {
            if (e.name === 'AbortError') return;
            showToast('Não foi possível gerar ou compartilhar a imagem. Tente novamente.');
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
            getMuscleGroup(d.group) === broadGroup && d.name !== currentName && (!currentDict || sameMuscleFocus(currentDict,d)) && (level!=='iniciante'||d.nivel!==3)
        );

        // Blindagem de Ambiente
        pool=pool.filter(d=>availableInEnvironment(d,{...environmentOptions(),environment:type==='Casa'?'casa':currentEnv,equipmentPolicy:state.currentRoutine[bIndex].equipmentPolicy}));
        const excluded=new Set(readJSON(safeGet('fitapp_blacklist'),[]).map(name=>findMovement(window.dictionaryData,name)?.name||name));
        pool=pool.filter(d=>!excluded.has(d.name));

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
                    <h3>Trocar: ${escapeHTML(currentName)}</h3>
                    <button class="btn-close-modal" onclick="document.getElementById('swapModal').style.display='none'">&times;</button>
                </div>
                <div class="swap-list">
        `;

        if (currentName !== originalName) {
            html += `
                <div class="swap-item" style="border-left: 4px solid var(--warning); background: rgba(255, 170, 0, 0.1);" data-swap-original="true">
                    <div class="swap-item-name">↩️ Restaurar Original</div>
                    <div class="swap-item-focus">${escapeHTML(originalName)}</div>
                </div>
            `;
        }

        html += `<p style="color: var(--muted); font-size: 13px; margin: 15px 0 10px 0;">Sugestões compatíveis com este músculo:</p>`;

        if (pool.length === 0) {
            html += `<div style="color: var(--danger); text-align: center; padding: 20px;">Nenhuma variação cadastrada para este músculo.</div>`;
        } else {
            pool.forEach(item => {
                html += `
                    <div class="swap-item" data-swap-index="${pool.indexOf(item)}">
                        <div class="swap-item-name">${escapeHTML(item.name)}</div>
                        <div class="swap-item-focus">🎯 Foco: ${escapeHTML(item.focus)}</div>
                        <div class="swap-item-focus" style="color: var(--accent); margin-top: 4px;">🎒 Requer: ${escapeHTML(item.equip ? item.equip.replace(/_/g, ' ') : 'N/A')}</div>
                    </div>
                `;
            });
        }
        
        html += `
                </div>
                <button onclick="document.getElementById('swapModal').style.display='none'" style="width: 100%; padding: 12px; margin-top: 15px; background: var(--line); color: var(--ink); border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Cancelar</button>
            </div>
        `;
        
        modal.innerHTML = html;
        modal.querySelector('[data-swap-original]')?.addEventListener('click', () => confirmSwap(bIndex, eIndex, originalName));
        modal.querySelectorAll('[data-swap-index]').forEach(el => el.addEventListener('click', () => confirmSwap(bIndex, eIndex, pool[Number(el.dataset.swapIndex)].name)));
        modal.style.display = 'flex';
    }

    function confirmSwap(bIndex, eIndex, newName) {
        if (state.isWorkoutActive && state.currentRoutine[bIndex].exercises[eIndex].setsData?.some(set => set.checked)) { showToast('Este exercício já tem séries registradas. Adicione o novo movimento separadamente para preservar os registros.'); return; }
        const candidate=window.dictionaryData.find(item=>item.name===newName);
        if(candidate?.nivel===3&&state.els.levelSelector?.value==='iniciante'){showToast('Escolha uma alternativa de complexidade básica ou moderada para esta troca.');return;}
        if(!availableInEnvironment(candidate,{...environmentOptions(),equipmentPolicy:state.currentRoutine[bIndex].equipmentPolicy})){showToast('Este movimento não atende aos recursos ou ao tipo de equipamento deste bloco.');return;}
        delete state.currentRoutine[bIndex].exercises[eIndex]._environmentOriginal;
        delete state.currentRoutine[bIndex].exercises[eIndex].setsData;
        if(state.currentRoutine[bIndex].exercises[eIndex].reviewCode!=='target-review')delete state.currentRoutine[bIndex].exercises[eIndex].needsReview;
        state.currentRoutine[bIndex].exercises[eIndex].name = newName;
        document.getElementById('swapModal').style.display = 'none';
        
        if (state.isWorkoutActive) {
            renderCurrentRoutine();
            saveWorkoutState(); 
        } else {
            renderPreviewList();
        }
        
        if(state.audioEnabled) speak("Exercício atualizado.");
    }

    function checkSequence() {
        let history = readJSON(safeGet('fitapp_week_log'), []);
        let total = history.length;
        let lastType = total > 0 ? history[total - 1].tipo : null;

        const statTotal = document.getElementById('statTotal');
        const statLast = document.getElementById('statLast');
        if(statTotal) statTotal.textContent = total;
        if(statLast) statLast.textContent = lastType ? sessionLabel(history.at(-1),readJSON(safeGet('fitapp_custom_workouts'),[])) : 'Nenhum';
    }



    function createManualWorkout() {
        if (state.isWorkoutActive) { showToast('Salve ou descarte a sessão atual antes de criar uma ficha.'); return; }
        if(!persistDraft())return;
        switchTab('tab-treino','nav-treino');
        state.currentWorkoutType='Livre';
        state.currentRoutine=[{title:'Minha ficha',type:'traditional',exercises:[]}];
        loadWorkout();
        document.getElementById('customWorkoutName').value='';
        document.getElementById('previewTitle').textContent='Cadastre sua ficha';
        document.getElementById('previewDesc').textContent='Adicione exercícios e salve para reutilizar nos próximos treinos.';
        document.getElementById('customWorkoutName').focus();
    }

    function startWorkout(type) {
        if(state.isWorkoutActive){showToast('Conclua ou descarte a sessão atual antes de abrir outra ficha.');return;}
        if(!persistDraft())return;
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
        state.sessionId = newId();
        const finishButton = document.getElementById('btnFinishAction');
        if (finishButton) { finishButton.disabled = false; finishButton.style.opacity = '1'; }
        state.currentRoutine = [];
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
            btnToggle.style.color = 'var(--secondary)'; btnToggle.style.borderColor = 'var(--secondary)'; btnToggle.style.background = 'rgba(77, 163, 255, 0.2)';
        }
        
        document.getElementById('cardioDist').value = '';
        document.getElementById('cardioKcal').value = '';
        document.getElementById('cardioBpm').value = '';
        
        state.workoutStartTime = Date.now();
        saveWorkoutState();
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
            btn.style.color = 'var(--accent)'; btn.style.borderColor = 'var(--accent)'; btn.style.background = 'var(--accent-soft)';
            if(state.audioEnabled) speak("Relógio pausado.");
        } else {
            isCardioRunning = true;
            // Desloca o tempo de início baseado no quanto já foi percorrido (matemática pura)
            cardioStartTime = Date.now() - (cardioPausedTime * 1000); 
            
            btn.innerHTML = "⏸ Pausar Relógio";
            btn.style.color = 'var(--warning)'; btn.style.borderColor = 'var(--warning)'; btn.style.background = 'rgba(255, 170, 0, 0.2)';
            if(state.audioEnabled) speak("Ação.");
            
            cardioTimerInterval = setInterval(() => {
                // Cálculo imune ao sono do celular
                cardioElapsedSeconds = Math.floor((Date.now() - cardioStartTime) / 1000); 
                const h = Math.floor(cardioElapsedSeconds / 3600).toString().padStart(2, '0');
                const m = Math.floor((cardioElapsedSeconds % 3600) / 60).toString().padStart(2, '0');
                const s = (cardioElapsedSeconds % 60).toString().padStart(2, '0');
                
                const display = document.getElementById('cardioTimerDisplay');
                if (display) display.textContent = `${h}:${m}:${s}`;
                saveWorkoutState();
            }, 1000);
        }
    }
    // ----------------------------



function saveWorkoutState() {
        if (!state.isWorkoutActive) return;
        const activeState = { 
            version: 2, userId: window.FitStore.uid, sessionId: state.sessionId,
            currentRoutine: state.currentRoutine, 
            currentWorkoutType: state.currentWorkoutType, 
            workoutStartTime: state.workoutStartTime,
            restSeconds:state.currentRestTime,
            cardio: { elapsed: cardioElapsedSeconds, paused: cardioPausedTime, running: isCardioRunning, startTime: cardioStartTime }
        };
        if (!safeSet('fitapp_active_state', JSON.stringify(activeState))) return false;
        return true;
    }

    function clearWorkoutState() {
        window.FitStore.remove('fitapp_active_state');
    }



    function loadWorkout() {
        state.environmentProposal=null;
        const style = state.els.styleSelector ? state.els.styleSelector.value : 'biset';
        const level = state.els.levelSelector ? state.els.levelSelector.value : 'intermediario';
        const profile = state.els.profileSelector ? state.els.profileSelector.value : 'masculino'; // NOVO: Leitura do Perfil
        const type = state.currentWorkoutType;
        if (!type) return;
        state.previewModel=null;
        state.coverageReference=null;
        adjustRestTime(60);

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
                document.getElementById('previewTitle').textContent = `Revise sua ficha`;
                document.getElementById('previewDesc').textContent = `Revise os exercícios e salve para reutilizar.`;
                if(customControls) customControls.style.display = 'flex';
                if(nameContainer) nameContainer.style.display = 'block';
            }
        } else if (type === 'Casa') {
            try{
                state.currentRoutine=executeForgeLogic('casa','A',readJSON(safeGet('fitapp_blacklist'),[]),
                    {environment:'casa',resources:[],allEquipment:true});
            }catch(error){showToast(error.message);cancelWorkoutPreview();return;}
            state.previewModel={method:'casa',profile,level};
            adjustRestTime(modelSettings('casa',profile,level).restSeconds);
            if(preview){
                document.getElementById('previewTitle').textContent='Treino em casa sem equipamentos';
                document.getElementById('previewDesc').textContent='Circuito de peito, quadríceps e core com cardio. Revise a sessão antes de iniciar.';
                if(customControls)customControls.style.display='none';
                if(nameContainer)nameContainer.style.display='none';
            }
        } else if (type.startsWith('custom_')) {
            const customId = type.slice(7);
            const savedCustoms = readJSON(safeGet('fitapp_custom_workouts'), []);
            const customWorkout = savedCustoms.find(w => String(w.id) === customId);
            
            if (customWorkout) {
                state.currentRoutine = routineForTemplate(customWorkout.routine);
                if(preview) {
                    document.getElementById('previewTitle').textContent = customWorkout.name;
                    document.getElementById('previewDesc').textContent = `Ajuste a sessão ou abra a versão salva para edição permanente.`;
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
            let campaignData = readJSON(savedCampaignStr, null) || { method: method, level: level, workouts: {}, startDate: new Date().toISOString() };

            // Se o usuário alterou o método ou nível manualmente na tela, quebra a campanha atual
            const replacing=!retiredMethod(method)&&(campaignData.method !== method || campaignData.level !== level || campaignData.profile !== profile);
            if (replacing) {
                campaignData = { method: method, level: level, workouts: {}, startDate: new Date().toISOString() };
            }

            try {
                campaignData.workouts = executeForgePlan(method, readJSON(safeGet('fitapp_blacklist'), []),
                    {environment:'academia', allEquipment:true}, campaignData.workouts);
            } catch (error) { showToast(error.message); cancelWorkoutPreview(); return; }
            campaignData.id = campaignData.id || newId();
            if(!retiredMethod(method))campaignData.profile = profile;
            if(replacing){try{commitWorkoutPlan(window.FitStore,campaignData,{resetCount:true});}catch(error){showToast('Não foi possível gravar o novo plano. O plano anterior foi mantido.');cancelWorkoutPreview();return;}}
            else if(!safeSet(campaignKey, JSON.stringify(campaignData))){cancelWorkoutPreview();return;}
            saveCampaignToCloud();
            state.currentRoutine = JSON.parse(JSON.stringify(campaignData.workouts[type]));
            if(!retiredMethod(campaignData.method)){
                state.previewModel={method:campaignData.method,profile:campaignData.profile||'hipertrofia',level:campaignData.level||'iniciante'};
                adjustRestTime(modelSettings(state.previewModel.method,state.previewModel.profile,state.previewModel.level).restSeconds);
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
            state.coverageReference=structuredClone(state.currentRoutine);
            adaptCurrentEnvironment();
            preview.style.display = 'block';
            configureEditor(['Livre','novo_customizado','custom_ia'].includes(type)?'new':'session');
            renderPreviewList();
            if(!nameInput.value.trim())nameInput.value=document.getElementById('previewTitle').textContent;
        }
    }

    function cancelWorkoutPreview() {
        if(!persistDraft())return false;
        document.getElementById('workoutPreview').style.display = 'none';
        document.getElementById('prepArea').style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';
        state.currentWorkoutType = '';
        state.editorContext = null;
        state.currentRoutine = [];
        state.environmentProposal = null;
        
        // Restaura o painel biomecânico
        const mainSelector = document.getElementById('mainMethodSelector');
        const bioPanel = mainSelector ? mainSelector.closest('div') : null;
        if (bioPanel) bioPanel.style.display = 'block';

        // Restaura o bloco de Treino Pessoal
        const templatesFront = document.getElementById('templatesFrontline');
        if (templatesFront) templatesFront.style.display = 'block';
        updateCampaignDashboard();
        return true;
    }


    function beginWorkoutExecution() {
        executeWorkoutStart();
    }

    function acceptSnap() {
        // Compatibilidade com sessões e automações de versões anteriores.
        executeWorkoutStart();
    }

    function declineSnap() {
        executeWorkoutStart();
    }

    // A função original que realmente inicia o cronômetro (Fase 2)
    function executeWorkoutStart() {
        if(state.environmentProposal?.status==='pending'){showToast('Revise a proposta do ambiente ou volte à ficha completa antes de iniciar.');return;}
        if(['template','plan','cycle'].includes(state.editorContext?.kind)){showToast('Salve as alterações ou volte à versão salva antes de iniciar.');return;}
        const issues=reviewRoutine(state.currentRoutine,window.dictionaryData,environmentOptions());
        if(issues.length){renderPreviewList();showToast(issues[0].message);document.getElementById('routineReview')?.scrollIntoView({block:'start',behavior:'smooth'});return;}
        try { state.currentRoutine = normalizeRoutine(state.currentRoutine); }
        catch (error) { showToast(error.message); return; }
        state.sessionId = newId();
        const finishButton = document.getElementById('btnFinishAction');
        if (finishButton) { finishButton.disabled = false; finishButton.style.opacity = '1'; }
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
        if(saveWorkoutState()){
            safeSet('fitapp_last_workout',state.currentWorkoutType);finishDraft();
        }else{
            clearInterval(state.globalTimer);state.isWorkoutActive=false;
            state.els.workoutArea.style.display='none';state.els.btnFinishArea.style.display='none';
            document.getElementById('workoutPreview').style.display='block';
            document.getElementById('bottomNav').style.display='flex';
            showToast('Não foi possível guardar a sessão. Sua revisão continua aberta; libere espaço e tente novamente.');
        }
    }



    function updateProgress() {
        const pct = state.totalSets === 0 ? 0 : Math.round((state.checkedSets / state.totalSets) * 100);
        state.els.progressBar.style.width = pct + '%';
        for(const [name,value]of Object.entries({role:'progressbar','aria-label':'Séries realizadas','aria-valuemin':'0','aria-valuemax':'100','aria-valuenow':String(pct)}))state.els.progressBar.setAttribute(name,value);
        const btn = document.getElementById('btnFinishAction');
        if(pct === 100) { btn.className = 'btn-action button primary'; btn.textContent = 'Concluir treino'; stopRestTimer(); speak("Treino finalizado."); }
        else { btn.className = 'btn-action button primary'; btn.textContent = 'Salvar treino parcial'; }
    }

    async function finishWorkout() {
        if (!window.FitStore.uid) { showToast('Entre na sua conta antes de salvar.'); return; }
        if (state.currentWorkoutType !== 'Cardio') state.todayLog = completedSets(state.currentRoutine);
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
            
            if (cardioElapsedSeconds === 0 && dist === 0 && kcal === 0) {
                showToast("Registre a duração ou os dados da atividade antes de salvar.");
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
        
        const totalTimeSecs = state.currentWorkoutType === 'Cardio' ? cardioElapsedSeconds : tempTotalTimeSecs;
        const campaign = readJSON(safeGet('fitapp_campaign_data'), null);
        const currentMethod = document.getElementById('mainMethodSelector')?.value || 'abc';
        const payload = {
            _id: state.sessionId || newId(), userId: window.FitStore.uid,
            date: dataHoje, tipo: tipoTreino, method: currentMethod,
            workoutName: (tipoTreino==='Cardio'?'Aeróbico':document.getElementById('customWorkoutName').value.trim() || workoutLabel(tipoTreino)).slice(0,120),
            duration_secs: totalTimeSecs, data: state.todayLog,
            createdAt: Date.now(), complete: isComplete,
            campaignId: ['A','B','C','D'].includes(tipoTreino) ? campaign?.id || null : null,
            _sync: 'pending'
        };
        // A sessão só é encerrada depois de uma gravação local confirmada.
        try {
            await window.FitStore.updateQueue(queue => queue.some(item => item._id === payload._id) ? queue : [...queue, payload]);
        } catch (error) {
            showToast('Não foi possível gravar no dispositivo. Sua sessão continua aberta.');
            btnFinish.disabled = false; btnFinish.style.opacity = '1';
            btnFinish.textContent = 'Tentar salvar novamente'; return;
        }
        const history = mergeHistory(readJSON(safeGet('fitapp_week_log'), []), [], [payload]);
        safeSet('fitapp_week_log', JSON.stringify(history));
        clearInterval(state.globalTimer); clearInterval(cardioTimerInterval);
        state.workoutStartTime = null; state.isWorkoutActive = false;
        stopAutoPilot();
        syncOfflineWorkouts().catch(error => console.warn('Treino guardado no dispositivo:', error.message));
        let campCount = parseInt(safeGet('fitapp_campaign_count') || '0');
        if (payload.campaignId && isComplete) campCount++;
        safeSet('fitapp_campaign_count', campCount);
        const daysPassed = campaign ? Math.floor((Date.now() - new Date(campaign.startDate)) / 86400000) : 0;
        const isPromotionTime = Boolean(campaign && !campaign.reviewRequested && (campCount >= 24 || daysPassed >= 56));
        if (isPromotionTime) {
            campaign.reviewRequested = true;
            safeSet('fitapp_campaign_data', JSON.stringify(campaign));
        }
        saveCampaignToCloud(); // NOVO: Atualiza a contagem de treinos do mesociclo na nuvem
        clearWorkoutState(); 
        state.isPromotionPending = isPromotionTime; // Guarda o status de promoção para depois da Fase 3

        state.els.workoutArea.style.display = 'none';
        document.getElementById('cardioArea').style.display = 'none'; 
        state.els.btnFinishArea.style.display = 'none';

        finalizeSession(false, false);
        const summary = document.getElementById('sessionSummary');
        if (summary) {
            document.getElementById('summaryTitle').textContent = isComplete ? 'Treino registrado.' : 'Seu progresso foi salvo.';
            document.getElementById('summaryDuration').textContent = totalTimeSecs < 60 ? `${totalTimeSecs} s` : `${Math.floor(totalTimeSecs / 60)} min`;
            document.getElementById('summarySets').textContent = tipoTreino === 'Cardio' ? 'Atividade aeróbica' : `${payload.data.length} séries registradas`;
            document.getElementById('summaryReward').hidden = !isComplete || totalTimeSecs < 120;
            summary.dataset.sessionId = payload._id;
            summary.showModal();
        }
    }
// ==========================================
    // FASE 3: VOLTA À CALMA & FINALIZAÇÃO
    // ==========================================




    function finalizeSession(earnedBonus, showPack) {
        state.isWorkoutActive = false;
        for (const timer of state.exerciseTimers) clearInterval(timer);
        state.exerciseTimers.clear();
        stopAutoPilot();
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

        if (showPack) {
            window.FitGamification.showPackModal(false);
        } else {
            showToast('Registro salvo neste dispositivo.');
            switchTab('tab-evolucao', 'nav-evolucao'); 
        }
        
        // Disparo de Promoção de Patente (Atrasado para não conflitar com a tela final)
        if (state.isPromotionPending) {
            setTimeout(() => {
                alert('Você atingiu um marco da campanha. Revise o plano com seu instrutor. Seu nível e seus exercícios foram preservados.');
                if(state.audioEnabled) speak('É hora de revisar o plano.');
            }, 1500);
            state.isPromotionPending = false;
        }
    }

    // ==========================================
    // FASE 1: INTELIGÊNCIA DE PREPARAÇÃO
    // ==========================================
    function startPrepPhase() {
        if(state.editorContext?.kind==='cycle'){showToast('Salve o ciclo e escolha um dia antes de iniciar.');return;}
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
                <div style="background: var(--surface); padding: 15px; border-radius: 8px; border-left: 3px solid var(--secondary); display: flex; align-items: center; gap: 10px;">
                    <div style="font-size: 24px;">🔄</div>
                    <div>
                        <div style="font-weight: bold; color: var(--ink); font-size: 14px;">${escapeHTML(ex.name)}</div>
                        <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">${ex.desc || 'Realize movimentos controlados.'}</div>
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
    if (confirm('Descartar esta sessão sem salvar? Para guardar as séries realizadas, cancele e use Salvar treino parcial.')) {
        
        // 1. Desliga os Motores
        stopRestTimer();
        stopAutoPilot();
        for (const timer of state.exerciseTimers) clearInterval(timer);
        state.exerciseTimers.clear();
        state.isWorkoutActive = false;
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
        showToast('Sessão descartada. Nenhum registro foi criado.');
        
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
    if(!persistDraft())return;
    if (confirm('Sair da conta? Os registros e rascunhos locais serão preservados e separados por conta.')) {
        firebase.auth().signOut().then(() => {
            // Expurgo tático da memória
            window.FitStore.bindUser(null);
            // Recarrega a página para levantar o escudo de login novamente
            window.location.reload(); 
        }).catch((error) => {
            console.error("Erro ao sair:", error);
            showToast("Falha ao desconectar.");
        });
    }
};

    function saveCustomWorkout() {
        const savingCycle = state.editorContext?.kind === 'cycle';
        if(!saveEditor())return;
        if(savingCycle){cancelWorkoutPreview();switchTab('tab-treino','nav-treino');return;}
        if(state.filaDeTreinosIA?.length){
            state.currentWorkoutType='novo_customizado';carregarProximoTreinoIA();
        }else{
            cancelWorkoutPreview();switchTab('tab-workouts','nav-workouts');
        }
    }

    function saveAndStartWorkout(){
        const context=state.editorContext;
        if(!context||!['new','cycle'].includes(context.kind)||state.isWorkoutActive)return;
        const day=context.activeDay||context.days?.[0];
        const requestedRest=state.currentRestTime;
        const routine=context.kind==='cycle'?state.currentRoutine.filter(block=>block.day===day):state.currentRoutine;
        const issues=reviewRoutine(routine,window.dictionaryData,environmentOptions());
        if(issues.length){showToast(issues[0].message);document.getElementById('routineReview')?.scrollIntoView({block:'start'});return;}
        if(!saveEditor())return;
        const type=state.savedWorkoutType;
        if(!cancelWorkoutPreview())return;
        startWorkout(type);if(context.kind==='new')adjustRestTime(requestedRest);beginWorkoutExecution();
    }

    function deleteCustomWorkout(id, event) {
        event.stopPropagation(); 
        if(!confirm('Atenção: Tem certeza que deseja excluir este template?')) return;
        
        let savedCustoms = readJSON(safeGet('fitapp_custom_workouts'), []);
        const deleted = readJSON(safeGet('fitapp_deleted_templates'), []);
        if (!safeSet('fitapp_deleted_templates', JSON.stringify([...new Set([...deleted, String(id)])]))) return;
        savedCustoms = savedCustoms.filter(w => String(w.id) !== String(id));
        if (!safeSet('fitapp_custom_workouts', JSON.stringify(savedCustoms))) return;
        saveCampaignToCloud();
        
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
            const record = readJSON(safeGet('fitapp_week_log'), []).find(h => h._id === docId);
            await window.FitStore.updateQueue(queue => [...queue.filter(item => item._id !== docId), {_id:docId,userId:window.FitStore.uid,_action:'delete'}]);
            window.FitStore.set('fitapp_deleted_sessions', JSON.stringify([...new Set([...readJSON(safeGet('fitapp_deleted_sessions'), []),docId])]));
            
            // 2. Limpa o cache local
            let history = readJSON(safeGet('fitapp_week_log'), []);
            history = history.filter(h => h._id !== docId);
            safeSet('fitapp_week_log', JSON.stringify(history));
            syncOfflineWorkouts();
            
            // 3. Decrementa a Campanha (Aviso Tático)
            let campCount = parseInt(safeGet('fitapp_campaign_count') || '0');
            const campaign = readJSON(safeGet('fitapp_campaign_data'), null);
            if (campCount > 0 && record?.complete && record.campaignId && record.campaignId === campaign?.id) {
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
            showToast("Registro excluído.");
            
        } catch(error) {
            document.getElementById('btnTabList').textContent = "📋 Lista";
            showToast("Falha. Verifique a conexão com a rede.");
            console.error(error);
        }
    }

    let refreshingCloud=false;
    async function refreshRemoteData(){
        const uid=window.FitStore.uid;
        if(!uid||refreshingCloud||!navigator.onLine||state.isWorkoutActive||document.body.classList.contains('preview-active')||document.getElementById('tab-perfil')?.classList.contains('active'))return;
        refreshingCloud=true;
        try{
            await syncOfflineWorkouts();await FitAPI.carregarExclusoes();
            const recent=await FitAPI.carregarHistoricoRecente();if(window.FitStore.uid!==uid)return;
            const deleted=new Set(readJSON(safeGet('fitapp_deleted_sessions'),[]));
            safeSet('fitapp_week_log',JSON.stringify(mergeHistory(readJSON(safeGet('fitapp_week_log'),[]),recent).filter(item=>!deleted.has(item._id))));
            await loadCampaignFromCloud();
            checkSequence();renderWeeklyCalendar();renderHistoryList();renderMetricsChart();
        }catch(error){console.warn('Atualização da nuvem pendente:',error.message);}
        finally{refreshingCloud=false;}
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

        window.addEventListener('fitapp:cloudchange', () => {
            updateDynamicCards(); updateCampaignDashboard(); renderCustomWorkouts();
            if (!document.getElementById('tab-perfil')?.classList.contains('active')) {
                for (const [id,key] of [['profileSelector','profile'],['levelSelector','level'],['mainMethodSelector','main_method']]) {
                    const el=document.getElementById(id);
                    if(el){const value=safeGet('fitapp_'+key)||el.value;if(key==='main_method')selectSavedMethod(el,value,readJSON(safeGet('fitapp_campaign_data'),null));else el.value=value;}
                }
                updateDynamicCards();
            }
        });
        // Escuta quando a internet volta, mas só sincroniza se estiver logado
        window.addEventListener('online', () => {
            if (firebase.auth().currentUser) { syncOfflineWorkouts(); flushCampaign(); refreshRemoteData(); }
        });
        document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshRemoteData();});
        
        // Aguarda o sinal verde do Firebase Auth para iniciar a sincronização
        firebase.auth().onAuthStateChanged(async (user) => {
            const loginOverlay = document.getElementById('loginOverlay');
            const bottomNav = document.getElementById('bottomNav');
            
            if (user) {
                if (window.FitStore.uid && window.FitStore.uid !== user.uid) { window.location.reload(); return; }
                window.FitStore.bindUser(user.uid);
                hydrateLocalState();
                // Usuário logado: Destrói o escudo de login, mostra a barra e sincroniza
                if (loginOverlay) loginOverlay.style.display = 'none';
                if (bottomNav) bottomNav.style.display = state.isWorkoutActive ? 'none' : 'flex';
                
                // --- INÍCIO DO RESGATE DE MEMÓRIA CLOUD ---
                try {
                    await syncOfflineWorkouts();
                    await FitAPI.carregarExclusoes();
                    if (window.FitStore.uid !== user.uid) return;
                    const removed = new Set(readJSON(safeGet('fitapp_deleted_sessions'), []));
                    safeSet('fitapp_week_log', JSON.stringify(readJSON(safeGet('fitapp_week_log'), []).filter(item=>!removed.has(item._id))));
                    const nuvemLogs = await FitAPI.carregarHistoricoNuvem();
                    if (window.FitStore.uid !== user.uid) return;
                    if (nuvemLogs && nuvemLogs.length > 0) {
                        const deleted = new Set(readJSON(safeGet('fitapp_deleted_sessions'), []));
                        safeSet('fitapp_week_log', JSON.stringify(mergeHistory(readJSON(safeGet('fitapp_week_log'), []), nuvemLogs, readJSON(safeGet('fitapp_sync_queue'), []).filter(item=>item._action!=='delete')).filter(item=>!deleted.has(item._id))));
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

                if (window.FitStore.uid === user.uid) hydrateLocalState();
            } else {
                if (window.FitStore.uid) { window.FitStore.bindUser(null); window.location.reload(); return; }
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
        ['treino', 'workouts', 'evolucao', 'conquistas', 'arena', 'biblioteca', 'perfil'].forEach(tab => {
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
        
        document.querySelectorAll('.time-btn[data-time]').forEach(btn => {
            btn.addEventListener('click', (e) => { 
                adjustRestTime(Number(e.currentTarget.dataset.time));
            }); 
        });

        for(const id of ['mainMethodSelector','profileSelector','levelSelector'])document.getElementById(id)?.addEventListener('change',()=>{
            const description=document.getElementById('modelPreferencesDescription');
            if(description)description.textContent=modelSettings(document.getElementById('mainMethodSelector').value,document.getElementById('profileSelector').value,state.els.levelSelector.value).description;
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
        
        if (window.FitStore.uid) hydrateLocalState();

        updateEnvUI();
        updateCampaignDashboard();
        syncTacticalDictionary();

        window.addEventListener('beforeunload', (e) => {
            if (state.isWorkoutActive) { e.preventDefault(); e.returnValue = ''; }
        });
    }

    function hydrateLocalState() {
        for (const [key, id] of [['profile','profileSelector'], ['level','levelSelector'], ['main_method','mainMethodSelector']]) {
            const el = document.getElementById(id); const value = safeGet('fitapp_' + key);
            if (el && value) {if(key==='main_method')selectSavedMethod(el,value,readJSON(safeGet('fitapp_campaign_data'),null));else el.value=value;}
        }
        const templates = readJSON(safeGet('fitapp_custom_workouts'), []).map(w => ({...w, id:w.id && w.id !== 'null' ? w.id : newId()}));
        safeSet('fitapp_custom_workouts', JSON.stringify(templates));
        applyTheme(); updateDynamicCards(); updateCampaignDashboard();
        renderCustomWorkouts(); renderWeeklyCalendar(); checkSequence(); renderMetricsChart();
        window.FitGamification.renderAlbum();
        const savedState = safeGet('fitapp_active_state');
        if (savedState) {
            const restored = readJSON(savedState, null);
            if (!restored || (restored.userId && restored.userId !== window.FitStore.uid)) return;
            if (state.isWorkoutActive) return;
            if (restored.currentWorkoutType === 'Cardio') {
                startCardio();
                state.sessionId = restored.sessionId || newId();
                state.workoutStartTime = restored.workoutStartTime;
                cardioElapsedSeconds = restored.cardio?.elapsed || 0;
                cardioPausedTime = cardioElapsedSeconds;
                saveWorkoutState();
                showToast('Sessão aeróbica recuperada. Retome o relógio quando quiser.');
                return;
            }
            try { state.currentRoutine = normalizeRoutine(restored.currentRoutine); }
            catch { showToast('Não foi possível restaurar a sessão salva. Seus demais dados foram preservados.'); return; }
            state.sessionId = restored.sessionId || newId();
            state.currentWorkoutType = restored.currentWorkoutType;
            state.workoutStartTime = restored.workoutStartTime;
            state.isWorkoutActive = true;
            adjustRestTime(restored.restSeconds);
            
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
            
            renderCurrentRoutine();
            showToast('Treino em andamento restaurado.');
        }

        // NOVO: Recupera a Fila de Inteligência Artificial interrompida
        const savedAIFila = safeGet('fitapp_fila_ia');
        if (aiWorkoutsEnabled() && !state.isWorkoutActive && savedAIFila && savedAIFila !== '[]') {
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
        if(retiredMethod(method)){showToast('Para criar outro plano, escolha um modelo disponível ou monte sua ficha manualmente.');return;}
        const profile = profileSelector.value;
        const level = levelSelector.value;
        
        const currentMethod = safeGet('fitapp_main_method');
        const currentLevel = safeGet('fitapp_level');
        
        if(state.isWorkoutActive){showToast('Conclua ou descarte a sessão antes de substituir o plano.');return;}
        const changed=Boolean(currentMethod&&(currentMethod!==method||currentLevel!==level||safeGet('fitapp_profile')!==profile));
        const saved=readJSON(safeGet('fitapp_campaign_data'),null);
        const replace=changed||Boolean(saved&&(saved.method!==method||saved.level!==level||saved.profile!==profile));
        const campaign = (!replace&&saved) || {
            id:newId(), method, level, profile, workouts:{}, startDate:new Date().toISOString()
        };
        try {
            campaign.workouts = executeForgePlan(method, readJSON(safeGet('fitapp_blacklist'), []),
                {environment:'academia', allEquipment:true}, campaign.workouts);
        } catch (error) { showToast(error.message); return; }
        if(replace&&!confirm('Aplicar estas preferências cria um novo plano de modelos. O plano atual será substituído; fichas pessoais e histórico serão preservados. Continuar?')){
            selectSavedMethod(methodSelector,currentMethod,saved);levelSelector.value=currentLevel;profileSelector.value=safeGet('fitapp_profile')||'hipertrofia';return;
        }
        try{commitWorkoutPlan(window.FitStore,campaign,{resetCount:replace});}
        catch(error){showToast('Não foi possível gravar o novo plano. O plano anterior foi mantido.');return;}
        
        // Aplica as mudanças no motor
        applyTheme();
        updateDynamicCards();
        updateCampaignDashboard();
        saveCampaignToCloud(); // NOVO: Envia o plano recém-criado para a nuvem
        showToast("Preferências do plano atualizadas.");
        if(state.audioEnabled) speak("Preferências atualizadas.");
        
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
        
        setGlobalEnvironment(currentEnv);
        
        let envText = currentEnv === 'academia' ? 'Academia' : (currentEnv === 'casa' ? 'Casa' : 'Praia');
        if(typeof state.audioEnabled !== 'undefined' && state.audioEnabled) speak(`Modo ${envText} ativado.`);
        showToast(`Terreno alterado para: ${envText}`);

    }

    function setGlobalEnvironment(environment){
        if(state.isWorkoutActive){showToast('Conclua ou descarte a sessão antes de mudar o ambiente.');return false;}
        if(!['academia','casa','praia','parque'].includes(environment))return false;
        if(!safeSet('fitapp_global_env',environment))return false;
        updateEnvUI();
        if(document.getElementById('workoutPreview').style.display==='block'){
            if(state.editorContext?.kind==='session')adaptCurrentEnvironment();
            renderPreviewList();
        }
        return true;
    }

    function setEnvironmentEquipment(equipment){
        if(state.isWorkoutActive){showToast('Conclua ou descarte a sessão antes de mudar os equipamentos.');return false;}
        if(environmentOptions().environment!=='academia')return false;
        const selected=equipment.filter(value=>equipmentGroups.some(([key])=>key===value));
        if(!safeSet('fitapp_equipment_academia',JSON.stringify(selected)))return false;
        updateEnvUI();
        if(document.getElementById('workoutPreview').style.display==='block'){
            if(state.editorContext?.kind==='session')adaptCurrentEnvironment();
            renderPreviewList();
        }
        return true;
    }

    function updateEnvUI() {
        let currentEnv = safeGet('fitapp_global_env') || 'academia';
        const icon = document.getElementById('envIcon');
        const text = document.getElementById('envText');
        const btn = document.getElementById('btnEnvToggle');
        if(icon && text && btn) {
            if(currentEnv === 'academia') {
                icon.textContent = '🏋️'; text.textContent = 'Academia';
                btn.style.borderColor = 'var(--accent)'; btn.style.color = 'var(--accent)'; btn.style.background = 'var(--accent-soft)';
            } else if (currentEnv === 'casa') {
                icon.textContent = '🏠'; text.textContent = 'Casa';
                btn.style.borderColor = 'var(--warning)'; btn.style.color = 'var(--warning)'; btn.style.background = 'rgba(255, 170, 0, 0.1)';
            } else {
                icon.textContent = '🌲'; text.textContent = 'Parque/Praia';
                btn.style.borderColor = 'var(--secondary)'; btn.style.color = 'var(--secondary)'; btn.style.background = 'rgba(77, 163, 255, 0.1)';
            }
        }

        window.dispatchEvent(new Event('fitapp:environmentchange'));
        // 🛡️ SINCRONIZAÇÃO DE ARSENAL: Força a Forja a respeitar o ambiente selecionado
        const equipChips = document.querySelectorAll('.forge-equip-chip');
        if (equipChips.length > 0) {
            equipChips.forEach(chip => {
                const eq = chip.getAttribute('data-equip') || '';
                const active=environmentOptions().equipment.includes(eq);
                chip.classList.toggle('active',active);chip.setAttribute('aria-pressed',String(active));
                chip.disabled=currentEnv!=='academia';
            });
        }
    }

    function updateCampaignDashboard() {
        const campaignStr = safeGet('fitapp_campaign_data');
        const bioPanel = document.getElementById('biomechanicsPanel');
        const dash = document.getElementById('campaignDashboard');
        if (state.isWorkoutActive) {
            if (dash) dash.style.display = 'none';
            if (bioPanel) bioPanel.style.display = 'none';
            return;
        }
        const banner = document.getElementById('smartBannerSetup'); // NOVO
        const history = readJSON(safeGet('fitapp_week_log'), []); // NOVO
        const onboardingDone = safeGet('fitapp_onboarding_done') === 'true'; // NOVO
        
        // 1. Puxamos a leitura da contagem para ANTES do IF
        let count = parseInt(safeGet('fitapp_campaign_count') || '0');
        
        // 2. Adicionamos a trava "&& count > 0" para evitar o bloqueio precoce
        if (campaignStr && campaignStr.trim() !== '' && count > 0) {
            if(bioPanel) bioPanel.style.display = 'block';
            if(dash) dash.style.display = 'block';
            if(banner) banner.style.display = 'none'; // Esconde banner na campanha
            
            const campData = readJSON(campaignStr, {workouts:{}});
            
            const title = document.getElementById('campaignDashTitle');
            const subtitle = document.getElementById('campaignDashSubtitle');
            const countText = document.getElementById('campaignDashCount');
            const bar = document.getElementById('campaignDashBar');
            
            if(title) title.textContent = `Plano: ${campData.method ? campData.method.toUpperCase() : 'LIVRE'}`;
            if(subtitle) subtitle.textContent = `Nível: ${campData.level || 'Padrão'}`;
            if(countText) countText.textContent = `${count}/24`;
            if(bar) bar.style.width = `${Math.min(100, (count / 24) * 100)}%`;

            // HERO CARD (Destaque Visual da Próxima Missão)
            const history = readJSON(safeGet('fitapp_week_log'), []);
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
                    card.style.border = '1px solid var(--line)';
                    card.style.opacity = '1';
                    const heroBtn = card.querySelector('.hero-btn');
                    if(heroBtn) heroBtn.remove();
                    
                    if (t === nextType) {
                        card.style.transform = 'scale(1.03)';
                        card.style.border = '2px solid var(--secondary)';
                        card.style.boxShadow = '0 0 20px var(--secondary-soft)';
                        card.innerHTML += `<div class="hero-btn" style="background: var(--secondary); color: var(--ink); text-align: center; padding: 8px; border-radius: 6px; font-weight: bold; margin-top: 10px; text-transform: uppercase; font-size: 12px; pointer-events: none;">Próximo treino</div>`;
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
                    card.style.border = '1px solid var(--line)';
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

    function adaptCurrentEnvironment() {
        const options={...environmentOptions(),level:state.els.levelSelector?.value};
        if(state.environmentProposal?.status==='accepted')state.currentRoutine=state.environmentProposal.source;
        state.environmentProposal=null;
        const adapted=adaptRoutineToEnvironment(state.currentRoutine,window.dictionaryData,options);
        state.currentRoutine=adapted.routine;
        if(adapted.missing.length)showToast('Sem alternativa disponível para: '+[...new Set(adapted.missing)].join(', ')+'. Troque ou remova os itens sinalizados.');
    }
    function reviewEnvironmentProposal(){
        if(state.isWorkoutActive||state.editorContext?.kind!=='session')return;
        const options={...environmentOptions(),level:state.els.levelSelector?.value};
        try{
            const proposal=buildEnvironmentProposal(state.currentRoutine,window.dictionaryData,options);
            if(!proposal.omitted.length){showToast('A ficha já está compatível com os recursos disponíveis.');return;}
            state.environmentProposal={status:'pending',source:JSON.parse(JSON.stringify(state.currentRoutine)),proposal,signature:proposalSignature(state.currentRoutine,options)};
            renderPreviewList();
            document.getElementById('environmentProposalReview')?.scrollIntoView({block:'start',behavior:'smooth'});
        }catch(error){showToast(error.message);}
    }
    function acceptEnvironmentProposal(){
        const review=state.environmentProposal;
        if(state.isWorkoutActive||state.editorContext?.kind!=='session'||review?.status!=='pending')return;
        const options={...environmentOptions(),level:state.els.levelSelector?.value};
        if(proposalSignature(state.currentRoutine,options)!==review.signature){state.environmentProposal=null;renderPreviewList();showToast('A ficha ou os recursos mudaram. Gere a proposta novamente.');return;}
        state.currentRoutine=JSON.parse(JSON.stringify(review.proposal.routine));
        review.status='accepted';
        renderPreviewList();
        showToast('Versão reduzida aplicada somente à sessão. Confira a cobertura antes de iniciar.');
    }
    function cancelEnvironmentProposal(){
        const review=state.environmentProposal;
        if(state.isWorkoutActive||!review)return;
        if(review.status==='accepted')state.currentRoutine=review.source;
        state.environmentProposal=null;
        renderPreviewList();
    }
    function setEnvironmentResources(resources){
        if(state.isWorkoutActive){showToast('Conclua ou descarte a sessão antes de mudar os recursos.');return;}
        const environment=environmentOptions().environment;
        if(!safeSet('fitapp_resources_'+environment,JSON.stringify(resources)))return;
        updateEnvUI();
        if(document.getElementById('workoutPreview').style.display==='block'){
            if(state.editorContext?.kind==='session')adaptCurrentEnvironment();
            renderPreviewList();
        }
    }
    return { 
        init, createManualWorkout, loadWorkout, syncOfflineWorkouts, filterLibrary, openSwapModal, confirmSwap, startWorkout, startCardio, toggleCardioTimer, updateDynamicCards,
        beginWorkoutExecution, acceptSnap, declineSnap, cancelWorkoutPreview,
        toggleGlobalEnv, updateEnvUI, adaptCurrentEnvironment, setEnvironmentResources, reviewEnvironmentProposal, acceptEnvironmentProposal, cancelEnvironmentProposal, updateCampaignDashboard, resetCampaign, lockCampaign,
        openAddExerciseModal, filterAddModal, confirmAddExercise, removeExercise, setCategoryFilter,
        renderIsolationChart, exportStravaCard,
        openHistoryModal, switchHistoryTab, deleteHistoryLog,
        saveCustomWorkout, saveAndStartWorkout, deleteCustomWorkout, setGlobalEnvironment, setEnvironmentEquipment,
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
window.FitApp.refreshCoverage = refreshCoverage;
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

