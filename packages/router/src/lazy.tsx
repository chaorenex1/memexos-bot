/** 路由懒加载工具 */
import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

/** 懒加载页面，外层包 Suspense */
export function lazyRoute<TProps extends object>(
  loader: () => Promise<{ default: ComponentType<TProps> }>,
  fallback: ReactNode = null,
): ComponentType<TProps> {
  const LazyComp = lazy(loader);
  const Wrapped = (props: TProps) => (
    <Suspense fallback={fallback}>
      <LazyComp {...props} />
    </Suspense>
  );
  return Wrapped;
}
