import { state } from './state.js';
import {validRestSeconds} from './model-settings.js';
import {newExerciseSet} from './domain.js';

// 🛡️ DECLARAÇÃO ÚNICA DAS VARIÁVEIS DE ESTADO DO COMBATE
let currentTimerEl = null;
let currentTimerTarget = null;
let currentTimerExercise = null;
let currentTacticalTip = "";
let rafTimerId = null;
let isRestTimerRunning = false;

let autoBIndex = null;
let autoEIndex = null;
let autoExec = 0;
let autoRest = 0;
let autoTimeout = null;
let isAutoActive = false;

// 🛡️ FUNÇÃO CENTRAL DO CRONÓMETRO (Restaurada)
export function startRestTimer(targetEl, exerciseName = "", isAdjust = false, block = null) {
    stopRestTimer();
    if(block?.restSeconds&&!isAdjust){
        state.activeRestBlockId=block.id;
        adjustRestTime(state.blockRestOverrides?.[block.id]??block.restSeconds,true);
    }
    isRestTimerRunning = true;
    currentTimerTarget = targetEl;
    currentTimerExercise = exerciseName;

    currentTimerEl = document.createElement('div');
    currentTimerEl.className = 'rest-timer-active';
    currentTimerEl.style.color = 'var(--accent)';
    currentTimerEl.style.fontWeight = 'bold';
    currentTimerEl.style.marginTop = '10px';
    currentTimerEl.style.fontSize = '18px';
    currentTimerEl.style.textAlign = 'center';
    
    // Calcula o tempo alvo baseando-se no tempo real do sistema (evita atrasos do navegador)
    const endTime = Date.now() + (state.currentRestTime * 1000) + 1000;
    let tenSecondNotice = false;
    let lastSeconds = -1;

    if (!isAdjust && state.audioEnabled) {
        window.FitApp.speak(`Descanso. Respire.`);
    }

    const updateTimer = () => {
        if (!isRestTimerRunning) return;
        const remaining = Math.max(0, endTime - Date.now());
        const secs = Math.floor(remaining / 1000);
        
        let m = Math.floor(secs / 60).toString().padStart(2, '0');
        let s = (secs % 60).toString().padStart(2, '0');
        if (secs !== lastSeconds) {
            currentTimerEl.textContent = `⏱️ Descanso: ${m}:${s}`;
            currentTimerEl.style.setProperty('--rest-progress', Math.min(1,secs/state.currentRestTime));
            lastSeconds = secs;
        }
        
        if (secs <= 10 && !tenSecondNotice && !isAdjust && state.audioEnabled) {
            tenSecondNotice = true;
            window.FitApp.speak("Dez segundos. Prepare-se.");
        }

        if (secs > 0) {
            rafTimerId = requestAnimationFrame(updateTimer);
        } else {
            stopRestTimer();
            if (state.audioEnabled) {
                window.FitApp.speak("Ação.");
            }
        }
    };

    targetEl.appendChild(currentTimerEl);
    rafTimerId = requestAnimationFrame(updateTimer);
}

export function adjustRestTime(newTime,fromBlock=false) {
    state.currentRestTime = validRestSeconds(newTime);
    if(!fromBlock&&state.isWorkoutActive&&state.activeRestBlockId){
        state.blockRestOverrides={...state.blockRestOverrides,[state.activeRestBlockId]:state.currentRestTime};
    }
    const display=document.getElementById('timerDisplay');
    if(display)display.textContent=String(Math.floor(state.currentRestTime/60)).padStart(2,'0')+':'+String(state.currentRestTime%60).padStart(2,'0');
    document.querySelectorAll('.time-btn[data-time]').forEach(button=>{
        const active=Number(button.dataset.time)===state.currentRestTime;
        button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
    });
    if(isRestTimerRunning&&currentTimerTarget) {
        // O 'true' avisa ao motor que é apenas um ajuste, para ele não repetir o áudio
        startRestTimer(currentTimerTarget, currentTimerExercise, true); 
    }
    if(state.isWorkoutActive)window.FitApp?.saveWorkoutState?.();
}

export function stopRestTimer() { 
    isRestTimerRunning = false;
    if (rafTimerId) cancelAnimationFrame(rafTimerId);
    
    if (currentTimerEl && currentTimerEl.parentNode) {
        currentTimerEl.parentNode.removeChild(currentTimerEl);
    }
}

export function changeSets(bIndex, eIndex, delta) {
    const ex = state.currentRoutine[bIndex].exercises[eIndex];
    const block=state.currentRoutine[bIndex];
    if(block.modelVersion){
        const step=ex.sideMode==='alternating'?delta*2:delta;
        const members=block.type==='superset'?block.exercises:[ex];
        if(members.some(item=>item.sets+step<(item.sideMode?2:1)||item.sets+step>10))return;
        if(step<0&&members.some(item=>item.setsData?.slice(item.sets+step).some(set=>set.checked))){window.FitApp.showToast('Preserve as séries já registradas. Só podem ser removidas séries ainda não realizadas.');return;}
        const previous=structuredClone(block.exercises);
        for(const member of members){member.sets+=step;member.setsData=Array.from({length:member.sets},(_,i)=>member.setsData?.[i]||newExerciseSet(member));}
        if(!window.FitApp.saveWorkoutState()){block.exercises=previous;return;}
        window.FitApp.renderCurrentRoutine();return;
    }
    if(ex.sideMode==='alternating')delta*=2;
    
    if (delta > 0 && ex.sets < 10) {
        ex.sets+=delta;
        if(!ex.setsData) ex.setsData = [];
        for(let i=0;i<delta;i++)ex.setsData.push({ kg: '', reps: '', checked: false,measurementType:ex.measurementType||'reps' });
    } else if (delta < 0 && ex.sets > 1) {
        ex.sets+=delta;
        const removed=ex.setsData.splice(ex.sets);
        const removedSet=removed.find(set=>set.checked);
        // Desfaz a contabilidade se a série removida já estava marcada como concluída
        if (removedSet && removedSet.checked) {
            state.checkedSets-=removed.filter(set=>set.checked).length;
            state.todayLog = state.todayLog.filter(log => !(log.exercise === ex.name && log.set === (ex.sets + 1)));
        }
    }
    
    window.FitApp.saveWorkoutState();
    window.FitApp.renderCurrentRoutine(); // ERRO CORRIGIDO (renderstate -> renderCurrentRoutine)
    if(state.audioEnabled && delta > 0) window.FitApp.speak("Série adicionada.");
}

export function cloneFirstSet(bIndex, eIndex) {
    const ex = state.currentRoutine[bIndex].exercises[eIndex];
    if (!ex.setsData || ex.setsData.length === 0) return;
    
    const baseKg = ex.setsData[0].kg;
    const baseReps = ex.setsData[0].reps;
    
    for (let i = 1; i < ex.sets; i++) {
        if (!ex.setsData[i]) ex.setsData[i] = { kg: '', reps: '', checked: false };
        if (!ex.setsData[i].checked) { // Só substitui as séries que não foram concluídas
            ex.setsData[i].kg = baseKg;
            ex.setsData[i].reps = baseReps;
            ex.setsData[i].measurementType = ex.setsData[0].measurementType || 'reps';
            ex.setsData[i].durationSecs = ex.setsData[0].durationSecs || '';
        }
    }
    window.FitApp.saveWorkoutState();
    window.FitApp.renderCurrentRoutine(); 
    window.FitApp.showToast("Cargas da S1 replicadas.");
    if(state.audioEnabled) window.FitApp.speak("Cargas replicadas.");
}

export function updateGlobalTimer() {
    if (!state.workoutStartTime) return;
    const now = Date.now();
    const diffInSeconds = Math.floor((now - state.workoutStartTime) / 1000);
    const h = Math.floor(diffInSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((diffInSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (diffInSeconds % 60).toString().padStart(2, '0');
    const display = document.getElementById('globalTimerDisplay');
    if (display) display.textContent = `${h}:${m}:${s}`;
}

export function startCooldownTimer() {
    const btn = document.getElementById('btnStartCooldown');
    btn.style.display = 'none'; // Esconde o botão para não dar cliques duplos
    
    const deadline = Date.now() + 90000;
    const display = document.getElementById('cooldownTimerDisplay');
    if(state.audioEnabled) window.FitApp.speak("Protocolo de recuperação iniciado. Respire.");
    
    state.cooldownTimerInterval = setInterval(() => {
        const timeLeft = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        let m = Math.floor(timeLeft/60).toString().padStart(2,'0');
        let s = (timeLeft%60).toString().padStart(2,'0');
        display.textContent = `${m}:${s}`;
        
        if (timeLeft <= 0) {
            clearInterval(state.cooldownTimerInterval);
            window.FitApp.showToast('Temporizador concluído.');
            if(state.audioEnabled) window.FitApp.speak("Recuperação finalizada. Excelente combate.");
            window.FitApp.finalizeSession(false, false);
        }
    }, 1000);
}

export function skipCooldown() {
    if(state.cooldownTimerInterval) clearInterval(state.cooldownTimerInterval);
    window.FitApp.finalizeSession(false, false);
}

export function toggleAutoPilot(bIndex, eIndex) {
    if (isAutoActive && autoBIndex === bIndex && autoEIndex === eIndex) {
        stopAutoPilot();
    } else {
        if (isAutoActive) stopAutoPilot(); // Aborta se estiver rodando noutro exercício
        autoBIndex = bIndex;
        autoEIndex = eIndex;
        document.getElementById('autoPilotModal').style.display = 'flex';
    }
}

export function startAutoPilot() {
    autoExec = parseInt(document.getElementById('autoExecTime').value) || 40;
    autoRest = parseInt(document.getElementById('autoRestTime').value) || 45;
    
    document.getElementById('autoPilotModal').style.display = 'none';
    isAutoActive = true;
    
    const btn = document.getElementById(`btnAuto_${autoBIndex}_${autoEIndex}`);
    if (btn) {
        btn.innerHTML = '🛑 Parar';
        btn.style.color = 'var(--danger)';
        btn.style.borderColor = 'var(--danger)';
        btn.style.background = 'rgba(255, 68, 68, 0.1)';
    }
    
    if(state.audioEnabled) window.FitApp.speak("Protocolo hands-free ativado. Prepare-se.");
    window.FitApp.showToast("Modo Auto iniciado. Guarde o dispositivo.");
    
    // Timer de respiro de 3 segundos antes do combate iniciar
    autoTimeout = setTimeout(() => { executeAutoPhase(); }, 3000);
}

export function executeAutoPhase() {
    if (!isAutoActive) return;
    
    const ex = state.currentRoutine[autoBIndex].exercises[autoEIndex];
    
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
        if(state.audioEnabled) window.FitApp.speak("Ciclo de séries concluído com sucesso.");
        window.FitApp.showToast("Automação finalizada. Alvo abatido.");
        return;
    }

    if(state.audioEnabled) window.FitApp.speak("Ação.");
    window.FitApp.showToast(`Série ${nextSet} em andamento...`);
    
    const btn = document.getElementById(`btnAuto_${autoBIndex}_${autoEIndex}`);
    let timeLeft = autoExec;
    if (btn) btn.innerHTML = `🛑 Ação: ${timeLeft}s`;
    
    // TELEMETRIA: Relógio regressivo visual para a fase de Ação
    autoTimeout = setInterval(() => {
        if (!isAutoActive) {
            clearInterval(autoTimeout);
            return;
        }

        timeLeft--;
        if (btn) btn.innerHTML = `🛑 Ação: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(autoTimeout); // Para o relógio de ação
            if (btn) btn.innerHTML = `🛑 Descanso...`;

            // O tempo sozinho não comprova execução. Solicita confirmação da série.
            const chk = document.getElementById(`chk_set_${autoBIndex}_${autoEIndex}_${nextSet}`);
            if (chk && !chk.checked) {
                adjustRestTime(autoRest); // Seta o cronómetro para o tempo definido no Piloto
                stopAutoPilot();
                window.FitApp.showToast('Tempo encerrado. Confirme a série realizada para registrá-la.');
                chk.focus();
                return;
            }
            
            // Aguarda o término do descanso (+2s de margem de segurança para o áudio respirar)
            autoTimeout = setTimeout(() => {
                executeAutoPhase(); // Chama o loop novamente para a próxima série
            }, (autoRest + 2) * 1000);
        }
    }, 1000);
}

export function stopAutoPilot() {
    const wasActive = isAutoActive;
    isAutoActive = false;
    clearInterval(autoTimeout); 
    const btn = document.getElementById(`btnAuto_${autoBIndex}_${autoEIndex}`);
    if (btn) {
        btn.innerHTML = '🤖 Auto';
        btn.style.color = 'var(--accent)';
        btn.style.borderColor = 'var(--accent)';
        btn.style.background = 'var(--accent-soft)';
    }
    if (wasActive) window.FitApp.showToast("Piloto Automático desativado.");
}
