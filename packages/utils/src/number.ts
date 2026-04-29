/** 数字与单位工具 */

/** 千位分隔 */
export function formatNumber(value: number, locale = 'zh-CN'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** 字节大小可读化（B/KB/MB/GB/TB） */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const idx = Math.min(i, sizes.length - 1);
  return `${(bytes / Math.pow(k, idx)).toFixed(decimals)} ${sizes[idx]}`;
}

/** 限制数值在 [min, max] 区间 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
