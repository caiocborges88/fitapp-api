# Guia de desenvolvimento do FitApp

## Projeto e referências
- Aplicativo para smartphone/PWA em JavaScript nativo. Interface em `public/`, API em `functions/`, verificações em `tests/` e `scripts/`.
- Leia `README.md`, `docs/DESIGN-SYSTEM.md` e a documentação do recurso alterado. Registre decisões e limites em `docs/`.
- Use português brasileiro na interface. Priorize a tarefa de treinar; edição e organização devem ser acessíveis sob demanda.

## Contratos que devem ser preservados
- Ficha salva, rascunho e sessão são estados distintos. Ajustar uma sessão não pode sobrescrever a ficha nem o histórico.
- Respeite catálogo, exclusões, ambiente, equipamentos, políticas dos blocos, pares e unidades por tempo. Valide novamente antes de executar.
- Não invente equivalência de cargas, progressão, capacidade ou personalização por tempo/frequência. IA permanece adiada conforme `docs/DECISAO-USO-IA.md`.
- Grave primeiro no dispositivo. Falha de armazenamento não é sucesso; preserve a edição e os dados anteriores.
- Separe todos os dados locais por conta usando `FitStore`. Rascunhos locais não fazem parte da sincronização de planos.
- Preserve IDs, revisões, conflitos, dados antigos, fila offline e sessões em andamento. Mudanças de formato exigem versão e testes de compatibilidade.

## Fluxo simplificado de treino — 30/10/2026
- O caminho principal entrega um modelo pronto; cadastro de ficha própria é secundário. A referência desta etapa é `docs/SIMPLIFICACAO-DO-FLUXO-2026-10-30.md`.
- Sem treino salvo, Treinar oferece escolher ABC tradicional/sinergista e a alternativa discreta “Já tenho uma ficha”. Escolher, conferir os três dias e salvar acontece uma vez; não recrie o plano nos acessos seguintes.
- Com treino salvo, Treinar destaca o próximo dia e “Começar treino”. O início direto reutiliza preparação, validação e gravação durável da sessão; ajustes e conferência continuam acessíveis em “Ver exercícios e ajustar”. Pendências ou propostas de adaptação abrem a conferência, sem aplicação silenciosa.
- Abrir um dia salvo não chama o gerador nem grava a prescrição, mesmo se preferências antigas estiverem ausentes ou diferentes. Não acrescente dias ausentes; respeite versões desconhecidas de plano, blocos e sessão.
- A sequência A → B → C continua baseada em registros duráveis do mesmo plano e fila offline. Trocar o dia é opcional; uma escolha temporária não deve prevalecer após novo registro durável.
- Meus treinos mostra primeiro o plano atual e os dias existentes, depois fichas próprias. “Adicionar treino” reúne modelo e cadastro manual. Edição e troca de modelo ficam sob demanda junto do treino.
- Perfil concentra conta, aparência e dados. Foco global, experiência declarada, aplicação/reinício de plano e modelos retirados não são novas escolhas de interface. Seletores antigos permanecem ocultos/inertes apenas para compatibilidade do transporte e testes de legados; não os reexponha.
- Ambiente/equipamentos têm um único controle compartilhado no cabeçalho, também acessível ao escolher modelo. A preferência é lembrada; aeróbico fica em “Outras atividades”. Importação de texto/IA continua adiada.
- Preserve a recuperação de sessão em andamento, o editor manual, rascunhos por conta, cópias, exclusões, sincronização, histórico e receitas ABC. Esta etapa não muda formatos, regras Firestore ou API.
- Valide com `npm run test:simple-flow`, além das regressões obrigatórias. Use `FITAPP_AUDIT_PREFIX=simplificacao` para separar novas evidências; aparência/design/fluxo móvel acrescentam sufixos próprios ao prefixo. Testes usam Firebase simulado ou `demo-fitapp`; aparelhos físicos e produção não são inferidos dessas evidências.
- Registre a mudança no GitHub em branch/PR, distinguindo os pré-requisitos anteriores que ainda estavam sem commit. Não confunda envio de código ao GitHub com autorização para publicar em produção.
- A simplificação foi publicada com autorização posterior em 30/10/2026, versão `8025f00c044b5983`, somente Hosting. Regras existentes foram conferidas e preservadas; API e índices não foram publicados. Release, evidências, atualização da PWA e recuperação: `docs/PUBLICACAO-SIMPLIFICACAO-2026-10-30.md`. Preservar os snapshots e distinguir os testes públicos sem autenticação de uso em aparelhos físicos.

## Modelos ABC com regras próprias
- A referência vigente é `docs/NOVOS-MODELOS-ABC.md`. Novas escolhas oferecem `abc_tradicional` e `abc_sinergista`, com exercícios fixos e receitas versionadas em `public/js/workout-models.js`.
- Cada bloco define ordem, execução, séries, metas e descanso. Não aplique séries/pausas globais, nível numérico, experiência declarada ou foco global aos novos modelos. `level: 'padrao'` existe apenas para compatibilidade de transporte; não representa dificuldade. Campos antigos continuam legíveis para fichas anteriores.
- O core está distribuído em A e B; não acrescente abdominal automaticamente ao dia C. Adutora e abdutora fazem parte dos principais. Novos ABCD/circuito permanecem pendentes; seus planos anteriores não podem ser apagados, convertidos ou reconstruídos ao abrir.
- Geração usa os exercícios definidos e recusa incompatibilidades com recursos/exclusões, sem sorteio ou substituição silenciosa. Trocas devem preservar a função da posição e, nos pares, a relação entre os movimentos; supino não vira crucifixo na posição de empurrar.
- Descanso pertence ao bloco e o relógio começa após a série ou após ambos os movimentos da volta. Ajustes temporários ficam na sessão e sobrevivem à recarga. Não calcule equivalência de cargas ao trocar equipamentos ou converter pares em execução convencional.
- Ajustes e trocas só alteram a sessão. Salvar na ficha original exige ação explícita e conferência de conta, ID e revisão de origem. Não transporte séries realizadas para a ficha nem remova registros ao reduzir séries.
- Opcionais ficam em seção própria, antes e durante o treino. Desativados não contam em cobertura, pendências ou execução. Principais concluídos permitem finalizar mesmo com opcionais não realizados; opcionais já registrados permanecem preservados.
- Prancha lateral usa E1/D1/E2/D2 com duração real independente; prévia/editor mostram séries por lado. Não some durações presumidas nem transforme segundos em repetições. O descanso começa após ambos os lados, independentemente da ordem de registro.
- A sequência A → B → C considera somente registros duráveis do mesmo plano, incluindo parciais e a fila offline. Abrir/abandonar uma sessão ou falhar ao salvar não avança. Frequência variável não reinicia a sequência na semana nem aumenta volume para compensar faltas.
- A revisão é sugerida em 90 dias, dentro do aplicativo, sem modificar automaticamente a ficha ou criar automação externa. 45–60 minutos é referência de uso, não duração garantida; o dia C é mais extenso.
- Preserve plano `schemaVersion: 2`, receita `modelVersion: 1` e estado ativo versão 4, recuperando versões anteriores sem inventar planejamento inicial. Cópias, rascunhos, exportação e sincronização precisam conservar metadados de bloco, posição, descanso e lados. Versões desconhecidas permanecem armazenadas e não podem ser normalizadas para uma versão conhecida.
- Cobertura e acompanhamento seguem `docs/COBERTURA-E-ACOMPANHAMENTO.md`. O contrato de cobertura descreve cada receita e separa principais de complementos; não exige todos os subníveis nem infere participação secundária. Não complete lacunas acrescentando exercícios automaticamente.
- Novas sessões preservam a fotografia preparada no início em `sessionPlanned`; o histórico transporta `trainingContext` JSON versão 1, até 90.000 caracteres. Preserve IDs, contexto final e origem; não leve séries realizadas para a ficha. Descanso registrado é configuração, não pausa medida. Falha de contexto/armazenamento mantém a sessão aberta.
- Compare realizado com a fotografia daquela sessão, nunca com a ficha atual. Legados/versões desconhecidas mantêm contexto indisponível. Na última passagem ABC, preserve repetições e dias ausentes; em períodos, explicite escopo local/paginação, considere fila e exclusões, separe opcionais e não compense faltas. Prancha lateral continua por lado também no histórico.

## Interface e acessibilidade
- A identidade é ciano/violeta, com temas claro e escuro igualmente trabalhados, conforme `docs/DESIGN-SYSTEM.md` e `docs/IDENTIDADE-ENERGIA.md`.
- Tokens semânticos ficam em `public/css/design.css`; tratamentos visuais em `public/css/energy.css`. Separe cores de texto/link (`--accent`) das ações (`--action`/`--on-action`) e reutilize os tokens de brilho e elevação.
- Aparência é local por conta/dispositivo: `fitapp_appearance` versionado no `FitStore`. Use `appearance.js`, os eventos de conta/aparência e os atributos `data-theme`/`data-effects`; não inclua essa preferência na sincronização de planos.
- Respeite a redução de movimento do sistema e do Perfil em CSS, JavaScript e gráficos. Durante o treino, mantenha números e fundos estáveis; efeitos não podem atrasar registro, fechamento ou salvamento. A celebração só aparece após salvamento local confirmado.
- Ilustrações esportivas são SVGs locais decorativos. Inclua novos recursos no cache pelo build e evite cores/efeitos definidos diretamente em templates JavaScript.
- Reutilize estilos e variáveis existentes, temas claro/escuro, rótulos, foco visível e controles por teclado.
- A ação principal deve permanecer acessível em telas pequenas. Considere teclado virtual, navegação inferior e área segura.
- Avisos bloqueantes ficam visíveis fora de painéis recolhidos, com acesso ao item correspondente.
- Use botões de ordenação acessíveis; gestos não podem ser a única alternativa.

## Verificação e entrega
- `npm run build` gera vendor, catálogo das funções, manifesto, versão e cache offline; não edite esses resultados manualmente.
- Para alterar o ícone, edite `public/icon.svg` e gere os PNGs com `npm run build:icons` (Playwright/Edge no Windows); o build normal não requer navegador.
- Para mudanças visuais ou de aparência, execute `npm run test:appearance` e `npm run test:design`, incluindo temas, redução de movimento, contas e offline. A referência `public/design-reference.html` usa apenas dados ilustrativos.
- Execute `npm run check` e `npm test`. Para regras/recompensas, use Firestore emulado conforme o README.
- Execute os testes de navegador do fluxo alterado e as regressões pertinentes: editor, ambientes, prioridades, cobertura, sincronização e offline.
- Para os novos ABCs, execute `npm run test:models`. A suíte com regras/recompensas e sincronização entre dispositivos usa `firebase emulators:exec --only auth,firestore,hosting --project demo-fitapp "npm run test:models:emulated"`. `FITAPP_AUDIT_PREFIX` permite novas evidências de aparência/design sem sobrescrever capturas históricas.
- Para cobertura por modelo e acompanhamento, execute também `npm run test:tracking`; confirme transporte do contexto entre dispositivos e exportação na suíte emulada. Ao publicar, aceite `trainingContext` nas regras antes de servir o novo cliente. A publicação desta etapa e sua recuperação estão em `docs/PUBLICACAO-ACOMPANHAMENTO-2026-10-29.md`; mantenha as evidências separadas usando `FITAPP_RELEASE_PREFIX`.
- Testes locais usam `demo-fitapp` ou Firebase simulado; não grave dados reais para verificar interface.
- Registre evidências novas em `audit/`, distinguindo simulação de testes em aparelhos reais. Não declare Android/iPhone físicos como verificados por emulação.
- Não publique ou modifique produção sem solicitação explícita. Quando autorizado, confira o escopo, preserve snapshot/versão anterior, publique somente os serviços alterados e verifique a versão pública, os arquivos e o offline sem gravar dados reais. Registre release e recuperação em `docs/`. A publicação não transforma testes emulados em conferência física.
- Na publicação dos novos ABCs, implante as regras Firestore que aceitam os novos métodos e `padrao` antes do Hosting. API e índices não exigem publicação por essa mudança. Preserve regras/releases anteriores e uma cópia recuperável dos fontes, sem segredos. Um Hosting antigo pode não interpretar os novos metadados; recuperação deve manter os dados e as regras compatíveis.
- Não inclua segredos, arquivos de ambiente ou credenciais em commits ou relatórios.
