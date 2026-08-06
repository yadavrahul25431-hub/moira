import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Cloud, Wind } from "lucide-react";

const weatherData = [
  { city: "Hyderabad", temp: "28°C", cond: "Partly Cloudy", icon: Cloud },
  { city: "Bengaluru", temp: "24°C", cond: "Light Rain", icon: CloudRain },
  { city: "Chennai", temp: "32°C", cond: "Sunny", icon: Sun },
  { city: "Mumbai", temp: "30°C", cond: "Windy", icon: Wind },
];

export function WeatherWidget() {
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Regional Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weatherData.map((data, idx) => {
            const Icon = data.icon;
            return (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-background border border-border/50 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{data.city}</p>
                    <p className="text-xs text-muted-foreground">{data.cond}</p>
                  </div>
                </div>
                <div className="text-sm font-bold">{data.temp}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
