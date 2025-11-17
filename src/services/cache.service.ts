const CACHE_PREFIX = 'airports_';
const MAX_CACHE_ENTRIES = 30;
const CACHE_EXPIRATION = 3600000; // 1 hora en milisegundos

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  static generateKey(query: string | undefined, page: number): string {
    return `${CACHE_PREFIX}${query || 'all'}_page${page}`;
  }

  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cachedData = localStorage.getItem(key);
      if (!cachedData) return null;

      const entry: CacheEntry<T> = JSON.parse(cachedData);
      
      if (Date.now() - entry.timestamp > CACHE_EXPIRATION) {
        localStorage.removeItem(key);
        return null;
      }

      return entry.data;
    } catch {
      return null;
    }
  }

  static set<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      this.cleanupIfNeeded();
      
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now()
      };
      
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Error setting cache:', error);
      this.clearAll();
    }
  }

  static cleanupIfNeeded(): void {
    const airportKeys = Object.keys(localStorage).filter(key => 
      key.startsWith(CACHE_PREFIX)
    );
    
    airportKeys.forEach(key => {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const entry: CacheEntry<unknown> = JSON.parse(data);
          if (Date.now() - entry.timestamp > CACHE_EXPIRATION) {
            localStorage.removeItem(key);
          }
        }
      } catch {
        localStorage.removeItem(key);
      }
    });

    const remainingKeys = Object.keys(localStorage).filter(key => 
      key.startsWith(CACHE_PREFIX)
    );
    
    if (remainingKeys.length >= MAX_CACHE_ENTRIES) {
      remainingKeys
        .sort((a, b) => {
          try {
            const aData = JSON.parse(localStorage.getItem(a) || '{}');
            const bData = JSON.parse(localStorage.getItem(b) || '{}');
            return aData.timestamp - bData.timestamp;
          } catch {
            return 0;
          }
        })
        .slice(0, remainingKeys.length - MAX_CACHE_ENTRIES + 10)
        .forEach(key => localStorage.removeItem(key));
    }
  }

  static clearAll(): void {
    if (typeof window === 'undefined') return;
    
    const airportKeys = Object.keys(localStorage).filter(key => 
      key.startsWith(CACHE_PREFIX)
    );
    airportKeys.forEach(key => localStorage.removeItem(key));
  }
}
