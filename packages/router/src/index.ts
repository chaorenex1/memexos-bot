/**
 * @repo/router 入口
 */
export * from './types';
export * from './lazy';
export * from './guards';
export * from './create-router';

// 重导出 react-router-dom 常用 API
export {
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
  Link,
  NavLink,
  RouterProvider,
} from 'react-router-dom';
export type { RouteObject } from 'react-router-dom';
