// 2. DICIONÁRIO ESTRATÉGICO: SUBNÍVEIS E BIOMECÂNICA (ATUALIZADO V3 - NÍVEIS DE DIFICULDADE)
const dictionaryData = [
    { name: "Supino Inclinado na Máquina", group: "Peitoral", focus: "Fibras Superiores", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras superiores (peitoral).", nivel: 1 },
    { name: "Supino Inclinado com Barra", group: "Peitoral", focus: "Fibras Superiores", equip: "Barras_Anilhas", desc: "Trabalho focado em fibras superiores (peitoral).", nivel: 2 },
    { name: "Supino Inclinado com Halteres", group: "Peitoral", focus: "Fibras Superiores", equip: "Pesos_Livres", desc: "Foco nas fibras superiores (porção clavicular).", nivel: 2 },
    { name: "Crucifixo Inclinado com Halteres", group: "Peitoral", focus: "Fibras Superiores", equip: "Pesos_Livres", desc: "Trabalho focado em fibras superiores (peitoral).", nivel: 2 },
    { name: "Crucifixo Inclinado no Cabo", group: "Peitoral", focus: "Fibras Superiores", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras superiores (peitoral).", nivel: 2 },
    { name: "Crossover de Baixo para Cima", group: "Peitoral", focus: "Fibras Superiores", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras superiores (peitoral).", nivel: 2 },
    { name: "Flexão Declinada (Pés elevados)", group: "Peitoral", focus: "Fibras Superiores", equip: "Peso_Corporal", desc: "Pés no banco (foco parte superior).", nivel: 2 },
    { name: "Pike Push-up / Flexão Hindú", group: "Peitoral", focus: "Fibras Superiores", equip: "Peso_Corporal", desc: "Trabalho focado em fibras superiores (peitoral).", nivel: 2 },
    { name: "Supino Reto na Máquina", group: "Peitoral", focus: "Fibras Médias", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras médias (peitoral).", nivel: 1 },
    { name: "Supino Reto com Barra", group: "Peitoral", focus: "Fibras Médias", equip: "Barras_Anilhas", desc: "Construtor primário da espessura do peitoral.", nivel: 2 },
    { name: "Supino Reto com Halteres", group: "Peitoral", focus: "Fibras Médias", equip: "Pesos_Livres", desc: "Permite maior amplitude na porção média.", nivel: 2 },
    { name: "Crucifixo Reto na Máquina (Peck Deck)", group: "Peitoral", focus: "Fibras Médias", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras médias (peitoral).", nivel: 1 },
    { name: "Crucifixo Reto com Halteres", group: "Peitoral", focus: "Fibras Médias", equip: "Pesos_Livres", desc: "Alongamento e contração do miolo.", nivel: 2 },
    { name: "Crossover Polia Média", group: "Peitoral", focus: "Fibras Médias", equip: "Maquinas_Polias", desc: "Foco na linha média do peitoral.", nivel: 2 },
    { name: "Flexão de Braço Tradicional", group: "Peitoral", focus: "Fibras Médias", equip: "Peso_Corporal", desc: "Desenvolvimento global do peito.", nivel: 2 },
    { name: "Flexão Explosiva / Arqueiro", group: "Peitoral", focus: "Fibras Médias", equip: "Peso_Corporal", desc: "Trabalho focado em fibras médias (peitoral).", nivel: 3 },
    { name: "Supino Declinado na Máquina", group: "Peitoral", focus: "Fibras Inferiores", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras inferiores (peitoral).", nivel: 1 },
    { name: "Supino Declinado com Barra/Halteres", group: "Peitoral", focus: "Fibras Inferiores", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em fibras inferiores (peitoral).", nivel: 2 },
    { name: "Crossover de Cima para Baixo", group: "Peitoral", focus: "Fibras Inferiores", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras inferiores (peitoral).", nivel: 2 },
    { name: "Pullover com Halter", group: "Peitoral", focus: "Fibras Inferiores", equip: "Pesos_Livres", desc: "Expansão torácica dividindo peito e costas.", nivel: 2 },
    { name: "Pullover na Polia Alta", group: "Peitoral", focus: "Fibras Inferiores", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras inferiores (peitoral).", nivel: 2 },
    { name: "Paralelas (Dips com tronco à frente)", group: "Peitoral", focus: "Fibras Inferiores", equip: "Calistenia", desc: "Trabalho focado em fibras inferiores (peitoral).", nivel: 2 },
    { name: "Flexão Inclinada (Mãos no banco)", group: "Peitoral", focus: "Fibras Inferiores", equip: "Peso_Corporal", desc: "Trabalho focado em fibras inferiores (peitoral).", nivel: 2 },
    { name: "Puxada Alta na Máquina Articulada", group: "Costas", focus: "Latíssimo (Largura)", equip: "Maquinas_Polias", desc: "Trabalho focado em latíssimo (largura) (costas).", nivel: 1 },
    { name: "Puxada Alta na Polia (Frente/Supinada)", group: "Costas", focus: "Latíssimo (Largura)", equip: "Maquinas_Polias", desc: "Trabalho focado em latíssimo (largura) (costas).", nivel: 2 },
    { name: "Pulldown no Cabo", group: "Costas", focus: "Latíssimo (Largura)", equip: "Maquinas_Polias", desc: "Desativa o bíceps e foca 100% no grande dorsal.", nivel: 2 },
    { name: "Barra Fixa (Pull-up / Chin-up)", group: "Costas", focus: "Latíssimo (Largura)", equip: "Calistenia", desc: "Trabalho focado em latíssimo (largura) (costas).", nivel: 2 },
    { name: "Barra Fixa Isométrica", group: "Costas", focus: "Latíssimo (Largura)", equip: "Calistenia", desc: "Trabalho focado em latíssimo (largura) (costas).", nivel: 2 },
    { name: "Remada na Porta/Lençol (Foco expansão)", group: "Costas", focus: "Latíssimo (Largura)", equip: "Peso_Corporal", desc: "Trabalho focado em latíssimo (largura) (costas).", nivel: 2 },
    { name: "Remada na Máquina Apoiada no Peito", group: "Costas", focus: "Romboides/Miolo (Espessura)", equip: "Maquinas_Polias", desc: "Trabalho focado em romboides/miolo (espessura) (costas).", nivel: 1 },
    { name: "Remada Baixa com Triângulo (Polia)", group: "Costas", focus: "Romboides/Miolo (Espessura)", equip: "Maquinas_Polias", desc: "Trabalho focado em romboides/miolo (espessura) (costas).", nivel: 2 },
    { name: "Remada Curvada Livre (Barra)", group: "Costas", focus: "Romboides/Miolo (Espessura)", equip: "Barras_Anilhas", desc: "Trabalho focado em romboides/miolo (espessura) (costas).", nivel: 2 },
    { name: "Remada Cavalinho", group: "Costas", focus: "Romboides/Miolo (Espessura)", equip: "Barras_Anilhas", desc: "Trabalho focado em romboides/miolo (espessura) (costas).", nivel: 2 },
    { name: "Remada Unilateral (Serrote)", group: "Costas", focus: "Romboides/Miolo (Espessura)", equip: "Pesos_Livres", desc: "Trabalho unilateral de espessura.", nivel: 2 },
    { name: "Remada Invertida (Australian Pull-up)", group: "Costas", focus: "Romboides/Miolo (Espessura)", equip: "Calistenia", desc: "Trabalho focado em romboides/miolo (espessura) (costas).", nivel: 2 },
    { name: "Encolhimento na Máquina Smith", group: "Costas", focus: "Trapézio Superior", equip: "Maquinas_Polias", desc: "Trabalho focado em trapézio superior (costas).", nivel: 1 },
    { name: "Encolhimento com Barra/Halteres", group: "Costas", focus: "Trapézio Superior", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em trapézio superior (costas).", nivel: 2 },
    { name: "Remada Alta no Cabo", group: "Costas", focus: "Trapézio Superior", equip: "Maquinas_Polias", desc: "Movimento híbrido: lateral do ombro e trapézio.", nivel: 2 },
    { name: "Extensão de Lombar no Banco Romano", group: "Costas", focus: "Eretores da Espinha (Lombar)", equip: "Maquinas_Polias", desc: "Trabalho focado em eretores da espinha (lombar) (costas).", nivel: 1 },
    { name: "Levantamento Terra (Conventional/Sumô)", group: "Costas", focus: "Eretores da Espinha (Lombar)", equip: "Barras_Anilhas", desc: "Trabalho focado em eretores da espinha (lombar) (costas).", nivel: 2 },
    { name: "Superman Solo", group: "Costas", focus: "Eretores da Espinha (Lombar)", equip: "Peso_Corporal", desc: "Trabalho focado em eretores da espinha (lombar) (costas).", nivel: 2 },
    { name: "Desenvolvimento na Máquina", group: "Ombros", focus: "Deltoide Anterior", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide anterior (ombros).", nivel: 1 },
    { name: "Desenvolvimento Militar (Barra)", group: "Ombros", focus: "Deltoide Anterior", equip: "Barras_Anilhas", desc: "Trabalho focado em deltoide anterior (ombros).", nivel: 2 },
    { name: "Desenvolvimento com Halteres", group: "Ombros", focus: "Deltoide Anterior", equip: "Pesos_Livres", desc: "Trabalho focado em deltoide anterior (ombros).", nivel: 2 },
    { name: "Elevação Frontal (Anilha/Cabo)", group: "Ombros", focus: "Deltoide Anterior", equip: "Pesos_Livres, Maquinas_Polias", desc: "Trabalho focado em deltoide anterior (ombros).", nivel: 2 },
    { name: "Elevação Lateral na Máquina", group: "Ombros", focus: "Deltoide Lateral", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide lateral (ombros).", nivel: 1 },
    { name: "Elevação Lateral na Polia Baixa", group: "Ombros", focus: "Deltoide Lateral", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide lateral (ombros).", nivel: 2 },
    { name: "Elevação Lateral com Halteres", group: "Ombros", focus: "Deltoide Lateral", equip: "Pesos_Livres", desc: "Trabalho focado em deltoide lateral (ombros).", nivel: 2 },
    { name: "Remada Alta (Pegada Aberta)", group: "Ombros", focus: "Deltoide Lateral", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em deltoide lateral (ombros).", nivel: 2 },
    { name: "Elevação Lateral Isométrica no Batente", group: "Ombros", focus: "Deltoide Lateral", equip: "Peso_Corporal", desc: "Trabalho focado em deltoide lateral (ombros).", nivel: 2 },
    { name: "Crucifixo Inverso na Máquina", group: "Ombros", focus: "Deltoide Posterior", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide posterior (ombros).", nivel: 1 },
    { name: "Face Pull na Polia Alta", group: "Ombros", focus: "Deltoide Posterior", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide posterior (ombros).", nivel: 2 },
    { name: "Crucifixo Inverso Curvado com Halteres", group: "Ombros", focus: "Deltoide Posterior", equip: "Pesos_Livres", desc: "Trabalho focado em deltoide posterior (ombros).", nivel: 2 },
    { name: "Remada Invertida (Cotovelos abertos)", group: "Ombros", focus: "Deltoide Posterior", equip: "Calistenia", desc: "Trabalho focado em deltoide posterior (ombros).", nivel: 2 },
    { name: "Rosca Máquina", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Maquinas_Polias", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 1 },
    { name: "Rosca Scott (Máquina/Barra)", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Barras_Anilhas, Maquinas_Polias", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 1 },
    { name: "Rosca Direta na Polia Baixa", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Maquinas_Polias", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 2 },
    { name: "Rosca Direta (Barra Reta/W)", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Barras_Anilhas", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 2 },
    { name: "Rosca Alternada / Inclinada", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Pesos_Livres", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 2 },
    { name: "Rosca Concentrada", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Pesos_Livres", desc: "Pico de contração com braço estabilizado.", nivel: 2 },
    { name: "Chin-up Fechado", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Calistenia", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 2 },
    { name: "Rosca Isométrica (Toalha/Cinto)", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Funcional_Esportivo", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 2 },
    { name: "Rosca Martelo (Halteres/Corda)", group: "Bíceps", focus: "Braquial/Antebraço", equip: "Pesos_Livres, Maquinas_Polias", desc: "Trabalho focado em braquial/antebraço (bíceps).", nivel: 2 },
    { name: "Rosca Inversa no Cabo/Barra", group: "Bíceps", focus: "Braquial/Antebraço", equip: "Barras_Anilhas, Maquinas_Polias", desc: "Trabalho focado em braquial/antebraço (bíceps).", nivel: 2 },
    { name: "Rosca de Punho (Flexão/Extensão)", group: "Antebraço", focus: "Flexores/Extensores", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em flexores/extensores (antebraço).", nivel: 2 },
    { name: "Tríceps Francês (Halter/Cabo)", group: "Tríceps", focus: "Cabeça Longa", equip: "Pesos_Livres, Maquinas_Polias", desc: "Trabalho focado em cabeça longa (tríceps).", nivel: 2 },
    { name: "Tríceps Testa (Barra W)", group: "Tríceps", focus: "Cabeça Longa", equip: "Barras_Anilhas", desc: "Trabalho focado em cabeça longa (tríceps).", nivel: 2 },
    { name: "Tríceps Pulley (Barra Reta/V)", group: "Tríceps", focus: "Lateral/Medial", equip: "Maquinas_Polias", desc: "Trabalho focado em lateral/medial (tríceps).", nivel: 2 },
    { name: "Tríceps Corda", group: "Tríceps", focus: "Lateral/Medial", equip: "Maquinas_Polias", desc: "Abra a corda no final para pico de contração lateral.", nivel: 2 },
    { name: "Tríceps Máquina / Dip Machine", group: "Tríceps", focus: "Lateral/Medial", equip: "Maquinas_Polias", desc: "Trabalho focado em lateral/medial (tríceps).", nivel: 1 },
    { name: "Tríceps Coice (Kickback) Halter/Cabo", group: "Tríceps", focus: "Lateral/Medial", equip: "Pesos_Livres, Maquinas_Polias", desc: "Trabalho focado em lateral/medial (tríceps).", nivel: 2 },
    { name: "Supino Pegada Fechada", group: "Tríceps", focus: "Todas", equip: "Barras_Anilhas", desc: "Trabalho focado em todas (tríceps).", nivel: 2 },
    { name: "Mergulho nas Paralelas / Banco", group: "Tríceps", focus: "Todas", equip: "Calistenia", desc: "Trabalho focado em todas (tríceps).", nivel: 2 },
    { name: "Flexão Diamante", group: "Tríceps", focus: "Todas", equip: "Peso_Corporal", desc: "Ativação intensa do tríceps.", nivel: 2 },
    { name: "Abdominal na Máquina", group: "Core", focus: "Superior", equip: "Maquinas_Polias", desc: "Trabalho focado em superior (core).", nivel: 1 },
    { name: "Abdominal na Polia Alta (Cable Crunch)", group: "Core", focus: "Superior", equip: "Maquinas_Polias", desc: "Trabalho focado em superior (core).", nivel: 2 },
    { name: "Abdominal Supra (Solo/Carga)", group: "Core", focus: "Superior", equip: "Peso_Corporal, Pesos_Livres", desc: "Trabalho focado em superior (core).", nivel: 2 },
    { name: "Abdominal Canivete / V-Up", group: "Core", focus: "Superior", equip: "Peso_Corporal", desc: "Trabalho focado em superior (core).", nivel: 3 },
    { name: "Elevação de Joelhos na Paralela", group: "Core", focus: "Inferior", equip: "Calistenia, Maquinas_Polias", desc: "Trabalho focado em inferior (core).", nivel: 1 },
    { name: "Elevação de Pernas Pendurado (Toes to Bar)", group: "Core", focus: "Inferior", equip: "Calistenia", desc: "Trabalho focado em inferior (core).", nivel: 2 },
    { name: "Abdominal Infra no Solo (Reverse Crunch)", group: "Core", focus: "Inferior", equip: "Peso_Corporal", desc: "Trabalho focado em inferior (core).", nivel: 2 },
    { name: "Russian Twist (Com anilha ou livre)", group: "Core", focus: "Oblíquos / Rotação", equip: "Peso_Corporal", desc: "Trabalho focado em oblíquos / rotação (core).", nivel: 2 },
    { name: "Toque no Calcanhar", group: "Core", focus: "Oblíquos / Rotação", equip: "Peso_Corporal", desc: "Flexão lateral blindando o tronco.", nivel: 2 },
    { name: "Abdominal Bicicleta", group: "Core", focus: "Oblíquos / Rotação", equip: "Peso_Corporal", desc: "Rotação contínua ativando laterais.", nivel: 2 },
    { name: "Prancha Isométrica (Frontal/Lateral)", group: "Core", focus: "Estabilização/Anti-extensão", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core).", nivel: 2 },
    { name: "Prancha Sobe-Desce", group: "Core", focus: "Estabilização/Anti-extensão", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core).", nivel: 2 },
    { name: "Percevejo (Dead Bugs)", group: "Core", focus: "Estabilização/Anti-extensão", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core).", nivel: 2 },
    { name: "Hollow Body Hold", group: "Core", focus: "Estabilização/Anti-extensão", equip: "Peso_Corporal", desc: "Estabilidade avançada do core profundo.", nivel: 2 },
    { name: "Roda Abdominal (Ab Wheel)", group: "Core", focus: "Estabilização/Anti-extensão", equip: "Funcional_Esportivo", desc: "Trabalho focado em estabilização/anti-extensão (core).", nivel: 2 },
    { name: "Cócoras Profundas", group: "Mobilidade", focus: "Pernas/Quadril", equip: "Peso_Corporal", desc: "Trabalho focado em pernas/quadril (mobilidade).", nivel: 2 },
    { name: "Mobilidade 90/90", group: "Mobilidade", focus: "Pernas/Quadril", equip: "Peso_Corporal", desc: "Trabalho focado em pernas/quadril (mobilidade).", nivel: 2 },
    { name: "Agachamento Lateral (Cossack)", group: "Mobilidade", focus: "Pernas/Quadril", equip: "Peso_Corporal", desc: "Trabalho focado em pernas/quadril (mobilidade).", nivel: 2 },
    { name: "Maior Alongamento do Mundo", group: "Mobilidade", focus: "Pernas/Quadril", equip: "Peso_Corporal", desc: "Trabalho focado em pernas/quadril (mobilidade).", nivel: 2 },
    { name: "Dorsiflexão de Tornozelo na Parede", group: "Mobilidade", focus: "Tornozelos", equip: "Peso_Corporal", desc: "Trabalho focado em tornozelos (mobilidade).", nivel: 2 },
    { name: "Gato-Vaca (Cat-Cow)", group: "Mobilidade", focus: "Costas/Ombros", equip: "Peso_Corporal", desc: "Trabalho focado em costas/ombros (mobilidade).", nivel: 2 },
    { name: "Rotação Torácica em 4 apoios", group: "Mobilidade", focus: "Costas/Ombros", equip: "Peso_Corporal", desc: "Trabalho focado em costas/ombros (mobilidade).", nivel: 2 },
    { name: "Deslocamento de Ombros (Bastão)", group: "Mobilidade", focus: "Costas/Ombros", equip: "Funcional_Esportivo", desc: "Trabalho focado em costas/ombros (mobilidade).", nivel: 2 },
    { name: "Pular Corda", group: "Cardio/HIIT", focus: "Motor Aeróbico", equip: "Funcional_Esportivo", desc: "Trabalho focado em motor aeróbico (cardio/hiit).", nivel: 2 },
    { name: "Polichinelos (Jumping Jacks)", group: "Cardio/HIIT", focus: "Motor Aeróbico", equip: "Peso_Corporal", desc: "Trabalho focado em motor aeróbico (cardio/hiit).", nivel: 3 },
    { name: "Corrida Estacionária", group: "Cardio/HIIT", focus: "Motor Aeróbico", equip: "Peso_Corporal", desc: "Trabalho focado em motor aeróbico (cardio/hiit).", nivel: 2 },
    { name: "Corrida Calcanhar no Glúteo", group: "Cardio/HIIT", focus: "Motor Aeróbico", equip: "Peso_Corporal", desc: "Trabalho focado em motor aeróbico (cardio/hiit).", nivel: 2 },
    { name: "Burpees", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", equip: "Peso_Corporal", desc: "Trabalho focado em resistência anaeróbica (cardio/hiit).", nivel: 2 },
    { name: "Sprawl (Meio Burpee)", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", equip: "Peso_Corporal", desc: "Trabalho focado em resistência anaeróbica (cardio/hiit).", nivel: 2 },
    { name: "Escalador (Mountain Climber)", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", equip: "Peso_Corporal", desc: "Cardio e estabilidade do transverso.", nivel: 2 },
    { name: "Puxada Alta com Pegada Neutra (Triângulo/Paralelas)", group: "Costas", focus: "Latíssimo (Largura)", equip: "Maquinas_Polias", desc: "Trabalho focado em latíssimo (largura) (costas).", nivel: 2 },
    { name: "Straight-Arm Pulldown (Pulldown braços estendidos)", group: "Costas", focus: "Latíssimo (Largura)", equip: "Maquinas_Polias", desc: "Trabalho focado em latíssimo (largura) (costas).", nivel: 2 },
    { name: "Desenvolvimento Arnold (Arnold Press)", group: "Ombros", focus: "Deltoide Anterior", equip: "Pesos_Livres", desc: "Trabalho focado em deltoide anterior (ombros).", nivel: 2 },
    { name: "Elevação em 'Y' na Polia Baixa", group: "Ombros", focus: "Deltoide Lateral", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide lateral (ombros).", nivel: 2 },
    { name: "Face Pull com Rotação Externa", group: "Ombros", focus: "Deltoide Posterior", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide posterior (ombros).", nivel: 2 },
    { name: "Rosca Spider", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Pesos_Livres", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 2 },
    { name: "Rosca Bayesian", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Maquinas_Polias", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 2 },
    { name: "Extensão Cruzada de Tríceps (Katana Extensions)", group: "Tríceps", focus: "Lateral/Medial", equip: "Maquinas_Polias", desc: "Trabalho focado em lateral/medial (tríceps).", nivel: 2 },
    { name: "Prancha Frontal com Toques no Ombro (Shoulder Taps)", group: "Core", focus: "Estabilização/Anti-extensão", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core).", nivel: 2 },
    { name: "Bear Crawl (Caminhada do Urso)", group: "Core", focus: "Estabilização/Anti-extensão", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core).", nivel: 3 },
    { name: "Elevação Pélvica (Barra, Máquina, Halter, Unilateral)", group: "Pernas", focus: "Glúteo Máximo", equip: "Barras_Anilhas, Pesos_Livres, Maquinas_Polias", desc: "Trabalho focado em glúteo máximo (pernas).", nivel: 1 },
    { name: "Ponte de Glúteos (Anilha no quadril)", group: "Pernas", focus: "Glúteo Máximo", equip: "Barras_Anilhas, Pesos_Livres", desc: "Variação de solo para isolamento do glúteo.", nivel: 2 },
    { name: "Agachamento Búlgaro com tronco inclinado à frente (Halteres/Smith)", group: "Pernas", focus: "Glúteo Máximo", equip: "Pesos_Livres, Maquinas_Polias", desc: "Trabalho focado em glúteo máximo (pernas).", nivel: 3 },
    { name: "Extensão de Quadril na Polia (Cabo)", group: "Pernas", focus: "Glúteo Máximo", equip: "Maquinas_Polias", desc: "Trabalho focado em glúteo máximo (pernas).", nivel: 2 },
    { name: "Coice na Máquina", group: "Pernas", focus: "Glúteo Máximo", equip: "Maquinas_Polias", desc: "Isolamento pesado de glúteo.", nivel: 1 },
    { name: "Pull-through na polia baixa (Corda)", group: "Pernas", focus: "Glúteo Máximo", equip: "Maquinas_Polias", desc: "Trabalho focado em glúteo máximo (pernas).", nivel: 2 },
    { name: "Cadeira Abdutora", group: "Pernas", focus: "Glúteo Médio/Mínimo", equip: "Maquinas_Polias", desc: "Trabalha a lateral do quadril (glúteos médio).", nivel: 1 },
    { name: "Abdução em pé na Polia", group: "Pernas", focus: "Glúteo Médio/Mínimo", equip: "Maquinas_Polias", desc: "Trabalho focado em glúteo médio/mínimo (pernas).", nivel: 2 },
    { name: "Elevação Lateral deitada (com Caneleira ou Halter apoiado na coxa)", group: "Pernas", focus: "Glúteo Médio/Mínimo", equip: "Pesos_Livres", desc: "Trabalho focado em glúteo médio/mínimo (pernas).", nivel: 2 },
    { name: "Passada Lateral com elástico/band", group: "Pernas", focus: "Glúteo Médio/Mínimo", equip: "Funcional_Esportivo", desc: "Trabalho focado em glúteo médio/mínimo (pernas).", nivel: 2 },
    { name: "Agachamento Livre (Barra nas costas)", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Barras_Anilhas", desc: "Trabalho focado em quadríceps (vastos) (pernas).", nivel: 2 },
    { name: "Agachamento Frontal (Barra)", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Barras_Anilhas", desc: "Desloca o centro de gravidade para os vastos.", nivel: 2 },
    { name: "Agachamento Goblet (Halter/Anilha no peito)", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Pesos_Livres", desc: "Trabalho focado em quadríceps (vastos) (pernas).", nivel: 2 },
    { name: "Leg Press 45º", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Maquinas_Polias", desc: "Trabalho focado em quadríceps (vastos) (pernas).", nivel: 1 },
    { name: "Leg Press Horizontal", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Maquinas_Polias", desc: "Trabalho focado em quadríceps (vastos) (pernas).", nivel: 1 },
    { name: "Hack Machine", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Maquinas_Polias", desc: "Trabalho focado em quadríceps (vastos) (pernas).", nivel: 1 },
    { name: "Pendulum Squat", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Maquinas_Polias", desc: "Máquina avançada de isolamento de quadríceps.", nivel: 1 },
    { name: "Agachamento no Smith (pés projetados à frente)", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Maquinas_Polias", desc: "Trabalho focado em quadríceps (vastos) (pernas).", nivel: 1 },
    { name: "Afundo/Passada (Halteres/Barra)", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em quadríceps (vastos) (pernas).", nivel: 2 },
    { name: "Step-up na caixa (Halteres)", group: "Pernas", focus: "Quadríceps (Vastos)", equip: "Pesos_Livres, Funcional_Esportivo", desc: "Trabalho focado em quadríceps (vastos) (pernas).", nivel: 2 },
    { name: "Cadeira Extensora (Máquina)", group: "Pernas", focus: "Quadríceps (Reto Femoral)", equip: "Maquinas_Polias", desc: "Trabalho focado em quadríceps (reto femoral) (pernas).", nivel: 1 },
    { name: "Extensão de joelho unilateral na Polia (Caneleira conectada ao cabo)", group: "Pernas", focus: "Quadríceps (Reto Femoral)", equip: "Maquinas_Polias", desc: "Trabalho focado em quadríceps (reto femoral) (pernas).", nivel: 2 },
    { name: "Stiff (Barra/Halteres)", group: "Pernas", focus: "Isquiotibiais (Porção Alongada)", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em isquiotibiais (porção alongada) (pernas).", nivel: 2 },
    { name: "Levantamento Terra Romeno/RDL (Barra/Halteres)", group: "Pernas", focus: "Isquiotibiais (Porção Alongada)", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em isquiotibiais (porção alongada) (pernas).", nivel: 2 },
    { name: "Cadeira Flexora (Sentado)", group: "Pernas", focus: "Isquiotibiais (Porção Encurtada)", equip: "Maquinas_Polias", desc: "Trabalho focado em isquiotibiais (porção encurtada) (pernas).", nivel: 1 },
    { name: "Mesa Flexora (Deitado)", group: "Pernas", focus: "Isquiotibiais (Porção Encurtada)", equip: "Maquinas_Polias", desc: "Trabalho focado em isquiotibiais (porção encurtada) (pernas).", nivel: 1 },
    { name: "Flexora em pé (Máquina/Polia unilateral)", group: "Pernas", focus: "Isquiotibiais (Porção Encurtada)", equip: "Maquinas_Polias", desc: "Trabalho focado em isquiotibiais (porção encurtada) (pernas).", nivel: 1 },
    { name: "Flexão de pernas deitado com um Halter preso entre os pés", group: "Pernas", focus: "Isquiotibiais (Porção Encurtada)", equip: "Pesos_Livres", desc: "Trabalho focado em isquiotibiais (porção encurtada) (pernas).", nivel: 2 },
    { name: "Cadeira Adutora (Máquina)", group: "Pernas", focus: "Adutores", equip: "Maquinas_Polias", desc: "Trabalho focado em adutores (pernas).", nivel: 1 },
    { name: "Adução em pé na Polia", group: "Pernas", focus: "Adutores", equip: "Maquinas_Polias", desc: "Trabalho focado em adutores (pernas).", nivel: 2 },
    { name: "Agachamento Sumô (Barra, Halter pesado ou Anilha pesada pendurada)", group: "Pernas", focus: "Adutores", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em adutores (pernas).", nivel: 2 },
    { name: "Elevação em pé na Máquina", group: "Pernas", focus: "Panturrilhas (Gastrocnêmios)", equip: "Maquinas_Polias", desc: "Trabalho focado em panturrilhas (gastrocnêmios) (pernas).", nivel: 1 },
    { name: "Elevação no Smith (com step)", group: "Pernas", focus: "Panturrilhas (Gastrocnêmios)", equip: "Maquinas_Polias", desc: "Trabalho focado em panturrilhas (gastrocnêmios) (pernas).", nivel: 1 },
    { name: "Elevação unilateral com Halter (no step)", group: "Pernas", focus: "Panturrilhas (Gastrocnêmios)", equip: "Pesos_Livres", desc: "Trabalho focado em panturrilhas (gastrocnêmios) (pernas).", nivel: 2 },
    { name: "Panturrilha no Leg Press 45º", group: "Pernas", focus: "Panturrilhas (Gastrocnêmios)", equip: "Maquinas_Polias", desc: "Trabalho focado em panturrilhas (gastrocnêmios) (pernas).", nivel: 1 },
    { name: "Panturrilha no Hack Machine", group: "Pernas", focus: "Panturrilhas (Gastrocnêmios)", equip: "Maquinas_Polias", desc: "Trabalho focado em panturrilhas (gastrocnêmios) (pernas).", nivel: 1 },
    { name: "Máquina de Gêmeos Sentado (com Anilhas)", group: "Pernas", focus: "Panturrilhas (Sóleo)", equip: "Maquinas_Polias", desc: "Trabalho focado em panturrilhas (sóleo) (pernas).", nivel: 1 },
    { name: "Flexão Dorsal na máquina específica", group: "Pernas", focus: "Tibial Anterior", equip: "Maquinas_Polias", desc: "Trabalho focado em tibial anterior (pernas).", nivel: 1 },
    { name: "Flexão Dorsal na Polia baixa", group: "Pernas", focus: "Tibial Anterior", equip: "Maquinas_Polias", desc: "Trabalho focado em tibial anterior (pernas).", nivel: 2 },
    { name: "Corrida com Elevação de Joelhos (High Knees)", group: "Cardio/HIIT", focus: "Motor Aeróbico", equip: "Peso_Corporal", desc: "Trabalho focado em motor aeróbico (cardio/hiit).", nivel: 2 },
    { name: "Polichinelo Cruzado (Seal Jacks)", group: "Cardio/HIIT", focus: "Motor Aeróbico", equip: "Peso_Corporal", desc: "Trabalho focado em motor aeróbico (cardio/hiit).", nivel: 1 },
    { name: "Shadow Boxing (Sombra com ou sem halteres leves)", group: "Cardio/HIIT", focus: "Motor Aeróbico", equip: "Peso_Corporal, Pesos_Livres", desc: "Trabalho focado em motor aeróbico (cardio/hiit).", nivel: 1 },
    { name: "Kettlebell Swing (Balanço com KB ou Halter)", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", equip: "Pesos_Livres", desc: "Trabalho focado em resistência anaeróbica (cardio/hiit).", nivel: 2 },
    { name: "Thrusters (Agachamento com Desenvolvimento)", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em resistência anaeróbica (cardio/hiit).", nivel: 3 },
    { name: "Salto Grupado (Tuck Jumps no lugar)", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", equip: "Peso_Corporal", desc: "Trabalho focado em resistência anaeróbica (cardio/hiit).", nivel: 3 },
    { name: "Perdigueiro (Bird-Dog)", group: "Costas", focus: "Eretores da Espinha (Lombar)", equip: "Peso_Corporal", desc: "Trabalho focado em eretores da espinha (lombar) (costas).", nivel: 1 },
    { name: "Extensão Lombar na Bola Suíça", group: "Costas", focus: "Eretores da Espinha (Lombar)", equip: "Funcional_Esportivo", desc: "Trabalho focado em eretores da espinha (lombar) (costas).", nivel: 2 },
    { name: "Hiperextensão Reversa (No banco ou solo)", group: "Costas", focus: "Eretores da Espinha (Lombar)", equip: "Peso_Corporal, Funcional_Esportivo", desc: "Trabalho focado em eretores da espinha (lombar) (costas).", nivel: 2 },
    { name: "Prancha Superman (Elevação de braço e perna opostos)", group: "Costas", focus: "Eretores da Espinha (Lombar)", equip: "Peso_Corporal", desc: "Trabalho focado em eretores da espinha (lombar) (costas).", nivel: 3 },
    { name: "Remada no Banco Inclinado com Halteres (Chest-Supported Row)", group: "Costas", focus: "Romboides/Miolo (Espessura)", equip: "Pesos_Livres", desc: "Trabalho focado em romboides/miolo (espessura) (costas).", nivel: 2 },
    { name: "Rosca Inclinada com Halteres (No banco a 45º)", group: "Bíceps", focus: "Cabeça Curta/Longa", equip: "Pesos_Livres", desc: "Trabalho focado em cabeça curta/longa (bíceps).", nivel: 2 },
    { name: "JM Press", group: "Tríceps", focus: "Todas", equip: "Barras_Anilhas", desc: "Trabalho focado em todas (tríceps).", nivel: 3 },
    { name: "Crucifixo Inverso Cruzado na Polia Alta", group: "Ombros", focus: "Deltoide Posterior", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide posterior (ombros).", nivel: 2 },
    { name: "Supino Fechado com Halteres (Squeeze Press / Hex Press)", group: "Peitoral", focus: "Fibras Médias", equip: "Pesos_Livres", desc: "Trabalho focado em fibras médias (peitoral).", nivel: 2 }
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
                { title: "Bloco 4 (Bi-set: Panturrilhas)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }, { name: "Máquina de Gêmeos Sentado (com Anilhas)", sets: 4, target: "15-20 rep" }] },
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
                { title: "Bloco 5 (Core)", exercises: [{ name: "Prancha Isométrica", sets: 3, target: "30 seg/lado" }] }
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
                { title: "Bloco 4 (Bi-set: Panturrilhas)", exercises: [{ name: "Panturrilha no Leg Press", sets: 4, target: "15-20 rep" }, { name: "Máquina de Gêmeos Sentado (com Anilhas)", sets: 4, target: "15-20 rep" }] },
                { title: "Bloco 5 (Core)", exercises: [{ name: "Abdominal Supra Solo", sets: 3, target: "15-20 rep" }] }
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
                { title: "Bloco 3 (Isoladores)", exercises: [{ name: "Elevação Lateral Halteres", sets: 4, target: "12-15 rep" }, { name: "Prancha Isométrica", sets: 3, target: "30 seg/lado" }] }
            ],
            'C': [
                { title: "Bloco 1 (Bi-set: Quadríceps)", exercises: [{ name: "Agachamento no Smith", sets: 4, target: "10-12 rep" }, { name: "Leg Press 45°", sets: 4, target: "10-12 rep" }] },
                { title: "Bloco 2 (Bi-set: Quadríceps + Panturrilha)", exercises: [{ name: "Cadeira Extensora", sets: 4, target: "10-12 rep" }, { name: "Máquina de Gêmeos Sentado (com Anilhas)", sets: 4, target: "15-20 rep" }] },
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
                { title: "Bloco 3 (Panturrilha)", exercises: [{ name: "Máquina de Gêmeos Sentado (com Anilhas)", sets: 4, target: "15-20 rep" }] }
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
                { title: "Bloco 3 (Core Dinâmico)", exercises: [{ name: "Russian Twist", sets: 3, target: "20 rep" }, { name: "Prancha Isométrica", sets: 3, target: "30 seg/lado" }] },
                { title: "Bloco 4 (Resistência Anaeróbica)", exercises: [{ name: "Kettlebell Swing (Balanço com KB ou Halter)", sets: 4, target: "40 seg" }] }
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
                { title: "Bloco 3 (Condicionamento Tático)", exercises: [{ name: "Kettlebell Swing (Balanço com KB ou Halter)", sets: 4, target: "1 min" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1 min" }] }
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
            'A': [{ title: "Treino Society", exercises: [{ name: "Agachamento com Salto", sets: 4, target: "20 rep" }, { name: "Afundo / Avanço", sets: 4, target: "15 rep/lado" }, { name: "Russian Twist", sets: 4, target: "20 rep" }, { name: "Kettlebell Swing (Balanço com KB ou Halter)", sets: 4, target: "45 seg" }] }],
            'B': [{ title: "Treino Society", exercises: [{ name: "Supino Reto Halteres", sets: 4, target: "10-12 rep" }, { name: "Remada Curvada Livre", sets: 4, target: "10-12 rep" }, { name: "Abdominal Bicicleta", sets: 4, target: "30 rep" }, { name: "Sprawl (Meio Burpee)", sets: 4, target: "1 min" }] }],
            'C': [{ title: "Treino Society", exercises: [{ name: "Agachamento Búlgaro", sets: 4, target: "12 rep/lado" }, { name: "Stiff (Terra Romeno)", sets: 4, target: "10-12 rep" }, { name: "Panturrilha no Leg Press", sets: 4, target: "20 rep" }, { name: "Escalador (Mountain Climber)", sets: 4, target: "1 min" }] }]
        },
        avancado: {
            'A': [{ title: "Treino Society", exercises: [{ name: "Agachamento Livre", sets: 5, target: "6-8 rep" }, { name: "Pistol Squat", sets: 4, target: "Máx/lado" }, { name: "Roda Abdominal", sets: 4, target: "15 rep" }, { name: "Burpees", sets: 4, target: "20 rep" }] }],
            'B': [{ title: "Treino Society", exercises: [{ name: "Supino Reto Barra", sets: 5, target: "6-8 rep" }, { name: "Barra Fixa Supinada (Chin-up)", sets: 4, target: "Falha" }, { name: "Hollow Body Hold", sets: 4, target: "1 min" }, { name: "Kettlebell Swing (Balanço com KB ou Halter)", sets: 4, target: "1 min" }] }],
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