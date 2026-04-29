/**
 * @repo/icons：lucide-react 二次封装
 * - 全部图标 tree-shake 友好地从 lucide-react 重导出
 * - 提供统一默认尺寸的 Icon 组件
 */
import { type LucideIcon, type LucideProps } from 'lucide-react';
import { forwardRef, type ComponentProps, type ForwardedRef } from 'react';

export * from 'lucide-react';
export type { LucideIcon };

interface IconProps extends ComponentProps<LucideIcon> {
  icon: LucideIcon;
}

/** 通用 Icon 组件：将任意 LucideIcon 包装为可复用元素 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    { icon: IconComponent, size = 16, strokeWidth = 1.75, ...rest },
    ref: ForwardedRef<SVGSVGElement>,
  ) => {
    return (
      <IconComponent ref={ref} size={size} strokeWidth={strokeWidth} {...(rest as LucideProps)} />
    );
  },
);

Icon.displayName = 'Icon';
