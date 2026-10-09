import { state } from './state.js';

export function openForgeModal() {
    document.getElementById('forgeModal').style.display = 'flex';
    updateForgeOptions();
}

export function updateForgeOptions() {
    const method = document.getElementById('forgeMethod').value;
    const subSelect = document.getElementById('forgeSubSelect');
    const subBox = document.getElementById('forgeSubOptionsBox');
    
    subBox.style.display = 'block';
    
    // FASE 1: Só o método Tradicional está ativo. Os outros mostram aviso.
    if (method === 'ppl' || method === 'abc') {
        document.getElementById('forgeSubLabel').textContent = "Selecione o Eixo (Apenas Tradicional Ativo):";
        subSelect.innerHTML = `
            <option value="push">Empurrar (Peito, Ombro, Tríceps)</option>
            <option value="pull">Puxar (Costas, Trapézio, Bíceps)</option>
            <option value="legs">Pernas e Core (Quadríceps, Isquios, Glúteo)</option>
        `;
    } else {
        document.getElementById('forgeSubLabel').textContent = "Manutenção em Curso:";
        subSelect.innerHTML = `<option value="bloqueado">A aguardar reconstrução (Fase 2)</option>`;
    }
}

export function generateForgedWorkout() {
    const method = document.getElementById('forgeMethod').value;
    const subOpt = document.getElementById('forgeSubSelect').value;
    
    const activeChips = document.querySelectorAll('.forge-equip-chip.active');
    if (activeChips.length === 0) {
        window.FitApp.showToast("Selecione pelo menos uma arma no arsenal.");
        return;
    }

    state.currentRoutine = executeForgeLogic(method, subOpt, []);
    state.currentWorkoutType = 'Livre';
    document.getElementById('forgeModal').style.display = 'none';
    window.FitApp.loadWorkout(); 
}

export function executeForgeLogic(method, subOpt, avoidNamesGlobal = []) {
    let generatedBlocks = [];
    let used = [...avoidNamesGlobal]; 

    // 1. MAPEAMENTO DE ARSENAL
    const equipChips = document.querySelectorAll('.forge-equip-chip.active');
    let userArsenal = [];
    equipChips.forEach(c => {
        const tags = c.getAttribute('data-equip').split(',');
        tags.forEach(t => {
            const tag = t.trim();
            if (tag === 'Barras_Anilhas') userArsenal.push('Barra');
            if (tag === 'Pesos_Livres') userArsenal.push('Halter');
            if (tag === 'Maquinas_Polias') userArsenal.push('Máquina', 'Cabo');
            if (tag === 'Peso_Corporal') userArsenal.push('Peso Corporal');
            if (tag === 'Calistenia') userArsenal.push('Calistenia');
        });
    });

    // 2. O MOTOR DE BUSCA (Agora com SubNíveis e Escada de Sobrevivência)
    const pullExercise = (targetAgonist, targetSubLevel = null) => {
        const normalize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
        const target = normalize(targetAgonist);
        const subTarget = targetSubLevel ? normalize(targetSubLevel) : null;

        // TENTATIVA 1: Precisão Total (Agonista + SubNível + Arsenal)
        let pool = window.dictionaryData.filter(d => {
            if (used.includes(d.name)) return false; 
            
            const matchGroup = (d.agonist && normalize(d.agonist) === target) || (d.group && normalize(d.group) === target);
            if (!matchGroup) return false;

            if (subTarget && (!d.subLevel || !normalize(d.subLevel).includes(subTarget))) return false;

            const exEquips = (d.equip || '').split(',').map(e => e.trim());
            const hasEquip = exEquips.some(eq => userArsenal.includes(eq));
            return hasEquip || d.equip === 'Peso Corporal';
        });

        // TENTATIVA 2: Sobrevivência (Se não tiver equipamento para o SubNível, ignora o SubNível e traz qualquer um do Agonista)
        if (pool.length === 0 && subTarget) {
            pool = window.dictionaryData.filter(d => {
                if (used.includes(d.name)) return false;
                const matchGroup = (d.agonist && normalize(d.agonist) === target) || (d.group && normalize(d.group) === target);
                if (!matchGroup) return false;

                const exEquips = (d.equip || '').split(',').map(e => e.trim());
                const hasEquip = exEquips.some(eq => userArsenal.includes(eq));
                return hasEquip || d.equip === 'Peso Corporal';
            });
        }

        // TENTATIVA 3: Desespero Absoluto (Traz Peso Corporal se tudo falhar)
        if (pool.length === 0) {
            pool = window.dictionaryData.filter(d => {
                if (used.includes(d.name)) return false;
                const matchGroup = (d.agonist && normalize(d.agonist) === target) || (d.group && normalize(d.group) === target);
                return matchGroup && d.equip === 'Peso Corporal';
            });
        }

        if (pool.length > 0) {
            // Prioridade a pesos pesados se existirem
            const hasIron = userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq));
            if (hasIron) {
                const heavyPool = pool.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
                if (heavyPool.length > 0) pool = heavyPool;
            }

            const ex = pool[Math.floor(Math.random() * pool.length)];
            used.push(ex.name);
            return { name: ex.name, sets: 4, target: "10-12 rep" };
        }
        return null;
    };

    // 3. CONSTRUTOR DE BLOCOS (Lê Agonista e SubNível)
    const buildBlock = (title, requests) => {
        const slots = requests.map(req => pullExercise(req[0], req[1] || null)).filter(ex => ex !== null);
        if (slots.length > 0) generatedBlocks.push({ title, exercises: slots });
    };

    // 4. LÓGICA DO TREINO TRADICIONAL (Com Biomecânica Estrita)
    if (method === 'abc' || method === 'ppl') {
        if (subOpt === 'push' || subOpt === 'A') {
            // AQUI ESTÁ A CORREÇÃO: Exigimos as 3 porções do Peitoral.
            buildBlock("Peitoral Completo", [
                ["Peitoral", "Esternocostal"], 
                ["Peitoral", "Clavicular"], 
                ["Peitoral", "Abdominal"]
            ]);
            buildBlock("Ombros & Tríceps", [
                ["Ombros", "Deltoide Anterior"], 
                ["Ombros", "Deltoide Lateral"], 
                ["Tríceps", "Cabeça Longa"], 
                ["Tríceps", "Cabeça Lateral"] // Opcional, vai puxar lateral ou medial
            ]);
        } else if (subOpt === 'pull' || subOpt === 'B') {
            buildBlock("Dorsais Base", [
                ["Costas", "Latíssimo do Dorso"], 
                ["Costas", "Espessura"]
            ]);
            buildBlock("Posterior & Bíceps", [
                ["Ombros", "Deltoide Posterior"], 
                ["Bíceps", "Bíceps Braquial"], 
                ["Bíceps", "Braquial"]
            ]);
        } else if (subOpt === 'legs') {
            buildBlock("Quadríceps", [
                ["Quadríceps", "Vastos"], 
                ["Quadríceps", "Reto Femoral"]
            ]);
            buildBlock("Posteriores", [
                ["Isquiotibiais", "Alongada"], 
                ["Isquiotibiais", "Encurtada"]
            ]);
            buildBlock("Glúteos & Panturrilhas", [
                ["Glúteos", "Glúteo Máximo"], 
                ["Panturrilhas", "Gastrocnêmios"]
            ]);
        }
    } else {
        generatedBlocks.push({ title: "Modo em Reconstrução", exercises: [] });
    }

    if(generatedBlocks.length === 0) generatedBlocks = [{ title: "Falta Arsenal para gerar este treino", exercises: [] }];
    return generatedBlocks;
}