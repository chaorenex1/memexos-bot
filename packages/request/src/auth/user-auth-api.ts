import { createAxiosClient } from '../client/axios-client';

import type { ApiResponse, AuthTokens, LoginPayload, UserInfo } from '@repo/types';

interface BackendLoginData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: number | string;
  username: string;
  email?: string;
  status?: 'active' | 'disabled';
  role?: string;
  roles?: string[];
  permissions?: string[];
}

interface BackendRefreshData {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface BackendMeData {
  user_id: number | string;
  username: string;
  email?: string;
  role?: string;
  roles: string[];
  permissions: string[];
  status: 'active' | 'disabled';
}

export interface AuthSessionData {
  user: UserInfo;
  tokens: AuthTokens;
}

export interface UserAuthApi {
  login(payload: LoginPayload): Promise<AuthSessionData>;
  refresh(refreshToken: string): Promise<AuthTokens>;
  logout(refreshToken: string): Promise<void>;
  me(): Promise<UserInfo>;
}

export interface CreateUserAuthApiOptions {
  baseURL: string;
  getAccessToken?: () => string | null;
  clientType?: string;
  deviceLabel?: string;
}

function unwrapData<T>(response: ApiResponse<T>): T {
  if (!response.success || response.data == null) {
    const message = response.error?.message ?? '请求失败';
    throw new Error(message);
  }
  return response.data;
}

function mapTokens(data: BackendLoginData | BackendRefreshData): AuthTokens {
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? null,
  };
}

function mapUser(data: BackendLoginData | BackendMeData): UserInfo {
  const roles =
    data.roles && data.roles.length > 0 ? data.roles : data.role ? [data.role] : ['user'];
  return {
    id: String(data.user_id),
    username: data.username,
    email: 'email' in data ? data.email : undefined,
    roles,
    permissions: data.permissions ?? [],
    status: 'status' in data ? data.status : 'active',
  };
}

export function createUserAuthApi(options: CreateUserAuthApiOptions): UserAuthApi {
  const client = createAxiosClient({
    baseURL: options.baseURL,
    getToken: options.getAccessToken,
  });

  return {
    async login(payload: LoginPayload) {
      const { data } = await client.post<ApiResponse<BackendLoginData>>('/v1/auth/login', {
        ...payload,
        client_type: options.clientType,
        device_label: options.deviceLabel,
      });
      const body = unwrapData(data);
      return {
        user: mapUser(body),
        tokens: mapTokens(body),
      };
    },

    async refresh(refreshToken: string) {
      const { data } = await client.post<ApiResponse<BackendRefreshData>>('/v1/auth/refresh', {
        refresh_token: refreshToken,
      });
      return mapTokens(unwrapData(data));
    },

    async logout(refreshToken: string) {
      await client.post<ApiResponse<{ message: string }>>('/v1/auth/logout', {
        refresh_token: refreshToken,
      });
    },

    async me() {
      const { data } = await client.get<ApiResponse<BackendMeData>>('/v1/auth/me');
      return mapUser(unwrapData(data));
    },
  };
}
