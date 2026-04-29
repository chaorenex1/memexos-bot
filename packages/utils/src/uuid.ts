/** 简易 UUID 生成器 */

/** 生成 v4 风格 UUID（不依赖 crypto.randomUUID 以兼容更多环境） */
export function uuid(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** 短随机 ID */
export function shortId(length = 8): string {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}
