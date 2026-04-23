import { schema, table, t } from 'spacetimedb/server';

export const ChatSession = table(
  {
    indexes: [
      { accessor: 'chat_session_client_request_id', algorithm: 'btree', columns: ['clientRequestId'] },
      { accessor: 'chat_session_owner_id', algorithm: 'btree', columns: ['ownerId'] },
      { accessor: 'chat_session_updated_at', algorithm: 'btree', columns: ['updatedAt'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    ownerId: t.identity(),
    clientRequestId: t.string().optional(),
    title: t.string(),
    createdAt: t.timestamp(),
    updatedAt: t.timestamp()
  }
);

export const ChatMessage = table(
  {
    indexes: [
      { accessor: 'chat_message_owner_id', algorithm: 'btree', columns: ['ownerId'] },
      { accessor: 'chat_message_session_id', algorithm: 'btree', columns: ['sessionId'] },
      { accessor: 'chat_message_created_at', algorithm: 'btree', columns: ['createdAt'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    sessionId: t.u64(),
    ownerId: t.identity(),
    role: t.string(),
    content: t.string(),
    inputTokens: t.u64().optional(),
    outputTokens: t.u64().optional(),
    createdAt: t.timestamp()
  }
);

export const ChatSessionMember = table(
  {
    indexes: [
      { accessor: 'chat_session_member_session_id', algorithm: 'btree', columns: ['sessionId'] },
      { accessor: 'chat_session_member_user_id', algorithm: 'btree', columns: ['userId'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    sessionId: t.u64(),
    userId: t.identity(),
    invitedBy: t.identity(),
    invitedAt: t.timestamp()
  }
);

export const ChatSessionInvite = table(
  {
    indexes: [
      { accessor: 'chat_session_invite_code', algorithm: 'btree', columns: ['code'] },
      { accessor: 'chat_session_invite_session_id', algorithm: 'btree', columns: ['sessionId'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    sessionId: t.u64(),
    code: t.string(),
    createdBy: t.identity(),
    createdAt: t.timestamp(),
    usedBy: t.identity().optional(),
    usedAt: t.timestamp().optional()
  }
);

const spacetimedb = schema({
  person: table(
    { public: true },
    {
      name: t.string(),
    }
  ),
  // User ===
  user: table(
    {
      indexes: [{ accessor: 'user_clerk_id', algorithm: 'btree', columns: ['clerkId'] }]
    },
    {
      id: t.identity().primaryKey(),
      clerkId: t.string(),
      name: t.string().optional(),
      email: t.string().optional(),
      role: t.string().optional(),
      createdAt: t.timestamp(),
    }
  ),
  // Groups
  study_group: table(
    { public: true },
    {
      id: t.u64().primaryKey().autoInc(),
      name: t.string()
    }
  ),
  user_group: table(
    {
      public: true,
      indexes: [
        { accessor: 'user_group_user_id', algorithm: 'btree', columns: ['userId'] },
        { accessor: 'user_group_group_id', algorithm: 'btree', columns: ['groupId'] }
      ]
    },
    {
      id: t.u64().primaryKey().autoInc(),
      userId: t.identity(),
      groupId: t.u64()
    }
  ),
  // Chat sessions (one row per conversation)
  chat_session: ChatSession,
  // Chat messages persisted for replay/resume.
  chat_message: ChatMessage,
  // Membership for invited users.
  chat_session_member: ChatSessionMember,
  // Single-use invite codes to join a chat.
  chat_session_invite: ChatSessionInvite
});

spacetimedb.view(
  { name: 'my_chat_session', public: true },
  t.array(ChatSession.rowType),
  (ctx) => {
    const sessions = [...ctx.db.chat_session.chat_session_owner_id.filter(ctx.sender)];
    const seenSessionIds = new Set(sessions.map((session) => session.id.toString()));

    for (const member of ctx.db.chat_session_member.chat_session_member_user_id.filter(ctx.sender)) {
      const session = ctx.db.chat_session.id.find(member.sessionId);
      if (session && !seenSessionIds.has(session.id.toString())) {
        seenSessionIds.add(session.id.toString());
        sessions.push(session);
      }
    }

    return sessions;
  }
);

spacetimedb.view(
  { name: 'my_chat_message', public: true },
  t.array(ChatMessage.rowType),
  (ctx) => {
    const allowedSessionIds = new Set<string>();

    for (const session of ctx.db.chat_session.chat_session_owner_id.filter(ctx.sender)) {
      allowedSessionIds.add(session.id.toString());
    }

    for (const member of ctx.db.chat_session_member.chat_session_member_user_id.filter(ctx.sender)) {
      allowedSessionIds.add(member.sessionId.toString());
    }

    const messages = [];
    const seenMessageIds = new Set<string>();

    for (const sessionIdText of allowedSessionIds) {
      const sessionId = BigInt(sessionIdText);
      for (const message of ctx.db.chat_message.chat_message_session_id.filter(sessionId)) {
        const messageId = message.id.toString();
        if (!seenMessageIds.has(messageId)) {
          seenMessageIds.add(messageId);
          messages.push(message);
        }
      }
    }

    return messages;
  }
);

export default spacetimedb;