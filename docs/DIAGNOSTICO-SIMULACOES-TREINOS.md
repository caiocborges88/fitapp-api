# Diagnóstico dos treinos oferecidos

> Histórico anterior às correções. O resultado atual está em `CORRECOES-PRIORIDADES-TREINOS.md`. As contagens originais foram preservadas em `audit/offered-workouts-simulation-before-priorities.json` e `audit/workout-assumptions-before-priorities.json`; o modelo de calistenia foi retirado posteriormente.

22/10/2026. Auditoria da versão local `a6fbbab48d82ba38`, catálogo de 129 movimentos. Nenhum código funcional, dado real ou serviço de produção foi alterado nesta investigação. As reproduções de interface usam Firebase simulado e contextos descartáveis do Edge. IA e bandas continuam fora do escopo.

## Resultado geral

Foram executadas **56.700 tentativas de montagem**, correspondentes a 18.900 configurações com três sementes determinísticas, além de 120 planos em sondas de cobertura e seis reproduções de interface. A matriz cobre quatro perfis, três níveis, sete caminhos (`abc`, alias `ppl`, `abcd`, complementar, circuito, calistenia e atalho Casa), quinze cenários de ambiente/recursos, três seleções de equipamentos e cinco condições de exclusão.

Das tentativas da matriz, 12.996 entregaram planos/sessões e 43.704 foram bloqueadas. Os resultados aceitos contêm 28.152 rotinas diárias. **Os bloqueios não representam automaticamente defeitos**: a matriz inclui falta deliberada de equipamento e exclusão de grupos inteiros. As sementes repetem configurações; as contagens não representam pessoas, exercícios únicos ou probabilidade de falha em uso real.

Nas rotinas recém-geradas aceitas, não apareceram movimentos excluídos, nível 3 no iniciante, pares incompletos/repetidos, recursos incompatíveis ou abdominal final fora do core, segundo os contratos atuais. Nenhuma configuração alternou entre aceitação e bloqueio nas três sementes testadas. Isso é evidência limitada à amostra, não prova para todo sorteio.

Mesmo com esses resultados, **seis comportamentos problemáticos foram reproduzidos na interface**. A suíte anterior segue verde: 75 aprovados e 2 testes de emulador ignorados. Ela não cobria esses caminhos de ponta a ponta.

## Falhas e decisões de política, por prioridade

### P1 — falha ao gerar um substituto apaga o plano anterior

Reprodução: criar ABC válido, manter contador em 5, excluir os movimentos de core, escolher ABCD e confirmar Aplicar ao plano. O gerador recusa a nova montagem, mas `fitapp_campaign_data` já foi apagado e o contador já está em zero.

Causa: `lockCampaign`, em `public/js/app.js`, limpa os dados antes de chamar `executeForgePlan`. A captura do erro apenas mostra o aviso; não restaura o plano. A exclusão de core é a condição de falha usada no teste; a necessidade de atomicidade vale para qualquer falha na geração.

Correção prioritária: montar e validar o substituto em memória, depois persistir plano e contador. Se a montagem ou gravação falhar, manter os dados anteriores. Verificar também falha de armazenamento, não apenas erro do seletor.

### P2 — o modal de modelos ignora a exclusão persistida

Reprodução: guardar `Cadeira Extensora` em `fitapp_blacklist` e gerar PPL pelo modal. A cadeira extensora aparece no dia C. A mesma exclusão passada diretamente ao motor bloqueia o ciclo quando esse foco não tem alternativa.

Causa: `generateForgedWorkout`, em `public/js/forge.js`, chama `executeForgePlan(method)` sem transmitir a lista persistida. O caminho Aplicar ao plano e o atalho Casa transmitem essa lista. A lista é uma preferência persistida/sincronizada; não foi identificado um controle atual que permita ao usuário editar toda essa lista na interface, o que torna o comportamento especialmente relevante para dados antigos ou importados.

Correção: usar a mesma origem de exclusões em todos os caminhos de geração. Definir separadamente como uma nova exclusão afeta fichas já salvas, pois elas não devem ser silenciosamente reescritas.

### P2 — exercício por tempo começa configurado como repetição

Reprodução: gerar calistenia, abrir A e iniciar. A prancha tem meta `20-30 seg`, mas suas três séries começam com unidade `rep`, sem `measurementType: duration`; o botão do cronômetro fica indisponível nessa unidade.

Causa: `renderCurrentRoutine`, em `public/js/ui.js`, inicializa todas as séries novas com os mesmos campos de repetição. O registro de duração funciona quando a unidade é trocada manualmente, mas a meta e a unidade inicial divergem.

Correção: representar a unidade no contrato do exercício/série e inicializá-la de acordo com a meta. Preservar escolhas e dados já registrados. Testar segundos, minutos, intervalos de duração e repetições por lado.

### P2 — desmarcar barras fixas não impede uma montagem dependente delas

Reprodução: na academia, deixar apenas Peso corporal marcado no modal, desmarcando Barras fixas, e gerar calistenia. Os três dias incluem Barra Fixa com Apoio dos Pés, que exige barra alta e banco.

Causa: o chip Barras fixas controla a categoria de equipamento `Calistenia`, enquanto as barras do catálogo têm `equip: Peso Corporal`. Além disso, o seletor sempre aceita Peso Corporal, e `availableInEnvironment` considera todos os recursos presentes na academia.

Correção: separar categoria de resistência e recursos físicos. Fazer banco, barra alta e barra baixa participarem das restrições efetivas também quando o usuário limita equipamentos na academia. Não tratar “peso corporal” como “sem recursos”.

### P2 — o plano global interfere nas trocas de uma ficha pessoal

Reprodução: com o seletor global em calistenia, abrir uma ficha pessoal tradicional contendo supino com barra. A lista de troca não oferece supino com halteres. Trocar somente o seletor global para ABC faz a opção reaparecer, sem alterar a ficha pessoal.

Causa: `openSwapModal`, em `public/js/app.js`, usa o método global para restringir trocas, além da política do bloco. Isso conflita com a montagem manual livre solicitada pelo usuário.

Correção: obter a política da ficha/bloco em edição. Reservar o método global para novos modelos; ele não deve impor uma política corporal a outra ficha.

### P3 — o limite de complexidade iniciante não vale para as sugestões de troca

Reprodução: iniciante abre a troca da barra fixa com apoio dos pés. A lista oferece barra fixa pronada e supinada, ambas classificadas como nível 3. O gerador iniciante não seleciona essas opções automaticamente.

Trata-se de uma inconsistência de política a resolver, não de uma conclusão de que todo movimento complexo seja inadequado para toda pessoa iniciante. O catálogo define nível como complexidade, não aptidão individual.

Decisão necessária de produto: aplicar o mesmo filtro às sugestões, ou permitir a escolha manual com sua complexidade claramente informada. Não converter essa distinção em uma proibição geral que impeça o usuário de editar sua própria ficha.

## Pontos cegos de cobertura muscular

As sondas abaixo usam academia com todos os equipamentos e **nenhuma exclusão**, para não confundir restrições propositais com falhas de cobertura. São 30 sementes por método/perfil, em nível iniciante.

| Modelo/perfil | Resultado observado |
| --- | --- |
| ABC hipertrofia | Nos 30 ciclos, os pedidos explícitos mantiveram as duas direções de costas e as duas funções de posteriores |
| ABC foco em inferiores | Em 9 de 30 ciclos, as duas posições de posteriores não incluíram flexão de joelho; exemplo: RDL com barra + RDL com halteres |
| ABCD hipertrofia | Em 10 de 30 ciclos, o dia de costas não incluiu puxada vertical; exemplo: remada baixa + pulldown de braços estendidos |
| ABCD foco em inferiores | Em 6 de 30 ciclos, as duas posições de posteriores não incluíram flexão de joelho |

O ABCD e o perfil de inferiores usam diversos pedidos amplos por grupo. `matchesMovementRequirement` retorna verdadeiro para qualquer movimento do grupo quando não há subnível solicitado. A variedade de nomes e a preferência por um foco ainda não escolhido não garantem variedade de padrões.

**Interpretação:** esses resultados não provam que as sessões sejam clinicamente inadequadas. Demonstram que “ciclo aceito” possui critérios diferentes entre métodos. Se a intenção do produto é garantir os subníveis e padrões, esses métodos precisam declarar seus pedidos mínimos tão explicitamente quanto o ABC hipertrofia e o complementar.

Na matriz maior também houve 1.719 rotinas com algum nome repetido no mesmo dia. O motor permite reutilização fora do mesmo par quando o catálogo se esgota. Isso pode ser uma decisão válida, mas contar posições como movimentos distintos mascara a repetição. Os alertas da matriz incluem cenários com exclusões e não devem ser apresentados como taxa de defeitos dos modelos normais.

## Outras premissas frágeis

1. **Personalização limitada.** Com a mesma semente, o ABC de hipertrofia, definição e tático teve os mesmos nomes, séries e metas. O descanso é ajustado separadamente e difere entre perfis. Intermediário e avançado também produziram o mesmo ABC na sonda. Os rótulos não representam uma personalização completa de volume, capacidade, disponibilidade ou progressão.
2. **Academia como conjunto completo de equipamentos.** O ambiente retorna disponibilidade antes de verificar os recursos específicos. Pode ser uma convenção para um modelo de academia completa, mas é frágil como descrição de todo local real.
3. **Fichas salvas não são novas gerações validadas.** `executeForgePlan` reutiliza rotinas existentes sem aplicar novas exclusões e usa o título `Abdominal` para decidir se acrescenta core. Uma rotina editada contendo quadríceps nesse título foi aceita sem core. Isso não autoriza reescrever fichas manuais; é necessário distinguir preservação de edição humana e garantia de um novo modelo automático.
4. **Metas textuais são copiadas na adaptação.** A sonda de panturrilha sentada com meta “Máximo de repetições com 50 kg” foi adaptada para peso corporal com o mesmo texto. O foco e o padrão se mantiveram; a referência à carga não foi revista. A equivalência estrutural não interpreta a prescrição.
5. **A academia contorna o diagnóstico de adaptação.** O retorno antecipado de `adaptRoutineToEnvironment` não sinaliza complexidade ou política corporal em registros incoerentes. A validação de início ainda bloqueia equipamento incompatível com um bloco corporal, portanto não foi confirmado um bypass completo de execução. O diagnóstico e a validação final usam camadas diferentes.
6. **Disponibilidade não é capacidade de execução.** A simulação verifica recursos declarados e metadados. Não mede altura da barra/banco, resistência disponível, esforço, mobilidade, experiência com o gesto ou adequação de carga. A fonte do cadastro e sua classificação não validam automaticamente uma prescrição individual.

## Disponibilidade atual dos modelos

Esta tabela usa hipertrofia iniciante, todos os chips de equipamento selecionados e nenhuma exclusão. “Aceito” significa que o contrato atual do gerador permitiu o ciclo, não cobertura uniforme de todos os subníveis.

| Caminho | Academia | Casa vazia | Casa só com halteres | Casa equipada¹ | Parque com banco e barra alta |
| --- | --- | --- | --- | --- | --- |
| ABC/PPL | Aceito | Bloqueado | Bloqueado | Bloqueado | Bloqueado |
| ABCD | Aceito | Bloqueado | Aceito² | Aceito² | Aceito² |
| Bi-set complementar | Aceito | Bloqueado | Bloqueado | Bloqueado | Bloqueado |
| Circuito | Aceito | Bloqueado | Bloqueado | Aceito | Aceito |
| Calistenia | Aceito | Bloqueado | Bloqueado | Aceito | Aceito |
| Atalho Casa³ | Aceito | Aceito | Aceito | Aceito | Aceito |

¹ Halteres, bancos reto/inclinado, barras alta/baixa e apoio de equilíbrio. Mesmo assim, o ciclo ABC e o complementar não encontram a alternativa exigida para extensão de joelho. ² Pedidos amplos: considerar os pontos cegos de cobertura descritos acima. ³ Sessão curta, não ciclo completo: força o ambiente casa sem recursos e não declara cobertura de costas/bíceps.

## Ordem de correção recomendada

1. Impedir perda do plano/contador quando a substituição falha.
2. Unificar recursos e exclusões entre os caminhos de geração, edição e execução.
3. Corrigir unidade inicial de exercícios por tempo e testar o registro resultante.
4. Separar a política da ficha pessoal do método global.
5. Definir os contratos mínimos de ABCD e foco em inferiores, além da política de complexidade nas trocas.
6. Tratar metas e carga na adaptação como informação que pode precisar de revisão, sem inventar uma nova prescrição.

Não foram realizadas correções funcionais nesta auditoria; o relatório registra o estado reproduzido e suas prioridades.

## Evidências reproduzíveis

- `node scripts/simulate-offered-workouts.mjs` → `audit/offered-workouts-simulation.json`.
- `node scripts/probe-workout-assumptions.mjs` → `audit/workout-assumptions-probes.json`.
- `node tests/audit-offered-workouts-browser.cjs` → `audit/offered-workouts-browser-audit.json`.
- `npm test`: 75 aprovados, 2 de emulador ignorados. `npm run check`: aprovado.

Os scripts diagnósticos podem concluir com sucesso **mesmo quando reproduzem um problema**: o campo `confirmed` significa comportamento confirmado. Eles não são testes de correção. As duas rotinas de simulação suprimem apenas seus callbacks de descanso no processo isolado; o comportamento temporal desses callbacks não foi auditado.
