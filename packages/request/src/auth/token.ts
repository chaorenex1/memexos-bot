/** Token 读写（基于 localStorage） */
import { STORAGE_KEYS } from '@repo/constants';
import { safeGet, safeSet, safeRemove } from '@repo/utils';

export const tokenStorage = {
  getAccess(): string | null {
    return safeGet<string | null>(STORAGE_KEYS.AccessToken, null);
  },
  setAccess(token: string): void {
    safeSet(STORAGE_KEYS.AccessToken, token);
  },
  getRefresh(): string | null {
    return safeGet<string | null>(STORAGE_KEYS.RefreshToken, null);
  },
  setRefresh(token: string): void {
    safeSet(STORAGE_KEYS.RefreshToken, token);
  },
  clear(): void {
    safeRemove(STORAGE_KEYS.AccessToken);
    safeRemove(STORAGE_KEYS.RefreshToken);
  },
};
