import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, Theme } from './types';

interface AppState {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'fr',
      theme: 'light',
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'app-storage',
    }
  )
);