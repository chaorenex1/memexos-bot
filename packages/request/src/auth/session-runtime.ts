import type { UserAuthApi } from './user-auth-api';
import type { AuthSessionStatus, AuthTokens, UserInfo } from '@repo/types';

let bootstrapInFlight: Promise<void> | null = null;

export interface AuthSessionStoreAdapter {
  getTokens(): AuthTokens | null;
  getStatus?(): AuthSessionStatus;
  isHydrated?(): boolean;
  setUser(user: UserInfo | null): void;
  setTokens(tokens: AuthTokens | null): void;
  setSession(user: UserInfo, tokens: AuthTokens): void;
  clearSession(): void;
  setStatus(status: AuthSessionStatus): void;
  setHydrated(hydrated: boolean): void;
}

export async function bootstrapAuthSession(
  authApi: UserAuthApi,
  store: AuthSessionStoreAdapter,
): Promise<void> {
  if (store.isHydrated?.() && store.getStatus?.() === 'authenticated') {
    return;
  }
  if (bootstrapInFlight) {
    return bootstrapInFlight;
  }

  bootstrapInFlight = (async () => {
    const tokens = store.getTokens();

    if (!tokens?.accessToken || !tokens.refreshToken) {
      store.clearSession();
      store.setHydrated(true);
      return;
    }

    try {
      const user = await authApi.me();
      store.setSession(user, tokens);
      return;
    } catch {
      store.setStatus('refreshing');
    }

    try {
      const refreshedTokens = await authApi.refresh(tokens.refreshToken);
      store.setTokens(refreshedTokens);
      const user = await authApi.me();
      store.setSession(user, refreshedTokens);
    } catch {
      store.clearSession();
    } finally {
      store.setHydrated(true);
    }
  })();
  try {
    await bootstrapInFlight;
  } finally {
    bootstrapInFlight = null;
  }
}

export async function revokeAuthSession(
  authApi: UserAuthApi,
  store: AuthSessionStoreAdapter,
): Promise<void> {
  const refreshToken = store.getTokens()?.refreshToken;
  try {
    if (refreshToken) {
      await authApi.logout(refreshToken);
    }
  } finally {
    store.clearSession();
    store.setHydrated(true);
  }
}
