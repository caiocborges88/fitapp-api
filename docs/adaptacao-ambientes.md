# Movimentos, focos musculares e adaptação de ambientes

O treino da academia é a referência. A mudança de ambiente adapta somente a sessão; não reescreve a ficha pessoal ou o plano. Ao voltar à academia, os movimentos originais são recuperados. Nomes antigos são resolvidos por `aliases`; os IDs derivados dos nomes antigos foram preservados nos cadastros renomeados.

## Contrato do catálogo

- `id`: identificador persistente; não deve mudar em futuras renomeações.
- `name`: uma variante definida, sem alternativas de equipamentos dentro do mesmo nome.
- `group` e `agonist`: agrupamento e alvo principal.
- `subLevel`: foco exibido ao usuário, incluindo regiões musculares ou funções quando essa divisão é mais apropriada.
- `muscleFocus`: chaves estáveis do foco para comparação entre variantes. Não são porcentagens de ativação nem promessas de isolamento.
- `movementPattern`: padrão necessário à substituição. Por exemplo, puxada vertical não substitui remada horizontal, e extensão de quadril não substitui flexão de joelho.
- `equip`: resistência/equipamento principal para os filtros existentes.
- `resources`: TODOS os equipamentos e apoios obrigatórios, inclusive halteres, banco e anilhas. Lista vazia significa que não há equipamento específico obrigatório. Parede e solo comuns são pressupostos apenas quando descritos na variante.
- `nivel`: complexidade de execução, de 1 a 3. Não significa que todo exercício de nível 2 é proibido para iniciantes. A geração e as substituições para iniciantes excluem nível 3; as rotinas de fábrica para iniciantes também foram alinhadas a essa regra.
- `environmentPreference`: preferência entre alternativas elegíveis; nunca dispensa os requisitos de equipamento ou foco.

As divisões cobrem peitoral clavicular/esternocostal/ênfase inferior, deltoides anterior/lateral/posterior, dorsais/remadas/eretores, quadríceps, isquiotibiais por ação de joelho ou quadril, glúteos máximo e abdutores, adutores, gastrocnêmios/sóleo, flexores e extensores do cotovelo e funções do core. As ênfases não representam músculos isolados. Abdominais foram descritos por ação, evitando tratar supra e infra como músculos separados; os isquiotibiais foram descritos por ação em vez de presumir uma posição alongada ou encurtada durante toda a execução.

## Recursos por ambiente

| Ambiente | Elegibilidade |
| --- | --- |
| Academia | Todo o catálogo; preferência por cabo, barra/anilhas, halteres e máquinas na geração. Pressupõe academia equipada. |
| Casa / hotel | Peso corporal; halteres somente quando marcados. Bancos, barras e corda exigem declaração de disponibilidade. Cabos, barras de musculação/anilhas e máquinas são excluídos. |
| Parque / praia | Peso corporal com banco, barra fixa ou barra baixa declarados. Halteres, corda e paralelas são excluídos deste escopo. |

Banco reto, banco inclinado e banco declinado são recursos distintos. Barra alta de puxadas não implica barra baixa de remada. Recursos não são presumidos em nenhum dos dois ambientes externos à academia, pois um quarto de hotel ou parque específico pode não tê-los. As escolhas são guardadas separadamente por ambiente.

## Critério de substituição

1. Resolver o movimento original, inclusive nomes antigos.
2. Manter o movimento se ele já for compatível com o ambiente.
3. Procurar alternativas com o mesmo agonista, todos os focos registrados e o mesmo padrão de movimento, respeitando os recursos disponíveis.
4. Priorizar variedade somente dentro desse conjunto. Repetir uma alternativa compatível é permitido antes de abandonar um foco.
5. Manter séries e meta; descartar registros de carga e execução do movimento substituído. Não converter quilogramas entre aparelhos e peso corporal.
6. Sinalizar falta de alternativa e bloquear o início até revisão quando o conjunto estiver vazio. A geração com subnível explícito também informa a falta de opção, em vez de descartar o subnível silenciosamente.

O contrato de entradas personalizadas antigas sem `muscleFocus` exige igualdade explícita de `subLevel` e agonista. Cadastros com apenas um grupo amplo não autorizam uma equivalência automática.

## Exemplos verificados

- Supino reto com barra → flexão com foco esternocostal no hotel sem equipamentos.
- Supino inclinado com barra → flexão declinada com os pés em banco no parque; sem banco ou halteres/banco inclinado no hotel, o foco fica pendente.
- Supino inclinado com barra → supino inclinado com halteres em casa somente com halteres e banco inclinado.
- Remada com barra → remada invertida apenas com barra baixa declarada; a presença de barra alta não basta.
- Puxada vertical sem barra fixa ou halteres não recebe um movimento arbitrário de costas como substituição.

## Limites e premissas

O catálogo tem 122 movimentos. Isso amplia a cobertura, mas não torna fisicamente possível reproduzir qualquer treino de academia em um quarto vazio. Deltoide lateral, puxadas, algumas ênfases de peitoral e extensões de joelho podem ficar sem alternativa nos recursos disponíveis. O programa mostra essas lacunas; não declara o treino completo por terem sido escolhidos movimentos do mesmo grupo.

Correspondência de foco e padrão é uma regra conservadora de software, não uma demonstração de igualdade de estímulo, amplitude, dificuldade ou hipertrofia. Mesmo quando a substituição existe, a dificuldade precisa ser ajustada pelo praticante. A classificação muscular deve passar por revisão profissional antes de ser tratada como prescrição. Cobertura completa depende da composição do treino e da semana, além dos recursos; este trabalho não impõe que cada sessão contenha todas as regiões de todos os músculos.

Referências para a premissa de variação e limites da equivalência: [ensaio sobre seleção de exercícios e hipertrofia regional](https://pubmed.ncbi.nlm.nih.gov/34743671/) e [posição da ACSM sobre treinamento resistido](https://pmc.ncbi.nlm.nih.gov/articles/PMC12965823/). As fontes sustentam o contexto; não validam individualmente cada par de substituição deste catálogo.

## Validação

Testes cobrem IDs e recursos obrigatórios, referências das rotinas, níveis das fichas iniciantes, nomes antigos, preservação de foco/padrão, halteres opcionais, banco no parque, distinção entre barras, recálculo ao mudar recursos e reversão à academia. O teste de navegador verifica os controles, a preservação da ficha e do plano, bloqueio de lacunas e largura móvel. Nenhum deploy é realizado por esses testes.
