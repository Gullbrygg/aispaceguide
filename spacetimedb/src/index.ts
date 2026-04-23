import { t, SenderError } from "spacetimedb/server";

import spacetimedb from "./schemas";
import { ChatMessage, ChatSession } from "./schemas";

export const init = spacetimedb.init((_ctx) => {
  // Called when the module is initially published
  _ctx.db.person.insert({ name: "hehee" });
});

export const onConnect = spacetimedb.clientConnected((ctx) => {
  const jwt = ctx.senderAuth.jwt;
  if (jwt == null) {
    throw new SenderError("Unauthorized: JWT is required to connect");
  }
  console.log(jwt);
  // Restrict to your specific Clerk instance
  if (!["https://active-mouse-40.clerk.accounts.dev", "https://auth.spacetimedb.com"].includes(jwt.issuer)) {
    throw new SenderError(`Unauthorized: unexpected issuer ${jwt.issuer}`);
  }

  // Check audience — ensures this token was minted FOR your app, not another
  // Clerk's default session token audience is your Frontend API URL
  const expectedAudience = 'https://active-mouse-40.clerk.accounts.dev';
  const audiences = jwt.audience ?? [];
  if (!audiences.includes(expectedAudience)) {
    console.log("AAAAAAAAAAA ======= Unauthorized: invalid audience: "+jwt.audience)
  //   throw new SenderError(`Unauthorized: invalid audience ` + jwt.audience);
  }

  // Upsert user row — insert only on first connect
  const payload = jwt.fullPayload;

  // Helper to safely extract a string claim
  function getClaim(payload: Record<string, unknown>, key: string): string | undefined {
    const val = payload[key];
    if (typeof val === "string") return val;
    return undefined;
  }

  const existing = ctx.db.user.id.find(ctx.sender);

  if (!existing) {
    ctx.db.user.insert({
      id: ctx.sender,
      clerkId: jwt.subject,
      name: getClaim(payload, "fullname") ?? "",
      email: getClaim(payload, "email") ?? "",
      createdAt: ctx.timestamp,
      role: undefined
    });
  } else if (!existing.name) {
    ctx.db.user.id.update(existing);
  }
});

export const onDisconnect = spacetimedb.clientDisconnected((_ctx) => {
  // Called every time a client disconnects
});

export const add = spacetimedb.reducer({ name: t.string() }, (ctx, { name }) => {
  ctx.db.person.insert({ name });
});

export const set_user_profile = spacetimedb.reducer({ name: t.string() }, (ctx, { name }) => {
  const existing = ctx.db.user.id.find(ctx.sender);
  if (!existing) throw new SenderError("User not found");
  ctx.db.user.id.update({ ...existing, name });
});

export const sayHello = spacetimedb.reducer((ctx) => {
  for (const person of ctx.db.person.iter()) {
    console.info(`Hello, ${person.name}!`);
  }
  console.info("Hello, World!");
});

export const create_chat_session = spacetimedb.reducer(
  { title: t.string().optional(), clientRequestId: t.string().optional() },
  (ctx, { title, clientRequestId }) => {
    const now = ctx.timestamp;
    const trimmedTitle = title?.trim();

    ctx.db.chat_session.insert({
      id: 0n,
      ownerId: ctx.sender,
      clientRequestId,
      title: trimmedTitle && trimmedTitle.length > 0 ? trimmedTitle.slice(0, 120) : 'New chat',
      createdAt: now,
      updatedAt: now,
    });
  }
);

export const invite_user_to_chat = spacetimedb.reducer(
  { sessionId: t.u64(), invitedClerkId: t.string() },
  (ctx, { sessionId, invitedClerkId }) => {
    const _unused = invitedClerkId;
    throw new SenderError('User-lookup invites are disabled for privacy. Use invite codes instead.');
  }
);

export const create_chat_invite = spacetimedb.reducer(
  { sessionId: t.u64(), code: t.string() },
  (ctx, { sessionId, code }) => {
    const session = ctx.db.chat_session.id.find(sessionId);
    if (!session || session.ownerId.toHexString() !== ctx.sender.toHexString()) {
      throw new SenderError('Only the session owner can create invite codes');
    }

    const normalizedCode = code.trim();
    if (normalizedCode.length < 16) {
      throw new SenderError('Invite code must be at least 16 characters');
    }

    for (const existing of ctx.db.chat_session_invite.chat_session_invite_code.filter(normalizedCode)) {
      if (!existing.usedBy) {
        throw new SenderError('Invite code already exists. Generate a new one.');
      }
    }

    ctx.db.chat_session_invite.insert({
      id: 0n,
      sessionId,
      code: normalizedCode,
      createdBy: ctx.sender,
      createdAt: ctx.timestamp,
      usedBy: undefined,
      usedAt: undefined,
    });
  }
);

export const join_chat_with_invite_code = spacetimedb.reducer(
  { code: t.string() },
  (ctx, { code }) => {
    const normalizedCode = code.trim();
    if (!normalizedCode) {
      throw new SenderError('Invite code is required');
    }

    let invite = undefined;
    for (const row of ctx.db.chat_session_invite.chat_session_invite_code.filter(normalizedCode)) {
      invite = row;
      break;
    }

    if (!invite) {
      throw new SenderError('Invite code not found');
    }

    if (invite.usedBy) {
      throw new SenderError('Invite code has already been used');
    }

    const session = ctx.db.chat_session.id.find(invite.sessionId);
    if (!session) {
      throw new SenderError('Chat session not found');
    }

    if (session.ownerId.toHexString() === ctx.sender.toHexString()) {
      throw new SenderError('You are already a participant');
    }

    for (const member of ctx.db.chat_session_member.chat_session_member_session_id.filter(invite.sessionId)) {
      if (member.userId.toHexString() === ctx.sender.toHexString()) {
        throw new SenderError('You are already a participant');
      }
    }

    ctx.db.chat_session_member.insert({
      id: 0n,
      sessionId: invite.sessionId,
      userId: ctx.sender,
      invitedBy: invite.createdBy,
      invitedAt: ctx.timestamp,
    });

    ctx.db.chat_session_invite.id.update({
      ...invite,
      usedBy: ctx.sender,
      usedAt: ctx.timestamp,
    });
  }
);

export const save_chat_message = spacetimedb.reducer(
  {
    sessionId: t.u64(),
    role: t.string(),
    content: t.string(),
    inputTokens: t.u64().optional(),
    outputTokens: t.u64().optional(),
  },
  (ctx, { sessionId, role, content, inputTokens, outputTokens }) => {
    const session = ctx.db.chat_session.id.find(sessionId);
    if (!session) {
      throw new SenderError('Chat session not found');
    }

    const isOwner = session.ownerId.toHexString() === ctx.sender.toHexString();
    let isMember = false;
    if (!isOwner) {
      for (const member of ctx.db.chat_session_member.chat_session_member_user_id.filter(ctx.sender)) {
        if (member.sessionId === sessionId) {
          isMember = true;
          break;
        }
      }
    }

    if (!isOwner && !isMember) {
      throw new SenderError('You do not have access to this chat session');
    }

    const normalizedRole = role.trim().toLowerCase();
    if (normalizedRole !== 'user' && normalizedRole !== 'assistant' && normalizedRole !== 'system') {
      throw new SenderError('Invalid role');
    }

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      throw new SenderError('Message content is required');
    }

    ctx.db.chat_message.insert({
      id: 0n,
      sessionId,
      ownerId: ctx.sender,
      role: normalizedRole,
      content: trimmedContent,
      inputTokens,
      outputTokens,
      createdAt: ctx.timestamp,
    });

    ctx.db.chat_session.id.update({
      ...session,
      updatedAt: ctx.timestamp,
      title:
        session.title === 'New chat' && normalizedRole === 'user'
          ? trimmedContent.slice(0, 72)
          : session.title,
    });
  }
);

export const get_accessible_chat_sessions = spacetimedb.procedure(
  t.array(ChatSession.rowType),
  (ctx) =>
    ctx.withTx((tx) => {
      const sessions = [...tx.db.chat_session.chat_session_owner_id.filter(tx.sender)];
      const seenSessionIds = new Set(sessions.map((session) => session.id.toString()));

      for (const member of tx.db.chat_session_member.chat_session_member_user_id.filter(tx.sender)) {
        const session = tx.db.chat_session.id.find(member.sessionId);
        if (session && !seenSessionIds.has(session.id.toString())) {
          seenSessionIds.add(session.id.toString());
          sessions.push(session);
        }
      }

      sessions.sort((a, b) => Number(b.updatedAt.microsSinceUnixEpoch - a.updatedAt.microsSinceUnixEpoch));
      return sessions;
    })
);

export const get_accessible_chat_messages = spacetimedb.procedure(
  { sessionId: t.u64() },
  t.array(ChatMessage.rowType),
  (ctx, { sessionId }) =>
    ctx.withTx((tx) => {
      const session = tx.db.chat_session.id.find(sessionId);
      if (!session) {
        return [];
      }

      const isOwner = session.ownerId.toHexString() === tx.sender.toHexString();
      let isMember = false;

      if (!isOwner) {
        for (const member of tx.db.chat_session_member.chat_session_member_user_id.filter(tx.sender)) {
          if (member.sessionId === sessionId) {
            isMember = true;
            break;
          }
        }
      }

      if (!isOwner && !isMember) {
        return [];
      }

      const messages = [...tx.db.chat_message.chat_message_session_id.filter(sessionId)];
      messages.sort((a, b) => Number(a.createdAt.microsSinceUnixEpoch - b.createdAt.microsSinceUnixEpoch));
      return messages;
    })
);

export default spacetimedb;
