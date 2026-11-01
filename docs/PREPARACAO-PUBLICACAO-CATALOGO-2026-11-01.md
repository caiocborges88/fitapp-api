# Preparação da publicação do catálogo — 01/11/2026

Preparação local após o pedido para avançar à próxima etapa. A publicação em produção depende de confirmação explícita desta revisão, conforme AGENTS.md. Este documento não registra um deploy concluído.

## Pacote preparado

- Destino proposto: https://fitapp-operacional.web.app, projeto/site `fitapp-operacional`.
- Versão candidata: `45c2998d354451c6`, reproduzida pelo build, com verificação estática aprovada.
- Fontes e contratos revisados no [PR #2](https://github.com/caiocborges88/fitapp-api/pull/2), empilhado sobre o PR #1. CI aprovado na revisão `0eaa359779af5d287b21e6c81f22398c51c9fa00` antes desta preparação documental/do verificador.
- Escopo proposto: somente Hosting. API, regras Firestore e índices permanecem publicados nas versões existentes. IDs/nomes de transporte foram preservados; os envelopes de dados existentes aceitam os metadados capturados, conforme a suíte emulada. Não há migração nem reconstrução de fichas antigas.
- Evidências funcionais: `audit/catalogo-validation-summary.json`. Foram 128 testes aprovados com emuladores, além de navegador, sincronização/exportação, temas e offline; não representam aparelhos físicos.

## Estado anterior preservado

A inspeção somente de leitura confirmou a versão online `8025f00c044b5983`, Hosting `projects/fitapp-operacional/sites/fitapp-operacional/versions/ee27c668d062eed5` e release `projects/fitapp-operacional/sites/fitapp-operacional/channels/live/releases/1793365047961000`.

As regras vigentes são `projects/fitapp-operacional/rulesets/3e2e012b-664e-49c6-82e6-987f9808f77b` e correspondem ao arquivo local. Identificadores e regras estão em `audit/catalogo-2026-11-01-release-before.json`, sem leitura ou gravação de documentos de usuários.

O pacote anterior está em `audit/release-simplificacao-8025f00c044b5983.zip`. O candidato fica em `audit/release-catalogo-2026-11-01-45c2998d354451c6.zip`, com hashes no manifesto `audit/catalogo-2026-11-01-source-manifest.json`. Os pacotes permanecem locais e ignorados pelo Git; usam a lista permitida do script de snapshot, sem ambiente/credenciais.

## Conferência após autorização

Antes do envio, reconferir a revisão, a versão e o estado remoto caso tenha mudado desde esta preparação. Publicar somente Hosting, sem merge automático dos PRs. Depois conferir versão, hashes de todos os arquivos públicos, regras preservadas, login claro/escuro e offline, sem autenticar contas nem gravar dados de treino.

O verificador `scripts/verify-models-production.cjs` recebeu a opção `FITAPP_RELEASE_EXPECT_EXECUTION=1`: exige 129 IDs únicos, 122 movimentos ativos/revisados, sete retirados, entrada aeróbica oculta/inativa e cache de `execution-contract.js`. Manter também `FITAPP_RELEASE_EXPECT_SIMPLE_FLOW=1`, `FITAPP_RELEASE_PREFIX=catalogo-2026-11-01` e escopo explícito de Hosting. A verificação pública desta versão só deve rodar após a publicação autorizada; ainda não foi declarada aprovada.

## Recuperação e atualização

Novas criações usam plano schema 3/receita 2 e sessão 5. Um Hosting anterior pode recusar esses dados; recuperar o binário antigo não garante que fichas novas sejam executáveis. Preferir correção compatível a partir do snapshot, preservando contas, sessões, fila, fichas e histórico. Não limpar armazenamento nem reverter regras compatíveis para tentar recuperar a interface. Qualquer restauração deve ser avaliada pelo formato dos dados que já existirem.

Após publicação confirmada, orientar a atualização da PWA sem limpar dados: concluir/salvar a sessão aberta, fechar as abas e reabrir conectado. Registrar resultado, nova release e limites em documento de publicação separado, atualizar README/AGENTS e anexar as evidências públicas. A preparação atual não modifica o aplicativo online.
