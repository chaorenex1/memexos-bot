/** 类型守卫工具 */

export function isString(v: unknown): v is string {
  return typeof v === 'string';
}

export function isNumber(v: unknown): v is number {
  return typeof v === 'number' && !Number.isNaN(v);
}

export function isBoolean(v: unknown): v is boolean {
  return typeof v === 'boolean';
}

export function isFunction(v: unknown): v is (...args: unknown[]) => unknown {
  return typeof v === 'function';
}

export function isObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

export function isPromise<T = unknown>(v: unknown): v is Promise<T> {
  return (
    !!v &&
    (typeof v === 'object' || typeof v === 'function') &&
    isFunction((v as { then?: unknown }).then)
  );
}

export function isNil(v: unknown): v is null | undefined {
  return v === null || v === undefined;
}

/** 浏览器环境检测 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
