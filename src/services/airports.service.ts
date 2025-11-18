import { AirportResponse, Airport } from '@/src/types/airport.types';

const API_BASE_URL = process.env.AVIATION_API_BASE_URL;

export class AirportsService {
  private static getApiKey(): string {
    const apiKey = process.env.AVIATION_STACK_API_KEY;
    
    if (!apiKey) {
      throw new Error('API key no configurada. Agrega AVIATION_STACK_API_KEY en .env.local');
    }
    
    return apiKey;
  }

  static async getAirports(query?: string): Promise<AirportResponse> {
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
      },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data: AirportResponse = await response.json();
    
    return data;
  }

  static async getAirportByIata(iataCode: string): Promise<Airport | null> {
    const data = await this.getAirports(iataCode);
    return data.data[0] || null;
  }
}
