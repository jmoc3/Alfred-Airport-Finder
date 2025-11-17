'use client';

import { useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const getThemeFromStorage = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('theme') as Theme) || 'light';
};

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

export const useTheme = () => {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeFromStorage,
    () => 'light' // Server snapshot
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    // Disparar evento storage manualmente para actualizar
    window.dispatchEvent(new Event('storage'));
  };

  return { theme, toggleTheme };
};
