"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface VehicleMapProps {
  vehicles: Array<{
    id: string;
    registrationNo: string;
    name: string;
    currentLat: number | null;
    currentLng: number | null;
    status: string;
    currentSpeed: number | null;
  }>;
}

function MapBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
    }
  }, [map, positions]);
  return null;
}

export default function VehicleMap({ vehicles }: VehicleMapProps) {
  const defaultCenter: [number, number] = [40.7306, -73.9852]; // NYC Default
  const validPositions = vehicles
    .filter(v => v.currentLat && v.currentLng)
    .map(v => [v.currentLat!, v.currentLng!] as [number, number]);

  return (
    <div className="h-full w-full relative z-0 rounded-xl overflow-hidden border border-border/50">
      <MapContainer 
        center={validPositions.length > 0 ? validPositions[0] : defaultCenter} 
        zoom={12} 
        style={{ height: "100%", width: "100%", background: "#1a1b26" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {vehicles.map(v => {
          if (!v.currentLat || !v.currentLng) return null;
          return (
            <Marker key={v.id} position={[v.currentLat, v.currentLng]}>
              <Popup>
                <div className="text-sm font-semibold text-foreground">{v.name}</div>
                <div className="text-xs text-muted-foreground">{v.registrationNo}</div>
                <div className="mt-1 text-xs text-foreground">Status: <span className="font-medium text-primary">{v.status}</span></div>
                {v.currentSpeed !== null && (
                  <div className="text-xs text-foreground">Speed: {v.currentSpeed} km/h</div>
                )}
              </Popup>
            </Marker>
          );
        })}

        {validPositions.length > 0 && <MapBounds positions={validPositions} />}
      </MapContainer>
    </div>
  );
}
