import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';

// Mock users for prototype
const mockUsers: User[] = [
  {
    id: '1',
    email: 'dosen@udinus.ac.id',
    name: 'Dr. Ahmad Fauzi',
    role: 'dosen',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'admin@udinus.ac.id',
    name: 'Admin BTIK',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication logic
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password123') {
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      register: async (email: string, password: string, name: string): Promise<boolean> => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          set({ isLoading: false });
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: 'dosen',
          createdAt: new Date(),
        };
        
        mockUsers.push(newUser);
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
        return true;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },

      forgotPassword: async (email: string): Promise<boolean> => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user exists
        const user = mockUsers.find(u => u.email === email);
        
        set({ isLoading: false });
        return !!user;
      },

      resetPassword: async (token: string, password: string): Promise<boolean> => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock reset password logic
        set({ isLoading: false });
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);