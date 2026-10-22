import {state} from './state.js';
import {environmentOptions} from './environment.js';
import {buildEnvironmentProposal} from './environment-proposal.js';

export function renderEnvironmentProposalReview(list){
    if(state.editorContext?.kind!=='session')return;
    const review=state.environmentProposal;
    const options=environmentOptions();
    const eligible=options.environment!=='academia'&&state.els.levelSelector?.value==='iniciante'&&state.currentRoutine.length&&state.currentRoutine.every(block=>!block.type||block.type==='traditional');
    if(!review&&(!eligible||!state.currentRoutine.some(block=>block.exercises.some(ex=>ex.needsReview))))return;
    const panel=document.createElement('section');panel.className='panel environment-proposal-review';panel.id='environmentProposalReview';
    const heading=document.createElement('h3');heading.textContent=review?'Versão reduzida para este ambiente':'Sua ficha tem movimentos sem alternativa';
    const description=document.createElement('p');
    const button=(label,action)=>{const element=document.createElement('button');element.type='button';element.className='text-button';element.textContent=label;element.addEventListener('click',action);return element;};
    panel.append(heading,description);
    if(!review){
        try{buildEnvironmentProposal(state.currentRoutine,window.dictionaryData,{...options,level:state.els.levelSelector?.value});}
        catch(error){description.textContent=error.message;list.append(panel);return;}
        description.textContent='Você pode revisar uma versão com os movimentos compatíveis. Ela reduz a cobertura da ficha; os focos que ficarem de fora serão mostrados antes de aplicar.';
        panel.append(button('Revisar versão para este ambiente',()=>window.FitApp.reviewEnvironmentProposal()));
    }else{
        const proposal=review.proposal;
        description.textContent=`${proposal.proposedCount} de ${proposal.originalCount} movimentos disponíveis. ${review.status==='accepted'?'Aplicada somente a esta sessão.':'Confira o que será mantido e o que ficará de fora.'} Sua ficha salva permanece completa. Ao trocar o ambiente ou os recursos, a ficha completa será recalculada e os ajustes desta versão serão descartados.`;
        const retained=document.createElement('details'),summary=document.createElement('summary'),retainedList=document.createElement('ul');
        summary.textContent='Movimentos da proposta';retained.open=review.status==='pending';
        for(const block of proposal.routine)for(const exercise of block.exercises){const item=document.createElement('li');item.textContent=`${exercise.name} · ${exercise.sets} séries · ${exercise.target}`;retainedList.append(item);}
        retained.append(summary,retainedList);panel.append(retained);
        const omittedTitle=document.createElement('h4');omittedTitle.textContent='O que fica de fora nesta versão';panel.append(omittedTitle);
        const gaps=document.createElement('ul');
        for(const omission of proposal.omitted){
            const item=document.createElement('li');
            item.textContent=`${omission.name} · ${omission.subLevel} · ${omission.sets} séries removidas. ${omission.covered?'Há outro movimento com o mesmo foco e padrão; o volume será menor.':'Este foco e padrão não serão atendidos nesta sessão.'}`;
            gaps.append(item);
        }
        panel.append(gaps);
        if(review.status==='pending')panel.append(button('Usar versão reduzida nesta sessão',()=>window.FitApp.acceptEnvironmentProposal()));
        panel.append(button(review.status==='pending'?'Voltar sem aplicar':'Restaurar ficha completa',()=>window.FitApp.cancelEnvironmentProposal()));
    }
    list.append(panel);
}
