# Experiência móvel: criar, revisar e iniciar treinos

Atualização de 30/10/2026: [SIMPLIFICACAO-DO-FLUXO-2026-10-30.md](SIMPLIFICACAO-DO-FLUXO-2026-10-30.md) substitui o acesso cotidiano em dois toques pelo início direto de uma ficha compatível e prioriza os dois ABCs prontos. As descrições abaixo registram a entrega de 28/10; não reintroduza foco/experiência, ABCD ou opções antigas nas novas escolhas.

28/10/2026. Implementação publicada no endereço oficial com autorização do usuário. Guia de desenvolvimento: [AGENTS.md](../AGENTS.md). Release e instruções para Android: [PUBLICACAO-2026-10-28.md](PUBLICACAO-2026-10-28.md).

## Fase 1 — Documentação e limites

O guia da raiz reúne arquitetura, comandos, referências e contratos de preservação. Esta entrega mantém o motor de treino, o catálogo e os formatos de ficha, plano e histórico. IA continua adiada; não foram acrescentadas promessas de personalização por duração, frequência ou capacidade física.

## Fase 2 — Treinar com a ficha já disponível

A tela Treinar prioriza a ficha escolhida para acesso rápido; sem escolha explícita, usa a última iniciada ainda existente ou a primeira disponível. A pessoa pode trocar a ficha. Nenhuma letra é avançada automaticamente por calendário ou por quantidade de sessões.

O caminho verificado para uma ficha compatível é Conferir e começar → Iniciar treino: dois toques e nenhuma rolagem obrigatória. Meus treinos continua concentrando criação e organização; editar, duplicar, ordenar e excluir ficam no menu Opções de cada ficha.

## Fase 3 — Revisão compacta e ação acessível

A revisão apresenta exercícios, séries e metas. Ajustar abre os controles do exercício; Organizar bloco abre nome, execução, ordenação e remoção. O último bloco de cada dia é preservado, e blocos vazios adicionais devem ser preenchidos ou removidos antes de salvar.

Nome para cópia, descanso, cobertura e ferramentas adicionais ficam em Mais opções. Pendências permanecem fora dos painéis recolhidos e oferecem Resolver. O início consulta novamente as regras existentes, independentemente do estado visual do botão.

A barra inferior contém uma ação principal por contexto. A navegação inferior cede espaço durante a revisão. A barra considera área segura e viewport do teclado; avisos transitórios aparecem acima dela. Foi necessário neutralizar a transformação da animação da aba, que criava um ancestral de posicionamento para elementos fixos.

## Fase 4 — Criação e passagem para execução

Usar um modelo reúne ambiente, estrutura, foco e experiência no momento da criação. ABCD também pode ser revisado no mesmo fluxo. A área de preferências encaminha para essa revisão em vez de substituir o plano imediatamente.

O gerador recebe foco e experiência explicitamente. Escolhas do modal não alteram preferências persistidas antes de salvar. Todos os dias continuam na revisão por abas; o botão Salvar e treinar acompanha o dia selecionado. Substituir um plano existente exige confirmar a perda do contador daquele plano, preservando histórico e fichas pessoais.

O cadastro manual começa com um bloco tradicional. A pessoa busca e adiciona exercícios, abrindo estrutura e pares quando precisar. Salvar e treinar guarda a ficha antes de abrir a sessão. O descanso escolhido nessa montagem acompanha a sessão iniciada; não foi acrescentado um campo de descanso permanente à ficha.

## Fase 5 — Ambiente e equipamentos

O cabeçalho abre um diálogo com escolha explícita do ambiente. Casa e parque preservam recursos independentes. Academia preserva as categorias selecionadas. A criação reutiliza essas escolhas; revisão, trocas e início respeitam equipamentos desmarcados também na academia.

Preferências antigas de academia sem configuração explícita mantêm as categorias anteriores habilitadas. A seleção ainda representa categorias de equipamento, não um inventário de cada máquina. As escolhas são locais ao dispositivo; não foram adicionadas ao contrato de sincronização de campanha.

Mudar o ambiente durante uma sessão em execução continua bloqueado. Na revisão de uma sessão, adaptações respeitam exclusões e políticas dos blocos. Editar permanentemente uma ficha ou um ciclo não provoca substituições automáticas pelo ambiente.

## Fase 6 — Rascunhos e proteção dos dados

Os rascunhos usam chaves `fitapp_workout_draft:<id>` dentro do namespace da conta do FitStore. O formato tem versão, proprietário, rotina incompleta, contexto/revisão, nome, descanso e informações de revisão. Não passam pela sincronização de planos. A exportação de dados inclui seus conteúdos locais brutos.

- Montagens novas, ciclos e edições são guardados durante as alterações. Consultar uma sessão sem ajustá-la não cria um rascunho desnecessário.
- Voltar preserva o rascunho e disponibiliza Continuar ou Descartar em Meus treinos. Há também um atalho na tela inicial.
- Recarga e saída da página usam os mesmos mecanismos locais. Falha ao guardar mantém a edição aberta; falha ao guardar uma sessão impede o início.
- Ficha ou dia de plano alterado desde o rascunho é recuperado como nova ficha. Ciclos antigos exigem nova revisão e confirmação antes de substituir o plano atual.
- Cada recuperação recebe uma nova chave; outra aba pode continuar sua própria edição sem sobrescrever a recuperada.
- Versão desconhecida ou estrutura inválida não é executada nem apagada automaticamente. O conteúdo permanece no dispositivo e pode ser preservado pela exportação de dados.
- Propostas de ambiente são invalidadas quando o contexto muda; a revisão volta à fonte completa e verifica os recursos atuais.

Rascunhos locais não sobrevivem à limpeza do armazenamento do navegador. O backup exportado não ganhou um fluxo novo de importação nesta entrega.

## Validação e evidências

Suíte com Firestore emulado: 102 testes aprovados, sem ignorados. Build e verificação de sintaxe/lint aprovados. As regressões de navegador abrangem editor, jornada principal, ciclos completos, cobertura, prioridades, ambientes/propostas, catálogo, bi-sets, circuitos/legado, parâmetros, aparência e IA adiada. O cache inclui todos os novos módulos e a recarga offline foi verificada.

`npm run test:mobile-flow` cobre início em dois toques, ausência de rolagem para iniciar, sessão isolada, montagem manual, salvar/iniciar, rascunho após recarga, revisão antiga, falhas de armazenamento, duas abas, edição offline, isolamento por conta e formato futuro. Métricas: telas de 390×844 e 360×740, além de desktop 1280×900. São medidas automatizadas de tarefas específicas, não um estudo com usuários.

Evidências atuais:

- [Resultados do fluxo móvel](../audit/mobile-flow-validation.json).
- [Regressões desta entrega](../audit/mobile-flow-regressions.json).
- [Tela inicial](../audit/mobile-flow-home.png), [criação](../audit/mobile-flow-creation.png), [montagem manual](../audit/mobile-flow-manual.png), [revisão de ciclo](../audit/mobile-flow-cycle.png).
- [Revisão móvel clara](../audit/mobile-flow-preview-390-light.png) e [revisão móvel escura](../audit/mobile-flow-preview-360-dark.png).

## Conferência física e publicação

Continuam pendentes testes em Android/iPhone físicos: teclado real, botão/gesto Voltar, instalação da PWA, leitores de tela, fonte ampliada, área segura e interrupção pelo sistema. A emulação no Edge não representa Safari/iOS real nem comprova o ganho de tempo com usuários.

Após a validação local, o usuário autorizou atualizar o endereço oficial. A versão `2ad39ed4993cf64c` foi publicada somente no Hosting; os 58 arquivos, a inicialização móvel simulada e a recarga offline foram conferidos. Snapshot e release anterior foram preservados. Não houve migração ou modificação do banco, das regras ou da API. Em recuperação, manter as chaves dos rascunhos para não destruir trabalho local. Detalhes em [PUBLICACAO-2026-10-28.md](PUBLICACAO-2026-10-28.md).
