"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Droplets, Banknote, AlertTriangle, Route, Leaf, Percent } from "lucide-react";

export interface RouteMetrics {
  distanceKm: number;
  travelTime: string;
  travelTimeMinutes: number;
  fuelConsumptionLiters: number;
  fuelCost: number;
  tollCost: number;
  congestionLevel: string;
  routeScore: number;
  carbonFootprint: number;
}

export function MetricsPanel({ metrics }: { metrics: RouteMetrics | null }) {
  if (!metrics) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4 opacity-50">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <Clock className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">No Route Selected</p>
          <p className="text-sm text-muted-foreground">Run an optimization to view AI insights.</p>
        </div>
      </div>
    );
  }

  const congestionColor = 
    metrics.congestionLevel === "Severe" ? "text-destructive" :
    metrics.congestionLevel === "Heavy" ? "text-amber-500" :
    metrics.congestionLevel === "Moderate" ? "text-blue-500" :
    "text-emerald-500";

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        AI Optimization Results
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> ETA
            </span>
            <span className="text-2xl font-bold">{metrics.travelTime}</span>
            <span className="text-xs text-muted-foreground">{metrics.distanceKm} km total</span>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Traffic
            </span>
            <span className={`text-xl font-bold ${congestionColor}`}>
              {metrics.congestionLevel}
            </span>
            <span className="text-xs text-muted-foreground">AI prediction</span>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Banknote className="h-3 w-3" /> Est. Cost
            </span>
            <span className="text-2xl font-bold">₹{metrics.fuelCost + metrics.tollCost}</span>
            <span className="text-xs text-muted-foreground">₹{metrics.fuelCost} fuel + ₹{metrics.tollCost} tolls</span>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Leaf className="h-3 w-3" /> Carbon Footprint
            </span>
            <span className="text-2xl font-bold">{metrics.carbonFootprint}kg</span>
            <span className="text-xs text-muted-foreground">Est. emissions</span>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-primary mb-1 flex items-center gap-2">
            <Route className="h-4 w-4" /> Route Score
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[80%]">
            Based on chosen priority, traffic severity, and cost efficiency.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-emerald-500">{metrics.routeScore}</span>
          <span className="text-[10px] uppercase text-muted-foreground tracking-wider">/ 100</span>
        </div>
      </div>
    </div>
  );
}
