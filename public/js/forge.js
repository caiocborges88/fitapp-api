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

    const getEx = (focusTerms, equipPref, avoidNames, allowBodyweight = false) => {
        const mapFocus = {
            'peito_esternocostal': ['Peitoral Médio (Fibras Esternocostais)', 'Fibras Médias'], 
            'peito_clavicular': ['Peitoral Superior (Fibras Claviculares)', 'Fibras Superiores'], 
            'peito_costal': ['Peitoral Inferior (Fibras Abdominais)', 'Fibras Inferiores'], 
            'peito': ['Peitoral Médio (Fibras Esternocostais)', 'Peitoral Superior (Fibras Claviculares)', 'Peitoral Inferior (Fibras Abdominais)', 'Isolamento (Fibras Esternocostais)', 'Fibras Médias', 'Fibras Superiores', 'Fibras Inferiores'],
            'costa_largura': ['Latíssimo do Dorso (Foco em Largura)', 'Latíssimo do Dorso (Geral)', 'Latíssimo (Largura)'], 
            'costa_espessura': ['Latíssimo do Dorso (Foco em Espessura)', 'Romboides/Miolo (Espessura)', 'Romboides (Maior e Menor) e Trapézio Médio/Inferior'], 
            'costa_isolado': ['Latíssimo do Dorso (Foco em Espessura)', 'Latíssimo do Dorso (Geral)', 'Latíssimo (Largura)'], 
            'costa': ['Latíssimo do Dorso (Foco em Largura)', 'Latíssimo do Dorso (Foco em Espessura)', 'Latíssimo do Dorso (Geral)', 'Romboides/Miolo (Espessura)'],
            'ombro_anterior': ['Deltoide Anterior', 'Deltoide Anterior e Lateral', 'Deltoides (Complexo Completo)'], 
            'ombro_lateral': ['Deltoide Lateral', 'Deltoide Anterior e Lateral', 'Deltoides (Complexo Completo)'], 
            'ombro_posterior': ['Deltoide Posterior', 'Deltoides (Complexo Completo)'], 
            'ombro': ['Deltoide Anterior', 'Deltoide Lateral', 'Deltoides (Complexo Completo)', 'Deltoide Anterior e Lateral', 'Deltoide Posterior'], 
            'trapezio': ['Trapézio Superior', 'Trapézio Superior (Fibras Descendentes)', 'Trapézio (Complexo Completo)'],
            'perna_quadriceps': ['Quadríceps (Vastos)', 'Quadríceps Femoral (Geral)', 'Reto Femoral (Isolamento)', 'Vastos (Lateral, Medial, Intermédio)', 'Reto Femoral'], 
            'perna_posterior_gluteo': ['Isquiotibiais (Porção Alongada)', 'Isquiotibiais (Porção Encurtada)', 'Glúteo Máximo', 'Glúteo Máximo (Complexo)', 'Glúteo Médio e Mínimo', 'Glúteo Médio/Mínimo', 'Isquiotibiais', 'Glúteos/Abdutores'], 
            'perna_adutor_abdutor': ['Adutores', 'Glúteo Médio e Mínimo', 'Glúteo Máximo (Complexo)', 'Glúteos/Abdutores'], 
            'perna': ['Quadríceps Femoral (Geral)', 'Vastos (Lateral, Medial, Intermédio)', 'Isquiotibiais (Porção Alongada)', 'Isquiotibiais (Porção Encurtada)', 'Glúteo Máximo (Complexo)', 'Glúteo Médio e Mínimo', 'Quadríceps', 'Isquiotibiais'],
            'panturrilha_gastro': ['Gastrocnêmio e Sóleo (Tríceps Sural)', 'Músculo Gastrocnêmio', 'Panturrilhas (Gastrocnêmios)', 'Panturrilhas'], 
            'panturrilha_soleo': ['Músculo Sóleo', 'Panturrilhas (Sóleo)', 'Gastrocnêmio e Sóleo (Tríceps Sural)', 'Panturrilhas'], 
            'panturrilha': ['Gastrocnêmio e Sóleo (Tríceps Sural)', 'Músculo Gastrocnêmio', 'Músculo Sóleo', 'Tibial Anterior', 'Panturrilhas (Gastrocnêmios)', 'Panturrilhas (Sóleo)', 'Panturrilhas'],
            'triceps_longa': ['Cabeça Longa', 'Triceps (Complexo Completo)'], 
            'triceps_lateral_medial': ['Cabeças Lateral e Medial', 'Lateral/Medial', 'Tríceps (Complexo Completo)'], 
            'triceps_global': ['Tríceps (Complexo Completo)', 'Todas'], 
            'triceps': ['Tríceps (Complexo Completo)', 'Cabeça Longa', 'Cabeças Lateral e Medial', 'Todas', 'Lateral/Medial'],
            'biceps_longa': ['Bíceps Braquial (Cabeças Curta e Longa)', 'Cabeça Longa', 'Cabeça Curta/Longa'], 
            'biceps_curta': ['Cabeça Curta', 'Bíceps Braquial (Cabeças Curta e Longa)', 'Cabeça Curta/Longa'], 
            'biceps_braquial': ['Músculo Braquial e Braquiorradial', 'Braquial/Antebraço'], 
            'biceps_global': ['Bíceps Braquial (Cabeças Curta e Longa)', 'Cabeça Curta/Longa'], 
            'biceps': ['Bíceps Braquial (Cabeças Curta e Longa)', 'Cabeça Curta', 'Músculo Braquial e Braquiorradial', 'Cabeça Curta/Longa', 'Braquial/Antebraço'],
            'core_supra': ['Reto Abdominal (Porção Superior)', 'Reto Abdominal (Geral)', 'Superior'], 
            'core_infra': ['Reto Abdominal (Porção Inferior)', 'Reto Abdominal (Geral)', 'Inferior'], 
            'core_obliquo': ['Oblíquos (Externos e Internos)', 'Oblíquos / Rotação'], 
            'core_profundo': ['Core (Transverso do Abdômen e Estabilizadores)', 'Estabilização/Anti-extensão'], 
            'core': ['Reto Abdominal (Geral)', 'Oblíquos (Externos e Internos)', 'Core (Transverso do Abdômen e Estabilizadores)', 'Superior', 'Inferior', 'Estabilização/Anti-extensão', 'Oblíquos / Rotação']
        };
        const mapEquip = { 'barra': 'Barra', 'halter': 'Halter', 'maquina': 'Máquina', 'cabo': 'Cabo', 'peso_corporal': 'Peso Corporal', 'calistenia': 'Calistenia' };

        const isNameAllowed = (exName) => {
            const nome = (exName || '').toLowerCase();
            if (userArsenal.includes('Peso Corporal') && !userArsenal.includes('Calistenia') && !userArsenal.includes('Halter')) {
                if (/bola|anel|argola|barra|tração|tracao|haltere|anilhas|maquina|máquina|polia/.test(nome) && !nome.includes('peso corporal')) return false;
            }
            if (!userArsenal.includes('Halter') && !userArsenal.includes('Barra') && !userArsenal.includes('Máquina')) {
                if (/haltere|anilhas|maquina|máquina|polia|cabo/.test(nome)) return false;
                if (nome.includes('barra') && !/barra fixa|paralela/.test(nome)) return false;
            }
            return true;
        };

        const checkBaseGroup = (dGroup, fTerms) => {
            const prefix = fTerms[0].split('_')[0]; 
            const expectedGroup = { 'peito': 'peito', 'costa': 'costas', 'trapezio': 'costas', 'ombro': 'ombros', 'perna': 'pernas', 'panturrilha': 'pernas', 'triceps': 'triceps', 'biceps': 'biceps', 'core': 'core' }[prefix] || 'outros';
            const actualGroup = typeof getMuscleGroup === 'function' ? getMuscleGroup(dGroup) : 'outros';
            
            if (expectedGroup === 'outros') return true; 
            if (prefix === 'trapezio' && (actualGroup === 'costas' || actualGroup === 'ombros')) return true; 
            return actualGroup === expectedGroup;
        };

        let pool = window.dictionaryData.filter(d => {
            const exEquip = d.equip || '';
            const exGroup = d.group || '';
            const exFocus = d.focus || '';

            const exNivel = d.nivel || 1;
            if (exNivel > maxAllowedLevel) return false;
            if (!checkBaseGroup(exGroup, focusTerms)) return false;

            const validFocuses = focusTerms.flatMap(term => mapFocus[term] || [term]);
            const matchFocus = validFocuses.includes(exFocus) || validFocuses.some(f => exGroup.includes(f));
            
            const exEquipsArray = exEquip.split(',').map(e => e.trim());
            const isArsenalAllowed = exEquipsArray.some(eq => userArsenal.includes(eq));
            if (!isArsenalAllowed && exEquip !== '') return false;

            if (!isNameAllowed(d.name)) return false;

            let matchEquip = true;
            if (equipPref) {
                const translatedEquip = mapEquip[equipPref] || equipPref;
                matchEquip = exEquipsArray.includes(translatedEquip);
            }
            
            return matchFocus && matchEquip && !avoidNames.includes(d.name);
        });

        if (pool.length === 0) {
            pool = window.dictionaryData.filter(d => {
                const exEquip = d.equip || '';
                const exGroup = d.group || '';
                const exFocus = d.focus || '';

                const exNivel = d.nivel || 1;
                if (exNivel > maxAllowedLevel && exNivel > (maxAllowedLevel + 1)) return false; 
                if (!checkBaseGroup(exGroup, focusTerms)) return false;
                
                const exEquipsArray = exEquip.split(',').map(e => e.trim());
                const isArsenalAllowed = exEquipsArray.some(eq => userArsenal.includes(eq));
                if (!isArsenalAllowed && exEquip !== '') return false;
                if (!isNameAllowed(d.name)) return false;

                const validFocuses = focusTerms.flatMap(term => mapFocus[term] || [term]);
                return (validFocuses.includes(exFocus) || validFocuses.some(f => exGroup.includes(f))) && !avoidNames.includes(d.name);
            });
        }

        if (pool.length === 0) {
            pool = window.dictionaryData.filter(d => {
                if (!checkBaseGroup(d.group || '', focusTerms)) return false;
                const exEquipsArray = (d.equip || '').split(',').map(e => e.trim());
                const isArsenalAllowed = exEquipsArray.some(eq => userArsenal.includes(eq));
                return isArsenalAllowed || !d.equip;
            });
        }
        if (pool.length === 0) {
            pool = window.dictionaryData.filter(d => checkBaseGroup(d.group || '', focusTerms));
        }

        if (pool.length > 0) {
            const hasIron = userArsenal.includes('Máquina') || userArsenal.includes('Barra') || userArsenal.includes('Halter') || userArsenal.includes('Cabo');
            if (hasIron) {
                const heavyPool = pool.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
                if (heavyPool.length > 0) pool = heavyPool;
            }
            return pool[Math.floor(Math.random() * pool.length)];
        }
        return null;
    };

    let generatedBlocks = [];
    let used = [...avoidNamesGlobal]; 
    
    const rawProfile = document.getElementById('profileSelector') ? document.getElementById('profileSelector').value : 'hipertrofia';
    const routeProfile = (rawProfile === 'definicao' || rawProfile === 'masculino') ? 'hipertrofia' : rawProfile;

    const safeSlot = (focusArr, equip = null, target = "10-12 rep") => {
        let ex = getEx(focusArr, equip, used);
        if (!ex && equip) ex = getEx(focusArr, null, used); 
        if (!ex) {
            const parentTerm = focusArr[0].split('_')[0]; 
            ex = getEx([parentTerm], null, used);
        }
        if (ex) {
            used.push(ex.name);
            return { name: ex.name, sets: 4, target: target };
        }
        return null;
    };

    // --- SISTEMA ABC / PPL ---
    if (method === 'abc' || method === 'ppl') {
        let blueprint = [];
        if (routeProfile === 'feminino') {
            if (subOpt === 'push' || subOpt === 'A') {
                blueprint = [
                    { title: "Posteriores Base (2 Ex)", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                    { title: "Glúteos & Isolamento (2 Ex)", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep"), safeSlot(['perna_posterior_gluteo'], 'cabo', "12-15 rep") ] },
                    { title: "Panturrilhas", slots: [ safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep") ] },
                    { title: "Core Finisher", slots: [ safeSlot(['core_supra', 'core_infra'], null, "15-20 rep") ] }
                ];
            } else if (subOpt === 'pull' || subOpt === 'B') {
                blueprint = [
                    { title: "Costas (4 Exercícios)", slots: [ safeSlot(['costa_largura'], 'maquina', "10-12 rep"), safeSlot(['costa_espessura'], 'barra', "10-12 rep"), safeSlot(['costa_isolado'], 'cabo', "12-15 rep"), safeSlot(['costa'], 'halter', "12-15 rep") ] },
                    { title: "Peitoral (4 Exercícios)", slots: [ safeSlot(['peito_clavicular'], 'halter', "12-15 rep"), safeSlot(['peito_esternocostal'], 'halter', "10-12 rep"), safeSlot(['peito_costal'], 'cabo', "12-15 rep"), safeSlot(['peito'], 'maquina', "10-12 rep") ] },
                    { title: "Braços Isolados", slots: [ safeSlot(['triceps_global'], 'cabo', "12-15 rep"), safeSlot(['biceps_global'], 'halter', "12-15 rep") ] }
                ];
            } else {
                blueprint = [
                    { title: "Quadríceps (2 Exercícios)", slots: [ safeSlot(['perna_quadriceps'], 'barra', "10-12 rep"), safeSlot(['perna_quadriceps'], 'halter', "10-12 rep") ] },
                    { title: "Adutores & Panturrilhas", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep"), safeSlot(['panturrilha_soleo'], 'maquina', "15-20 rep") ] },
                    { title: "Ombros (3 Exercícios)", slots: [ safeSlot(['ombro_anterior'], 'halter', "10-12 rep"), safeSlot(['ombro_lateral'], 'halter', "12-15 rep"), safeSlot(['ombro_posterior'], 'cabo', "12-15 rep") ] }
                ];
            }
        } else {
            if (subOpt === 'push' || subOpt === 'A') {
                blueprint = [
                    { title: "Peitoral Base", slots: [ safeSlot(['peito_clavicular'], 'barra', "8-10 rep"), safeSlot(['peito_esternocostal'], 'halter', "8-10 rep") ] },
                    { title: "Peitoral Isolamento", slots: [ safeSlot(['peito_costal'], 'cabo', "10-12 rep"), safeSlot(['peito_esternocostal'], 'maquina', "10-12 rep") ] },
                    { title: "Deltoides", slots: [ safeSlot(['ombro_anterior'], 'halter', "10-12 rep"), safeSlot(['ombro_lateral'], 'halter', "12-15 rep"), safeSlot(['ombro_posterior'], 'cabo', "12-15 rep") ] },
                    { title: "Tríceps & Core", slots: [ safeSlot(['triceps_longa'], 'halter', "10-12 rep"), safeSlot(['triceps_lateral_medial'], 'cabo', "12-15 rep"), safeSlot(['triceps_global'], 'cabo', "12-15 rep"), safeSlot(['core_supra'], null, "15-20 rep") ] }
                ];
            } else if (subOpt === 'pull' || subOpt === 'B') {
                blueprint = [
                    { title: "Dorsais Base", slots: [ safeSlot(['costa_largura'], 'barra', "8-10 rep"), safeSlot(['costa_espessura'], 'maquina', "8-10 rep") ] },
                    { title: "Dorsais Isolamento", slots: [ safeSlot(['costa_isolado', 'costa'], 'cabo', "10-12 rep"), safeSlot(['costa_largura'], 'halter', "10-12 rep") ] },
                    { title: "Bíceps", slots: [ safeSlot(['biceps_longa'], 'barra', "10-12 rep"), safeSlot(['biceps_curta'], 'halter', "10-12 rep"), safeSlot(['biceps_braquial'], 'cabo', "12-15 rep") ] },
                    { title: "Trapézio & Core", slots: [ safeSlot(['trapezio'], 'halter', "12-15 rep"), safeSlot(['core_obliquo'], null, "15-20 rep") ] }
                ];
            } else {
                blueprint = [
                    { title: "Anterior (Quadríceps)", slots: [ safeSlot(['perna_quadriceps'], 'barra', "8-10 rep"), safeSlot(['perna_quadriceps'], 'maquina', "10-12 rep") ] },
                    { title: "Posterior (Isquiotibiais)", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                    { title: "Glúteos & Panturrilhas", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "15-20 rep"), safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep") ] },
                    { title: "Core Profundo", slots: [ safeSlot(['core_profundo'], null, "15-20 rep"), safeSlot(['core_infra'], null, "15-20 rep") ] }
                ];
            }
        }
        blueprint.forEach(b => {
            const validExs = b.slots.filter(s => s !== null);
            if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
        });
    } 
    
    // --- SISTEMA ABCD ---
    else if (method === 'abcd') {
        let blueprint = [];
        if (routeProfile === 'feminino') {
            if (subOpt === 'A') { 
                blueprint = [
                    { title: "Foco Frontal (Quadríceps)", slots: [ safeSlot(['perna_quadriceps'], 'barra', "10-12 rep"), safeSlot(['perna_quadriceps'], 'maquina', "10-12 rep") ] },
                    { title: "Isolamento Quadríceps", slots: [ safeSlot(['perna_quadriceps'], 'halter', "12-15 rep"), safeSlot(['perna_quadriceps'], 'peso_corporal', "12-15 rep") ] },
                    { title: "Panturrilhas & Core", slots: [ safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep"), safeSlot(['core_supra', 'core_infra'], 'peso_corporal', "15-20 rep") ] }
                ];
            } else if (subOpt === 'B') { 
                blueprint = [
                    { title: "Costas (4 Movimentos)", slots: [ safeSlot(['costa_largura'], 'maquina', "10-12 rep"), safeSlot(['costa_espessura'], 'barra', "10-12 rep"), safeSlot(['costa_isolado'], 'cabo', "12-15 rep"), safeSlot(['costa'], 'halter', "12-15 rep") ] },
                    { title: "Peitoral (4 Movimentos)", slots: [ safeSlot(['peito_clavicular'], 'halter', "12-15 rep"), safeSlot(['peito_esternocostal'], 'halter', "10-12 rep"), safeSlot(['peito_costal'], 'cabo', "12-15 rep"), safeSlot(['peito'], 'maquina', "10-12 rep") ] }
                ];
            } else if (subOpt === 'C') { 
                blueprint = [
                    { title: "Posterior de Perna (Isquiotibiais)", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                    { title: "Lombar & Isolamento Posterior", slots: [ safeSlot(['costa'], 'peso_corporal', "12-15 rep"), safeSlot(['perna_posterior_gluteo'], 'halter', "12-15 rep") ] },
                    { title: "Ombros (3 Movimentos)", slots: [ safeSlot(['ombro_anterior'], 'halter', "12-15 rep"), safeSlot(['ombro_lateral'], 'halter', "12-15 rep"), safeSlot(['ombro_posterior'], 'cabo', "12-15 rep") ] }
                ];
            } else if (subOpt === 'D') { 
                blueprint = [
                    { title: "Força Glútea", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                    { title: "Abdução e Adução", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep"), safeSlot(['perna_adutor_abdutor'], 'cabo', "12-15 rep") ] },
                    { title: "Braços & Core Frontal", slots: [ safeSlot(['triceps_lateral_medial'], 'cabo', "12-15 rep"), safeSlot(['biceps_curta'], 'halter', "12-15 rep"), safeSlot(['core_supra', 'core_infra'], 'peso_corporal', "15-20 rep") ] }
                ];
            }
        } else {
            if (subOpt === 'A') {
                blueprint = [
                    { title: "Peitoral", slots: [ safeSlot(['peito_clavicular'], 'barra', "8-10 rep"), safeSlot(['peito_esternocostal'], 'halter', "10-12 rep"), safeSlot(['peito_costal'], 'cabo', "12-15 rep"), safeSlot(['peito'], 'maquina', "10-12 rep") ] },
                    { title: "Tríceps", slots: [ safeSlot(['triceps_longa'], 'halter', "10-12 rep"), safeSlot(['triceps_lateral_medial'], 'cabo', "12-15 rep"), safeSlot(['triceps_global'], 'cabo', "12-15 rep") ] },
                    { title: "Core Superior", slots: [ safeSlot(['core_supra'], null, "15-20 rep") ] }
                ];
            } else if (subOpt === 'B') {
                blueprint = [
                    { title: "Quadríceps & Glúteo", slots: [ safeSlot(['perna_quadriceps'], 'barra', "8-10 rep"), safeSlot(['perna_quadriceps'], 'maquina', "10-12 rep"), safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep") ] },
                    { title: "Isquiotibiais & Panturrilhas", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina', "12-15 rep"), safeSlot(['perna_posterior_gluteo'], 'halter', "12-15 rep"), safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep") ] }
                ];
            } else if (subOpt === 'C') {
                blueprint = [
                    { title: "Dorsais", slots: [ safeSlot(['costa_largura'], 'barra', "8-10 rep"), safeSlot(['costa_espessura'], 'maquina', "10-12 rep"), safeSlot(['costa_isolado'], 'cabo', "12-15 rep"), safeSlot(['costa'], 'halter', "10-12 rep") ] },
                    { title: "Bíceps & Trapézio", slots: [ safeSlot(['biceps_longa'], 'barra', "10-12 rep"), safeSlot(['biceps_curta'], 'halter', "10-12 rep"), safeSlot(['biceps_braquial'], 'cabo', "12-15 rep") ] },
                    { title: "Core Inferior", slots: [ safeSlot(['core_infra'], null, "15-20 rep") ] }
                ];
            } else if (subOpt === 'D') {
                blueprint = [
                    { title: "Deltoides", slots: [ safeSlot(['ombro_anterior'], 'halter', "8-10 rep"), safeSlot(['ombro_lateral'], 'halter', "10-12 rep"), safeSlot(['ombro_posterior'], 'cabo', "12-15 rep") ] },
                    { title: "Posterior e Glúteo", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep") ] },
                    { title: "Quadríceps e Panturrilha", slots: [ safeSlot(['perna_quadriceps'], 'maquina', "12-15 rep"), safeSlot(['perna_quadriceps'], 'halter', "12-15 rep"), safeSlot(['panturrilha_soleo'], 'maquina', "15-20 rep") ] }
                ];
            }
        }
        blueprint.forEach(b => {
            const validExs = b.slots.filter(s => s !== null);
            if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
        });
    } 
    
    // --- BI-SETS ANTAGONISTA DINÂMICO (IA DA FORJA) ---
    else if (method === 'biset_antagonista') {
        let primaryTargets = [];
        
        if (subOpt === 'A' || subOpt.includes('peito')) {
            primaryTargets = ['peito', 'peito', 'peito', 'peito']; 
        } else if (subOpt === 'B' || subOpt.includes('quad') || subOpt.includes('perna')) {
            primaryTargets = ['perna', 'perna', 'perna']; 
        } else {
            primaryTargets = ['ombro', 'biceps', 'triceps']; 
        }

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
                generatedBlocks.push({
                    title: `Série ${idx + 1}: Isolado (Falta Par)`,
                    exercises: [{ name: pair.exercicioA.name, sets: 4, target: "10-12 rep", antagonist: 'Nenhum' }]
                });
            }
        });
        
        const coreEx = safeSlot(['core_supra', 'core_infra', 'core_obliquo', 'core_profundo'], null, "15-20 rep");
        if (coreEx) generatedBlocks.push({ title: "Finisher: Core", exercises: [coreEx] });
    }
    
    // --- BI-SETS AGONISTA (PRÉ-EXAUSTÃO) ---
    else if (method === 'biset_agonista') {
        let blueprint = [];
        let isA = (subOpt === 'A' || subOpt.includes('peito'));
        let isB = (subOpt === 'B' || subOpt.includes('costa'));

        if (routeProfile === 'feminino') {
            if (isA) { 
                blueprint = [
                    { title: "Série 1: Peito Sup Isolado + Composto", slots: [ safeSlot(['peito_clavicular'], 'halter'), safeSlot(['peito_clavicular'], 'barra') ] },
                    { title: "Série 2: Peito Médio + Inferior", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['peito_costal'], 'cabo') ] },
                    { title: "Série 3: Deltoide Lateral Exaustão + Core", slots: [ safeSlot(['ombro_lateral'], 'halter'), safeSlot(['core_obliquo'], 'peso_corporal') ] },
                    { title: "Isolamento Finais", slots: [ safeSlot(['ombro_anterior'], 'halter'), safeSlot(['triceps_global'], 'cabo') ] }
                ];
            } else if (isB) {
                blueprint = [
                    { title: "Série 1: Costas Largura Iso + Comp", slots: [ safeSlot(['costa_largura'], 'cabo'), safeSlot(['costa_largura'], 'maquina') ] },
                    { title: "Série 2: Costas Espessura + Lombar", slots: [ safeSlot(['costa_espessura'], 'barra'), safeSlot(['costa'], 'peso_corporal') ] },
                    { title: "Série 3: Bíceps + Core", slots: [ safeSlot(['biceps_longa'], 'barra'), safeSlot(['core_infra'], 'peso_corporal') ] },
                    { title: "Isolamento Finais", slots: [ safeSlot(['ombro_posterior'], 'halter'), safeSlot(['biceps_braquial'], 'cabo') ] }
                ];
            } else {
                blueprint = [
                    { title: "Série 1: Quadríceps Iso + Comp", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_quadriceps'], 'barra') ] },
                    { title: "Série 2: Isquiotibiais Iso + Comp", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'barra') ] },
                    { title: "Série 3: Glúteos + Panturrilhas", slots: [ safeSlot(['perna_posterior_gluteo'], 'cabo'), safeSlot(['panturrilha_gastro'], 'maquina') ] }
                ];
            }
        } else {
            if (isA) {
                blueprint = [
                    { title: "Série 1: Peitoral Médio + Superior", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['peito_clavicular'], 'barra') ] },
                    { title: "Série 2: Peitoral Inferior + Isolamento", slots: [ safeSlot(['peito_costal'], 'cabo'), safeSlot(['peito'], 'maquina') ] },
                    { title: "Série 3: Deltoide Lateral + Core", slots: [ safeSlot(['ombro_lateral'], 'halter'), safeSlot(['core_supra'], 'peso_corporal') ] },
                    { title: "Isolamentos", slots: [ safeSlot(['ombro_anterior'], 'halter'), safeSlot(['ombro_posterior'], 'cabo') ] }
                ];
            } else if (isB) {
                blueprint = [
                    { title: "Série 1: Costas Largura + Espessura", slots: [ safeSlot(['costa_largura'], 'cabo'), safeSlot(['costa_espessura'], 'barra') ] },
                    { title: "Série 2: Costas Foco + Lombar", slots: [ safeSlot(['costa_isolado'], 'halter'), safeSlot(['costa'], 'peso_corporal') ] },
                    { title: "Série 3: Bíceps Longa + Core", slots: [ safeSlot(['biceps_longa'], 'barra'), safeSlot(['core_obliquo'], 'peso_corporal') ] }, 
                    { title: "Isolamentos", slots: [ safeSlot(['biceps_curta'], 'halter'), safeSlot(['biceps_braquial'], 'cabo') ] }
                ];
            } else {
                blueprint = [
                    { title: "Série 1: Quadríceps Reto + Vastos", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_quadriceps'], 'barra') ] },
                    { title: "Série 2: Isquio Encurtada + Alongada", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'barra') ] },
                    { title: "Série 3: Glúteo + Panturrilhas", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra'), safeSlot(['panturrilha_gastro'], 'maquina') ] }
                ];
            }
        }
        blueprint.forEach(b => {
            const validExs = b.slots.filter(s => s !== null);
            if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
        });
    }
    
    // --- BI-SETS SINERGISTA ---
    else if (method === 'biset_sinergista') {
        let blueprint = [];
        let isA = (subOpt === 'A' || subOpt.includes('peito'));
        let isB = (subOpt === 'B' || subOpt.includes('costa'));

        if (routeProfile === 'feminino') {
            if (isA) {
                blueprint = [
                    { title: "Série 1: Quadríceps + Glúteo", slots: [ safeSlot(['perna_quadriceps'], 'barra'), safeSlot(['perna_posterior_gluteo'], 'barra') ] },
                    { title: "Série 2: Isquiotibiais + Glúteo Isolado", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'cabo') ] },
                    { title: "Série 3: Adutores + Core", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina'), safeSlot(['core_supra'], 'peso_corporal') ] }
                ];
            } else if (isB) {
                blueprint = [
                    { title: "Série 1: Costas + Bíceps", slots: [ safeSlot(['costa_largura'], 'maquina'), safeSlot(['biceps_longa'], 'halter') ] },
                    { title: "Série 2: Peito + Tríceps", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['triceps_lateral_medial'], 'cabo') ] },
                    { title: "Série 3: Ombros + Core", slots: [ safeSlot(['ombro_anterior'], 'halter'), safeSlot(['core_obliquo'], 'peso_corporal') ] }
                ];
            } else {
                blueprint = [
                    { title: "Série 1: Quadríceps Foco", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_quadriceps'], 'halter') ] },
                    { title: "Série 2: Isquiotibiais Foco", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'halter') ] },
                    { title: "Série 3: Panturrilhas + Core", slots: [ safeSlot(['panturrilha_gastro'], 'maquina'), safeSlot(['core_infra'], 'peso_corporal') ] }
                ];
            }
        } else {
            if (isA) {
                blueprint = [
                    { title: "Série 1: Peitoral Sup + Tríceps Longa", slots: [ safeSlot(['peito_clavicular'], 'barra'), safeSlot(['triceps_longa'], 'halter') ] },
                    { title: "Série 2: Peitoral Med + Tríceps Lateral", slots: [ safeSlot(['peito_esternocostal'], 'halter'), safeSlot(['triceps_lateral_medial'], 'cabo') ] },
                    { title: "Série 3: Peitoral Inf + Core", slots: [ safeSlot(['peito_costal'], 'cabo'), safeSlot(['core_obliquo'], 'peso_corporal') ] },
                    { title: "Isolamentos", slots: [ safeSlot(['peito'], 'maquina'), safeSlot(['triceps_global'], 'cabo') ] }
                ];
            } else if (isB) {
                blueprint = [
                    { title: "Série 1: Costas Largura + Bíceps", slots: [ safeSlot(['costa_largura'], 'maquina'), safeSlot(['biceps_longa'], 'barra') ] },
                    { title: "Série 2: Costas Espessura + Braquial", slots: [ safeSlot(['costa_espessura'], 'barra'), safeSlot(['biceps_braquial'], 'cabo') ] },
                    { title: "Série 3: Costas Isolado + Core", slots: [ safeSlot(['costa_isolado'], 'halter'), safeSlot(['core_profundo'], 'peso_corporal') ] },
                    { title: "Isolamentos", slots: [ safeSlot(['costa'], 'peso_corporal'), safeSlot(['biceps_curta'], 'halter') ] }
                ];
            } else {
                blueprint = [
                    { title: "Série 1: Quadríceps + Panturrilha", slots: [ safeSlot(['perna_quadriceps'], 'barra'), safeSlot(['panturrilha_gastro'], 'maquina') ] },
                    { title: "Série 2: Isquio + Glúteo", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra'), safeSlot(['perna_posterior_gluteo'], 'maquina') ] },
                    { title: "Série 3: Quad + Isquio Encurtada", slots: [ safeSlot(['perna_quadriceps'], 'maquina'), safeSlot(['perna_posterior_gluteo'], 'maquina') ] }
                ];
            }
        }
        blueprint.forEach(b => {
            const validExs = b.slots.filter(s => s !== null);
            if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
        });
    }
    
    // --- CIRCUITO METABÓLICO ---
    else if (method === 'circuito') {
        let blueprint = [];
        if (rawProfile === 'definicao') {
            blueprint = [{
                title: "Circuito Extremo (Derretedor)",
                slots: [
                    safeSlot(['esporte_aceleracao', 'cardio_motor'], 'peso_corporal', "30 seg"),
                    safeSlot(['perna_quadriceps'], 'peso_corporal', "15-20 rep"),
                    safeSlot(['costa_largura'], 'maquina', "15-20 rep"),
                    safeSlot(['perna_posterior_gluteo'], 'halter', "15-20 rep"),
                    safeSlot(['peito_esternocostal'], 'peso_corporal', "15-20 rep"),
                    safeSlot(['esporte_pliometria'], 'peso_corporal', "45 seg"),
                    safeSlot(['core_profundo', 'core_supra'], 'peso_corporal', "1 min"),
                    safeSlot(['cardio_resistencia'], 'peso_corporal', "Até a falha")
                ]
            }];
        } else {
            blueprint = [{
                title: "Rodada Metabólica FullBody",
                slots: [
                    safeSlot(['outros', 'mobilidade', 'cardio_motor'], null, "1 min"),
                    safeSlot(['esporte_pliometria', 'cardio_motor'], 'peso_corporal', "45 seg"),
                    safeSlot(['perna_quadriceps'], 'peso_corporal', "15-20 rep"),
                    safeSlot(['costa_espessura', 'costa_largura'], 'maquina', "15-20 rep"),
                    safeSlot(['perna_posterior_gluteo'], 'halter', "15-20 rep"),
                    safeSlot(['peito_esternocostal', 'ombro_anterior'], 'peso_corporal', "15-20 rep"),
                    safeSlot(['core_obliquo', 'core_supra'], 'peso_corporal', "15-20 rep"),
                    safeSlot(['cardio_resistencia', 'cardio_motor'], 'peso_corporal', "1 min")
                ]
            }];
        }
        blueprint.forEach(b => {
            const validExs = b.slots.filter(s => s !== null);
            if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
        });
    }
    
    // --- CALISTENIA ---
    else if (method === 'calistenia') {
        let blueprint = [];
        let isA = (subOpt === 'A' || subOpt === 'push');
        let isB = (subOpt === 'B' || subOpt === 'pull');
        
        if (routeProfile === 'feminino') {
            if (isA) {
                blueprint = [
                    { title: "Força Inferior Frontal", slots: [ safeSlot(['perna_quadriceps'], 'peso_corporal', "Falha"), safeSlot(['perna_quadriceps'], 'peso_corporal', "Falha") ] },
                    { title: "Força Inferior Posterior", slots: [ safeSlot(['perna_posterior_gluteo'], 'peso_corporal', "Falha"), safeSlot(['perna_posterior_gluteo'], 'peso_corporal', "Falha") ] },
                    { title: "Core Isométrico", slots: [ safeSlot(['core_profundo'], 'peso_corporal', "Isometria Máx") ] }
                ];
            } else if (isB) {
                blueprint = [
                    { title: "Core Dinâmico", slots: [ safeSlot(['core_supra'], 'peso_corporal', "20 rep"), safeSlot(['core_infra'], 'peso_corporal', "20 rep") ] },
                    { title: "Estabilidade Inferior", slots: [ safeSlot(['perna_adutor_abdutor'], 'peso_corporal', "20 rep"), safeSlot(['panturrilha_gastro'], 'peso_corporal', "Falha") ] }
                ];
            } else {
                blueprint = [
                    { title: "FullBody Calistenia", slots: [ safeSlot(['perna_quadriceps'], 'peso_corporal', "Falha"), safeSlot(['perna_posterior_gluteo'], 'peso_corporal', "Falha"), safeSlot(['core_supra'], 'peso_corporal', "Falha") ] }
                ];
            }
        } else {
            if (isA) {
                blueprint = [
                    { title: "Força Relativa (Empurrar)", slots: [ safeSlot(['peito_esternocostal', 'peito_clavicular'], 'calistenia', "Falha"), safeSlot(['triceps_global'], 'peso_corporal', "Falha") ] },
                    { title: "Isolamento Corporal", slots: [ safeSlot(['peito_esternocostal'], 'peso_corporal', "Falha") ] },
                    { title: "Core Isométrico", slots: [ safeSlot(['core_profundo'], 'peso_corporal', "Isometria Máx") ] }
                ];
            } else if (isB) {
                blueprint = [
                    { title: "Força Relativa (Puxar)", slots: [ safeSlot(['costa_largura'], 'calistenia', "Falha"), safeSlot(['biceps_global'], 'calistenia', "Falha") ] },
                    { title: "Sinergia Corporal", slots: [ safeSlot(['costa_espessura'], 'calistenia', "Falha") ] },
                    { title: "Core Dinâmico", slots: [ safeSlot(['core_supra', 'core_infra'], 'peso_corporal', "Falha") ] }
                ];
            } else {
                blueprint = [
                    { title: "Base Inferior", slots: [ safeSlot(['perna_quadriceps'], 'peso_corporal', "Falha"), safeSlot(['perna_posterior_gluteo'], 'peso_corporal', "Falha") ] },
                    { title: "Resistência", slots: [ safeSlot(['panturrilha_gastro'], 'peso_corporal', "Falha") ] }
                ];
            }
        }
        blueprint.forEach(b => {
            const validExs = b.slots.filter(s => s !== null);
            if (validExs.length > 0) generatedBlocks.push({ title: b.title, exercises: validExs });
        });
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