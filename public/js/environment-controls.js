import {environmentOptions} from './environment.js';
import {equipmentGroups,resourceLabels,environmentSummary} from './equipment-settings.js';
import {state} from './state.js';

const outdoorResources=new Set(['bench','pullup-bar','low-bar','balance-support']);
export function syncEquipmentChips(){
    const options=environmentOptions();
    for(const chip of document.querySelectorAll('.forge-equip-chip')){
        const active=options.equipment.includes(chip.dataset.equip);
        chip.classList.toggle('active',active);chip.setAttribute('aria-pressed',String(active));
        chip.disabled=options.environment!=='academia';
    }
}
function setup(){
    const panel=document.createElement('section');panel.className='environment-summary';panel.id='environmentResources';panel.hidden=true;
    const open=document.createElement('button');open.className='text-button';open.type='button';open.setAttribute('aria-haspopup','dialog');
    panel.append(open);document.querySelector('#tab-treino .page-heading')?.after(panel);
    const dialog=document.createElement('dialog');dialog.id='environmentDialog';dialog.className='environment-dialog';dialog.setAttribute('aria-label','Ambiente e equipamentos do treino');
    dialog.innerHTML='<form method="dialog"><button class="icon-button dialog-close" aria-label="Fechar ambiente">×</button></form><span class="eyebrow">LOCAL DO TREINO</span><h2>Onde você vai treinar?</h2><label class="field">Ambiente<select id="environmentSelect"><option value="academia">Academia</option><option value="casa">Casa</option><option value="praia">Parque/praia</option></select></label><p>As escolhas ficam salvas neste dispositivo para cada ambiente. Confira o que está disponível hoje.</p><fieldset class="environment-equipment"><legend>Equipamentos disponíveis</legend></fieldset><fieldset class="environment-resources"><legend>Recursos disponíveis</legend></fieldset><p>Banco firme e apoio para equilíbrio são recursos distintos. Mudanças adaptam apenas a sessão aberta; sua ficha salva é preservada.</p><form method="dialog"><button class="button primary">Concluir</button></form>';
    document.body.append(dialog);
    const show=()=>{if(state.isWorkoutActive){window.FitApp.showToast('Conclua ou descarte a sessão antes de mudar o ambiente.');return;}refresh();dialog.showModal();};
    open.addEventListener('click',show);
    const header=document.getElementById('btnEnvToggle');header.onclick=show;header.setAttribute('aria-haspopup','dialog');
    for(const [value,labelText]of resourceLabels){
        const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=value;input.dataset.environmentResource=value;
        input.addEventListener('change',()=>window.FitApp.setEnvironmentResources([...dialog.querySelectorAll('[data-environment-resource]:checked')].filter(item=>!item.closest('label').hidden).map(item=>item.value)));
        label.append(input,document.createTextNode(labelText));dialog.querySelector('.environment-resources').append(label);
    }
    for(const [value,labelText]of equipmentGroups){
        const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=value;input.dataset.environmentEquipment=value;
        input.addEventListener('change',()=>window.FitApp.setEnvironmentEquipment([...dialog.querySelectorAll('[data-environment-equipment]:checked')].map(item=>item.value)));
        label.append(input,document.createTextNode(labelText));dialog.querySelector('.environment-equipment').append(label);
    }
    dialog.querySelector('select').addEventListener('change',event=>window.FitApp.setGlobalEnvironment(event.target.value));
    window.FitEnvironment={open:show,refresh};
    function refresh(){
        const options=environmentOptions();open.textContent=environmentSummary(options)+' · Alterar';
        header.setAttribute('aria-label',environmentSummary(options)+' · Alterar ambiente e equipamentos');
        dialog.querySelector('select').value=['parque','parque/praia'].includes(options.environment)?'praia':options.environment;
        dialog.querySelector('.environment-equipment').hidden=options.environment!=='academia';
        dialog.querySelector('.environment-resources').hidden=options.environment==='academia';
        for(const input of dialog.querySelectorAll('[data-environment-resource]')){
            input.closest('label').hidden=options.environment!=='casa'&&!outdoorResources.has(input.value);
            input.checked=options.resources.includes(input.value);input.disabled=state.isWorkoutActive;
        }
        for(const input of dialog.querySelectorAll('[data-environment-equipment]')){input.checked=options.equipment.includes(input.value);input.disabled=state.isWorkoutActive;}
        syncEquipmentChips();
        const summary=document.getElementById('forgeEnvironmentSummary');if(summary)summary.textContent=environmentSummary(options)+' · Alterar';
    }
    for(const event of ['fitapp:environmentchange','fitapp:datachange'])window.addEventListener(event,refresh);
    refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
