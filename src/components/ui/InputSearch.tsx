'use client'

import { useDebounce } from "@/src/hooks/useDebounce";
import { useAirportStore, useSearchHistory } from "@/src/store/useAirportStore";
import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface InputSearchProps {
  extraClasses?: string
  onEnterPress?: () => void
} 

export const InputSearch: FC<InputSearchProps> = ({ extraClasses, onEnterPress }) => {
  
    const router = useRouter();
    const searchValue = useAirportStore((state) => state.searchValue);
    const searchHistory = useSearchHistory();
    const { setSearchQuery, setSearchValue } = useAirportStore();
    const [showHistory, setShowHistory] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
  
    const debouncedSearch = useDebounce(searchValue, 500);

    useEffect(() => {
      if (debouncedSearch !== useAirportStore.getState().searchQuery) {
        setSearchQuery(debouncedSearch);
      }
    }, [debouncedSearch, setSearchQuery]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowHistory(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchValue(query);
      if (query.length > 0) {
        setShowHistory(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onEnterPress) {
        setShowHistory(false);
        onEnterPress();
      }
    };

    const handleFocus = () => {
      if (searchHistory.length > 0 && !searchValue) {
        setShowHistory(true);
      }
    };

    const handleHistoryItemClick = (iataCode: string) => {
      setShowHistory(false);
      router.push(`/airport/${iataCode}`);
    };
  
  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        placeholder="Buscar aeropuertos..."
        value={searchValue}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className={`w-full h-fit px-6 py-4 bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden placeholder:text-[#006FEE] dark:placeholder:text-blue-400 text-[#006FEE] dark:text-blue-300 text-lg focus:outline-none focus:ring-2 focus:ring-[#0060FF]/40 dark:focus:ring-blue-500/40 focus:shadow-[0_0_15px_rgba(0,96,255,0.15)] hover:shadow-[0_4px_20px_rgba(0,96,255,0.1)] transition-all duration-300 ease-out ${extraClasses}`}
      />
      
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-[#0060FF]/20 dark:border-gray-700 overflow-hidden z-100 animate-fade-in">
          <ul className="py-1">
            {searchHistory.map((item) => (
              <li 
                key={item.iataCode}
                onClick={() => handleHistoryItemClick(item.iataCode)}
                className="px-3 py-2 hover:bg-[#0060FF]/10 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 flex items-center gap-2"
              >
                <Image 
                  src="/icons/Clock Circle.png" 
                  alt="Recent" 
                  width={16} 
                  height={16}
                  className="opacity-50"
                />
                <div className="flex-1 flex items-center gap-2">
                  <span className="font-semibold text-[#0060FF] dark:text-blue-400 text-sm">{item.iataCode}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">- {item.airportName}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}