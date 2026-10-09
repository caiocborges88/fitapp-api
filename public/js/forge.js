import { state } from './state.js';
import { getMuscleGroup } from './utils.js';

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
    } else if (method === 'abcd') {
        subLabel.textContent = "Selecione a Divisão:";
        subSelect.innerHTML = `
            <option value="A">Treino A (Frontal)</option>
            <option value="B">Treino B (Tração/Costas)</option>
            <option value="C">Treino C (Posterior/Ombros)</option>
            <option value="D">Treino D (Braços/Isoladores)</option>
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
        window.FitApp.showToast("⚠️ Operação Negada: Selecione pelo menos uma arma no seu arsenal.");
        return;
    }

    state.currentRoutine = executeForgeLogic(method, subOpt, []);
    state.currentWorkoutType = 'Livre';
    
    document.getElementById('forgeModal').style.display = 'none';
    window.FitApp.loadWorkout(); 
    
    const selectEl = document.getElementById('forgeSubSelect');
    let finalTitle = "Rotina Forjada";
    if (selectEl && selectEl.options.length > 0 && selectEl.closest('div').style.display !== 'none') {
        finalTitle = selectEl.options[selectEl.selectedIndex].text;
    } else if (method === 'circuito') {
        finalTitle = "Circuito Metabólico";
    } else if (method === 'calistenia') {
        finalTitle = "Calistenia Bodyweight";
    }
    
    const nameInput = document.getElementById('customWorkoutName');
    if (nameInput) nameInput.value = finalTitle;
    
    window.FitApp.showToast("Rotina forjada com sucesso. Verifique o plano.");
    if(state.audioEnabled) window.FitApp.speak("Treino gerado conforme arsenal selecionado e literatura biomecânica.");
}

export function executeForgeLogic(method, subOpt, avoidNamesGlobal = []) {
    let generatedBlocks = [];
    let used = [...avoidNamesGlobal]; 
    const rawProfile = document.getElementById('profileSelector') ? document.getElementById('profileSelector').value : 'hipertrofia';

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

    // 2. O MOTOR DE BUSCA (Blindado e Preciso)
    const pullExercise = (targetAgonist, targetSubLevel = null, targetReps = "10-12 rep") => {
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

        // Tenta ignorar o subnível se falhar
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

        // Tenta peso corporal absoluto se falhar
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
            return { name: ex.name, sets: 4, target: targetReps, obj: ex, antagonist: ex.antagonist || 'Nenhum' };
        }
        return null;
    };

    const buildBlock = (title, requests) => {
        const slots = requests.map(req => pullExercise(req[0], req[1] || null, req[2] || "10-12 rep")).filter(ex => ex !== null);
        if (slots.length > 0) generatedBlocks.push({ title, exercises: slots });
    };

    // 3. LÓGICA DO TREINO TRADICIONAL
    if (method === 'abc' || method === 'ppl') {
        if (subOpt === 'push' || subOpt === 'A') {
            buildBlock("Peitoral Completo", [["Peitoral", "Esternocostal"], ["Peitoral", "Clavicular"], ["Peitoral", "Abdominal"]]);
            buildBlock("Ombros & Tríceps", [["Ombros", "Deltoide Anterior"], ["Ombros", "Deltoide Lateral"], ["Tríceps", "Tríceps (Cabeça Longa)"], ["Tríceps", "Tríceps (Cabeça Lateral/Medial)"]]);
        } else if (subOpt === 'pull' || subOpt === 'B') {
            buildBlock("Dorsais Base", [["Costas", "Latíssimo do Dorso"], ["Costas", "Espessura (Romboides)"]]);
            buildBlock("Posterior & Bíceps", [["Ombros", "Deltoide Posterior"], ["Bíceps", "Bíceps Braquial"], ["Bíceps", "Braquial / Antebraço"]]);
        } else if (subOpt === 'legs') {
            buildBlock("Quadríceps", [["Quadríceps", "Quadríceps (Vastos)"], ["Quadríceps", "Reto Femoral"]]);
            buildBlock("Posteriores", [["Isquiotibiais", "Isquiotibiais (Porção Alongada)"], ["Isquiotibiais", "Isquiotibiais (Porção Encurtada)"]]);
            buildBlock("Glúteos & Panturrilhas", [["Glúteos", "Glúteo Máximo"], ["Panturrilhas", "Gastrocnêmios"]]);
        }
    } 
    
    // ==========================================================
    // 4. LÓGICA DO MOTOR DE BI-SETS (MATRIZ DE VOLUME 3:2 & PARES MISTOS)
    // ==========================================================
    else if (method.includes('biset')) {
        let style = 'sinergista';
        if (method.includes('antagonista')) style = 'antagonista';
        if (method.includes('agonista')) style = 'agonista';

        const s = subOpt.toLowerCase();
        let primaryTargets = [];
        
        // MATRIZ RÍGIDA: Garante rácio perfeito e ignora os devaneios do "synergist" original
        if (s.includes('peito') || s.includes('push')) {
            primaryTargets = [
                ['Peitoral', 'Esternocostal', 'Tríceps', null], 
                ['Peitoral', 'Clavicular', 'Ombros', 'Deltoide Anterior'], 
                ['Peitoral', 'Abdominal', 'Tríceps', null], 
                ['Ombros', 'Deltoide Anterior', 'Tríceps', null]
            ];
        } else if (s.includes('costa') || s.includes('pull')) {
            primaryTargets = [
                ['Costas', 'Latíssimo do Dorso', 'Bíceps', null], 
                ['Costas', 'Espessura (Romboides)', 'Lombar', null], 
                ['Costas', null, 'Bíceps', null], 
                ['Bíceps', 'Bíceps Braquial', 'Ombros', 'Deltoide Posterior']
            ];
        } else if (s.includes('perna') || s.includes('quad')) {
            primaryTargets = [
                ['Quadríceps', 'Quadríceps (Vastos)', 'Panturrilhas', null], 
                ['Isquiotibiais', 'Isquiotibiais (Porção Alongada)', 'Glúteos', null], 
                ['Glúteos', 'Glúteo Máximo', 'Isquiotibiais', null], 
                ['Quadríceps', 'Reto Femoral', 'Panturrilhas', null]
            ];
        } else {
            primaryTargets = [
                ['Ombros', 'Deltoide Anterior', 'Tríceps', null], 
                ['Ombros', 'Deltoide Lateral', 'Bíceps', null], 
                ['Bíceps', 'Bíceps Braquial', 'Tríceps', null], 
                ['Tríceps', 'Tríceps (Cabeça Longa)', 'Bíceps', null]
            ];
        }

        let repTarget = rawProfile === 'definicao' ? "15-20 rep" : (rawProfile === 'tatico' ? "6-8 rep" : "10-12 rep");

        primaryTargets.forEach((p, idx) => {
            const exA = pullExercise(p[0], p[1], repTarget);
            
            if (exA) {
                let targetB_agonist = p[0];
                let targetB_sub = p[1];
                let exB = null;
                
                // Aplica a ordem direta da Matriz
                if (style === 'sinergista') {
                    targetB_agonist = p[2];
                    targetB_sub = p[3];
                } else if (style === 'antagonista' && exA.obj.antagonist && exA.obj.antagonist !== 'Nenhum') {
                    targetB_agonist = exA.obj.antagonist;
                    targetB_sub = null;
                }

                exB = pullExercise(targetB_agonist, targetB_sub, repTarget);

                // Fallback Anti-Asfixia
                let isMixed = false;
                if (!exB) {
                    exB = pullExercise('Core', null, "15-20 rep");
                    isMixed = true;
                    if (!exB && p[0] !== 'Panturrilhas') {
                        exB = pullExercise('Panturrilhas', null, "15-20 rep"); 
                    }
                }

                if (exB) {
                    let blockTitle = style === 'sinergista' ? 'Sinergia Integrada' : (style === 'antagonista' ? 'Combate Cruzado (Opostos)' : 'Pré-Exaustão (Agonista)');
                    if (isMixed) blockTitle += " + Core (Misto)";

                    generatedBlocks.push({
                        title: `Série ${idx + 1}: ${blockTitle}`,
                        exercises: [
                            { name: exA.name, sets: 4, target: repTarget },
                            { name: exB.name, sets: 4, target: exB.target } 
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

        if (rawProfile === 'definicao') buildBlock("Finisher: Cardio Metabólico", [["Cardio/Mobilidade", "Sistema Anaeróbico", "1 min"]]);
        else if (rawProfile === 'tatico') buildBlock("Finisher: Core Blindado", [["Core", "Transverso do Abdômen", "1 min"]]);
    }

    // ==========================================================
    // CIRCUITOS & CALISTENIA
    // ==========================================================
    else if (method === 'circuito') {
        let circRep = rawProfile === 'tatico' ? "1 min" : "15-20 rep";
        buildBlock("Rodada Metabólica FullBody", [
            ["Cardio/Mobilidade", "Sistema Anaeróbico", "45 seg"],
            ["Quadríceps", "Quadríceps (Vastos)", circRep],
            ["Costas", "Latíssimo do Dorso", circRep],
            ["Isquiotibiais", "Isquiotibiais (Porção Alongada)", circRep],
            ["Peitoral", "Esternocostal", circRep],
            ["Core", "Reto Abdominal Superior", "1 min"]
        ]);
    }
    else if (method === 'calistenia') {
        buildBlock("Força Relativa (Push)", [["Peitoral", "Esternocostal", "Falha"], ["Tríceps", null, "Falha"]]);
        buildBlock("Força Relativa (Pull)", [["Costas", "Latíssimo do Dorso", "Falha"], ["Bíceps", null, "Falha"]]);
        buildBlock("Estabilidade Base", [["Quadríceps", null, "Falha"], ["Core", "Transverso do Abdômen", "Isometria Máx"]]);
    }

    // ==========================================================
    // ALGORITMO DE GRAVIDADE (CORE FINISHER)
    // ==========================================================
    const isCoreEx = (exName) => {
        const dictItem = typeof window.dictionaryData !== 'undefined' ? window.dictionaryData.find(d => d.name === exName) : null;
        if (dictItem) {
            const g = (dictItem.group || '').toLowerCase();
            const f = (dictItem.subLevel || '').toLowerCase();
            return g.includes('core') || f.includes('obliquo') || f.includes('abdom') || f.includes('estabiliza');
        }
        return false;
    };

    generatedBlocks.forEach(bloco => {
        bloco.exercises.sort((a, b) => {
            const aCore = isCoreEx(a.name);
            const bCore = isCoreEx(b.name);
            if (aCore && !bCore) return 1;
            if (!aCore && bCore) return -1;
            return 0;
        });
    });

    generatedBlocks.sort((a, b) => {
        const aHasCore = a.exercises.some(ex => isCoreEx(ex.name)) || a.title.toLowerCase().includes('core');
        const bHasCore = b.exercises.some(ex => isCoreEx(ex.name)) || b.title.toLowerCase().includes('core');
        if (aHasCore && !bHasCore) return 1;
        if (!aHasCore && bHasCore) return -1;
        return 0;
    });

    setTimeout(() => {
        if (typeof FitApp !== 'undefined' && FitApp.adjustRestTime) {
            if (rawProfile === 'definicao') FitApp.adjustRestTime(method === 'circuito' ? 30 : 45);
            else FitApp.adjustRestTime(method === 'circuito' ? 45 : 60);
        }
    }, 500);

    if(generatedBlocks.length === 0) generatedBlocks = [{ title: "Rotina de Contingência", exercises: [] }];
    return generatedBlocks;
}

export function forgeSmartBiset() { return null; } // Função obsoleta mantida para evitar quebra de referência global