# Revisão de fichas salvas antes da execução

22/10/2026. Implementação local, sem publicação.

A prévia e o início da execução agora consultam a mesma revisão da sessão atual. O aplicativo mostra o nome dos movimentos pendentes e impede o início enquanto houver exercício excluído, cadastro ausente, recurso incompatível, pendência de adaptação/carga, séries inválidas ou par incompleto/repetido. Blocos vazios também precisam ser preenchidos ou removidos.

Exemplo: uma ficha salva contém Supino Reto com Barra. Se esse movimento for excluído depois, o início sinaliza a exclusão. Uma troca por Supino Reto com Halteres pode resolver a sessão na academia sem modificar a ficha original. Nomes antigos do catálogo também são considerados na revisão de exclusões e duplicatas.

A adaptação para Casa e Parque considera as exclusões ao escolher alternativas. Não usa um movimento excluído para preencher uma lacuna. O retorno à academia restaura o original e verifica novamente catálogo, exclusão e política do bloco; não reconstrói os dias salvos. A assinatura das propostas por ambiente também inclui exclusões, impedindo a aplicação de uma proposta desatualizada.

O editor manual continua permitindo pares livres. A revisão não impõe os contratos musculares dos modelos automáticos às fichas pessoais e não força o nível de complexidade da geração sobre movimentos adicionados manualmente. Não recalcula cargas nem prescrição individual. O ajuste da sessão só altera a ficha persistida se o usuário escolher explicitamente uma operação de salvamento apropriada.

## Validação

- `npm test`: 87 aprovados, 2 dependentes do emulador Firestore ignorados. Seis novos testes cobrem revisão sem mutação, aliases, academia, adaptação com exclusões, pares manuais e invalidação de propostas; retirar uma exclusão também resolve o diagnóstico anterior.
- `npm run test:workout-priorities`: dez cenários aprovados no Edge com Firebase simulado, incluindo alteração da exclusão depois de abrir a prévia, bloqueio de início, troca apenas na sessão e preservação da ficha salva.
- Regressões do editor, ambientes e propostas por ambiente aprovadas no navegador.
- `npm run check`, `npm run build` e `npm run test:offline` aprovados. O módulo novo integra o cache offline.
- Evidências: `audit/workout-priorities-validation.json`, `audit/saved-routine-review-mobile.png`, `audit/saved-routine-review-desktop.png`.

As simulações dos geradores da entrega anterior continuam sendo evidências daquele escopo. Esta etapa validou a revisão de fichas existentes; não repetiu a matriz de 48.600 montagens. A personalização por capacidade, frequência e tempo disponível continua pendente de regras próprias.
