import { AirportResponse } from '@/src/types/airport.types';

const API_BASE_URL = process.env.AVIATION_API_BASE_URL;

// Caché en memoria para evitar llamadas repetidas durante la sesión del servidor
const memoryCache = new Map<string, { data: AirportResponse; timestamp: number }>();
const CACHE_TTL = 3600000; // 1 hora en milisegundos

export class AirportsService {
  private static getApiKey(): string {
    const apiKey = process.env.AVIATION_STACK_API_KEY;
    
    if (!apiKey) {
      throw new Error('API key no configurada. Agrega AVIATION_STACK_API_KEY en .env.local');
    }
    
    return apiKey;
  }

  private static getCacheKey(query?: string): string {
    return query ? `airports_${query}` : 'airports_all';
  }

  private static getFromMemoryCache(cacheKey: string): AirportResponse | null {
    const cached = memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    if (cached) {
      memoryCache.delete(cacheKey);
    }
    return null;
  }

  static async getAirports(query?: string): Promise<AirportResponse> {
    // Verificar caché en memoria primero
    const cacheKey = this.getCacheKey(query);
    const cachedData = this.getFromMemoryCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const apiKey = this.getApiKey();
    const url = new URL(`${API_BASE_URL}/airports`);
    url.searchParams.append('access_key', apiKey);
    url.searchParams.append('limit', '10000');
    
    if (query) {
      url.searchParams.append('iata_code', query);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data: AirportResponse = await response.json();
    
    // Guardar en caché en memoria
    memoryCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    // Limpiar caché antigua si hay muchas entradas
    if (memoryCache.size > 50) {
      const oldestKey = Array.from(memoryCache.keys())[0];
      memoryCache.delete(oldestKey);
    }
    
    return data;
  }
}
