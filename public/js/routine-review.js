import {availableInEnvironment,findMovement,movementExcluded} from './environment.js';
import {blockEnabled} from './domain.js';

// Inspect the actual session, without regenerating a saved or manually edited plan.
export function reviewRoutine(routine,catalogue,options={}){
    const issues=[];
    const add=(code,message,blockIndex,exerciseIndex)=>issues.push({code,message,blockIndex,exerciseIndex});
    if(!routine?.some(block=>blockEnabled(block)&&block.exercises?.length))add('empty','Adicione exercícios antes de iniciar.');
    for(const [bi,block] of (routine||[]).entries()){
        if(!blockEnabled(block))continue;
        const exercises=block.exercises||[];
        if(block.restSeconds!=null&&(!Number.isInteger(block.restSeconds)||block.restSeconds<15||block.restSeconds>600))add('rest','Informe um descanso de bloco entre 15 e 600 segundos.',bi);
        if(block.modelVersion!=null&&block.modelVersion!==1)add('model-version','Esta versão de modelo precisa de uma versão mais recente do aplicativo.',bi);
        if(!exercises.length)add('empty-block','Remova ou preencha o bloco vazio.',bi);
        if(block.type==='superset'){
            if(exercises.length!==2)add('pair-size','Cada par precisa de exatamente dois exercícios.',bi);
            else if(new Set(exercises.map(ex=>findMovement(catalogue,ex.name)?.name||ex.name)).size!==2)add('pair-distinct','Cada par precisa de dois movimentos distintos.',bi);
            else if(block.modelVersion&&exercises[0].sets!==exercises[1].sets)add('pair-rounds','Mantenha o mesmo número de voltas no par ou separe as séries adicionais.',bi);
        }
        for(const [ei,ex] of exercises.entries()){
            if(ex.sideMode==='alternating'&&(ex.sets%2!==0||ex.measurementType!=='duration'))add('sides','Registre séries por tempo para os dois lados, em número par.',bi,ei);
            const movement=findMovement(catalogue,ex.name);
            const label=`${block.day?'Treino '+block.day+' · ':''}${ex.name}: `;
            if(!movement)add('missing-movement',label+'movimento não encontrado no catálogo. Troque ou remova.',bi,ei);
            else if(movementExcluded(movement,options.blacklist))add('excluded-movement',label+'está na sua lista de exercícios excluídos. Troque ou remova nesta sessão.',bi,ei);
            else if(ex.needsReview&&!['excluded-movement','missing-movement','equipment-policy'].includes(ex.reviewCode))add(ex.reviewCode||'needs-review',label+(ex.reviewReason||'revise o movimento antes de iniciar.'),bi,ei);
            else if(!availableInEnvironment(movement,{...options,equipmentPolicy:block.equipmentPolicy||options.equipmentPolicy}))add('unavailable',label+'não atende aos recursos disponíveis ou ao tipo de equipamento do bloco. Troque ou revise os recursos.',bi,ei);
            if(!Number.isInteger(Number(ex.sets))||Number(ex.sets)<1||Number(ex.sets)>10)add('sets',label+'informe de 1 a 10 séries.',bi,ei);
        }
    }
    return issues;
}
