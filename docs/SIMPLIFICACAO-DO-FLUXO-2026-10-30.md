# Simplificação do fluxo de treino

30/10/2026. Implementação autorizada após análise das cinco capturas enviadas pelo usuário. O aplicativo entrega modelos prontos como caminho principal e mantém o cadastro de ficha própria como alternativa. Registrada no [PR #1](https://github.com/caiocborges88/fitapp-api/pull/1) e publicada, após autorização posterior, em 30/10/2026 às 09h57, versão `8025f00c044b5983`. Release e recuperação: [PUBLICACAO-SIMPLIFICACAO-2026-10-30.md](PUBLICACAO-SIMPLIFICACAO-2026-10-30.md).

## Decisões aprovadas

- Primeiro uso: escolher ABC tradicional ou sinergista, conferir o ciclo completo, salvar e começar. Uma explicação curta diferencia séries convencionais e pares. Equipamentos continuam sendo conferidos, sem presumir recursos incompatíveis.
- Uso habitual: abrir Treinar, identificar o próximo dia e começar em um toque, sem conferência obrigatória para uma ficha compatível. “Ver exercícios e ajustar” abre a revisão existente quando a pessoa quiser; “Trocar dia ou ficha” é secundário.
- Meus treinos prioriza o plano atual e seus dias reais. Fichas adicionais vêm depois; um único “Adicionar treino” reúne modelo e cadastro manual. Trocar modelo e editar permanentemente um dia são ações explícitas junto do plano.
- Perfil não configura prescrição. Foco, experiência declarada, aplicar/reiniciar plano saem da interface. Importação e IA continuam adiadas; não foram criadas novas modalidades.
- O cartão motivacional passa a orientar apenas a primeira escolha. Contadores não ocupam a tela inicial. Ambiente usa o controle compartilhado do cabeçalho; aeróbico fica em uma seção recolhida.

## Implementação e proteção dos dados

`mobile-flow.js` apresenta o próximo treino com `startSavedWorkout`, usando as mesmas funções de preparação e início do fluxo de revisão. Validações de catálogo, recursos, exclusões, pares, lados e armazenamento continuam em vigor. Propostas de ambiente interrompem o início direto para conferência, mesmo quando a rotina adaptada parece válida. Nenhum botão de início contorna a validação final.

Abrir um dia salvo passou a ler a fotografia existente sem chamar `executeForgePlan` e sem regravar o plano. A falta de preferências antigas não reconstrói o legado. Dias ausentes continuam ausentes; versões desconhecidas de plano ou sessão permanecem guardadas. A edição explícita continua conferindo ID e revisão antes de gravar.

O início registra `sessionPlanned`, preserva `sessionOrigin` e grava o estado ativo versão 4. Falha ao gravar mantém a conferência aberta. Uma sessão já guardada impede um segundo início direto; a recuperação existente continua retomando a sessão após recarga, com o mesmo ID e séries registradas.

O próximo ABC usa o histórico e a fila durável do mesmo plano. O override temporário do dia é invalidado quando esse conjunto de registros muda. Histórico e fila são deduplicados para essa comparação: a confirmação do envio de um mesmo registro não desfaz uma escolha manual do dia. Abrir ou abandonar não avança a sequência, e o calendário não define o próximo treino.

Seletores e elementos de suporte antigos que outras partes do aplicativo ainda consultam permanecem ocultos e inertes, fora do Perfil e da navegação habitual. Isso é compatibilidade interna, não uma oferta de modelos antigos. As fichas legadas continuam acessíveis em Meus treinos e na troca de ficha. A referência visual ilustrativa foi atualizada.

Não houve alteração de receitas, formatos de dados, API, regras ou índices nesta simplificação. O estado anterior do diretório já continha os novos ABCs e o acompanhamento ainda sem commit; esses pré-requisitos serão identificados separadamente no GitHub. Não se deve atribuir sua implementação à simplificação nem descartar os arquivos e auditorias preexistentes.

## Verificação

O teste `npm run test:simple-flow` percorre escolha inicial, conferência e salvamento, início em um toque em 360×740, 390×844 e 1440×1000, revisão opcional, recarga de sessão, parcial offline, falha de armazenamento, equipamento incompatível, organização, legado incompleto e versões desconhecidas.

As evidências desta etapa usam prefixo `simplificacao` em `audit/`, separado das capturas históricas. As regressões de aparência, design e fluxo móvel usam sufixos distintos para não sobrescrever os próprios relatórios. Testes automatizados de Edge com Firebase simulado não são testes em Android/iPhone físicos; a suíte emulada usa exclusivamente `demo-fitapp`.

Build `8025f00c044b5983`; `npm run build`, `npm run check` e conferência de whitespace aprovados. Fluxo específico, modelos (7 cenários), acompanhamento (4 grupos), editor, ambientes, propostas de ambiente, prioridades, cobertura, parâmetros legados, IA adiada, fluxo móvel, navegador geral e ciclo completo passaram. Aparência passou nas 16 combinações, incluindo contas, redução de movimento e offline; design passou em celular/desktop nos dois temas. Cache e recarga offline passaram com 65 recursos.

A suíte `firebase emulators:exec --only auth,firestore,hosting --project demo-fitapp "npm run test:models:emulated"` passou com 121 testes, sem ignorados, além da sincronização em dois navegadores, conflitos, exclusões, paginação e exportação de `trainingContext`. A tentativa inicial de `npm test` no sandbox falhou por `EACCES` ao acessar localhost; a mesma suíte completa passou fora do sandbox, com os emuladores. Nenhum dado real foi usado para conferir a interface.

Evidências principais:

- `audit/simplificacao-simple-flow-validation.json`, com medidas de início em um toque e regressões de armazenamento/legado.
- `audit/simplificacao-simple-flow-home-360-dark.png`, `audit/simplificacao-simple-flow-home-390-light.png` e `audit/simplificacao-simple-flow-workouts-light.png`.
- `audit/simplificacao-appearance-validation.json`, `audit/simplificacao-design-validation.json` e `audit/simplificacao-mobile-flow-validation.json`.
- `audit/simplificacao-workout-models-browser-validation.json`, `audit/simplificacao-training-tracking-browser-validation.json`, `audit/simplificacao-offline-validation.json` e `audit/simplificacao-sync-browser-validation.json`.
- `audit/simplificacao-validation-summary.json`, consolidando escopo e comandos, e `audit/simplificacao-git-baseline.json`, identificando os pré-requisitos e seu snapshot recuperável.

Registro no GitHub concluído em 30/10/2026, após autorização explícita para o repositório público `caiocborges88/fitapp-api`, os fontes, a documentação e as evidências de teste. Branch `codex/simplificar-fluxo-treino`; [PR #1 — Simplificar escolha do modelo ABC e início do treino](https://github.com/caiocborges88/fitapp-api/pull/1), aberto e sem merge.

O commit `5824b845b5858e9c8022168d1512c4f3c56aced5` registra separadamente os pré-requisitos ABC/acompanhamento anteriores, recuperados do snapshot publicado `d2f51cd46fa4626c` e da documentação local já existente. O commit `3034f363e98bbea4f7b3cc6f4071690ef38bfcb7` contém esta simplificação. Auditorias anteriores e a extração de chat não foram incluídas indiscriminadamente; as novas evidências usam dados de teste. Um commit documental posterior registra o envio e o PR.

A primeira tentativa de push foi recusada pela revisão automática por exigir autorização específica do destino público e do conteúdo. Após a confirmação explícita do usuário, o mesmo push foi aceito. Não houve envio alternativo durante o bloqueio nem inclusão de credenciais/dados reais de treino. A publicação em produção recebeu autorização posterior e está registrada abaixo.

## Publicação e recuperação

Publicação autorizada posteriormente e concluída em 30/10/2026 às 09h57, somente Hosting, versão `8025f00c044b5983`. Os 70 arquivos, temas e offline foram conferidos; as regras permaneceram iguais. O snapshot anterior foi preservado e nenhum dado real foi usado para testar o treino. O procedimento, identificadores e evidências estão em [PUBLICACAO-SIMPLIFICACAO-2026-10-30.md](PUBLICACAO-SIMPLIFICACAO-2026-10-30.md). Os pré-requisitos ABC/acompanhamento já publicados têm seus próprios registros de regras e recuperação.

Para recuperar o comportamento anterior desta etapa, reverta somente o commit da simplificação e gere novamente o build. Preserve os pré-requisitos, dados locais, modelos e regras compatíveis. Não normalize versões futuras nem apague sessões ou fichas para recuperar a interface.
