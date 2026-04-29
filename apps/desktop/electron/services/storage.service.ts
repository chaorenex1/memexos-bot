/** 持久化 service：基于 electron-store */
import Store from 'electron-store';

const store = new Store<Record<string, unknown>>({
  name: 'app-store',
  watch: true,
});

export const storageService = {
  async get<T>(key: string): Promise<T | null> {
    return (store.get(key) as T) ?? null;
  },
  async set<T>(key: string, value: T): Promise<void> {
    store.set(key, value);
  },
  async remove(key: string): Promise<void> {
    store.delete(key);
  },
  async clear(): Promise<void> {
    store.clear();
  },
};
