import { useMutation, useQuery } from '@tanstack/react-query';

import { login, logout, me } from './api';

export function useMe() {
  return useQuery({ queryKey: ['auth', 'me'], queryFn: me });
}

export function useLoginMutation() {
  return useMutation({ mutationFn: login });
}

export function useLogoutMutation() {
  return useMutation({ mutationFn: logout });
}
