# Uso de IA no FitApp

Decisão de 21/10/2026, confirmada pelo usuário: adiar toda a IA nesta fase. Implementação e verificações locais concluídas; publicação não realizada.

## O que está ativo agora

Montagem pelos modelos do motor validado, cadastro manual, edição de fichas e adaptação determinística por ambiente. São as regras do programa que decidem catálogo, focos/padrões, recursos, complexidade, completude e formação dos pares.

Criação de treinos por IA, importação assistida e rota de coach estão desativadas. A política atual está em `functions/ai-policy.json`. O build gera `public/js/ai-policy.js` a partir dela; cliente e servidor rejeitam as ações correspondentes. No servidor, o bloqueio acontece antes da quota e do provedor, inclusive para clientes antigos que chamem as rotas diretamente. Recompensas e autenticação continuam funcionando.

A interface oferece duas entradas: cadastrar ficha e usar modelo. A modal antiga de IA foi removida, e chamadas legadas mostram uma mensagem da próxima fase. A fila `fitapp_fila_ia` não é apagada nem consumida automaticamente. Fichas já salvas não são excluídas.

A função HTTP não depende mais do vínculo com `GEMINI_API_KEY`; o SDK de geração não é inicializado durante o carregamento da API. Nenhuma chave, segredo remoto ou arquivo local de credenciais foi excluído. `npm run test:gemini` agora informa `status: deferred` sem carregar a chave nem fazer requisição. Esse resultado não é uma validação do modelo.

## Por que adiar

A implementação anterior conferia nomes do catálogo e limites de séries, mas não verificava todos os contratos de cobertura muscular, ambiente com recursos declarados, complexidade e papéis dos pares. A montagem por IA tinha regras próprias no prompt, distintas das regras do gerador revisado.

Na importação, o cliente podia preencher séries e repetições ausentes com valores padrão e converter um último exercício sem par em série tradicional. A importação também enviava o contexto de academia independentemente do ambiente atual. Isso tornava difícil distinguir a ficha recebida de conteúdo acrescentado pelo programa. A rota coach devolvia uma mensagem estática, sem analisar treino ou evolução.

## Primeiro uso futuro: importar uma ficha existente

A IA poderá ajudar a transcrever e organizar uma ficha que o usuário já recebeu, começando com texto e um dia por vez. A saída será um rascunho para revisão, com origem rastreável. Essa função não decidirá a prescrição nem completará informações por suposição.

Contrato funcional proposto:

1. Manter o texto original e relacionar cada exercício extraído ao trecho correspondente durante a revisão.
2. Extrair séries, repetições e duração apenas quando estiverem presentes. Campos ausentes ficam explicitamente pendentes; não usar séries/metas padrão.
3. Resolver nomes por IDs/aliases do catálogo. Nomes ambíguos ou desconhecidos ficam pendentes para seleção humana; não substituir silenciosamente.
4. Preservar dias, ordem, blocos, pares e circuitos. Não desfazer um par incompleto nem transformar o método para aceitar uma saída inválida.
5. Passar o resultado pelas mesmas verificações determinísticas do editor e da execução. A IA não pode autorizar movimento incompatível, mudar subnível para esconder lacuna ou relaxar a restrição corporal.
6. Mostrar divergências e pendências antes de aplicar. Não alterar plano, ficha, fila existente ou histórico quando a resposta for inválida, a conta mudar ou o usuário cancelar.
7. Salvar só por ação explícita. Nenhuma saída do modelo deve ser executada como instrução para o sistema.

O ambiente/recursos servem para apontar incompatibilidades; não autorizam reescrever uma prescrição importada. A adaptação é uma revisão separada, pelas regras já testadas.

## Condições para reativar

- Contrato estruturado que represente pendências, origem e tipos de bloco, validado no servidor e no cliente.
- Conjunto de exemplos anonimizados: nomes conhecidos, aliases, campos ausentes, erros de digitação, exercícios desconhecidos, múltiplos dias, bi-sets ímpares, circuitos, metas por tempo e trocas de ambiente.
- Nos exemplos aprovados, nenhum exercício ou parâmetro prescrito acrescentado silenciosamente; qualquer omissão/divergência deve aparecer na revisão. Casos inválidos precisam falhar sem alterar os dados anteriores.
- Testes de falha de rede, resposta parcial, saída malformada, troca de conta, cancelamento e instruções indevidas dentro do texto importado.
- Revisão do tratamento dos textos enviados, consentimento/contexto da solicitação, retenção e exclusão. Não enviar histórico ou dados da conta sem necessidade para a função solicitada.
- Limites de tamanho, quota, timeout, tentativas e consumo definidos; ausência do provedor não pode impedir o uso dos modelos e do cadastro manual.
- Revisão profissional das interpretações de conteúdo de treino e piloto de revisão humana antes de ampliar o acesso.
- Publicação coordenada de política, contrato, segredo do provedor e interface. Alterar apenas os booleanos não conclui essa etapa.

Os módulos antigos e seus testes com provedor simulado foram preservados como referência; eles não representam o contrato futuro aprovado. O teste de API que habilita IA por injeção verifica compatibilidade isolada, sem habilitar a política de produção nem realizar chamada real.

## Usos posteriores

Após validar a importação, considerar explicações de uma ficha já validada, baseadas em conteúdo revisado, e resumos descritivos de registros. Esses recursos não devem mudar o treino, aumentar o nível ou ajustar cargas automaticamente.

Criação autônoma, personalização de volume/carga, progressão física e adaptação livre de exercícios permanecem fora do escopo. Uma etapa futura precisará demonstrar valor e validação suficientes antes de incluí-las.

## Evidências da pausa

- Suíte geral: 72 testes aprovados, 2 ignorados por dependerem do emulador de banco.
- A API retorna `409 / ai-deferred` para as duas rotas antes de quota/provedor, mantendo recompensas disponíveis.
- `npm run test:ai-deferred`: interface sem entradas de IA, chamadas legadas/cliente bloqueadas, zero requisições de IA no teste, fila antiga preservada após recarregar, cadastro manual e modelos disponíveis. Relatório: `audit/ai-deferred-validation.json`.
- Testes de ciclo completo e editor passaram no navegador com Firebase simulado; build, sintaxe e lint aprovados.

As evidências são locais. A versão publicada só assumirá essa decisão após uma publicação coordenada; a IA de uma versão remota anterior não foi desligada por estes testes.
