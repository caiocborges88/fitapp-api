import {roleCandidates,modelLabel} from './workout-models.js';
import {findMovement,availableInEnvironment} from './environment.js';

// A contract describes the existing recipe. It does not add exercises or infer activation.
const labels={incline:'Peitoral · empurrar inclinado',chest:'Peitoral · adução horizontal',press:'Ombros · desenvolvimento',lateral:'Ombros · elevação lateral',overhead:'Tríceps · extensão acima da cabeça',triceps:'Tríceps · extensão no pulley',flexion:'Core · flexão do tronco',pull:'Costas · puxada vertical',row:'Costas · remada apoiada',posterior:'Ombros · posterior',curl:'Bíceps · rosca supinada',hammer:'Braquial/antebraço · rosca neutra',side:'Core · prancha lateral por lado',squat:'Quadríceps · leg press',hinge:'Posteriores · dobrar o quadril',extension:'Quadríceps · extensão de joelho',knee:'Posteriores · flexão de joelho',adduction:'Quadril · adução',abduction:'Quadril · abdução',calf:'Panturrilhas · joelhos estendidos',soleus:'Panturrilhas · joelhos flexionados',hip:'Glúteos · elevação pélvica'};
const main={A:['incline','chest','press','lateral','overhead','flexion'],B:['pull','row','posterior','curl','hammer','side'],C:['squat','hinge','extension','knee','adduction','abduction','calf','soleus']};
export const contractVersion=1;
export function analyzeModelContract(routine,catalogue,options={}){
    const models=[...new Set(routine.map(block=>block.modelId).filter(Boolean))];
    if(models.length!==1||!['abc_tradicional','abc_sinergista'].includes(models[0])||routine.some(block=>block.modelVersion&&![1,2].includes(block.modelVersion)))return null;
    const method=models[0],explicitDay=block=>block.day||(/^[ABC]-/.test(block.roleId||'')?block.roleId[0]:null);
    const scope=[...new Set([...(options.days||[]),...routine.map(explicitDay)].filter(Boolean))];
    const dayOf=block=>explicitDay(block)||(scope.length===1?scope[0]:null);
    const days=['A','B','C'].filter(day=>options.days?.includes(day)||routine.some(block=>dayOf(block)===day));
    const requirements=days.flatMap(day=>{
        const principal=[...main[day],...(method==='abc_sinergista'?(day==='A'?['triceps']:day==='C'?['hip']:[]):[])];
        const optional=method==='abc_tradicional'?(day==='A'?['triceps']:day==='C'?['hip']:[]):[];
        return [...principal,...optional].map(role=>{
            const allEntries=routine.filter(block=>dayOf(block)===day).flatMap(block=>(block.exercises||[]).map(ex=>({block,ex})));
            const entries=allEntries.filter(({ex})=>ex.slotId===role);
            const candidates=roleCandidates({slotId:role},catalogue,{environment:'academia'})||[];
            const reviewed=allEntries.filter(({ex})=>candidates.some(m=>m.name===(findMovement(catalogue,ex.name)?.name||ex.name)));
            const ready=reviewed.filter(({block,ex})=>!ex.needsReview&&availableInEnvironment(findMovement(catalogue,ex.name),{...options,equipmentPolicy:block.equipmentPolicy||options.equipmentPolicy}));
            const isOptional=optional.includes(role);
            const primary=ready.some(({block})=>!block.optional);
            const status=primary?'principal':ready.length?'optional':entries.length||reviewed.length?'unknown':'missing';
            return {day,role,label:labels[role],expected:isOptional?'optional':'principal',status,
                enabled:ready.some(({block})=>!block.optional||block.enabled===true),
                needsAttention:!isOptional&&!primary};
        });
    });
    return {version:contractVersion,method,label:modelLabel(method),days,requirements,
        pending:requirements.filter(item=>item.needsAttention),
        limits:['Trapézio superior e inferior: sem movimento dedicado nesta receita; revisão de inclusão ainda pendente.','Outras funções de core e subdivisões do catálogo não são exigências automáticas deste modelo.','Participações secundárias não revisadas permanecem sem avaliação; não equivalem a séries de ênfase principal.']};
}
