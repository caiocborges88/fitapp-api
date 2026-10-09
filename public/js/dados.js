// 2. DICIONÁRIO ESTRATÉGICO: BASE DE ELITE (REDUZIDA E PADRONIZADA)
window.dictionaryData = [
    // ================= PEITORAL =================
    { 
        name: "Flexão de Braço (Padrão)", group: "Peitoral", subLevel: "Esternocostal", equip: "Peso Corporal", nivel: 1, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Flexão Inclinada (Mãos no banco)", group: "Peitoral", subLevel: "Abdominal", equip: "Peso Corporal", nivel: 1, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Flexão Declinada (Pés no banco)", group: "Peitoral", subLevel: "Clavicular", equip: "Peso Corporal", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Supino Reto com Barra", group: "Peitoral", subLevel: "Esternocostal", equip: "Barra", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Supino Reto com Halteres", group: "Peitoral", subLevel: "Esternocostal", equip: "Halter", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Supino Reto na Máquina", group: "Peitoral", subLevel: "Esternocostal", equip: "Máquina", nivel: 1, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Supino Inclinado com Barra", group: "Peitoral", subLevel: "Clavicular", equip: "Barra", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Supino Inclinado com Halteres", group: "Peitoral", subLevel: "Clavicular", equip: "Halter", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Supino Inclinado na Máquina", group: "Peitoral", subLevel: "Clavicular", equip: "Máquina", nivel: 1, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Supino Declinado com Barra", group: "Peitoral", subLevel: "Abdominal", equip: "Barra", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Supino Declinado com Halteres", group: "Peitoral", subLevel: "Abdominal", equip: "Halter", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Tríceps", "Ombro Anterior"] 
    },
    { 
        name: "Crucifixo Reto com Halteres", group: "Peitoral", subLevel: "Esternocostal (Isolamento)", equip: "Halter", nivel: 1, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Ombro Anterior"] 
    },
    { 
        name: "Crucifixo Inclinado com Halteres", group: "Peitoral", subLevel: "Clavicular (Isolamento)", equip: "Halter", nivel: 1, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Ombro Anterior"] 
    },
    { 
        name: "Voador (Peck Deck)", group: "Peitoral", subLevel: "Esternocostal (Isolamento)", equip: "Máquina", nivel: 1, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Ombro Anterior"] 
    },
    { 
        name: "Crossover Polia Alta", group: "Peitoral", subLevel: "Abdominal", equip: "Cabo", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Ombro Anterior", "Tríceps"] 
    },
    { 
        name: "Crossover Polia Média", group: "Peitoral", subLevel: "Esternocostal", equip: "Cabo", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Ombro Anterior", "Tríceps"] 
    },
    { 
        name: "Crossover Polia Baixa", group: "Peitoral", subLevel: "Clavicular", equip: "Cabo", nivel: 2, 
        agonist: "Peitoral", antagonist: "Costas", synergist: ["Ombro Anterior", "Tríceps"] 
    },

    // ================= COSTAS =================
    { 
        name: "Barra Fixa (Pull-up / Chin-up)", group: "Costas", subLevel: "Latíssimo do Dorso", equip: "Calistenia", nivel: 3, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Ombro Posterior", "Braquial"] 
    },
    { 
        name: "Puxada Alta (Pegada Aberta)", group: "Costas", subLevel: "Latíssimo do Dorso", equip: "Cabo", nivel: 1, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Ombro Posterior", "Braquial"] 
    },
    { 
        name: "Puxada Alta Supinada/Neutra", group: "Costas", subLevel: "Latíssimo do Dorso", equip: "Cabo", nivel: 1, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Ombro Posterior", "Braquial"] 
    },
    { 
        name: "Puxada Alta na Máquina", group: "Costas", subLevel: "Latíssimo do Dorso", equip: "Máquina", nivel: 1, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Ombro Posterior"] 
    },
    { 
        name: "Remada Curvada com Barra", group: "Costas", subLevel: "Espessura (Romboides)", equip: "Barra", nivel: 2, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Lombar", "Ombro Posterior"] 
    },
    { 
        name: "Remada Unilateral (Serrote)", group: "Costas", subLevel: "Espessura (Romboides/Latíssimo)", equip: "Halter", nivel: 2, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Ombro Posterior"] 
    },
    { 
        name: "Remada Baixa no Cabo (Triângulo)", group: "Costas", subLevel: "Espessura (Romboides/Miolo)", equip: "Cabo", nivel: 1, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Ombro Posterior", "Lombar"] 
    },
    { 
        name: "Remada Máquina Apoiada no Peito", group: "Costas", subLevel: "Espessura (Romboides)", equip: "Máquina", nivel: 1, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Ombro Posterior"] 
    },
    { 
        name: "Remada Cavalinho (T-Bar)", group: "Costas", subLevel: "Espessura (Romboides)", equip: "Barra", nivel: 2, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Bíceps", "Lombar", "Ombro Posterior"] 
    },
    { 
        name: "Pulldown no Cabo (Braços Estendidos)", group: "Costas", subLevel: "Latíssimo do Dorso", equip: "Cabo", nivel: 2, 
        agonist: "Costas", antagonist: "Peitoral", synergist: ["Tríceps (Cabeça Longa)", "Core"] 
    },
    { 
        name: "Levantamento Terra (Convencional)", group: "Costas", subLevel: "Eretores da Espinha / Cadeia Posterior", equip: "Barra", nivel: 3, 
        agonist: "Costas", antagonist: "Core", synergist: ["Glúteos", "Isquiotibiais", "Quadríceps", "Trapézio"] 
    },
    { 
        name: "Extensão Lombar (Banco Romano)", group: "Costas", subLevel: "Eretores da Espinha", equip: "Máquina", nivel: 1, 
        agonist: "Lombar", antagonist: "Core", synergist: ["Glúteos", "Isquiotibiais"] 
    },

    // ================= PERNAS =================
    { 
        name: "Agachamento Livre (Back/Front Squat)", group: "Pernas", subLevel: "Quadríceps (Vastos)", equip: "Barra", nivel: 2, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: ["Glúteos", "Core", "Lombar"] 
    },
    { 
        name: "Agachamento Goblet com Halter", group: "Pernas", subLevel: "Quadríceps (Vastos)", equip: "Halter", nivel: 1, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: ["Glúteos", "Core"] 
    },
    { 
        name: "Agachamento no Smith", group: "Pernas", subLevel: "Quadríceps (Vastos)", equip: "Máquina", nivel: 1, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: ["Glúteos"] 
    },
    { 
        name: "Leg Press 45º / Horizontal", group: "Pernas", subLevel: "Quadríceps (Vastos)", equip: "Máquina", nivel: 1, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: ["Glúteos"] 
    },
    { 
        name: "Hack Machine", group: "Pernas", subLevel: "Quadríceps (Vastos)", equip: "Máquina", nivel: 1, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: ["Glúteos"] 
    },
    { 
        name: "Cadeira Extensora", group: "Pernas", subLevel: "Reto Femoral", equip: "Máquina", nivel: 1, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: [] 
    },
    { 
        name: "Afundo / Avanço", group: "Pernas", subLevel: "Quadríceps (Vastos)", equip: "Peso Corporal", nivel: 1, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: ["Glúteos", "Core"] 
    },
    { 
        name: "Afundo com Halteres", group: "Pernas", subLevel: "Quadríceps (Vastos)", equip: "Halter", nivel: 2, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: ["Glúteos", "Core"] 
    },
    { 
        name: "Agachamento Búlgaro", group: "Pernas", subLevel: "Quadríceps / Glúteos", equip: "Halter", nivel: 3, 
        agonist: "Quadríceps", antagonist: "Isquiotibiais", synergist: ["Glúteos", "Core"] 
    },
    { 
        name: "Stiff / RDL com Barra", group: "Pernas", subLevel: "Isquiotibiais (Porção Alongada)", equip: "Barra", nivel: 2, 
        agonist: "Isquiotibiais", antagonist: "Quadríceps", synergist: ["Glúteos", "Lombar"] 
    },
    { 
        name: "Stiff / RDL com Halteres", group: "Pernas", subLevel: "Isquiotibiais (Porção Alongada)", equip: "Halter", nivel: 2, 
        agonist: "Isquiotibiais", antagonist: "Quadríceps", synergist: ["Glúteos", "Lombar"] 
    },
    { 
        name: "Mesa Flexora (Deitado)", group: "Pernas", subLevel: "Isquiotibiais (Porção Encurtada)", equip: "Máquina", nivel: 1, 
        agonist: "Isquiotibiais", antagonist: "Quadríceps", synergist: ["Panturrilhas"] 
    },
    { 
        name: "Cadeira Flexora (Sentado)", group: "Pernas", subLevel: "Isquiotibiais (Porção Encurtada)", equip: "Máquina", nivel: 1, 
        agonist: "Isquiotibiais", antagonist: "Quadríceps", synergist: ["Panturrilhas"] 
    },
    { 
        name: "Elevação Pélvica com Barra", group: "Pernas", subLevel: "Glúteo Máximo", equip: "Barra", nivel: 2, 
        agonist: "Glúteos", antagonist: "Flexores do Quadril", synergist: ["Isquiotibiais", "Core", "Lombar"] 
    },
    { 
        name: "Elevação Pélvica na Máquina", group: "Pernas", subLevel: "Glúteo Máximo", equip: "Máquina", nivel: 1, 
        agonist: "Glúteos", antagonist: "Flexores do Quadril", synergist: ["Isquiotibiais"] 
    },
    { 
        name: "Cadeira Abdutora", group: "Pernas", subLevel: "Glúteo Médio e Mínimo", equip: "Máquina", nivel: 1, 
        agonist: "Glúteos (Abdutores)", antagonist: "Adutores", synergist: [] 
    },
    { 
        name: "Cadeira Adutora", group: "Pernas", subLevel: "Músculos Adutores", equip: "Máquina", nivel: 1, 
        agonist: "Adutores", antagonist: "Glúteos (Abdutores)", synergist: [] 
    },
    { 
        name: "Panturrilha em Pé (Máquina/Smith)", group: "Pernas", subLevel: "Gastrocnêmios", equip: "Máquina", nivel: 1, 
        agonist: "Panturrilhas", antagonist: "Tibial Anterior", synergist: [] 
    },
    { 
        name: "Panturrilha Sentado (Máquina)", group: "Pernas", subLevel: "Sóleo", equip: "Máquina", nivel: 1, 
        agonist: "Panturrilhas", antagonist: "Tibial Anterior", synergist: [] 
    },
    { 
        name: "Panturrilha no Leg Press", group: "Pernas", subLevel: "Gastrocnêmios", equip: "Máquina", nivel: 1, 
        agonist: "Panturrilhas", antagonist: "Tibial Anterior", synergist: [] 
    },

    // ================= OMBROS =================
    { 
        name: "Desenvolvimento Militar com Barra", group: "Ombros", subLevel: "Deltoide Anterior", equip: "Barra", nivel: 2, 
        agonist: "Ombros", antagonist: "Costas", synergist: ["Tríceps", "Peitoral Superior", "Core"] 
    },
    { 
        name: "Desenvolvimento com Halteres", group: "Ombros", subLevel: "Deltoide Anterior", equip: "Halter", nivel: 2, 
        agonist: "Ombros", antagonist: "Costas", synergist: ["Tríceps", "Peitoral Superior"] 
    },
    { 
        name: "Desenvolvimento na Máquina", group: "Ombros", subLevel: "Deltoide Anterior", equip: "Máquina", nivel: 1, 
        agonist: "Ombros", antagonist: "Costas", synergist: ["Tríceps", "Peitoral Superior"] 
    },
    { 
        name: "Elevação Lateral com Halteres", group: "Ombros", subLevel: "Deltoide Lateral", equip: "Halter", nivel: 1, 
        agonist: "Ombros", antagonist: "Costas", synergist: ["Trapézio"] 
    },
    { 
        name: "Elevação Lateral no Cabo", group: "Ombros", subLevel: "Deltoide Lateral", equip: "Cabo", nivel: 2, 
        agonist: "Ombros", antagonist: "Costas", synergist: ["Trapézio"] 
    },
    { 
        name: "Elevação Frontal com Halteres", group: "Ombros", subLevel: "Deltoide Anterior", equip: "Halter", nivel: 1, 
        agonist: "Ombros", antagonist: "Ombro Posterior", synergist: ["Peitoral Superior"] 
    },
    { 
        name: "Crucifixo Invertido com Halteres", group: "Ombros", subLevel: "Deltoide Posterior", equip: "Halter", nivel: 1, 
        agonist: "Ombros", antagonist: "Peitoral", synergist: ["Trapézio", "Romboides"] 
    },
    { 
        name: "Crucifixo Invertido na Máquina (Peck Deck)", group: "Ombros", subLevel: "Deltoide Posterior", equip: "Máquina", nivel: 1, 
        agonist: "Ombros", antagonist: "Peitoral", synergist: ["Trapézio", "Romboides"] 
    },
    { 
        name: "Face Pull no Cabo", group: "Ombros", subLevel: "Deltoide Posterior", equip: "Cabo", nivel: 2, 
        agonist: "Ombros", antagonist: "Peitoral", synergist: ["Trapézio", "Manguito Rotador", "Romboides"] 
    },
    { 
        name: "Remada Alta (Barra/Cabo)", group: "Ombros", subLevel: "Deltoide Lateral", equip: "Cabo", nivel: 2, 
        agonist: "Ombros", antagonist: "Costas", synergist: ["Trapézio", "Bíceps", "Braquial"] 
    },

    // ================= BÍCEPS =================
    { 
        name: "Rosca Direta com Barra", group: "Bíceps", subLevel: "Bíceps Braquial", equip: "Barra", nivel: 1, 
        agonist: "Bíceps", antagonist: "Tríceps", synergist: ["Braquial", "Antebraço"] 
    },
    { 
        name: "Rosca Alternada com Halteres", group: "Bíceps", subLevel: "Bíceps Braquial", equip: "Halter", nivel: 1, 
        agonist: "Bíceps", antagonist: "Tríceps", synergist: ["Braquial", "Antebraço"] 
    },
    { 
        name: "Rosca no Cabo (Polia Baixa)", group: "Bíceps", subLevel: "Bíceps Braquial", equip: "Cabo", nivel: 1, 
        agonist: "Bíceps", antagonist: "Tríceps", synergist: ["Braquial", "Antebraço"] 
    },
    { 
        name: "Rosca Scott (Máquina/Barra)", group: "Bíceps", subLevel: "Bíceps Braquial", equip: "Máquina", nivel: 1, 
        agonist: "Bíceps", antagonist: "Tríceps", synergist: ["Braquial", "Antebraço"] 
    },
    { 
        name: "Rosca Martelo com Halteres", group: "Bíceps", subLevel: "Braquial / Braquiorradial", equip: "Halter", nivel: 1, 
        agonist: "Bíceps", antagonist: "Tríceps", synergist: ["Antebraço"] 
    },
    { 
        name: "Rosca Inversa com Barra/Cabo", group: "Bíceps", subLevel: "Braquial / Antebraço", equip: "Cabo", nivel: 2, 
        agonist: "Bíceps", antagonist: "Tríceps", synergist: ["Antebraço"] 
    },

    // ================= TRÍCEPS =================
    { 
        name: "Tríceps Testa (Barra W ou Halteres)", group: "Tríceps", subLevel: "Tríceps (Cabeça Longa)", equip: "Barra", nivel: 2, 
        agonist: "Tríceps", antagonist: "Bíceps", synergist: ["Antebraço"] 
    },
    { 
        name: "Tríceps Pulley (Barra Reta/V)", group: "Tríceps", subLevel: "Tríceps (Cabeça Lateral/Medial)", equip: "Cabo", nivel: 1, 
        agonist: "Tríceps", antagonist: "Bíceps", synergist: ["Antebraço"] 
    },
    { 
        name: "Tríceps Corda no Cabo", group: "Tríceps", subLevel: "Tríceps (Cabeça Lateral/Medial)", equip: "Cabo", nivel: 1, 
        agonist: "Tríceps", antagonist: "Bíceps", synergist: ["Antebraço"] 
    },
    { 
        name: "Tríceps Francês (Halter/Cabo)", group: "Tríceps", subLevel: "Tríceps (Cabeça Longa)", equip: "Halter", nivel: 2, 
        agonist: "Tríceps", antagonist: "Bíceps", synergist: ["Antebraço"] 
    },
    { 
        name: "Tríceps Coice (Kickback)", group: "Tríceps", subLevel: "Tríceps (Cabeça Lateral/Medial)", equip: "Halter", nivel: 1, 
        agonist: "Tríceps", antagonist: "Bíceps", synergist: ["Ombro Posterior", "Antebraço"] 
    },
    { 
        name: "Mergulho nas Paralelas / Banco", group: "Tríceps", subLevel: "Tríceps (Cabeças Longa, Lateral e Medial)", equip: "Peso Corporal", nivel: 2, 
        agonist: "Tríceps", antagonist: "Bíceps", synergist: ["Peitoral", "Ombro Anterior"] 
    },
    { 
        name: "Tríceps Máquina / Dip Machine", group: "Tríceps", subLevel: "Tríceps (Cabeças Longa, Lateral e Medial)", equip: "Máquina", nivel: 1, 
        agonist: "Tríceps", antagonist: "Bíceps", synergist: ["Peitoral", "Ombro Anterior"] 
    },

    // ================= CORE =================
    { 
        name: "Abdominal Supra (Solo/Carga)", group: "Core", subLevel: "Reto Abdominal Superior", equip: "Peso Corporal", nivel: 1, 
        agonist: "Core", antagonist: "Lombar", synergist: ["Flexores do Quadril", "Oblíquos"] 
    },
    { 
        name: "Abdominal Infra no Solo", group: "Core", subLevel: "Reto Abdominal Inferior", equip: "Peso Corporal", nivel: 2, 
        agonist: "Core", antagonist: "Lombar", synergist: ["Flexores do Quadril"] 
    },
    { 
        name: "Abdominal na Máquina", group: "Core", subLevel: "Reto Abdominal Superior", equip: "Máquina", nivel: 1, 
        agonist: "Core", antagonist: "Lombar", synergist: ["Flexores do Quadril"] 
    },
    { 
        name: "Prancha Isométrica (Frontal/Lateral)", group: "Core", subLevel: "Transverso do Abdômen", equip: "Peso Corporal", nivel: 2, 
        agonist: "Core", antagonist: "Lombar", synergist: ["Ombros", "Glúteos", "Quadríceps"] 
    },
    { 
        name: "Abdominal Bicicleta", group: "Core", subLevel: "Oblíquos", equip: "Peso Corporal", nivel: 2, 
        agonist: "Core", antagonist: "Lombar", synergist: ["Reto Abdominal", "Flexores do Quadril"] 
    },
    { 
        name: "Russian Twist (Livre ou Carga)", group: "Core", subLevel: "Oblíquos", equip: "Halter", nivel: 2, 
        agonist: "Core", antagonist: "Lombar", synergist: ["Reto Abdominal", "Flexores do Quadril"] 
    },

    // ================= CARDIO & MOBILIDADE =================
    { 
        name: "Polichinelos (Jumping Jacks)", group: "Cardio/Mobilidade", subLevel: "Sistema Cardiovascular", equip: "Peso Corporal", nivel: 1, 
        agonist: "Corpo Todo", antagonist: "Nenhum", synergist: ["Panturrilhas", "Ombros"] 
    },
    { 
        name: "Burpees", group: "Cardio/Mobilidade", subLevel: "Sistema Anaeróbico", equip: "Peso Corporal", nivel: 3, 
        agonist: "Corpo Todo", antagonist: "Nenhum", synergist: ["Peitoral", "Quadríceps", "Core"] 
    },
    { 
        name: "Escalador (Mountain Climber)", group: "Cardio/Mobilidade", subLevel: "Sistema Anaeróbico", equip: "Peso Corporal", nivel: 2, 
        agonist: "Corpo Todo", antagonist: "Nenhum", synergist: ["Core", "Quadríceps", "Ombros"] 
    },
    { 
        name: "Pular Corda", group: "Cardio/Mobilidade", subLevel: "Sistema Cardiovascular", equip: "Peso Corporal", nivel: 2, 
        agonist: "Corpo Todo", antagonist: "Nenhum", synergist: ["Panturrilhas", "Core"] 
    },
    { 
        name: "Maior Alongamento do Mundo", group: "Cardio/Mobilidade", subLevel: "Mobilidade Dinâmica", equip: "Peso Corporal", nivel: 1, 
        agonist: "Mobilidade Geral", antagonist: "Nenhum", synergist: [] 
    },
    { 
        name: "Gato-Vaca (Cat-Cow)", group: "Cardio/Mobilidade", subLevel: "Mobilidade Espinhal", equip: "Peso Corporal", nivel: 1, 
        agonist: "Mobilidade Geral", antagonist: "Nenhum", synergist: [] 
    },
    { 
        name: "Rotação Torácica", group: "Cardio/Mobilidade", subLevel: "Mobilidade Torácica", equip: "Peso Corporal", nivel: 1, 
        agonist: "Mobilidade Geral", antagonist: "Nenhum", synergist: [] 
    }
];
// =========================================================================
// RESTAURAÇÃO: BANCO DE FIGURINHAS (ÁLBUM)
// =========================================================================

window.stickersDB = [
    { id: 1, name: "Halter de Ferro", rarity: "comum", icon: "🏋️", page: 1 },
    { id: 2, name: "Anilha 20kg", rarity: "comum", icon: "💿", page: 1 },
    { id: 3, name: "Kettlebell", rarity: "comum", icon: "💣", page: 1 },
    { id: 4, name: "Barra Olímpica", rarity: "comum", icon: "📏", page: 1 },
    { id: 5, name: "Banco Reto", rarity: "comum", icon: "💺", page: 1 },
    { id: 6, name: "Corda de Pular", rarity: "comum", icon: "➰", page: 1 },
    { id: 7, name: "Leg Press 45", rarity: "prata", icon: "🦵", page: 2 },
    { id: 8, name: "Crossover", rarity: "prata", icon: "✖️", page: 2 },
    { id: 9, name: "Hack Machine", rarity: "comum", icon: "🏗️", page: 2 },
    { id: 10, name: "Mesa Flexora", rarity: "comum", icon: "🛏️", page: 2 },
    { id: 11, name: "Extensora", rarity: "comum", icon: "🪑", page: 2 },
    { id: 12, name: "Smith Machine", rarity: "prata", icon: "⛓️", page: 2 },
    { id: 13, name: "Supino Reto", rarity: "ouro", icon: "🔥", page: 3 },
    { id: 14, name: "Agachamento", rarity: "ouro", icon: "🍑", page: 3 },
    { id: 15, name: "Terra (Deadlift)", rarity: "ouro", icon: "💀", page: 3 },
    { id: 16, name: "Barra Fixa", rarity: "prata", icon: "🦍", page: 3 },
    { id: 17, name: "Desenvolvimento", rarity: "prata", icon: "🛡️", page: 3 },
    { id: 18, name: "Remada Curvada", rarity: "prata", icon: "🚣", page: 3 },
    { id: 19, name: "Mestre da Disciplina", rarity: "holografico", icon: "👑", page: 4 },
    { id: 20, name: "Força Bruta", rarity: "holografico", icon: "🦾", page: 4 },
    { id: 21, name: "Resistência Base", rarity: "holografico", icon: "🔋", page: 4 },
    { id: 22, name: "Simetria Perfeita", rarity: "holografico", icon: "📐", page: 4 },
    { id: 23, name: "Foco Inabalável", rarity: "holografico", icon: "👁️", page: 4 },
    { id: 24, name: "O Titã", rarity: "holografico", icon: "🏆", page: 4 }
];
// =========================================================================
// RESTAURAÇÃO: ROTINAS ESTÁTICAS DE FÁBRICA (BIBLIOTECA)
// =========================================================================

window.dbWorkouts = {
    biset: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Reto na Máquina", sets: 4, target: "12-15 rep" }, { name: "Tríceps Pulley (Barra Reta/V)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Voador (Peck Deck)", sets: 4, target: "12-15 rep" }, { name: "Tríceps Corda no Cabo", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Flexão de Braço (Padrão)", sets: 4, target: "Até Falha" }, { name: "Tríceps Máquina / Dip Machine", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Reto com Halteres", sets: 4, target: "12-15 rep" }, { name: "Tríceps Testa (Barra W ou Halteres)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Supra (Solo/Carga)", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Alta (Pegada Aberta)", sets: 4, target: "12-15 rep" }, { name: "Rosca Direta com Barra", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Máquina Apoiada no Peito", sets: 4, target: "12-15 rep" }, { name: "Rosca Scott (Máquina/Barra)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Pulldown no Cabo (Braços Estendidos)", sets: 4, target: "12-15 rep" }, { name: "Rosca Alternada com Halteres", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Bi-set: Costas + Lombar)", exercises: [{ name: "Remada Baixa no Cabo (Triângulo)", sets: 4, target: "12-15 rep" }, { name: "Extensão Lombar (Banco Romano)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Infra no Solo", sets: 3, target: "15-20 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Leg Press 45º / Horizontal", sets: 4, target: "12-15 rep" }, { name: "Desenvolvimento na Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "12-15 rep" }, { name: "Elevação Lateral com Halteres", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Bi-set: Adutores + Abdutores)", exercises: [{ name: "Cadeira Adutora", sets: 4, target: "12-15 rep" }, { name: "Cadeira Abdutora", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Bi-set: Panturrilhas)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }, { name: "Panturrilha Sentado (Máquina)", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "30 seg" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Reto com Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Testa (Barra W ou Halteres)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Inclinado com Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Francês (Halter/Cabo)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Crossover Polia Média", sets: 4, target: "10-12 rep" }, { name: "Tríceps Coice (Kickback)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Declinado com Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Corda no Cabo", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Bicicleta", sets: 3, target: "20 rep/lado" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Alta Supinada/Neutra", sets: 4, target: "10-12 rep" }, { name: "Rosca Direta com Barra", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Unilateral (Serrote)", sets: 4, target: "10-12 rep" }, { name: "Rosca Martelo com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Pulldown no Cabo (Braços Estendidos)", sets: 4, target: "10-12 rep" }, { name: "Rosca Alternada com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Baixa no Cabo (Triângulo)", sets: 4, target: "10-12 rep" }, { name: "Rosca Inversa com Barra/Cabo", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Russian Twist (Livre ou Carga)", sets: 3, target: "15 rep/lado" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }, { name: "Desenvolvimento com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Leg Press 45º / Horizontal", sets: 4, target: "10-12 rep" }, { name: "Elevação Lateral com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bi-set: Glúteos + Ombros)", exercises: [{ name: "Elevação Pélvica com Barra", sets: 4, target: "10-12 rep" }, { name: "Elevação Frontal com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bi-set: Posteriores + Trapézio)", exercises: [{ name: "Mesa Flexora (Deitado)", sets: 4, target: "10-12 rep" }, { name: "Crucifixo Invertido com Halteres", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "30 seg/lado" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Reto com Barra", sets: 4, target: "8-10 rep" }, { name: "Mergulho nas Paralelas / Banco", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 2 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Supino Inclinado com Barra", sets: 4, target: "8-10 rep" }, { name: "Tríceps Francês (Halter/Cabo)", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Crossover Polia Baixa", sets: 4, target: "10-12 rep" }, { name: "Flexão Inclinada (Mãos no banco)", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 4 (Bi-set: Peito + Tríceps)", exercises: [{ name: "Crucifixo Reto com Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Corda no Cabo", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Infra no Solo", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Barra Fixa (Pull-up / Chin-up)", sets: 4, target: "Até Falha" }, { name: "Rosca no Cabo (Polia Baixa)", sets: 4, target: "15 rep" }] },
                { title: "Bloco 2 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Curvada com Barra", sets: 4, target: "8-10 rep" }, { name: "Rosca Scott (Máquina/Barra)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Puxada Alta (Pegada Aberta)", sets: 4, target: "10-12 rep" }, { name: "Rosca Direta com Barra", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 4 (Bi-set: Costas + Bíceps)", exercises: [{ name: "Remada Cavalinho (T-Bar)", sets: 4, target: "10-12 rep" }, { name: "Rosca Alternada com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Russian Twist (Livre ou Carga)", sets: 3, target: "45 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 5, target: "6-8 rep" }, { name: "Desenvolvimento Militar com Barra", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "8-10 rep/lado" }, { name: "Desenvolvimento com Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Bi-set: Pernas + Ombros)", exercises: [{ name: "Stiff / RDL com Barra", sets: 4, target: "8-10 rep" }, { name: "Remada Alta (Barra/Cabo)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bi-set: Panturrilhas)", exercises: [{ name: "Panturrilha em Pé (Máquina/Smith)", sets: 4, target: "15-20 rep" }, { name: "Panturrilha Sentado (Máquina)", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Supra (Solo/Carga)", sets: 3, target: "15-20 rep" }] }
            ]
        }
    },
    tradicional: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Peitoral)", exercises: [{ name: "Supino Reto na Máquina", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Peitoral)", exercises: [{ name: "Voador (Peck Deck)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Tríceps)", exercises: [{ name: "Tríceps Pulley (Barra Reta/V)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Tríceps)", exercises: [{ name: "Tríceps Máquina / Dip Machine", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal na Máquina", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Dorsais)", exercises: [{ name: "Puxada Alta na Máquina", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Dorsais)", exercises: [{ name: "Remada Máquina Apoiada no Peito", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Bíceps)", exercises: [{ name: "Rosca Direta com Barra", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Bíceps)", exercises: [{ name: "Rosca Scott (Máquina/Barra)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Infra no Solo", sets: 3, target: "15-20 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Leg Press 45º / Horizontal", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Ombros)", exercises: [{ name: "Desenvolvimento na Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 4 (Panturrilha)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "30 seg" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Peitoral)", exercises: [{ name: "Supino Reto com Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Peitoral)", exercises: [{ name: "Supino Inclinado com Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Tríceps)", exercises: [{ name: "Tríceps Testa (Barra W ou Halteres)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Tríceps)", exercises: [{ name: "Tríceps Pulley (Barra Reta/V)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Supra (Solo/Carga)", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Dorsais)", exercises: [{ name: "Puxada Alta Supinada/Neutra", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Dorsais)", exercises: [{ name: "Remada Baixa no Cabo (Triângulo)", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Bíceps)", exercises: [{ name: "Rosca Direta com Barra", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Bíceps)", exercises: [{ name: "Rosca Martelo com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Russian Twist (Livre ou Carga)", sets: 3, target: "15 rep/lado" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Mesa Flexora (Deitado)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Ombros)", exercises: [{ name: "Desenvolvimento com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 4 (Ombros)", exercises: [{ name: "Elevação Lateral com Halteres", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Bicicleta", sets: 3, target: "15 rep/lado" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Peitoral)", exercises: [{ name: "Supino Reto com Barra", sets: 5, target: "6-8 rep" }] },
                { title: "Bloco 2 (Peitoral)", exercises: [{ name: "Crucifixo Reto com Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Tríceps)", exercises: [{ name: "Mergulho nas Paralelas / Banco", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 4 (Tríceps)", exercises: [{ name: "Tríceps Francês (Halter/Cabo)", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Infra no Solo", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Dorsais)", exercises: [{ name: "Barra Fixa (Pull-up / Chin-up)", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 2 (Dorsais)", exercises: [{ name: "Remada Curvada com Barra", sets: 4, target: "6-8 rep" }] },
                { title: "Bloco 3 (Bíceps)", exercises: [{ name: "Rosca Alternada com Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 4 (Bíceps)", exercises: [{ name: "Rosca Direta com Barra", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Russian Twist (Livre ou Carga)", sets: 3, target: "12-15 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Pernas)", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 5, target: "6-8 rep" }] },
                { title: "Bloco 2 (Pernas)", exercises: [{ name: "Stiff / RDL com Barra", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Ombros)", exercises: [{ name: "Desenvolvimento Militar com Barra", sets: 4, target: "6-8 rep" }] },
                { title: "Bloco 4 (Ombros)", exercises: [{ name: "Crucifixo Invertido com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "1 min" }] }
            ]
        }
    }
};

window.dbWorkoutsFeminino = {
    biset: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Elevação Pélvica na Máquina", sets: 4, target: "12-15 rep" }, { name: "Mesa Flexora (Deitado)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Stiff / RDL com Halteres", sets: 4, target: "12-15 rep" }, { name: "Cadeira Abdutora", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 3 (Isolado)", exercises: [{ name: "Agachamento Búlgaro", sets: 3, target: "10-12 rep/lado" }] },
                { title: "Bloco 4 (Core)", exercises: [{ name: "Abdominal na Máquina", sets: 3, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Peito)", exercises: [{ name: "Puxada Alta na Máquina", sets: 4, target: "12-15 rep" }, { name: "Supino Reto na Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Ombros + Tríceps)", exercises: [{ name: "Desenvolvimento na Máquina", sets: 4, target: "12-15 rep" }, { name: "Tríceps Pulley (Barra Reta/V)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Bi-set: Bíceps + Core)", exercises: [{ name: "Rosca Scott (Máquina/Barra)", sets: 3, target: "12-15 rep" }, { name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "30 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Quadríceps)", exercises: [{ name: "Leg Press 45º / Horizontal", sets: 4, target: "12-15 rep" }, { name: "Cadeira Extensora", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Bi-set: Adutores + Panturrilha)", exercises: [{ name: "Cadeira Adutora", sets: 4, target: "15-20 rep" }, { name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Supra (Solo/Carga)", sets: 3, target: "15-20 rep" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Elevação Pélvica com Barra", sets: 4, target: "10-12 rep" }, { name: "Stiff / RDL com Barra", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "10-12 rep/lado" }, { name: "Mesa Flexora (Deitado)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isoladores)", exercises: [{ name: "Cadeira Abdutora", sets: 4, target: "12-15 rep" }, { name: "Abdominal Bicicleta", sets: 3, target: "20 rep/lado" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Peito)", exercises: [{ name: "Puxada Alta Supinada/Neutra", sets: 4, target: "10-12 rep" }, { name: "Supino Inclinado com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Ombros + Tríceps)", exercises: [{ name: "Desenvolvimento com Halteres", sets: 4, target: "10-12 rep" }, { name: "Tríceps Corda no Cabo", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isoladores)", exercises: [{ name: "Elevação Lateral com Halteres", sets: 4, target: "12-15 rep" }, { name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "30 seg/lado" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Quadríceps)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }, { name: "Leg Press 45º / Horizontal", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Quadríceps + Panturrilha)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "10-12 rep" }, { name: "Panturrilha Sentado (Máquina)", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 3 (Core)", exercises: [{ name: "Russian Twist (Livre ou Carga)", sets: 3, target: "15 rep/lado" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Bi-set: Glúteos + Posteriores)", exercises: [{ name: "Elevação Pélvica com Barra", sets: 5, target: "8-10 rep" }, { name: "Stiff / RDL com Barra", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Bi-set: Unilaterais)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "8-10 rep/lado" }, { name: "Cadeira Abdutora", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isolador)", exercises: [{ name: "Mesa Flexora (Deitado)", sets: 4, target: "10-12 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Bi-set: Costas + Peito)", exercises: [{ name: "Barra Fixa (Pull-up / Chin-up)", sets: 4, target: "Até Falha" }, { name: "Supino Reto com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Ombros + Tríceps)", exercises: [{ name: "Desenvolvimento Militar com Barra", sets: 4, target: "8-10 rep" }, { name: "Tríceps Testa (Barra W ou Halteres)", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isoladores)", exercises: [{ name: "Elevação Lateral no Cabo", sets: 4, target: "10-12 rep" }, { name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "45 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Quadríceps)", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 5, target: "8-10 rep" }, { name: "Leg Press 45º / Horizontal", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Bi-set: Extensão + Panturrilha)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "10-12 rep" }, { name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Infra no Solo", sets: 3, target: "15-20 rep" }] }
            ]
        }
    },
    tradicional: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Glúteos)", exercises: [{ name: "Elevação Pélvica na Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Mesa Flexora (Deitado)", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Isolador)", exercises: [{ name: "Cadeira Abdutora", sets: 4, target: "15-20 rep" }] }
            ],
            'B': [
                { title: "Bloco 1 (Costas)", exercises: [{ name: "Puxada Alta na Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Peito)", exercises: [{ name: "Supino Reto na Máquina", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Ombros)", exercises: [{ name: "Desenvolvimento na Máquina", sets: 4, target: "12-15 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Leg Press 45º / Horizontal", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 2 (Quadríceps)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "12-15 rep" }] },
                { title: "Bloco 3 (Panturrilha)", exercises: [{ name: "Panturrilha Sentado (Máquina)", sets: 4, target: "15-20 rep" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Glúteos)", exercises: [{ name: "Elevação Pélvica com Barra", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Stiff / RDL com Barra", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Isolador)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "10-12 rep/lado" }] }
            ],
            'B': [
                { title: "Bloco 1 (Costas)", exercises: [{ name: "Puxada Alta Supinada/Neutra", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Ombros)", exercises: [{ name: "Desenvolvimento com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Tríceps)", exercises: [{ name: "Tríceps Corda no Cabo", sets: 4, target: "10-12 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Quadríceps)", exercises: [{ name: "Leg Press 45º / Horizontal", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Panturrilha)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Glúteos)", exercises: [{ name: "Elevação Pélvica com Barra", sets: 5, target: "8-10 rep" }] },
                { title: "Bloco 2 (Posteriores)", exercises: [{ name: "Stiff / RDL com Halteres", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Isolador)", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "8-10 rep/lado" }] }
            ],
            'B': [
                { title: "Bloco 1 (Costas)", exercises: [{ name: "Barra Fixa (Pull-up / Chin-up)", sets: 4, target: "Até Falha" }] },
                { title: "Bloco 2 (Ombros)", exercises: [{ name: "Desenvolvimento Militar com Barra", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Peito)", exercises: [{ name: "Supino Reto com Halteres", sets: 4, target: "10-12 rep" }] }
            ],
            'C': [
                { title: "Bloco 1 (Quadríceps)", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 5, target: "8-10 rep" }] },
                { title: "Bloco 2 (Quadríceps)", exercises: [{ name: "Leg Press 45º / Horizontal", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 3 (Core)", exercises: [{ name: "Abdominal Bicicleta", sets: 4, target: "15-20 rep" }] }
            ]
        }
    }
};

window.dbWorkoutsTatico = {
    biset: {
        iniciante: {
            'A': [
                { title: "Bloco 1 (Mobilidade e Prevenção)", exercises: [{ name: "Maior Alongamento do Mundo", sets: 2, target: "10 rep/lado" }, { name: "Gato-Vaca (Cat-Cow)", sets: 2, target: "10 rep" }] },
                { title: "Bloco 2 (Força Base Pernas)", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 4, target: "12-15 rep" }, { name: "Afundo / Avanço", sets: 4, target: "10 rep/lado" }] },
                { title: "Bloco 3 (Core Anti-Rotação)", exercises: [{ name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "30 seg" }, { name: "Abdominal Supra (Solo/Carga)", sets: 3, target: "20 rep" }] },
                { title: "Bloco 4 (Motor Cardio)", exercises: [{ name: "Polichinelos (Jumping Jacks)", sets: 3, target: "45 seg" }] }
            ],
            'B': [
                { title: "Bloco 1 (Mobilidade Superior)", exercises: [{ name: "Rotação Torácica", sets: 2, target: "10 rep/lado" }, { name: "Gato-Vaca (Cat-Cow)", sets: 2, target: "10 rep" }] },
                { title: "Bloco 2 (Tração e Empurre)", exercises: [{ name: "Puxada Alta na Máquina", sets: 4, target: "12-15 rep" }, { name: "Flexão de Braço (Padrão)", sets: 4, target: "Máx" }] },
                { title: "Bloco 3 (Core de Combate)", exercises: [{ name: "Abdominal Supra (Solo/Carga)", sets: 3, target: "20 rep" }, { name: "Escalador (Mountain Climber)", sets: 3, target: "30 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Força Unilateral)", exercises: [{ name: "Agachamento Búlgaro", sets: 3, target: "10 rep/lado" }, { name: "Elevação Pélvica com Barra", sets: 3, target: "15 rep" }] },
                { title: "Bloco 2 (Estabilidade Articular)", exercises: [{ name: "Cadeira Adutora", sets: 3, target: "15-20 rep" }, { name: "Cadeira Abdutora", sets: 3, target: "15-20 rep" }] },
                { title: "Bloco 3 (Tiros de Aceleração)", exercises: [{ name: "Burpees", sets: 3, target: "10 rep" }, { name: "Polichinelos (Jumping Jacks)", sets: 3, target: "45 seg" }] }
            ]
        },
        intermediario: {
            'A': [
                { title: "Bloco 1 (Mobilidade)", exercises: [{ name: "Maior Alongamento do Mundo", sets: 2, target: "10 rep/lado" }, { name: "Rotação Torácica", sets: 2, target: "10 rep/lado" }] },
                { title: "Bloco 2 (Potência e Pliometria)", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 4, target: "12-15 rep" }, { name: "Afundo / Avanço", sets: 4, target: "12 rep/lado" }] },
                { title: "Bloco 3 (Core Dinâmico)", exercises: [{ name: "Russian Twist (Livre ou Carga)", sets: 3, target: "20 rep" }, { name: "Prancha Isométrica (Frontal/Lateral)", sets: 3, target: "30 seg/lado" }] },
                { title: "Bloco 4 (Resistência Anaeróbica)", exercises: [{ name: "Polichinelos (Jumping Jacks)", sets: 4, target: "40 seg" }] }
            ],
            'B': [
                { title: "Bloco 1 (Postura e Blindagem)", exercises: [{ name: "Remada Curvada com Barra", sets: 4, target: "10-12 rep" }, { name: "Supino Reto com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Ombros de Contato)", exercises: [{ name: "Desenvolvimento Militar com Barra", sets: 4, target: "10-12 rep" }, { name: "Elevação Lateral com Halteres", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 3 (Resistência de Core)", exercises: [{ name: "Abdominal Bicicleta", sets: 3, target: "30 rep" }, { name: "Burpees", sets: 3, target: "45 seg" }] }
            ],
            'C': [
                { title: "Bloco 1 (Cadeia Posterior Especial)", exercises: [{ name: "Stiff / RDL com Barra", sets: 4, target: "10-12 rep" }, { name: "Agachamento Búlgaro", sets: 4, target: "10-12 rep/lado" }] },
                { title: "Bloco 2 (Frenagem e Tornozelo)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "20 rep" }, { name: "Panturrilha em Pé (Máquina/Smith)", sets: 4, target: "15 rep" }] },
                { title: "Bloco 3 (Cardio de Alta Intensidade)", exercises: [{ name: "Burpees", sets: 4, target: "15 rep" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "45 seg" }] }
            ]
        },
        avancado: {
            'A': [
                { title: "Bloco 1 (Força Explosiva Pura)", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 4, target: "6-8 rep" }, { name: "Polichinelos (Jumping Jacks)", sets: 4, target: "15 rep" }] },
                { title: "Bloco 2 (Absorção de Impacto)", exercises: [{ name: "Afundo com Halteres", sets: 4, target: "Máx/lado" }, { name: "Afundo / Avanço", sets: 4, target: "15 rep/lado" }] },
                { title: "Bloco 3 (Core Rígido)", exercises: [{ name: "Abdominal Infra no Solo", sets: 4, target: "15 rep" }, { name: "Prancha Isométrica (Frontal/Lateral)", sets: 4, target: "1 min" }] }
            ],
            'B': [
                { title: "Bloco 1 (Força de Tração)", exercises: [{ name: "Barra Fixa (Pull-up / Chin-up)", sets: 4, target: "Até Falha" }, { name: "Remada Cavalinho (T-Bar)", sets: 4, target: "8-10 rep" }] },
                { title: "Bloco 2 (Empurre Explosivo)", exercises: [{ name: "Supino Reto com Barra", sets: 4, target: "8-10 rep" }, { name: "Flexão Inclinada (Mãos no banco)", sets: 4, target: "Falha (Explosiva)" }] },
                { title: "Bloco 3 (Tiros Curtos)", exercises: [{ name: "Burpees", sets: 4, target: "20 rep" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1 min" }] }
            ],
            'C': [
                { title: "Bloco 1 (Arrancada Posterior)", exercises: [{ name: "Stiff / RDL com Barra", sets: 5, target: "8-10 rep" }, { name: "Elevação Pélvica com Barra", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Blindagem de Tornozelo)", exercises: [{ name: "Panturrilha em Pé (Máquina/Smith)", sets: 4, target: "Falha" }, { name: "Panturrilha Sentado (Máquina)", sets: 4, target: "20 rep" }] },
                { title: "Bloco 3 (Condicionamento Tático)", exercises: [{ name: "Burpees", sets: 4, target: "1 min" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1 min" }] }
            ]
        }
    },
    tradicional: {
        iniciante: {
            'A': [{ title: "Treino Society", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 4, target: "15 rep" }, { name: "Afundo / Avanço", sets: 4, target: "12 rep" }, { name: "Prancha Isométrica (Frontal/Lateral)", sets: 4, target: "45 seg" }, { name: "Polichinelos (Jumping Jacks)", sets: 4, target: "1 min" }] }],
            'B': [{ title: "Treino Society", exercises: [{ name: "Flexão de Braço (Padrão)", sets: 4, target: "Falha" }, { name: "Puxada Alta na Máquina", sets: 4, target: "12-15 rep" }, { name: "Abdominal Supra (Solo/Carga)", sets: 4, target: "20 rep" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "45 seg" }] }],
            'C': [{ title: "Treino Society", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "10 rep" }, { name: "Stiff / RDL com Barra", sets: 4, target: "15 rep" }, { name: "Cadeira Adutora", sets: 4, target: "20 rep" }, { name: "Burpees", sets: 4, target: "10 rep" }] }]
        },
        intermediario: {
            'A': [{ title: "Treino Society", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 4, target: "20 rep" }, { name: "Afundo / Avanço", sets: 4, target: "15 rep/lado" }, { name: "Russian Twist (Livre ou Carga)", sets: 4, target: "20 rep" }, { name: "Polichinelos (Jumping Jacks)", sets: 4, target: "45 seg" }] }],
            'B': [{ title: "Treino Society", exercises: [{ name: "Supino Reto com Halteres", sets: 4, target: "10-12 rep" }, { name: "Remada Curvada com Barra", sets: 4, target: "10-12 rep" }, { name: "Abdominal Bicicleta", sets: 4, target: "30 rep" }, { name: "Burpees", sets: 4, target: "1 min" }] }],
            'C': [{ title: "Treino Society", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "12 rep/lado" }, { name: "Stiff / RDL com Barra", sets: 4, target: "10-12 rep" }, { name: "Panturrilha no Leg Press", sets: 4, target: "20 rep" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1 min" }] }]
        },
        avancado: {
            'A': [{ title: "Treino Society", exercises: [{ name: "Agachamento Livre (Back/Front Squat)", sets: 5, target: "6-8 rep" }, { name: "Afundo com Halteres", sets: 4, target: "Máx/lado" }, { name: "Abdominal Infra no Solo", sets: 4, target: "15 rep" }, { name: "Burpees", sets: 4, target: "20 rep" }] }],
            'B': [{ title: "Treino Society", exercises: [{ name: "Supino Reto com Barra", sets: 5, target: "6-8 rep" }, { name: "Barra Fixa (Pull-up / Chin-up)", sets: 4, target: "Falha" }, { name: "Prancha Isométrica (Frontal/Lateral)", sets: 4, target: "1 min" }, { name: "Polichinelos (Jumping Jacks)", sets: 4, target: "1 min" }] }],
            'C': [{ title: "Treino Society", exercises: [{ name: "Stiff / RDL com Barra", sets: 5, target: "8-10 rep" }, { name: "Agachamento Livre (Back/Front Squat)", sets: 4, target: "20 rep" }, { name: "Panturrilha em Pé (Máquina/Smith)", sets: 4, target: "Falha" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1.5 min" }] }]
        }
    }
};