import { AirportDetailClient } from "@/src/components/features/AirportDetailClient";

export function generateStaticParams() {
  // Lista de los 50 aeropuertos mas visitados
  return [
    { iata: "ATL" }, { iata: "LAX" }, { iata: "ORD" }, { iata: "DFW" },
    { iata: "DEN" }, { iata: "JFK" }, { iata: "SFO" }, { iata: "SEA" },
    { iata: "MIA" }, { iata: "BOS" }, { iata: "LAS" }, { iata: "PHX" },
    { iata: "IAH" }, { iata: "CLT" }, { iata: "MCO" }, { iata: "LHR" },
    { iata: "LGW" }, { iata: "CDG" }, { iata: "ORY" }, { iata: "FRA" },
    { iata: "MUC" }, { iata: "AMS" }, { iata: "MAD" }, { iata: "BCN" },
    { iata: "FCO" }, { iata: "MXP" }, { iata: "IST" }, { iata: "ATH" },
    { iata: "HND" }, { iata: "NRT" }, { iata: "HKG" }, { iata: "SIN" },
    { iata: "ICN" }, { iata: "BKK" }, { iata: "DXB" }, { iata: "AUH" },
    { iata: "DEL" }, { iata: "BOM" }, { iata: "KUL" }, { iata: "CGK" },
    { iata: "MEX" }, { iata: "BOG" }, { iata: "SCL" }, { iata: "EZE" },
    { iata: "GRU" }, { iata: "LIM" }, { iata: "SYD" }, { iata: "MEL" },
    { iata: "JNB" }, { iata: "CPT" }
  ];
}

export const revalidate = 3600;

export default async function AirportDetailPage({
  params
}: {
  params: Promise<{ iata: string }>
}) {
  const { iata } = await params;

  return <AirportDetailClient airportCode={iata} />;
}