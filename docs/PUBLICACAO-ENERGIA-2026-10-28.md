# Publicação da identidade Energia — 28/10/2026

O usuário autorizou a publicação, a atualização do GitHub e do AGENTS.md. Preparação da publicação de Hosting em andamento.

## Pacote preparado

- Aplicativo: `https://fitapp-operacional.web.app`.
- Versão preparada: `609fa6af6364615e`.
- Escopo: somente Firebase Hosting. API, banco, regras e índices não fazem parte desta publicação.
- Base Git anterior à identidade: `c759513d0de77c1b3ab20c258d3ae7009df70c59`.
- Versão anterior: `2ad39ed4993cf64c`; Hosting `71132681fa84c5bb`.
- Metadados anteriores: `audit/energy-hosting-before.json`.
- Snapshot local ignorado pelo Git: `audit/release-energy-609fa6af6364615e.zip`, sem arquivos de ambiente ou segredos.
- Hashes SHA-256 do pacote: `audit/energy-source-manifest.json`.

## Validação anterior

Build reproduziu a versão preparada. A entrega foi validada com 102 testes e nenhum ignorado em Firestore emulado, 16 combinações de tamanho/tema/efeitos, regressões de editor/ambientes/prioridades/cobertura, sincronização e integração com recompensas em `demo-fitapp`, além de offline. Evidências em `audit/energy-release.json` e [IDENTIDADE-ENERGIA.md](IDENTIDADE-ENERGIA.md).

A conferência em Android/iPhone físicos continua pendente; a autorização de publicação não equivale a essa conferência.

## Recuperação e atualização

Preservar o snapshot Git e a versão anterior do Hosting. Em uma recuperação, restaurar o Hosting anterior mantendo os dados locais, inclusive rascunhos e preferências. Esta mudança não exige migração do banco.

Para assumir a nova versão, concluir e sincronizar a sessão em andamento, fechar as abas e a PWA e reabrir conectado à internet. Não limpar os dados do navegador. Tema e efeitos ficam em Perfil, separados por conta/dispositivo.
