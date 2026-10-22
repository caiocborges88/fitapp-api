# Plano de desenvolvimento do FitApp

## Direção atual — SaaS para acompanhamento profissional

Em 15/10/2026, o responsável ampliou a visão do FitApp: aplicativo do aluno conectado a um painel profissional, com evolução para SaaS. O primeiro segmento recomendado é personal trainers e seus alunos, com espaços separados por profissional/equipe, atribuições e compartilhamento explícito.

O plano estratégico vigente está em [docs/PLANO-SAAS.md](docs/PLANO-SAAS.md): fases 0–7, arquitetura proposta, permissões, métricas, critérios de avanço e migração. O diário de treino existente será preservado como base da experiência do aluno. As entregas abaixo registram a evolução dessa base; não significam que o SaaS já esteja implementado. O adiamento anterior do produto para treinadores foi substituído por esta nova direção explícita.

A próxima entrega é detalhar contratos, jornadas, permissões e métricas da fase 0, seguida das lacunas de segurança e gestão integral dos dados da fase 1.

## Regras de trabalho

- Cada entrega tem escopo, critérios de aceitação e evidências. Ideias novas entram no backlog antes de entrar no código.
- O fluxo de registro funciona sem IA e sem recompensas. Sessões, fichas e dados antigos são preservados.
- Desenvolvimento local com serviços de demonstração; testes antes de publicação. Nenhum teste cria registros artificiais em produção.
- Nova interface deve usar componentes, cores, espaçamentos e estados compartilhados, com acesso por teclado e movimento reduzido.
- Publicação tem versão por conteúdo e registro da validação. Aprovação de uma versão não é autorização permanente para publicar qualquer mudança posterior.

## Entrega 1 — confiança e nova base visual (implementada e validada localmente)

Escopo: identidade visual consistente no app e administração; entrada, navegação, fichas, execução, histórico, biblioteca, perfil e modais. Retirar desafio Snap e integrações fictícias; identidade da conta real; resumo após salvar; conquistas acessadas por escolha; salvar sessões curtas; segundos separados de repetições; nomes honestos para IA e referência anterior; indicação da fila de sincronização.

Aceitação: iniciar sem desafio; salvar treino parcial/curto; retomar série após recarga; isometria usa segundos no histórico e não entra no volume por repetições; nome corresponde à conta; opcionais não interrompem conclusão; telas sem rolagem horizontal no celular e utilizáveis no desktop; sem exceções JavaScript nos fluxos testados.

Estado em 15/10/2026: validação de domínio/API/regras/concorrência, navegador, integração em emuladores, interface nos dois temas e cache offline concluídos. A repaginação ainda não foi publicada. Evidências e limites em `audit/ENTREGA-1-2026-10-15.md`.

## Entrega 2 — editor e planos (implementada e validada localmente)

Unificar montagem manual, modelos e importação; distinguir ajuste do dia de edição do modelo; duplicação e ordenação; plano ativo editável; métodos avançados recolhidos; revisão do catálogo e critérios de comparação das métricas.

Aceitação: todos os caminhos chegam ao mesmo editor, edição explícita não altera histórico e nenhum parâmetro afirma personalização física não implementada.

Estado em 15/10/2026: editor compartilhado para cadastro manual, modelos e importação; modos de sessão/ficha/dia do plano; duplicação e ordenação; revisão estrutural de 85 exercícios; proteção do nome histórico para novos registros. 18 testes aprovados, mais navegador, editor, temas, integração e offline. Evidências e limites em `audit/ENTREGA-2-2026-10-15.md`. Publicação pendente de revisão humana; o novo campo opcional do histórico exige aplicar as regras atualizadas antes da hospedagem.

## Entrega 3 — continuidade entre dispositivos e gestão de dados

Versões/conflitos de ficha, exclusões sincronizadas, histórico paginado, exportação e exclusão integral, catálogo consistente entre servidor e cliente, backup e recuperação ensaiados.

Aceitação: exercício com dois dispositivos; exclusão não reaparece; histórico antigo acessível; exportação verificável e recuperação documentada.

Estado em 15/10/2026: parte 3A implementada e validada localmente: transações com recibos, preservação de conflitos, exclusões sincronizadas, paginação e exportação dos dados de treino, catálogo estrutural consistente. 23 testes aprovados; dois dispositivos, offline, editor, temas e integração verificados. Evidências: `audit/ENTREGA-3A-2026-10-15.md`. Sem publicação.

Parte 3B pendente: exclusão integral da conta com autenticação recente e bloqueio de escritas durante remoção; portabilidade dos documentos operacionais; importação/restauração com validação e prévia; ensaio de recuperação em ambiente separado; retenção de recibos e capacidade do modelo serializado. Exportar e ler JSON não conclui a recuperação operacional.

## Entrega 4 — piloto e decisões de expansão

Observar praticantes realizando tarefas, medir falhas de salvamento e sincronização, tempo até primeiro registro e uso espontâneo dos opcionais. Definir política de dados antes de instrumentação externa. Avaliar conquistas, acessibilidade e testes em iOS/Android reais.

Ranking, relógios e Strava continuam adiados até demanda, integração e operação definidas. O acompanhamento profissional passa a seguir as fases do plano SaaS vigente. Não apagar coleções existentes por retirar sua entrada da navegação.

## Critério de conclusão de uma entrega

Código e documentação coerentes; verificações estáticas; testes do domínio alterado; navegador móvel e desktop; integração com emuladores quando houver persistência; funcionamento offline quando afetado; registro explícito das limitações e validação humana antes da publicação.

Referência de decisões: `audit/REVISAO-FUNCIONAL-2026-10-15.md`. Não há estimativa de prazo fechada antes da primeira entrega e do piloto.

## Correção adicional — ambientes (15/10/2026)

Adaptação de Casa e Parque/praia aplicada também às fichas pessoais, com recursos explícitos, preservação do original e validação antes da execução. Catálogo ampliado para 91 exercícios. 26 testes aprovados e teste específico de interação, além das verificações de editor, temas e offline. Evidências e limites em `audit/AMBIENTES-2026-10-15.md`. Implementação local, sem nova publicação.
