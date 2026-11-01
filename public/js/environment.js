import {readJSON} from './domain.js';
import {equipmentForEnvironment,equipmentNames} from './equipment-settings.js';
import {withExecution} from './execution-contract.js';
import {roleCandidates} from './workout-models.js';

const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const outdoor=environment=>['praia','parque','parque/praia'].includes(environment);
const outdoorResources=new Set(['bench','pullup-bar','low-bar','balance-support']);
export function environmentOptions(){
    const environment=window.FitStore?.get('fitapp_global_env')||'academia';
    const resources=readJSON(window.FitStore?.get('fitapp_resources_'+environment),[]);
    return {environment,resources,equipment:equipmentForEnvironment(window.FitStore,environment,resources),blacklist:readJSON(window.FitStore?.get('fitapp_blacklist'),[])};
}
export function movementExcluded(exercise,blacklist=[]){
    return Boolean(exercise)&&blacklist.some(name=>name===exercise.name||exercise.aliases?.includes(name));
}
export function availableInEnvironment(exercise,{environment='academia',resources=[],equipment,equipmentPolicy,excludedResources=[],blacklist=[]}={}){
    if(!exercise)return false;
    if(movementExcluded(exercise,blacklist))return false;
    if(equipmentPolicy==='bodyweight'&&!['Peso Corporal','Calistenia'].includes(exercise.equip))return false;
    const requirements=exercise.resourcesAny||[exercise.resources||[]];
    const allowedRequirements=requirements.filter(option=>option.every(resource=>!excludedResources.includes(resource)));
    if(!allowedRequirements.length)return false;
    if(environment==='academia'){
        if(!equipment)return true;
        const needsBar=allowedRequirements.every(option=>option.some(resource=>['pullup-bar','low-bar'].includes(resource)));
        return equipmentNames(equipment).includes(needsBar?'Calistenia':exercise.equip);
    }
    if(environment!=='casa'&&!outdoor(environment))return false;
    const allowedEquipment=['Peso Corporal','Calistenia',...(environment==='casa'?['Halter']:[])];
    if(!allowedEquipment.includes(exercise.equip))return false;
    if(exercise.equip==='Calistenia'&&!exercise.resources&&!exercise.resourcesAny)return false;
    return allowedRequirements.some(option=>{
        const required=[...option,...(exercise.equip==='Halter'?['dumbbells']:[])];
        return required.every(resource=>resources.includes(resource)&&(!outdoor(environment)||outdoorResources.has(resource)));
    });
}
export function findMovement(catalogue,name){
    return catalogue.find(item=>item.name===name)||catalogue.find(item=>item.aliases?.includes(name));
}
export function sameMuscleFocus(source,candidate){
    if(source?.classification&&candidate?.classification&&source.classification.action!==candidate.classification.action)return false;
    if(source?.classification?.action==='flexao-cotovelo'&&candidate?.classification&&source.classification.grip&&candidate.classification.grip&&source.classification.grip!==candidate.classification.grip)return false;
    if(!source||normalize(source.agonist||source.group)!==normalize(candidate.agonist||candidate.group))return false;
    if(source.movementPattern&&source.movementPattern!==candidate.movementPattern)return false;
    if(source.muscleFocus?.length)return source.muscleFocus.every(focus=>candidate.muscleFocus?.includes(focus));
    // Custom/legacy entries need an explicit matching sublevel; a group alone is insufficient.
    return Boolean(source.subLevel)&&normalize(source.subLevel)===normalize(candidate.subLevel);
}
export function movementCompatibility(source,catalogue,options){
    const equivalent=catalogue.filter(item=>item.selectable!==false&&sameMuscleFocus(source,item));
    const available=equivalent.filter(item=>availableInEnvironment(item,options));
    const candidates=available.filter(item=>options.level!=='iniciante'||item.nivel!==3);
    let code=null,reason=null;
    if(!source){code='missing-movement';reason='Movimento não encontrado no catálogo. Revise o cadastro antes de adaptar.';}
    else if(!candidates.length){
        const focus=source.subLevel||source.agonist||source.group;
        if(!equivalent.length){code='missing-equivalent';reason=`Sem alternativa cadastrada com o mesmo foco muscular e padrão de movimento (${focus}).`;}
        else if(!available.length){code='unavailable-resources';reason=`Sem alternativa com o mesmo foco muscular e padrão de movimento (${focus}) para os recursos disponíveis neste ambiente.`;}
        else{code='level-restriction';reason=`As alternativas com o mesmo foco muscular e padrão de movimento (${focus}) têm complexidade alta para a montagem iniciante.`;}
    }
    return {candidates,code,reason};
}
export function adaptRoutineToEnvironment(routine,catalogue,options){
    const missing=[],used=new Set();
    const result=routine.map(block=>{
        const pairUsed=new Set();
        const blockOptions={...options,level:block.modelVersion?'padrao':options.level,equipmentPolicy:block.equipmentPolicy||options.equipmentPolicy};
        return {...block,exercises:block.exercises.map(exercise=>{
        const original=exercise._environmentOriginal||{name:exercise.name,target:exercise.target,...(exercise.execution?{execution:structuredClone(exercise.execution)}:{})};
        const current=findMovement(catalogue,original.name);
        const next={...exercise,name:original.name,target:original.target,...(original.execution?{execution:structuredClone(original.execution)}:{})};
        delete next.needsReview;delete next.reviewReason;delete next.reviewCode;delete next._environmentOriginal;
        if(options.environment==='academia'){
            if(!availableInEnvironment(current,blockOptions)){
                next.needsReview=true;next.reviewCode=!current?'missing-movement':movementExcluded(current,options.blacklist)?'excluded-movement':'equipment-policy';
                next.reviewReason=!current?'Movimento não encontrado no catálogo. Revise o cadastro.':movementExcluded(current,options.blacklist)?'Este movimento está na sua lista de exercícios excluídos. Troque ou remova nesta sessão.':'O movimento não atende ao tipo de equipamento permitido neste bloco.';
                missing.push(original.name);
            }
            return next;
        }
        next._environmentOriginal=original;
        if(availableInEnvironment(current,blockOptions)&&(blockOptions.level!=='iniciante'||current.nivel!==3)&&!pairUsed.has(current.name)){used.add(current.name);if(block.type==='superset')pairUsed.add(current.name);return next;}
        const compatibility=movementCompatibility(current,catalogue,blockOptions);
        const candidates=(roleCandidates(exercise,catalogue,blockOptions)||compatibility.candidates).filter(item=>!pairUsed.has(item.name));
        // Reuse across blocks is allowed; the two sides of a pair must remain distinct.
        candidates.sort((a,b)=>Number(used.has(a.name))-Number(used.has(b.name))||(b.environmentPreference?.[options.environment]||0)-(a.environmentPreference?.[options.environment]||0)||Math.abs((a.nivel||1)-(current?.nivel||1))-Math.abs((b.nivel||1)-(current?.nivel||1)));
        const candidate=candidates[0];
        if(!candidate){
            next.needsReview=true;
            next.reviewReason=compatibility.candidates.length?'Sem um segundo movimento distinto com o mesmo foco muscular e padrão de movimento para completar este par.':compatibility.reason;
            next.reviewCode=compatibility.candidates.length?'pair-variety':compatibility.code;
            delete next.setsData;missing.push(original.name);return next;
        }
        if(next.execution&&candidate.executionProfile)Object.assign(next,withExecution(next,candidate));else next.name=candidate.name;delete next.setsData;used.add(candidate.name);if(block.type==='superset')pairUsed.add(candidate.name);
        if(current?.equip!==candidate.equip&&/\d+(?:[.,]\d+)?\s*kg\b/i.test(original.target||'')){
            next.needsReview=true;next.reviewCode='target-review';
            next.reviewReason='A meta menciona uma carga do equipamento anterior. Edite a meta para esta variante antes de iniciar; nenhuma carga equivalente foi calculada.';
            missing.push(original.name);
        }
        return next;
    })};});
    return {routine:result,missing};
}
