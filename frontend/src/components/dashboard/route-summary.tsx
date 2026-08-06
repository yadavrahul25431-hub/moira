import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navigation2, MapPin, Clock, ArrowRight } from "lucide-react";

const routes = [
  { id: "RT-109", origin: "Hyderabad Hub", dest: "Bengaluru West", status: "In Progress", distance: "575 km", duration: "8h 45m", efficiency: 98 },
  { id: "RT-110", origin: "Mumbai Port", dest: "Pune Central", status: "Pending", distance: "150 km", duration: "3h 10m", efficiency: 95 },
  { id: "RT-111", origin: "Delhi Depot", dest: "Ahmedabad Hub", status: "Completed", distance: "940 km", duration: "14h 20m", efficiency: 92 },
];

export function RouteSummary() {
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Route Execution Summary</CardTitle>
          <CardDescription>Real-time status of AI-optimized active routes</CardDescription>
        </div>
        <button className="text-sm text-primary flex items-center hover:underline">
          View all routes <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {routes.map((route) => (
            <div key={route.id} className="relative overflow-hidden rounded-xl border bg-background p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold">{route.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  route.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                  route.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {route.status}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-sm mb-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="w-px h-6 bg-border" />
                  <div className="h-2 w-2 rounded-full border-2 border-primary" />
                </div>
                <div className="flex flex-col gap-3 flex-1 overflow-hidden">
                  <span className="truncate">{route.origin}</span>
                  <span className="truncate">{route.dest}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Dist</span>
                  <span className="text-sm font-medium">{route.distance}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Time</span>
                  <span className="text-sm font-medium">{route.duration}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Navigation2 className="h-3 w-3" /> AI Eff.</span>
                  <span className="text-sm font-medium text-emerald-500">{route.efficiency}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
