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
    { name: "Voador (Peck Deck)", focus: "Peitoral Isolado", desc: "Feche os braços na frente do peito focando em 'esmagar' o peitoral. Retorne devagar." },

    // --- NOVO: MOBILIDADE CORPORAL ---
    { name: "Cócoras Profundas", focus: "Pernas (Mobilidade)", desc: "Ficar agachado o mais baixo possível, mantendo os calcanhares no chão e o peito aberto. Excelente para tornozelos e quadris." },
    { name: "Gato-Vaca (Cat-Cow)", focus: "Costas (Mobilidade)", desc: "Em quatro apoios, alternar entre curvar a coluna para cima (gato) e estender a barriga para o chão (vaca)." },
    { name: "Mobilidade 90/90", focus: "Pernas (Mobilidade)", desc: "Sentado, pernas flexionadas a 90 graus (frente e lateral). Rotacionar o tronco sobre a perna da frente para destravar o quadril." },
    { name: "Maior Alongamento do Mundo", focus: "Pernas (Mobilidade)", desc: "Avanço profundo, uma mão no chão, enquanto o outro braço gira apontando para o teto." },
    { name: "Rotação Torácica", focus: "Costas e Ombros", desc: "Em quatro apoios, mão na nuca, girar o cotovelo em direção ao outro braço e depois abrir apontando para o teto." },
    { name: "Deslocamento de Ombros", focus: "Ombros (Mobilidade)", desc: "Segurar um cabo de vassoura (ou toalha) bem aberto e passar por cima da cabeça até as costas sem dobrar os cotovelos." },
    { name: "Dorsiflexão de Tornozelo", focus: "Pernas (Mobilidade)", desc: "Em pé, ponta do pé próxima à parede, tentar encostar o joelho na parede sem tirar o calcanhar do chão." },
    
    // --- NOVO: AERÓBICOS E HIIT ---
    { name: "Polichinelos (Jumping Jacks)", focus: "Cardio", desc: "Clássico aeróbico. Braços e pernas abrem e fecham em velocidade." },
    { name: "Corrida Estacionária", focus: "Cardio", desc: "Correr no lugar elevando os joelhos até a altura do quadril." },
    { name: "Corrida Calcanhar no Glúteo", focus: "Cardio", desc: "Correr no lugar chutando os calcanhares em direção aos glúteos." },
    { name: "Burpees", focus: "Cardio", desc: "Do chão ao teto. Prancha, salto trazendo os pés para as mãos e salto vertical." },
    { name: "Saltos Laterais (Skater Jumps)", focus: "Cardio", desc: "Saltar lateralmente de um pé para o outro, imitando um patinador de velocidade." },
    { name: "Pular Corda", focus: "Cardio", desc: "Saltos curtos mantendo o abdômen contraído (com ou sem corda real)." },
    { name: "Sprawl (Meio Burpee)", focus: "Core/Cardio", desc: "Posição de prancha alta, salto trazendo os pés para perto das mãos e levantar rapidamente." },
    
    // --- NOVO: FORÇA INFERIORES (CALISTENIA) ---
    { name: "Agachamento com Salto", focus: "Pernas Explosão", desc: "Agachamento tradicional seguido de salto vertical para adicionar potência." },
    { name: "Afundo / Avanço", focus: "Pernas", desc: "Passada larga à frente ou para trás, descendo o joelho de trás em direção ao chão." },
    { name: "Pistol Squat", focus: "Pernas Avançado", desc: "Agachamento de uma perna só. Pode usar cadeira como apoio para iniciar." },
    
    // --- NOVO: FORÇA SUPERIORES (CALISTENIA) ---
    { name: "Flexão de Braço Tradicional", focus: "Peito e Tríceps", desc: "Sem joelhos no chão. Corpo rígido, desce e empurra o solo com potência." },
    { name: "Flexão Declinada", focus: "Peitoral Superior", desc: "Pés apoiados no sofá/cadeira, mãos no chão. Aumenta a carga sobre a porção superior do peito." },
    { name: "Flexão Pike (Pike Push-up)", focus: "Ombros", desc: "Corpo em formato de 'V' invertido, cabeça desce em direção ao chão focado nos ombros." },
    { name: "Mergulho no Banco", focus: "Tríceps", desc: "Mãos apoiadas na beirada de uma cadeira, flexionando os cotovelos para trás." },
    { name: "Prancha Sobe-Desce", focus: "Ombros e Core", desc: "Alternar entre prancha com antebraços apoiados e prancha alta (mãos apoiadas)." },
    { name: "Remada na Porta/Lençol", focus: "Costas Base", desc: "Usar um lençol preso na porta para puxar o peso do corpo para trás." }
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