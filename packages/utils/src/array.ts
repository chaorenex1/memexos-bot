/** 数组工具 */

/** 数组分块 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [arr];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** 数组扁平化（一层） */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce<T[]>((acc, cur) => acc.concat(cur), []);
}

/** 取交集 */
export function intersection<T>(a: T[], b: T[]): T[] {
  const set = new Set(b);
  return a.filter((item) => set.has(item));
}

/** 取差集（在 a 不在 b） */
export function difference<T>(a: T[], b: T[]): T[] {
  const set = new Set(b);
  return a.filter((item) => !set.has(item));
}
