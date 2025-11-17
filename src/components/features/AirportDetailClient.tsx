'use client';

import { FC, useEffect, useState, lazy, Suspense } from "react";
import { useAirportStore, type Airport } from "@/src/store/useAirportStore";
import { DataCard } from "@/src/components/ui/DataCard";

// Lazy load del mapa para no cargar Leaflet hasta que el usuario vaya a la pestaña de ubicación
const AirportMap = lazy(() => import('@/src/components/features/Map').then(module => ({ default: module.AirportMap })));

const tabs = [
  { id: 'general', label: 'General', img: '/icons/Info Circle.png' },
  { id: 'ubicacion', label: 'Ubicación', img: '/icons/Map Point.png' },
  { id: 'zona-horaria', label: 'Zona Horaria', img: '/icons/Clock Circle.png' },
  { id: 'estadisticas', label: 'Estadísticas', img: '/icons/Info Circle.png' }
] as const;

type TabId = typeof tabs[number]['id'];

interface AirportDetailClientProps {
  airportCode: string;
}

export const AirportDetailClient: FC<AirportDetailClientProps> = ({ airportCode }) => {
  const [airport, setAirport] = useState<Airport | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const { fetchAirports, findAirportByIata, addToSearchHistory } = useAirportStore();
  const isLoading = useAirportStore((state) => state.isLoading);
  const allAirports = useAirportStore((state) => state.allAirports);

  useEffect(() => {
    const loadAirport = async () => {
      if (allAirports.length === 0) {
        await fetchAirports();
      }
      
      const foundAirport = findAirportByIata(airportCode);
      if (foundAirport) {
        setAirport(foundAirport);
        addToSearchHistory(foundAirport);
      } else {
        setAirport(null);
      }
    };

    loadAirport();
  }, [airportCode, fetchAirports, findAirportByIata, addToSearchHistory, allAirports.length]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 animate-fade-in">
        <div role="status" className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-white animate-pulse">Cargando información del aeropuerto...</p>
      </div>
    );
  }

  if (!airport) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white text-xl">Aeropuerto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-20 py-8 md:py-12">
      <h1 className="w-fit m-auto py-2 text-3xl md:text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#006AFF] to-[#00F9FF] text-center mb-8 md:mb-12 animate-fade-in">
        {airport.airport_name}
      </h1>

      <div className="grid grid-cols-2 md:flex gap-2 md:gap-0 px-2 md:px-5 py-2 mb-6 md:mb-8 rounded-xl overflow-hidden bg-[#546E8A] animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-2 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 rounded-xl text-xs md:text-base lg:text-xl font-semibold transition-all duration-300 ease-out cursor-pointer hover:scale-105 ${
              activeTab === tab.id
                ? 'bg-[#1E5EFF] text-white shadow-lg'
                : ' text-gray-300 hover:bg-[#1E5EFF]/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 animate-fade-in" key={activeTab}>
        {activeTab === 'general' && (
          <DataCard 
            title="Información General" 
            icon={tabs.find(tab => tab.id === 'general')?.img}
          >
            <div>
              <span className="font-semibold">Código IATA: </span>
              <span>{airport.iata_code}</span>
            </div>
            <div>
              <span className="font-semibold">Código ICAO: </span>
              <span>{airport.icao_code}</span>
            </div>
            <div>
              <span className="font-semibold">País: </span>
              <span>{airport.country_name} ({airport.country_iso2})</span>
            </div>
            <div>
              <span className="font-semibold">Ciudad IATA: </span>
              <span>{airport.city_iata_code}</span>
            </div>
            <div>
              <span className="font-semibold">Teléfono: </span>
              <span>{airport.phone_number || 'No disponible'}</span>
            </div>
          </DataCard>
        )}

        {activeTab === 'ubicacion' && (
          <DataCard 
            title="Ubicación" 
            icon={tabs.find(tab => tab.id === 'ubicacion')?.img}
          >
            <div>
              <span className="font-semibold">Latitud: </span>
              <span>{airport.latitude}</span>
            </div>
            <div>
              <span className="font-semibold">Longitud: </span>
              <span>{airport.longitude}</span>
            </div>
            <div>
              <span className="font-semibold">ID Geoname: </span>
              <span>{airport.geoname_id}</span>
            </div>
          </DataCard>
        )}

        {activeTab === 'zona-horaria' && (
          <DataCard 
            title="Zona Horaria" 
            icon={tabs.find(tab => tab.id === 'zona-horaria')?.img}
          >
            <div>
              <span className="font-semibold">Zona Horaria: </span>
              <span>{airport.timezone}</span>
            </div>
            <div>
              <span className="font-semibold">GMT: </span>
              <span>{airport.gmt}</span>
            </div>
          </DataCard>
        )}

        {activeTab === 'estadisticas' && (
          <DataCard 
            title="Estadísticas" 
            icon={tabs.find(tab => tab.id === 'estadisticas')?.img}
          >
            <div className="text-center py-8">
              <p className="text-gray-400">Estadísticas no disponibles</p>
            </div>
          </DataCard>
        )}

        {activeTab === 'ubicacion' && (
          <div className="h-[300px] md:h-[500px] lg:h-[766.36px] rounded-xl overflow-hidden border-2 border-gray-600 hover:border-[#00FFE7]/50 transition-all duration-300 hover:shadow-xl">
            <Suspense fallback={<div className="flex items-center justify-center h-full bg-gray-800"><span className="text-white animate-pulse">Cargando mapa...</span></div>}>
              <AirportMap 
                latitude={airport.latitude}
                longitude={airport.longitude}
                airportName={airport.airport_name}
                iataCode={airport.iata_code}
              />
            </Suspense>
          </div>
        )}
        
        {activeTab === 'zona-horaria' && (
          <DataCard 
            title="Hora local" 
            icon={tabs.find(tab => tab.id === 'zona-horaria')?.img}
          >
            <span>{new Date().toLocaleString("en-US", { timeZone: airport.timezone })}</span>
          </DataCard>
        )}
      </div>
    </div>
  );
};
