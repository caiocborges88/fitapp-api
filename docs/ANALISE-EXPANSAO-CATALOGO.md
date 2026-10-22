# Expansão do catálogo para casa e parque

> Atualização de escopo em 22/10/2026: o usuário decidiu não usar bandas elásticas nesta fase. A proposta com elásticos abaixo fica arquivada para referência, sem implantação. A prioridade vigente está em `ANALISE-DOCUMENTO-WIKIMUSCLE.md`.

Análise de 22/10/2026. Proposta para desenvolvimento: nenhum movimento foi acrescentado ao catálogo ativo nesta etapa. A IA continua adiada.

## O que a auditoria mostra

O catálogo analisado tem 123 movimentos. A matriz de adaptação das fichas registrou 257 posições pendentes, distribuídas por cenários repetidos. Isso não representa 257 exercícios diferentes, nem uma previsão de quantos treinos ficariam completos com as propostas. As auditorias de geração, bi-set, circuito e calistenia também precisam ser repetidas depois de qualquer implantação.

| Solicitação da ficha | Posições pendentes na matriz |
| --- | ---: |
| Latíssimo / puxada vertical | 51 |
| Tríceps lateral/medial / extensão de cotovelo | 30 |
| Bíceps / flexão de cotovelo supinada | 30 |
| Reto femoral / extensão de joelho | 24 |
| Deltoide lateral / abdução de ombro | 21 |

Há três causas diferentes: movimento ausente, equipamento indisponível e falta de alternativa compatível com a ênfase/padrão exigidos. Só adicionar nomes não resolve as três.

## Prioridade: oito novos movimentos com elástico

As classificações abaixo são propostas operacionais. A execução, a resistência e os subníveis precisam ser revisados antes de entrarem na seleção automática; correspondência de metadados não demonstra equivalência de prescrição.

| Movimento proposto | Finalidade no catálogo | Recurso necessário |
| --- | --- | --- |
| Rosca direta com elástico | Bíceps; flexão supinada | Elástico sob os pés |
| Rosca martelo com elástico | Pegada neutra; braquial/antebraço | Elástico sob os pés |
| Elevação lateral com elástico | Deltoide lateral | Elástico sob os pés |
| Abertura horizontal com elástico, pull-apart | Candidata para deltoide posterior | Elástico |
| Tríceps coice com elástico | Extensão de cotovelo; ênfase a revisar | Elástico sob os pés |
| Crucifixo com elástico à altura do tórax | Adução horizontal; ênfase peitoral a revisar | Elástico apoiado nas costas |
| Puxada alta com elástico | Latíssimo; puxada vertical | Elástico e ancoragem alta |
| Remada com elástico | Costas; puxada horizontal | Elástico e ancoragem média |

Referências de execução: [Performance Health — rosca, coice e crucifixo](https://www.performancehealth.com/articles/33-theraband-resistance-band-exercises-to-do-at-home), [Portland State University — rosca martelo](https://www.pdx.edu/recreation/accessible-home-workouts), [Peak Physio — elevação lateral](https://www.peak-physio.com.au/exercises/strength-shoulder-lateral-raise-with-theraband/), [Rogue — pull-apart](https://www.roguefitness.com/theindex/movement-library/how-to-do-band-pull-aparts), [Centr — puxada com elástico](https://centr.com/blogs/thewarmup/cpah-tutorial-seated-banded-lat-pulldown), [biblioteca NASM — Standing Tubing Row](https://www.nasm.org/workout-exercise-guidance). Os requisitos de ancoragem são propostas de implementação a confirmar nas demonstrações escolhidas. Essas fontes não validam, por si, isolamento de cabeças musculares ou séries/cargas equivalentes às máquinas.

## Extensão de joelho: investigar antes de liberar

A nona candidata com elástico é a extensão de joelho sentada, com banco e ancoragem baixa. Também existe a execução sem carga. O [NHS OPAL](https://www.opalreturntowork.nhs.uk/exercises/seated-knee-extension/) descreve o exercício em contexto de reabilitação e sua progressão com resistência. Isso não permite assumir equivalência com a cadeira extensora de um treino de hipertrofia ou ênfase exclusiva no reto femoral.

As propostas usam `quadriceps-geral`, não `quadriceps-reto`. Por isso, deliberadamente não eliminam as 24 pendências de reto femoral no relatório. É necessário revisar tanto as alternativas quanto a exigência das fichas: talvez a intenção seja extensão de joelho, em vez de prometer um isolamento muscular.

Reverse Nordic fica como opção avançada para avaliação, sem substituição automática para iniciantes. Um [estudo de 2024](https://pubmed.ncbi.nlm.nih.gov/39214520/) não encontrou superioridade de ativação excêntrica dos quadríceps frente aos exercícios de agachamento comparados. Esse resultado não demonstra equivalência de hipertrofia ou segurança para todo usuário.

## Registros existentes e variantes a esclarecer

- Panturrilha sentada sem carga e com halteres **já existem**. As dez pendências de sóleo estão nos cenários sem recursos. Ambas exigem banco; duplicar o cadastro não muda a disponibilidade. A [referência de execução sentada](https://www.puregym.com/exercises/legs/calf-exercises/seated-calf-raises/) inclui assento e progressão com carga.
- Barra fixa com apoio dos pés já existe. Antes de propor uma versão supinada, esclarecer a pegada e a demonstração do registro atual. A [ACE descreve pegadas e assistência](https://www.acefitness.org/continuing-education/prosource/december-2014/5153/essential-exercises-for-an-optimal-strength-training-workout/). Continua sendo necessário declarar barra e apoio.
- Remada invertida em barra baixa já existe. Esclarecer a pegada antes de acrescentar variante supinada, presente no [programa Calisteniapp](https://calisteniapp.com/programs/your_first_pull_up/PL008). Uma variante não deve ser uma cópia usada apenas para completar bi-set.
- Nenhuma dessas variantes corporais supre puxada vertical sem barra. Remada, rosca corporal e exercícios lombares não devem receber esse padrão para encobrir a falta.

## Mudanças necessárias no aplicativo

1. Permitir declarar elástico em casa e no parque. Hoje `availableInEnvironment` rejeita esse equipamento em ambos, mesmo que um registro tenha os demais metadados corretos.
2. Declarar ancoragens alta, média e baixa separadamente. Não presumir uma ancoragem pela existência de porta, banco ou parede. Banco, barra alta e barra baixa continuam recursos distintos.
3. Manter elásticos fora dos blocos estritamente corporais. Uma nova opção em casa/parque não autoriza sua entrada automática na calistenia ou no atalho Casa sem recursos.
4. Revisar metadados e demonstração de cada movimento, além de progressão, resistência e metas. Não copiar a prescrição da máquina apenas pela coincidência de grupo muscular.
5. Implantar primeiro as seis opções sem ancoragem externa, depois puxada e remada ancoradas; tratar extensão de joelho separadamente. Testar cada inclusão antes de liberar o próximo conjunto.
6. Repetir as matrizes para ambiente, recursos, nível e método, verificando também pares distintos, restauração da ficha e mensagens de indisponibilidade. Não contar candidatos sobrepostos como ganhos independentes.

O resultado esperado é ampliar as opções quando o usuário declara recursos reais. Para casa/parque sem equipamentos, algumas exigências específicas continuarão indisponíveis; nesse caso o aplicativo deve explicar a limitação e oferecer uma composição compatível com os recursos e o objetivo, preservando o treino original.

## Artefatos reproduzíveis

- `audit/movement-candidates.json`: quinze itens analisados — dois já cadastrados, duas variantes a esclarecer, nove propostas com elástico e duas propostas corporais para avaliação.
- `scripts/analyze-catalogue-gaps.mjs`: cruza os itens com as pendências e as regras atuais. Executar `node scripts/analyze-catalogue-gaps.mjs`.
- `audit/catalogue-expansion-analysis.json`: correspondências estruturais, registros existentes e recursos novos por item.

Com a política e os recursos da matriz atual, os candidatos não resolvem nenhuma posição pendente adicional. Esse zero é coerente: faltam os apoios das variantes corporais, elásticos ainda são rejeitados e as propostas gerais de quadríceps não foram rotuladas artificialmente como reto femoral. A cobertura futura só poderá ser medida após implementar a declaração de recursos e validar os cadastros.
