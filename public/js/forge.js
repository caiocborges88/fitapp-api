import { state } from './state.js';

export function openForgeModal() {
    document.getElementById('forgeModal').style.display = 'flex';
    updateForgeOptions();
}

export function updateForgeOptions() {
    const method = document.getElementById('forgeMethod').value;
    const subSelect = document.getElementById('forgeSubSelect');
    const subBox = document.getElementById('forgeSubOptionsBox');
    const subLabel = document.getElementById('forgeSubLabel');
    
    subSelect.innerHTML = '';
    subBox.style.display = 'block';
    
    if (method === 'ppl' || method === 'abc') {
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
        `;
    } else if (method === 'biset_antagonista') {
        subLabel.textContent = "Pares de Combate (Opostos):";
        subSelect.innerHTML = `
            <option value="peito_costa">Peito + Costas</option>
            <option value="biceps_triceps">Bíceps + Tríceps</option>
            <option value="quad_post">Quadríceps + Posterior</option>
        `;
    } else if (method === 'biset_sinergista') {
        subLabel.textContent = "Pares Sinergistas (Principal + Auxiliar):";
        subSelect.innerHTML = `
            <option value="peito_triceps">Peito + Tríceps</option>
            <option value="costa_biceps">Costas + Bíceps</option>
            <option value="perna_ombro">Pernas + Ombros</option>
        `;
    } else {
        subBox.style.display = 'none';
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

    // 2. O MOTOR DE BUSCA
    const pullExercise = (targetAgonist, targetSubLevel = null) => {
        const normalize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
        const target = normalize(targetAgonist);
        const subTarget = targetSubLevel ? normalize(targetSubLevel) : null;

        let pool = window.dictionaryData.filter(d => {
            if (used.includes(d.name)) return false; 
            const matchGroup = (d.agonist && normalize(d.agonist) === target) || (d.group && normalize(d.group) === target);
            if (!matchGroup) return false;
            if (subTarget && (!d.subLevel || !normalize(d.subLevel).includes(subTarget))) return false;
            const exEquips = (d.equip || '').split(',').map(e => e.trim());
            const hasEquip = exEquips.some(eq => userArsenal.includes(eq));
            return hasEquip || d.equip === 'Peso Corporal';
        });

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

        if (pool.length === 0) {
            pool = window.dictionaryData.filter(d => {
                if (used.includes(d.name)) return false;
                const matchGroup = (d.agonist && normalize(d.agonist) === target) || (d.group && normalize(d.group) === target);
                return matchGroup && d.equip === 'Peso Corporal';
            });
        }

        if (pool.length > 0) {
            const hasIron = userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq));
            if (hasIron) {
                const heavyPool = pool.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
                if (heavyPool.length > 0) pool = heavyPool;
            }

            const ex = pool[Math.floor(Math.random() * pool.length)];
            used.push(ex.name);
            // IMPORTANTE: Exportamos o 'obj' completo para a IA conseguir ler os sinergistas
            return { name: ex.name, sets: 4, target: "10-12 rep", obj: ex };
        }
        return null;
    };

    const buildBlock = (title, requests) => {
        const slots = requests.map(req => pullExercise(req[0], req[1] || null)).filter(ex => ex !== null);
        if (slots.length > 0) generatedBlocks.push({ title, exercises: slots });
    };

    // 3. LÓGICA DO TREINO TRADICIONAL
    if (method === 'abc' || method === 'ppl') {
        if (subOpt === 'push' || subOpt === 'A') {
            buildBlock("Peitoral Completo", [["Peitoral", "Esternocostal"], ["Peitoral", "Clavicular"], ["Peitoral", "Abdominal"]]);
            buildBlock("Ombros & Tríceps", [["Ombros", "Deltoide Anterior"], ["Ombros", "Deltoide Lateral"], ["Tríceps", "Cabeça Longa"], ["Tríceps", "Cabeça Lateral"]]);
        } else if (subOpt === 'pull' || subOpt === 'B') {
            buildBlock("Dorsais Base", [["Costas", "Latíssimo do Dorso"], ["Costas", "Espessura"]]);
            buildBlock("Posterior & Bíceps", [["Ombros", "Deltoide Posterior"], ["Bíceps", "Bíceps Braquial"], ["Bíceps", "Braquial"]]);
        } else if (subOpt === 'legs') {
            buildBlock("Quadríceps", [["Quadríceps", "Vastos"], ["Quadríceps", "Reto Femoral"]]);
            buildBlock("Posteriores", [["Isquiotibiais", "Alongada"], ["Isquiotibiais", "Encurtada"]]);
            buildBlock("Glúteos & Panturrilhas", [["Glúteos", "Glúteo Máximo"], ["Panturrilhas", "Gastrocnêmios"]]);
        }
    } 
    // 4. LÓGICA DO MOTOR DE BI-SETS (Com a Bússola Restritiva)
    // ==========================================================
    // MOTOR INTELIGENTE DE BI-SETS (VOLUME CORRETO E PARES MISTOS)
    // ==========================================================
    else if (method.includes('biset')) {
        let style = 'sinergista';
        if (method.includes('antagonista')) style = 'antagonista';
        if (method.includes('agonista')) style = 'agonista';

        const s = subOpt.toLowerCase();
        let primaryTargets = [];
        let expectedSecondary = []; 
        
        // 1. VOLUME AUMENTADO: 4 Séries por treino para garantir 3-4 do maior e 2-3 do menor
        if (s.includes('peito') || s.includes('push')) {
            primaryTargets = [['Peitoral', 'Esternocostal'], ['Peitoral', 'Clavicular'], ['Peitoral', 'Abdominal'], ['Ombros', 'Deltoide Anterior']];
            expectedSecondary = ['tríceps', 'ombro anterior', 'ombros'];
        }
        else if (s.includes('costa') || s.includes('pull')) {
            primaryTargets = [['Costas', 'Latíssimo do Dorso'], ['Costas', 'Espessura (Romboides)'], ['Costas', null], ['Bíceps', 'Bíceps Braquial']];
            expectedSecondary = ['bíceps', 'braquial', 'trapézio', 'lombar', 'ombro posterior'];
        }
        else if (s.includes('perna') || s.includes('quad')) {
            primaryTargets = [['Quadríceps', 'Quadríceps (Vastos)'], ['Isquiotibiais', 'Isquiotibiais (Porção Alongada)'], ['Glúteos', 'Glúteo Máximo'], ['Quadríceps', 'Reto Femoral']];
            expectedSecondary = ['panturrilhas', 'glúteos', 'isquiotibiais', 'adutores'];
        }
        else {
            primaryTargets = [['Ombros', 'Deltoide Anterior'], ['Ombros', 'Deltoide Lateral'], ['Bíceps', 'Bíceps Braquial'], ['Tríceps', 'Tríceps (Cabeça Longa)']];
            expectedSecondary = ['tríceps', 'trapézio', 'antebraço', 'ombro posterior'];
        }

        let repTarget = rawProfile === 'definicao' ? "15-20 rep" : (rawProfile === 'tatico' ? "6-8 rep" : "10-12 rep");

        primaryTargets.forEach((p, idx) => {
            const exA = pullExercise(p[0], p[1], repTarget);
            
            if (exA) {
                let targetB_agonist = p[0];
                let exB = null;
                
                // Mágica Biomecânica
                if (style === 'sinergista' && exA.obj.synergist && exA.obj.synergist.length > 0) {
                    const normalize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
                    
                    const validSynergists = exA.obj.synergist.filter(syn => {
                        const synNorm = normalize(syn);
                        return expectedSecondary.some(expected => synNorm.includes(normalize(expected)));
                    });

                    if (validSynergists.length > 0) {
                        targetB_agonist = validSynergists[Math.floor(Math.random() * validSynergists.length)];
                    } else if (expectedSecondary.length > 0) {
                        targetB_agonist = expectedSecondary[0];
                    }
                } else if (style === 'antagonista' && exA.obj.antagonist && exA.obj.antagonist !== 'Nenhum') {
                    targetB_agonist = exA.obj.antagonist;
                }

                // 2. A BUSCA DO PAR IDEAL
                exB = pullExercise(targetB_agonist, null, repTarget);

                // 3. REGRA DE OURO (MISTURA): Se o par ideal esgotar, chama o Core para manter o Bi-Set vivo!
                let isMixed = false;
                if (!exB) {
                    exB = pullExercise('Core', null, "15-20 rep"); // Tenta puxar um Abdominal
                    isMixed = true;
                    if (!exB && p[0] !== 'Panturrilhas') {
                        exB = pullExercise('Panturrilhas', null, "15-20 rep"); // Fallback extremo para panturrilha
                    }
                }

                if (exB) {
                    let blockTitle = style === 'sinergista' ? 'Sinergia Integrada' : (style === 'antagonista' ? 'Combate Cruzado (Opostos)' : 'Pré-Exaustão (Agonista)');
                    if (isMixed) blockTitle += " + Core (Misto)"; // Avisa o utilizador que o par é misto

                    generatedBlocks.push({
                        title: `Série ${idx + 1}: ${blockTitle}`,
                        exercises: [
                            { name: exA.name, sets: 4, target: repTarget },
                            { name: exB.name, sets: 4, target: exB.target } // Mantém a repetição do Core se for misto
                        ]
                    });
                } else {
                    generatedBlocks.push({
                        title: `Série ${idx + 1}: Foco Isolado (Arsenal Esgotado)`,
                        exercises: [{ name: exA.name, sets: 4, target: repTarget }]
                    });
                }
            }
        });

        // Aplicadores Finais (O Core isolado sai, pois já está integrado nos bi-sets mistos)
        if (rawProfile === 'definicao') buildBlock("Finisher: Cardio Metabólico", [["Cardio/Mobilidade", "Sistema Anaeróbico", "1 min"]]);
        else if (rawProfile === 'tatico') buildBlock("Finisher: Core Blindado", [["Core", "Transverso do Abdômen", "1 min"]]);
    }

    if(generatedBlocks.length === 0) generatedBlocks = [{ title: "Falta Arsenal para gerar este treino", exercises: [] }];
    return generatedBlocks;
}