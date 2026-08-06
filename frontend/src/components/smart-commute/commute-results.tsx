import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Banknote, AlertTriangle, Leaf, Zap, Train } from "lucide-react";

export function CommuteResults({ results, isLoading }: { results: any, isLoading: boolean }) {
  if (isLoading) {
    return (
      <Card className="h-full border-border/50 bg-card flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 opacity-70">
          <Zap className="h-10 w-10 animate-pulse text-primary" />
          <p className="text-sm font-medium">Running AI models for best commute...</p>
        </div>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="h-full border-border/50 bg-card flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 opacity-50">
          <Train className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium">Generate a commute plan to see AI insights.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <Card className="border-border/50 bg-card overflow-hidden">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-primary">
            AI Recommended Method
          </CardTitle>
          <div className="text-3xl font-black text-foreground mt-2">
            {results.recommendedMode}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Est. Travel Time
              </p>
              <p className="text-2xl font-bold">{results.estimatedTime}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Banknote className="h-3 w-3" /> Est. Cost
              </p>
              <p className="text-2xl font-bold">{results.estimatedCost}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 flex flex-col gap-1 items-center justify-center text-center">
            <AlertTriangle className="h-4 w-4 text-amber-500 mb-1" />
            <span className="text-2xl font-bold text-amber-500">{results.trafficScore}</span>
            <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Traffic Score</span>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 flex flex-col gap-1 items-center justify-center text-center">
            <Leaf className="h-4 w-4 text-emerald-500 mb-1" />
            <span className="text-2xl font-bold text-emerald-500">{results.carbonFootprintScore}</span>
            <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Eco Score</span>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 flex flex-col gap-1 items-center justify-center text-center">
            <Zap className="h-4 w-4 text-blue-500 mb-1" />
            <span className="text-2xl font-bold text-blue-500">{results.routeScore}</span>
            <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Overall Route</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
