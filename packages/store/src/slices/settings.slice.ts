/** 应用设置 slice */
import type { Locale } from '@repo/types';
import type { StateCreator } from 'zustand';

export interface SettingsSlice {
  locale: Locale;
  sidebarCollapsed: boolean;
  setLocale: (locale: Locale) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice, [], [], SettingsSlice> = (set) => ({
  locale: 'zh-CN',
  sidebarCollapsed: false,
  setLocale: (locale) => set({ locale }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
});
