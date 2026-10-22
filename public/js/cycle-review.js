import {state} from './state.js';
import {escapeHTML} from './utils.js';
import {reviewRoutine} from './routine-review.js';
import {environmentOptions} from './environment.js';
import {analyzeCoverage,isCoreMovement} from './routine-coverage.js';
import {createCoverageView} from './coverage-view.js';
import {findMovement} from './environment.js';

const typeLabel = type => type === 'superset' ? 'Bi-set' : type === 'circuit' ? 'Circuito' : 'Tradicional';

export function renderCycleReview(container) {
    const issues=reviewRoutine(state.currentRoutine,window.dictionaryData,environmentOptions());
    const context = state.editorContext;
    const days = context.days || [...new Set(state.currentRoutine.map(block => block.day))];
    if (!days.includes(context.activeDay)) context.activeDay = days[0];
    const activeDay = context.activeDay;
    const coverage=analyzeCoverage(state.currentRoutine,window.dictionaryData,{...environmentOptions(),days});
    const entries = state.currentRoutine.map((block, index) => ({block, index}));
    const exerciseCount = blocks => blocks.reduce((total, {block}) => total + block.exercises.length, 0);
    const summary = document.createElement('div');
    summary.className = 'cycle-overview';
    summary.innerHTML = `<span><strong>${days.length}</strong> dias no ciclo</span><span><strong>${exerciseCount(entries)}</strong> posições de exercícios</span><span>Core sem pendência em ${coverage.filter(day=>day.hasCore).length}/${days.length} dias</span>`;
    container.append(summary);

    const tabs = document.createElement('div');
    tabs.className = 'cycle-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Dias do ciclo completo');
    days.forEach((day, dayIndex) => {
        const blocks = entries.filter(entry => entry.block.day === day);
        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'cycle-tab-' + day;
        button.className = 'cycle-tab';
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', String(day === activeDay));
        button.setAttribute('aria-controls', 'cycle-day-panel');
        button.tabIndex = day === activeDay ? 0 : -1;
        button.innerHTML = `<strong>Treino ${escapeHTML(day)}</strong><span>${exerciseCount(blocks)} exercícios · ${blocks.length} blocos</span>`;
        const select = selectedDay => {
            context.activeDay = selectedDay;
            renderCycleReviewInto(container);
            document.getElementById('cycle-tab-' + selectedDay)?.focus({preventScroll:true});
        };
        button.addEventListener('click', () => select(day));
        button.addEventListener('keydown', event => {
            const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
            if (!keys.includes(event.key)) return;
            event.preventDefault();
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? days.length - 1 : (dayIndex + (event.key === 'ArrowRight' ? 1 : -1) + days.length) % days.length;
            select(days[next]);
        });
        tabs.append(button);
    });
    container.append(tabs);

    const panel = document.createElement('section');
    panel.id = 'cycle-day-panel';
    panel.className = 'cycle-day-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'cycle-tab-' + activeDay);
    panel.tabIndex = 0;
    const dayEntries = entries.filter(entry => entry.block.day === activeDay);
    const heading = document.createElement('div');
    heading.className = 'cycle-day-intro';
    const muscles = [...new Set(dayEntries.flatMap(({block}) => block.exercises.map(ex =>
        window.dictionaryData.find(item => item.name === ex.name)?.group).filter(Boolean)))];
    heading.innerHTML = `<h3>Treino ${escapeHTML(activeDay)}</h3><p>${muscles.map(escapeHTML).join(' · ')}</p>`;
    panel.append(heading);
    panel.append(createCoverageView(state.currentRoutine.filter(block=>block.day===activeDay),window.dictionaryData,environmentOptions(),(state.coverageReference||state.currentRoutine).filter(block=>block.day===activeDay)));
    const grid = document.createElement('div');
    grid.className = 'cycle-block-grid';
    dayEntries.forEach(({block, index}, position) => {
        const card = document.createElement('article');
        card.className = 'cycle-block-card';
        if (block.exercises.length&&block.exercises.every(ex=>isCoreMovement(findMovement(window.dictionaryData,ex.name)))) card.classList.add('cycle-abdominal-card');
        const header = document.createElement('div');
        header.className = 'cycle-block-header';
        header.innerHTML = `<span class="cycle-block-number">${String(position + 1).padStart(2, '0')}</span><h4>${escapeHTML(block.title)}</h4><span class="badge">${typeLabel(block.type)}</span>`;
        card.append(header);
        const exerciseList = document.createElement('ul');
        exerciseList.className = 'cycle-exercise-list';
        block.exercises.forEach((ex,exerciseIndex) => {
            const item = document.createElement('li');
            item.innerHTML = `<span>${escapeHTML(ex.name)}</span><strong>${Number(ex.sets)} × ${escapeHTML(ex.target)}</strong>`;
            const issue=issues.find(entry=>entry.blockIndex===index&&entry.exerciseIndex===exerciseIndex);
            if (issue) {
                const warning = document.createElement('p');
                warning.className = 'environment-warning';
                warning.textContent = issue.message;
                item.append(warning);
            }
            exerciseList.append(item);
        });
        if (!block.exercises.length) exerciseList.innerHTML = '<li>Bloco vazio. Adicione exercícios antes de salvar.</li>';
        card.append(exerciseList);
        const details = document.createElement('details');
        details.className = 'cycle-block-editor';
        details.open = context.editingBlock === block;
        const toggle = document.createElement('summary');
        toggle.textContent = 'Editar bloco';
        details.append(toggle);
        details.addEventListener('toggle', () => {
            if (details.open) context.editingBlock = block;
            else if (context.editingBlock === block) context.editingBlock = null;
        });
        const fields = document.createElement('div');
        fields.className = 'cycle-edit-fields';
        fields.innerHTML = `<label class="field">Nome do bloco<input data-block-title maxlength="120" value="${escapeHTML(block.title)}"></label><label class="field">Execução<select data-block-type><option value="traditional">Séries tradicionais</option><option value="superset">Par de exercícios</option><option value="circuit">Circuito</option></select></label>`;
        fields.querySelector('[data-block-type]').value = block.type || 'traditional';
        fields.querySelector('[data-block-title]').addEventListener('input', event => {
            window.FitEditor.changeBlock(index, 'title', event.target.value);
            header.querySelector('h4').textContent = block.title;
        });
        fields.querySelector('[data-block-type]').addEventListener('change', event => window.FitEditor.changeBlock(index, 'type', event.target.value));
        block.exercises.forEach((ex, exerciseIndex) => {
            const edit = document.createElement('div');
            edit.className = 'cycle-exercise-editor';
            edit.innerHTML = `<strong>${escapeHTML(ex.name)}</strong><div class="editor-exercise-fields"><label>Séries<input class="editor-sets" type="number" min="1" max="10" value="${Number(ex.sets)}"></label><label>Meta<input class="editor-target" maxlength="50" value="${escapeHTML(ex.target)}"></label></div><div class="cycle-edit-actions"><button type="button" class="text-button" data-swap>Trocar</button><button type="button" class="text-button" data-remove>Remover</button><button type="button" class="icon-button" data-up aria-label="Mover exercício para cima" ${exerciseIndex === 0 ? 'disabled' : ''}>↑</button><button type="button" class="icon-button" data-down aria-label="Mover exercício para baixo" ${exerciseIndex === block.exercises.length-1 ? 'disabled' : ''}>↓</button></div>`;
            const refreshSummary = () => {
                exerciseList.children[exerciseIndex].querySelector('strong').textContent = `${ex.sets} × ${ex.target}`;
            };
            edit.querySelector('.editor-sets').addEventListener('change', event => {
                window.FitEditor.changeExercise(index, exerciseIndex, 'sets', event.target.value);
                event.target.value = ex.sets;
                refreshSummary();
            });
            edit.querySelector('.editor-target').addEventListener('input', event => {
                window.FitEditor.changeExercise(index, exerciseIndex, 'target', event.target.value);
                refreshSummary();
            });
            edit.querySelector('[data-swap]').addEventListener('click', () => window.FitApp.openSwapModal(index, exerciseIndex));
            edit.querySelector('[data-remove]').addEventListener('click', () => window.FitApp.removeExercise(index, exerciseIndex));
            edit.querySelector('[data-up]').addEventListener('click', () => window.FitEditor.moveExercise(index, exerciseIndex, -1));
            edit.querySelector('[data-down]').addEventListener('click', () => window.FitEditor.moveExercise(index, exerciseIndex, 1));
            fields.append(edit);
        });
        const moves = document.createElement('div');
        moves.className = 'cycle-edit-actions';
        moves.innerHTML = `<button type="button" class="text-button" data-block-up ${position === 0 ? 'disabled' : ''}>↑ Subir bloco</button><button type="button" class="text-button" data-block-down ${position === dayEntries.length-1 ? 'disabled' : ''}>↓ Descer bloco</button>`;
        moves.querySelector('[data-block-up]').addEventListener('click', () => window.FitEditor.moveBlock(index, -1));
        moves.querySelector('[data-block-down]').addEventListener('click', () => window.FitEditor.moveBlock(index, 1));
        fields.append(moves);
        details.append(fields);
        card.append(details);
        grid.append(card);
    });
    panel.append(grid);
    container.append(panel);
}

function renderCycleReviewInto(container) {
    container.replaceChildren();
    renderCycleReview(container);
}
