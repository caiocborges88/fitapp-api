// 2. DICIONÁRIO ESTRATÉGICO: SUBNÍVEIS E BIOMECÂNICA (ATUALIZADO V2)
const dictionaryData = [
    { name: "Supino Inclinado na Máquina", group: "Peitoral", focus: "Fibras Superiores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras superiores (peitoral)." },
    { name: "Supino Inclinado com Barra", group: "Peitoral", focus: "Fibras Superiores", env: "Academia", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em fibras superiores (peitoral)." },
    { name: "Supino Inclinado com Halteres", group: "Peitoral", focus: "Fibras Superiores", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Foco nas fibras superiores (porção clavicular)." },
    { name: "Crucifixo Inclinado com Halteres", group: "Peitoral", focus: "Fibras Superiores", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Trabalho focado em fibras superiores (peitoral)." },
    { name: "Crucifixo Inclinado no Cabo", group: "Peitoral", focus: "Fibras Superiores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras superiores (peitoral)." },
    { name: "Crossover de Baixo para Cima", group: "Peitoral", focus: "Fibras Superiores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras superiores (peitoral)." },
    { name: "Flexão Declinada (Pés elevados)", group: "Peitoral", focus: "Fibras Superiores", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Pés no banco (foco parte superior)." },
    { name: "Pike Push-up / Flexão Hindú", group: "Peitoral", focus: "Fibras Superiores", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em fibras superiores (peitoral)." },
    { name: "Supino Reto na Máquina", group: "Peitoral", focus: "Fibras Médias", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras médias (peitoral)." },
    { name: "Supino Reto com Barra", group: "Peitoral", focus: "Fibras Médias", env: "Academia", equip: "Barras_Anilhas, Pesos_Livres", desc: "Construtor primário da espessura do peitoral." },
    { name: "Supino Reto com Halteres", group: "Peitoral", focus: "Fibras Médias", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Permite maior amplitude na porção média." },
    { name: "Crucifixo Reto na Máquina (Peck Deck)", group: "Peitoral", focus: "Fibras Médias", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras médias (peitoral)." },
    { name: "Crucifixo Reto com Halteres", group: "Peitoral", focus: "Fibras Médias", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Alongamento e contração do miolo." },
    { name: "Crossover Polia Média", group: "Peitoral", focus: "Fibras Médias", env: "Academia", equip: "Maquinas_Polias", desc: "Foco na linha média do peitoral." },
    { name: "Flexão de Braço Tradicional", group: "Peitoral", focus: "Fibras Médias", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Desenvolvimento global do peito." },
    { name: "Flexão Explosiva / Arqueiro", group: "Peitoral", focus: "Fibras Médias", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em fibras médias (peitoral)." },
    { name: "Supino Declinado na Máquina", group: "Peitoral", focus: "Fibras Inferiores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras inferiores (peitoral)." },
    { name: "Supino Declinado com Barra/Halteres", group: "Peitoral", focus: "Fibras Inferiores", env: "Academia", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em fibras inferiores (peitoral)." },
    { name: "Crossover de Cima para Baixo", group: "Peitoral", focus: "Fibras Inferiores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras inferiores (peitoral)." },
    { name: "Pullover com Halter", group: "Peitoral", focus: "Fibras Inferiores", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Expansão torácica dividindo peito e costas." },
    { name: "Pullover na Polia Alta", group: "Peitoral", focus: "Fibras Inferiores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em fibras inferiores (peitoral)." },
    { name: "Paralelas (Dips com tronco à frente)", group: "Peitoral", focus: "Fibras Inferiores", env: "Academia, Ar_Livre", equip: "Calistenia", desc: "Trabalho focado em fibras inferiores (peitoral)." },
    { name: "Flexão Inclinada (Mãos no banco)", group: "Peitoral", focus: "Fibras Inferiores", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em fibras inferiores (peitoral)." },
    { name: "Puxada Alta na Máquina Articulada", group: "Costas", focus: "Latíssimo (Largura)", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em latíssimo (largura) (costas)." },
    { name: "Puxada Alta na Polia (Frente/Supinada)", group: "Costas", focus: "Latíssimo (Largura)", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em latíssimo (largura) (costas)." },
    { name: "Pulldown no Cabo", group: "Costas", focus: "Latíssimo (Largura)", env: "Academia", equip: "Maquinas_Polias", desc: "Desativa o bíceps e foca 100% no grande dorsal." },
    { name: "Barra Fixa (Pull-up / Chin-up)", group: "Costas", focus: "Latíssimo (Largura)", env: "Academia, Ar_Livre", equip: "Calistenia", desc: "Trabalho focado em latíssimo (largura) (costas)." },
    { name: "Barra Fixa Isométrica", group: "Costas", focus: "Latíssimo (Largura)", env: "Ar_Livre", equip: "Calistenia", desc: "Trabalho focado em latíssimo (largura) (costas)." },
    { name: "Remada na Porta/Lençol (Foco expansão)", group: "Costas", focus: "Latíssimo (Largura)", env: "Casa", equip: "Acessorio_Caseiro, Peso_Corporal", desc: "Trabalho focado em latíssimo (largura) (costas)." },
    { name: "Remada na Máquina Apoiada no Peito", group: "Costas", focus: "Romboides/Miolo (Espessura)", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em romboides/miolo (espessura) (costas)." },
    { name: "Remada Baixa com Triângulo (Polia)", group: "Costas", focus: "Romboides/Miolo (Espessura)", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em romboides/miolo (espessura) (costas)." },
    { name: "Remada Curvada Livre (Barra)", group: "Costas", focus: "Romboides/Miolo (Espessura)", env: "Academia", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em romboides/miolo (espessura) (costas)." },
    { name: "Remada Cavalinho", group: "Costas", focus: "Romboides/Miolo (Espessura)", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em romboides/miolo (espessura) (costas)." },
    { name: "Remada Unilateral (Serrote)", group: "Costas", focus: "Romboides/Miolo (Espessura)", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Trabalho unilateral de espessura." },
    { name: "Remada Invertida (Australian Pull-up)", group: "Costas", focus: "Romboides/Miolo (Espessura)", env: "Ar_Livre", equip: "Calistenia", desc: "Trabalho focado em romboides/miolo (espessura) (costas)." },
    { name: "Contração de Costas Isométrica", group: "Costas", focus: "Romboides/Miolo (Espessura)", env: "Casa", equip: "Peso_Corporal", desc: "Trabalho focado em romboides/miolo (espessura) (costas)." },
    { name: "Encolhimento na Máquina Smith", group: "Costas", focus: "Trapézio Superior", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em trapézio superior (costas)." },
    { name: "Encolhimento com Barra/Halteres", group: "Costas", focus: "Trapézio Superior", env: "Academia, Casa", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em trapézio superior (costas)." },
    { name: "Remada Alta no Cabo", group: "Costas", focus: "Trapézio Superior", env: "Academia", equip: "Maquinas_Polias", desc: "Movimento híbrido: lateral do ombro e trapézio." },
    { name: "Extensão de Lombar no Banco Romano", group: "Costas", focus: "Eretores da Espinha (Lombar)", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em eretores da espinha (lombar) (costas)." },
    { name: "Levantamento Terra (Conventional/Sumô)", group: "Costas", focus: "Eretores da Espinha (Lombar)", env: "Academia", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em eretores da espinha (lombar) (costas)." },
    { name: "Bom-Dia (Good Morning)", group: "Costas", focus: "Eretores da Espinha (Lombar)", env: "Academia", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em eretores da espinha (lombar) (costas)." },
    { name: "Superman Solo", group: "Costas", focus: "Eretores da Espinha (Lombar)", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em eretores da espinha (lombar) (costas)." },
    { name: "Desenvolvimento na Máquina", group: "Ombros", focus: "Deltoide Anterior", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide anterior (ombros)." },
    { name: "Desenvolvimento Militar (Barra)", group: "Ombros", focus: "Deltoide Anterior", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em deltoide anterior (ombros)." },
    { name: "Desenvolvimento com Halteres", group: "Ombros", focus: "Deltoide Anterior", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Trabalho focado em deltoide anterior (ombros)." },
    { name: "Elevação Frontal (Anilha/Cabo)", group: "Ombros", focus: "Deltoide Anterior", env: "Academia, Casa", equip: "Maquinas_Polias, Pesos_Livres", desc: "Trabalho focado em deltoide anterior (ombros)." },
    { name: "Handstand Push-up (HSPU)", group: "Ombros", focus: "Deltoide Anterior", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em deltoide anterior (ombros)." },
    { name: "Elevação Lateral na Máquina", group: "Ombros", focus: "Deltoide Lateral", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide lateral (ombros)." },
    { name: "Elevação Lateral na Polia Baixa", group: "Ombros", focus: "Deltoide Lateral", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide lateral (ombros)." },
    { name: "Elevação Lateral com Halteres", group: "Ombros", focus: "Deltoide Lateral", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Trabalho focado em deltoide lateral (ombros)." },
    { name: "Remada Alta (Pegada Aberta)", group: "Ombros", focus: "Deltoide Lateral", env: "Academia, Casa", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em deltoide lateral (ombros)." },
    { name: "Elevação Lateral Isométrica no Batente", group: "Ombros", focus: "Deltoide Lateral", env: "Casa", equip: "Peso_Corporal", desc: "Trabalho focado em deltoide lateral (ombros)." },
    { name: "Crucifixo Inverso na Máquina", group: "Ombros", focus: "Deltoide Posterior", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide posterior (ombros)." },
    { name: "Face Pull na Polia Alta", group: "Ombros", focus: "Deltoide Posterior", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide posterior (ombros)." },
    { name: "Crucifixo Inverso Curvado com Halteres", group: "Ombros", focus: "Deltoide Posterior", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Trabalho focado em deltoide posterior (ombros)." },
    { name: "Remada Invertida (Cotovelos abertos)", group: "Ombros", focus: "Deltoide Posterior", env: "Ar_Livre", equip: "Calistenia", desc: "Trabalho focado em deltoide posterior (ombros)." },
    { name: "Rosca Máquina", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Rosca Scott (Máquina/Barra)", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Academia", equip: "Barras_Anilhas, Maquinas_Polias", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Rosca Direta na Polia Baixa", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Rosca Direta (Barra Reta/W)", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Rosca Alternada / Inclinada", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Rosca Concentrada", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Pico de contração com braço estabilizado." },
    { name: "Chin-up Fechado", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Ar_Livre", equip: "Calistenia", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Rosca Isométrica (Toalha/Cinto)", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Casa", equip: "Acessorio_Caseiro", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Rosca Martelo (Halteres/Corda)", group: "Bíceps", focus: "Braquial/Antebraço", env: "Academia, Casa", equip: "Maquinas_Polias, Pesos_Livres", desc: "Trabalho focado em braquial/antebraço (bíceps)." },
    { name: "Rosca Inversa no Cabo/Barra", group: "Bíceps", focus: "Braquial/Antebraço", env: "Academia", equip: "Barras_Anilhas, Maquinas_Polias", desc: "Trabalho focado em braquial/antebraço (bíceps)." },
    { name: "Rosca de Punho (Flexão/Extensão)", group: "Antebraço", focus: "Flexores/Extensores", env: "Academia", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em flexores/extensores (antebraço)." },
    { name: "Caminhada do Fazendeiro (Farmer's Walk)", group: "Antebraço", focus: "Grip/Pegada", env: "Academia, Ar_Livre", equip: "Pesos_Livres", desc: "Trabalho focado em grip/pegada (antebraço)." },
    { name: "Pendurar na Barra (Dead Hang)", group: "Antebraço", focus: "Grip/Pegada", env: "Ar_Livre", equip: "Calistenia", desc: "Trabalho focado em grip/pegada (antebraço)." },
    { name: "Tríceps Francês (Halter/Cabo)", group: "Tríceps", focus: "Cabeça Longa", env: "Academia, Casa", equip: "Maquinas_Polias, Pesos_Livres", desc: "Trabalho focado em cabeça longa (tríceps)." },
    { name: "Tríceps Testa (Barra W)", group: "Tríceps", focus: "Cabeça Longa", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em cabeça longa (tríceps)." },
    { name: "Tríceps Pulley (Barra Reta/V)", group: "Tríceps", focus: "Lateral/Medial", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em lateral/medial (tríceps)." },
    { name: "Tríceps Corda", group: "Tríceps", focus: "Lateral/Medial", env: "Academia", equip: "Maquinas_Polias", desc: "Abra a corda no final para pico de contração lateral." },
    { name: "Tríceps Máquina / Dip Machine", group: "Tríceps", focus: "Lateral/Medial", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em lateral/medial (tríceps)." },
    { name: "Tríceps Coice (Kickback) Halter/Cabo", group: "Tríceps", focus: "Lateral/Medial", env: "Academia, Casa", equip: "Maquinas_Polias, Pesos_Livres", desc: "Trabalho focado em lateral/medial (tríceps)." },
    { name: "Supino Pegada Fechada", group: "Tríceps", focus: "Todas", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em todas (tríceps)." },
    { name: "Mergulho nas Paralelas / Banco", group: "Tríceps", focus: "Todas", env: "Ar_Livre, Casa", equip: "Calistenia", desc: "Trabalho focado em todas (tríceps)." },
    { name: "Flexão Diamante", group: "Tríceps", focus: "Todas", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Ativação intensa do tríceps." },
    { name: "Leg Press (45/Horizontal)", group: "Pernas", focus: "Quadríceps", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em quadríceps (pernas)." },
    { name: "Cadeira Extensora", group: "Pernas", focus: "Quadríceps", env: "Academia", equip: "Maquinas_Polias", desc: "Isolamento total do quadríceps." },
    { name: "Agachamento no Smith / Hack Machine", group: "Pernas", focus: "Quadríceps", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em quadríceps (pernas)." },
    { name: "Agachamento Livre (Back/Front Squat)", group: "Pernas", focus: "Quadríceps", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em quadríceps (pernas)." },
    { name: "Agachamento Búlgaro", group: "Pernas", focus: "Quadríceps", env: "Academia, Casa", equip: "Peso_Corporal, Pesos_Livres", desc: "Trabalho unilateral corretivo." },
    { name: "Sissy Squat / Pistol Squat", group: "Pernas", focus: "Quadríceps", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em quadríceps (pernas)." },
    { name: "Afundo / Avanço", group: "Pernas", focus: "Quadríceps", env: "Ar_Livre, Casa", equip: "Peso_Corporal, Pesos_Livres", desc: "Desenvolvimento unilateral dinâmico." },
    { name: "Cadeira/Mesa Flexora", group: "Pernas", focus: "Isquiotibiais", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em isquiotibiais (pernas)." },
    { name: "Stiff / Terra Romeno (RDL)", group: "Pernas", focus: "Isquiotibiais", env: "Academia, Casa", equip: "Barras_Anilhas, Pesos_Livres", desc: "Trabalho focado em isquiotibiais (pernas)." },
    { name: "Flexão Nórdica", group: "Pernas", focus: "Isquiotibiais", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Exigência extrema do posterior da coxa." },
    { name: "Cadeira Adutora", group: "Pernas", focus: "Adutores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalha a parte interna da coxa." },
    { name: "Prancha Copenhague", group: "Pernas", focus: "Adutores", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em adutores (pernas)." },
    { name: "Cadeira Abdutora", group: "Pernas", focus: "Glúteos/Abdutores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalha a lateral do quadril (glúteos médio)." },
    { name: "Elevação Pélvica na Máquina/Barra", group: "Pernas", focus: "Glúteos/Abdutores", env: "Academia", equip: "Barras_Anilhas, Maquinas_Polias", desc: "Trabalho focado em glúteos/abdutores (pernas)." },
    { name: "Glúteo na Máquina (Kickback)", group: "Pernas", focus: "Glúteos/Abdutores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em glúteos/abdutores (pernas)." },
    { name: "Monster Walk / Clamshell", group: "Pernas", focus: "Glúteos/Abdutores", env: "Academia, Casa", equip: "Funcional_Esportivo", desc: "Trabalho focado em glúteos/abdutores (pernas)." },
    { name: "Ponte de Glúteos Profunda", group: "Pernas", focus: "Glúteos/Abdutores", env: "Casa", equip: "Peso_Corporal", desc: "Trabalho focado em glúteos/abdutores (pernas)." },
    { name: "Elevação de Panturrilha em Pé (Máquina/Smith)", group: "Pernas", focus: "Panturrilhas", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em panturrilhas (pernas)." },
    { name: "Elevação de Panturrilha Sentado (Máquina)", group: "Pernas", focus: "Panturrilhas", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em panturrilhas (pernas)." },
    { name: "Panturrilha no Leg Press", group: "Pernas", focus: "Panturrilhas", env: "Academia", equip: "Maquinas_Polias", desc: "Pernas esticadas focam no gastrocnêmio." },
    { name: "Panturrilha no Degrau (Unilateral/Bilateral)", group: "Pernas", focus: "Panturrilhas", env: "Ar_Livre, Casa", equip: "Peso_Corporal, Pesos_Livres", desc: "Trabalho focado em panturrilhas (pernas)." },
    { name: "Saltos em Pogo", group: "Pernas", focus: "Panturrilhas", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em panturrilhas (pernas)." },
    { name: "Abdominal na Máquina", group: "Core", focus: "Superior", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em superior (core)." },
    { name: "Abdominal na Polia Alta (Cable Crunch)", group: "Core", focus: "Superior", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em superior (core)." },
    { name: "Abdominal Supra (Solo/Carga)", group: "Core", focus: "Superior", env: "Academia, Casa", equip: "Peso_Corporal, Pesos_Livres", desc: "Trabalho focado em superior (core)." },
    { name: "Abdominal Canivete / V-Up", group: "Core", focus: "Superior", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em superior (core)." },
    { name: "Elevação de Joelhos na Paralela", group: "Core", focus: "Inferior", env: "Academia", equip: "Calistenia, Maquinas_Polias", desc: "Trabalho focado em inferior (core)." },
    { name: "Elevação de Pernas Pendurado (Toes to Bar)", group: "Core", focus: "Inferior", env: "Academia, Ar_Livre", equip: "Calistenia", desc: "Trabalho focado em inferior (core)." },
    { name: "Abdominal Infra no Solo (Reverse Crunch)", group: "Core", focus: "Inferior", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em inferior (core)." },
    { name: "Rotação de Tronco na Polia (Woodchopper)", group: "Core", focus: "Oblíquos / Rotação", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em oblíquos / rotação (core)." },
    { name: "Chute Rotacional com Cabo/Elástico", group: "Core", focus: "Oblíquos / Rotação", env: "Academia, Ar_Livre", equip: "Funcional_Esportivo, Maquinas_Polias", desc: "Trabalho focado em oblíquos / rotação (core)." },
    { name: "Russian Twist (Com anilha ou livre)", group: "Core", focus: "Oblíquos / Rotação", env: "Academia, Casa", equip: "Peso_Corporal, Pesos_Livres", desc: "Trabalho focado em oblíquos / rotação (core)." },
    { name: "Toque no Calcanhar", group: "Core", focus: "Oblíquos / Rotação", env: "Casa", equip: "Peso_Corporal", desc: "Flexão lateral blindando o tronco." },
    { name: "Abdominal Bicicleta", group: "Core", focus: "Oblíquos / Rotação", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Rotação contínua ativando laterais." },
    { name: "Prancha Isométrica (Frontal/Lateral)", group: "Core", focus: "Estabilização/Anti-extensão", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core)." },
    { name: "Prancha Sobe-Desce", group: "Core", focus: "Estabilização/Anti-extensão", env: "Casa", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core)." },
    { name: "Percevejo (Dead Bugs)", group: "Core", focus: "Estabilização/Anti-extensão", env: "Casa", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core)." },
    { name: "Hollow Body Hold", group: "Core", focus: "Estabilização/Anti-extensão", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Estabilidade avançada do core profundo." },
    { name: "Roda Abdominal (Ab Wheel)", group: "Core", focus: "Estabilização/Anti-extensão", env: "Academia, Casa", equip: "Funcional_Esportivo", desc: "Trabalho focado em estabilização/anti-extensão (core)." },
    { name: "Pallof Press", group: "Core", focus: "Estabilização/Anti-extensão", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em estabilização/anti-extensão (core)." },
    { name: "Cócoras Profundas", group: "Mobilidade", focus: "Pernas/Quadril", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em pernas/quadril (mobilidade)." },
    { name: "Mobilidade 90/90", group: "Mobilidade", focus: "Pernas/Quadril", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em pernas/quadril (mobilidade)." },
    { name: "Agachamento Lateral (Cossack)", group: "Mobilidade", focus: "Pernas/Quadril", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em pernas/quadril (mobilidade)." },
    { name: "Maior Alongamento do Mundo", group: "Mobilidade", focus: "Pernas/Quadril", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em pernas/quadril (mobilidade)." },
    { name: "Dorsiflexão de Tornozelo na Parede", group: "Mobilidade", focus: "Tornozelos", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em tornozelos (mobilidade)." },
    { name: "Gato-Vaca (Cat-Cow)", group: "Mobilidade", focus: "Costas/Ombros", env: "Casa", equip: "Peso_Corporal", desc: "Trabalho focado em costas/ombros (mobilidade)." },
    { name: "Rotação Torácica em 4 apoios", group: "Mobilidade", focus: "Costas/Ombros", env: "Casa", equip: "Peso_Corporal", desc: "Trabalho focado em costas/ombros (mobilidade)." },
    { name: "Deslocamento de Ombros (Bastão)", group: "Mobilidade", focus: "Costas/Ombros", env: "Casa", equip: "Acessorio_Caseiro", desc: "Trabalho focado em costas/ombros (mobilidade)." },
    { name: "Pular Corda", group: "Cardio/HIIT", focus: "Motor Aeróbico", env: "Ar_Livre, Casa", equip: "Funcional_Esportivo", desc: "Trabalho focado em motor aeróbico (cardio/hiit)." },
    { name: "Polichinelos (Jumping Jacks)", group: "Cardio/HIIT", focus: "Motor Aeróbico", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em motor aeróbico (cardio/hiit)." },
    { name: "Corrida Estacionária", group: "Cardio/HIIT", focus: "Motor Aeróbico", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em motor aeróbico (cardio/hiit)." },
    { name: "Corrida Calcanhar no Glúteo", group: "Cardio/HIIT", focus: "Motor Aeróbico", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em motor aeróbico (cardio/hiit)." },
    { name: "Burpees", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em resistência anaeróbica (cardio/hiit)." },
    { name: "Sprawl (Meio Burpee)", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em resistência anaeróbica (cardio/hiit)." },
    { name: "Escalador (Mountain Climber)", group: "Cardio/HIIT", focus: "Resistência Anaeróbica", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Cardio e estabilidade do transverso." },
    { name: "Sprints com Trenó (Sled Push/Pull)", group: "Deslocamento/Esporte", focus: "Potência e Tração", env: "Academia, Ar_Livre", equip: "Funcional_Esportivo, Maquinas_Polias", desc: "Trabalho focado em potência e tração (deslocamento/esporte)." },
    { name: "Terra Hexagonal (Trap Bar)", group: "Deslocamento/Esporte", focus: "Potência e Tração", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em potência e tração (deslocamento/esporte)." },
    { name: "Lançamento de Medicine Ball (Parede/Gramado)", group: "Deslocamento/Esporte", focus: "Potência e Tração", env: "Academia, Ar_Livre", equip: "Funcional_Esportivo", desc: "Trabalho focado em potência e tração (deslocamento/esporte)." },
    { name: "Agachamento com Salto / Jump Squat", group: "Deslocamento/Esporte", focus: "Pliometria", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em pliometria (deslocamento/esporte)." },
    { name: "Saltos na Caixa (Box Jump)", group: "Deslocamento/Esporte", focus: "Pliometria", env: "Academia, Ar_Livre", equip: "Funcional_Esportivo", desc: "Trabalho focado em pliometria (deslocamento/esporte)." },
    { name: "Saltos Horizontais (Broad Jump)", group: "Deslocamento/Esporte", focus: "Pliometria", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em pliometria (deslocamento/esporte)." },
    { name: "Saltos Laterais (Skater Jumps)", group: "Deslocamento/Esporte", focus: "Pliometria", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em pliometria (deslocamento/esporte)." },
    { name: "Sprints Curtos no Gramado (Aceleração 5-15m)", group: "Deslocamento/Esporte", focus: "Aceleração e Velocidade", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em aceleração e velocidade (deslocamento/esporte)." },
    { name: "Sprints Lançados (Velocidade Máxima 20-40m)", group: "Deslocamento/Esporte", focus: "Aceleração e Velocidade", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em aceleração e velocidade (deslocamento/esporte)." },
    { name: "Desacelerações Resistidas (Elástico)", group: "Deslocamento/Esporte", focus: "Agilidade e Frenagem", env: "Ar_Livre", equip: "Funcional_Esportivo", desc: "Trabalho focado em agilidade e frenagem (deslocamento/esporte)." },
    { name: "Shuttle Run (Tiros Curtos e Cortes)", group: "Deslocamento/Esporte", focus: "Agilidade e Frenagem", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em agilidade e frenagem (deslocamento/esporte)." },
    { name: "Agilidade em Zigue-Zague (Drills de Cone)", group: "Deslocamento/Esporte", focus: "Agilidade e Frenagem", env: "Ar_Livre", equip: "Funcional_Esportivo", desc: "Trabalho focado em agilidade e frenagem (deslocamento/esporte)." },
    { name: "Marchas na Parede (Wall Drills)", group: "Deslocamento/Esporte", focus: "Mecânica", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em mecânica (deslocamento/esporte)." },
    { name: "Quedas de Base (Drop Squats)", group: "Deslocamento/Esporte", focus: "Mecânica", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em mecânica (deslocamento/esporte)." },
    { name: "Supino Landmine (Barra ancorada no chão)", group: "Peitoral", focus: "Fibras Superiores", env: "Academia", equip: "Acessorio_Caseiro, Barras_Anilhas", desc: "Trabalho focado em fibras superiores (peitoral)." },
    { name: "Floor Press (Supino no chão com halteres)", group: "Peitoral", focus: "Fibras Médias", env: "Academia", equip: "Pesos_Livres", desc: "Trabalho focado em fibras médias (peitoral)." },
    { name: "Flexão com Palmas (Plyo Push-up)", group: "Peitoral", focus: "Fibras Médias", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em fibras médias (peitoral)." },
    { name: "Puxada Alta com Pegada Neutra (Triângulo/Paralelas)", group: "Costas", focus: "Latíssimo (Largura)", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em latíssimo (largura) (costas)." },
    { name: "Straight-Arm Pulldown (Pulldown braços estendidos)", group: "Costas", focus: "Latíssimo (Largura)", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em latíssimo (largura) (costas)." },
    { name: "Remada Pendlay", group: "Costas", focus: "Romboides/Miolo (Espessura)", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em romboides/miolo (espessura) (costas)." },
    { name: "Desenvolvimento Arnold (Arnold Press)", group: "Ombros", focus: "Deltoide Anterior", env: "Academia", equip: "Pesos_Livres", desc: "Trabalho focado em deltoide anterior (ombros)." },
    { name: "Elevação em 'Y' na Polia Baixa", group: "Ombros", focus: "Deltoide Lateral", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide lateral (ombros)." },
    { name: "Face Pull com Rotação Externa", group: "Ombros", focus: "Deltoide Posterior", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em deltoide posterior (ombros)." },
    { name: "Rosca Spider", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Academia", equip: "Pesos_Livres", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Rosca Bayesian", group: "Bíceps", focus: "Cabeça Curta/Longa", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em cabeça curta/longa (bíceps)." },
    { name: "Extensão Cruzada de Tríceps (Katana Extensions)", group: "Tríceps", focus: "Lateral/Medial", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em lateral/medial (tríceps)." },
    { name: "Agachamento Cálice (Goblet Squat)", group: "Pernas", focus: "Quadríceps", env: "Academia, Casa", equip: "Pesos_Livres", desc: "Trabalho focado em quadríceps (pernas)." },
    { name: "Flexão de Perna em Pé na Polia Baixa", group: "Pernas", focus: "Isquiotibiais", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em isquiotibiais (pernas)." },
    { name: "Adução de Quadril na Polia Baixa em Pé", group: "Pernas", focus: "Adutores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em adutores (pernas)." },
    { name: "Abdução de Quadril na Polia Baixa em Pé", group: "Pernas", focus: "Glúteos/Abdutores", env: "Academia", equip: "Maquinas_Polias", desc: "Trabalho focado em glúteos/abdutores (pernas)." },
    { name: "Rotação de Tronco com Barra Ancorada (Landmine Twist)", group: "Core", focus: "Oblíquos / Rotação", env: "Academia", equip: "Barras_Anilhas", desc: "Trabalho focado em oblíquos / rotação (core)." },
    { name: "Prancha Frontal com Toques no Ombro (Shoulder Taps)", group: "Core", focus: "Estabilização/Anti-extensão", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core)." },
    { name: "Bear Crawl (Caminhada do Urso)", group: "Core", focus: "Estabilização/Anti-extensão", env: "Ar_Livre, Casa", equip: "Peso_Corporal", desc: "Trabalho focado em estabilização/anti-extensão (core)." },
    { name: "Drills de Coordenação na Escada (Icky Shuffle, In-In-Out-Out)", group: "Deslocamento/Esporte", focus: "Agilidade e Frenagem", env: "Ar_Livre", equip: "Funcional_Esportivo", desc: "Trabalho focado em agilidade e frenagem (deslocamento/esporte)." },
    { name: "Sprints Vai-e-Vem / Suicídios", group: "Deslocamento/Esporte", focus: "Agilidade e Frenagem", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em agilidade e frenagem (deslocamento/esporte)." },
    { name: "Saltos Unilaterais com Estabilização", group: "Deslocamento/Esporte", focus: "Pliometria", env: "Ar_Livre", equip: "Peso_Corporal", desc: "Trabalho focado em pliometria (deslocamento/esporte)." }
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