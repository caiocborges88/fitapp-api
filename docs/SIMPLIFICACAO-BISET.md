# Apenas bi-set complementar na geração automática

22/10/2026. Alteração local, sem publicação.

Por solicitação do usuário, os modelos automáticos de mesmo grupo muscular e grupos opostos foram retirados. Os dois seletores — preferências do plano e geração de modelos — agora apresentam somente **Bi-set complementar**. O identificador `biset_sinergista` permanece para compatibilidade com os ciclos já salvos.

O modelo complementar mantém as divisões peito/tríceps, costas/bíceps e pernas/ombros, com quatro pares distintos por dia e abdominal final. As restrições de ambiente, recursos, complexidade e subníveis continuam aplicadas. Os outros contratos automáticos foram removidos, inclusive suas instruções na integração de IA adiada. A geração direta com identificadores antigos é recusada.

## Montagem manual livre

O usuário pode cadastrar uma ficha, adicionar dois exercícios ao bloco e selecionar **Par de exercícios** em Execução. Não existe exigência de combinar grupos complementares no editor. São aceitos pares do mesmo grupo, de grupos opostos ou outras combinações, respeitando recursos disponíveis e as validações estruturais existentes: dois movimentos distintos por par e séries válidas.

## Compatibilidade de planos antigos

Planos salvos com os identificadores retirados não são apagados nem convertidos. A seleção atual aparece como **Plano salvo · personalizado**, em uma opção oculta e desabilitada para novas escolhas. Os dias existentes continuam visíveis, editáveis e executáveis. A abertura não gera dias ausentes nem acrescenta novos exercícios. O contador do plano é preservado.

Aplicar preferências mantendo esse identificador não recria o modelo removido. Para um novo plano, o usuário escolhe um método disponível. Uma preferência antiga sem plano salvo apresenta o bi-set complementar como opção atual, sem gerar automaticamente um novo plano.

A indicação visual que classificava pares como antagonistas com base apenas no campo `antagonist` foi substituída por um indicador genérico de par. Isso evita rotular o novo modelo complementar ou pares livres de forma incorreta.

## Verificação

- Suíte de domínio: 75 aprovados, 2 dependentes do emulador Firestore ignorados. Inclui recusa da geração retirada, cópia preservada de planos antigos e combinações manuais livres.
- Navegador local com Firebase simulado: seletores com uma opção de bi-set, geração e salvamento do complementar, falha sem sobrescrever plano, três combinações manuais criadas/salvas/executadas, dois tipos de plano antigo restaurados após recarga, contador preservado e preferência antiga sem plano.
- Regressões do editor e da revisão de ciclos completos aprovadas no Edge.
- Build, sintaxe e lint aprovados; cache offline atualizado. Nenhuma chamada de IA ou publicação.

Reprodução: `npm test`, `npm run test:biset`, `node tests/complete-plan-browser.cjs`, `npm run test:editor`, `npm run build`, `npm run check`.

Auditorias atuais de geração foram ajustadas para três divisões complementares, em vez das nove divisões dos três modelos anteriores. Relatórios antigos em documentos históricos mantêm o escopo original. Evidência de interface em `audit/biset-browser-validation.json`.
