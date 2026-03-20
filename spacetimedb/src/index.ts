import { t, SenderError } from 'spacetimedb/server';

import spacetimedb from './schemas';

export const init = spacetimedb.init(_ctx => {
  // Called when the module is initially published
});

export const onConnect = spacetimedb.clientConnected(ctx => {
  const jwt = ctx.senderAuth.jwt;
  if (jwt == null) {
    throw new SenderError('Unauthorized: JWT is required to connect');
  }

  // Only accept tokens issued by Clerk
  if (!jwt.issuer.startsWith('https://clerk.')) {
    throw new SenderError(`Unauthorized: unexpected issuer ${jwt.issuer}`);
  }

  // Upsert user row — insert only on first connect
  const existing = ctx.db.user.identity.find(ctx.sender);
  if (!existing) {
    ctx.db.user.insert({
      identity: ctx.sender,
      clerkId: jwt.subject,
      name: undefined,
      createdAt: ctx.timestamp,
    });
  }
});

export const onDisconnect = spacetimedb.clientDisconnected(_ctx => {
  // Called every time a client disconnects
});

export const add = spacetimedb.reducer(
  { name: t.string() },
  (ctx, { name }) => {
    ctx.db.person.insert({ name });
  }
);

export const set_user_profile = spacetimedb.reducer(
  { name: t.string() },
  (ctx, { name }) => {
    const existing = ctx.db.user.identity.find(ctx.sender);
    if (!existing) throw new SenderError('User not found');
    ctx.db.user.identity.update({ ...existing, name });
  }
);

export const sayHello = spacetimedb.reducer(ctx => {
  for (const person of ctx.db.person.iter()) {
    console.info(`Hello, ${person.name}!`);
  }
  console.info('Hello, World!');
});

export default spacetimedb;
