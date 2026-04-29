/** 应用全局 slice */
import type { StateCreator } from 'zustand';

export interface AppSlice {
  isLoading: boolean;
  ready: boolean;
  setLoading: (loading: boolean) => void;
  setReady: (ready: boolean) => void;
}

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (set) => ({
  isLoading: false,
  ready: false,
  setLoading: (loading) => set({ isLoading: loading }),
  setReady: (ready) => set({ ready }),
});
