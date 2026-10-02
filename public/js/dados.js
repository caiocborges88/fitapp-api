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