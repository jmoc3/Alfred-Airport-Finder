'use client';

import { FC, useEffect } from "react";
import { useAirportStore, useAirports, useIsLoading, useError, useCurrentPage, useTotalPages } from "@/src/store/useAirportStore";
import { AirportCard } from "./AirportCard";
import { AirportResponse } from "@/src/types/airport.types";

interface AirportListClientProps {
  initialData: AirportResponse;
}

export const AirportListClient: FC<AirportListClientProps> = ({ 
  initialData,
}) => {
  const airports = useAirports();
  const isLoading = useIsLoading();
  const error = useError();
  const currentPage = useCurrentPage();
  const totalPages = useTotalPages();
  const allAirports = useAirportStore((state) => state.allAirports);
  const { nextPage, prevPage, goToPage, setInitialData, setSearchQuery } = useAirportStore();

  useEffect(() => {
    if (initialData) {
      setInitialData(initialData);
      const currentQuery = useAirportStore.getState().searchQuery;
      if (currentQuery) {
        setSearchQuery(currentQuery);
      }
    }
  }, []);

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-white animate-pulse">Cargando aeropuertos...</p>
        </div>
      ) : airports.length === 0 && allAirports.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-white animate-pulse">Cargando aeropuertos...</p>
        </div>
      ) : airports.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <p className="text-white text-lg">No se encontraron aeropuertos</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {airports.map((airport, index) => (
              <div 
                key={airport.iata_code}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                <AirportCard 
                  airport={airport}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 md:gap-3 py-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 md:px-6 py-2 md:py-3 bg-[#0066FF] text-white text-sm md:text-base rounded-lg hover:bg-[#0060FF] hover:scale-105 hover:shadow-lg hover:cursor-pointer disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 ease-out font-semibold"
              >
                Anterior
              </button>

              <div className="flex gap-2">
                {/* Muestra máximo 5 botones de página, centrados en la página actual */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  // Si hay 5 páginas o menos, muestra todas
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  // Si estamos en las primeras 3 páginas, muestra 1-5
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  // Si estamos en las últimas 3 páginas, muestra las últimas 5
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  // Si no, centra la página actual
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-10 h-10 md:w-12 md:h-12 text-sm md:text-base rounded-lg font-semibold transition-all duration-300 ease-out hover:cursor-pointer hover:scale-110 hover:shadow-lg ${
                        currentPage === pageNum
                          ? 'bg-[#0060FF] text-white shadow-md'
                          : 'bg-[#1E3A8A] text-white hover:bg-[#0060FF]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 md:px-6 py-2 md:py-3 bg-[#0066FF] text-white text-sm md:text-base rounded-lg hover:bg-[#0060FF] hover:scale-105 hover:shadow-lg hover:cursor-pointer disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 ease-out font-semibold"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
