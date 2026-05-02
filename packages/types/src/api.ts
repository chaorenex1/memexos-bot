/** API 响应统一结构 */

export interface ApiResponse<T = unknown> {
  /** 链路请求 ID */
  request_id?: string | null;
  /** 是否成功 */
  success: boolean;
  /** 后端返回数据 */
  data: T | null;
  /** 失败信息 */
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  } | null;
}

export interface ApiError {
  code: string;
  message: string;
  /** 后端原始 response */
  raw?: unknown;
  /** HTTP 状态码 */
  status?: number;
  /** 请求 traceId */
  requestId?: string | null;
}

/** 业务错误码（按需扩展） */
export const ErrorCode = {
  Success: 'success',
  Unknown: 'unknown_error',
  Unauthorized: 'unauthorized',
  Forbidden: 'forbidden',
  NotFound: 'not_found',
  ServerError: 'internal_error',
} as const;

export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];
