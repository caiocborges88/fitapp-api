# Cobertura pelos movimentos reais da ficha

22/10/2026. Implementação local, sem publicação. Catálogo mantido em 129 movimentos, sem bandas; IA continua adiada.

## Comportamento entregue

A prévia ganhou uma seção recolhível de **Cobertura muscular da ficha**. Na revisão de ciclo, cada dia tem sua própria conferência. O relatório lê os movimentos do catálogo, sem usar o título dos blocos para decidir a cobertura.

Para cada dia, mostra posições de exercícios, movimentos distintos pelo nome canônico, posições sem pendência e séries previstas nessas posições. Lista os grupos principais, subníveis e padrões presentes. Outros subníveis cadastrados dos grupos presentes aparecem como referência, sem exigir que todos sejam incluídos em cada dia. As ênfases são normalizadas pelo mesmo contrato de foco/padrão utilizado na seleção: um rótulo como Esternocostal (Isolamento) não cria uma lacuna fictícia se a ênfase esternocostal já está representada.

Exercícios excluídos, desconhecidos, incompatíveis com recursos ou com pendência de revisão não contam como cobertura disponível. Um bloco em par inválido também não é apresentado como pronto. O relatório informa repetições por nome canônico, incluindo aliases, sem confundir duas posições do mesmo movimento com dois movimentos diferentes. Repetição entre dias não é tratada como repetição no mesmo dia.

A sessão mantém em memória uma referência da ficha aberta. Após adaptação, troca ou remoção, o relatório pode mostrar as ênfases/padrões dessa referência que ficaram sem representação disponível. Propostas reduzidas por ambiente são comparadas com sua origem completa. Reabrir uma ficha inicia uma nova referência; esta comparação não cria um histórico persistente de revisões.

## Core e preservação das fichas

O resumo do ciclo informa em quantos dias há core identificado e sem pendência. O destaque visual de um bloco de core depende de seus movimentos, e não do título Abdominal. O cartão do plano deixou de prometer abdominal em todos os dias de uma ficha já editada.

Reabrir dias existentes não acrescenta mais abdominal automaticamente nem retorna referências mutáveis aos blocos salvos. Os modelos novos continuam gerando o core previsto por suas regras. Em fichas manuais, ausência de core, outros subníveis não presentes e repetição fora de um par são informações; não obrigam a reconstrução ou impedem por si só iniciar o treino. As validações de execução existentes continuam valendo.

O painel atualiza após trocas, mudanças de ambiente/recursos, remoções, adições e alterações de séries. Não substitui as instruções dos exercícios nem calcula carga, esforço, volume fisiológico, sinergistas ou adequação individual. Séries previstas são contagem da ficha, não resultado de execução.

## Validação

- `npm test`: **97 aprovados**, dois testes dependentes do emulador Firestore ignorados. Sete testes novos cobrem títulos falsos, core real, aliases, duplicatas, pendências, padrões, comparação com a referência, dias vazios, séries e ênfases canônicas. A expectativa antiga de acrescentar abdominal a uma ficha salva foi substituída por preservação da edição manual.
- `npm run test:coverage`: quatro cenários no Edge com Firebase simulado, em celular e desktop. Incluem ficha sem core com título Abdominal; contagens após edição; ciclo editado preservado; Parque com/sem banco e barra alta; e jornada completa de adaptação para Casa, identificação da lacuna, remoção explícita, salvamento de nova ficha, execução, recarga e registro parcial. A ficha original permaneceu intacta.
- A matriz de **48.600 tentativas** foi executada novamente: 7.731 aceitas, 40.869 bloqueadas e 10.278 rotinas diárias aceitas; sem violações dos critérios avaliados, alertas de cobertura monitorados ou variação de aceitação entre as três sementes. Bloqueios incluem falta deliberada de recursos e exclusões e não representam taxa de defeitos. A amostra não é uma prova universal.
- Regressões de ciclos completos, editor, propostas por ambiente, prioridades anteriores e parâmetros/descanso aprovadas no navegador local.
- `npm run check`, `npm run build` e `npm run test:offline` aprovados. Ambos os módulos novos integram o cache offline.

Evidências: `audit/coverage-validation.json`, `audit/coverage-mobile.png`, `audit/coverage-desktop.png` e `audit/offered-workouts-simulation.json`. Serviços de produção não foram usados para criar treinos de teste; a integração real com Firestore e a experiência em aparelhos físicos não foram revalidadas nesta etapa.

As sondas de reaproveitamento no relatório de simulação continuam mostrando movimentos excluídos presentes nos dados salvos e fichas manuais sem core. Isso representa preservação da edição: exclusões são verificadas na sessão, e a nova conferência descreve a cobertura sem reescrever a origem.
