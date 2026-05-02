/** 用户 store */
import { STORAGE_KEYS } from '@repo/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { desktopStorage } from '../persist/desktop-storage';
import { createUserSlice, type UserSlice } from '../slices/user.slice';

export const useUserStore = create<UserSlice>()(
  persist((...args) => ({ ...createUserSlice(...args) }), {
    name: STORAGE_KEYS.UserInfo,
    storage: desktopStorage<Partial<UserSlice>>(),
    partialize: (state) =>
      ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
        status: state.status,
      }) as Partial<UserSlice>,
  }),
);
