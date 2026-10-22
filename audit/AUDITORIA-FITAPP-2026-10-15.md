# Auditoria do FitApp — 15 de outubro de 2026

## Parecer

**A versão local examinada não deve ser publicada no estado atual.** Existe um erro de sintaxe que impede o carregamento do módulo principal. Mesmo corrigindo esse bloqueio, permanecem falhas de execução, perda/duplicação de registros, exposição financeira da API e premissas frágeis na geração e progressão dos treinos.

O principal problema de arquitetura é a ausência de contratos únicos entre catálogo, gerador, interface, persistência e painel do treinador. Cada módulo faz suas próprias suposições sobre nomes, campos, identificadores e locais de armazenamento. Corrigir erros isolados sem consolidar esses contratos tende a produzir novas regressões.

Esta auditoria entrega diagnóstico e propostas. Nenhum arquivo funcional do aplicativo foi alterado, nenhum deploy foi realizado e nenhum dado de usuário foi consultado ou modificado.

## Escopo, versões e limites

- Repositório conectado: [caiocborges88/fitapp-api](https://github.com/caiocborges88/fitapp-api).
- GitHub `main`: `73dfff970fe8ea9ff79477fee37a99b832140aec`, de 29/09/2026.
- Cópia local: `5525ded095f30fb2c7537bfeb664dccd792da806`, de 09/10/2026, **17 commits à frente** da referência remota confirmada no GitHub.
- Entre as versões, mudaram `dados.js`, `forge.js`, `ui.js` e o cache de deploy. O restante do código rastreado é igual. Havia uma alteração prévia no cache de deploy local, preservada.
- Examinados: módulos do navegador, HTML, CSS, PWA/service worker, API Express/Cloud Functions, configuração Firebase, dependências, fluxo de dados, painel administrativo, gamificação e decisões de produto.
- Executados: verificação sintática dos 13 arquivos JavaScript do cliente; simulações isoladas dos principais defeitos; auditoria online das dependências de produção; conferência do código e da árvore no GitHub.
- **Não executados:** navegação real em dispositivos, login, chamadas Gemini pagas, testes de carga, exploração em produção, consulta aos documentos do Firestore, inspeção de IAM, regras efetivamente publicadas, faturamento, backups e logs de produção. Não é uma certificação de segurança nem uma validação profissional dos treinos.
- Os diagnósticos executáveis estão em `audit/reproduzir.cjs`, com resultados em `audit/evidencias.json`. Usam simulações e não acessam a produção. Nos testes da lógica local da Forja, a declaração duplicada é removida **somente da cópia em memória**, para revelar os defeitos que ela mascara.

### Prioridade

**P0:** bloqueia a versão local ou precisa ser resolvido antes de expor o serviço a novos usuários. **P1:** compromete um fluxo central, integridade dos dados ou confiança. **P2:** importante para uma operação sustentável e experiência consistente. O alcance de cada item é indicado como **local**, **ambas** ou **dependente da configuração publicada**.

## 1. Bloqueadores e falhas funcionais

### F01 — P0 — O módulo principal não carrega — local, reproduzido

**Evidência:** `forge.js:362,364` declara e exporta `forgeSmartBiset` duas vezes. A verificação retornou `SyntaxError: Identifier 'forgeSmartBiset' has already been declared`. Como `app.js:8` importa esse módulo, sua avaliação e registro da inicialização ficam bloqueados. A declaração duplicada não aparece na versão remota examinada.

**Revisão:** remover a duplicação e adicionar um bloqueio de publicação por erro sintático, importação inválida ou erro na abertura da página. Aceite: aplicação inicializa do zero, com console sem erro, em uma sessão limpa.

### F02 — P1 — A Forja chama uma função que não foi exposta — ambas, confirmado no código

**Evidência:** `forge.js:75` chama `window.FitApp.loadWorkout()`, mas `loadWorkout` é privada e não consta no objeto retornado por `app.js`. Clicar em gerar rotina falha nesse ponto, mesmo após corrigir F01.

**Revisão:** definir uma interface explícita entre gerador e controlador, preferencialmente por importação ou callback. Aceite: gerar → revisar → salvar → executar funciona sem depender de uma função global inexistente.

### F03 — P1 — A restauração de treino interrompido quebra — ambas, reproduzido

**Evidência:** `app.js:367–374` salva um objeto com campos diretos. Em `1194–1202`, o leitor declara outro `const state`, ocultando o estado importado, procura `state.state.currentRoutine` e depois `state.els`. O formato salvo não contém esses campos aninhados. O primeiro acesso reproduziu `TypeError`. Há ainda a chamada inexistente `renderstate.currentRoutine()` em `1222`.

**Revisão:** formato versionado de sessão; variável `savedState` distinta do estado de execução; validação e recuperação de JSON inválido; restauração de séries, notas, tempos e identidade do proprietário. Aceite: recarregar após registrar séries e continuar sem perder nem duplicar os registros.

### F04 — P1 — Gráfico e substituição durante treino falham — ambas, reproduzido/parcialmente estático

**Evidência:** `ui.js:1147` usa `labstate.els.length`, variável inexistente; a simulação de histórico válido retornou `ReferenceError`. Na remota, a mesma instrução aparece em `1134`. `app.js:233` também usa `renderstate.currentRoutine()` ao trocar um exercício durante execução.

**Revisão:** corrigir as referências, habilitar verificação de variáveis não definidas e testar os dois fluxos. Aceite: gráfico com dados e troca durante execução não geram exceções.

### F05 — P1 — Abrir recompensa gera erro antes do sorteio — ambas, reproduzido

**Evidência:** `gamification.js:78` usa `FitAudio` sem importá-lo. O arquivo é carregado como módulo. O `FitAudio` importado em `app.js` não se torna global; `audio.js` também não cria `window.FitAudio`. A chamada a `openPack()` retornou `ReferenceError: FitAudio is not defined`. O mesmo problema afeta a fabricação em `337`.

**Revisão:** importar o módulo de áudio explicitamente e fazer a recompensa funcionar mesmo quando áudio não estiver disponível. Aceite: abertura/fabricação com áudio ligado, desligado e indisponível.

### F06 — P1 — ABCD produz treinos vazios — local, reproduzido

**Evidência:** a interface oferece ABCD, mas `executeForgeLogic()` local não implementa esse método. A, B, C e D retornaram apenas `Rotina de Contingência` com zero exercícios. A versão remota tem implementação de ABCD; a reescrita local a removeu sem retirar a opção da interface.

**Revisão:** restaurar o método ou desabilitar sua seleção até existir implementação. Rejeitar rotina vazia antes de salvar campanha ou iniciar sessão. Aceite: matriz de todos os métodos/dias suportados retorna uma rotina válida ou uma indisponibilidade explícita.

### F07 — P1 — Antagonista é convertido em agonista — local, reproduzido

**Evidência:** `forge.js:203–204` testa primeiro `includes('antagonista')` e depois `includes('agonista')`. A palavra “antagonista” contém “agonista”; o segundo teste sobrescreve o primeiro. A simulação de peito/costas gerou pares peito/peito e ombros/ombros, com título “Pré-Exaustão (Agonista)”.

**Revisão:** usar igualdade exata ou tabela de métodos, com validação do par produzido. Aceite: par antagonista corresponde ao método solicitado.

### F08 — P1 — A migração do catálogo deixou consumidores incompatíveis — local e ambas

**Evidência local:** os 85 exercícios atuais têm `subLevel`, mas não `focus`. `ui.js:1296` chama `d.focus.toLowerCase()` sem proteção: uma busca que não casa com o nome reproduziu `TypeError`. Filtros por categoria, descrições e adaptações também continuam dependendo do campo antigo.

**Evidência em ambas:** `ai.js:105–108` filtra `peso_corporal`/`calistenia`, enquanto o catálogo usa `Peso Corporal`/`Calistenia`. A lista permitida para casa e calistenia ficou vazia nas duas versões. Na academia, o filtro também não exclui o que pretendia excluir.

**Revisão:** catálogo com identificadores estáveis, enums para equipamento/grupo, campos obrigatórios e migração dos consumidores. Separar o rótulo de exibição da chave usada em lógica. Aceite: catálogo inteiro valida; buscas, ambientes, geração local e IA usam os mesmos valores.

### F09 — P1 — Decisão de descanso lê o estado anterior — ambas, reproduzido

**Evidência:** no handler de `ui.js:600–667`, a conclusão do conjunto é calculada antes de `updateState()`. A caixa já está marcada no DOM, mas `setsData[s-1].checked` ainda é falso. A simulação da instrução real retornou `canRest:false` para o movimento acabado de concluir.

Além disso, `ui.js:410` trata qualquer bloco com mais de um exercício como bi-set. A Forja organiza treinos tradicionais em blocos de vários movimentos; isso mistura agrupamento visual com protocolo de execução.

**Revisão:** atualizar o modelo antes de avaliar transições; definir `block.type` explicitamente como tradicional, superset ou circuito. Aceite: descanso inicia exatamente no evento previsto de cada protocolo.

### F10 — P1 — O primeiro template da IA recebe identificador inválido — ambas, reproduzido

**Evidência:** `ai.js:135` define o tipo `custom_ia`. Ao salvar, `app.js:950–959` converte a parte posterior ao sublinhado em número. `parseInt('ia')` é `NaN`, serializado como `null`. O cartão passa a apontar para `custom_null`, e a busca por identificador não encontra o treino. A simulação reproduziu esse resultado.

**Revisão:** separar origem do template e identificador; gerar UUID para todo novo template. Aceite: importar um ou vários dias, salvar, recarregar e reabrir todos os templates.

## 2. Integridade dos registros e funcionamento offline

### D01 — P1 — Sincronização duplica e pode descartar treinos — ambas, reproduzido

**Evidência:** `sync.js:3–23` lê toda a fila, envia os itens e grava outra lista completa no fim. Não há trava entre chamadas. `api.js:79` usa `.add()`, que cria novo documento a cada tentativa.

Dois cenários foram reproduzidos: uma fila com um treino gerou **duas gravações** quando duas sincronizações rodaram juntas; um treino acrescentado durante o envio desapareceu quando a sincronização gravou sua lista antiga. Uma confirmação perdida após gravação também permite duplicação na tentativa seguinte.

**Revisão:** identificador da sessão criado antes do primeiro envio; gravação idempotente por esse ID; fila persistente com operações por item e estados pendente/enviando/confirmado; exclusão somente do item confirmado; coordenação entre abas; tentativas com espera progressiva. Aceite: alternar rede, repetir envio e sincronizar em duas abas mantém exatamente uma cópia de cada sessão.

### D02 — P1 — Reidratação da nuvem apaga a visão local e perde IDs — ambas, confirmado no código

**Evidência:** `app.js:1098–1100` substitui todo o histórico local pelo retorno da nuvem **antes** de sincronizar pendências. `api.js:113` retorna apenas 50 registros; o mapeamento em `119` omite `doc.id`. O botão de excluir em `ui.js:957` só aparece com `_id`. Após reabrir, registros sincronizados deixam de ser excluíveis por esse fluxo e pendências podem sumir da visualização.

Isso não prova exclusão dos documentos antigos da nuvem: o defeito confirmado é truncamento/substituição da visão local e perda do vínculo com o documento.

**Revisão:** mesclar por ID estável, preservar pendências, carregar histórico por páginas e manter um estado de sincronização por registro. Aceite: usuário com mais de 50 treinos e novas pendências continua vendo e excluindo seus registros corretamente.

### D03 — P1 — Sair da conta apaga trabalho que pode existir só no dispositivo — ambas

**Evidência:** `app.js:921–925` executa `localStorage.clear()`. Templates personalizados são salvos apenas em `fitapp_custom_workouts` (`948–972`); `saveCampaignToCloud()` não os inclui. A mesma limpeza remove a fila de treinos ainda não enviados e a sessão ativa. O logout do painel também limpa o armazenamento da origem.

As chaves locais não contêm UID. Em uma troca de identidade que preserve armazenamento, `salvarTreino()` atribui o usuário atual ao payload, sem garantir que seja o proprietário original da sessão. A limpeza normal no logout reduz um caminho, mas não constitui isolamento de dados por conta.

**Revisão:** persistência por UID; sincronização/exportação de templates; impedir perda silenciosa de pendências; confirmar o proprietário original ao enviar; política de retenção local após logout. Aceite: troca A/B nunca mostra ou atribui dados de A a B; logout não destrói o único exemplar de um treino/template.

### D04 — P1 — A tela pode confirmar salvamento que falhou — ambas

**Evidência:** `safeSet()` retorna falso quando não consegue gravar, mas os fluxos de fila, histórico e template não verificam esse retorno. A sessão pode ser apagada e a interface anunciar sucesso sem persistência. JSON inválido em várias chaves também é lido sem recuperação.

Além disso, editar carga/repetições de uma série já marcada atualiza `setsData`, mas não o item já inserido em `state.todayLog`; a finalização usa `todayLog`. O registro pode conservar os valores anteriores, apesar de a tela mostrar a correção.

**Revisão:** uma única fonte de verdade para séries, payload derivado no momento de finalizar e confirmação de gravação durável antes de limpar a sessão. Usar IndexedDB para dados estruturados, com migração e recuperação. Aceite: falta de espaço, JSON inválido e edição após marcação não produzem falso sucesso.

### D05 — P2 — Campanha entre dispositivos usa sobrescrita sem versão — ambas

**Evidência:** `sync.js` grava uma fotografia inteira de campanha e contagem, sem revisão, transação ou fila para falhas. O carregamento pode substituir mudanças offline recentes por dados antigos da nuvem. Falhas de leitura de histórico são convertidas em lista vazia, indistinguível de usuário novo.

**Revisão:** revisão/horário de atualização, estratégia explícita de conflito, estados “não carregado”, “vazio” e “erro”, contagem derivada de sessões da campanha. Aceite: dois dispositivos offline e posterior reconexão não fazem a contagem regredir silenciosamente.

## 3. Segurança, privacidade e custos

### S01 — P0 antes de abertura pública — API de IA sem autenticação na aplicação — ambas

**Evidência:** `functions/index.js` expõe geração e coach sem verificar token de usuário ou App Check. `api.js` não envia credenciais nesses requests. A simulação do handler, com IA substituída por um stub, aceitou requisição sem token e alcançou geração com resposta 200.

`cors({origin:true})` permite origens externas no navegador, mas restringir CORS sozinho não impediria chamadas diretas. Não há quota por usuário, limite diário de gasto na lógica, limite semântico de prompt, teto de saída ou limite explícito de instâncias. `express.json()` já tem um limite padrão de corpo; isso não resolve as cotas e validações de negócio.

**Revisão:** validar Firebase ID token no servidor; App Check como camada adicional; quota por usuário e limites globais, concorrência controlada, teto de saída e entrada, cache do coach genérico e mensagens de indisponibilidade. Se migrar para callable, aplicar autenticação e enforcement de App Check explicitamente. Verificar IAM/ingress publicados, que não foram inspecionados. Aceite: anônimo não alcança o modelo, usuário não consegue exceder sua quota e há limite operacional mensurável de consumo.

### S02 — P1 — “Estar logado” é tratado como autorização administrativa — ambas, risco condicionado às regras

**Evidência:** `admin.js:8–15,225–250,272–284` verifica apenas existência de usuário; depois tenta listar jogadores e alterar o dicionário global. O cliente não distingue treinador, aluno e administrador. As regras do Firestore não estão na árvore do repositório e `firebase.json` não declara regras/índices.

**Limite da conclusão:** não foi demonstrado que um aluno consiga executar essas operações no Firestore publicado. Regras corretas podem rejeitá-las. O que está confirmado é que a proteção não aparece no código auditável e a interface confunde autenticação com privilégio.

**Revisão:** regras versionadas e testadas para proprietário, treinador vinculado e administrador; claims ou vínculos atribuídos por autoridade confiável; validação em create e update, imutabilidade de proprietário e limites de campos. Aceite: matriz anônimo/aluno A/aluno B/treinador sem vínculo/com vínculo/admin permite apenas operações previstas.

### S03 — P1 — Ranking lê documentos que também contêm e-mail — ambas, risco condicionado à leitura permitida

**Evidência:** `gamification.js:36–43` grava álbum, pontos, nome e **email** em `jogadores/{uid}`; `356–359` consulta essa coleção para o ranking. Se a leitura do ranking é permitida aos jogadores, esses leitores recebem o documento inteiro, mesmo que a interface mostre só parte. A documentação do Firestore confirma que regras não ocultam campos individuais de documentos lidos.

**Revisão:** separar perfil privado de projeção pública do ranking, com apelido e somente campos necessários; participação opcional. Remover e-mails repetidos dos payloads de treino quando o UID basta. Aceite: resposta ao cliente de ranking não contém e-mail nem histórico privado.

### S04 — P1 — Conteúdo externo entra em HTML sem tratamento consistente — ambas

**Evidência:** `admin.js:53,205` interpola nome e dicas do banco; `gamification.js:419` interpola nome do jogador; `ai.js:12` interpola resposta do modelo; `ui.js:415,988,1105` interpola título de rotina e exercícios em HTML. Existem trechos que usam `escapeHTML`, mas a proteção é inconsistente; escapar HTML também não torna segura a interpolação em JavaScript de atributos `onclick`.

**Impacto:** há caminhos de injeção de HTML e risco de XSS persistente, dependendo de quem consegue controlar e persistir cada campo. Nenhum payload foi enviado à produção.

**Revisão:** usar `textContent`, elementos e listeners em conteúdo variável; validar esquemas e limites de texto; sanitizar somente HTML que precise existir; adicionar CSP compatível após retirar handlers inline. Aceite: nomes/dicas com caracteres de marcação aparecem como texto e não criam elementos executáveis.

### S05 — P1 — Pontos e recompensas são controlados pelo navegador — ambas

**Evidência:** `gamification.js` sorteia e grava álbum, pontos e poder no cliente. Métodos de bônus/pacotes estão expostos. A trava de dois minutos de treino existe só no cliente. A gravação lê, modifica e sobrescreve o perfil sem transação; falhas de leitura são convertidas em perfil vazio e falhas de gravação são apenas registradas no console.

**Impacto:** fraude ou bloqueio do ranking depende das regras: se autorizarem os campos esperados pelo cliente, o usuário pode fabricar resultados; se proibirem, o fluxo atual precisa de uma autoridade alternativa. Também há perda de atualização simultânea e recompensa anunciada sem gravação.

**Revisão:** evento de sessão aceito no servidor → concessão idempotente → atualização atômica; validação de integridade e limites realistas. Nenhum sistema deve prometer prova de execução física apenas por cliques. Aceite: uma sessão concede uma recompensa, repetir requisição não aumenta pontos e falha não apaga coleção existente.

### S06 — P1 — Dependências de produção têm alertas conhecidos — ambas, consulta online

`npm audit --omit=dev --json` retornou **10 pacotes afetados: 1 crítico, 1 alto e 8 moderados**. São contagens do relatório do npm, incluindo cadeias transitivas; não representam dez explorações independentes comprovadas.

- `proxy-addr 2.0.7`: alerta crítico GHSA-jqcg-44mw-7w3h, ligado à confiança de proxy/IP. A correção publicada é 2.0.8. A exploração depende da configuração de proxy e de como o endereço é usado.
- `@grpc/grpc-js 1.14.4`: alerta alto GHSA-m9gg-hp2v-232j; a faixa afetada termina antes de 1.14.5. A aplicabilidade depende do uso/configuração.
- Cadeia de `firebase-admin 13.10.0`, Firestore, Storage, `google-gax`, `gaxios`, `retry-request`, `teeny-request` e `uuid`: oito entradas moderadas por pacote, com sobreposição de causas.
- O backend usa `@google/generative-ai`, SDK legado; a documentação do Google recomenda migrar para `@google/genai` e informa descontinuação dos SDKs legados.

**Revisão:** atualizar dependências e lockfile em alteração dedicada, conferir compatibilidade e executar auditoria novamente. A sugestão automática para `firebase-admin` inclui mudança de versão principal; não aplicar correção forçada sem revisão. O ID `gemini-3.6-flash` consta na documentação atual e **não foi tratado como modelo inexistente**.

### S07 — P2 — Privacidade e controle dos próprios dados incompletos — ambas

Não foram encontrados no produto fluxos de exportação integral dos dados, exclusão de conta com limpeza coordenada das coleções, política de retenção ou informação clara sobre envio de texto ao provedor de IA. Exportar um cartão social não substitui exportação de dados. Login e logout não resolvem esses requisitos.

**Revisão:** mapear os dados necessários e sua finalidade, separar publicidade do ranking dos dados privados, informar o processamento por IA, oferecer exportação/exclusão e definir retenção. Validar a adequação jurídica para o público e operação reais. A ANPD descreve direitos de acesso, correção, eliminação e outros; esta auditoria não determina sozinha conformidade legal.

**O que não é um achado de segredo:** a configuração pública do Firebase no cliente é esperada; sua `apiKey` não foi tratada como chave privada do Gemini. O backend referencia `GEMINI_API_KEY` por segredo. O conteúdo do `.env` não foi exposto nem usado nos diagnósticos.

## 4. Premissas frágeis do treinamento e do produto

### P01 — P1 — Número de sessões é confundido com prontidão física

**Evidência:** `app.js:698–734` incrementa a campanha para toda finalização aceita, incluindo cardio e treino parcial; ao alcançar 24 sessões ou 56 dias, promove iniciante a intermediário e intermediário a avançado. A mensagem em `814` afirma “Adaptação neural máxima atingida”. Não existe medição que sustente essa conclusão individual.

**Premissa frágil:** cumprir calendário equivale a dominar técnica, tolerar mais volume e precisar trocar todos os exercícios.

**Revisão:** separar patente recreativa de nível de treinamento; contar apenas sessões vinculadas à campanha; revisão do plano por desempenho e percepção de esforço/recuperação, com possibilidade de manter, reduzir ou revisar. A passagem do tempo pode abrir uma revisão, sem elevar intensidade automaticamente. O posicionamento do ACSM sobre progressão destaca objetivos, capacidade física e nível de treinamento como contexto para progressão, não uma promoção universal por calendário.

### P02 — P1 — A seleção estética e a aleatoriedade substituem personalização

**Evidência local:** `forge.js` escolhe aleatoriamente exercícios por grupo/equipamento; aumenta séries por nível e reduz descanso para avançados. O perfil feminino continua alterando os títulos em `ui.js`, mas o gerador tradicional local não possui o correspondente ramo feminino. Os cartões podem prometer um foco diferente da rotina produzida. A troca de perfil também não invalida a campanha cacheada em `app.js:477`.

A matriz anunciada “3:2” não aparece como uma invariante verificável no gerador atual: ambos os membros do par recebem `baseSets`, e a composição varia conforme disponibilidade. Não há validação final da distribuição prometida.

**Revisão:** objetivos, disponibilidade semanal, tempo por sessão, equipamentos reais e restrições explícitas; rotina e texto da interface derivados da mesma estrutura. Gerar um plano previsível e justificar substituições; revisar volume semanal e sobreposição entre músculos. Validar o conteúdo de treinamento com profissional responsável.

### P03 — P1 — Sugestão de carga e ausência de contexto podem induzir confiança excessiva

**Evidência:** `ui.js:451–468` aumenta a sugestão em **2 kg** se a última série do último treino correspondente atingir o topo da faixa. Não considera incremento disponível, equipamento, execução, dor, esforço percebido ou resultado das demais séries. O rótulo “Alvo IA” descreve uma heurística local simples.

Calistenia pode receber “Falha”/“Isometria Máx” diretamente no gerador local; faltam entradas de restrições e critérios de interrupção no planejamento. O coach recebe um prompt genérico, sem os registros do usuário, mas a interface o apresenta como análise/feedback.

**Revisão:** explicitar a origem das sugestões; exigir confirmação; representar unidades e incrementos por equipamento; considerar contexto e recuperação em regras revisadas por profissional. Reservar “análise” para resposta realmente baseada nos dados apresentados e com limites claros. O aceite é coerência e controle do usuário, sem promessas de segurança física inferidas do JSON.

### P04 — P1 — JSON bem formado é confundido com treino válido

**Evidência:** a API restringe a estrutura gerada, mas não valida semanticamente seu conteúdo. O prompt integral vem do cliente; nome de exercício é string livre; séries não têm limites de negócio; métodos de bi-set são pedidos em texto, mas o schema não representa pares, descanso ou protocolo. O cliente transforma cada dia em um único bloco, tornando a execução ambígua.

**Revisão:** schema de domínio com exerciseId, tipo de bloco, sets, unidade de repetição/tempo, descanso e limites; construção do pedido no servidor; validação após geração e antes de persistir; relatório de itens não mapeados na importação. IA como rascunho revisável. Aceite: entradas contraditórias ou saídas fora do catálogo não viram rotina executável silenciosamente.

### P05 — P2 — Recompensa por terminar pode competir com adesão sustentável

O contrato inicial, os pacotes e a linguagem de combate são uma escolha de público, não prova de retenção. A recompensa vinculada a conclusão, desafio e espera pode incentivar marcação de séries sem execução; o modo automático marca caixas pelo tempo, sem confirmação de execução. A experiência também pode afastar iniciantes que prefiram orientação menos intensa.

**Revisão proposta para validar:** testar tom neutro como opção, permitir sessão adaptada/encerramento por desconforto sem punição recreativa, reconhecer consistência e recuperação, manter aprovação explícita dos registros automáticos. Medir retenção e qualidade dos registros, não somente pacotes abertos ou pontos.

### P06 — P2 — Três produtos competem pelo foco

Há diário de treino, prescritor automático com IA e painel B2B/ranking, cada um com responsabilidades distintas. O painel lê histórico em `jogadores/{uid}/treinos_concluidos` (`admin.js:94`) e procura `session.log`; o cliente grava na coleção raiz `treinos_concluidos` com campo `data`. O treinador pode ver histórico vazio mesmo quando o aluno tem registros.

**Revisão proposta:** estabilizar primeiro o diário confiável de um público definido. Depois validar geração assistida; avançar no B2B quando vínculo treinador-aluno, autorização e modelo de dados estiverem resolvidos. Entrevistar usuários do segmento e comparar registro manual, importação do plano do treinador e geração assistida. A recomendação de foco é uma hipótese de produto, não uma conclusão baseada em métricas de uso, que não estavam disponíveis.

## 5. PWA, experiência e operação

### O01 — P1 — Cache atualiza arquivos sem garantir uma versão coerente — ambas

`sw.js` usa stale-while-revalidate individual para HTML e módulos, `skipWaiting()` e `clients.claim()`, com nome de cache fixo na versão examinada. Falha de um arquivo na instalação é ignorada. Uma sessão pode combinar interface antiga com código novo; as divergências de catálogo mostram o custo prático desse cenário. Atualizações em background não são vinculadas consistentemente a `event.waitUntil()`.

Dependências essenciais do Firebase e dos gráficos vêm de CDNs e não entram no precache local; a resposta de rede cross-origin não é salva pelo filtro `type === 'basic'`. Sem cache HTTP prévio disponível, abrir offline pode falhar. Não foi feito teste real de reinstalação em dispositivo.

**Revisão:** build com arquivos versionados por conteúdo, atualização coerente do conjunto, política de atualização fora de sessão ativa, recursos essenciais disponíveis offline e fallback explícito de navegação. Aceite: primeira abertura após instalação, atualização com sessão ativa e posterior abertura offline em Android/iOS.

### O02 — P2 — Estado e temporizadores não têm encerramento centralizado — ambas

`finalizeSession()` e abortar não redefinem explicitamente `state.isWorkoutActive` para falso. Abortar não para o piloto automático; temporizadores de isometria vivem em closures de elementos substituídos. O descanso anuncia “dez segundos” a cada frame enquanto `secs === 10`, podendo repetir/cancelar a fala. Piloto, cardio e cooldown contam callbacks e podem atrasar quando o navegador suspende a página.

**Revisão:** máquina de estados de sessão, registro central de timers e rotina única de encerramento/limpeza; tempos baseados em prazo absoluto; teste de suspensão e retomada. Aceite: encerrar ou abortar não deixa ações, áudio, bloqueios de navegação ou gravações em execução.

### O03 — P2 — Acessibilidade e navegação precisam de revisão — ambas

`index.html:5` desabilita zoom com `user-scalable=no`; há muitos alvos com emoji e texto pequeno, modais sem semântica consistente e controles sem rótulos programáticos suficientes. O `popstate` empurra uma nova entrada até fora do treino, impedindo navegação normal de retorno. Não houve medição instrumental de contraste ou avaliação com leitor de tela; esses pontos não foram apresentados como reprovação formal WCAG.

**Revisão:** permitir zoom, revisar nomes acessíveis e foco nos modais, acesso por teclado e leitor de tela, reduzir distração durante execução e restaurar comportamento de voltar fora da sessão. Aceite: fluxos centrais em tela estreita, zoom e navegação assistiva.

### O04 — P2 — Gráficos não representam tudo o que os rótulos sugerem — ambas

O “radar de simetria” conta séries por grupo, sem medir simetria corporal ou qualidade de execução. O gráfico de carga agrupa datas por dia/mês sem ano e sobrescreve o valor do mesmo dia por iteração, sem garantir o máximo de todas as sessões. O “PR” compara com referência anterior, não necessariamente o melhor valor de toda a vida.

**Revisão:** rótulos descritivos como “distribuição de séries registradas”; datas ISO como chave; agregação explícita entre sessões; separar comparação com treino anterior de recorde histórico. Aceite: duas sessões no mesmo dia e dados de anos diferentes não se misturam.

### O05 — P1/P2 — Publicação e recuperação não têm evidência de proteção suficiente

A árvore remota não contém testes, workflow de CI, README operacional, regras ou índices do Firestore. O endpoint de branch informa `protected:false`; não se concluiu que todas as políticas da conta foram inspecionadas. A consulta de workflows pelo conector não foi suportada; a ausência confirmada é de arquivos de workflow na árvore examinada. Há divergência concreta de 17 commits entre máquina e GitHub, sem identificação da versão realmente publicada.

`firebase.json` não define cabeçalhos de segurança; Chart.js vem de URL sem versão fixa e sem integridade. O backend retorna `error.message` bruto e todo erro de geração como 500; o cliente frequentemente transforma erro de formato/permissão em erro genérico de conexão.

**Revisão:** identificar commit/build no app e no deploy; checks obrigatórios, ambiente de prévia, processo de rollback, política de backup com restauração testada; dependências fixadas/empacotadas; erros tipados sem detalhes internos no cliente; monitorar falhas de início, salvamento e fila, latência/custo da IA e alterações administrativas. Backups e alertas podem existir no console, mas não foram verificados.

## 6. Plano de correção sugerido

| Ordem | Entrega | Critério para avançar |
|---|---|---|
| 1 | Identificar versão publicada e estabilizar inicialização/execução | F01–F10 tratados; abrir, gerar, importar, revisar, iniciar, trocar e finalizar sem exceção |
| 2, antes de ampliar acesso | Fechar autoridade e custo | API verifica identidade e quota; regras versionadas/testadas; ranking sem dados privados; revisão das dependências |
| 3 | Tornar o diário confiável | Sessão com ID/UID estáveis, persistência durável, sincronização idempotente, templates em nuvem, reconciliação por ID |
| 4 | Consolidar o domínio | Catálogo e schemas únicos; método e rótulo derivados do mesmo plano; protocolo de bloco explícito; integração do painel corrigida |
| 5 | Revisar progressão e linguagem | Nível físico separado da patente; recomendações revisadas; sugestões transparentes e controladas pelo usuário |
| 6 | Preparar piloto limitado | PWA e dispositivos validados, acessibilidade básica, exportação/exclusão, observabilidade e recuperação documentadas |

As entregas 1 e 2 podem ser preparadas em conjunto pela equipe. A ordem é uma priorização por risco, não uma estimativa de prazo sem conhecer disponibilidade e critérios de produto.

## 7. Matriz mínima de aceite para uma versão candidata

1. Sessão limpa: abrir, autenticar, configurar, gerar todos os métodos suportados e executar uma rotina.
2. Sessão interrompida: marcar séries, editar uma já marcada, acrescentar nota, recarregar e retomar exatamente os dados reais.
3. Rede instável: concluir offline, reconectar, interromper confirmação, repetir envio e verificar apenas uma cópia.
4. Concorrência: duas abas sincronizando e novo treino entrando na fila durante envio, sem duplicação/perda.
5. Identidade: usuário A, logout e usuário B; isolamento de cache, templates, fila e sessões, incluindo transição durante requisição em andamento.
6. Histórico: mais de 50 registros, exclusão após recarregar, múltiplas sessões no mesmo dia e ano diferente.
7. IA: texto malformado, exercício desconhecido, quantidade inválida de séries, resposta vazia, quota excedida, timeout e importação com vários dias.
8. Autorização: tentativas de ler/alterar outro usuário, alterar proprietário/role/pontos, editar dicionário sem privilégio, e acesso de treinador sem vínculo.
9. Conteúdo externo: nomes, dicas e títulos contendo marcação são exibidos como texto.
10. Dispositivos: PWA Android/iOS, suspensão de tela, retorno ao app, atualização, funcionamento offline e ausência de áudio.
11. Recuperação operacional: demonstrar restauração de backup e rollback de uma versão com defeito.
12. Produto: cada plano corresponde ao título prometido; sessão parcial/cardio não promove nível físico; usuário entende de onde vem uma sugestão.

## Referências verificadas

- [Código do backend na versão remota auditada](https://github.com/caiocborges88/fitapp-api/blob/73dfff970fe8ea9ff79477fee37a99b832140aec/functions/index.js).
- [Código principal na versão remota auditada](https://github.com/caiocborges88/fitapp-api/blob/73dfff970fe8ea9ff79477fee37a99b832140aec/public/js/app.js).
- [Firestore: leitura e controle de campos](https://firebase.google.com/docs/firestore/security/rules-fields) — leituras retornam documentos inteiros; separar dados privados.
- [Firebase: callable functions](https://firebase.google.com/docs/functions/callable) — transporte de tokens e contexto de autenticação.
- [Google: bibliotecas Gemini](https://ai.google.dev/gemini-api/docs/libraries) — SDK recomendado e status dos legados.
- [Google: Gemini 3.6 Flash](https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.6) — modelo e mudanças de API.
- [Express: correções de segurança de setembro de 2026](https://expressjs.com/zh-cn/blog/2026-09-30-security-releases/) — correção de proxy-addr.
- [Aviso proxy-addr](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) e [aviso grpc-js](https://github.com/advisories/GHSA-m9gg-hp2v-232j) — encontrados no relatório do npm.
- [ANPD: direitos dos titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares).
- [ACSM: Progression models in resistance training for healthy adults](https://pubmed.ncbi.nlm.nih.gov/19204579/) — referência de contexto sobre progressão individualizada; não constitui validação do gerador do FitApp.
