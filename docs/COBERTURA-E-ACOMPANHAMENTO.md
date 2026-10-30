# Cobertura dos ABCs e acompanhamento do realizado

Avanço autorizado em 29/10/2026 após a análise dos modelos. Publicada mediante autorização explícita posterior em 29/10/2026 às 20h06 (America/Sao_Paulo), versão `d2f51cd46fa4626c`. Release e recuperação: [PUBLICACAO-ACOMPANHAMENTO-2026-10-29.md](PUBLICACAO-ACOMPANHAMENTO-2026-10-29.md). Referência de receitas: [NOVOS-MODELOS-ABC.md](NOVOS-MODELOS-ABC.md).

## Compromisso por modelo

O contrato de cobertura versão 1 descreve as receitas existentes, sem alterar exercícios, séries ou descansos. Está em `public/js/model-coverage.js`. Ele não cria regra global de prescrição, não exige todos os subníveis do catálogo e não certifica ativação, dose muscular ou resultado físico.

| Dia/função | ABC tradicional | ABC sinergista |
| --- | --- | --- |
| A: empurrar inclinado, adução horizontal, desenvolvimento, lateral, tríceps acima da cabeça e flexão do tronco | Principais | Principais |
| A: extensão de tríceps no pulley | Complemento | Principal |
| B: puxada, remada apoiada, posterior de ombro, rosca supinada, rosca neutra e prancha lateral por lado | Principais | Principais |
| C: leg press, dobrar o quadril, extensora, flexora, adutora, abdutora e panturrilhas com joelhos estendidos/flexionados | Principais | Principais |
| C: elevação pélvica | Complemento | Principal |

A função é conferida contra as alternativas já revisadas para a posição, incluindo nomes canônicos/aliases e disponibilidade. Manter `slotId` ao trocar para um movimento de outra função não satisfaz o contrato. Um principal convertido em opcional aparece como desvio da referência. Campos ausentes, exclusões e falta de recursos pedem revisão; o relatório não acrescenta movimentos nem impede uma ficha manual deliberadamente diferente.

A revisão do ciclo mostra o conjunto A+B+C; uma sessão isolada é identificada como recorte. Os estados distinguem principal previsto, complemento ativado/desativado, ausência explícita e movimento/disponibilidade a revisar. O relatório geral anterior permanece como descrição das ênfases principais do catálogo.

## Decisões e pendências de conteúdo

- As diferenças entre tradicional e sinergista na elevação pélvica e no pulley são explícitas e preservadas. Esta etapa não promove opcionais automaticamente.
- Trapézio superior/inferior continuam sem movimento dedicado nas receitas. Sua inclusão no principal ou em complementos permanece uma decisão de conteúdo a revisar, considerando a duração real e o objetivo do modelo.
- Outras funções de core e subdivisões anatômicas não se tornam obrigatórias por constarem no catálogo. Não há nota percentual de completude anatômica.
- Não foram inventadas participações secundárias nem equivalências de séries. Cadastros sem informação revisada continuam sem avaliação secundária.
- Não foram ampliadas listas de substituição por semelhança de nome/grupo. Remada apoiada, extensora, martelo e prancha lateral continuam entre as posições de menor flexibilidade. A ampliação futura exige revisar função, variante, recursos, unidade e efeito na cobertura; depois alterar o catálogo/receita com versão própria se necessário.

## Planejamento e sessão

Ao iniciar uma nova sessão de musculação, `sessionPlanned` preserva a fotografia da **sessão preparada naquele momento**, após ajustes anteriores ao início. Não é uma reconstrução da ficha original. Blocos e exercícios guardam IDs, principal/opcional, ativação, ordem, execução, séries, meta, unidade, lados, descanso configurado e ênfases principais então cadastradas. Não há séries executadas nessa fotografia.

Ao encerrar, o campo opcional `trainingContext` contém JSON com `version:1`, `planned`, `execution` e identificação/revisão da origem no encerramento. `execution` é a configuração final, incluindo os ajustes de descanso por bloco. O limite é 90.000 caracteres. A capacidade de preservar o contexto é conferida antes de iniciar e novamente ao salvar. Formato inválido ou excesso impede encerrar e conserva a sessão aberta. A gravação na fila local durável continua anterior ao encerramento; sincronização e exportação transportam o contexto sem reconstruí-lo.

O descanso é uma **configuração**, não a pausa efetivamente medida. Carga, repetições e segundos realizados permanecem somente em `data`. A prancha lateral mantém um registro por lado; E1/D1/E2/D2 passam a aparecer também no histórico, usando as notas já preservadas. Uma linha por lado não é equiparada a uma série bilateral para calcular dose muscular.

O histórico apresenta completo/parcial e comparação por ID de exercício: realizado/previsto no início, registros não realizados, principal/complemento, trocas e alterações de configuração. Exercícios acrescentados depois do início não recebem uma previsão inicial inventada. Remoções não apagam o que havia sido previsto. Séries extras não são limitadas artificialmente à previsão inicial. Completo continua significando que os principais da configuração final foram concluídos; não significa adesão integral ao planejamento inicial.

## Acompanhamento e revisão

Em Histórico e evolução:

- Última passagem disponível pelo ABC do plano atual: desde o último A salvo até o registro mais recente. Isso não identifica uma semana nem inventa um ciclo quando só B/C estão disponíveis. Repetições de uma letra permanecem listadas. Dias sem registro neste trecho não são classificados como zero execução.
- Data e dias desde o último registro disponível de A, B e C, sem sugerir recuperação ou compensação.
- Últimos 30 dias corridos inclusivos, no calendário local. Com um novo ABC ativo, considera apenas seu ID de plano; fora dele, mostra musculação das fichas disponíveis.
- Contagem de parciais, disponibilidade de planejamento, alterações identificadas, principais incompletos por exercício, trocas durante a sessão e duração média registrada por tipo de dia, incluindo parciais. O relógio não distingue exercício, espera e interrupção.
- Distribuição por ênfase principal preservada na configuração final, contando apenas registros realizados. Registros sem contexto e participações secundárias não ganham classificação histórica presumida.

O painel é uma leitura dos registros disponíveis no dispositivo, incluindo fila offline, sem duplicar IDs ou ressuscitar exclusões. A paginação existente permite carregar mais registros. Ele não apresenta o acervo local parcial como histórico integral da conta. O lembrete de 90 dias oferece acesso ao acompanhamento, mantendo a revisão e qualquer mudança sob ação do usuário.

Não há aumento automático de carga, compensação de faltas, adaptação por capacidade ou recomendação clínica. Ajustes anteriores ao início não aparecem como trocas durante a sessão, pois já fazem parte da sessão preparada. O contexto final também não é uma trilha de cada pausa ou de cada mudança intermediária.

## Compatibilidade e publicação futura

- Receita permanece `modelVersion:1`, plano `schemaVersion:2`; não se altera a prescrição nesta etapa.
- Estado ativo passa a versão 4 para transportar `sessionPlanned`. Versões 1–3 continuam recuperáveis, com planejamento inicial indisponível. Versões futuras são preservadas e recusadas, sem normalização destrutiva.
- Histórico antigo permanece intacto. Contextos ausentes, inválidos ou de versão futura não são reconstruídos com a ficha atual; os dados originais continuam armazenados.
- Firestore aceita o campo opcional limitado `trainingContext`, mantendo dono, imutabilidade e isolamento. É contexto autodeclarado do proprietário, não dado confiável para conceder privilégios/recompensas.
- Em eventual publicação autorizada, implantar as regras compatíveis **antes do Hosting**. API e índices não exigem mudança. Preservar snapshots/releases e as regras que aceitam contextos já gravados. Não publicar apenas o cliente contra regras antigas. Uma sessão aberta em cliente antigo pode não transportar o novo planejamento; concluir/sincronizar antes de atualizar.

## Verificação

Domínio: `tests/training-tracking.test.mjs`. Navegador local com Firebase simulado: `npm run test:tracking`, evidências em `audit/training-tracking-browser-validation.json` e `audit/tracking-light.png`/`tracking-dark.png`. Regras, transporte entre dispositivos e exportação: suíte emulada `npm run test:models:emulated`, ampliada com contexto imutável. Regressões: editor, modelos, ambientes, prioridades, cobertura, fluxo móvel, aparência, design e offline. Resultado consolidado em `audit/training-tracking-validation.json` após a execução.

Os testes usam dados fictícios, serviços simulados e `demo-fitapp`. Não representam testes físicos Android/iPhone, validação profissional da prescrição ou conferência em produção.

Resultado local: build `d2f51cd46fa4626c`, sintaxe/lint aprovados; 119 testes aprovados e dois condicionais ignorados fora dos emuladores; 121 aprovados sem ignorados com Firestore emulado. Contexto transportado a outro dispositivo e preservado na exportação JSON. Navegador específico passou em quatro grupos de cenários, incluindo estado ativo versão 3 e recusa preservadora de versão futura. Modelos passaram em sete cenários. Editor, ambientes, prioridades, cobertura e fluxo móvel aprovados; aparência em 16 combinações e design em quatro. Cache offline com 65 recursos, incluindo os quatro módulos novos. Evidências móveis desta etapa usam prefixo `tracking-mobile`, e aparência/design usam `tracking-appearance`/`tracking-design`. Publicação posterior e conferência dos 70 arquivos e do offline registradas no documento de release acima.
