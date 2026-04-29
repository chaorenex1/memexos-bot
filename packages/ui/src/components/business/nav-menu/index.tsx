/** 权限感知导航菜单 */
import { checkPermission } from '@repo/utils';

import { cn } from '../../../lib/cn';
import { MobileTabbar } from '../../mobile/mobile-tabbar';

import type { MobileTabItem } from '../../mobile/mobile-tabbar';
import type { NavMenuItem } from '@repo/types';
import type { ReactNode } from 'react';

export interface NavMenuProps {
  items: NavMenuItem[];
  activeKey?: string;
  collapsed?: boolean;
  userPermissions?: string[];
  className?: string;
}

/**
 * 递归过滤导航项（根据权限）
 */
function filterNavItems(items: NavMenuItem[], userPermissions: string[]): NavMenuItem[] {
  return items
    .filter((item) => {
      if (!item.permissions) return true;
      return checkPermission(userPermissions, { require: item.permissions });
    })
    .map((item) => {
      if (item.children) {
        return { ...item, children: filterNavItems(item.children, userPermissions) };
      }
      return item;
    });
}

function NavItemLabel({ item, collapsed }: { item: NavMenuItem; collapsed?: boolean }) {
  return (
    <>
      {item.icon && (
        <span className={cn('inline-flex', collapsed ? 'text-lg' : 'mr-2')}>{item.icon}</span>
      )}
      {!collapsed && <span>{item.label}</span>}
    </>
  );
}

function NavItem({
  item,
  activeKey,
  collapsed,
  level = 0,
}: {
  item: NavMenuItem;
  activeKey?: string;
  collapsed?: boolean;
  level?: number;
}) {
  const isActive = item.key === activeKey;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={cn(level > 0 && 'ml-4')}>
      <a
        href={item.href}
        className={cn(
          'flex items-center rounded px-2 py-1.5 text-sm transition-colors',
          isActive
            ? 'bg-accent text-accent-foreground font-medium'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          collapsed && 'justify-center',
        )}
        title={collapsed ? item.label : undefined}
      >
        <NavItemLabel item={item} collapsed={collapsed} />
      </a>
      {hasChildren &&
        item.children!.map((child: NavMenuItem) => (
          <NavItem
            key={child.key}
            item={child}
            activeKey={activeKey}
            collapsed={collapsed}
            level={level + 1}
          />
        ))}
    </div>
  );
}

/**
 * 权限感知导航菜单
 * 自动过滤当前用户无权限的导航项
 *
 * @example
 * <NavMenu
 *   items={[
 *     { key: 'dashboard', label: '仪表盘', href: '/', icon: <Home /> },
 *     { key: 'settings', label: '设置', href: '/settings', icon: <Settings />, permissions: 'setting:read' },
 *     { key: 'users', label: '用户管理', href: '/users', icon: <Users />, permissions: ['user:read', 'admin:*'] },
 *   ]}
 *   activeKey="dashboard"
 *   userPermissions={user?.permissions}
 * />
 */
export function NavMenu({
  items,
  activeKey,
  collapsed,
  userPermissions = [],
  className,
}: NavMenuProps) {
  const visibleItems = filterNavItems(items, userPermissions);

  if (visibleItems.length === 0) return null;

  return (
    <nav className={cn('flex flex-col gap-1', className)}>
      {visibleItems.map((item) => (
        <NavItem key={item.key} item={item} activeKey={activeKey} collapsed={collapsed} />
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   Mobile 权限感知 Tabbar
   ═══════════════════════════════════════════════ */

export interface PermissionTabItem extends MobileTabItem {
  permissions?: string | string[];
}

export interface PermissionTabbarProps {
  items: PermissionTabItem[];
  active?: string;
  onChange?: (key: string) => void;
  className?: string;
  userPermissions?: string[];
}

/**
 * 权限感知的 Mobile Tabbar
 * 自动过滤当前用户无权限的 tab 项
 */
export function PermissionTabbar({
  items,
  active,
  onChange,
  className,
  userPermissions = [],
}: PermissionTabbarProps) {
  const visibleItems = items.filter((item) => {
    if (!item.permissions) return true;
    return checkPermission(userPermissions, { require: item.permissions });
  });

  if (visibleItems.length === 0) return null;

  return (
    <MobileTabbar items={visibleItems} active={active} onChange={onChange} className={className} />
  );
}
