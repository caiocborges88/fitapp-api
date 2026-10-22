# Correções das prioridades e retirada do modelo de calistenia

22/10/2026. Alterações locais, sem publicação. IA continua adiada e nenhuma banda foi introduzida. O catálogo mantém seus 129 movimentos.

## Correções concluídas

| Diagnóstico | Comportamento atual |
| --- | --- |
| Plano apagado quando a geração do substituto falha | O candidato é gerado e validado em memória. Confirmação e gravação ocorrem depois; a falha mantém plano, contador e preferências |
| Falha de armazenamento durante a substituição | Preferências e contador são gravados em lote com recuperação dos valores anteriores; o plano completo é a última gravação. Testes injetaram falha em preferência e no plano |
| Modal ignorava exclusões | O modal recebe a lista persistida, com a mesma resolução de nomes/aliases do motor |
| Meta por tempo começava em repetições | A unidade acompanha a ficha; séries novas com meta temporal começam em segundos e o registro mantém duração sem inventar repetições |
| Barra fixa usada com chip desmarcado | O chip de barras altas/baixas restringe os recursos correspondentes; peso corporal não contorna essa restrição |
| Método global restringia trocas de ficha pessoal | As trocas seguem a política da ficha/bloco e os recursos do ambiente |
| Sugestão nível 3 para iniciante | As sugestões e a confirmação de troca recusam alta complexidade nesse contexto. O cadastro manual continua separado da geração automática |
| ABCD e foco em inferiores aceitavam padrões repetidos como cobertura | As posições repetidas relevantes agora têm pedidos explícitos de subnível/padrão |
| Carga textual da máquina herdada por variante corporal | A adaptação sinaliza a meta, bloqueia início/salvamento da versão adaptada até uma edição explícita e não calcula uma carga equivalente |

A gravação em lote evita notificações de estados intermediários na mesma página e reverte escritas já concluídas em falhas síncronas testadas. Não é uma transação de banco distribuída nem um diário contra encerramento abrupto do processo. A sincronização continua usando o mecanismo existente.

Séries antigas já registradas como repetições não são reinterpretadas automaticamente como segundos. Escolhas explícitas de unidade são preservadas. Metas como `30 seg`, `30s`, `1 min` e `1min` são reconhecidas; a unidade da entrada/registro é segundos. A ficha continua mostrando sua meta original em minutos quando for o caso.

## Calistenia simplificada

O modelo automático foi retirado dos dois seletores e do motor de novas montagens. Os movimentos corporais permanecem no catálogo e podem atender às trocas em **Casa**, mantendo foco/padrão e exigindo os recursos reais de cada execução. Não há barra ou banco presumidos por ser um exercício corporal.

Planos antigos de calistenia continuam identificados como **Plano salvo · personalizado**. Podem ser abertos, adaptados, editados e executados; seus dias e nomes não são regenerados. A política corporal dos blocos é preservada. Uma preferência antiga sem plano salvo volta a uma opção disponível, sem criar um novo plano automaticamente.

O bi-set complementar e a montagem manual livre continuam disponíveis. O atalho Casa sem recursos é mantido como sessão curta; não promete cobertura integral de costas e bíceps.

## Contratos musculares ajustados

- ABC no foco em inferiores: as duas posições de posteriores pedem extensão de quadril e flexão de joelho; as duas posições de quadríceps pedem vastos e reto femoral.
- ABCD hipertrofia/definição/tático: peito tem as três ênfases cadastradas; tríceps e bíceps têm seus dois pedidos; costas exige puxada vertical e horizontal; posteriores exige as duas funções. O dia de posteriores/ombros declara deltoide lateral e posterior.
- ABCD foco em inferiores: as posições duplicadas de quadríceps e posteriores também ficam explícitas. Pedidos isolados amplos de outros grupos não foram transformados em uma promessa de cobrir todo subnível de todo músculo.

Uma consequência esperada é bloquear mais ciclos fora da academia quando falta uma alternativa exigida, especialmente extensão de joelho. O aplicativo não obtém uma ficha aparentemente completa afrouxando esses pedidos.

## Resultado das novas simulações

Com a retirada da calistenia, a matriz atual contém **48.600 tentativas**, em 16.200 configurações com três sementes, considerando seis caminhos de montagem. Houve 7.731 montagens aceitas, correspondentes a 10.278 rotinas diárias; 40.869 tentativas foram bloqueadas. A matriz inclui falta deliberada de recursos e exclusões de grupos inteiros; bloqueios não são uma taxa de defeitos de uso real.

Nas montagens novas aceitas, não foram encontradas violações dos contratos avaliados, repetições de nome no mesmo dia ou os alertas de padrões/equipamentos monitorados pela matriz. Isso se limita aos cenários e sementes executados, não é uma prova universal nem validação individual da prescrição.

Nas 120 sondas de academia sem exclusões, os casos antes observados de costas sem puxada vertical e posteriores duplicados sem flexão de joelho passaram de 10/30, 9/30 e 6/30 para **zero nas respectivas amostras**.

## Validação

- `npm test`: 81 aprovados, 2 dependentes do emulador Firestore ignorados.
- `npm run test:workout-priorities`: oito cenários no Edge com Firebase simulado. Inclui falha de geração, quota local, exclusões, registro temporal, seleção de barras, legado de calistenia, fichas pessoais, complexidade e revisão de carga textual.
- Regressões de ciclos completos, editor, bi-set, ambiente, propostas por ambiente, expansão de catálogo, circuito/Casa e IA adiada aprovadas no navegador local.
- `npm run check` e `npm run build`: aprovados; catálogo das funções e cache offline regenerados.

Evidências atuais: `audit/workout-priorities-validation.json`, `audit/offered-workouts-simulation.json`, `audit/workout-assumptions-probes.json` e `audit/priorities-duration-mobile.png`. As auditorias de geradores também foram atualizadas para os métodos disponíveis.

O diagnóstico anterior é histórico: `audit/offered-workouts-simulation-before-priorities.json`, `audit/workout-assumptions-before-priorities.json` e `audit/offered-workouts-browser-audit.json`. O comando antigo de auditoria de navegador agora encaminha para a regressão das correções.

## Limitações que continuam explícitas

Não foi criada uma prescrição adaptativa de carga ou progressão individual. Na sonda com a mesma semente, alguns perfis do ABC continuam compartilhando exercícios, séries e metas; o descanso varia separadamente. A adequação por capacidade, frequência semanal e tempo disponível exige uma definição própria.

Na etapa de [parâmetros dos modelos](PARAMETROS-DOS-MODELOS.md), essas diferenças passaram a ser explicitadas na interface e o descanso deixou de ser alterado por efeitos atrasados da geração. Isso não acrescenta uma prescrição individual.

Fichas salvas e editadas manualmente continuam sendo preservadas: não são reconstruídas automaticamente para cumprir os contratos de um novo modelo. Na etapa seguinte, a revisão da sessão passou a considerar exclusões atuais e o diagnóstico na academia passou a verificar catálogo e política do bloco. Detalhes e evidências atualizados em [REVISAO-FICHAS-SALVAS.md](REVISAO-FICHAS-SALVAS.md). Não foi alegada resolução de todos os limites de personalização.
