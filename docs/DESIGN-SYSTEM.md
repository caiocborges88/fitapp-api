# Sistema visual do FitApp

## Direção

Uma interface calma e legível para consultar e registrar treinos. A identidade deve servir ao registro, com menos metáforas e menos interrupções. Os temas claro e escuro seguem `prefers-color-scheme`, conforme preferência do responsável pelo produto.

## Base compartilhada

- Fonte Manrope variável, servida em `public/fonts/Manrope.ttf`, licença OFL em `public/fonts/OFL.txt`. Sem dependência de um servidor externo para renderizar a interface.
- Paleta semântica em `public/css/design.css`: fundo, superfície, texto, texto secundário, borda, ação principal, destaque secundário, aviso e erro. Os componentes não escolhem cores pelo objetivo físico da ficha.
- Ação principal em verde, apoio em azul. Erro e aviso têm texto explícito; a cor não deve ser a única forma de comunicar estado.
- Formas com cantos moderadamente arredondados, bordas discretas e espaçamento consistente. Ícones vetoriais sem preenchimento no fluxo principal; cartas mantêm ilustrações próprias.
- Barra lateral no desktop e quatro destinos no rodapé do celular: Treinar, Meus treinos, Histórico e Mais.
- Movimento curto na entrada de painéis e transições de estado. Respeitar `prefers-reduced-motion`. Evitar animação pulsante para ações comuns.

## Componentes e estados

Na versão local de 28/10/2026, Treinar destaca a ficha de acesso rápido. A revisão usa campos recolhidos em Ajustar e Organizar bloco, pendências visíveis com acesso direto e uma barra inferior de ações. Detalhes de descanso/cobertura ficam em Mais opções; operações de organização ficam no menu de cada ficha. Consulte [EXPERIENCIA-MOVEL.md](EXPERIENCIA-MOVEL.md) para contratos de rascunho, teclado/área segura e validação.

Botão principal, secundário, texto e destrutivo; campos com rótulo; cartão de ficha; aviso; estado vazio; painel; navegação; indicadores de sincronização; diálogo de resumo e modais de edição. IDs antigos necessários à compatibilidade continuam no DOM, mas não definem a linguagem visual.

Novos componentes usam classes e variáveis compartilhadas. Trechos gerados pelo `ui.js` ainda têm estilos de layout legados; suas cores foram migradas para variáveis. A consolidação desses trechos em componentes menores faz parte da evolução técnica, sem reescrita simultânea da persistência.

## Acessibilidade e validação

Foco visível, rótulos nos campos de séries, navegação principal identificada, atalho para conteúdo, unidades explícitas, controle de voz com estado acessível, fechamento por Escape e contenção de Tab nos modais. O resumo usa diálogo nativo.

O teste `npm run test:design` verifica tarefas reais, largura de página e quatro combinações de tela/tema. Também verifica contraste mínimo de 4,5:1 em pares centrais da paleta; isso não certifica toda a interface como conforme à WCAG. Testes com leitor de tela, ampliação e dispositivos iOS/Android reais continuam no plano.

## Linguagem

Usar ficha, treino, exercício, série, equipamento, salvar, descartar, histórico e preferências. IA gera um rascunho revisável. Referência anterior não é recorde histórico. Recompensa é opcional e não descreve capacidade física.
