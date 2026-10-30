# Publicação dos novos modelos ABC — 29/10/2026

O usuário autorizou explicitamente a publicação no aplicativo online e a atualização do `AGENTS.md`. O código já estava integrado ao projeto original, na branch `main`; não foi criado um worktree separado.

## Resultado

- Aplicativo: https://fitapp-operacional.web.app.
- Versão pública: `d302b4122ec4945c`.
- Publicação do Hosting: 29/10/2026 às 16h55 (America/Sao_Paulo).
- Hosting: `projects/fitapp-operacional/sites/fitapp-operacional/versions/e66aa3efd5da4504`.
- Release: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793303700182000`.
- Regras Firestore: `projects/fitapp-operacional/rulesets/2dcc1a4b-a410-48a5-91f5-7bc54eb02cae`.
- Escopo publicado: **regras Firestore e Hosting**, nessa ordem. API, índices e dados dos usuários não foram publicados, migrados ou alterados pelos procedimentos de verificação.

As regras públicas anteriores foram comparadas com a base Git e correspondiam integralmente, antes da alteração. O deploy compilou e publicou somente `firestore:rules`; a leitura posterior confirmou igualdade com o arquivo testado. Somente depois foi publicado o Hosting. O predeploy reproduziu a mesma versão da aplicação.

## Fontes e validação

As receitas e os contratos estão em [NOVOS-MODELOS-ABC.md](NOVOS-MODELOS-ABC.md). O `AGENTS.md` foi atualizado com modelos fixos, parâmetros por bloco, compatibilidade de níveis antigos, core distribuído, opcionais, registro por lado, sequência contínua, revisão trimestral, metadados versionados e ordem de publicação.

Build, sintaxe/lint e testes locais foram reconfirmados. A suíte emulada anterior aprovou 111 testes, sem ignorados, com Firestore de demonstração; a reconferência local aprovou 109 e ignorou os dois que dependem do emulador. Sete cenários específicos de navegador incluem retomada autenticada offline e falha de armazenamento. Também foram aprovados aparência em 16 combinações, interface em quatro combinações de tema/tamanho, editor, ambientes, prioridades, cobertura, fluxo móvel e sincronização entre dois dispositivos emulados.

Verificação pública concluída por `node scripts/verify-models-production.cjs`:

- 66 arquivos públicos correspondem aos fontes locais por SHA-256.
- Versão pública igual à preparada; cabeçalhos de segurança conferidos.
- APIs coach, importação e recompensas recusam solicitações sem autenticação com HTTP 401.
- Login visível nos temas claro e escuro, sem transbordamento horizontal em viewport móvel simulado.
- Módulos dos novos modelos, controles e estilos disponíveis no cache.
- Recarga offline inicia sem exceções e mantém o login.
- Nenhuma conta foi autenticada e nenhum dado de treino foi gravado em produção.

Evidências: `audit/abc-production-validation.json`, `audit/abc-production-login-light.png`, `audit/abc-production-login-dark.png`, `audit/abc-release-before.json`, `audit/abc-release-rules.json` e `audit/abc-release-after.json`. Regras e metadados foram consultados sem ler documentos dos usuários. Os testes em Android/iPhone físicos e a validação profissional da prescrição continuam pendentes.

## Snapshot e versão anterior

- Versão anterior: `609fa6af6364615e`.
- Hosting anterior: `projects/fitapp-operacional/sites/fitapp-operacional/versions/a5fdb574d93f22c3`.
- Release anterior: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793194320178000`.
- Regras anteriores: `projects/fitapp-operacional/rulesets/c3f32363-9552-4af4-894a-c70739c7efa6`.
- Conteúdo anterior das regras: `audit/abc-release-before.json`.
- Pacote recuperável preparado antes de publicar: `audit/release-abc-d302b4122ec4945c.zip`, ignorado pelo Git, com 170 arquivos de fontes/configuração e publicação. A lista permitida exclui arquivos de ambiente, segredos, credenciais, dependências e dados de usuários.
- Manifesto de arquivos e hashes: `audit/abc-source-manifest.json`.
- O pacote anterior `audit/release-energy-609fa6af6364615e.zip` também permanece disponível, com SHA-256 registrado no manifesto.

Não houve commit ou envio ao GitHub nesta publicação; fontes e documentação permanecem no checkout original e no snapshot local.

## Recuperação

Preservar as versões do Hosting e os pacotes acima. Em incidente, manter os dados e as filas dos dispositivos; não limpar armazenamento, converter fichas ou apagar modelos novos. A preferência é publicar uma correção compatível a partir do snapshot dos novos modelos.

Uma recuperação temporária do Hosting anterior deve usar a versão preservada `a5fdb574d93f22c3` e ser coordenada com as sessões abertas. O cliente anterior pode não interpretar métodos, descansos e metadados novos. Por isso, a restauração do Hosting isoladamente não equivale a uma recuperação integral do novo sistema.

Manter as regras que aceitam os modelos novos enquanto houver dados nesse formato. O código das regras anteriores está preservado para comparação e recuperação controlada; reaplicá-lo sem considerar fichas novas pode impedir sua sincronização. Nenhuma restauração foi executada durante esta entrega.

## Atualização no aplicativo

Concluir e sincronizar qualquer sessão em andamento, fechar as abas/PWA e reabrir conectado. Não limpar os dados do navegador. As fichas antigas continuam preservadas. Para adotar os novos modelos, abrir **Meus treinos → Usar um modelo**, escolher ABC tradicional ou ABC sinergista e revisar o ciclo antes de salvar.
