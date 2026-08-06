"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Zap } from "lucide-react";

interface SmartCommuteFormProps {
  onSimulate: (params: any) => void;
  isLoading: boolean;
}

const INDIAN_CITIES = [
  "Hyderabad", "Bengaluru", "Chennai", "Mumbai", "Delhi"
];

export function SmartCommuteForm({ onSimulate, isLoading }: SmartCommuteFormProps) {
  const [source, setSource] = useState("Hyderabad");
  const [destination, setDestination] = useState("Bengaluru");
  const [departureTime, setDepartureTime] = useState("08:30");
  const [priority, setPriority] = useState("shortest time");
  const [method, setMethod] = useState("electric vehicle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSimulate({ source, destination, departureTime, priority, method });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <Label>Source Location</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {INDIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <Label>Destination Location</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {INDIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
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

        <div className="space-y-3">
          <Label>Travel Priority</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="shortest time">Shortest Time</option>
            <option value="lowest cost">Lowest Cost</option>
            <option value="lowest fuel consumption">Lowest Fuel Consumption</option>
            <option value="lowest carbon footprint">Lowest Carbon Footprint</option>
          </select>
        </div>

        <div className="space-y-3">
          <Label>Preferred Travel Method</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="metro">Metro</option>
            <option value="bus">Bus</option>
            <option value="cab">Cab</option>
            <option value="bike">Bike</option>
            <option value="electric vehicle">Electric Vehicle</option>
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
          <Zap className="mr-2 h-4 w-4" />
        )}
        {isLoading ? "Generating AI Commute Plan..." : "Generate AI Commute"}
      </Button>
    </form>
  );
}
