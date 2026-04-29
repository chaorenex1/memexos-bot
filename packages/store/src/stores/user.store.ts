/** 用户 store */
import { STORAGE_KEYS } from '@repo/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { webStorage } from '../persist/web-storage';
import { createUserSlice, type UserSlice } from '../slices/user.slice';

export const useUserStore = create<UserSlice>()(
  persist((...args) => ({ ...createUserSlice(...args) }), {
    name: STORAGE_KEYS.UserInfo,
    storage: webStorage<Partial<UserSlice>>(),
    partialize: (state) =>
      ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }) as Partial<UserSlice>,
  }),
);
