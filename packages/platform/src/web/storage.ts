/** Web localStorage 适配 */
import { safeGet, safeRemove, safeSet } from '@repo/utils';

import type { PlatformStorage } from '../types';

export const storage: PlatformStorage = {
  async get<T>(key: string): Promise<T | null> {
    return safeGet<T | null>(key, null);
  },
  async set<T>(key: string, value: T): Promise<void> {
    safeSet(key, value);
  },
  async remove(key: string): Promise<void> {
    safeRemove(key);
  },
  async clear(): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.clear();
    } catch {
      /* ignore */
    }
  },
};
