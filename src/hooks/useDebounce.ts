import { useEffect, useState } from 'react';

// Evita hacer búsquedas en cada teclazo. Espera a que el usuario deje de escribir
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crea un temporizador que actualiza el valor después del delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Si el usuario sigue escribiendo, cancela el timer anterior y crea uno nuevo
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}