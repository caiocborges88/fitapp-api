import {withExecution,executionHint,referenceCompatible,recordUnit,classificationLabel} from './execution-contract.js';
import {effectsReduced} from './appearance.js';
import {availableInEnvironment,environmentOptions} from './environment.js';
import {reviewRoutine} from './routine-review.js';
import {modelSettings} from './model-settings.js';
import {createCoverageView} from './coverage-view.js';
import {renderEnvironmentProposalReview} from './environment-proposal-controls.js';
import {renderCycleReview} from './cycle-review.js';
import {decoratePreview} from './mobile-flow.js';
import {icon} from './icons.js';
import {retiredMethod} from './workout-methods.js';
import {isWorkoutModel,modelLabel} from './workout-models.js';
import {appendBlockControls,appendOptionalControls,appendSaveSessionChanges,appendExecutionControl,appendResourceReview} from './model-controls.js';
import {createSessionComparison,renderTrainingTracking} from './training-tracking-view.js';
import {sideLabel,readTrainingContext} from './training-tracking.js';
const cssColor = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
import { state } from './state.js';
import { completedSets, readJSON , sessionLabel,newExerciseSet,measurementForTarget,blockEnabled,setsForDisplay} from './domain.js';
import { FitAudio } from './audio.js';
import { escapeHTML, parseSafeFloat, getMuscleGroup } from './utils.js';
let radarChartInstance = null;
let isolationChartInstance = null;

    export function renderLibrary() {
        const grid = document.getElementById('libraryGrid');
        if (!grid) return;
        grid.innerHTML = '';

        // 1. O Funil Absoluto: Força a categorização em apenas 8 gavetas limpas
        const categorize = (item) => {
            const searchStr = (item.classification?.region || ((item.group || '') + ' ' + (item.focus || ''))).toLowerCase();
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
            if(item.selectable===false)return;
            const key = categorize(item);
            groups[key].push(item);
        });

        const groupTitles = {
            'peito': 'Peitoral',
            'costas': 'Costas & Dorsais',
            'pernas': 'Membros Inferiores',
            'ombros': 'Ombros & Deltoides',
            'triceps': 'Tríceps',
            'biceps': 'Bíceps',
            'core': 'Core & Abdômen',
            'outros': 'Mobilidade & Outros'
        };

        for (const [key, title] of Object.entries(groupTitles)) {
            if (groups[key].length === 0) continue;

            const categorySection = document.createElement('div');
            categorySection.className = 'library-category-section';

            const header = document.createElement('h3');
            header.style.backgroundColor = 'var(--surface)';
            header.style.color = 'var(--ink)';
            header.style.marginTop = '15px';
            header.style.marginBottom = '0px';
            header.style.border = '1px solid var(--line)';
            header.style.borderRadius = '8px';
            header.style.padding = '15px';
            header.style.textTransform = 'uppercase';
            header.style.fontSize = '14px';
            header.style.cursor = 'pointer';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.boxShadow = 'var(--shadow)';

            // O contador de exercícios agora aparece limpo ao lado do título
            header.innerHTML = `<span>${title} <span style="color: var(--subtle); font-size: 11px;">(${groups[key].length})</span></span><span class="toggle-arrow" style="font-size: 12px; color: var(--subtle); transition: transform 0.3s;">▼</span>`;
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
                header.style.borderColor = isVisible ? 'var(--line)' : 'var(--accent)'; // Destaca a pasta aberta
            };

            // Ordena em ordem alfabética dentro da gaveta
            groups[key].sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                const card = document.createElement('div');
                card.className = 'library-card';

                const safeName = escapeHTML(item.displayName || item.name || 'Exercício');
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const equipStr = item.equip ? item.equip.replace(/_/g, ' ') : 'N/A';

                // 3. Cartões Ativos: Design limpo com Munição e botão de YouTube
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div class="lib-name" style="flex: 1; font-size: 15px;">${safeName}</div>
                        <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" style="text-decoration: none; font-size: 18px; margin-left: 10px; background: var(--line); padding: 4px 8px; border-radius: 6px; border: 1px solid var(--line);" title="Ver Execução no YouTube">${icon('video')}</a>
                    </div>
                    <div class="lib-focus" style="margin-top: 5px; font-size: 11px;">${escapeHTML(classificationLabel(item))}</div>
                    <div style="font-size: 11px; color: var(--subtle); margin-top: 8px; background: var(--surface); padding: 4px 8px; border-radius: 4px; display: inline-block; border: 1px dashed var(--line);">
                        🛠️ Munição: ${escapeHTML(equipStr)}
                    </div>
                `;
                const guidance=document.createElement('details');guidance.innerHTML='<summary>Orientações</summary>';const paragraph=document.createElement('p');paragraph.textContent=item.desc;guidance.append(paragraph);card.append(guidance);
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
            const searchStr = (item.classification?.region || ((item.group || '') + ' ' + (item.focus || ''))).toLowerCase();
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
            if(ex.selectable===false)return;
            const exName = [ex.name,ex.displayName,...(ex.aliases||[])].filter(Boolean).join(' ');
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
            if (el) { el.style.fill = 'var(--surface-soft)'; el.style.stroke = 'var(--line)'; }
        });

        // 2. Acende os músculos relevantes com base na paleta do tema atual
        activeMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.fill = 'var(--theme-primary)';
                el.style.stroke = 'var(--ink)';
            }
        });

        const groupTitles = {
            'peito': 'Peitoral',
            'costas': 'Costas & Dorsais',
            'pernas': 'Membros Inferiores',
            'ombros': 'Ombros & Deltoides',
            'triceps': 'Tríceps',
            'biceps': 'Bíceps',
            'core': 'Core & Abdômen',
            'outros': 'Mobilidade & Outros'
        };

        for (const [key, title] of Object.entries(groupTitles)) {
            if (groups[key].length === 0) continue;

            const categorySection = document.createElement('div');
            categorySection.className = 'library-category-section';

            const header = document.createElement('h3');
            header.style.backgroundColor = 'var(--surface)';
            header.style.color = 'var(--ink)';
            header.style.marginTop = '15px';
            header.style.marginBottom = '0px';
            header.style.border = '1px solid var(--line)';
            header.style.borderRadius = '8px';
            header.style.padding = '15px';
            header.style.textTransform = 'uppercase';
            header.style.fontSize = '14px';
            header.style.cursor = 'pointer';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.boxShadow = 'var(--shadow)';

            const isOpen = query.length > 0;
            header.style.borderColor = isOpen ? 'var(--accent)' : 'var(--line)';

            header.innerHTML = `<span>${title} <span style="color: var(--subtle); font-size: 11px;">(${groups[key].length})</span></span><span class="toggle-arrow" style="font-size: 12px; color: var(--subtle); transition: transform 0.3s; transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}">▼</span>`;
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
                header.style.borderColor = isVisible ? 'var(--line)' : 'var(--accent)';
            };

            // Ordena em ordem alfabética e renderiza
            groups[key].sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                const card = document.createElement('div');
                card.className = 'library-card';
                card.style.background = 'var(--surface)';
                card.style.border = '1px solid var(--surface-soft)';
                card.style.borderLeft = '4px solid var(--secondary)';

                const safeName = escapeHTML(item.displayName || item.name || 'Exercício');
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const equipStr = item.equip ? item.equip.replace(/_/g, ' ') : 'N/A';

                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div class="lib-name" style="flex: 1; font-size: 15px; color: var(--ink); font-weight: bold;">${safeName}</div>
                        <a href="https://www.youtube.com/results?search_query=${ytQuery}" target="_blank" style="text-decoration: none; font-size: 18px; margin-left: 10px; background: var(--secondary-soft); padding: 4px 8px; border-radius: 6px; border: 1px solid var(--secondary);" title="Ver Execução no YouTube">${icon('video')}</a>
                    </div>
                    <div class="lib-focus" style="margin-top: 8px; font-size: 11px; color: var(--muted);">${escapeHTML(classificationLabel(item))}</div>
                    <div style="font-size: 11px; color: var(--accent); margin-top: 8px; background: var(--accent-soft); padding: 4px 8px; border-radius: 4px; display: inline-block; border: 1px dashed var(--accent-soft);">
                        🎒 Requer: ${escapeHTML(equipStr)}
                    </div>
                `;
                const guidance=document.createElement('details');guidance.innerHTML='<summary>Orientações</summary>';const paragraph=document.createElement('p');paragraph.textContent=item.desc;guidance.append(paragraph);card.append(guidance);
                cardContainer.appendChild(card);
            });

            categorySection.appendChild(cardContainer);
            grid.appendChild(categorySection);
        }
    }

    export function updateDynamicCards() {
        const savedPlan=readJSON(window.FitApp.safeGet('fitapp_campaign_data'),null);
        const method = savedPlan?.method || document.getElementById('mainMethodSelector')?.value || 'abc';
        for(const id of ['profileSelector','levelSelector'])document.getElementById(id)?.closest('label')?.toggleAttribute('hidden',isWorkoutModel(method));
        const lowerFocus = document.getElementById('profileSelector')?.value === 'feminino';
        const parameters=document.getElementById('modelPreferencesDescription');
        if(parameters)parameters.textContent=modelSettings(method,document.getElementById('profileSelector')?.value,state.els.levelSelector?.value).description;
        const labels = {
            abc_tradicional:[['Push','Peito, ombros, tríceps e core'],['Pull','Costas, ombro posterior, braços e core'],['Pernas','Quadríceps, posteriores, quadril e panturrilhas']],
            abc_sinergista:[['Push','Pares selecionados, complementos e core'],['Pull','Pares selecionados, braços e core'],['Pernas','Pares e séries convencionais; adutora e abdutora incluídas']],
            abc: lowerFocus ? [['Posterior e Glúteos','Posteriores, glúteos e core'],['Superiores','Costas, peito e braços'],['Anterior','Quadríceps e panturrilhas']] : [['Push','Peito, ombros e tríceps'],['Pull','Costas, ombros e bíceps'],['Legs','Pernas e panturrilhas']],
            abcd: lowerFocus ? [['Anterior','Quadríceps e panturrilhas'],['Superiores','Costas, peito e braços'],['Posterior','Isquiotibiais e glúteos'],['Glúteos','Glúteos e panturrilhas']] : [['Push','Peito e tríceps'],['Anterior','Quadríceps e panturrilhas'],['Pull','Costas e bíceps'],['Posterior','Isquiotibiais e ombros']],
            biset_sinergista: [['Peito + Tríceps','Pares complementares'],['Costas + Bíceps','Pares complementares'],['Pernas + Ombros','Pares complementares']],
            circuito: [['Circuito 1','FullBody'],['Circuito 2','FullBody'],['Circuito 3','FullBody']]
        };
        const plan = retiredMethod(method)?['A','B','C','D'].map(day=>savedPlan?.workouts?.[day]?.length?['Personalizado','Sua ficha salva; edição manual disponível']:null):labels[method === 'ppl' ? 'abc' : method] || labels.abc;
        const planTitle = document.getElementById('planCardTitle');
        if (planTitle) planTitle.textContent = {
            abc:'Treino ABC', ppl:'Treino ABC · Push / Pull / Legs', abcd:'Treino ABCD',
            biset_sinergista:'Treino ABC · Bi-set complementar', circuito:'Circuito · corpo inteiro'
        }[method] || (isWorkoutModel(method)?modelLabel(method):retiredMethod(method)?'Plano salvo · personalizado':'Ficha de treino');
        if(planTitle && savedPlan?.method===method && savedPlan.name)planTitle.textContent=savedPlan.name;
        const daysList=document.getElementById('planDaysList');if(daysList)daysList.innerHTML='';
        ['A','B','C','D'].forEach((day,index) => {
            const card = document.getElementById('card-' + day);
            if (!card) return;
            card.style.display = plan[index] ? 'block' : 'none';
            if (!plan[index]) return;
            card.querySelector('h3').textContent = `Treino ${day} — ${plan[index][0]}`;
            if(savedPlan?.workoutNames?.[day]&&savedPlan.method===method)card.querySelector('h3').textContent=savedPlan.workoutNames[day];
            card.querySelector('p').textContent = plan[index][1];
        });
        const availableDays=Object.entries(savedPlan?.workouts||{}).filter(([,routine])=>Array.isArray(routine)&&routine.length);
        const panel=document.getElementById('currentPlanPanel');if(panel)panel.hidden=!availableDays.length;
        const title=document.getElementById('currentPlanName');if(title)title.textContent=savedPlan?.name||(isWorkoutModel(method)?modelLabel(method):'Meu plano');
        for(const [day,routine]of availableDays){
            const row=document.createElement('article');row.className='plan-day-row';
            const name=savedPlan.workoutNames?.[day]||'Treino '+day;
            const heading=document.createElement('h3');heading.textContent=name;
            const count=document.createElement('p');count.textContent=routine.filter(blockEnabled).reduce((sum,block)=>sum+block.exercises.length,0)+' exercícios';
            const info=document.createElement('div');info.append(heading,count);
            const view=document.createElement('button');view.type='button';view.className='button secondary';view.textContent='Ver exercícios';view.setAttribute('aria-label','Ver exercícios de '+name);view.onclick=()=>window.FitApp.startWorkout(day);
            const options=document.createElement('details');options.className='plan-day-options';
            const summary=document.createElement('summary');summary.textContent='Opções';summary.setAttribute('aria-label','Opções de '+name);
            const edit=document.createElement('button');edit.type='button';edit.className='text-button';edit.textContent='Editar '+name;edit.onclick=()=>window.FitEditor.editPlanDay(day);
            options.append(summary,edit);row.append(info,view,options);daysList?.append(row);
        }
        window.FitApp.checkCompletedCards();
    }

    export function renderCurrentRoutine() {
        for (const timer of state.exerciseTimers) clearInterval(timer);
        state.exerciseTimers.clear();
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

        const historyLog = readJSON(window.FitApp.safeGet('fitapp_week_log'), []);

        // ⚡ OPÇÃO GOLF (Performance): Cria um fragmento de memória virtual para evitar Layout Thrashing
        const virtualFragment = document.createDocumentFragment();

        state.currentRoutine.forEach((bloco, bIndex) => {
            if(!blockEnabled(bloco))return;
            const isBiset = bloco.type === 'superset' || bloco.type === 'circuit';
            const cardClass = isBiset ? 'biset-card' : 'tradicional-card';

            const card = document.createElement('div'); card.className = cardClass;
            if (!isBiset) card.style.borderLeft = '4px solid var(--secondary)';

            card.innerHTML = `
                <div class="biset-title" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <span class="block-name">${escapeHTML(bloco.title)}</span>
                    <span class="toggle-icon" style="transition: transform 0.3s; font-size: 14px; color: var(--subtle);">▲</span>
                </div>`;

            // BLINDAGEM: O clique manual agora recolhe visualmente sem mascarar o bloco como concluído
            card.querySelector('.biset-title').addEventListener('click', () => {
                card.classList.toggle('minimized-block');
            });

            appendBlockControls(card,bloco,bIndex);
            if(bIndex===0)appendResourceReview(card);
            bloco.exercises.forEach((ex, eIndex) => {
                const blockDiv = document.createElement('div'); blockDiv.className = 'exercise-block';

                let linkIcon = '';
                if (isBiset && eIndex < bloco.exercises.length - 1) {
                    linkIcon = ' <span style="color:var(--accent);" title="Par de exercícios">🔗</span>';
                }

                const safeName = escapeHTML(ex.execution?.label||ex.name);
                const safeTarget = escapeHTML(ex.target);
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;
                const savedNotes = ex.notes ? escapeHTML(ex.notes) : '';

                let aiSuggestionHTML = '';
                const lastWorkoutMatch = historyLog.slice().reverse().find(log =>
                    log.data && log.data.some(d => d.exercise === ex.name&&referenceCompatible(ex,d))
                );

                if (lastWorkoutMatch) {
                    const lastSets = lastWorkoutMatch.data.filter(d => d.exercise === ex.name&&referenceCompatible(ex,d));
                    if (lastSets.length > 0) {
                            const finalSet = lastSets[lastSets.length - 1];
                            let suggestedKg = parseFloat(finalSet.kg) || 0;
                            const repsDone = parseInt(finalSet.reps) || 0;

                            // BLINDAGEM: Força o String() antes de aplicar o filtro .replace()
                            const targetStr = ex.target ? String(ex.target).replace(/[^0-9-]/g, '') : "10";
                            let targetHigh = parseInt(targetStr.split('-').pop()) || 10;

                        // A carga anterior é uma referência, não uma prescrição de aumento automático.

                        if (suggestedKg > 0) {
                            aiSuggestionHTML = `<span style="font-size: 10px; background: var(--secondary-soft); color: var(--secondary); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--secondary); font-weight: bold; margin-right: auto;" title="Sugestão baseada no seu último treino">Última carga: ${suggestedKg}kg</span>`;
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
                            <span class="ex-name" data-open-dict="true" style="line-height: 1.3; flex: 1; padding-right: 10px;">${safeName}${linkIcon}</span>
                            <button class="btn-swap" onclick="window.FitApp.openSwapModal(${bIndex}, ${eIndex})" title="Substituir Exercício" style="margin-top: -4px;">${icon('swap')}</button>
                        </div>

                        ${aiSuggestionHTML ? `<div style="width: 100%; margin-top: -5px; margin-bottom: 5px;">${aiSuggestionHTML}</div>` : ''}

                        <!-- LINHA 2: Barra de Ferramentas (Toolbars) -->
                        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">

                            <!-- Esquerda: Controles de Execução Primários -->
                            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <div style="display: flex; align-items: center; background: var(--surface-soft); border-radius: 8px; padding: 2px 6px; border: 1px solid var(--line);">
                                    <button class="btn-edit-set" onclick="window.FitApp.changeSets(${bIndex}, ${eIndex}, -1)" style="background: none; border: none; color: var(--danger); font-weight: bold; font-size: 16px; padding: 0 5px; cursor: pointer;">-</button>
                                    <span style="font-size: 12px; color: var(--muted); margin: 0 5px; font-weight: bold;">${ex.sideMode==='alternating'?ex.sets/2+' por lado':ex.sets+'x'}</span>
                                    <button class="btn-edit-set" onclick="window.FitApp.changeSets(${bIndex}, ${eIndex}, 1)" style="background: none; border: none; color: var(--accent); font-weight: bold; font-size: 16px; padding: 0 5px; cursor: pointer;">+</button>
                                </div>
                                <span class="target-reps" style="padding: 4px 8px; font-size: 11px;">${safeTarget}</span>
                                <button id="btnAuto_${bIndex}_${eIndex}" onclick="window.FitApp.toggleAutoPilot(${bIndex}, ${eIndex})" style="background: var(--accent-soft); border: 1px solid var(--accent); color: var(--accent); border-radius: 8px; padding: 4px 8px; font-size: 11px; font-weight: bold; cursor: pointer; transition: all 0.2s;" title="Modo Hands-Free">${icon('clock')} Intervalos</button>
                            </div>

                            <!-- Direita: Ferramentas Secundárias Agrupadas -->
                            <div style="display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--line); padding: 6px 12px; border-radius: 8px;">
                                <button onclick="window.FitApp.cloneFirstSet(${bIndex}, ${eIndex})" style="background: none; border: none; cursor: pointer; font-size: 15px; padding: 0; filter: grayscale(100%) brightness(200%);" title="Replicar valores da S1">${icon('copy')}</button>
                                <button class="btn-notes" style="background: none; border: none; cursor: pointer; font-size: 15px; padding: 0;" title="Anotações">${icon('note')}</button>
                                <a href="${ytLink}" target="_blank" style="text-decoration: none; font-size: 16px; margin-top: 1px;" title="Buscar demonstração no YouTube">${icon('video')}</a>
                            </div>
                        </div>
                    </div>
                    <div id="${noteContainerId}" class="notes-container" style="display: ${isNoteOpen}; background: var(--surface); padding: 10px; border-radius: 6px; border-left: 2px solid var(--secondary); margin-bottom: 12px; margin-top: 5px;">
                        <textarea id="notes_input_${bIndex}_${eIndex}" class="ex-notes-input" placeholder="Suas observações sobre este exercício…" style="width: 100%; background: transparent; border: none; color: var(--muted); font-size: 12px; resize: vertical; min-height: 45px; outline: none;">${savedNotes}</textarea>
                    </div>`;

                if(ex.execution){const hint=document.createElement('p');hint.className='execution-hint';hint.textContent=executionHint(ex);blockDiv.append(hint);}
                appendExecutionControl(blockDiv,ex);
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
                        ex.setsData[s-1] = newExerciseSet(ex);
                    }
                    const data = ex.setsData[s-1];
                    if(!data.measurementType)data.measurementType=data.checked||String(data.reps??'')!==''?'reps':ex.measurementType||measurementForTarget(ex.target);

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
                        const lastSets = lastWorkoutMatch.data.filter(d => d.exercise === ex.name&&referenceCompatible(ex,d));
                        const pastSet = lastSets.find(d => parseInt(d.set) === s) || lastSets[lastSets.length - 1];
                        if (pastSet) {
                            if (pastSet.kg) ghostKg = pastSet.kg;
                            if (pastSet.reps) ghostReps = pastSet.reps;
                        }
                    }

                    let displayKg = data.kg;
                    let displayReps = data.measurementType === 'duration' ? data.durationSecs : data.reps;

                    // BLINDAGEM UX: Removemos o preenchimento automático rígido. Os valores fantasmas agora são 'placeholders' translúcidos.
                    const placeholderKg = ghostKg !== '' ? ghostKg : 'Kg';
                    const placeholderReps = data.measurementType === 'duration' ? 'Seg' : ghostReps !== '' ? ghostReps : 'Reps';

                    const sideLabel=ex.sideMode==='alternating'?(s%2?'E':'D')+Math.ceil(s/2):'S'+s;
                    row.innerHTML = `<div class="set-label">${sideLabel}</div><input type="number" min="0" step="0.5" aria-label="Carga em kg, série ${s}" id="${kgId}" class="kg-val" placeholder="${placeholderKg}" value="${escapeHTML(displayKg)}"><input type="number" min="0" aria-label="Quantidade, série ${s}" id="${rpId}" class="rp-val" placeholder="${placeholderReps}" value="${escapeHTML(displayReps ?? '')}"><select class="set-measure" aria-label="Unidade, série ${s}" ${ex.sideMode||ex.execution?'disabled':''}><option value="reps" ${data.measurementType !== 'duration' ? 'selected' : ''}>rep</option><option value="duration" ${data.measurementType === 'duration' ? 'selected' : ''}>seg</option></select><button class="btn-iso" title="Cronômetro para série por tempo" aria-label="Iniciar ou pausar cronômetro da série ${s}" ${data.measurementType !== 'duration' ? 'disabled' : ''}>⏱</button><input type="checkbox" aria-label="${ex.sideMode==='alternating'?'Série '+Math.ceil(s/2)+', lado '+(s%2?'esquerdo':'direito'):'Série '+s} realizada" id="${chkId}" class="chk-set" ${data.checked ? 'checked' : ''}>`;

                    row.classList.toggle('set-confirmed',Boolean(data.checked));
                    const chk = row.querySelector('.chk-set');
                    const kgInp = row.querySelector('.kg-val');
                    const rpInp = row.querySelector('.rp-val');
                    const btnIso = row.querySelector('.btn-iso');
                    const measure = row.querySelector('.set-measure');
                    if(ex.execution?.count==='per-side')chk.setAttribute('aria-label','Série '+s+' realizada em ambos os lados');
                    if(ex.execution?.load==='dumbbells-total')kgInp.setAttribute('aria-label','Soma dos halteres utilizados em kg, série '+s);
                    if(ex.execution?.load==='bar-total')kgInp.setAttribute('aria-label','Barra e anilhas em kg, série '+s);
                    const labelMeasurement=()=>rpInp.setAttribute('aria-label',(measure.value==='duration'?'Duração em segundos':ex.execution?.count==='per-side'?'Repetições por lado':'Repetições')+', série '+s);
                    labelMeasurement();

                    const updateState = () => {
                        ex.setsData[s-1] = { ...ex.setsData[s-1], kg: kgInp.value, measurementType:measure.value, checked:chk.checked,
                            ...(measure.value === 'duration' ? {durationSecs:rpInp.value} : {reps:rpInp.value}) };
                        state.todayLog = completedSets(state.currentRoutine);
                        return window.FitApp.saveWorkoutState();
                    };

                    let differenceDetails=null;
                    if(ex.execution?.count==='per-side'){
                        const extra=document.createElement('details');extra.className='set-difference';
                        const summary=document.createElement('summary');summary.textContent='Diferença entre os lados';
                        const label=document.createElement('label'),different=document.createElement('input');different.type='checkbox';different.checked=Boolean(data.sideDifference);
                        label.append(different,document.createTextNode('Os resultados foram diferentes'));
                        const note=document.createElement('textarea');note.maxLength=400;note.setAttribute('aria-label','Diferenças entre os lados, série '+s);note.placeholder='Ex.: esquerdo 10; direito 8. Informe também se a carga mudou.';note.value=data.notes||'';
                        const save=()=>{ex.setsData[s-1].sideDifference=different.checked;ex.setsData[s-1].notes=note.value;updateState();};
                        different.addEventListener('change',save);note.addEventListener('input',save);extra.append(summary,label,note);differenceDetails=extra;
                    }
                    let localIsoTimer = null;
                    const stopIso = () => { if(localIsoTimer){clearInterval(localIsoTimer);state.exerciseTimers.delete(localIsoTimer);}localIsoTimer=null;btnIso.textContent='⏱'; };
                    measure.addEventListener('change',()=>{
                        stopIso();
                        rpInp.value = measure.value === 'duration' ? ex.setsData[s-1].durationSecs || '' : ex.setsData[s-1].reps || '';
                        rpInp.placeholder = measure.value === 'duration' ? 'Seg' : 'Reps';
                        labelMeasurement();
                        btnIso.disabled = measure.value !== 'duration';
                        updateState();
                    });
                    btnIso.addEventListener('click', () => {
                        if (localIsoTimer) {
                            stopIso();
                        } else {
                            btnIso.textContent = '⏸️';
                            const startedAt=Date.now()-(Number(rpInp.value)||0)*1000;
                            localIsoTimer = setInterval(() => {
                                rpInp.value = Math.floor((Date.now()-startedAt)/1000);
                                updateState();
                            }, 1000);
                            state.exerciseTimers.add(localIsoTimer);
                        }
                    });

                    kgInp.addEventListener('input', updateState);
                    rpInp.addEventListener('input', updateState);

                    chk.addEventListener('change', () => {
                        stopIso();
                        const previousChecked=Boolean(ex.setsData[s-1]?.checked);
                        if(chk.checked&&(rpInp.value===''||Number(rpInp.value)<=0)){chk.checked=previousChecked;window.FitApp.showToast('Informe as repetições ou os segundos realizados.');return;}
                        if(chk.checked&&ex.setsData[s-1]?.sideDifference&&!ex.setsData[s-1]?.notes?.trim()){chk.checked=previousChecked;window.FitApp.showToast('Descreva os resultados de cada lado na observação desta série.');return;}
                        if(!updateState()){chk.checked=previousChecked;ex.setsData[s-1].checked=previousChecked;state.todayLog=completedSets(state.currentRoutine);return;}
                        if (chk.checked) {
                            if(ex.setsData[s-1]?.sideDifference&&!ex.setsData[s-1]?.notes?.trim()){chk.checked=false;window.FitApp.showToast('Descreva os resultados de cada lado na observação desta série.');return;}
                            // TRANSIÇÃO DE FANTASMA PARA MATERIAL: Se o campo estava vazio, herda o fantasma antes de registrar o PR
                            if (rpInp.value === '' || Number(rpInp.value) <= 0) {
                                chk.checked=false;window.FitApp.showToast('Informe as repetições ou os segundos realizados.');rpInp.focus();return;
                            }

                            // SISTEMA DE RECORDE PESSOAL (PR)
                            const currentKg = parseSafeFloat(kgInp.value);
                            const currentReps = parseInt(rpInp.value) || 0;
                            const pKg = parseSafeFloat(ghostKg);
                            const pReps = parseInt(ghostReps) || 0;

                            let isPR = false;
                            if (!ex.setsData[s-1].sideDifference && measure.value !== 'duration' && (ghostKg !== '' || ghostReps !== '')) {
                                if (currentKg > pKg) {
                                    isPR = true;
                                } else if (currentKg === pKg && currentReps > pReps) {
                                    isPR = true;
                                }
                            }

                            if (isPR) {
                                row.classList.add('pr-breaker');
                                FitAudio.revealEpic();
                                window.FitApp.showToast('Registro acima da referência anterior.');
                            } else {
                                row.classList.remove('pr-breaker');
                            }

                            state.checkedSets++;


                            // --- LÓGICA DE BI-SET (Sinergia de Descanso) ---
                            updateState();
                            let pendingCompanions = 0;
                            const allInSetChecked = state.currentRoutine[bIndex].exercises.every(e => {
                                if (!e.setsData[s-1]) return true;
                                if (!e.setsData[s-1].checked) {
                                    pendingCompanions++;
                                    return false;
                                }
                                return true;
                            });

                            if ((!isBiset || allInSetChecked) && (ex.sideMode!=='alternating'||ex.setsData[(s-1)^1]?.checked) && state.checkedSets < state.totalSets) {
                                window.FitApp.startRestTimer(card, ex.name,false,bloco);
                            } else if (isBiset && pendingCompanions > 0) {
                                window.FitApp.showToast(`🔗 Bi-Set Ativo: Complete o movimento parceiro (Série ${s}) para iniciar o descanso.`);
                            }

                            state.todayLog = completedSets(state.currentRoutine);
                        } else {
                            row.classList.remove('pr-breaker'); // Reseta a cor caso desmarque
                            state.checkedSets--;
                            window.FitApp.stopRestTimer();
                            state.todayLog = state.todayLog.filter(log => !(log.exercise === ex.name && log.set === s));
                        }
                        row.classList.toggle('set-confirmed',chk.checked);
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
                    if(differenceDetails)blockDiv.append(differenceDetails);
                }
                blockDiv.querySelector('[data-open-dict]')?.addEventListener('click', () => window.FitApp.openDict(ex.name));
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
        appendOptionalControls(state.els.exerciseList);
        appendSaveSessionChanges(state.els.exerciseList);

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
        document.body.classList.remove('theme-feminino', 'theme-definicao', 'theme-tatico');
    }

    export function switchTab(tabId, navId) {
        if(document.getElementById('tab-perfil')?.classList.contains('active')&&tabId!=='tab-perfil'){
            let reverted=false;
            for(const [key,id] of [['main_method','mainMethodSelector'],['profile','profileSelector'],['level','levelSelector']]){
                const saved=window.FitApp.safeGet('fitapp_'+key),field=document.getElementById(id);
                if(saved&&field&&field.value!==saved){field.value=saved;reverted=true;}
            }
            if(reverted)window.FitApp.showToast('Preferências não aplicadas foram descartadas. O plano salvo foi preservado.');
        }
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));

        // NOVO: Travas de segurança para evitar erro de classList null
        const tabEl = document.getElementById(tabId);
        if (tabEl) tabEl.classList.add('active');

        const navEl = document.getElementById(navId);
        if (navEl) navEl.classList.add('active');

        // Distribuição tática das renderizações
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

        const history = readJSON(window.FitApp.safeGet('fitapp_week_log'), []);

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

            let dotColor = 'var(--surface-soft)';
            let textColor = 'var(--muted)';
            let typeLabel = '';
            let shadow = 'none';

            if (workedOut) {
                dotColor = workedOut.tipo === 'Livre' ? 'var(--secondary)' : 'var(--accent)';
                textColor = 'var(--on-accent)';
                typeLabel = /^[A-D]$/.test(workedOut.tipo) ? workedOut.tipo : workedOut.tipo === 'Cardio' ? 'AER' : 'T';
                shadow = 'none';
            }

            const isToday = i === 0;
            const dayLabelColor = isToday ? 'var(--ink)' : 'var(--muted)';
            const fontWeight = isToday ? 'bold' : 'normal';

            dayEl.innerHTML = `
                <span style="font-size: 11px; color: ${dayLabelColor}; font-weight: ${fontWeight}; text-transform: capitalize;">${dayName}</span>
                <div style="width: 34px; height: 34px; border-radius: 50%; background: ${dotColor}; display: flex; justify-content: center; align-items: center; font-size: 14px; font-weight: bold; color: ${textColor}; box-shadow: ${shadow}; border: 1px solid var(--line);">
                    ${typeLabel}
                </div>
            `;
            grid.appendChild(dayEl);
        }
    }

    export function renderMonthlyCalendar() {
        const container = document.getElementById('historyCalendarView');
        container.innerHTML = '';

        const history = readJSON(window.FitApp.safeGet('fitapp_week_log'), []);
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
        header.style.color = 'var(--ink)';
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
            dayLabel.style.color = 'var(--muted)';
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
            dayCell.style.background = isWorkoutDay ? 'var(--accent-soft)' : 'var(--surface)';
            dayCell.style.color = isWorkoutDay ? 'var(--accent)' : 'var(--ink)';
            dayCell.style.border = isWorkoutDay ? '1px solid var(--accent)' : '1px solid var(--line)';
            dayCell.style.fontWeight = isWorkoutDay ? 'bold' : 'normal';

            if (isToday) {
                dayCell.style.boxShadow = 'inset 0 0 0 2px var(--secondary)';
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

        const savedCustoms = readJSON(window.FitApp.safeGet('fitapp_custom_workouts'), []);

        if (savedCustoms.length === 0) {
            listEl.innerHTML = '<p class="saved-workouts-empty">Nenhuma ficha adicional. Use Adicionar treino se já tiver uma ficha própria.</p>';
            return;
        }

        savedCustoms.forEach((workout,index) => {
            const div = document.createElement('div');
            div.className = 'saved-workout';
            div.style.borderLeftColor = 'var(--secondary)';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            div.style.padding = '15px';

            div.innerHTML = `
                <button class="template-open" data-start-template="true">
                    <span class="template-name">${escapeHTML(workout.name)}</span>
                    <span class="template-detail">${workout.routine.reduce((sum,block)=>sum+block.exercises.length,0)} exercícios</span>
                </button>
                <details class="template-menu"><summary>Opções<span class="visually-hidden"> de ${escapeHTML(workout.name)}</span></summary><div class="template-actions">
                    <button class="text-button" data-edit-template="true">Editar</button>
                    <button class="text-button" data-duplicate-template="true">Duplicar</button>
                    <button class="icon-button" data-order="-1" aria-label="Mover ficha para cima" ${index===0?'disabled':''}>↑</button>
                    <button class="icon-button" data-order="1" aria-label="Mover ficha para baixo" ${index===savedCustoms.length-1?'disabled':''}>↓</button>
                </div>
                <button data-delete-workout="${escapeHTML(workout.id)}" class="text-button" title="Excluir ficha" aria-label="Excluir ${escapeHTML(workout.name)}">Excluir ficha</button></details>
            `;
            div.querySelector('[data-start-template]')?.addEventListener('click', () => window.FitApp.startWorkout('custom_' + workout.id));
            div.querySelector('[data-edit-template]').addEventListener('click',()=>window.FitEditor.editTemplate(workout.id));
            div.querySelector('[data-duplicate-template]').addEventListener('click',()=>window.FitEditor.duplicateWorkout(workout.id));
            div.querySelectorAll('[data-order]').forEach(button=>button.addEventListener('click',()=>window.FitEditor.reorderTemplate(workout.id,Number(button.dataset.order))));
            div.querySelector('[data-delete-workout]')?.addEventListener('click', event => window.FitApp.deleteCustomWorkout(workout.id, event));
            listEl.appendChild(div);
        });
    }

    export function renderHistoryList() {
        const container = document.getElementById('historyListView');
        container.innerHTML = '';
        let history = readJSON(window.FitApp.safeGet('fitapp_week_log'), []);

        if (history.length === 0) {
            container.innerHTML = '<div class="empty-state"><img class="empty-illustration" src="illustrations/movement.svg" alt="" width="160" height="120"><p>Nenhum treino salvo ainda.</p></div>';
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
            block.style.background = 'var(--surface-soft)';
            block.style.borderRadius = '8px';
            block.style.marginBottom = '10px';
            block.style.border = '1px solid var(--line)';

            const header = document.createElement('div');
            header.style.padding = '12px';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.cursor = 'pointer';
            header.style.borderLeft = log.tipo === 'Livre' ? '4px solid var(--secondary)' : '4px solid var(--accent)';

            // Oculta o botão de lixeira se o treino não tiver o ID da nuvem (offline)
            const trashBtnDisplay = log._id ? 'block' : 'none';

            header.innerHTML = `
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: var(--ink);">${escapeHTML(sessionLabel(log,readJSON(window.FitApp.safeGet('fitapp_custom_workouts'),[])))}</div>
                    <div style="font-size: 12px; color: var(--muted);">${dateStr} • ⏱️ ${durationStr}</div>
                    <span class="badge history-completion">${log.complete===true?'Completo':log.complete===false?'Parcial':'Conclusão não informada'}</span>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button onclick="event.stopPropagation(); window.FitApp.exportStravaCard(${history.length - 1 - reversedHistory.indexOf(log)})" style="background: transparent; border: none; font-size: 20px; cursor: pointer; color: var(--accent);" title="Compartilhar resumo">${icon('share')}</button>
                    <button onclick="event.stopPropagation(); window.FitApp.deleteHistoryLog('${log._id}')" style="display: ${trashBtnDisplay}; background: transparent; border: none; font-size: 18px; color: var(--danger); cursor: pointer;" title="Excluir Treino">${icon('trash')}</button>
                    ${log.complete && log.duration_secs >= 120 && log._id ? '<button data-claim-reward="true" title="Abrir recompensa deste treino" style="background:transparent;border:0;cursor:pointer;font-size:20px;">📦</button>' : ''}
                    <div class="toggle-arrow" style="color: var(--subtle); font-size: 12px; transition: transform 0.3s; margin-left: 5px;">▼</div>
                </div>
            `;

            const body = document.createElement('div');
            body.style.padding = '0 12px 12px 12px';
            body.style.display = 'none';
            body.style.borderTop = '1px dashed var(--line)';
            body.style.marginTop = '5px';
            body.style.paddingTop = '10px';

            if (log.data && log.data.length > 0) {
                const exMap = Object.create(null);
                log.data.forEach(item => {
                    const key=item.exerciseId?JSON.stringify([item.exercise,item.exerciseId]):item.exercise;
                    if (!exMap[key]) exMap[key] = [];
                    exMap[key].push(item);
                });

                for (const sets of Object.values(exMap)) {
                    const exName=sets[0].exercise,profile=readTrainingContext(log.trainingContext)?.execution.flatMap(b=>b.exercises).find(ex=>ex.id===sets[0].exerciseId)?.execution;
                    const displayName=profile?.label?profile.label+(profile.choice?' · '+profile.choice:''):exName;
                    const exDiv = document.createElement('div');
                    exDiv.style.marginBottom = '8px';
                    exDiv.innerHTML = `<div style="color: var(--secondary); font-size: 13px; font-weight: bold;">${escapeHTML(displayName)}</div>`;

                    if (exName === 'Cardio') {
                        const c = sets[0];
                        const distStr = c.dist_km > 0 ? `<span style="background: var(--surface); padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid var(--line); color: var(--secondary);">🏃 ${c.dist_km} km</span>` : '';
                        const kcalStr = c.kcal > 0 ? `<span style="background: var(--surface); padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid var(--line); color: var(--warning);">🔥 ${c.kcal} kcal</span>` : '';
                        const bpmStr = c.bpm_medio > 0 ? `<span style="background: var(--surface); padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid var(--line); color: var(--danger);">❤️ ${c.bpm_medio} bpm</span>` : '';
                        const timeStr = c.tempo_segundos > 0 ? `<span style="background: var(--surface); padding: 2px 6px; border-radius: 4px; margin-right: 4px; border: 1px solid var(--line); color: var(--muted);">⏱️ ${Math.floor(c.tempo_segundos/60)} min</span>` : '';
                        exDiv.innerHTML += `<div style="margin-top: 6px;">${distStr}${kcalStr}${bpmStr}${timeStr}</div>`;
                    } else {
                        const setStr = sets.map(s => `<span class="history-set">${sideLabel(s)}: ${Number(s.kg)||0} kg · ${s.measurementType === 'duration' ? (Number(s.durationSecs)||0)+' s' : (Number(s.reps)||0)+' '+recordUnit(s)}</span>`).join('');
                        exDiv.innerHTML += `<div style="margin-top: 4px; line-height: 1.8;">${setStr}</div>`;
                        for(const set of sets)if(set.notes){const note=document.createElement('p');note.textContent=sideLabel(set)+': '+set.notes;exDiv.append(note);}
                    }
                    body.appendChild(exDiv);
                }
            } else {
                body.innerHTML = '<div style="font-size: 12px; color: var(--subtle);">Sem dados detalhados.</div>';
            }

            if(log.tipo!=='Cardio')body.append(createSessionComparison(log));
            header.querySelector('[data-claim-reward]')?.addEventListener('click', event => { event.stopPropagation(); window.FitGamification.showPackModal(false, log._id); });
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
        renderTrainingTracking();
        const history = readJSON(window.FitApp.safeGet('fitapp_week_log'), []);
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
                    if(set.executionKey&&set.measurementType !== 'duration' && Number(set.kg)>0)allExecutedExercises.add(set.exercise); // Adiciona ao arsenal usado

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
            type: 'bar',
            data: {
                labels: Object.keys(muscleCounts),
                datasets: [{
                    label: 'Séries no Mês',
                    data: Object.values(muscleCounts),
                    backgroundColor: cssColor('--accent'),
                    borderColor: cssColor('--accent'),
                    pointBackgroundColor: cssColor('--secondary'),
                    pointBorderColor: cssColor('--ink'),
                    pointHoverBackgroundColor: cssColor('--ink'),
                    pointHoverBorderColor: cssColor('--secondary'),
                    borderWidth: 2
                }]
            },
            options: {
                animation: effectsReduced() ? false : {duration:220},
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {beginAtZero:true,grid:{color:cssColor('--line')},ticks:{precision:0,color:cssColor('--muted')}},
                    y: {grid:{display:false},ticks:{color:cssColor('--muted')}}
                },
                plugins: { legend: { display: false } }
            }
        });

        // --- PREPARAÇÃO DO SELETOR: RASTREADOR DE SOBRECARGA ---
        if (exSelect) {
            const currentSelection = exSelect.value;
            exSelect.innerHTML = '<option value="">Selecione um exercício do histórico...</option>';
            Array.from(allExecutedExercises).sort().forEach(ex => {
                exSelect.innerHTML += `<option value="${escapeHTML(ex)}">${escapeHTML(ex)}</option>`;
            });
            if (currentSelection && allExecutedExercises.has(currentSelection)) {
                exSelect.value = currentSelection;
            }
            isolationContainer.style.display=allExecutedExercises.size?'block':'none';
            if(!exSelect.value && exSelect.options.length>1)exSelect.selectedIndex=1;
            renderIsolationChart(); // Dispara a renderização inicial do segundo gráfico
        }
    }

    export function renderIsolationChart() {
        const ctx = document.getElementById('isolationChart');
        const select = document.getElementById('exerciseIsolationSelect');
        const history = readJSON(window.FitApp.safeGet('fitapp_week_log'), []);

        if (!ctx || !select || !select.value) {
            if (isolationChartInstance) isolationChartInstance.destroy();
            return;
        }

        const targetExercise = select.value;
        const reference=history.flatMap(log=>log.data||[]).filter(set=>set.exercise===targetExercise&&set.executionKey&&!set.notes?.includes('Diferença entre os lados:')).at(-1)?.executionKey;
        const chartDataMap = {}; // Agrupar por data para achar a Carga Máxima do dia

        history.forEach(log => {
            if (log.data) {
                const setsOfExercise = log.data.filter(set => reference&&set.executionKey===reference&&!set.notes?.includes('Diferença entre os lados:')&&set.exercise === targetExercise && set.measurementType !== 'duration');
                if (setsOfExercise.length > 0) {
                    const dateStr = log.date;
                    // Encontra a maior carga levantada naquele dia específico para este exercício
                    const maxKg = Math.max(...setsOfExercise.map(s => parseFloat(s.kg) || 0));

                    if (maxKg > 0) {
                        chartDataMap[dateStr] = Math.max(chartDataMap[dateStr] || 0, maxKg);
                    }
                }
            }
        });

        const labels = Object.keys(chartDataMap).sort();
        const dataPoints = labels.map(label => chartDataMap[label]);

        if (isolationChartInstance) isolationChartInstance.destroy();

        if (labels.length === 0) return;

        isolationChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Carga Máxima (Kg)',
                    data: dataPoints,
                    borderColor: cssColor('--secondary'),
                    backgroundColor: cssColor('--secondary-soft'),
                    borderWidth: 3,
                    pointBackgroundColor: cssColor('--accent'),
                    pointRadius: 4,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                animation: effectsReduced() ? false : {duration:220},
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: cssColor('--surface'), titleColor: cssColor('--accent'), bodyColor: cssColor('--ink'), borderColor: cssColor('--secondary'), borderWidth: 1 }
                },
                scales: {
                    y: { beginAtZero: false, grid: { color: cssColor('--line') }, ticks: { color: cssColor('--subtle') } },
                    x: { grid: { display: false }, ticks: { color: cssColor('--subtle'), maxTicksLimit: 6 } }
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
        renderSessionParameters(list);
        refreshCoverage();
        list.innerHTML = '';

        const issues=reviewRoutine(state.currentRoutine,window.dictionaryData,environmentOptions());
        if(issues.length){
            const review=document.createElement('section');review.id='routineReview';review.className='panel';review.setAttribute('aria-label','Pendências da ficha');
            const heading=document.createElement('h3');heading.textContent='Revise antes de iniciar';
            const description=document.createElement('p');description.textContent='Corrija as pendências abaixo usando as opções de cada bloco. Esta revisão não altera a ficha salva.';
            const entries=document.createElement('ul');
            for(const issue of issues){const item=document.createElement('li');item.textContent=issue.message;entries.append(item);}
            review.append(heading,description,entries);list.append(review);
        }

        if (state.editorContext?.kind === 'cycle') {
            renderCycleReview(list);
            appendOptionalControls(list);
            decoratePreview(list,issues);
            return;
        }

        renderEnvironmentProposalReview(list);

        const allMuscles = ['svg-peito', 'svg-ombro', 'svg-biceps', 'svg-triceps', 'svg-costas', 'svg-trapezio', 'svg-core', 'svg-quadriceps', 'svg-posterior', 'svg-gluteo', 'svg-panturrilha'];
        allMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.style.fill = 'var(--surface-soft)'; el.style.stroke = 'var(--line)'; }
        });

        const activeMuscles = new Set();
        appendOptionalControls(list);

        state.currentRoutine.forEach((bloco, bIndex) => {
            if(!blockEnabled(bloco))return;
            if (bloco.day && (bIndex === 0 || state.currentRoutine[bIndex-1].day !== bloco.day)) {
                const heading = document.createElement('h3');
                heading.className = 'cycle-day-heading';
                heading.textContent = `Treino ${bloco.day}`;
                list.appendChild(heading);
            }
            const blockTitle = document.createElement('h4');
            blockTitle.style.color = 'var(--theme-secondary)';
            blockTitle.style.marginTop = '15px';
            blockTitle.style.marginBottom = '10px';
            blockTitle.style.borderBottom = '1px solid var(--line)';
            blockTitle.style.paddingBottom = '5px';
            blockTitle.textContent = bloco.title;
            list.appendChild(blockTitle);
            const blockTools=document.createElement('div');blockTools.className='editor-block-tools';
            blockTools.innerHTML=`<span class="badge">${bloco.type==='superset'?'Par de exercícios':bloco.type==='circuit'?'Circuito':'Séries tradicionais'}</span><button class="text-button" data-block-move="-1" ${bIndex===0?'disabled':''}>↑ Mover bloco</button><button class="text-button" data-block-move="1" ${bIndex===state.currentRoutine.length-1?'disabled':''}>↓ Mover bloco</button>`;
            blockTools.querySelectorAll('[data-block-move]').forEach(button=>button.addEventListener('click',()=>window.FitEditor.moveBlock(bIndex,Number(button.dataset.blockMove))));
            list.appendChild(blockTools);
            if(bloco.equipmentPolicy==='bodyweight'){const policy=document.createElement('p');policy.className='badge';policy.textContent='Somente peso corporal e calistenia';list.append(policy);}
            const blockFields=document.createElement('div');blockFields.className='form-grid editor-block-fields';
            blockFields.dataset.blockIndex=bIndex;
            blockFields.innerHTML=`<label class="field">Nome do bloco<input maxlength="120" data-block-title value="${escapeHTML(bloco.title)}"></label><label class="field">Execução<select data-block-type><option value="traditional">Séries tradicionais</option><option value="superset">Par de exercícios</option><option value="circuit">Circuito</option></select></label>`;
            blockFields.querySelector('[data-block-type]').value=bloco.type||'traditional';
            blockFields.querySelector('[data-block-title]').addEventListener('input',event=>{window.FitEditor.changeBlock(bIndex,'title',event.target.value);blockTitle.textContent=state.currentRoutine[bIndex].title;});
            blockFields.querySelector('[data-block-type]').addEventListener('change',event=>window.FitEditor.changeBlock(bIndex,'type',event.target.value));
            list.appendChild(blockFields);
            appendBlockControls(blockFields,bloco,bIndex);

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

                const safeName = escapeHTML(ex.execution?.label||ex.name);
                const safeTarget = escapeHTML(ex.target);
                const ytQuery = encodeURIComponent(`Como executar o exercício ${safeName}`);
                const ytLink = `https://www.youtube.com/results?search_query=${ytQuery}`;

                item.innerHTML = `
                    <div style="flex: 1;">
                        <div style="font-weight: bold; color: var(--ink); font-size: 14px; display: flex; align-items: center; gap: 8px;">
                            ${safeName}
                            <a href="${ytLink}" target="_blank" title="Buscar demonstração no YouTube" style="text-decoration: none; font-size: 16px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">${icon('video')}</a>
                        </div>
                        <div style="font-size: 12px; color: var(--theme-primary); margin-top: 4px; font-weight: bold;">${setsForDisplay(ex)}x ${safeTarget}</div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="window.FitApp.openSwapModal(${bIndex}, ${eIndex})" style="background: var(--line); border: none; color: var(--ink); padding: 6px 10px; border-radius: 4px; cursor: pointer;">${icon('swap')}</button>
                        <button onclick="window.FitApp.removeExercise(${bIndex}, ${eIndex})" style="background: var(--line); border: none; color: var(--danger); padding: 6px 10px; border-radius: 4px; cursor: pointer;">${icon('close')}</button>
                    </div>
                `;
                const movement=window.dictionaryData.find(entry=>entry.name===ex.name);
                const focus=document.createElement('p');focus.className='exercise-focus';focus.textContent='Foco: '+(movement?.subLevel||'Não definido');item.append(focus);
                if(ex._environmentOriginal&&ex._environmentOriginal.name!==ex.name&&!ex.needsReview){
                    const adaptation=document.createElement('p');adaptation.className='exercise-adaptation';adaptation.textContent='Adaptação de: '+ex._environmentOriginal.name+'. Séries e meta mantidas; ajuste a dificuldade ao recurso disponível.';item.append(adaptation);
                }
                const issue=issues.find(entry=>entry.blockIndex===bIndex&&entry.exerciseIndex===eIndex);
                if(issue){const warning=document.createElement('p');warning.className='environment-warning';warning.textContent=issue.message;item.append(warning);}
                list.appendChild(item);
                const fields=document.createElement('div');fields.className='editor-exercise-fields';
                fields.innerHTML=`<label>Séries<input class="editor-sets" type="number" min="1" max="10" value="${Number(ex.sets)}"></label><label>Meta<input class="editor-target" maxlength="50" value="${escapeHTML(ex.target)}"></label><button class="icon-button" data-move-exercise="-1" aria-label="Mover exercício para cima no bloco" ${eIndex===0?'disabled':''}>↑</button><button class="icon-button" data-move-exercise="1" aria-label="Mover exercício para baixo no bloco" ${eIndex===bloco.exercises.length-1?'disabled':''}>↓</button>`;
                if(ex.sideMode==='alternating'){fields.querySelector('label').firstChild.nodeValue='Séries por lado';fields.querySelector('.editor-sets').value=setsForDisplay(ex);fields.querySelector('.editor-sets').max=5;}
                fields.querySelector('.editor-sets').addEventListener('change',event=>{window.FitEditor.changeExercise(bIndex,eIndex,'sets',Number(event.target.value)*(ex.sideMode==='alternating'?2:1));event.target.value=setsForDisplay(state.currentRoutine[bIndex].exercises[eIndex]);});
                fields.querySelector('.editor-target').addEventListener('input',event=>window.FitEditor.changeExercise(bIndex,eIndex,'target',event.target.value));
                fields.querySelectorAll('[data-move-exercise]').forEach(button=>button.addEventListener('click',()=>window.FitEditor.moveExercise(bIndex,eIndex,Number(button.dataset.moveExercise))));
                list.appendChild(fields);
            });
        });

        activeMuscles.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.fill = 'var(--theme-primary)';
                el.style.stroke = 'var(--ink)';
            }
        });
        decoratePreview(list,issues);
    }

    export function refreshCoverage(){
        const list=document.getElementById('previewList');if(!list)return;
        const previous=document.getElementById('sessionCoverage');
        const coverage=createCoverageView(state.currentRoutine,window.dictionaryData,environmentOptions(),state.environmentProposal?.source||state.coverageReference||state.currentRoutine);
        coverage.id='sessionCoverage';coverage.open=previous?.open||false;coverage.hidden=state.editorContext?.kind==='cycle';
        if(previous)previous.replaceWith(coverage);else list.before(coverage);
        const cycle=document.querySelector('#cycle-day-panel .coverage-review');
        if(cycle){const day=state.editorContext.activeDay;const updated=createCoverageView(state.currentRoutine.filter(block=>block.day===day),window.dictionaryData,environmentOptions(),(state.coverageReference||state.currentRoutine).filter(block=>block.day===day));updated.open=cycle.open;cycle.replaceWith(updated);}
    }

    function renderSessionParameters(list){
        let panel=document.getElementById('sessionParameters');
        if(!panel){panel=document.createElement('section');panel.id='sessionParameters';panel.className='panel';list.before(panel);}
        panel.replaceChildren();
        const heading=document.createElement('summary');heading.textContent='Como este modelo foi organizado';
        const description=document.createElement('p');
        const settings=state.previewModel;
        description.textContent=settings?modelSettings(settings.method,settings.profile,settings.level).description+' Séries e metas editadas na ficha prevalecem sobre essa base.':'Ficha personalizada: séries e metas seguem os exercícios cadastrados. O descanso desta sessão começa em 60 s e pode ser ajustado.';
        const explanation=document.createElement('details');explanation.className='parameter-explanation';explanation.append(heading,description);panel.append(explanation);
        if(state.currentRoutine.some(block=>block.modelVersion)){
            description.textContent='Séries, metas e descansos pertencem a cada bloco desta ficha. As trocas preservam a função da posição. Ajustes da sessão só mudam a ficha original pela ação de salvar.';
            appendSaveSessionChanges(panel);return;
        }
        if(state.editorContext?.kind==='cycle')return;
        const label=document.createElement('label');label.className='field';label.textContent='Descanso desta sessão';
        const select=document.createElement('select');select.id='sessionRestSeconds';
        for(const seconds of [...new Set([30,45,60,75,90,120,180,state.currentRestTime])].sort((a,b)=>a-b)){
            const option=document.createElement('option');option.value=seconds;option.textContent=seconds+' s';select.append(option);
        }
        select.value=state.currentRestTime;
        select.addEventListener('change',()=>window.FitApp.adjustRestTime(Number(select.value)));
        label.append(select);panel.append(label);
    }

    export function removeExercise(bIndex, eIndex) {
        state.currentRoutine[bIndex].exercises.splice(eIndex, 1);
        renderPreviewList();
    }

    export function openAddExerciseModal() {
        const target=document.getElementById('addBlockTarget');
        target.innerHTML='';state.currentRoutine.forEach((block,index)=>{const option=document.createElement('option');option.value=index;option.textContent=(block.day?'Treino '+block.day+' · ':'')+block.title;target.appendChild(option);});
        target.value=String(Math.max(0,state.editorContext?.kind==='cycle'?state.currentRoutine.findLastIndex(block=>block.day===state.editorContext.activeDay):state.currentRoutine.length-1));
        target.onchange=filterAddModal;
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
            chip.style.background = 'var(--surface-soft)';
            chip.style.color = 'var(--muted)';
            chip.style.borderColor = 'var(--line)';
        });

        btnElement.style.background = 'var(--secondary-soft)';
        btnElement.style.color = 'var(--secondary)';
        btnElement.style.borderColor = 'var(--secondary)';

        filterAddModal();
    }

    function addEnvironmentOptions(){
        const block=state.currentRoutine[Number(document.getElementById('addBlockTarget').value)||0];
        const permanent=['template','plan'].includes(state.editorContext?.kind);
        return {...environmentOptions(),...(permanent?{environment:'academia'}:{}),equipmentPolicy:block?.equipmentPolicy};
    }
    export function filterAddModal() {
        const query = document.getElementById('searchAddInput').value.toLowerCase();
        const list = document.getElementById('addExerciseList');
        list.innerHTML = '';

        const filtered = window.dictionaryData.filter(d => {
            if(d.selectable===false)return false;
            const matchesText = [d.name,d.displayName,...(d.aliases||[]),d.focus,d.subLevel].filter(Boolean).join(' ').toLowerCase().includes(query);
            const muscleGroup = getMuscleGroup(d);
            const matchesCategory = currentCategoryFilter === 'todos' || muscleGroup === currentCategoryFilter;
            return matchesText && matchesCategory && availableInEnvironment(d,addEnvironmentOptions());
        });

        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'swap-item';
            div.innerHTML = `<div class="swap-item-name">${escapeHTML(item.displayName||item.name)}</div><div class="swap-item-focus">${escapeHTML(item.focus)}</div>`;
            div.onclick = () => {
                document.getElementById('selectedExerciseName').textContent = item.name;
                const targetInput=document.getElementById('customReps');
                if(item.executionProfile?.count.startsWith('duration')&&measurementForTarget(targetInput.value)!=='duration')targetInput.value='';
                targetInput.placeholder=item.executionProfile?.count.startsWith('duration')?'Ex.: 20–30 seg':item.executionProfile?.count==='per-side'?'Ex.: 10–15 rep por lado':'Ex.: 10–15 rep';
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
        if (!name || !Number.isInteger(Number(sets)) || Number(sets) < 1 || Number(sets) > 10) { window.FitApp.showToast('Escolha um exercício e de 1 a 10 séries.'); return; }

        if(!availableInEnvironment(window.dictionaryData.find(item=>item.name===name),addEnvironmentOptions())){window.FitApp.showToast('Escolha um movimento compatível com os recursos e com o tipo de bloco.');return;}
        if (state.currentRoutine.length === 0) {
            state.currentRoutine.push({ title: "Meu Treino Livre", exercises: [] });
        }

        const blockIndex=Number(document.getElementById('addBlockTarget').value)||0;
        const movement=window.dictionaryData.find(m=>m.name===name),ex={ name, sets: parseInt(sets), target };
        if(!String(target).trim()||(movement.executionProfile?.count.startsWith('duration')&&measurementForTarget(target)!=='duration')){window.FitApp.showToast('Informe a meta na unidade desta execução; repetições não são convertidas em segundos.');return;}
        state.currentRoutine[blockIndex].exercises.push(movement.executionProfile?withExecution(ex,movement):ex);

        document.getElementById('addExerciseModal').style.display = 'none';
        renderPreviewList();
        if(state.audioEnabled) window.FitApp.speak("Exercício adicionado.");
    }

    export function checkCompletedCards() {
        const history = readJSON(window.FitApp.safeGet('fitapp_week_log'), []);

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
