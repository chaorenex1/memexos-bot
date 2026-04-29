/** 路由相关类型 */
import type { RouteObject } from 'react-router-dom';

export interface AppRouteMeta {
  /** 路由标题（用于 document.title / breadcrumb） */
  title?: string;
  /** 是否需要登录 */
  requiresAuth?: boolean;
  /** 所需角色（满足任一即可） */
  roles?: string[];
  /** 所需权限（满足任一即可，支持通配符） */
  permissions?: string[];
  /** 是否布局到 layout 内 */
  layout?: 'pc' | 'mobile' | 'auth' | 'desktop' | 'simple' | 'none';
}

export interface AppRoute extends Omit<RouteObject, 'children'> {
  meta?: AppRouteMeta;
  children?: AppRoute[];
}
