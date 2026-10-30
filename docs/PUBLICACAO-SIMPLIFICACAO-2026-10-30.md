# Publicação do fluxo simplificado — 30/10/2026

Publicação solicitada explicitamente pelo usuário depois da implementação e do envio ao GitHub. Concluída em 30/10/2026 às 09h57 (America/Sao_Paulo), com conferência pública aprovada. Somente Hosting; regras, API e índices preservados.

## Escopo autorizado

- Aplicativo: https://fitapp-operacional.web.app.
- Projeto/site: `fitapp-operacional`.
- Versão publicada: `8025f00c044b5983`, reproduzida pelo build antes de publicar.
- Somente Hosting. API, índices e regras Firestore não precisam ser publicados nesta etapa.
- As regras vigentes já correspondem ao arquivo local e aceitam ABC tradicional/sinergista, `padrao` e `trainingContext`.
- Nenhuma migração, autenticação de teste em produção ou gravação de dados reais de treino.
- Fontes da simplificação no [PR #1](https://github.com/caiocborges88/fitapp-api/pull/1), branch `codex/simplificar-fluxo-treino`, revisão `e63c8334d3c27fe3e927b899b6dba9f752b022e8`. O deploy não exige merge e não fará merge automaticamente.

## Validação preparada

Build reproduzido, check e verificação de whitespace aprovados. Os fontes públicos e configurações de produção não tinham alterações locais em relação à revisão aprovada. A implementação já foi validada com 121 testes completos emulados, sincronização/exportação entre dois navegadores, fluxo em um toque, editor, ambientes, prioridades, cobertura, acompanhamento, aparência, design e offline. Evidência consolidada: `audit/simplificacao-validation-summary.json`.

O verificador público foi ampliado para conferir os elementos do fluxo simplificado sem autenticar e os 14 recursos críticos do cache. Seu escopo de relatório é explícito para não confundir conferência de regras existentes com publicação de regras.

## Recuperação preservada antes de publicar

- Versão online anterior: `d2f51cd46fa4626c`.
- Hosting anterior: `projects/fitapp-operacional/sites/fitapp-operacional/versions/c7432b28991a5c24`.
- Release anterior: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793315181716000`.
- Regras vigentes preservadas: `projects/fitapp-operacional/rulesets/3e2e012b-664e-49c6-82e6-987f9808f77b`.
- Conteúdo das regras e metadados anteriores: `audit/simplificacao-release-before.json`.
- Snapshot anterior disponível: `audit/release-tracking-d2f51cd46fa4626c.zip`.
- Snapshot da versão preparada: `audit/release-simplificacao-8025f00c044b5983.zip`, com manifesto em `audit/simplificacao-source-manifest.json`; pacote local ignorado pelo Git, sem ambiente, credenciais ou dados dos usuários.

Em incidente, preservar armazenamento local, sessões, fila, fichas e histórico. Preferir correção compatível usando o snapshot. Se for necessário recuperar o Hosting anterior, usar o identificador acima ou gerar novamente a versão anterior a partir do snapshot preservado; conferir o escopo antes de qualquer restauração. A simplificação não mudou formatos de dados ou receitas. Manter as regras compatíveis que já aceitam `trainingContext` e os ABCs; não limpar dados nem reverter regras para tentar recuperar a interface. Nenhuma restauração faz parte desta publicação.

## Resultado confirmado

- Versão pública: `8025f00c044b5983`.
- Hosting: `projects/fitapp-operacional/sites/fitapp-operacional/versions/ee27c668d062eed5`.
- Release: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793365047961000`.
- Regras Firestore: `projects/fitapp-operacional/rulesets/3e2e012b-664e-49c6-82e6-987f9808f77b`; identificador e SHA-256 iguais aos preservados antes da publicação.
- Os 70 arquivos públicos correspondem aos locais por SHA-256. Cabeçalhos X-Content-Type-Options e X-Frame-Options aprovados.
- Login claro/escuro em viewport móvel simulado e elementos estruturais do fluxo simplificado aprovados, sem transbordamento horizontal ou exceções de navegador.
- Os 14 recursos críticos estavam no cache, incluindo os arquivos alterados do início direto; recarga offline aprovada.
- APIs protegidas recusaram chamadas sem autenticação com HTTP 401. Nenhuma conta foi autenticada para a conferência e nenhum documento de usuário foi lido ou gravado.
- API, regras e índices não publicados; nenhum teste físico Android/iPhone foi realizado.

Evidências separadas com `FITAPP_RELEASE_PREFIX=simplificacao`: `audit/simplificacao-release-before.json`, `audit/simplificacao-release-after.json`, `audit/simplificacao-source-manifest.json`, `audit/simplificacao-production-validation.json`, `audit/simplificacao-production-login-light.png`, `audit/simplificacao-production-login-dark.png` e `audit/simplificacao-release-validation.json`.

O predeploy reproduziu a versão validada `8025f00c044b5983` e publicou somente os 70 arquivos do Hosting. O pacote atual e o anterior foram conferidos por SHA-256 antes do envio. O [PR #1](https://github.com/caiocborges88/fitapp-api/pull/1) recebe o registro de preparação, resultado e recuperação; permanece sem merge. A publicação não transforma testes de navegador em conferência em aparelhos físicos.

## Atualização no aplicativo

Concluir e sincronizar qualquer sessão aberta. Fechar as abas/PWA e reabrir conectado, sem limpar dados do navegador. Se ainda aparecer a interface anterior, fechar e abrir novamente depois da atualização do cache. A nova tela destaca o próximo treino e Começar treino; edição fica em Ver exercícios e ajustar.
