import { makeQueryBuilder, schema, t, table } from 'spacetimedb';

const MyChatSessionRow = t.row({
  id: t.u64().primaryKey(),
  ownerId: t.identity().name('owner_id'),
  clientRequestId: t.option(t.string()).name('client_request_id'),
  title: t.string(),
  createdAt: t.timestamp().name('created_at'),
  updatedAt: t.timestamp().name('updated_at'),
});

const MyChatMessageRow = t.row({
  id: t.u64().primaryKey(),
  sessionId: t.u64().name('session_id'),
  ownerId: t.identity().name('owner_id'),
  role: t.string(),
  content: t.string(),
  inputTokens: t.option(t.u64()).name('input_tokens'),
  outputTokens: t.option(t.u64()).name('output_tokens'),
  createdAt: t.timestamp().name('created_at'),
});

const chatViewsSchema = schema({
  my_chat_session: table(
    {
      name: 'my_chat_session',
      indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
      constraints: [{ name: 'my_chat_session_id_key', constraint: 'unique', columns: ['id'] }],
    },
    MyChatSessionRow
  ),
  my_chat_message: table(
    {
      name: 'my_chat_message',
      indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
      constraints: [{ name: 'my_chat_message_id_key', constraint: 'unique', columns: ['id'] }],
    },
    MyChatMessageRow
  ),
});

export const chatViewTables = makeQueryBuilder(chatViewsSchema.schemaType);
