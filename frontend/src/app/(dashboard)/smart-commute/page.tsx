"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SmartCommuteForm } from "@/components/smart-commute/smart-commute-form";
import { CommuteResults } from "@/components/smart-commute/commute-results";

// Formula Engine
function generateAICommute(params: any) {
  // Base distances based on Indian city topology (rough estimate)
  const baseDistance = Math.floor(Math.random() * 40) + 10; // 10 to 50 km
  
  // Real-time Traffic simulation (speed)
  const speed = Math.floor(Math.random() * 25) + 15; // 15 to 40 km/h
  
  // Mileage depends on vehicle type
  let mileage = 15;
  if (params.method === "bike") mileage = 45;
  else if (params.method === "electric vehicle") mileage = 8; // kWh per km inverted basically
  else if (params.method === "metro") mileage = 100; // arbitrary high efficiency

  // Live Fuel Price (simulated INR)
  const fuelPrice = 102; 

  // Formulas
  // ETA = distance / speed (hours) * 60 (mins)
  const etaMins = Math.round((baseDistance / speed) * 60);
  
  // Fuel used = distance / mileage
  const fuelUsed = (baseDistance / mileage).toFixed(1);
  
  // Fuel cost = fuel used * fuel price
  const fuelCost = Math.round(Number(fuelUsed) * fuelPrice);
  
  // Carbon emission = fuel used * 2.3
  let carbonEmission = (Number(fuelUsed) * 2.3).toFixed(1);
  if (params.method === "electric vehicle" || params.method === "metro") {
    carbonEmission = "0.0"; // EVs have zero tailpipe emissions
  }

  // Congestion score = traffic density / max capacity * 100
  const maxCapacity = 150;
  const trafficDensity = Math.floor(Math.random() * 100) + 50; // 50 to 150
  const trafficScore = Math.round((trafficDensity / maxCapacity) * 100);

  // Weather impact score
  const weatherScore = Math.floor(Math.random() * 40) + 10; // 10 to 50 impact
  
  // Route efficiency score
  const routeScore = Math.round(100 - (trafficScore * 0.5) - (weatherScore * 0.2));

  return {
    eta: etaMins,
    fuelUsed: params.method === "electric vehicle" ? `${fuelUsed}kWh` : fuelUsed,
    fuelCost: params.method === "electric vehicle" ? Math.round(Number(fuelUsed) * 8) : fuelCost, // EV electricity cost
    carbonEmission: carbonEmission,
    trafficScore: trafficScore,
    weatherScore: weatherScore,
    routeScore: routeScore > 100 ? 100 : routeScore < 0 ? 0 : routeScore,
    recommendedMode: params.method.toUpperCase(),
  };
}

export default function SmartCommutePage() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const activeParams = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSimulation = (params: any) => {
    const freshData = generateAICommute(params);
    setResults(freshData);
  };

  const handleSimulate = (params: any) => {
    setIsLoading(true);
    activeParams.current = params;
    
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setTimeout(() => {
      triggerSimulation(params);
      setIsLoading(false);
      
      // Refresh data every 30 seconds
      intervalRef.current = setInterval(() => {
        triggerSimulation(activeParams.current);
      }, 30000);
      
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex-1 space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-[800] tracking-tight font-heading uppercase text-foreground">
            Smart Commute Engine
          </h2>
          <p className="text-muted-foreground mt-1 text-sm font-subheading">
            Live AI-powered urban mobility routing with real-time variable recalculation.
          </p>
        </div>
        {results && (
          <div className="hidden sm:flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/30">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 font-mono tracking-wider">AUTO-REFRESHING (30s)</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Form */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <Card className="shrink-0 border-white/5 glass shadow-[0_0_15px_rgba(79,140,255,0.05)]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Plan Your Commute</CardTitle>
              <CardDescription>Enter details to initialize AI routing.</CardDescription>
            </CardHeader>
            <CardContent>
              <SmartCommuteForm onSimulate={handleSimulate} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <CommuteResults results={results} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
