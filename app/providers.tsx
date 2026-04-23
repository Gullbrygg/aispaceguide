'use client';

import { useMemo } from 'react';
import { SpacetimeDBProvider } from 'spacetimedb/react';
import { DbConnection, ErrorContext } from '../src/module_bindings';
import { Identity } from 'spacetimedb';
import { useClerkToken } from './ClerkTokenProvider';

const HOST =
  process.env.NEXT_PUBLIC_SPACETIMEDB_HOST ?? 'wss://maincloud.spacetimedb.com';
const DB_NAME =
  process.env.NEXT_PUBLIC_SPACETIMEDB_DB_NAME ?? 'theaiguide-ol2uu';

const onConnect = (conn: DbConnection, identity: Identity) => {
  console.log(
    'Connected to SpacetimeDB with identity:',
    identity.toHexString()
  );

  // Subscribe to all relevant views
  conn.subscriptionBuilder().subscribe([
    'SELECT * FROM my_chat_session',
    'SELECT * FROM my_chat_message',
    'SELECT * FROM person',
    'SELECT * FROM study_group',
    'SELECT * FROM user_group'
  ]);
};

const onDisconnect = () => {
  console.log('Disconnected from SpacetimeDB');
};

const onConnectError = (_ctx: ErrorContext, err: Error) => {
  console.log('Error connecting to SpacetimeDB:', err);
};

export function Providers({ children }: { children: React.ReactNode }) {
  const token = useClerkToken();

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('JWT payload being sent to SpacetimeDB:', payload);
      console.log('Issuer (iss):', payload.iss);
      console.log('Subject (sub):', payload.sub);
    } catch (e) {
      console.error('Failed to decode token:', e);
    }
  }

  const connectionBuilder = useMemo(
    () =>
      token
        ? DbConnection.builder()
            .withUri(HOST)
            .withDatabaseName(DB_NAME)
            .withToken(token)
            .onConnect(onConnect)
            .onDisconnect(onDisconnect)
            .onConnectError(onConnectError)
        : null,
    [token]
  );

  if (!connectionBuilder) {
    return <>{children}</>;
  }

  return (
    <SpacetimeDBProvider connectionBuilder={connectionBuilder}>
      {children}
    </SpacetimeDBProvider>
  );
}
