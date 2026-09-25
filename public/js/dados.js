// 2. DICIONÁRIO ESTRATÉGICO: SUBNÍVEIS E BIOMECÂNICA (ATUALIZADO V3 - NÍVEIS DE DIFICULDADE)
const dictionaryData = [
    {
        "name": "Abdominais",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal Ajoelhado com Barra no Cabo",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Abdominal Ajoelhado com Corda no Cabo",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Abdominal Ajoelhado na Polia com Barra de Remada",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Abdominal Bicicleta",
        "group": "Abdominal",
        "focus": "Oblíquos / Rotação",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Abdominal Canivete / V-Up",
        "group": "Abdominal",
        "focus": "Superior",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Abdominal Em Pé Com Barra No Cabo",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Abdominal Infra no Solo (Reverse Crunch)",
        "group": "Abdominal",
        "focus": "Inferior",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Abdominal Na Polia Em Pé",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Abdominal Oblíquo Ajoelhado na Polia",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Abdominal Oblíquo na Máquina Smith",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Máquina",
        "nivel": 3
    },
    {
        "name": "Abdominal Sapinho",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal Sapo",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal Supra (Solo/Carga)",
        "group": "Abdominal",
        "focus": "Superior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Abdominal bicicleta",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal com Anilha",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Abdominal com Remada",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Abdominal com barra",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Abdominal com haltere",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Abdominal com landmine",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Abdominal em Pé na Polia com Corda",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Abdominal em posição de mala com haltere",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Abdominal na Máquina",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Abdominal na Máquina Smith",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Abdominal na Polia Alta (Cable Crunch)",
        "group": "Abdominal",
        "focus": "Superior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Abdominal no Bosu com Flexão de Joelhos",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Abdominal russo com haltere",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Abdução de Quadril com Peso Corporal",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril e Glúteo na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril em Pé com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril em Pé na Polia",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril em Quatro Apoios com Cabo",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Abdução de quadril na máquina afundo",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Abdução em pé na Polia",
        "group": "Pernas",
        "focus": "Glúteo Médio/Mínimo",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Adução de quadril em pé com cabo",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Adução em pé na Polia",
        "group": "Pernas",
        "focus": "Adutores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Afundo",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Afundo Alternado Com Landmine E Rotação",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo Alternado Com Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Afundo Alternado com Agachamento Goblet com Halteres",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo Alternado com Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo Alternado com Salto (Peso Corporal)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Balançado com Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Búlgaro",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Afundo Búlgaro Assistido",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Afundo Búlgaro com Barra",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo Búlgaro com Haltere (goblet)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo Búlgaro com Haltere em Pegada Goblet",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo Búlgaro com Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo Caminhando",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Curtsy Com Haltere Em Taça",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Afundo Curtsy com Barra",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo Curtsy com Deficit e Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Frontal com Haltere em Pegada Goblet",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Afundo Goblet Com Halter",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Afundo Inverso com Déficit Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral Alternado com Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral com Anilha",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Afundo Lateral com Barra",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo Lateral com Halteres e Alcance",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral com Salto (Peso Corporal)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral em Taça com Landmine",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo No Landmine Com Desenvolvimento Acima Da Cabeça",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo Reverso Alternado com Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo Reverso com Anilha",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso com Barra",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Afundo Reverso com Deficit e Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Afundo Reverso com Deficit e Halteres no Estilo Goblet",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Afundo Reverso com Haltere (Goblet)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso com Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso com Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso na Máquina Smith",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Afundo com Balanço de Haltere",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundo com Barra em Deficit com Reverência",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo com Haltere em Déficit com Curvatura",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Afundo com Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Afundo com Landmine",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Afundo com Passagem de Perna (Peso Corporal)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo com barra",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Afundo com barra e faixa elástica",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Afundo com disco à frente",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Afundo com déficit no disco",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo de Deficit com Haltere no Goblet",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Afundo em Reverência",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo em Reverência com Landmine",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Afundo em Reverência com Landmine (Pegada Goblet)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Afundo em reverência com anilha",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Afundo na Máquina Smith",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Afundo na Polia",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Afundo reverso com barra hexagonal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Afundo reverso com rotação de tronco (com anilha)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Afundo/Passada (Halteres/Barra)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Afundos Laterais",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento Alternado com Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento Búlgaro Assistido com Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Agachamento Búlgaro com tronco inclinado à frente (Halteres/Smith)",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Agachamento Com Disco Sobre a Cabeça",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento Frontal (Barra)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento Frontal com Barra ",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento Frontal com Barra Olímpica",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento Frontal com Barra e Alças",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento Frontal com Barra — Calcanhares Elevados",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento Frontal com Barra — Musculação",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento Frontal com Halteres",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Agachamento Frontal com Halteres (pausa)",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Agachamento Goblet Estreito com Haltere e Calcanhares Elevados",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Agachamento Goblet Sissy na Máquina",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Agachamento Goblet com Halter (Calcanhares Elevados)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Agachamento Goblet com Haltere",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Agachamento Goblet com Haltere (Pulsos)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Agachamento Goblet na Polia",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Agachamento Hack Horizontal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Agachamento Hack com Landmine",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento Isométrico com Anilha",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Agachamento Isométrico com Anilha e Alcance",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento Landmine",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Agachamento Lateral (Cossack)",
        "group": "Mobilidade",
        "focus": "Pernas/Quadril",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento Lateral Alternado com Peso Corporal",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento Livre (Barra nas costas)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento Overhead Unilateral",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Agachamento Overhead com Haltere",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Agachamento Overhead com bastão",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento Pausado com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento Pulsado com Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento Sissy Assistido com Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento Sissy com Barra no Landmine",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento Sissy na Máquina Smith",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 3
    },
    {
        "name": "Agachamento Sissy na máquina",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Agachamento Sumô (Barra, Halter pesado ou Anilha pesada pendurada)",
        "group": "Pernas",
        "focus": "Adutores",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Agachamento Sumô com Haltere",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Agachamento Zercher com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento Zercher com Barra EZ",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Agachamento Zercher no cabo",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Agachamento com Anilha",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Agachamento com Apoio de Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Agachamento com Apoio de HalteresHalteres · IntermediárioAfundo Reverso com Halteres",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Agachamento com Apoio de Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Barra",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento com Barra (Barra Alta)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Agachamento com Barra (Low-Bar)",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento com Barra em Apoio Lateral",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento com Barra, Toque e Pausa",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento com Calcanhares Elevados",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Cinto e Cabo",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Agachamento com Cinto na Máquina",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Agachamento com Cinto no Cabo",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Agachamento com Disco e Alcance",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Agachamento com Halteres",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Agachamento com Halteres e Rolamento",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Agachamento com Halteres no Caixote",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Agachamento com Máquina Pêndulo",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Agachamento com Peso Corporal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Peso Corporal em Caixa",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Prato",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento com Salto (Peso Corporal)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com barra",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento com barra hexagonal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento com barra nas costas (calcanhares elevados)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento com desenvolvimento na polia",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Agachamento com haltere deslocado",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Agachamento com o peso do corpo",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com salto",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com salto in and out",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento com uma perna só usando o peso do corpo",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Agachamento de Uma Perna com Calcanhares Elevados, com Halteres",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Agachamento dividido com barra hexagonal",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento do Garçom com Placa Alternada",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Agachamento estático de parede",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento na Máquina Hack",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Agachamento na Parede com Peso",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Agachamento na caixa com barra e pausa",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Agachamento no Smith",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Agachamento no Smith (pés projetados à frente)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Agachamento no Smith com postura estreita",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Alcance com Anilha",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Alcance e Capture",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadril Noventa Noventa com Peso Corporal",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Alpinista",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Andar na ponta dos pés",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Arnold Press Alternado com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Arnold Press Sentado com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Arnold Press Unilateral com Haltere",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Arnold Press com halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Arranco com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Arranco com Landmine",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Arranco de Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Arremesso Dividido No Landmine",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Auxílio de Máquina para Flexão de Queixo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Avanço",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Avanço Alternado com Landmine para Supino",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Avanço Caminhando com Anilha Acima da Cabeça",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Avanço Reverso com Deficit e Halteres na Frente",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Avanço Reverso com Deficit em Taça",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Avanço com Barra em Deficit",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Avanço com Barra à Frente em Deficit",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Avanço com Curtsy em Deficit com Halteres na Posição de Front Rack",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Avanço com Deficit e Barra Zercher",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Avanço com barra",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Avanços Alternados com Peso Corporal",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Barra Fixa",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Barra Fixa (Pull-up / Chin-up)",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Barra Fixa (pegada supinada)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Barra Fixa Assistida",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Barra Fixa Assistida ao Estilo Gironda",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Barra Fixa Assistida por Máquina",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Barra Fixa Isométrica",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Barra Fixa com Sobrecarga de Halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Barra com Anel",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Barra com peso",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Barra de Remada na Polia Remada em Pé",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Barra de Tração",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Barra fixa assistida com pegada mista.",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Barra fixa assistida na Smith Machine",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Bird Dog",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Bom Dia / Good Morning (Barra)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Alongada)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Bom Dia Zercher com Cabo",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Bom Dia com Anilha",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Bom Dia com Barra (Posição Baixa)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Burpee",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Burpees",
        "group": "Cardio/Hiit",
        "focus": "Resistência Anaeróbica",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Cabo Meio Ajoelhado de Alto a Baixo Cortador de Madeira",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Cabo Meio Ajoelhado de Baixo Para Cima Lenhador",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Cadeira Abdutora",
        "group": "Pernas",
        "focus": "Glúteo Médio/Mínimo",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Cadeira Adutora (Máquina)",
        "group": "Pernas",
        "focus": "Adutores",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Cadeira Extensora (Máquina)",
        "group": "Pernas",
        "focus": "Quadríceps (Reto Femoral)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Cadeira Flexora (Sentado)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Encurtada)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Carregamento de Mala com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Chest press inclinado alternado em pé na polia",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Chin-up Fechado (barra fixa)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Chute Médio de Perna Reta em Pé com Cabo",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Chute Tesoura",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Chute Tesoura Lateral",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Chute de Glúteo em Pé no Cabo",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Clean and Press com Haltere (Braço Único)",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Clean and Press com barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Clean and Press com halteres",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Clean com anilha",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Clean e Press com Disco",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Coice na Máquina",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Corrida Calcanhar no Glúteo",
        "group": "Cardio/Hiit",
        "focus": "Motor Aeróbico",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Corrida Estacionária",
        "group": "Cardio/Hiit",
        "focus": "Motor Aeróbico",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Corrida com Elevação de Joelhos (High Knees)",
        "group": "Cardio/Hiit",
        "focus": "Motor Aeróbico",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Corte de madeira com cabo — em pé, de baixo para cima",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crossover Polia Média",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crossover de Baixo para Cima",
        "group": "Peito",
        "focus": "Fibras Superiores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crossover de Cima para Baixo",
        "group": "Peito",
        "focus": "Fibras Inferiores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crucifixo Alternado no Banco Inclinado com Cabos e Rotação Interna",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Com Cabos",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Declinado Com Halteres",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crucifixo Declinado com Cabo (Unilateral)",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Em Pé Unilateral No Cabo Com Rotação Interna",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inclinado Unilateral com Cabo",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado com Halteres",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado com Halteres e Rotação Interna",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inclinado em Pé com Cabo (Unilateral)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado em Pé com Cabo — Unilateral (Rotação Interna)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado em Pé no Cabo, Alternado, com Rotação Interna",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado na Polia (movimento em arco)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado no Cabo",
        "group": "Peito",
        "focus": "Fibras Superiores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inverso Cruzado na Polia Alta",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inverso Curvado com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inverso Sentado com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inverso na Máquina",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inverso na Polia Alta com Rotação Interna",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Reto com Halteres",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Crucifixo Reto na Máquina (Peck Deck)",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Crucifixo Unilateral em Pé com Cabo",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo Unilateral no Cabo com Apoio",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo alternado em pé na polia",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo alternado no banco com cabos",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo alternado no cabo em banco declinado",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo com Halteres com Rotação Interna",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Crucifixo com halteres",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crucifixo declinado alternado em pé na polia",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo declinado alternado em pé na polia com rotação interna",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo declinado na polia",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo declinado no cabo com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo em pé no cabo, alternado, com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo inclinado alternado em pé no crossover",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo inclinado em pé no cabo",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo inclinado na polia",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo inclinado na polia com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo inverso alto unilateral na polia com rotação interna",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo inverso com halteres",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crucifixo inverso no cabo alto",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo na polia com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo na polia no banco com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo na polia no banco declinado com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo no Banco Declinado com Cabos",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo no Banco com Cabos",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo no chão com halteres",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crucifixo no chão com halteres e rotação interna",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crucifixo unilateral no cabo no banco",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crucifixo unilateral no chão com halter",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crucifixo unilateral no chão com halter e rotação interna",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Crunch Oblíquo Ajoelhado na Polia com Corda",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Crunch oblíquo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Círculo de Braços para Trás",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Círculos com os Braços para Frente",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Cócoras Profundas",
        "group": "Mobilidade",
        "focus": "Pernas/Quadril",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Dead Bug",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Descida do step com peso corporal",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Ajoelhado no Landmine",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Alternado Com Um Braço No Landmine",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Alternado Sentado No Landmine",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Alternado com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Alternado com Halteres (Pegada Neutra)",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Arnold (Arnold Press)",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Bradford com barra",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Com Barra Atrás da Nuca",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Cubano com Barra W",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Cubano com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Militar (Barra)",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Militar Sentado no Landmine",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Militar com Barra",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Militar no Landmine",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Sentado Unilateral com Landmine",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Sentado na Smith Machine",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento Unilateral com Halter",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Unilateral com Haltere em Pegada Neutra",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento Unilateral com Landmine",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento acima da cabeça com barra W",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento com Halteres (Pegada Neutra)",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com Halteres Sentado",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com barra atrás da cabeça (sentado)",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Desenvolvimento com cabo",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com halteres sentado (pegada neutra)",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento em Y com Halteres Sentado",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento em Y com halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento na Máquina",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento unilateral com haltere",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Deslocamento de Ombros (Bastão)",
        "group": "Mobilidade",
        "focus": "Costas/Ombros",
        "equip": "Acessório",
        "nivel": 2
    },
    {
        "name": "Dorsiflexão de Tornozelo na Parede",
        "group": "Mobilidade",
        "focus": "Tornozelos",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Dragonflag Excêntrico",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Driver com anilha",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação Alternada de Deltoides Posterior com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Elevação Alternada de Perna Dobrada",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação Alternada de Pernas",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal (Anilha/Cabo)",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Elevação Frontal Completa Sentada com Barra",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Elevação Frontal Completa com Barra",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Elevação Frontal Completa com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Elevação Frontal Inclinada com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Anilha",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Barra",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Elevação Frontal com Barra no Cabo",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Corda na Polia",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Bilateral Baixa com Cabo",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Com Cabo Atrás Das Costas",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Completa Com Halteres (Sentado)",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Completa Sentado Com Haltere (Unilateral)",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Completa com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Deitado",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Em Pé Com Halteres (Bayesian)",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Inclinada com Halteres Deitado",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Isométrica no Batente",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação Lateral Unilateral com Corda no Cabo Baixo",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Unilateral no Cabo Baixo",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Corda no Cabo (Deltoide Médio)",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Disco",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Halteres em Seis Movimentos",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Landmine",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Elevação Lateral de Braço Dobrado com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral deitada (com Caneleira ou Halter apoiado na coxa)",
        "group": "Pernas",
        "focus": "Glúteo Médio/Mínimo",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Elevação Lateral na Máquina",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral na Máquina em Pé",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral na Polia Baixa",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Elevação Posterior de Deltoides na Banco com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Pélvica (Barra, Máquina, Halter, Unilateral)",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação Y na polia",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação de Braço em Prancha com Peso Corporal",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Glúteos com Isometria Única Alternada",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Joelhos na Barra Fixa",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Joelhos na Paralela",
        "group": "Abdominal",
        "focus": "Inferior",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de Ombros Sentado na Máquina",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de Ombros em Máquina",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Sentada com Halteres",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Sentado com Barra",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Barra",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Elevação de Panturrilha com Barra no Cabo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Cabo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Halter em uma Perna",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Halteres",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Landmine",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Elevação de Panturrilha com Peso Corporal",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com uma Perna com Peso Corporal",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha em Pé na Máquina",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha na Máquina Smith",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha na Máquina estilo Burro",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha no Cabo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilhas Sentado na Máquina",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de Pernas Dobradas",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Inferior)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Pernas Invertida",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Inferior)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação de Pernas Pendurado (Toes to Bar)",
        "group": "Abdominal",
        "focus": "Inferior",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril Unilateral com Barra e Pés Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Elevação de Quadril Unilateral com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Barra",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Barra (Figura Quatro)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril com Barra (Pés Elevados)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril com Barra — Calcanhares Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Calcanhares Elevados (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Disco para Supino",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Haltere e Pés Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Haltere — Pés Elevados e Alternados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril com Halteres e Calcanhares Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de Queixo Neutra Assistida por Máquina",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação de panturrilha",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de panturrilha com barra (ponta dos pés para cima)",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação de pernas deitado",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Inferior)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de quadril com haltere (pés escalonados)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação de quadril com halteres (figura quatro)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Elevação de quadril unilateral com barra e calcanhares elevados",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Elevação de queixo em posição L",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação em 'Y' na Polia Baixa",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Elevação em L Sentado",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação em pé na Máquina",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação frontal com barra W",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Elevação lateral com halteres Bayesian",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação lateral completa com anilha",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Elevação lateral completa unilateral com halter",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Elevação lateral sentado",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação lateral unilateral com halter",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação lateral unilateral com haltere (sentada)",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Elevação na barra com pegada Gironda.",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Elevação no Smith (com step)",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Elevação unilateral com Halter (no step)",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Empurrada e puxada no cabo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Encolhimento De Ombros Com Barra Atrás Das Costas",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Encolhimento De Ombros Com Barra Por Trás Das Costas 30 Degree",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Encolhimento com Barra/Halteres",
        "group": "Costas",
        "focus": "Trapézio Superior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Encolhimento com Halteres Silverback",
        "group": "Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombro Sentado com Halteres",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Anilha Acima da Cabeça",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Encolhimento de Ombros com Barra",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Halteres",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros em Pike (Peso Corporal)",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Encolhimento de Ombros em Pike Elevado",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Encolhimento de Ombros no Cabo Silverback",
        "group": "Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Encolhimento de ombros com barra Silverback",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Encolhimento de ombros com barra W",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Encolhimento de ombros com barra a 30 graus",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Encolhimento de ombros com barra hexagonal",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Encolhimento de ombros com halteres deitado a 30 graus",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Encolhimento de ombros deitado com halteres Silverback",
        "group": "Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Encolhimento de ombros no cabo a 30°",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Encolhimento na Máquina Smith",
        "group": "Costas",
        "focus": "Trapézio Superior",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Escalador (Mountain Climber)",
        "group": "Cardio/Hiit",
        "focus": "Resistência Anaeróbica",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Escalador de Slalom",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Extensão Cruzada de Tríceps (Katana Extensions)",
        "group": "Tríceps",
        "focus": "Lateral/Medial",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Extensão Reversa na Máquina",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Extensão Unilateral de Tríceps Acima da Cabeça na Polia com Tronco Inclinado",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão Unilateral de Tríceps com Haltere Acima da Cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Extensão de Costas na Máquina",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Extensão de Glúteo na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Extensão de Lombar no Banco Romano",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Extensão de Ombro com Halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Extensão de Ombros com Barra",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Extensão de Perna em Pé na Polia",
        "group": "Pernas",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Extensão de Pernas Sentado no Cabo",
        "group": "Pernas",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de Pernas com Haltere",
        "group": "Pernas",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Extensão de Pernas na Máquina",
        "group": "Pernas",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Extensão de Pulso com Halteres no Banco",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho Unilateral com Halter no Banco",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho com Barra",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho com Cabo",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho com Haltere",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho no Cabo com Apoio",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de Quadril com Cabo no Banco Inclinado (Perna Reta)",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de Quadril em Pé com Perna Esticada no Cabo",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de Quadril na Polia (Cabo)",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Extensão de Tríceps Acima da Cabeça com Cabo em Um Braço",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps Acima da Cabeça com um Braço, Apoiado no Banco com Haltere",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps Rolante com Haltere",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Extensão de Tríceps Sentado com Halter Acima da Cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Extensão de Tríceps com Barra Acima da Cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Extensão de Tríceps com Peso Corporal",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Extensão de Tríceps com Peso Corporal (Ajoelhado)",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps na Barra",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps na Máquina",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps na Polia Alta",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Extensão de Tríceps na Polia com Barra Giratória",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de joelho unilateral na Polia (Caneleira conectada ao cabo)",
        "group": "Pernas",
        "focus": "Quadríceps (Reto Femoral)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Extensão de ombro unilateral com haltere",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Extensão de quadril em pé com cabo",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps acima da cabeça com barra W",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps com disco acima da cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps com haltere acima da cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps cruzada bilateral na polia",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps na polia alta com corda (acima da cabeça)",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps unilateral na polia cruzada",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão lombar (Superman)",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Extensão lombar 45° na máquina",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Extensão unilateral de tríceps na polia com rotação",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Extensão unilateral de tríceps sentado com haltere acima da cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Face Pull Sentado Unilateral no Cabo",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Face Pull Sentado com Barra no Cabo",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Face Pull Sentado com Corda no Cabo",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Face Pull Unilateral no Cabo",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Face Pull com Rotação Externa",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Face Pull na Polia Alta",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Face Pulls na Polia com Corda",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Face pull com corda (ajoelhado)",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Flexora em pé (Máquina/Polia unilateral)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Encurtada)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Flexão Arqueiro em Pé com Anel",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Com Palmas",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Declinada",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Declinada (Pés elevados)",
        "group": "Peito",
        "focus": "Fibras Superiores",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Diamante",
        "group": "Tríceps",
        "focus": "Todas",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Diamante com Joelhos Apoiados (Peso Corporal)",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Dorsal na Polia baixa",
        "group": "Pernas",
        "focus": "Tibial Anterior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Flexão Dorsal na máquina específica (peckdeck invertido)",
        "group": "Pernas",
        "focus": "Tibial Anterior",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Flexão Explosiva (Peso Corporal)",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Flexão Explosiva / Arqueiro",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Flexão Inclinada",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Inclinada (Mãos no banco)",
        "group": "Peito",
        "focus": "Fibras Inferiores",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Inclinada (Peso Corporal)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Inclinada com Joelhos",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Invertida com Pegada Fechada Usando o Peso do Corpo",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Invertida com Peso Corporal",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Pike Elevada",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Pike com Peso Corporal",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão com Elevação de Perna",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão com Halteres (Mãos Elevadas)",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Flexão de Braço Tradicional",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão de Braço com Espera Estaggerada",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão de Joelhos em Suspensão Corporal",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão de Peso Corporal do Garçom",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão de Queixo Assistida por Peso Corporal",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão de Tronco com Halteres em Posição Alternada",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Flexão de braço",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão de pernas deitado com um Halter preso entre os pés",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Encurtada)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Flexão em Déficit com Anilha",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Flexão em L na Barra Fixa",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão em Pé com Anel",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão na Smith Machine",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Flexão para Remada Renegade",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Flexões Diamante",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexões Diamante com Peso",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Flexões com Peso",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Flexões com as Mãos Levantadas",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexões de Braços com Joelhos Apoiados",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Flexões de Joelho com Peso",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Flexões na barra com peso de halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Fly Inverso Deitado Com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Fly Sentado para Deltoide Posterior com Rotação Interna",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Fly para Deltoide Posterior com Halteres (Rotação Interna)",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Fly peitoral unilateral no cabo com rotação interna e apoio",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Gato-Vaca (Cat-Cow)",
        "group": "Mobilidade",
        "focus": "Costas/Ombros",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Giro com Barra Fixa",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Gluteador",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Good Morning com anilha frontal",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Good Morning com barra alta",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Good Morning com haltere em posição goblet",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Good Mornings",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Hack Machine",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Halo com anilha",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Hang Clean E Press Com Haltere Unilateral",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Hang Clean e Press com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Hang clean and press com halteres",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Hip Thrust com Barra (Figura Quatro, Calcanhares Elevados)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Hip Thrust com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Hiperextensão Reversa (No banco ou solo)",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Hollow Body Hold",
        "group": "Abdominal",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Hollow Hold com Landmine",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Hollow Hold com disco",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Hollow com Haltere",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Inclinação Lateral com Disco (Pegada em Pinça)",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Inclinação Lateral com Haltere",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Inclinação Lateral com Haltere Acima da Cabeça",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Inclinação lateral com barra (landmine)",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Inclinação lateral no cabo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "JM Press (extensão de triceps na barra)",
        "group": "Tríceps",
        "focus": "Todas",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "JM Press com barra",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Jackknife oblíquo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Jefferson Curl com Halteres",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Jefferson Curl com barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Jefferson Curl da Coluna com Peso Corporal",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Kickback de Glúteo no Landmine",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Kickback de Glúteo no Smith",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Kickback de Quadril com Perna Reta no Cabo, Apoiado no Banco",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Kickback de Quadril e Glúteo na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Kickback de Tríceps no Cabo",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Kickback de tríceps com haltere",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "L-Sit na Barra Fixa",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Landmine Rotacional — Levantamento para Desenvolvimento",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Landmine — Press Unilateral Acima da Cabeça (Meio Ajoelhado)",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Larsen Press Unilateral com Haltere",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Leg Press 45º",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Leg Press Horizontal",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Leg Press Horizontal Máquina",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Leg Press Horizontal Máquina Sissy",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Leg Press na Máquina Smith",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Leg press na máquina",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Levantamento Alto com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Alto com Pegada Larga de Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Romeno Sumô na Smith Machine",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra (Conventional/Sumô)",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Alternado com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Coan com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Convencional com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Convencional com Barra e Pausa",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Convencional com Deficit de Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Elevado na Polia",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Jefferson com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Maleta com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Parcial com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Reverso com Barra",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Romeno com Barra e Cabo Alternado",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno com Barra na Polia",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Romeno com Halter em Posição Semi-Ajoelhada",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno com Halteres em Meio Ajoelhamento",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno de Halteres Cruzando o Corpo",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno/RDL (Barra/Halteres)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Alongada)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Sumô com Barra e Pausa",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Sumô com Landmine",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Unilateral com Disco (Pegada em Pinça)",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Unilateral na Polia",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Anilha",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra com Anilha em Passada Alternada",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra com Barra em uma Perna Só",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Pegada Snatch",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Pegada em Pinça no Disco",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra com Pinça de Discos e Passada Alternada",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Pés Escalonados na Smith Machine",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Levantamento de Barra com Arremesso",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Levantamento de Peso Olímpico com Divisão de Pernas",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento de Quadril com Barra de Pesos em uma Perna Só",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Levantamento de Quadril com Elevação dos Calcanhares e Halteres na Posição de Quatro",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Levantamento de Quadril na Máquina Smith",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Levantamento terra com barra hexagonal e pausa",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento terra com barra hexagonal em déficit",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento terra com halteres em passada",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Levantamento terra romeno com barra EZ",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Levantamento terra romeno com barra hexagonal",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento terra romeno unilateral com barra hexagonal",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Levantamento terra unilateral com barra hexagonal",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Limpador de para-brisa",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Macas",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Maior Alongamento do Mundo",
        "group": "Mobilidade",
        "focus": "Pernas/Quadril",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Meio Agachamento de Joelho",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Mergulho com Halteres",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Mergulho com Peso",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Mergulho na caixa",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Mergulho nas Paralelas / Banco",
        "group": "Tríceps",
        "focus": "Todas",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Mergulho no banco",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Mergulhos Assistidos com Caixa (Peso Corporal)",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Mergulhos Assistidos por Máquina em Barras Paralelas",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Mergulhos em Barras Paralelas",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Mergulhos na Máquina",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Mesa Flexora (Deitado)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Encurtada)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Mobilidade 90/90",
        "group": "Mobilidade",
        "focus": "Pernas/Quadril",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Montanhista Saltador",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Montanhista em Ritmo Lento",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Máquina Smith Tríceps Testa com Peso Corporal",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Elevação de Panturrilha a 45 Graus",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Elevação de Panturrilha com Carga de Placas",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Máquina de Empurrão de Quadril com Placas",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Extensão de Pernas com Placas",
        "group": "Pernas",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Gêmeos Sentado (com Anilhas)",
        "group": "Pernas",
        "focus": "Panturrilhas (Sóleo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Leg Press Unilateral",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Levantamento de Pesos Neutro Acima da Cabeça",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Peitoral com Braços Flexionados",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Prensa Horizontal para Pernas e Elevação de Panturrilha",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Prensa Horizontal para Pernas e Salto de Panturrilha",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Press de Peito em Declínio com Placas",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Pressão Acima da Cabeça com Pegada por Cima",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Remada Baixa com Carga por Placas",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Remada Selada com Carga de Placas",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Remada T com Carga de Placas",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Rosca Scott com Carga de Placas",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Rosca Scott com Carga em Placas",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Supino Inclinado Baixo com Placas",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Supino Inclinado com Placas",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Supino Militar Frontal com Placas",
        "group": "Ombro",
        "focus": "Deltoide Anterior",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina de Voo Reverso",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Máquina para Abdominais com Placas",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Oração com Cabo de Corda para Dorsais",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Pallof Press Ajoelhado com Cabo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Pallof Press Ajoelhado no Cabo para Woodchopper",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Pallof Press com Cabo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Panturrilha no Hack Machine",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Panturrilha no Leg Press 45º",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Paralelas (Dips com tronco à frente)",
        "group": "Peito",
        "focus": "Fibras Inferiores",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Passada Lateral com Haltere (Goblet)",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Passada Lateral com Landmine",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Passadas para frente",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Peitoral na Máquina",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Pendulum Squat",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Pendurado Inerte",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Percevejo (Dead Bugs)",
        "group": "Abdominal",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Perdigueiro (Bird-Dog)",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Peso Morto Romeno com Halteres",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Peso Morto Romeno com Pegada Snatch na Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Peso Morto Sumô com Barra",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Peso Morto Unilateral com Disco",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Peso Romeno Unilateral na Landmine",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Peso morto unilateral com haltere (uma perna, um braço)",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Pike Push-up / Flexão Hindú",
        "group": "Peito",
        "focus": "Fibras Superiores",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Pike de Remador",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Polichinelo Cruzado (Seal Jacks)",
        "group": "Cardio/Hiit",
        "focus": "Motor Aeróbico",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Polichinelos (Jumping Jacks)",
        "group": "Cardio/Hiit",
        "focus": "Motor Aeróbico",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Ponte Unilateral De Glúteos Com Pés Elevados (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Ponte Unilateral com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Ponte Unilateral de Glúteos com Haltere e Pés Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Ponte Unilateral de Glúteos com Landmine",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Ponte de Glúteo com Peso Corporal — Figura Quatro, Calcanhares Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos (Anilha no quadril)",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos (Figura Quatro) com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos Excêntrica Unilateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos Figura Quatro com Haltere e Pés Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos Unilateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos Unilateral com Calcanhares Elevados (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos com Anilha para Pullover",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Barra — Pés Elevados em Posição Alternada",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos com Barra, Pés Elevados e Perna em 4",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos com Halteres",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Halteres — Pernas Escalonadas",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Pés Elevados (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Pés Elevados em Posição Escalonada (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Ponte de Isometria com Ângulo Aberto para os Isquiotibiais",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Isquiotibiais com Caixa de Pernas Elevadas Bilateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Isquiotibiais com Pernas Elevadas em Caixa Unilateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de glúteo em 4 com pés elevados (peso corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Posição Hollow",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha Alta",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha Alta com Peso",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Prancha Frontal com Toques no Ombro (Shoulder Taps)",
        "group": "Abdominal",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha IYTW",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Prancha Isométrica (Frontal/Lateral)",
        "group": "Abdominal",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha Lateral Apoiada na Mão com Passagem por Baixo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha Lateral Subida e Descida",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha Lateral com Halter no Cotovelo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Prancha Lateral com Haltere (Subir e Descer)",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Prancha Lateral com Haltere na Mão",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Prancha Lateral com Máquina Smith para Cima e para Baixo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Prancha Lateral com Passagem do Braço por Baixo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha Sobe-Desce",
        "group": "Abdominal",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha Superman (Elevação de braço e perna opostos)",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha com Abertura de Pernas",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha com Abertura de Pés usando o Peso Corporal",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha com Altos e Baixos Ponderados",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Prancha com Escalada de Montanha no Cotovelo",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha com abertura e fechamento de pernas (com o peso do corpo)",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha com alavanca longa",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha com passagem de haltere",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Prancha com subida e descida (peso corporal)",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha de Antebraço com Alavanca Longa",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha lateral com apoio na mão",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha lateral no antebraço",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha nos Antebraços com Peso",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Prancha nos Joelhos — Subida/Descida (Peso Corporal)",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha nos antebraços",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Prece para Dorsais no Cabo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Prensa de Agachamento na Máquina",
        "group": "Pernas",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Prensa de Pernas Vertical",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Press Alternado com Halteres (Um Braço de Cada Vez)",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Press Landmine Ajoelhado Alternado",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Press Landmine Unilateral em Posição Escalonada",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Press com Anilha Acima da Cabeça para Extensão de Tríceps",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Press de Ombros com Halteres em Meio-Ajoelhamento",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Pressão de Peito na Máquina",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Pular Corda",
        "group": "Cardio/Hiit",
        "focus": "Motor Aeróbico",
        "equip": "Corda",
        "nivel": 2
    },
    {
        "name": "Pull-through na polia baixa (Corda)",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Pulldown braços estendidos",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Pulldown no Cabo",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Pullover Inclinado com Haltere",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Pullover Unilateral Com Haltere",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Pullover Unilateral na Polia com Corpo Inclinado",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Pullover ajoelhado na polia",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Pullover com Barra",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Pullover com Halter",
        "group": "Peito",
        "focus": "Fibras Inferiores",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Pullover com Haltere em Banco de Alta Inclinação",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Pullover com halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Pullover na Máquina",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Pullover na Polia Alta",
        "group": "Peito",
        "focus": "Fibras Inferiores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Pullover na Polia com Barra (Tronco Inclinado)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Pullover na Polia com Corda",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Push Press Unilateral com Haltere",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Push Press Unilateral na Landmine",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Push Press com Halteres",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Puxada Alta com Pegada Neutra (Triângulo/Paralelas)",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Puxada Alta na Máquina Articulada",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Puxada Alta na Polia (Frente/Supinada)",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Puxada Alternada com Braços Estendidos no Cabo, Ajoelhado",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada Fechada Assistida por Máquina",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Puxada Neutra",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Puxada Pegada Fechada",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Puxada Supinada",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Puxada Unilateral no Cabo para Dorsal (Mãos em Oração)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Puxada alternada ajoelhado na polia",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada bilateral ajoelhado na polia",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada bilateral com braços estendidos na polia, em pé",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada bilateral em pé na polia",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada com Cabo Entre as Pernas",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada com cabo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada com cabo ao redor do corpo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada de Braço Reta com Cabo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada de Tríceps com Corda e Rotação",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada de Tríceps na Polia",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Puxada na Máquina com Carga de Placas",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Puxada na máquina",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Puxada oblíqua na polia",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Puxada para o Rosto com Barra no Cabo",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Remada Alta (Pegada Aberta)",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada Alta Cruzada Bilateral na Polia",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Remada Alta com Barra",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Remada Alta com Halteres",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada Alta na Polia",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Remada Alta na Smith Machine",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Remada Alta no Cabo",
        "group": "Costas",
        "focus": "Trapézio Superior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Remada Alta no Cabo com Corda",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Remada Alternada com Anilha e Parada no Chão",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada Baixa com Triângulo (Polia)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Remada Bilateral com Halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada Cavalinho",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada Cruzada Unilateral em Pé com Cabo para Deltoide Posterior",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Remada Curvada Livre (Barra)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada Curvada com Barra",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada Curvada com Barra (Pegada Supinada)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Remada Inclinada com Halteres (Deitado)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada Invertida",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Remada Invertida (Australian Pull-up)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Remada Invertida (Cotovelos abertos)",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Remada Invertida com Pegada Pronada Corporal",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Remada Invertida com Pegada Supinada Usando o Peso do Corpo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Remada Invertida com Peso em Disco",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada Invertida em Pé com Peso Corporal",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Remada Landmine com Barra",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Remada Meadows com barra",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada Neutra em Máquina",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada Pendlay Alternada com Halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Remada Pendlay com barra (pegada pronada)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Remada Pendlay com halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada Pendlay com pegada supinada",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Remada Pendlay unilateral com halter",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada Pronada com Barra",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada Pronada na Máquina Smith",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada Renegade com Halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada Sentada com Halteres para Deltoide Posterior",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada Sentada na Máquina",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada Subalterna na Máquina",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada Supinada com Cabo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Remada Supinada com Halteres",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada T na Máquina com Apoio Peitoral",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral (Serrote)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada Unilateral Com Haltere Ajoelhado",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral com Halter",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral com Haltere (Joelho no Banco)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral no Cabo com Pegada Neutra",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral no Cabo — Pegada Supinada",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Remada alta com barra EZ",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Remada alta unilateral com haltere",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada com Barra na Landmine",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada com Máquina de Placas",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada com Máquina em Pegada Supinada",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada com pegada de pinça na anilha",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Remada cortador de grama com haltere (joelho apoiado)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada de Arco com Cabo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Remada de Caiaque com Cabo",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Remada em Anel",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Remada invertida na Smith Machine",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada na Máquina Apoiada no Peito",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada na Porta/Lençol (Foco expansão)",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Remada na Smith Machine com pegada supinada",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada no Banco Inclinado com Halteres (Chest-Supported Row)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada para Deltoides Posterior na Máquina",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Remada para deltoide posterior com halteres",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada unilateral (Lawnmower)",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada unilateral com halter para deltoide posterior",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Remada unilateral com haltere",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Remada unilateral para deltoide posterior na polia",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Remadas T-Bar na Landmine",
        "group": "Costas",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Roda Abdominal (Ab Wheel)",
        "group": "Abdominal",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Roda",
        "nivel": 2
    },
    {
        "name": "Rollouts com barra",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Rollouts na Máquina",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Rolo de Abdominal em Pé com Anel",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Rosca Alta Sentado na Polia Bilateral",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Alta com Cabo",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Alternada / Inclinada",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Alternada com Halteres em Apoio no Banco",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Alternada com Rotação (Halteres)",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Aranha Unilateral com Haltere",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Aranha com Halteres",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Arnold com Halter Sentado com Um Braço",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Arrastada com Barra",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca Bayesian",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Rosca Bayesian na Polia",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Com Disco Para Desenvolvimento Acima Da Cabeça Para Extensão De Tríceps",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Rosca Concentrada",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Concentrada Unilateral com Haltere Apoiada no Banco",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Concentrada com Haltere",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Concentrada com Peso Corporal",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Rosca Concentrada no Landmine",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca De Punho Com Barra Atrás Das Costas",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca Direta",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca Direta (Barra Reta/W)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca Direta na Polia Baixa",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Rosca Direta no Cabo",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Direta no Scott com Barra EZ Invertida",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca Inclinada Reversa com Apoio no Banco e Halteres",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada Reversa com Apoio no Banco e Halteres com Um Braço",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada Unilateral com Halter e Rotação",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inclinada Unilateral com Haltere",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inclinada com Apoio no Banco e Halteres",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inclinada com Halter Apoiada no Banco com um Braço",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada com Halteres (No banco a 45º)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada com Halteres e Apoio no Banco",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada com Halteres e Braço Apoiado no Banco",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Inversa Bayesian na Polia (sentado)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Rosca Inversa Inclinada com Halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Plana com Halter, Apoiada no Banco com um Braço",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Inversa Sentada com Halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral Com Haltere Em Pé",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral com Haltere (Sentado)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral com Haltere em Banco Inclinado",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral na Polia Alta (Bayesian)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral na Polia Alta com Rotação",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa com Barra",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Rosca Inversa com Halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa na Prancha com Halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Inversa no Cabo/Barra",
        "group": "Bíceps",
        "focus": "Braquial/Antebraço",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca Invertida Bayesian na Polia",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Isométrica (Toalha/Cinto)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Acessório Caseiro",
        "nivel": 2
    },
    {
        "name": "Rosca Martelo (Halteres/Corda)",
        "group": "Bíceps",
        "focus": "Braquial/Antebraço",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Martelo Bayesiana Sentada na Polia",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Inclinada com Halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral Com Haltere",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral Na Polia Alta Com Rotação",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral com Apoio no Banco",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral com Cabo",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral com Haltere em Banco Inclinado",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral em Pé com Haltere",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral na Polia Alta (Bayesian)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo com Haltere (Sentado, Unilateral)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo com Halteres (Sentado)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo com Halteres Apoiada no Banco Plano",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Martelo na Polia com Corda",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Máquina",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Rosca Scott (Máquina/Barra)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca Scott Unilateral com Haltere",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Scott com Halteres no Banco Reto",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Scott com barra W",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca Scott inversa com barra EZ",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca Sentada com Halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Sentada no Cabo Bayesian",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Spider",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Tríceps com Halteres ao Estilo Guilhotina",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Unilateral Com Halter Sentado",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Unilateral em Pé com Haltere",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Unilateral no Cabo (Bayesian)",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca Zottman Sentada com Halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Zottman com Haltere (Sentado, Unilateral)",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca Zottman com Halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca Zottman inclinada com halteres",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca alta alternada sentada na polia",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca arrastada com halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca arrastada na Smith Machine",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Rosca bilateral na polia alta",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca com Anel",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Rosca com Anilha para Desenvolvimento Militar",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca com Halter na Posição de Garçom",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca com Pegada Inversa na Barra do Cabo",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca com anilha",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca com anilha em agachamento isométrico",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca com barra EZ",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca com halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca com halteres em um joelho e com um braço estendido acima da cabeça",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca cruzada bilateral na polia",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca de Bíceps na Landmine",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Rosca de Bíceps na Máquina",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Rosca de Bíceps no Banco Scott com Halteres",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca de Bíceps no Suporte com Barra EZ",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca de Pulso com Haltere no Banco",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca de Punho (Flexão/Extensão)",
        "group": "Antebraços",
        "focus": "Flexores/Extensores",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca de Punho Unilateral com Halter no Banco",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca de Punho Unilateral com Haltere no Banco",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca de Punho no Cabo",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca de arrasto com barra W",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca de punho com barra",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca de punho com halteres",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca de punho no cabo com apoio",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca deitado com halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca fechada com barra EZ",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca inclinada com halteres",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca inclinada com halteres e rotação",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca inversa com barra EZ",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rosca inversa unilateral no cabo",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca martelo com halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca martelo na polia Bayesian",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rosca martelo sentado com haltere (braço único)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca na Polia com Rotação",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Rosca no Banco com Apoio de Halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Rosca unilateral em pé com haltere e rotação",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rosca unilateral no cabo alto com rotação",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rotação Alternada de Poste",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Rotação Externa com Cabo",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rotação Externa com Halteres",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rotação Externa do Ombro com Haltere",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rotação Interna com Cabo",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rotação Interna com Halteres",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Rotação Oblíqua no Landmine",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Rotação Pallof na polia",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rotação Torácica em 4 apoios",
        "group": "Mobilidade",
        "focus": "Costas/Ombros",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Rotação da Coluna Torácica com Peso Corporal",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Rotação de Tronco Ajoelhado (De Cima para Baixo)",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Rotação de Tronco com Cabo, Ajoelhado (De Cima para Baixo)",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Rotação de Tronco com Disco",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Rotação de Tronco em Pé (De Cima para Baixo)",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Rotação de Tronco em Pé com Cabo (De Cima para Baixo)",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Rotação de tronco na polia",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Rotação na Barra",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Russian Twist (Com anilha ou livre)",
        "group": "Abdominal",
        "focus": "Oblíquos / Rotação",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Russian Twist (peso corporal)",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Russian Twist com anilha",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Russian Twist com os Pés no Chão",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Russian Twist com os pés apoiados e halter",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Salto Alternado com Escalador de Montanha",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Salto Grupado (Tuck Jumps no lugar)",
        "group": "Cardio/Hiit",
        "focus": "Resistência Anaeróbica",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Salto Sentado na Caixa",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Salto Unilateral na Caixa",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Salto de Panturrilha com Barra",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Salto de Profundidade",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Salto na caixa",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Serra na prancha",
        "group": "Abdominal",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Shadow Boxing (Sombra com ou sem halteres leves)",
        "group": "Cardio/Hiit",
        "focus": "Motor Aeróbico",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Smith Machine Elevação de Joelhos Suspensa",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Smith Machine Elevação de Panturrilha Sentado",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Smith Machine Flexão Lateral",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Smith Machine Peso Morto Romeno",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Smith Machine Thrust de Quadril com uma perna",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Spoto Press com barra",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Sprawl (Meio Burpee)",
        "group": "Cardio/Hiit",
        "focus": "Resistência Anaeróbica",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Step Down Curtsy com Peso Corporal",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Step Down Parcial com o Peso do Corpo",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Step-Up Lateral com Halter na Posição Goblet",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Step-Up com Barra em Front Rack e Elevação do Joelho",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Step-Up com Barra no Front Rack",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Step-Up com Elevação do Joelho (Peso Corporal)",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Step-Up com Haltere (Posição Goblet)",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Step-up Lateral com Barra",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Step-up Lateral com Halteres",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Step-up Unilateral com Haltere e Elevação de Joelho",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Step-up com barra",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Step-up com barra e elevação do joelho",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Step-up com halteres",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Step-up com halteres em rack frontal",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Step-up na caixa (Halteres)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Step-up reverso com peso corporal",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 3
    },
    {
        "name": "Step-up unilateral com haltere",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Stiff (Barra/Halteres)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Alongada)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Stiff Romeno Landmine em Posição Escalonada",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Stiff Romeno Unilateral",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Stiff Romeno com Barra e Faixa Elástica",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Stiff com Barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Stiff com barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Stiff romeno com landmine",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Stiff unilateral com halteres",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Subida No Banco Unilateral Com Haltere Em Rack Frontal E Impulso De Joelho",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Subida no Banco com Barra - Equilíbrio",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Subida no Banco com Halteres e Elevação de Joelho",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Subida no banco com halter no rack frontal (braço único)",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Subida no banco com halteres na posição frontal e elevação do joelho",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Superman Solo",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Superman com Halteres",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Superman com anilha",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Superman com halteres — segurar",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Superman com peso corporal",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Supinação e Pronação de Punho com Halteres",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino Com Cabos",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Declinado Alternado com Haltere (Um Braço por Vez)",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Declinado Alternado na Polia",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Declinado Com Cabos",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Declinado Guilhotina Com Halteres",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Supino Declinado Unilateral com Haltere",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Declinado Unilateral na Polia",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Declinado com Barra/Halteres",
        "group": "Peito",
        "focus": "Fibras Inferiores",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Declinado com Halteres (Aperto)",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Declinado na Máquina",
        "group": "Peito",
        "focus": "Fibras Inferiores",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Supino Declinado na Polia em Arco",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Fechado com Halteres (Squeeze Press / Hex Press)",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Guilhotina Inclinado Alto com Barra",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Supino Guilhotina Unilateral com Haltere para Tríceps",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Guilhotina com Barra para Tríceps",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino Guilhotina com Halteres",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Supino Inclinado Alto com Haltere (Unilateral)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado Alto com Halteres e Pegada Neutra",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado Guilhotina com Barra",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Supino Inclinado Guilhotina com Halteres",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Supino Inclinado Unilateral com Haltere",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado Unilateral na Polia",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Barra",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado com Barra em Ângulo Elevado",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado com Cabo em Arco",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Cabos",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Halteres",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Halteres (Pegada Neutra)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Halteres em Altura Elevada",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado na Máquina",
        "group": "Peito",
        "focus": "Fibras Superiores",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado na Máquina Smith",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Supino Larsen com barra",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Supino Larsen com halteres",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Pegada Fechada",
        "group": "Tríceps",
        "focus": "Todas",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino Reto com Barra",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino Reto com Halteres",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino Reto na Máquina",
        "group": "Peito",
        "focus": "Fibras Médias",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Supino Unilateral com Haltere",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino Unilateral no Cabo",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino Unilateral no Landmine",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino alternado em pé no cabo",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino alternado na polia",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino com Halteres (Pegada Neutra)",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino com Pegada Inversa com Halteres",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Supino com Pegada Neutra",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Supino com Pegada Reversa na Barra",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino com barra",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino com barra (posição hook-lying)",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Supino com cabos",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino com halteres",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino com halteres apertados",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino com halteres no chão",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino com pegada fechada (barra)",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino com pegada fechada na máquina Smith",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Supino declinado alternado em pé no cabo",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino declinado com barra",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino declinado com halteres",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino declinado com halteres (pegada neutra)",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Supino declinado com pegada fechada na barra",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Supino declinado em pé na polia",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino em Pé Unilateral com Cabo",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino guilhotina na Smith Machine",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Supino inclinado alternado na polia",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino inclinado em pé na polia",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Supino inclinado unilateral em pé na máquina de cabos",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Supino na Máquina Smith",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Supino no Chão com Barra",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Supino unilateral no cabo",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Suspensão com Peso",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Svend Press em Pé na Polia",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Swing com Haltere",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Tate press com halteres",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Thruster Alternado com Halteres (Um Braço de Cada Vez)",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Thruster Unilateral Com Haltere",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Thruster com Landmine",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Thruster com anilha",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Thruster com barra",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Thruster com halteres",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Thrusters (Agachamento com Desenvolvimento)",
        "group": "Cardio/Hiit",
        "focus": "Resistência Anaeróbica",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Toque Alternado no Calcanhar",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Toque no Calcanhar",
        "group": "Abdominal",
        "focus": "Oblíquos / Rotação",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Torção Ajoelhada no Landmine",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Torção Em Pé Com Disco",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Torção Estática no Landmine",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Torção Russa com Haltere (Braço Estendido)",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 3
    },
    {
        "name": "Torção Russa no Landmine",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Tríceps Coice (Kickback) Halter/Cabo",
        "group": "Tríceps",
        "focus": "Lateral/Medial",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Tríceps Corda",
        "group": "Tríceps",
        "focus": "Lateral/Medial",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Tríceps Francês (Halter/Cabo)",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Tríceps Máquina / Dip Machine",
        "group": "Tríceps",
        "focus": "Lateral/Medial",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Tríceps Pulley (Barra Reta/V)",
        "group": "Tríceps",
        "focus": "Lateral/Medial",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa (Barra W)",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa (Landmine)",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa Com Barra Na Polia",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Tríceps Testa Inclinado com Haltere (Braço Único)",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa Inclinado com Halteres",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa Unilateral com Halter",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa Unilateral na Polia",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Tríceps Testa com Barra",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa com Halteres",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Tríceps Testa com Halteres no Banco Declinado",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Tríceps Testa na Máquina Smith",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Máquina",
        "nivel": 2
    },
    {
        "name": "Tríceps Unilateral na Polia com Corda",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Tríceps na Polia (Unilateral)",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Tríceps na Polia Alta com Barra",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Tríceps na Polia Cruzada",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 3
    },
    {
        "name": "Tríceps na Polia com Barra em V",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Máquina",
        "nivel": 1
    },
    {
        "name": "Tríceps na Polia com Corda",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Tríceps na polia com barra (pegada supinada)",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Tríceps testa com barra",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Tríceps testa cruzado bilateral na polia",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Tríceps testa no cabo com corda",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Voador Inverso Unilateral na Polia Alta",
        "group": "Ombro",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Voador Invertido com Anel",
        "group": "Ombro",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "Voador em Pé com Anel",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Peso Corporal",
        "nivel": 1
    },
    {
        "name": "Voador inverso deitado com halteres (rotação interna)",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Voador para deltoide posterior com disco e rotação interna",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Voo para deltoide posterior com disco",
        "group": "Ombro",
        "focus": "Deltoide Posterior",
        "equip": "Barra",
        "nivel": 1
    },
    {
        "name": "Wood Chopper Meio Ajoelhado com Cabo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 1
    },
    {
        "name": "Woodchopper Ajoelhado No Cabo",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Woodchopper Ajoelhado com Haltere",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 1
    },
    {
        "name": "Woodchopper com cabo ajoelhado — de baixo para cima",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Woodchopper com haltere",
        "group": "Abdominal",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Woodchopper com haltere (meio ajoelhado)",
        "group": "Abdominal",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Z Press com barra",
        "group": "Ombro",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "Zercher Good Morning com barra",
        "group": "Lombar",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "arra",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 3
    },
    {
        "name": "bida No Banco Unilateral Com Haltere Em Rack Frontal E Impulso De Joelho",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "fundo em Reverência",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "gachamento Lateral Alternado com Peso Corporal",
        "group": "Pernas",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Peso Corporal",
        "nivel": 2
    },
    {
        "name": "tamento Terra com Barra em uma Perna Só",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barra",
        "nivel": 3
    }
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