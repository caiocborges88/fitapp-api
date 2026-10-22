export const newId = () => crypto.randomUUID();
export const measurementForTarget=target=>/(?:^|[\s\d.,–-])(?:seg(?:undo)?s?|s|min(?:uto)?s?)\b/i.test(String(target||''))?'duration':'reps';
export function newExerciseSet(exercise){
    const measurementType=exercise.measurementType||measurementForTarget(exercise.target);
    return {kg:'',reps:'',checked:false,measurementType,...(measurementType==='duration'?{durationSecs:''}:{})};
}
export function workoutLabel(type, templates = []) {
    if (type === 'Cardio') return 'Aeróbico';
    if (String(type).startsWith('custom_')) return templates.find(item=>String(item.id)===type.slice(7))?.name || 'Ficha pessoal';
    if (['Livre','novo_customizado','custom_ia'].includes(type)) return 'Treino pessoal';
    return /^[A-D]$/.test(type) ? `Treino ${type}` : String(type || 'Treino');
}
export const sessionLabel = (session,templates=[]) => session.workoutName || workoutLabel(session.tipo,templates);
export const readJSON = (value, fallback) => {
    try { return JSON.parse(value || 'null') ?? fallback; } catch { return fallback; }
};
export function normalizeDictionary(entries) {
    return entries.map(item => ({
        ...item,
        id: item.id || item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        focus: item.subLevel || item.focus || item.group || 'Geral',
        subLevel: item.subLevel || item.focus || 'Geral',
        desc: item.desc || 'Respeite seus limites e confira a execução com seu instrutor.',
        nivel: Math.max(1, Math.min(3, Number(item.nivel) || 1))
    }));
}
export function normalizeRoutine(routine) {
    if (!Array.isArray(routine)) throw new Error('Rotina inválida.');
    const blocks = routine.map(block => ({
        ...block,
        type: ['traditional', 'superset', 'circuit'].includes(block.type) ? block.type : 'traditional',
        title: String(block.title || 'Treino').slice(0, 120),
        exercises: (Array.isArray(block.exercises) ? block.exercises : []).map(ex => ({
            ...ex, id: ex.id || newId(), name: (globalThis.window?.dictionaryData?.find(item=>item.aliases?.includes(ex.name))?.name || String(ex.name || '').trim()).slice(0, 120),
            sets: Number(ex.sets), target: String(ex.target || '10-12 rep').slice(0, 50),
            ...(['duration','reps'].includes(ex.measurementType)?{measurementType:ex.measurementType}:measurementForTarget(ex.target)==='duration'?{measurementType:'duration'}:{})
        }))
    }));
    if (!blocks.some(b => b.exercises.length)) throw new Error('Não há exercícios disponíveis para os filtros selecionados.');
    for (const block of blocks) for (const ex of block.exercises) {
        if (!ex.name || !Number.isInteger(ex.sets) || ex.sets < 1 || ex.sets > 10) throw new Error('Revise os exercícios e o número de séries (1 a 10).');
    }
    return blocks;
}
export function completedSets(routine) {
    return routine.flatMap((block, bi) => block.exercises.flatMap((ex, ei) => (ex.setsData || []).slice(0, ex.sets).flatMap((set, i) => set?.checked ? [{
        exercise: ex.name, exerciseId: ex.id || `${bi}-${ei}`, set: i + 1,
        kg: Math.max(0, Number(String(set.kg || 0).replace(',', '.')) || 0),
        reps: set.measurementType === 'duration' ? 0 : Math.max(0, Number(set.reps) || 0),
        ...(set.measurementType === 'duration' ? {measurementType:'duration', durationSecs:Math.max(0, Number(set.durationSecs) || 0)} : {}),
        notes: String(ex.notes || '').slice(0, 1000)
    }] : [])));
}
export function mergeHistory(local, cloud, pending = []) {
    const records = new Map();
    for (const entry of [...local, ...cloud, ...pending]) {
        const key = entry._id || `${entry.date}:${entry.tipo}:${entry.duration_secs}:${JSON.stringify(entry.data)}`;
        records.set(key, { ...records.get(key), ...entry });
    }
    return [...records.values()].sort((a,b) => a.date.localeCompare(b.date) || (a.createdAt || 0) - (b.createdAt || 0));
}
