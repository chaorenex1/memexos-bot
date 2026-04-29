import { useMobile } from '@repo/hooks';

import { MobileLayout } from './mobile-layout';
import { PcLayout } from './pc-layout';

/** 响应式布局：小屏走 Mobile，大屏走 PC */
export function ResponsiveLayout() {
  const isMobile = useMobile();
  return isMobile ? <MobileLayout /> : <PcLayout />;
}
