import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {availableInEnvironment,adaptRoutineToEnvironment,movementCompatibility} from '../public/js/environment.js';
const context={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../public/js/dados.js',import.meta.url),'utf8'),context);
const catalogue=context.window.dictionaryData;
const exercise=name=>catalogue.find(item=>item.name===name);
test('casa e parque não presumem máquinas, banco, barras ou corda',()=>{
    for(const environment of ['casa','praia']){
        const options={environment,resources:[]};
        for(const name of ['Supino Reto com Barra','Flexão Inclinada (Mãos no banco)','Mergulho no Banco','Barra Fixa Pronada (Pull-up)','Pular Corda'])assert.equal(availableInEnvironment(exercise(name),options),false,name);
        assert.equal(availableInEnvironment(exercise('Flexão de Braço (Padrão)'),options),true);
    }
    assert.equal(availableInEnvironment(exercise('Barra Fixa Pronada (Pull-up)'),{environment:'praia',resources:['pullup-bar']}),true);
    assert.equal(availableInEnvironment(exercise('Mergulho no Banco'),{environment:'casa',resources:['bench']}),true);
});
test('adaptação é reversível, mantém séries e não altera a ficha original',()=>{
    const source=[{type:'traditional',exercises:[{id:'one',name:'Supino Reto com Barra',sets:3,target:'8-10 rep',setsData:[{kg:40,checked:true}]},{id:'two',name:'Pular Corda',sets:2,target:'30 s'}]}];
    const snapshot=JSON.stringify(source),adapted=adaptRoutineToEnvironment(source,catalogue,{environment:'casa',resources:[]});
    assert.equal(JSON.stringify(source),snapshot);assert.equal(adapted.routine[0].exercises[0].sets,3);
    assert.equal(adapted.routine[0].exercises[0].setsData,undefined);
    assert.ok(availableInEnvironment(exercise(adapted.routine[0].exercises[0].name),{environment:'casa',resources:[]}));
    assert.equal(adapted.routine[0].exercises[1].needsReview,true); // Retirados não ganham substitutos novos.
    const restored=adaptRoutineToEnvironment(adapted.routine,catalogue,{environment:'academia'});
    assert.deepEqual(restored.routine[0].exercises.map(ex=>ex.name),source[0].exercises.map(ex=>ex.name));
});
test('movimento sem alternativa é sinalizado e nunca recebe equivalência inventada',()=>{
    const source=[{exercises:[{id:'one',name:'Barra Fixa Pronada (Pull-up)',sets:3,target:'8 rep'}]}];
    const result=adaptRoutineToEnvironment(source,catalogue,{environment:'praia',resources:[]});
    assert.deepEqual(result.missing,['Barra Fixa Pronada (Pull-up)']);assert.equal(result.routine[0].exercises[0].needsReview,true);
});

test('hotel sem equipamentos mantém foco e padrão ou informa a lacuna',()=>{
    const source=[{exercises:[{name:'Supino Reto com Barra',sets:4,target:'8-12 rep'},{name:'Supino Inclinado com Barra',sets:3,target:'10 rep'},{name:'Cadeira Extensora',sets:3,target:'12 rep'}]}];
    const result=adaptRoutineToEnvironment(source,catalogue,{environment:'casa',resources:[]});
    const [flat,incline,extension]=result.routine[0].exercises;
    assert.equal(exercise(flat.name).muscleFocus[0],'peitoral-esternocostal');
    assert.equal(exercise(flat.name).movementPattern,'empurrar-horizontal');
    assert.equal(flat.sets,4);assert.equal(flat.target,'8-12 rep');
    assert.equal(incline.needsReview,true);assert.equal(extension.needsReview,true);
    assert.match(incline.reviewReason,/mesmo foco muscular/);
});

test('halteres e bancos em casa são recursos independentes',()=>{
    const floor=exercise('Supino no Solo com Halteres'),incline=exercise('Supino Inclinado com Halteres');
    assert.equal(availableInEnvironment(floor,{environment:'casa',resources:[]}),false);
    assert.equal(availableInEnvironment(floor,{environment:'casa',resources:['dumbbells']}),true);
    assert.equal(availableInEnvironment(incline,{environment:'casa',resources:['dumbbells','bench']}),false);
    assert.equal(availableInEnvironment(incline,{environment:'casa',resources:['dumbbells','incline-bench']}),true);
    for(const resources of [[],['dumbbells'],['dumbbells','bench','rope','parallel-bars']]){
        assert.equal(availableInEnvironment(floor,{environment:'praia',resources}),false);
        assert.equal(availableInEnvironment(exercise('Pular Corda'),{environment:'praia',resources}),false);
        assert.equal(availableInEnvironment(exercise('Mergulho nas Paralelas'),{environment:'praia',resources}),false);
    }
});

test('parque permite bancos e distingue barra fixa alta de barra baixa',()=>{
    assert.equal(availableInEnvironment(exercise('Flexão Declinada (Pés no banco)'),{environment:'praia',resources:['bench']}),true);
    assert.equal(availableInEnvironment(exercise('Remada Invertida em Barra Baixa'),{environment:'praia',resources:['pullup-bar']}),false);
    assert.equal(availableInEnvironment(exercise('Remada Invertida em Barra Baixa'),{environment:'praia',resources:['low-bar']}),true);
    const source=[{exercises:[{name:'Supino Inclinado com Barra',sets:3,target:'10 rep'}]}];
    const result=adaptRoutineToEnvironment(source,catalogue,{environment:'praia',resources:['bench']});
    assert.equal(result.missing.length,0);assert.equal(result.routine[0].exercises[0].name,'Flexão Declinada (Pés no banco)');
});

test('trocar recursos recalcula a partir do original e restaura a academia',()=>{
    const source=[{exercises:[{name:'Supino Inclinado com Barra',sets:3,target:'10 rep'}]}];
    const park=adaptRoutineToEnvironment(source,catalogue,{environment:'praia',resources:['bench']});
    const hotel=adaptRoutineToEnvironment(park.routine,catalogue,{environment:'casa',resources:[]});
    assert.equal(hotel.routine[0].exercises[0].needsReview,true);
    const home=adaptRoutineToEnvironment(hotel.routine,catalogue,{environment:'casa',resources:['dumbbells','incline-bench']});
    assert.equal(home.missing.length,0);assert.equal(home.routine[0].exercises[0].name,'Supino Inclinado com Halteres');
    const gym=adaptRoutineToEnvironment(home.routine,catalogue,{environment:'academia'});
    assert.equal(gym.routine[0].exercises[0].name,source[0].exercises[0].name);
    assert.equal(gym.routine[0].exercises[0]._environmentOriginal,undefined);
});

test('cadastros têm IDs, recursos, subníveis e referências consistentes',()=>{
    assert.equal(new Set(catalogue.map(x=>x.id)).size,catalogue.length);
    for(const x of catalogue){
        assert.ok(x.id&&x.subLevel&&x.subLevel!=='Geral'&&x.muscleFocus.length&&x.muscleFocus.every(Boolean)&&x.movementPattern,x.name);
        assert.ok(Array.isArray(x.resources)&&Array.isArray(x.synergist)&&x.antagonist,x.name);
        if(x.equip==='Halter')assert.ok(x.resources.includes('dumbbells'),x.name);
        if(x.equip==='Barra')assert.ok(x.resources.includes('barbell')&&x.resources.includes('plates'),x.name);
    }
    for(const key of ['dbWorkouts','dbWorkoutsFeminino','dbWorkoutsTatico'])for(const methods of Object.values(context.window[key]))for(const [level,days]of Object.entries(methods))for(const blocks of Object.values(days))for(const block of blocks)for(const ex of block.exercises){
        assert.ok(exercise(ex.name),ex.name);if(level==='iniciante')assert.notEqual(exercise(ex.name).nivel,3,ex.name);
    }
});

test('variedade não substitui o foco e a direção de tração é preservada',()=>{
    const source=[{exercises:[{name:'Supino Inclinado com Barra',sets:3,target:'10 rep'},{name:'Supino Inclinado com Halteres',sets:3,target:'10 rep'},{name:'Remada Curvada com Barra',sets:3,target:'10 rep'}]}];
    const result=adaptRoutineToEnvironment(source,catalogue,{environment:'praia',resources:['bench','pullup-bar']});
    const [a,b,row]=result.routine[0].exercises;
    assert.equal(a.name,b.name);assert.equal(exercise(a.name).muscleFocus[0],'peitoral-clavicular');
    assert.equal(row.needsReview,true);
});

test('adaptação não repete a mesma alternativa nos dois lados do bi-set',()=>{
    const source=[{type:'superset',exercises:[{name:'Supino Inclinado com Barra',sets:3,target:'10 rep'},{name:'Supino Inclinado com Halteres',sets:3,target:'10 rep'}]}];
    const result=adaptRoutineToEnvironment(source,catalogue,{environment:'parque',resources:['bench']});
    assert.equal(result.routine[0].exercises[0].name,'Flexão Declinada (Pés no banco)');
    assert.equal(result.routine[0].exercises[1].needsReview,true);
    assert.equal(result.routine[0].exercises[1].reviewCode,'pair-variety');
    const restored=adaptRoutineToEnvironment(result.routine,catalogue,{environment:'academia'});
    assert.equal(restored.routine[0].exercises[1].name,'Supino Inclinado com Halteres');
});

test('nomes antigos continuam resolvíveis na adaptação',()=>{
    const source=[{exercises:[{name:'Tríceps Testa (Barra W ou Halteres)',sets:3,target:'10 rep'}]}];
    const home=adaptRoutineToEnvironment(source,catalogue,{environment:'casa',resources:['dumbbells']});
    assert.equal(home.missing.length,0);assert.equal(exercise(home.routine[0].exercises[0].name).muscleFocus[0],'triceps-longa');
    const gym=adaptRoutineToEnvironment(home.routine,catalogue,{environment:'academia'});
    assert.equal(gym.routine[0].exercises[0].name,source[0].exercises[0].name);
    assert.equal(gym.routine[0].exercises[0].execution,undefined);
});

test('halteres atendem remadas horizontais sem se passarem por puxada vertical',()=>{
    const source=[{exercises:[{name:'Remada Máquina Apoiada no Peito',sets:3,target:'10 rep'},{name:'Puxada Alta na Máquina',sets:3,target:'10 rep'}]}];
    for(const resources of [['dumbbells'],['dumbbells','bench']]){
        const result=adaptRoutineToEnvironment(source,catalogue,{environment:'casa',resources,level:'iniciante'});
        const [row,pull]=result.routine[0].exercises;
        assert.equal(row.needsReview,undefined);
        assert.equal(exercise(row.name).movementPattern,'puxar-horizontal');
        assert.ok(exercise(row.name).muscleFocus.includes('costas-remada'));
        assert.equal(pull.needsReview,true);
        assert.equal(pull.reviewCode,'unavailable-resources');
        if(!resources.includes('bench'))assert.equal(row.name,'Remada Unilateral em Pé com Halter');
    }
});

test('nível iniciante também é aplicado ao movimento original disponível',()=>{
    const source=[{exercises:[{name:'Barra Fixa Pronada (Pull-up)',sets:3,target:'8 rep'}]}];
    const options={environment:'parque',resources:['pullup-bar'],level:'iniciante'};
    const restricted=adaptRoutineToEnvironment(source,catalogue,options);
    assert.equal(restricted.routine[0].exercises[0].reviewCode,'level-restriction');
    const assisted=adaptRoutineToEnvironment(source,catalogue,{...options,resources:['pullup-bar','bench']});
    assert.equal(assisted.missing.length,0);
    assert.equal(assisted.routine[0].exercises[0].name,'Barra Fixa com Apoio dos Pés');
    const gym=adaptRoutineToEnvironment(assisted.routine,catalogue,{environment:'academia'});
    assert.equal(gym.routine[0].exercises[0].reviewCode,undefined);
    assert.equal(gym.routine[0].exercises[0].name,source[0].exercises[0].name);
});

test('diagnóstico distingue cadastro ausente de falta de recursos ou nível',()=>{
    const options={environment:'casa',resources:[],level:'iniciante'};
    assert.equal(movementCompatibility(undefined,catalogue,options).code,'missing-movement');
    const unmatched={agonist:'Costas',subLevel:'Foco personalizado',muscleFocus:['custom'],movementPattern:'custom'};
    assert.equal(movementCompatibility(unmatched,catalogue,options).code,'missing-equivalent');
    const extension=movementCompatibility(exercise('Cadeira Extensora'),catalogue,options);
    assert.equal(extension.code,'unavailable-resources');
    assert.match(extension.reason,/Reto Femoral/);
});

test('ABC tradicional iniciante preserva posições, séries, foco e retorno em cada ambiente',()=>{
    const scenarios=[
        {environment:'academia',resources:[]},
        {environment:'casa',resources:[]},
        {environment:'casa',resources:['dumbbells']},
        {environment:'casa',resources:['dumbbells','bench','incline-bench','pullup-bar']},
        {environment:'parque',resources:[]},
        {environment:'parque',resources:['bench','pullup-bar','low-bar']}
    ];
    for(const source of Object.values(context.window.dbWorkouts.tradicional.iniciante)){
        const snapshot=JSON.stringify(source);
        for(const scenario of scenarios){
            const options={...scenario,level:'iniciante'},result=adaptRoutineToEnvironment(source,catalogue,options);
            assert.equal(result.routine.length,source.length);
            source.forEach((block,bi)=>block.exercises.forEach((original,ei)=>{
                const adapted=result.routine[bi].exercises[ei];
                assert.equal(adapted.sets,original.sets);assert.equal(adapted.target,original.target);
                if(adapted.needsReview){assert.ok(adapted.reviewCode);assert.ok(adapted.reviewReason);return;}
                const movement=exercise(adapted.name);
                assert.equal(availableInEnvironment(movement,options),true);
                assert.notEqual(movement.nivel,3);
                if(adapted.name!==original.name)assert.equal(movementCompatibility(exercise(original.name),catalogue,options).candidates.some(c=>c.name===adapted.name),true);
            }));
            const restored=adaptRoutineToEnvironment(result.routine,catalogue,{environment:'academia'});
            assert.deepEqual(Array.from(restored.routine.flatMap(b=>b.exercises.map(ex=>ex.name))),Array.from(source.flatMap(b=>b.exercises.map(ex=>ex.name))));
        }
        assert.equal(JSON.stringify(source),snapshot);
    }
});
