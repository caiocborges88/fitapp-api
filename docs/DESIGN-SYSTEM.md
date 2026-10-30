# Sistema visual do FitApp

## Prioridade de navegação — 30/10/2026

O fluxo simplificado em [SIMPLIFICACAO-DO-FLUXO-2026-10-30.md](SIMPLIFICACAO-DO-FLUXO-2026-10-30.md) prioriza modelo pronto e início direto do próximo treino. Conferência/edição são secundárias; o plano atual vem antes da criação em Meus treinos. Perfil não oferece configuração de prescrição. Identidade, tokens, temas, movimento e acessibilidade abaixo continuam válidos.

## Direção — Energia, alegria e foco

A identidade local de 28/10/2026 usa ciano e violeta, contornos luminosos, cartões geométricos e ilustrações esportivas próprias. Claro e escuro têm a mesma hierarquia. A ficha disponível e a ação de treinar são prioritárias; a sessão mantém números e fundos estáveis. Decisões, evidências e limites: [IDENTIDADE-ENERGIA.md](IDENTIDADE-ENERGIA.md).

## Base compartilhada

- Manrope variável local, pesos 700–800 para títulos e números; corpo de 16 px e informações auxiliares de 13–14 px. Cronômetros e cargas usam números tabulares. A licença permanece em `public/fonts/OFL.txt`.
- `public/css/design.css` mantém os tokens semânticos; `public/css/energy.css` aplica os tratamentos aos componentes; `mobile-flow.css` mantém os contratos móveis. Evitar novas cores ou efeitos diretamente nos templates JavaScript.
- Fundo claro `#F5F7FF`, cartões brancos e texto `#111A33`. No escuro, fundo `#080D1B`, cartões `#111A2E` e texto `#F5F7FF`.
- Ciano textual `--accent`: `#0E7490` no claro e `#22D3EE` no escuro. Violeta textual `--secondary`: `#6D28D9` e `#A78BFA`. Superfícies suaves têm tokens próprios.
- Ações principais usam `--action:#22D3EE` e `--on-action:#08111F`, separados dos links. `--on-accent` continua compatível com os componentes legados que usam `--accent` como fundo.
- `--control-line` identifica campos e controles; `--line` separa superfícies. Brilhos, elevação, raios e durações também usam tokens. Gradientes ficam em bordas decorativas, fora dos textos e números.
- Sucesso verde, atenção âmbar e erro rosa/vermelho usam rótulos ou símbolos. A cor não representa capacidade física, objetivo ou qualidade de uma ficha.
- Raio de 20 px nos destaques, 16 px nos cartões e 12 px nos controles. Espaçamentos seguem 8, 12, 16, 24 e 32 px. Celular mantém margens de 16 px.

## Componentes, telas e ilustrações

A ficha de acesso rápido recebe borda ciano/violeta e botão principal amplo. Meus treinos, biblioteca, revisão, formulários, gráficos, perfil e administração compartilham os mesmos estilos. A navegação mantém quatro destinos no celular e barra lateral no desktop. Edição e organização continuam sob demanda; pendências ficam visíveis e resolvíveis.

Campos mantêm rótulos, borda contrastante e foco visível. Seletores usam marcas e contornos para comunicar seleção. Séries realizadas recebem marca verde, confirmação curta e checkbox com alvo de 44 px. O progresso expõe percentual acessível. O descanso usa o relógio existente, sem um segundo temporizador independente.

As três ilustrações SVG locais (`preparation`, `movement` e `celebration`) são decorativas, com `alt` vazio e dimensões explícitas. Usam pessoas estilizadas com diferentes proporções e tons de pele; não ensinam execução de exercício. Login, ausência de fichas, ausência de histórico e resumo usam essas artes. A ficha de acesso rápido recebe apenas uma miniatura.

A coleção continua opcional. O pacote pode ser aberto por teclado, não usa flash de tela inteira, e os controles do resultado aparecem imediatamente. O cartão compartilhável usa fundo opaco e preserva as métricas existentes. Nome e símbolo FitApp são preservados; os PNGs da PWA derivam do SVG por `npm run build:icons` (requer o navegador local do Playwright). O build normal continua sem exigir navegador.

## Tema e movimento

Perfil oferece Tema (Sistema/Claro/Escuro) e Efeitos (Completos/Reduzidos). O padrão é Sistema/Completos; `prefers-reduced-motion` sempre prevalece. Sem conta, valem as preferências do sistema.

A preferência `fitapp_appearance` usa `FitStore`, com `{version:1,theme:'system'|'light'|'dark',effects:'full'|'reduced'}`. É local à conta/dispositivo e não entra na sincronização de planos. Formatos desconhecidos não são apagados; o aplicativo usa o padrão até uma escolha explícita. Falha ao gravar mantém o valor anterior e mostra a falha.

`appearance.js` resolve `data-theme` e `data-effects`, a cor da barra do navegador e os controles. `FitStore.bindUser` emite `fitapp:accountchange` após vincular a conta; `fitapp:appearancechange` notifica mudança efetiva de tema/efeitos. Gráficos são atualizados quando visíveis. Mudanças em outra aba são reaplicadas a partir do namespace atual.

Pressionar: até 120 ms; troca de aba: 200 ms e 6 px; diálogos: 240 ms; série: 240 ms; celebração: 800 ms, apenas ao abrir o resumo após salvamento local confirmado. Fechamento permanece imediato, sem atrasar a ação. Controles fixos não ficam em ancestrais transformados. Efeitos reduzidos removem animações decorativas, transições, desfoque de diálogos e reduzem brilhos. Chart.js também recebe animação desativada. Não há efeitos permanentes de partículas ou paralaxe.

## Acessibilidade e validação

Foco visível, rótulos, unidades explícitas, navegação identificada, atalho para conteúdo, Escape e contenção de Tab em modais permanecem. Avisos de armazenamento, offline e sincronização mantêm significados distintos. Sucesso visual não substitui a confirmação de persistência.

`npm run test:appearance` cobre 16 combinações de tamanho/tema/efeitos, preferências, duas abas, contas, versão desconhecida, falha de armazenamento, redução do sistema, texto ampliado, sessão, gráficos, coleção e recarga autenticada offline com SDK Firebase simulado no cache. `npm run test:design` cobre tarefas e exportação do resumo; novas capturas recebem prefixo `energy-design`.

Os testes verificam contraste mínimo de 4,5:1 nos pares textuais centrais e 3:1 em contornos de campos. Esses testes não certificam toda a interface como conforme à WCAG. Conferência manual com leitor de tela e Android/iPhone físicos continua necessária.

## Linguagem e contratos

Usar ficha, treino, exercício, série, equipamento, salvar, descartar, histórico e preferências. Referência anterior não é recorde histórico. Recompensa é opcional e não mede capacidade física. IA permanece adiada. A reformulação não muda prescrição, catálogo, ficha/rascunho/sessão, revisões, histórico ou fila offline.
