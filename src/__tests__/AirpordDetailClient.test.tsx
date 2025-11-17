import { render, screen, waitFor, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AirportDetailClient } from "../components/features/AirportDetailClient"
import { useAirportStore } from "../store/useAirportStore"
import { FC, PropsWithChildren } from "react"

jest.mock('../store/useAirportStore')

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

jest.mock('react-leaflet', () => ({
  MapContainer: (({ children }) => <div data-testid="map-container">{children}</div>) as FC<PropsWithChildren>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: () => <div data-testid="marker" />,
  Popup: (({ children }) => <div data-testid="popup">{children}</div>) as FC<PropsWithChildren>,
  useMap: () => ({
    setView: jest.fn(),
  }),
}))

describe("AirportDetailClient", () => {
  const mockAirport = {
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

  const mockFetchAirports = jest.fn()
  const mockFindAirportByIata = jest.fn()
  const mockAddToSearchHistory = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    
    mockFetchAirports.mockResolvedValue(undefined)
    mockFindAirportByIata.mockReturnValue(mockAirport)
    
    ;(useAirportStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        allAirports: [mockAirport],
        isLoading: false,
        fetchAirports: mockFetchAirports,
        findAirportByIata: mockFindAirportByIata,
        addToSearchHistory: mockAddToSearchHistory,
      }
      return selector ? selector(state) : state
    })
  })


  it('debería mostrar "Aeropuerto no encontrado" si no existe', async () => {
    mockFindAirportByIata.mockReturnValue(undefined)

    await act(async () => {
      render(<AirportDetailClient airportCode="XXX" />)
    })

    await waitFor(() => {
      expect(screen.getByText('Aeropuerto no encontrado')).toBeInTheDocument()
    })
  })

  it('debería mostrar la información correcta con codigo valido', async () => {
    const user = userEvent.setup()
    
    await act(async () => {
      render(<AirportDetailClient airportCode="BOG" />)
    })

    await waitFor(() => {
      expect(screen.getByText('El Dorado International Airport')).toBeInTheDocument()
    })

    expect(screen.getByText(/Código IATA/i)).toBeInTheDocument()
    expect(screen.getAllByText('BOG').length).toBeGreaterThan(0)

    const zonaHorariaTab = screen.getByText('Zona Horaria')
    await act(async () => {
      await user.click(zonaHorariaTab)
    })

    await waitFor(() => {
      expect(screen.getByText('America/Bogota')).toBeInTheDocument()
    })
  })
})