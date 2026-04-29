/** TanStack Query 客户端工厂 */
import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';

export function createQueryClient(config: QueryClientConfig = {}): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: 1,
        ...config.defaultOptions?.queries,
      },
      mutations: {
        retry: 0,
        ...config.defaultOptions?.mutations,
      },
    },
    ...config,
  });
}
