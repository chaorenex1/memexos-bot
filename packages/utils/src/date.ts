/** 日期工具：基于 dayjs */
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export { dayjs };
export type { Dayjs };

export type DateInput = string | number | Date | Dayjs;

/** 格式化日期 */
export function formatDate(input: DateInput, pattern = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(input).format(pattern);
}

/** 相对时间（X 分钟前） */
export function fromNow(input: DateInput): string {
  return dayjs(input).fromNow();
}

/** 设置 dayjs 全局语言 */
export function setDayjsLocale(locale: 'zh-cn' | 'en'): void {
  dayjs.locale(locale);
}
