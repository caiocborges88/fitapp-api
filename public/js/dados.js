// 2. DICIONÁRIO ESTRATÉGICO: SUBNÍVEIS E BIOMECÂNICA
const dictionaryData = [
    // ==========================================
    // 1. TRÍCEPS [Subníveis: triceps_longa, triceps_lateral_medial, triceps_global]
    // ==========================================
    { name: "Tríceps Francês Halter", focus: "triceps_longa", desc: "Braços elevados para focar na cabeça longa.", equip: "halter" },
    { name: "Tríceps Testa", focus: "triceps_longa", desc: "Cotovelos levemente para trás da cabeça.", equip: "barra" },
    { name: "Tríceps Pulley", focus: "triceps_lateral_medial", desc: "Braços junto ao corpo, foca cabeça lateral e medial.", equip: "cabo" },
    { name: "Tríceps Corda", focus: "triceps_lateral_medial", desc: "Abra a corda no final para pico de contração lateral.", equip: "cabo" },
    { name: "Tríceps Kickback (Coice)", focus: "triceps_lateral_medial", desc: "Isolação total no fim do movimento.", equip: "cabo" },
    { name: "Tríceps Máquina", focus: "triceps_global", desc: "Trabalho global do tríceps.", equip: "maquina" },
    { name: "Mergulho Paralelas", focus: "triceps_global, peito_esternocostal", desc: "Construtor de massa global para o complexo do tríceps.", equip: "calistenia" },
    { name: "Mergulho no Banco", focus: "triceps_global", desc: "Trabalho completo do tríceps.", equip: "calistenia" },
    { name: "Flexão Diamante", focus: "triceps_global, peito_esternocostal", desc: "Ativação intensa do tríceps.", equip: "peso_corporal" },

    // ==========================================
    // 2. BÍCEPS E ANTEBRAÇO [Subníveis: biceps_longa, biceps_curta, biceps_braquial, biceps_global]
    // ==========================================
    { name: "Rosca Alternada Inclinada", focus: "biceps_longa", desc: "Maximiza alongamento para o pico do bíceps.", equip: "halter" },
    { name: "Rosca Scott", focus: "biceps_curta", desc: "Foca na parte interna (cabeça curta) impedindo impulsos.", equip: "barra" },
    { name: "Rosca Scott (Máquina)", focus: "biceps_curta", desc: "Tensão contínua na parte interna.", equip: "maquina" },
    { name: "Rosca Aranha (Spider Curl)", focus: "biceps_curta", desc: "Isolamento total da cabeça curta.", equip: "halter" },
    { name: "Rosca Concentrada", focus: "biceps_curta", desc: "Pico de contração com braço estabilizado.", equip: "halter" },
    { name: "Rosca Martelo Halteres", focus: "biceps_braquial", desc: "Foco no braquial e braquiorradial (espessura).", equip: "halter" },
    { name: "Rosca Inversa no Cabo", focus: "biceps_braquial", desc: "Isola braquial e extensores do antebraço.", equip: "cabo" },
    { name: "Rosca Direta (Barra W)", focus: "biceps_global", desc: "Trabalha ambas as cabeças de forma equilibrada.", equip: "barra" },
    { name: "Rosca 21 (Barra)", focus: "biceps_global", desc: "Estímulo metabólico global do bíceps.", equip: "barra" },

    // ==========================================
    // 3. PEITORAL [Subníveis: peito_clavicular, peito_esternocostal, peito_costal, peito_hibrido]
    // ==========================================
    { name: "Supino Inclinado Halteres", focus: "peito_clavicular", desc: "Foco nas fibras superiores (porção clavicular).", equip: "halter" },
    { name: "Crossover Polia Baixa", focus: "peito_clavicular", desc: "Puxando de baixo para cima (fibras superiores).", equip: "cabo" },
    { name: "Flexão Declinada", focus: "peito_clavicular", desc: "Pés no banco (foco parte superior).", equip: "calistenia" },
    { name: "Supino Reto Barra", focus: "peito_esternocostal", desc: "Construtor primário da espessura do peitoral.", equip: "barra" },
    { name: "Supino Reto Halteres", focus: "peito_esternocostal", desc: "Permite maior amplitude na porção média.", equip: "halter" },
    { name: "Supino Máquina", focus: "peito_esternocostal", desc: "Trabalho seguro para o miolo do peito.", equip: "maquina" },
    { name: "Crucifixo Reto Halteres", focus: "peito_esternocostal", desc: "Alongamento e contração do miolo.", equip: "halter" },
    { name: "Voador (Peck Deck)", focus: "peito_esternocostal", desc: "Isolamento da porção esternal.", equip: "maquina" },
    { name: "Crossover Polia Média", focus: "peito_esternocostal", desc: "Foco na linha média do peitoral.", equip: "cabo" },
    { name: "Flexão de Braço Tradicional", focus: "peito_esternocostal", desc: "Desenvolvimento global do peito.", equip: "peso_corporal" },
    { name: "Flexão de Braço (Joelhos)", focus: "peito_esternocostal", desc: "Versão adaptada para espessura.", equip: "peso_corporal" },
    { name: "Supino Declinado Barra", focus: "peito_costal", desc: "Foco na parte inferior do peitoral.", equip: "barra" },
    { name: "Flexão Inclinada no Banco", focus: "peito_costal", desc: "Mãos no banco (foco parte inferior).", equip: "calistenia" },
    { name: "Pullover com Halter", focus: "peito_hibrido, costa_largura", desc: "Expansão torácica dividindo peito e costas.", equip: "halter" },

    // ==========================================
    // 4. COSTAS [Subníveis: costa_largura, costa_espessura, costa_isolado]
    // ==========================================
    { name: "Barra Fixa", focus: "costa_largura", desc: "Puxada vertical para expansão do grande dorsal.", equip: "calistenia" },
    { name: "Puxada Alta (Livre)", focus: "costa_largura", desc: "Expansão lateral das costas.", equip: "cabo" },
    { name: "Puxada Alta Máquina", focus: "costa_largura", desc: "Trabalho focado na largura.", equip: "maquina" },
    { name: "Barra Fixa Supinada (Chin-up)", focus: "costa_largura, biceps_global", desc: "Largura e forte ação do bíceps.", equip: "calistenia" },
    { name: "Puxada Frente Supinada", focus: "costa_largura, biceps_global", desc: "Expansão com auxílio do bíceps.", equip: "cabo" },
    { name: "Remada Baixa Triângulo", focus: "costa_espessura", desc: "Foco no miolo das costas e romboides.", equip: "cabo" },
    { name: "Remada Cavalinho Livre", focus: "costa_espessura", desc: "Construtor de volume (espessura dorsal).", equip: "barra" },
    { name: "Remada Curvada Livre", focus: "costa_espessura", desc: "Trabalha toda a espessura das costas.", equip: "barra" },
    { name: "Remada Máquina", focus: "costa_espessura", desc: "Espessura com peito apoiado.", equip: "maquina" },
    { name: "Remada Unilateral (Serrote)", focus: "costa_espessura", desc: "Trabalho unilateral de espessura.", equip: "halter" },
    { name: "Remada Australiana (Barra Baixa)", focus: "costa_espessura", desc: "Espessura com peso do corpo.", equip: "calistenia" },
    { name: "Remada na Porta/Lençol", focus: "costa_espessura", desc: "Espessura em casa.", equip: "peso_corporal" },
    { name: "Pulldown no Cabo", focus: "costa_isolado", desc: "Desativa o bíceps e foca 100% no grande dorsal.", equip: "cabo" },

    // ==========================================
    // 5. OMBROS E TRAPÉZIO [Subníveis: ombro_anterior, ombro_lateral, ombro_posterior, trapezio]
    // ==========================================
    { name: "Desenvolvimento Halteres", focus: "ombro_anterior", desc: "Construtor primário da parte frontal.", equip: "halter" },
    { name: "Desenvolvimento Militar", focus: "ombro_anterior", desc: "Foco em força para o deltoide anterior.", equip: "barra" },
    { name: "Desenvolvimento Máquina", focus: "ombro_anterior", desc: "Trabalho seguro para deltoide anterior.", equip: "maquina" },
    { name: "Elevação Frontal Anilha", focus: "ombro_anterior", desc: "Isola e esgota a porção anterior.", equip: "halter" },
    { name: "Elevação Lateral Halteres", focus: "ombro_lateral", desc: "Ativação do feixe lateral (ombros largos).", equip: "halter" },
    { name: "Elevação Lateral Isométrica", focus: "ombro_lateral", desc: "Tensão constante no deltoide lateral.", equip: "peso_corporal" },
    { name: "Remada Alta no Cabo", focus: "ombro_lateral, trapezio", desc: "Movimento híbrido: lateral do ombro e trapézio.", equip: "cabo" },
    { name: "Crucifixo Invertido Livre", focus: "ombro_posterior, costa_espessura", desc: "Isola a cabeça posterior e romboides.", equip: "halter" },
    { name: "Encolhimento Halteres", focus: "trapezio", desc: "Hipertrofia e espessura do trapézio.", equip: "halter" },

    // ==========================================
    // 6. PERNAS E GLÚTEOS [Subníveis: perna_quadriceps, perna_posterior_gluteo, perna_adutor_abdutor, panturrilha_gastro, panturrilha_soleo]
    // ==========================================
    { name: "Agachamento Livre", focus: "perna_quadriceps, perna_posterior_gluteo", desc: "Ativação fortíssima global das pernas.", equip: "barra" },
    { name: "Agachamento no Smith", focus: "perna_quadriceps", desc: "Foco direcional no quadríceps.", equip: "maquina" },
    { name: "Leg Press 45°", focus: "perna_quadriceps, perna_posterior_gluteo", desc: "Empurre focado em massa bruta.", equip: "maquina" },
    { name: "Leg Press Máquina", focus: "perna_quadriceps", desc: "Trabalho focado frontal.", equip: "maquina" },
    { name: "Agachamento Búlgaro", focus: "perna_quadriceps, perna_posterior_gluteo", desc: "Trabalho unilateral corretivo.", equip: "halter" },
    { name: "Afundo / Avanço", focus: "perna_quadriceps, perna_posterior_gluteo", desc: "Desenvolvimento unilateral dinâmico.", equip: "halter" },
    { name: "Pistol Squat", focus: "perna_quadriceps", desc: "Foco intenso no quadríceps.", equip: "peso_corporal" },
    { name: "Agachamento com Salto", focus: "perna_quadriceps", desc: "Explosão para quadríceps.", equip: "peso_corporal" },
    { name: "Cadeira Extensora", focus: "perna_quadriceps", desc: "Isolamento total do quadríceps.", equip: "maquina" },
    { name: "Stiff (Terra Romeno)", focus: "perna_posterior_gluteo, core_profundo", desc: "Alonga e contrai isquiotibiais e glúteos.", equip: "barra" },
    { name: "Elevação Pélvica", focus: "perna_posterior_gluteo", desc: "Focado no volume do glúteo máximo.", equip: "barra" },
    { name: "Mesa Flexora", focus: "perna_posterior_gluteo", desc: "Isola os isquiotibiais (posterior da coxa).", equip: "maquina" },
    { name: "Flexão Nórdica", focus: "perna_posterior_gluteo", desc: "Exigência extrema do posterior da coxa.", equip: "peso_corporal" },
    { name: "Cadeira Adutora", focus: "perna_adutor_abdutor", desc: "Trabalha a parte interna da coxa.", equip: "maquina" },
    { name: "Cadeira Abdutora", focus: "perna_adutor_abdutor", desc: "Trabalha a lateral do quadril (glúteos médio).", equip: "maquina" },
    { name: "Panturrilha no Leg Press", focus: "panturrilha_gastro", desc: "Pernas esticadas focam no gastrocnêmio.", equip: "maquina" },
    { name: "Panturrilha no Degrau", focus: "panturrilha_gastro", desc: "Trabalho livre para gastrocnêmio.", equip: "peso_corporal" },
    { name: "Panturrilha Sentado", focus: "panturrilha_soleo", desc: "Joelhos dobrados focam no músculo sóleo.", equip: "maquina" },

    // ==========================================
    // 7. CORE E ABDÔMEN [Subníveis: core_supra, core_infra, core_obliquo, core_profundo]
    // ==========================================
    { name: "Abdominal Supra", focus: "core_supra", desc: "Trabalho focado na porção superior.", equip: "peso_corporal" },
    { name: "Abdominal Supra com Carga", focus: "core_supra", desc: "Construção de volume na parede frontal.", equip: "halter" },
    { name: "Abdominal Supra Solo", focus: "core_supra", desc: "Versão de solo sem carga.", equip: "peso_corporal" },
    { name: "Abdominal Declinado", focus: "core_supra", desc: "Volume na parede frontal com declínio.", equip: "maquina" },
    { name: "Abdominal Máquina", focus: "core_supra", desc: "Trabalho guiado da parede frontal.", equip: "maquina" },
    { name: "Abdominal Infra", focus: "core_infra", desc: "Pelve em movimento, foco inferior.", equip: "peso_corporal" },
    { name: "Elevação Pernas Pendurado", focus: "core_infra", desc: "Alto pico de contração inferior.", equip: "calistenia" },
    { name: "Abdominal Canivete", focus: "core_infra", desc: "Ativação simultânea focando no inferior.", equip: "peso_corporal" },
    { name: "V-Up (Abdominal em V)", focus: "core_infra", desc: "Dinâmico para porção inferior.", equip: "peso_corporal" },
    { name: "Abdominal Oblíquo", focus: "core_obliquo", desc: "Trabalha as fibras laterais.", equip: "peso_corporal" },
    { name: "Abdominal Bicicleta", focus: "core_obliquo", desc: "Rotação contínua ativando laterais.", equip: "peso_corporal" },
    { name: "Russian Twist", focus: "core_obliquo", desc: "Trabalha as paredes diagonais do core.", equip: "peso_corporal" },
    { name: "Toque no Calcanhar", focus: "core_obliquo", desc: "Flexão lateral blindando o tronco.", equip: "peso_corporal" },
    { name: "Prancha Lateral", focus: "core_obliquo, core_profundo", desc: "Isometria estabilizando as laterais.", equip: "peso_corporal" },
    { name: "Prancha Isométrica", focus: "core_profundo", desc: "Fortalece o transverso de forma profunda.", equip: "peso_corporal" },
    { name: "Hollow Body Hold", focus: "core_profundo", desc: "Estabilidade avançada do core profundo.", equip: "peso_corporal" },
    { name: "Roda Abdominal", focus: "core_profundo", desc: "Estiramento de toda a parede abdominal.", equip: "halter" },
    { name: "Escalador (Mountain Climber)", focus: "core_profundo", desc: "Cardio e estabilidade do transverso.", equip: "peso_corporal" },
    { name: "Superman (Solo)", focus: "core_profundo", desc: "Foco nos eretores da espinha e glúteos.", equip: "peso_corporal" },
    { name: "Extensão Lombar Máquina", focus: "core_profundo", desc: "Equilíbrio muscular para a lombar.", equip: "maquina" }
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