// 2. DICIONÁRIO DE EXERCÍCIOS CLASSIFICADO POR EQUIPAMENTO
const dictionaryData = [
    // --- CORE E ESTABILIDADE ---
    { name: "Abdominal Bicicleta", focus: "Core Completo", desc: "Deitado de costas...", equip: "peso_corporal" },
    { name: "Abdominal Canivete", focus: "Core Avançado", desc: "Deitado esticado...", equip: "peso_corporal" },
    { name: "Abdominal Declinado", focus: "Core Avançado", desc: "Utilizando o banco declinado...", equip: "maquina" },
    { name: "Abdominal Infra", focus: "Core Inferior", desc: "Deitado de costas...", equip: "peso_corporal" },
    { name: "Abdominal Máquina", focus: "Core Base", desc: "Sentado no aparelho...", equip: "maquina" },
    { name: "Abdominal Oblíquo", focus: "Core Lateral", desc: "Deitado, cruze uma perna...", equip: "peso_corporal" },
    { name: "Abdominal Supra", focus: "Core Superior", desc: "Movimento do supra solo...", equip: "peso_corporal" },
    { name: "Abdominal Supra com Carga", focus: "Core", desc: "Movimento tradicional curto...", equip: "halter" },
    { name: "Abdominal Supra Solo", focus: "Core Superior", desc: "Deitado, joelhos dobrados...", equip: "peso_corporal" },
    { name: "Elevação Pernas Pendurado (Barra)", focus: "Core Inferior Avançado", desc: "Pendurado na barra fixa...", equip: "calistenia" },
    { name: "Escalador (Mountain Climber)", focus: "Core/Cardio", desc: "Posição de prancha alta...", equip: "peso_corporal" },
    { name: "Hollow Body Hold", focus: "Core Avançado", desc: "Deitado de costas...", equip: "peso_corporal" },
    { name: "Prancha Isométrica", focus: "Core Estabilização", desc: "Apoiado nos antebraços...", equip: "peso_corporal" },
    { name: "Prancha Lateral", focus: "Oblíquos", desc: "Apoiado no antebraço...", equip: "peso_corporal" },
    { name: "Roda Abdominal", focus: "Core Avançado", desc: "Ajoelhado, segure a roda...", equip: "halter" },
    { name: "Russian Twist", focus: "Oblíquos/Core", desc: "Sentado com o tronco inclinado...", equip: "peso_corporal" },
    { name: "Superman (Solo)", focus: "Lombar/Glúteos", desc: "Deitado de bruços no chão...", equip: "peso_corporal" },
    { name: "Toque no Calcanhar", focus: "Oblíquos", desc: "Deitado de costas, pés no chão...", equip: "peso_corporal" },
    { name: "V-Up (Abdominal em V)", focus: "Core Avançado", desc: "Deitado esticado no chão...", equip: "peso_corporal" },
    
    // --- PERNAS E OMBROS ---
    { name: "Agachamento Búlgaro", focus: "Pernas e Glúteos", desc: "Em pé, de costas para um banco...", equip: "peso_corporal" },
    { name: "Agachamento Búlgaro no Banco", focus: "Pernas", desc: "Apoie o pé de trás em um banco de praça...", equip: "calistenia" },
    { name: "Agachamento Livre", focus: "Pernas Completo", desc: "Barra nos trapézios...", equip: "barra" },
    { name: "Agachamento no Smith", focus: "Pernas Guiado", desc: "Pés levemente à frente da barra...", equip: "maquina" },
    { name: "Cadeira Abdutora", focus: "Glúteos/Lateral da coxa", desc: "Sentado, apoie os joelhos...", equip: "maquina" },
    { name: "Cadeira Adutora", focus: "Adutores", desc: "Almofadas por dentro dos joelhos...", equip: "maquina" },
    { name: "Cadeira Extensora", focus: "Quadríceps", desc: "Sentado, ajuste o rolo...", equip: "maquina" },
    { name: "Crucifixo Invertido Livre", focus: "Deltóide Posterior", desc: "Tronco inclinado para frente...", equip: "halter" },
    { name: "Desenvolvimento Halteres", focus: "Ombros Base", desc: "Sentado em banco de encosto reto...", equip: "halter" },
    { name: "Desenvolvimento Militar", focus: "Ombros Força", desc: "Em pé, com barra livre...", equip: "barra" },
    { name: "Desenvolvimento Máquina", focus: "Ombros Seguro", desc: "Sentado, empurre as alavancas...", equip: "maquina" },
    { name: "Elevação Frontal Anilha", focus: "Ombro Anterior", desc: "Em pé, segure uma anilha...", equip: "halter" },
    { name: "Elevação Lateral Halteres", focus: "Deltóide Lateral", desc: "Em pé, joelhos destravados...", equip: "halter" },
    { name: "Elevação Pélvica", focus: "Glúteos", desc: "Deitado com costas apoiadas...", equip: "barra" },
    { name: "Encolhimento Halteres", focus: "Trapézio", desc: "Em pé com halteres...", equip: "halter" },
    { name: "Leg Press 45°", focus: "Pernas Completo", desc: "No aparelho inclinado...", equip: "maquina" },
    { name: "Leg Press Máquina", focus: "Pernas Seguro", desc: "Sentado na máquina horizontal...", equip: "maquina" },
    { name: "Panturrilha no Leg Press", focus: "Panturrilha", desc: "Posicione a ponta dos pés...", equip: "maquina" },
    { name: "Panturrilha Sentado", focus: "Panturrilha (Sóleo)", desc: "No aparelho específico...", equip: "maquina" },
    { name: "Panturrilha no Degrau", focus: "Panturrilha", desc: "Em pé na borda de um banco ou calçada...", equip: "calistenia" },
    { name: "Remada Alta no Cabo", focus: "Ombro/Trapézio", desc: "Polia baixa com barra reta...", equip: "cabo" },
    { name: "Stiff (Terra Romeno)", focus: "Posterior e Glúteo", desc: "Joelhos destravados...", equip: "barra" },
    { name: "Variação Mesa Flexora", focus: "Posterior Coxa", desc: "Deitado de bruços...", equip: "maquina" },
    
    // --- COSTAS E BÍCEPS ---
    { name: "Barra Fixa", focus: "Costas Largura", desc: "Pendurado na barra...", equip: "calistenia" },
    { name: "Barra Fixa Supinada (Chin-up)", focus: "Costas e Bíceps", desc: "Pegada na largura dos ombros...", equip: "calistenia" },
    { name: "Barra Fixa Isométrica", focus: "Bíceps", desc: "Puxe até o queixo e segure a posição...", equip: "calistenia" },
    { name: "Extensão Lombar Máquina", focus: "Lombar", desc: "Sentado no aparelho...", equip: "maquina" },
    { name: "Pulldown no Cabo", focus: "Dorsal", desc: "Em pé, de frente para a polia alta...", equip: "cabo" },
    { name: "Puxada Alta (Livre)", focus: "Costas Largura", desc: "Segure a barra longa...", equip: "maquina" },
    { name: "Puxada Alta Máquina", focus: "Costas Seguro", desc: "Sentado no aparelho articulado...", equip: "maquina" },
    { name: "Puxada Frente Supinada", focus: "Costas e Bíceps", desc: "No pulley, pegada supinada...", equip: "cabo" },
    { name: "Remada Baixa Triângulo", focus: "Costas Miolo", desc: "Sentado na polia baixa...", equip: "cabo" },
    { name: "Remada Cavalinho Livre", focus: "Costas Densidade", desc: "Barra encaixada na parede...", equip: "barra" },
    { name: "Remada Curvada Livre", focus: "Costas Densidade", desc: "Tronco inclinado...", equip: "barra" },
    { name: "Remada Australiana (Barra Baixa)", focus: "Costas", desc: "Corpo inclinado sob uma barra baixa, puxe o peito até ela...", equip: "calistenia" },
    { name: "Remada Máquina", focus: "Costas Base", desc: "Sentado, apoie o peito...", equip: "maquina" },
    { name: "Remada Unilateral (Serrote)", focus: "Costas", desc: "Apoie um joelho e mão no banco...", equip: "halter" },
    { name: "Rosca 21 (Barra)", focus: "Bíceps", desc: "7 reps da metade inferior...", equip: "barra" },
    { name: "Rosca Alternada Inclinada", focus: "Bíceps Alongado", desc: "Banco inclinado (45°)...", equip: "halter" },
    { name: "Rosca Aranha (Spider Curl)", focus: "Bíceps Pico", desc: "Deite de bruços no banco a 45°...", equip: "halter" },
    { name: "Rosca Concentrada", focus: "Bíceps Pico", desc: "Sentado, apoie o tríceps...", equip: "halter" },
    { name: "Rosca Direta (Barra W)", focus: "Bíceps Base", desc: "Em pé. Mantenha os cotovelos fixos...", equip: "barra" },
    { name: "Rosca Inversa no Cabo", focus: "Antebraço", desc: "Na polia baixa com barra reta...", equip: "cabo" },
    { name: "Rosca Martelo Halteres", focus: "Bíceps e Antebraço", desc: "Em pé, segure os halteres...", equip: "halter" },
    { name: "Rosca Máquina", focus: "Bíceps Seguro", desc: "Sentado, apoie bem os tríceps...", equip: "maquina" },
    { name: "Rosca Scott", focus: "Bíceps Isolado", desc: "Com barra W, apoie os braços...", equip: "barra" },
    { name: "Rosca Scott (Máquina)", focus: "Bíceps Isolado", desc: "Sente-se e apoie bem as axilas...", equip: "maquina" },
    
    // --- PEITO E TRÍCEPS ---
    { name: "Crossover Polia Baixa", focus: "Peitoral Superior", desc: "Polias no chão...", equip: "cabo" },
    { name: "Crossover Polia Média", focus: "Peitoral", desc: "Polias na altura dos ombros...", equip: "cabo" },
    { name: "Crucifixo Reto Halteres", focus: "Peitoral", desc: "Deitado no banco reto...", equip: "halter" },
    { name: "Flexão de Braço (Joelhos)", focus: "Peito e Tríceps", desc: "Posição de prancha, joelhos apoiados...", equip: "peso_corporal" },
    { name: "Flexão Diamante", focus: "Tríceps", desc: "Posição de flexão, mãos formam um triângulo...", equip: "peso_corporal" },
    { name: "Flexão Inclinada no Banco", focus: "Peitoral Inferior", desc: "Mãos apoiadas no encosto de um banco de praça...", equip: "calistenia" },
    { name: "Flexão Declinada (Pés no Banco)", focus: "Peitoral Superior", desc: "Pés sobre um banco de praça, mãos no chão...", equip: "calistenia" },
    { name: "Mergulho Paralelas", focus: "Tríceps Força", desc: "Apoie-se nas barras de praça ou academia...", equip: "calistenia" },
    { name: "Mergulho no Banco", focus: "Tríceps", desc: "Mãos na borda de um banco de praça...", equip: "calistenia" },
    { name: "Peck Deck na Polia", focus: "Peitoral Isolado", desc: "Em pé entre duas polias...", equip: "cabo" },
    { name: "Pullover com Halter", focus: "Peito e Dorsal", desc: "Deitado no banco reto...", equip: "halter" },
    { name: "Supino Declinado Barra", focus: "Peitoral Inferior", desc: "Em banco declinado...", equip: "barra" },
    { name: "Supino Inclinado Halteres", focus: "Peitoral Superior", desc: "Banco inclinado...", equip: "halter" },
    { name: "Supino Máquina", focus: "Peitoral Seguro", desc: "Empurre as alavancas...", equip: "maquina" },
    { name: "Supino Reto Barra", focus: "Peitoral Força", desc: "Deitado no banco reto...", equip: "barra" },
    { name: "Supino Reto Halteres", focus: "Peitoral Base", desc: "Deitado no banco...", equip: "halter" },
    { name: "Tríceps Corda", focus: "Tríceps Porção Lateral", desc: "No final do movimento de pulley...", equip: "cabo" },
    { name: "Tríceps Francês Halter", focus: "Tríceps Porção Longa", desc: "Sentado, segure um halter...", equip: "halter" },
    { name: "Tríceps Kickback Cabo (Coice)", focus: "Tríceps", desc: "Incline o tronco...", equip: "cabo" },
    { name: "Tríceps Máquina", focus: "Tríceps", desc: "Sentado no aparelho...", equip: "maquina" },
    { name: "Tríceps Pulley", focus: "Tríceps Base", desc: "Incline o tronco levemente...", equip: "cabo" },
    { name: "Tríceps Testa", focus: "Tríceps Isolado", desc: "Deitado, desça a barra...", equip: "barra" },
    { name: "Voador (Peck Deck)", focus: "Peitoral Isolado", desc: "Feche os braços na frente do peito...", equip: "maquina" },

    // --- MOBILIDADE CORPORAL ---
    { name: "Cócoras Profundas", focus: "Pernas (Mobilidade)", desc: "Ficar agachado o mais baixo possível...", equip: "peso_corporal" },
    { name: "Gato-Vaca (Cat-Cow)", focus: "Costas (Mobilidade)", desc: "Em quatro apoios...", equip: "peso_corporal" },
    { name: "Mobilidade 90/90", focus: "Pernas (Mobilidade)", desc: "Sentado, pernas flexionadas...", equip: "peso_corporal" },
    { name: "Maior Alongamento do Mundo", focus: "Pernas (Mobilidade)", desc: "Avanço profundo...", equip: "peso_corporal" },
    { name: "Rotação Torácica", focus: "Costas e Ombros", desc: "Em quatro apoios, mão na nuca...", equip: "peso_corporal" },
    { name: "Deslocamento de Ombros", focus: "Ombros (Mobilidade)", desc: "Segurar um cabo de vassoura (ou toalha)...", equip: "peso_corporal" },
    { name: "Dorsiflexão de Tornozelo", focus: "Pernas (Mobilidade)", desc: "Em pé, ponta do pé próxima à parede...", equip: "peso_corporal" },
    
    // --- AERÓBICOS E HIIT ---
    { name: "Polichinelos (Jumping Jacks)", focus: "Cardio", desc: "Clássico aeróbico...", equip: "peso_corporal" },
    { name: "Corrida Estacionária", focus: "Cardio", desc: "Correr no lugar...", equip: "peso_corporal" },
    { name: "Corrida Calcanhar no Glúteo", focus: "Cardio", desc: "Correr no lugar chutando os calcanhares...", equip: "peso_corporal" },
    { name: "Burpees", focus: "Cardio", desc: "Do chão ao teto...", equip: "peso_corporal" },
    { name: "Saltos Laterais (Skater Jumps)", focus: "Cardio", desc: "Saltar lateralmente...", equip: "peso_corporal" },
    { name: "Pular Corda", focus: "Cardio", desc: "Saltos curtos mantendo o abdômen contraído...", equip: "peso_corporal" },
    { name: "Sprawl (Meio Burpee)", focus: "Core/Cardio", desc: "Posição de prancha alta...", equip: "peso_corporal" },
    
    // --- FORÇA INFERIORES (CALISTENIA) ---
    { name: "Agachamento com Salto", focus: "Pernas Explosão", desc: "Agachamento tradicional seguido de salto...", equip: "peso_corporal" },
    { name: "Afundo / Avanço", focus: "Pernas", desc: "Passada larga à frente ou para trás...", equip: "peso_corporal" },
    { name: "Pistol Squat", focus: "Pernas Avançado", desc: "Agachamento de uma perna só...", equip: "peso_corporal" },
    
    // --- FORÇA SUPERIORES E ISOMETRIA (QUARTO DE HOTEL) ---
    { name: "Flexão de Braço Tradicional", focus: "Peito e Tríceps", desc: "Sem joelhos no chão. Corpo rígido...", equip: "peso_corporal" },
    { name: "Flexão Pike (Pike Push-up)", focus: "Ombros", desc: "Corpo em formato de 'V' invertido...", equip: "peso_corporal" },
    { name: "Prancha Sobe-Desce", focus: "Ombros e Core", desc: "Alternar entre prancha com antebraços...", equip: "peso_corporal" },
    { name: "Remada na Porta/Lençol", focus: "Costas Base", desc: "Usar um lençol preso na porta...", equip: "peso_corporal" },
    { name: "Rosca Isométrica (Toalha/Cinto)", focus: "Bíceps", desc: "Pise em uma toalha e puxe as pontas para cima...", equip: "peso_corporal" },
    { name: "Contração de Costas Isométrica", focus: "Costas", desc: "Apoie os cotovelos contra o colchão/parede...", equip: "peso_corporal" },
    { name: "Elevação Lateral Isométrica", focus: "Ombros", desc: "Empurre os braços lateralmente contra o batente...", equip: "peso_corporal" },

    // --- FORÇA E POTÊNCIA (ACADEMIA SOCIETY) ---
    { name: "Sprints com Trenó (Sled)", focus: "Pernas Explosão", desc: "Empurrar ou puxar trenó com carga pesada.", equip: "maquina" },
    { name: "Agachamento Frontal", focus: "Quadríceps/Core", desc: "Agachamento com a barra apoiada nos ombros frontais.", equip: "barra" },
    { name: "Terra Hexagonal (Trap Bar)", focus: "Pernas/Costas", desc: "Levantamento terra utilizando barra hexagonal para biomecânica otimizada.", equip: "barra" },
    { name: "Step-ups Pesados", focus: "Pernas Unilateral", desc: "Subida na caixa segurando halteres de alta carga.", equip: "halter" },
    { name: "Pallof Press (Polia)", focus: "Core Anti-rotação", desc: "Na polia, empurre o cabo à frente do peito e resista à rotação do tronco.", equip: "cabo" },
    { name: "Saltos na Caixa (Box Jump)", focus: "Pernas Pliometria", desc: "Salto explosivo e aterrissagem estável sobre caixa pliométrica.", equip: "peso_corporal" },
    
    // --- MECÂNICA E ESTABILIDADE (CASA) ---
    { name: "Marchas na Parede (Wall Drills)", focus: "Pernas Mecânica", desc: "Mãos na parede, corpo inclinado, trocas de perna explosivas.", equip: "peso_corporal" },
    { name: "Quedas de Base (Drop Squats)", focus: "Pernas Frenagem", desc: "Cair rapidamente em posição de agachamento atlético para treinar absorção.", equip: "peso_corporal" },
    { name: "Agachamento Lateral (Cossack)", focus: "Pernas e Mobilidade", desc: "Agachamento lateral profundo, mantendo a perna oposta estendida.", equip: "peso_corporal" },
    { name: "Flexão Nórdica", focus: "Posteriores de Coxa", desc: "De joelhos (calcanhares travados), desça o tronco controlando a queda livre.", equip: "peso_corporal" },
    { name: "Prancha Copenhague", focus: "Adutores e Core", desc: "Prancha lateral com a perna de cima ancorada sobre uma cadeira/banco.", equip: "peso_corporal" },
    { name: "Percevejo (Dead Bugs)", focus: "Core Anti-extensão", desc: "Deitado, estenda perna e braço opostos sem permitir que a lombar curve.", equip: "peso_corporal" },
    { name: "Saltos em Pogo", focus: "Panturrilha Pliometria", desc: "Saltos curtos contínuos usando apenas a reatividade dos tornozelos.", equip: "peso_corporal" },
    
    // --- DESLOCAMENTO REAL (CAMPO / PRAÇA / ESPAÇO ABERTO) ---
    { name: "Sprints Curtos (Aceleração)", focus: "Pernas Explosão", desc: "Tiros de velocidade máxima (saídas do zero) de 5 a 15 metros.", equip: "calistenia" },
    { name: "Sprints Lançados (Flying Sprints)", focus: "Pernas Velocidade Média", desc: "Aceleração progressiva atingindo velocidade máxima entre 20 a 40 metros.", equip: "calistenia" },
    { name: "Desacelerações Resistidas", focus: "Pernas Frenagem", desc: "Corrida travada por elástico ou parada brusca programada.", equip: "calistenia" },
    { name: "Shuttle 5-10-5", focus: "Pernas Agilidade", desc: "Tiros curtos com cortes angulares e mudança brusca de direção.", equip: "calistenia" },
    { name: "Saltos Horizontais (Broad Jump)", focus: "Pernas Pliometria", desc: "Salto máximo para frente buscando distância e aterrissagem sólida.", equip: "calistenia" },
    { name: "Lançamento de Medicine Ball", focus: "Core Explosivo", desc: "Arremesso rotacional ou overhead de bola pesada contra parede ou no gramado.", equip: "calistenia" }
];

// // 1. BANCO DE DADOS EXPANDIDO (Modo Bi-set e Modo Tradicional)
const dbWorkouts = {
    biset: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Máquina", sets: 4, target: "12-15 rep" }, { name: "Tríceps Pulley", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Voador (Peck Deck)", sets: 4, target: "12-15 rep" }, { name: "Tríceps Corda", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Flexão de Braço (Joelhos)", sets: 4, target: "Até Falha" }, { name: "Tríceps Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Reto Halteres", sets: 4, target: "12-15 rep" }, { name: "Tríceps Testa", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Toque no Calcanhar", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Alta Máquina", sets: 4, target: "12-15 rep" }, { name: "Rosca Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Máquina", sets: 4, target: "12-15 rep" }, { name: "Rosca Scott (Máquina)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Alta (Livre)", sets: 4, target: "12-15 rep" }, { name: "Rosca Direta (Barra W)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Bi-set: Costas + Lombar)", exercises: [{ name: "Remada Baixa Triângulo", sets: 4, target: "12-15 rep" }, { name: "Extensão Lombar Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Superman (Solo)", sets: 3, target: "15-20 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Leg Press Máquina", sets: 4, target: "12-15 rep" }, { name: "Desenvolvimento Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "12-15 rep" }, { name: "Elevação Lateral Halteres", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Bi-set: Adutores + Abdutores)", exercises: [{ name: "Cadeira Adutora", sets: 4, target: "12-15 rep" }, { name: "Cadeira Abdutora", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Bi-set: Panturrilhas)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }, { name: "Panturrilha Sentado", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Prancha Isométrica", sets: 3, target: "30 seg" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Reto Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Testa", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Inclinado Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Francês Halter", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Crossover Polia Média", sets: 4, target: "10-12 rep" }, { name: "Tríceps Kickback Cabo (Coice)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Pullover com Halter", sets: 4, target: "10-12 rep" }, { name: "Tríceps Corda", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Bicicleta", sets: 3, target: "20 rep/lado" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Frente Supinada", sets: 4, target: "10-12 rep" }, { name: "Rosca Direta (Barra W)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Unilateral (Serrote)", sets: 4, target: "10-12 rep" }, { name: "Rosca Martelo Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Pulldown no Cabo", sets: 4, target: "10-12 rep" }, { name: "Rosca Alternada Inclinada", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Baixa Triângulo", sets: 4, target: "10-12 rep" }, { name: "Rosca Inversa no Cabo", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Russian Twist", sets: 3, target: "15 rep/lado" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }, { name: "Desenvolvimento Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Leg Press 45°", sets: 4, target: "10-12 rep" }, { name: "Elevação Lateral Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bi-set: Glúteos + Ombros)", exercises: [{ name: "Elevação Pélvica", sets: 4, target: "10-12 rep" }, { name: "Elevação Frontal Anilha", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bi-set: Posteriores + Trapézio)", exercises: [{ name: "Variação Mesa Flexora", sets: 4, target: "10-12 rep" }, { name: "Encolhimento Halteres", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Prancha Lateral", sets: 3, target: "30 seg/lado" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Reto Barra", sets: 4, target: "8-10 rep" }, { name: "Mergulho Paralelas", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 2 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Declinado Barra", sets: 4, target: "8-10 rep" }, { name: "Tríceps Francês Halter", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Crossover Polia Baixa", sets: 4, target: "10-12 rep" }, { name: "Flexão Diamante", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 4 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Crucifixo Reto Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Corda", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Declinado", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Barra Fixa Supinada (Chin-up)", sets: 4, target: "Até Falha" }, { name: "Rosca 21 (Barra)", sets: 4, target: "21 rep" }] },
                { title: "Bloco 2 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Cavalinho Livre", sets: 4, target: "8-10 rep" }, { name: "Rosca Aranha (Spider Curl)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Alta (Livre)", sets: 4, target: "10-12 rep" }, { name: "Rosca Direta (Barra W)", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 4 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Curvada Livre", sets: 4, target: "10-12 rep" }, { name: "Rosca Scott", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Hollow Body Hold", sets: 3, target: "45 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Agachamento Livre", sets: 5, target: "6-8 rep" }, { name: "Desenvolvimento Militar", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "8-10 rep/lado" }, { name: "Desenvolvimento Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Stiff (Terra Romeno)", sets: 4, target: "8-10 rep" }, { name: "Remada Alta no Cabo", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bi-set: Panturrilhas)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }, { name: "Panturrilha Sentado", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "V-Up (Abdominal em V)", sets: 3, target: "15-20 rep" }] }
            ]
        }
    },
    tradicional: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Peitoral)", exercises: [{ name: "Supino Máquina", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Peitoral)", exercises: [{ name: "Voador (Peck Deck)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Tríceps)", exercises: [{ name: "Tríceps Pulley", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Tríceps)", exercises: [{ name: "Tríceps Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Máquina", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Dorsais)", exercises: [{ name: "Puxada Alta Máquina", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Dorsais)", exercises: [{ name: "Remada Máquina", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bíceps)", exercises: [{ name: "Rosca Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Bíceps)", exercises: [{ name: "Rosca Scott (Máquina)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Superman (Solo)", sets: 3, target: "15-20 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Leg Press Máquina", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Ombros)", exercises: [{ name: "Desenvolvimento Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Panturrilha)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Prancha Isométrica", sets: 3, target: "30 seg" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Peitoral)", exercises: [{ name: "Supino Reto Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Peitoral)", exercises: [{ name: "Supino Inclinado Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Tríceps)", exercises: [{ name: "Tríceps Testa", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Tríceps)", exercises: [{ name: "Tríceps Pulley", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Supra com Carga", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Dorsais)", exercises: [{ name: "Puxada Frente Supinada", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Dorsais)", exercises: [{ name: "Remada Baixa Triângulo", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Bíceps)", exercises: [{ name: "Rosca Direta (Barra W)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bíceps)", exercises: [{ name: "Rosca Martelo Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Russian Twist", sets: 3, target: "15 rep/lado" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Variação Mesa Flexora", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Ombros)", exercises: [{ name: "Desenvolvimento Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Ombros)", exercises: [{ name: "Elevação Lateral Halteres", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Oblíquo", sets: 3, target: "15 rep/lado" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Peitoral)", exercises: [{ name: "Supino Reto Barra", sets: 5, target: "6-8 rep" }] },
                { title: "Bloco 2 (Peitoral)", exercises: [{ name: "Crucifixo Reto Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Tríceps)", exercises: [{ name: "Mergulho Paralelas", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 4 (Tríceps)", exercises: [{ name: "Tríceps Francês Halter", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Canivete", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Dorsais)", exercises: [{ name: "Barra Fixa Supinada (Chin-up)", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 2 (Dorsais)", exercises: [{ name: "Remada Curvada Livre", sets: 4, target: "6-8 rep" }] },
                { title: "Bloco 3 (Bíceps)", exercises: [{ name: "Rosca Alternada Inclinada", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 4 (Bíceps)", exercises: [{ name: "Rosca Concentrada", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Elevação Pernas Pendurado", sets: 3, target: "12-15 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Pernas)", exercises: [{ name: "Agachamento Livre", sets: 5, target: "6-8 rep" }] },
                { title: "Bloco 2 (Pernas)", exercises: [{ name: "Stiff (Terra Romeno)", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Ombros)", exercises: [{ name: "Desenvolvimento Militar", sets: 4, target: "6-8 rep" }] },
                { title: "Bloco 4 (Ombros)", exercises: [{ name: "Crucifixo Invertido Livre", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Roda Abdominal", sets: 3, target: "10-15 rep" }] }
            ]
        }
    }
};
// 2.5 BANCO DE DADOS PARALELO (Feminino - Foco Inferiores e Tônus Superior)
const dbWorkoutsFeminino = {
    biset: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Elevação Pélvica", sets: 4, target: "12-15 rep" }, { name: "Variação Mesa Flexora", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Stiff (Terra Romeno)", sets: 4, target: "12-15 rep" }, { name: "Cadeira Abdutora", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 3 (Isolado)", exercises: [{ name: "Agachamento Búlgaro", sets: 3, target: "10-12 rep/lado" }] },
                { title: "Bloco 4 (Core)", exercises: [{ name: "Abdominal Máquina", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Peito)", exercises: [{ name: "Puxada Alta Máquina", sets: 4, target: "12-15 rep" }, { name: "Supino Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Ombros + Tríceps)", exercises: [{ name: "Desenvolvimento Máquina", sets: 4, target: "12-15 rep" }, { name: "Tríceps Pulley", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Bi-set: Bíceps + Core)", exercises: [{ name: "Rosca Máquina", sets: 3, target: "12-15 rep" }, { name: "Prancha Isométrica", sets: 3, target: "30 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Quadríceps)", exercises: [{ name: "Leg Press Máquina", sets: 4, target: "12-15 rep" }, { name: "Cadeira Extensora", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Adutores + Panturrilha)", exercises: [{ name: "Cadeira Adutora", sets: 4, target: "15-20 rep" }, { name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Supra Solo", sets: 3, target: "15-20 rep" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Elevação Pélvica", sets: 4, target: "10-12 rep" }, { name: "Stiff (Terra Romeno)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "10-12 rep/lado" }, { name: "Variação Mesa Flexora", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isoladores)", exercises: [{ name: "Cadeira Abdutora", sets: 4, target: "12-15 rep" }, { name: "Abdominal Bicicleta", sets: 3, target: "20 rep/lado" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Peito)", exercises: [{ name: "Puxada Frente Supinada", sets: 4, target: "10-12 rep" }, { name: "Supino Inclinado Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Ombros + Tríceps)", exercises: [{ name: "Desenvolvimento Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Corda", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isoladores)", exercises: [{ name: "Elevação Lateral Halteres", sets: 4, target: "12-15 rep" }, { name: "Prancha Lateral", sets: 3, target: "30 seg/lado" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Quadríceps)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }, { name: "Leg Press 45°", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Quadríceps + Panturrilha)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "10-12 rep" }, { name: "Panturrilha Sentado", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 3 (Core)", exercises: [{ name: "Russian Twist", sets: 3, target: "15 rep/lado" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Elevação Pélvica", sets: 5, target: "8-10 rep" }, { name: "Stiff (Terra Romeno)", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Bi-set: Unilaterais)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "8-10 rep/lado" }, { name: "Cadeira Abdutora", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isolador)", exercises: [{ name: "Variação Mesa Flexora", sets: 4, target: "10-12 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Peito)", exercises: [{ name: "Barra Fixa Supinada (Chin-up)", sets: 4, target: "Até Falha" }, { name: "Supino Reto Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Ombros + Tríceps)", exercises: [{ name: "Desenvolvimento Militar", sets: 4, target: "8-10 rep" }, { name: "Tríceps Testa", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isoladores)", exercises: [{ name: "Elevação Lateral Halteres", sets: 4, target: "10-12 rep" }, { name: "Hollow Body Hold", sets: 3, target: "45 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Quadríceps)", exercises: [{ name: "Agachamento Livre", sets: 5, target: "8-10 rep" }, { name: "Leg Press 45°", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Bi-set: Extensão + Panturrilha)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "10-12 rep" }, { name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 3 (Core)", exercises: [{ name: "V-Up (Abdominal em V)", sets: 3, target: "15-20 rep" }] }
            ]
        }
    },
    tradicional: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Glúteos)", exercises: [{ name: "Elevação Pélvica", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Variação Mesa Flexora", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Isolador)", exercises: [{ name: "Cadeira Abdutora", sets: 4, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Costas)", exercises: [{ name: "Puxada Alta Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Peito)", exercises: [{ name: "Supino Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Ombros)", exercises: [{ name: "Desenvolvimento Máquina", sets: 4, target: "12-15 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Leg Press Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Quadríceps)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Panturrilha)", exercises: [{ name: "Panturrilha Sentado", sets: 4, target: "15-20 rep" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Glúteos)", exercises: [{ name: "Elevação Pélvica", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Stiff (Terra Romeno)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isolador)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "10-12 rep/lado" }] }
            ],
            'B': [
                { title: "Bloco 1 (Costas)", exercises: [{ name: "Puxada Frente Supinada", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Ombros)", exercises: [{ name: "Desenvolvimento Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Tríceps)", exercises: [{ name: "Tríceps Corda", sets: 4, target: "10-12 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Quadríceps)", exercises: [{ name: "Leg Press 45°", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Panturrilha)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Glúteos)", exercises: [{ name: "Elevação Pélvica", sets: 5, target: "8-10 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Stiff (Terra Romeno)", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Isolador)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "8-10 rep/lado" }] }
            ],
            'B': [
                { title: "Bloco 1 (Costas)", exercises: [{ name: "Barra Fixa Supinada (Chin-up)", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 2 (Ombros)", exercises: [{ name: "Desenvolvimento Militar", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Peito)", exercises: [{ name: "Supino Reto Halteres", sets: 4, target: "10-12 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Agachamento Livre", sets: 5, target: "8-10 rep" }] },
                { title: "Bloco 2 (Quadríceps)", exercises: [{ name: "Leg Press 45°", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Core)", exercises: [{ name: "V-Up (Abdominal em V)", sets: 4, target: "15-20 rep" }] }
            ]
        }
    }
};

// 2.6 BANCO DE DADOS PARALELO (Tático - Condicionamento Esportivo e Society)
const dbWorkoutsTatico = {
    biset: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Mobilidade e Prevenção)", exercises: [{ name: "Maior Alongamento do Mundo", sets: 2, target: "10 rep/lado" }, { name: "Cócoras Profundas", sets: 2, target: "30 seg" }] },
                { title: "Bloco 2 (Força Base Pernas)", exercises: [{ name: "Agachamento Livre", sets: 4, target: "12-15 rep" }, { name: "Afundo / Avanço", sets: 4, target: "10 rep/lado" }] },
                { title: "Bloco 3 (Core Anti-Rotação)", exercises: [{ name: "Prancha Isométrica", sets: 3, target: "30 seg" }, { name: "Toque no Calcanhar", sets: 3, target: "20 rep" }] },
                { title: "Bloco 4 (Motor Cardio)", exercises: [{ name: "Polichinelos (Jumping Jacks)", sets: 3, target: "45 seg" }] }
            ],
            'B': [
                { title: "Bloco 1 (Mobilidade Superior)", exercises: [{ name: "Rotação Torácica", sets: 2, target: "10 rep/lado" }, { name: "Gato-Vaca (Cat-Cow)", sets: 2, target: "10 rep" }] },
                { title: "Bloco 2 (Tração e Empurre)", exercises: [{ name: "Puxada Alta Máquina", sets: 4, target: "12-15 rep" }, { name: "Flexão de Braço (Joelhos)", sets: 4, target: "Máx" }] },
                { title: "Bloco 3 (Core de Combate)", exercises: [{ name: "Abdominal Supra Solo", sets: 3, target: "20 rep" }, { name: "Escalador (Mountain Climber)", sets: 3, target: "30 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Força Unilateral)", exercises: [{ name: "Agachamento Búlgaro", sets: 3, target: "10 rep/lado" }, { name: "Elevação Pélvica", sets: 3, target: "15 rep" }] },
                { title: "Bloco 2 (Estabilidade Articular)", exercises: [{ name: "Cadeira Adutora", sets: 3, target: "15-20 rep" }, { name: "Cadeira Abdutora", sets: 3, target: "15-20 rep" }] },
                { title: "Bloco 3 (Tiros de Aceleração)", exercises: [{ name: "Burpees", sets: 3, target: "10 rep" }, { name: "Corrida Estacionária", sets: 3, target: "45 seg" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Mobilidade)", exercises: [{ name: "Maior Alongamento do Mundo", sets: 2, target: "10 rep/lado" }, { name: "Mobilidade 90/90", sets: 2, target: "10 rep/lado" }] },
                { title: "Bloco 2 (Potência e Pliometria)", exercises: [{ name: "Agachamento com Salto", sets: 4, target: "12-15 rep" }, { name: "Afundo / Avanço", sets: 4, target: "12 rep/lado" }] },
                { title: "Bloco 3 (Core Dinâmico)", exercises: [{ name: "Russian Twist", sets: 3, target: "20 rep" }, { name: "Prancha Lateral", sets: 3, target: "30 seg/lado" }] },
                { title: "Bloco 4 (Resistência Anaeróbica)", exercises: [{ name: "Saltos Laterais (Skater Jumps)", sets: 4, target: "40 seg" }] }
            ],
            'B': [
                { title: "Bloco 1 (Postura e Blindagem)", exercises: [{ name: "Remada Curvada Livre", sets: 4, target: "10-12 rep" }, { name: "Supino Reto Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Ombros de Contato)", exercises: [{ name: "Desenvolvimento Militar", sets: 4, target: "10-12 rep" }, { name: "Elevação Lateral Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Resistência de Core)", exercises: [{ name: "Abdominal Bicicleta", sets: 3, target: "30 rep" }, { name: "Sprawl (Meio Burpee)", sets: 3, target: "45 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Cadeia Posterior Especial)", exercises: [{ name: "Stiff (Terra Romeno)", sets: 4, target: "10-12 rep" }, { name: "Agachamento Búlgaro", sets: 4, target: "10-12 rep/lado" }] },
                { title: "Bloco 2 (Frenagem e Tornozelo)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "20 rep" }, { name: "Dorsiflexão de Tornozelo", sets: 4, target: "15 rep" }] },
                { title: "Bloco 3 (Cardio de Alta Intensidade)", exercises: [{ name: "Burpees", sets: 4, target: "15 rep" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "45 seg" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Força Explosiva Pura)", exercises: [{ name: "Agachamento Livre", sets: 4, target: "6-8 rep" }, { name: "Agachamento com Salto", sets: 4, target: "15 rep" }] },
                { title: "Bloco 2 (Absorção de Impacto)", exercises: [{ name: "Pistol Squat", sets: 4, target: "Máx/lado" }, { name: "Afundo / Avanço", sets: 4, target: "15 rep/lado" }] },
                { title: "Bloco 3 (Core Rígido)", exercises: [{ name: "Roda Abdominal", sets: 4, target: "15 rep" }, { name: "Hollow Body Hold", sets: 4, target: "1 min" }] }
            ],
            'B': [
                { title: "Bloco 1 (Força de Tração)", exercises: [{ name: "Barra Fixa Supinada (Chin-up)", sets: 4, target: "Até Falha" }, { name: "Remada Cavalinho Livre", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Empurre Explosivo)", exercises: [{ name: "Supino Reto Barra", sets: 4, target: "8-10 rep" }, { name: "Flexão Inclinada no Banco", sets: 4, target: "Falha (Explosiva)" }] },
                { title: "Bloco 3 (Tiros Curtos)", exercises: [{ name: "Burpees", sets: 4, target: "20 rep" }, { name: "Sprawl (Meio Burpee)", sets: 4, target: "1 min" }] }
            ],
            'C': [
                { title: "Bloco 1 (Arrancada Posterior)", exercises: [{ name: "Stiff (Terra Romeno)", sets: 5, target: "8-10 rep" }, { name: "Elevação Pélvica", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Blindagem de Tornozelo)", exercises: [{ name: "Panturrilha no Degrau", sets: 4, target: "Falha" }, { name: "Dorsiflexão de Tornozelo", sets: 4, target: "20 rep" }] },
                { title: "Bloco 3 (Condicionamento Tático)", exercises: [{ name: "Saltos Laterais (Skater Jumps)", sets: 4, target: "1 min" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1 min" }] }
            ]
        }
    },
    tradicional: {
        iniciante: {
            'A': [{ title: "Treino Society", exercises: [{ name: "Agachamento com Salto", sets: 4, target: "15 rep" }, { name: "Afundo / Avanço", sets: 4, target: "12 rep" }, { name: "Prancha Isométrica", sets: 4, target: "45 seg" }, { name: "Polichinelos (Jumping Jacks)", sets: 4, target: "1 min" }] }],
            'B': [{ title: "Treino Society", exercises: [{ name: "Flexão de Braço (Joelhos)", sets: 4, target: "Falha" }, { name: "Puxada Alta Máquina", sets: 4, target: "12-15 rep" }, { name: "Abdominal Supra Solo", sets: 4, target: "20 rep" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "45 seg" }] }],
            'C': [{ title: "Treino Society", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "10 rep" }, { name: "Stiff (Terra Romeno)", sets: 4, target: "15 rep" }, { name: "Cadeira Adutora", sets: 4, target: "20 rep" }, { name: "Burpees", sets: 4, target: "10 rep" }] }]
        },
        intermediario: {
            'A': [{ title: "Treino Society", exercises: [{ name: "Agachamento com Salto", sets: 4, target: "20 rep" }, { name: "Afundo / Avanço", sets: 4, target: "15 rep/lado" }, { name: "Russian Twist", sets: 4, target: "20 rep" }, { name: "Saltos Laterais (Skater Jumps)", sets: 4, target: "45 seg" }] }],
            'B': [{ title: "Treino Society", exercises: [{ name: "Supino Reto Halteres", sets: 4, target: "10-12 rep" }, { name: "Remada Curvada Livre", sets: 4, target: "10-12 rep" }, { name: "Abdominal Bicicleta", sets: 4, target: "30 rep" }, { name: "Sprawl (Meio Burpee)", sets: 4, target: "1 min" }] }],
            'C': [{ title: "Treino Society", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "12 rep/lado" }, { name: "Stiff (Terra Romeno)", sets: 4, target: "10-12 rep" }, { name: "Panturrilha no Leg Press", sets: 4, target: "20 rep" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1 min" }] }]
        },
        avancado: {
            'A': [{ title: "Treino Society", exercises: [{ name: "Agachamento Livre", sets: 5, target: "6-8 rep" }, { name: "Pistol Squat", sets: 4, target: "Máx/lado" }, { name: "Roda Abdominal", sets: 4, target: "15 rep" }, { name: "Burpees", sets: 4, target: "20 rep" }] }],
            'B': [{ title: "Treino Society", exercises: [{ name: "Supino Reto Barra", sets: 5, target: "6-8 rep" }, { name: "Barra Fixa Supinada (Chin-up)", sets: 4, target: "Falha" }, { name: "Hollow Body Hold", sets: 4, target: "1 min" }, { name: "Saltos Laterais (Skater Jumps)", sets: 4, target: "1 min" }] }],
            'C': [{ title: "Treino Society", exercises: [{ name: "Stiff (Terra Romeno)", sets: 5, target: "8-10 rep" }, { name: "Agachamento com Salto", sets: 4, target: "20 rep" }, { name: "Panturrilha no Degrau", sets: 4, target: "Falha" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1.5 min" }] }]
        }
    }
};

// 3. BASE DE FIGURINHAS
const stickersDB = [
    // Página 1: Seleção Base (Comuns)
    { id: 1, name: "Halter de Ferro", rarity: "comum", icon: "🏋️", page: 1 },
    { id: 2, name: "Anilha 20kg", rarity: "comum", icon: "💿", page: 1 },
    { id: 3, name: "Kettlebell", rarity: "comum", icon: "💣", page: 1 },
    { id: 4, name: "Barra Olímpica", rarity: "comum", icon: "📏", page: 1 },
    { id: 5, name: "Banco Reto", rarity: "comum", icon: "💺", page: 1 },
    { id: 6, name: "Corda de Pular", rarity: "comum", icon: "➰", page: 1 },
    
    // Página 2: Campo de Batalha (Prata/Comum)
    { id: 7, name: "Leg Press 45", rarity: "prata", icon: "🦵", page: 2 },
    { id: 8, name: "Crossover", rarity: "prata", icon: "✖️", page: 2 },
    { id: 9, name: "Hack Machine", rarity: "comum", icon: "🏗️", page: 2 },
    { id: 10, name: "Mesa Flexora", rarity: "comum", icon: "🛏️", page: 2 },
    { id: 11, name: "Extensora", rarity: "comum", icon: "🪑", page: 2 },
    { id: 12, name: "Smith Machine", rarity: "prata", icon: "⛓️", page: 2 },
    
    // Página 3: Titãs do Movimento (Ouro/Prata)
    { id: 13, name: "Supino Reto", rarity: "ouro", icon: "🔥", page: 3 },
    { id: 14, name: "Agachamento", rarity: "ouro", icon: "🍑", page: 3 },
    { id: 15, name: "Terra (Deadlift)", rarity: "ouro", icon: "💀", page: 3 },
    { id: 16, name: "Barra Fixa", rarity: "prata", icon: "🦍", page: 3 },
    { id: 17, name: "Desenvolvimento", rarity: "prata", icon: "🛡️", page: 3 },
    { id: 18, name: "Remada Curvada", rarity: "prata", icon: "🚣", page: 3 },
    
    // Página 4: Escudos de Elite (Holográficos)
    { id: 19, name: "Mestre da Disciplina", rarity: "holografico", icon: "👑", page: 4 },
    { id: 20, name: "Força Bruta", rarity: "holografico", icon: "🦾", page: 4 },
    { id: 21, name: "Resistência Base", rarity: "holografico", icon: "🔋", page: 4 },
    { id: 22, name: "Simetria Perfeita", rarity: "holografico", icon: "📐", page: 4 },
    { id: 23, name: "Foco Inabalável", rarity: "holografico", icon: "👁️", page: 4 },
    { id: 24, name: "O Titã", rarity: "holografico", icon: "🏆", page: 4 }
];