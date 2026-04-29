/** 主题 slice */
import type { ThemeMode } from '@repo/types';
import type { StateCreator } from 'zustand';

export interface ThemeSlice {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (set) => ({
  mode: 'system',
  setMode: (mode) => set({ mode }),
});
