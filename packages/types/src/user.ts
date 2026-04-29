/** 用户与权限相关类型 */

export interface UserInfo {
  id: string;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles: string[];
  permissions?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface LoginPayload {
  username: string;
  password: string;
  remember?: boolean;
}
