# Publicação da versão de treinos — 22/10/2026

Atualização do endereço principal autorizada pelo usuário após solicitar registro e backup no Git.

## Backup anterior à publicação

- Repositório: https://github.com/caiocborges88/fitapp-api
- Commit da aplicação: `ccde07c7989bd0428df996d2a4ae0bfa3bd3f8e3`.
- Tag: `fitapp-2026-10-22-treinos`.
- Branch `main` e tag enviadas ao remoto antes do deploy. O envio foi um avanço normal, sem força e sem sobrescrever commits remotos.
- Credenciais locais, cache do Firebase e arquivos de extração integral dos documentos ficam fora do Git. Esses arquivos locais foram preservados.

## Publicação

- Endereço principal: https://fitapp-operacional.web.app
- Versão por conteúdo: `81a8046d9b7d567e`.
- Projeto: `fitapp-operacional`.
- Componentes: função `api` em `us-central1` e Firebase Hosting.
- Regras do Firestore comparadas antes da publicação e já iguais às locais; não foram republicadas. Nenhuma migração ou exclusão de dados foi realizada.

Inclui as correções de geração/persistência, catálogo sem bandas, somente bi-set complementar automático, retirada da geração de calistenia com preservação dos planos antigos, IA adiada na interface/API, revisão de fichas salvas, parâmetros/descanso explícitos e cobertura pelos movimentos reais.

## Verificações

- Build e sintaxe/lint aprovados.
- `firebase emulators:exec --only firestore --project demo-fitapp "npm test"`: 99 testes aprovados, sem falhas ou testes ignorados. As tentativas negadas nos testes de regras são parte das verificações de proteção.
- Deploy da função e do site concluído com sucesso.
- Verificação pública em `audit/production-validation.json`: versão esperada; 53 arquivos iguais ao conteúdo local; login visível; cache inicializado; nenhum erro JavaScript. As três rotas verificadas retornam 401 sem autenticação.
- A conferência móvel pública está registrada em `audit/mobile-production-validation.json`: manifesto de aplicativo, regras, índice do histórico, inicialização móvel simulada e recarga offline. Não substitui o teste em Android físico.

As conferências de produção não autenticam um aluno nem gravam treinos artificiais. Os percursos autenticados foram avaliados localmente; instalação e uso em aparelho físico devem ser conferidos pelo usuário.

## Abrir no Android

Concluir e sincronizar uma sessão em andamento antes de atualizar. Abrir o endereço principal no Chrome, recarregar a página e usar a opção de instalar/adicionar à tela inicial disponível no navegador. Para obter a atualização no aplicativo já instalado, fechá-lo e reabri-lo após o novo conteúdo ter sido carregado. Não é necessário Android Studio para esse teste do aplicativo web.
