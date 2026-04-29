/** 通用 query key 工厂 */
export const queryKeys = {
  all: ['app'] as const,
  user: () => [...queryKeys.all, 'user'] as const,
  userDetail: (id: string) => [...queryKeys.user(), id] as const,
  list: <T extends string>(scope: T) => [...queryKeys.all, 'list', scope] as const,
};

export type QueryKeys = typeof queryKeys;
