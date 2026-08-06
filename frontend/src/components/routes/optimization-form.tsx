"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Route as RouteIcon } from "lucide-react";

export interface OptimizationParams {
  source: string;
  destination: string;
  vehicleType: string;
  departureTime: string;
  priority: string;
}

interface OptimizationFormProps {
  onOptimize: (params: OptimizationParams) => void;
  isLoading: boolean;
}

const INDIAN_CITIES = [
  "Hyderabad", "Bengaluru", "Chennai", "Mumbai", "Delhi", 
  "Pune", "Kolkata", "Ahmedabad", "Vijayawada", "Visakhapatnam", 
  "Tirupati", "Anantapur"
];

export function OptimizationForm({ onOptimize, isLoading }: OptimizationFormProps) {
  const [source, setSource] = useState("Hyderabad");
  const [destination, setDestination] = useState("Bengaluru");
  const [vehicleType, setVehicleType] = useState("Truck");
  const [departureTime, setDepartureTime] = useState("09:00");
  const [priority, setPriority] = useState("Fastest route");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOptimize({
      source,
      destination,
      vehicleType,
      departureTime,
      priority
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Route Parameters
        </h3>
        
        {/* Source Location */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" /> Source Location
          </Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {INDIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        {/* Destination Location */}
        <div className="space-y-3 pt-2">
          <Label className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full border-2 border-primary bg-background" /> Destination Location
          </Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {INDIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        {/* Vehicle Type & Departure Time */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="space-y-3">
            <Label>Vehicle Type</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="Truck">Truck</option>
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Cab">Cab</option>
              <option value="Bus">Bus</option>
              <option value="Electric vehicle">Electric vehicle</option>
            </select>
          </div>
          <div className="space-y-3">
            <Label>Departure Time</Label>
            <Input 
              type="time" 
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-3 pt-2">
          <Label>Optimization Priority</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Fastest route">Fastest route</option>
            <option value="Lowest fuel consumption">Lowest fuel consumption</option>
            <option value="Lowest toll cost">Lowest toll cost</option>
            <option value="Lowest carbon emission">Lowest carbon emission</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_100%] transition-all hover:bg-right hover:shadow-lg hover:shadow-blue-500/20"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <RouteIcon className="mr-2 h-4 w-4" />
        )}
        {isLoading ? "Running AI Optimization..." : "Optimize Route"}
      </Button>
    </form>
  );
}
