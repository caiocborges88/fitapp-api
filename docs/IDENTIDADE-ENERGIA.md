# FitApp — identidade Energia, alegria e foco

28/10/2026. Implementação local solicitada pelo usuário. Sem publicação ou alteração de produção.

## Decisões aplicadas

Ciano e violeta, futurismo expressivo, temas claro e escuro igualmente trabalhados, ilustrações esportivas vetoriais próprias e efeitos ligados às ações. A sessão preserva fundos e números estáveis. O verde é reservado a confirmação; brilho decorativo não indica desempenho físico.

Foram atualizados login, ficha de acesso rápido, modelos, fichas salvas, criação/revisão, sessão, descanso, resumo, histórico, gráficos, biblioteca, perfil, coleção opcional, compartilhamento e componentes compartilhados da administração. A navegação e os fluxos existentes foram mantidos. Não houve alteração na API, regras, catálogo ou formato dos registros de treino.

A página `public/design-reference.html` apresenta os mesmos componentes nos dois temas, com dados explicitamente ilustrativos. Pode ser aberta em `http://127.0.0.1:4173/design-reference.html` após `node scripts/serve.cjs`; não carrega autenticação ou dados de conta. Para usar o aplicativo de demonstração com autenticação emulada, usar `npm run dev` e a porta 5000.

## Persistência e compatibilidade

As preferências de aparência são versionadas e isoladas por conta no FitStore. Não são sincronizadas com planos. Alterações entre abas, troca de conta e mudanças do sistema reaplicam a resolução central de tema e efeitos. Falha de armazenamento mantém a preferência anterior. Sem autenticação, a aparência acompanha o sistema.

O evento `fitapp:accountchange` permite reaplicar a aparência assim que o armazenamento conclui a vinculação da conta, independentemente da ordem dos callbacks de autenticação. Eventos são opcionais em ambientes de teste sem DOM.

Cores de ação são separadas das cores de links; aliases antigos continuam disponíveis. IDs, eventos de treino, ordenação por botões e contratos de teclado/área segura foram preservados. A barra fixa de revisão continua fora de ancestrais com transformação retida.

Três SVGs locais totalizam menos de 10 KB; fontes, artes e estilos estão no cache offline gerado. A lista do build passou a incluir a pasta de ilustrações. O servidor local entrega MIME de SVG e fonte explicitamente. Ícones PNG são regenerados por `npm run build:icons`, a partir do SVG. O build principal continua compatível com CI sem navegador instalado.

## Evidências

- `audit/energy-validation.json`: matriz de 16 combinações (360×740, 390×844, 820×1180 e 1440×1000; claro/escuro; efeitos completos/reduzidos), contraste, preferências, contas, duas abas, armazenamento, texto ampliado, sessão e recarga offline. Firebase simulado, incluindo SDK de teste no cache da verificação offline autenticada.
- `audit/energy-design-validation.json`: regressão das tarefas de navegação, cadastro, séries por tempo, resumo salvo e exportação PNG.
- `audit/energy-regressions.json`: resultados das regressões locais de navegador.
- `audit/energy-emulator-validation.json`: testes unitários, sincronização e integração com Auth, Firestore, Functions e Hosting do projeto `demo-fitapp`.
- Capturas `audit/energy-*.png`: temas, tamanhos, referência visual, sessão, resumo, coleção e ampliação de texto. Nenhuma captura representa aparelho físico.

## Limites e versão preparada

A validação automatizada usa Edge no Windows. Não certifica Safari/iOS, teclado físico/virtual real, área segura real, leitores de tela ou desempenho em aparelhos modestos. Android/iPhone físicos continuam pendentes.

Os efeitos são CSS/SVG, sem nova biblioteca de animação. Brilhos são estáticos; a atualização de descanso reutiliza o relógio atual. Não foi realizado benchmark em aparelho físico, teste de percepção de alegria/foco com usuários nem certificação WCAG integral.

Versão preparada: `609fa6af6364615e`, registrada em `public/version.json`, junto ao cache gerado pelo build. Build e check aprovados; 102 testes passaram com Firestore emulado, além das regressões de aparência, fluxo móvel, editor, ambientes, prioridades, cobertura, sincronização, recompensas e offline. Antes de publicar futuramente, preservar snapshot, concluir a conferência física e revisar a versão. A alteração é de Hosting; não exige migração dos dados ou reativação de IA. Recuperação: restaurar o Hosting anterior e preservar os namespaces locais; a preferência nova pode ser ignorada pelas versões antigas sem afetar treinos.
