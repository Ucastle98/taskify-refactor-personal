import type { User } from '@/types/auth';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: User | null;
  accessToken: string | null;
  hasHydrated: boolean;

  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      hasHydrated: false,

      setAuth: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
