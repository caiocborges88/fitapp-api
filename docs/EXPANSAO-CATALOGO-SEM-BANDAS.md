# Expansão implementada sem bandas

22/10/2026. Alterações locais, sem publicação. IA permanece adiada. O catálogo passou de 123 para 129 movimentos, com seis novos registros. Não foram introduzidas bandas ou ancoragens para elásticos.

## Movimentos disponíveis

| Movimento | Foco e padrão usados pelo seletor | Recursos fora da academia |
| --- | --- | --- |
| Crucifixo no Solo com Halteres | Peitoral esternocostal / adução horizontal | Halteres; casa |
| Crucifixo Invertido Curvado em Pé com Halteres | Deltoide posterior / abdução horizontal | Halteres; casa |
| Rosca Inversa com Halteres | Braquial/antebraço / flexão neutra-pronada de cotovelo | Halteres; casa |
| Remada Bilateral Curvada com Halteres | Espessura das costas / puxada horizontal | Halteres; casa |
| Panturrilha em Pé com Joelhos Flexionados e Apoio | Sóleo / flexão plantar com joelho flexionado | Apoio de equilíbrio; casa ou parque |
| Rosca Corporal Sentada com Resistência da Perna | Bíceps / flexão supinada de cotovelo | Banco firme; casa ou parque |

Cada cadastro tem ID, descrição específica, complexidade, recursos, padrão, foco e fonte. Os subníveis expressam ênfase operacional, não isolamento ou igualdade de resistência. As quatro variantes com halteres são recusadas em blocos estritamente corporais. O parque continua seguindo a política de peso corporal e recursos fixos declarados.

O novo recurso `balance-support`, apresentado como **Parede ou apoio firme para equilíbrio**, não é presumido em casa ou no parque. Ele é distinto de `bench`: ter parede não autoriza exercício que exige banco, nem ter uma barra autoriza presumir parede. Remover o apoio recalcula a sessão e volta a sinalizar o sóleo quando não houver outra alternativa. Os controles continuam bloqueados durante a execução.

## Fontes de execução e pesquisa adicional

- [PureGym — crucifixo no solo](https://www.puregym.com/exercises/chest/chest-fly/dumbbell-floor-fly/): fundamenta a variante sem banco. A amplitude é delimitada pelo solo; a descrição orienta ajustar a carga.
- [PureGym — fly curvado](https://www.puregym.com/blog/upper-body-workout-for-females/): execução em pé com tronco inclinado, distinta da versão apoiada já existente.
- [MuscleWiki — rosca inversa](https://musclewiki.com/pt-br/exercise/dumbbell-reverse-curl): confirma a pegada pronada e a flexão de cotovelo.
- [City of Madison — Bent-over Row, 2 arm DB](https://www.cityofmadison.com/fire/documents/frf-intro-to-firefighter-fitness.pdf): referência para a remada bilateral com halteres. O trecho foi localizado na busca; a abertura integral do PDF retornou timeout. A direção horizontal também é coerente com a [descrição de remada com halter da Mayo Clinic](https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/bent-over-row/vid-20084680).
- [East Lancashire Hospitals — página 8, calf raises with knees bent](https://elht.nhs.uk/download_file/view/18069/4570): descreve fortalecimento do sóleo com os joelhos flexionados. O aplicativo exige apoio; não foram importados os tempos e volumes da ficha clínica.
- [MuscleWiki — rosca corporal concentrada](https://musclewiki.com/de-de/exercise/bodyweight-concentration-curl): a fonte esclarece que a perna oposta oferece resistência à mão supinada e o cotovelo se apoia no outro joelho. Implementamos a versão sentada com banco declarado; não foi liberada como exercício sem recursos.

A investigação adicional também esclareceu a [extensão de joelho com halter](https://musclewiki.com/de-de/exercise/dumbbell-leg-extension): a fonte descreve banco e carga entre os pés, mas não fundamenta equivalência de prescrição ou a ênfase específica em reto femoral usada pelas fichas. Ela permanece fora do catálogo ativo até revisar classificação, retenção da carga e progressão.

Pullover e Sissy também permanecem em revisão. O [estudo de pullover com barra de 2011](https://pubmed.ncbi.nlm.nih.gov/21975179/) encontrou maior atividade de peitoral que de latíssimo naquela execução; isso não resolve a classificação de uma versão com halter nem autoriza tratá-la como puxada vertical. A [demonstração do treinador para Sissy corporal](https://progressiveperformancep2.com/blogs/p2-training-club/bodyweight-sissy-squats) exige suporte rígido e progressão própria. Não foi usada para preencher automaticamente o pedido de reto femoral no iniciante.

## Cobertura medida

A comparação foi executada com as mesmas regras e os mesmos recursos, retirando somente os seis novos IDs para reconstruir a base anterior. Inclui 54 fichas prontas, nos perfis e níveis cadastrados, em dez combinações de ambiente/recursos. Não mede eficácia, carga ou adequação individual da prescrição.

| Cenário | Fichas sem pendências antes → depois | Posições pendentes antes → depois |
| --- | --- | --- |
| Casa apenas com halteres, sem banco | 22 → 24 de 54 | 49 → 42 |
| Casa apenas com apoio de equilíbrio | 19 → 20 de 54 | 97 → 92 |
| Parque apenas com apoio de equilíbrio | 19 → 20 de 54 | 97 → 92 |
| Casa com banco e barra alta, sem barra baixa | 25 → 25 de 54 | 64 → 49 |
| Parque com banco e barra alta, sem barra baixa | 25 → 25 de 54 | 64 → 49 |

Nos cinco cenários anteriores restantes, a quantidade de fichas completas e de posições pendentes não mudou. Em particular, casa/parque sem nenhum recurso continuam com 19 de 54 fichas completas. Não somar as posições dos cenários como se fossem exercícios únicos.

Nos geradores de hipertrofia iniciante, banco e barra alta agora permitem **circuito e calistenia**, tanto em casa quanto no parque, sem exigir barra baixa. Esses dois casos por ambiente antes eram bloqueados. Não significa liberação de todo o ciclo ABC tradicional ou de todas as divisões do bi-set complementar. A geração antagonista foi retirada posteriormente por decisão de simplificar os modelos; a auditoria atual considera somente os métodos disponíveis.

Não houve regressão estrutural nos cenários comparados. Permanecem indisponíveis, entre outros casos, puxada vertical sem barra e extensão de joelho com o foco exigido fora da academia. Nenhuma remada recebeu artificialmente o padrão de puxada vertical.

## Verificação e reprodução

- `npm test`: 76 aprovados, 2 ignorados por dependerem do emulador Firestore. Os novos testes cobrem recursos independentes, restauração, política corporal, pares distintos, direção de puxada e manutenção da lacuna de extensora.
- `npm run check` e `npm run build`: aprovados; catálogo das funções e versão do cache offline regenerados.
- `node tests/catalogue-expansion-browser.cjs`: interface móvel com Firebase simulado, mudança de apoio, bloqueio durante execução, original preservado, retorno à academia, calistenia ABC com banco/barra alta, salvamento e início aprovados.
- Regressões de ambientes, circuito/calistenia e 15 cenários tradicionais aprovadas no Edge local. As asserções de seleção passaram a aceitar qualquer variante que preserve o foco/padrão solicitado, em vez de exigir um nome antigo sorteado.
- `node scripts/audit-catalogue-expansion.mjs`: comparação antes/depois em `audit/expansion-without-bands-comparison.json`. Os quatro scripts de auditoria anteriores também incluem os novos cenários de recursos.

Evidências adicionais: `audit/catalogue-expansion-validation.json` e `audit/catalogue-expansion-mobile.png`. As verificações foram locais; não houve alteração de dados reais, chamada de IA ou publicação.
