/** 通用基础类型 */

/** 任意 JSON 兼容值 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/** 移除可选属性 */
export type Required<T> = { [P in keyof T]-?: T[P] };

/** 扁平化交叉类型 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** 可空 */
export type Nullable<T> = T | null;

/** 可选 */
export type Maybe<T> = T | null | undefined;

/** 取值类型 */
export type ValueOf<T> = T[keyof T];

/** 异步返回值类型 */
export type Awaitable<T> = T | Promise<T>;

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'system';

/** 支持的语言 */
export type Locale = 'zh-CN' | 'en-US';
