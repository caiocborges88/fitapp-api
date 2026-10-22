const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();

// Requirements describe a requested slot. They are not equivalence rules for replacing an existing exercise.
// Keys preserve the plan's labels; selection uses the catalogue's stable focus/pattern identifiers.
const definitions=[
    ['Peitoral','Esternocostal','peitoral-esternocostal',['empurrar-horizontal','aducao-horizontal']],
    ['Peitoral','Clavicular','peitoral-clavicular',['empurrar-horizontal','aducao-horizontal']],
    ['Peitoral','Abdominal','peitoral-inferior',['empurrar-horizontal','aducao-horizontal']],
    ['Costas','Latíssimo do Dorso','costas-latissimo',['puxar-vertical']],
    ['Costas','Espessura (Romboides)','costas-remada',['puxar-horizontal']],
    ['Ombros','Deltoide Anterior','deltoide-anterior',['empurrar-vertical','flexao-ombro']],
    ['Ombros','Deltoide Lateral','deltoide-lateral',['abducao-ombro']],
    ['Ombros','Deltoide Posterior','deltoide-posterior',['abducao-horizontal','abducao-horizontal-rotacao-externa']],
    ['Bíceps','Bíceps Braquial','biceps',['flexao-cotovelo-supinada']],
    ['Bíceps','Braquial / Antebraço','braquial-antebraco',['flexao-cotovelo-neutra-pronada']],
    ['Tríceps','Tríceps (Cabeça Longa)','triceps-longa',['extensao-cotovelo-acima']],
    ['Tríceps','Tríceps (Cabeça Lateral/Medial)','triceps-lateral-medial',['extensao-cotovelo','empurrar-horizontal']],
    ['Quadríceps','Quadríceps (Vastos)','quadriceps-vastos',['agachar']],
    ['Quadríceps','Reto Femoral','quadriceps-reto',['extensao-joelho']],
    ['Isquiotibiais','Isquiotibiais (extensão de quadril)','isquiotibiais',['extensao-quadril','dobrar-quadril']],
    ['Isquiotibiais','Isquiotibiais (flexão de joelho)','isquiotibiais',['flexao-joelho']],
    ['Glúteos','Glúteo Máximo','gluteo-maximo',['extensao-quadril']],
    ['Panturrilhas','Gastrocnêmios','gastrocnemios',['flexao-plantar']],
    ['Core','Transverso do Abdômen','core-estabilidade',['anti-extensao']],
    ['Core','Reto Abdominal (flexão do tronco)','core-flexao',['flexao-tronco']],
];
const requirements=new Map(definitions.map(([group,label,focus,patterns])=>[
    normalize(group)+'|'+normalize(label),{focus,patterns}
]));

export function matchesMovementRequirement(movement,group,subLevel=null){
    if(!movement||normalize(movement.agonist||movement.group)!==normalize(group))return false;
    if(!subLevel)return true;
    const requirement=requirements.get(normalize(group)+'|'+normalize(subLevel));
    if(!requirement)return normalize(movement.subLevel)===normalize(subLevel);
    return Boolean(movement.muscleFocus?.includes(requirement.focus)&&requirement.patterns.includes(movement.movementPattern));
}

// Display canonical emphases using the same focus/pattern contract as selection.
export function movementEmphases(movement){
    if(!movement)return [];
    const labels=definitions.filter(([group,label])=>matchesMovementRequirement(movement,group,label)).map(([,label])=>label);
    return [...new Set(labels.length?labels:movement.subLevel?[movement.subLevel]:[])];
}
