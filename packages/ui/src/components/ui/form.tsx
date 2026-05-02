'use client';

/**
 * Form：基于 react-hook-form 的简易封装
 * 使用：
 *   const form = useForm<...>({...})
 *   <Form {...form}>
 *     <FormField name="email" render={({ field }) => <FormItem>...</FormItem>} />
 *   </Form>
 */
import { createContext, forwardRef, useContext, useId, type HTMLAttributes } from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Label } from './label';

import { cn } from '@/lib/cn';

export const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

interface FormItemContextValue {
  id: string;
}
const FormItemContext = createContext<FormItemContextValue | null>(null);

export const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId();
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('space-y-2', className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

function useFormItemId(): string {
  const ctx = useContext(FormItemContext);
  if (!ctx) throw new Error('FormItem context is missing');
  return ctx.id;
}

export const FormLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    const id = useFormItemId();
    return <Label ref={ref} className={cn(className)} htmlFor={id} {...props} />;
  },
);
FormLabel.displayName = 'FormLabel';

export const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const fieldCtx = useContext(FormFieldContext);
    const form = useFormContext();
    if (!fieldCtx || !form) return null;
    const error = form.formState.errors[fieldCtx.name];
    const body = error ? String(error.message ?? '') : children;
    if (!body) return null;
    return (
      <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';
