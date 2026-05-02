import { lazyRoute, type AppRoute } from '@repo/router';

import { ResponsiveLayout } from '../layouts/responsive-layout';

import { AuthGuard } from './guards';

const Dashboard = lazyRoute(() => import('../pages/dashboard'));
const Login = lazyRoute(() => import('../pages/login'));
const Settings = lazyRoute(() => import('../pages/settings'));
const Forbidden = lazyRoute(() => import('../pages/forbidden'));

export const routes: AppRoute[] = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <ResponsiveLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Dashboard />, meta: { title: '仪表盘' } },
      {
        path: 'settings',
        element: (
          <AuthGuard requirePermissions={['setting:read']}>
            <Settings />
          </AuthGuard>
        ),
        meta: { title: '设置', requiresAuth: true, permissions: ['setting:read'] },
      },
    ],
  },
  { path: '/login', element: <Login />, meta: { layout: 'auth' } },
  { path: '/403', element: <Forbidden /> },
];
