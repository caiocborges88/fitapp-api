# Revisão gradual da montagem de treinos

## Etapa 1 — tradicional iniciante — 21/10/2026

A revisão começa pelo perfil hipertrofia e pelos dias A/B/C. Compatibilidade de catálogo não equivale a validação profissional da prescrição. Não houve publicação ou desativação geral de opções.

### Correção aplicada

O gerador ABC/PPL e ABCD descartava silenciosamente solicitações para as quais não encontrava movimento. Agora acumula os grupos/subníveis ausentes e rejeita a geração inteira com uma mensagem explicativa. O fluxo de geração mantém a prévia e o plano salvo anteriores quando isso acontece.

O bloqueio cobre as solicitações dos blocos tradicionais, inclusive outros níveis/perfis que usam esses blocos. Não muda os critérios de equivalência nem cadastra movimentos novos. Bi-sets, circuito e calistenia ainda precisam da própria revisão de completude; há caminhos de omissão e substituição nesses métodos que não foram corrigidos nesta etapa.

### Fichas prontas tradicionais iniciantes: lacunas atuais

| Dia | Academia | Casa sem recursos | Casa com halteres e bancos | Parque sem recursos | Parque com banco e barras |
| --- | --- | --- | --- | --- | --- |
| A | Compatível | 3 pendências | Compatível | 3 pendências | 2 pendências |
| B | Compatível | 4 pendências | 1 pendência | 4 pendências | 2 pendências |
| C | Compatível | 1 pendência | 1 pendência | 1 pendência | 1 pendência |

As pendências são posições de exercícios sem equivalente segundo os critérios atuais de foco muscular e padrão de movimento. Não representam necessariamente exercícios novos a cadastrar.

- A: adução horizontal do peitoral e movimentos de tríceps não encontram alternativas em todos os cenários.
- B: puxada vertical, remada horizontal e flexão de cotovelo dependem dos recursos; a remada da ficha não encontra equivalente em casa mesmo com os halteres declarados nesse cenário.
- C: a extensão de joelho com o foco cadastrado para cadeira extensora não encontra alternativa nos cenários de casa/parque.

O relatório completo está em `audit/workout-alignment.json`; pode ser recalculado com `node scripts/audit-workout-alignment.mjs`. Ele avalia fichas prontas, não a geração dinâmica. A adaptação continua sinalizando posições sem equivalente e impedindo a execução enquanto houver incompatibilidade.

### Evidências desta etapa

- 24 testes direcionados de domínio/ambiente aprovados, incluindo rejeição de dias incompletos, mensagem de subnível ausente e cobertura dos focos do ABC iniciante na academia.
- Suíte geral: 38 aprovados, 2 ignorados por dependerem do emulador de banco.
- Verificação de sintaxe e lint aprovada.
- Teste de navegador `tests/complete-plan-browser.cjs` aprovado com Firebase simulado, incluindo falha de geração em casa/parque sem alterar plano ou prévia.

### Próximas etapas

1. Revisar as lacunas do tradicional iniciante por dia, distinguindo falta de cadastro, classificação incorreta e impossibilidade com os recursos selecionados. Revisar também os padrões, pois compartilhar um músculo não garante equivalência.
2. Definir montagens próprias de casa/parque quando a ficha da academia não puder ser preservada. Explicitar as mudanças de cobertura para revisão, sem apresentar equivalência inexistente.
3. Exercitar cada montagem na interface, com e sem recursos, inclusive retorno à academia.
4. Expandir para outros perfis e níveis; depois bi-sets, circuito e calistenia.
5. Unificar as restrições do catálogo e dos ambientes com geração/importação por IA antes de considerar a operação concluída.

## Etapa 2 — classificação das remadas e validação de A/B/C — 21/10/2026

### Correções e efeito na montagem

As variantes `Remada Unilateral (Serrote)` e `Remada Unilateral em Pé com Halter` estavam classificadas como `puxar-vertical`. Ambas passaram para `puxar-horizontal`, com o foco `costas-remada` acrescentado ao foco de latíssimo existente. A classificação operacional é uma interpretação do movimento descrito no [guia Single-arm Row da ACE](https://www.acefitness.org/resources/everyone/exercise-library/126/single-arm-row/) e do subnível já cadastrado `Espessura (Romboides/Latíssimo)`. Ela não afirma equivalência de carga ou isolamento muscular.

Isso libera a substituição de remadas horizontais por halteres disponíveis em casa, mas impede que a puxada alta seja coberta indevidamente por essas remadas. Portanto, a pendência da ficha B em casa com halteres e bancos mudou: a remada está atendida, enquanto a puxada vertical continua sem recurso compatível. Acrescentar uma barra alta e banco permite a alternativa já cadastrada com apoio dos pés para o iniciante.

A adaptação agora também aplica o limite de complexidade ao movimento original quando ele já está disponível em casa/parque. Antes, uma barra fixa de nível 3 podia permanecer para um iniciante apenas porque havia uma barra declarada. Agora exige uma alternativa de complexidade permitida ou sinaliza a restrição. O retorno à academia continua restaurando a ficha original, sem reclassificar o conteúdo salvo.

Os avisos identificam o subnível e distinguem movimento ausente, ausência de equivalente cadastrado, recursos incompatíveis e limite de complexidade. O relatório inclui um código de motivo para cada pendência da adaptação.

### Resultado do diagnóstico atualizado

Na matriz geral de 54 fichas, casa com halteres e bancos passou de 39 para 32 fichas sem pendências: o resultado anterior incluía substituições de puxada vertical por remada. O aumento de pendências revela a incompatibilidade que o cadastro anterior ocultava. No parque com banco e barras, continuam 27 fichas completas, com 53 posições pendentes em vez de 52 após aplicar também o limite de complexidade aos originais.

A tabela da etapa 1 conserva a quantidade de pendências das fichas tradicionais iniciantes, mas a natureza da pendência B/casa foi corrigida como descrito acima. A e C continuam com as mesmas lacunas. A cadeira extensora e os focos sem recurso compatível permanecem sinalizados; nenhum exercício novo foi inventado para zerar o relatório.

### Validação

- Build, sintaxe e lint aprovados; o catálogo das funções foi regenerado a partir do cadastro corrigido.
- Suíte geral: 42 testes aprovados e 2 ignorados por dependerem do emulador de banco. A restrição de conexão local do isolamento exigiu executar a suíte fora dele; a repetição passou.
- Testes de domínio cobrem A/B/C em 6 cenários de recursos, preservando posições, séries, alvos, foco e restauração da academia.
- `tests/traditional-alignment-browser.cjs`: 15 cenários na interface móvel com Firebase simulado, cobrindo avisos por dia, recursos, preservação das fichas e bloqueio de início quando há pendências. Evidência em `audit/traditional-alignment-validation.json`.
- `tests/environment-browser.cjs`: troca de ambientes, recursos independentes, retorno à academia e execução aprovados. O teste foi atualizado para exigir apoio na alternativa iniciante de barra fixa.

Próximo ponto: montar propostas específicas por ambiente com cobertura explicitamente revisável quando a ficha da academia não puder ser preservada. A geração dinâmica ainda usa rótulos textuais de subníveis; a normalização desse caminho e a revisão dos outros métodos continuam pendentes. Nada desta etapa foi publicado.

## Etapa 3 — propostas explícitas para a sessão — 21/10/2026

### Fluxo implementado

Nas prévias de sessões tradicionais iniciantes em casa/parque, a ficha incompatível agora apresenta uma opção de revisão de versão reduzida quando ela é viável. Essa opção usa apenas os movimentos e equivalentes compatíveis do catálogo atual. Não inventa substitutos para preencher subníveis ausentes e não transforma uma ficha incompleta em uma ficha equivalente.

Antes de aplicar, a tela mostra os movimentos mantidos com séries/metas e cada posição removida com o subnível, as séries retiradas e se outro movimento ainda mantém o mesmo foco/padrão. Quando não houver esse movimento, a tela declara que o foco e o padrão não serão atendidos. Nenhum grupo agonista da ficha pode desaparecer inteiro da proposta: nesse caso, o motivo aparece diretamente e a versão reduzida não é oferecida. Assim, uma ficha de costas sem recursos não se torna uma sessão apenas de abdominal.

Revisar mantém a prévia original. `Usar versão reduzida nesta sessão` aplica a proposta; iniciar é uma ação separada. A execução e o salvamento ficam bloqueados enquanto a revisão está pendente. `Voltar sem aplicar` encerra a revisão; após aplicar, `Restaurar ficha completa` retorna à prévia completa. O plano/ficha salvos não são sobrescritos. Salvar como uma nova ficha continua sendo uma ação explícita do editor existente.

Trocar recursos ou ambiente descarta a versão reduzida e seus ajustes e recalcula a ficha completa da prévia, como informado na tela. Uma proposta cuja ficha, nível ou recursos mudaram desde a revisão não pode ser aplicada. As propostas não são oferecidas no editor permanente de fichas/planos, ciclos completos, pares, circuitos ou outros níveis. Elas são auxiliares para revisão da sessão, não modelos de prescrição validados nem preenchimento integral de todas as lacunas.

### Verificações

- 5 novos testes de proposta: B com puxada vertical ausente e remada mantida; C com perda explícita de reto femoral; rejeição de grupos inteiros ausentes, cadastros desconhecidos, pares e circuitos; isolamento de cópias e recálculo com novos recursos.
- Suíte geral: 47 aprovados e 2 ignorados por dependerem do emulador de banco.
- Build, sintaxe e lint aprovados.
- Novo teste de interface móvel: `npm run test:environment-proposal`. Valida revisão sem alterar a prévia, divulgação das lacunas, aplicação explícita, salvamento/início durante revisão, cancelamento, propostas obsoletas, recálculo por recursos, grupos ausentes, retorno à academia e início separado. Evidências em `audit/environment-proposal-validation.json` e `audit/environment-proposal-mobile.png`.
- Os testes de interface de alinhamento tradicional (15 cenários), ambientes, ciclo completo e editor também passaram com Firebase simulado.

### Continuidade

Esta etapa fornece uma proposta revisável para situações em que a cobertura integral não cabe nos recursos disponíveis. Ela não elimina as lacunas do catálogo. A próxima revisão deve normalizar a seleção por subníveis/focos no gerador dinâmico e, em seguida, aplicar os mesmos contratos aos outros métodos e à IA. Não houve publicação.

## Etapa 4 — seleção por foco e padrão no gerador tradicional — 21/10/2026

### Correção

O gerador ABC/PPL/ABCD passa a resolver os pedidos explícitos de subníveis por `muscleFocus` e `movementPattern`, em vez de procurar trechos no rótulo `subLevel`. O módulo `public/js/movement-requirements.js` contém o contrato dos pedidos conhecidos do tradicional. A tabela usa os códigos existentes no catálogo; não altera a classificação anatômica nem as fichas salvas.

Essa mudança corrige falsos negativos: `Espessura (Romboides)` agora encontra também `Espessura (Romboides/Latíssimo)` e `Espessura (Romboides/Miolo)` quando os códigos de foco/padrão atendem ao pedido. `Braquial / Antebraço` passa a encontrar a rosca martelo cadastrada como `Braquial / Braquiorradial`. Um rótulo visual pode mudar sem quebrar esses pedidos conhecidos. Cadastros sem os códigos exigidos não são aceitos só por terem um texto parecido. Pedidos legados desconhecidos exigem rótulo exato.

As solicitações de puxada vertical e remada horizontal continuam distintas. As duas funções dos isquiotibiais também têm padrões próprios. Alguns pedidos amplos, como o subnível de peitoral, têm mais de um padrão permitido explicitamente, conforme o comportamento do pedido original. Isso define alternativas para gerar uma nova ficha; não flexibiliza `sameMuscleFocus` nem as regras estritas de adaptação de um exercício existente.

O gerador tradicional também pode reutilizar um movimento compatível para um grupo repetido quando não houver variedade suficiente, mantendo todas as posições solicitadas. A lista de exclusões é resolvida por nomes canônicos e aliases e continua valendo nessa reutilização. As fichas prontas e as propostas reduzidas das etapas anteriores não mudam por esta seleção.

### Matriz do gerador ABC iniciante, perfil hipertrofia

| Recursos do ambiente | A | B | C |
| --- | --- | --- | --- |
| Academia | Compatível | Compatível | Compatível |
| Casa sem recursos | Bloqueado | Bloqueado | Bloqueado |
| Casa com halteres e bancos | Compatível | Bloqueado | Bloqueado |
| Casa com halteres, bancos e barra alta | Compatível | Compatível | Bloqueado |
| Parque com banco e barras alta/baixa | Bloqueado | Bloqueado | Bloqueado |

O bloqueio informa os focos que não podem ser montados integralmente. No cenário de casa com barra alta, banco e halteres, B agora inclui a puxada assistida, a remada unilateral e a rosca martelo; retirar a barra volta a bloquear a puxada vertical. C continua dependendo de uma alternativa compatível ao pedido de extensão de joelho/ reto femoral. Os cenários de parque não passaram a ser fichas completas: as propostas reduzidas continuam sendo uma revisão separada por sessão.

Relatório reproduzível: `node scripts/audit-generator-alignment.mjs`, saída em `audit/generator-alignment.json`. A matriz libera as categorias de equipamento do seletor para isolar a avaliação dos recursos de cada ambiente. Ela não valida a prescrição.

### Verificação e próximos passos

- 7 testes novos cobrem variações de rótulo, geração B em casa, renomeação visual sem perda de cobertura, ausência de barra, exclusão por alias, reutilização no ABCD e separação dos padrões dos isquiotibiais.
- Suíte geral: 54 aprovados e 2 ignorados por dependerem do emulador de banco.
- Build, sintaxe e lint aprovados.
- Navegador: 15 cenários de fichas tradicionais mais a geração B em casa; ciclos completos e propostas por ambiente aprovados com Firebase simulado.

A seleção textual dos outros métodos ainda não foi migrada, embora a resolução de exclusões por aliases já esteja no seletor compartilhado. A revisão seguinte deve tornar explícitos os pedidos dos bi-sets e eliminar seus caminhos de troca por core/panturrilha ou omissão de pares. A IA também permanece uma etapa separada. Nada foi publicado.

## Etapa 5 — contratos dos pares e bi-sets por ambiente — 21/10/2026

### Comportamento corrigido

As três modalidades de bi-set passam a usar o seletor de códigos musculares/padrões e uma declaração explícita dos dois lados de cada par em `public/js/biset-requirements.js`. Foram removidos os caminhos que descartavam o primeiro exercício ausente, convertiam a falta do segundo em série isolada ou preenchiam o lugar com core/panturrilha. Uma lacuna agora bloqueia a geração do dia/ciclo e informa o número do par e o foco solicitado.

- Agonista: cada par mantém o mesmo grupo agonista e exige movimentos diferentes. No dia de pernas, o par de posteriores declara extensão de quadril + flexão de joelho; o último par de quadríceps declara reto femoral + vastos. São pedidos explícitos da nova montagem, em vez de exigir dois exercícios para um subnível com apenas uma opção cadastrada ou preencher o segundo com core. Os grupos do dia de peito continuam incluindo tríceps/ombro e o de costas inclui bíceps, como auxiliares já presentes no plano anterior; cada par, individualmente, é do mesmo grupo.
- Antagonista: os três pares de cada dia preservam Peitoral/Costas, Bíceps/Tríceps ou Quadríceps/Isquiotibiais. Os pedidos por grupo continuam amplos, sem afirmar cobertura integral de todos os subníveis desse grupo.
- Sinergista: todos os pares do dia peito/tríceps contêm esses grupos; costas/bíceps não recebe mais lombar ou ombro no lugar do bíceps; pernas/ombros inclui ombros em todos os pares. Os subníveis e padrões de cada lado estão declarados no contrato.

Os movimentos podem ser reutilizados em pares diferentes para preservar os pedidos com pouca variedade, mas os dois lados de um mesmo par não podem ser o mesmo movimento. A lista de exclusões continua valendo. As quantidades de pares (4 no agonista/sinergista, 3 no antagonista), séries por nível e metas por perfil foram mantidas.

O cardio final do perfil definição passou a pedir o grupo cadastrado `Corpo Todo`, corrigindo o nome antigo `Cardio/Mobilidade` que fazia o bloco desaparecer. O core final tático usa o foco de estabilidade cadastrado. Esses complementos e o abdominal final são blocos separados, nunca substitutos de um lado do par.

### Adaptação, editor e execução

A adaptação para casa/parque também impede que uma alternativa única ocupe os dois lados de um bi-set salvo. Mantém a posição original sinalizada com o motivo `pair-variety`, sem remover o exercício e sem alegar equivalência. O retorno à academia restaura os nomes originais. As séries tradicionais continuam podendo repetir um movimento compatível, conforme o comportamento anterior.

Salvar no editor exige dois movimentos distintos por par; iniciar uma sessão também aplica essa verificação, inclusive em pares legados com nomes/aliases que resolvem para o mesmo cadastro. Os planos já salvos não são reescritos automaticamente com os contratos novos: a mudança vale para novas gerações e para as verificações de revisão/execução.

### Matriz de geração por dia — hipertrofia iniciante

| Ambiente/recursos | Divisões compatíveis | Divisões bloqueadas |
| --- | --- | --- |
| Academia | 9 | 0 |
| Casa sem recursos | 1 | 8 |
| Casa com halteres e bancos | 5 | 4 |
| Casa com halteres, bancos e barra alta | 6 | 3 |
| Parque com banco e barras alta/baixa | 3 | 6 |

São nove divisões individuais, não nove ciclos completos. A divisão antagonista de quadríceps/posteriores é possível sem recursos com os movimentos corporais cadastrados. Um ciclo inteiro continua bloqueado se qualquer um de seus dias não puder ser completado. Para repetir a auditoria: `node scripts/audit-biset-alignment.mjs`; motivos e pares em `audit/biset-alignment.json`.

### Validação

- Suíte geral: 64 testes aprovados e 2 ignorados por dependerem do emulador de banco.
- Novos testes de bi-set percorrem 108 combinações em academia (9 divisões × 3 níveis × 4 perfis) e verificam quantidade, pares distintos, complexidade iniciante e separação do core/cardio.
- Testes adicionais cobrem papéis dos pares, ausência de um lado, catálogo com uma única alternativa, recursos, exclusões, rótulos renomeados, recusa de divisão inválida, adaptação para alternativa única e salvamento de pares repetidos.
- Build, sintaxe e lint aprovados.
- `npm run test:biset` passou no navegador móvel com Firebase simulado: geração/salvamento das três modalidades, papéis dos pares, falha sem alterar plano/prévia, bloqueio de par repetido e de adaptação com alternativa única. Evidência em `audit/biset-browser-validation.json`.
- Os testes de navegador de ciclo completo, ambientes e editor também passaram.

Circuitos, calistenia e geração/importação por IA ainda precisam da revisão de completude e dos mesmos contratos. Esta etapa confirma a consistência técnica dos pares com o catálogo; não valida a prescrição profissional. Nada foi publicado.

## Etapa 6 — circuito, calistenia e atalho Casa — 21/10/2026

### Montagem completa e restrição de equipamento

Circuito e calistenia agora usam o seletor de focos/padrões e acumulam todos os pedidos ausentes. Se uma estação não puder ser preenchida, o gerador rejeita o dia/ciclo, sem entregar uma versão menor silenciosamente. No circuito, o cardio voltou a aparecer ao corrigir o grupo antigo `Cardio/Mobilidade` para o cadastrado `Corpo Todo`. A estrutura contém sete estações de circuito e um abdominal separado ao final, totalizando os oito pedidos originais.

Calistenia não seleciona mais pesos livres ou máquinas, mesmo em academia com todas as categorias habilitadas. Seus seis pedidos são peitoral esternocostal, tríceps lateral/medial, puxada vertical, bíceps braquial, quadríceps/vastos e core de estabilidade. A restrição `equipmentPolicy: bodyweight` acompanha todos os blocos, inclusive o abdominal, no salvamento, cópia, adaptação, adição/troca de exercícios e início da sessão. Novos blocos acrescentados a uma ficha inteiramente corporal herdam a restrição. O editor identifica esses blocos como `Somente peso corporal e calistenia`.

Ao reabrir um plano de calistenia antigo, os blocos recebem essa restrição sem reescrever seus exercícios. Um peso livre que tenha sido salvo no plano antigo precisa ser revisado; não se torna calistenia por causa do nome do método. As validações de salvamento/execução impedem misturar esses equipamentos nos blocos restritos.

### Cadastro que faltava

Foi acrescentada `Rosca Corporal em Barra Baixa`, um exercício com peso corporal e requisito explícito `low-bar`, usando o foco `biceps` e o padrão `flexao-cotovelo-supinada`. A execução e a complexidade moderada foram baseadas na descrição do [Bodyweight Biceps Curl, Calisthenics.com](https://calisthenics.com/exercise/bodyweight-biceps-curl/). O cadastro exige barra baixa fixa própria para suportar o corpo e diferencia flexão dos cotovelos de remada; não aceita apenas uma barra alta como recurso. A indicação de complexidade é uma classificação operacional, sujeita à revisão profissional do conteúdo.

O movimento permite atender o pedido direto de bíceps da calistenia sem inventar equivalência com uma remada ou inserir halteres. Como utiliza os contratos existentes, também melhora as alternativas de bíceps das fichas tradicionais no parque. O teste da ficha B com banco e barras alta/baixa foi atualizado: as duas roscas passaram a ter alternativa, enquanto os demais focos seguem a mesma verificação.

### Atalho Casa

O caminho legado `Casa` foi integrado ao seletor validado, eliminando sorteio por grupo amplo e nomes de fallback. Ele sempre usa o cenário sem recursos, independentemente dos recursos marcados no ambiente global, respeita exclusões e o limite de complexidade iniciante e gera cinco movimentos (quatro estações e core final). Sua descrição explicita peito, quadríceps e core com cardio, em vez de prometer um FullBody completo sem puxadas. Continua separado dos geradores integrais de circuito/calistenia, que exigem recursos para todos os seus pedidos.

### Resultado por ambiente — hipertrofia iniciante

| Recursos | Circuito integral | Calistenia integral |
| --- | --- | --- |
| Academia | Compatível | Compatível |
| Casa sem recursos | Bloqueado | Bloqueado |
| Casa com halteres e bancos | Bloqueado | Bloqueado |
| Casa com banco e barras alta/baixa | Compatível | Compatível |
| Parque sem recursos | Bloqueado | Bloqueado |
| Parque com banco e barras alta/baixa | Compatível | Compatível |

Comandos reproduzíveis: `node scripts/audit-circuit-calisthenics.mjs` e `npm run test:circuit-calisthenics`. Relatórios em `audit/circuit-calisthenics-alignment.json` e `audit/circuit-calisthenics-validation.json`. Os três relatórios anteriores também foram recalculados: no cenário de parque equipado, as fichas prontas sem pendências passaram de 27 para 30 das 54; as divisões individuais de bi-set completas passaram de 3 para 4 das 9. Isso não elimina as lacunas dos outros focos.

### Verificação

- Suíte geral: 71 testes aprovados, 2 ignorados por dependerem do emulador de banco.
- Sete testes novos verificam 48 combinações de método/perfil/nível/ambiente, quantidade de pedidos, recursos, ausência de estações, exclusões, restrição corporal persistida e geração Casa sem equipamentos.
- Navegador móvel com Firebase simulado: geração e salvamento de circuito/calistenia em academia/parque, início das sessões, bloqueio de halteres na adição à calistenia, falhas sem alterar plano/prévia, atalho Casa e largura móvel aprovados.
- Regressões de ciclo completo, alinhamento tradicional (15 cenários), propostas por ambiente, bi-sets e editor aprovadas no navegador.
- Build, sintaxe e lint aprovados; catálogo das funções regenerado a partir da fonte atualizada.

Geração/importação por IA é a próxima etapa pendente. Nenhuma publicação ou validação profissional da prescrição foi realizada.

## Etapa 7 — decisão sobre IA — 21/10/2026

O usuário escolheu adiar toda a IA nesta fase. A versão local agora remove as entradas de criação/importação e bloqueia também as rotas de IA no servidor antes de quota ou provedor. A fila antiga permanece armazenada, sem restauração automática. Cadastro manual, modelos validados, fichas salvas e histórico continuam disponíveis.

A decisão e o contrato para uma futura importação assistida estão em [DECISAO-USO-IA.md](DECISAO-USO-IA.md). O primeiro uso futuro será organizar dados de uma ficha existente, com pendências explícitas e validação determinística; criação autônoma e prescrição ficam fora desse escopo.

Suíte geral: 72 aprovados e 2 ignorados por dependerem do emulador de banco. O teste de API confirma bloqueio antes de quota/provedor e preservação da rota de recompensas. O teste de navegador `npm run test:ai-deferred` confirma ausência das entradas, zero requisições de IA, guarda da fila após recarregar e funcionamento de cadastro manual/modelos. Testes de ciclo completo e editor, build, sintaxe e lint passaram. Não houve chamadas reais ao provedor nem publicação.

## Etapa 8 — expansão sem bandas — 22/10/2026

O usuário autorizou avançar com os candidatos do documento, sem bandas elásticas. Seis movimentos foram acrescentados ao catálogo local, que passou de 123 para 129. A configuração agora distingue banco firme de parede/apoio para equilíbrio. A execução da rosca corporal com resistência da própria perna foi esclarecida na fonte original e cadastrada na versão sentada com banco declarado.

Casa apenas com halteres passou de 22 para 24 fichas prontas completas entre 54; casa/parque com apenas apoio de equilíbrio passou de 19 para 20. Banco com barra alta agora permite circuito, calistenia e a divisão antagonista bíceps/tríceps sem barra baixa. As lacunas de puxada vertical sem barra e extensão de joelho não foram ocultadas. Detalhes, fontes, comparação e limitações: [EXPANSAO-CATALOGO-SEM-BANDAS.md](EXPANSAO-CATALOGO-SEM-BANDAS.md).

Validação: 76 testes aprovados, 2 dependentes de emulador ignorados, build e lint aprovados. Navegador local aprovou expansão, recursos por ambiente, circuito/calistenia e 15 cenários tradicionais. IA continua adiada e nenhuma publicação foi realizada.

## Etapa 9 — somente bi-set complementar — 22/10/2026

Os modelos automáticos de mesmo grupo e de grupos opostos foram retirados dos seletores e do gerador. Permanece apenas o **Bi-set complementar**, com três divisões. O editor manual aceita combinações livres, sem exigir esse relacionamento muscular. Planos antigos dos dois modelos retirados são preservados como personalizados, sem regeneração, conversão de pares ou perda do contador.

Suíte atual: 75 aprovados e 2 dependentes do emulador ignorados. Os testes de navegador confirmaram geração complementar, três combinações manuais salvas/executadas, restauração dos dois tipos antigos após recarga, preferência antiga sem plano e regressões do editor/ciclos. Build e lint aprovados. Detalhes em [SIMPLIFICACAO-BISET.md](SIMPLIFICACAO-BISET.md). Sem publicação.

## Etapa 10 — simulações adversas e premissas — 22/10/2026

Auditoria sem alterações funcionais: 56.700 tentativas determinísticas e 120 sondas adicionais de planos, mais seis reproduções no Edge com Firebase simulado. Os contratos das montagens novas aceitas passaram, mas a interface confirmou perda de plano/contador na falha de substituição, exclusão persistida ignorada pelo modal, unidade incorreta em prancha por tempo, barra fixa usada com chip desmarcado, método global restringindo ficha pessoal e sugestões de alta complexidade no iniciante. ABCD e foco em inferiores também apresentaram lacunas de padrões que os pedidos amplos não garantem.

O diagnóstico diferencia defeitos, decisões de política e limites da análise. A suíte existente continua com 75 aprovados e 2 de emulador ignorados; lint aprovado. Prioridades e evidências: [DIAGNOSTICO-SIMULACOES-TREINOS.md](DIAGNOSTICO-SIMULACOES-TREINOS.md). Não houve alteração de dados reais, correção funcional ou publicação nesta auditoria.

## Etapa 11 — correções prioritárias e retirada do modelo de calistenia — 22/10/2026

Corrigidas a substituição destrutiva de plano, a exclusão ignorada pelo modal, a unidade inicial de exercícios por tempo, o filtro de barras, a interferência do método global nas fichas pessoais e as sugestões de complexidade alta no iniciante. Os contratos de ABCD/foco em inferiores foram explicitados nos pedidos duplicados relevantes. Metas com carga do equipamento anterior agora exigem revisão explícita após adaptação.

A calistenia deixou de ser oferecida como modelo automático; seus movimentos continuam no catálogo e nas trocas de Casa com recursos declarados. Fichas antigas são preservadas como personalizadas. O bi-set complementar e a montagem manual livre continuam disponíveis.

Validação: 81 testes aprovados e 2 de emulador ignorados, oito regressões prioritárias e os fluxos existentes aprovados no Edge. A matriz atual executou 48.600 tentativas; não encontrou violações dos critérios monitorados nas montagens novas aceitas. Build e lint aprovados. Limites e evidências: [CORRECOES-PRIORIDADES-TREINOS.md](CORRECOES-PRIORIDADES-TREINOS.md). Sem publicação ou chamadas reais de IA.

## Etapa 12 — revisão de fichas existentes — 22/10/2026

Prévia e início compartilham a revisão das exclusões atuais, catálogo, recursos, política corporal, séries e pares. A adaptação considera exclusões e a academia diagnostica incompatibilidades, sem reconstruir fichas salvas ou impor contratos automáticos ao editor manual. Validação: 87 testes aprovados e 2 dependentes do emulador ignorados, dez cenários de prioridades no navegador, regressões do editor/ambientes/propostas e cache offline aprovados. Detalhes: [REVISAO-FICHAS-SALVAS.md](REVISAO-FICHAS-SALVAS.md). Sem publicação.


## Etapa 13 — parâmetros explícitos e descanso por sessão — 22/10/2026

Preferências e prévia explicam os efeitos reais dos modelos; os rótulos visíveis são Base, Pausas menores, Foco em Inferiores e Condicionamento, mantendo os valores antigos. Geração não agenda mais mudanças de descanso. A sessão recebe seu padrão, permite ajuste e recupera o valor após recarga; fichas pessoais não herdam foco global. Controles durante força voltaram a ficar acessíveis. Validação: 90 testes aprovados e 2 dependentes do emulador ignorados, navegador, editor, ambientes e offline aprovados. Detalhes: [PARAMETROS-DOS-MODELOS.md](PARAMETROS-DOS-MODELOS.md). Sem publicação.


## Etapa 14 — cobertura pelos movimentos e jornada completa — 22/10/2026

A prévia lista a cobertura por dia a partir do catálogo, separa posições de movimentos distintos e informa pendências, repetições e ênfases/padrões da referência sem representação. Títulos não garantem core. Reabrir ficha existente preserva a edição sem acrescentar abdominal. A montagem manual continua livre. Validação: 97 testes aprovados e 2 dependentes do emulador ignorados; quatro cenários de cobertura incluindo jornada completa com recarga e registro; 48.600 simulações e regressões do navegador aprovadas, além de build, lint e offline. Detalhes: [COBERTURA-MUSCULAR-DAS-FICHAS.md](COBERTURA-MUSCULAR-DAS-FICHAS.md). Sem publicação.

