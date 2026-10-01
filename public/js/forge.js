
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
            subBox.style.display = 'none'; // Circuito e Calistenia não precisam de sub-opção
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

        // UNIFICAÇÃO TÁTICA: O modal da Forja agora usa o Cérebro Neural Principal
        // Isso elimina o código legado e herda: Arsenal, Volume Dinâmico e Gravidade de Core.
        state.currentRoutine = executeForgeLogic(method, subOpt, []);
        state.currentWorkoutType = 'Livre';
        
        document.getElementById('forgeModal').style.display = 'none';
        
        // Dispara o motor de carregamento para abrir a tela de visualização (Preview)
        window.FitApp.loadWorkout(); 
        
        // Formatação inteligente do Título baseada na seleção
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
        
        // NOVO: Captura o Nível do Atleta (Limita o SNC)
        const userLevel = state.els.levelSelector ? state.els.levelSelector.value : 'intermediario';
        const maxAllowedLevel = userLevel === 'iniciante' ? 1 : (userLevel === 'intermediario' ? 2 : 3);

        // NOVO: Puxa o arsenal diretamente dos botões na interface
        const equipChips = document.querySelectorAll('.forge-equip-chip.active');
        let userArsenal = ['Barra', 'Halter', 'Máquina', 'Cabo', 'Peso Corporal', 'Calistenia']; 
        if (equipChips && equipChips.length > 0) {
            userArsenal = [];
            equipChips.forEach(c => {
                const tags = c.getAttribute('data-equip').split(',');
                // 🛡️ TRADUTOR UNIVERSAL: Converte as tags antigas do HTML para o novo Banco de Dados
                tags.forEach(tag => {
                    const t = tag.trim();
                    if (t === 'Barras_Anilhas') userArsenal.push('Barra');
                    if (t === 'Pesos_Livres') userArsenal.push('Halter');
                    if (t === 'Maquinas_Polias') userArsenal.push('Máquina', 'Cabo');
                    if (t === 'Peso_Corporal') userArsenal.push('Peso Corporal');
                    if (t === 'Calistenia') userArsenal.push('Calistenia');
                });
            });
            userArsenal.push('Funcional_Esportivo'); // Blinda o motor de cardio
        }

        const getEx = (focusTerms, equipPref, avoidNames, allowBodyweight = false) => {
            // A Pedra de Roseta: Expandida e Sincronizada com o novo banco de dados (dados_consolidados.js)
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
                'triceps_longa': ['Cabeça Longa', 'Tríceps (Complexo Completo)'], 
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
            // 🛡️ Tradutor de preferência (EquipPref do motor antigo para o novo banco)
            const mapEquip = { 'barra': 'Barra', 'halter': 'Halter', 'maquina': 'Máquina', 'cabo': 'Cabo', 'peso_corporal': 'Peso Corporal', 'calistenia': 'Calistenia' };

            // ⬇️ COLE O CÓDIGO NOVO EXATAMENTE AQUI ⬇️
            // 🛡️ FIREWALL SEMÂNTICO: Atualizado para ler o novo arsenal
            const isNameAllowed = (exName) => {
                const nome = (exName || '').toLowerCase();
                
                // MODO CASA: Bloqueia bolas, anéis, argolas, barras (mesmo as de porta), halteres e máquinas
                if (userArsenal.includes('Peso Corporal') && !userArsenal.includes('Calistenia') && !userArsenal.includes('Halter')) {
                    if (/bola|anel|argola|barra|tração|tracao|haltere|anilhas|maquina|máquina|polia/.test(nome) && !nome.includes('peso corporal')) {
                        return false;
                    }
                }
                
                // MODO PARQUE: Permite barras (fixas/paralelas), mas bloqueia pesos e máquinas de academia
                if (!userArsenal.includes('Halter') && !userArsenal.includes('Barra') && !userArsenal.includes('Máquina')) {
                    if (/haltere|anilhas|maquina|máquina|polia|cabo/.test(nome)) return false;
                    if (nome.includes('barra') && !/barra fixa|paralela/.test(nome)) return false;
                }
                
                return true;
            };

            // Função validadora de Grupo Muscular Base
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

                // FILTRO DE DIFICULDADE (SNC)
                const exNivel = d.nivel || 1;
                if (exNivel > maxAllowedLevel) return false;

                // ESCUDO PRIMÁRIO: O exercício pertence à macro-região certa?
                if (!checkBaseGroup(exGroup, focusTerms)) return false;

                const validFocuses = focusTerms.flatMap(term => mapFocus[term] || [term]);
                const matchFocus = validFocuses.includes(exFocus) || validFocuses.some(f => exGroup.includes(f));
                
                // NOVO: Filtro de Arsenal do Usuário
                const exEquipsArray = exEquip.split(',').map(e => e.trim());
                const isArsenalAllowed = exEquipsArray.some(eq => userArsenal.includes(eq));
                if (!isArsenalAllowed && exEquip !== '') return false; // Aborta se ele não possui as armas necessárias

                // ⬇️ INSERÇÃO 1: FIREWALL SEMÂNTICO AQUI ⬇️
                if (!isNameAllowed(d.name)) return false;

                // A Preferência do Blueprint é respeitada apenas se estiver dentro do Arsenal permitido
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

                    // FILTRO DE DIFICULDADE (SNC) FALLBACK
                    const exNivel = d.nivel || 1;
                    if (exNivel > maxAllowedLevel && exNivel > (maxAllowedLevel + 1)) return false; 

                    if (!checkBaseGroup(exGroup, focusTerms)) return false;
                    
                    // NOVO: Filtro de Arsenal no Fallback
                    const exEquipsArray = exEquip.split(',').map(e => e.trim());
                    const isArsenalAllowed = exEquipsArray.some(eq => userArsenal.includes(eq));
                    if (!isArsenalAllowed && exEquip !== '') return false;

                    // ⬇️ INSERÇÃO 2: FIREWALL SEMÂNTICO AQUI ⬇️
                    if (!isNameAllowed(d.name)) return false;

                    const validFocuses = focusTerms.flatMap(term => mapFocus[term] || [term]);
                    return (validFocuses.includes(exFocus) || validFocuses.some(f => exGroup.includes(f))) && !avoidNames.includes(d.name);
                });
            }

            // 🛡️ FALLBACK ABSOLUTO: Previne ecrãs vazios se os filtros biomecânicos falharem
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
                // 🏋️ PRIORIDADE DE ACADEMIA: Se tem ferro no arsenal, descarta peso corporal (a menos que seja a única opção)
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

        // 🛡️ O ESCUDO BIOMECÂNICO (Otimizado para Opção A: Volume Dinâmico Anti-Repetição)
        const safeSlot = (focusArr, equip = null, target = "10-12 rep") => {
            let ex = getEx(focusArr, equip, used);
            
            // Fallback 1: Tenta sem a restrição de equipamento, mas MANTÉM a trava de repetição (used)
            if (!ex && equip) ex = getEx(focusArr, null, used); 
            
            // Fallback 2: Tenta buscar pelo grupo muscular pai, MANTENDO a trava de repetição
            if (!ex) {
                const parentTerm = focusArr[0].split('_')[0]; 
                ex = getEx([parentTerm], null, used);
            }
            
            // Se encontrou um exercício INÉDITO, salva no array e envia para a tela
            if (ex) {
                used.push(ex.name);
                return { name: ex.name, sets: 4, target: target };
            }
            
            // OPÇÃO A: Se o estoque acabou, retorna nulo para o motor cortar este espaço do treino
            return null;
        };

        // --- SISTEMA ABC / PPL (Etapa Alpha: Distribuição 4/4/3/3/3/Completa) ---
        if (method === 'abc' || method === 'ppl') {
            let blueprint = [];
            
            if (routeProfile === 'feminino') {
                if (subOpt === 'push' || subOpt === 'A') { // Treino A (Posterior Expandido)
                    blueprint = [
                        { title: "Posteriores Base (2 Ex)", slots: [ safeSlot(['perna_posterior_gluteo'], 'barra', "10-12 rep"), safeSlot(['perna_posterior_gluteo'], 'maquina', "10-12 rep") ] },
                        { title: "Glúteos & Isolamento (2 Ex)", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep"), safeSlot(['perna_posterior_gluteo'], 'cabo', "12-15 rep") ] },
                        { title: "Panturrilhas", slots: [ safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep") ] },
                        { title: "Core Finisher", slots: [ safeSlot(['core_supra', 'core_infra'], null, "15-20 rep") ] }
                    ];
                } else if (subOpt === 'pull' || subOpt === 'B') { // Treino B (Superiores Completo)
                    blueprint = [
                        { title: "Costas (4 Exercícios)", slots: [ safeSlot(['costa_largura'], 'maquina', "10-12 rep"), safeSlot(['costa_espessura'], 'barra', "10-12 rep"), safeSlot(['costa_isolado'], 'cabo', "12-15 rep"), safeSlot(['costa'], 'halter', "12-15 rep") ] },
                        { title: "Peitoral (4 Exercícios)", slots: [ safeSlot(['peito_clavicular'], 'halter', "12-15 rep"), safeSlot(['peito_esternocostal'], 'halter', "10-12 rep"), safeSlot(['peito_costal'], 'cabo', "12-15 rep"), safeSlot(['peito'], 'maquina', "10-12 rep") ] },
                        { title: "Braços Isolados", slots: [ safeSlot(['triceps_global'], 'cabo', "12-15 rep"), safeSlot(['biceps_global'], 'halter', "12-15 rep") ] }
                    ];
                } else { // Treino C (Anterior Expandido)
                    blueprint = [
                        { title: "Quadríceps (2 Exercícios)", slots: [ safeSlot(['perna_quadriceps'], 'barra', "10-12 rep"), safeSlot(['perna_quadriceps'], 'halter', "10-12 rep") ] },
                        { title: "Adutores & Panturrilhas", slots: [ safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep"), safeSlot(['panturrilha_soleo'], 'maquina', "15-20 rep") ] },
                        { title: "Ombros (3 Exercícios)", slots: [ safeSlot(['ombro_anterior'], 'halter', "10-12 rep"), safeSlot(['ombro_lateral'], 'halter', "12-15 rep"), safeSlot(['ombro_posterior'], 'cabo', "12-15 rep") ] }
                    ];
                }
            } else {
                if (subOpt === 'push' || subOpt === 'A') { // PEITO (4), OMBRO (3), TRICEPS (3)
                    blueprint = [
                        { title: "Peitoral Base", slots: [ safeSlot(['peito_clavicular'], 'barra', "8-10 rep"), safeSlot(['peito_esternocostal'], 'halter', "8-10 rep") ] },
                        { title: "Peitoral Isolamento", slots: [ safeSlot(['peito_costal'], 'cabo', "10-12 rep"), safeSlot(['peito_esternocostal'], 'maquina', "10-12 rep") ] },
                        { title: "Deltoides", slots: [ safeSlot(['ombro_anterior'], 'halter', "10-12 rep"), safeSlot(['ombro_lateral'], 'halter', "12-15 rep"), safeSlot(['ombro_posterior'], 'cabo', "12-15 rep") ] },
                        { title: "Tríceps & Core", slots: [ safeSlot(['triceps_longa'], 'halter', "10-12 rep"), safeSlot(['triceps_lateral_medial'], 'cabo', "12-15 rep"), safeSlot(['triceps_global'], 'cabo', "12-15 rep"), safeSlot(['core_supra'], null, "15-20 rep") ] }
                    ];
                } else if (subOpt === 'pull' || subOpt === 'B') { // COSTAS (4), BICEPS (3) + TRAPEZIO E CORE
                    blueprint = [
                        { title: "Dorsais Base", slots: [ safeSlot(['costa_largura'], 'barra', "8-10 rep"), safeSlot(['costa_espessura'], 'maquina', "8-10 rep") ] },
                        { title: "Dorsais Isolamento", slots: [ safeSlot(['costa_isolado', 'costa'], 'cabo', "10-12 rep"), safeSlot(['costa_largura'], 'halter', "10-12 rep") ] },
                        { title: "Bíceps", slots: [ safeSlot(['biceps_longa'], 'barra', "10-12 rep"), safeSlot(['biceps_curta'], 'halter', "10-12 rep"), safeSlot(['biceps_braquial'], 'cabo', "12-15 rep") ] },
                        { title: "Trapézio & Core", slots: [ safeSlot(['trapezio'], 'halter', "12-15 rep"), safeSlot(['core_obliquo'], null, "15-20 rep") ] }
                    ];
                } else { // LEGS COMPLETAS (2 Quad, 2 Post, 1 Glúteo, 1 Panturrilha) + CORE
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
                if (validExs.length > 0) {
                    generatedBlocks.push({ title: b.title, exercises: validExs });
                }
            });
        }
        
        // --- SISTEMA ABCD (Etapa Bravo: Distribuição 4/4/3/3/3/Completa) ---
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
                if (subOpt === 'A') { // Peito (4) e Tríceps (3)
                    blueprint = [
                        { title: "Peitoral", slots: [ safeSlot(['peito_clavicular'], 'barra', "8-10 rep"), safeSlot(['peito_esternocostal'], 'halter', "10-12 rep"), safeSlot(['peito_costal'], 'cabo', "12-15 rep"), safeSlot(['peito'], 'maquina', "10-12 rep") ] },
                        { title: "Tríceps", slots: [ safeSlot(['triceps_longa'], 'halter', "10-12 rep"), safeSlot(['triceps_lateral_medial'], 'cabo', "12-15 rep"), safeSlot(['triceps_global'], 'cabo', "12-15 rep") ] },
                        { title: "Core Superior", slots: [ safeSlot(['core_supra'], null, "15-20 rep") ] }
                    ];
                }
                else if (subOpt === 'B') { // Foco Anterior (Pernas Completas - 6)
                    blueprint = [
                        { title: "Quadríceps & Glúteo", slots: [ safeSlot(['perna_quadriceps'], 'barra', "8-10 rep"), safeSlot(['perna_quadriceps'], 'maquina', "10-12 rep"), safeSlot(['perna_adutor_abdutor'], 'maquina', "12-15 rep") ] },
                        { title: "Isquiotibiais & Panturrilhas", slots: [ safeSlot(['perna_posterior_gluteo'], 'maquina', "12-15 rep"), safeSlot(['perna_posterior_gluteo'], 'halter', "12-15 rep"), safeSlot(['panturrilha_gastro'], 'maquina', "15-20 rep") ] }
                    ];
                }
                else if (subOpt === 'C') { // Costas (4) e Bíceps (3)
                    blueprint = [
                        { title: "Dorsais", slots: [ safeSlot(['costa_largura'], 'barra', "8-10 rep"), safeSlot(['costa_espessura'], 'maquina', "10-12 rep"), safeSlot(['costa_isolado'], 'cabo', "12-15 rep"), safeSlot(['costa'], 'halter', "10-12 rep") ] },
                        { title: "Bíceps & Trapézio", slots: [ safeSlot(['biceps_longa'], 'barra', "10-12 rep"), safeSlot(['biceps_curta'], 'halter', "10-12 rep"), safeSlot(['biceps_braquial'], 'cabo', "12-15 rep") ] },
                        { title: "Core Inferior", slots: [ safeSlot(['core_infra'], null, "15-20 rep") ] }
                    ];
                }
                else if (subOpt === 'D') { // Ombros (3) e Perna Posterior Completa (6)
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
            
            // Define o número de batalhas (pares) com base na seleção
            if (subOpt === 'A' || subOpt.includes('peito_costa') || subOpt.includes('peito_biceps') || subOpt.includes('costa_triceps')) {
                primaryTargets = ['peito', 'peito', 'peito', 'peito']; // 4 Séries
            } else if (subOpt === 'B' || subOpt.includes('biceps_triceps') || subOpt.includes('quad_post')) {
                const target = subOpt.includes('quad') ? 'pernas' : 'biceps';
                primaryTargets = [target, target, target]; // 3 Séries
            } else {
                primaryTargets = ['ombros', 'ombros', 'ombros']; // 3 Séries
            }

            // O Motor acopla os pares dinamicamente lendo as propriedades da base de dados
            primaryTargets.forEach((target, idx) => {
                const pair = forgeSmartBiset(target, userArsenal, used);
                
                if (pair && pair.exercicioA && pair.exercicioB) {
                    generatedBlocks.push({
                        title: `Série ${idx + 1}: Combate Biomecânico`,
                        exercises: [
                            // Envia a propriedade antagonist para o ui.js desenhar o ⚔️
                            { name: pair.exercicioA.name, sets: 4, target: "10-12 rep", antagonist: pair.exercicioA.antagonist },
                            { name: pair.exercicioB.name, sets: 4, target: "10-12 rep", antagonist: pair.exercicioB.antagonist }
                        ]
                    });
                } else if (pair && pair.exercicioA) {
                    // Fallback de contingência caso a base de dados falhe em encontrar o oposto
                    generatedBlocks.push({
                        title: `Série ${idx + 1}: Isolado (Falta Par)`,
                        exercises: [{ name: pair.exercicioA.name, sets: 4, target: "10-12 rep", antagonist: 'Nenhum' }]
                    });
                }
            });
            
            // Adiciona um Core Finisher Estático por segurança no final do treino
            const coreEx = safeSlot(['core_supra', 'core_infra', 'core_obliquo', 'core_profundo'], null, "15-20 rep");
            if (coreEx) generatedBlocks.push({ title: "Finisher: Core", exercises: [coreEx] });
        }

        // ==========================================================
        // 🧲 ALGORITMO DE GRAVIDADE (CORE FINISHER)
        // ==========================================================
        const isCoreEx = (exName) => {
            const dictItem = typeof window.dictionaryData !== 'undefined' ? window.dictionaryData.find(d => d.name === exName) : null;
            if (dictItem) {
                const g = (dictItem.group || '').toLowerCase();
                const f = (dictItem.focus || '').toLowerCase();
                return g.includes('core') || f.includes('obliquo') || f.includes('abdom') || f.includes('estabiliza');
            }
            return false;
        };

        // 1. Gravidade Interna: Empurra o abdômen para o final da sua própria caixa (Vital para Circuitos)
        generatedBlocks.forEach(bloco => {
            bloco.exercises.sort((a, b) => {
                const aCore = isCoreEx(a.name);
                const bCore = isCoreEx(b.name);
                if (aCore && !bCore) return 1;
                if (!aCore && bCore) return -1;
                return 0;
            });
        });

        // 2. Gravidade Externa: Empurra o bloco inteiro para o final do treino
        generatedBlocks.sort((a, b) => {
            const aHasCore = a.exercises.some(ex => isCoreEx(ex.name)) || a.title.toLowerCase().includes('core');
            const bHasCore = b.exercises.some(ex => isCoreEx(ex.name)) || b.title.toLowerCase().includes('core');
            if (aHasCore && !bHasCore) return 1;
            if (!aHasCore && bHasCore) return -1;
            return 0;
        });

        // ==========================================================
        // 🕒 MANIPULAÇÃO DINÂMICA DO RELÓGIO DE DESCANSO
        // ==========================================================
        setTimeout(() => {
            if (typeof FitApp !== 'undefined' && FitApp.adjustRestTime) {
                if (rawProfile === 'definicao') FitApp.adjustRestTime(method === 'circuito' ? 30 : 45);
                else FitApp.adjustRestTime(method === 'circuito' ? 45 : 60);
            }
        }, 500);

        if(generatedBlocks.length === 0) generatedBlocks = [{ title: "Rotina de Contingência", exercises: [] }];
        return generatedBlocks;
    }
/**
 * Forja um Bi-set Inteligente (Agonista + Antagonista)
 * @param {string} primaryMuscle O grupo muscular alvo primário (ex: 'Peito')
 * @param {array} userArsenal Os equipamentos disponíveis
 * @param {string} env O ambiente de treino ('academia' ou 'casa')
 */
/**
 * Motor de Emparelhamento de Bi-Set Antagonista (Blindado)
 */
export function forgeSmartBiset(primaryMuscle, userArsenal, avoidNames = []) {
    if (!window.dictionaryData || window.dictionaryData.length === 0) return null;

    // 1. Captação do Exercício Agonista (Com trava anti-repetição)
    let poolA = window.dictionaryData.filter(d => 
        ((d.group && d.group.toLowerCase() === primaryMuscle.toLowerCase()) || 
        (d.agonist && d.agonist.toLowerCase() === primaryMuscle.toLowerCase())) &&
        !avoidNames.includes(d.name)
    );

    if (poolA.length === 0) return null;
    
    // Filtro de Arsenal
    if (userArsenal && userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq))) {
        const heavyA = poolA.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
        if (heavyA.length > 0) poolA = heavyA;
    }

    const exA = poolA[Math.floor(Math.random() * poolA.length)];
    avoidNames.push(exA.name); // Salva na memória para não repetir no treino

    // 2. Captação do Exercício Antagonista (Com trava anti-repetição)
    if (!exA.antagonist || exA.antagonist === 'Nenhum') return { exercicioA: exA, exercicioB: null };

    let poolB = window.dictionaryData.filter(d => 
        ((d.agonist && d.agonist.toLowerCase() === exA.antagonist.toLowerCase()) || 
        (d.group && d.group.toLowerCase() === exA.antagonist.toLowerCase())) &&
        !avoidNames.includes(d.name)
    );

    // Filtro de Arsenal (Reverso)
    if (userArsenal && userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq))) {
        const heavyB = poolB.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
        if (heavyB.length > 0) poolB = heavyB;
    }

    const exB = poolB.length > 0 ? poolB[Math.floor(Math.random() * poolB.length)] : null;
    if (exB) avoidNames.push(exB.name); // Salva na memória

    return { exercicioA: exA, exercicioB: exB };
}