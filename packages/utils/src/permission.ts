/** 权限检查工具函数（支持通配符匹配） */

import type { PermissionCheck, PermissionGuardConfig } from '@repo/types';

/**
 * 检查单个权限是否匹配（支持通配符）
 * @example
 * matchPermission('admin:*', 'admin:user') // true
 * matchPermission('user:read', 'user:read') // true
 * matchPermission('user:read', 'user:delete') // false
 */
export function matchPermission(userPerm: string, required: string): boolean {
  if (userPerm === required) return true;
  if (userPerm.endsWith(':*')) {
    const prefix = userPerm.slice(0, -1);
    return required.startsWith(prefix);
  }
  return false;
}

/**
 * 检查用户是否拥有指定权限
 */
export function hasPermission(userPerms: string[], required: string): boolean {
  return userPerms.some((p) => matchPermission(p, required));
}

/**
 * 检查用户是否满足任一权限
 */
export function hasAnyPermission(userPerms: string[], required: string[]): boolean {
  return required.some((r) => hasPermission(userPerms, r));
}

/**
 * 检查用户是否满足全部权限
 */
export function hasAllPermissions(userPerms: string[], required: string[]): boolean {
  return required.every((r) => hasPermission(userPerms, r));
}

/**
 * 统一权限检查入口
 * @returns 是否通过权限校验
 */
export function checkPermission(userPerms: string[], config: PermissionGuardConfig): boolean {
  const { require, requireAll } = config;

  // 未指定任何权限要求，默认通过
  if (!require && !requireAll) return true;

  // 检查 requireAll（必须全部满足）
  if (requireAll) {
    const allRequired = Array.isArray(requireAll) ? requireAll : [requireAll];
    if (!hasAllPermissions(userPerms, allRequired)) return false;
  }

  // 检查 require（满足任一即可）
  if (require) {
    const anyRequired = Array.isArray(require) ? require : [require];
    if (!hasAnyPermission(userPerms, anyRequired)) return false;
  }

  return true;
}
