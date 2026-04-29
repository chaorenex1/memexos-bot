/** 路由工厂：在 react-router 上层加一层封装 */
import { createBrowserRouter, createHashRouter, type RouteObject } from 'react-router-dom';

import type { AppRoute } from './types';

export type RouterMode = 'browser' | 'hash';

export interface CreateAppRouterOptions {
  routes: AppRoute[];
  mode?: RouterMode;
  /** browser router basename */
  basename?: string;
}

/** 构造 react-router-dom router 实例 */
export function createAppRouter(
  options: CreateAppRouterOptions,
): ReturnType<typeof createBrowserRouter> {
  const { routes, mode = 'browser', basename } = options;
  const factory = mode === 'hash' ? createHashRouter : createBrowserRouter;
  return factory(toRouteObjects(routes), { basename });
}

/** 将 AppRoute 转为 RouteObject（剥离 meta，仅 react-router 需要的字段） */
export function toRouteObjects(routes: AppRoute[]): RouteObject[] {
  return routes.map((route) => {
    const { meta: _meta, children, ...rest } = route;
    const obj: RouteObject = { ...rest } as RouteObject;
    if (children && children.length > 0) {
      (obj as RouteObject & { children: RouteObject[] }).children = toRouteObjects(children);
    }
    return obj;
  });
}
