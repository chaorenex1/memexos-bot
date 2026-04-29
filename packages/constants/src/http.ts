/** HTTP 状态码与错误码 */

export const HTTP_STATUS = {
  OK: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  UnprocessableEntity: 422,
  TooManyRequests: 429,
  ServerError: 500,
  ServiceUnavailable: 503,
} as const;

/** 默认请求超时（毫秒） */
export const HTTP_TIMEOUT = 15_000;

/** 默认重试次数（请求层） */
export const HTTP_RETRY = 0;
