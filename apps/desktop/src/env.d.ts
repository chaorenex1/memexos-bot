/** Electron API 全局类型扩展（与 preload 对齐） */
declare global {
  interface Window {
    electron: {
      app: {
        getVersion: () => Promise<string>;
        getPlatform: () => Promise<NodeJS.Platform>;
        quit: () => Promise<void>;
        minimize: () => Promise<void>;
        toggleMaximize: () => Promise<void>;
      };
      file: {
        pick: (options?: {
          multiple?: boolean;
          accept?: string;
          defaultPath?: string;
        }) => Promise<Array<{ name: string; path: string; size?: number }>>;
      };
      storage: {
        get: <T>(key: string) => Promise<T | null>;
        set: <T>(key: string, value: T) => Promise<void>;
        remove: (key: string) => Promise<void>;
        clear: () => Promise<void>;
      };
      system: {
        openExternal: (url: string) => Promise<void>;
        copyText: (text: string) => Promise<void>;
        notify: (title: string, body?: string) => Promise<void>;
      };
    };
  }
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
