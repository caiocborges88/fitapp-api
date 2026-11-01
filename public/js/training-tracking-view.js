import {readJSON} from './domain.js';
import {compareSession,trackingRecords,latestModelPassage,periodTracking,daysSince} from './training-tracking.js';
const node=(tag,text,className)=>{const item=document.createElement(tag);if(text)item.textContent=text;if(className)item.className=className;return item;};
const dateLabel=value=>/^\d{4}-\d{2}-\d{2}$/.test(value||'')?value.split('-').reverse().join('/'):String(value||'');
const typeLabel=value=>value==='superset'?'Bi-set':value==='circuit'?'Circuito':'Séries convencionais';
export function createSessionComparison(log){
    const comparison=compareSession(log),details=node('details',null,'tracking-comparison');
    details.append(node('summary','Previsto e realizado'));
    if(!comparison.known)details.append(node('p','Planejamento inicial indisponível neste registro. Séries não realizadas não podem ser reconstruídas pela ficha atual.'));
    else details.append(node('p','Comparação com a sessão preparada no início. Linhas por lado são registros independentes; não são uma medida de dose muscular.'));
    if(comparison.rows.length){
        const list=node('ul');
        for(const row of comparison.rows){
            const name=row.name===row.performedName?row.name:`${row.name} → ${row.performedName}`;
            const count=row.planned===null?`${row.done} registros · ${comparison.known?'incluído durante a sessão':'sem previsão inicial disponível'}`:`${row.done} de ${row.planned} registros previstos${row.remaining?` · ${row.remaining} não realizados`:''}`;
            const item=node('li');item.append(node('strong',name),...(row.target?[node('p','Meta nesta sessão: '+row.target)]:[]),node('p',`${row.optional?'Complemento':'Principal'} · ${count}${row.sideMode==='alternating'?' · lados separados':''}.`));
            item.append(node('p',`${typeLabel(row.blockType)}${row.restSeconds!==null?` · descanso configurado: ${row.restSeconds} s`:''}${row.changed&&row.planned!==null?' · configuração alterada durante a sessão':''}.`));
            list.append(item);
        }
        details.append(list,node('p','O descanso registrado é a configuração do bloco, não uma medição da pausa efetivamente feita.'));
    }
    return details;
}
export function renderTrainingTracking(){
    const container=document.getElementById('trainingTracking');if(!container)return;
    container.replaceChildren();
    const get=key=>readJSON(window.FitStore?.get(key),[]);
    const records=trackingRecords(get('fitapp_week_log'),get('fitapp_sync_queue'),get('fitapp_deleted_sessions'));
    const plan=readJSON(window.FitStore?.get('fitapp_campaign_data'),null),passage=latestModelPassage(plan,records);
    const strength=records.filter(log=>log.tipo!=='Cardio');
    const scoped=passage?strength.filter(log=>log.campaignId===plan.id):strength;
    const now=new Date(),today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
    container.append(node('h2',passage?'Acompanhamento do plano atual':'Previsto e realizado'));
    container.append(node('p','Registros disponíveis neste dispositivo, incluindo a fila offline. Carregue registros anteriores no histórico para ampliar a leitura.'));
    if(passage){
        container.append(node('h3','Última passagem pelo ABC'));
        container.append(node('p',passage.startsAtA?'Trecho desde o último A salvo, até o registro mais recente. Repetições de dias permanecem visíveis.':'Ainda não há A neste trecho disponível. Não presumimos o início de um ciclo.'));
        for(const day of ['A','B','C']){
            const dayLogs=passage.logs.filter(log=>log.tipo===day),section=node('details',null,'tracking-day');
            section.append(node('summary',`Treino ${day} · ${dayLogs.length?`${dayLogs.length} ${dayLogs.length===1?'registro':'registros'}`:'sem registro neste trecho'}`));
            for(const log of dayLogs){section.append(node('p',`${dateLabel(log.date)} · ${log.complete===true?'Completo':log.complete===false?'Parcial':'Conclusão não informada'} · ${Math.floor((log.duration_secs||0)/60)} min`),createSessionComparison(log));}
            container.append(section);
        }
        for(const day of ['A','B','C']){
            const last=scoped.filter(log=>log.tipo===day).at(-1);
            const elapsed=last?daysSince(last.date,today):null;
            const relative=elapsed===0?'hoje':elapsed===1?'há 1 dia':elapsed!==null?`há ${elapsed} dias`:null;
            container.append(node('p',`Último ${day} disponível: ${last?dateLabel(last.date):'sem registro'}${relative?` · ${relative}`:''}.`));
        }
        container.append(node('p','Um parcial salvo avança a sequência. O trabalho não realizado continua no histórico e não é compensado automaticamente.'));
    }
    const period=periodTracking(scoped,today);
    const summary=node('details',null,'tracking-period');summary.append(node('summary',`Últimos 30 dias${passage?' deste plano':''} · ${period.count} sessões`));
    summary.append(node('p',`${period.partial} parciais · ${period.known} sessões com planejamento inicial · ${period.changed} com alterações identificadas.`));
    summary.append(node('p',`${period.remaining} registros principais previstos e não realizados, somente nas sessões com planejamento disponível. Complementos ficam separados nos detalhes de cada sessão.`));
    if(period.groups.length){const list=node('ul');for(const group of period.groups)list.append(node('li',`${group.group}: ${group.sets} registros realizados.`));summary.append(list);}
    if(period.durations.length){summary.append(node('h3','Duração registrada'));for(const item of period.durations)summary.append(node('p',`${item.day}: média de ${item.meanMinutes} min em ${item.sessions} sessões, incluindo parciais. O relógio não distingue exercício, espera e interrupções.`));}
    if(period.unfinished.length){summary.append(node('h3','Principais que ficaram incompletos'));const list=node('ul');for(const item of period.unfinished)list.append(node('li',`${item.name}: ${item.sessions} sessões · ${item.remaining} registros previstos não realizados.`));summary.append(list);}
    if(period.swaps.length){summary.append(node('h3','Trocas identificadas durante as sessões'));const list=node('ul');for(const item of period.swaps)list.append(node('li',`${item.label}: ${item.sessions} sessões.`));summary.append(list);}
    summary.append(node('p','Grupos usam a ênfase principal preservada na sessão. Registros antigos sem esse contexto ficam fora desta distribuição. Não há conversão de participações secundárias ou equivalência entre exercícios.'));
    container.append(summary);
}
