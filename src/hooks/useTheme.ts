'use client';

import { useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

// Lee el tema guardado en localStorage (solo en el cliente)
const getThemeFromStorage = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('theme') as Theme) || 'light';
};

// Escucha cambios en localStorage para sincronizar entre pestañas
const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

export const useTheme = () => {
  // useSyncExternalStore sincroniza con localStorage sin causar errores de hidratación
  const theme = useSyncExternalStore(
    subscribe, // función de suscripción para detectar cambios
    getThemeFromStorage, // función que lee el estado en el cliente
    () => 'light' // función que lee el estado en el servidor (siempre 'light')
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
