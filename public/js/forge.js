import {availableInEnvironment,environmentOptions,findMovement} from './environment.js';
import {matchesMovementRequirement} from './movement-requirements.js';
import {bisetRequirements} from './biset-requirements.js';
import {retiredMethod,retiredMethodMessage} from './workout-methods.js';
import {modelSettings} from './model-settings.js';
import { state } from './state.js';
import { normalizeRoutine,readJSON } from './domain.js';
import {persistDraft} from './drafts.js';
import {isWorkoutModel,createModelDay} from './workout-models.js';

export function executeForgePlan(method, avoidNames = [], options = environmentOptions(), existingWorkouts = {}) {
    if(isWorkoutModel(method)){
        if(Object.keys(existingWorkouts).length)return structuredClone(existingWorkouts);
        return Object.fromEntries(['A','B','C'].map(day=>[day,createModelDay(method,day,window.dictionaryData,{...options,blacklist:[...(options.blacklist||[]),...avoidNames]})]));
    }
    if(retiredMethod(method)){
        if(!Object.values(existingWorkouts).some(routine=>Array.isArray(routine)&&routine.length))throw new Error(retiredMethodMessage);
        const saved=structuredClone(existingWorkouts);
        if(method==='calistenia')for(const blocks of Object.values(saved))for(const block of blocks)block.equipmentPolicy='bodyweight';
        return saved;
    }
    const divisions = {
        abc: ['push', 'pull', 'legs'], ppl: ['push', 'pull', 'legs'],
        abcd: ['A', 'B', 'C', 'D'],
        biset_sinergista: ['peito_triceps', 'costa_biceps', 'perna_ombro']
    };
    return Object.fromEntries((divisions[method] || ['A', 'B', 'C']).map((focus, index) => {
        const day = 'ABCD'[index];
        let routine = existingWorkouts[day];
        const equipmentPolicy=method==='casa'?'bodyweight':undefined;
        if(routine&&equipmentPolicy)routine=routine.map(block=>({...block,equipmentPolicy}));
        if (!routine) routine = executeForgeLogic(method, focus, avoidNames, options);
        return [day, structuredClone(routine)];
    }));
}

export function openForgeModal({fromPreferences=false}={}) {
    if(state.isWorkoutActive){window.FitApp.showToast('Conclua ou descarte a sessão antes de criar um plano.');return;}
    if(!persistDraft())return;
    for(const [target,source]of [['forgeProfile','profileSelector'],['forgeLevel','levelSelector']]){
        const field=document.getElementById(target);if(field)field.value=document.getElementById(source).value;
    }
    const method=fromPreferences?document.getElementById('mainMethodSelector').value:readJSON(window.FitStore?.get('fitapp_campaign_data'),null)?.method;
    document.getElementById('forgeMethod').value=isWorkoutModel(method)?method:'abc_tradicional';
    window.FitEnvironment?.refresh();
    document.getElementById('forgeModal').style.display = 'flex';
    updateForgeOptions();
    document.getElementById('forgeMethod').focus();
}

export function updateForgeOptions() {
    const fixed=isWorkoutModel(document.getElementById('forgeMethod').value);
    const explanation=document.getElementById('forgeModelDescription');
    if(explanation)explanation.textContent=document.getElementById('forgeMethod').value==='abc_sinergista'?'ABC sinergista: alguns exercícios são feitos em pares, seguidos pelo descanso da volta. Os demais são feitos em séries convencionais.':'ABC tradicional: faça as séries de um exercício antes de passar ao próximo. O descanso já está definido em cada bloco.';
    for(const id of ['forgeProfile','forgeLevel'])document.getElementById(id)?.closest('label')?.toggleAttribute('hidden',fixed);
    const box = document.getElementById('forgeSubOptionsBox');
    if (box) box.hidden = true;
    const description=document.getElementById('forgeParameters');
    if(description)description.textContent=modelSettings(document.getElementById('forgeMethod').value,document.getElementById('forgeProfile')?.value||document.getElementById('profileSelector').value,document.getElementById('forgeLevel')?.value||state.els.levelSelector?.value).description;
}

export function generateForgedWorkout() {
    if (state.isWorkoutActive) {
        window.FitApp.showToast('Conclua ou descarte a sessão antes de gerar um ciclo.');
        return;
    }
    if(!persistDraft())return;
    const method = document.getElementById('forgeMethod').value;
    const profile=isWorkoutModel(method)?'hipertrofia':document.getElementById('forgeProfile')?.value||document.getElementById('profileSelector').value;
    const level=isWorkoutModel(method)?'padrao':document.getElementById('forgeLevel')?.value||state.els.levelSelector.value;
    if (!document.querySelectorAll('.forge-equip-chip.active').length) {
        window.FitApp.showToast('Selecione pelo menos um equipamento disponível.');
        return;
    }
    let workouts;
    try { workouts = executeForgePlan(method,readJSON(window.FitStore?.get('fitapp_blacklist'),[]),{...environmentOptions(),profile,level}); }
    catch (error) { window.FitApp.showToast(error.message); return; }
    state.currentRoutine = Object.entries(workouts).flatMap(([day, blocks]) =>
        blocks.map(block => ({...block, day})));
    state.currentWorkoutType = 'Livre';
    document.getElementById('forgeModal').style.display = 'none';
    window.FitApp.switchTab('tab-treino', 'nav-treino');
    window.FitApp.loadWorkout();
    window.FitEditor.configureEditor('cycle');
    Object.assign(state.editorContext, {
        method: method === 'ppl' ? 'abc' : method,
        days: Object.keys(workouts),
        profile,level
    });
    state.previewModel={method:state.editorContext.method,profile:state.editorContext.profile,level:state.editorContext.level};
    window.FitApp.adjustRestTime(modelSettings(method,state.editorContext.profile,state.editorContext.level).restSeconds);
    const structure = document.getElementById('forgeMethod').selectedOptions[0].textContent;
    const cycle=Object.keys(workouts).join('');
    document.getElementById('customWorkoutName').value = 'Ciclo '+cycle+' · ' + structure;
    document.getElementById('previewTitle').textContent = 'Revise o ciclo '+cycle+' completo';
    window.FitApp.renderPreviewList();
    window.FitApp.showToast('Todos os dias foram gerados. Revise o ciclo completo antes de salvar.');
}

export function executeForgeLogic(method, subOpt, avoidNamesGlobal = [], options = environmentOptions()) {
    if(isWorkoutModel(method))return createModelDay(method,({push:'A',pull:'B',legs:'C'})[subOpt]||subOpt,window.dictionaryData,{...options,blacklist:[...(options.blacklist||[]),...avoidNamesGlobal]});
    if(retiredMethod(method))throw new Error(retiredMethodMessage);
    if(method==='casa')options={...options,environment:'casa',resources:[],allEquipment:true};
    const bodyweightOnly=method==='casa';
    const catalogue=window.dictionaryData.filter(item=>availableInEnvironment(item,options)&&(!bodyweightOnly||['Peso Corporal','Calistenia'].includes(item.equip)));
    const traditional=['abc','ppl','abcd'].includes(method);
    const biset=method==='biset_sinergista';
    const structured=traditional||biset||['circuito','casa'].includes(method);
    const avoided=new Set(avoidNamesGlobal.map(name=>findMovement(window.dictionaryData,name)?.name||name));
    let generatedBlocks = [];
    let used = [...avoided];
    const selectedFocus=new Set(),missingFocus=new Set(); 
    
    const rawProfile = options.profile || (document.getElementById('profileSelector') ? document.getElementById('profileSelector').value : 'hipertrofia');
    
    // ==========================================================
    // A NOVA ENGRENAGEM: O MODULADOR DE VOLUME E FADIGA
    // ==========================================================
    const userLevel = options.level || (state.els.levelSelector ? state.els.levelSelector.value : 'intermediario');
    const baseSets = modelSettings(method,rawProfile,userLevel).baseSets;

    // 1. MAPEAMENTO DE ARSENAL
    const equipChips = document.querySelectorAll('.forge-equip-chip.active');
    let userArsenal = [];
    equipChips.forEach(c => {
        const tags = c.getAttribute('data-equip').split(',');
        tags.forEach(t => {
            const tag = t.trim();
            if (tag === 'Barras_Anilhas') userArsenal.push('Barra');
            if (tag === 'Pesos_Livres') userArsenal.push('Halter');
            if (tag === 'Maquinas_Polias') userArsenal.push('Máquina', 'Cabo');
            if (tag === 'Peso_Corporal') userArsenal.push('Peso Corporal');
            if (tag === 'Calistenia') userArsenal.push('Calistenia');
        });
    });

    if(options.allEquipment)userArsenal=['Barra','Halter','Máquina','Cabo','Peso Corporal','Calistenia'];
    const resourceOptions={...options,excludedResources:[...(options.excludedResources||[]),...(!userArsenal.includes('Calistenia')?['pullup-bar','low-bar']:[])]};
    // 2. O MOTOR DE BUSCA (Blindado e Preciso)
    const pullExercise = (targetAgonist, targetSubLevel = null, targetReps = "10-12 rep", pairAvoid = []) => {
        const normalize = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
        const target = normalize(targetAgonist);
        const subTarget = targetSubLevel ? normalize(targetSubLevel) : null;

        const eligible = d => {
            if(!availableInEnvironment(d,resourceOptions))return false;
            if (avoided.has(d.name)||pairAvoid.includes(d.name)) return false;
            // ESCUDO DO INICIANTE: Bloqueia apenas exercícios extremos (Nível 3)
            if (userLevel === 'iniciante' && d.nivel === 3) return false;

            if(structured){
                if(!matchesMovementRequirement(d,targetAgonist,targetSubLevel))return false;
            }else{
                if(normalize(d.agonist||d.group)!==target)return false;
                if(subTarget&&(!d.subLevel||!normalize(d.subLevel).includes(subTarget)))return false;
            }
            const exEquips = (d.equip || '').split(',').map(e => e.trim());
            if(['Peso Corporal','Calistenia'].includes(d.equip)){
                const needsBar=(d.resources||[]).some(resource=>['pullup-bar','low-bar'].includes(resource));
                return userArsenal.includes(needsBar?'Calistenia':'Peso Corporal');
            }
            const hasEquip = exEquips.some(eq => userArsenal.includes(eq));
            return hasEquip;
        };
        let pool=catalogue.filter(d=>!used.includes(d.name)&&eligible(d));

        // Reuse a compatible variant before dropping a requested muscular focus.
        if(pool.length===0&&(subTarget||structured)){
            pool=catalogue.filter(eligible);
        }

        if (pool.length > 0) {
            const hasIron = userArsenal.some(eq => ['Máquina', 'Barra', 'Halter', 'Cabo'].includes(eq));
            if (hasIron) {
                const heavyPool = pool.filter(d => d.equip !== 'Peso Corporal' && d.equip !== 'Calistenia');
                if (heavyPool.length > 0) pool = heavyPool;
            }

            const fresh=pool.filter(d=>(d.muscleFocus||[d.subLevel]).some(focus=>!selectedFocus.has(focus)));
            if(fresh.length)pool=fresh;
            const ex = pool[Math.floor(Math.random() * pool.length)];
            for(const focus of ex.muscleFocus||[ex.subLevel])selectedFocus.add(focus);
            used.push(ex.name);
            // Injeta as séries baseadas no nível (baseSets)
            return { name: ex.name, sets: baseSets, target: targetReps, obj: ex, antagonist: ex.antagonist || 'Nenhum' };
        }
        return null;
    };

    const buildBlock = (title, requests) => {
        const slots = requests.map(req => {
            const exercise = pullExercise(req[0], req[1] || null, req[2] || "10-12 rep");
            if (!exercise && structured) {
                missingFocus.add(req[0] + (req[1] ? ' · ' + req[1] : ''));
            }
            return exercise;
        }).filter(ex => ex !== null);
        if (slots.length > 0) generatedBlocks.push({ title, type: ['circuito','casa'].includes(method) ? 'circuit' : 'traditional', ...(bodyweightOnly?{equipmentPolicy:'bodyweight'}:{}),exercises: slots });
    };

    // 3. LÓGICA DO TREINO TRADICIONAL
    if ((method === 'abc' || method === 'ppl') && rawProfile === 'feminino') {
        if (subOpt === 'push' || subOpt === 'A') {
            buildBlock('Posteriores e Glúteos', [['Isquiotibiais','Isquiotibiais (extensão de quadril)'], ['Glúteos','Glúteo Máximo'], ['Isquiotibiais','Isquiotibiais (flexão de joelho)'], ['Panturrilhas','Gastrocnêmios'], ['Core']]);
        } else if (subOpt === 'pull' || subOpt === 'B') {
            buildBlock('Superiores', [['Costas'], ['Peitoral'], ['Ombros'], ['Bíceps'], ['Tríceps']]);
        } else {
            buildBlock('Quadríceps e Panturrilhas', [['Quadríceps','Quadríceps (Vastos)'], ['Quadríceps','Reto Femoral'], ['Glúteos','Glúteo Máximo'], ['Panturrilhas','Gastrocnêmios'], ['Core']]);
        }
    } else if (method === 'abc' || method === 'ppl') {
        if (subOpt === 'push' || subOpt === 'A') {
            buildBlock("Peitoral Completo", [["Peitoral", "Esternocostal"], ["Peitoral", "Clavicular"], ["Peitoral", "Abdominal"]]);
            buildBlock("Ombros & Tríceps", [["Ombros", "Deltoide Anterior"], ["Ombros", "Deltoide Lateral"], ["Tríceps", "Tríceps (Cabeça Longa)"], ["Tríceps", "Tríceps (Cabeça Lateral/Medial)"]]);
        } else if (subOpt === 'pull' || subOpt === 'B') {
            buildBlock("Dorsais Base", [["Costas", "Latíssimo do Dorso"], ["Costas", "Espessura (Romboides)"]]);
            buildBlock("Posterior & Bíceps", [["Ombros", "Deltoide Posterior"], ["Bíceps", "Bíceps Braquial"], ["Bíceps", "Braquial / Antebraço"]]);
        } else if (subOpt === 'legs' || subOpt === 'C') {
            buildBlock("Quadríceps", [["Quadríceps", "Quadríceps (Vastos)"], ["Quadríceps", "Reto Femoral"]]);
            buildBlock("Posteriores", [["Isquiotibiais", "Isquiotibiais (extensão de quadril)"], ["Isquiotibiais", "Isquiotibiais (flexão de joelho)"]]);
            buildBlock("Glúteos & Panturrilhas", [["Glúteos", "Glúteo Máximo"], ["Panturrilhas", "Gastrocnêmios"]]);
        }
    } 
    
    // 4. LÓGICA DO MOTOR DE BI-SETS (MATRIZ DE VOLUME 3:2 & PARES MISTOS)
    else if (method === 'abcd') {
        const plans = rawProfile === 'feminino' ? {
            A: [['Quadríceps','Quadríceps (Vastos)'], ['Quadríceps','Reto Femoral'], ['Panturrilhas','Gastrocnêmios'], ['Core']],
            B: [['Costas'], ['Peitoral'], ['Ombros'], ['Bíceps'], ['Tríceps']],
            C: [['Isquiotibiais','Isquiotibiais (extensão de quadril)'], ['Isquiotibiais','Isquiotibiais (flexão de joelho)'], ['Glúteos','Glúteo Máximo'], ['Core']],
            D: [['Glúteos','Glúteo Máximo'], ['Glúteos','Glúteo Máximo'], ['Quadríceps','Quadríceps (Vastos)'], ['Panturrilhas','Gastrocnêmios']]
        } : {
            A: [['Peitoral','Esternocostal'], ['Peitoral','Clavicular'], ['Peitoral','Abdominal'], ['Tríceps','Tríceps (Cabeça Lateral/Medial)'], ['Tríceps','Tríceps (Cabeça Longa)']],
            B: [['Quadríceps','Quadríceps (Vastos)'], ['Quadríceps','Reto Femoral'], ['Glúteos','Glúteo Máximo'], ['Panturrilhas','Gastrocnêmios'], ['Core']],
            C: [['Costas','Latíssimo do Dorso'], ['Costas','Espessura (Romboides)'], ['Bíceps','Bíceps Braquial'], ['Bíceps','Braquial / Antebraço'], ['Core']],
            D: [['Isquiotibiais','Isquiotibiais (extensão de quadril)'], ['Isquiotibiais','Isquiotibiais (flexão de joelho)'], ['Glúteos','Glúteo Máximo'], ['Ombros','Deltoide Lateral'], ['Ombros','Deltoide Posterior']]
        };
        if (!plans[subOpt]) throw new Error('Selecione um dia válido para o treino ABCD.');
        buildBlock(`Treino ${subOpt}`, plans[subOpt]);
    }
    else if (biset) {
        const requests=bisetRequirements(method,subOpt);
        const repTarget=rawProfile==='definicao'?'15-20 rep':rawProfile==='tatico'?'6-8 rep':'10-12 rep';
        const label='Complementar';
        requests.forEach(([left,right],index)=>{
            const first=pullExercise(left[0],left[1]||null,repTarget);
            const second=pullExercise(right[0],right[1]||null,repTarget,first?[first.name]:[]);
            for(const [request,exercise]of [[left,first],[right,second]]){
                if(!exercise)missingFocus.add('Par '+(index+1)+' · '+request[0]+(request[1]?' · '+request[1]:''));
            }
            if(first&&second)generatedBlocks.push({
                title:'Par '+(index+1)+' · '+label+' · '+left[0]+(left[0]===right[0]?'':' + '+right[0]),
                type:'superset',
                exercises:[first,second].map(ex=>({name:ex.name,sets:baseSets,target:ex.target}))
            });
        });
        if(rawProfile==='definicao')buildBlock('Cardio final',[['Corpo Todo','Sistema Anaeróbico','1 min']]);
        else if(rawProfile==='tatico')buildBlock('Core final',[['Core','Transverso do Abdômen','1 min']]);
    }

    // ==========================================================
    // CIRCUITOS & CALISTENIA
    // ==========================================================
    else if (method === 'circuito') {
        let circRep = rawProfile === 'tatico' ? "1 min" : "15-20 rep";
        buildBlock("Rodada Metabólica FullBody", [
            ["Corpo Todo", "Sistema Anaeróbico", "45 seg"],
            ["Quadríceps", "Quadríceps (Vastos)", circRep],
            ["Costas", "Latíssimo do Dorso", circRep],
            ["Isquiotibiais", "Isquiotibiais (extensão de quadril)", circRep],
            ["Peitoral", "Esternocostal", circRep],
            ["Bíceps", null, circRep],
            ["Tríceps", null, circRep],
            ["Core", "Reto Abdominal (flexão do tronco)", "1 min"]
        ]);
    }
    else if(method==='casa'){
        const reps=userLevel==='iniciante'?'10-12 rep':userLevel==='avancado'?'8-12 rep':'15-20 rep';
        const duration=userLevel==='iniciante'?'30 seg':userLevel==='avancado'?'1 min':'45 seg';
        buildBlock('Circuito corporal sem equipamentos',[
            ['Corpo Todo','Sistema Cardiovascular',duration],
            ['Peitoral','Esternocostal',reps],
            ['Quadríceps','Quadríceps (Vastos)',reps],
            ['Quadríceps','Quadríceps (Vastos)','12 rep'],
            ['Core','Transverso do Abdômen',duration]
        ]);
        if(generatedBlocks[0]?.exercises[0])generatedBlocks[0].exercises[0].sets=3;
    }

    // ==========================================================
    // ALGORITMO DE GRAVIDADE (CORE FINISHER)
    // ==========================================================
    const isCoreEx = (exName) => {
        const dictItem = typeof window.dictionaryData !== 'undefined' ? window.dictionaryData.find(d => d.name === exName) : null;
        if (dictItem) {
            const g = (dictItem.group || '').toLowerCase();
            return g === 'core'; // Estrito para não empurrar peitoral abdominal
        }
        return false;
    };

    generatedBlocks.forEach(bloco => {
        bloco.exercises.sort((a, b) => {
            const aCore = isCoreEx(a.name);
            const bCore = isCoreEx(b.name);
            if (aCore && !bCore) return 1;
            if (!aCore && bCore) return -1;
            return 0;
        });
    });

    generatedBlocks.sort((a, b) => {
        const aHasCore = a.exercises.some(ex => isCoreEx(ex.name)) || a.title.toLowerCase().includes('core');
        const bHasCore = b.exercises.some(ex => isCoreEx(ex.name)) || b.title.toLowerCase().includes('core');
        if (aHasCore && !bHasCore) return 1;
        if (!aHasCore && bHasCore) return -1;
        return 0;
    });

    // Keep execution pairs intact; collect unpaired core work in the final block.
    const abdominalExercises = [];
    generatedBlocks = generatedBlocks.map(block => {
        if (block.type === 'superset') return block;
        return {...block, exercises: block.exercises.filter(ex => {
            if (!isCoreEx(ex.name)) return true;
            abdominalExercises.push(ex);
            return false;
        })};
    }).filter(block => block.exercises.length);
    if (generatedBlocks.length) {
        if (!abdominalExercises.length) {
            const exercise = pullExercise('Core', null, '15-20 rep');
            if (!exercise) throw new Error('Não há exercício abdominal compatível com os recursos selecionados.');
            if (/prancha|isom[eé]tric/i.test(exercise.name)) exercise.target = '20-30 seg';
            abdominalExercises.push(exercise);
        }
        generatedBlocks.push({title: 'Abdominal', type: 'traditional', ...(bodyweightOnly?{equipmentPolicy:'bodyweight'}:{}),exercises: abdominalExercises});
    }

    if(missingFocus.size)throw new Error('Sem movimentos compatíveis para os focos: '+[...missingFocus].join('; ')+'. Ajuste os recursos ou a divisão do treino.');

    return normalizeRoutine(generatedBlocks);
}

export function forgeSmartBiset() { return null; } // Função obsoleta mantida para evitar quebra de referência global
