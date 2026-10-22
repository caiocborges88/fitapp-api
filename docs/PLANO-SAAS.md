# FitApp — plano de evolução para SaaS profissional

Data: 15/10/2026. Estado: direção proposta e registrada após solicitação do responsável. Este documento orienta as próximas entregas; não significa que a arquitetura descrita já foi implementada ou publicada.

## 1. Produto e primeiro mercado

O FitApp passa a ter duas experiências conectadas: aplicativo do aluno para executar e registrar treinos; painel profissional para planejar, acompanhar, avaliar e ajustar o acompanhamento. A operação da plataforma terá uma área separada da operação dos clientes.

Primeiro segmento recomendado: personal trainers que acompanham praticantes de academia, incluindo treinos adaptados para casa e parque. Cada profissional independente começa com seu próprio espaço de trabalho. Equipes e academias podem compartilhar um espaço com permissões explícitas. Especialidades adicionais exigem seus próprios fluxos e campos.

A primeira versão comercial deve permitir concluir o ciclo convite → aceite → plano publicado → execução → evolução → revisão pelo profissional. Recursos adicionais entram conforme necessidade observada e contrato de dados definido.

### Situação atual

Existe um diário de treino com interface reformulada, editor, sincronização, exportação dos dados de treino e adaptação por recursos do ambiente. As últimas mudanças foram validadas localmente com 26 testes e verificações de navegador. Não há nova publicação dessas entregas.

O painel administrativo atual, a claim global de treinador e os vínculos legados não constituem um SaaS com isolamento entre organizações. A exceção de administração baseada em email não será o mecanismo da versão comercial. A exportação atual não cobre toda a conta e a recuperação completa ainda não foi ensaiada.

## 2. Decisões de arquitetura

| Componente | Direção recomendada | Motivo e limite |
|---|---|---|
| Painel profissional | React + TypeScript, responsivo, usando o sistema visual do FitApp | Nova interface com componentes reutilizáveis, navegação, tabelas, formulários e gráficos testáveis. Não exige reescrever imediatamente o app existente. |
| Aplicativo do aluno | Preservar a base atual; separar domínio e acesso a dados e adotar TypeScript gradualmente | Manter o registro funcionando durante a evolução. Android com Capacitor na fase própria. |
| Backend | Node.js/TypeScript; módulos de contas, vínculos, planos, registros, métricas e cobrança | Começar com um backend modular implantável em conjunto nas Functions existentes. Extração de serviços depende de gargalo demonstrado. |
| Identidade | Firebase Authentication; associação e permissões consultadas por contexto | Uma conta pode ser aluno e profissional em espaços diferentes. Login não concede acesso a todos os alunos. |
| Dados iniciais | Firestore, com documentos estruturados, índices e consultas delimitadas | Reutilizar infraestrutura. Substituir os grandes JSONs de planos/fichas gradualmente; evitar um documento que concentre toda a empresa. |
| Arquivos | Storage privado com metadados de proprietário, contexto e autorização | Fotos e anexos entram quando houver necessidade comprovada e política de tratamento definida. Sem URLs públicas permanentes para documentos privados. |
| Métricas | Projeções por aluno, período e espaço de trabalho; processamento idempotente | Não baixar todo o histórico de todos os alunos para montar o painel. Exibir atualização e permitir rastrear a origem. |
| Organização do código | Monorepositório com apps e bibliotecas compartilhadas de domínio, contratos e componentes | Separar responsabilidades e reaproveitar validações sem copiar regras entre interfaces. |
| Operação | Desenvolvimento, homologação e produção separados; CI; logs sem conteúdo sensível; backups e restauração ensaiada | Publicações e migrações precisam ter evidências e recuperação compatível. |

React, TypeScript e Capacitor são escolhas propostas, não dependências instaladas nesta etapa. Manter Firestore é uma decisão inicial condicionada aos padrões de consulta, custo e testes de carga. Consultas relacionais e relatórios que se mostrarem inadequados devem motivar uma decisão documentada sobre PostgreSQL ou armazenamento analítico; não manter dois bancos transacionais por antecipação.

## 3. Isolamento dos clientes e governança

Espaço de trabalho significa o cliente do SaaS: um profissional independente, equipe ou academia. Seu identificador é um contexto de autorização, não um parâmetro em que o servidor confia por estar no formulário.

### Papéis iniciais

| Papel | Escopo |
|---|---|
| Proprietário do espaço | Equipe, configurações e assinatura; acesso a dados de acompanhamento depende das permissões concedidas ao papel. |
| Profissional | Alunos atribuídos, seus planos e registros compartilhados; acesso conforme vínculo e escopo do trabalho. |
| Assistente administrativo | Convites e tarefas administrativas previstas, sem acesso automático a anamnese, medidas ou fotos. |
| Aluno | Seus registros e planos, campos de autorrelato e controle dos vínculos e compartilhamentos disponíveis. |
| Operação da plataforma | Gestão técnica; acesso a conteúdo privado excepcional, temporário, justificado e auditado. |

O aluno aceita o vínculo e a abrangência do compartilhamento. O profissional não ganha acesso automático ao histórico pessoal anterior ou a registros de outro espaço. Compartilhar o mesmo aluno com dois profissionais não compartilha entre eles notas internas, anexos ou avaliações de cada acompanhamento.

Direção de modelagem: identidade e diário pessoal têm contexto privado do aluno; acompanhamentos, atribuições, planos publicados, avaliações e notas profissionais têm contexto do espaço. Registros do app possuem origem, plano/versionamento e contexto explícitos. Compartilhamentos são concessões verificáveis com escopo, datas e estado. Evitar cópias independentes do mesmo treino como se fossem fatos distintos.

Antes de implementar o esquema, definir quais registros são privados, quais pertencem ao acompanhamento e como são referenciados/exportados. Contratos de retenção, encerramento de vínculo e exclusão de conta precisam ser definidos com revisão apropriada. Permissão de compartilhamento no produto não substitui a definição da base legal do tratamento.

## 4. Segurança como requisito de entrega

- Acesso negado por padrão; verificar conta, espaço, associação ativa, atribuição do aluno e ação permitida. Testar também API direta, tentativas de alterar identificadores e consultas/listagens.
- A associação é administrada por fluxos autorizados. Clientes não podem atribuir a si mesmos papéis ou assinaturas. Convites têm destinatário, expiração, aceite e uso controlado.
- Consultar a autorização no servidor nas operações privilegiadas: o Admin SDK não está protegido pelas regras do Firestore. IAM de menor privilégio e testes de autorização são necessários também no backend.
- Substituir a exceção de email administrativo por concessões explícitas e auditadas, com migração que preserve o acesso legítimo do responsável.
- Autenticação reforçada e segundo fator para profissionais/administradores, com recuperação de acesso planejada; autenticação recente para ações sensíveis.
- App Check como proteção complementar, implantado com observação e testes antes de exigir tokens; não substitui autorização, validação ou limites de consumo.
- Cotas por conta e espaço, validação de entradas/arquivos, proteção de segredos e trilha de auditoria. Logs registram ação e referências necessárias, evitando respostas completas de anamnese e outros conteúdos privados.
- Histórico das alterações profissionais: autor, data, versão, justificativa quando necessária. Prescrição publicada e sessão concluída não são sobrescritas silenciosamente.
- Revogação bloqueia novas consultas autorizadas e limpa caches sob controle do app. Não prometer apagar remotamente arquivos já exportados ou garantir revogação instantânea de uma cópia offline. O painel profissional deve limitar o cache de conteúdo sensível.
- Exportação e exclusão integral têm inventário de dados e processamento repetível, com estado visível e bloqueio de gravações conflitantes. Backups têm retenção, controles de acesso e ensaio de recuperação.
- Escopo de tratamento de saúde, privacidade, retenção e responsabilidades dos envolvidos deve ser revisado antes do uso comercial. Não coletar medidas, imagens ou condições apenas porque cabem no formulário.

## 5. Painel que sustenta o trabalho profissional

### Visão da carteira

Lista de alunos com busca, filtros, status do vínculo, plano atual, execução recente e pendências de revisão. Indicadores de adesão usam programação real, distinguindo treino não programado de treino perdido. Alertas exibem o critério e a data que os originaram.

### Visão individual

- Objetivos, contexto e informações iniciais necessárias ao acompanhamento, com origem e data de atualização.
- Calendário planejado versus realizado; histórico por período; detalhes de séries, repetições, segundos, carga e duração.
- Evolução por exercício e versão: maior carga, repetições comparáveis e volume registrado. Peso corporal e isometrias não entram automaticamente em tonelagem como se fossem carga externa.
- Distribuição de séries por grupo muscular, adesão e consistência, com período e cobertura explícitos.
- Check-ins de esforço percebido, recuperação e desconforto, quando definidos pelo profissional; distinguir autorrelato de avaliação.
- Medidas e avaliações ao longo do tempo, quando necessárias: unidade, método, responsável, data e observações. Fotografias somente com fluxo próprio de acesso e tratamento.
- Comparação entre períodos, linha do tempo, anotações profissionais e relatório exportável com o período e a origem dos dados.

### Ação profissional

Montar planos e modelos, publicar uma versão para o aluno, programar revisão, analisar execução e dar devolutiva. Uma alteração do profissional não muda os dados históricos registrados nem elimina o ajuste local de uma sessão sem resolver conflito.

O painel será responsivo: gráficos e listas usam seleção de período, resumo inicial e detalhamento sob demanda. Tabelas extensas não são apenas reduzidas até caber no celular.

### Contrato de cada métrica

Documentar nome, fórmula, unidade, origem, intervalo de tempo/fuso, critérios de inclusão, efeito de exclusões/correções e limitações. Mostrar dado ausente como ausente; estimativas recebem identificação. Não apresentar volume registrado como diagnóstico, ganho muscular ou calorias medidas.

Projeções precisam ser reconstruíveis a partir de registros autorizados. Reprocessar ou receber o mesmo evento duas vezes não altera o resultado. Exclusões/correções devem atualizar a projeção e sua versão de cálculo. O teste compara o resultado agregado com uma amostra conhecida de fatos.

## 6. Fases e critérios para avançar

| Fase | Entrega | Critério de saída |
|---|---|---|
| 0 — Contratos do produto | Jornadas de aluno/profissional, primeiro segmento, matriz de permissões, inventário de dados e dicionário de métricas | Fluxos, entidades, limites do MVP e cenários de aceite revisáveis antes de implementar o novo painel. Este documento inicia a fase; não fecha todos os contratos. |
| 1 — Base confiável | Concluir gestão integral dos dados, recuperação, ambientes separados, auditoria e revisão de privilégios | Exportação/exclusão completas verificadas em homologação; restauração ensaiada; dados atuais preservados; nenhuma pendência crítica de segurança. |
| 2 — Núcleo SaaS | Espaços, papéis, convites, atribuições, aceite/encerramento de vínculo e migração para dados estruturados | Dois espaços testados: nenhum acesso cruzado; um aluno em dois vínculos sem vazamento; revogação verificada no cliente e API. |
| 3 — Painel profissional inicial | Carteira de alunos, plano versionado, acompanhamento individual, métricas básicas, check-ins e revisão | Um profissional conclui convite → plano → execução → análise → ajuste com dados rastreáveis e interface móvel/desktop. |
| 4 — Piloto acompanhado | Uso com pequeno grupo de profissionais e alunos; medir falhas, tempo das tarefas, cobertura e custos | Critérios de sucesso definidos antes do piloto; problema recorrente identificado é corrigido e retestado; necessidade das funções confirmada por uso real. |
| 5 — Android | Capacitor, login adaptado, persistência, retomada, avisos e compartilhamento nativos | Registro e recuperação passam com tela bloqueada, troca de app, perda de rede e encerramento do processo; conformidade da distribuição revisada. |
| 6 — SaaS comercial | Planos, limites, assinatura, onboarding, suporte, termos/políticas e operação de cobrança | Eventos de pagamento repetidos ou fora de ordem não concedem acesso indevido; cancelamento e inadimplência têm comportamento definido; dados continuam exportáveis. |
| 7 — Escala e integrações | Carga representativa, otimização, relatórios avançados e integrações priorizadas por demanda | Metas de latência, disponibilidade, recuperação e custo por cliente atendidas em testes e operação; novas integrações têm permissões e contratos próprios. |

Preparar componentes para Android começa antes da fase 5; construir notificações e integrações nativas não deve atrasar a validação do acompanhamento profissional. Não é preciso terminar todas as funções futuras para ter um piloto utilizável.

## 7. Migração e escalabilidade

- Inventariar o legado; gerar cópia de segurança; criar versões de esquema e ferramentas repetíveis; simular a migração em homologação e comparar contagens, IDs e métricas.
- Migração gradual e reversível por contas/espaços. Evitar duas fontes de verdade concorrentes. Durante uma transição, definir qual versão aceita escrita e como clientes antigos são tratados.
- Separar fichas, versões publicadas, sessões, avaliações, vínculos e projeções em documentos apropriados. Evitar arrays crescentes de alunos ou histórico dentro de um único documento.
- Índices e paginação definidos pelas telas. Atualização em tempo real apenas para o contexto necessário. Painel da carteira usa resumos, não listeners sobre todos os históricos.
- Processamento de relatórios e tarefas pesadas fora do pedido interativo; operações idempotentes com reprocessamento e fila de falhas quando aplicável.
- Medir leituras/escritas, armazenamento, tempo de API, custo por espaço, fila pendente e taxa de erros. Alertas de orçamento são avisos; limites de produto e quotas são mecanismos separados de controle.
- Definir metas de carga, disponibilidade, tempo/perda aceitável na recuperação e custo antes do teste. Não prometer capacidade ilimitada por utilizar serviços gerenciados.

## 8. Expansões posteriores

Health Connect, Wear OS, GPS, nutrição, automações complexas, white-label e análises avançadas dependem de demanda e do escopo profissional. IA auxilia elaboração e resumo com revisão humana e limites de custo; não faz diagnóstico nem substitui decisão profissional. Rankings e conquistas não determinam o progresso clínico ou físico do aluno.

## 9. Próxima entrega concreta

Detalhar a fase 0 em artefatos de implementação: matriz de permissões com casos negativos; modelo de vínculo e compartilhamento; inventário/exportação/exclusão; seis jornadas principais; dicionário inicial de métricas; mapa de telas do painel; desenho de migração dos dados existentes. Em seguida, concluir as lacunas de base da fase 1. Não começar o painel pela construção de gráficos desconectados desses contratos.

## Referências técnicas consultadas

- [Controle por papéis e limites do Admin SDK](https://firebase.google.com/docs/firestore/solutions/role-based-access)
- [App Check e autenticação complementar](https://firebase.google.com/docs/app-check)
- [Agregações no Firestore](https://firebase.google.com/docs/firestore/solutions/aggregation)
- [Boas práticas de dados e desempenho](https://firebase.google.com/docs/firestore/best-practices)
- [Capacitor](https://capacitorjs.com/docs)
- [Orientações e perguntas frequentes da ANPD](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes/perguntas-frequentes)

As fontes embasam capacidades e limites das tecnologias; as fases, prioridades e arquitetura são decisões propostas para este projeto.
