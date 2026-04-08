"use client"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAuth } from '@clerk/nextjs';

const TokenContext = createContext<string | undefined>(undefined);

export function useClerkToken() {
  return useContext(TokenContext);
}

/**
 * ClerkTokenProvider:
 * - If signed out: renders Clerk's redirect component.
 * - If signed in: loads a Clerk session token (JWT) and provides it via context.
 *
 * Note:
 * - getToken() returns a token suitable for sending to your backend. If you have
 *   configured a specific JWT template in Clerk, pass its name via
 *   getToken({ template: "<YOUR_TEMPLATE_NAME>" }).
 */
export function ClerkTokenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!isLoaded) return;

      // IMPORTANT: if signed out, clear any cached token
      if (!isSignedIn) {
        if (!cancelled) setToken(null);
        return;
      }

      try {
        // If you use a Clerk JWT template, use:
        // const t = await getToken({ template: "<YOUR_TEMPLATE_NAME>" });
        const t = await getToken({template: 'jwt-spacetime-aud'});

        if (!t) {
          throw new Error('Clerk returned no session token.');
        }

        if (!cancelled) setToken(t);
      } catch (e) {
        if (!cancelled) setError(e as Error);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken]);

  const value = useMemo<string | undefined>(() => token ?? undefined, [token]);

  if (error) {
    return (
      <div>
        <p>Authentication error</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn) {
    // Not signed in — render children without a token (public pages still work)
    return (
      <TokenContext.Provider value={undefined}>{children}</TokenContext.Provider>
    );
  }

  if (!token) {
    return <p>Loading...</p>;
  }

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}