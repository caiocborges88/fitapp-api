// Catálogo de movimentos. Subníveis indicam ênfase; não garantem isolamento muscular.
// nivel = complexidade (1 básica, 2 moderada, 3 alta), não nível mínimo do praticante.
// muscleFocus + movementPattern orientam substituições; resources contém TODOS os recursos obrigatórios.
window.dictionaryData = [
    {
        "name": "Agachamento com peso corporal",
        "group": "Pernas",
        "agonist": "Quadríceps",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Peso Corporal",
        "nivel": 1,
        "resources": [],
        "antagonist": "Isquiotibiais",
        "synergist": [],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "agachamento-com-peso-corporal",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Ponte de glúteos no solo",
        "group": "Pernas",
        "agonist": "Glúteos",
        "subLevel": "Glúteo Máximo",
        "equip": "Peso Corporal",
        "nivel": 1,
        "resources": [],
        "antagonist": "Flexores do Quadril",
        "synergist": [],
        "muscleFocus": [
            "gluteo-maximo"
        ],
        "movementPattern": "extensao-quadril",
        "id": "ponte-de-gluteos-no-solo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Ponte de quadril com apoio dos calcanhares",
        "group": "Pernas",
        "agonist": "Isquiotibiais",
        "subLevel": "Isquiotibiais (extensão de quadril)",
        "equip": "Peso Corporal",
        "nivel": 1,
        "resources": [],
        "antagonist": "Quadríceps",
        "synergist": [],
        "muscleFocus": [
            "isquiotibiais"
        ],
        "movementPattern": "extensao-quadril",
        "id": "ponte-de-quadril-com-apoio-dos-calcanhares",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Elevação de panturrilhas em pé sem carga",
        "group": "Pernas",
        "agonist": "Panturrilhas",
        "subLevel": "Gastrocnêmios",
        "equip": "Peso Corporal",
        "nivel": 1,
        "resources": [],
        "antagonist": "Tibial Anterior",
        "synergist": [],
        "muscleFocus": [
            "gastrocnemios"
        ],
        "movementPattern": "flexao-plantar",
        "id": "elevacao-de-panturrilhas-em-pe-sem-carga",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Flexão Pike no solo",
        "group": "Ombros",
        "agonist": "Ombros",
        "subLevel": "Deltoide Anterior",
        "equip": "Peso Corporal",
        "nivel": 2,
        "resources": [],
        "antagonist": "Costas",
        "synergist": [],
        "muscleFocus": [
            "deltoide-anterior"
        ],
        "movementPattern": "empurrar-vertical",
        "id": "flexao-pike-no-solo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Flexão com mãos próximas",
        "group": "Tríceps",
        "agonist": "Tríceps",
        "subLevel": "Tríceps (Cabeça Lateral/Medial)",
        "equip": "Peso Corporal",
        "nivel": 2,
        "resources": [],
        "antagonist": "Bíceps",
        "synergist": [],
        "muscleFocus": [
            "triceps-lateral-medial"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "flexao-com-maos-proximas",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Flexão de Braço (Padrão)",
        "group": "Peitoral",
        "subLevel": "Esternocostal",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [],
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "flexao-de-braco-padrao",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Flexão Inclinada (Mãos no banco)",
        "resources": [
            "bench"
        ],
        "group": "Peitoral",
        "subLevel": "Abdominal",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "muscleFocus": [
            "peitoral-inferior"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "flexao-inclinada-maos-no-banco",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Flexão Declinada (Pés no banco)",
        "resources": [
            "bench"
        ],
        "group": "Peitoral",
        "subLevel": "Clavicular",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "muscleFocus": [
            "peitoral-clavicular"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "flexao-declinada-pes-no-banco",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Supino Reto com Barra",
        "group": "Peitoral",
        "subLevel": "Esternocostal",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [
            "barbell",
            "plates",
            "bench"
        ],
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "supino-reto-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Supino Reto com Halteres",
        "group": "Peitoral",
        "subLevel": "Esternocostal",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [
            "dumbbells",
            "bench"
        ],
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "supino-reto-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Supino Reto na Máquina",
        "group": "Peitoral",
        "subLevel": "Esternocostal",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "supino-reto-na-maquina",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Supino Inclinado com Barra",
        "group": "Peitoral",
        "subLevel": "Clavicular",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [
            "barbell",
            "plates",
            "incline-bench"
        ],
        "muscleFocus": [
            "peitoral-clavicular"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "supino-inclinado-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Supino Inclinado com Halteres",
        "group": "Peitoral",
        "subLevel": "Clavicular",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [
            "dumbbells",
            "incline-bench"
        ],
        "muscleFocus": [
            "peitoral-clavicular"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "supino-inclinado-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Supino Inclinado na Máquina",
        "group": "Peitoral",
        "subLevel": "Clavicular",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "peitoral-clavicular"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "supino-inclinado-na-maquina",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Supino Declinado com Barra",
        "group": "Peitoral",
        "subLevel": "Abdominal",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [
            "barbell",
            "plates",
            "decline-bench"
        ],
        "muscleFocus": [
            "peitoral-inferior"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "supino-declinado-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Supino Declinado com Halteres",
        "group": "Peitoral",
        "subLevel": "Abdominal",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Ombro Anterior"
        ],
        "resources": [
            "dumbbells",
            "decline-bench"
        ],
        "muscleFocus": [
            "peitoral-inferior"
        ],
        "movementPattern": "empurrar-horizontal",
        "id": "supino-declinado-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Crucifixo Reto com Halteres",
        "group": "Peitoral",
        "subLevel": "Esternocostal (Isolamento)",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Ombro Anterior"
        ],
        "resources": [
            "dumbbells",
            "bench"
        ],
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "movementPattern": "aducao-horizontal",
        "id": "crucifixo-reto-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Crucifixo Inclinado com Halteres",
        "group": "Peitoral",
        "subLevel": "Clavicular (Isolamento)",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Ombro Anterior"
        ],
        "resources": [
            "dumbbells",
            "incline-bench"
        ],
        "muscleFocus": [
            "peitoral-clavicular"
        ],
        "movementPattern": "aducao-horizontal",
        "id": "crucifixo-inclinado-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Voador (Peck Deck)",
        "group": "Peitoral",
        "subLevel": "Esternocostal (Isolamento)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Ombro Anterior"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "movementPattern": "aducao-horizontal",
        "id": "voador-peck-deck",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Crossover Polia Alta",
        "group": "Peitoral",
        "subLevel": "Abdominal",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Ombro Anterior",
            "Tríceps"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "peitoral-inferior"
        ],
        "movementPattern": "aducao-horizontal",
        "id": "crossover-polia-alta",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Crossover Polia Média",
        "group": "Peitoral",
        "subLevel": "Esternocostal",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Ombro Anterior",
            "Tríceps"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "movementPattern": "aducao-horizontal",
        "id": "crossover-polia-media",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Crossover Polia Baixa",
        "group": "Peitoral",
        "subLevel": "Clavicular",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Peitoral",
        "antagonist": "Costas",
        "synergist": [
            "Ombro Anterior",
            "Tríceps"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "peitoral-clavicular"
        ],
        "movementPattern": "aducao-horizontal",
        "id": "crossover-polia-baixa",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Barra Fixa Pronada (Pull-up)",
        "resources": [
            "pullup-bar"
        ],
        "group": "Costas",
        "subLevel": "Latíssimo do Dorso",
        "equip": "Peso Corporal",
        "nivel": 3,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior",
            "Braquial"
        ],
        "aliases": [
            "Barra Fixa (Pull-up / Chin-up)"
        ],
        "muscleFocus": [
            "costas-latissimo"
        ],
        "movementPattern": "puxar-vertical",
        "id": "barra-fixa-pull-up-chin-up-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Puxada Alta (Pegada Aberta)",
        "group": "Costas",
        "subLevel": "Latíssimo do Dorso",
        "equip": "Cabo",
        "nivel": 1,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior",
            "Braquial"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "costas-latissimo"
        ],
        "movementPattern": "puxar-vertical",
        "id": "puxada-alta-pegada-aberta",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Puxada Alta Supinada",
        "group": "Costas",
        "subLevel": "Latíssimo do Dorso",
        "equip": "Cabo",
        "nivel": 1,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior",
            "Braquial"
        ],
        "aliases": [
            "Puxada Alta Supinada/Neutra"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "costas-latissimo"
        ],
        "movementPattern": "puxar-vertical",
        "id": "puxada-alta-supinada-neutra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Puxada Alta na Máquina",
        "group": "Costas",
        "subLevel": "Latíssimo do Dorso",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "costas-latissimo"
        ],
        "movementPattern": "puxar-vertical",
        "id": "puxada-alta-na-maquina",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Remada Curvada com Barra",
        "group": "Costas",
        "subLevel": "Espessura (Romboides)",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Lombar",
            "Ombro Posterior"
        ],
        "resources": [
            "barbell",
            "plates"
        ],
        "muscleFocus": [
            "costas-remada"
        ],
        "movementPattern": "puxar-horizontal",
        "id": "remada-curvada-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Remada Unilateral (Serrote)",
        "group": "Costas",
        "subLevel": "Espessura (Romboides/Latíssimo)",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior"
        ],
        "resources": [
            "dumbbells",
            "bench"
        ],
        "muscleFocus": [
            "costas-remada",
            "costas-latissimo"
        ],
        "movementPattern": "puxar-horizontal",
        "id": "remada-unilateral-serrote",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Remada Baixa no Cabo (Triângulo)",
        "group": "Costas",
        "subLevel": "Espessura (Romboides/Miolo)",
        "equip": "Cabo",
        "nivel": 1,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior",
            "Lombar"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "costas-remada"
        ],
        "movementPattern": "puxar-horizontal",
        "id": "remada-baixa-no-cabo-triangulo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Remada Máquina Apoiada no Peito",
        "group": "Costas",
        "subLevel": "Espessura (Romboides)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "costas-remada"
        ],
        "movementPattern": "puxar-horizontal",
        "id": "remada-maquina-apoiada-no-peito",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Remada Cavalinho (T-Bar)",
        "group": "Costas",
        "subLevel": "Espessura (Romboides)",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Lombar",
            "Ombro Posterior"
        ],
        "resources": [
            "barbell",
            "plates",
            "landmine"
        ],
        "muscleFocus": [
            "costas-remada"
        ],
        "movementPattern": "puxar-horizontal",
        "id": "remada-cavalinho-t-bar",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Pulldown no Cabo (Braços Estendidos)",
        "group": "Costas",
        "subLevel": "Latíssimo do Dorso",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Tríceps (Cabeça Longa)",
            "Core"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "costas-latissimo"
        ],
        "movementPattern": "extensao-ombro",
        "id": "pulldown-no-cabo-bracos-estendidos",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Levantamento Terra (Convencional)",
        "group": "Costas",
        "subLevel": "Eretores da Espinha / Cadeia Posterior",
        "equip": "Barra",
        "nivel": 3,
        "agonist": "Costas",
        "antagonist": "Core",
        "synergist": [
            "Glúteos",
            "Isquiotibiais",
            "Quadríceps",
            "Trapézio"
        ],
        "resources": [
            "barbell",
            "plates"
        ],
        "muscleFocus": [
            "cadeia-posterior"
        ],
        "movementPattern": "dobrar-quadril",
        "id": "levantamento-terra-convencional",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Extensão Lombar (Banco Romano)",
        "group": "Costas",
        "subLevel": "Eretores da Espinha",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Lombar",
        "antagonist": "Core",
        "synergist": [
            "Glúteos",
            "Isquiotibiais"
        ],
        "resources": [
            "roman-bench"
        ],
        "muscleFocus": [
            "eretores"
        ],
        "movementPattern": "extensao-tronco",
        "id": "extensao-lombar-banco-romano",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Agachamento com Barra nas Costas",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos",
            "Core",
            "Lombar"
        ],
        "aliases": [
            "Agachamento Livre (Back/Front Squat)"
        ],
        "resources": [
            "barbell",
            "plates",
            "rack"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "agachamento-livre-back-front-squat-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Agachamento Goblet com Halter",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos",
            "Core"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "agachamento-goblet-com-halter",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Agachamento no Smith",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "agachamento-no-smith",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Leg Press 45º",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos"
        ],
        "aliases": [
            "Leg Press 45º / Horizontal"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "leg-press-45-horizontal",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Hack Machine",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "hack-machine",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Cadeira Extensora",
        "group": "Pernas",
        "subLevel": "Reto Femoral",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "quadriceps-reto"
        ],
        "movementPattern": "extensao-joelho",
        "id": "cadeira-extensora",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Afundo / Avanço",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos",
            "Core"
        ],
        "resources": [],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "afundo-avanco",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Afundo com Halteres",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos",
            "Core"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "afundo-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Agachamento Búlgaro com Halteres",
        "group": "Pernas",
        "subLevel": "Quadríceps / Glúteos",
        "equip": "Halter",
        "nivel": 3,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos",
            "Core"
        ],
        "aliases": [
            "Agachamento Búlgaro"
        ],
        "resources": [
            "dumbbells",
            "bench"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "agachamento-bulgaro",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "RDL com Barra",
        "group": "Pernas",
        "subLevel": "Isquiotibiais (extensão de quadril)",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Isquiotibiais",
        "antagonist": "Quadríceps",
        "synergist": [
            "Glúteos",
            "Lombar"
        ],
        "aliases": [
            "Stiff / RDL com Barra"
        ],
        "resources": [
            "barbell",
            "plates"
        ],
        "muscleFocus": [
            "isquiotibiais"
        ],
        "movementPattern": "dobrar-quadril",
        "id": "stiff-rdl-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "RDL com Halteres",
        "group": "Pernas",
        "subLevel": "Isquiotibiais (extensão de quadril)",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Isquiotibiais",
        "antagonist": "Quadríceps",
        "synergist": [
            "Glúteos",
            "Lombar"
        ],
        "aliases": [
            "Stiff / RDL com Halteres"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "isquiotibiais"
        ],
        "movementPattern": "dobrar-quadril",
        "id": "stiff-rdl-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Mesa Flexora (Deitado)",
        "group": "Pernas",
        "subLevel": "Isquiotibiais (flexão de joelho)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Isquiotibiais",
        "antagonist": "Quadríceps",
        "synergist": [
            "Panturrilhas"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "isquiotibiais"
        ],
        "movementPattern": "flexao-joelho",
        "id": "mesa-flexora-deitado",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Cadeira Flexora (Sentado)",
        "group": "Pernas",
        "subLevel": "Isquiotibiais (flexão de joelho)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Isquiotibiais",
        "antagonist": "Quadríceps",
        "synergist": [
            "Panturrilhas"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "isquiotibiais"
        ],
        "movementPattern": "flexao-joelho",
        "id": "cadeira-flexora-sentado",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Elevação Pélvica com Barra",
        "group": "Pernas",
        "subLevel": "Glúteo Máximo",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Glúteos",
        "antagonist": "Flexores do Quadril",
        "synergist": [
            "Isquiotibiais",
            "Core",
            "Lombar"
        ],
        "resources": [
            "barbell",
            "plates",
            "bench"
        ],
        "muscleFocus": [
            "gluteo-maximo"
        ],
        "movementPattern": "extensao-quadril",
        "id": "elevacao-pelvica-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Elevação Pélvica na Máquina",
        "group": "Pernas",
        "subLevel": "Glúteo Máximo",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Glúteos",
        "antagonist": "Flexores do Quadril",
        "synergist": [
            "Isquiotibiais"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "gluteo-maximo"
        ],
        "movementPattern": "extensao-quadril",
        "id": "elevacao-pelvica-na-maquina",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Cadeira Abdutora",
        "group": "Pernas",
        "subLevel": "Glúteo Médio e Mínimo",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Glúteos (Abdutores)",
        "antagonist": "Adutores",
        "synergist": [],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "gluteos-abdutores"
        ],
        "movementPattern": "abducao-quadril",
        "id": "cadeira-abdutora",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Cadeira Adutora",
        "group": "Pernas",
        "subLevel": "Músculos Adutores",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Adutores",
        "antagonist": "Glúteos (Abdutores)",
        "synergist": [],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "adutores"
        ],
        "movementPattern": "aducao-quadril",
        "id": "cadeira-adutora",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Panturrilha em Pé na Máquina",
        "group": "Pernas",
        "subLevel": "Gastrocnêmios",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Panturrilhas",
        "antagonist": "Tibial Anterior",
        "synergist": [],
        "aliases": [
            "Panturrilha em Pé (Máquina/Smith)"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "gastrocnemios"
        ],
        "movementPattern": "flexao-plantar",
        "id": "panturrilha-em-pe-maquina-smith-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Panturrilha Sentado (Máquina)",
        "group": "Pernas",
        "subLevel": "Sóleo",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Panturrilhas",
        "antagonist": "Tibial Anterior",
        "synergist": [],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "soleo"
        ],
        "movementPattern": "flexao-plantar-joelho-flexionado",
        "id": "panturrilha-sentado-maquina",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Panturrilha no Leg Press",
        "group": "Pernas",
        "subLevel": "Gastrocnêmios",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Panturrilhas",
        "antagonist": "Tibial Anterior",
        "synergist": [],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "gastrocnemios"
        ],
        "movementPattern": "flexao-plantar",
        "id": "panturrilha-no-leg-press",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Desenvolvimento Militar com Barra",
        "group": "Ombros",
        "subLevel": "Deltoide Anterior",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Ombros",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Peitoral Superior",
            "Core"
        ],
        "resources": [
            "barbell",
            "plates"
        ],
        "muscleFocus": [
            "deltoide-anterior"
        ],
        "movementPattern": "empurrar-vertical",
        "id": "desenvolvimento-militar-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Desenvolvimento com Halteres",
        "group": "Ombros",
        "subLevel": "Deltoide Anterior",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Ombros",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Peitoral Superior"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "deltoide-anterior"
        ],
        "movementPattern": "empurrar-vertical",
        "id": "desenvolvimento-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Desenvolvimento na Máquina",
        "group": "Ombros",
        "subLevel": "Deltoide Anterior",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Ombros",
        "antagonist": "Costas",
        "synergist": [
            "Tríceps",
            "Peitoral Superior"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "deltoide-anterior"
        ],
        "movementPattern": "empurrar-vertical",
        "id": "desenvolvimento-na-maquina",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Elevação Lateral com Halteres",
        "group": "Ombros",
        "subLevel": "Deltoide Lateral",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Ombros",
        "antagonist": "Costas",
        "synergist": [
            "Trapézio"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "deltoide-lateral"
        ],
        "movementPattern": "abducao-ombro",
        "id": "elevacao-lateral-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Elevação Lateral no Cabo",
        "group": "Ombros",
        "subLevel": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Ombros",
        "antagonist": "Costas",
        "synergist": [
            "Trapézio"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "deltoide-lateral"
        ],
        "movementPattern": "abducao-ombro",
        "id": "elevacao-lateral-no-cabo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Elevação Frontal com Halteres",
        "group": "Ombros",
        "subLevel": "Deltoide Anterior",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Ombros",
        "antagonist": "Ombro Posterior",
        "synergist": [
            "Peitoral Superior"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "deltoide-anterior"
        ],
        "movementPattern": "flexao-ombro",
        "id": "elevacao-frontal-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Crucifixo Invertido com Halteres",
        "group": "Ombros",
        "subLevel": "Deltoide Posterior",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Ombros",
        "antagonist": "Peitoral",
        "synergist": [
            "Trapézio",
            "Romboides"
        ],
        "resources": [
            "dumbbells",
            "bench"
        ],
        "muscleFocus": [
            "deltoide-posterior"
        ],
        "movementPattern": "abducao-horizontal",
        "id": "crucifixo-invertido-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Crucifixo Invertido na Máquina (Peck Deck)",
        "group": "Ombros",
        "subLevel": "Deltoide Posterior",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Ombros",
        "antagonist": "Peitoral",
        "synergist": [
            "Trapézio",
            "Romboides"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "deltoide-posterior"
        ],
        "movementPattern": "abducao-horizontal",
        "id": "crucifixo-invertido-na-maquina-peck-deck",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Face Pull no Cabo",
        "group": "Ombros",
        "subLevel": "Deltoide Posterior",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Ombros",
        "antagonist": "Peitoral",
        "synergist": [
            "Trapézio",
            "Manguito Rotador",
            "Romboides"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "deltoide-posterior"
        ],
        "movementPattern": "abducao-horizontal-rotacao-externa",
        "id": "face-pull-no-cabo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Remada Alta no Cabo",
        "group": "Ombros",
        "subLevel": "Deltoide Lateral",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Ombros",
        "antagonist": "Costas",
        "synergist": [
            "Trapézio",
            "Bíceps",
            "Braquial"
        ],
        "aliases": [
            "Remada Alta (Barra/Cabo)"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "deltoide-lateral"
        ],
        "movementPattern": "abducao-ombro",
        "id": "remada-alta-barra-cabo-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Rosca Direta com Barra",
        "group": "Bíceps",
        "subLevel": "Bíceps Braquial",
        "equip": "Barra",
        "nivel": 1,
        "agonist": "Bíceps",
        "antagonist": "Tríceps",
        "synergist": [
            "Braquial",
            "Antebraço"
        ],
        "resources": [
            "barbell",
            "plates"
        ],
        "muscleFocus": [
            "biceps"
        ],
        "movementPattern": "flexao-cotovelo-supinada",
        "id": "rosca-direta-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Rosca Alternada com Halteres",
        "group": "Bíceps",
        "subLevel": "Bíceps Braquial",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Bíceps",
        "antagonist": "Tríceps",
        "synergist": [
            "Braquial",
            "Antebraço"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "biceps"
        ],
        "movementPattern": "flexao-cotovelo-supinada",
        "id": "rosca-alternada-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Rosca no Cabo (Polia Baixa)",
        "group": "Bíceps",
        "subLevel": "Bíceps Braquial",
        "equip": "Cabo",
        "nivel": 1,
        "agonist": "Bíceps",
        "antagonist": "Tríceps",
        "synergist": [
            "Braquial",
            "Antebraço"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "biceps"
        ],
        "movementPattern": "flexao-cotovelo-supinada",
        "id": "rosca-no-cabo-polia-baixa",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Rosca Scott na Máquina",
        "group": "Bíceps",
        "subLevel": "Bíceps Braquial",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Bíceps",
        "antagonist": "Tríceps",
        "synergist": [
            "Braquial",
            "Antebraço"
        ],
        "aliases": [
            "Rosca Scott (Máquina/Barra)"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "biceps"
        ],
        "movementPattern": "flexao-cotovelo-supinada",
        "id": "rosca-scott-maquina-barra-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Rosca Martelo com Halteres",
        "group": "Bíceps",
        "subLevel": "Braquial / Braquiorradial",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Bíceps",
        "antagonist": "Tríceps",
        "synergist": [
            "Antebraço"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "braquial-antebraco"
        ],
        "movementPattern": "flexao-cotovelo-neutra-pronada",
        "id": "rosca-martelo-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Rosca Inversa no Cabo",
        "group": "Bíceps",
        "subLevel": "Braquial / Antebraço",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Bíceps",
        "antagonist": "Tríceps",
        "synergist": [
            "Antebraço"
        ],
        "aliases": [
            "Rosca Inversa com Barra/Cabo"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "braquial-antebraco"
        ],
        "movementPattern": "flexao-cotovelo-neutra-pronada",
        "id": "rosca-inversa-com-barra-cabo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Testa com Barra W",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeça Longa)",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Antebraço"
        ],
        "aliases": [
            "Tríceps Testa (Barra W ou Halteres)"
        ],
        "resources": [
            "barbell",
            "plates",
            "bench"
        ],
        "muscleFocus": [
            "triceps-longa"
        ],
        "movementPattern": "extensao-cotovelo-acima",
        "id": "triceps-testa-barra-w-ou-halteres-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Pulley (Barra Reta/V)",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeça Lateral/Medial)",
        "equip": "Cabo",
        "nivel": 1,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Antebraço"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "triceps-lateral-medial"
        ],
        "movementPattern": "extensao-cotovelo",
        "id": "triceps-pulley-barra-reta-v",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Corda no Cabo",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeça Lateral/Medial)",
        "equip": "Cabo",
        "nivel": 1,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Antebraço"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "triceps-lateral-medial"
        ],
        "movementPattern": "extensao-cotovelo",
        "id": "triceps-corda-no-cabo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Francês com Halter",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeça Longa)",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Antebraço"
        ],
        "aliases": [
            "Tríceps Francês (Halter/Cabo)"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "triceps-longa"
        ],
        "movementPattern": "extensao-cotovelo-acima",
        "id": "triceps-frances-halter-cabo-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Coice (Kickback)",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeça Lateral/Medial)",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Ombro Posterior",
            "Antebraço"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "triceps-lateral-medial"
        ],
        "movementPattern": "extensao-cotovelo",
        "id": "triceps-coice-kickback",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Mergulho no Banco",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeças Longa, Lateral e Medial)",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Peitoral",
            "Ombro Anterior"
        ],
        "aliases": [
            "Mergulho nas Paralelas / Banco"
        ],
        "resources": [
            "bench"
        ],
        "muscleFocus": [
            "triceps-lateral-medial"
        ],
        "movementPattern": "mergulho",
        "id": "mergulho-nas-paralelas-banco",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Máquina / Dip Machine",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeças Longa, Lateral e Medial)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Peitoral",
            "Ombro Anterior"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "triceps-lateral-medial"
        ],
        "movementPattern": "mergulho",
        "id": "triceps-maquina-dip-machine",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Abdominal Supra no Solo",
        "group": "Core",
        "subLevel": "Reto Abdominal (flexão do tronco)",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Flexores do Quadril",
            "Oblíquos"
        ],
        "aliases": [
            "Abdominal Supra (Solo/Carga)"
        ],
        "resources": [],
        "muscleFocus": [
            "core-flexao"
        ],
        "movementPattern": "flexao-tronco",
        "id": "abdominal-supra-solo-carga-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Abdominal Infra no Solo",
        "group": "Core",
        "subLevel": "Reto Abdominal (retroversão pélvica)",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Flexores do Quadril"
        ],
        "resources": [],
        "muscleFocus": [
            "core-retroversao"
        ],
        "movementPattern": "retroversao-pelvica",
        "id": "abdominal-infra-no-solo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Abdominal na Máquina",
        "group": "Core",
        "subLevel": "Reto Abdominal (flexão do tronco)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Flexores do Quadril"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "core-flexao"
        ],
        "movementPattern": "flexao-tronco",
        "id": "abdominal-na-maquina",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Prancha Isométrica Frontal",
        "group": "Core",
        "subLevel": "Transverso do Abdômen",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Ombros",
            "Glúteos",
            "Quadríceps"
        ],
        "aliases": [
            "Prancha Isométrica (Frontal/Lateral)"
        ],
        "resources": [],
        "muscleFocus": [
            "core-estabilidade"
        ],
        "movementPattern": "anti-extensao",
        "id": "prancha-isometrica-frontal-lateral-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Abdominal Bicicleta",
        "group": "Core",
        "subLevel": "Oblíquos",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Reto Abdominal",
            "Flexores do Quadril"
        ],
        "resources": [],
        "muscleFocus": [
            "core-obliquos"
        ],
        "movementPattern": "rotacao-tronco",
        "id": "abdominal-bicicleta",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Russian Twist com Halter",
        "group": "Core",
        "subLevel": "Oblíquos",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Reto Abdominal",
            "Flexores do Quadril"
        ],
        "aliases": [
            "Russian Twist (Livre ou Carga)"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "core-obliquos"
        ],
        "movementPattern": "rotacao-tronco",
        "id": "russian-twist-livre-ou-carga-",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Polichinelos (Jumping Jacks)",
        "group": "Cardio/Mobilidade",
        "subLevel": "Sistema Cardiovascular",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Corpo Todo",
        "antagonist": "Nenhum",
        "synergist": [
            "Panturrilhas",
            "Ombros"
        ],
        "resources": [],
        "muscleFocus": [
            "cardio"
        ],
        "movementPattern": "cardio",
        "id": "polichinelos-jumping-jacks",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Burpees",
        "group": "Cardio/Mobilidade",
        "subLevel": "Sistema Anaeróbico",
        "equip": "Peso Corporal",
        "nivel": 3,
        "agonist": "Corpo Todo",
        "antagonist": "Nenhum",
        "synergist": [
            "Peitoral",
            "Quadríceps",
            "Core"
        ],
        "resources": [],
        "muscleFocus": [
            "cardio"
        ],
        "movementPattern": "cardio",
        "id": "burpees",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Escalador (Mountain Climber)",
        "group": "Cardio/Mobilidade",
        "subLevel": "Sistema Anaeróbico",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Corpo Todo",
        "antagonist": "Nenhum",
        "synergist": [
            "Core",
            "Quadríceps",
            "Ombros"
        ],
        "resources": [],
        "muscleFocus": [
            "cardio"
        ],
        "movementPattern": "cardio",
        "id": "escalador-mountain-climber",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Pular Corda",
        "resources": [
            "rope"
        ],
        "group": "Cardio/Mobilidade",
        "subLevel": "Sistema Cardiovascular",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Corpo Todo",
        "antagonist": "Nenhum",
        "synergist": [
            "Panturrilhas",
            "Core"
        ],
        "muscleFocus": [
            "cardio"
        ],
        "movementPattern": "cardio",
        "id": "pular-corda",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Maior Alongamento do Mundo",
        "group": "Cardio/Mobilidade",
        "subLevel": "Mobilidade Dinâmica",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Mobilidade Geral",
        "antagonist": "Nenhum",
        "synergist": [],
        "resources": [],
        "muscleFocus": [
            "Mobilidade Dinâmica"
        ],
        "movementPattern": "Mobilidade Dinâmica",
        "id": "maior-alongamento-do-mundo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Gato-Vaca (Cat-Cow)",
        "group": "Cardio/Mobilidade",
        "subLevel": "Mobilidade Espinhal",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Mobilidade Geral",
        "antagonist": "Nenhum",
        "synergist": [],
        "resources": [],
        "muscleFocus": [
            "Mobilidade Espinhal"
        ],
        "movementPattern": "Mobilidade Espinhal",
        "id": "gato-vaca-cat-cow",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Rotação Torácica",
        "group": "Cardio/Mobilidade",
        "subLevel": "Mobilidade Torácica",
        "equip": "Peso Corporal",
        "nivel": 1,
        "agonist": "Mobilidade Geral",
        "antagonist": "Nenhum",
        "synergist": [],
        "resources": [],
        "muscleFocus": [
            "Mobilidade Torácica"
        ],
        "movementPattern": "Mobilidade Torácica",
        "id": "rotacao-toracica",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Testa com Halteres",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeça Longa)",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Antebraço"
        ],
        "resources": [
            "dumbbells",
            "bench"
        ],
        "muscleFocus": [
            "triceps-longa"
        ],
        "movementPattern": "extensao-cotovelo-acima",
        "id": "triceps-testa-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Francês no Cabo",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeça Longa)",
        "equip": "Cabo",
        "nivel": 2,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Antebraço"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "triceps-longa"
        ],
        "movementPattern": "extensao-cotovelo-acima",
        "id": "triceps-frances-no-cabo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Rosca Scott com Barra",
        "group": "Bíceps",
        "subLevel": "Bíceps Braquial",
        "equip": "Barra",
        "nivel": 1,
        "agonist": "Bíceps",
        "antagonist": "Tríceps",
        "synergist": [
            "Braquial",
            "Antebraço"
        ],
        "resources": [
            "barbell",
            "plates",
            "preacher-bench"
        ],
        "muscleFocus": [
            "biceps"
        ],
        "movementPattern": "flexao-cotovelo-supinada",
        "id": "rosca-scott-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Remada Alta com Barra",
        "group": "Ombros",
        "subLevel": "Deltoide Lateral",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Ombros",
        "antagonist": "Costas",
        "synergist": [
            "Trapézio",
            "Bíceps",
            "Braquial"
        ],
        "resources": [
            "barbell",
            "plates"
        ],
        "muscleFocus": [
            "deltoide-lateral"
        ],
        "movementPattern": "abducao-ombro",
        "id": "remada-alta-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Rosca Inversa com Barra",
        "group": "Bíceps",
        "subLevel": "Braquial / Antebraço",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Bíceps",
        "antagonist": "Tríceps",
        "synergist": [
            "Antebraço"
        ],
        "resources": [
            "barbell",
            "plates"
        ],
        "muscleFocus": [
            "braquial-antebraco"
        ],
        "movementPattern": "flexao-cotovelo-neutra-pronada",
        "id": "rosca-inversa-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Mergulho nas Paralelas",
        "group": "Tríceps",
        "subLevel": "Tríceps (Cabeças Longa, Lateral e Medial)",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Tríceps",
        "antagonist": "Bíceps",
        "synergist": [
            "Peitoral",
            "Ombro Anterior"
        ],
        "resources": [
            "parallel-bars"
        ],
        "muscleFocus": [
            "triceps-lateral-medial"
        ],
        "movementPattern": "mergulho",
        "id": "mergulho-nas-paralelas",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Russian Twist sem Carga",
        "group": "Core",
        "subLevel": "Oblíquos",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Reto Abdominal",
            "Flexores do Quadril"
        ],
        "resources": [],
        "muscleFocus": [
            "core-obliquos"
        ],
        "movementPattern": "rotacao-tronco",
        "id": "russian-twist-sem-carga",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Abdominal Supra com Halter",
        "group": "Core",
        "subLevel": "Reto Abdominal (flexão do tronco)",
        "equip": "Halter",
        "nivel": 1,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Flexores do Quadril",
            "Oblíquos"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "core-flexao"
        ],
        "movementPattern": "flexao-tronco",
        "id": "abdominal-supra-com-halter",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Prancha Isométrica Lateral",
        "group": "Core",
        "subLevel": "Oblíquos",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Core",
        "antagonist": "Lombar",
        "synergist": [
            "Ombros",
            "Glúteos",
            "Quadríceps"
        ],
        "resources": [],
        "muscleFocus": [
            "core-obliquos"
        ],
        "movementPattern": "anti-flexao-lateral",
        "id": "prancha-isometrica-lateral",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Barra Fixa Supinada (Chin-up)",
        "resources": [
            "pullup-bar"
        ],
        "group": "Costas",
        "subLevel": "Latíssimo do Dorso",
        "equip": "Peso Corporal",
        "nivel": 3,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior",
            "Braquial"
        ],
        "muscleFocus": [
            "costas-latissimo"
        ],
        "movementPattern": "puxar-vertical",
        "id": "barra-fixa-supinada-chin-up",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Barra Fixa com Apoio dos Pés",
        "resources": [
            "pullup-bar",
            "bench"
        ],
        "group": "Costas",
        "subLevel": "Latíssimo do Dorso",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior",
            "Braquial"
        ],
        "desc": "Use uma barra em altura compatível e um apoio firme para auxiliar a subida com os pés; não improvise ancoragens.",
        "muscleFocus": [
            "costas-latissimo"
        ],
        "movementPattern": "puxar-vertical",
        "id": "barra-fixa-com-apoio-dos-pes",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Agachamento Frontal com Barra",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Barra",
        "nivel": 2,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos",
            "Core",
            "Lombar"
        ],
        "resources": [
            "barbell",
            "plates",
            "rack"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "agachamento-frontal-com-barra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Leg Press Horizontal",
        "group": "Pernas",
        "subLevel": "Quadríceps (Vastos)",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos"
        ],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "leg-press-horizontal",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Panturrilha em Pé no Smith",
        "group": "Pernas",
        "subLevel": "Gastrocnêmios",
        "equip": "Máquina",
        "nivel": 1,
        "agonist": "Panturrilhas",
        "antagonist": "Tibial Anterior",
        "synergist": [],
        "resources": [
            "machine"
        ],
        "muscleFocus": [
            "gastrocnemios"
        ],
        "movementPattern": "flexao-plantar",
        "id": "panturrilha-em-pe-no-smith",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Puxada Alta Neutra",
        "group": "Costas",
        "subLevel": "Latíssimo do Dorso",
        "equip": "Cabo",
        "nivel": 1,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior",
            "Braquial"
        ],
        "resources": [
            "cable"
        ],
        "muscleFocus": [
            "costas-latissimo"
        ],
        "movementPattern": "puxar-vertical",
        "id": "puxada-alta-neutra",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Agachamento Búlgaro sem Carga",
        "group": "Pernas",
        "subLevel": "Quadríceps / Glúteos",
        "equip": "Peso Corporal",
        "nivel": 2,
        "agonist": "Quadríceps",
        "antagonist": "Isquiotibiais",
        "synergist": [
            "Glúteos",
            "Core"
        ],
        "resources": [
            "bench"
        ],
        "muscleFocus": [
            "quadriceps-vastos"
        ],
        "movementPattern": "agachar",
        "id": "agachamento-bulgaro-sem-carga",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Supino no Solo com Halteres",
        "group": "Peitoral",
        "agonist": "Peitoral",
        "subLevel": "Esternocostal",
        "equip": "Halter",
        "nivel": 2,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "empurrar-horizontal",
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "desc": "Execute no solo. A amplitude é limitada pelo apoio dos braços e difere do supino no banco.",
        "resources": [
            "dumbbells"
        ],
        "id": "supino-no-solo-com-halteres",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Ponte de Quadril Unilateral no Solo",
        "group": "Pernas",
        "agonist": "Glúteos",
        "subLevel": "Glúteo Máximo",
        "equip": "Peso Corporal",
        "nivel": 2,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "extensao-quadril",
        "muscleFocus": [
            "gluteo-maximo"
        ],
        "resources": [],
        "id": "ponte-de-quadril-unilateral-no-solo",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Flexão de Joelhos com Caminhada dos Calcanhares",
        "group": "Pernas",
        "agonist": "Isquiotibiais",
        "subLevel": "Isquiotibiais (flexão de joelho)",
        "equip": "Peso Corporal",
        "nivel": 2,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "flexao-joelho",
        "muscleFocus": [
            "isquiotibiais"
        ],
        "desc": "Partindo da ponte no solo, afaste e aproxime os calcanhares com passos curtos e quadril controlado. Regrida reduzindo o percurso.",
        "resources": [],
        "id": "flexao-de-joelhos-com-caminhada-dos-calcanhares",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "RDL Unilateral sem Carga",
        "group": "Pernas",
        "agonist": "Isquiotibiais",
        "subLevel": "Isquiotibiais (extensão de quadril)",
        "equip": "Peso Corporal",
        "nivel": 2,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "dobrar-quadril",
        "muscleFocus": [
            "isquiotibiais"
        ],
        "resources": [],
        "id": "rdl-unilateral-sem-carga",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Abdução de Quadril Deitado de Lado",
        "group": "Pernas",
        "agonist": "Glúteos (Abdutores)",
        "subLevel": "Glúteo Médio e Mínimo",
        "equip": "Peso Corporal",
        "nivel": 1,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "abducao-quadril",
        "muscleFocus": [
            "gluteos-abdutores"
        ],
        "resources": [],
        "id": "abducao-de-quadril-deitado-de-lado",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Adução de Quadril Deitado de Lado",
        "group": "Pernas",
        "agonist": "Adutores",
        "subLevel": "Músculos Adutores",
        "equip": "Peso Corporal",
        "nivel": 1,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "aducao-quadril",
        "muscleFocus": [
            "adutores"
        ],
        "resources": [],
        "id": "aducao-de-quadril-deitado-de-lado",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Elevação de Panturrilhas Sentado sem Carga",
        "group": "Pernas",
        "agonist": "Panturrilhas",
        "subLevel": "Sóleo",
        "equip": "Peso Corporal",
        "nivel": 1,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "flexao-plantar-joelho-flexionado",
        "muscleFocus": [
            "soleo"
        ],
        "resources": [
            "bench"
        ],
        "id": "elevacao-de-panturrilhas-sentado-sem-carga",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Elevação de Panturrilhas Sentado com Halteres",
        "group": "Pernas",
        "agonist": "Panturrilhas",
        "subLevel": "Sóleo",
        "equip": "Halter",
        "nivel": 1,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "flexao-plantar-joelho-flexionado",
        "muscleFocus": [
            "soleo"
        ],
        "resources": [
            "dumbbells",
            "bench"
        ],
        "id": "elevacao-de-panturrilhas-sentado-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Extensão Lombar no Solo",
        "group": "Costas",
        "agonist": "Lombar",
        "subLevel": "Eretores da Espinha",
        "equip": "Peso Corporal",
        "nivel": 1,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "extensao-tronco",
        "muscleFocus": [
            "eretores"
        ],
        "desc": "No solo, eleve o tronco em pequena amplitude controlada. Não force a hiperextensão.",
        "resources": [],
        "id": "extensao-lombar-no-solo",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Remada Invertida em Barra Baixa",
        "group": "Costas",
        "agonist": "Costas",
        "subLevel": "Espessura (Romboides)",
        "equip": "Peso Corporal",
        "nivel": 2,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "puxar-horizontal",
        "muscleFocus": [
            "costas-remada"
        ],
        "resources": [
            "low-bar"
        ],
        "desc": "Exige barra baixa fixa própria para suportar o corpo. Uma barra alta de puxadas não atende este requisito.",
        "id": "remada-invertida-em-barra-baixa",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Rosca com Halteres em Supinação",
        "group": "Bíceps",
        "agonist": "Bíceps",
        "subLevel": "Bíceps Braquial",
        "equip": "Halter",
        "nivel": 1,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "flexao-cotovelo-supinada",
        "muscleFocus": [
            "biceps"
        ],
        "resources": [
            "dumbbells"
        ],
        "id": "rosca-com-halteres-em-supinacao",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Tríceps Testa no Solo com Halteres",
        "group": "Tríceps",
        "agonist": "Tríceps",
        "subLevel": "Tríceps (Cabeça Longa)",
        "equip": "Halter",
        "nivel": 2,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "extensao-cotovelo-acima",
        "muscleFocus": [
            "triceps-longa"
        ],
        "resources": [
            "dumbbells"
        ],
        "id": "triceps-testa-no-solo-com-halteres",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "name": "Extensão de Tríceps com Peso Corporal na Parede",
        "group": "Tríceps",
        "agonist": "Tríceps",
        "subLevel": "Tríceps (Cabeça Longa)",
        "equip": "Peso Corporal",
        "nivel": 2,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "extensao-cotovelo-acima",
        "muscleFocus": [
            "triceps-longa"
        ],
        "desc": "Apoie as mãos em uma parede firme, flexione os cotovelos aproximando a testa e estenda-os sem mover o tronco; ajuste a distância para controlar a dificuldade.",
        "resources": [],
        "id": "extensao-de-triceps-com-peso-corporal-na-parede",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Flexão com Joelhos Apoiados",
        "group": "Peitoral",
        "agonist": "Peitoral",
        "subLevel": "Esternocostal",
        "equip": "Peso Corporal",
        "nivel": 1,
        "antagonist": "Nenhum",
        "synergist": [],
        "movementPattern": "empurrar-horizontal",
        "muscleFocus": [
            "peitoral-esternocostal"
        ],
        "resources": [],
        "id": "flexao-com-joelhos-apoiados",
        "desc": "Execute a variante indicada com controle e amplitude confortável. O foco muscular indica ênfase, não isolamento nem equivalência de carga entre ambientes.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 1,
            "casa": 1,
            "praia": 1
        }
    },
    {
        "name": "Remada Unilateral em Pé com Halter",
        "group": "Costas",
        "subLevel": "Espessura (Romboides/Latíssimo)",
        "equip": "Halter",
        "nivel": 2,
        "agonist": "Costas",
        "antagonist": "Peitoral",
        "synergist": [
            "Bíceps",
            "Ombro Posterior"
        ],
        "resources": [
            "dumbbells"
        ],
        "muscleFocus": [
            "costas-remada",
            "costas-latissimo"
        ],
        "movementPattern": "puxar-horizontal",
        "id": "remada-unilateral-em-pe-com-halter",
        "desc": "Em base alternada, incline o tronco e apoie a mão livre na própria coxa. Esta variante não exige banco.",
        "levelMeaning": "complexidade",
        "environmentPreference": {
            "academia": 2,
            "casa": 2,
            "praia": 1
        }
    },
    {
        "id": "rosca-corporal-em-barra-baixa",
        "name": "Rosca Corporal em Barra Baixa",
        "group": "Bíceps",
        "agonist": "Bíceps",
        "subLevel": "Bíceps Braquial",
        "equip": "Peso Corporal",
        "nivel": 2,
        "levelMeaning": "complexidade",
        "resources": ["low-bar"],
        "muscleFocus": ["biceps"],
        "movementPattern": "flexao-cotovelo-supinada",
        "antagonist": "Tríceps",
        "synergist": ["Antebraço", "Core"],
        "desc": "Use uma barra baixa fixa própria para suportar o corpo, com pegada supinada e pés no chão. Flexione os cotovelos aproximando a testa das mãos, mantendo os braços elevados; não transforme o movimento em remada. Ajuste a inclinação e mantenha controle.",
        "referenceUrl": "https://calisthenics.com/exercise/bodyweight-biceps-curl/",
        "environmentPreference": {"academia": 1, "casa": 1, "praia": 1}
    },
    {
        "id": "crucifixo-no-solo-com-halteres",
        "name": "Crucifixo no Solo com Halteres",
        "group": "Peitoral", "agonist": "Peitoral",
        "subLevel": "Esternocostal", "equip": "Halter", "nivel": 1,
        "levelMeaning": "complexidade", "resources": ["dumbbells"],
        "muscleFocus": ["peitoral-esternocostal"], "movementPattern": "aducao-horizontal",
        "antagonist": "Costas", "synergist": ["Deltoide Anterior"],
        "desc": "Deite no solo com os joelhos dobrados e um halter em cada mão. Com os cotovelos levemente flexionados, abra os braços até o limite confortável do chão e volte em arco. Não transforme em supino nem force amplitude abaixo do solo. Ajuste a carga para esta variante.",
        "referenceUrl": "https://www.puregym.com/exercises/chest/chest-fly/dumbbell-floor-fly/",
        "environmentPreference": {"academia": 1, "casa": 2, "praia": 1}
    },
    {
        "id": "crucifixo-invertido-curvado-em-pe-com-halteres",
        "name": "Crucifixo Invertido Curvado em Pé com Halteres",
        "group": "Ombros", "agonist": "Ombros",
        "subLevel": "Deltoide Posterior", "equip": "Halter", "nivel": 2,
        "levelMeaning": "complexidade", "resources": ["dumbbells"],
        "muscleFocus": ["deltoide-posterior"], "movementPattern": "abducao-horizontal",
        "antagonist": "Peitoral", "synergist": ["Romboides", "Trapézio"],
        "desc": "Em pé, dobre levemente os joelhos e incline o tronco pelo quadril, mantendo-o estável. Abra os braços com os cotovelos levemente flexionados e retorne com controle, sem fazer remada ou usar impulso. Esta execução não usa banco; ajuste a carga ao controle do tronco.",
        "referenceUrl": "https://www.puregym.com/blog/upper-body-workout-for-females/",
        "environmentPreference": {"academia": 1, "casa": 2, "praia": 1}
    },
    {
        "id": "rosca-inversa-com-halteres",
        "name": "Rosca Inversa com Halteres",
        "group": "Bíceps", "agonist": "Bíceps",
        "subLevel": "Braquial / Antebraço", "equip": "Halter", "nivel": 1,
        "levelMeaning": "complexidade", "resources": ["dumbbells"],
        "muscleFocus": ["braquial-antebraco"], "movementPattern": "flexao-cotovelo-neutra-pronada",
        "antagonist": "Tríceps", "synergist": ["Bíceps"],
        "desc": "Em pé, segure os halteres com as palmas voltadas para trás e mantenha os punhos alinhados. Flexione os cotovelos sem mover os braços junto ao tronco e retorne devagar, mantendo a pegada pronada. Ajuste a carga para não compensar com o tronco.",
        "referenceUrl": "https://musclewiki.com/pt-br/exercise/dumbbell-reverse-curl",
        "environmentPreference": {"academia": 1, "casa": 2, "praia": 1}
    },
    {
        "id": "remada-bilateral-curvada-com-halteres",
        "name": "Remada Bilateral Curvada com Halteres",
        "group": "Costas", "agonist": "Costas",
        "subLevel": "Espessura (Romboides)", "equip": "Halter", "nivel": 2,
        "levelMeaning": "complexidade", "resources": ["dumbbells"],
        "muscleFocus": ["costas-remada"], "movementPattern": "puxar-horizontal",
        "antagonist": "Peitoral", "synergist": ["Bíceps", "Deltoide Posterior"],
        "desc": "Com um halter em cada mão, incline o tronco pelo quadril e mantenha os joelhos levemente dobrados. Puxe os dois cotovelos para trás, levando os halteres em direção ao tronco, e desça com controle. Mantenha o tronco estável. Não exige banco e não substitui uma puxada vertical.",
        "referenceUrl": "https://www.cityofmadison.com/fire/documents/frf-intro-to-firefighter-fitness.pdf",
        "environmentPreference": {"academia": 1, "casa": 2, "praia": 1}
    },
    {
        "id": "panturrilha-em-pe-joelhos-flexionados-com-apoio",
        "name": "Panturrilha em Pé com Joelhos Flexionados e Apoio",
        "group": "Pernas", "agonist": "Panturrilhas",
        "subLevel": "Sóleo", "equip": "Peso Corporal", "nivel": 1,
        "levelMeaning": "complexidade", "resources": ["balance-support"],
        "muscleFocus": ["soleo"], "movementPattern": "flexao-plantar-joelho-flexionado",
        "antagonist": "Tibial Anterior", "synergist": [],
        "desc": "Em pé, use uma parede ou apoio firme para o equilíbrio e mantenha os joelhos flexionados. Eleve os calcanhares e abaixe com controle, sem estender os joelhos durante as repetições. O apoio precisa estar disponível no local. A ênfase no sóleo não implica isolamento nem a mesma resistência da máquina sentada.",
        "referenceUrl": "https://elht.nhs.uk/download_file/view/18069/4570",
        "environmentPreference": {"academia": 1, "casa": 1, "praia": 1, "parque": 1}
    },
    {
        "id": "rosca-corporal-sentada-resistencia-da-perna",
        "name": "Rosca Corporal Sentada com Resistência da Perna",
        "group": "Bíceps", "agonist": "Bíceps",
        "subLevel": "Bíceps Braquial", "equip": "Peso Corporal", "nivel": 2,
        "levelMeaning": "complexidade", "resources": ["bench"],
        "muscleFocus": ["biceps"], "movementPattern": "flexao-cotovelo-supinada",
        "antagonist": "Tríceps", "synergist": ["Antebraço"],
        "desc": "Sente em um banco firme. Apoie o cotovelo em um joelho e coloque a mão com a palma para cima sob a outra perna estendida. Flexione o cotovelo usando essa perna como resistência e retorne com controle; repita do outro lado. Regule a resistência sem impulsionar a perna. Não há equivalência de carga em quilos com uma rosca com halteres.",
        "referenceUrl": "https://musclewiki.com/de-de/exercise/bodyweight-concentration-curl",
        "environmentPreference": {"academia": 1, "casa": 1, "praia": 1, "parque": 1}
    }
];

window.stickersDB = [
    {
        "id": 1,
        "name": "Halter de Ferro",
        "rarity": "comum",
        "icon": "🏋️",
        "page": 1
    },
    {
        "id": 2,
        "name": "Anilha 20kg",
        "rarity": "comum",
        "icon": "💿",
        "page": 1
    },
    {
        "id": 3,
        "name": "Kettlebell",
        "rarity": "comum",
        "icon": "💣",
        "page": 1
    },
    {
        "id": 4,
        "name": "Barra Olímpica",
        "rarity": "comum",
        "icon": "📏",
        "page": 1
    },
    {
        "id": 5,
        "name": "Banco Reto",
        "rarity": "comum",
        "icon": "💺",
        "page": 1
    },
    {
        "id": 6,
        "name": "Corda de Pular",
        "rarity": "comum",
        "icon": "➰",
        "page": 1
    },
    {
        "id": 7,
        "name": "Leg Press 45",
        "rarity": "prata",
        "icon": "🦵",
        "page": 2
    },
    {
        "id": 8,
        "name": "Crossover",
        "rarity": "prata",
        "icon": "✖️",
        "page": 2
    },
    {
        "id": 9,
        "name": "Hack Machine",
        "rarity": "comum",
        "icon": "🏗️",
        "page": 2
    },
    {
        "id": 10,
        "name": "Mesa Flexora",
        "rarity": "comum",
        "icon": "🛏️",
        "page": 2
    },
    {
        "id": 11,
        "name": "Extensora",
        "rarity": "comum",
        "icon": "🪑",
        "page": 2
    },
    {
        "id": 12,
        "name": "Smith Machine",
        "rarity": "prata",
        "icon": "⛓️",
        "page": 2
    },
    {
        "id": 13,
        "name": "Supino Reto",
        "rarity": "ouro",
        "icon": "🔥",
        "page": 3
    },
    {
        "id": 14,
        "name": "Agachamento",
        "rarity": "ouro",
        "icon": "🍑",
        "page": 3
    },
    {
        "id": 15,
        "name": "Terra (Deadlift)",
        "rarity": "ouro",
        "icon": "💀",
        "page": 3
    },
    {
        "id": 16,
        "name": "Barra Fixa",
        "rarity": "prata",
        "icon": "🦍",
        "page": 3
    },
    {
        "id": 17,
        "name": "Desenvolvimento",
        "rarity": "prata",
        "icon": "🛡️",
        "page": 3
    },
    {
        "id": 18,
        "name": "Remada Curvada",
        "rarity": "prata",
        "icon": "🚣",
        "page": 3
    },
    {
        "id": 19,
        "name": "Mestre da Disciplina",
        "rarity": "holografico",
        "icon": "👑",
        "page": 4
    },
    {
        "id": 20,
        "name": "Força Bruta",
        "rarity": "holografico",
        "icon": "🦾",
        "page": 4
    },
    {
        "id": 21,
        "name": "Resistência Base",
        "rarity": "holografico",
        "icon": "🔋",
        "page": 4
    },
    {
        "id": 22,
        "name": "Simetria Perfeita",
        "rarity": "holografico",
        "icon": "📐",
        "page": 4
    },
    {
        "id": 23,
        "name": "Foco Inabalável",
        "rarity": "holografico",
        "icon": "👁️",
        "page": 4
    },
    {
        "id": 24,
        "name": "O Titã",
        "rarity": "holografico",
        "icon": "🏆",
        "page": 4
    }
];

window.dbWorkouts = {
    "biset": {
        "iniciante": {
            "A": [
                {
                    "title": "Bloco 1 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Supino Reto na Máquina","sets":4,"target":"12-15 rep"},
                        {"name":"Tríceps Pulley (Barra Reta/V)","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Voador (Peck Deck)","sets":4,"target":"12-15 rep"},
                        {"name":"Tríceps Corda no Cabo","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Flexão de Braço (Padrão)","sets":4,"target":"Até Falha"},
                        {"name":"Tríceps Máquina / Dip Machine","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Supino Reto com Halteres","sets":4,"target":"12-15 rep"},
                        {"name":"Tríceps Testa com Barra W","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Supra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Puxada Alta (Pegada Aberta)","sets":4,"target":"12-15 rep"},
                        {"name":"Rosca Direta com Barra","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Remada Máquina Apoiada no Peito","sets":4,"target":"12-15 rep"},
                        {"name":"Rosca Scott na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Pulldown no Cabo (Braços Estendidos)","sets":4,"target":"12-15 rep"},
                        {"name":"Rosca Alternada com Halteres","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Costas + Lombar)",
                    "exercises": [
                        {"name":"Remada Baixa no Cabo (Triângulo)","sets":4,"target":"12-15 rep"},
                        {"name":"Extensão Lombar (Banco Romano)","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Infra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Bi-set: Pernas + Ombros)",
                    "exercises": [
                        {"name":"Leg Press 45º","sets":4,"target":"12-15 rep"},
                        {"name":"Desenvolvimento na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Pernas + Ombros)",
                    "exercises": [
                        {"name":"Cadeira Extensora","sets":4,"target":"12-15 rep"},
                        {"name":"Elevação Lateral com Halteres","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Adutores + Abdutores)",
                    "exercises": [
                        {"name":"Cadeira Adutora","sets":4,"target":"12-15 rep"},
                        {"name":"Cadeira Abdutora","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Panturrilhas)",
                    "exercises": [
                        {"name":"Panturrilha no Leg Press","sets":4,"target":"15-20 rep"},
                        {"name":"Panturrilha Sentado (Máquina)","sets":4,"target":"15-20 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"30 seg"}
                    ]
                }
            ]
        },
        "intermediario": {
            "A": [
                {
                    "title": "Bloco 1 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Supino Reto com Halteres","sets":4,"target":"10-12 rep"},
                        {"name":"Tríceps Testa com Barra W","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Supino Inclinado com Halteres","sets":4,"target":"10-12 rep"},
                        {"name":"Tríceps Francês com Halter","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Crossover Polia Média","sets":4,"target":"10-12 rep"},
                        {"name":"Tríceps Coice (Kickback)","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Supino Declinado com Halteres","sets":4,"target":"10-12 rep"},
                        {"name":"Tríceps Corda no Cabo","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Bicicleta","sets":3,"target":"20 rep/lado"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Puxada Alta Supinada","sets":4,"target":"10-12 rep"},
                        {"name":"Rosca Direta com Barra","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Remada Unilateral (Serrote)","sets":4,"target":"10-12 rep"},
                        {"name":"Rosca Martelo com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Pulldown no Cabo (Braços Estendidos)","sets":4,"target":"10-12 rep"},
                        {"name":"Rosca Alternada com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Remada Baixa no Cabo (Triângulo)","sets":4,"target":"10-12 rep"},
                        {"name":"Rosca Inversa no Cabo","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Russian Twist com Halter","sets":3,"target":"15 rep/lado"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Bi-set: Pernas + Ombros)",
                    "exercises": [
                        {"name":"Agachamento no Smith","sets":4,"target":"10-12 rep"},
                        {"name":"Desenvolvimento com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Pernas + Ombros)",
                    "exercises": [
                        {"name":"Leg Press 45º","sets":4,"target":"10-12 rep"},
                        {"name":"Elevação Lateral com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Glúteos + Ombros)",
                    "exercises": [
                        {"name":"Elevação Pélvica com Barra","sets":4,"target":"10-12 rep"},
                        {"name":"Elevação Frontal com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Posteriores + Trapézio)",
                    "exercises": [
                        {"name":"Mesa Flexora (Deitado)","sets":4,"target":"10-12 rep"},
                        {"name":"Crucifixo Invertido com Halteres","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"30 seg/lado"}
                    ]
                }
            ]
        },
        "avancado": {
            "A": [
                {
                    "title": "Bloco 1 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Supino Reto com Barra","sets":4,"target":"8-10 rep"},
                        {
                            "name": "Mergulho no Banco",
                            "resources": [
                                "bench"
                            ],
                            "sets": 4,
                            "target": "Até Falha"
                        }
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Supino Inclinado com Barra","sets":4,"target":"8-10 rep"},
                        {"name":"Tríceps Francês com Halter","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Crossover Polia Baixa","sets":4,"target":"10-12 rep"},
                        {
                            "name": "Flexão Inclinada (Mãos no banco)",
                            "resources": [
                                "bench"
                            ],
                            "sets": 4,
                            "target": "Até Falha"
                        }
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Peito + Tríceps)",
                    "exercises": [
                        {"name":"Crucifixo Reto com Halteres","sets":4,"target":"10-12 rep"},
                        {"name":"Tríceps Corda no Cabo","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Infra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {
                            "name": "Barra Fixa Pronada (Pull-up)",
                            "resources": [
                                "pullup-bar"
                            ],
                            "sets": 4,
                            "target": "Até Falha"
                        },
                        {"name":"Rosca no Cabo (Polia Baixa)","sets":4,"target":"15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Remada Curvada com Barra","sets":4,"target":"8-10 rep"},
                        {"name":"Rosca Scott na Máquina","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Puxada Alta (Pegada Aberta)","sets":4,"target":"10-12 rep"},
                        {"name":"Rosca Direta com Barra","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Costas + Bíceps)",
                    "exercises": [
                        {"name":"Remada Cavalinho (T-Bar)","sets":4,"target":"10-12 rep"},
                        {"name":"Rosca Alternada com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Russian Twist com Halter","sets":3,"target":"45 seg"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Bi-set: Pernas + Ombros)",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":5,"target":"6-8 rep"},
                        {"name":"Desenvolvimento Militar com Barra","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Pernas + Ombros)",
                    "exercises": [
                        {"name":"Agachamento Búlgaro com Halteres","sets":4,"target":"8-10 rep/lado"},
                        {"name":"Desenvolvimento com Halteres","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Pernas + Ombros)",
                    "exercises": [
                        {"name":"RDL com Barra","sets":4,"target":"8-10 rep"},
                        {"name":"Remada Alta no Cabo","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bi-set: Panturrilhas)",
                    "exercises": [
                        {"name":"Panturrilha em Pé na Máquina","sets":4,"target":"15-20 rep"},
                        {"name":"Panturrilha Sentado (Máquina)","sets":4,"target":"15-20 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Supra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ]
        }
    },
    "tradicional": {
        "iniciante": {
            "A": [
                {
                    "title": "Bloco 1 (Peitoral)",
                    "exercises": [
                        {"name":"Supino Reto na Máquina","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Peitoral)",
                    "exercises": [
                        {"name":"Voador (Peck Deck)","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Tríceps)",
                    "exercises": [
                        {"name":"Tríceps Pulley (Barra Reta/V)","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Tríceps)",
                    "exercises": [
                        {"name":"Tríceps Máquina / Dip Machine","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal na Máquina","sets":3,"target":"15-20 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Dorsais)",
                    "exercises": [
                        {"name":"Puxada Alta na Máquina","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Dorsais)",
                    "exercises": [
                        {"name":"Remada Máquina Apoiada no Peito","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bíceps)",
                    "exercises": [
                        {"name":"Rosca Direta com Barra","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bíceps)",
                    "exercises": [
                        {"name":"Rosca Scott na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Infra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Quadríceps)",
                    "exercises": [
                        {"name":"Leg Press 45º","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Posteriores)",
                    "exercises": [
                        {"name":"Cadeira Extensora","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Ombros)",
                    "exercises": [
                        {"name":"Desenvolvimento na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Panturrilha)",
                    "exercises": [
                        {"name":"Panturrilha no Leg Press","sets":4,"target":"15-20 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"30 seg"}
                    ]
                }
            ]
        },
        "intermediario": {
            "A": [
                {
                    "title": "Bloco 1 (Peitoral)",
                    "exercises": [
                        {"name":"Supino Reto com Halteres","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Peitoral)",
                    "exercises": [
                        {"name":"Supino Inclinado com Halteres","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Tríceps)",
                    "exercises": [
                        {"name":"Tríceps Testa com Barra W","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Tríceps)",
                    "exercises": [
                        {"name":"Tríceps Pulley (Barra Reta/V)","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Supra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Dorsais)",
                    "exercises": [
                        {"name":"Puxada Alta Supinada","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Dorsais)",
                    "exercises": [
                        {"name":"Remada Baixa no Cabo (Triângulo)","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bíceps)",
                    "exercises": [
                        {"name":"Rosca Direta com Barra","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bíceps)",
                    "exercises": [
                        {"name":"Rosca Martelo com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Russian Twist com Halter","sets":3,"target":"15 rep/lado"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Quadríceps)",
                    "exercises": [
                        {"name":"Agachamento no Smith","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Posteriores)",
                    "exercises": [
                        {"name":"Mesa Flexora (Deitado)","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Ombros)",
                    "exercises": [
                        {"name":"Desenvolvimento com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Ombros)",
                    "exercises": [
                        {"name":"Elevação Lateral com Halteres","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Bicicleta","sets":3,"target":"15 rep/lado"}
                    ]
                }
            ]
        },
        "avancado": {
            "A": [
                {
                    "title": "Bloco 1 (Peitoral)",
                    "exercises": [
                        {"name":"Supino Reto com Barra","sets":5,"target":"6-8 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Peitoral)",
                    "exercises": [
                        {"name":"Crucifixo Reto com Halteres","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Tríceps)",
                    "exercises": [
                        {
                            "name": "Mergulho no Banco",
                            "resources": [
                                "bench"
                            ],
                            "sets": 4,
                            "target": "Até Falha"
                        }
                    ]
                },
                {
                    "title": "Bloco 4 (Tríceps)",
                    "exercises": [
                        {"name":"Tríceps Francês com Halter","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Abdominal Infra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Dorsais)",
                    "exercises": [
                        {
                            "name": "Barra Fixa Pronada (Pull-up)",
                            "resources": [
                                "pullup-bar"
                            ],
                            "sets": 4,
                            "target": "Até Falha"
                        }
                    ]
                },
                {
                    "title": "Bloco 2 (Dorsais)",
                    "exercises": [
                        {"name":"Remada Curvada com Barra","sets":4,"target":"6-8 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bíceps)",
                    "exercises": [
                        {"name":"Rosca Alternada com Halteres","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Bíceps)",
                    "exercises": [
                        {"name":"Rosca Direta com Barra","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Russian Twist com Halter","sets":3,"target":"12-15 rep"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Pernas)",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":5,"target":"6-8 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Pernas)",
                    "exercises": [
                        {"name":"RDL com Barra","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Ombros)",
                    "exercises": [
                        {"name":"Desenvolvimento Militar com Barra","sets":4,"target":"6-8 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Ombros)",
                    "exercises": [
                        {"name":"Crucifixo Invertido com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 5 (Core)",
                    "exercises": [
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"1 min"}
                    ]
                }
            ]
        }
    }
};

window.dbWorkoutsFeminino = {
    "biset": {
        "iniciante": {
            "A": [
                {
                    "title": "Bloco 1 (Bi-set: Glúteos + Posteriores)",
                    "exercises": [
                        {"name":"Elevação Pélvica na Máquina","sets":4,"target":"12-15 rep"},
                        {"name":"Mesa Flexora (Deitado)","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Glúteos + Posteriores)",
                    "exercises": [
                        {"name":"RDL com Halteres","sets":4,"target":"12-15 rep"},
                        {"name":"Cadeira Abdutora","sets":4,"target":"15-20 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Isolado)",
                    "exercises": [
                        {"name":"Agachamento Búlgaro sem Carga","sets":3,"target":"10-12 rep/lado"}
                    ]
                },
                {
                    "title": "Bloco 4 (Core)",
                    "exercises": [
                        {"name":"Abdominal na Máquina","sets":3,"target":"15-20 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Bi-set: Costas + Peito)",
                    "exercises": [
                        {"name":"Puxada Alta na Máquina","sets":4,"target":"12-15 rep"},
                        {"name":"Supino Reto na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Ombros + Tríceps)",
                    "exercises": [
                        {"name":"Desenvolvimento na Máquina","sets":4,"target":"12-15 rep"},
                        {"name":"Tríceps Pulley (Barra Reta/V)","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Bi-set: Bíceps + Core)",
                    "exercises": [
                        {"name":"Rosca Scott na Máquina","sets":3,"target":"12-15 rep"},
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"30 seg"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Bi-set: Quadríceps)",
                    "exercises": [
                        {"name":"Leg Press 45º","sets":4,"target":"12-15 rep"},
                        {"name":"Cadeira Extensora","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Adutores + Panturrilha)",
                    "exercises": [
                        {"name":"Cadeira Adutora","sets":4,"target":"15-20 rep"},
                        {"name":"Panturrilha no Leg Press","sets":4,"target":"15-20 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Core)",
                    "exercises": [
                        {"name":"Abdominal Supra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ]
        },
        "intermediario": {
            "A": [
                {
                    "title": "Bloco 1 (Bi-set: Glúteos + Posteriores)",
                    "exercises": [
                        {"name":"Elevação Pélvica com Barra","sets":4,"target":"10-12 rep"},
                        {"name":"RDL com Barra","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Glúteos + Posteriores)",
                    "exercises": [
                        {"name":"Agachamento Búlgaro com Halteres","sets":4,"target":"10-12 rep/lado"},
                        {"name":"Mesa Flexora (Deitado)","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Isoladores)",
                    "exercises": [
                        {"name":"Cadeira Abdutora","sets":4,"target":"12-15 rep"},
                        {"name":"Abdominal Bicicleta","sets":3,"target":"20 rep/lado"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Bi-set: Costas + Peito)",
                    "exercises": [
                        {"name":"Puxada Alta Supinada","sets":4,"target":"10-12 rep"},
                        {"name":"Supino Inclinado com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Ombros + Tríceps)",
                    "exercises": [
                        {"name":"Desenvolvimento com Halteres","sets":4,"target":"10-12 rep"},
                        {"name":"Tríceps Corda no Cabo","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Isoladores)",
                    "exercises": [
                        {"name":"Elevação Lateral com Halteres","sets":4,"target":"12-15 rep"},
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"30 seg/lado"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Bi-set: Quadríceps)",
                    "exercises": [
                        {"name":"Agachamento no Smith","sets":4,"target":"10-12 rep"},
                        {"name":"Leg Press 45º","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Quadríceps + Panturrilha)",
                    "exercises": [
                        {"name":"Cadeira Extensora","sets":4,"target":"10-12 rep"},
                        {"name":"Panturrilha Sentado (Máquina)","sets":4,"target":"15-20 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Core)",
                    "exercises": [
                        {"name":"Russian Twist com Halter","sets":3,"target":"15 rep/lado"}
                    ]
                }
            ]
        },
        "avancado": {
            "A": [
                {
                    "title": "Bloco 1 (Bi-set: Glúteos + Posteriores)",
                    "exercises": [
                        {"name":"Elevação Pélvica com Barra","sets":5,"target":"8-10 rep"},
                        {"name":"RDL com Barra","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Unilaterais)",
                    "exercises": [
                        {"name":"Agachamento Búlgaro com Halteres","sets":4,"target":"8-10 rep/lado"},
                        {"name":"Cadeira Abdutora","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Isolador)",
                    "exercises": [
                        {"name":"Mesa Flexora (Deitado)","sets":4,"target":"10-12 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Bi-set: Costas + Peito)",
                    "exercises": [
                        {
                            "name": "Barra Fixa Pronada (Pull-up)",
                            "resources": [
                                "pullup-bar"
                            ],
                            "sets": 4,
                            "target": "Até Falha"
                        },
                        {"name":"Supino Reto com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Ombros + Tríceps)",
                    "exercises": [
                        {"name":"Desenvolvimento Militar com Barra","sets":4,"target":"8-10 rep"},
                        {"name":"Tríceps Testa com Barra W","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Isoladores)",
                    "exercises": [
                        {"name":"Elevação Lateral no Cabo","sets":4,"target":"10-12 rep"},
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"45 seg"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Bi-set: Quadríceps)",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":5,"target":"8-10 rep"},
                        {"name":"Leg Press 45º","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Bi-set: Extensão + Panturrilha)",
                    "exercises": [
                        {"name":"Cadeira Extensora","sets":4,"target":"10-12 rep"},
                        {"name":"Panturrilha no Leg Press","sets":4,"target":"15-20 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Core)",
                    "exercises": [
                        {"name":"Abdominal Infra no Solo","sets":3,"target":"15-20 rep"}
                    ]
                }
            ]
        }
    },
    "tradicional": {
        "iniciante": {
            "A": [
                {
                    "title": "Bloco 1 (Glúteos)",
                    "exercises": [
                        {"name":"Elevação Pélvica na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Posteriores)",
                    "exercises": [
                        {"name":"Mesa Flexora (Deitado)","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Isolador)",
                    "exercises": [
                        {"name":"Cadeira Abdutora","sets":4,"target":"15-20 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Costas)",
                    "exercises": [
                        {"name":"Puxada Alta na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Peito)",
                    "exercises": [
                        {"name":"Supino Reto na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Ombros)",
                    "exercises": [
                        {"name":"Desenvolvimento na Máquina","sets":4,"target":"12-15 rep"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Quadríceps)",
                    "exercises": [
                        {"name":"Leg Press 45º","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Quadríceps)",
                    "exercises": [
                        {"name":"Cadeira Extensora","sets":4,"target":"12-15 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Panturrilha)",
                    "exercises": [
                        {"name":"Panturrilha Sentado (Máquina)","sets":4,"target":"15-20 rep"}
                    ]
                }
            ]
        },
        "intermediario": {
            "A": [
                {
                    "title": "Bloco 1 (Glúteos)",
                    "exercises": [
                        {"name":"Elevação Pélvica com Barra","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Posteriores)",
                    "exercises": [
                        {"name":"RDL com Barra","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Isolador)",
                    "exercises": [
                        {"name":"Agachamento Búlgaro com Halteres","sets":4,"target":"10-12 rep/lado"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Costas)",
                    "exercises": [
                        {"name":"Puxada Alta Supinada","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Ombros)",
                    "exercises": [
                        {"name":"Desenvolvimento com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Tríceps)",
                    "exercises": [
                        {"name":"Tríceps Corda no Cabo","sets":4,"target":"10-12 rep"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Quadríceps)",
                    "exercises": [
                        {"name":"Agachamento no Smith","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Quadríceps)",
                    "exercises": [
                        {"name":"Leg Press 45º","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Panturrilha)",
                    "exercises": [
                        {"name":"Panturrilha no Leg Press","sets":4,"target":"15-20 rep"}
                    ]
                }
            ]
        },
        "avancado": {
            "A": [
                {
                    "title": "Bloco 1 (Glúteos)",
                    "exercises": [
                        {"name":"Elevação Pélvica com Barra","sets":5,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Posteriores)",
                    "exercises": [
                        {"name":"RDL com Halteres","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Isolador)",
                    "exercises": [
                        {"name":"Agachamento Búlgaro com Halteres","sets":4,"target":"8-10 rep/lado"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Costas)",
                    "exercises": [
                        {
                            "name": "Barra Fixa Pronada (Pull-up)",
                            "resources": [
                                "pullup-bar"
                            ],
                            "sets": 4,
                            "target": "Até Falha"
                        }
                    ]
                },
                {
                    "title": "Bloco 2 (Ombros)",
                    "exercises": [
                        {"name":"Desenvolvimento Militar com Barra","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Peito)",
                    "exercises": [
                        {"name":"Supino Reto com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Quadríceps)",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":5,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Quadríceps)",
                    "exercises": [
                        {"name":"Leg Press 45º","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Core)",
                    "exercises": [
                        {"name":"Abdominal Bicicleta","sets":4,"target":"15-20 rep"}
                    ]
                }
            ]
        }
    }
};

window.dbWorkoutsTatico = {
    "biset": {
        "iniciante": {
            "A": [
                {
                    "title": "Bloco 1 (Mobilidade e Prevenção)",
                    "exercises": [
                        {"name":"Maior Alongamento do Mundo","sets":2,"target":"10 rep/lado"},
                        {"name":"Gato-Vaca (Cat-Cow)","sets":2,"target":"10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Força Base Pernas)",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":4,"target":"12-15 rep"},
                        {"name":"Afundo / Avanço","sets":4,"target":"10 rep/lado"}
                    ]
                },
                {
                    "title": "Bloco 3 (Core Anti-Rotação)",
                    "exercises": [
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"30 seg"},
                        {"name":"Abdominal Supra no Solo","sets":3,"target":"20 rep"}
                    ]
                },
                {
                    "title": "Bloco 4 (Motor Cardio)",
                    "exercises": [
                        {"name":"Polichinelos (Jumping Jacks)","sets":3,"target":"45 seg"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Mobilidade Superior)",
                    "exercises": [
                        {"name":"Rotação Torácica","sets":2,"target":"10 rep/lado"},
                        {"name":"Gato-Vaca (Cat-Cow)","sets":2,"target":"10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Tração e Empurre)",
                    "exercises": [
                        {"name":"Puxada Alta na Máquina","sets":4,"target":"12-15 rep"},
                        {"name":"Flexão de Braço (Padrão)","sets":4,"target":"Máx"}
                    ]
                },
                {
                    "title": "Bloco 3 (Core de Combate)",
                    "exercises": [
                        {"name":"Abdominal Supra no Solo","sets":3,"target":"20 rep"},
                        {"name":"Escalador (Mountain Climber)","sets":3,"target":"30 seg"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Força Unilateral)",
                    "exercises": [
                        {"name":"Agachamento Búlgaro sem Carga","sets":3,"target":"10 rep/lado"},
                        {"name":"Elevação Pélvica com Barra","sets":3,"target":"15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Estabilidade Articular)",
                    "exercises": [
                        {"name":"Cadeira Adutora","sets":3,"target":"15-20 rep"},
                        {"name":"Cadeira Abdutora","sets":3,"target":"15-20 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Tiros de Aceleração)",
                    "exercises": [
                        {"name":"Escalador (Mountain Climber)","sets":3,"target":"10 rep"},
                        {"name":"Polichinelos (Jumping Jacks)","sets":3,"target":"45 seg"}
                    ]
                }
            ]
        },
        "intermediario": {
            "A": [
                {
                    "title": "Bloco 1 (Mobilidade)",
                    "exercises": [
                        {"name":"Maior Alongamento do Mundo","sets":2,"target":"10 rep/lado"},
                        {"name":"Rotação Torácica","sets":2,"target":"10 rep/lado"}
                    ]
                },
                {
                    "title": "Bloco 2 (Potência e Pliometria)",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":4,"target":"12-15 rep"},
                        {"name":"Afundo / Avanço","sets":4,"target":"12 rep/lado"}
                    ]
                },
                {
                    "title": "Bloco 3 (Core Dinâmico)",
                    "exercises": [
                        {"name":"Russian Twist com Halter","sets":3,"target":"20 rep"},
                        {"name":"Prancha Isométrica Frontal","sets":3,"target":"30 seg/lado"}
                    ]
                },
                {
                    "title": "Bloco 4 (Resistência Anaeróbica)",
                    "exercises": [
                        {"name":"Polichinelos (Jumping Jacks)","sets":4,"target":"40 seg"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Postura e Blindagem)",
                    "exercises": [
                        {"name":"Remada Curvada com Barra","sets":4,"target":"10-12 rep"},
                        {"name":"Supino Reto com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Ombros de Contato)",
                    "exercises": [
                        {"name":"Desenvolvimento Militar com Barra","sets":4,"target":"10-12 rep"},
                        {"name":"Elevação Lateral com Halteres","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Resistência de Core)",
                    "exercises": [
                        {"name":"Abdominal Bicicleta","sets":3,"target":"30 rep"},
                        {"name":"Burpees","sets":3,"target":"45 seg"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Cadeia Posterior Especial)",
                    "exercises": [
                        {"name":"RDL com Barra","sets":4,"target":"10-12 rep"},
                        {"name":"Agachamento Búlgaro com Halteres","sets":4,"target":"10-12 rep/lado"}
                    ]
                },
                {
                    "title": "Bloco 2 (Frenagem e Tornozelo)",
                    "exercises": [
                        {"name":"Panturrilha no Leg Press","sets":4,"target":"20 rep"},
                        {"name":"Panturrilha em Pé na Máquina","sets":4,"target":"15 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Cardio de Alta Intensidade)",
                    "exercises": [
                        {"name":"Burpees","sets":4,"target":"15 rep"},
                        {"name":"Escalador (Mountain Climber)","sets":4,"target":"45 seg"}
                    ]
                }
            ]
        },
        "avancado": {
            "A": [
                {
                    "title": "Bloco 1 (Força Explosiva Pura)",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":4,"target":"6-8 rep"},
                        {"name":"Polichinelos (Jumping Jacks)","sets":4,"target":"15 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Absorção de Impacto)",
                    "exercises": [
                        {"name":"Afundo com Halteres","sets":4,"target":"Máx/lado"},
                        {"name":"Afundo / Avanço","sets":4,"target":"15 rep/lado"}
                    ]
                },
                {
                    "title": "Bloco 3 (Core Rígido)",
                    "exercises": [
                        {"name":"Abdominal Infra no Solo","sets":4,"target":"15 rep"},
                        {"name":"Prancha Isométrica Frontal","sets":4,"target":"1 min"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Bloco 1 (Força de Tração)",
                    "exercises": [
                        {
                            "name": "Barra Fixa Pronada (Pull-up)",
                            "resources": [
                                "pullup-bar"
                            ],
                            "sets": 4,
                            "target": "Até Falha"
                        },
                        {"name":"Remada Cavalinho (T-Bar)","sets":4,"target":"8-10 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Empurre Explosivo)",
                    "exercises": [
                        {"name":"Supino Reto com Barra","sets":4,"target":"8-10 rep"},
                        {
                            "name": "Flexão Inclinada (Mãos no banco)",
                            "resources": [
                                "bench"
                            ],
                            "sets": 4,
                            "target": "Falha (Explosiva)"
                        }
                    ]
                },
                {
                    "title": "Bloco 3 (Tiros Curtos)",
                    "exercises": [
                        {"name":"Burpees","sets":4,"target":"20 rep"},
                        {"name":"Escalador (Mountain Climber)","sets":4,"target":"1 min"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Bloco 1 (Arrancada Posterior)",
                    "exercises": [
                        {"name":"RDL com Barra","sets":5,"target":"8-10 rep"},
                        {"name":"Elevação Pélvica com Barra","sets":4,"target":"10-12 rep"}
                    ]
                },
                {
                    "title": "Bloco 2 (Blindagem de Tornozelo)",
                    "exercises": [
                        {"name":"Panturrilha em Pé na Máquina","sets":4,"target":"Falha"},
                        {"name":"Panturrilha Sentado (Máquina)","sets":4,"target":"20 rep"}
                    ]
                },
                {
                    "title": "Bloco 3 (Condicionamento Tático)",
                    "exercises": [
                        {"name":"Burpees","sets":4,"target":"1 min"},
                        {"name":"Escalador (Mountain Climber)","sets":4,"target":"1 min"}
                    ]
                }
            ]
        }
    },
    "tradicional": {
        "iniciante": {
            "A": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":4,"target":"15 rep"},
                        {"name":"Afundo / Avanço","sets":4,"target":"12 rep"},
                        {"name":"Prancha Isométrica Frontal","sets":4,"target":"45 seg"},
                        {"name":"Polichinelos (Jumping Jacks)","sets":4,"target":"1 min"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"Flexão de Braço (Padrão)","sets":4,"target":"Falha"},
                        {"name":"Puxada Alta na Máquina","sets":4,"target":"12-15 rep"},
                        {"name":"Abdominal Supra no Solo","sets":4,"target":"20 rep"},
                        {"name":"Escalador (Mountain Climber)","sets":4,"target":"45 seg"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"Agachamento Búlgaro sem Carga","sets":4,"target":"10 rep"},
                        {"name":"RDL com Barra","sets":4,"target":"15 rep"},
                        {"name":"Cadeira Adutora","sets":4,"target":"20 rep"},
                        {"name":"Escalador (Mountain Climber)","sets":4,"target":"10 rep"}
                    ]
                }
            ]
        },
        "intermediario": {
            "A": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":4,"target":"20 rep"},
                        {"name":"Afundo / Avanço","sets":4,"target":"15 rep/lado"},
                        {"name":"Russian Twist com Halter","sets":4,"target":"20 rep"},
                        {"name":"Polichinelos (Jumping Jacks)","sets":4,"target":"45 seg"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"Supino Reto com Halteres","sets":4,"target":"10-12 rep"},
                        {"name":"Remada Curvada com Barra","sets":4,"target":"10-12 rep"},
                        {"name":"Abdominal Bicicleta","sets":4,"target":"30 rep"},
                        {"name":"Burpees","sets":4,"target":"1 min"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"Agachamento Búlgaro com Halteres","sets":4,"target":"12 rep/lado"},
                        {"name":"RDL com Barra","sets":4,"target":"10-12 rep"},
                        {"name":"Panturrilha no Leg Press","sets":4,"target":"20 rep"},
                        {"name":"Escalador (Mountain Climber)","sets":4,"target":"1 min"}
                    ]
                }
            ]
        },
        "avancado": {
            "A": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"Agachamento com Barra nas Costas","sets":5,"target":"6-8 rep"},
                        {"name":"Afundo com Halteres","sets":4,"target":"Máx/lado"},
                        {"name":"Abdominal Infra no Solo","sets":4,"target":"15 rep"},
                        {"name":"Burpees","sets":4,"target":"20 rep"}
                    ]
                }
            ],
            "B": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"Supino Reto com Barra","sets":5,"target":"6-8 rep"},
                        {
                            "name": "Barra Fixa Pronada (Pull-up)",
                            "resources": [
                                "pullup-bar"
                            ],
                            "sets": 4,
                            "target": "Falha"
                        },
                        {"name":"Prancha Isométrica Frontal","sets":4,"target":"1 min"},
                        {"name":"Polichinelos (Jumping Jacks)","sets":4,"target":"1 min"}
                    ]
                }
            ],
            "C": [
                {
                    "title": "Treino Society",
                    "exercises": [
                        {"name":"RDL com Barra","sets":5,"target":"8-10 rep"},
                        {"name":"Agachamento com Barra nas Costas","sets":4,"target":"20 rep"},
                        {"name":"Panturrilha em Pé na Máquina","sets":4,"target":"Falha"},
                        {"name":"Escalador (Mountain Climber)","sets":4,"target":"1.5 min"}
                    ]
                }
            ]
        }
    }
};
