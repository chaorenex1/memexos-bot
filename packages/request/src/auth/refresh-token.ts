/**
 * Refresh Token 队列：
 * - 当多个请求同时遇到 401 时，只触发一次 refresh
 * - 其他请求挂起，等 refresh 成功后用新 token 重发
 */
import { tokenStorage } from './token';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type Resolver = (token: string) => void;

let refreshing = false;
let pending: Resolver[] = [];

export interface RefreshOptions {
  /** 业务调用 refresh 接口，返回新 access token */
  refresh: (refreshToken: string) => Promise<string>;
}

export function withRefreshToken(client: AxiosInstance, options: RefreshOptions): AxiosInstance {
  client.interceptors.response.use(
    (r) => r,
    async (error: { config?: AxiosRequestConfig; response?: AxiosResponse }) => {
      const status = error.response?.status;
      const original = error.config;
      if (status !== 401 || !original) {
        return Promise.reject(error);
      }

      const refreshToken = tokenStorage.getRefresh();
      if (!refreshToken) {
        tokenStorage.clear();
        return Promise.reject(error);
      }

      if (refreshing) {
        return new Promise((resolve) => {
          pending.push((newToken) => {
            original.headers = { ...original.headers, Authorization: `Bearer ${newToken}` };
            resolve(client.request(original));
          });
        });
      }

      refreshing = true;
      try {
        const newToken = await options.refresh(refreshToken);
        tokenStorage.setAccess(newToken);
        pending.forEach((cb) => cb(newToken));
        pending = [];
        original.headers = { ...original.headers, Authorization: `Bearer ${newToken}` };
        return client.request(original);
      } catch (e) {
        tokenStorage.clear();
        pending = [];
        return Promise.reject(e);
      } finally {
        refreshing = false;
      }
    },
  );
  return client;
}
