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

## Interface e acessibilidade
- Reutilize estilos e variáveis existentes, temas claro/escuro, rótulos, foco visível e controles por teclado.
- A ação principal deve permanecer acessível em telas pequenas. Considere teclado virtual, navegação inferior e área segura.
- Avisos bloqueantes ficam visíveis fora de painéis recolhidos, com acesso ao item correspondente.
- Use botões de ordenação acessíveis; gestos não podem ser a única alternativa.

## Verificação e entrega
- `npm run build` gera vendor, catálogo das funções, manifesto, versão e cache offline; não edite esses resultados manualmente.
- Execute `npm run check` e `npm test`. Para regras/recompensas, use Firestore emulado conforme o README.
- Execute os testes de navegador do fluxo alterado e as regressões pertinentes: editor, ambientes, prioridades, cobertura, sincronização e offline.
- Testes locais usam `demo-fitapp` ou Firebase simulado; não grave dados reais para verificar interface.
- Registre evidências novas em `audit/`, distinguindo simulação de testes em aparelhos reais. Não declare Android/iPhone físicos como verificados por emulação.
- Não publique ou modifique produção sem solicitação explícita. Conclua a implementação local e documente a versão preparada.
- Não inclua segredos, arquivos de ambiente ou credenciais em commits ou relatórios.
