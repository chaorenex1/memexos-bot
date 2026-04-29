import { createAppRouter, lazyRoute } from '@repo/router';

import { DesktopLayout } from '../layouts/desktop-layout';

const Dashboard = lazyRoute(() => import('../pages/dashboard'));
const Settings = lazyRoute(() => import('../pages/settings'));

export const router: ReturnType<typeof createAppRouter> = createAppRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      element: <DesktopLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
  ],
});
