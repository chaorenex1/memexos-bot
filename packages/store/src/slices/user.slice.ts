/** 用户 slice */
import type { AuthTokens, UserInfo } from '@repo/types';
import type { StateCreator } from 'zustand';

export interface UserSlice {
  user: UserInfo | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setUser: (user: UserInfo | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  logout: () => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
  setTokens: (tokens) => set({ tokens }),
  logout: () => set({ user: null, tokens: null, isAuthenticated: false }),
});
