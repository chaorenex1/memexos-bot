import { useUserStore } from '@repo/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { bootstrapAuthSession, login, logout, me, register } from './api';

export function useMe() {
  return useQuery({ queryKey: ['auth', 'me'], queryFn: me });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
    onMutate: () => {
      useUserStore.getState().setStatus('authenticating');
    },
    onSuccess: ({ user, tokens }) => {
      useUserStore.getState().setSession(user, tokens);
    },
    onError: () => {
      useUserStore.getState().clearSession();
      useUserStore.getState().setHydrated(true);
    },
  });
}

export function useRegisterMutation() {
  return useMutation({ mutationFn: register });
}

export function useLogoutMutation() {
  return useMutation({ mutationFn: logout });
}

export function useBootstrapAuth() {
  useEffect(() => {
    void bootstrapAuthSession();
  }, []);
}
