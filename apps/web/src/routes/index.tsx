import { lazyRoute, type AppRoute } from '@repo/router';

import { ResponsiveLayout } from '../layouts/responsive-layout';

const Dashboard = lazyRoute(() => import('../pages/dashboard'));
const Login = lazyRoute(() => import('../pages/login'));
const Settings = lazyRoute(() => import('../pages/settings'));

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <ResponsiveLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '/login', element: <Login /> },
];
