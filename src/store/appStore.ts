import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AppView } from '../App';

interface AppStore {
  // Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  // Onboarding
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  onboardingAnswers: Record<string, string | null>;
  saveAnswer: (stepKey: string, answer: string) => void;
  notes: Record<string, string>;
  saveNote: (stepKey: string, note: string) => void;
  stepLog: string[];
  feedback: Record<string, string>;
  saveFeedback: (key: string, value: string) => void;
  setOnboardingData: (data: { onboardingStep?: number; stepLog?: string[]; notes?: Record<string, string>; feedback?: Record<string, string>; onboardingAnswers?: Record<string, string | null> }) => void;

  // Login form
  username: string;
  password: string;
  token: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string | null) => void;
  clearLoginForm: () => void;

  // Reset store
  resetStore: () => void;

  // Global loading
  isAutoLoading: boolean;
  setAutoLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  devtools((set) => ({
    // Navigation
    currentView: 'login',
    setCurrentView: (view) => set({ currentView: view }),

    // Onboarding
    onboardingStep: 1,
    setOnboardingStep: (step) => set({ onboardingStep: step }),
    onboardingAnswers: {},
    stepLog: [],
    saveAnswer: (stepKey, answer) =>
      set((state) => ({
        onboardingAnswers: { ...state.onboardingAnswers, [stepKey]: answer },
        stepLog: [...state.stepLog, `${stepKey}:${answer}`],
      })),
    notes: {},
    saveNote: (stepKey, note) =>
      set((state) => ({
        notes: { ...state.notes, [stepKey]: note },
      })),
    feedback: {},
    saveFeedback: (key, value) =>
      set((state) => ({
        feedback: { ...state.feedback, [key]: value },
      })),
    setOnboardingData: (data) =>
      set({
        onboardingStep: data.onboardingStep ?? 1,
        stepLog: data.stepLog ?? [],
        notes: data.notes ?? {},
        feedback: data.feedback ?? {},
        onboardingAnswers: data.onboardingAnswers ?? {},
      }),

    // Login form
    username: 'BlockChainBandit',
    token: null,
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setToken: (token) => set({ token }),
    clearLoginForm: () => set({ username: '', password: '', token: null }),

    // Reset store
    resetStore: () => set({
      currentView: 'login',
      onboardingStep: 1,
      onboardingAnswers: {},
      stepLog: [],
      notes: {},
      feedback: {},
      username: '',
      token: null,
      isAutoLoading: false,
    }),

    // Global loading
    isAutoLoading: false,
    setAutoLoading: (loading) => set({ isAutoLoading: loading }),
  }), { name: 'AppStore' })
);
