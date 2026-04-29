/** 字符串工具 */

/** 首字母大写 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** kebab-case → camelCase */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** camelCase → kebab-case */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/** 截断字符串（带省略号） */
export function truncate(str: string, max: number, ellipsis = '...'): string {
  if (str.length <= max) return str;
  return str.slice(0, Math.max(0, max - ellipsis.length)) + ellipsis;
}

/** 是否为空白字符串 */
export function isBlank(str: string | null | undefined): boolean {
  return !str || /^\s*$/.test(str);
}
