"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FC } from "react";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";

// Leaflet pierde sus iconos por defecto cuando se usa con webpack/Next.js
// Esto los restaura manualmente desde el CDN
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Aplica el icono por defecto a todos los marcadores
L.Marker.prototype.options.icon = DefaultIcon;

interface AirportMapProps {
  latitude: string;
  longitude: string;
  airportName: string;
  iataCode: string;
}

export const AirportMap: FC<AirportMapProps> = ({ latitude, longitude, airportName, iataCode }) => {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const position: LatLngExpression = [lat, lng];

  return (
    <div className="h-full w-full rounded-xl overflow-hidden">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <strong className="text-lg">{iataCode}</strong>
              <p className="text-sm">{airportName}</p>
              <p className="text-xs text-gray-600 mt-1">
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
