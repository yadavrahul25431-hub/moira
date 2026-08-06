import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CloudRain, Sun, Wind, MapPin } from "lucide-react";

const predictions = [
  {
    location: "Bengaluru, Silk Board",
    density: 85,
    level: "severe",
    delay: "35m",
    road: "Waterlogged",
    weather: "Heavy Rain",
    icon: CloudRain
  },
  {
    location: "Mumbai, Andheri East",
    density: 70,
    level: "high",
    delay: "20m",
    road: "Construction",
    weather: "Windy",
    icon: Wind
  },
  {
    location: "Delhi, Connaught Place",
    density: 45,
    level: "medium",
    delay: "5m",
    road: "Clear",
    weather: "Sunny",
    icon: Sun
  }
];

export function AITrafficPrediction() {
  return (
    <Card className="col-span-1 lg:col-span-1 border-amber-500/20 bg-gradient-to-b from-card to-amber-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          AI Traffic Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((p, i) => {
            const WeatherIcon = p.icon;
            return (
              <div key={i} className="p-3 rounded-lg bg-background border border-border/50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {p.location}
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    p.level === 'severe' ? 'bg-destructive/20 text-destructive' :
                    p.level === 'high' ? 'bg-amber-500/20 text-amber-500' :
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    {p.level}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Expected Delay</p>
                    <p className="text-sm font-bold text-destructive">{p.delay}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Density</p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${p.density}%` }} />
                      </div>
                      <span className="text-xs font-bold">{p.density}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <WeatherIcon className="h-3.5 w-3.5" /> {p.weather}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    • Road: {p.road}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
