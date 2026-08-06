"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SmartCommuteForm } from "@/components/smart-commute/smart-commute-form";
import { CommuteResults } from "@/components/smart-commute/commute-results";

export default function SmartCommutePage() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = (params: any) => {
    setIsLoading(true);
    // Simulate AI calculation
    setTimeout(() => {
      setResults({
        estimatedTime: "45 mins",
        estimatedCost: "₹150",
        trafficScore: 82,
        carbonFootprintScore: 95,
        routeScore: 88,
        recommendedMode: "Metro + Electric Bike",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Smart Commute Mode</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            AI-powered intelligent urban mobility and multi-modal routing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Form */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <Card className="shrink-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Plan Your Commute</CardTitle>
              <CardDescription>Enter details to get AI recommendations.</CardDescription>
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
