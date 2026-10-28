# Publicação da identidade Energia — 28/10/2026

O usuário autorizou a publicação, a atualização do GitHub e do AGENTS.md. Publicação concluída em 28/10/2026 às 10h32 (America/Sao_Paulo).

## Versão publicada

- Aplicativo: `https://fitapp-operacional.web.app`.
- Versão da aplicação: `609fa6af6364615e`.
- Hosting: `a5fdb574d93f22c3`.
- Release: `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793194320178000`.
- Escopo: somente Firebase Hosting. API, banco, regras e índices não foram publicados ou modificados.
- Código e instruções enviados ao GitHub no commit `132b88a43cd112775e3ab794ecf478503c5e9899`.
- Tags de recuperação enviadas: `fitapp-2026-10-28-antes-energia` e `fitapp-2026-10-28-energia`.
- Metadados posteriores: `audit/energy-hosting-after.json`.
- Base Git anterior à identidade: `c759513d0de77c1b3ab20c258d3ae7009df70c59`.
- Versão anterior: `2ad39ed4993cf64c`; Hosting `71132681fa84c5bb`.
- Metadados anteriores: `audit/energy-hosting-before.json`.
- Snapshot local ignorado pelo Git: `audit/release-energy-609fa6af6364615e.zip`, sem arquivos de ambiente ou segredos.
- Hashes SHA-256 do pacote: `audit/energy-source-manifest.json`.

## Validação anterior

Build reproduziu a versão preparada. A entrega foi validada com 102 testes e nenhum ignorado em Firestore emulado, 16 combinações de tamanho/tema/efeitos, regressões de editor/ambientes/prioridades/cobertura, sincronização e integração com recompensas em `demo-fitapp`, além de offline. Evidências em `audit/energy-release.json` e [IDENTIDADE-ENERGIA.md](IDENTIDADE-ENERGIA.md).

A conferência em Android/iPhone físicos continua pendente; a autorização de publicação não equivale a essa conferência.

## Verificação pública

Após a publicação, `node audit/verify-energy-production.cjs` confirmou os 64 arquivos públicos por SHA-256, versão correta, cabeçalhos esperados, três rotas de API protegidas por autenticação (401), login nos dois temas em viewport móvel simulado, recursos novos no cache e recarga offline sem exceções. Nenhum aluno foi autenticado e nenhum dado de treino foi gravado em produção.

Relatório: `audit/energy-production-validation.json`. Capturas: `audit/energy-production-login-light.png` e `audit/energy-production-login-dark.png`. Android/iPhone físicos continuam pendentes.

O `AGENTS.md` foi atualizado com a direção ciano/violeta, tokens de ação separados dos links, aparência local por conta, redução de movimento em CSS/JS/gráficos, uso de ilustrações locais, geração de ícones, testes de aparência e procedimentos de publicação/recuperação.

## Recuperação e atualização

Preservar o snapshot Git e a versão anterior do Hosting. Em uma recuperação, restaurar o Hosting anterior mantendo os dados locais, inclusive rascunhos e preferências. Esta mudança não exige migração do banco.

Para assumir a nova versão, concluir e sincronizar a sessão em andamento, fechar as abas e a PWA e reabrir conectado à internet. Não limpar os dados do navegador. Tema e efeitos ficam em Perfil, separados por conta/dispositivo.
