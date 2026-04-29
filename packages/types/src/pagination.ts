/** 分页参数与响应 */

export interface PaginationParams {
  /** 页码，从 1 开始 */
  page: number;
  /** 每页大小 */
  pageSize: number;
}

export interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore?: boolean;
}

export interface CursorParams {
  cursor?: string | null;
  limit: number;
}

export interface CursorData<T> {
  list: T[];
  nextCursor?: string | null;
  hasMore: boolean;
}
