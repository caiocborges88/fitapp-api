# Publicação da experiência móvel — 28/10/2026

O usuário autorizou atualizar o endereço oficial já utilizado. Publicação concluída em 28/10/2026 às 09h11 (America/Sao_Paulo).

## Versão entregue

- Endereço: https://fitapp-operacional.web.app.
- Versão da aplicação: `2ad39ed4993cf64c`.
- Projeto e site: `fitapp-operacional`.
- Escopo: somente Firebase Hosting. Banco, regras, índices e função/API existentes não foram publicados ou modificados.
- Versão do Hosting: `71132681fa84c5bb`.
- Release: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793189502329000`.

Inclui acesso rápido à ficha, revisão compacta, ações persistentes, salvar/iniciar, ambiente e equipamentos compartilhados, menus de organização e recuperação de rascunhos por conta. Contratos e limites em [EXPERIENCIA-MOVEL.md](EXPERIENCIA-MOVEL.md).

## Preservação e recuperação

- Versão anterior da aplicação: `81a8046d9b7d567e`.
- Versão anterior do Hosting: `87862b03e2223795`.
- Release anterior: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1792697589605000`.
- Referência Git antes da publicação: `644a1bf33ee2e40d466ea1d159ee54ac71b8e767`. A publicação ocorreu antes do registro Git. A pedido do usuário, código, documentação e evidências desta entrega foram reunidos no commit que contém este relatório.
- Snapshot do pacote preparado: `audit/release-mobile-2ad39ed4993cf64c.zip`, local e ignorado pelo Git. Inclui interface, scripts, testes, documentação e configurações selecionadas; não inclui arquivos de ambiente nem segredos.
- Metadados anteriores e posteriores: `audit/mobile-release-before.json` e `audit/mobile-release-after.json`.

A versão anterior do Hosting ficou registrada para recuperação. Qualquer reversão posterior deve preservar os dados e rascunhos dos usuários; esta entrega não realizou migração do banco.

## Verificação

Build repetido antes e durante a publicação: versão idêntica à preparada. Sintaxe/lint aprovados. A suíte local desta publicação teve 100 testes aprovados e dois dependentes de emulador ignorados; a execução completa da implementação, com Firestore emulado, teve 102 aprovados e nenhum ignorado. Regressões e evidências da implementação permanecem em `audit/mobile-flow-regressions.json`.

Após publicar, `node audit/verify-mobile-release-2026-10-28.cjs` confirmou:

- Os 58 arquivos públicos têm o mesmo SHA-256 dos arquivos locais.
- O endereço entrega a versão `2ad39ed4993cf64c` e os cabeçalhos esperados.
- As três rotas verificadas da API exigem autenticação (401).
- A tela de login inicia sem exceções em viewport móvel simulado; não houve autenticação de aluno.
- O cache contém os módulos novos de interface, equipamentos e rascunhos.
- A página recarrega offline sem erros JavaScript.
- Nenhum dado de treino foi gravado em produção pela verificação.

Relatório: `audit/mobile-release-validation-2026-10-28.json`. Imagem: `audit/mobile-release-login-2026-10-28.png`. A conferência em Android físico será realizada pelo usuário; a emulação não a substitui.

## Testar no Android

1. Concluir e sincronizar qualquer sessão em andamento antes de atualizar.
2. Abrir o endereço oficial no Chrome e recarregar a página conectado à internet.
3. Fechar as abas do FitApp e o aplicativo instalado, caso exista; reabrir para permitir a troca do cache pela nova versão. Não é necessário limpar dados do navegador.
4. Conferir acesso rápido, ajustes dos exercícios, teclado, salvar/iniciar e recuperação do rascunho após fechar/reabrir.

O endereço é o aplicativo real. Fichas e registros salvos pelo usuário permanecem vinculados à sua conta.
