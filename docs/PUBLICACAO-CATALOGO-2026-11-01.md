# Publicação do catálogo e execução — 01/11/2026

Publicação autorizada explicitamente pelo usuário: “Autorizo publicar agora no aplicativo online, somente Hosting, preservando API, regras e índices.” Concluída em 01/11/2026 às 17h22min37s (America/Sao_Paulo), com verificação pública aprovada às 17h24. Nenhuma conta foi autenticada nem documento de usuário foi lido ou gravado.

## Escopo e versão

- Aplicativo: https://fitapp-operacional.web.app; projeto/site `fitapp-operacional`.
- Versão publicada: `45c2998d354451c6`.
- Comando executado: `firebase deploy --only hosting --project fitapp-operacional --non-interactive`.
- O predeploy reproduziu a versão aprovada e enviou 71 arquivos públicos. API, regras Firestore e índices ficaram fora da publicação.
- Catálogo: 129 IDs preservados, 122 movimentos de musculação revisados e sete retirados das novas escolhas. Legados continuam preservados; não houve migração ou reconstrução de fichas.
- Fontes: revisão `8b9a7a0d4c820a735065748a6069e340b53bdafb`, [PR #2](https://github.com/caiocborges88/fitapp-api/pull/2), com CI aprovado no run `41345407777`. Nenhum PR foi mesclado por esta publicação.

## Preparação e recuperação preservadas

O build e a verificação estática foram reproduzidos. Os fontes públicos estavam sem alterações em relação à revisão preparada. A versão online, release e regras foram reconferidas imediatamente antes do envio e correspondiam à preparação registrada em [PREPARACAO-PUBLICACAO-CATALOGO-2026-11-01.md](PREPARACAO-PUBLICACAO-CATALOGO-2026-11-01.md).

- Versão anterior: `8025f00c044b5983`.
- Hosting anterior: `projects/fitapp-operacional/sites/fitapp-operacional/versions/ee27c668d062eed5`.
- Release anterior: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793365047961000`.
- Regras preservadas: `projects/fitapp-operacional/rulesets/3e2e012b-664e-49c6-82e6-987f9808f77b`.
- Pacote anterior: `audit/release-simplificacao-8025f00c044b5983.zip`.
- Pacote publicado: `audit/release-catalogo-2026-11-01-45c2998d354451c6.zip`; manifesto: `audit/catalogo-2026-11-01-source-manifest.json`.

Os hashes dos dois pacotes foram conferidos; os 189 arquivos do snapshot foram verificados e todos os arquivos públicos coincidiram com os fontes locais antes do envio. Pacotes locais ignorados pelo Git, com lista permitida de fontes e sem ambiente/credenciais. A documentação de resultado é posterior à criação do pacote; os arquivos públicos publicados são os preservados no snapshot.

Em incidente, preservar armazenamento por conta, sessões, fila offline, fichas e histórico. Novas criações usam plano schema 3/receita 2, sessão 5 e contexto 2; o cliente anterior pode recusar esses formatos. Preferir correção compatível a partir dos fontes preservados. Uma recuperação de Hosting anterior não garante execução de fichas novas e precisa considerar os formatos já existentes. Não limpar dados nem reverter regras compatíveis. Nenhuma restauração foi realizada.

## Resultado verificado

- Hosting atual: `projects/fitapp-operacional/sites/fitapp-operacional/versions/3fdc1e12f05913e9`.
- Release atual: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793564557396000`.
- Versão pública `45c2998d354451c6`; 71 arquivos conferidos por SHA-256, iguais aos locais.
- Regras mantiveram o mesmo identificador e SHA-256 anteriores e continuam correspondendo ao arquivo local testado.
- Catálogo público confirmou 129 IDs únicos, 122 movimentos ativos/revisados e sete retirados. Entrada aeróbica permanece oculta/inativa.
- Os 15 recursos críticos estavam no cache, incluindo `execution-contract.js`; recarga offline aprovada.
- Login claro/escuro em viewport móvel simulado, cabeçalhos de segurança, largura e ausência de exceções aprovados. Capturas inspecionadas visualmente.
- Chamadas sem autenticação a `coach`, `importar-treino-ia` e `recompensas` receberam HTTP 401. Não houve autenticação de teste nem leitura/gravação de dados reais de treino.

Essas conferências públicas não representam execução autenticada em produção nem aparelhos físicos Android/iPhone. Os testes funcionais e de sincronização usam Firebase simulado ou `demo-fitapp`, conforme `audit/catalogo-validation-summary.json`.

Evidências desta publicação, separadas das anteriores: `audit/catalogo-live-2026-11-01-release-before.json`, `audit/catalogo-live-2026-11-01-release-after.json`, `audit/catalogo-live-2026-11-01-production-validation.json`, `audit/catalogo-live-2026-11-01-production-login-light.png`, `audit/catalogo-live-2026-11-01-production-login-dark.png` e `audit/catalogo-live-2026-11-01-release-validation.json`.

## Atualização no aplicativo

Concluir ou salvar a sessão aberta, fechar as abas/PWA e reabrir conectado, sem limpar os dados do navegador. Se a versão anterior continuar aparecendo, fechar e abrir novamente após a atualização do cache. Fichas antigas não são regeneradas: a convenção revisada só é capturada em novas escolhas ou por revisão explícita na sessão/edição. Quatro posições dos modelos continuam com uma única opção revisada.
