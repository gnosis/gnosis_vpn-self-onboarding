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

  // Login form
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  clearLoginForm: () => void;

  // Reset store
  resetStore: () => void;
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

    // Login form
    username: '',
    password: '',
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    clearLoginForm: () => set({ username: '', password: '' }),

    // Reset store
    resetStore: () => set({
      currentView: 'login',
      onboardingStep: 1,
      onboardingAnswers: {},
      stepLog: [],
      notes: {},
      feedback: {},
      username: '',
      password: '',
    }),
  }), { name: 'AppStore' })
);
