# Catálogo e execução revisados — 30/10/2026

Implementação local autorizada após a revisão das descrições e dos contratos no chat. Sem autorização de publicação nesta etapa. As evidências anteriores, já sem commit na abertura, foram preservadas; novas evidências usam o prefixo `catalogo`.

## Conteúdo e identidade

O catálogo conserva os 129 IDs originais. Há 122 movimentos de musculação com orientações específicas e classificação versão 1; os sete de condicionamento/mobilidade ficam `selectable:false`, legíveis para históricos e fichas anteriores. Biblioteca e novas seleções não os oferecem. Novos registros aeróbicos e a preparação que sorteava mobilidade foram retirados dos caminhos de criação; sessões aeróbicas já abertas continuam recuperáveis.

O nome salvo de transporte é preservado, inclusive aliases antigos, enquanto `displayName` e o perfil de execução identificam a orientação revisada. Isso evita reinterpretar aliases antigos como Back/Front Squat ou Livre/Carga. A classificação separa região de navegação, ação, pegada, ênfase revisada e rótulos funcionais. A extensão de quadril no banco romano passa à região de pernas, com glúteo máximo/isquiotibiais na classificação revisada; os campos antigos de lombar permanecem para legados. Níveis antigos não se tornam novas escolhas.

As decisões incluem desenvolvimento com halteres sentado com encosto; francês unilateral em pé; crucifixo invertido com halteres sentado e inclinado; panturrilha sentada com dois halteres, bilateral; afundo parado; coice unilateral apoiado na própria coxa; frontal bilateral; barra com pés assistidos supinada e remada invertida pronada; Scott com barra reta ou W identificada; dip na máquina sentada; banco romano como extensão de quadril com coluna estável; ponte com calcanhares afastados; Russian Twist com pés apoiados; panturrilha no leg press 45º. O script `scripts/revise-catalogue.cjs` reproduz os 122 textos e metadados revisados, sem apagar legados.

## Contrato de execução

Novas escolhas recebem `execution` versão 1: movimento estável, variante/revisão, rótulo, base da contagem, convenção de carga, quantidade de halteres e recursos necessários. Opções de barra/acessório são identificadas explicitamente. Legados sem esse contrato permanecem inespecíficos até a ação “Revisar execução e convenção de carga”; abrir uma ficha não aplica o contrato automaticamente.

- Repetições unilaterais/alternadas: um registro por série, com meta por lado. Duas séries por lado têm duas linhas, cada uma representando ambos os lados realizados.
- Diferenças entre lados: observação da própria série; não comparar como resultado simétrico nem calcular volume exato. A observação é exigida quando a diferença é marcada.
- Prancha lateral mantém E1/D1/E2/D2 e duração real independente; prancha frontal usa segundos. Repetições não são convertidas em segundos.
- Halteres: soma dos utilizados. Dois de 20 kg = 40 kg; francês unilateral com um de 20 kg = 20 kg. Barra: barra + anilhas. Máquina: marcação do próprio equipamento, sem equivalência entre equipamentos.
- Volume aritmético exige convenção capturada. Alternada com dois halteres somados não duplica carga novamente; unilateral com um peso e meta por lado considera os dois lados. Isso não mede trabalho físico, dose muscular nem equivalência entre exercícios. Legados sem convenção e séries com resultados diferentes não recebem volume presumido.
- Referências de carga e gráficos não misturam variantes, bases de contagem ou convenções. Registros antigos continuam acessíveis, sem criar uma convenção retrospectiva.

## Receitas e trocas

Mantidas as 22 posições e as 44 opções (incluindo os originais), séries, descansos e principais/opcionais dos ABCs. Há 52 direções possíveis de troca. Cinco pares mudam contagem bilateral/por lado: lateral, francês, rosca, adução e abdução. Troca prepara nome, variante, meta e unidade conjuntamente, sem transportar números realizados. Cargas escritas em metas antigas exigem revisão explícita após a troca. Uma série/volta unilateral representa ambos os lados; descanso do bi-set inicia após os dois movimentos. Gravação local deve preceder confirmação; falha reverte a troca. Séries registradas não são sobrescritas.

Remada apoiada, extensora, martelo e prancha lateral continuam com uma única opção. Nenhuma alternativa foi inventada por semelhança de grupo. Adutora/abdutora deitadas preservam função, sem afirmar igualdade de resistência. Ficha original só muda por ação explícita com ID/revisão conferidos.

A academia passa a confirmar recursos específicos da ficha uma vez e a lembrá-los por conta/dispositivo. Categorias não confirmam máquinas específicas. A confirmação lista bancos, acessórios e aparelhos; exceções são editáveis em Ambiente e equipamentos. Uma troca pode pedir confirmação de um novo recurso antes de aplicá-la. Fora da academia, recursos obrigatórios da variante também são validados.

## Versões, histórico e transporte

Novos planos: schema 3 e receita 2. Planos schema 1/2 e receita 1 continuam legíveis, sem regenerar dias. Estado ativo 5 lê versões 1–4; rascunho 2 lê versão 1; contexto de acompanhamento 2 lê versão 1. Versões futuras são recusadas preservando os dados.

Cópias retiram apenas realizado e conservam execução. Contexto inicial e final capturam os perfis; a comparação identifica mudanças de convenção. Registros realizados transportam `executionKey` junto dos dados e observações, conservados em sincronização/exportação. IDs das ocorrências continuam distintos dos IDs do catálogo. O histórico usa a fotografia da sessão, não a ficha ou o catálogo atual. A conta, fila offline, conflitos e sessões abertas permanecem separados e recuperáveis.

Os envelopes existentes de regras aceitam JSON versionado em `trainingContext` e a lista `data`; não houve alteração das regras, índices ou API. A suíte emulada deve confirmar o transporte real antes de qualquer publicação autorizada. `npm run build` gera catálogo do servidor e cache, sem edição manual desses resultados.

## Verificação

`tests/execution-contract.test.mjs` verifica catálogo, 52 trocas, unidades, volume, versões, cópias e sincronização de metadados. `tests/execution-contract-browser.cjs` cobre confirmação de recursos, unilateral em bi-set, descanso, recarga, ficha preservada, falha de armazenamento e histórico parcial. A academia da fixture Firebase simulada declara explicitamente seus recursos; o teste novo limpa essa declaração para testar a confirmação real da interface.

Build final local: `45c2998d354451c6`. `npm run check` aprovado. `npm test`: 128 testes, 126 aprovados e dois dependentes de emulador pulados; em Auth/Firestore/Hosting `demo-fitapp`, os 128 passaram, além de sincronização entre dois contextos de navegador, fila, conflitos, paginação e exportação. O teste emulado usou o build `22e4a6a6150337e2`; os ajustes posteriores foram a classificação do banco romano e sua categoria na biblioteca, sem mudança de formato/transporte. Na versão final foram repetidos os testes unitários, verificação estática, execução revisada e offline.

As nove suítes funcionais e três suítes de aparência/design/offline passaram. Também passaram propostas de ambiente e bi-sets; a expectativa antiga da preferência sem plano foi atualizada para o ABC vigente, preservando os testes de planos antigos. O teste dedicado inclui referência homônima sem convenção no mesmo histórico, que não pode fornecer carga à execução revisada. Capturas em claro/escuro foram inspecionadas; a informação por lado fica abaixo da linha de registro sem comprimir os campos.

Evidências novas: `audit/catalogo-*`, com resumo em `audit/catalogo-validation-summary.json`. O log detalhado do emulador fica somente local; o relatório versionado não inclui credenciais ou requisições completas. Simulações não representam aparelhos Android/iPhone físicos nem produção. Quatro posições continuam sem alternativas revisadas; não foram preenchidas automaticamente.

## Registro no GitHub

Branch `codex/catalogo-execucao-revisados`, baseada em `a222cffbedf2138c391234dc2be1180a11083034`. Implementação registrada no commit `ace28344abd7405646e45c3f5d7ad6cd09593645` e no [PR #2](https://github.com/caiocborges88/fitapp-api/pull/2), aberto como rascunho. A base é `codex/simplificar-fluxo-treino`, pois o [PR #1](https://github.com/caiocborges88/fitapp-api/pull/1) ainda contém cinco commits anteriores não incorporados à `main`. Assim a revisão desta etapa não reapresenta os pré-requisitos ABC/acompanhamento/simplificação. As auditorias antigas já alteradas e a extração de chat local ficaram fora do commit. Publicação online continua pendente de autorização específica desta etapa.
