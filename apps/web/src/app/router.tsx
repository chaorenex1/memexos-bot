import { createAppRouter } from '@repo/router';

import { routes } from '../routes';

/** 应用路由实例 */
export const router: ReturnType<typeof createAppRouter> = createAppRouter({
  routes,
  mode: 'browser',
});
