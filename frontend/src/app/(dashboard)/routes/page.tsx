"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OptimizationForm, OptimizationParams } from "@/components/routes/optimization-form";
import { MetricsPanel, RouteMetrics } from "@/components/routes/metrics-panel";
import { useAuth } from "@/hooks/use-auth";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Clock, Droplets, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import the map component with ssr disabled
const DynamicRouteMap = dynamic(
  () => import("@/components/routes/route-map"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-muted/20 animate-pulse rounded-xl border border-border/50 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading map engine...</span>
      </div>
    )
  }
);

export default function RoutesPage() {
  const { user } = useAuth({ requireAuth: true });
  
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<RouteMetrics | null>(null);
  const [routeData, setRouteData] = useState<{
    polyline: [number, number][];
    source: { lat: number; lng: number };
    destination: { lat: number; lng: number };
  } | null>(null);

  const [isIncidentActive, setIsIncidentActive] = useState(false);

  const handleOptimize = async (params: OptimizationParams) => {
    setIsLoading(true);
    setIsIncidentActive(false); // Reset incident on new route
    try {
      const { data } = await api.post<{
        success: boolean;
        data: RouteMetrics & { routePolyline: [number, number][], sourceCoords: any, destCoords: any };
      }>("/routes/optimize", params);
      
      const result = data.data;

      // Ensure slight delay for UX
      setTimeout(() => {
        setMetrics({
          distanceKm: result.distanceKm,
          travelTime: result.travelTime,
          travelTimeMinutes: result.travelTimeMinutes,
          fuelConsumptionLiters: result.fuelConsumptionLiters,
          fuelCost: result.fuelCost,
          tollCost: result.tollCost,
          routeScore: result.routeScore,
          carbonFootprint: result.carbonFootprint,
          congestionLevel: result.congestionLevel,
        });

        setRouteData({
          polyline: result.routePolyline,
          source: result.sourceCoords,
          destination: result.destCoords,
        });

        setIsLoading(false);
      }, 800);

    } catch (error) {
      console.error("Optimization failed:", error);
      setIsLoading(false);
    }
  };

  const handleSimulateIncident = () => {
    if (!metrics || !routeData) return;
    setIsIncidentActive(true);
    
    // Simulate updating the metrics dynamically
    setMetrics(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        travelTime: "1h 38m", // Just mock replacing with a larger value
        travelTimeMinutes: prev.travelTimeMinutes + 18,
        fuelConsumptionLiters: parseFloat((prev.fuelConsumptionLiters * 1.08).toFixed(1)),
        fuelCost: Math.round(prev.fuelCost * 1.08),
        congestionLevel: "Severe",
        routeScore: Math.max(0, prev.routeScore - 15)
      };
    });
  };

  return (
    <div className="flex-1 space-y-6 h-[calc(100vh-8rem)] flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Route Optimization</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            AI-powered pathfinding for minimum fuel consumption and time.
          </p>
        </div>
        
        {/* Simulate Incident Button */}
        {!isIncidentActive && (
          <Button 
            onClick={handleSimulateIncident}
            variant="destructive"
            className="flex items-center gap-2"
            disabled={!routeData || isLoading}
            title={!routeData ? "Generate a route first to simulate an incident." : ""}
          >
            <AlertTriangle className="h-4 w-4" /> Simulate Incident
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 relative">
        {/* Left Column: Form & Metrics */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <Card className="shrink-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">New Route Request</CardTitle>
            </CardHeader>
            <CardContent>
              <OptimizationForm onOptimize={handleOptimize} isLoading={isLoading} />
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardContent className="p-6 h-full">
              <MetricsPanel metrics={metrics} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Map */}
        <div className="lg:col-span-8 bg-card rounded-xl border shadow-sm p-4 relative min-h-[400px]">
          <DynamicRouteMap 
            routePolyline={routeData?.polyline || null}
            source={routeData?.source || null}
            destination={routeData?.destination || null}
            incidentActive={isIncidentActive}
          />
          
          {/* Overlay Status */}
          <div className="absolute top-8 left-8 z-[1000] bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-3 shadow-lg pointer-events-none">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : isIncidentActive ? 'bg-destructive animate-pulse' : routeData ? 'bg-emerald-500' : 'bg-muted'}`} />
              <span className="text-sm font-medium">
                {isLoading ? "Optimizing..." : isIncidentActive ? "Rerouting Active" : routeData ? "Route Active" : "Standby"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Notification Panel */}
      <AnimatePresence>
        {isIncidentActive && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-8 right-8 z-[2000] w-80 bg-card border-l-4 border-l-destructive shadow-2xl rounded-lg overflow-hidden"
          >
            <div className="p-4 relative">
              <button 
                onClick={() => setIsIncidentActive(false)}
                className="absolute top-2 right-2 p-1 rounded-md text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-2 text-destructive font-bold mb-3">
                <AlertTriangle className="h-5 w-5 animate-pulse" />
                Incident detected
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><MapPin className="h-3 w-3"/> Location</p>
                    <p className="font-semibold">NH-44</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><AlertTriangle className="h-3 w-3"/> Severity</p>
                    <p className="font-semibold text-destructive">High</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm border-t border-border/50 pt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Clock className="h-3 w-3"/> Est. Delay</p>
                    <p className="font-semibold text-amber-500">18 minutes</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Droplets className="h-3 w-3"/> Fuel Inc.</p>
                    <p className="font-semibold text-destructive">8%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/10 border-t border-primary/20 p-3">
              <p className="text-xs text-muted-foreground uppercase mb-1 font-semibold">Recommended Action:</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-emerald-500 flex items-center gap-1.5">
                  <ArrowRight className="h-4 w-4" /> Alternative route selected.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
