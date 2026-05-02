import { useUserStore } from '@repo/store';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { bootstrapAuthSession, login, logout } from './api';

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

export function useLogoutMutation() {
  return useMutation({ mutationFn: logout });
}

export function useBootstrapAuth() {
  useEffect(() => {
    void bootstrapAuthSession();
  }, []);
}
