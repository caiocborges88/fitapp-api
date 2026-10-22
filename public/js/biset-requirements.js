// Each side is an explicit request. Missing sides must never become core, calves or isolated sets.
const plans={
    biset_sinergista:{
        peito_triceps:[
            [['Peitoral','Esternocostal'],['Tríceps','Tríceps (Cabeça Lateral/Medial)']],
            [['Peitoral','Clavicular'],['Tríceps','Tríceps (Cabeça Longa)']],
            [['Peitoral','Abdominal'],['Tríceps','Tríceps (Cabeça Lateral/Medial)']],
            [['Peitoral','Esternocostal'],['Tríceps','Tríceps (Cabeça Longa)']]
        ],
        costa_biceps:[
            [['Costas','Latíssimo do Dorso'],['Bíceps','Bíceps Braquial']],
            [['Costas','Espessura (Romboides)'],['Bíceps','Braquial / Antebraço']],
            [['Costas','Latíssimo do Dorso'],['Bíceps','Bíceps Braquial']],
            [['Costas','Espessura (Romboides)'],['Bíceps','Bíceps Braquial']]
        ],
        perna_ombro:[
            [['Quadríceps','Quadríceps (Vastos)'],['Ombros','Deltoide Anterior']],
            [['Isquiotibiais','Isquiotibiais (extensão de quadril)'],['Ombros','Deltoide Lateral']],
            [['Glúteos','Glúteo Máximo'],['Ombros','Deltoide Posterior']],
            [['Quadríceps','Reto Femoral'],['Ombros','Deltoide Anterior']]
        ]
    }
};

export function bisetRequirements(method,day){
    const plan=plans[method]?.[day];
    if(!plan)throw new Error('Selecione uma divisão válida para o bi-set.');
    return plan.map(pair=>pair.map(side=>[...side]));
}
