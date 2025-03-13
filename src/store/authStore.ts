import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // Only allow specific credentials
    if (email === 'niranjana@gmail.com' && password === 'niranj@123') {
      const user: User = {
        id: '1',
        email,
        name: 'Niranjana',
      };
      set({ user, isAuthenticated: true });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));