'use strict';

// 1. BANCO DE DADOS COMPLETO (Iniciante, Intermediário, Avançado)
const dbWorkouts = {
    iniciante: {
        'A': [
            { title: "Bloco 1 (Peito)", exercises: [{ name: "Supino Máquina", sets: 4, target: "12-15 rep" }, { name: "Voador (Peck Deck)", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 2 (Tríceps)", exercises: [{ name: "Tríceps Pulley", sets: 4, target: "12-15 rep" }, { name: "Tríceps Corda", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Máquina", sets: 3, target: "15-20 rep" }] }
        ],
        'B': [
            { title: "Bloco 1 (Costas)", exercises: [{ name: "Puxada Alta Máquina", sets: 4, target: "12-15 rep" }, { name: "Remada Máquina", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 2 (Bíceps)", exercises: [{ name: "Rosca Máquina", sets: 4, target: "12-15 rep" }, { name: "Rosca Martelo Halteres", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Supra Solo", sets: 3, target: "15-20 rep" }] }
        ],
        'C': [
            { title: "Bloco 1 (Pernas)", exercises: [{ name: "Leg Press Máquina", sets: 4, target: "12-15 rep" }, { name: "Cadeira Extensora", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 2 (Ombros)", exercises: [{ name: "Desenvolvimento Máquina", sets: 4, target: "12-15 rep" }, { name: "Elevação Lateral Halteres", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Prancha Isométrica", sets: 3, target: "30 seg" }] }
        ]
    },
    intermediario: {
        'A': [
            { title: "Bloco 1 (Peito)", exercises: [{ name: "Supino Reto Barra", sets: 4, target: "8-12 rep" }, { name: "Supino Inclinado Halteres", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 2 (Tríceps)", exercises: [{ name: "Peck Deck na Polia", sets: 4, target: "12-15 rep" }, { name: "Tríceps Testa", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Supra", sets: 3, target: "15-20 rep" }, { name: "Prancha Isométrica", sets: 3, target: "45 seg" }] }
        ],
        'B': [
            { title: "Bloco 1 (Costas)", exercises: [{ name: "Puxada Alta (Livre)", sets: 4, target: "8-12 rep" }, { name: "Remada Baixa Triângulo", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 2 (Bíceps)", exercises: [{ name: "Rosca Direta (Barra W)", sets: 4, target: "10-12 rep" }, { name: "Rosca Scott", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Infra", sets: 3, target: "15-20 rep" }] }
        ],
        'C': [
            { title: "Bloco 1 (Pernas)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }, { name: "Leg Press 45°", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 2 (Ombros)", exercises: [{ name: "Variação Mesa Flexora", sets: 4, target: "12-15 rep" }, { name: "Desenvolvimento Halteres", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Oblíquo", sets: 3, target: "15 rep/lado" }] }
        ]
    },
    avancado: {
        'A': [
            { title: "Bloco 1 (Peito Pesado)", exercises: [{ name: "Supino Reto Halteres", sets: 4, target: "6-10 rep" }, { name: "Crossover Polia Baixa", sets: 4, target: "10-15 rep" }] },
            { title: "Bloco 2 (Tríceps Força)", exercises: [{ name: "Mergulho Paralelas", sets: 4, target: "Até Falha" }, { name: "Tríceps Francês Halter", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Canivete", sets: 3, target: "15-20 rep" }] }
        ],
        'B': [
            { title: "Bloco 1 (Costas Densidade)", exercises: [{ name: "Barra Fixa", sets: 4, target: "Até Falha" }, { name: "Remada Curvada Livre", sets: 4, target: "8-10 rep" }] },
            { title: "Bloco 2 (Bíceps Pico)", exercises: [{ name: "Rosca Alternada Inclinada", sets: 4, target: "10-12 rep" }, { name: "Rosca Concentrada", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Elevação Pernas Pendurado", sets: 3, target: "12-15 rep" }] }
        ],
        'C': [
            { title: "Bloco 1 (Pernas Base)", exercises: [{ name: "Agachamento Livre", sets: 5, target: "5-8 rep" }, { name: "Stiff (Terra Romeno)", sets: 4, target: "8-12 rep" }] },
            { title: "Bloco 2 (Ombros 3D)", exercises: [{ name: "Desenvolvimento Militar", sets: 4, target: "8-10 rep" }, { name: "Crucifixo Invertido Livre", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core)", exercises: [{ name: "Roda Abdominal", sets: 3, target: "10-15 rep" }] }
        ]
    }
};

// 2. DICIONÁRIO DE EXERCÍCIOS PARA A BIBLIOTECA E DEEP LINKING
const dictionaryData = [
    { name: "Abdominal Máquina", focus: "Core", desc: "Ajuste o peso, segure as alças e contraia o abdômen puxando o tronco para baixo." },
    { name: "Agachamento Livre", focus: "Pernas Completo", desc: "Mantenha a coluna reta, desça o quadril quebrando a paralela dos joelhos." },
    { name: "Agachamento no Smith", focus: "Pernas Guiado", desc: "Use a barra guiada para estabilidade. Posicione os pés ligeiramente à frente do corpo." },
    { name: "Barra Fixa", focus: "Costas Largura", desc: "Pendurado, puxe o corpo até o queixo passar a barra. Use pegada pronada." },
    { name: "Cadeira Extensora", focus: "Quadríceps", desc: "Estenda as pernas segurando o pico de contração por 1 segundo no topo." },
    { name: "Crossover Polia Baixa", focus: "Peitoral Superior", desc: "Puxe os cabos de baixo para cima, unindo as mãos na altura dos olhos." },
    { name: "Desenvolvimento Máquina", focus: "Ombros", desc: "Empurre as alavancas para cima. Ideal para iniciantes desenvolverem força base." },
    { name: "Leg Press Máquina", focus: "Pernas Seguro", desc: "Empurre a plataforma na máquina. Ótimo para iniciantes sem risco de queda." },
    { name: "Mergulho Paralelas", focus: "Tríceps / Peito Inferior", desc: "Desça o corpo dobrando os cotovelos a 90° e empurre de volta." },
    { name: "Peck Deck na Polia", focus: "Peitoral Isolado", desc: "Feche os braços à frente usando as polias para manter a tensão contínua." },
    { name: "Remada Curvada Livre", focus: "Costas Densidade", desc: "Inclinado, puxe a barra livre em direção ao umbigo mantendo a lombar travada." },
    { name: "Supino Máquina", focus: "Peitoral Base Iniciante", desc: "Empurre as alavancas da máquina para frente. Foca na contração pura do peitoral." },
    { name: "Supino Reto Barra", focus: "Peitoral Base", desc: "Deitado, desça a barra até o peito e empurre para cima com força." },
    { name: "Variação Mesa Flexora", focus: "Posterior Coxa", desc: "Puxe o rolo em direção ao glúteo. Não deixe o quadril descolar do estofado." }
];

// 3. BASE DE FIGURINHAS
const stickersDB = [
    { id: 1, name: "Garrafinha Mágica", icon: "💧", rarity: "comum" }, { id: 2, name: "Fone Descarregado", icon: "🔋", rarity: "comum" }, { id: 3, name: "Canela Roxa", icon: "🩹", rarity: "comum" },
    { id: 4, name: "Halter de 20kg", icon: "🏋️", rarity: "prata" }, { id: 5, name: "Scoop Transbordando", icon: "🥄", rarity: "prata" }, { id: 6, name: "Frango com Batata", icon: "🍗", rarity: "prata" },
    { id: 7, name: "Mestre do Supino", icon: "👑", rarity: "brilhante" }, { id: 8, name: "Monstro do Leg", icon: "🦍", rarity: "brilhante" }, { id: 9, name: "Taça Constância", icon: "🏆", rarity: "brilhante" }
];

const FitApp = (() => {
    let totalSets = 0, checkedSets = 0, audioEnabled = false, restTimer = null, currentRestTime = 60;
    let todayLog = [];
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

    function loadWorkout() {
        const level = els.levelSelector.value || 'intermediario', type = els.workoutSelector.value;
        els.workoutArea.style.display = type ? 'block' : 'none'; els.btnFinishArea.style.display = type ? 'block' : 'none';
        if (!type) { stopRestTimer(); return; }

        els.exerciseList.innerHTML = ''; totalSets = 0; checkedSets = 0; todayLog = [];
        let rotina = dbWorkouts[level][type] || dbWorkouts['intermediario']['A'];

        rotina.forEach(bloco => {
            const card = document.createElement('div'); card.className = 'biset-card'; card.innerHTML = `<div class="biset-title">${bloco.title}</div>`;
            bloco.exercises.forEach((ex) => {
                const blockDiv = document.createElement('div'); blockDiv.className = 'exercise-block';
                blockDiv.innerHTML = `<div class="exercise-header" onclick="FitApp.openDict('${ex.name}')"><span class="ex-name">${ex.name} 🔗</span><span class="target-reps">${ex.target}</span></div>`;
                
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
        const tipoTreino = els.workoutSelector.value; 
        
        // Formata a data no padrão YYYY-MM-DD
        const dataHoje = new Date().toISOString().split('T')[0];

        // 1. Monta o pacote JSON exatamente como testamos no Swagger
        const payload = {
            date: dataHoje,
            tipo: tipoTreino,
            data: todayLog
        };

        // 2. Dispara o pacote de dados para o servidor Python
        try {
            document.getElementById('btnFinishAction').textContent = "⏳ Salvando...";
            const response = await fetch('/api/salvar-treino', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log("Sucesso: Treino salvo no banco de dados.");
            } else {
                console.error("Erro ao salvar no servidor Python.");
            }
        } catch (error) {
            console.error('Falha de conexão:', error);
            showToast("Modo offline: Servidor não encontrado.");
        }

        // 3. Mantém uma cópia local (Cache) para renderizar os gráficos/IA rápido
        let weekLog = JSON.parse(safeGet('fitapp_week_log') || '[]');
        weekLog.push(payload);
        safeSet('fitapp_week_log', JSON.stringify(weekLog));

        // 4. Limpa a tela e libera a recompensa
        els.workoutSelector.value = ''; 
        els.workoutArea.style.display = 'none'; 
        els.btnFinishArea.style.display = 'none';
        
        if(isComplete) { 
            showPackModal(); 
        } else { 
            showToast('Treino salvo no sistema.'); 
            switchTab('tab-calendario', 'nav-calendario'); 
        }
    }

    async function fetchAIFeedback() {
        document.getElementById('aiLoader').style.display = 'block';
        document.getElementById('aiResponse').style.display = 'none';
        document.getElementById('btnAnalyzeAI').disabled = true;

        try {
            // Agora o aplicativo chama a SUA própria API no Python
            const response = await fetch('/api/coach');
            if (!response.ok) throw new Error("Erro no servidor local");
            
            const data = await response.json();
            
            document.getElementById('aiResponse').innerHTML = `<strong>Feedback do Coach:</strong><br>${data.feedback}`;
            document.getElementById('aiResponse').style.display = 'block';
            if(audioEnabled) speak("Análise concluída.");

        } catch (error) {
            showToast("Erro ao contatar o servidor.");
        } finally {
            document.getElementById('aiLoader').style.display = 'none';
            document.getElementById('btnAnalyzeAI').disabled = false;
        }
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

    function switchTab(tabId, navId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        document.getElementById(tabId).classList.add('active'); document.getElementById(navId).classList.add('active');
        if (tabId === 'tab-calendario') renderAlbum();
    }

    function init() {
        els.levelSelector = document.getElementById('levelSelector'); els.workoutSelector = document.getElementById('workoutSelector');
        els.workoutArea = document.getElementById('workoutArea'); els.exerciseList = document.getElementById('exerciseList');
        els.progressBar = document.getElementById('progressBar'); els.btnFinishArea = document.getElementById('btnFinishArea');
        els.toast = document.getElementById('toast');

        const savedKey = safeGet('fitapp_gemini_key'); 
        if(savedKey && document.getElementById('apiKeyInput')) document.getElementById('apiKeyInput').value = savedKey;

        ['treino', 'calendario', 'biblioteca'].forEach(tab => { 
            const navBtn = document.getElementById(`nav-${tab}`);
            if (navBtn) navBtn.addEventListener('click', () => switchTab(`tab-${tab}`, `nav-${tab}`)); 
        });
        
        if (els.levelSelector) els.levelSelector.addEventListener('change', loadWorkout); 
        if (els.workoutSelector) els.workoutSelector.addEventListener('change', loadWorkout);
        
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
        
        renderAlbum();
    }
    
    return { 
        init, 
        openDict: (name) => { 
            // Prepara para Fase 2 quando implementarmos a aba biblioteca.html
            switchTab('tab-biblioteca', 'nav-biblioteca'); 
            const searchInp = document.getElementById('searchInput');
            if (searchInp) searchInp.value = name; 
        } 
    };
})();

document.addEventListener('DOMContentLoaded', FitApp.init);