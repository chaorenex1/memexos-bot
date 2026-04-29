/**
 * SearchForm：通用搜索表单容器
 * 业务侧自行组合 Input/Select 等子项
 */

import { cn } from '../../../lib/cn';
import { Button } from '../../ui/button';

import type { FormHTMLAttributes, ReactNode } from 'react';

export interface SearchFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onReset'> {
  onReset?: () => void;
  submitText?: ReactNode;
  resetText?: ReactNode;
  children: ReactNode;
}

export function SearchForm({
  className,
  onSubmit,
  onReset,
  submitText = '搜索',
  resetText = '重置',
  children,
  ...rest
}: SearchFormProps) {
  return (
    <form className={cn('flex flex-wrap items-end gap-3', className)} onSubmit={onSubmit} {...rest}>
      {children}
      <div className="flex items-center gap-2">
        <Button type="submit">{submitText}</Button>
        <Button type="button" variant="outline" onClick={onReset}>
          {resetText}
        </Button>
      </div>
    </form>
  );
}
