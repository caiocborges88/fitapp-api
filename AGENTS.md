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
- Testes locais usam `demo-fitapp` ou Firebase simulado; não grave dados reais para verificar interface.
- Registre evidências novas em `audit/`, distinguindo simulação de testes em aparelhos reais. Não declare Android/iPhone físicos como verificados por emulação.
- Não publique ou modifique produção sem solicitação explícita. Quando autorizado, confira o escopo, preserve snapshot/versão anterior, publique somente os serviços alterados e verifique a versão pública, os arquivos e o offline sem gravar dados reais. Registre release e recuperação em `docs/`. A publicação não transforma testes emulados em conferência física.
- Não inclua segredos, arquivos de ambiente ou credenciais em commits ou relatórios.
