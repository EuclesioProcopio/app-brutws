// Gerenciamento de estado local do Brutws

import { UserProfile, DailyLog } from './types';

const STORAGE_KEYS = {
  USER_PROFILE: 'brutws_user_profile',
  DAILY_LOGS: 'brutws_daily_logs',
  ONBOARDING_COMPLETE: 'brutws_onboarding_complete',
};

export const storage = {
  // User Profile
  saveUserProfile: (profile: UserProfile): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
    }
  },

  getUserProfile: (): UserProfile | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  isOnboardingComplete: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true';
    }
    return false;
  },

  // Daily Logs
  saveDailyLog: (log: DailyLog): void => {
    if (typeof window !== 'undefined') {
      const logs = storage.getDailyLogs();
      const existingIndex = logs.findIndex(l => l.data === log.data);
      
      if (existingIndex >= 0) {
        logs[existingIndex] = log;
      } else {
        logs.push(log);
      }
      
      localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
    }
  },

  getDailyLogs: (): DailyLog[] => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
      return data ? JSON.parse(data) : [];
    }
    return [];
  },

  clearAllData: (): void => {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  },
};

// Cálculos úteis
export const calculations = {
  calcularIMC: (peso: number, altura: number): number => {
    const alturaMetros = altura / 100;
    return peso / (alturaMetros * alturaMetros);
  },

  calcularTMB: (peso: number, altura: number, idade: number, sexo: 'masculino' | 'feminino' | 'outro'): number => {
    // Fórmula de Harris-Benedict
    if (sexo === 'masculino') {
      return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
      return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }
  },

  calcularCaloriasDiarias: (tmb: number, nivelAtividade: 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso'): number => {
    const multiplicadores = {
      sedentario: 1.2,
      leve: 1.375,
      moderado: 1.55,
      intenso: 1.725,
      muito_intenso: 1.9,
    };
    return tmb * multiplicadores[nivelAtividade];
  },
};
