/** IDE 风格三分栏布局占位 */
import { SplitPane } from '@repo/ui';

import type { ReactNode } from 'react';

interface IdeLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right?: ReactNode;
}

export function IdeLayout({ left, center, right }: IdeLayoutProps) {
  return (
    <SplitPane
      first={left}
      second={right ? <SplitPane first={center} second={right} initial={400} /> : center}
    />
  );
}
