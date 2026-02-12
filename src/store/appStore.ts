import { create } from 'zustand';
import type { AppView } from '../App';

interface AppStore {
  // Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  // Onboarding
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  selectedOS: 'debian' | 'macos' | null;
  setSelectedOS: (os: 'debian' | 'macos') => void;

  // Login form
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  clearLoginForm: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Navigation
  currentView: 'login',
  setCurrentView: (view) => set({ currentView: view }),

  // Onboarding
  onboardingStep: 1,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  selectedOS: null,
  setSelectedOS: (os) => set({ selectedOS: os }),

  // Login form
  username: '',
  password: '',
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  clearLoginForm: () => set({ username: '', password: '' }),
}));
