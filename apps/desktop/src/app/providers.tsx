import { initI18n } from '@repo/i18n';
import { createQueryClient } from '@repo/request';
import { bootstrapTheme } from '@repo/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useMemo, type ReactNode } from 'react';

import { useBootstrapAuth } from '../modules/auth/hooks';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const queryClient = useMemo(() => createQueryClient(), []);
  useBootstrapAuth();

  useEffect(() => {
    bootstrapTheme();
    initI18n({ defaultLocale: 'zh-CN' });
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
