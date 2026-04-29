/** Axios 客户端工厂 */
import { HTTP_TIMEOUT } from '@repo/constants';
import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

import {
  applyErrorInterceptor,
  applyRequestInterceptor,
  applyResponseInterceptor,
} from './interceptors';

export interface CreateClientOptions extends CreateAxiosDefaults {
  /** 业务获取 token 的方式（同步） */
  getToken?: () => string | null;
  /** 401 触发回调（业务可以执行登出 / refresh） */
  onUnauthorized?: () => void;
}

export function createAxiosClient(options: CreateClientOptions = {}): AxiosInstance {
  const { getToken, onUnauthorized, ...axiosOptions } = options;

  const instance = axios.create({
    timeout: HTTP_TIMEOUT,
    ...axiosOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(axiosOptions.headers ?? {}),
    },
  });

  applyRequestInterceptor(instance, getToken);
  applyResponseInterceptor(instance);
  applyErrorInterceptor(instance, onUnauthorized);

  return instance;
}
