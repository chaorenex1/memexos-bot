/** 布尔切换 */
import { useCallback, useState } from 'react';

export function useToggle(initial = false): [boolean, () => void, (next: boolean) => void] {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState((s) => !s), []);
  const set = useCallback((next: boolean) => setState(next), []);
  return [state, toggle, set];
}
