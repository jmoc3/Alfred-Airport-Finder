import { FC } from "react";
import Image from "next/image";
import { Airport, useAirportStore } from "@/src/store/useAirportStore";
import { useRouter } from "next/navigation";

interface AirportCardProps {
  airport: Airport;
}

export const AirportCard: FC<AirportCardProps> = ({ airport}) => {
  const router  = useRouter()
  const { addToSearchHistory } = useAirportStore();
  
  const handleClick = () => {
    addToSearchHistory(airport);
    router.push(`/airport/${airport.iata_code}`);
  };
  
  return (
    <div 
      onClick={handleClick}
      className="group relative flex border border-white dark:border-gray-700 bg-linear-to-r from-[#3F495F] to-[#0E1934] dark:from-gray-800 dark:to-gray-950 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
    >

      {/* Contenido */}
      <div className="w-[60%] p-4 md:p-6 lg:p-8 space-y-2 md:space-y-4">
        <div>
          <h4 className="text-base md:text-lg lg:text-xl font-semibold text-white dark:text-gray-200 mb-1 md:mb-2">
            {airport.airport_name}
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-white dark:text-gray-300">{airport.city_iata_code}, {airport.country_name}</span>
          </div>
        </div>

        <h1 
          className={`text-2xl md:text-3xl lg:text-[42.64px] w-fit font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#006AFF] to-[#00F9FF] transition-all duration-300 group-hover:scale-110`}
        >
          {airport.iata_code}
        </h1>
      </div>
      <div className="relative w-[40%] overflow-hidden">
        <Image 
          src="/images/cardImage.jpg" 
          alt={airport.airport_name}
          fill
          className="object-cover -translate-y-4 -translate-x-9 scale-125 group-hover:scale-[1.35] transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0e1934e7] to-[#0E1934] dark:from-gray-900/95 dark:to-black/95 opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>

      </div>
      <Image
          src="/icons/flight.png" 
          alt={airport.airport_name}
          width={55}
          height={1}
          className="absolute top-3 right-3 md:top-5 md:right-5 w-8 h-8 md:w-auto md:h-auto transition-transform duration-300 ease-in-out group-hover:translate-x-1"
      ></Image>
    </div>
  );
}