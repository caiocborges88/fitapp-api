'use strict';

// 1. BANCO DE DADOS COMPLETO (Volume Alto - 5 Blocos com Máxima Variedade)
const dbWorkouts = {
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
};

// 2. DICIONÁRIO DE EXERCÍCIOS PARA A BIBLIOTECA E DEEP LINKING (80 Movimentos)
const dictionaryData = [
    // --- CORE E ESTABILIDADE ---
    { name: "Abdominal Bicicleta", focus: "Core Completo", desc: "Deitado de costas. Pedale as pernas no ar enquanto gira o tronco, tentando tocar o cotovelo direito no joelho esquerdo, e vice-versa." },
    { name: "Abdominal Canivete", focus: "Core Avançado", desc: "Deitado esticado. Eleve simultaneamente o tronco e as pernas estendidas, tentando tocar as mãos nas pontas dos pés." },
    { name: "Abdominal Declinado", focus: "Core Avançado", desc: "Utilizando o banco declinado e com os pés travados, execute a flexão do tronco por completo. Ângulo exige força colossal." },
    { name: "Abdominal Infra", focus: "Core Inferior", desc: "Deitado de costas, pernas estendidas. Eleve as pernas e o quadril do chão simultaneamente em direção ao teto." },
    { name: "Abdominal Máquina", focus: "Core Base", desc: "Sentado no aparelho, utilize a sobrecarga para flexionar o tronco à frente." },
    { name: "Abdominal Oblíquo", focus: "Core Lateral", desc: "Deitado, cruze uma perna sobre a outra. Leve o cotovelo em direção ao joelho oposto, focando na lateral do abdômen." },
    { name: "Abdominal Supra", focus: "Core Superior", desc: "Movimento do supra solo, mas segurando uma anilha no peito ou atrás da cabeça para aumentar a resistência." },
    { name: "Abdominal Supra com Carga", focus: "Core", desc: "Movimento tradicional curto, mas segurando um halter, kettlebell ou anilha sobre o peito para gerar sobrecarga progressiva." },
    { name: "Abdominal Supra Solo", focus: "Core Superior", desc: "Deitado, joelhos dobrados, pés no chão. Tire apenas os ombros e a parte superior das costas do chão." },
    { name: "Elevação Pernas Pendurado", focus: "Core Inferior Avançado", desc: "Pendurado na barra fixa, eleve as pernas retas até formarem um ângulo de 90 graus sem balançar o corpo." },
    { name: "Escalador (Mountain Climber)", focus: "Core/Cardio", desc: "Posição de prancha alta. Puxe os joelhos em direção ao peito alternadamente e em velocidade, mantendo o quadril baixo." },
    { name: "Hollow Body Hold", focus: "Core Avançado", desc: "Deitado de costas. Eleve pernas esticadas e ombros do chão, lombar colada no solo. Braços para trás." },
    { name: "Prancha Isométrica", focus: "Core Estabilização", desc: "Apoiado nos antebraços e pontas dos pés. Mantenha o corpo formando uma linha reta rígida." },
    { name: "Prancha Lateral", focus: "Oblíquos", desc: "Apoiado no antebraço e na lateral do pé. Eleve o quadril do chão, formando uma linha diagonal. Sustente a posição." },
    { name: "Roda Abdominal", focus: "Core Avançado", desc: "Ajoelhado, segure a roda. Deslize para frente controlando a descida e puxe de volta usando a força do abdômen." },
    { name: "Russian Twist", focus: "Oblíquos/Core", desc: "Sentado com o tronco inclinado levemente para trás, tire os pés do chão. Gire o tronco de um lado para o outro." },
    { name: "Superman (Solo)", focus: "Lombar/Glúteos", desc: "Deitado de bruços no chão. Eleve os braços, o peito e as pernas do chão simultaneamente, ativando intensamente a lombar." },
    { name: "Toque no Calcanhar", focus: "Oblíquos", desc: "Deitado de costas, pés no chão. Tire levemente os ombros do chão e faça flexões laterais para tentar tocar a mão no calcanhar." },
    { name: "V-Up (Abdominal em V)", focus: "Core Avançado", desc: "Deitado esticado no chão. Suba o tronco e as pernas esticadas simultaneamente, formando um 'V' com o corpo." },
    
    // --- PERNAS E OMBROS ---
    { name: "Agachamento Búlgaro", focus: "Pernas e Glúteos", desc: "Em pé, de costas para um banco. Apoie o peito do pé no banco e agache com a perna da frente até o joelho de trás quase tocar o chão." },
    { name: "Agachamento Livre", focus: "Pernas Completo", desc: "Barra nos trapézios. Agache jogando o quadril para trás e para baixo, passando da linha de 90 graus." },
    { name: "Agachamento no Smith", focus: "Pernas Guiado", desc: "Pés levemente à frente da barra. Agache empurrando o quadril para baixo guiado pelo trilho." },
    { name: "Cadeira Abdutora", focus: "Glúteos/Lateral da coxa", desc: "Sentado, apoie os joelhos nas almofadas laterais. Faça força para abrir as pernas." },
    { name: "Cadeira Adutora", focus: "Adutores", desc: "Almofadas por dentro dos joelhos. Faça força para fechar as pernas, trabalhando a parte interna das coxas." },
    { name: "Cadeira Extensora", focus: "Quadríceps", desc: "Sentado, ajuste o rolo. Estenda as pernas até contrair totalmente os quadríceps e retorne segurando a descida." },
    { name: "Crucifixo Invertido Livre", focus: "Deltóide Posterior", desc: "Tronco inclinado para frente. Eleve os halteres lateralmente focando em contrair a parte de trás dos ombros." },
    { name: "Desenvolvimento Halteres", focus: "Ombros Base", desc: "Sentado em banco de encosto reto. Segure os halteres na altura das orelhas e empurre para cima." },
    { name: "Desenvolvimento Militar", focus: "Ombros Força", desc: "Em pé, com barra livre. Tire a barra da altura dos ombros e empurre para cima sobre a cabeça." },
    { name: "Desenvolvimento Máquina", focus: "Ombros Seguro", desc: "Sentado, empurre as alavancas para cima acima da cabeça mantendo a coluna apoiada." },
    { name: "Elevação Frontal Anilha", focus: "Ombro Anterior", desc: "Em pé, segure uma anilha pelas laterais. Eleve a anilha à frente do corpo até a linha dos olhos." },
    { name: "Elevação Lateral Halteres", focus: "Deltóide Lateral", desc: "Em pé, joelhos destravados. Eleve os braços lateralmente até a altura dos ombros." },
    { name: "Elevação Pélvica", focus: "Glúteos", desc: "Deitado com costas apoiadas no banco e barra no quadril. Empurre o quadril em direção ao teto contraindo os glúteos." },
    { name: "Encolhimento Halteres", focus: "Trapézio", desc: "Em pé com halteres. Sem dobrar os braços, eleve os ombros em direção às orelhas (como se dissesse 'não sei')." },
    { name: "Leg Press 45°", focus: "Pernas Completo", desc: "No aparelho inclinado, desça a plataforma em direção ao peito sem que a lombar descole do encosto. Empurre concentrando nos calcanhares." },
    { name: "Leg Press Máquina", focus: "Pernas Seguro", desc: "Sentado na máquina horizontal. Empurre até quase estender os joelhos e retorne." },
    { name: "Panturrilha no Leg Press", focus: "Panturrilha", desc: "Posicione a ponta dos pés na plataforma. Pressione empurrando pelos dedos do pé e deixe descer alongando bem." },
    { name: "Panturrilha Sentado", focus: "Panturrilha (Sóleo)", desc: "No aparelho específico, apoie os rolos sobre os joelhos. Faça a elevação dos calcanhares." },
    { name: "Remada Alta no Cabo", focus: "Ombro/Trapézio", desc: "Polia baixa com barra reta. Puxe a barra em direção ao queixo, conduzindo o movimento com os cotovelos." },
    { name: "Stiff (Terra Romeno)", focus: "Posterior e Glúteo", desc: "Joelhos destravados. Empurre o quadril para trás descendo o peso rente às pernas, mantendo a coluna reta." },
    { name: "Variação Mesa Flexora", focus: "Posterior Coxa", desc: "Deitado de bruços, flexione os joelhos trazendo o peso em direção aos glúteos." },
    
    // --- COSTAS E BÍCEPS ---
    { name: "Barra Fixa", focus: "Costas Largura", desc: "Pendurado na barra, puxe o corpo para cima até o queixo passar da barra. Pegada pronada." },
    { name: "Barra Fixa Supinada (Chin-up)", focus: "Costas e Bíceps", desc: "Pegada na largura dos ombros, palmas viradas para você. Puxe o corpo até o queixo passar da barra." },
    { name: "Extensão Lombar Máquina", focus: "Lombar", desc: "Sentado no aparelho. Empurre o tronco para trás estendendo a coluna. Movimento curto e controlado." },
    { name: "Pulldown no Cabo", focus: "Dorsal", desc: "Em pé, de frente para a polia alta. Braços esticados, empurre o peso para baixo em direção à coxa." },
    { name: "Puxada Alta (Livre)", focus: "Costas Largura", desc: "Segure a barra longa, sente-se. Incline o tronco para trás e puxe a barra em direção ao peito." },
    { name: "Puxada Alta Máquina", focus: "Costas Seguro", desc: "Sentado no aparelho articulado, puxe as alavancas em direção ao peito apontando os cotovelos para o chão." },
    { name: "Puxada Frente Supinada", focus: "Costas e Bíceps", desc: "No pulley, pegada supinada. Puxe a barra em direção ao peito. Excelente para acionar mais os bíceps." },
    { name: "Remada Baixa Triângulo", focus: "Costas Miolo", desc: "Sentado na polia baixa, joelhos levemente flexionados. Puxe o triângulo em direção ao umbigo." },
    { name: "Remada Cavalinho Livre", focus: "Costas Densidade", desc: "Barra encaixada na parede ou suporte. Incline o tronco e puxe o puxador triângulo em direção ao umbigo." },
    { name: "Remada Curvada Livre", focus: "Costas Densidade", desc: "Tronco inclinado, puxe a barra em direção ao umbigo mantendo a coluna neutra." },
    { name: "Remada Máquina", focus: "Costas Base", desc: "Sentado, apoie o peito. Puxe as alavancas para trás espremendo o meio das costas." },
    { name: "Remada Unilateral (Serrote)", focus: "Costas", desc: "Apoie um joelho e mão no banco. Puxe o halter em direção ao quadril, mantendo o cotovelo rente ao corpo." },
    { name: "Rosca 21 (Barra)", focus: "Bíceps", desc: "7 reps da metade inferior ao meio, 7 da metade superior ao fim, e 7 completas." },
    { name: "Rosca Alternada Inclinada", focus: "Bíceps Alongado", desc: "Banco inclinado (45°), braços pendurados. Faça a rosca alternando os lados." },
    { name: "Rosca Aranha (Spider Curl)", focus: "Bíceps Pico", desc: "Deite de bruços no banco a 45°, braços pendurados. Faça a flexão impedindo totalmente o roubo." },
    { name: "Rosca Concentrada", focus: "Bíceps Pico", desc: "Sentado, apoie o tríceps na parte interna da coxa e faça a flexão de braço focando na contração." },
    { name: "Rosca Direta (Barra W)", focus: "Bíceps Base", desc: "Em pé. Mantenha os cotovelos fixos ao lado do corpo e flexione os braços sem usar a lombar." },
    { name: "Rosca Inversa no Cabo", focus: "Antebraço", desc: "Na polia baixa com barra reta. Pegada pronada. Movimento fantástico para desenvolver o antebraço." },
    { name: "Rosca Martelo Halteres", focus: "Bíceps e Antebraço", desc: "Em pé, segure os halteres com pegada neutra. Suba o peso mantendo essa posição." },
    { name: "Rosca Máquina", focus: "Bíceps Seguro", desc: "Sentado, apoie bem os tríceps. Flexione os braços puxando o peso em direção aos ombros." },
    { name: "Rosca Scott", focus: "Bíceps Isolado", desc: "Com barra W, apoie os braços no banco inclinado. Desça o peso e suba contraindo forte." },
    { name: "Rosca Scott (Máquina)", focus: "Bíceps Isolado", desc: "Sente-se e apoie bem as axilas. Execute a flexão usando o sistema articulado da máquina." },
    
    // --- PEITO E TRÍCEPS ---
    { name: "Crossover Polia Baixa", focus: "Peitoral Superior", desc: "Polias no chão. Em pé, eleve os cabos para cima e para frente, unindo as mãos na altura do rosto." },
    { name: "Crossover Polia Média", focus: "Peitoral", desc: "Polias na altura dos ombros. Puxe os cabos em arco, mãos se encontrando na frente do peitoral." },
    { name: "Crucifixo Reto Halteres", focus: "Peitoral", desc: "Deitado no banco reto. Abra os braços lateralmente em arco e feche esmagando o peito no topo." },
    { name: "Flexão de Braço (Joelhos)", focus: "Peito e Tríceps", desc: "Posição de prancha, joelhos apoiados. Desça flexionando cotovelos a 45 graus e empurre o chão." },
    { name: "Flexão Diamante", focus: "Tríceps", desc: "Posição de flexão, mãos formam um triângulo na linha do centro do peito. Foco extremo nos tríceps." },
    { name: "Mergulho Paralelas", focus: "Tríceps Força", desc: "Apoie-se nas barras. Incline o tronco à frente e desça até os cotovelos formarem 90 graus." },
    { name: "Peck Deck na Polia", focus: "Peitoral Isolado", desc: "Em pé entre duas polias. Puxe os cabos à frente do corpo com os cotovelos destravados." },
    { name: "Pullover com Halter", focus: "Peito e Dorsal", desc: "Deitado no banco reto. Desça o halter para trás da cabeça, alongando a caixa torácica, e puxe de volta." },
    { name: "Supino Declinado Barra", focus: "Peitoral Inferior", desc: "Em banco declinado. Desça controladamente na linha inferior do peitoral e empurre explosivamente." },
    { name: "Supino Inclinado Halteres", focus: "Peitoral Superior", desc: "Banco inclinado (30-45°). Empurre o peso na linha da clavícula." },
    { name: "Supino Máquina", focus: "Peitoral Seguro", desc: "Empurre as alavancas da máquina para frente. Foca na contração sem risco." },
    { name: "Supino Reto Barra", focus: "Peitoral Força", desc: "Deitado no banco reto, desça a barra até o meio do peito e empurre com explosão." },
    { name: "Supino Reto Halteres", focus: "Peitoral Base", desc: "Deitado no banco, desça os halteres na lateral do peito formando ângulo de 45 a 60 graus e empurre." },
    { name: "Tríceps Corda", focus: "Tríceps Porção Lateral", desc: "No final do movimento de pulley, puxe as pontas da corda para fora para ativar a cabeça lateral." },
    { name: "Tríceps Francês Halter", focus: "Tríceps Porção Longa", desc: "Sentado, segure um halter atrás da cabeça e estenda os braços apontando os cotovelos para o teto." },
    { name: "Tríceps Kickback Cabo (Coice)", focus: "Tríceps", desc: "Incline o tronco. Cole o cotovelo na costela e estenda o braço totalmente para trás puxando o cabo." },
    { name: "Tríceps Máquina", focus: "Tríceps", desc: "Sentado no aparelho. Empurre o peso para baixo usando apenas a extensão dos cotovelos." },
    { name: "Tríceps Pulley", focus: "Tríceps Base", desc: "Incline o tronco levemente. Cole cotovelos na costela. Empurre a barra para baixo até estender o braço." },
    { name: "Tríceps Testa", focus: "Tríceps Isolado", desc: "Deitado, desça a barra em direção à testa e estenda os braços para cima." },
    { name: "Voador (Peck Deck)", focus: "Peitoral Isolado", desc: "Feche os braços na frente do peito focando em 'esmagar' o peitoral. Retorne devagar." }
];

// 3. BASE DE FIGURINHAS
const stickersDB = [
    { id: 1, name: "Garrafinha Mágica", icon: "💧", rarity: "comum" }, { id: 2, name: "Fone Descarregado", icon: "🔋", rarity: "comum" }, { id: 3, name: "Canela Roxa", icon: "🩹", rarity: "comum" },
    { id: 4, name: "Halter de 20kg", icon: "🏋️", rarity: "prata" }, { id: 5, name: "Scoop Transbordando", icon: "🥄", rarity: "prata" }, { id: 6, name: "Frango com Batata", icon: "🍗", rarity: "prata" },
    { id: 7, name: "Mestre do Supino", icon: "👑", rarity: "brilhante" }, { id: 8, name: "Monstro do Leg", icon: "🦍", rarity: "brilhante" }, { id: 9, name: "Taça Constância", icon: "🏆", rarity: "brilhante" }
];

const FitApp = (() => {
    let totalSets = 0, checkedSets = 0, audioEnabled = false, restTimer = null, currentRestTime = 60;
    let todayLog = [];
    let currentRoutine = []; 
    let currentWorkoutType = ''; // Armazena o treino em andamento
    const els = {};

    const safeSet = (k, v) => { try { localStorage.setItem(k, v); return true; } catch(e) { return false; } };
    const safeGet = (k) => { try { return localStorage.getItem(k); } catch(e) { return null; } };

    function showToast(msg) { els.toast.textContent = msg; els.toast.classList.add('show'); setTimeout(() => els.toast.classList.remove('show'), 3000); }
    function speak(text) { if (!audioEnabled || !('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'pt-BR'; utterance.rate = 1.1; window.speechSynthesis.speak(utterance); }
    function toggleAudio() { audioEnabled = !audioEnabled; const btn = document.getElementById('btnAudio'); if (audioEnabled) { btn.classList.add('active'); btn.innerHTML = '🔊 <span>Áudio On</span>'; speak("Assistente ativado."); } else { btn.classList.remove('active'); btn.innerHTML = '🔈 <span>Áudio Off</span>'; window.speechSynthesis.cancel(); } }

    function startRestTimer() {
        const containerEl = document.getElementById('timerContainer'), displayEl = document.getElementById('timerDisplay');
        containerEl.style.display = 'block'; clearInterval(restTimer); let timeLeft = currentRestTime;
        speak(`Descanso. ${timeLeft} segundos.`);
        
        const updateUI = () => { let m = Math.floor(timeLeft/60).toString().padStart(2,'0'), s = (timeLeft%60).toString().padStart(2,'0'); displayEl.textContent = `${m}:${s}`; };
        updateUI();

        restTimer = setInterval(() => {
            timeLeft--; updateUI();
            if (timeLeft === 10) speak("Dez segundos.");
            if (timeLeft <= 0) { clearInterval(restTimer); containerEl.style.display = 'none'; speak("Fim do descanso."); }
        }, 1000);
    }
    function stopRestTimer() { clearInterval(restTimer); document.getElementById('timerContainer').style.display = 'none'; }

    // --- SISTEMA DE BUSCA DE GRUPOS MUSCULARES ---
    function getMuscleGroup(focus) {
        const f = (focus || "").toLowerCase();
        if (f.includes("peit")) return "peito";
        if (f.includes("tríceps") || f.includes("triceps")) return "triceps";
        if (f.includes("cost") || f.includes("dorsal") || f.includes("lombar")) return "costas";
        if (f.includes("bíc") || f.includes("bic") || f.includes("antebraço")) return "biceps";
        if (f.includes("ombro") || f.includes("delt") || f.includes("trapézio")) return "ombros";
        if (f.includes("pern") || f.includes("quadr") || f.includes("post") || f.includes("glút") || f.includes("adut") || f.includes("abdut") || f.includes("pant")) return "pernas";
        if (f.includes("core") || f.includes("oblíq") || f.includes("abd")) return "core";
        return "outros";
    }

// --- MENU DE SUBSTITUIÇÃO (SUGESTÕES) E RESTAURAÇÃO ---
    function openSwapModal(bIndex, eIndex) {
        const ex = currentRoutine[bIndex].exercises[eIndex];
        const currentName = ex.name;
        const currentDict = dictionaryData.find(d => d.name === currentName);
        const currentGroup = getMuscleGroup(currentDict ? currentDict.focus : "");
        const pool = dictionaryData.filter(d => getMuscleGroup(d.focus) === currentGroup && d.name !== currentName);

        // Identifica o exercício original planejado na base de dados mestre
        const level = els.levelSelector ? els.levelSelector.value : 'intermediario';
        const type = currentWorkoutType;
        const originalName = dbWorkouts[level][type][bIndex].exercises[eIndex].name;

        let modal = document.getElementById('swapModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'swapModal';
            modal.className = 'swap-modal-overlay';
            document.body.appendChild(modal);
        }

        let html = `
            <div class="swap-modal-content">
                <div class="swap-modal-header">
                    <h3>Trocar: ${currentName}</h3>
                    <button class="btn-close-modal" onclick="document.getElementById('swapModal').style.display='none'">&times;</button>
                </div>
                <div class="swap-list">
        `;

        // Botão de Restauração (só aparece se o exercício atual for diferente do original)
        if (currentName !== originalName) {
            html += `
                <div class="swap-item" style="border-left: 4px solid #ffaa00; background: rgba(255, 170, 0, 0.1);" onclick="FitApp.confirmSwap(${bIndex}, ${eIndex}, '${originalName}')">
                    <div class="swap-item-name">↩️ Restaurar Original</div>
                    <div class="swap-item-focus">${originalName}</div>
                </div>
            `;
        }

        html += `<p style="color: #bbb; font-size: 13px; margin: 15px 0 10px 0;">Sugestões compatíveis com este músculo:</p>`;

        if (pool.length === 0) {
            html += `<div style="color: #ff4444; text-align: center; padding: 20px;">Nenhuma variação cadastrada para este músculo.</div>`;
        } else {
            pool.forEach(item => {
                html += `
                    <div class="swap-item" onclick="FitApp.confirmSwap(${bIndex}, ${eIndex}, '${item.name}')">
                        <div class="swap-item-name">${item.name}</div>
                        <div class="swap-item-focus">${item.focus}</div>
                    </div>
                `;
            });
        }
        
        // Botão explícito de Cancelamento
        html += `
                </
                <button onclick="document.getElementById('swapModal').style.display='none'" style="width: 100%; padding: 12px; margin-top: 15px; background: #333; color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Cancelar</button>
            </div>
        `;
        
        modal.innerHTML = html;
        modal.style.display = 'flex';
    }

    function confirmSwap(bIndex, eIndex, newName) {
        currentRoutine[bIndex].exercises[eIndex].name = newName;
        document.getElementById('swapModal').style.display = 'none';
        renderCurrentRoutine(); 
        if(audioEnabled) speak("Exercício atualizado.");
    }

    // --- NOVO: MOTOR DO DASHBOARD SEQUENCIAL ---
    function checkSequence() {
        let history = JSON.parse(safeGet('fitapp_week_log') || '[]');
        let total = history.length;
        let lastType = total > 0 ? history[total - 1].tipo : null;

        const statTotal = document.getElementById('statTotal');
        const statLast = document.getElementById('statLast');
        if(statTotal) statTotal.textContent = total;
        if(statLast) statLast.textContent = lastType ? 'Treino ' + lastType : 'Nenhum';

        // Trava os cartões preventivamente
        ['A', 'B', 'C'].forEach(t => {
            const card = document.getElementById('card-' + t);
            if(card) card.classList.add('locked');
        });

        // Libera o próximo treino correto
        let nextType = 'A'; 
        if (lastType === 'A') nextType = 'B';
        if (lastType === 'B') nextType = 'C';
        if (lastType === 'C') nextType = 'A';

        const nextCard = document.getElementById('card-' + nextType);
        if (nextCard) nextCard.classList.remove('locked');
    }

    function unlockAll() {
        ['A', 'B', 'C'].forEach(t => {
            const card = document.getElementById('card-' + t);
            if(card) card.classList.remove('locked');
        });
        showToast("Travas manuais liberadas.");
    }

    function startWorkout(type) {
        const card = document.getElementById('card-' + type);
        if (card && card.classList.contains('locked')) {
            showToast("Sequência bloqueada. Conclua o treino anterior.");
            return;
        }
        currentWorkoutType = type;
        loadWorkout();
    }

    function loadWorkout() {
        const level = els.levelSelector ? els.levelSelector.value : 'intermediario';
        const type = currentWorkoutType;
        if (!type) return;

        // Oculta o painel de comando e mostra o treino
        document.getElementById('workoutCards').style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'none';
        
        els.workoutArea.style.display = 'block'; 
        els.btnFinishArea.style.display = 'block';

        currentRoutine = JSON.parse(JSON.stringify(dbWorkouts[level][type] || dbWorkouts['intermediario']['A']));
        renderCurrentRoutine();
    }

    function renderCurrentRoutine() {
        els.exerciseList.innerHTML = ''; totalSets = 0; checkedSets = 0; todayLog = [];
        
        currentRoutine.forEach((bloco, bIndex) => {
            const card = document.createElement('div'); card.className = 'biset-card'; 
            card.innerHTML = `<div class="biset-title">${bloco.title}</div>`;
            
            bloco.exercises.forEach((ex, eIndex) => {
                const blockDiv = document.createElement('div'); blockDiv.className = 'exercise-block';
                const linkIcon = (bloco.exercises.length > 1 && eIndex < bloco.exercises.length - 1) ? ' 🔗' : '';
                
                blockDiv.innerHTML = `
                    <div class="exercise-header">
                        <span class="ex-name" onclick="FitApp.openDict('${ex.name}')">${ex.name}${linkIcon}</span>
                        <div class="ex-controls">
                            <span class="target-reps">${ex.target}</span>
                            <button class="btn-swap" onclick="FitApp.openSwapModal(${bIndex}, ${eIndex})" title="Substituir Exercício">🔄</button>
                        </div>
                    </div>`;
                
                for(let s = 1; s <= ex.sets; s++) {
                    totalSets++; const row = document.createElement('div'); row.className = 'set-row';
                    row.innerHTML = `<div class="set-label">S${s}</div><input type="number" class="kg-val" placeholder="Kg"><input type="number" class="rp-val" placeholder="Reps"><input type="checkbox" class="chk-set">`;
                    
                    const chk = row.querySelector('.chk-set');
                    chk.addEventListener('change', () => {
                        if (chk.checked) { 
                            checkedSets++; 
                            if(checkedSets < totalSets) startRestTimer();
                            todayLog.push({ exercise: ex.name, set: s, kg: row.querySelector('.kg-val').value || 0, reps: row.querySelector('.rp-val').value || 0 });
                        } else { checkedSets--; stopRestTimer(); }
                        updateProgress();
                    });
                    blockDiv.appendChild(row);
                }
                card.appendChild(blockDiv);
            });
            els.exerciseList.appendChild(card);
        });
        updateProgress();
    }

    function updateProgress() {
        const pct = totalSets === 0 ? 0 : Math.round((checkedSets / totalSets) * 100);
        els.progressBar.style.width = pct + '%';
        const btn = document.getElementById('btnFinishAction');
        if(pct === 100) { btn.className = 'btn-action btn-success'; btn.textContent = '🏆 Concluir Treino'; stopRestTimer(); speak("Treino finalizado."); } 
        else { btn.className = 'btn-action btn-warning'; btn.textContent = '⚠️ Encerrar Incompleto'; }
    }

    async function finishWorkout() {
        const isComplete = checkedSets === totalSets;
        const tipoTreino = currentWorkoutType; 
        const dataHoje = new Date().toISOString().split('T')[0];
        const payload = { date: dataHoje, tipo: tipoTreino, data: todayLog };

        try {
            document.getElementById('btnFinishAction').textContent = "⏳ Salvando...";
            const response = await fetch('/api/salvar-treino', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) console.error("Erro ao salvar no servidor Python.");
        } catch (error) { showToast("Modo offline: Servidor não encontrado."); }

        let weekLog = JSON.parse(safeGet('fitapp_week_log') || '[]');
        weekLog.push(payload);
        safeSet('fitapp_week_log', JSON.stringify(weekLog));

        // Restaura a interface
        els.workoutArea.style.display = 'none'; 
        els.btnFinishArea.style.display = 'none';
        document.getElementById('workoutCards').style.display = 'flex';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'block';

        currentWorkoutType = '';
        checkSequence(); // Atualiza o placar imediatamente

        if(isComplete) { showPackModal(); } else { showToast('Treino salvo no sistema.'); switchTab('tab-calendario', 'nav-calendario'); }
    }

    async function fetchAIFeedback() {
        document.getElementById('aiLoader').style.display = 'block';
        document.getElementById('aiResponse').style.display = 'none';
        document.getElementById('btnAnalyzeAI').disabled = true;

        try {
            const response = await fetch('/api/coach');
            if (!response.ok) throw new Error("Erro no servidor local");
            const data = await response.json();
            
            document.getElementById('aiResponse').innerHTML = `<strong>Feedback do Coach:</strong><br>${data.feedback}`;
            document.getElementById('aiResponse').style.display = 'block';
            if(audioEnabled) speak("Análise concluída.");
        } catch (error) { showToast("Erro ao contatar o servidor."); } 
        finally { document.getElementById('aiLoader').style.display = 'none'; document.getElementById('btnAnalyzeAI').disabled = false; }
    }

    function showPackModal() { document.getElementById('packEnvelope').style.display = 'flex'; document.getElementById('packRevealArea').style.display = 'none'; document.getElementById('btnClosePack').style.display = 'none'; document.getElementById('packModal').style.display = 'flex'; }
    
    function openPack() {
        document.getElementById('packEnvelope').style.display = 'none'; const revealArea = document.getElementById('packRevealArea'); revealArea.innerHTML = ''; revealArea.style.display = 'flex';
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        
        for(let i=0; i<2; i++) {
            const roll = Math.random(); let pool = stickersDB.filter(s => s.rarity === 'comum');
            if(roll > 0.90) pool = stickersDB.filter(s => s.rarity === 'brilhante'); else if(roll > 0.60) pool = stickersDB.filter(s => s.rarity === 'prata');
            const drawn = pool[Math.floor(Math.random() * pool.length)];
            if(!savedCollection.includes(drawn.id)) savedCollection.push(drawn.id);
            const div = document.createElement('div'); div.className = `sticker-slot filled ${drawn.rarity}`; div.innerHTML = `<div class="sticker-icon">${drawn.icon}</div><div>${drawn.name}</div>`; revealArea.appendChild(div);
        }
        safeSet('fitapp_album', JSON.stringify(savedCollection));
        document.getElementById('btnClosePack').style.display = 'block'; if(audioEnabled) speak("Figurinhas reveladas.");
    }

    function renderAlbum() {
        const grid = document.getElementById('albumGrid'); grid.innerHTML = '';
        let savedCollection = JSON.parse(safeGet('fitapp_album') || '[]');
        const progressEl = document.getElementById('albumProgress');
        if (progressEl) progressEl.textContent = `${savedCollection.length} / 9 Figurinhas`;

        if (grid) {
            stickersDB.forEach(sticker => {
                const div = document.createElement('div');
                if(savedCollection.includes(sticker.id)) { div.className = `sticker-slot filled ${sticker.rarity}`; div.innerHTML = `<div class="sticker-icon">${sticker.icon}</div><div>${sticker.name}</div>`; } 
                else { div.className = 'sticker-slot'; div.innerHTML = `<span>${sticker.id}</span>`; }
                grid.appendChild(div);
            });
        }
    }

    function renderLibrary() {
        const grid = document.getElementById('libraryGrid');
        if (!grid) return;
        grid.innerHTML = '';
        dictionaryData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'library-card';
            card.innerHTML = `<div class="lib-name">${item.name}</div><div class="lib-focus">${item.focus}</div><div class="lib-desc">${item.desc}</div>`;
            grid.appendChild(card);
        });
    }

    function filterLibrary() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const cards = document.querySelectorAll('.library-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    }

    function switchTab(tabId, navId) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        document.getElementById(tabId).classList.add('active'); document.getElementById(navId).classList.add('active');
        
        if (tabId === 'tab-calendario') renderAlbum();
        if (tabId === 'tab-biblioteca') renderLibrary(); 
        if (tabId === 'tab-treino') {
            if (!currentWorkoutType) {
                document.getElementById('workoutCards').style.display = 'flex';
                const header = document.querySelector('.dashboard-header');
                if (header) header.style.display = 'block';
                els.workoutArea.style.display = 'none';
                els.btnFinishArea.style.display = 'none';
                checkSequence();
            }
        }
    }

    function init() {
        els.levelSelector = document.getElementById('levelSelector'); 
        els.workoutArea = document.getElementById('workoutArea'); 
        els.exerciseList = document.getElementById('exerciseList');
        els.progressBar = document.getElementById('progressBar'); 
        els.btnFinishArea = document.getElementById('btnFinishArea');
        els.toast = document.getElementById('toast');

        ['treino', 'calendario', 'biblioteca'].forEach(tab => { 
            const navBtn = document.getElementById(`nav-${tab}`);
            if (navBtn) navBtn.addEventListener('click', () => switchTab(`tab-${tab}`, `nav-${tab}`)); 
        });
        
        if (els.levelSelector) els.levelSelector.addEventListener('change', () => {
            if(currentWorkoutType) loadWorkout(); // Recarrega se alterar a dificuldade no meio
        }); 
        
        const btnAudio = document.getElementById('btnAudio');
        if (btnAudio) btnAudio.addEventListener('click', toggleAudio);
        
        const btnFinishAction = document.getElementById('btnFinishAction');
        if (btnFinishAction) btnFinishAction.addEventListener('click', finishWorkout);
        
        const btnAnalyzeAI = document.getElementById('btnAnalyzeAI');
        if (btnAnalyzeAI) btnAnalyzeAI.addEventListener('click', fetchAIFeedback);
        
        document.querySelectorAll('.time-btn').forEach(btn => { 
            btn.addEventListener('click', (e) => { 
                document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active')); 
                e.target.classList.add('active'); 
                currentRestTime = parseInt(e.target.getAttribute('data-time')); 
            }); 
        });

        const packEnvelope = document.getElementById('packEnvelope');
        if (packEnvelope) packEnvelope.addEventListener('click', openPack);
        
        const btnClosePack = document.getElementById('btnClosePack');
        if (btnClosePack) btnClosePack.addEventListener('click', () => { 
            document.getElementById('packModal').style.display = 'none'; 
            switchTab('tab-calendario', 'nav-calendario'); 
        });
        
        checkSequence(); // Executa a leitura inicial do Dashboard
        renderAlbum();
    }
    
    return { 
        init, filterLibrary, openSwapModal, confirmSwap, unlockAll, startWorkout,
        openDict: (name) => { 
            switchTab('tab-biblioteca', 'nav-biblioteca'); 
            const searchInp = document.getElementById('searchInput');
            if (searchInp) {
                searchInp.value = name;
                filterLibrary(); 
            } 
        } 
    };
})();

document.addEventListener('DOMContentLoaded', FitApp.init);