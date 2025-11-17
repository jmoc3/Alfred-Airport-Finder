import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Airport, AirportResponse } from '@/src/types/airport.types'
import { CacheService } from '@/src/services/cache.service'

export type { Airport }
export type { SearchHistoryItem }

type SearchHistoryItem = {
  iataCode: string
  airportName: string
  timestamp: number
}

type State = {
  allAirports: Airport[]
  airports: Airport[]
  isLoading: boolean
  error: string | null
  currentPage: number
  limit: number
  totalPages: number
  searchQuery: string
  searchValue: string
  searchHistory: SearchHistoryItem[]
}

type Actions = {
  fetchAirports: (query?: string) => Promise<void>
  findAirportByIata: (iataCode: string) => Airport | undefined
  setInitialData: (data: AirportResponse) => void
  setSearchQuery: (query: string) => void
  setSearchValue: (value: string) => void
  addToSearchHistory: (airport: Airport) => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  resetStore: () => void
}

const STORAGE_KEY = 'airport-search-history'
const MAX_HISTORY_ITEMS = 5

const loadHistoryFromStorage = (): SearchHistoryItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveHistoryToStorage = (history: SearchHistoryItem[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch { }
}

const INITIAL_STATE: State = {
  allAirports: [],
  airports: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  limit: 6,
  totalPages: 1,
  searchQuery: '',
  searchValue: '',
  searchHistory: []
}

// Corta el array de aeropuertos según la página actual
// Ej: página 2 con límite 6 -> muestra del índice 6 al 11
const paginateAirports = (airports: Airport[], page: number, limit: number): Airport[] => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  return airports.slice(startIndex, endIndex)
}

// Filtra aeropuertos por código IATA o nombre
const filterAirports = (airports: Airport[], query: string): Airport[] => {
  if (!query.trim()) return airports
  
  const normalizedQuery = query.toLowerCase().trim()
  return airports.filter(airport => 
    airport.iata_code?.toLowerCase().includes(normalizedQuery) ||
    airport.airport_name?.toLowerCase().includes(normalizedQuery)
  )
}

export const useAirportStore = create<State & Actions>()(
  devtools(
    (set, get) => ({
      ...INITIAL_STATE,
      searchHistory: loadHistoryFromStorage(),

      findAirportByIata: (iataCode: string) => {
        const { allAirports } = get();
        return allAirports.find(
          airport => airport.iata_code?.toLowerCase() === iataCode.toLowerCase()
        );
      },

      fetchAirports: async () => {
        const limit = get().limit
        const cacheKey = CacheService.generateKey('all', 0);
        const cachedData = CacheService.get<AirportResponse>(cacheKey);

        // Si ya tenemos los aeropuertos en localStorage, no los volvemos a pedir
        if (cachedData) {
          const totalPages = Math.ceil(cachedData.data.length / limit)
          set({
            allAirports: cachedData.data,
            airports: paginateAirports(cachedData.data, 1, limit),
            currentPage: 1,
            totalPages,
            isLoading: false,
            error: null
          });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/airports');

          if (!response.ok) {
            throw new Error('Error al obtener aeropuertos');
          }

          const data: AirportResponse = await response.json();
          CacheService.set(cacheKey, data);
          const totalPages = Math.ceil(data.data.length / limit)

          set({
            allAirports: data.data,
            airports: paginateAirports(data.data, 1, limit),
            isLoading: false,
            currentPage: 1,
            totalPages,
            error: null
          });
        } catch (error) {
          set({
            allAirports: [],
            airports: [],
            isLoading: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
          });
        }
      },

      setInitialData: (data: AirportResponse) => {
        const limit = get().limit
        const totalPages = Math.ceil(data.data.length / limit)
        set({
          allAirports: data.data,
          airports: paginateAirports(data.data, 1, limit),
          currentPage: 1,
          totalPages,
          isLoading: false,
          error: null
        });
      },

      setSearchQuery: (query: string) => {
        const { allAirports, limit } = get()
        
        if (allAirports.length === 0) {
          set({ searchQuery: query, searchValue: query })
          get().fetchAirports()
          return
        }
        
        const filtered = filterAirports(allAirports, query)
        const totalPages = Math.ceil(filtered.length / limit)
        
        set({ 
          searchQuery: query, 
          searchValue: query,
          airports: paginateAirports(filtered, 1, limit),
          currentPage: 1,
          totalPages
        })
      },

      setSearchValue: (value: string) => {
        set({ searchValue: value })
      },

      addToSearchHistory: (airport: Airport) => {
        const { searchHistory } = get()
        
        // Elimina el aeropuerto si ya está en el historial (para moverlo al inicio)
        const filtered = searchHistory.filter(
          item => item.iataCode !== airport.iata_code
        )
        
        // Agrega el aeropuerto al inicio y mantiene solo los últimos 5
        const newHistory = [
          {
            iataCode: airport.iata_code,
            airportName: airport.airport_name,
            timestamp: Date.now()
          },
          ...filtered
        ].slice(0, MAX_HISTORY_ITEMS)
        
        saveHistoryToStorage(newHistory)
        set({ searchHistory: newHistory })
      },

      nextPage: () => {
        const { currentPage, totalPages, allAirports, searchQuery, limit } = get()
        if (currentPage < totalPages) {
          const nextPage = currentPage + 1
          const filtered = filterAirports(allAirports, searchQuery)
          set({
            currentPage: nextPage,
            airports: paginateAirports(filtered, nextPage, limit)
          })
        }
      },

      prevPage: () => {
        const { currentPage, allAirports, searchQuery, limit } = get()
        if (currentPage > 1) {
          const prevPage = currentPage - 1
          const filtered = filterAirports(allAirports, searchQuery)
          set({
            currentPage: prevPage,
            airports: paginateAirports(filtered, prevPage, limit)
          })
        }
      },

      goToPage: (page: number) => {
        const { totalPages, allAirports, searchQuery, limit } = get()
        if (page >= 1 && page <= totalPages) {
          const filtered = filterAirports(allAirports, searchQuery)
          set({
            currentPage: page,
            airports: paginateAirports(filtered, page, limit)
          })
        }
      },

      resetStore: () => set(INITIAL_STATE)
    }),
    { name: 'AirportStore' }
  )
)

// Selectores optimizados
export const useAirports = () => useAirportStore((state) => state.airports)
export const useIsLoading = () => useAirportStore((state) => state.isLoading)
export const useError = () => useAirportStore((state) => state.error)
export const useCurrentPage = () => useAirportStore((state) => state.currentPage)
export const useTotalPages = () => useAirportStore((state) => state.totalPages)
export const useSearchHistory = () => useAirportStore((state) => state.searchHistory)