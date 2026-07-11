import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/types/auth';

type AuthStore = {
  user: User | null;
  accessToken: string | null;

  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    { name: 'auth-storage' },
  ),
);
