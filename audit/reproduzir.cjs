// Diagnósticos locais da auditoria. Não chama serviços externos nem altera o app.
const fs = require('node:fs');
const vm = require('node:vm');
const cp = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const remote = p => cp.execFileSync('git', ['show', `73dfff970fe8ea9ff79477fee37a99b832140aec:${p}`], { cwd: root, encoding: 'utf8', maxBuffer: 2000000 });
const results = [];
function check(name, fn) {
  try { results.push({ name, observed: fn() }); }
  catch (e) { results.push({ name, observed: `${e.name}: ${e.message}` }); }
}
const strip = s => s.replace(/^import .*;\r?$/gm, '').replace(/\bexport /g, '');
function engine(source, dictionary) {
  const fields = { profileSelector: { value: 'hipertrofia' } };
  const ctx = vm.createContext({
    window: { dictionaryData: dictionary },
    document: {
      getElementById: id => fields[id] || null,
      querySelectorAll: () => ['Pesos_Livres', 'Maquinas_Polias', 'Barras_Anilhas', 'Peso_Corporal,Calistenia'].map(tag => ({ getAttribute: () => tag }))
    },
    state: { els: { levelSelector: { value: 'iniciante' } } },
    setTimeout() {}, console
  });
  // Apenas para investigar bugs que ficam mascarados pelo erro de sintaxe.
  const cleaned = strip(source).replace(/function forgeSmartBiset\(\) \{ return null; \}/g, '');
  vm.runInContext(strip(read('public/js/utils.js')), ctx);
  vm.runInContext(cleaned, ctx);
  return ctx;
}
const dataContext = vm.createContext({ window: {} });
vm.runInContext(read('public/js/dados.js'), dataContext);
const dictionary = dataContext.window.dictionaryData;
const oldDataContext = vm.createContext({ window: {} });
vm.runInContext(remote('public/js/dados.js'), oldDataContext);
check('Sintaxe de todos os módulos locais', () => {
  return fs.readdirSync(path.join(root, 'public/js')).filter(p => p.endsWith('.js')).map(p => {
    const r = cp.spawnSync(process.execPath, ['--input-type=module', '--check'], { input: read(`public/js/${p}`), encoding: 'utf8' });
    return { file: p, ok: r.status === 0, error: r.status === 0 ? undefined : r.stderr.split('\n').find(l => l.includes('SyntaxError:')) };
  });
});
check('ABCD local após contornar duplicação apenas em memória', () => {
  const ctx = engine(read('public/js/forge.js'), dictionary);
  return ['A','B','C','D'].map(day => ({ day, blocks: ctx.executeForgeLogic('abcd', day), exercises: ctx.executeForgeLogic('abcd', day).flatMap(b => b.exercises).length }));
});
check('Bi-set antagonista local após contornar duplicação apenas em memória', () => {
  const ctx = engine(read('public/js/forge.js'), dictionary);
  return ctx.executeForgeLogic('biset_antagonista', 'peito_costa').map(b => ({ title: b.title, groups: b.exercises.map(e => dictionary.find(d => d.name === e.name)?.group) }));
});
check('Cobertura do motor remoto com seu próprio catálogo', () => {
  const ctx = engine(remote('public/js/forge.js'), oldDataContext.window.dictionaryData);
  return ['push', 'pull', 'legs'].map(day => ({ day, exercises: ctx.executeForgeLogic('abc', day).flatMap(b => b.exercises).length }));
});
check('Filtro IA com catálogo local e remoto', () => {
  return [dictionary, oldDataContext.window.dictionaryData].map((data,i) => ({
    version: i === 0 ? 'local' : 'github', total: data.length,
    home: data.filter(d => d.equip === 'peso_corporal').length,
    calisthenics: data.filter(d => d.equip === 'peso_corporal' || d.equip === 'calistenia').length,
    missingFocus: data.filter(d => !d.focus).length
  }));
});
check('Restaurar estado no formato realmente salvo', () => {
  const source = read('public/js/app.js');
  const block = source.slice(source.indexOf('const state = JSON.parse(savedState);'), source.indexOf("document.getElementById('workoutCards').style.display", source.indexOf('const state = JSON.parse(savedState);')));
  vm.runInNewContext(block, { savedState: JSON.stringify({ currentRoutine: [], currentWorkoutType: 'A', workoutStartTime: 1 }) });
  return 'sem erro';
});
check('Gráfico de isolamento com histórico válido', () => {
  const ctx = vm.createContext({
    document: { getElementById: id => id === 'exerciseIsolationSelect' ? {value:'Supino'} : {} },
    window: { FitApp: { safeGet: () => JSON.stringify([{ date:'2026-10-15', data:[{ exercise:'Supino',kg:20 }] }]) } },
    state: {}, Chart: function() {}, console
  });
  vm.runInContext(strip(read('public/js/ui.js')), ctx);
  ctx.renderIsolationChart();
  return 'sem erro';
});
check('Pacote de recompensa no escopo real do módulo', () => {
  const ctx = vm.createContext({ window: {} });
  vm.runInContext(read('public/js/gamification.js'), ctx);
  return ctx.FitGamification.openPack().then(() => 'sem erro', e => `${e.name}: ${e.message}`);
});
check('Identificador do primeiro template IA', () => {
  const id = parseInt('custom_ia'.split('_')[1]);
  const persisted = JSON.parse(JSON.stringify({ id, name:'Importado', routine:[] }));
  return { persistedId: persisted.id, route: 'custom_' + persisted.id, lookup: [persisted].find(w => w.id == 'custom_null'.split('_')[1]) || null };
});
check('Ordem da decisão de descanso no handler real', () => {
  const ex = {setsData:[{checked:false}]};
  const source = read('public/js/ui.js');
  const start = source.indexOf('const allInSetChecked =');
  const end = source.indexOf('if (allInSetChecked', start);
  const body = source.slice(start,end) + '\nresult = allInSetChecked;';
  const ctx = {state:{currentRoutine:[{exercises:[ex]}]},bIndex:0,s:1,pendingCompanions:0,result:null};
  vm.runInNewContext(body,ctx);
  return {domCheckbox:true,modelCheckboxBeforeUpdate:ex.setsData[0].checked,canRest:ctx.result,note:'updateState() só ocorre depois dessa decisão'};
});
check('API aceita requisição sem token em simulação', () => {
  const routes = {};
  let calls = 0;
  const express = () => ({ use() {} });
  express.json = () => function json() {};
  express.Router = () => ({ post: (p,h) => routes[p] = h, get: (p,h) => routes[p] = h });
  const ctx = vm.createContext({
    require: name => {
      if (name === 'express') return express;
      if (name === 'cors') return () => function cors() {};
      if (name === 'firebase-functions/v2/https') return { onRequest: (_, app) => app };
      if (name === '@google/generative-ai') return {
        SchemaType: { ARRAY:'array',OBJECT:'object',STRING:'string',INTEGER:'integer' },
        GoogleGenerativeAI: class { getGenerativeModel() { return { async generateContent() { calls++; return {response:{text:()=> '[]'}}; } }; } }
      };
      throw new Error(name);
    },
    process: { env: { GEMINI_API_KEY:'fake-key-audit-no-network' } }, exports: {}, console
  });
  vm.runInContext(read('functions/index.js'), ctx);
  const response = {statusCode:200, status(s) {this.statusCode=s;return this;}, json(body) {this.body=body;} };
  return routes['/importar-treino-ia']({ body:{texto:'Teste'}, headers:{} }, response).then(() => ({ modelCalls:calls,status:response.statusCode,body:response.body }));
});
check('Biblioteca: adicionar exercício com pesquisa que não casa com o nome', () => {
  const d = dictionary[0];
  return d.name.toLowerCase().includes('zzzz') || d.focus.toLowerCase().includes('zzzz');
});
Promise.all(results.map(async r => ({ ...r, observed: await r.observed }))).then(async all => {
  const storage = new Map([['fitapp_sync_queue', JSON.stringify([{date:'2026-10-15', data:[]}])]]);
  let writes = 0;
  const ctx = vm.createContext({window:{ FitApp:{safeGet:k=>storage.get(k),safeSet:(k,v)=>storage.set(k,v),showToast(){},speak(){}},FitAPI:{async salvarTreino(){ writes++; await new Promise(resolve=>setImmediate(resolve)); }}},console:{log(){},warn(){}}});
  vm.runInContext(strip(read('public/js/sync.js')),ctx);
  await Promise.all([ctx.syncOfflineWorkouts(),ctx.syncOfflineWorkouts()]);
  all.push({name:'Duas sincronizações simultâneas da mesma fila', observed:{queued:1,writes,remaining:JSON.parse(storage.get('fitapp_sync_queue')).length}});
  const storage2 = new Map([['fitapp_sync_queue',JSON.stringify([{id:'original'}])]]);
  const ctx2 = vm.createContext({window:{FitApp:{safeGet:k=>storage2.get(k),safeSet:(k,v)=>storage2.set(k,v),showToast(){},speak(){}},FitAPI:{async salvarTreino(){storage2.set('fitapp_sync_queue',JSON.stringify([{id:'original'},{id:'added-during-sync'}]));}}},console:{log(){},warn(){}}});
  vm.runInContext(strip(read('public/js/sync.js')),ctx2);
  await ctx2.syncOfflineWorkouts();
  all.push({name:'Novo treino entra na fila enquanto sincroniza',observed:{remaining:JSON.parse(storage2.get('fitapp_sync_queue')),expectedRemainingId:'added-during-sync'}});
  const output = { date:'2026-10-15', localCommit:'5525ded095f30fb2c7537bfeb664dccd792da806', githubCommit:'73dfff970fe8ea9ff79477fee37a99b832140aec', note:'Simulações isoladas; sem navegador, sem credenciais e sem chamadas de produção.', results:all };
  fs.writeFileSync(path.join(__dirname,'evidencias.json'), JSON.stringify(output,null,2)+'\n');
  console.log(JSON.stringify(output,null,2));
});
