# Parâmetros dos modelos e descanso por sessão

22/10/2026. Implementação local, sem publicação. IA permanece adiada; nenhum movimento com banda foi incluído.

## Entrega

As preferências, o modal de modelos e a prévia agora explicam os efeitos reais da divisão, foco e experiência. Os nomes visíveis passaram a ser **Base**, **Pausas menores**, **Foco em Inferiores** e **Condicionamento**. Os valores internos antigos foram mantidos para preservar preferências, sincronização e planos existentes.

No ABC/ABCD, Base, Pausas menores e Condicionamento compartilham os pedidos musculares e as metas: o descanso inicial varia. Foco em Inferiores modifica essas divisões. No complementar, as opções de pausas menores e condicionamento também têm metas/finalizações distintas; foco em inferiores não muda os pares. No circuito, condicionamento usa tempo nas estações principais. Essas diferenças são descritas por modelo, sem anunciar uma prescrição individual de hipertrofia ou definição corporal.

A base existente de séries foi centralizada: três para iniciante e quatro nos demais níveis, com as exceções próprias de cada estrutura preservadas. Intermediário e avançado continuam compartilhando essa base e o filtro de complexidade; a interface informa que não existe progressão automática entre eles. As séries e metas editadas na ficha prevalecem sobre a descrição da base do gerador.

## Correção do descanso

Antes, cada dia gerado agendava uma alteração do descanso global para 500 ms depois. Esse efeito podia ocorrer durante uma revisão ou depois de abrir outra ficha. O gerador agora apenas retorna o treino, sem agendar alterações do relógio.

Ao abrir um dia do plano, a sessão recebe o padrão correspondente aos parâmetros do plano carregado. Fichas pessoais e planos de métodos retirados começam em 60 segundos, sem herdar o foco do seletor global. O atalho Casa mantém o padrão calculado por seus parâmetros. A revisão de ciclo completo apresenta o padrão; não oferece um ajuste temporário que seria perdido ao salvar o ciclo.

A prévia de uma sessão permite escolher seu descanso. Durante a execução de força, os controles existentes de 60/90/120 segundos ficam acessíveis, o visor acompanha o valor efetivo e a seleção usa `aria-pressed`. O aeróbico mantém esses controles ocultos. Ajustar o valor só reinicia uma contagem que esteja em andamento; não reativa um relógio já parado.

O descanso é salvo no estado local da sessão ativa e recuperado após recarregar a página. Sessões antigas sem esse campo recebem 60 segundos. O ajuste não é gravado permanentemente no modelo ou no histórico: vale para a sessão atual. Não foi criado um cálculo de descanso por exercício, carga, esforço ou capacidade individual.

O resumo do perfil também passou a mostrar a experiência efetivamente salva, em vez de um texto fixo de iniciante.

## Validação

- `npm test`: 90 aprovados; dois testes dependentes do emulador Firestore ignorados. Os testes novos cobrem a matriz de parâmetros, compatibilidade do descanso salvo e ausência de efeitos agendados na geração aceita ou rejeitada.
- `npm run test:model-settings`: cinco verificações no Edge com Firebase simulado. Abrangem descanso na abertura, ajuste na prévia e execução, recuperação após recarga, sessão antiga, ficha pessoal, revisão de ciclo, explicações das preferências e aeróbico. Interface conferida em celular e desktop, sem rolagem horizontal nos cenários testados.
- Regressões de prioridades dos treinos, editor e ambientes aprovadas no navegador local.
- `npm run check`, `npm run build` e `npm run test:offline` aprovados. O módulo de parâmetros integra o cache offline.

Evidências: `audit/model-settings-validation.json`, `audit/model-settings-mobile.png` e `audit/model-settings-desktop.png`. A matriz de 48.600 gerações não foi repetida nesta etapa; os pedidos musculares e o catálogo não foram alterados.

A personalização por capacidade, frequência semanal, tempo disponível e progressão continua pendente de regras próprias. Esta etapa torna os parâmetros atuais explícitos e corrige sua aplicação na sessão.
