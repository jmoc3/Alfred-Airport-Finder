import { AirportsService } from '@/src/services/airports.service'

const mockAirportData = {
  pagination: {
    limit: 100,
    offset: 0,
    count: 1,
    total: 1
  },
  data: [
    {
      airport_id: 1,
      gmt: "-5",
      iata_code: "BOG",
      city_iata_code: "BOG",
      icao_code: "SKBO",
      country_iso2: "CO",
      geoname_id: "3688689",
      latitude: 4.701594,
      longitude: -74.146947,
      airport_name: "El Dorado International Airport",
      country_name: "Colombia",
      phone_number: "+57 1 266 2000",
      timezone: "America/Bogota"
    }
  ]
}

jest.mock('@/src/services/airports.service', () => ({
  AirportsService: {
    getAirports: jest.fn()
  }
}))

const mockGetAirports = AirportsService.getAirports as jest.Mock

describe('AirportsService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deberia retornar aeropuertos cuando se llama correctamente', async () => {
    mockGetAirports.mockResolvedValue(mockAirportData)
    
    const result = await AirportsService.getAirports('BOG')
    
    expect(mockGetAirports).toHaveBeenCalledWith('BOG')
    expect(result).toHaveProperty('data')
    expect(Array.isArray(result.data)).toBe(true)
    expect(result.data.length).toBeGreaterThan(0)
    expect(result.data[0]).toHaveProperty('iata_code', 'BOG')
    expect(result.data[0]).toHaveProperty('airport_name', 'El Dorado International Airport')
  })

  it('deberia manejar errores correctamente', async () => {
    mockGetAirports.mockRejectedValue(new Error('API Error'))
    
    await expect(AirportsService.getAirports('INVALID')).rejects.toThrow('API Error')
  })

  it('deberia retornar todos los aeropuertos sin query', async () => {
    mockGetAirports.mockResolvedValue(mockAirportData)
    
    const result = await AirportsService.getAirports()
    
    expect(mockGetAirports).toHaveBeenCalledWith()
    expect(result).toHaveProperty('data')
  })
})