/**
 * Desktop 持久化适配
 * 通过 window.electron.storage IPC 访问 main 进程的 electron-store
 * 当 electron API 缺失时回退到 webStorage
 */
import { webStorage } from './web-storage';

import type { PersistStorage, StorageValue } from 'zustand/middleware';

interface ElectronStorageBridge {
  get: <T>(key: string) => Promise<T | null>;
  set: <T>(key: string, value: T) => Promise<void>;
  remove: (key: string) => Promise<void>;
}

type ElectronWindow = Window & {
  electron?: {
    storage?: ElectronStorageBridge;
  };
};

export function desktopStorage<T>(): PersistStorage<T> {
  const bridge =
    typeof window !== 'undefined' ? (window as ElectronWindow).electron?.storage : undefined;

  if (!bridge) {
    return webStorage<T>();
  }

  return {
    getItem: async (name) => {
      const value = await bridge.get<StorageValue<T>>(name);
      return value ?? null;
    },
    setItem: async (name, value) => {
      await bridge.set(name, value);
    },
    removeItem: async (name) => {
      await bridge.remove(name);
    },
  };
}
