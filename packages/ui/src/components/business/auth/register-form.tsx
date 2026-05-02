import { auth } from '@repo/validators';
import { useState } from 'react';
import { type FieldPath, type UseFormReturn, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type RegisterInput = auth.RegisterInput;
type FieldIssue = { path: Array<string | number>; message: string };

interface RegisterFormProps {
  onSubmit: (values: RegisterInput) => Promise<void> | void;
  submitLabel?: string;
}

function setFieldErrors(form: UseFormReturn<RegisterInput>, issues: FieldIssue[]) {
  for (const issue of issues) {
    const field = issue.path[0];
    if (typeof field === 'string') {
      form.setError(field as FieldPath<RegisterInput>, { message: issue.message });
    }
  }
}

export function RegisterForm({ onSubmit, submitLabel = '注册' }: RegisterFormProps) {
  const form = useForm<RegisterInput>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors();
    const parsed = auth.registerSchema.safeParse(values);
    if (!parsed.success) {
      setFieldErrors(form, parsed.error.issues);
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(parsed.data);
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? String(error.message)
          : '注册失败';
      form.setError('root', { message });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <Input placeholder="请输入用户名" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <Input type="email" placeholder="可选，填写后将校验格式" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <Input type="password" placeholder="请输入密码" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认密码</FormLabel>
              <Input type="password" placeholder="请再次输入密码" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.message ? (
          <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
        ) : null}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '提交中...' : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
