/**
 * DataTable：基于 TanStack Table 的轻量封装骨架
 * - 业务侧传入 columns + data 即可
 * - 后续可扩展分页/排序/筛选
 */
import { cn } from '../../../lib/cn';

import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: keyof T | string;
  title: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  empty?: ReactNode;
  className?: string;
  rowKey?: (row: T, index: number) => string;
}

export function DataTable<T>(props: DataTableProps<T>) {
  const { columns, data, loading, empty, className, rowKey } = props;

  return (
    <div className={cn('overflow-x-auto rounded-md border', className)}>
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.key)}
                className="px-4 py-2 text-left font-medium text-muted-foreground"
                style={{ width: c.width, textAlign: c.align ?? 'left' }}
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                加载中...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                {empty ?? '暂无数据'}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={rowKey ? rowKey(row, i) : i}
                className="border-b last:border-b-0 hover:bg-muted/30"
              >
                {columns.map((c) => (
                  <td
                    key={String(c.key)}
                    className="px-4 py-2"
                    style={{ textAlign: c.align ?? 'left' }}
                  >
                    {c.render
                      ? c.render(row, i)
                      : ((row as Record<string, unknown>)[c.key as string] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
