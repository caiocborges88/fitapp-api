# Correções e validação — FitApp

A auditoria original registra o estado anterior à intervenção. Os diagnósticos antigos em `reproduzir.cjs` são evidência histórica dos defeitos; a suíte atual fica em `tests/`.

## Implementado

- Remoção do bloqueio de sintaxe e correção das referências da Forja, gráficos, áudio e restauração.
- ABCD implementado; antagonistas corrigidos; rótulos alinhados à rotina; catálogo normalizado; identificação explícita do protocolo de bloco.
- Séries editadas após marcação entram corretamente no registro. Sessões podem ser retomadas sem perder cargas e repetições.
- IDs estáveis para sessões e templates; fila coordenada, reconciliação por ID, isolamento local por conta e preservação no logout.
- Salvamento confirmado localmente antes de encerrar a sessão; falhas não são anunciadas como sucesso.
- Token verificado no servidor; cotas por usuário e global; limites de entrada e saída; erros de serviço sem detalhes internos.
- SDK Gemini atualizado; formato de geração ajustado após teste real; modelo leve validado e contingência preparada.
- Recompensas e fabricação no servidor, com transações e repetição idempotente; ranking separado dos perfis privados.
- Regras e índices versionados, validações de proprietário e privilégio; administrador existente preservado com verificação de email.
- Painel consulta o mesmo histórico usado pelo app. Principais inserções de conteúdo externo foram escapadas ou passaram a usar listeners/texto.
- Promoção automática de nível e aumento automático de 2 kg retirados; cronômetro automático solicita confirmação física da série.
- Dependências essenciais servidas localmente; cache com versão por conteúdo e instalação atômica; build, verificação estática, testes e CI.
- Emulação completa de autenticação, banco, API e hospedagem, isolada no projeto `demo-fitapp`.

## Evidências

- `browser-validation.json`: fluxos em viewport móvel com serviços simulados, sem exceções.
- `offline-validation.json`: cache dos recursos essenciais e recarga sem rede usando os SDKs reais.
- `emulator-browser-validation.json`: autenticação, escrita no banco, função HTTP, recompensa e retomada offline integradas em emuladores reais.
- `gemini-validation.json`: geração real de um treino, validada pelo backend.
- Regras verificadas contra proprietário, outra conta, anônimo, administrador, alteração de proprietário e escrita indevida de pontos.
- Recompensa/fabricação concorrentes verificadas no Firestore emulado.
- Consultas `npm audit` do cliente e do servidor retornaram zero alertas após as atualizações. Isso não equivale a prova de ausência de vulnerabilidades.

## Produção

A sessão Firebase foi reautenticada pelo usuário. O banco foi confirmado como Standard, nativo, região `southamerica-east1`. As regras anteriores foram lidas e preservadas antes da alteração. A leitura confirmou que o ranking antigo permitia leitura autenticada dos perfis completos e que atualizações de treino não protegiam a imutabilidade de `userId`; as regras agora publicadas tratam esses dois pontos.

Publicação autorizada pelo usuário e concluída em 15/10/2026 no projeto `fitapp-operacional`: API Node.js 24 em `us-central1`, regras, índice e Hosting. Endereço: https://fitapp-operacional.web.app. Versão do aplicativo: `193be1b7ed58c253`.

A chave do segredo em produção foi comparada com a chave validada pela geração real, sem expor seu valor; elas coincidem. O índice necessário já existia e foi preservado. As regras ativas foram relidas e correspondem exatamente ao arquivo testado; evidência em `regras-publicadas-apos-correcao.json`.

Conferência pública concluída às 15:26 UTC: os 28 arquivos publicados correspondem byte a byte aos arquivos locais; cabeçalhos de proteção estão presentes; as três rotas da API recusam pedidos sem autenticação com HTTP 401. O navegador móvel abriu a tela de login, inicializou o projeto correto e o service worker sem exceções JavaScript. Evidências: `production-validation.json` e `production-validation.png`.

O fluxo com conta autenticada em produção ainda requer conferência pelo titular. Autenticação, salvamento, recompensas e retomada offline foram exercitados nos emuladores, sem criar contas ou registros artificiais no banco real. O manifesto de integridade da fonte e o diff da versão estão em `release-source-manifest.json` e `release-tracked-changes.patch`. Alterações locais ainda não foram commitadas nem enviadas ao GitHub.

## Limites mantidos explícitos

Paginação de histórico acima de 500 registros, conflito de campanhas em múltiplos dispositivos, exportação/exclusão integral, migração antecipada do ranking antigo, validação profissional de treinos e avaliação manual em dispositivos reais permanecem trabalho de uma etapa posterior. O fluxo central validado não é uma certificação de segurança ou treinamento físico.
