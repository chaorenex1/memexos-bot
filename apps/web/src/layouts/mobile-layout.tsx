import { useUserStore } from '@repo/store';
import { MobilePage, PermissionTabbar } from '@repo/ui';
import { Home, Settings, Users } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import type { PermissionTabItem } from '@repo/ui';

const tabItems: PermissionTabItem[] = [
  { key: 'home', label: '首页', icon: <Home className="h-5 w-5" /> },
  {
    key: 'settings',
    label: '设置',
    icon: <Settings className="h-5 w-5" />,
    permissions: 'setting:read',
  },
  {
    key: 'users',
    label: '用户',
    icon: <Users className="h-5 w-5" />,
    permissions: ['user:read', 'admin:*'],
  },
];

const pathToKey: Record<string, string> = {
  '/': 'home',
  '/settings': 'settings',
  '/users': 'users',
};

const keyToPath: Record<string, string> = {
  home: '/',
  settings: '/settings',
  users: '/users',
};

export function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const permissions = useUserStore((s) => s.user?.permissions ?? []);

  const [active, setActive] = useState(pathToKey[location.pathname] ?? 'home');

  const onChange = (key: string): void => {
    setActive(key);
    navigate(keyToPath[key] ?? '/');
  };

  return (
    <MobilePage title="MemexOS AI" bottomGap={56}>
      <Outlet />
      <PermissionTabbar
        active={active}
        onChange={onChange}
        items={tabItems}
        userPermissions={permissions}
      />
    </MobilePage>
  );
}
