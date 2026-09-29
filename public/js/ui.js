import { state } from './state.js';
import { escapeHTML, parseSafeFloat, getMuscleGroup } from './utils.js';

    export function renderLibrary() {
        const grid = document.getElementById('libraryGrid');
        if (!grid) return;
        grid.innerHTML = '';

        // 1. O Funil Absoluto: Força a categorização em apenas 8 gavetas limpas
        const categorize = (item) => {
            const searchStr = ((item.group || '') + ' ' + (item.focus || '')).toLowerCase();
            if (searchStr.includes('peito') || searchStr.includes('peitoral')) return 'peito';
            if (searchStr.includes('costa') || searchStr.includes('dorsal') || searchStr.includes('trapézio') || searchStr.includes('trapezio') || searchStr.includes('lombar') || searchStr.includes('romboide')) return 'costas';
            if (searchStr.includes('perna') || searchStr.includes('quadríceps') || searchStr.includes('quadriceps') || searchStr.includes('glúteo') || searchStr.includes('gluteo') || searchStr.includes('isquiotibial') || searchStr.includes('panturrilha')) return 'pernas';
            if (searchStr.includes('ombro') || searchStr.includes('deltoide')) return 'ombros';
            if (searchStr.includes('tríceps') || searchStr.includes('triceps')) return 'triceps';
            if (searchStr.includes('bíceps') || searchStr.includes('biceps') || searchStr.includes('braquial')) return 'biceps';
            if (searchStr.includes('core') || searchStr.includes('abdom') || searchStr.includes('oblíquo') || searchStr.includes('obliquo')) return 'core';
            return 'outros';
        };

        const groups = { 'peito': [], 'costas': [], 'pernas': [], 'ombros': [], 'triceps': [], 'biceps': [], 'core': [], 'outros': [] };
        
        // Distribui o arsenal massivo nas gavetas corretas
        window.dictionaryData.forEach(item => {
            const key = categorize(item);
            groups[key].push(item);
        });

        const groupTitles = {
            'peito': '🟦 Peitoral',
            'costas': '🟩 Costas & Dorsais',
            'pernas': '🟨 Membros Inferiores',
            'ombros': '🟪 Ombros & Deltoides',
            'triceps': '🟦 Tríceps',
            'biceps': '🟩 Bíceps',
            'core': '🟧 Core & Abdômen',
            'outros': '⬜ Mobilidade & Outros'
        };

        for (const [key, title] of Object.entries(groupTitles)) {
            if (groups[key].length === 0) continue;

            const categorySection = document.createElement('div');
            categorySection.className = 'library-category-section';
            
            const header = document.createElement('h3');
            header.style.backgroundColor = '#1a1a1a';
            header.style.color = '#fff';
            header.style.marginTop = '15px';
            header.style.marginBottom = '0px';
            header.style.border = '1px solid #333';
            header.style.borderRadius = '8px';
            header.style.padding = '15px';
            header.style.textTransform = 'uppercase';
            header.style.fontSize = '14px';
            header.style.cursor = 'pointer';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
            
            // O contador de exercícios agora aparece limpo ao lado do título
            header.innerHTML = `<span>${title} <span style="color: #666; font-size: 11px;">(${groups[key].length})</span></span><span class="toggle-arrow" style="font-size: 12px; color: #888; transition: transform 0.3s;">▼</span>`;
            categorySection.appendChild(header);

            const cardContainer = document.createElement('div');
            cardContainer.className = 'library-card-container';
            // 2. Gavetas Fechadas: Protege a memória do celular não renderizando tudo de uma vez visualmente
            cardContainer.style.display = 'none'; 
            cardContainer.style.gap = '15px';
            cardContainer.style.paddingTop = '15px';
            
            header.onclick = () => {
                const isVisible = cardContainer.style.display === 'grid';
                cardContainer.style.display = isVisible ? 'none' : 'grid';
                header.querySelector('.toggle-arrow').style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
                header.style.borderColor = isVisible ? '#333' : '#00ff88'; // Destaca a pasta aberta
            };

            // Ordena em ordem alfabética dentro da gaveta
            groups[key].sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                const card = document.createElement('div');
                card.className = 'library-card';
                
                const safeName = item.name ? item.name.replace(/'/g, "\\'") : 'Exercício';
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const equipStr = item.equip ? item.equip.replace(/_/g, ' ') : 'N/A';
                
                // 3. Cartões Ativos: Design limpo com Munição e botão de YouTube
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div class="lib-name" style="flex: 1; font-size: 15px;">${safeName}</div>
                        <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" style="text-decoration: none; font-size: 18px; margin-left: 10px; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 6px; border: 1px solid #333;" title="Ver Execução no YouTube">🎥</a>
                    </div>
                    <div class="lib-focus" style="margin-top: 5px; font-size: 11px;">Alvo: ${item.group || 'Geral'}</div>
                    <div style="font-size: 11px; color: #888; margin-top: 8px; background: #111; padding: 4px 8px; border-radius: 4px; display: inline-block; border: 1px dashed #333;">
                        🛠️ Munição: ${equipStr}
                    </div>
                `;
                cardContainer.appendChild(card);
            });

            categorySection.appendChild(cardContainer);
            grid.appendChild(categorySection);
        }
    }

    export function filterLibrary() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        const query = searchInput.value.toLowerCase();
        const grid = document.getElementById('libraryGrid');
        if (!grid) return;
        grid.innerHTML = '';

        // 1. O Funil Absoluto Mapeador
        const categorize = (item) => {
            const searchStr = ((item.group || '') + ' ' + (item.focus || '')).toLowerCase();
            if (searchStr.includes('peito') || searchStr.includes('peitoral')) return 'peito';
            if (searchStr.includes('costa') || searchStr.includes('dorsal') || searchStr.includes('trapézio') || searchStr.includes('trapezio') || searchStr.includes('lombar') || searchStr.includes('romboide')) return 'costas';
            if (searchStr.includes('perna') || searchStr.includes('quadríceps') || searchStr.includes('quadriceps') || searchStr.includes('glúteo') || searchStr.includes('gluteo') || searchStr.includes('isquiotibial') || searchStr.includes('panturrilha')) return 'pernas';
            if (searchStr.includes('ombro') || searchStr.includes('deltoide')) return 'ombros';
            if (searchStr.includes('tríceps') || searchStr.includes('triceps')) return 'triceps';
            if (searchStr.includes('bíceps') || searchStr.includes('biceps') || searchStr.includes('braquial')) return 'biceps';
            if (searchStr.includes('core') || searchStr.includes('abdom') || searchStr.includes('oblíquo') || searchStr.includes('obliquo')) return 'core';
            return 'outros';
        };

        const groups = { 'peito': [], 'costas': [], 'pernas': [], 'ombros': [], 'triceps': [], 'biceps': [], 'core': [], 'outros': [] };
        const activeMuscles = new Set();
        
        window.dictionaryData.forEach(ex => {
            const exName = ex.name || 'Exercício Desconhecido';
            const exGroup = ex.group || 'Outros'; 
            const exFocus = ex.focus || 'Geral';
            const exEquip = ex.equip || '';
            
            // Filtro de Busca
            if (query && !exName.toLowerCase().includes(query) && 
                !exGroup.toLowerCase().includes(query) && 
                !exFocus.toLowerCase().includes(query) &&
                !exEquip.toLowerCase().includes(query)) return;
            
            // Rastreamento para o Heatmap (Mantido Inalterado)
            const f = (exGroup + ' ' + exFocus).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            if (f.includes('peito')) activeMuscles.add('lib-svg-peito');
            if (f.includes('ombro') || f.includes('deltoide')) activeMuscles.add('lib-svg-ombro');
            if (f.includes('biceps') || f.includes('braco')) activeMuscles.add('lib-svg-biceps');
            if (f.includes('triceps')) activeMuscles.add('lib-svg-triceps');
            if (f.includes('costa') || f.includes('dorsal') || f.includes('lombar')) activeMuscles.add('lib-svg-costas');
            if (f.includes('trapezio')) activeMuscles.add('lib-svg-trapezio');
            if (f.includes('core') || f.includes('abdom')) activeMuscles.add('lib-svg-core');
            if (f.includes('quadriceps') || f.includes('perna') && !f.includes('posterior') && !f.includes('gluteo')) activeMuscles.add('lib-svg-quadriceps');
            if (f.includes('posterior') || f.includes('isquio')) activeMuscles.add('lib-svg-posterior');
            if (f.includes('gluteo')) activeMuscles.add('lib-svg-gluteo');
            if (f.includes('panturrilha') || f.includes('gastro')) activeMuscles.add('lib-svg-panturrilha');
            
            // Distribuição na Matriz Unificada
            const key = categorize(ex);
            groups[key].push(ex);
        });

        // 1. Apaga todo o Heatmap da Base antes de acender os novos
        const allMuscles = ['lib-svg-peito', 'lib-svg-ombro', 'lib-svg-biceps', 'lib-svg-triceps', 'lib-svg-costas', 'lib-svg-trapezio', 'lib-svg-core', 'lib-svg-quadriceps', 'lib-svg-posterior', 'lib-svg-gluteo', 'lib-svg-panturrilha'];
        allMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.style.fill = '#222'; el.style.stroke = '#444'; }
        });

        // 2. Acende os músculos relevantes com base na paleta do tema atual
        activeMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) { 
                el.style.fill = 'var(--theme-primary)'; 
                el.style.stroke = '#fff';
            }
        });

        const groupTitles = {
            'peito': '🟦 Peitoral',
            'costas': '🟩 Costas & Dorsais',
            'pernas': '🟨 Membros Inferiores',
            'ombros': '🟪 Ombros & Deltoides',
            'triceps': '🟦 Tríceps',
            'biceps': '🟩 Bíceps',
            'core': '🟧 Core & Abdômen',
            'outros': '⬜ Mobilidade & Outros'
        };

        for (const [key, title] of Object.entries(groupTitles)) {
            if (groups[key].length === 0) continue;

            const categorySection = document.createElement('div');
            categorySection.className = 'library-category-section';
            
            const header = document.createElement('h3');
            header.style.backgroundColor = '#1a1a1a';
            header.style.color = '#fff';
            header.style.marginTop = '15px';
            header.style.marginBottom = '0px';
            header.style.border = '1px solid #333';
            header.style.borderRadius = '8px';
            header.style.padding = '15px';
            header.style.textTransform = 'uppercase';
            header.style.fontSize = '14px';
            header.style.cursor = 'pointer';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
            
            const isOpen = query.length > 0;
            header.style.borderColor = isOpen ? '#00ff88' : '#333';
            
            header.innerHTML = `<span>${title} <span style="color: #666; font-size: 11px;">(${groups[key].length})</span></span><span class="toggle-arrow" style="font-size: 12px; color: #888; transition: transform 0.3s; transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}">▼</span>`;
            categorySection.appendChild(header);

            const cardContainer = document.createElement('div');
            cardContainer.className = 'library-card-container';
            cardContainer.style.display = isOpen ? 'grid' : 'none'; 
            cardContainer.style.gap = '15px';
            cardContainer.style.paddingTop = '15px';
            
            header.onclick = () => {
                const isVisible = cardContainer.style.display === 'grid';
                cardContainer.style.display = isVisible ? 'none' : 'grid';
                header.querySelector('.toggle-arrow').style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
                header.style.borderColor = isVisible ? '#333' : '#00ff88'; 
            };

            // Ordena em ordem alfabética e renderiza
            groups[key].sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                const card = document.createElement('div');
                card.className = 'library-card';
                card.style.background = '#111';
                card.style.border = '1px solid #2a2a2a';
                card.style.borderLeft = '4px solid #4da3ff';
                
                const safeName = item.name ? item.name.replace(/'/g, "\\'") : 'Exercício';
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const equipStr = item.equip ? item.equip.replace(/_/g, ' ') : 'N/A';
                
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div class="lib-name" style="flex: 1; font-size: 15px; color: #fff; font-weight: bold;">${safeName}</div>
                        <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" style="text-decoration: none; font-size: 18px; margin-left: 10px; background: rgba(255, 0, 0, 0.1); padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(255,0,0,0.3);" title="Ver Execução no YouTube">🎥</a>
                    </div>
                    <div class="lib-focus" style="margin-top: 8px; font-size: 11px; color: #aaa;">🎯 Alvo: ${item.group || 'Geral'} (${item.focus || ''})</div>
                    <div style="font-size: 11px; color: #00ff88; margin-top: 8px; background: rgba(0, 255, 136, 0.05); padding: 4px 8px; border-radius: 4px; display: inline-block; border: 1px dashed rgba(0, 255, 136, 0.3);">
                        🎒 Requer: ${equipStr}
                    </div>
                `;
                cardContainer.appendChild(card);
            });

            categorySection.appendChild(cardContainer);
            grid.appendChild(categorySection);
        }
    }

    export function updateDynamicCards() {
        const selector = document.getElementById('mainMethodSelector');
        if (!selector) return;
        
        const method = selector.value;
        window.FitApp.safeSet('fitapp_main_method', method);
        
        // NOVO: Padrão fallback agora é hipertrofia
        const profile = document.getElementById('profileSelector') ? document.getElementById('profileSelector').value : 'hipertrofia';
        
        const cA = document.getElementById('card-A'); const cB = document.getElementById('card-B');
        const cC = document.getElementById('card-C'); const cD = document.getElementById('card-D');
        
        if (!cA || !cB || !cC) return;

        let tA="Treino A", sA="", tB="Treino B", sB="", tC="Treino C", sC="", tD="Treino D", sD="";

        if (cD) cD.style.display = (method === 'abcd') ? 'block' : 'none';

        if (method === 'abc' || method === 'ppl') {
            if (profile === 'feminino') {
                tA="Treino A (Posterior)"; sA="Glúteos & Isquiotibiais";
                tB="Treino B (Superiores)"; sB="Costas, Peito & Braços";
                tC="Treino C (Anterior)"; sC="Quadríceps & Panturrilhas";
            } else if (profile === 'definicao') {
                tA="Push + Cardio"; sA="Peito, Ombro, Tri & Motor";
                tB="Pull + Core"; sB="Costas, Bi, Trapézio & Abs";
                tC="Legs + Agilidade"; sC="Pernas Completas & Sprint";
            } else { // Hipertrofia (Padrão)
                tA="Treino Push"; sA="Peito, Ombro, Tríceps";
                tB="Treino Pull"; sB="Costas, Trapézio, Bíceps";
                tC="Treino Legs"; sC="Pernas & Panturrilhas";
            }
        } else if (method === 'abcd') {
            if (profile === 'feminino') {
                tA="Treino A (Anterior)"; sA="Quadríceps & Panturrilhas";
                tB="Treino B (Superiores)"; sB="Tônus Superior Completo";
                tC="Treino C (Posterior)"; sC="Isquiotibiais & Lombar";
                tD="Treino D (Glúteos)"; sD="Foco Glúteo Máximo & Médio";
            } else if (profile === 'definicao') {
                tA="Peito & Tríceps"; sA="Hipertrofia Clássica";
                tB="Anterior + Pliometria"; sB="Quadríceps, Panturrilha & Salto";
                tC="Costas & Bíceps"; sC="Puxadas & Motor Aeróbico";
                tD="Posterior + Esporte"; sD="Posterior, Glúteo & Arrancada";
            } else { // Hipertrofia (Padrão)
                tA="Treino A (Push)"; sA="Peito & Tríceps";
                tB="Treino B (Foco Anterior)"; sB="Quadríceps & Panturrilhas";
                tC="Treino C (Pull)"; sC="Costas & Bíceps";
                tD="Treino D (Foco Posterior)"; sD="Isquiotibiais & Ombros";
            }
        } else if (method === 'biset_agonista') {
            if (profile === 'feminino') {
                tA="Fritura Posterior"; sA="Glúteos & Isquiotibiais";
                tB="Fritura Superior"; sB="Superiores (Tônus)";
                tC="Fritura Anterior"; sC="Quadríceps & Panturrilha";
            } else if (profile === 'definicao') {
                tA="Exaustão Push"; sA="Peito/Ombro/Tri + Core";
                tB="Exaustão Pull"; sB="Costas/Bi + Metabólico";
                tC="Exaustão Legs"; sC="Pernas Completas + Cardio";
            } else { // Hipertrofia (Padrão)
                tA="Bi-Set Push"; sA="Peitoral, Ombro & Tríceps";
                tB="Bi-Set Pull"; sB="Dorsais, Trapézio & Bíceps";
                tC="Bi-Set Legs"; sC="Pernas Completas";
            }
        } else if (method === 'biset_antagonista') {
            if (profile === 'feminino') {
                tA="Pernas Opostas"; sA="Quadríceps vs Posterior";
                tB="Superiores Opostos"; sB="Costas vs Peito";
                tC="Glúteo & Core"; sC="Glúteos vs Estabilizadores";
            } else if (profile === 'definicao') {
                tA="Derretedor A"; sA="Peito/Costas + Cardio";
                tB="Derretedor B"; sB="Pernas/Core + Pliometria";
                tC="Derretedor C"; sC="Ombros/Braços + Resistência";
            } else { // Hipertrofia (Padrão)
                tA="Antagonista A"; sA="Peito + Costas";
                tB="Antagonista B"; sB="Pernas + Core";
                tC="Antagonista C"; sC="Ombros + Braços";
            }
        } else if (method === 'biset_sinergista') {
            if (profile === 'feminino') {
                tA="Sinergia Posterior"; sA="Glúteo + Posterior";
                tB="Sinergia Superior"; sB="Costas/Bíceps & Peito/Tríceps";
                tC="Sinergia Anterior"; sC="Quadríceps + Adutores";
            } else if (profile === 'definicao') {
                tA="Sinergista A"; sA="Peito/Tri + Metabólico";
                tB="Sinergista B"; sB="Costas/Bi + Aeróbico";
                tC="Sinergista C"; sC="Pernas/Ombro + Agilidade";
            } else { // Hipertrofia (Padrão)
                tA="Sinergista Push"; sA="Peito + Tríceps + Ombro";
                tB="Sinergista Pull"; sB="Costas + Bíceps + Trapézio";
                tC="Sinergista Legs"; sC="Pernas Completas";
            }
        } else if (method === 'circuito') {
            if (profile === 'definicao') {
                tA="Seca Extrema 1"; sA="Cardio & Pliometria Base";
                tB="Seca Extrema 2"; sB="FullBody Dinâmico";
                tC="Seca Extrema 3"; sC="Resistência Anaeróbica";
            } else {
                tA="Circuito 1"; sA="Metabólico FullBody";
                tB="Circuito 2"; sB="Cardio & Força";
                tC="Circuito 3"; sC="Resistência Extrema";
            }
        }

        if(cA.querySelector('h3')) { cA.querySelector('h3').textContent = tA; cA.querySelector('p').textContent = sA; }
        if(cB.querySelector('h3')) { cB.querySelector('h3').textContent = tB; cB.querySelector('p').textContent = sB; }
        if(cC.querySelector('h3')) { cC.querySelector('h3').textContent = tC; cC.querySelector('p').textContent = sC; }
        if(cD && cD.querySelector('h3')) { cD.querySelector('h3').textContent = tD; cD.querySelector('p').textContent = sD; }

        // NOVO: Reavalia as marcações de "Feito" sempre que os cartões mudarem
        if (typeof checkCompletedCards === 'function') window.FitApp.checkCompletedCards();
        if (typeof updateCampaignDashboard === 'function') window.FitApp.updateCampaignDashboard(); // NOVO: Força a atualização do banner
    }

    export function renderCurrentRoutine() {
        // --- INÍCIO DA FASE 2: BLINDAGEM DE ESTADO DE INTERFACE ---
        // 1. Memoriza quem estava focado (inputs, textareas)
        const activeEl = document.activeElement;
        const activeId = activeEl && activeEl.id ? activeEl.id : null;
        let caretPos = null;
        try { caretPos = activeEl ? activeEl.selectionStart : null; } catch(e){}

        // 2. Memoriza a posição do Scroll da página
        const currentScroll = window.scrollY;

        // 3. Memoriza quais anotações táticas estavam abertas
        const openNotes = [];
        document.querySelectorAll('.notes-container').forEach(container => {
            if (container.style.display === 'block' && container.id) {
                openNotes.push(container.id);
            }
        });
        // --- FIM DA MEMORIZAÇÃO ---

        state.totalSets = 0; 
        state.checkedSets = 0; 
        state.todayLog = [];
        
        const historyLog = JSON.parse(window.FitApp.safeGet('fitapp_week_log') || '[]');

        // ⚡ OPÇÃO GOLF (Performance): Cria um fragmento de memória virtual para evitar Layout Thrashing
        const virtualFragment = document.createDocumentFragment();
        
        state.currentRoutine.forEach((bloco, bIndex) => {
            const isBiset = bloco.exercises.length > 1;
            const cardClass = isBiset ? 'biset-card' : 'tradicional-card'; 
            
            const card = document.createElement('div'); card.className = cardClass; 
            if (!isBiset) card.style.borderLeft = '4px solid #44aaff'; 
            
            card.innerHTML = `
                <div class="biset-title" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <span class="block-name">${bloco.title}</span>
                    <span class="toggle-icon" style="transition: transform 0.3s; font-size: 14px; color: #888;">▲</span>
                </div>`;
            
            // BLINDAGEM: O clique manual agora recolhe visualmente sem mascarar o bloco como concluído
            card.querySelector('.biset-title').addEventListener('click', () => {
                card.classList.toggle('minimized-block');
            });
            
            bloco.exercises.forEach((ex, eIndex) => {
                const blockDiv = document.createElement('div'); blockDiv.className = 'exercise-block';
                const linkIcon = (isBiset && eIndex < bloco.exercises.length - 1) ? ' <span style="color:#00ff88;">🔗</span>' : '';
                
                const safeName = escapeHTML(ex.name);
                const safeTarget = escapeHTML(ex.target);
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;
                const savedNotes = ex.notes ? escapeHTML(ex.notes) : '';
                
                let aiSuggestionHTML = '';
                const lastWorkoutMatch = historyLog.slice().reverse().find(log => 
                    log.data && log.data.some(d => d.exercise === ex.name)
                );

                if (lastWorkoutMatch) {
                    const lastSets = lastWorkoutMatch.data.filter(d => d.exercise === ex.name);
                    if (lastSets.length > 0) {
                            const finalSet = lastSets[lastSets.length - 1]; 
                            let suggestedKg = parseFloat(finalSet.kg) || 0;
                            const repsDone = parseInt(finalSet.reps) || 0;
                            
                            // BLINDAGEM: Força o String() antes de aplicar o filtro .replace()
                            const targetStr = ex.target ? String(ex.target).replace(/[^0-9-]/g, '') : "10";
                            let targetHigh = parseInt(targetStr.split('-').pop()) || 10;
                        
                        if (repsDone >= targetHigh && suggestedKg > 0) {
                            suggestedKg += 2;
                        }
                        
                        if (suggestedKg > 0) {
                            aiSuggestionHTML = `<span style="font-size: 10px; background: rgba(166, 77, 255, 0.2); color: #a64dff; padding: 2px 6px; border-radius: 4px; border: 1px solid #a64dff; font-weight: bold; margin-right: auto;" title="Sugestão baseada no seu último treino">🎯 Alvo IA: ${suggestedKg}kg</span>`;
                        }
                    }
                }
                
                // Verifica se essa caixa de anotação estava aberta no ciclo de memória anterior
                const noteContainerId = `notes_container_${bIndex}_${eIndex}`;
                const isNoteOpen = openNotes.includes(noteContainerId) ? 'block' : 'none';

                blockDiv.innerHTML = `
                    <div class="exercise-header" style="flex-direction: column; align-items: flex-start; gap: 12px;">
                        <!-- LINHA 1: Nome do Exercício e Botão de Troca -->
                        <div style="width: 100%; display: flex; justify-content: space-between; align-items: flex-start;">
                            <span class="ex-name" onclick="FitApp.openDict('${safeName.replace(/'/g, "\\'")}')" style="line-height: 1.3; flex: 1; padding-right: 10px;">${safeName}${linkIcon}</span>
                            <button class="btn-swap" onclick="window.FitApp.openSwapModal(${bIndex}, ${eIndex})" title="Substituir Exercício" style="margin-top: -4px;">🔄</button>
                        </div>
                        
                        ${aiSuggestionHTML ? `<div style="width: 100%; margin-top: -5px; margin-bottom: 5px;">${aiSuggestionHTML}</div>` : ''}

                        <!-- LINHA 2: Barra de Ferramentas (Toolbars) -->
                        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            
                            <!-- Esquerda: Controles de Execução Primários -->
                            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <div style="display: flex; align-items: center; background: #222; border-radius: 8px; padding: 2px 6px; border: 1px solid #444;">
                                    <button class="btn-edit-set" onclick="window.FitApp.changeSets(${bIndex}, ${eIndex}, -1)" style="background: none; border: none; color: #ff4444; font-weight: bold; font-size: 16px; padding: 0 5px; cursor: pointer;">-</button>
                                    <span style="font-size: 12px; color: #ccc; margin: 0 5px; font-weight: bold;">${ex.sets}x</span>
                                    <button class="btn-edit-set" onclick="window.FitApp.changeSets(${bIndex}, ${eIndex}, 1)" style="background: none; border: none; color: #00ff88; font-weight: bold; font-size: 16px; padding: 0 5px; cursor: pointer;">+</button>
                                </div>
                                <span class="target-reps" style="padding: 4px 8px; font-size: 11px;">${safeTarget}</span>
                                <button id="btnAuto_${bIndex}_${eIndex}" onclick="window.FitApp.toggleAutoPilot(${bIndex}, ${eIndex})" style="background: rgba(0, 255, 136, 0.1); border: 1px solid #00ff88; color: #00ff88; border-radius: 8px; padding: 4px 8px; font-size: 11px; font-weight: bold; cursor: pointer; transition: all 0.2s;" title="Modo Hands-Free">🤖 Auto</button>
                            </div>

                            <!-- Direita: Ferramentas Secundárias Agrupadas -->
                            <div style="display: flex; align-items: center; gap: 12px; background: #1a1a1a; border: 1px solid #333; padding: 6px 12px; border-radius: 8px;">
                                <button onclick="window.FitApp.cloneFirstSet(${bIndex}, ${eIndex})" style="background: none; border: none; cursor: pointer; font-size: 15px; padding: 0; filter: grayscale(100%) brightness(200%);" title="Replicar valores da S1">📋</button>
                                <button class="btn-notes" style="background: none; border: none; cursor: pointer; font-size: 15px; padding: 0;" title="Anotações">📝</button>
                                <a href="${ytLink}" target="_blank" style="text-decoration: none; font-size: 16px; margin-top: 1px;" title="Ver execução no YouTube">🎥</a>
                            </div>
                        </div>
                    </div>
                    <div id="${noteContainerId}" class="notes-container" style="display: ${isNoteOpen}; background: #1a1a1a; padding: 10px; border-radius: 6px; border-left: 2px solid #a64dff; margin-bottom: 12px; margin-top: 5px;">
                        <textarea id="notes_input_${bIndex}_${eIndex}" class="ex-notes-input" placeholder="Anotações táticas (ex: banco inclinado no nível 3, fadiga no ombro...)" style="width: 100%; background: transparent; border: none; color: #ccc; font-size: 12px; resize: vertical; min-height: 45px; outline: none;">${savedNotes}</textarea>
                    </div>`;
                
                const btnNotes = blockDiv.querySelector('.btn-notes');
                const notesContainer = blockDiv.querySelector('.notes-container');
                const notesInput = blockDiv.querySelector('.ex-notes-input');

                btnNotes.addEventListener('click', () => {
                    const isHidden = notesContainer.style.display === 'none';
                    notesContainer.style.display = isHidden ? 'block' : 'none';
                    if (isHidden) notesInput.focus();
                });

                notesInput.addEventListener('input', () => {
                    ex.notes = notesInput.value;
                    window.FitApp.saveWorkoutState(); 
                });

                if (!ex.setsData) ex.setsData = [];
                
                for(let s = 1; s <= ex.sets; s++) {
                    state.totalSets++; 
                    
                    if (!ex.setsData[s-1]) {
                        ex.setsData[s-1] = { kg: '', reps: '', checked: false };
                    }
                    const data = ex.setsData[s-1];
                    
                    if (data.checked) {
                        state.checkedSets++;
                        state.todayLog.push({ exercise: ex.name, set: s, kg: parseSafeFloat(data.kg), reps: parseInt(data.reps) || 0 });
                    }

                    const row = document.createElement('div'); row.className = 'set-row';
                    const chkId = `chk_set_${bIndex}_${eIndex}_${s}`;
                    const kgId = `kg_set_${bIndex}_${eIndex}_${s}`;
                    const rpId = `rp_set_${bIndex}_${eIndex}_${s}`;
                    
                    let ghostKg = '';
                    let ghostReps = '';
                    if (lastWorkoutMatch) {
                        const lastSets = lastWorkoutMatch.data.filter(d => d.exercise === ex.name);
                        const pastSet = lastSets.find(d => parseInt(d.set) === s) || lastSets[lastSets.length - 1];
                        if (pastSet) {
                            if (pastSet.kg) ghostKg = pastSet.kg;
                            if (pastSet.reps) ghostReps = pastSet.reps;
                        }
                    }
                    
                    let displayKg = data.kg;
                    let displayReps = data.reps;
                    
                    // BLINDAGEM UX: Removemos o preenchimento automático rígido. Os valores fantasmas agora são 'placeholders' translúcidos.
                    const placeholderKg = ghostKg !== '' ? ghostKg : 'Kg';
                    const placeholderReps = ghostReps !== '' ? ghostReps : 'Reps';

                    row.innerHTML = `<div class="set-label">S${s}</div><input type="number" id="${kgId}" class="kg-val" placeholder="${placeholderKg}" value="${displayKg}"><input type="number" id="${rpId}" class="rp-val" placeholder="${placeholderReps}" value="${displayReps}"><button class="btn-iso" style="background:none; border:none; cursor:pointer; font-size:16px; padding:0 5px;" title="Iniciar Isometria">⏱️</button><input type="checkbox" id="${chkId}" class="chk-set" ${data.checked ? 'checked' : ''}>`;
                    
                    const chk = row.querySelector('.chk-set');
                    const kgInp = row.querySelector('.kg-val');
                    const rpInp = row.querySelector('.rp-val');
                    const btnIso = row.querySelector('.btn-iso');

                    const updateState = () => {
                        ex.setsData[s-1] = { kg: kgInp.value, reps: rpInp.value, checked: chk.checked };
                        window.FitApp.saveWorkoutState(); 
                    };

                    let localIsoTimer = null;
                    btnIso.addEventListener('click', () => {
                        if (localIsoTimer) {
                            clearInterval(localIsoTimer);
                            localIsoTimer = null;
                            btnIso.textContent = '⏱️';
                            btnIso.style.textShadow = 'none';
                        } else {
                            btnIso.textContent = '⏸️';
                            btnIso.style.textShadow = '0 0 8px #00ff88';
                            let currentSecs = parseInt(rpInp.value) || 0;
                            localIsoTimer = setInterval(() => {
                                currentSecs++;
                                rpInp.value = currentSecs;
                                updateState(); 
                            }, 1000);
                        }
                    });

                    kgInp.addEventListener('input', updateState);
                    rpInp.addEventListener('input', updateState);

                    chk.addEventListener('change', () => {
                        if (localIsoTimer) { clearInterval(localIsoTimer); localIsoTimer = null; btnIso.textContent = '⏱️'; btnIso.style.textShadow = 'none'; }
                        
                        if (chk.checked) { 
                            // TRANSIÇÃO DE FANTASMA PARA MATERIAL: Se o campo estava vazio, herda o fantasma antes de registrar o PR
                            if (kgInp.value === '' && ghostKg !== '') kgInp.value = ghostKg;
                            if (rpInp.value === '' && ghostReps !== '') rpInp.value = ghostReps;

                            // SISTEMA DE RECORDE PESSOAL (PR)
                            const currentKg = parseSafeFloat(kgInp.value);
                            const currentReps = parseInt(rpInp.value) || 0;
                            const pKg = parseSafeFloat(ghostKg);
                            const pReps = parseInt(ghostReps) || 0;

                            let isPR = false;
                            if (ghostKg !== '' || ghostReps !== '') { 
                                if (currentKg > pKg) {
                                    isPR = true;
                                } else if (currentKg === pKg && currentReps > pReps) {
                                    isPR = true;
                                }
                            }

                            if (isPR) {
                                row.classList.add('pr-breaker');
                                if (typeof FitAudio !== 'undefined' && window.FitAudio.revealEpic) window.FitAudio.revealEpic();
                                window.FitApp.showToast("🏆 Recorde Pessoal Quebrado!");
                            } else {
                                row.classList.remove('pr-breaker');
                            }

                            state.checkedSets++; 
                            
                            if (s < ex.sets) {
                                const nextKgInp = document.getElementById(`kg_set_${bIndex}_${eIndex}_${s+1}`);
                                const nextRpInp = document.getElementById(`rp_set_${bIndex}_${eIndex}_${s+1}`);
                                if (nextKgInp && nextRpInp && !nextKgInp.value && !nextRpInp.value) {
                                    nextKgInp.value = kgInp.value; nextRpInp.value = rpInp.value;
                                    ex.setsData[s] = { kg: kgInp.value, reps: rpInp.value, checked: false };
                                }
                            }

                            // --- LÓGICA DE BI-SET (Sinergia de Descanso) ---
                            let pendingCompanions = 0;
                            const allInSetChecked = state.currentRoutine[bIndex].exercises.every(e => {
                                if (!e.setsData[s-1]) return true; 
                                if (!e.setsData[s-1].checked) {
                                    pendingCompanions++;
                                    return false;
                                }
                                return true;
                            });

                            if (allInSetChecked && state.checkedSets < state.totalSets) {
                                window.FitApp.startRestTimer(card, ex.name);
                            } else if (state.currentRoutine[bIndex].exercises.length > 1 && pendingCompanions > 0) {
                                window.FitApp.showToast(`🔗 Bi-Set Ativo: Complete o movimento parceiro (Série ${s}) para iniciar o descanso.`);
                            }

                            state.todayLog.push({ exercise: ex.name, set: s, kg: parseSafeFloat(kgInp.value), reps: parseInt(rpInp.value) || 0 });
                        } else { 
                            row.classList.remove('pr-breaker'); // Reseta a cor caso desmarque
                            state.checkedSets--; 
                            window.FitApp.stopRestTimer(); 
                            state.todayLog = state.todayLog.filter(log => !(log.exercise === ex.name && log.set === s));
                        }
                        updateState();
                        window.FitApp.updateProgress();

                        const allBlockChecked = state.currentRoutine[bIndex].exercises.every(e => {
                            const checkedCount = e.setsData ? e.setsData.filter(sd => sd && sd.checked).length : 0;
                            return checkedCount === e.sets;
                        });
                        
                        if (allBlockChecked) card.classList.add('collapsed-block');
                        else card.classList.remove('collapsed-block');
                    });
                    blockDiv.appendChild(row);
                } 
                card.appendChild(blockDiv); 
            });
            
            const isBlockFinishedOnLoad = state.currentRoutine[bIndex].exercises.every(e => {
                const checkedCount = e.setsData ? e.setsData.filter(sd => sd && sd.checked).length : 0;
                return checkedCount === e.sets;
            });
            if (isBlockFinishedOnLoad && state.currentRoutine[bIndex].exercises.length > 0) {
                card.classList.add('collapsed-block');
            }

            virtualFragment.appendChild(card); // Adiciona ao fragmento virtual em vez do ecrã real
        });

        // ⚡ OPÇÃO GOLF: Injeta todo o treino no ecrã num único cálculo do processador
        state.els.exerciseList.innerHTML = '';
        state.els.exerciseList.appendChild(virtualFragment);
        
        window.FitApp.updateProgress();

        // --- RESTAURAÇÃO DE ESTADO (Scroll e Foco) ---
        window.scrollTo(0, currentScroll);
        if (activeId) {
            const restoredEl = document.getElementById(activeId);
            if (restoredEl) {
                restoredEl.focus();
                try {
                    if (caretPos !== null && (restoredEl.tagName === 'INPUT' || restoredEl.tagName === 'TEXTAREA')) {
                        restoredEl.setSelectionRange(caretPos, caretPos);
                    }
                } catch(e) {} 
            }
        }
    }

    export function applyTheme() {
        // Fallback agora é hipertrofia
        const profile = window.FitApp.safeGet('fitapp_profile') || 'hipertrofia';
        
        // 1. Zera a prancheta de pintura
        document.body.classList.remove('theme-feminino', 'theme-definicao', 'theme-tatico');
        
        // 2. Aplica a classe correspondente. 
        // Nota: O perfil 'hipertrofia' NÃO recebe classe extra, caindo nas cores Verde/Roxo padrão do sistema.
        if (profile === 'feminino') {
            document.body.classList.add('theme-feminino');
        } else if (profile === 'definicao') {
            document.body.classList.add('theme-definicao');
        } else if (profile === 'tatico') {
            document.body.classList.add('theme-tatico');
        }
    }

    export function switchTab(tabId, navId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        
        // NOVO: Travas de segurança para evitar erro de classList null
        const tabEl = document.getElementById(tabId);
        if (tabEl) tabEl.classList.add('active'); 
        
        const navEl = document.getElementById(navId);
        if (navEl) navEl.classList.add('active');
        
        // Distribuição tática das renderizações
        if (tabId === 'tab-arena') window.FitGamification.loadLeaderboard(); // Injeta o carregamento do Ranking
        if (tabId === 'tab-conquistas') window.FitGamification.renderAlbum();
        if (tabId === 'tab-evolucao') {
            renderWeeklyCalendar();
            if (typeof renderMetricsChart === 'function') renderMetricsChart();
        }
        if (tabId === 'tab-biblioteca') filterLibrary();
        if (tabId === 'tab-treino') {
            if (!state.currentWorkoutType) {
                document.getElementById('workoutCards').style.display = 'flex';
                // Remove o comportamento de esconder/mostrar o cabeçalho (que agora está na aba Perfil)
                state.els.workoutArea.style.display = 'none';
                state.els.btnFinishArea.style.display = 'none';
                window.FitApp.checkSequence();
            }
        }
    }

    export function renderWeeklyCalendar() {
        const grid = document.getElementById('weeklyGrid');
        if (!grid) return;
        grid.innerHTML = '';
        
        const history = JSON.parse(window.FitApp.safeGet('fitapp_week_log') || '[]');
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            
            // BLINDAGEM DE FUSO HORÁRIO: Formata a data garantindo o tempo local do dispositivo (ex: "2026-09-23")
            const localISOTime = d.getFullYear() + "-" + 
                                 String(d.getMonth() + 1).padStart(2, '0') + "-" + 
                                 String(d.getDate()).padStart(2, '0');
            
            let dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
            dayName = dayName.substring(0, 3);
            
            // O sistema procura por treinos gravados nessa data local exata
            const workedOut = history.slice().reverse().find(h => h.date === localISOTime);
            
            const dayEl = document.createElement('div');
            dayEl.style.display = 'flex';
            dayEl.style.flexDirection = 'column';
            dayEl.style.alignItems = 'center';
            dayEl.style.gap = '8px';
            dayEl.style.cursor = 'pointer'; 
            dayEl.onclick = () => {         
                FitApp.openHistoryModal();
                FitApp.switchHistoryTab('calendar');
            };
            
            let dotColor = '#2a2a2a';
            let textColor = '#555';
            let typeLabel = '';
            let shadow = 'none';
            
            if (workedOut) {
                dotColor = workedOut.tipo === 'Livre' ? '#a64dff' : '#00ff88';
                textColor = '#000';
                typeLabel = workedOut.tipo === 'Livre' ? 'L' : workedOut.tipo;
                shadow = `0 0 10px ${dotColor}80`;
            }
            
            const isToday = i === 0;
            const dayLabelColor = isToday ? '#fff' : '#aaa';
            const fontWeight = isToday ? 'bold' : 'normal';
            
            dayEl.innerHTML = `
                <span style="font-size: 11px; color: ${dayLabelColor}; font-weight: ${fontWeight}; text-transform: capitalize;">${dayName}</span>
                <div style="width: 34px; height: 34px; border-radius: 50%; background: ${dotColor}; display: flex; justify-content: center; align-items: center; font-size: 14px; font-weight: bold; color: ${textColor}; box-shadow: ${shadow}; border: 1px solid #444;">
                    ${typeLabel}
                </div>
            `;
            grid.appendChild(dayEl);
        }
    }

    export function renderMonthlyCalendar() {
        const container = document.getElementById('historyCalendarView');
        container.innerHTML = '';
        
        const history = JSON.parse(window.FitApp.safeGet('fitapp_week_log') || '[]');
        const historyDates = history.map(h => h.date); 
        
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        
        const firstDay = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        
        const header = document.createElement('div');
        header.style.textAlign = 'center';
        header.style.fontWeight = 'bold';
        header.style.color = '#fff';
        header.style.marginBottom = '15px';
        header.style.fontSize = '16px';
        header.textContent = `${monthNames[month]} ${year}`;
        container.appendChild(header);
        
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
        grid.style.gap = '5px';
        grid.style.textAlign = 'center';
        
        const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        weekDays.forEach(d => {
            const dayLabel = document.createElement('div');
            dayLabel.style.color = '#aaa';
            dayLabel.style.fontSize = '12px';
            dayLabel.style.fontWeight = 'bold';
            dayLabel.style.marginBottom = '5px';
            dayLabel.textContent = d;
            grid.appendChild(dayLabel);
        });
        
        for (let i = 0; i < firstDay; i++) {
            grid.appendChild(document.createElement('div'));
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isWorkoutDay = historyDates.includes(dateStr);
            const isToday = day === today.getDate();
            
            const dayCell = document.createElement('div');
            dayCell.style.padding = '10px 0';
            dayCell.style.borderRadius = '6px';
            dayCell.style.fontSize = '14px';
            dayCell.style.background = isWorkoutDay ? 'rgba(0, 255, 136, 0.2)' : '#1e1e1e';
            dayCell.style.color = isWorkoutDay ? '#00ff88' : '#fff';
            dayCell.style.border = isWorkoutDay ? '1px solid #00ff88' : '1px solid #333';
            dayCell.style.fontWeight = isWorkoutDay ? 'bold' : 'normal';
            
            if (isToday) {
                dayCell.style.boxShadow = 'inset 0 0 0 2px #a64dff'; 
            }
            
            dayCell.textContent = day;
            grid.appendChild(dayCell);
        }
        
        container.appendChild(grid);
    }

    export function renderCustomWorkouts() {
        const listEl = document.getElementById('customWorkoutsList');
        if (!listEl) return;
        listEl.innerHTML = '';
        
        const savedCustoms = JSON.parse(window.FitApp.safeGet('fitapp_custom_workouts') || '[]');
        
        if (savedCustoms.length === 0) {
            listEl.innerHTML = '<div style="color: #666; font-size: 13px; text-align: center; padding: 10px; border: 1px dashed #333; border-radius: 8px;">Nenhum treino criado.</div>';
            return;
        }
        
        savedCustoms.forEach(workout => {
            const div = document.createElement('div');
            div.className = 'card-treino';
            div.style.borderLeftColor = '#a64dff';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            div.style.padding = '15px';
            
            div.innerHTML = `
                <div style="flex: 1;" onclick="window.FitApp.startWorkout('custom_${workout.id}')">
                    <h3 style="margin: 0; color: #fff; font-size: 16px;">${escapeHTML(workout.name)}</h3>
                    <p style="margin: 0; color: #aaa; font-size: 12px; margin-top: 5px;">${workout.routine[0].exercises.length} exercícios estruturados</p>
                </div>
                <button onclick="FitApp.deleteCustomWorkout(${workout.id}, event)" style="background: none; border: none; color: #ff4444; font-size: 18px; cursor: pointer; padding: 5px; margin-left: 10px;" title="Excluir">🗑️</button>
            `;
            listEl.appendChild(div);
        });
    }

    export function renderHistoryList() {
        const container = document.getElementById('historyListView');
        container.innerHTML = '';
        let history = JSON.parse(window.FitApp.safeGet('fitapp_week_log') || '[]');
        
        if (history.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">Nenhum treino salvo ainda.</div>';
            return;
        }

        // PONTO 11: Inverte apenas a ordem dos dias, mas mantém a ordem dos exercícios intacta
        const reversedHistory = history.slice().reverse();
        reversedHistory.forEach((log) => {
            // NOVO: Desmembramento bruto da data (YYYY-MM-DD para DD/MM/YYYY)
            const parts = log.date.split('-');
            const dateStr = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : log.date;
            const durationStr = log.duration_secs ? Math.floor(log.duration_secs / 60) + ' min' : '--';
            
            const block = document.createElement('div');
            block.style.background = '#2a2a2a';
            block.style.borderRadius = '8px';
            block.style.marginBottom = '10px';
            block.style.border = '1px solid #333';

            const header = document.createElement('div');
            header.style.padding = '12px';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.cursor = 'pointer';
            header.style.borderLeft = log.tipo === 'Livre' ? '4px solid #a64dff' : '4px solid #00ff88';
            
            // Oculta o botão de lixeira se o treino não tiver o ID da nuvem (offline)
            const trashBtnDisplay = log._id ? 'block' : 'none';

            header.innerHTML = `
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: #fff;">Treino ${log.tipo}</div>
                    <div style="font-size: 12px; color: #aaa;">${dateStr} • ⏱️ ${durationStr}</div>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button onclick="event.stopPropagation(); window.FitApp.exportStravaCard(${history.length - 1 - reversedHistory.indexOf(log)})" style="background: transparent; border: none; font-size: 20px; cursor: pointer; filter: drop-shadow(0 0 5px rgba(255,255,255,0.2));" title="Exportar para Instagram">📸</button>
                    <button onclick="event.stopPropagation(); window.FitApp.deleteHistoryLog('${log._id}')" style="display: ${trashBtnDisplay}; background: transparent; border: none; font-size: 18px; color: #ff4444; cursor: pointer;" title="Excluir Treino">🗑️</button>
                    <div class="toggle-arrow" style="color: #888; font-size: 12px; transition: transform 0.3s; margin-left: 5px;">▼</div>
                </div>
            `;

            const body = document.createElement('div');
            body.style.padding = '0 12px 12px 12px';
            body.style.display = 'none';
            body.style.borderTop = '1px dashed #444';
            body.style.marginTop = '5px';
            body.style.paddingTop = '10px';
            
            if (log.data && log.data.length > 0) {
                const exMap = {};
                log.data.forEach(item => {
                    if (!exMap[item.exercise]) exMap[item.exercise] = [];
                    exMap[item.exercise].push(item);
                });
                
                for (const [exName, sets] of Object.entries(exMap)) {
                    const exDiv = document.createElement('div');
                    exDiv.style.marginBottom = '8px';
                    exDiv.innerHTML = `<div style="color: #4da3ff; font-size: 13px; font-weight: bold;">${exName}</div>`;
                    
                    if (exName === 'Cardio') {
                        const c = sets[0];
                        const distStr = c.dist_km > 0 ? `<span style="background: #111; padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid #333; color: #4da3ff;">🏃 ${c.dist_km} km</span>` : '';
                        const kcalStr = c.kcal > 0 ? `<span style="background: #111; padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid #333; color: #ffaa00;">🔥 ${c.kcal} kcal</span>` : '';
                        const bpmStr = c.bpm_medio > 0 ? `<span style="background: #111; padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid #333; color: #ff4444;">❤️ ${c.bpm_medio} bpm</span>` : '';
                        const timeStr = c.tempo_segundos > 0 ? `<span style="background: #111; padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid #333; color: #ccc;">⏱️ ${Math.floor(c.tempo_segundos/60)} min</span>` : '';
                        exDiv.innerHTML += `<div style="margin-top: 6px;">${distStr}${kcalStr}${bpmStr}${timeStr}</div>`;
                    } else {
                        const setStr = sets.map(s => `<span style="font-size: 11px; color: #ccc; background: #111; padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid #333;">S${s.set}: ${s.kg}kg x ${s.reps}</span>`).join('');
                        exDiv.innerHTML += `<div style="margin-top: 4px; line-height: 1.8;">${setStr}</div>`;
                    }
                    body.appendChild(exDiv);
                }
            } else {
                body.innerHTML = '<div style="font-size: 12px; color: #666;">Sem dados detalhados.</div>';
            }

            header.onclick = () => {
                const isVisible = body.style.display === 'block';
                body.style.display = isVisible ? 'none' : 'block';
                const arrow = header.querySelector('.toggle-arrow');
                if(arrow) arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
            };

            block.appendChild(header);
            block.appendChild(body);
            container.appendChild(block);
        });
    }

    export function renderMetricsChart() {
        const history = JSON.parse(window.FitApp.safeGet('fitapp_week_log') || '[]');
        const radarCtx = document.getElementById('radarChart');
        const radarContainer = document.getElementById('radarContainer');
        const isolationContainer = document.getElementById('isolationContainer');
        const exSelect = document.getElementById('exerciseIsolationSelect');
        
        if (!radarCtx || !radarContainer || !isolationContainer || history.length === 0) {
            if(radarContainer) radarContainer.style.display = 'none';
            if(isolationContainer) isolationContainer.style.display = 'none';
            return;
        }

        radarContainer.style.display = 'block';
        isolationContainer.style.display = 'block';

        // --- MATRIZ 1: RADAR DE SIMETRIA (Últimos 30 Dias) ---
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const muscleCounts = { 'Peitoral': 0, 'Costas': 0, 'Pernas': 0, 'Ombros': 0, 'Braços': 0, 'Core': 0 };
        const allExecutedExercises = new Set(); // Para popular o seletor do Gráfico 2

        history.forEach(log => {
            const logDate = new Date(log.date + 'T12:00:00');
            const isRecent = logDate >= thirtyDaysAgo;

            if (log.data && log.data.length > 0) {
                log.data.forEach(set => {
                    allExecutedExercises.add(set.exercise); // Adiciona ao arsenal usado
                    
                    if (isRecent) {
                        const dictItem = typeof window.dictionaryData !== 'undefined' ? window.dictionaryData.find(d => d.name === set.exercise) : null;
                        // BLINDAGEM: Passamos o objeto inteiro (dictItem). O motor lerá o 'group' ("Peitoral") em vez do foco ("Fibras").
                        const broadGroup = getMuscleGroup(dictItem ? dictItem : set.exercise);
                        
                        if (broadGroup === 'peito') muscleCounts['Peitoral']++;
                        else if (broadGroup === 'costas') muscleCounts['Costas']++;
                        else if (broadGroup === 'pernas') muscleCounts['Pernas']++;
                        else if (broadGroup === 'ombros') muscleCounts['Ombros']++;
                        else if (broadGroup === 'triceps' || broadGroup === 'biceps') muscleCounts['Braços']++;
                        else if (broadGroup === 'core') muscleCounts['Core']++;
                    }
                });
            }
        });

        if (radarChartInstance) radarChartInstance.destroy();

        radarChartInstance = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: Object.keys(muscleCounts),
                datasets: [{
                    label: 'Séries no Mês',
                    data: Object.values(muscleCounts),
                    backgroundColor: 'rgba(0, 255, 136, 0.2)',
                    borderColor: '#00ff88',
                    pointBackgroundColor: '#a64dff',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#a64dff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#aaa', font: { size: 10, weight: 'bold' } },
                        ticks: { display: false, backdropColor: 'transparent' }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });

        // --- PREPARAÇÃO DO SELETOR: RASTREADOR DE SOBRECARGA ---
        if (exSelect) {
            const currentSelection = exSelect.value;
            exSelect.innerHTML = '<option value="">Selecione um exercício do histórico...</option>';
            Array.from(allExecutedExercises).sort().forEach(ex => {
                exSelect.innerHTML += `<option value="${ex}">${ex}</option>`;
            });
            if (currentSelection && allExecutedExercises.has(currentSelection)) {
                exSelect.value = currentSelection;
            }
            renderIsolationChart(); // Dispara a renderização inicial do segundo gráfico
        }
    }

    export function renderIsolationChart() {
        const ctx = document.getElementById('isolationChart');
        const select = document.getElementById('exerciseIsolationSelect');
        const history = JSON.parse(window.FitApp.safeGet('fitapp_week_log') || '[]');
        
        if (!ctx || !select || !select.value) {
            if (isolationChartInstance) isolationChartInstance.destroy();
            return;
        }

        const targetExercise = select.value;
        const chartDataMap = {}; // Agrupar por data para achar a Carga Máxima do dia

        history.forEach(log => {
            if (log.data) {
                const setsOfExercise = log.data.filter(set => set.exercise === targetExercise);
                if (setsOfExercise.length > 0) {
                    const dateStr = new Date(log.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                    // Encontra a maior carga levantada naquele dia específico para este exercício
                    const maxKg = Math.max(...setsOfExercise.map(s => parseFloat(s.kg) || 0));
                    
                    if (maxKg > 0) {
                        chartDataMap[dateStr] = maxKg;
                    }
                }
            }
        });

        const labels = Object.keys(chartDataMap);
        const dataPoints = Object.values(chartDataMap);

        if (isolationChartInstance) isolationChartInstance.destroy();

        if (labstate.els.length === 0) return;

        isolationChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Carga Máxima (Kg)',
                    data: dataPoints,
                    borderColor: '#a64dff',
                    backgroundColor: 'rgba(166, 77, 255, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#00ff88',
                    pointRadius: 4,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', titleColor: '#00ff88', bodyColor: '#fff', borderColor: '#a64dff', borderWidth: 1 }
                },
                scales: {
                    y: { beginAtZero: false, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#888' } },
                    x: { grid: { display: false }, ticks: { color: '#888', maxTicksLimit: 6 } }
                }
            }
        });
    }

 // ==========================================
    // FUNÇÕES RESIDUAIS MOVIDAS DO APP.JS
    // ==========================================
    
    export function renderPreviewList() {
        const list = document.getElementById('previewList');
        if (!list) return;
        list.innerHTML = '';
        
        const allMuscles = ['svg-peito', 'svg-ombro', 'svg-biceps', 'svg-triceps', 'svg-costas', 'svg-trapezio', 'svg-core', 'svg-quadriceps', 'svg-posterior', 'svg-gluteo', 'svg-panturrilha'];
        allMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.style.fill = '#222'; el.style.stroke = '#444'; }
        });

        const activeMuscles = new Set();
        
        state.currentRoutine.forEach((bloco, bIndex) => {
            const blockTitle = document.createElement('h4');
            blockTitle.style.color = 'var(--theme-secondary)';
            blockTitle.style.marginTop = '15px';
            blockTitle.style.marginBottom = '10px';
            blockTitle.style.borderBottom = '1px solid #333';
            blockTitle.style.paddingBottom = '5px';
            blockTitle.textContent = bloco.title;
            list.appendChild(blockTitle);

            bloco.exercises.forEach((ex, eIndex) => {
                const dictItem = typeof window.dictionaryData !== 'undefined' ? window.dictionaryData.find(d => d.name === ex.name) : null;
                const focusStr = dictItem ? (dictItem.group + ' ' + dictItem.focus).toLowerCase() : ex.name.toLowerCase();
                
                const f = focusStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                
                if (f.includes('peito')) activeMuscles.add('svg-peito');
                if (f.includes('ombro') || f.includes('deltoide')) activeMuscles.add('svg-ombro');
                if (f.includes('biceps') || f.includes('braco')) activeMuscles.add('svg-biceps');
                if (f.includes('triceps')) activeMuscles.add('svg-triceps');
                if (f.includes('costa') || f.includes('dorsal') || f.includes('lombar')) activeMuscles.add('svg-costas');
                if (f.includes('trapezio')) activeMuscles.add('svg-trapezio');
                if (f.includes('core') || f.includes('abdom')) activeMuscles.add('svg-core');
                if (f.includes('quadriceps') || f.includes('perna') && !f.includes('posterior') && !f.includes('gluteo')) activeMuscles.add('svg-quadriceps');
                if (f.includes('posterior') || f.includes('isquio')) activeMuscles.add('svg-posterior');
                if (f.includes('gluteo')) activeMuscles.add('svg-gluteo');
                if (f.includes('panturrilha') || f.includes('gastro')) activeMuscles.add('svg-panturrilha');

                const item = document.createElement('div');
                item.className = 'preview-item';
                
                const safeName = escapeHTML(ex.name);
                const safeTarget = escapeHTML(ex.target);
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;

                item.innerHTML = `
                    <div style="flex: 1;">
                        <div style="font-weight: bold; color: #fff; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                            ${safeName}
                            <a href="${ytLink}" target="_blank" title="Ver execução no YouTube" style="text-decoration: none; font-size: 16px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🎥</a>
                        </div>
                        <div style="font-size: 12px; color: var(--theme-primary); margin-top: 4px; font-weight: bold;">${ex.sets}x ${safeTarget}</div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="window.FitApp.openSwapModal(${bIndex}, ${eIndex})" style="background: #333; border: none; color: #fff; padding: 6px 10px; border-radius: 4px; cursor: pointer;">🔄</button>
                        <button onclick="window.FitApp.removeExercise(${bIndex}, ${eIndex})" style="background: #333; border: none; color: #ff4d4d; padding: 6px 10px; border-radius: 4px; cursor: pointer;">❌</button>
                    </div>
                `;
                list.appendChild(item);
            });
        });

        activeMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) { 
                el.style.fill = 'var(--theme-primary)'; 
                el.style.stroke = '#fff';
            }
        });
    }

    export function removeExercise(bIndex, eIndex) {
        state.currentRoutine[bIndex].exercises.splice(eIndex, 1);
        renderPreviewList();
    }

    export function openAddExerciseModal() {
        document.getElementById('addExerciseModal').style.display = 'flex';
        document.getElementById('searchAddInput').value = '';
        document.getElementById('addExerciseConfig').style.display = 'none';
        filterAddModal();
    }

    let currentCategoryFilter = 'todos';

    export function setCategoryFilter(category, btnElement) {
        currentCategoryFilter = category;
        
        const chips = document.querySelectorAll('.filter-chip');
        chips.forEach(chip => {
            chip.style.background = '#2a2a2a';
            chip.style.color = '#aaa';
            chip.style.borderColor = '#444';
        });
        
        btnElement.style.background = 'rgba(166, 77, 255, 0.2)';
        btnElement.style.color = '#a64dff';
        btnElement.style.borderColor = '#a64dff';

        filterAddModal(); 
    }

    export function filterAddModal() {
        const query = document.getElementById('searchAddInput').value.toLowerCase();
        const list = document.getElementById('addExerciseList');
        list.innerHTML = '';
        
        const filtered = window.dictionaryData.filter(d => {
            const matchesText = d.name.toLowerCase().includes(query) || d.focus.toLowerCase().includes(query);
            const muscleGroup = getMuscleGroup(d.focus);
            const matchesCategory = currentCategoryFilter === 'todos' || muscleGroup === currentCategoryFilter;
            return matchesText && matchesCategory;
        });
        
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'swap-item';
            div.innerHTML = `<div class="swap-item-name">${item.name}</div><div class="swap-item-focus">${item.focus}</div>`;
            div.onclick = () => {
                document.getElementById('selectedExerciseName').textContent = item.name;
                document.getElementById('addExerciseConfig').style.display = 'block';
                document.getElementById('addExerciseModal').querySelector('.swap-modal-content').scrollTop = 1000;
            };
            list.appendChild(div);
        });
    }

    export function confirmAddExercise() {
        const name = document.getElementById('selectedExerciseName').textContent;
        const sets = document.getElementById('customSets').value;
        const target = document.getElementById('customReps').value;
        
        if (state.currentRoutine.length === 0) {
            state.currentRoutine.push({ title: "Meu Treino Livre", exercises: [] });
        }
        
        state.currentRoutine[0].exercises.push({ name, sets: parseInt(sets), target });
        
        document.getElementById('addExerciseModal').style.display = 'none';
        renderPreviewList();
        if(state.audioEnabled) window.FitApp.speak("Exercício adicionado.");
    }

    export function checkCompletedCards() {
        const history = JSON.parse(window.FitApp.safeGet('fitapp_week_log') || '[]');
        
        ['A', 'B', 'C', 'D'].forEach(t => {
            const card = document.getElementById('card-' + t);
            if (card) card.classList.remove('completed-card');
        });

        if (history.length === 0) return;

        const d = new Date();
        const offset = d.getTimezoneOffset() * 60000;
        const dataHoje = (new Date(d.getTime() - offset)).toISOString().split('T')[0];
        const currentMethod = document.getElementById('mainMethodSelector') ? document.getElementById('mainMethodSelector').value : 'ppl';

        const treinosHoje = history.filter(h => h.date === dataHoje && (h.method === currentMethod || !h.method)).map(h => h.tipo);

        treinosHoje.forEach(tipo => {
            const card = document.getElementById('card-' + tipo);
            if (card) card.classList.add('completed-card');
        });
        
        let cycleComplete = false;
        if (currentMethod === 'abcd' && treinosHoje.includes('A') && treinosHoje.includes('B') && treinosHoje.includes('C') && treinosHoje.includes('D')) cycleComplete = true;
        else if (currentMethod !== 'abcd' && treinosHoje.includes('A') && treinosHoje.includes('B') && treinosHoje.includes('C')) cycleComplete = true;

        if (cycleComplete) {
            ['A', 'B', 'C', 'D'].forEach(t => {
                const card = document.getElementById('card-' + t);
                if (card) card.classList.remove('completed-card');
            });
        }
    }   