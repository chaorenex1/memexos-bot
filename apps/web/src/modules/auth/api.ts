import {
  bootstrapAuthSession as bootstrapSharedAuthSession,
  createUserAuthApi,
  revokeAuthSession,
} from '@repo/request';
import { useUserStore } from '@repo/store';

import type { AuthSessionStatus, AuthTokens, UserInfo } from '@repo/types';

const authApi = createUserAuthApi({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  getAccessToken: () => useUserStore.getState().tokens?.accessToken ?? null,
  clientType: 'web',
  deviceLabel: 'browser-web',
});

const authStoreAdapter = {
  getTokens: () => useUserStore.getState().tokens,
  getStatus: () => useUserStore.getState().status,
  isHydrated: () => useUserStore.getState().hydrated,
  setUser: (user: UserInfo | null) => useUserStore.getState().setUser(user),
  setTokens: (tokens: AuthTokens | null) => useUserStore.getState().setTokens(tokens),
  setSession: (user: UserInfo, tokens: AuthTokens) =>
    useUserStore.getState().setSession(user, tokens),
  clearSession: () => useUserStore.getState().clearSession(),
  setStatus: (status: AuthSessionStatus) => useUserStore.getState().setStatus(status),
  setHydrated: (hydrated: boolean) => useUserStore.getState().setHydrated(hydrated),
};

export const login = authApi.login;
export const register = authApi.register;
export const me = authApi.me;

export async function bootstrapAuthSession(): Promise<void> {
  return bootstrapSharedAuthSession(authApi, authStoreAdapter);
}

export async function logout(): Promise<void> {
  return revokeAuthSession(authApi, authStoreAdapter);
}
