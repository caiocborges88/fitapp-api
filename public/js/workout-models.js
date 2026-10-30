import {newId,normalizeRoutine} from './domain.js';
import {availableInEnvironment,findMovement} from './environment.js';

// Recipes are versioned prescriptions. Saved workouts are snapshots, never regenerated on open.
export const modelVersion=1;
export const isWorkoutModel=method=>['abc_tradicional','abc_sinergista'].includes(method);
export const modelLabel=method=>method==='abc_sinergista'?'ABC sinergista':'ABC tradicional';
export const enabledBlock=block=>!block.optional||block.enabled===true;
const roles={
    incline:['Supino Inclinado com Halteres','Supino Inclinado com Barra','Supino Inclinado na Máquina'],
    chest:['Voador (Peck Deck)','Crucifixo Reto com Halteres'],
    press:['Desenvolvimento com Halteres','Desenvolvimento na Máquina','Desenvolvimento Militar com Barra'],
    lateral:['Elevação Lateral com Halteres','Elevação Lateral no Cabo'],
    overhead:['Tríceps Francês no Cabo','Tríceps Francês com Halter'],
    triceps:['Tríceps Pulley (Barra Reta/V)','Tríceps Corda no Cabo'],
    flexion:['Abdominal na Máquina','Abdominal Supra no Solo','Abdominal Supra com Halter'],
    pull:['Puxada Alta Neutra','Puxada Alta (Pegada Aberta)','Puxada Alta na Máquina'],
    row:['Remada Máquina Apoiada no Peito'],
    posterior:['Crucifixo Invertido na Máquina (Peck Deck)','Crucifixo Invertido com Halteres'],
    curl:['Rosca Direta com Barra','Rosca Alternada com Halteres'],
    hammer:['Rosca Martelo com Halteres'],
    side:['Prancha Isométrica Lateral'],
    squat:['Leg Press 45º','Leg Press Horizontal'],
    hinge:['RDL com Barra','RDL com Halteres'],
    extension:['Cadeira Extensora'],
    knee:['Cadeira Flexora (Sentado)','Mesa Flexora (Deitado)'],
    adduction:['Cadeira Adutora','Adução de Quadril Deitado de Lado'],
    abduction:['Cadeira Abdutora','Abdução de Quadril Deitado de Lado'],
    calf:['Panturrilha em Pé na Máquina','Panturrilha em Pé no Smith'],
    soleus:['Panturrilha Sentado (Máquina)','Elevação de Panturrilhas Sentado com Halteres'],
    hip:['Elevação Pélvica na Máquina','Elevação Pélvica com Barra']
};
const ex=(role,sets,target)=>({role,sets,target});
const single=(role,sets,target,restSeconds,optional=false)=>({type:'traditional',restSeconds,optional,items:[ex(role,sets,target)]});
const pair=(title,rounds,restSeconds,left,right)=>({title,type:'superset',restSeconds,items:[ex(left[0],rounds,left[1]),ex(right[0],rounds,right[1])]});
const aEnd=()=>[single('chest',2,'10–15 rep',90),single('lateral',2,'12–20 rep',75),single('flexion',2,'12–15 rep',75)];
const bEnd=()=>[single('hammer',2,'10–15 rep',90),single('side',4,'20–30 seg por lado',75)];
const cMiddle=()=>[single('hinge',2,'8–10 rep',150),single('extension',2,'10–15 rep',90),single('knee',2,'10–15 rep',90),single('adduction',2,'12–20 rep',75),single('abduction',2,'12–20 rep',75)];
const recipes={
    abc_tradicional:{
        A:[single('incline',3,'8–12 rep',120),single('chest',2,'10–15 rep',90),single('press',2,'8–12 rep',120),single('lateral',2,'12–20 rep',75),single('overhead',2,'10–15 rep',90),single('flexion',2,'12–15 rep',75),single('triceps',2,'10–15 rep',90,true)],
        B:[single('pull',3,'8–12 rep',120),single('row',3,'8–12 rep',120),single('posterior',2,'12–15 rep',90),single('curl',2,'10–15 rep',90),...bEnd()],
        C:[single('squat',3,'10–12 rep',150),...cMiddle(),single('calf',2,'12–20 rep',90),single('soleus',2,'12–20 rep',90),single('hip',2,'10–15 rep',120,true)]
    },
    abc_sinergista:{
        A:[pair('Peito → tríceps',3,120,['incline','8–12 rep'],['overhead','10–15 rep']),pair('Ombros → tríceps',2,120,['press','8–12 rep'],['triceps','10–15 rep']),...aEnd()],
        B:[pair('Puxada → bíceps',3,120,['pull','8–12 rep'],['curl','10–15 rep']),pair('Remada → deltoide posterior',3,120,['row','8–12 rep'],['posterior','12–15 rep']),...bEnd()],
        C:[pair('Pernas → glúteos',3,150,['squat','10–12 rep'],['hip','10–15 rep']),...cMiddle(),pair('Panturrilhas: joelhos estendidos → flexionados',2,90,['calf','12–20 rep'],['soleus','12–20 rep'])]
    }
};
export function modelDescription(method){
    return `${modelLabel(method)} · exercícios definidos, séries e descanso por bloco. Core nos dias A e B; adutora e abdutora no dia C. Sem ajuste por nível ou foco global. O dia de pernas é mais extenso; 45–60 minutos não são uma duração garantida. Pares de pernas usam cooperação e mudança de ênfase. Na remada apoiada, confira a execução para participação do deltoide posterior.`;
}
export function roleCandidates(exercise,catalogue,options={}){
    const names=roles[exercise.slotId];
    if(!names)return null;
    return names.map(name=>findMovement(catalogue,name)).filter(item=>item&&availableInEnvironment(item,options));
}
export function createModelDay(method,day,catalogue,options={}){
    const recipe=recipes[method]?.[day];
    if(!recipe)throw new Error('Selecione um dia válido do novo ABC.');
    const missing=[];
    const blocks=recipe.map((block,index)=>{
        const exercises=block.items.map(item=>{
            const movement=findMovement(catalogue,roles[item.role][0]);
            if(!movement||(!block.optional&&!availableInEnvironment(movement,options)))missing.push(roles[item.role][0]);
            return {id:newId(),slotId:item.role,name:movement?.name||roles[item.role][0],sets:item.sets,target:item.target,
                ...(item.role==='side'?{measurementType:'duration',sideMode:'alternating'}:{})};
        });
        return {id:newId(),modelId:method,modelVersion,roleId:`${day}-${index+1}`,title:block.title||exercises[0].name,type:block.type,restSeconds:block.restSeconds,
            ...(block.optional?{optional:true,enabled:false}:{}),exercises};
    });
    if(missing.length)throw new Error('A ficha definida requer: '+missing.join('; ')+'. Revise os recursos ou as exclusões; nenhum exercício foi substituído automaticamente.');
    return normalizeRoutine(blocks);
}
export function nextModelDay(plan,history,pending=[]){
    const last=[...history,...pending.filter(item=>item._action!=='delete')].filter(item=>item.campaignId===plan?.id&&['A','B','C'].includes(item.tipo)).sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)).at(-1);
    return last?({A:'B',B:'C',C:'A'})[last.tipo]:'A';
}
export function reviewDue(plan,now=Date.now()){
    if(!isWorkoutModel(plan?.method))return false;
    const from=Date.parse(plan.reviewedAt||plan.startDate);
    return Number.isFinite(from)&&now>=from+90*86400000;
}
export function principalComplete(routine){
    const exercises=routine.filter(block=>!block.optional).flatMap(block=>block.exercises);
    return exercises.length>0&&exercises.every(ex=>Array.from({length:ex.sets},(_,i)=>ex.setsData?.[i]?.checked).every(Boolean));
}
