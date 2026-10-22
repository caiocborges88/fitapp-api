# FitApp

## Cobertura muscular real — 22/10/2026

A prévia confere grupos principais, subníveis, padrões, repetições e mudanças em relação à ficha aberta. Core é identificado pelos movimentos; reabrir uma ficha salva não acrescenta abdominal automaticamente. Fichas manuais permanecem livres. Jornada completa local e 48.600 simulações verificadas. Evidências e limites: [docs/COBERTURA-MUSCULAR-DAS-FICHAS.md](docs/COBERTURA-MUSCULAR-DAS-FICHAS.md). Teste: `npm run test:coverage`. Sem publicação.

## Parâmetros e descanso — 22/10/2026

Modelos explicam o efeito real do foco e da experiência. O gerador não altera mais o descanso com atraso; a sessão recebe um padrão explícito, permite ajuste e recupera o valor após recarga. Fichas pessoais não herdam o foco global. Evidências e limites: [docs/PARAMETROS-DOS-MODELOS.md](docs/PARAMETROS-DOS-MODELOS.md). Implementação local, sem publicação. Teste: `npm run test:model-settings`.

## Revisão de fichas salvas — 22/10/2026

A prévia e o início do treino verificam exclusões atuais, catálogo, recursos, política dos blocos, séries e pares. Pendências são explicadas por movimento, sem reconstruir fichas antigas ou restringir os pares manuais aos modelos automáticos. Adaptações por ambiente também respeitam exclusões. Evidências e limites: [docs/REVISAO-FICHAS-SALVAS.md](docs/REVISAO-FICHAS-SALVAS.md). Implementação local, sem publicação.

## Prioridades corrigidas — 22/10/2026

A versão local preserva o plano quando a substituição falha, respeita as exclusões no modal, registra séries por tempo em segundos e aplica os recursos selecionados. O modelo automático de calistenia foi retirado; seus movimentos continuam disponíveis nas trocas em Casa e as fichas antigas foram preservadas. ABCD e foco em inferiores passaram a exigir os padrões musculares identificados na auditoria. Testes e limites: [docs/CORRECOES-PRIORIDADES-TREINOS.md](docs/CORRECOES-PRIORIDADES-TREINOS.md). Verificação de interface: `npm run test:workout-priorities`. Alterações ainda não publicadas.

## Fase atual — IA adiada (21/10/2026)

Por decisão do usuário, a versão local usa os modelos com regras testadas e o cadastro manual. Criação/importação por IA e coach estão desativados na interface e na API, antes de quota/provedor. Rascunhos antigos foram preservados. O primeiro uso futuro previsto é importação assistida de ficha existente, sem inventar prescrições. Decisão, contrato de retorno e evidências: [docs/DECISAO-USO-IA.md](docs/DECISAO-USO-IA.md). Essa mudança ainda não foi publicada.

## Expansão local sem bandas — 22/10/2026

O catálogo local passou de 123 para 129 movimentos. Foram acrescentadas opções de crucifixo no solo, crucifixo invertido em pé, rosca inversa, remada bilateral, panturrilha com joelhos flexionados e rosca corporal com resistência da perna. A configuração agora distingue banco de apoio para equilíbrio. Resultados, fontes e lacunas restantes: [docs/EXPANSAO-CATALOGO-SEM-BANDAS.md](docs/EXPANSAO-CATALOGO-SEM-BANDAS.md). Verificação de interface: `node tests/catalogue-expansion-browser.cjs`. Esta expansão ainda não foi publicada.

Os seletores locais oferecem apenas **Bi-set complementar**. As outras duas gerações foram removidas; o editor manual permite montar pares livremente, e planos antigos continuam disponíveis como personalizados. A simplificação ainda não foi publicada. Evidências em [docs/SIMPLIFICACAO-BISET.md](docs/SIMPLIFICACAO-BISET.md).

## Versão publicada para uso pessoal

Em 16/10/2026 foi publicada a versão `fc42a48734b53f0f` em [FitApp](https://fitapp-operacional.web.app), com a API, regras de salvamento e índice do histórico. A verificação posterior confirmou a versão pública, API protegida por autenticação, regras iguais às testadas, índice pronto, inicialização em viewport móvel e recarga offline. Evidência: `audit/mobile-production-validation.json`. O teste em Android físico será realizado pelo usuário; a verificação automatizada não autenticou nem gravou dados em produção.

No Android, abrir pelo Chrome, entrar com a conta Google e usar o menu **Instalar aplicativo** ou **Adicionar à tela inicial**. Fazer o primeiro acesso conectado e conferir a sincronização após salvar o treino. Dados do projeto local de demonstração `demo-fitapp` não são transferidos automaticamente à conta de produção. Antes de uma atualização futura, concluir e sincronizar a sessão em andamento.

O desenvolvimento agora segue [PLANO-DE-DESENVOLVIMENTO.md](PLANO-DE-DESENVOLVIMENTO.md). A direção visual e os critérios dos componentes estão em [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md).

`npm run test:design` verifica a interface em celular e desktop nos temas claro e escuro, com serviços simulados, e grava evidências em `audit/`. A validação com serviços reais de demonstração continua em `npm run test:integration`. A fonte e os estilos essenciais são servidos localmente e incluídos no cache offline.

`npm run test:editor` verifica isolamento entre sessão e ficha, edição, duplicação, ordenação, alteração de dia do plano e preservação do histórico. A entrega 2 acrescenta o campo opcional `workoutName` às sessões: publicar as regras atualizadas antes da hospedagem. Alterações não salvas na prévia ainda não são recuperadas ao fechar a página.

Diário de treinos em JavaScript, Firebase Authentication, Firestore e Cloud Functions. A montagem atual usa regras verificáveis e revisão do usuário; o nível de treinamento não sobe automaticamente por participação.

## Executar localmente

Requisitos: Node.js 24, Java 21 e CLI Firebase. Nesta máquina, o Java de desenvolvimento já está em `.tools/java` e o inicializador o encontra automaticamente.

```powershell
npm ci
npm ci --prefix functions
npm run dev
```

Abra [http://127.0.0.1:5000](http://127.0.0.1:5000). A porta 5000 usa exclusivamente o projeto de demonstração `demo-fitapp` e os emuladores locais. O login Google abre a interface de conta fictícia do emulador; não é necessário informar uma senha Google real. Os dados locais dos emuladores são descartáveis e não são dados de produção.

O arquivo `.env` e `functions/.secret.local`, ignorados pelo Git, foram preservados para compatibilidade com a integração de IA adiada. Não publique esses arquivos. Com a política atual, as rotas e o teste Gemini não chamam o provedor.

## Verificação

```powershell
npm run build
npm run check
npm test
npm run test:browser
npm run test:offline
```

`npm test` inclui regras e recompensas quando `FIRESTORE_EMULATOR_HOST` está definido. Para executar a suíte completa em ambiente temporário:

```powershell
firebase emulators:exec --only firestore --project demo-fitapp "npm test"
```

Com `npm run dev` ativo, execute `npm run test:integration` para verificar navegador, autenticação, banco, API, recompensa e retomada offline juntos. Os testes de regras limpam somente o banco de demonstração. No Windows, os testes de navegador usam o Edge; em Linux, instale o Chromium do Playwright.

`npm run test:gemini` informa que a IA está adiada e não faz chamadas ao provedor nesta fase. Resultados anteriores em `audit/gemini-validation.json` são históricos. `npm run test:ai-deferred` verifica a pausa, preservação de rascunhos e montagem sem IA no navegador local.

## Contratos principais

- Cada sessão recebe ID estável antes de ser enviada. A fila é separada por usuário, coordenada entre abas e removida por confirmação individual. O servidor não é necessário para continuar registrando uma sessão já autenticada.
- A conclusão primeiro grava uma cópia local durável; falha de armazenamento mantém a sessão aberta. Logout preserva dados locais separados por conta.
- O histórico da nuvem é mesclado por ID com o histórico e as pendências locais. São carregados até 500 registros por abertura; paginação de acervos maiores permanece uma evolução planejada.
- O catálogo possui campos normalizados; blocos tradicionais, bi-sets e circuitos têm tipo explícito. Rotinas vazias são rejeitadas. Alternativas sem equipamento compatível exigem revisão.
- Recompensas e fabricação usam transações e identificadores de operação no servidor. Ranking tem projeção separada sem email. Registros físicos continuam sendo autodeclarados.
- O administrador anterior foi preservado a partir das regras publicadas, agora com email verificado. Também são aceitas claims `admin` emitidas por autoridade confiável. Alunos não atribuem privilégios.
- As regras propostas estão em `firestore.rules`; o modelo está em `audit/modelo-firestore.md`. São um protótipo testado, sujeito à revisão antes de uso amplo.

## IA e limites operacionais

Nesta fase as rotas de IA retornam `409 / ai-deferred` antes de consumir quota ou chamar o provedor. A API não exige vínculo com o segredo de IA. A descrição abaixo documenta a integração preservada para referência e não um recurso disponível; sua reativação exige concluir o contrato definido na decisão de IA.

O backend verifica Firebase ID token, limita pedidos por usuário e controla a quota global de geração. O modelo primário padrão é `gemini-3.5-flash-lite`, com contingência `gemini-3.8-flash` para 429/503; ambos podem ser configurados no ambiente. Textos de entrada têm até 16.000 caracteres, respostas até 4.096 tokens e as saídas são validadas contra o catálogo e o ambiente. Erros do provedor não expõem chaves ao cliente.

Os limites de requisições e tokens controlam consumo, mas não substituem acompanhamento de faturamento. Os documentos de uso têm `expiresAt`; limpeza automática requer uma política TTL separada no console.

## Publicação e recuperação

Nenhuma publicação é realizada por `npm run dev`, `npm test` ou pela CI. A versão preparada altera código, regras e índices e precisa ser publicada de forma coordenada. A cópia das regras anteriores foi preservada localmente em `audit/regras-publicadas-antes-da-correcao.json`.

Antes da publicação, revisar a versão, preservar um snapshot Git e os dados necessários para recuperação. Publicar primeiro o índice e aguardar sua disponibilidade; depois coordenar API, regras e hospedagem. Nesta fase a API não vincula `GEMINI_API_KEY`; o segredo só volta a ser necessário na reativação validada de IA. O manifesto `functions/functions.yaml` e os arquivos de vendor são gerados pelo build, não editados manualmente.

Usuários de versões antigas devem encerrar a sessão e reabrir a PWA para assumir a nova versão. A atualização do cache não interrompe uma sessão aberta. O ranking novo começa a receber projeções quando recompensas são processadas; o histórico e o perfil privado anteriores não são apagados.

Pontos ainda necessários antes de uso comercial amplo: validação profissional do conteúdo de treino, política de privacidade e exportação/exclusão integral, recuperação de backup ensaiada, revisão de conflitos de campanha entre dispositivos e testes manuais em iOS/Android reais. Nenhum desses itens é apresentado como concluído pelos testes locais.

## Continuidade e dados de treino — versão local

A entrega 3A adiciona sincronização transacional, preservação de conflitos, exclusões persistentes, histórico paginado e exportação JSON em Perfil. Validação adicional: `npm run test:sync` com os emuladores ativos; `npm run test:catalogue` para as dicas administrativas. Resultados, limites e atualização coordenada em `audit/ENTREGA-3A-2026-10-15.md`.

Exportação de treino não inclui todos os documentos da conta. Exclusão integral e recuperação de backup ensaiada continuam pendentes na entrega 3B. A revisão de conflitos de campanha entre dispositivos foi implementada e exercitada; não representa atualização colaborativa em tempo real nem elimina os limites do modelo serializado.

## Ambientes de treino

Casa e Parque/praia usam peso corporal por padrão. Recursos adicionais devem ser marcados em Treinar; opções são independentes por ambiente. A adaptação altera a sessão, preserva a ficha original e bloqueia movimentos sem alternativa compatível. Validação: `npm run test:environment`. Escopo e limites: `audit/AMBIENTES-2026-10-15.md`.

## Evolução para SaaS profissional

A direção atual inclui aplicativo do aluno e painel profissional com espaços de trabalho isolados. Arquitetura proposta, fases e critérios de conclusão estão em [docs/PLANO-SAAS.md](docs/PLANO-SAAS.md). Esse plano não representa implementação ou publicação do SaaS. O histórico das entregas da base continua em `PLANO-DE-DESENVOLVIMENTO.md`.
