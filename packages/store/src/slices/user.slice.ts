/** 用户 slice */
import type { AuthSessionStatus, AuthTokens, UserInfo } from '@repo/types';
import type { StateCreator } from 'zustand';

export interface UserSlice {
  user: UserInfo | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  status: AuthSessionStatus;
  hydrated: boolean;
  setUser: (user: UserInfo | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setSession: (user: UserInfo, tokens: AuthTokens) => void;
  clearSession: () => void;
  setStatus: (status: AuthSessionStatus) => void;
  setHydrated: (hydrated: boolean) => void;
  logout: () => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  status: 'anonymous',
  hydrated: false,
  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: Boolean(user),
      status: user ? 'authenticated' : state.tokens?.refreshToken ? state.status : 'anonymous',
    })),
  setTokens: (tokens) => set({ tokens }),
  setSession: (user, tokens) =>
    set({
      user,
      tokens,
      isAuthenticated: true,
      status: 'authenticated',
      hydrated: true,
    }),
  clearSession: () =>
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      status: 'anonymous',
    }),
  setStatus: (status) => set({ status, isAuthenticated: status === 'authenticated' }),
  setHydrated: (hydrated) => set({ hydrated }),
  logout: () =>
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      status: 'anonymous',
    }),
});
