// Defaults of the current templates, not an individual progression prescription.
export function modelSettings(method='abc',profile='hipertrofia',level='iniciante'){
    let restSeconds=profile==='definicao'?(method==='circuito'?30:45):profile==='tatico'?45:60;
    if(level==='iniciante')restSeconds+=15;
    const baseSets=level==='iniciante'?3:4;
    const details=[];
    if(['abc','ppl','abcd'].includes(method)){
        details.push(profile==='feminino'?'Divisão com foco em inferiores.':'Divisão equilibrada entre os grupos do modelo.');
        details.push('Base de 10–12 repetições; exercícios de core podem usar outras metas.');
        if(['definicao','tatico'].includes(profile))details.push('Neste modelo, essa preferência altera o descanso; mantém os exercícios solicitados e as metas da opção Base.');
    }else if(method==='biset_sinergista'){
        details.push(profile==='definicao'?'Pares de 15–20 repetições e cardio final.':profile==='tatico'?'Pares de 6–8 repetições e core final por tempo.':'Pares de 10–12 repetições.');
        if(profile==='feminino')details.push('O foco em inferiores não altera a divisão dos pares deste modelo.');
    }else if(method==='circuito'){
        details.push(profile==='tatico'?'Estações principais por tempo (1 min).':'Estações principais de 15–20 repetições.');
        details.push('Cardio e core usam metas por tempo.');
        if(profile==='feminino')details.push('O foco em inferiores não altera as estações deste circuito.');
    }else if(method==='casa'){
        details.push('Sessão curta sem equipamentos; metas variam conforme a experiência declarada. A preferência de foco altera apenas o descanso.');
    }else details.push('Ficha personalizada: confira as séries e metas salvas.');
    details.push(`${baseSets} séries como base do gerador; iniciante filtra movimentos de alta complexidade.`);
    if(level!=='iniciante')details.push('Intermediário e avançado compartilham a base de séries e o filtro de complexidade; não há progressão automática entre eles.');
    details.push(`Descanso inicial: ${restSeconds} s, ajustável na sessão.`);
    return {restSeconds,baseSets,description:details.join(' ')};
}
export function validRestSeconds(value){
    const seconds=Number(value);
    return Number.isInteger(seconds)&&seconds>=15&&seconds<=600?seconds:60;
}
