# Modelos ABC com regras por bloco

Evolução posterior: [Cobertura e acompanhamento](COBERTURA-E-ACOMPANHAMENTO.md), com contrato de cobertura, contexto imutável por sessão e estado ativo versão 4. Essa etapa foi publicada em 29/10/2026, versão `d2f51cd46fa4626c`, preservando as receitas abaixo. Release: [PUBLICACAO-ACOMPANHAMENTO-2026-10-29.md](PUBLICACAO-ACOMPANHAMENTO-2026-10-29.md).

Implementação de 29/10/2026, autorizada após a análise e quinze respostas do usuário. Publicada, com autorização explícita posterior, em 29/10/2026 às 16h55 (America/Sao_Paulo), versão `d302b4122ec4945c`. Escopo e recuperação: [PUBLICACAO-ABC-2026-10-29.md](PUBLICACAO-ABC-2026-10-29.md).

## Decisões de uso

- Hipertrofia geral e distribuição equilibrada como finalidade declarada, sem prescrição individual por frequência, carga ou capacidade.
- Dois modelos com exercícios definidos: **ABC tradicional** (`abc_tradicional`) e **ABC sinergista** (`abc_sinergista`). O usuário escolhe um modelo para o plano e o mantém até decidir substituir.
- Academia é a referência inicial. A geração recusa recursos ou exclusões incompatíveis com o exercício definido; não sorteia nem troca silenciosamente. A adaptação por ambiente continua disponível para revisão da sessão, respeitando as alternativas cadastradas e informando lacunas.
- Séries, metas, ordem, tipo de execução e descanso pertencem a cada bloco. Preferências globais de foco e experiência não alteram esses modelos. Os campos antigos continuam disponíveis internamente para ler planos anteriores; `padrao` é um marcador de transporte, não um nível de dificuldade.
- Core em A e B, com funções distintas. O dia C não recebe abdominal automático. Adutora e abdutora são principais nos dois modelos.
- Sequência contínua A → B → C entre semanas. Um parcial salvo também avança; abrir, abandonar ou falhar ao salvar não avança. A sugestão considera registros do mesmo plano, incluindo a fila local durável. O usuário pode escolher outro dia.
- 45–60 minutos é uma referência de uso, sem redução automática de volume nem promessa de duração. C tem mais movimentos e pode ultrapassar essa referência.
- Revisão sugerida após 90 dias da criação ou da revisão expressamente registrada. O lembrete é interno ao aplicativo, consultado ao abrir/voltar à tela; não há notificação do sistema, automação externa ou troca automática da ficha.

## Receitas aprovadas

Os valores e a ordem estão declarados em `public/js/workout-models.js`. Os modelos são fotografias da proposta aceita pelo usuário, não uma validação profissional da prescrição.

### ABC tradicional

| Dia | Exercícios em ordem (séries × meta; descanso) |
| --- | --- |
| A | Supino inclinado com halteres (3 × 8–12; 120 s); voador/peck deck (2 × 10–15; 90 s); desenvolvimento com halteres (2 × 8–12; 120 s); elevação lateral (2 × 12–20; 75 s); tríceps francês no cabo (2 × 10–15; 90 s); abdominal na máquina (2 × 12–15; 75 s) |
| B | Puxada alta neutra (3 × 8–12; 120 s); remada na máquina apoiada no peito (3 × 8–12; 120 s); crucifixo invertido na máquina (2 × 12–15; 90 s); rosca direta com barra (2 × 10–15; 90 s); rosca martelo (2 × 10–15; 90 s); prancha lateral (2 × 20–30 s **por lado**; 75 s após ambos) |
| C | Leg press 45° (3 × 10–12; 150 s); RDL com barra (2 × 8–10; 150 s); extensora (2 × 10–15; 90 s); flexora sentada (2 × 10–15; 90 s); adutora (2 × 12–20; 75 s); abdutora (2 × 12–20; 75 s); panturrilha em pé (2 × 12–20; 90 s); panturrilha sentada (2 × 12–20; 90 s) |

Opcionais, inicialmente desativados: tríceps pulley no A (2 × 10–15; 90 s) e elevação pélvica na máquina no C (2 × 10–15; 120 s). Nenhum opcional extra foi inventado para o sinergista.

### ABC sinergista

| Dia | Blocos em ordem |
| --- | --- |
| A | Supino inclinado (8–12) → francês no cabo (10–15), 3 voltas/120 s; desenvolvimento (8–12) → pulley (10–15), 2 voltas/120 s; voador (2 × 10–15/90 s); lateral (2 × 12–20/75 s); abdominal na máquina (2 × 12–15/75 s) |
| B | Puxada neutra (8–12) → rosca direta (10–15), 3 voltas/120 s; remada apoiada (8–12) → crucifixo invertido (12–15), 3 voltas/120 s; martelo (2 × 10–15/90 s); prancha lateral (2 × 20–30 s por lado/75 s após ambos) |
| C | Leg press (10–12) → elevação pélvica (10–15), 3 voltas/150 s; RDL (2 × 8–10/150 s); extensora (2 × 10–15/90 s); flexora (2 × 10–15/90 s); adutora e abdutora (2 × 12–20/75 s cada); panturrilha em pé → sentada (12–20 cada), 2 voltas/90 s |

O descanso de um par começa após ambos os movimentos da mesma volta. Pares de pernas representam cooperação e mudança de ênfase; não são apresentados como a mesma relação dos pares de superiores. A remada apoiada traz orientação de conferir a variante e a execução para participação do deltoide posterior. Não há promessa de cobertura direta de cada subdivisão anatômica, equivalência fisiológica entre modelos ou duração menor do sinergista.

## Sessão, edição e dados

- Trocas por posição usam listas explícitas de alternativas do catálogo. Supinos não são trocados por crucifixos na primeira posição de empurrar; desenvolvimento não é trocado por elevação frontal. Algumas posições, como a remada apoiada, têm poucas alternativas revisadas; a lista não é ampliada artificialmente.
- Em **Execução e descanso**, o usuário pode executar o par em séries convencionais ou escolher movimentos revisados para o par. Movimentos com séries registradas não são substituídos. A troca conjunta valida ambos antes de aplicar.
- Ajustes valem para a sessão. **Salvar alterações na ficha original** é uma ação separada, com conferência do ID/revisão de origem. Ela conserva os registros da sessão e retira `setsData` da ficha. Alteração concorrente impede sobrescrever a origem. Cópias pessoais que conservam os blocos do modelo usam o mesmo contrato.
- Descanso inicial vem do bloco. Atalhos de descanso durante a sessão são guardados por ID de bloco e sobrevivem à recarga. Só entram na ficha se o usuário escolher salvá-los. O relógio continua único.
- Opcionais ficam em seção própria antes e durante a execução. Desativados não entram em cobertura, pendências, séries previstas ou registros. Uma vez registrados, permanecem na sessão. Concluir todos os principais permite salvar como completo mesmo que opcionais ativados não tenham sido realizados; os registros descrevem apenas o realizado.
- A prancha lateral usa quatro linhas: E1, D1, E2 e D2. Cada lado recebe duração real independente; o histórico registra o lado nas notas e mantém `durationSecs`, sem inventar repetições. A interface informa duas séries por lado. Assim B soma 16 linhas registráveis no tradicional e 18 no sinergista, em vez de tratar as duas durações como uma única série indistinta.
- Nos pares novos, alterar séries na execução altera as voltas dos dois movimentos. Séries já registradas não são removidas. O editor exige voltas iguais antes de salvar um par; séries diferentes podem usar execução convencional. Pares manuais antigos continuam livres.
- Metas ou descansos ausentes nos novos blocos são rejeitados; não recebem a prescrição global antiga. Versões de modelo desconhecidas são preservadas e não normalizadas para uma versão conhecida.

## Formato e compatibilidade

Novos planos têm `schemaVersion:2`, `modelVersion:1`, ID/revisão próprios e cópias completas dos três dias. Os blocos levam ID, modelo/versão, função, descanso e, quando pertinente, flags de opcional. Exercícios guardam a posição funcional e o modo de lados. `routineForTemplate` preserva esses campos e remove somente dados de execução. Duplicação gera identidades independentes.

O estado ativo é versão 3 e acrescenta origem da ficha, ajustes temporários de descanso e bloco atual. Sessões antigas sem os campos continuam restauráveis. Rascunhos continuam no envelope versão 1, com novos métodos reconhecidos e versão explícita dos blocos; clientes anteriores recusam os novos métodos sem apagar os rascunhos.

Os IDs e exercícios de planos anteriores não são convertidos. A abertura preserva sua estrutura. O gerador antigo permanece para compatibilidade e testes; suas opções ficam ocultas para novas escolhas na interface. Preferência antiga sem ficha passa a oferecer o novo ABC tradicional. ABCD e circuito novos não estão disponíveis nesta etapa; fichas anteriores continuam acessíveis.

O envelope de sincronização continua compatível com os campos existentes. As regras Firestore aceitam os dois novos métodos e `level:'padrao'` apenas para eles. Histórico mantém o contrato de registros executados, não reconstrói uma prescrição passada. O backup JSON existente transporta a fotografia versionada do plano.

## Verificação e publicação

Comandos: `npm run build`, `npm run check`, `npm test`, `npm run test:models`, `npm run test:editor`, `npm run test:environment`, `npm run test:workout-priorities`, `npm run test:coverage`, `npm run test:mobile-flow`, `npm run test:appearance`, `npm run test:design` e `npm run test:offline`. Regras/recompensas usam `firebase emulators:exec --only firestore --project demo-fitapp "npm test"`; sincronização usa Auth, Firestore e Hosting de demonstração.

`FITAPP_AUDIT_PREFIX` permite gerar novas capturas de aparência/design sem sobrescrever as históricas. Nesta entrega os prefixos são `models-appearance` e `models-design`.

Resultado: build e sintaxe/lint aprovados; 111 testes com Firestore emulado, sem ignorados; sete cenários específicos de navegador; transferência do novo modelo entre dois dispositivos emulados; regressões de editor, ambientes, prioridades, cobertura, fluxo móvel e offline aprovadas. Aparência passou em 16 combinações e design em celular/desktop, claro/escuro. As regressões atualizaram seus relatórios e capturas habituais. O resultado desta execução também foi reunido em `audit/models-regressions-validation.json` e nos arquivos com prefixo `models-`. As versões anteriores permanecem no histórico Git; a restauração em lote do diretório de auditoria foi recusada pela revisão automática por risco de descartar alterações locais, e os arquivos atualizados foram mantidos. Para reproduzir a suíte completa com sincronização: `firebase emulators:exec --only auth,firestore,hosting --project demo-fitapp "npm run test:models:emulated"`.

Evidências específicas: `audit/workout-models-browser-validation.json`, `audit/workout-models-cycle-light.png`, `audit/workout-models-session-dark.png`, `audit/workout-models-session-light.png` e `audit/novos-modelos-abc-validation.json`. A simulação de navegador usa Firebase simulado; a conferência de sincronização e regras usa emuladores `demo-fitapp`. Não há teste físico Android/iPhone, validação profissional da prescrição ou gravação de verificação em produção.

Publicação concluída após preservar snapshot e versões anteriores e implantar as **regras Firestore antes do Hosting**, pois as regras antigas recusam os novos métodos. A conferência pública confirmou os 66 arquivos, regras iguais às testadas, login claro/escuro, APIs protegidas e recarga offline. API e índices não foram publicados. Para recuperação, preservar o formato e as fotografias já criadas; restaurar somente um Hosting antigo não garante leitura correta dos novos descansos. Manter regras que aceitem os dados já gravados e preferir uma correção compatível, sem converter ou apagar fichas novas.
