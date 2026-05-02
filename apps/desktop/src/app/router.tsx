import { createAppRouter, lazyRoute } from '@repo/router';

import { DesktopLayout } from '../layouts/desktop-layout';
import { AuthGuard } from '../routes/guards';

const Dashboard = lazyRoute(() => import('../pages/dashboard'));
const Login = lazyRoute(() => import('../pages/login'));
const Register = lazyRoute(() => import('../pages/register'));
const Settings = lazyRoute(() => import('../pages/settings'));

export const router: ReturnType<typeof createAppRouter> = createAppRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <DesktopLayout />
        </AuthGuard>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ],
});
