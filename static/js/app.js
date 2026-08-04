'use strict';

// 1. BANCO DE DADOS COMPLETO (Reestruturado para execução em Bi-sets)
const dbWorkouts = {
    iniciante: {
        'A': [
            { title: "Bloco 1 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Máquina", sets: 4, target: "12-15 rep" }, { name: "Tríceps Pulley", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 2 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Voador (Peck Deck)", sets: 4, target: "12-15 rep" }, { name: "Tríceps Corda", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Abdominal Máquina", sets: 3, target: "15-20 rep" }] }
        ],
        'B': [
            { title: "Bloco 1 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Alta Máquina", sets: 4, target: "12-15 rep" }, { name: "Rosca Máquina", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 2 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Máquina", sets: 4, target: "12-15 rep" }, { name: "Rosca Martelo Halteres", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Abdominal Supra Solo", sets: 3, target: "15-20 rep" }] }
        ],
        'C': [
            { title: "Bloco 1 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Leg Press Máquina", sets: 4, target: "12-15 rep" }, { name: "Desenvolvimento Máquina", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 2 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "12-15 rep" }, { name: "Elevação Lateral Halteres", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Prancha Isométrica", sets: 3, target: "30 seg" }] }
        ]
    },
    intermediario: {
        'A': [
            { title: "Bloco 1 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Reto Barra", sets: 4, target: "8-12 rep" }, { name: "Peck Deck na Polia", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 2 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Inclinado Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Testa", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Abdominal Supra", sets: 3, target: "15-20 rep" }, { name: "Prancha Isométrica", sets: 3, target: "45 seg" }] }
        ],
        'B': [
            { title: "Bloco 1 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Alta (Livre)", sets: 4, target: "8-12 rep" }, { name: "Rosca Direta (Barra W)", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 2 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Baixa Triângulo", sets: 4, target: "10-12 rep" }, { name: "Rosca Scott", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Abdominal Infra", sets: 3, target: "15-20 rep" }] }
        ],
        'C': [
            { title: "Bloco 1 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }, { name: "Variação Mesa Flexora", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 2 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Leg Press 45°", sets: 4, target: "10-12 rep" }, { name: "Desenvolvimento Halteres", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Abdominal Oblíquo", sets: 3, target: "15 rep/lado" }] }
        ]
    },
    avancado: {
        'A': [
            { title: "Bloco 1 (Bi-set: Peito + Tríceps Pesado)", exercises: [{ name: "Supino Reto Halteres", sets: 4, target: "6-10 rep" }, { name: "Mergulho Paralelas", sets: 4, target: "Até Falha" }] },
            { title: "Bloco 2 (Bi-set: Peito + Tríceps Foco)", exercises: [{ name: "Crossover Polia Baixa", sets: 4, target: "10-15 rep" }, { name: "Tríceps Francês Halter", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Abdominal Canivete", sets: 3, target: "15-20 rep" }] }
        ],
        'B': [
            { title: "Bloco 1 (Bi-set: Costas + Bíceps Densidade)", exercises: [{ name: "Barra Fixa", sets: 4, target: "Até Falha" }, { name: "Rosca Alternada Inclinada", sets: 4, target: "10-12 rep" }] },
            { title: "Bloco 2 (Bi-set: Costas + Bíceps Pico)", exercises: [{ name: "Remada Curvada Livre", sets: 4, target: "8-10 rep" }, { name: "Rosca Concentrada", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Elevação Pernas Pendurado", sets: 3, target: "12-15 rep" }] }
        ],
        'C': [
            { title: "Bloco 1 (Bi-set: Pernas + Ombros Base)", exercises: [{ name: "Agachamento Livre", sets: 5, target: "5-8 rep" }, { name: "Desenvolvimento Militar", sets: 4, target: "8-10 rep" }] },
            { title: "Bloco 2 (Bi-set: Pernas + Ombros Isolado)", exercises: [{ name: "Stiff (Terra Romeno)", sets: 4, target: "8-12 rep" }, { name: "Crucifixo Invertido Livre", sets: 4, target: "12-15 rep" }] },
            { title: "Bloco 3 (Core Isolado)", exercises: [{ name: "Roda Abdominal", sets: 3, target: "10-15 rep" }] }
        ]
    }
};

// 2. DICIONÁRIO DE EXERCÍCIOS PARA A BIBLIOTECA E DEEP LINKING
const dictionaryData = [
    // CORE
    { name: "Abdominal Canivete", focus: "Core Avançado", desc: "Deitado esticado. Eleve simultaneamente o tronco e as pernas estendidas, tentando tocar as mãos nas pontas dos pés." },
    { name: "Abdominal Infra", focus: "Core Inferior", desc: "Deitado de costas, pernas estendidas. Eleve as pernas e o quadril do chão simultaneamente em direção ao teto." },
    { name: "Abdominal Máquina", focus: "Core Base", desc: "Sentado no aparelho, utilize a sobrecarga para flexionar o tronco à frente." },
    { name: "Abdominal Oblíquo", focus: "Core Lateral", desc: "Deitado, cruze uma perna sobre a outra. Leve o cotovelo em direção ao joelho oposto, focando na lateral do abdômen." },
    { name: "Abdominal Supra", focus: "Core Superior", desc: "Mesmo movimento do supra solo, mas segurando uma anilha no peito ou atrás da cabeça para aumentar a resistência." },
    { name: "Abdominal Supra Solo", focus: "Core Superior", desc: "Deitado, joelhos dobrados, pés no chão. Tire apenas os ombros e a parte superior das costas do chão, contraindo o abdômen." },
    { name: "Elevação Pernas Pendurado", focus: "Core Inferior Avançado", desc: "Pendurado na barra fixa, eleve as pernas retas até formarem um ângulo de 90 graus (ou até tocarem a barra), sem balançar o corpo." },
    { name: "Prancha Isométrica", focus: "Core Estabilização", desc: "Apoiado nos antebraços e pontas dos pés. Mantenha o corpo formando uma linha reta rígida, contraindo glúteos e abdômen." },
    { name: "Roda Abdominal", focus: "Core Avançado", desc: "Ajoelhado, segure a roda. Deslize para frente controlando a descida até o corpo ficar quase paralelo ao chão e puxe de volta usando a força do abdômen, não dos braços." },
    
    // PERNAS
    { name: "Agachamento Livre", focus: "Pernas Completo", desc: "Barra apoiada nos trapézios (não no pescoço). Peito estufado. Agache jogando o quadril para trás e para baixo, passando da linha de 90 graus, mantendo os joelhos alinhados com as pontas dos pés." },
    { name: "Agachamento no Smith", focus: "Pernas Guiado", desc: "Pés levemente à frente da barra. Agache empurrando o quadril para baixo, mantendo as costas retas guiadas pelo trilho da máquina." },
    { name: "Cadeira Extensora", focus: "Quadríceps", desc: "Sentado, ajuste o rolo acima do tornozelo. Estenda as pernas até contrair totalmente os quadríceps e retorne segurando a descida." },
    { name: "Leg Press 45°", focus: "Pernas Completo", desc: "No aparelho inclinado, destrave o peso e desça a plataforma em direção ao peito o máximo que conseguir sem que a lombar descole do encosto. Empurre com a força concentrada nos calcanhares." },
    { name: "Leg Press Máquina", focus: "Pernas Seguro", desc: "Sentado na máquina horizontal, posicione os pés na plataforma (largura dos ombros). Empurre até quase estender os joelhos e retorne sem deixar as placas baterem." },
    { name: "Stiff (Terra Romeno)", focus: "Posterior e Glúteo", desc: "Em pé com barra ou halteres. Joelhos destravados (não dobre). Empurre o quadril para trás o máximo possível, descendo o peso rente às pernas, mantendo a coluna perfeitamente reta. Retorne contraindo os glúteos." },
    { name: "Variação Mesa Flexora", focus: "Posterior Coxa", desc: "Deitado de bruços, ajuste o rolo acima do calcanhar. Flexione os joelhos trazendo o peso em direção aos glúteos, mantendo o quadril colado no banco." },
    
    // OMBROS
    { name: "Crucifixo Invertido Livre", focus: "Deltóide Posterior", desc: "Tronco inclinado para frente (como na remada curvada). Eleve os halteres lateralmente focando em contrair a parte de trás dos ombros (deltoide posterior)." },
    { name: "Desenvolvimento Halteres", focus: "Ombros Base", desc: "Sentado em banco de encosto reto. Segure os halteres na altura das orelhas e empurre para cima até se encontrarem sobre a cabeça." },
    { name: "Desenvolvimento Militar", focus: "Ombros Força", desc: "Em pé, com barra livre. Tire a barra da altura dos ombros e empurre para cima sobre a cabeça. Exige altíssima estabilização do abdômen e lombar." },
    { name: "Desenvolvimento Máquina", focus: "Ombros Seguro", desc: "Sentado, empurre as alavancas para cima acima da cabeça. Mantenha a coluna totalmente apoiada no encosto." },
    { name: "Elevação Lateral Halteres", focus: "Deltóide Lateral", desc: "Em pé, joelhos destravados. Eleve os braços lateralmente até a altura dos ombros, conduzindo o movimento pelos cotovelos (como se estivesse derramando água de duas jarras)." },
    
    // COSTAS
    { name: "Barra Fixa", focus: "Costas Largura", desc: "Pendurado na barra, puxe o corpo para cima até o queixo passar da barra. Exige força extrema das dorsais e core." },
    { name: "Puxada Alta (Livre)", focus: "Costas Largura", desc: "Segure a barra longa, sente-se travando os joelhos. Incline o tronco levemente para trás e puxe a barra em direção à parte superior do peito, deprimindo os ombros." },
    { name: "Puxada Alta Máquina", focus: "Costas Seguro", desc: "Sentado no aparelho articulado, puxe as alavancas em direção ao peito, estufando o tórax e apontando os cotovelos para o chão." },
    { name: "Remada Baixa Triângulo", focus: "Costas Miolo", desc: "Sentado no chão da polia, joelhos levemente flexionados. Mantenha a coluna reta e puxe o triângulo em direção ao umbigo, contraindo as costas." },
    { name: "Remada Curvada Livre", focus: "Costas Densidade", desc: "Em pé, segurando uma barra. Incline o tronco à frente (quase paralelo ao chão) empurrando o quadril para trás. Puxe a barra em direção ao umbigo mantendo a coluna neutra." },
    { name: "Remada Máquina", focus: "Costas Base", desc: "Sentado, apoie o peito no encosto. Puxe as alavancas para trás 'espremendo' o meio das costas (escápulas) antes de puxar com os braços." },
    
    // BÍCEPS
    { name: "Rosca Alternada Inclinada", focus: "Bíceps Alongado", desc: "Deitado em um banco inclinado (45 graus), deixe os braços pendurados. Faça a rosca alternando os lados. O alongamento inicial aumenta o recrutamento muscular." },
    { name: "Rosca Concentrada", focus: "Bíceps Pico", desc: "Sentado, pernas afastadas. Apoie o tríceps na parte interna da coxa e faça a flexão de braço segurando um halter, focando totalmente no pico de contração do bíceps." },
    { name: "Rosca Direta (Barra W)", focus: "Bíceps Base", desc: "Em pé, segure a barra. Mantenha os cotovelos fixos ao lado do corpo e flexione os braços. Evite usar a lombar para dar 'impulso'." },
    { name: "Rosca Martelo Halteres", focus: "Bíceps e Antebraço", desc: "Em pé, segure os halteres com as palmas voltadas uma para a outra (pegada neutra). Suba o peso mantendo essa posição. Excelente para o músculo braquial e antebraços." },
    { name: "Rosca Máquina", focus: "Bíceps Seguro", desc: "Sentado, apoie bem os tríceps no estofado. Flexione os braços puxando o peso em direção aos ombros." },
    { name: "Rosca Scott", focus: "Bíceps Isolado", desc: "Com barra W ou halteres, apoie os braços no banco inclinado. Desça o peso até quase estender os braços e suba contraindo os bíceps, sem relaxar no topo." },
    
    // PEITO
    { name: "Crossover Polia Baixa", focus: "Peitoral Superior", desc: "Polias no chão. Em pé, com tronco reto, eleve os cabos para cima e para frente, unindo as mãos na altura do rosto. Foca intensamente na parte superior do peito." },
    { name: "Peck Deck na Polia", focus: "Peitoral Isolado", desc: "Em pé entre duas polias na altura do peito. Puxe os cabos à frente do corpo com os cotovelos destravados, como se fosse abraçar uma árvore grossa." },
    { name: "Supino Inclinado Halteres", focus: "Peitoral Superior", desc: "Banco inclinado entre 30 e 45 graus. O movimento é idêntico ao reto, mas o foco é empurrar o peso na linha da clavícula (parte superior do peito)." },
    { name: "Supino Máquina", focus: "Peitoral Seguro", desc: "Ajuste o banco para que as alças fiquem na linha do meio do peito. Mantenha as escápulas 'espremidas' para trás. Empurre o peso estendendo os braços e retorne controladamente sem deixar as placas baterem." },
    { name: "Supino Reto Barra", focus: "Peitoral Força", desc: "Deitado, firme os pés no chão, contraia os glúteos e retraia as escápulas. Desça a barra controladamente até encostar levemente no peito e empurre com explosão." },
    { name: "Supino Reto Halteres", focus: "Peitoral Base", desc: "Deitado no banco, desça os halteres na lateral do peito formando um ângulo de 45 a 60 graus entre o braço e o tronco (evite os braços totalmente abertos em formato de 'T' para proteger os ombros). Empurre para cima até os halteres se aproximarem." },
    { name: "Voador (Peck Deck)", focus: "Peitoral Isolado", desc: "Sente-se com os cotovelos levemente flexionados e alinhados aos shoulders. Feche os braços na frente do peito focando em 'esmagar' o peitoral. Retorne devagar até sentir um leve alongamento." },
    
    // TRÍCEPS
    { name: "Mergulho Paralelas", focus: "Tríceps Força", desc: "Apoie-se nas barras paralelas. Incline o tronco levemente para frente e desça até os cotovelos formarem um ângulo de 90 graus. Empurre o corpo de volta à posição inicial." },
    { name: "Tríceps Corda", focus: "Tríceps Porção Lateral", desc: "Mesma base do pulley, mas no final do movimento (embaixo), puxe as pontas da corda para fora. Isso ativa a cabeça lateral do tríceps com mais ênfase." },
    { name: "Tríceps Francês Halter", focus: "Tríceps Porção Longa", desc: "Sentado ou em pé, segure um halter com as duas mãos atrás da cabeça. Estenda os braços para cima apontando os cotovelos para o teto, sem deixar que abram excessivamente para os lados." },
    { name: "Tríceps Pulley", focus: "Tríceps Base", desc: "Em pé, incline o tronco levemente para frente. Cole os cotovelos na costela e não os mova. Empurre a barra para baixo até estender totalmente o braço e retorne até o ângulo de 90 graus." },
    { name: "Tríceps Testa", focus: "Tríceps Isolado", desc: "Deitado no banco segurando halteres ou barra W. Mantenha os braços apontados para o teto. Flexione apenas os cotovelos, levando o peso em direção à testa, e estenda novamente." }
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
            
            // Lógica de Renderização Dinâmica Atualizada com Index
            bloco.exercises.forEach((ex, index) => {
                const blockDiv = document.createElement('div'); blockDiv.className = 'exercise-block';
                
                // Aplica o ícone apenas se o bloco tiver múltiplos exercícios e não for o último da lista
                const linkIcon = (bloco.exercises.length > 1 && index < bloco.exercises.length - 1) ? ' 🔗' : '';
                
                blockDiv.innerHTML = `<div class="exercise-header" onclick="FitApp.openDict('${ex.name}')"><span class="ex-name">${ex.name}${linkIcon}</span><span class="target-reps">${ex.target}</span></div>`;
                
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

    function renderLibrary() {
        const grid = document.getElementById('libraryGrid');
        if (!grid) return;
        grid.innerHTML = '';
        dictionaryData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'library-card';
            card.innerHTML = `
                <div class="lib-name">${item.name}</div>
                <div class="lib-focus">${item.focus}</div>
                <div class="lib-desc">${item.desc}</div>
            `;
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
        if (tabId === 'tab-biblioteca') renderLibrary(); // <--- Adicionado gatilho de renderização
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
        filterLibrary, // <--- Expondo a função de busca para o HTML
        openDict: (name) => { 
            switchTab('tab-biblioteca', 'nav-biblioteca'); 
            const searchInp = document.getElementById('searchInput');
            if (searchInp) {
                searchInp.value = name;
                filterLibrary(); // <--- Executa o filtro automaticamente ao clicar em um exercício
            } 
        } 
    };
})();

document.addEventListener('DOMContentLoaded', FitApp.init);