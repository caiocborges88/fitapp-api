import { state } from './state.js';
import { getMuscleGroup } from './utils.js';

export function openForgeModal() {
    document.getElementById('forgeModal').style.display = 'flex';
    updateForgeOptions();
}

export function updateForgeOptions() {
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
    const removeAccents = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
    
    const userLevel = state.els.levelSelector ? state.els.levelSelector.value : 'intermediario';
    const maxAllowedLevel = userLevel === 'iniciante' ? 1 : (userLevel === 'intermediario' ? 2 : 3);

    const equipChips = document.querySelectorAll('.forge-equip-chip.active');
    let userArsenal = ['Barra', 'Halter', 'Máquina', 'Cabo', 'Peso Corporal', 'Calistenia']; 
    if (equipChips && equipChips.length > 0) {
        userArsenal = [];
        equipChips.forEach(c => {
            const tags = c.getAttribute('data-equip').split(',');
            tags.forEach(tag => {
                const t = tag.trim();
                if (t === 'Barras_Anilhas') userArsenal.push('Barra');
                if (t === 'Pesos_Livres') userArsenal.push('Halter');
                if (t === 'Maquinas_Polias') userArsenal.push('Máquina', 'Cabo');
                if (t === 'Peso_Corporal') userArsenal.push('Peso Corporal');
                if (t === 'Calistenia') userArsenal.push('Calistenia');
            });
        });
        userArsenal.push('Funcional_Esportivo');
    }

// ==========================================================
        // FASE 2: MOTOR DE FULFILLMENT BIOMECÂNICO
        // ==========================================================
        let generatedBlocks = [];
        let used = [...avoidNamesGlobal]; 
        
        const rawProfile = document.getElementById('profileSelector') ? document.getElementById('profileSelector').value : 'hipertrofia';
        const routeProfile = (rawProfile === 'definicao' || rawProfile === 'masculino') ? 'hipertrofia' : rawProfile;

        /**
         * Puxa o melhor exercício cruzando a Biomecânica com o Arsenal disponível.
         * Substitui o antigo getEx e safeSlot.
         */
        const pullExercise = (targetAgonist, targetSubLevel = null, targetReps = "10-12 rep") => {
            const normalize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
            const tAgonist = normalize(targetAgonist);
            const tSub = targetSubLevel ? normalize(targetSubLevel) : null;

            // 1. O Funil Primário (Agonista + Arsenal + SNC + Anti-Repetição)
            let pool = window.dictionaryData.filter(d => {
                const exNivel = d.nivel || 1;
                if (exNivel > maxAllowedLevel) return false;

                const matchAgonist = (d.agonist && normalize(d.agonist).includes(tAgonist)) || (d.group && normalize(d.group).includes(tAgonist));
                if (!matchAgonist) return false;

                if (tSub && (!d.subLevel || !normalize(d.subLevel).includes(tSub))) return false;

                const exEquips = (d.equip || '').split(',').map(e => e.trim());
                const hasEquip = exEquips.some(eq => userArsenal.includes(eq));
                if (!hasEquip && d.equip !== 'Peso Corporal') return false;

                return !used.includes(d.name);
            });

            // 2. Fallback de Sobrevivência (Ignora o SubLevel para evitar ecrã vazio)
            if (pool.length === 0 && targetSubLevel) {
                pool = window.dictionaryData.filter(d => {
                    const matchAgonist = (d.agonist && normalize(d.agonist).includes(tAgonist)) || (d.group && normalize(d.group).includes(tAgonist));
                    const exEquips = (d.equip || '').split(',').map(e => e.trim());
                    const hasEquip = exEquips.some(eq => userArsenal.includes(eq));
                    
                    return matchAgonist && (hasEquip || d.equip === 'Peso Corporal') && !used.includes(d.name);
                });
            }

            // 3. Extração Final e Prioridade de Ferro
            if (pool.length > 0) {
                const hasIron = userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq));
                if (hasIron) {
                    const heavyPool = pool.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
                    if (heavyPool.length > 0) pool = heavyPool;
                }
                
                const ex = pool[Math.floor(Math.random() * pool.length)];
                used.push(ex.name);
                
                return { 
                    name: ex.name, 
                    sets: 4, 
                    target: targetReps, 
                    antagonist: ex.antagonist || 'Nenhum' 
                };
            }
            return null;
        };

// ==========================================================
        // FASE 3: BLUEPRINTS MODULARES DE ALTA PERFORMANCE
        // ==========================================================
        const buildBlock = (title, requests) => {
            // Varre os pedidos e aciona o motor de fulfillment. Se não houver arsenal, filtra o null.
            const slots = requests.map(req => pullExercise(req[0], req[1] || null, req[2] || "10-12 rep")).filter(ex => ex !== null);
            if (slots.length > 0) generatedBlocks.push({ title, exercises: slots });
        };

        // --- SISTEMA ABC / PPL ---
        if (method === 'abc' || method === 'ppl') {
            if (routeProfile === 'feminino') {
                if (subOpt === 'push' || subOpt === 'A') {
                    buildBlock("Posteriores & Glúteos", [["Isquiotibiais", "Alongada"], ["Isquiotibiais", "Encurtada"]]);
                    buildBlock("Isolamento Glúteo", [["Glúteos", "Abdutores", "12-15 rep"], ["Glúteos", "Máximo", "12-15 rep"]]);
                    buildBlock("Panturrilhas & Core", [["Panturrilhas", "Gastrocnêmios", "15-20 rep"], ["Core", "Reto Abdominal", "15-20 rep"]]);
                } else if (subOpt === 'pull' || subOpt === 'B') {
                    buildBlock("Costas (Base)", [["Costas", "Latíssimo", "10-12 rep"], ["Costas", "Espessura", "10-12 rep"]]);
                    buildBlock("Peitoral", [["Peitoral", "Clavicular", "12-15 rep"], ["Peitoral", "Esternocostal", "12-15 rep"]]);
                    buildBlock("Braços Isolados", [["Tríceps", "Cabeça Longa", "12-15 rep"], ["Bíceps", "Bíceps Braquial", "12-15 rep"]]);
                } else {
                    buildBlock("Quadríceps", [["Quadríceps", "Vastos", "10-12 rep"], ["Quadríceps", "Reto Femoral", "10-12 rep"]]);
                    buildBlock("Adutores & Panturrilhas", [["Adutores", null, "12-15 rep"], ["Panturrilhas", "Sóleo", "15-20 rep"]]);
                    buildBlock("Ombros", [["Ombros", "Deltoide Anterior", "10-12 rep"], ["Ombros", "Deltoide Lateral", "12-15 rep"], ["Ombros", "Deltoide Posterior", "12-15 rep"]]);
                }
            } else { // Masculino / Hipertrofia
                if (subOpt === 'push' || subOpt === 'A') {
                    buildBlock("Peitoral Base", [["Peitoral", "Esternocostal", "8-10 rep"], ["Peitoral", "Clavicular", "8-10 rep"]]);
                    buildBlock("Deltoides", [["Ombros", "Deltoide Anterior", "10-12 rep"], ["Ombros", "Deltoide Lateral", "12-15 rep"]]);
                    buildBlock("Tríceps & Core", [["Tríceps", "Cabeça Longa", "10-12 rep"], ["Tríceps", "Lateral", "12-15 rep"], ["Core", "Reto Abdominal Superior", "15-20 rep"]]);
                } else if (subOpt === 'pull' || subOpt === 'B') {
                    buildBlock("Dorsais Base", [["Costas", "Latíssimo", "8-10 rep"], ["Costas", "Espessura", "8-10 rep"]]);
                    buildBlock("Bíceps & Posterior", [["Bíceps", "Braquial", "10-12 rep"], ["Ombros", "Deltoide Posterior", "12-15 rep"]]);
                    buildBlock("Trapézio & Core", [["Costas", "Espessura", "12-15 rep"], ["Core", "Oblíquos", "15-20 rep"]]);
                } else {
                    buildBlock("Anterior", [["Quadríceps", "Vastos", "8-10 rep"], ["Quadríceps", "Reto Femoral", "10-12 rep"]]);
                    buildBlock("Posterior", [["Isquiotibiais", "Alongada", "10-12 rep"], ["Isquiotibiais", "Encurtada", "10-12 rep"]]);
                    buildBlock("Glúteos & Panturrilhas", [["Glúteos", "Glúteo Máximo", "15-20 rep"], ["Panturrilhas", "Gastrocnêmios", "15-20 rep"]]);
                }
            }
        }
        
        // --- SISTEMA ABCD ---
        else if (method === 'abcd') {
            if (routeProfile === 'feminino') {
                if (subOpt === 'A') { 
                    buildBlock("Quadríceps Frontal", [["Quadríceps", "Vastos", "10-12 rep"], ["Quadríceps", "Reto Femoral", "12-15 rep"]]);
                    buildBlock("Panturrilhas & Core", [["Panturrilhas", "Gastrocnêmios", "15-20 rep"], ["Core", "Reto Abdominal", "15-20 rep"]]);
                } else if (subOpt === 'B') { 
                    buildBlock("Costas", [["Costas", "Latíssimo", "10-12 rep"], ["Costas", "Espessura", "12-15 rep"]]);
                    buildBlock("Peitoral", [["Peitoral", "Clavicular", "12-15 rep"], ["Peitoral", "Esternocostal", "12-15 rep"]]);
                } else if (subOpt === 'C') { 
                    buildBlock("Posterior de Perna", [["Isquiotibiais", "Alongada", "10-12 rep"], ["Isquiotibiais", "Encurtada", "12-15 rep"]]);
                    buildBlock("Ombros", [["Ombros", "Deltoide Anterior", "12-15 rep"], ["Ombros", "Deltoide Lateral", "12-15 rep"]]);
                } else if (subOpt === 'D') { 
                    buildBlock("Força Glútea", [["Glúteos", "Glúteo Máximo", "10-12 rep"], ["Adutores", null, "12-15 rep"]]);
                    buildBlock("Braços & Core Frontal", [["Tríceps", "Lateral", "12-15 rep"], ["Bíceps", "Braquial", "12-15 rep"], ["Core", "Reto Abdominal Inferior", "15-20 rep"]]);
                }
            } else {
                if (subOpt === 'A') {
                    buildBlock("Peitoral", [["Peitoral", "Esternocostal", "8-10 rep"], ["Peitoral", "Clavicular", "10-12 rep"], ["Peitoral", "Abdominal", "12-15 rep"]]);
                    buildBlock("Tríceps & Core", [["Tríceps", "Cabeça Longa", "10-12 rep"], ["Tríceps", "Lateral", "12-15 rep"], ["Core", "Reto Abdominal", "15-20 rep"]]);
                } else if (subOpt === 'B') {
                    buildBlock("Quadríceps & Glúteo", [["Quadríceps", "Vastos", "8-10 rep"], ["Quadríceps", "Reto Femoral", "10-12 rep"], ["Glúteos", "Glúteo Máximo", "12-15 rep"]]);
                    buildBlock("Isquiotibiais & Panturrilhas", [["Isquiotibiais", "Alongada", "12-15 rep"], ["Panturrilhas", "Gastrocnêmios", "15-20 rep"]]);
                } else if (subOpt === 'C') {
                    buildBlock("Dorsais", [["Costas", "Latíssimo", "8-10 rep"], ["Costas", "Espessura", "10-12 rep"], ["Lombar", null, "12-15 rep"]]);
                    buildBlock("Bíceps & Core", [["Bíceps", "Bíceps Braquial", "10-12 rep"], ["Bíceps", "Braquial", "10-12 rep"], ["Core", "Reto Abdominal", "15-20 rep"]]);
                } else if (subOpt === 'D') {
                    buildBlock("Deltoides", [["Ombros", "Deltoide Anterior", "8-10 rep"], ["Ombros", "Deltoide Lateral", "10-12 rep"], ["Ombros", "Deltoide Posterior", "12-15 rep"]]);
                    buildBlock("Posterior e Glúteo", [["Isquiotibiais", "Encurtada", "10-12 rep"], ["Isquiotibiais", "Alongada", "10-12 rep"], ["Adutores", null, "12-15 rep"]]);
                }
            }
        } 
        
        // --- BI-SETS ANTAGONISTA DINÂMICO (IA DA FORJA) ---
        else if (method === 'biset_antagonista') {
            let primaryTargets = [];
            if (subOpt === 'A' || subOpt.includes('peito')) primaryTargets = ['peito', 'peito', 'peito', 'peito']; 
            else if (subOpt === 'B' || subOpt.includes('quad') || subOpt.includes('perna')) primaryTargets = ['perna', 'perna', 'perna']; 
            else primaryTargets = ['ombro', 'biceps', 'triceps']; 

            primaryTargets.forEach((target, idx) => {
                const pair = forgeSmartBiset(target, userArsenal, used);
                if (pair && pair.exercicioA && pair.exercicioB) {
                    generatedBlocks.push({
                        title: `Série ${idx + 1}: Combate Biomecânico`,
                        exercises: [
                            { name: pair.exercicioA.name, sets: 4, target: "10-12 rep", antagonist: pair.exercicioA.antagonist || 'Oposto' },
                            { name: pair.exercicioB.name, sets: 4, target: "10-12 rep", antagonist: pair.exercicioB.antagonist || 'Oposto' }
                        ]
                    });
                } else if (pair && pair.exercicioA) {
                    generatedBlocks.push({ title: `Série ${idx + 1}: Isolado (Falta Par)`, exercises: [{ name: pair.exercicioA.name, sets: 4, target: "10-12 rep", antagonist: 'Nenhum' }] });
                }
            });
            buildBlock("Finisher: Core", [["Core", "Oblíquos", "15-20 rep"]]);
        }
        
        // --- OUTRAS VARIANTES DINÂMICAS (AGONISTA, SINERGISTA, CIRCUITO) ---
        else if (method === 'biset_agonista' || method === 'biset_sinergista') {
            // Usa o mesmo motor enxuto para criar a fadiga cruzada
            let isA = (subOpt === 'A' || subOpt.includes('peito'));
            let isB = (subOpt === 'B' || subOpt.includes('costa'));
            if (isA) {
                buildBlock("Série 1 (Dupla Ativação)", [["Peitoral", "Esternocostal"], ["Peitoral", "Clavicular"]]);
                buildBlock("Série 2 (Isolamento + Sinergista)", [["Peitoral", "Abdominal"], ["Tríceps", "Cabeça Longa"]]);
                buildBlock("Série 3 (Finisher)", [["Ombros", "Deltoide Lateral"], ["Core", "Reto Abdominal"]]);
            } else if (isB) {
                buildBlock("Série 1 (Tração Máxima)", [["Costas", "Latíssimo"], ["Costas", "Espessura"]]);
                buildBlock("Série 2 (Espessura + Bíceps)", [["Costas", "Espessura"], ["Bíceps", "Bíceps Braquial"]]);
                buildBlock("Série 3 (Posterior)", [["Ombros", "Deltoide Posterior"], ["Lombar", null]]);
            } else {
                buildBlock("Série 1 (Pernas)", [["Quadríceps", "Vastos"], ["Quadríceps", "Reto Femoral"]]);
                buildBlock("Série 2 (Posteriores)", [["Isquiotibiais", "Alongada"], ["Isquiotibiais", "Encurtada"]]);
                buildBlock("Série 3 (Glúteos & Panturrilhas)", [["Glúteos", "Glúteo Máximo"], ["Panturrilhas", "Gastrocnêmios"]]);
            }
        }
        
        else if (method === 'circuito') {
            buildBlock("Rodada Metabólica FullBody", [
                ["Cardio/Mobilidade", "Sistema Anaeróbico", "45 seg"],
                ["Quadríceps", "Vastos", "15-20 rep"],
                ["Costas", "Latíssimo", "15-20 rep"],
                ["Isquiotibiais", "Alongada", "15-20 rep"],
                ["Peitoral", "Esternocostal", "15-20 rep"],
                ["Core", "Reto Abdominal", "1 min"]
            ]);
        }
        
        else if (method === 'calistenia') {
            let isA = (subOpt === 'A' || subOpt === 'push');
            let isB = (subOpt === 'B' || subOpt === 'pull');
            if (isA) {
                buildBlock("Força Relativa (Empurrar)", [["Peitoral", "Esternocostal", "Falha"], ["Tríceps", null, "Falha"]]);
                buildBlock("Core Isométrico", [["Core", "Transverso", "Isometria Máx"]]);
            } else if (isB) {
                buildBlock("Força Relativa (Puxar)", [["Costas", "Latíssimo", "Falha"], ["Bíceps", null, "Falha"]]);
                buildBlock("Core Dinâmico", [["Core", "Oblíquos", "Falha"]]);
            } else {
                buildBlock("Base Inferior", [["Quadríceps", null, "Falha"], ["Isquiotibiais", null, "Falha"]]);
                buildBlock("Resistência", [["Panturrilhas", null, "Falha"]]);
            }
        }

    const isCoreEx = (exName) => {
        const dictItem = typeof window.dictionaryData !== 'undefined' ? window.dictionaryData.find(d => d.name === exName) : null;
        if (dictItem) {
            const g = (dictItem.group || '').toLowerCase();
            const f = (dictItem.focus || '').toLowerCase();
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

export function forgeSmartBiset(primaryMuscle, userArsenal, avoidNames = []) {
    if (!window.dictionaryData || window.dictionaryData.length === 0) return null;

    const normalize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
    const pMuscle = normalize(primaryMuscle);

    let poolA = window.dictionaryData.filter(d => 
        ((d.group && normalize(d.group).includes(pMuscle)) || 
         (d.agonist && normalize(d.agonist).includes(pMuscle))) &&
        !avoidNames.includes(d.name)
    );

    if (poolA.length === 0) return null;
    
    if (userArsenal && userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq))) {
        const heavyA = poolA.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
        if (heavyA.length > 0) poolA = heavyA;
    }

    const exA = poolA[Math.floor(Math.random() * poolA.length)];
    avoidNames.push(exA.name);

    let poolB = [];
    const targetAntagonist = exA.antagonist ? normalize(exA.antagonist) : '';

    if (targetAntagonist && targetAntagonist !== 'nenhum') {
        poolB = window.dictionaryData.filter(d => 
            ((d.agonist && normalize(d.agonist).includes(targetAntagonist)) || 
             (d.group && normalize(d.group).includes(targetAntagonist))) &&
            !avoidNames.includes(d.name)
        );
    }

    if (poolB.length === 0) {
        let fallbackTarget = '';
        if (pMuscle.includes('peito')) fallbackTarget = 'costa';
        else if (pMuscle.includes('costa')) fallbackTarget = 'peito';
        else if (pMuscle.includes('biceps')) fallbackTarget = 'triceps';
        else if (pMuscle.includes('triceps')) fallbackTarget = 'biceps';
        else if (pMuscle.includes('perna') || pMuscle.includes('quad')) fallbackTarget = 'posterior';
        else if (pMuscle.includes('ombro')) fallbackTarget = 'costa';
        else fallbackTarget = 'core';

        poolB = window.dictionaryData.filter(d => 
            ((d.group && normalize(d.group).includes(fallbackTarget)) || 
             (d.focus && normalize(d.focus).includes(fallbackTarget))) &&
            !avoidNames.includes(d.name)
        );
    }

    if (userArsenal && userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq))) {
        const heavyB = poolB.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
        if (heavyB.length > 0) poolB = heavyB;
    }

    const exB = poolB.length > 0 ? poolB[Math.floor(Math.random() * poolB.length)] : null;
    if (exB) avoidNames.push(exB.name);

    return { exercicioA: exA, exercicioB: exB };
}