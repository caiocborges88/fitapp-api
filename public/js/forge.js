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

    let generatedBlocks = [];
    let used = [...avoidNamesGlobal]; 
    const rawProfile = document.getElementById('profileSelector') ? document.getElementById('profileSelector').value : 'hipertrofia';

    // ==========================================================
    // MOTOR DE FULFILLMENT: A ESCADA DE SOBREVIVÊNCIA
    // ==========================================================
    const pullExercise = (targetGroup, targetSubLevel = null, targetReps = "10-12 rep") => {
        const normalize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
        const tGroup = normalize(targetGroup);
        const tSub = targetSubLevel ? normalize(targetSubLevel) : null;

        const filterPool = (ignoreSub, ignoreLevel, ignoreEquip) => {
            return window.dictionaryData.filter(d => {
                if (!ignoreLevel && (d.nivel || 1) > maxAllowedLevel) return false;
                
                const matchGroup = (d.group && normalize(d.group).includes(tGroup)) || (d.agonist && normalize(d.agonist).includes(tGroup));
                if (!matchGroup) return false;
                
                if (!ignoreSub && tSub && (!d.subLevel || !normalize(d.subLevel).includes(tSub))) return false;
                
                if (!ignoreEquip) {
                    const exEquips = (d.equip || '').split(',').map(e => e.trim());
                    const hasEquip = exEquips.some(eq => userArsenal.includes(eq));
                    if (!hasEquip && d.equip !== 'Peso Corporal') return false;
                }
                return !used.includes(d.name);
            });
        };

        // Escada Anti-Asfixia: Garante que um exercício seja retornado
        let pool = filterPool(false, false, false); // Nível 1: Precisão Total
        if (pool.length === 0) pool = filterPool(true, false, false); // Nível 2: Ignora Foco Específico (SubLevel)
        if (pool.length === 0) pool = filterPool(true, true, false);  // Nível 3: Ignora SNC/Dificuldade
        if (pool.length === 0) pool = filterPool(true, true, true);   // Nível 4: Desespero (Qualquer arma ou Peso Corporal)

        if (pool.length > 0) {
            const hasIron = userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq));
            if (hasIron) {
                const heavyPool = pool.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
                if (heavyPool.length > 0) pool = heavyPool;
            }
            const ex = pool[Math.floor(Math.random() * pool.length)];
            used.push(ex.name); // Trava anti-repetição absoluta
            return { name: ex.name, sets: 4, target: targetReps, antagonist: ex.antagonist || 'Nenhum', obj: ex };
        }
        return null;
    };

    const buildBlock = (title, requests) => {
        const slots = requests.map(req => {
            const ex = pullExercise(req[0], req[1] || null, req[2] || "10-12 rep");
            if (ex) return { name: ex.name, sets: ex.sets, target: ex.target, antagonist: ex.antagonist };
            return null;
        }).filter(e => e !== null);
        if (slots.length > 0) generatedBlocks.push({ title, exercises: slots });
    };

    // ==========================================================
    // SISTEMA DE ROTINAS (ABC, ABCD, CIRCUITOS)
    // ==========================================================
    if (method === 'abc' || method === 'ppl') {
        if (rawProfile === 'feminino') {
            if (subOpt === 'push' || subOpt === 'A') {
                buildBlock("Posteriores & Glúteos", [["Isquiotibiais", "Isquiotibiais (Porção Alongada)", "10-12 rep"], ["Isquiotibiais", "Isquiotibiais (Porção Encurtada)", "12-15 rep"]]);
                buildBlock("Foco Glúteo Máximo", [["Glúteos", "Glúteo Máximo", "12-15 rep"], ["Adutores", "Músculos Adutores", "15-20 rep"]]);
                buildBlock("Panturrilhas & Core", [["Panturrilhas", "Gastrocnêmios", "15-20 rep"], ["Core", "Reto Abdominal Superior", "15-20 rep"]]);
            } else if (subOpt === 'pull' || subOpt === 'B') {
                buildBlock("Costas (Tônus)", [["Costas", "Latíssimo do Dorso", "12-15 rep"], ["Costas", "Espessura (Romboides)", "12-15 rep"]]);
                buildBlock("Peitoral & Ombros", [["Peitoral", "Clavicular", "12-15 rep"], ["Ombros", "Deltoide Lateral", "12-15 rep"]]);
                buildBlock("Braços Isolados", [["Tríceps", "Tríceps (Cabeça Longa)", "15-20 rep"], ["Bíceps", "Bíceps Braquial", "15-20 rep"]]);
            } else {
                buildBlock("Quadríceps Base", [["Quadríceps", "Quadríceps (Vastos)", "10-12 rep"], ["Quadríceps", "Reto Femoral", "12-15 rep"]]);
                buildBlock("Adutores & Isoladores", [["Glúteos", "Glúteo Médio e Mínimo", "15-20 rep"], ["Panturrilhas", "Sóleo", "15-20 rep"]]);
                buildBlock("Core Dinâmico", [["Core", "Oblíquos", "15-20 rep"], ["Core", "Transverso do Abdômen", "30 seg"]]);
            }
        } 
        else if (rawProfile === 'definicao') {
            const highRep = "15-20 rep";
            if (subOpt === 'push' || subOpt === 'A') {
                buildBlock("Peitoral Metabólico", [["Peitoral", "Esternocostal", highRep], ["Peitoral", "Clavicular", highRep]]);
                buildBlock("Ombros & Tríceps", [["Ombros", "Deltoide Anterior", highRep], ["Tríceps", "Tríceps (Cabeça Lateral/Medial)", highRep]]);
                buildBlock("Finisher Anaeróbico", [["Cardio/Mobilidade", "Sistema Anaeróbico", "1 min"], ["Core", "Oblíquos", highRep]]);
            } else if (subOpt === 'pull' || subOpt === 'B') {
                buildBlock("Costas Metabólico", [["Costas", "Latíssimo do Dorso", highRep], ["Costas", "Espessura (Romboides)", highRep]]);
                buildBlock("Posterior & Bíceps", [["Ombros", "Deltoide Posterior", highRep], ["Bíceps", "Bíceps Braquial", highRep]]);
                buildBlock("Finisher Cardiovascular", [["Cardio/Mobilidade", "Sistema Cardiovascular", "1 min"], ["Core", "Reto Abdominal Inferior", highRep]]);
            } else {
                buildBlock("Pernas Metabólico", [["Quadríceps", "Quadríceps (Vastos)", highRep], ["Isquiotibiais", "Isquiotibiais (Porção Alongada)", highRep]]);
                buildBlock("Glúteos & Panturrilha", [["Glúteos", "Glúteo Máximo", highRep], ["Panturrilhas", "Gastrocnêmios", "20 rep"]]);
                buildBlock("Derretedor Final", [["Cardio/Mobilidade", "Sistema Anaeróbico", "1 min"], ["Cardio/Mobilidade", "Sistema Cardiovascular", "1 min"]]);
            }
        }
        else if (rawProfile === 'tatico') {
            const pRep = "6-8 rep";
            if (subOpt === 'push' || subOpt === 'A') {
                buildBlock("Aquecimento Dinâmico", [["Cardio/Mobilidade", "Mobilidade Dinâmica", "10 rep"]]);
                buildBlock("Força Pura (Empurre)", [["Peitoral", "Esternocostal", pRep], ["Ombros", "Deltoide Anterior", pRep]]);
                buildBlock("Blindagem Core", [["Core", "Transverso do Abdômen", "1 min"], ["Core", "Reto Abdominal Superior", "15-20 rep"]]);
            } else if (subOpt === 'pull' || subOpt === 'B') {
                buildBlock("Aquecimento Articular", [["Cardio/Mobilidade", "Mobilidade Torácica", "10 rep"]]);
                buildBlock("Força de Tração", [["Costas", "Latíssimo do Dorso", pRep], ["Costas", "Espessura (Romboides)", pRep]]);
                buildBlock("Cadeia Lombar", [["Lombar", "Eretores da Espinha", "15-20 rep"], ["Core", "Oblíquos", "15-20 rep"]]);
            } else {
                buildBlock("Pliometria & Potência", [["Cardio/Mobilidade", "Sistema Anaeróbico", "30 seg"], ["Quadríceps", "Quadríceps (Vastos)", pRep]]);
                buildBlock("Tração Posterior", [["Isquiotibiais", "Isquiotibiais (Porção Alongada)", pRep], ["Glúteos", "Glúteo Máximo", pRep]]);
                buildBlock("Motor Cardiovascular", [["Cardio/Mobilidade", "Sistema Cardiovascular", "2 min"]]);
            }
        }
        else { // Hipertrofia
            if (subOpt === 'push' || subOpt === 'A') {
                buildBlock("Peitoral Base", [["Peitoral", "Esternocostal", "8-10 rep"], ["Peitoral", "Clavicular", "8-10 rep"]]);
                buildBlock("Deltoides", [["Ombros", "Deltoide Anterior", "10-12 rep"], ["Ombros", "Deltoide Lateral", "12-15 rep"]]);
                buildBlock("Tríceps & Core", [["Tríceps", "Tríceps (Cabeça Longa)", "10-12 rep"], ["Tríceps", "Tríceps (Cabeça Lateral/Medial)", "12-15 rep"], ["Core", "Reto Abdominal Superior", "15-20 rep"]]);
            } else if (subOpt === 'pull' || subOpt === 'B') {
                buildBlock("Dorsais Base", [["Costas", "Latíssimo do Dorso", "8-10 rep"], ["Costas", "Espessura (Romboides)", "8-10 rep"]]);
                buildBlock("Bíceps & Posterior", [["Bíceps", "Bíceps Braquial", "10-12 rep"], ["Ombros", "Deltoide Posterior", "12-15 rep"]]);
                buildBlock("Braquial & Core", [["Bíceps", "Braquial / Antebraço", "12-15 rep"], ["Core", "Oblíquos", "15-20 rep"]]);
            } else {
                buildBlock("Anterior", [["Quadríceps", "Quadríceps (Vastos)", "8-10 rep"], ["Quadríceps", "Reto Femoral", "10-12 rep"]]);
                buildBlock("Posterior", [["Isquiotibiais", "Isquiotibiais (Porção Alongada)", "10-12 rep"], ["Isquiotibiais", "Isquiotibiais (Porção Encurtada)", "10-12 rep"]]);
                buildBlock("Glúteos & Panturrilhas", [["Glúteos", "Glúteo Máximo", "15-20 rep"], ["Panturrilhas", "Gastrocnêmios", "15-20 rep"]]);
            }
        }
    } 
    
    // ==========================================================
    // MOTOR INTELIGENTE DE BI-SETS (DNA BIOMECÂNICO)
    // ==========================================================
    else if (method.includes('biset')) {
        let style = 'sinergista'; // O seu favorito como padrão
        if (method.includes('antagonista')) style = 'antagonista';
        if (method.includes('agonista')) style = 'agonista';

        const s = subOpt.toLowerCase();
        let primaryMuscles = [];
        
        // Deduz o Eixo do Dia com base na escolha do sub-menu
        if (s.includes('peito') || s.includes('push')) primaryMuscles = ['Peitoral', 'Peitoral', 'Peitoral'];
        else if (s.includes('costa') || s.includes('pull')) primaryMuscles = ['Costas', 'Costas', 'Costas'];
        else if (s.includes('perna') || s.includes('quad')) primaryMuscles = ['Quadríceps', 'Isquiotibiais', 'Glúteos'];
        else if (s.includes('ombro') || s.includes('braco') || s.includes('biceps')) primaryMuscles = ['Ombros', 'Bíceps', 'Tríceps'];
        else primaryMuscles = ['Peitoral', 'Costas', 'Pernas']; // Fallback geral

        let repTarget = rawProfile === 'definicao' ? "15-20 rep" : (rawProfile === 'tatico' ? "6-8 rep" : "10-12 rep");

        primaryMuscles.forEach((primary, idx) => {
            const exA = pullExercise(primary, null, repTarget);
            
            if (exA) {
                let targetB = primary; // Fallback para pré-exaustão (Agonista)
                
                // Mágica Biomecânica: Lê o ADN do Exercício A para definir o alvo B
                if (style === 'sinergista' && exA.obj.synergist && exA.obj.synergist.length > 0) {
                    targetB = exA.obj.synergist[Math.floor(Math.random() * exA.obj.synergist.length)];
                } else if (style === 'antagonista' && exA.obj.antagonist && exA.obj.antagonist !== 'Nenhum') {
                    targetB = exA.obj.antagonist;
                }

                // Puxa o Exercício B com base na decisão do ADN
                const exB = pullExercise(targetB, null, repTarget);

                if (exB) {
                    const blockTitle = style === 'sinergista' ? 'Sinergia Integrada' : (style === 'antagonista' ? 'Combate Cruzado (Opostos)' : 'Pré-Exaustão (Agonista)');
                    generatedBlocks.push({
                        title: `Série ${idx + 1}: ${blockTitle}`,
                        exercises: [
                            { name: exA.name, sets: 4, target: repTarget, antagonist: exA.antagonist },
                            { name: exB.name, sets: 4, target: repTarget, antagonist: exB.antagonist }
                        ]
                    });
                } else {
                    generatedBlocks.push({
                        title: `Série ${idx + 1}: Foco Isolado (Sem Armas para o Par)`,
                        exercises: [{ name: exA.name, sets: 4, target: repTarget, antagonist: 'Nenhum' }]
                    });
                }
            }
        });

        // Aplicadores Finais Baseados no Perfil
        if (rawProfile === 'definicao') buildBlock("Finisher: Cardio Metabólico", [["Cardio/Mobilidade", "Sistema Anaeróbico", "1 min"]]);
        else if (rawProfile === 'tatico') buildBlock("Finisher: Core Blindado", [["Core", "Transverso do Abdômen", "1 min"]]);
        else buildBlock("Finisher: Core", [["Core", "Oblíquos", "15-20 rep"]]);
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