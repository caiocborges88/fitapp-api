// js/utils.js
export const escapeHTML = (str) => {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
};

export const parseSafeFloat = (val) => {
    const str = String(val ?? '').trim().replace(',', '.');
    if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(str)) return 0;
    const number = Number(str);
    return Number.isFinite(number) && number >= 0 ? number : 0;
};

export const getMuscleGroup = (item) => {
    // Busca no group, no focus ou diretamente no nome do exercício
    const text = typeof item === 'string' ? item : (item.group || item.focus || item.name || '');
    if (!text) return 'outros';
    const g = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    // Palavras-chave expandidas para garantir que o motor nunca se perde
    if (g.includes('peito') || g.includes('peitoral') || g.includes('supino') || g.includes('crucifixo') || g.includes('voador') || g.includes('crossover')) return 'peito';
    if (g.includes('costa') || g.includes('dorsal') || g.includes('lombar') || g.includes('trapézio') || g.includes('trapezio') || g.includes('remada') || g.includes('puxada') || g.includes('barra fixa') || g.includes('pull-up') || g.includes('chin-up') || g.includes('pulldown')) return 'costas';
    if (g.includes('perna') || g.includes('gluteo') || g.includes('panturrilha') || g.includes('quadriceps') || g.includes('isquio') || g.includes('adutor') || g.includes('agachamento') || g.includes('leg press') || g.includes('afundo') || g.includes('stiff') || g.includes('extensora') || g.includes('flexora')) return 'pernas';
    if (g.includes('ombro') || g.includes('deltoide') || g.includes('desenvolvimento') || g.includes('elevação') || g.includes('elevacao') || g.includes('face pull')) return 'ombros';
    if (g.includes('triceps') || g.includes('tríceps') || g.includes('testa') || g.includes('pulley') || g.includes('coice') || g.includes('mergulho')) return 'triceps';
    if (g.includes('biceps') || g.includes('bíceps') || g.includes('antebraço') || g.includes('rosca')) return 'biceps';
    if (g.includes('core') || g.includes('abdom') || g.includes('obliquo') || g.includes('estabilização') || g.includes('prancha') || g.includes('russian')) return 'core';
    
    return 'outros';
};
