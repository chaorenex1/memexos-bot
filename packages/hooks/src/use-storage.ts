/** 持久化的 useState：写入 localStorage（基于 @repo/utils/storage） */
import { safeGet, safeSet, safeRemove } from '@repo/utils';
import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (next: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(() => safeGet<T>(key, initial));

  useEffect(() => {
    safeSet(key, value);
  }, [key, value]);

  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => (typeof next === 'function' ? (next as (p: T) => T)(prev) : next));
  }, []);

  const remove = useCallback(() => {
    safeRemove(key);
    setValue(initial);
  }, [key, initial]);

  return [value, update, remove];
}
