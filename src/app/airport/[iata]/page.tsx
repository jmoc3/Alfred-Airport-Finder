import { AirportDetailClient } from "@/src/components/features/AirportDetailClient";
import { AirportsService } from "@/src/services/airports.service";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // Pre-genera solo los 50 aeropuertos más visitados para optimizar el build
  const topAirports = [
    "ATL", "LAX", "ORD", "DFW", "DEN", "JFK", "SFO", "SEA",
    "MIA", "BOS", "LAS", "PHX", "IAH", "CLT", "MCO", "LHR",
    "LGW", "CDG", "ORY", "FRA", "MUC", "AMS", "MAD", "BCN",
    "FCO", "MXP", "IST", "ATH", "HND", "NRT", "HKG", "SIN",
    "ICN", "BKK", "DXB", "AUH", "DEL", "BOM", "KUL", "CGK",
    "MEX", "BOG", "SCL", "EZE", "GRU", "LIM", "SYD", "MEL",
    "JNB", "CPT"
  ];
  
  return topAirports.map(iata => ({ iata }));
}

export const revalidate = 3600;

export default async function AirportDetailPage({
  params
}: {
  params: Promise<{ iata: string }>
}) {
  const { iata } = await params;
  const airport = await AirportsService.getAirportByIata(iata);

  if (!airport) {
    notFound();
  }

  return <AirportDetailClient airportCode={iata} initialData={airport} />;
}