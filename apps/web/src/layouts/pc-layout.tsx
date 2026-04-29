import { useUserStore } from '@repo/store';
import { AppShell, Header, NavMenu, Sidebar } from '@repo/ui';
import { Home, Settings, Users } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';

import type { NavMenuItem } from '@repo/types';

const navItems: NavMenuItem[] = [
  { key: 'dashboard', label: '仪表盘', href: '/', icon: <Home className="h-4 w-4" /> },
  {
    key: 'settings',
    label: '设置',
    href: '/settings',
    icon: <Settings className="h-4 w-4" />,
    permissions: 'setting:read',
  },
  {
    key: 'users',
    label: '用户管理',
    href: '/users',
    icon: <Users className="h-4 w-4" />,
    permissions: ['user:read', 'admin:*'],
  },
];

export function PcLayout() {
  const location = useLocation();
  const permissions = useUserStore((s) => s.user?.permissions ?? []);

  const activeKey = navItems.find((item) =>
    item.href
      ? location.pathname === item.href || location.pathname.startsWith(item.href + '/')
      : false,
  )?.key;

  return (
    <AppShell
      header={
        <Header
          left={<span className="font-semibold">MemexOS AI</span>}
          right={<span className="text-sm text-muted-foreground">v0.1.0</span>}
        />
      }
      sidebar={
        <Sidebar>
          <NavMenu
            items={navItems}
            activeKey={activeKey}
            userPermissions={permissions}
            className="p-3"
          />
        </Sidebar>
      }
    >
      <div className="p-6">
        <Outlet />
      </div>
    </AppShell>
  );
}
