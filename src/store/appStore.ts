import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AppView } from '../App';

export const STORE_VERSION = 2;

export type SystemSpec = {
    architecture: "x86_64" | "x86" | "arm64" | "arm" | null;
    system: "Windows" | "macOS" | "Linux" | "Unknown" | null;
  }

interface AppStore {
  // Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;

  // Onboarding
  messageNumber: number;
  exitNodeIteration: number;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  setExitNodeIteration: (exitNodeIteration?: number) => void;
  onboardingAnswers: Record<string, string | null>;
  saveAnswer: (stepKey: string, answer: string) => void;
  feedback: Record<string, string>;
  saveFeedback: (stepKey: string, value: string) => void;
  onboardNewExitNode: () => void;
  stepLog: string[];
  survey: Record<string, string>;
  saveSurvey: (key: string, value: string) => void;
  setOnboardingData: (data:
    {
      exitNodeIteration?: number;
      onboardingStep?: number;
      stepLog?: string[];
      feedback?: Record<string, string>;
      survey?: Record<string, string>;
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

  // Anonymous mode
  anonymous: boolean;
  setAnonymous: (value: boolean) => void;

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
  systemSpec: SystemSpec;
  setSystemSpec: (systemSpec: SystemSpec) => void;

  // Version
  currentVersion: string | null;
  setCurrentVersion: (version: string | null) => void;
}

export const useAppStore = create<AppStore>()(
  devtools((set) => ({
    // Navigation
    currentView: 'login',
    setCurrentView: (view) => set({ currentView: view }),

    // Onboarding
    messageNumber: 0,
    exitNodeIteration: 0,
    onboardingStep: 1,
    setOnboardingStep: (step) => 
      set((state) => ({ 
        onboardingStep: step,
        messageNumber: state.messageNumber + 1,
      })),
    setExitNodeIteration: (exitNodeIteration) =>
      set((state) => ({ 
        exitNodeIteration: exitNodeIteration !== undefined ? exitNodeIteration : state.exitNodeIteration + 1,
      })),
    onboardingAnswers: {},
    stepLog: [],
    saveAnswer: (stepKey, answer) =>
      set((state) => ({
        onboardingAnswers: { ...state.onboardingAnswers, [stepKey]: answer },
        stepLog: [...state.stepLog, `${stepKey}:${answer}`],
      })),
    feedback: {},
    saveFeedback: (stepKey, value) =>
      set((state) => ({
        feedback: { ...state.feedback, [stepKey]: value },
      })),
    survey: {},
    saveSurvey: (key, value) =>
      set((state) => ({
        survey: { ...state.survey, [key]: value },
      })),
    setOnboardingData: (data) =>
      set({
        exitNodeIteration: data.exitNodeIteration ?? 0,
        onboardingStep: data.onboardingStep ?? 1,
        stepLog: data.stepLog ?? [],
        feedback: data.feedback ?? {},
        survey: data.survey ?? {},
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


    // Anonymous mode
    anonymous: false,
    setAnonymous: (value) => set({ anonymous: value }),

    // Device flags
    isMacOs: false,
    isSameDevice: null,
    setIsMacOs: (value) => set({ isMacOs: value }),
    setIsSameDevice: (value) => set({ isSameDevice: value }),

    // Reset store
    resetStore: () => set({
      currentView: 'login',
      exitNodeIteration: 0,
      onboardingStep: 1,
      onboardingAnswers: {},
      stepLog: [],
      feedback: {},
      survey: {},
      username: '',
      token: null,
      anonymous: false,
      isMacOs: false,
      isSameDevice: null,
      vpnCountry: null,
      isAutoLoading: false,
      fundingCode: null,
    }),

    resetOnboarding: () => set({
      onboardingStep: 1,
      exitNodeIteration: 0,
      onboardingAnswers: {},
      stepLog: [],
      feedback: {},
      survey: {},
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
    setSystemSpec: (systemSpec) => set({ systemSpec }),

    // Version
    currentVersion: null,
    setCurrentVersion: (version) => set({ currentVersion: version }),
  }), { name: 'AppStore' })
);
