export interface Airport {
  airport_name: string
  city_iata_code: string
  country_iso2: string
  country_name: string
  geoname_id: string
  gmt: string | null
  iata_code: string
  icao_code: string
  id: string
  latitude: string
  longitude: string
  phone_number: string | null
  timezone: string
}

export interface AirportResponse {
  pagination: {
    limit: number
    offset: number
    count: number
    total: number
  }
  data: Airport[]
}

export interface FetchAirportsParams {
  query?: string
  page?: number
  limit?: number
}
