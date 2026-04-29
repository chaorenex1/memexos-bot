/** 应用主 store：合并 app + theme + settings slice，并持久化 */
import { STORAGE_KEYS } from '@repo/constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { webStorage } from '../persist/web-storage';
import { createAppSlice, type AppSlice } from '../slices/app.slice';
import { createSettingsSlice, type SettingsSlice } from '../slices/settings.slice';
import { createThemeSlice, type ThemeSlice } from '../slices/theme.slice';

export type AppStoreState = AppSlice & ThemeSlice & SettingsSlice;

export const useAppStore = create<AppStoreState>()(
  persist(
    (...args) => ({
      ...createAppSlice(...args),
      ...createThemeSlice(...args),
      ...createSettingsSlice(...args),
    }),
    {
      name: STORAGE_KEYS.AppState,
      storage: webStorage<Partial<AppStoreState>>(),
      partialize: (state) =>
        ({
          mode: state.mode,
          locale: state.locale,
          sidebarCollapsed: state.sidebarCollapsed,
        }) as Partial<AppStoreState>,
    },
  ),
);
