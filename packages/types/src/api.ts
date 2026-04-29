/** API 响应统一结构 */

export interface ApiResponse<T = unknown> {
  /** 业务状态码：0 表示成功 */
  code: number;
  /** 后端返回数据 */
  data: T;
  /** 描述信息 */
  message: string;
  /** 后端时间戳（毫秒） */
  timestamp?: number;
  /** 请求 traceId（链路追踪） */
  traceId?: string;
}

export interface ApiError {
  code: number;
  message: string;
  /** 后端原始 response */
  raw?: unknown;
  /** HTTP 状态码 */
  status?: number;
}

/** 业务错误码（按需扩展） */
export const ErrorCode = {
  Success: 0,
  Unknown: -1,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ServerError: 500,
} as const;

export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];
