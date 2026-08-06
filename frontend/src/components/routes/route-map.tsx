"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Leaflet CSS needs to be imported globally or here for it to render correctly
import "leaflet/dist/leaflet.css";

// Fix default icons in Next.js/Leaflet
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface RouteMapProps {
  routePolyline: [number, number][] | null;
  source: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  incidentActive?: boolean;
}

// Component to handle auto-fitting bounds when route changes
function MapBounds({ polyline }: { polyline: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (polyline && polyline.length > 0) {
      const bounds = L.latLngBounds(polyline);
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  }, [map, polyline]);

  return null;
}

const createEmojiIcon = (emoji: string, bg: string) => L.divIcon({
  html: `<div style="background-color: ${bg}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; color: white;">${emoji}</div>`,
  className: "custom-emoji-icon border-none bg-transparent",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14]
});

const icons = {
  warehouse: createEmojiIcon("🏢", "#3b82f6"), // Blue
  charging: createEmojiIcon("⚡", "#10b981"),  // Green
  toll: createEmojiIcon("💰", "#8b5cf6"),      // Purple
  fuel: createEmojiIcon("⛽", "#f59e0b"),      // Orange
  traffic: createEmojiIcon("⚠️", "#ef4444")     // Red
};

const MOCK_MARKERS = [
  { type: "warehouse", pos: [17.45, 78.50], label: "Hyderabad Central Hub" },
  { type: "charging", pos: [14.68, 77.60], label: "Anantapur EV Station" },
  { type: "toll", pos: [15.82, 78.03], label: "Kurnool Toll Plaza" },
  { type: "fuel", pos: [13.08, 80.27], label: "Chennai Fuel Station" },
  { type: "traffic", pos: [12.97, 77.59], label: "Bengaluru Heavy Traffic" },
  { type: "warehouse", pos: [19.07, 72.87], label: "Mumbai West Hub" },
  { type: "charging", pos: [28.70, 77.10], label: "Delhi Supercharger" },
  { type: "toll", pos: [18.52, 73.85], label: "Pune Expressway Toll" },
  { type: "fuel", pos: [23.02, 72.57], label: "Ahmedabad Highway Fuel" },
  { type: "warehouse", pos: [22.57, 88.36], label: "Kolkata East Hub" },
];

export default function RouteMap({ routePolyline, source, destination, incidentActive }: RouteMapProps) {
  // Default center (India) if no route
  const defaultCenter: [number, number] = [20.5937, 78.9629];
  const defaultZoom = 5;

  // Determine incident location
  const incidentPoint = incidentActive && routePolyline && routePolyline.length > 0 
    ? routePolyline[Math.floor(routePolyline.length / 2)] 
    : null;

  return (
    <div className="h-full w-full relative z-0 rounded-xl overflow-hidden border border-border/50">
      <MapContainer 
        center={source ? [source.lat, source.lng] : defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: "100%", width: "100%", background: "#1a1b26" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {source && (
          <Marker position={[source.lat, source.lng]}>
            <Popup>Origin</Popup>
          </Marker>
        )}
        
        {destination && (
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {/* Infrastructure Markers */}
        {MOCK_MARKERS.map((marker, i) => (
          <Marker 
            key={i} 
            position={marker.pos as [number, number]} 
            icon={icons[marker.type as keyof typeof icons]}
          >
            <Popup className="font-semibold">{marker.label}</Popup>
          </Marker>
        ))}

        {/* Dynamic Incident Marker */}
        {incidentPoint && (
          <Marker 
            position={incidentPoint as [number, number]} 
            icon={icons.traffic}
          >
            <Popup className="font-semibold text-destructive">Dynamic Incident Simulated</Popup>
          </Marker>
        )}

        {routePolyline && routePolyline.length > 0 && (
          <>
            <Polyline 
              positions={routePolyline} 
              pathOptions={{ 
                color: incidentActive ? "#ef4444" : "#8b5cf6", // Red if incident, otherwise Violet primary
                weight: 5,
                opacity: 0.8,
                lineCap: "round",
                lineJoin: "round",
                dashArray: "10, 15",
                dashOffset: "0"
              }} 
            />
            {/* Inner glow line for aesthetics */}
            <Polyline 
              positions={routePolyline} 
              pathOptions={{ 
                color: incidentActive ? "#fca5a5" : "#c4b5fd", // Light red or Light violet
                weight: 2,
                opacity: 1,
              }} 
            />
            <MapBounds polyline={routePolyline} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
