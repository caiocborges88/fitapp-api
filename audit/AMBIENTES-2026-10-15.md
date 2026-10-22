# Correção de ambientes — Casa e Parque/praia

Versão local: `f8520ec503a60661`. Sem publicação no Firebase ou envio ao GitHub.

## Alterações

- Casa e Parque/praia começam somente com peso corporal. Nenhum presume banco, barra fixa, paralelas, corda, halteres, máquinas ou polias.
- Recursos opcionais são declarados na tela Treinar e guardados separadamente para cada ambiente e conta neste dispositivo. Marcar uma barra não declara que existem paralelas; banco e corda também são independentes.
- O catálogo identifica explicitamente os apoios das flexões inclinada/declinada, barra fixa, mergulho e corda. Peso corporal deixa de significar automaticamente ausência de acessórios.
- A adaptação atende planos, fichas pessoais, prévia manual/gerada e importação. A montagem e as sugestões de troca/inclusão respeitam o ambiente; a execução verifica novamente os recursos disponíveis.
- Trocar o ambiente durante a prévia não recarrega a ficha inteira nem perde séries/notas editadas. Academia recupera os nomes/metas de origem; a adaptação não sobrescreve a ficha salva. Edição permanente continua mostrando a ficha original para evitar salvar alterações implícitas do ambiente.
- O plano padrão é gerado e armazenado independentemente do ambiente temporário. Apenas a cópia da sessão recebe substituições. Isso impede que abrir um dia em Casa grave a versão adaptada como original da academia.
- Substituições procuram o mesmo grupo principal e priorizam foco e alternativas ainda não utilizadas. Mantêm a estrutura e quantidade de séries; cargas realizadas da versão anterior não acompanham um movimento substituído.
- Acrescentadas seis alternativas de solo ao catálogo: agachamento sem carga, duas pontes de quadril, panturrilhas sem carga, flexão Pike e flexão com mãos próximas. Cliente e catálogo do servidor são gerados da mesma fonte, agora com 91 exercícios.
- Quando o catálogo não oferece alternativa compatível, o movimento fica sinalizado e o início é bloqueado até troca, remoção ou declaração do recurso necessário. Nenhum exercício de puxada é considerado possível sem apoio apenas por ser calistênico.

## Validação

- `npm run check`, build e `git diff --check`: aprovados.
- Suíte completa com Firestore emulado: 26 aprovados, zero falhas ou ignorados.
- `npm run test:environment`: ficha pessoal em Casa e Parque/praia; volta à Academia; original preservado; execução com recursos compatíveis; barra bloqueada e liberada após declaração; opções independentes por ambiente; plano padrão adaptado sem sobrescrever original; largura móvel.
- `npm run test:browser`, `npm run test:editor`, `npm run test:design` e `npm run test:offline`: aprovados.
- Evidências: `environment-validation.json` e `environment-mobile.png`. Firebase simulado no teste de interação; regras e persistência verificadas na suíte com emuladores. Nenhum teste gravou dados em produção.

## Limites

Ambiente e recursos não comprovam equivalência biomecânica nem ajustam intensidade automaticamente. Vários exercícios de academia podem convergir para a mesma alternativa de solo; a ficha adaptada permanece revisável. Quando faltam alternativas, o app pede revisão em vez de inventar equipamento. A revisão profissional do conteúdo e testes em aparelhos reais continuam no plano de desenvolvimento.

Publicação futura deve incluir o catálogo atualizado do servidor junto à aplicação. Publicar apenas a hospedagem deixaria a validação da IA sem as seis novas alternativas.
