# Publicação de cobertura e acompanhamento — 29/10/2026

Publicação solicitada explicitamente pelo usuário após a implementação e validação local. Concluída em 29/10/2026 às 20h06 (America/Sao_Paulo), com conferência pública aprovada.

## Resultado confirmado

- Aplicativo: https://fitapp-operacional.web.app.
- Versão pública: `d2f51cd46fa4626c`.
- Hosting: `projects/fitapp-operacional/sites/fitapp-operacional/versions/c7432b28991a5c24`.
- Release: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793315181716000`.
- Regras Firestore: `projects/fitapp-operacional/rulesets/3e2e012b-664e-49c6-82e6-987f9808f77b`; leitura posterior idêntica ao arquivo testado.
- Os 70 arquivos públicos correspondem aos arquivos locais por SHA-256; cabeçalhos de segurança aprovados.
- Login claro/escuro em viewport móvel simulado, sem transbordamento horizontal ou exceções de navegador.
- Oito recursos críticos, incluindo os quatro módulos novos, presentes no cache; recarga offline aprovada.
- APIs protegidas recusaram chamadas sem autenticação com HTTP 401. Nenhuma conta foi autenticada e nenhum documento de usuário foi lido ou gravado para a conferência.
- API e índices não publicados; nenhum teste físico Android/iPhone foi realizado.

Evidências: `audit/tracking-production-validation.json`, `audit/tracking-production-login-light.png`, `audit/tracking-production-login-dark.png`, `audit/tracking-release-before.json`, `audit/tracking-release-rules.json` e `audit/tracking-release-after.json`.

A primeira tentativa do Hosting foi interrompida antes do envio por falha local do Windows ao abrir `public/sw.js`. O build foi repetido com sucesso e reproduziu a versão validada; a segunda publicação também executou o predeploy com sucesso. O aplicativo anterior permaneceu publicado durante essa interrupção, com as regras novas retrocompatíveis. Não houve restauração, alteração manual de arquivos gerados ou troca de versão para contornar a falha.

## Escopo

Versão publicada: `d2f51cd46fa4626c`. Somente regras Firestore e Hosting, nessa ordem. API, índices e documentos dos usuários não precisam de publicação, migração ou alteração. As regras acrescentam apenas o campo opcional `trainingContext`, limitado a 90.000 caracteres, preservando propriedade e imutabilidade.

Os contratos e limites estão em [COBERTURA-E-ACOMPANHAMENTO.md](COBERTURA-E-ACOMPANHAMENTO.md). As receitas e fichas salvas permanecem preservadas. Contexto inicial começa nas novas sessões; o histórico antigo não é reconstruído com a ficha atual. Inclusão de novas ênfases e ampliação de alternativas continuam pendentes de revisão de conteúdo.

## Validação preparada

Os 13 arquivos conferidos por SHA-256 correspondem aos fontes aprovados em `audit/training-tracking-validation.json`. Build, sintaxe/lint e verificações de navegador aprovados. A suíte emulada aprovou 121 testes, sem ignorados; o contexto chegou a outro dispositivo e permaneceu na exportação JSON. Aparência, design, editor, ambientes, prioridades, cobertura, fluxo móvel e offline foram conferidos com dados fictícios. Esses testes não representam aparelhos físicos ou autenticação/gravação de dados em produção.

Ferramentas de release aceitam `FITAPP_RELEASE_PREFIX=tracking`, mantendo separadas as evidências da publicação ABC anterior. Nenhum commit ou envio ao GitHub faz parte deste procedimento.

## Recuperação preservada antes de publicar

- Versão online anterior: `d302b4122ec4945c`.
- Hosting anterior: `projects/fitapp-operacional/sites/fitapp-operacional/versions/e66aa3efd5da4504`.
- Release anterior: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793303700182000`.
- Regras anteriores: `projects/fitapp-operacional/rulesets/2dcc1a4b-a410-48a5-91f5-7bc54eb02cae`, com conteúdo preservado em `audit/tracking-release-before.json`.
- Snapshot preparado: `audit/release-tracking-d2f51cd46fa4626c.zip`, com 178 arquivos e hashes em `audit/tracking-source-manifest.json`. Usa lista permitida e exclui ambiente, credenciais, dependências e dados dos usuários; arquivo ignorado pelo Git.
- Snapshot da versão anterior: `audit/release-abc-d302b4122ec4945c.zip`, com hash registrado no novo manifesto.

Em incidente, preservar dados locais, sessões, fila e histórico. Preferir correção compatível a partir do snapshot. Se for necessário recuperar temporariamente o Hosting anterior, usar a versão preservada e coordenar o encerramento das sessões; o cliente anterior pode perder o contexto inicial ao retomar um estado ativo novo. Manter regras que aceitem `trainingContext` enquanto existirem registros nesse formato. Não limpar armazenamento, converter fichas, apagar contextos ou reaplicar regras antigas indiscriminadamente. Nenhuma restauração faz parte desta publicação.

## Atualização no aplicativo

Concluir e sincronizar qualquer sessão aberta. Fechar as abas/PWA e reabrir conectado, sem limpar os dados do navegador. Se a versão anterior ainda aparecer, fechar e abrir novamente após a atualização do cache. O acompanhamento fica em **Histórico e evolução**; a proposta de cobertura fica na revisão da ficha. Comparações detalhadas aparecem para novas sessões com planejamento inicial preservado.
