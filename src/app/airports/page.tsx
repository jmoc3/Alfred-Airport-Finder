import { SiteLogo } from "@/src/components/ui/SiteLogo";
import { InputSearch } from "@/src/components/ui/InputSearch";
import { SearchButton } from "@/src/components/ui/SearchButton";
import { AirportListClient } from "@/src/components/features/AirportListClient";
import { AirportsService } from "@/src/services/airports.service";

export const revalidate = 86400

export default async function AirportsPage({}) {
  const initialData = await AirportsService.getAirports();

  return (
    <div className="px-4 md:px-8 lg:px-20">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 py-8 md:py-12 animate-fade-in relative z-50">
        <SiteLogo width="50.46px" />
        <div className="flex flex-col md:flex-row items-center w-full md:w-[60%] gap-4 md:gap-8">
          <InputSearch extraClasses="!py-[.6rem]"/>
          <SearchButton width="250px" height="50.76px" extraClasses="text-sm"/>
        </div>
      </header>
      <div>
        <AirportListClient 
          initialData={initialData}
        />
      </div>
    </div>
  );
}