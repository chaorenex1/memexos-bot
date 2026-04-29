/** 权限与 RBAC 相关类型 */

import type { ReactNode } from 'react';

/** 单个权限标识符，格式为 resource:action，如 user:read、admin:* */
export type Permission = string;

/** 权限检查条件：单个权限或权限数组（满足任一即可） */
export type PermissionCheck = Permission | Permission[];

/** 权限守卫配置 */
export interface PermissionGuardConfig {
  /** 满足任一即可通过 */
  require?: PermissionCheck;
  /** 必须全部满足才能通过 */
  requireAll?: PermissionCheck;
}

/** 导航菜单项（支持权限过滤和嵌套子菜单） */
export interface NavMenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  /** 所需权限（满足任一即可显示） */
  permissions?: PermissionCheck;
  children?: NavMenuItem[];
}
