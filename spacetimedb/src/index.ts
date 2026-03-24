import { t, SenderError } from 'spacetimedb/server';

import spacetimedb from './schemas';

export const init = spacetimedb.init(_ctx => {
  // Called when the module is initially published
  _ctx.db.person.insert({name: "hehee"})
});

export const onConnect = spacetimedb.clientConnected(ctx => {
  const jwt = ctx.senderAuth.jwt;
  if (jwt == null) {
    throw new SenderError('Unauthorized: JWT is required to connect');
  }
  console.log(jwt);
  // Restrict to your specific Clerk instance
  if (jwt.issuer !== 'https://active-mouse-40.clerk.accounts.dev') {

    throw new SenderError(`Unauthorized: unexpected issuer ${jwt.issuer}`);
  }

  // Check audience — ensures this token was minted FOR your app, not another
  // Clerk's default session token audience is your Frontend API URL
  // const expectedAudience = 'https://active-mouse-40.clerk.accounts.dev';
  // const audiences = jwt.audience ?? [];
  // if (!audiences.includes(expectedAudience)) {
  //   console.log("AAAAAAAAAAA ======= Unauthorized: invalid audience: "+jwt.audience)
  //   throw new SenderError(`Unauthorized: invalid audience ` + jwt.audience);
  // }

  // Upsert user row — insert only on first connect
  const existing = ctx.db.user.id.find(ctx.sender);
  if (!existing) {
    ctx.db.user.insert({
      id: ctx.sender,
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
    const existing = ctx.db.user.id.find(ctx.sender);
    if (!existing) throw new SenderError('User not found');
    ctx.db.user.id.update({ ...existing, name });
  }
);

export const sayHello = spacetimedb.reducer(ctx => {
  for (const person of ctx.db.person.iter()) {
    console.info(`Hello, ${person.name}!`);
  }
  console.info('Hello, World!');
});

export default spacetimedb;
