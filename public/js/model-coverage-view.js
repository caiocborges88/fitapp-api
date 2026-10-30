import {analyzeModelContract} from './model-coverage.js';
const node=(tag,text)=>{const item=document.createElement(tag);item.textContent=text;return item;};
export function createModelCoverageView(routine,catalogue,options={}){
    const report=analyzeModelContract(routine,catalogue,options);if(!report)return null;
    const details=document.createElement('details');details.className='coverage-review panel model-coverage';
    details.append(node('summary','Proposta de cobertura · '+report.label));
    details.append(node('p',`Referência da receita, versão ${report.version}. ${report.days.length===3?'Avaliação do conjunto A + B + C.':'Este recorte não representa o ciclo inteiro.'} Não mede ativação, isolamento ou resultado físico.`));
    if(report.pending.length){const warning=node('p',`${report.pending.length} funções principais precisam de revisão nesta ficha. O relatório não acrescenta movimentos nem bloqueia uma edição manual.`);warning.className='coverage-note';details.append(warning);}
    const list=document.createElement('ul');
    for(const item of report.requirements){
        const status=item.status==='principal'?'Principal previsto':item.status==='optional'?`Complemento ${item.enabled?'ativado':'desativado'}`:item.status==='unknown'?'Revisar movimento ou disponibilidade':item.expected==='optional'?'Complemento não presente':'Sem previsão explícita';
        list.append(node('li',`${item.day} · ${item.label}: ${status}${item.needsAttention?' · previsto como principal na referência':''}.`));
    }
    details.append(list,node('p','Principais e complementos são compromissos diferentes. Um complemento não substitui uma função principal removida.'));
    for(const limit of report.limits)details.append(node('p',limit));
    return details;
}
