/** 用户与权限相关类型 */

export type AuthSessionStatus = 'anonymous' | 'authenticating' | 'authenticated' | 'refreshing';

export interface UserInfo {
  id: string;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles: string[];
  permissions: string[];
  status?: 'active' | 'disabled';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string | null;
  expiresIn?: number;
}

export interface LoginPayload {
  username: string;
  password: string;
  remember?: boolean;
}
