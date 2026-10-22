# Revisão funcional do FitApp — 15/10/2026

Público confirmado pelo responsável: vários praticantes de academia. Referência: código local da versão publicada `193be1b7ed58c253`, incluindo interface, módulos de treino, IA, gamificação, sincronização, administração e backend.

Esta análise avalia a necessidade das funcionalidades e a correspondência entre promessa e implementação. Não é uma nova execução dos testes nem uma pesquisa com usuários. O responsável confirmou que os testes preliminares funcionaram como esperado. Não foram identificados eventos de análise de uso no código examinado; não há aqui dados suficientes para afirmar quais recursos aumentam retenção. As decisões abaixo são recomendações de produto e engenharia, com hipóteses de valor a validar.

## Direção recomendada

O produto deve permitir que alguém registre sua ficha, execute o treino com pouco esforço e consulte o que fez anteriormente. A prioridade é reduzir o tempo até começar e garantir confiança no histórico. Recursos secundários devem ajudar essa jornada ou permanecer opcionais.

Hoje o app combina diário de musculação, gerador de rotinas, jogo de cartas, ranking e painel de acompanhamento. Para este público, recomendo concentrar a versão principal no diário e retirar a dependência da gamificação para iniciar, salvar e concluir treinos.

**Decisão principal:** preservar o registro e a continuidade dos dados; unificar a montagem de treinos; retirar promessas não implementadas; reduzir a exposição de recursos avançados; adiar comunidade e acompanhamento de alunos.

## Critérios de decisão

- Manter: resolve uma tarefa recorrente ou protege os dados.
- Alterar: a necessidade existe, mas o fluxo, o nome ou o contrato precisa mudar.
- Opcional: tem valor para uma parte do público e pode ficar fora do caminho principal.
- Retirar: a implementação atual não entrega valor proporcional ou comunica algo que não faz.
- Adiar: exige um produto, integração ou operação que ainda não está pronto.

As prioridades não derivam de popularidade presumida. Funcionar tecnicamente é necessário, mas não prova que um recurso precisa existir.

## Inventário e decisão sobre 60 capacidades

Cada linha representa uma capacidade do produto ou de sua operação. Funções internas de armazenamento, autenticação e validação estão agrupadas na capacidade que sustentam; não são 60 funções JavaScript isoladas.

### Conta, entrada e navegação

| ID | Capacidade | Decisão | Necessidade e revisão proposta |
|---|---|---|---|
| 01 | Entrar com Google | Manter | Identifica a conta e permite recuperar dados. Melhorar mensagens de falha e experiência móvel antes de adicionar outros provedores. |
| 02 | Exigir login antes de conhecer o app | Alterar | Manter conta para sincronizar; permitir demonstração sem dados pessoais. Modo convidado com posterior migração é uma evolução separada, não requisito imediato. |
| 03 | Perfil e identificação do atleta | Alterar | Nome e inicial devem vir da conta atual; o HTML contém o nome do criador e a inicial C. Essencial para não confundir usuários diferentes. |
| 04 | Encerrar sessão | Manter | Necessário em aparelho compartilhado. Explicar pendências de sincronização e preservar o isolamento entre contas. |
| 05 | Configuração inicial | Alterar | Perguntar primeiro se a pessoa já tem ficha. Oferecer cadastrar/importar ou escolher um modelo; não exigir entender métodos e campanha. |
| 06 | Navegação principal | Alterar | Usar Treinar, Meus treinos, Histórico e Mais. Biblioteca, perfil e conquistas ficam em Mais ou em acessos contextuais. |
| 07 | Vocabulário militar e identidade visual | Alterar | Usar nomes diretos por padrão: exercício, equipamento, treino, salvar, sair. Uma aparência temática pode ser opcional. |
| 08 | Cores vinculadas ao objetivo do treino | Opcional | Aparência não precisa depender de hipertrofia, inferiores ou condicionamento. Separar preferência visual dos parâmetros da ficha. |

### Montagem e organização da ficha

| ID | Capacidade | Decisão | Necessidade e revisão proposta |
|---|---|---|---|
| 09 | Meus treinos/templates | Manter | É o centro da recorrência: salvar, editar e reutilizar uma ficha com nome estável. Tornar a edição explícita. |
| 10 | Prévia antes de começar | Manter | Permite conferir a ficha; evitar etapas intermediárias obrigatórias. |
| 11 | Adicionar, retirar e substituir exercício | Manter | Resolve aparelho ocupado e ajustes da ficha. Distinguir mudança apenas de hoje de alteração permanente do modelo. |
| 12 | Série e meta de repetições configuráveis | Manter | Informação básica da ficha. Exibir unidades e limites de forma consistente. |
| 13 | Exclusão de template | Manter | Necessária à organização; preservar histórico e oferecer confirmação clara. |
| 14 | Criar plano, Forja e IA em fluxos separados | Alterar | Unificar em Criar treino, com Manual, Modelo e Importar texto. Mesmo editor e mesmo formato de dados no final. |
| 15 | Fichas ABC e ABCD | Manter | Oferecer como modelos editáveis, sem obrigar todos a usar essas divisões. A ficha existente deve ter prioridade. |
| 16 | Bi-set agonista, antagonista e sinergista | Opcional | Preservar execução de pares; mover as variantes do gerador para opções avançadas com explicação curta. |
| 17 | Circuito | Opcional | Manter como tipo de bloco no editor; evitar outro produto ou outra navegação para executá-lo. |
| 18 | Gerador local aleatório | Alterar | Pode criar um rascunho, mas deve permitir revisão e salvar a seleção. Modelos estáveis devem ser a alternativa simples. |
| 19 | Objetivos: hipertrofia, definição, inferiores, tático | Alterar | Apresentar preferências como sugestões de organização. O motor atual usa regras fixas; os rótulos não provam personalização ou resultado físico. |
| 20 | Iniciante, intermediário e avançado | Alterar | Autodeclaração útil como preferência, não avaliação do atleta. Não vincular mudança de nível a frequência ou pontuação. |
| 21 | Academia, casa e parque/praia | Alterar | O que determina compatibilidade é equipamento. Guardar conjuntos de equipamentos por local, sem deduzir que toda casa ou academia é igual. |
| 22 | Adaptação de exercícios ao ambiente | Alterar | Mostrar propostas de troca e pedir revisão; não alterar silenciosamente a ficha original. Preservar o bloqueio quando falta alternativa. |
| 23 | Travar campanha e impedir ajustes | Retirar | Substituir por Plano ativo editável, com versão/data de revisão. Ficha reutilizável não precisa de bloqueio. |
| 24 | Campanha de 24 treinos ou 56 dias | Alterar | Converter em lembrete configurável de revisão. A contagem não deve forçar novo plano nem sugerir evolução de nível. |

### Execução e registro

| ID | Capacidade | Decisão | Necessidade e revisão proposta |
|---|---|---|---|
| 25 | Registrar carga, repetições e série realizada | Manter | Principal tarefa do produto. Priorizar campos legíveis, poucos toques e persistência imediata. |
| 26 | Mostrar valores do treino anterior | Manter | Reduz digitação e ajuda a consultar a referência. Separar valor anterior de valor efetivamente registrado. |
| 27 | Copiar valores da primeira série | Manter | Atalho útil; indicar alcance e permitir desfazer. Não copiar a marcação de realização. |
| 28 | Herdar valores vazios ao marcar a série | Alterar | A conveniência pode gerar registro involuntário. Usar ação explícita para copiar a referência ou deixar claro o preenchimento aplicado. |
| 29 | Acrescentar/retirar séries durante o treino | Manter | Permite registrar o realizado. Não descartar séries concluídas ao reduzir a ficha. |
| 30 | Cronômetro de descanso | Manter | Utilidade direta. Configuração simples por treino/exercício; aviso visual e som opcional. |
| 31 | Cronômetro total e progresso | Manter | Ajuda a acompanhar a sessão; duração e percentual não devem ser apresentados como medida de qualidade. |
| 32 | Modo de foco durante a execução | Manter | Reduz distração; manter acessíveis salvar, pausar quando disponível e sair com segurança. |
| 33 | Avisos por voz e sons | Opcional | Podem reduzir interação com a tela. Preferência persistida e controles separados para voz e sinais curtos. |
| 34 | Piloto automático | Alterar | Renomear para Intervalos guiados e esconder nas opções avançadas. Continuar exigindo confirmação do que foi realizado. |
| 35 | Cronômetro de isometria | Alterar | Necessidade real para séries por tempo. Hoje segundos entram em reps; criar tipo de medida e campo de duração antes de expandir. |
| 36 | Preparação/aquecimento sorteado | Alterar | Deixar opcional e editável ou definido no modelo. A seleção aleatória atual não deve parecer preparação personalizada. |
| 37 | Volta à calma obrigatória e bônus | Alterar | Oferecer após o resumo como opção. Retirar promessa de bônus se o servidor não aplica regra correspondente. |
| 38 | Contrato de Elite/Snap | Retirar | Interrompe toda partida e pede +2 kg com ouro garantido; a regra não é aplicada pelo serviço de recompensas. |
| 39 | Salvar treino incompleto | Manter | O diário precisa refletir o que ocorreu. Separar explicitamente de Descartar e preservar as séries realizadas. |
| 40 | Tempo mínimo de dois minutos para salvar | Alterar | Separar registro de elegibilidade a recompensa. Um registro curto não deve ser recusado por regra do jogo. |
| 41 | Abortar sem salvar | Alterar | Nomear Descartar sessão. Mostrar primeiro Salvar o realizado; descarte exige confirmação. |

### Histórico, evolução e cardio

| ID | Capacidade | Decisão | Necessidade e revisão proposta |
|---|---|---|---|
| 42 | Histórico detalhado, calendário semanal e mensal | Manter | Central para consulta. Reunir em Histórico com alternância de visualização; acrescentar paginação para além dos 500 registros atuais. |
| 43 | Excluir registro do histórico | Manter | Necessário para corrigir registros indevidos; preservar consistência com sincronização e contagem de plano. Edição auditável de registros é evolução desejável. |
| 44 | Próximo treino sugerido | Alterar | Usar ordem do plano e último treino de força pertinente. Cardio, registros incompletos e templates não podem reiniciar inadvertidamente a sequência A/B/C. |
| 45 | Evolução da carga por exercício | Manter | Útil para consultar tendência; mostrar também repetições e tipo de carga. Maior kg isolado não resume toda a evolução. |
| 46 | Alerta de recorde pessoal | Alterar | Hoje compara com referência anterior, não com todo o histórico. Renomear para Acima da referência anterior ou implementar recorde histórico com critério explícito. |
| 47 | Radar de distribuição muscular em 30 dias | Alterar | Usar barras e detalhamento das séries contabilizadas. Exibir distribuição de registros, sem concluir simetria, recuperação ou adequação. |
| 48 | Mapas anatômicos na prévia e biblioteca | Opcional | Consolidar o componente e usar legenda. Ajudam a localizar grupos; não medem ativação ou esforço real. |
| 49 | Registro de cardio | Manter | Complemento útil ao treino de academia: modalidade, duração e distância. Interface mais simples que a musculação. |
| 50 | Calorias e frequência cardíaca médias | Opcional | Entrada manual em área expandida, com origem informada. Não apresentar como leitura automática de sensores. |
| 51 | Imagem para compartilhar treino | Opcional | Manter após o resumo ou no histórico. Nomear Compartilhar resumo; o código gera imagem e usa compartilhamento/download, sem integração Strava. |

### Biblioteca, IA, comunidade e operação

| ID | Capacidade | Decisão | Necessidade e revisão proposta |
|---|---|---|---|
| 52 | Catálogo, busca e explicações de exercícios | Manter | Reutilizar no editor e no treino. Busca pode dispensar uma aba exclusiva no começo. Conteúdo precisa de revisão e fonte. |
| 53 | Busca de demonstração no YouTube | Alterar | Preferir links selecionados e revisados. Enquanto for busca externa, identificar como busca e não como demonstração validada pelo app. |
| 54 | Importação de texto com IA | Manter | Resolve transcrição de ficha recebida. Exigir prévia, preservar texto de origem e sinalizar itens não reconhecidos, sem substituição oculta. |
| 55 | Geração com IA chamada de periodização | Alterar | Renomear Rascunho de ficha. A saída atual contém dias, exercícios, séries e repetições; não representa por si só uma progressão planejada ao longo das semanas. Deixar secundária à ficha do usuário. |
| 56 | Mensagem motivacional via API | Retirar | O backend devolve frase fixa; chamada autenticada, quota e espera não se justificam. Uma frase local opcional resolve o mesmo uso. |
| 57 | Álbum, pacotes e fabricação | Opcional | Retirar do fluxo obrigatório. Preservar coleções existentes; preferir marcos determinísticos de uso. Validar interesse antes de manter toda a economia de repetidas. |
| 58 | Arena/ranking global | Adiar | A fórmula mede coleção e sorte, não desempenho. Se voltar, ter adesão explícita, apelido e critério transparente; não comparar usuários por kg bruto. |
| 59 | Indicadores de integração Watch7 e Strava | Retirar | São elementos visuais ON/Sync sem conexão correspondente no código. Reintroduzir somente com integração e estado real de autorização. |
| 60 | Painel administrativo e edição do catálogo | Alterar | Manter operação restrita e catálogo revisado. Adiar produto de treinador/alunos. Usuários/atividade devem vir do registro de conta e sessões, não da abertura de recompensas. |

## Problemas que precisam preceder uma ampliação do público

### 1. Promessas do desafio não correspondem ao backend

`public/index.html:574` ainda pede +2 kg e promete ouro garantido. `beginWorkoutExecution` abre esse modal antes do início. `functions/rewards.js:17` sorteia a raridade; o estado `isSnapRewardActive` é atribuído no cliente e não participa da decisão no servidor. Também há mensagem de bônus ao terminar a volta à calma sem regra equivalente no serviço.

Recomendação: remover o desafio e as promessas de bônus do fluxo; começar diretamente após a revisão da ficha. O sorteio existente pode continuar disponível apenas na área opcional até a decisão sobre o álbum. Essa inconsistência permaneceu após a correção anterior da sugestão automática de carga em outra parte da tela; o teste funcional de execução não detecta todas as promessas textuais.

### 2. Integrações e perfil comunicam estados fictícios

`public/index.html:442–444` contém inicial e nome fixos. `public/index.html:505–517` mostra relógio ON e Strava Sync, sem handlers de conexão correspondentes. `exportStravaCard` apenas cria uma imagem. Isso é especialmente problemático quando outra pessoa usa o app.

Recomendação: dados de identidade da conta ativa; retirar indicadores de integração. Uma integração Strava real envolve aplicativo autorizado e consentimento via OAuth; o estado atual não implementa esse fluxo. [Documentação oficial do Strava](https://developers.strava.com/docs/getting-started/).

### 3. Há mistura de unidades nos registros

O temporizador em `public/js/ui.js` escreve segundos no input `rpInp`, e o estado salva esse valor como `reps`. O resumo compartilhável calcula `kg × reps`. Logo, uma série por tempo pode ser interpretada como repetições e contaminar o cálculo de volume.

Recomendação: modelo de série com `measurementType` e `durationSecs` separados de `reps`, preservando a compatibilidade com registros antigos. Não converter registros legados automaticamente: o valor sozinho não informa a unidade original. Volume e gráficos devem excluir ou tratar explicitamente séries por tempo.

### 4. O sistema de recompensa interfere no diário

`finishWorkout` exige dois minutos para salvar musculação; `functions/rewards.js` usa duração mínima para recompensa. São necessidades diferentes. Usuários devem poder registrar uma sessão curta ou interrompida, independentemente de ganhar carta.

Recomendação: salvar primeiro, mostrar resumo imediatamente, processar conquista opcional depois. Regras da recompensa não devem decidir se um fato pode entrar no histórico.

### 5. Métricas atuais exigem nomes mais precisos

O aviso de PR compara valores com a referência anterior encontrada. O gráfico por exercício usa o máximo de kg por dia. O radar agrega séries por grandes grupos. O ranking calcula `album.length * 10 + repetidas`; fabricar uma carta consome três repetidas e pode elevar essa pontuação sem novo treino. Esses números podem existir, mas não sustentam os nomes recorde histórico, análise biomecânica ou poder físico.

Recomendação: nomes que descrevam os dados e critérios visíveis. Diferenciar recorde por carga, por repetições com a mesma carga e por duração. Separar exercícios/máquinas e modalidades quando a comparação não for equivalente.

### 6. Catálogo e perfil não devem depender do jogo

O painel lê `jogadores`, e `ultimoAcesso` é atualizado no serviço de recompensa. Um praticante que registra sessões mas não abre pacotes pode não ser contado corretamente; atividade do jogo também não é necessariamente atividade de treino. O catálogo editado no Firestore é mesclado ao dicionário do cliente, enquanto o gerador do servidor usa `functions/catalogue.json`, produzido no build: uma edição administrativa pode não existir na versão usada pela IA.

Recomendação: separar conta, sessões, preferências e colecionáveis. Versionar o catálogo e alinhar a publicação cliente/servidor. Manter administração mínima; não criar vínculo treinador/aluno e acesso a históricos como consequência de um painel operacional.

## Estrutura sugerida da próxima versão

1. **Treinar:** retomar sessão, próximo treino pertinente, lista curta de fichas e cardio. Um caminho direto para executar.
2. **Meus treinos:** fichas salvas, edição e Criar treino. Manual, modelo e importação convergem no mesmo editor.
3. **Histórico:** lista/calendário, detalhes e evolução por exercício; resumo salvo separado de recompensas.
4. **Mais:** perfil, equipamentos, voz, biblioteca, conquistas opcionais, ajuda e dados da conta.

Antes do primeiro treino, oferecer Já tenho uma ficha e Quero escolher um modelo. Não exigir escolher um plano de 24 sessões nem navegar para configurações para começar. Um editor manual claro deve continuar funcionando quando a IA estiver indisponível.

## Capacidades ausentes com prioridade maior que novos recursos sociais

- Estado visível de persistência: Salvo neste dispositivo, Sincronizando e Sincronizado; recuperação de falha acessível.
- Sessões e modelos com conflito entre dispositivos resolvido sem sobrescrita silenciosa. Exclusões precisam de marcação sincronizável para não ressuscitar um template de outra cópia local.
- Exportação legível e exclusão integral dos dados da conta, com escopo e confirmação claros.
- Edição explícita, duplicação e ordenação de fichas/exercícios; separar alteração do modelo da adaptação do treino atual.
- Tipo e unidade da série: repetições, segundos, carga total/por halter, peso corporal quando aplicável. Mostrar convenção sem presumir equivalência.
- Notas de sessão e exercício para observações do próprio usuário; não transformar texto em diagnóstico automático.
- Histórico paginado e registro de correções. Os 500 registros carregados atualmente não podem parecer todo o acervo indefinidamente.
- Acessibilidade e uso em aparelho real: contraste, foco, tamanho de toque, funcionamento com ampliação e uso de leitor de tela.

## Sequência de implementação e aceitação

**Etapa 1 — confiança e fluxo central.** Retirar Snap, indicadores falsos, chamada de motivação e mensagens de bônus não sustentadas; carregar identidade real; separar salvar de recompensa; corrigir unidade da isometria. Aceitação: começar sem desafio, salvar parcial/curto, enxergar apenas valores da própria conta e distinguir segundos de repetições no registro e no resumo.

**Etapa 2 — montagem unificada.** Unificar criadores, deixar modelos e métodos avançados opcionais, substituir campanha bloqueada por plano editável e revisar nomes de IA/PR. Aceitação: criar manualmente, importar e escolher modelo chegam ao mesmo editor; alterações de hoje não mudam a ficha permanente sem ação explícita.

**Etapa 3 — continuidade e dados.** Resolver conflitos, exclusões sincronizadas, paginação, exportação e exclusão da conta. Separar perfil de gamificação e alinhar versão do catálogo. Aceitação: criar/editar/excluir em dois dispositivos não perde nem recria dados; histórico antigo continua acessível.

**Etapa 4 — validar os opcionais.** Disponibilizar conquistas fora do fluxo principal e medir interesse. Arena, relógios, Strava e área de treinador entram apenas quando houver demanda demonstrada e operação definida. Não apagar álbuns, perfis ou históricos existentes como parte da retirada de uma aba.

Para qualquer retirada, remover a entrada de interface primeiro; manter compatibilidade com sessões e clientes antigos enquanto forem suportados. Não eliminar endpoints e coleções somente porque a navegação deixou de usá-los. Publicações devem manter cache coerente e continuidade da sessão aberta.

## Como avaliar necessidade com uso real

Instrumentar apenas eventos necessários para responder perguntas de produto, sem enviar texto de treino, notas ou identificação desnecessária para ferramentas de análise. Separar sucesso em registrar da completude física do treino: uma sessão parcial salva também pode representar sucesso do diário.

Medir: tempo até primeira série registrada; início e salvamento bem-sucedido de sessões; falhas/tempo de sincronização; retorno semanal; reutilização de fichas; consultas ao histórico; importações revisadas e salvas; procura espontânea por opcionais. Levantar desistências e entrevistar pessoas que usam e que abandonam recursos antes de estabelecer cortes definitivos.

Um piloto sugerido com 8–12 praticantes de níveis variados pode revelar problemas de entendimento e fluxo, mas não demonstra estatisticamente efeito de retenção. Não adotar percentual de sucesso ou ganho de retenção inventado como conclusão desta auditoria. A abordagem de medir conclusão de tarefas e satisfação segue a referência de [medição de serviços do GOV.UK](https://www.gov.uk/service-manual/measuring-success/measuring-the-success-of-your-service).

## Limite e estado desta entrega

Foi produzido este parecer e o inventário de decisões. Nenhuma funcionalidade foi removida do código nem republicada nesta etapa. A autorização anterior de publicação foi executada na versão já entregue; esta proposta descreve uma revisão posterior de escopo. O parecer não pressupõe que testes técnicos provem utilidade, aderência ou adequação profissional de uma ficha.
