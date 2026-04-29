import { useQuery } from '@tanstack/react-query';

import { listAgents } from './api';

export function useAgents() {
  return useQuery({ queryKey: ['agents'], queryFn: listAgents });
}
