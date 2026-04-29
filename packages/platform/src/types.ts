/** 平台抽象通用接口 */

export interface PlatformStorage {
  get<T = unknown>(key: string): Promise<T | null>;
  set<T = unknown>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

export interface PlatformFile {
  /** 读取文本；不支持的平台实现会 reject */
  readText(path: string): Promise<string>;
  /** 写入文本；不支持的平台实现会 reject */
  writeText(path: string, content: string): Promise<void>;
  /** 选择文件（弹窗） */
  pick(options?: PickOptions): Promise<PickedFile[]>;
}

export interface PickOptions {
  multiple?: boolean;
  accept?: string;
  /** desktop 专用：默认目录 */
  defaultPath?: string;
}

export interface PickedFile {
  name: string;
  path?: string;
  size?: number;
  /** web 下提供 File，desktop 下可能为空 */
  file?: File;
}

export interface PlatformSystem {
  /** 打开外部链接 */
  openExternal(url: string): Promise<void>;
  /** 复制到剪贴板 */
  copyText(text: string): Promise<void>;
  /** 平台原生通知 */
  notify(title: string, body?: string): Promise<void>;
}

export interface PlatformTerminal {
  /** 启动子进程；安全策略禁止时会 reject */
  spawn(cmd: string, args?: string[]): Promise<string>;
  /** 通过订阅获取输出；不可用时返回空取消函数 */
  onData(handler: (data: string) => void): () => void;
}
