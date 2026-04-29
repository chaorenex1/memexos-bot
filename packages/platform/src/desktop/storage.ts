/** Desktop 持久化：通过 preload 暴露的 IPC */
import type { PlatformStorage } from '../types';

interface ElectronStorageBridge {
  get: <T>(key: string) => Promise<T | null>;
  set: <T>(key: string, value: T) => Promise<void>;
  remove: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

type ElectronWindow = Window & {
  electron?: { storage?: ElectronStorageBridge };
};

function getBridge(): ElectronStorageBridge {
  const bridge =
    typeof window !== 'undefined' ? (window as ElectronWindow).electron?.storage : undefined;
  if (!bridge) throw new Error('electron storage bridge 未注入');
  return bridge;
}

export const storage: PlatformStorage = {
  async get<T>(key: string): Promise<T | null> {
    return getBridge().get<T>(key);
  },
  async set<T>(key: string, value: T): Promise<void> {
    return getBridge().set(key, value);
  },
  async remove(key: string): Promise<void> {
    return getBridge().remove(key);
  },
  async clear(): Promise<void> {
    return getBridge().clear();
  },
};
