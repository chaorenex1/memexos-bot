import { useUserStore } from '@repo/store';
import { Button, Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@repo/ui';
import { type auth as authValidators } from '@repo/validators';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { AuthLayout } from '@/layouts/auth-layout';
import { useLoginMutation } from '@/modules/auth/hooks';

type LoginInput = authValidators.LoginInput;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useLoginMutation();
  const hydrated = useUserStore((s) => s.hydrated);
  const status = useUserStore((s) => s.status);

  const form = useForm<LoginInput>({
    defaultValues: { username: '', password: '', remember: false },
  });

  if (hydrated && status === 'authenticated') {
    const from = (location.state as { from?: string } | null)?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (values: LoginInput): Promise<void> => {
    try {
      await mutation.mutateAsync(values);
      const from = (location.state as { from?: string } | null)?.from ?? '/';
      navigate(from, { replace: true });
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? String(error.message)
          : '登录失败';
      form.setError('root', { message });
    }
  };

  return (
    <AuthLayout>
      <div className="rounded-lg border bg-background p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold">登录</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <Input type="password" placeholder="请输入密码" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root?.message ? (
              <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
            ) : null}
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? '登录中...' : '登录'}
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
