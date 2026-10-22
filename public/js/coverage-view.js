import {analyzeCoverage} from './routine-coverage.js';

const labels={'agachar':'Agachamento','extensao-joelho':'Extensão de joelho','flexao-joelho':'Flexão de joelho','extensao-quadril':'Extensão de quadril','dobrar-quadril':'Dobrar o quadril','puxar-vertical':'Puxada vertical','puxar-horizontal':'Puxada horizontal','empurrar-horizontal':'Empurrada horizontal','empurrar-vertical':'Empurrada vertical','aducao-horizontal':'Adução horizontal','abducao-horizontal':'Abdução horizontal','abducao-horizontal-rotacao-externa':'Abdução horizontal com rotação externa','flexao-ombro':'Flexão de ombro','abducao-ombro':'Abdução de ombro','flexao-cotovelo-supinada':'Flexão de cotovelo supinada','flexao-cotovelo-neutra-pronada':'Flexão de cotovelo neutra/pronada','extensao-cotovelo':'Extensão de cotovelo','extensao-cotovelo-acima':'Extensão de cotovelo acima da cabeça','flexao-plantar':'Flexão plantar','anti-extensao':'Anti-extensão','flexao-tronco':'Flexão de tronco'};
const patternLabel=value=>labels[value]||value.replaceAll('-',' ');
const focusLabel=value=>value.split(' · ').map((part,index)=>index?patternLabel(part):part).join(' · ');
export function createCoverageView(routine,catalogue,options={},sourceRoutine=routine){
    const report=analyzeCoverage(routine,catalogue,options,sourceRoutine);
    const details=document.createElement('details');details.className='coverage-review panel';
    const summary=document.createElement('summary');summary.textContent='Cobertura muscular da ficha';details.append(summary);
    const caption=document.createElement('p');caption.textContent='Ênfases principais do catálogo. Subníveis indicam ênfase; não medem isolamento, esforço ou carga. Outros subníveis listados são uma referência, sem obrigação de incluir todos em cada treino.';details.append(caption);
    for(const day of report){
        const section=document.createElement('section');section.className='coverage-day';
        const heading=document.createElement('h4');heading.textContent=day.day==='Sessão'?'Sessão atual':'Treino '+day.day;
        const count=document.createElement('p');count.textContent=`${day.positions} ${day.positions===1?'posição':'posições'} · ${day.uniqueCount} ${day.uniqueCount===1?'movimento distinto':'movimentos distintos'} · ${day.readyCount} ${day.readyCount===1?'posição sem pendência':'posições sem pendência'} · ${day.sets} ${day.sets===1?'série prevista':'séries previstas'} nessas posições.`;
        section.append(heading,count);
        const list=document.createElement('ul');
        for(const group of day.groups){
            const item=document.createElement('li');
            const title=document.createElement('strong');title.textContent=group.group;item.append(title);
            const subLevels=document.createElement('p');subLevels.textContent='Subníveis presentes: '+(group.subLevels.join('; ')||'Não identificados no cadastro');
            const patterns=document.createElement('p');patterns.textContent='Padrões presentes: '+(group.patterns.map(patternLabel).join('; ')||'Não identificados no cadastro');item.append(subLevels,patterns);
            if(group.otherSubLevels.length){const other=document.createElement('p');other.textContent='Outros subníveis cadastrados, ausentes neste dia: '+group.otherSubLevels.join('; ');item.append(other);}
            list.append(item);
        }
        section.append(list);
        const notes=[];
        if(!day.hasCore)notes.push('Sem movimento de core identificado e sem pendência neste dia. Isso não impede uma ficha manual.');
        if(day.pendingCount)notes.push(`${day.pendingCount} ${day.pendingCount===1?'posição com pendência não foi contabilizada':'posições com pendência não foram contabilizadas'} na cobertura disponível.`);
        if(day.duplicates.length)notes.push('Movimentos repetidos: '+day.duplicates.map(item=>`${item.name} (${item.count} posições)`).join('; ')+'. Repetições não representam movimentos distintos.');
        if(day.unknown.length)notes.push('Cadastros não identificados: '+day.unknown.join('; '));
        if(day.lost.length)notes.push('Ênfases/padrões da referência sem representação disponível nesta versão: '+day.lost.map(focusLabel).join('; '));
        for(const text of notes){const note=document.createElement('p');note.className='coverage-note';note.textContent=text;section.append(note);}
        details.append(section);
    }
    return details;
}
