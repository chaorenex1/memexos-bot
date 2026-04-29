import { MobilePage, MobileTabbar } from '@repo/ui';
import { Home, Settings } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname === '/settings' ? 'settings' : 'home');

  const onChange = (key: string): void => {
    setActive(key);
    navigate(key === 'home' ? '/' : `/${key}`);
  };

  return (
    <MobilePage title="RUE Starter" bottomGap={56}>
      <Outlet />
      <MobileTabbar
        active={active}
        onChange={onChange}
        items={[
          { key: 'home', label: '首页', icon: <Home className="h-5 w-5" /> },
          { key: 'settings', label: '设置', icon: <Settings className="h-5 w-5" /> },
        ]}
      />
    </MobilePage>
  );
}
