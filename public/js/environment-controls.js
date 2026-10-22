import {environmentOptions} from './environment.js';
import {state} from './state.js';
const resources=[['bench','Banco firme'],['balance-support','Parede ou apoio firme para equilíbrio'],['pullup-bar','Barra fixa'],['low-bar','Barra baixa para remada'],['dumbbells','Halteres'],['incline-bench','Banco de musculação inclinado'],['decline-bench','Banco de musculação declinado'],['parallel-bars','Barras paralelas'],['rope','Corda']];
const outdoorResources=new Set(['bench','pullup-bar','low-bar','balance-support']);
function setup(){
    const panel=document.createElement('section');panel.className='panel';panel.id='environmentResources';
    const heading=document.createElement('h2');heading.textContent='Recursos disponíveis';
    const description=document.createElement('p');description.textContent='Marque o que existe no local. Em casa ou no hotel, halteres são opcionais. Parque/praia permite peso corporal, barras fixas, bancos e apoio para equilíbrio. Banco e apoio para equilíbrio são recursos distintos. A adaptação preserva o foco muscular quando há alternativa; sua ficha original é mantida.';
    const group=document.createElement('div');group.className='environment-resources';
    for(const [value,text]of resources){
        const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=value;input.dataset.environmentResource=value;
        input.addEventListener('change',()=>{window.FitApp.setEnvironmentResources([...group.querySelectorAll('input:checked')].filter(item=>!item.closest('label').hidden).map(item=>item.value));refresh();});
        label.append(input,document.createTextNode(text));group.append(label);
    }
    panel.append(heading,description,group);document.querySelector('#tab-treino .page-heading')?.after(panel);
    function refresh(){
        const options=environmentOptions();panel.hidden=options.environment==='academia';
        for(const input of group.querySelectorAll('input')){
            input.closest('label').hidden=options.environment!=='casa'&&!outdoorResources.has(input.value);
            input.checked=options.resources.includes(input.value);input.disabled=state.isWorkoutActive;
        }
    }
    for(const event of ['fitapp:environmentchange','fitapp:datachange'])window.addEventListener(event,refresh);
    refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
