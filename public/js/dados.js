// 2. DICIONÁRIO ESTRATÉGICO: SUBNÍVEIS E BIOMECÂNICA (ATUALIZADO V3 - NÍVEIS DE DIFICULDADE)
const dictionaryData = [
    {
        "name": "Abaixamento de Pernas",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Abdominais",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal Ajoelhado com Barra no Cabo",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdominal Ajoelhado com Corda no Cabo",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdominal Ajoelhado na Polia com Barra de Remada",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdominal Bicicleta",
        "group": "Core",
        "focus": "Oblíquos / Rotação",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Abdominal Canivete / V-Up",
        "group": "Core",
        "focus": "Superior",
        "equip": "Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Abdominal Com Faixa Elástica",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Abdominal Em Pé Com Barra No Cabo",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Abdominal Infra no Solo (Reverse Crunch)",
        "group": "Core",
        "focus": "Inferior",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Abdominal Lateral na Bola Suíça",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal Na Polia Em Pé",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Abdominal Oblíquo Ajoelhado na Polia",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdominal Oblíquo na Máquina Smith",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Máquina_Smith",
        "nivel": 3
    },
    {
        "name": "Abdominal Sapinho",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal Sapo",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal Supra (Solo/Carga)",
        "group": "Core",
        "focus": "Superior",
        "equip": "Peso_Corporal/Halter",
        "nivel": 2
    },
    {
        "name": "Abdominal bicicleta",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal com Anilha",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Abdominal com Bola de Estabilidade usando Peso Corporal",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Abdominal com Remada",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdominal com barra",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Abdominal com haltere",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Abdominal com landmine",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Abdominal em Pé na Polia com Corda",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdominal em posição de mala com haltere",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Abdominal na Máquina",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdominal na Máquina Smith",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Abdominal na Polia Alta (Cable Crunch)",
        "group": "Core",
        "focus": "Superior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Abdominal no Bosu com Flexão de Joelhos",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Abdominal russo com haltere",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Abdução de Quadril com Mini Band",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril com Peso Corporal",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril e Glúteo na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril em Pé com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril em Pé na Polia",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril em Quatro Apoios com Cabo",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdução de Quadril na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Abdução de quadril com miniband em quatro apoios",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Abdução de quadril deitado com miniband",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Abdução de quadril deitado de lado com miniband",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Abdução de quadril em pé com miniband",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Abdução de quadril na máquina afundo",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
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
        "name": "Abertura de braços com miniband",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Adução de Braço Estendido em Ajoelhado Lateral",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Lateral + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Adução de Quadril com Elástico",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Adução de quadril em pé com cabo",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
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
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Afundo Alternado Com Landmine E Rotação",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo Alternado Com Peso Corporal",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Afundo Alternado com Agachamento Goblet com Halteres",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Alternado com Halteres",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Alternado com Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Alternado com Salto (Peso Corporal)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Balançado com Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Búlgaro",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Afundo Búlgaro Assistido",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Afundo Búlgaro com Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo Búlgaro com Haltere (goblet)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Búlgaro com Haltere em Pegada Goblet",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Búlgaro com Halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Caminhando",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Curtsy Com Haltere Em Taça",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Afundo Curtsy com Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo Curtsy com Deficit e Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Frontal com Haltere em Pegada Goblet",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Afundo Goblet Com Halter",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Afundo Inverso com Déficit Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral Alternado com Halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral Alternado com Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral com Anilha",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Afundo Lateral com Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo Lateral com Halteres e Alcance",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral com Kettlebell (Unilateral)",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral com Kettlebells em Rack Frontal (Duplo)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Afundo Lateral com Salto (Peso Corporal)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo Lateral em Taça com Landmine",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo No Landmine Com Desenvolvimento Acima Da Cabeça",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoide Anterior e Lateral + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo Reverso Alternado com Halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Reverso Alternado com Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Reverso Unilateral com Kettlebell em Front Rack",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Reverso com Anilha",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso com Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Afundo Reverso com Deficit e Halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Afundo Reverso com Deficit e Halteres no Estilo Goblet",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Afundo Reverso com Haltere (Goblet)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso com Halteres",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso com Kettlebell em Deficit",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Reverso com Kettlebells no Rack Frontal (Duplo)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Reverso com Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso com TRX",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Afundo Reverso na Máquina Smith",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Afundo Reverência Unilateral com Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo Reverência com Kettlebells na Posição Rack Frontal (Duplo)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Afundo com Balanço de Haltere",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo com Barra em Deficit com Reverência",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo com Haltere em Déficit com Curvatura",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Afundo com Halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Afundo com Landmine",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Afundo com Passagem de Kettlebell Alternado",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo com Passagem de Perna (Peso Corporal)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo com barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Afundo com barra e faixa elástica",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Afundo com disco à frente",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Afundo com déficit no disco",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo de Deficit com Haltere no Goblet",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Afundo em Reverência",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Afundo em Reverência com Landmine",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Afundo em Reverência com Landmine (Pegada Goblet)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Afundo em reverência com anilha",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Afundo lateral com kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Afundo na Máquina Smith",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Afundo na Polia",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Afundo no TRX",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Afundo reverso com barra hexagonal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Afundo reverso com kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Afundo reverso com rotação de tronco (com anilha)",
        "group": "Glúteos + Oblíquos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Oblíquos (Externos e Internos) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Afundo/Passada (Halteres/Barra)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Barra/Halteres",
        "nivel": 2
    },
    {
        "name": "Afundos Laterais",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento Alternado com Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento Búlgaro Assistido com Halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento Búlgaro Assistido com Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento Búlgaro com tronco inclinado à frente (Halteres/Smith)",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Máquina/Halteres",
        "nivel": 3
    },
    {
        "name": "Agachamento Com Disco Sobre a Cabeça",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento Espanhol com Faixa Elástica",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Banda",
        "nivel": 3
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
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento Frontal com Barra Olímpica",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento Frontal com Barra e Alças",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento Frontal com Barra — Calcanhares Elevados",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento Frontal com Barra — Musculação",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento Frontal com Halteres",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento Frontal com Halteres (pausa)",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento Goblet (Halter/Anilha no peito)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Halter/Kettlebell",
        "nivel": 2
    },
    {
        "name": "Agachamento Goblet Estreito com Haltere e Calcanhares Elevados",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Agachamento Goblet Sissy na Máquina",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Agachamento Goblet com Halter (Calcanhares Elevados)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento Goblet com Haltere",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento Goblet com Haltere (Pulsos)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento Goblet com Kettlebell",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento Goblet com Kettlebell — calcanhares elevados",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento Goblet na Polia",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento Hack Horizontal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento Hack com Landmine",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento Isométrico com Anilha",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Agachamento Isométrico com Anilha e Alcance",
        "group": "Deltoides Frontais + Glúteos + Quadríceps + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Tríceps (Complexo Completo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento Landmine",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Agachamento Lateral (Cossack)",
        "group": "Mobilidade",
        "focus": "Pernas/Quadril",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento Lateral Alternado com Peso Corporal",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
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
        "group": "Deltoides Frontais + Quadríceps",
        "focus": "Deltoide Lateral + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Agachamento Overhead com Haltere",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Agachamento Overhead com bastão",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento Pausado com Barra",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento Pulsado com Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento Sissy Assistido com Peso Corporal",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento Sissy com Barra no Landmine",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento Sissy com Bola Suíça",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Agachamento Sissy na Máquina Smith",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina_Smith",
        "nivel": 3
    },
    {
        "name": "Agachamento Sissy na máquina",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Agachamento Skater",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Recuperação",
        "nivel": 2
    },
    {
        "name": "Agachamento Sumô (Barra, Halter pesado ou Anilha pesada pendurada)",
        "group": "Pernas",
        "focus": "Adutores",
        "equip": "Barra/Halteres",
        "nivel": 2
    },
    {
        "name": "Agachamento Sumô com Haltere",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento Unilateral Concêntrico",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Agachamento Unilateral Excêntrico no Banco",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Agachamento Unilateral no Bosu Ball",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Agachamento Zercher com Barra",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento Zercher com Barra EZ",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Agachamento Zercher no cabo",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Agachamento com Anilha",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Agachamento com Apoio de Halteres",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento com Apoio de HalteresHalteres · IntermediárioAfundo Reverso com Halteres",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento com Apoio de Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento com Apoio de Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Balanço de Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento com Banda Elástica no Quadril",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Agachamento com Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento com Barra (Barra Alta)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Agachamento com Barra (Low-Bar)",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento com Barra em Apoio Lateral",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento com Barra, Toque e Pausa",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento com Calcanhares Elevados",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Cinto e Cabo",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento com Cinto na Máquina",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento com Cinto no Cabo",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento com Disco e Alcance",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Agachamento com Elástico e Remada com Um Braço",
        "group": "Bíceps + Dorsais + Glúteos + Quadríceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Glúteo Máximo (Complexo) + Latíssimo do Dorso (Foco em Espessura) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Agachamento com Elástico em Isometria e Remada",
        "group": "Bíceps + Dorsais + Glúteos + Quadríceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Glúteo Máximo (Complexo) + Latíssimo do Dorso (Foco em Espessura) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Agachamento com Halteres",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento com Halteres e Rolamento",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento com Halteres no Caixote",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento com Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Banda, Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Agachamento com Kettlebell na Caixa",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento com Mini Band",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Agachamento com Máquina Pêndulo",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento com Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Peso Corporal em Caixa",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Prato",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento com Salto (Peso Corporal)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com Salto no TRX",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "TRX",
        "nivel": 2
    },
    {
        "name": "Agachamento com Salto no TRXTRX · IntermediárioTRX Afundo Lateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Agachamento com Salto usando Mini Band",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Agachamento com TRX",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Agachamento com barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento com barra e bandas elásticas",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento com barra hexagonal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento com barra nas costas (calcanhares elevados)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento com desenvolvimento na polia",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoide Anterior e Lateral + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento com elástico",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Agachamento com giro de kettlebell",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento com haltere deslocado",
        "group": "Glúteos + Oblíquos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Oblíquos (Externos e Internos) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento com o peso do corpo",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com salto",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento com salto in and out",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Agachamento com uma perna só usando o peso do corpo",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Agachamento de Garçom com Kettlebell",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento de Goblet com Bola Suíça na Parede",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento de Uma Perna com Calcanhares Elevados, com Halteres",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Agachamento dividido com barra hexagonal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento do Garçom com Placa Alternada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Agachamento estático de parede",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento frontal com barra e bandas",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento frontal com kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento na Bola Suíça com Apoio na Parede",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Agachamento na Máquina Hack",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento na Parede com Bola Suíça e Halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Agachamento na Parede com Bola Suíça e Halteres na Posição Frontal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Agachamento na Parede com Peso",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Agachamento na caixa com barra e pausa",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Agachamento no Smith",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Agachamento no Smith (pés projetados à frente)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Agachamento no Smith com postura estreita",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Alcance com Anilha",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Alcance e Capture",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos) + Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Alongamento Abdominal Variação Dois",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento Bilateral de Panturrilha na Caixa",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Com Rebotes Do Levantamento Terra",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento De Panturrilhas Variação Três",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento Dinâmico de Glúteos com Puxada de Joelho em Pé",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Dos Posteriores De Coxa Variação Três",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento Estático Unilateral do Glúteo",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Lateral Sentado",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Recuperação, Yoga",
        "nivel": 1
    },
    {
        "name": "Alongamento Lateral de Oração",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Lombar Variação Quatro",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento Lombar Variação Um",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento Lombar — Variação Três",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento Peitoral — Variação 1",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento Rotatório do Quadril Glúteo 1 Sentado",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Sentado do Rotador do Quadril Glúteo 3",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Sentado do Trapézio Superior e do Supraespinhal",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Sentado dos Extensores do Punho",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Sentado dos Flexores do Punho",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Sentado para a Frente",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Alongamento Supino do Rotador do Quadril Glúteo",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Unilateral da Panturrilha na Caixa",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento Unilateral do Gastrocnêmio na Parede",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento da Cobra 1",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento da Cobra 2",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento da Linha Lateral e Latíssimo do Dorso",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento da Oração 2 Roller",
        "group": "Dorsais + Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento da Prece 1",
        "group": "Dorsais + Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Abdominais Variação Três",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Antebraços Variação Quatro",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Antebraços Variação Três",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Braço Sentado",
        "group": "Antebraços + Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Flexores do Antebraço",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Alongamento de Bíceps Variação Cinco",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Bíceps Variação Um",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Bíceps — Variação Três",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Dorsais — Variação Três",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Dorsais — Variação Um",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Dorsal e Rotação Externa do Ombro 2 Ajoelhado com Bastão",
        "group": "Deltoides Frontais + Deltoides Superiores + Dorsais",
        "focus": "Deltoides (Complexo Completo) + Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Glúteos — Variação Dois",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Glúteos — Variação Três",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Glúteos — Variação Um",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Ombros — Variação 1",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Ombros — Variação 2",
        "group": "Deltoides Frontais + Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Ombros — Variação Quatro",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Ombros — Variação Três",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Panturrilha na Posição de Flexão",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Panturrilhas Variação Um",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Panturrilhas em Caixa Bilateral",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Pescoço – Postura Fácil",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadril Noventa Noventa com Peso Corporal",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadríceps Ajoelhado",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadríceps Variação Quatro",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadríceps Variação Um",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadríceps em Postura da Lua Crescente com Bloco",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadríceps no Chão com Faixa",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadríceps — Variação Dois",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Quadríceps — Variação Três",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Rotação Externa de Ombros e Costas 1 - Ajoelhado com Bastão",
        "group": "Deltoides Frontais + Deltoides Superiores + Dorsais",
        "focus": "Deltoides (Complexo Completo) + Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Rotação Externa do Dorsal e do Ombro 3 — Ajoelhado com Bastão",
        "group": "Deltoides Frontais + Deltoides Superiores + Dorsais",
        "focus": "Deltoides (Complexo Completo) + Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Rotação de Quadril Glúteo 2 Sentado",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento de Tríceps Variação Um",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Tríceps — Variação 2",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de Tríceps — Variação Três",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de bíceps — Variação Dois",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento de panturrilhas — Variação Dois",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento do Flexor do Quadril com Afundo Ajoelhado 2",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento do Flexor do Quadril em Posição de Afundo Ajoelhado 1",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento do Flexor do Quadril em Posição de Afundo ajoelhado 3",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento do Peito — Variação Três",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento do Peitoral — Variação Dois",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento do Peitoral — Variação Quatro",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento do Posterior de Coxa — Variação Quatro",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento do Quadríceps na Postura da Lua Crescente",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Alongamento do Trapézio e da Parte Média das Costas — Variação Dois",
        "group": "Trapezio meio das Costas",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento do Trapézio — Variação 1",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento do sóleo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alongamento do trapézio e da parte média das costas — Variação Um",
        "group": "Trapezio meio das Costas",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento dos Antebraços — Variação Dois",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento dos Antebraços — Variação Um",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento dos Dorsais — Variação Dois",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento dos Isquiotibiais Variação Um",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento dos Isquiotibiais — Variação Dois",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento dos Trapézios Variação Dois",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento dos Trapézios — Variação Três",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento lombar Variação Dois",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Alongamento sentado dos quadríceps",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Alpinista",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Andar na ponta dos pés",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Anjos de Parede",
        "group": "Deltoides Frontais + Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Arnold Press Alternado com Halteres",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Arnold Press Sentado com Halteres",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Arnold Press Unilateral com Haltere",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Arnold Press com halteres",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Arranco com Barra",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Arranco com Landmine",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Arranco com kettlebell (duplo)",
        "group": "Deltoides Frontais + Glúteos",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Arranco de Barra",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Arremesso Dividido No Landmine",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Arremesso a partir da posição pendurada com kettlebell",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Ativação do Serrato — Soco Cruzado",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Auxílio de Máquina para Flexão de Queixo",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Avanço",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Avanço Alternado com Landmine para Supino",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Avanço Caminhando com Anilha Acima da Cabeça",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Avanço Reverso com Deficit e Halteres na Frente",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Avanço Reverso com Deficit e Kettlebell na Posição Frontal",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Avanço Reverso com Deficit em Taça",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Avanço Reverso com Kettlebell (Braço Único)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Avanço com Barra em Deficit",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Avanço com Barra à Frente em Deficit",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Avanço com Curtsy em Deficit com Halteres na Posição de Front Rack",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Avanço com Deficit e Barra Zercher",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Avanço com Kettlebells em Rack Frontal (Duplo)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Avanço com barra",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Avanço com kettlebell em apoio frontal (um braço)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Avanços Alternados com Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Avião (Deitado de Bruços) na Caixa com Alças — Puxada de Braços",
        "group": "Antebraços + Dorsais + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Flexores do Antebraço + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Balanço Para Remada Alta",
        "group": "Deltoides Frontais + Glúteos",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Barra Fixa",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Barra Fixa (Pull-up / Chin-up)",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Calistenia",
        "nivel": 2
    },
    {
        "name": "Barra Fixa (pegada supinada)",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Barra Fixa Assistida",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Barra Fixa Assistida ao Estilo Gironda",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Barra Fixa Assistida por Máquina",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Barra Fixa Isométrica",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Calistenia",
        "nivel": 2
    },
    {
        "name": "Barra Fixa com Sobrecarga de Halteres",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Barra com Anel",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Barra com peso",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Barra de Remada na Polia Remada em Pé",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Barra de Tração",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Barra fixa assistida com pegada mista.",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Barra fixa assistida na Smith Machine",
        "group": "Dorsais + Trapezio meio das Costas",
        "focus": "Latíssimo do Dorso (Foco em Largura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Bear Crawl (Caminhada do Urso)",
        "group": "Core",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Bebê Feliz",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Bicicleta Unilateral",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Bicicleta ergométrica",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Bird Dog",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Blocos Para Dobra Em Pé",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Blocos para Panturrilha na Postura da Pirâmide",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Blocos para Postura da Pirâmide",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Bola de Estabilidade Limpa-vidros",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Bola de Estabilidade Mexendo o Caldeirão",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
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
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Bom Dia com Anilha",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Bom Dia com Barra (Posição Baixa)",
        "group": "Glúteos + Posteriores da coxa",
        "focus": "Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Bosu Prancha Ativa — Ativação do Serrato",
        "group": "Abdominais + Peito",
        "focus": "Core (Transverso do Abdômen e Estabilizadores) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Braços Puxada Com Alças Arado Deitado De Bruços Sobre A Caixa",
        "group": "Antebraços + Dorsais + Trapezio meio das Costas",
        "focus": "Flexores do Antebraço + Latíssimo do Dorso (Foco em Largura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Braços de Águia — Queixo no Peito",
        "group": "Trapezio meio das Costas + Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Burpee",
        "group": "Abdominais + Peito + Quadríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Quadríceps Femoral (Geral) + Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Burpees",
        "group": "Cardio/HIIT",
        "focus": "Resistência Anaeróbica",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Cabeça ao joelho com torção",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Yoga",
        "nivel": 3
    },
    {
        "name": "Cabo Meio Ajoelhado de Alto a Baixo Cortador de Madeira",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Cabo Meio Ajoelhado de Baixo Para Cima Lenhador",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Cadeira Abdutora",
        "group": "Pernas",
        "focus": "Glúteo Médio/Mínimo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Cadeira Adutora (Máquina)",
        "group": "Pernas",
        "focus": "Adutores",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Cadeira Extensora (Máquina)",
        "group": "Pernas",
        "focus": "Quadríceps (Reto Femoral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Cadeira Flexora (Sentado)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Encurtada)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Caminhada Com Disco Sobre a Cabeça",
        "group": "Abdominais + Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Reto Abdominal (Geral) + Trapézio (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Caminhada Lateral com Elástico",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Caminhada Lateral com Mini Band",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Caminhada do Fazendeiro Unilateral (Suitcase Carry)",
        "group": "Core",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Halter",
        "nivel": 2
    },
    {
        "name": "Caminhada do Fazendeiro com Halteres",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Caminhada do Fazendeiro com Kettlebell",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Caminhada do Fazendeiro com Pegada em Pinça (Disco)",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Caminhada do Fazendeiro com Pesa Russa (Braço Único)",
        "group": "Antebraços + Oblíquos",
        "focus": "Flexores do Antebraço + Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Caminhada do Fazendeiro com kettlebell",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Caminhada na Esteira de Costas",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Caminhe na postura do cão voltado para baixo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Cardio Box Pés Rápidos",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Cardio",
        "nivel": 2
    },
    {
        "name": "Cardio Karaokê",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 2
    },
    {
        "name": "Cardio Lateral Pés Rápidos",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Músculo Gastrocnêmio + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio Polichinelos Cruzados",
        "group": "Deltoides Frontais + Glúteos + Panturrilhas",
        "focus": "Deltoides (Complexo Completo) + Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio Pés Rápidos",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio Salto Lateral Em Uma Perna",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio Salto unipodal para frente",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio Saída em Polichinelos",
        "group": "Deltoides Frontais + Glúteos",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio Shuffle Lateral",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio Skater Para Burpee Com Uma Perna",
        "group": "Glúteos + Panturrilhas + Peito",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cardio",
        "nivel": 3
    },
    {
        "name": "Cardio com Três Passos Heismans",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio no Ski Erg",
        "group": "Abdominais + Dorsais + Tríceps",
        "focus": "Latíssimo do Dorso (Geral) + Reto Abdominal (Geral) + Tríceps (Complexo Completo)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio para Frente e para Trás",
        "group": "Abdominais + Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral) + Reto Abdominal (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio — Assault Bike",
        "group": "Glúteos + Peito + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Peitoral Médio (Fibras Esternocostais) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio — In and Outs",
        "group": "Glúteos + Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo)",
        "equip": "Cardio",
        "nivel": 2
    },
    {
        "name": "Cardio — Polichinelos Seal",
        "group": "Deltoides Frontais + Deltoides Superiores + Panturrilhas",
        "focus": "Deltoides (Complexo Completo) + Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Cardio — Salto Longo com Passadas Rápidas para Trás",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Cardio",
        "nivel": 2
    },
    {
        "name": "Cardio — shuffle lateral: dentro, dentro, fora, fora",
        "group": "Glúteos + Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Médio e Mínimo",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Carregamento de Mala com Barra",
        "group": "Glúteos + Oblíquos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Cem",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Cem Pernas Estendidas",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Chest press inclinado alternado em pé na polia",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Chin-up Fechado (barra fixa)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Calistenia",
        "nivel": 2
    },
    {
        "name": "Chute Médio de Perna Reta em Pé com Cabo",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Chute Tesoura",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Chute Tesoura Lateral",
        "group": "Abdominais",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Chute Tesoura com Mini Band",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Chute de Glúteo em Pé no Cabo",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Clamshells 2 Deitado de Lado",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 2
    },
    {
        "name": "Clean and Press com Haltere (Braço Único)",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Anterior e Lateral + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Clean and Press com Kettlebell",
        "group": "Deltoides Frontais + Glúteos",
        "focus": "Deltoide Anterior e Lateral + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Clean and Press com barra",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Anterior e Lateral + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Clean and Press com halteres",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Anterior e Lateral + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Clean com anilha",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Clean e Jerk com Pesa Russa",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Clean e Press com Disco",
        "group": "Deltoides Frontais + Glúteos",
        "focus": "Deltoide Anterior e Lateral + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Coice de Glúteo em Pé com Mini Band",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Coice de glúteo na prancha com miniband",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Coice na Máquina",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Concha 1 Lado Deitado",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 2
    },
    {
        "name": "Concha com Mini-Banda",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Conchas 3 Rotações Internas Externas Deitado de Lado",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 2
    },
    {
        "name": "Conquilha com Resistência 4 Deitado de Lado",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 2
    },
    {
        "name": "Controle a posição da prancha frontal",
        "group": "Abdominais + Deltoides Frontais + Parte Inferior das Costas",
        "focus": "Core (Transverso do Abdômen e Estabilizadores) + Deltoide Anterior + Eretores da Espinha (Região Lombar)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Corrida Calcanhar no Glúteo",
        "group": "Cardio/HIIT",
        "focus": "Motor Aeróbico",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Corrida Deitado De Costas",
        "group": "Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Quadríceps Femoral (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Corrida Estacionária",
        "group": "Cardio/HIIT",
        "focus": "Motor Aeróbico",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Corrida com Elevação de Joelhos (High Knees)",
        "group": "Cardio/HIIT",
        "focus": "Motor Aeróbico",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Corte de madeira com cabo — em pé, de baixo para cima",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos) + Reto Abdominal (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Costas Preparatórios de Remada Airplane Sentado",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Crossover Polia Média",
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crossover de Baixo para Cima",
        "group": "Peitoral",
        "focus": "Fibras Superiores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crossover de Cima para Baixo",
        "group": "Peitoral",
        "focus": "Fibras Inferiores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crucifixo Alternado no Banco Inclinado com Cabos e Rotação Interna",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Com Cabos",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Declinado Com Halteres",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo Declinado com Cabo (Unilateral)",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Em Pé Unilateral No Cabo Com Rotação Interna",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inclinado Unilateral com Cabo",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado com Halteres",
        "group": "Peito + Peitoral",
        "focus": "Fibras Superiores + Peitoral Superior (Fibras Claviculares)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado com Halteres e Rotação Interna",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inclinado em Pé com Cabo (Unilateral)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado em Pé com Cabo — Unilateral (Rotação Interna)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado em Pé no Cabo, Alternado, com Rotação Interna",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado na Polia (movimento em arco)",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inclinado no Cabo",
        "group": "Peitoral",
        "focus": "Fibras Superiores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inverso Cruzado na Polia Alta",
        "group": "Ombros",
        "focus": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inverso Curvado com Halteres",
        "group": "Ombros",
        "focus": "Deltoide Posterior",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Crucifixo Inverso Sentado com Halteres",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inverso na Máquina",
        "group": "Ombros",
        "focus": "Deltoide Posterior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Inverso na Polia Alta com Rotação Interna",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Reto com Halteres",
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Crucifixo Reto na Máquina (Peck Deck)",
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Unilateral com Faixa Elástica (Rotação Interna)",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Crucifixo Unilateral em Pé com Cabo",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo Unilateral no Cabo com Apoio",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo acima da cabeça com miniband",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Crucifixo alternado em pé na polia",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo alternado no banco com cabos",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo alternado no cabo em banco declinado",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo com Elástico",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Crucifixo com Halteres com Rotação Interna",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Crucifixo com halteres",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo com kettlebell",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo declinado alternado em pé na polia",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo declinado alternado em pé na polia com rotação interna",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo declinado na polia",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo declinado no cabo com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo em pé no cabo, alternado, com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo inclinado alternado em pé no crossover",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo inclinado em pé no cabo",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo inclinado na polia",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo inclinado na polia com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo inverso alto unilateral na polia com rotação interna",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo inverso com halteres",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo inverso no cabo alto",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo na polia com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo na polia no banco com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo na polia no banco declinado com rotação interna dos ombros",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo no Banco Declinado com Cabos",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo no Banco com Cabos",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo no Banco com Elástico",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Crucifixo no chão com halteres",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo no chão com halteres e rotação interna",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo no chão com kettlebell",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo unilateral com kettlebell",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo unilateral no cabo no banco",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crucifixo unilateral no chão com halter",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo unilateral no chão com halter e rotação interna",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crucifixo unilateral no chão com kettlebell",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Crunch Oblíquo Ajoelhado na Polia com Corda",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Crunch oblíquo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Curl Nórdico de Isquiotibiais",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Curl de posterior de coxa na polia",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Cão olhando para baixo: ponta do pé ao calcanhar",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Círculo com o Tornozelo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Círculo de Braços para Trás",
        "group": "Deltoides Frontais + Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Círculos com os Braços para Frente",
        "group": "Deltoides Frontais + Deltoides Superiores",
        "focus": "Deltoide Anterior",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Cócoras Profundas",
        "group": "Mobilidade",
        "focus": "Pernas/Quadril",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Dead Bug",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Dead Bugs Cruzado Lateral",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Dead Bugs do Mesmo Lado",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos) + Reto Abdominal (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Descida do step com peso corporal",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Ajoelhado no Landmine",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Alternado Com Um Braço No Landmine",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Alternado Sentado No Landmine",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Alternado com Halteres",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Alternado com Halteres (Pegada Neutra)",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Arnold (Arnold Press)",
        "group": "Ombros",
        "focus": "Deltoide Anterior",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Bottoms-Up com Kettlebell",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Desenvolvimento Bradford com barra",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Com Barra Atrás da Nuca",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Cubano com Barra W",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Cubano com Halteres",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Larsen unilateral com kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Militar (Barra)",
        "group": "Ombros",
        "focus": "Deltoide Anterior",
        "equip": "Barra",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Militar Sentado no Landmine",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Militar com Barra",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Militar no Landmine",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Sentado Unilateral com Landmine",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Sentado com Kettlebell",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento Sentado na Smith Machine",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento Unilateral com Halter",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento Unilateral com Haltere em Pegada Neutra",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento Unilateral com Kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento Unilateral com Landmine",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento acima da cabeça com barra W",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com Faixa Elástica",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com Halteres",
        "group": "Ombros",
        "focus": "Deltoide Anterior",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Desenvolvimento com Halteres (Pegada Neutra)",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com Halteres Sentado",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com barra atrás da cabeça (sentado)",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Desenvolvimento com cabo",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com halteres",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento com halteres sentado (pegada neutra)",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento de Braço Único com Kettlebell na Posição Invertida",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Desenvolvimento em Y com Halteres Sentado",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento em Y com halteres",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento na Máquina",
        "group": "Ombros",
        "focus": "Deltoide Anterior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Desenvolvimento unilateral com haltere",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Deslizamento do Nervo Ulnar Sentado",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Deslize para explorar",
        "group": "Dorsais + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Deslocamento Lateral com Mini Band",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
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
        "name": "Desvios Ulnares do Punho",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Dorsiflexão de Tornozelo na Parede",
        "group": "Mobilidade",
        "focus": "Tornozelos",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Dragonflag Excêntrico",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Driver com anilha",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação Alternada de Deltoides Posterior com Halteres",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Elevação Alternada de Perna Dobrada",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação Alternada de Pernas",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação Cruzada de Membros em Posição de 4 Pontos",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação Cruzada de Membros em Tuck de Cotovelo Joelho na Posição de Flexão",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Recuperação",
        "nivel": 3
    },
    {
        "name": "Elevação Dupla de Panturrilha Sentado com Kettlebell",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal (Anilha/Cabo)",
        "group": "Ombros",
        "focus": "Deltoide Anterior",
        "equip": "Halter/Cabo",
        "nivel": 2
    },
    {
        "name": "Elevação Frontal Completa Sentada com Barra",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Elevação Frontal Completa com Barra",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Elevação Frontal Completa com Halteres",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Elevação Frontal Inclinada com Halteres",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Anilha",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Barra",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Elevação Frontal com Barra no Cabo",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Corda na Polia",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Elástico",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Elevação Frontal com Halteres",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Isométrica de Perna Abduzida em Decúbito Lateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Baixa com Faixa Elástica",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Elevação Lateral Bilateral Baixa com Cabo",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Com Cabo Atrás Das Costas",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Completa Com Halteres (Sentado)",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Completa Sentado Com Haltere (Unilateral)",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Completa com Halteres",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Deitado",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Em Pé Com Halteres (Bayesian)",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Inclinada com Halteres Deitado",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Isométrica no Batente",
        "group": "Ombros",
        "focus": "Deltoide Lateral",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação Lateral Unilateral com Corda no Cabo Baixo",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Unilateral com Elástico",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Unilateral com Kettlebell",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral Unilateral no Cabo Baixo",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Corda no Cabo (Deltoide Médio)",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Disco",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Elástico (Deltoide Médio)",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Halteres",
        "group": "Deltoides Frontais + Ombros",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Halteres em Seis Movimentos",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral com Kettlebell (Alavanca Longa)",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Elevação Lateral com Landmine",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Elevação Lateral com Mini Band e Braços Flexionados",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral de Braço Dobrado com Halteres",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral de Perna Deitado com Abdutor",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral deitada (com Caneleira ou Halter apoiado na coxa)",
        "group": "Pernas",
        "focus": "Glúteo Médio/Mínimo",
        "equip": "Halter/Caneleira",
        "nivel": 2
    },
    {
        "name": "Elevação Lateral na Máquina",
        "group": "Ombros",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral na Máquina em Pé",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação Lateral na Polia Baixa",
        "group": "Ombros",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Elevação Posterior de Deltoides na Banco com Halteres",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Pélvica (Barra, Máquina, Halter, Unilateral)",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Máquina/Barra/Halteres",
        "nivel": 1
    },
    {
        "name": "Elevação Sentada de Panturrilha com Pesa Russa",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação Y na polia",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Braço em Prancha com Peso Corporal",
        "group": "Abdominais + Deltoides Frontais + Deltoides Superiores",
        "focus": "Core (Transverso do Abdômen e Estabilizadores) + Deltoides (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Clamshell com Mini Band",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Elevação de Glúteos com Isometria Única Alternada",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Joelhos na Barra Fixa",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Joelhos na Paralela",
        "group": "Core",
        "focus": "Inferior",
        "equip": "Máquina/Calistenia",
        "nivel": 1
    },
    {
        "name": "Elevação de Ombros Sentado na Máquina",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Ombros em Máquina",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 1A Bilateral Excêntrica no Chão",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 1B Bilateral no Chão",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 1C Bilateral Excêntrica da Caixa",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 1E Bilateral Isométrica no Chão",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 2A Excêntrico Unilateral no Chão",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 2B Unilateral no Chão",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 2C Excêntrica Unilateral a partir da Caixa",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 3A Viés do Sóleo Bilateral",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha 3B com Ênfase no Sóleo Unilateral",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Bilateral 1D a Partir da Caixa",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Isométrica Unilateral",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Sentada com Halteres",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Sentado",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Sentado com Barra",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Unilateral 2D do Caixote",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha Unilateral com Kettlebell",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Barra",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Elevação de Panturrilha com Barra no Cabo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Cabo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Elástico",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Halter em uma Perna",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Halteres",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Kettlebell",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Kettlebell (Pegada Goblet)",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Kettlebell de Braço e Perna Única",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com Landmine",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Elevação de Panturrilha com Peso Corporal",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha com uma Perna com Peso Corporal",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha em Caminhada",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha em Pé na Máquina",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha na Máquina Smith",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha na Máquina estilo Burro",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilha no Cabo",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Panturrilhas Sentado na Máquina",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de Pernas Dobradas",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Inferior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Pernas Invertida",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Inferior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação de Pernas Pendurado (Toes to Bar)",
        "group": "Core",
        "focus": "Inferior",
        "equip": "Calistenia",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril (Figura Quatro) com Pesa Russa",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril Unilateral com Barra e Pés Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Elevação de Quadril Unilateral com Bola Suíça",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril Unilateral com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril Unilateral com Kettlebell",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Elevação de Quadril com Barra",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Barra (Figura Quatro)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril com Barra (Pés Elevados)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril com Barra — Calcanhares Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Calcanhares Elevados (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Disco para Supino",
        "group": "Glúteos + Peito",
        "focus": "Glúteo Máximo (Complexo) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Haltere e Pés Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Haltere — Pés Elevados e Alternados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Elevação de Quadril com Halteres e Calcanhares Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril com Kettlebell",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril na Bola de Estabilidade",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de Quadril na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de QuadrilPilates · InicianteRolamentos de Quadril",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Elevação de Queixo Neutra Assistida por Máquina",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação de panturrilha",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de panturrilha com barra (ponta dos pés para cima)",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação de perna com miniband",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Elevação de pernas deitado",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Inferior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Elevação de quadril com haltere (pés escalonados)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de quadril com halteres (figura quatro)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Elevação de quadril com kettlebell",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação de quadril unilateral com barra e calcanhares elevados",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Elevação de queixo em posição L",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação em 'Y' na Polia Baixa",
        "group": "Ombros",
        "focus": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Elevação em L Sentado",
        "group": "Abdominais + Antebraços",
        "focus": "Flexores do Antebraço + Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Elevação em Y com faixa",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevação em pé na Máquina",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação frontal com barra W",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Elevação frontal com kettlebell",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação lateral alternada com braços flexionados usando miniband",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Elevação lateral com halteres Bayesian",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação lateral completa com anilha",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Elevação lateral completa unilateral com halter",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Elevação lateral sentado",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação lateral unilateral com halter",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação lateral unilateral com haltere (sentada)",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Elevação na barra com pegada Gironda.",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Elevação no Smith (com step)",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Elevação unilateral com Halter (no step)",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Elevações em T (deitado)",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Elevações em Y",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Empurrada e puxada no cabo",
        "group": "Dorsais + Oblíquos + Peito",
        "focus": "Latíssimo do Dorso (Foco em Largura) + Oblíquos (Externos e Internos) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Encolhimento De Ombros Com Barra Atrás Das Costas",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Encolhimento De Ombros Com Barra Por Trás Das Costas 30 Degree",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Encolhimento Horizontal de Ombros com Elástico",
        "group": "Trapezio meio das Costas + Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio Superior (Fibras Descendentes)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Encolhimento com Barra/Halteres",
        "group": "Costas",
        "focus": "Trapézio Superior",
        "equip": "Barra/Halteres",
        "nivel": 2
    },
    {
        "name": "Encolhimento com Elástico",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Encolhimento com Halteres Silverback",
        "group": "Trapezio meio das Costas + Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombro Sentado com Halteres",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros Inclinado com Kettlebell",
        "group": "Trapezio meio das Costas + Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Anilha Acima da Cabeça",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Encolhimento de Ombros com Barra",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Halteres",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Kettlebell",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Kettlebell (Unilateral)",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Kettlebell Silverback",
        "group": "Trapezio meio das Costas",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Kettlebell Silverback (Unilateral)",
        "group": "Trapezio meio das Costas",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros com Kettlebell Silverback - (Unilateral)",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Encolhimento de Ombros em Pike (Peso Corporal)",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Encolhimento de Ombros em Pike Elevado",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Encolhimento de Ombros no Cabo Silverback",
        "group": "Trapezio meio das Costas + Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio Superior (Fibras Descendentes)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Encolhimento de ombros com barra Silverback",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Encolhimento de ombros com barra W",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Encolhimento de ombros com barra a 30 graus",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Encolhimento de ombros com barra hexagonal",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Encolhimento de ombros com halteres deitado a 30 graus",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Encolhimento de ombros deitado com halteres Silverback",
        "group": "Trapezio meio das Costas + Trapézios",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio Superior (Fibras Descendentes)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Encolhimento de ombros no cabo a 30°",
        "group": "Trapézios",
        "focus": "Trapézio Superior (Fibras Descendentes)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Encolhimento na Máquina Smith",
        "group": "Costas",
        "focus": "Trapézio Superior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Enfiar A Agulha Quadril Sobre Joelhos",
        "group": "Oblíquos + Trapézios",
        "focus": "Oblíquos (Externos e Internos) + Trapézio (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Escalador (Mountain Climber)",
        "group": "Cardio/HIIT",
        "focus": "Resistência Anaeróbica",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Escalador caminhando com miniband",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Escalador com Mini Band",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Escalador de Slalom",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Estabilidade do Core 1 Elevação Cruzada de Membros em Posição de 4 Pontos",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Estabilidade do Core 2 Toque Oposto no Ombro na Posição de 4 Pontos",
        "group": "Bíceps + Deltoides Frontais + Oblíquos + Tríceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Deltoides (Complexo Completo) + Oblíquos (Externos e Internos) + Tríceps (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Estabilidade do Core 4 Levantamento Cruzado de Membros em Posição de Flexão",
        "group": "Deltoides Frontais + Glúteos",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 3
    },
    {
        "name": "Estabilidade do Core 5 Elevação Cruzada de Membros em Tuck de Cotovelo Joelho na Posição de Flexão",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 3
    },
    {
        "name": "Estabilização Cruzada do Núcleo Unilateral Carga de Kettlebell",
        "group": "Antebraços + Oblíquos",
        "focus": "Flexores do Antebraço + Oblíquos (Externos e Internos)",
        "equip": "Recuperação",
        "nivel": 2
    },
    {
        "name": "Estocada do corredor",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Eu Entro em W",
        "group": "Dorsais + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Eu sou propenso",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Exercício com halteres",
        "group": "Bíceps + Deltoides Frontais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Deltoides (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Exercício de Pressão de Peito em Pé com Elástico",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Expansão Reversa Teardrops Ajoelhado Com Joelhos Voltados Para Dentro",
        "group": "Deltoides Frontais + Peito",
        "focus": "Deltoides (Complexo Completo) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Extensão Cruzada de Tríceps (Katana Extensions)",
        "group": "Tríceps",
        "focus": "Lateral/Medial",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Extensão Hiper para Estabilização com Bola",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Extensão Lombar na Bola Suíça",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Acessório",
        "nivel": 2
    },
    {
        "name": "Extensão Parcial de Joelho Sentado",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensão Reversa na Máquina",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão Unilateral de Tríceps Acima da Cabeça na Polia com Tronco Inclinado",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão Unilateral de Tríceps com Haltere Acima da Cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão Unilateral do Ombro com Kettlebell",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Extensão de Costas na Máquina",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Glúteo na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Glúteos e Isquiotibiais",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Extensão de Joelho com Banda",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensão de Joelho com Toalha",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensão de Lombar no Banco Romano",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Ombro com Halteres",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Extensão de Ombro com Kettlebell",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Extensão de Ombros com Barra",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Extensão de Perna em Pé na Polia",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Extensão de Pernas Sentado no Cabo",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Pernas com Elástico",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Extensão de Pernas com Haltere",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de Pernas na Máquina",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Pulso com Halteres no Banco",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de Pulso com Kettlebell no Banco",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho Unilateral com Halter no Banco",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho com Barra",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho com Cabo",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho com Haltere",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho com Kettlebell",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de Punho no Cabo com Apoio",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Quadril com Cabo no Banco Inclinado (Perna Reta)",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Quadril com Rotação Externa — Quatro Apoios",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensão de Quadril em 4 Apoios — Segurar",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensão de Quadril em Pé com Perna Esticada no Cabo",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo",
        "equip": "Maquinas_Polias",
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
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps Acima da Cabeça com Faixa",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 3
    },
    {
        "name": "Extensão de Tríceps Acima da Cabeça com um Braço, Apoiado no Banco com Haltere",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps Rapunzel com Faixa",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps Rolante com Haltere",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Extensão de Tríceps Sentado com Halter Acima da Cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Extensão de Tríceps com Barra Acima da Cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Extensão de Tríceps com Elástico",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps com Kettlebell Acima da Cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Extensão de Tríceps com Peso Corporal",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Extensão de Tríceps com Peso Corporal (Ajoelhado)",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps na Barra",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps na Máquina",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de Tríceps na Polia Alta",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Extensão de Tríceps na Polia com Barra Giratória",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
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
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Extensão de quadril em pé com cabo",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps acima da cabeça com barra W",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps com disco acima da cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps com haltere acima da cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps com mini band",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps cruzada bilateral na polia",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps em pé com kettlebell",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps na polia alta com corda (acima da cabeça)",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão de tríceps unilateral na polia cruzada",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão do Quadril para Flexão Lateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensão lombar (Superman)",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Extensão lombar 45° na máquina",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão unilateral de tríceps na polia com rotação",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Extensão unilateral de tríceps sentado com haltere acima da cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Extensões Torácicas com Rolo de Espuma",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensões de Costas Baixas 2",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensões de Costas Inferiores em Parceria",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensões de Lombar 3",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Extensões de Lombar 4",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Face Pull Sentado Unilateral no Cabo",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Face Pull Sentado com Barra no Cabo",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Face Pull Sentado com Corda no Cabo",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Face Pull Unilateral no Cabo",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Face Pull com Rotação Externa",
        "group": "Ombros",
        "focus": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Face Pull com elástico",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Face Pull na Polia Alta",
        "group": "Ombros",
        "focus": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Face Pulls na Polia com Corda",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Face pull alto com faixa",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Face pull com corda (ajoelhado)",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Faixa de Cardio com Movimentos Reversos de Voo e Polichinelos",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Flexora em pé (Máquina/Polia unilateral)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Encurtada)",
        "equip": "Máquina/Cabo",
        "nivel": 1
    },
    {
        "name": "Flexora para posteriores da coxa na máquina",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Flexão Arqueiro em Pé com Anel",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Atômica com Bola de Estabilidade",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Com Palmas",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Declinada",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Declinada (Pés elevados)",
        "group": "Peitoral",
        "focus": "Fibras Superiores",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Diamante",
        "group": "Tríceps",
        "focus": "Todas",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Diamante com Joelhos Apoiados (Peso Corporal)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
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
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Flexão Em Pé Com Pernas Afastadas Segurando Os Calcanhares",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Flexão Explosiva (Peso Corporal)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Flexão Explosiva / Arqueiro",
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Flexão Inclinada",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Inclinada (Mãos no banco)",
        "group": "Peitoral",
        "focus": "Fibras Inferiores",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Inclinada (Peso Corporal)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Inclinada com Joelhos",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Invertida com Pegada Fechada Usando o Peso do Corpo",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Invertida com Peso Corporal",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão Pike Elevada",
        "group": "Deltoides Frontais + Trapezio meio das Costas + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão Pike com Peso Corporal",
        "group": "Deltoides Frontais + Trapezio meio das Costas + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão com Elevação de Perna",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão com Halteres (Mãos Elevadas)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Flexão com elástico",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Flexão com passagem por cima do kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Flexão de Braço Tradicional",
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão de Braço com Espera Estaggerada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão de Joelhos em Suspensão Corporal",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão de Ombro Extensões Torácicas",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Flexão de Peso Corporal do Garçom",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão de Quadril em Pé com Mini-Band",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Flexão de Queixo Assistida por Peso Corporal",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão de Tronco com Halteres em Posição Alternada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Flexão de braço",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão de pernas deitado com um Halter preso entre os pés",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Encurtada)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Flexão e Extensão Torácica",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Flexão em Déficit com Anilha",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Flexão em L na Barra Fixa",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão em Pé com Anel",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexão na Bola de Estabilidade",
        "group": "Abdominais + Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Reto Abdominal (Geral) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Flexão na Smith Machine",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Flexão para Remada Renegade",
        "group": "Dorsais + Peito",
        "focus": "Latíssimo do Dorso (Foco em Espessura) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Flexões Diamante",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexões Diamante com Peso",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Flexões com Peso",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Flexões com as Mãos Levantadas",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexões de Braços com Joelhos Apoiados",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Flexões de Joelho com Peso",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Flexões na barra com peso de halteres",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Fly Inverso Deitado Com Halteres",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Fly Invertido com Elástico",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Fly Peitoral Unilateral Com Elástico",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Fly Sentado para Deltoide Posterior com Rotação Interna",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Fly para Deltoide Posterior com Halteres (Rotação Interna)",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Fly peitoral unilateral no cabo com rotação interna e apoio",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Gato-Vaca (Cat-Cow)",
        "group": "Mobilidade",
        "focus": "Costas/Ombros",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Giro com Barra Fixa",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Gluteador",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Gomukhasana (Pernas Relaxadas)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Gomukhasana (variação com um braço)",
        "group": "Dorsais + Tríceps",
        "focus": "Latíssimo do Dorso (Geral) + Tríceps (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Good Morning com anilha frontal",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Good Morning com barra alta",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Good Morning com elástico",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Good Morning com haltere em posição goblet",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Good Morning com kettlebell na posição goblet",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Good Morning em pé com faixa elástica",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Good Mornings",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Guerreiro I",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Guerreiro II",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Guerreiro III",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Hack Machine",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Halo com anilha",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Hang Clean E Press Com Haltere Unilateral",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Lateral + Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Hang Clean e Press com Barra",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Anterior e Lateral + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Hang clean and press com halteres",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Anterior e Lateral + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Hang clean e press com kettlebell",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Anterior e Lateral + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Hip Thrust com Barra (Figura Quatro, Calcanhares Elevados)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Hip Thrust com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Hiperextensão Reversa (No banco ou solo)",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Peso_Corporal/Acessório",
        "nivel": 2
    },
    {
        "name": "Hiperextensão Reversa com Bola Suíça",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Hollow Body Hold",
        "group": "Core",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Hollow Hold com Landmine",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Hollow Hold com disco",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Hollow com Haltere",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Inclinação Lateral com Disco (Pegada em Pinça)",
        "group": "Antebraços + Oblíquos",
        "focus": "Flexores do Antebraço + Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Inclinação Lateral com Elástico",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Inclinação Lateral com Haltere",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Inclinação Lateral com Haltere Acima da Cabeça",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Inclinação Para Frente Com Pernas Afastadas",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Inclinação lateral com barra (landmine)",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Inclinação lateral no cabo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Isometria Superman com Kettlebell",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Isometria dos Extensores do Punho (Ajoelhado)",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Isométrico de Panturrilha no Degrau",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Recuperação",
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
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Jack Press com Faixa de Resistência para Cardio",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Jackknife oblíquo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Jefferson Curl com Halteres",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Jefferson Curl com Kettlebell",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Jefferson Curl com barra",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Jefferson Curl da Coluna com Peso Corporal",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Kettlebell Agachado com Press Acima da Cabeça",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Kettlebell Clean And Jerk Com Um Braço (Hang)",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Kettlebell Clean E Jerk Unilateral",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Lateral + Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Kettlebell Clean and Press (Braço Único)",
        "group": "Deltoides Frontais + Glúteos",
        "focus": "Deltoide Anterior e Lateral + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Kettlebell Clean e Desenvolvimento Unilateral a partir da Suspensão",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoide Lateral + Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Kettlebell Hang Squat Clean E Jerk",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Kettlebell Press com um braço no chão",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Kettlebell Squat Clean e Jerk",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Kettlebell Swing (Balanço com KB ou Halter)",
        "group": "Cardio/HIIT",
        "focus": "Resistência Anaeróbica",
        "equip": "Halter/Kettlebell",
        "nivel": 2
    },
    {
        "name": "Kettlebell Windmill (mão de apoio)",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Kickback de Glúteo com Faixa",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Kickback de Glúteo no Landmine",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Kickback de Glúteo no Smith",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Kickback de Quadril com Perna Reta no Cabo, Apoiado no Banco",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Kickback de Quadril e Glúteo na Máquina",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Kickback de Tríceps no Cabo",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Kickback de tríceps com haltere",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Kickbacks de tríceps",
        "group": "Posteriores da coxa",
        "focus": "Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "L-Sit na Barra Fixa",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Lagarta",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Landmine Rotacional — Levantamento para Desenvolvimento",
        "group": "Deltoides Frontais + Oblíquos",
        "focus": "Deltoide Anterior e Lateral + Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Landmine — Press Unilateral Acima da Cabeça (Meio Ajoelhado)",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Larsen Press Unilateral com Haltere",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Larsen Press com Kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Leg Press 45º",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Leg Press Horizontal",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Leg Press Horizontal Máquina",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Leg Press Horizontal Máquina Sissy",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Leg Press com Faixa Elástica",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Banda",
        "nivel": 3
    },
    {
        "name": "Leg Press na Máquina Smith",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Leg press na máquina",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Levantamento Alto com Barra",
        "group": "Glúteos + Parte Inferior das Costas + Trapezio meio das Costas + Trapézios",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Alto com Pegada Larga de Barra",
        "group": "Glúteos + Parte Inferior das Costas + Trapezio meio das Costas + Trapézios",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Cruzado de Membros em Posição de Flexão",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Recuperação",
        "nivel": 3
    },
    {
        "name": "Levantamento Romeno Sumô na Smith Machine",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra (Conventional/Sumô)",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Barra/Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Alternado com Barra",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Coan com Barra",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Convencional com Barra",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Convencional com Barra e Pausa",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Convencional com Deficit de Barra",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Convencional com Kettlebell (Duplo)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Elevado na Polia",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Jefferson com Barra",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Maleta com Barra",
        "group": "Glúteos + Oblíquos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Maleta com Kettlebell",
        "group": "Glúteos + Oblíquos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Parcial com Barra",
        "group": "Parte Inferior das Costas + Trapezio meio das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Reverso com Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Romeno com Barra e Cabo Alternado",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno com Barra na Polia",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Romeno com Elástico",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Romeno com Halter em Posição Semi-Ajoelhada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno com Halteres em Meio Ajoelhamento",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno com Kettlebell em Meio Ajoelhamento",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno com Kettlebell em Meio-Ajoelhado",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno de Halteres Cruzando o Corpo",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Romeno/RDL (Barra/Halteres)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Alongada)",
        "equip": "Barra/Halteres",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Sumô com Barra e Pausa",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Sumô com Kettlebell",
        "group": "Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Sumô com Landmine",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra Unilateral Com Kettlebell",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra Unilateral com Disco (Pegada em Pinça)",
        "group": "Antebraços + Glúteos",
        "focus": "Flexores do Antebraço + Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra Unilateral na Polia",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Anilha",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra com Anilha em Passada Alternada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Barra",
        "group": "Glúteos + Parte Inferior das Costas + Trapezio meio das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra com Barra e Bandas Elásticas",
        "group": "Glúteos + Parte Inferior das Costas + Trapezio meio das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra com Barra em uma Perna Só",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Kettlebell (Unilateral)",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa + Trapezio meio das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra com Kettlebell em Base Escalonada (Unilateral)",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra com Pegada Snatch",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Pegada em Pinça no Disco",
        "group": "Antebraços + Dorsais + Glúteos",
        "focus": "Flexores do Antebraço + Glúteo Máximo (Complexo) + Latíssimo do Dorso (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra com Peso Corporal",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Levantamento Terra com Pinça de Discos e Passada Alternada",
        "group": "Antebraços + Glúteos",
        "focus": "Flexores do Antebraço + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento Terra com Pés Escalonados na Smith Machine",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Levantamento Terra com Uma Perna Apoiada em Caixa",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 3
    },
    {
        "name": "Levantamento com Kettlebell em Posição de Garçom Staggered",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento de Barra com Arremesso",
        "group": "Deltoides Frontais + Glúteos + Parte Inferior das Costas",
        "focus": "Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento de Peso Olímpico com Divisão de Pernas",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento de Quadril com Barra de Pesos em uma Perna Só",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Levantamento de Quadril com Elevação dos Calcanhares e Halteres na Posição de Quatro",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento de Quadril na Máquina Smith",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Levantamento romeno com kettlebell",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Levantamento terra com barra hexagonal e pausa",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento terra com barra hexagonal em déficit",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento terra com halteres em passada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento terra com kettlebell — base escalonada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Levantamento terra romeno com barra EZ",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Levantamento terra romeno com barra hexagonal",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento terra romeno unilateral com barra hexagonal",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Levantamento terra unilateral com barra hexagonal",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Levantamento terra unilateral com mini band",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Limpador de para-brisa",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Macas",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Maior Alongamento do Mundo",
        "group": "Mobilidade",
        "focus": "Pernas/Quadril",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Mantenha a Extensão do Joelho com Toalha",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Marcha do Fazendeiro com Kettlebell",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Meia Rotação de Pescoço",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Meia-lótus",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Meio Agachamento de Joelho",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Mergulho com Halteres",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Mergulho com Peso",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Mergulho na caixa",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Mergulho nas Paralelas / Banco",
        "group": "Tríceps",
        "focus": "Todas",
        "equip": "Calistenia",
        "nivel": 2
    },
    {
        "name": "Mergulho no banco",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Mergulhos Assistidos com Caixa (Peso Corporal)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Mergulhos Assistidos por Máquina em Barras Paralelas",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Mergulhos em Barras Paralelas",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Mergulhos na Máquina",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Mesa Flexora (Deitado)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Encurtada)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Mobilidade 90/90",
        "group": "Mobilidade",
        "focus": "Pernas/Quadril",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Mobilidade de Quadril em Pé com Loop Infinito",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Mobilização das Costas no Chão com Rolo de Espuma",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Mobilização de Panturrilha Sentado no Chão Role",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Mobilização de Quadríceps com Rolo de Espuma",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Mobilização do Extensor Lombar Decúbito Ventral com Joelhos Dobrados usando Ferramenta de Amendoim",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Mobilização do Piriforme Glúteo 1 Sentado no Chão com Bola de Lacrosse",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Mobilização do nervo femoral",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Mobilização do tríceps — ajoelhado com bola de lacrosse",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Mobilização dos Extensores do Punho",
        "group": "Antebraços",
        "focus": "Extensores do Antebraço",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Montanha",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Montanhista Saltador",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Montanhista em Ritmo Lento",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Movimento Circular Alternado",
        "group": "Dorsais + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Máquina Smith Tríceps Testa com Peso Corporal",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Máquina de Elevação de Panturrilha a 45 Graus",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Elevação de Panturrilha com Carga de Placas",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Máquina de Empurrão de Quadril com Placas",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Extensão de Pernas com Placas",
        "group": "Quadríceps",
        "focus": "Reto Femoral (Isolamento)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Gêmeos Sentado (com Anilhas)",
        "group": "Pernas",
        "focus": "Panturrilhas (Sóleo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Leg Press Unilateral",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Levantamento de Pesos Neutro Acima da Cabeça",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Peitoral com Braços Flexionados",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Prensa Horizontal para Pernas e Elevação de Panturrilha",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Prensa Horizontal para Pernas e Salto de Panturrilha",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Press de Peito em Declínio com Placas",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Pressão Acima da Cabeça com Pegada por Cima",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior e Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Remada Baixa com Carga por Placas",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Remada Selada com Carga de Placas",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Remada T com Carga de Placas",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Rosca Scott com Carga de Placas",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Rosca Scott com Carga em Placas",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Supino Inclinado Baixo com Placas",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Supino Inclinado com Placas",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Supino Militar Frontal com Placas",
        "group": "Deltoides Frontais",
        "focus": "Deltoide Anterior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina de Voo Reverso",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Máquina para Abdominais com Placas",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Oração com Cabo de Corda para Dorsais",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Oração da Pirâmide",
        "group": "Dorsais + Tríceps",
        "focus": "Latíssimo do Dorso (Geral) + Tríceps (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Pallof Press Ajoelhado com Cabo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pallof Press Ajoelhado no Cabo para Woodchopper",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pallof Press com Cabo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pallof Press com elástico (de baixo para cima) Woodchopper",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos) + Reto Abdominal (Geral)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Pallof Press com elástico para Wood Chopper",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Pallof press com elástico",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Pallof press com elástico — de cima para baixo Corte de madeira (wood chopper)",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos) + Reto Abdominal (Geral)",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Panturrilha no Hack Machine",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Panturrilha no Leg Press 45º",
        "group": "Pernas",
        "focus": "Panturrilhas (Gastrocnêmios)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Parada de cabeça",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 3
    },
    {
        "name": "Paralelas (Dips com tronco à frente)",
        "group": "Peitoral",
        "focus": "Fibras Inferiores",
        "equip": "Calistenia",
        "nivel": 2
    },
    {
        "name": "Parte Média das Costas — Série 3",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Passada Frontal Unilateral com Kettlebell",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Passada Frontal com Kettlebell (Dupla)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Passada Lateral com Haltere (Goblet)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Passada Lateral com Kettlebell em Apoio Frontal (Braço Único)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Passada Lateral com Landmine",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Passada Lateral com elástico/band",
        "group": "Pernas",
        "focus": "Glúteo Médio/Mínimo",
        "equip": "Elástico_(Band)",
        "nivel": 2
    },
    {
        "name": "Passadas para frente",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Passe de V com Bola de Estabilidade",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Passo Lateral Em Cima e Fora da Caixa",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Patinação para Abertura Lateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Peitoral na Máquina",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pendulum Squat",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pendurado Inerte",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Percevejo (Dead Bugs)",
        "group": "Core",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Perdigueiro (Bird-Dog)",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Perna Única (Perna Dobrada)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Peso Morto Romeno com Halteres",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Peso Morto Romeno com Pegada Snatch na Barra",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Peso Morto Sumô com Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Peso Morto Unilateral com Disco",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Peso Romeno Unilateral na Landmine",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Peso morto unilateral com haltere (uma perna, um braço)",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Pike Push-up / Flexão Hindú",
        "group": "Peitoral",
        "focus": "Fibras Superiores",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Pike de Remador",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Pilates Footwork na Primeira Posição",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Pilates Rotações de Um Braço Remada para Costas Remada Sentada",
        "group": "Bíceps + Dorsais + Oblíquos + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Oblíquos (Externos e Internos) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Pilates com Calcanhar de Uma Perna",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Polichinelo Cruzado (Seal Jacks)",
        "group": "Cardio/HIIT",
        "focus": "Motor Aeróbico",
        "equip": "Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Polichinelos (Jumping Jacks)",
        "group": "Cardio/HIIT",
        "focus": "Motor Aeróbico",
        "equip": "Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Polichinelos Cardio",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Polichinelos com Elástico de Resistência para Cardio",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Polichinelos com Faixa e Rosca Martelo",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Pombo Reclinado",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Ponte Unilateral De Glúteos Com Pés Elevados (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Ponte Unilateral com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Ponte Unilateral de Glúteos com Haltere e Pés Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Ponte Unilateral de Glúteos com Landmine",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Ponte de Glúteo com Peso Corporal — Figura Quatro, Calcanhares Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos (Anilha no quadril)",
        "group": "Pernas",
        "focus": "Glúteo Máximo",
        "equip": "Halter/Anilhas",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos (Figura Quatro) com Haltere",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos Excêntrica Unilateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos Figura Quatro com Haltere e Pés Elevados",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos Unilateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos Unilateral com Calcanhares Elevados (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos Unilateral com Kettlebell",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos com Anilha para Pullover",
        "group": "Dorsais + Glúteos",
        "focus": "Glúteo Máximo (Complexo) + Latíssimo do Dorso (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Barra — Pés Elevados em Posição Alternada",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos com Barra, Pés Elevados e Perna em 4",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos com Bola de Estabilidade",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Ponte de Glúteos com Halteres",
        "group": "Glúteos + Posteriores da coxa + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Halteres — Pernas Escalonadas",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Pernas Estendidas na Bola de Estabilidade",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Pés Elevados (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Glúteos com Pés Elevados em Posição Escalonada (Peso Corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Ponte de Isometria com Ângulo Aberto para os Isquiotibiais",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Isquiotibiais com Caixa de Pernas Elevadas Bilateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de Isquiotibiais com Pernas Elevadas em Caixa Unilateral",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Ponte de glúteo em 4 com pés elevados (peso corporal)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Ponte de glúteos com miniband",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Ponte de glúteos deitada com abdução usando miniband",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Posição Hollow",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Posição de Prancha Alongada",
        "group": "Abdominais + Deltoides Frontais + Parte Inferior das Costas",
        "focus": "Core (Transverso do Abdômen e Estabilizadores) + Deltoides (Complexo Completo) + Eretores da Espinha (Região Lombar)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Postura Borboleta Cruzada",
        "group": "Trapézios",
        "focus": "Trapézio (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura Selvagem",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Postura da Cabeça de Vaca — Variação com Dois Braços",
        "group": "Dorsais + Tríceps",
        "focus": "Latíssimo do Dorso (Geral) + Tríceps (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Cadeira",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Cobra",
        "group": "Abdominais + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Reto Abdominal (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Criança — Braços Estendidos",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Criança — Braços Estendidos (Esquerda/Direita)",
        "group": "Dorsais + Oblíquos",
        "focus": "Latíssimo do Dorso (Geral) + Oblíquos (Externos e Internos)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Criança — Braços ao Lado",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Criança — Cotovelos no Bloco",
        "group": "Dorsais + Tríceps",
        "focus": "Latíssimo do Dorso (Geral) + Tríceps (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Esfinge",
        "group": "Parte Inferior das Costas + Peito",
        "focus": "Eretores da Espinha (Região Lombar) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Lua Crescente",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Pirâmide",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura da Árvore",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Arco",
        "group": "Abdominais + Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Reto Abdominal (Geral)",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Postura do Cachorrinho",
        "group": "Deltoides Superiores + Dorsais",
        "focus": "Deltoides (Complexo Completo) + Latíssimo do Dorso (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Cachorro",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Cachorro Olhando para Baixo com os Dedos Voltados para os Pés",
        "group": "Antebraços + Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Flexores do Antebraço",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Corvo",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Yoga",
        "nivel": 3
    },
    {
        "name": "Postura do Gato",
        "group": "Parte Inferior das Costas + Trapezio meio das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Macaco",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Yoga",
        "nivel": 3
    },
    {
        "name": "Postura do Peixe com apoio",
        "group": "Peito + Trapezio meio das Costas",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Pombo",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Pombo Duplo",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Portão — coluna arredondada — olhando para cima",
        "group": "Dorsais + Oblíquos",
        "focus": "Latíssimo do Dorso (Geral) + Oblíquos (Externos e Internos)",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Postura do Ângulo Lateral Estendido com Bloco",
        "group": "Dorsais + Oblíquos",
        "focus": "Latíssimo do Dorso (Geral) + Oblíquos (Externos e Internos)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Postura do Ângulo Lateral Revolvido com Mãos em Oração",
        "group": "Oblíquos + Trapezio meio das Costas",
        "focus": "Oblíquos (Externos e Internos) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Prancha Alta",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha Alta com Peso",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Prancha Ativa — Ativação Do Serrato Anterior",
        "group": "Abdominais + Peito",
        "focus": "Core (Transverso do Abdômen e Estabilizadores) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Prancha Frontal com Toques no Ombro (Shoulder Taps)",
        "group": "Core",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha IYTW",
        "group": "Abdominais + Deltoides Frontais + Deltoides Superiores",
        "focus": "Core (Transverso do Abdômen e Estabilizadores) + Deltoides (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Prancha Isométrica (Frontal/Lateral)",
        "group": "Core",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha Lateral Apoiada na Mão com Passagem por Baixo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha Lateral Subida e Descida",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha Lateral com Halter no Cotovelo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Prancha Lateral com Haltere (Subir e Descer)",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Prancha Lateral com Haltere na Mão",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Prancha Lateral com Máquina Smith para Cima e para Baixo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Prancha Lateral com Passagem do Braço por Baixo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha Sobe-Desce",
        "group": "Core",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Prancha Superman (Elevação de braço e perna opostos)",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha ao redor do mundo com mini band",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Prancha com Abertura de Pernas",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha com Abertura de Pés usando o Peso Corporal",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha com Altos e Baixos Ponderados",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Prancha com Escalada de Montanha no Cotovelo",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha com Passada Lateral usando Mini Band",
        "group": "Abdominais + Glúteos",
        "focus": "Glúteo Médio e Mínimo + Oblíquos (Externos e Internos)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Prancha com Passo Lateral das Mãos usando Mini Band",
        "group": "Abdominais + Deltoides Superiores",
        "focus": "Deltoide Lateral + Oblíquos (Externos e Internos)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Prancha com abertura e fechamento de pernas (com o peso do corpo)",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha com alavanca longa",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha com passagem de haltere",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Prancha com subida e descida (peso corporal)",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha de Antebraço com Alavanca Longa",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Prancha de Ativação do Serrato Anterior",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Prancha de Ativação do Serrato Anterior no Bosu",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Prancha lateral com apoio na mão",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha lateral no antebraço",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha nos Antebraços com Peso",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Prancha nos Joelhos — Subida/Descida (Peso Corporal)",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prancha nos antebraços",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Prece Reversa",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Prece para Dorsais no Cabo",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Prensa de Agachamento na Máquina",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Prensa de Pernas Vertical",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Preparatórios para Remada Frontal — Versão Sentada",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoide Anterior + Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Preparação de remada para costas — cotovelos abertos, sentado",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Preparação para Remada (Costas) Rolamento para Baixo com Rosca Bíceps Sentado",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Preparação para Remada na Posição de Arado",
        "group": "Antebraços + Deltoides Superiores + Dorsais + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Flexores do Antebraço + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Preparação para Teaser de Pilates",
        "group": "Abdominais + Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo) + Reto Abdominal (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Preparação para a Estrela",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Preparação para nado de costas — deitado sobre caixa",
        "group": "Dorsais + Peito",
        "focus": "Latíssimo do Dorso (Geral) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Preparação para remada (costas): rolar para baixo com oblíquos",
        "group": "Deltoides Frontais + Oblíquos",
        "focus": "Deltoides (Complexo Completo) + Oblíquos (Externos e Internos)",
        "equip": "Pilates",
        "nivel": 2
    },
    {
        "name": "Preparos de Remada para Costas Roscas de Bíceps Sentadas",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Press Alternado com Halteres (Um Braço de Cada Vez)",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Press Landmine Ajoelhado Alternado",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Press Landmine Unilateral em Posição Escalonada",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Press com Anilha Acima da Cabeça para Extensão de Tríceps",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Press com Elástico ao Redor",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Press de Ombros com Halteres em Meio-Ajoelhamento",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Pressão de Peito na Máquina",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pré-ativação de remada para costas — tríceps sentado",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Pular Corda",
        "group": "Cardio/HIIT + Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Motor Aeróbico",
        "equip": "Cardio, Corda",
        "nivel": 2
    },
    {
        "name": "Pule na Caixa e Saia Dela",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Pull-through com elástico",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Banda",
        "nivel": 1
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
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Pullover Unilateral Com Haltere",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Pullover Unilateral com Kettlebell",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Pullover Unilateral na Polia com Corpo Inclinado",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Pullover ajoelhado na polia",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pullover com Barra",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Pullover com Halter",
        "group": "Peitoral",
        "focus": "Fibras Inferiores",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Pullover com Haltere em Banco de Alta Inclinação",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Pullover com Halteres em Fase Excêntrica",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Pullover com elástico",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Pullover com halteres",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Pullover na Máquina",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pullover na Polia Alta",
        "group": "Peitoral",
        "focus": "Fibras Inferiores",
        "equip": "Cabo",
        "nivel": 2
    },
    {
        "name": "Pullover na Polia com Barra (Tronco Inclinado)",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pullover na Polia com Corda",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Pulsos de Extensão do Quadril com Rotação Externa na Posição de 4 Pontos",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Pulôver com kettlebell",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Push Press Unilateral com Haltere",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Push Press Unilateral com Kettlebell",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Push Press Unilateral na Landmine",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Push Press com Halteres",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Push Press com Kettlebell",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Cabeças Lateral e Medial + Deltoide Anterior e Lateral",
        "equip": "Pesos_Livres",
        "nivel": 1
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
        "equip": "Maquinas_Polias",
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
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada Fechada Assistida por Máquina",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada Neutra",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada Pegada Fechada",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada Sentada com Elástico",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Puxada Supinada",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada Unilateral Sentada Com Elástico",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Puxada Unilateral com Elástico (Ajoelhado)",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Puxada Unilateral com Elástico (Meio Ajoelhado)",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Puxada Unilateral no Cabo para Dorsal (Mãos em Oração)",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Puxada ajoelhado com elástico",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Puxada alternada ajoelhado na polia",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada bilateral ajoelhado na polia",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada bilateral com braços estendidos na polia, em pé",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada bilateral em pé na polia",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada com Cabo Entre as Pernas",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada com Elástico com Um Braço",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Puxada com cabo",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada com cabo ao redor do corpo",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada com elástico ao redor do corpo",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Puxada de Braço Reta com Cabo",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada de Joelho e Rotação Lombar",
        "group": "Glúteos + Parte Inferior das Costas + Peito",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Puxada de Joelho no Chão Bilateral",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Puxada de Tríceps com Corda e Rotação",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada de Tríceps na Polia",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada na Máquina com Carga de Placas",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada na máquina",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Largura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada oblíqua na polia",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada para o Rosto com Barra no Cabo",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Puxada unilateral de tríceps com banda",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "QL Mobilização com Rolo de Espuma no Chão",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Regressão de estabilidade do core — elevação cruzada de braço e perna na posição de flexão",
        "group": "Abdominais + Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral) + Reto Abdominal (Geral)",
        "equip": "Recuperação",
        "nivel": 3
    },
    {
        "name": "Relógio de Braço (Iogue)",
        "group": "Bíceps + Peito",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Remada Alta (Pegada Aberta)",
        "group": "Ombros",
        "focus": "Deltoide Lateral",
        "equip": "Barra/Halteres",
        "nivel": 2
    },
    {
        "name": "Remada Alta Cruzada Bilateral na Polia",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoide Lateral + Trapézio Superior e Deltoide",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Alta com Barra",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio Superior e Deltoide",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Remada Alta com Halteres",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Alta com Kettlebell",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio Superior e Deltoide",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Alta na Polia",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio Superior e Deltoide",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Remada Alta na Smith Machine",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio Superior e Deltoide",
        "equip": "Máquina_Smith",
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
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio Superior e Deltoide",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Alternada com Anilha e Parada no Chão",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Remada Alternada com Kettlebell",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
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
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Cardio (Ergômetro)",
        "group": "Bíceps + Dorsais + Glúteos + Quadríceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Glúteo Máximo (Complexo) + Latíssimo do Dorso (Foco em Espessura) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Remada Cardio (Ergômetro) — Só Braços",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Remada Cardio Ergômetro de Remo Quatro Braçadas Início do Sprint",
        "group": "Bíceps + Dorsais + Glúteos + Quadríceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Glúteo Máximo (Complexo) + Latíssimo do Dorso (Foco em Espessura) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
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
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Lateral + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Curvada Livre (Barra)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Barra/Anilhas",
        "nivel": 2
    },
    {
        "name": "Remada Curvada Unilateral com Faixa",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Remada Curvada com Barra",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Remada Curvada com Barra (Pegada Supinada)",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Remada Curvada com Elástico",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Remada Frontal Prepara a Segunda Posição Sentada",
        "group": "Deltoides Frontais + Peito",
        "focus": "Deltoide Anterior + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Remada Frontal Preparações Reta Para Frente Sentado",
        "group": "Deltoides Frontais + Peito",
        "focus": "Deltoide Anterior + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Remada Gorila com Pesa Russa",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada Inclinada com Halteres (Deitado)",
        "group": "Bíceps + Dorsais",
        "focus": "Cabeça Longa + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Invertida",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Remada Invertida (Australian Pull-up)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Calistenia",
        "nivel": 2
    },
    {
        "name": "Remada Invertida (Cotovelos abertos)",
        "group": "Ombros",
        "focus": "Deltoide Posterior",
        "equip": "Calistenia",
        "nivel": 2
    },
    {
        "name": "Remada Invertida com Pegada Pronada Corporal",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Remada Invertida com Pegada Supinada Usando o Peso do Corpo",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Remada Invertida com Peso em Disco",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Remada Invertida em Pé com Peso Corporal",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Remada Landmine com Barra",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Remada Meadows com barra",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Remada Neutra em Máquina",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Pendlay Alternada com Halteres",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Remada Pendlay com barra (pegada pronada)",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Remada Pendlay com halteres",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada Pendlay com pegada supinada",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Remada Pendlay unilateral com halter",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada Pendlay unilateral com kettlebell",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Pronada com Barra",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Remada Pronada na Máquina Smith",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Remada Renegade com Halteres",
        "group": "Abdominais + Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura) + Reto Abdominal (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada Sentada com Halteres para Deltoide Posterior",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Sentada na Máquina",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Subalterna na Máquina",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Supinada com Cabo",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Supinada com Halteres",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada T na Máquina com Apoio Peitoral",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada TRX com rotação",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Remada TRX para deltoide posterior",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral (Serrote)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada Unilateral Com Haltere Ajoelhado",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral com Elástico",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral com Halter",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral com Haltere (Joelho no Banco)",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral com Kettlebell",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral no Cabo com Pegada Neutra",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Unilateral no Cabo — Pegada Supinada",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada Vertical com Elástico",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio (Complexo Completo)",
        "equip": "Banda",
        "nivel": 3
    },
    {
        "name": "Remada Vertical com Kettlebell Individual",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada ajoelhada com miniband",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Remada alta com barra EZ",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio Superior e Deltoide",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Remada alta com kettlebell",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio Superior e Deltoide",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada alta unilateral com haltere",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoide Lateral + Trapézio Superior e Deltoide",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada com Barra na Landmine",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Remada com Kettlebell de Braço Único no Banco",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada com Máquina de Placas",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada com Máquina em Pegada Supinada",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada com elástico",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Remada com kettlebell",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada com kettlebell (unilateral)",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada com pegada de pinça na anilha",
        "group": "Antebraços + Dorsais",
        "focus": "Flexores do Antebraço + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Remada cortador de grama com haltere (joelho apoiado)",
        "group": "Bíceps + Dorsais",
        "focus": "Cabeça Curta + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada curvada com miniband",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Remada curvada para deltoide posterior com miniband",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Remada de Arco com Cabo",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Remada de Caiaque com Cabo",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada em Anel",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Remada invertida na Smith Machine",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Remada na Máquina Apoiada no Peito",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada na Porta/Lençol (Foco expansão)",
        "group": "Costas",
        "focus": "Latíssimo (Largura)",
        "equip": "Peso_Corporal/Lençol",
        "nivel": 2
    },
    {
        "name": "Remada na Smith Machine com pegada supinada",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Remada no Banco Inclinado com Halteres (Chest-Supported Row)",
        "group": "Costas",
        "focus": "Romboides/Miolo (Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada para Costas no Pilates – Remada Sentada",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Remada para Deltoide Posterior com Kettlebell (Dupla)",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada para Deltoide Posterior com Pesa Russa",
        "group": "Bíceps + Deltoides Superiores",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Deltoide Posterior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada para Deltoides Posterior na Máquina",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Remada para deltoide posterior com halteres",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada para deltoide posterior unilateral com kettlebell",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Lateral + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada sentada unilateral para as costas no Pilates",
        "group": "Bíceps + Dorsais + Trapezio meio das Costas",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Remada unilateral (Lawnmower)",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada unilateral com halter para deltoide posterior",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Remada unilateral com haltere",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Remada unilateral no TRX",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Remada unilateral para deltoide posterior na polia",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Lateral + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Remadas T-Bar na Landmine",
        "group": "Bíceps + Dorsais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Latíssimo do Dorso (Foco em Espessura)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Remo (Ergômetro) — Só Pernas",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Retração Escapular",
        "group": "Trapezio meio das Costas",
        "focus": "Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Roda Abdominal (Ab Wheel)",
        "group": "Core",
        "focus": "Estabilização/Anti-extensão",
        "equip": "Roda",
        "nivel": 2
    },
    {
        "name": "Rolamentos de Quadril",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Rollouts com barra",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Rollouts na Máquina",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Rolo de Abdominal em Pé com Anel",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Porção Superior)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Rosca Alta Sentado na Polia Bilateral",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Alta com Cabo",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Alta com Elástico",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Rosca Alternada / Inclinada",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Alternada com Halteres em Apoio no Banco",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Alternada com Rotação (Halteres)",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Aranha Unilateral com Haltere",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Aranha com Halteres",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Arnold com Halter Sentado com Um Braço",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Arrastada com Barra",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Rosca Arrastada com Kettlebell",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
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
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Com Disco Para Desenvolvimento Acima Da Cabeça Para Extensão De Tríceps",
        "group": "Bíceps + Deltoides Frontais + Tríceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Deltoide Anterior e Lateral + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Rosca Concentrada",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Concentrada Unilateral com Haltere Apoiada no Banco",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Concentrada com Haltere",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Concentrada com Kettlebell",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Concentrada com Peso Corporal",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Rosca Concentrada no Landmine",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Rosca De Punho Com Barra Atrás Das Costas",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Rosca Direta",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barras_Anilhas",
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
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Direta no Scott com Barra EZ Invertida",
        "group": "Antebraços + Bíceps",
        "focus": "Cabeça Curta + Extensores do Antebraço",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca Goblet com Kettlebell",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inclinada Reversa com Apoio no Banco e Halteres",
        "group": "Antebraços + Bíceps",
        "focus": "Cabeça Longa + Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada Reversa com Apoio no Banco e Halteres com Um Braço",
        "group": "Antebraços + Bíceps",
        "focus": "Cabeça Longa + Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada Unilateral com Halter e Rotação",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inclinada Unilateral com Haltere",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inclinada com Apoio no Banco e Halteres",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inclinada com Halter Apoiada no Banco com um Braço",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada com Halteres (No banco a 45º)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada com Halteres e Apoio no Banco",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Inclinada com Halteres e Braço Apoiado no Banco",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Inversa Bayesian com Elástico",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Bayesian na Polia (sentado)",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Rosca Inversa Inclinada com Halteres",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Plana com Halter, Apoiada no Banco com um Braço",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Inversa Sentada com Halteres",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral Com Haltere Em Pé",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral com Haltere (Sentado)",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral com Haltere em Banco Inclinado",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral na Polia Alta (Bayesian)",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa Unilateral na Polia Alta com Rotação",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa com Barra",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Rosca Inversa com Elástico (Ancoragem Alta)",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa com Halteres",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Inversa na Prancha com Halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Inversa no Cabo/Barra",
        "group": "Bíceps",
        "focus": "Braquial/Antebraço",
        "equip": "Cabo/Barra",
        "nivel": 2
    },
    {
        "name": "Rosca Invertida Bayesian na Polia",
        "group": "Antebraços + Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Extensores do Antebraço",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Isométrica (Toalha/Cinto)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Acessório_Caseiro",
        "nivel": 2
    },
    {
        "name": "Rosca Martelo (Halteres/Corda)",
        "group": "Bíceps",
        "focus": "Braquial/Antebraço",
        "equip": "Halter/Cabo",
        "nivel": 2
    },
    {
        "name": "Rosca Martelo Alta Com Elástico",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Bayesiana Sentada na Polia",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Inclinada com Halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral Com Haltere",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral Na Polia Alta Com Rotação",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral com Apoio no Banco",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral com Cabo",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral com Haltere em Banco Inclinado",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral em Pé com Haltere",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo Unilateral na Polia Alta (Bayesian)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo com Haltere (Sentado, Unilateral)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo com Halteres (Sentado)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Martelo com Halteres Apoiada no Banco Plano",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Martelo na Polia com Corda",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Máquina",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Reversa com Kettlebell de Um Braço Só",
        "group": "Antebraços + Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Scott (Máquina/Barra)",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Máquina/Barra",
        "nivel": 1
    },
    {
        "name": "Rosca Scott Unilateral com Haltere",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Scott com Halteres no Banco Reto",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Scott com barra W",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca Scott com kettlebell",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Scott inversa com barra EZ",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca Sentada com Halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Sentada no Cabo Bayesian",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Spider",
        "group": "Bíceps",
        "focus": "Cabeça Curta/Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Tríceps com Halteres ao Estilo Guilhotina",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Unilateral Com Halter Sentado",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Unilateral com Kettlebell",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Unilateral em Pé com Haltere",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Unilateral no Cabo (Bayesian)",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca Zottman Sentada com Halteres",
        "group": "Antebraços + Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Zottman com Haltere (Sentado, Unilateral)",
        "group": "Antebraços + Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca Zottman com Halteres",
        "group": "Antebraços + Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca Zottman inclinada com halteres",
        "group": "Antebraços + Bíceps",
        "focus": "Cabeça Longa + Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca alta alternada sentada na polia",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca arrastada com halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca arrastada na Smith Machine",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Rosca bilateral na polia alta",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca com Anel",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Rosca com Anilha para Desenvolvimento Militar",
        "group": "Bíceps + Deltoides Frontais",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Deltoide Anterior e Lateral",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Rosca com Halter na Posição de Garçom",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca com Pegada Inversa na Barra do Cabo",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca com anilha",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca com anilha em agachamento isométrico",
        "group": "Bíceps + Glúteos",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Rosca com barra EZ",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Rosca com elástico",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Rosca com faixa Bayesian",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Rosca com halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca com halteres em um joelho e com um braço estendido acima da cabeça",
        "group": "Deltoides Frontais + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca com kettlebell",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca cruzada bilateral na polia",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca de Bíceps na Landmine",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Rosca de Bíceps na Máquina",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca de Bíceps no Banco Scott com Halteres",
        "group": "Bíceps",
        "focus": "Cabeça Curta",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca de Bíceps no Suporte com Barra EZ",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca de Pulso com Haltere no Banco",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca de Pulso no Banco com Kettlebell",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca de Punho (Flexão/Extensão)",
        "group": "Antebraço",
        "focus": "Flexores/Extensores",
        "equip": "Halteres/Barra",
        "nivel": 2
    },
    {
        "name": "Rosca de Punho Unilateral com Halter no Banco",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca de Punho Unilateral com Haltere no Banco",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca de Punho no Cabo",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca de arrasto com barra W",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca de punho com barra",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca de punho com halteres",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca de punho com kettlebell",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca de punho no cabo com apoio",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca deitado com halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca fechada com barra EZ",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca inclinada com halteres",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca inclinada com halteres e rotação",
        "group": "Bíceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca inversa com barra EZ",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rosca inversa com elástico",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Rosca inversa com kettlebell",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca inversa de bíceps ajoelhado",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Rosca inversa unilateral no cabo",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca martelo com elástico Bayesian",
        "group": "Antebraços + Bíceps",
        "focus": "Flexores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Rosca martelo com halteres",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca martelo na polia Bayesian",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rosca martelo sentado com haltere (braço único)",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca na Polia com Rotação",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Rosca no Banco com Apoio de Halteres",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Rosca no TRX",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Rosca unilateral em pé com haltere e rotação",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rosca unilateral no cabo alto com rotação",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rotação Alternada de Poste",
        "group": "Deltoides Frontais + Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Rotação Externa com Cabo",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rotação Externa com Halteres",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rotação Externa com Mini Band",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Rotação Externa do Ombro com Haltere",
        "group": "Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rotação Interna com Cabo",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rotação Interna com Halteres",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Rotação Lombar 1",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Rotação Lombar 2",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Rotação Lombar 3",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Rotação Lombar 4",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Rotação Lombar 5",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Rotação Oblíqua no Landmine",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Rotação Pallof na polia",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rotação Torácica em 4 apoios",
        "group": "Mobilidade",
        "focus": "Costas/Ombros",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Rotação da Coluna Torácica com Peso Corporal",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Rotação de Tronco Ajoelhado (De Cima para Baixo)",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Rotação de Tronco com Cabo, Ajoelhado (De Cima para Baixo)",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Rotação de Tronco com Disco",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Rotação de Tronco com Elástico",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Banda",
        "nivel": 3
    },
    {
        "name": "Rotação de Tronco em Pé (De Cima para Baixo)",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Rotação de Tronco em Pé com Cabo (De Cima para Baixo)",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Rotação de tronco na polia",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Rotação na Barra",
        "group": "Deltoides Frontais + Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Russian Twist (Com anilha ou livre)",
        "group": "Core",
        "focus": "Oblíquos / Rotação",
        "equip": "Peso_Corporal/Carga",
        "nivel": 2
    },
    {
        "name": "Russian Twist (peso corporal)",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Russian Twist com anilha",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Russian Twist com kettlebell",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Russian Twist com os Pés no Chão",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Russian Twist com os pés apoiados e halter",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Salte Para a Aterrissagem Com Uma Única Perna",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Salto Alternado com Escalador de Montanha",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Salto Diamante Cardio",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Cardio",
        "nivel": 2
    },
    {
        "name": "Salto Grupado (Tuck Jumps no lugar)",
        "group": "Cardio/HIIT",
        "focus": "Resistência Anaeróbica",
        "equip": "Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Salto Sentado na Caixa",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Salto Unilateral na Caixa",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Salto com Aterrissagem em uma Perna Só da Caixa",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Salto de Panturrilha com Barra",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Salto de Profundidade",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Salto do Patinador",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Salto em distância",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 2
    },
    {
        "name": "Salto na caixa",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Saudação de Expansão Reversa (Ajoelhado)",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Savasana (Postura do Cadáver)",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Scooter de Pilates",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Serra na prancha",
        "group": "Abdominais",
        "focus": "Core (Transverso do Abdômen e Estabilizadores)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Shadow Boxing (Sombra com ou sem halteres leves)",
        "group": "Cardio/HIIT",
        "focus": "Motor Aeróbico",
        "equip": "Peso_Corporal/Halter",
        "nivel": 1
    },
    {
        "name": "Short Spine no Pilates",
        "group": "Abdominais + Glúteos + Parte Inferior das Costas + Quadríceps",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral) + Reto Abdominal (Geral)",
        "equip": "Pilates",
        "nivel": 2
    },
    {
        "name": "Shuffle Lateral na Esteira",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Smith Machine Elevação de Joelhos Suspensa",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Smith Machine Elevação de Panturrilha Sentado",
        "group": "Panturrilhas",
        "focus": "Músculo Sóleo",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Smith Machine Flexão Lateral",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Smith Machine Peso Morto Romeno",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Smith Machine Thrust de Quadril com uma perna",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Snatch com Kettlebell (uma mão)",
        "group": "Deltoides Frontais + Glúteos",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Spoto Press com barra",
        "group": "Peito + Tríceps",
        "focus": "Cabeças Lateral e Medial + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Sprawl (Meio Burpee)",
        "group": "Cardio/HIIT",
        "focus": "Resistência Anaeróbica",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Sprint Cardio em Figura Oito",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 2
    },
    {
        "name": "Sprint No Lugar",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Sprint de Ida e Volta",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Sprint na Esteira",
        "group": "Glúteos + Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Step Down Curtsy com Peso Corporal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Step Down Parcial com o Peso do Corpo",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Step-Up Com Duas Pesas Russas",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Step-Up Lateral com Halter na Posição Goblet",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Step-Up com Barra em Front Rack e Elevação do Joelho",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Step-Up com Barra no Front Rack",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Step-Up com Elevação do Joelho (Peso Corporal)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Step-Up com Haltere (Posição Goblet)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Step-up Lateral com Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Step-up Lateral com Halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Step-up Unilateral com Haltere e Elevação de Joelho",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Step-up com barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Step-up com barra e elevação do joelho",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Step-up com halteres",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Step-up com halteres em rack frontal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Step-up com kettlebell em rack frontal (braço único) e impulso de joelho",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Step-up com pesa russa",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Step-up na caixa (Halteres)",
        "group": "Pernas",
        "focus": "Quadríceps (Vastos)",
        "equip": "Caixa/Halteres",
        "nivel": 2
    },
    {
        "name": "Step-up reverso com peso corporal",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 3
    },
    {
        "name": "Step-up unilateral com haltere",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Step-up unilateral com kettlebell (equilíbrio)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Stiff (Barra/Halteres)",
        "group": "Pernas",
        "focus": "Isquiotibiais (Porção Alongada)",
        "equip": "Barra/Halteres",
        "nivel": 2
    },
    {
        "name": "Stiff Romeno Landmine em Posição Escalonada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Stiff Romeno Unilateral",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Stiff Romeno com Barra e Faixa Elástica",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Stiff com Barra",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Stiff com barra",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Stiff romeno com landmine",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Stiff unilateral com halteres",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Subida No Banco Unilateral Com Haltere Em Rack Frontal E Impulso De Joelho",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Subida Unilateral com Pesa Russa e Elevação do Joelho",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Subida no Banco com Barra - Equilíbrio",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Subida no Banco com Halteres e Elevação de Joelho",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Subida no Banco com Kettlebell em Apoio Frontal (Braço Único)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Subida no Banco com Kettlebell em Rack Frontal e Elevação de Joelho",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Subida no banco com halter no rack frontal (braço único)",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Subida no banco com halteres na posição frontal e elevação do joelho",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Subida no banco com kettlebell na posição de rack frontal",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Super-homem",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Superman Solo",
        "group": "Costas",
        "focus": "Eretores da Espinha (Lombar)",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Superman com Halteres",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Superman com Kettlebell",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Superman com anilha",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Superman com halteres — segurar",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Superman com peso corporal",
        "group": "Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Supinação e Pronação de Punho com Halteres",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Com Cabos",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Declinado Alternado com Haltere (Um Braço por Vez)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Declinado Alternado na Polia",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Declinado Com Cabos",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Declinado Guilhotina Com Halteres",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Supino Declinado Unilateral com Haltere",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Declinado Unilateral na Polia",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Declinado com Barra/Halteres",
        "group": "Peitoral",
        "focus": "Fibras Inferiores",
        "equip": "Barra/Halteres",
        "nivel": 2
    },
    {
        "name": "Supino Declinado com Halteres (Aperto)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Declinado na Máquina",
        "group": "Peitoral",
        "focus": "Fibras Inferiores",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Declinado na Polia em Arco",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Fechado com Halteres (Squeeze Press / Hex Press)",
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Guilhotina Inclinado Alto com Barra",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Supino Guilhotina Unilateral com Haltere para Tríceps",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Guilhotina Unilateral com Pesa Russa para Tríceps",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Guilhotina com Barra para Tríceps",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino Guilhotina com Halteres",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Supino Guilhotina com Pesa Russa",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado Alto Unilateral com Kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado Alto com Haltere (Unilateral)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado Alto com Halteres e Pegada Neutra",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado Alto com Pesa Russa",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado Guilhotina com Barra",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Supino Inclinado Guilhotina com Halteres",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Supino Inclinado Unilateral com Haltere",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado Unilateral com Kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado Unilateral na Polia",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Barra",
        "group": "Peito + Peitoral + Tríceps",
        "focus": "Fibras Superiores + Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Barra/Anilhas, Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado com Barra em Ângulo Elevado",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado com Cabo em Arco",
        "group": "Peito",
        "focus": "Peitoral Superior (Fibras Claviculares)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Cabos",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Halteres",
        "group": "Peito + Peitoral + Tríceps",
        "focus": "Fibras Superiores + Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Halteres (Pegada Neutra)",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Halteres em Altura Elevada",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado com Kettlebell na Guilhotina",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Inclinado na Máquina",
        "group": "Peitoral",
        "focus": "Fibras Superiores",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Inclinado na Máquina Smith",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Supino Larsen com barra",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Supino Larsen com halteres",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
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
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Barra/Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino Reto com Halteres",
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino Reto na Máquina",
        "group": "Peitoral",
        "focus": "Fibras Médias",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Unilateral com Haltere",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Unilateral com Kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino Unilateral no Cabo",
        "group": "Peito",
        "focus": "Peitoral Médio (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino Unilateral no Landmine",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino alternado em pé no cabo",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino alternado na polia",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino com Faixa de Resistência",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Supino com Halteres (Pegada Neutra)",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino com Kettlebell (Unilateral)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino com Kettlebell no Chão",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino com Pegada Inversa com Halteres",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Supino com Pegada Neutra",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino com Pegada Reversa na Barra",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino com barra",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino com barra (posição hook-lying)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Supino com cabos",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino com faixa elástica",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Supino com halteres",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino com halteres apertados",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino com halteres no chão",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino com kettlebell",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino com pegada fechada (barra)",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino com pegada fechada na máquina Smith",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Supino declinado alternado em pé no cabo",
        "group": "Peito",
        "focus": "Peitoral Inferior (Fibras Abdominais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino declinado com barra",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino declinado com halteres",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino declinado com halteres (pegada neutra)",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Supino declinado com pegada fechada na barra",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Supino declinado em pé na polia",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Inferior (Fibras Abdominais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino em Pé Unilateral com Cabo",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino guilhotina na Smith Machine",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Supino inclinado alternado na polia",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino inclinado em pé na polia",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Supino inclinado unilateral em pé na máquina de cabos",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoide Lateral + Peitoral Superior (Fibras Claviculares) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Supino na Máquina Smith",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Máquina_Smith",
        "nivel": 1
    },
    {
        "name": "Supino no Chão com Barra",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Supino no Chão com Elástico",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Supino unilateral no cabo",
        "group": "Peito + Tríceps",
        "focus": "Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Suspensão com Peso",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Sustentação da Extensão do Quadril com Uma Perna em Posição Prona",
        "group": "Glúteos",
        "focus": "Glúteo Máximo",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Sustentação da Flexão do Quadril Sentado",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Sustentação de Chute Traseiro com Banda Elástica para Glúteos",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Svend Press em Pé na Polia",
        "group": "Oblíquos + Peito",
        "focus": "Oblíquos (Externos e Internos) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Swing Completo com Kettlebell",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Swing Unilateral com Kettlebell",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Swing alternado com kettlebell",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Swing com Haltere",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Swing com kettlebell",
        "group": "Glúteos + Parte Inferior das Costas + Posteriores da coxa",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo) + Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranáceo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Swing com kettlebell — base escalonada",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Swing com kettlebells (Duplo)",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Série 1 — Meio das costas",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Série Costas Médias 2",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Série Parte Média das Costas — Círculos Para Dentro",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Série Parte Média das Costas — Círculos para Fora",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "TRX Abdominal Oblíquo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "TRX",
        "nivel": 2
    },
    {
        "name": "TRX Afundo Curtsy",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Vastos (Lateral, Medial, Intermédio)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Afundo Lateral",
        "group": "Quadríceps",
        "focus": "Vastos (Lateral, Medial, Intermédio)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Crucifixo Invertido para Deltoide Posterior",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "TRX",
        "nivel": 2
    },
    {
        "name": "TRX Crucifixo Peitoral",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "TRX",
        "nivel": 2
    },
    {
        "name": "TRX Elevação de Panturrilha",
        "group": "Panturrilhas",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Elevação em I",
        "group": "Deltoides Frontais",
        "focus": "Deltoides (Complexo Completo)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Elevação em W",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Elevação em Y",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoides (Complexo Completo) + Trapézio (Complexo Completo)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Flexão",
        "group": "Deltoides Frontais + Peito + Tríceps",
        "focus": "Deltoides (Complexo Completo) + Peitoral Médio (Fibras Esternocostais) + Tríceps (Complexo Completo)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Ponte de Glúteos",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Prancha Lateral no Antebraço",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "TRX",
        "nivel": 2
    },
    {
        "name": "TRX Rollout Abdominal",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "TRX",
        "nivel": 3
    },
    {
        "name": "TRX Rollout Abdominal Ajoelhado",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "TRX",
        "nivel": 2
    },
    {
        "name": "TRX Rosca Inversa",
        "group": "Antebraços + Bíceps",
        "focus": "Extensores do Antebraço + Músculo Braquial e Braquiorradial",
        "equip": "TRX",
        "nivel": 2
    },
    {
        "name": "TRX Rosca Martelo",
        "group": "Bíceps",
        "focus": "Músculo Braquial e Braquiorradial",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "TRX Tríceps Testa",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "TRX",
        "nivel": 1
    },
    {
        "name": "Tate Press com Kettlebell",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Tate press com halteres",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Tensionamento do Nervo Ulnar Sentado",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Tesoura Cardio para Frente",
        "group": "Abdominais + Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral) + Reto Abdominal (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Thruster Alternado com Halteres (Um Braço de Cada Vez)",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Thruster Alternado com Kettlebell (Um Braço de Cada Vez)",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Thruster Unilateral Com Haltere",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoide Lateral + Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Thruster Unilateral com Kettlebell",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoide Lateral + Glúteo Médio e Mínimo + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Thruster com Kettlebell",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Thruster com Landmine",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Thruster com anilha",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Thruster com barra",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Thruster com halteres",
        "group": "Deltoides Frontais + Glúteos + Quadríceps",
        "focus": "Deltoides (Complexo Completo) + Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Thrusters (Agachamento com Desenvolvimento)",
        "group": "Cardio/HIIT",
        "focus": "Resistência Anaeróbica",
        "equip": "Halteres/Barra",
        "nivel": 3
    },
    {
        "name": "Toque Alternado no Calcanhar",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos) + Reto Abdominal (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Toque Oposto no Ombro na Posição de 4 Pontos",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Toque no Calcanhar",
        "group": "Core",
        "focus": "Oblíquos / Rotação",
        "equip": "Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Toque no Relógio com Mini Band",
        "group": "Abdominais + Deltoides Frontais + Deltoides Superiores",
        "focus": "Deltoides (Complexo Completo) + Reto Abdominal (Geral)",
        "equip": "Banda",
        "nivel": 1
    },
    {
        "name": "Toque no pé",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Toques de Joelho (Cardio)",
        "group": "Panturrilhas + Quadríceps",
        "focus": "Gastrocnêmio e Sóleo (Tríceps Sural) + Quadríceps Femoral (Geral)",
        "equip": "Cardio",
        "nivel": 1
    },
    {
        "name": "Toques no Relógio",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 2
    },
    {
        "name": "Torção Ajoelhada no Landmine",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Torção Em Pé Com Disco",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Torção Estática no Landmine",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Torção Lateral Ajoelhado",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Torção Russa com Haltere (Braço Estendido)",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Torção Russa no Landmine",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Torção Sentada",
        "group": "Oblíquos + Trapezio meio das Costas",
        "focus": "Oblíquos (Externos e Internos) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Torção Supina Deitada",
        "group": "Oblíquos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Oblíquos (Externos e Internos)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Torção do Escorpião",
        "group": "Bíceps + Peito",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa) + Peitoral Médio (Fibras Esternocostais)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Trabalho de Pés Meia-Ponta Alta",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Trabalho de Pés — Calcanhares na Barra",
        "group": "Glúteos + Quadríceps",
        "focus": "Glúteo Máximo (Complexo) + Quadríceps Femoral (Geral)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Trabalho de pés: abaixar e levantar",
        "group": "Panturrilhas",
        "focus": "Músculo Gastrocnêmio",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Tríceps Coice (Kickback) Halter/Cabo",
        "group": "Tríceps",
        "focus": "Lateral/Medial",
        "equip": "Halter/Cabo",
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
        "equip": "Halter/Cabo",
        "nivel": 2
    },
    {
        "name": "Tríceps Isométrico Sentado Com Haltere Acima Da Cabeça",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Recuperação",
        "nivel": 1
    },
    {
        "name": "Tríceps Máquina / Dip Machine",
        "group": "Tríceps",
        "focus": "Lateral/Medial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps Na Polia Unilateral (Rapunzel)",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Banda",
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
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa Com Barra Na Polia",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps Testa Declinada com Kettlebell",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Tríceps Testa Inclinado com Haltere (Braço Único)",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa Inclinado com Halteres",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa Unilateral com Halter",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa Unilateral na Polia",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps Testa com Barra",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Tríceps Testa com Halteres",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Tríceps Testa com Halteres no Banco Declinado",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Tríceps Testa na Máquina Smith",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Máquina_Smith",
        "nivel": 2
    },
    {
        "name": "Tríceps Unilateral na Polia com Corda",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps na Polia (Unilateral)",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps na Polia Alta com Barra",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps na Polia Cruzada",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 3
    },
    {
        "name": "Tríceps na Polia com Barra em V",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps na Polia com Corda",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps na polia com barra (pegada supinada)",
        "group": "Tríceps",
        "focus": "Tríceps (Complexo Completo)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps press deitado da série Midback",
        "group": "Tríceps",
        "focus": "Cabeças Lateral e Medial",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "Tríceps testa com barra",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Tríceps testa com elástico",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Banda",
        "nivel": 3
    },
    {
        "name": "Tríceps testa com kettlebell",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Tríceps testa cruzado bilateral na polia",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Tríceps testa no cabo com corda",
        "group": "Tríceps",
        "focus": "Cabeça Longa",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Urdhva Dhanurasana (Postura da Roda)",
        "group": "Abdominais",
        "focus": "Reto Abdominal (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Vajrasana Variação 1",
        "group": "Antebraços + Trapezio meio das Costas",
        "focus": "Flexores do Antebraço + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Vajrasana Variação 2",
        "group": "Antebraços + Trapezio meio das Costas",
        "focus": "Flexores do Antebraço + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Variação 1 da Postura da Mesa",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Variação 2 da Posição de Mesa",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Variação 3 da Postura da Mesa",
        "group": "Antebraços",
        "focus": "Flexores do Antebraço",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "Variação Quatro do Alongamento de Bíceps",
        "group": "Bíceps",
        "focus": "Bíceps Braquial (Cabeças Curta e Longa)",
        "equip": "Alongamentos",
        "nivel": 1
    },
    {
        "name": "Variação da Postura da Cancela — Braço Estendido ao Lado",
        "group": "Dorsais + Oblíquos",
        "focus": "Latíssimo do Dorso (Geral) + Oblíquos (Externos e Internos)",
        "equip": "Yoga",
        "nivel": 2
    },
    {
        "name": "Voador Inverso Unilateral com Kettlebell",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Lateral",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Voador Inverso Unilateral na Polia Alta",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Lateral",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Voador Invertido com Anel",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoides (Complexo Completo) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "Voador Peitoral com Rotação Interna com Elástico",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Banda",
        "nivel": 2
    },
    {
        "name": "Voador em Pé com Anel",
        "group": "Peito",
        "focus": "Isolamento (Fibras Esternocostais)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 1
    },
    {
        "name": "Voador inverso deitado com halteres (rotação interna)",
        "group": "Deltoides Superiores",
        "focus": "Deltoide Posterior",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Voador para deltoide posterior com disco e rotação interna",
        "group": "Deltoides Superiores + Trapezio meio das Costas + Trapézios",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior + Trapézio (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 2
    },
    {
        "name": "Voo para deltoide posterior com disco",
        "group": "Deltoides Superiores + Trapezio meio das Costas",
        "focus": "Deltoide Posterior + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Barras_Anilhas",
        "nivel": 1
    },
    {
        "name": "Windmill com kettlebell",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "Wood Chopper Meio Ajoelhado com Cabo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 1
    },
    {
        "name": "Woodchopper Ajoelhado No Cabo",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Woodchopper Ajoelhado com Haltere",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Woodchopper com cabo ajoelhado — de baixo para cima",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Maquinas_Polias",
        "nivel": 2
    },
    {
        "name": "Woodchopper com haltere",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Woodchopper com haltere (meio ajoelhado)",
        "group": "Abdominais + Oblíquos",
        "focus": "Oblíquos (Externos e Internos) + Reto Abdominal (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "Woodchopper com pesa russa",
        "group": "Oblíquos",
        "focus": "Oblíquos (Externos e Internos)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Z Press com barra",
        "group": "Deltoides Frontais + Trapézios",
        "focus": "Deltoide Anterior e Lateral + Trapézio (Complexo Completo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "Zercher Good Morning com barra",
        "group": "Glúteos + Parte Inferior das Costas",
        "focus": "Eretores da Espinha (Região Lombar) + Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "arra",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "bida No Banco Unilateral Com Haltere Em Rack Frontal E Impulso De Joelho",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "fundo Lateral com Kettlebell (Unilateral)",
        "group": "Glúteos",
        "focus": "Glúteo Médio e Mínimo",
        "equip": "Pesos_Livres",
        "nivel": 2
    },
    {
        "name": "fundo em Reverência",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "gachamento Lateral Alternado com Peso Corporal",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Calistenia, Peso_Corporal",
        "nivel": 2
    },
    {
        "name": "ilates Footwork na Primeira Posição",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pilates",
        "nivel": 1
    },
    {
        "name": "nço Reverso com Deficit e Kettlebell na Posição Frontal",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Pesos_Livres",
        "nivel": 3
    },
    {
        "name": "postura-do-ângulo-lateral-estendido",
        "group": "Dorsais",
        "focus": "Latíssimo do Dorso (Geral)",
        "equip": "Yoga",
        "nivel": 1
    },
    {
        "name": "stabilidade do Core 4 Levantamento Cruzado de Membros em Posição de Flexão",
        "group": "Quadríceps",
        "focus": "Quadríceps Femoral (Geral)",
        "equip": "Recuperação",
        "nivel": 3
    },
    {
        "name": "tamento Terra com Barra em uma Perna Só",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Barras_Anilhas",
        "nivel": 3
    },
    {
        "name": "tep-Up Com Duas Pesas Russas",
        "group": "Glúteos",
        "focus": "Glúteo Máximo (Complexo)",
        "equip": "Pesos_Livres",
        "nivel": 1
    },
    {
        "name": "Ângulo Lateral Torcido Com Mãos Em Oração Iniciante",
        "group": "Oblíquos + Trapezio meio das Costas",
        "focus": "Oblíquos (Externos e Internos) + Romboides (Maior e Menor) e Trapézio Médio/Inferior",
        "equip": "Yoga",
        "nivel": 1
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