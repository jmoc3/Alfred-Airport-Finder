'use client'

import { SiteLogo } from "@/src/components/ui/SiteLogo";
import { InputSearch } from "@/src/components/ui/InputSearch";
import { SearchButton } from "@/src/components/ui/SearchButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigateToSearch = () => {
    setIsNavigating(true);
    router.push('/airports');
  };

  return (
    <div className=" h-screen flex items-center justify-center">
        {isNavigating && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-linear-to-r from-[#3F495F] to-[#0E1934] p-8 rounded-2xl border border-[#0060FF]/50 shadow-[0_0_20px_rgba(0,96,255,0.2)] animate-fade-in-up">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0060FF] border-t-transparent"></div>
                <p className="text-white text-lg font-semibold animate-pulse">Cargando aeropuertos...</p>
              </div>
            </div>
          </div>
        )}
        <SiteLogo width="88.91px" extraClasses="absolute z-10 top-1/5 animate-fade-in"/>
        <div className="relative z-10 space-y-10 animate-fade-in-up px-4" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="w-full space-y-7">
            <div className="w-full max-w-[780px] mx-auto">
              <InputSearch onEnterPress={handleNavigateToSearch} />
            </div>
            <div onClick={handleNavigateToSearch}>
              <SearchButton width="240.5px" extraClasses="m-auto" />
            </div>
          </div>
        </div>
    </div>
  );
}
