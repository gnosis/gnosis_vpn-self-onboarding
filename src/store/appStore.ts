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
  setOnboardingData: (data: 
    { 
      onboardingStep?: number; 
      stepLog?: string[]; 
      notes?: Record<string, string>; 
      feedback?: Record<string, string>; 
      onboardingAnswers?: Record<string, string | null>;
      isMacOs?: boolean;
      isSameDevice?: boolean | null;
    }
  ) => void;

  // Login form
  username: string;
  password: string;
  token: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string | null) => void;
  clearLoginForm: () => void;

  // IP checking
  currentIP: string | null;
  isVpn: boolean;
  vpnCountry: string | null;
  setCurrentIP: (ip: string | null) => void;
  setVpnCountry: (country: string | null) => void;

  // Device flags
  isMacOs: boolean;
  isSameDevice: boolean | null;
  setIsMacOs: (value: boolean) => void;
  setIsSameDevice: (value: boolean) => void;

  // Reset store
  resetStore: () => void;
  resetOnboarding: () => void;

  // Funding
  fundingCode: string | null;
  setFundingCode: (code: string | null) => void;

  // Global loading
  isAutoLoading: boolean;
  setAutoLoading: (loading: boolean) => void;

  // System specification
  systemSpec: {
    architecture: "x86_64" | "x86" | "arm64" | "arm" | null;
    system: "Windows" | "macOS" | "Linux" | "Unknown" | null;
  };
  setSystemSpec: (architecture: "x86_64" | "x86" | "arm64" | "arm" | null, system: "Windows" | "macOS" | "Linux" | "Unknown" | null) => void;
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
        isMacOs: data.isMacOs ?? false,
        isSameDevice: data?.isSameDevice ?? null,
      }),

    // Login form
    username: '',
    token: null,
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setToken: (token) => set({ token }),
    clearLoginForm: () => set({ username: '', password: '', token: null }),

    // IP checking
    currentIP: null,
    isVpn: false,
    setCurrentIP: (ip) => set({
      currentIP: ip,
      isVpn: ip?.startsWith("185.9.1.") ?? false
    }),


    // Device flags
    isMacOs: false,
    isSameDevice: null,
    setIsMacOs: (value) => set({ isMacOs: value }),
    setIsSameDevice: (value) => set({ isSameDevice: value }),

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
      isMacOs: false,
      isSameDevice: null,
      vpnCountry: null,
      isAutoLoading: false,
      fundingCode: null,
    }),

    resetOnboarding: () => set({
      onboardingStep: 1,
      onboardingAnswers: {},
      stepLog: [],
      notes: {},
      feedback: {},
      isMacOs: false,
      isSameDevice: null,
      isAutoLoading: false,
    }),

    // Funding
    fundingCode: null,
    setFundingCode: (code) => set({ fundingCode: code }),

    // Global loading
    isAutoLoading: false,
    setAutoLoading: (loading) => set({ isAutoLoading: loading }),

    // System specification
    systemSpec: {
      architecture: null,
      system: null,
    },
    setSystemSpec: (architecture, system) => set({ systemSpec: { architecture, system } }),
  }), { name: 'AppStore' })
);
