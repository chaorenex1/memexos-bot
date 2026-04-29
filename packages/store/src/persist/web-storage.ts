/** Web 持久化适配（Zustand persist 接口） */
import { safeGet, safeSet, safeRemove } from '@repo/utils';

import type { PersistStorage, StorageValue } from 'zustand/middleware';

export function webStorage<T>(): PersistStorage<T> {
  return {
    getItem: (name) => {
      const value = safeGet<StorageValue<T> | null>(name, null);
      return value;
    },
    setItem: (name, value) => {
      safeSet(name, value);
    },
    removeItem: (name) => {
      safeRemove(name);
    },
  };
}
