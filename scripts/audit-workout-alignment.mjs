import fs from 'node:fs';
import vm from 'node:vm';
import {expansionScenarios} from './expansion-audit-scenarios.mjs';
import {adaptRoutineToEnvironment, availableInEnvironment, findMovement, sameMuscleFocus} from '../public/js/environment.js';

const context = {window: {}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js', import.meta.url), 'utf8'), context);
const catalogue = context.window.dictionaryData;
const scenarios = [
    ...expansionScenarios,
    {name: 'academia', environment: 'academia', resources: []},
    {name: 'casa-sem-recursos', environment: 'casa', resources: []},
    {name: 'casa-halteres-bancos', environment: 'casa', resources: ['dumbbells', 'bench', 'incline-bench']},
    {name: 'parque-sem-recursos', environment: 'parque', resources: []},
    {name: 'parque-banco-barras', environment: 'parque', resources: ['bench', 'pullup-bar', 'low-bar']},
];
const rows = [];
for (const family of ['dbWorkouts', 'dbWorkoutsFeminino', 'dbWorkoutsTatico']) {
    for (const [method, levels] of Object.entries(context.window[family])) {
        for (const [level, days] of Object.entries(levels)) {
            for (const [day, routine] of Object.entries(days)) {
                for (const scenario of scenarios) {
                    const options = {...scenario, level};
                    const adapted = adaptRoutineToEnvironment(routine, catalogue, options);
                    const issues = [];
                    routine.forEach((block, bi) => block.exercises.forEach((entry, ei) => {
                        const source = findMovement(catalogue, entry.name);
                        const result = adapted.routine[bi].exercises[ei];
                        const target = findMovement(catalogue, result.name);
                        let reason;
                        if (!source) reason = 'Movimento original ausente do catálogo';
                        else if (result.needsReview) reason = result.reviewReason;
                        else if (!availableInEnvironment(target, options)) reason = 'Recurso incompatível';
                        else if (source.name !== target.name && !sameMuscleFocus(source, target)) reason = 'Substituição alterou foco ou padrão';
                        else if (level === 'iniciante' && target.nivel === 3) reason = 'Movimento avançado no iniciante';
                        if (reason) issues.push({block: bi + 1, position: ei + 1, movement: entry.name, subLevel: source?.subLevel, focus: source?.muscleFocus, pattern: source?.movementPattern, code: result.reviewCode, reason});
                    }));
                    rows.push({family, method, level, day, scenario: scenario.name, status: issues.length ? 'revisar' : 'compatível', issues});
                }
            }
        }
    }
}
const summary = scenarios.map(s => {
    const subset = rows.filter(r => r.scenario === s.name);
    return {scenario: s.name, routines: subset.length, compatible: subset.filter(r => !r.issues.length).length, review: subset.filter(r => r.issues.length).length, issues: subset.reduce((n, r) => n + r.issues.length, 0)};
});
const report = {scope: 'Compatibilidade estrutural das fichas prontas; não avalia prescrição, IA, fichas pessoais ou interface.', catalogueSize: catalogue.length, summary, rows};
fs.writeFileSync(new URL('../audit/workout-alignment.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
console.table(summary);
console.log('Relatório: audit/workout-alignment.json');
