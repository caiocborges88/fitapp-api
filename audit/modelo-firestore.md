# Modelo preparado para a correção

Banco confirmado: `(default)`, edição STANDARD, modo nativo, southamerica-east1.

- `treinos_concluidos/{sessionId}`: proprietário userId imutável, date ISO, tipo/method strings, duration_secs até 86400, data lista até 200, createdAt número, complete boolean e campaignId opcional. Cliente cria/exclui somente seus registros; concessão de recompensa é do servidor.
- `usuarios/{uid}`: campanha com planos/templates serializados e revisão numérica. Proprietário escreve; proprietário/admin/treinador com vínculo lê.
- `jogadores/{uid}`: perfil privado legado e conquistas. Leitura do proprietário/admin; servidor controla escritas.
- `rankings/{uid}`: projeção autenticada sem email; orderBy poder_combate desc, limit 50.
- `dicionario/{exerciseId}`: leitura autenticada; edição com claim admin, campos limitados.
- `vinculos/{trainerUid}_{studentUid}`: vínculo ativo atribuído no servidor, sem escrita pelo cliente.
- `recompensas/{uid}_{sessionId}` e `api_usage/{uid}_{day}`: internos do servidor.

Histórico: where userId == auth.uid, orderBy timestamp desc. Admin lista jogadores e consulta histórico na mesma coleção raiz.

Evolução da entrega 2: sessões novas podem conter `workoutName`, string opcional de até 120 caracteres, congelada no momento do registro. Registros antigos continuam válidos sem esse campo. Nome e estrutura atuais de uma ficha não reescrevem documentos de histórico. Fichas pessoais têm revisão local e data de atualização dentro de `custom_workouts`; dias do plano têm revisão no JSON de campanha, sem alterar o formato externo permitido pelas regras. Essas revisões ainda não representam controle de concorrência transacional entre dispositivos.

As regras são protótipo a validar no emulador antes da publicação; este modelo não descreve documentos consultados da produção.

## Evolução local da entrega 3A

`usuarios/{uid}` inclui `syncVersion` inteiro e `lastOperation`. Atualização versionada precisa incrementar exatamente uma revisão e gravar atomicamente `sync_operations/{operationId}` com a mesma revisão, `createdAt` do servidor e conflitos serializados. Recibos não admitem alteração pelo cliente. Documentos legados podem ser lidos; após migração, escritas do cliente antigo são recusadas.

`campanha.deleted_templates` guarda IDs excluídos. `usuarios/{uid}/exclusoes/{sessionId}` tem `deletedAt` imutável, criado atomicamente com a exclusão da sessão; criar sessão com ID já excluído é proibido. A fila local distingue criação e exclusão para sobreviver à rede indisponível. Consultas de exclusões usam checkpoint inclusivo e paginação; histórico usa páginas de 50 e exportação usa páginas de 200 com cursor separado.

As regras dessa evolução foram validadas nos emuladores, mas não publicadas. Ver `ENTREGA-3A-2026-10-15.md` para limites, migração e pendências de retenção.
