import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const vehicles = [
  { id: "V-1042", driver: "Alex Chen", status: "Active", route: "Route 4A (Downtown)", eta: "12m" },
  { id: "V-2931", driver: "Sarah Miller", status: "Active", route: "Route 7B (Northside)", eta: "45m" },
  { id: "V-0084", driver: "James Wilson", status: "Delayed", route: "Route 2C (West Port)", eta: "1h 15m" },
  { id: "V-4492", driver: "Maria Garcia", status: "Active", route: "Route 9A (Airport)", eta: "28m" },
  { id: "V-1105", driver: "David Kim", status: "Maintenance", route: "N/A", eta: "N/A" },
];

export function ActiveVehicles() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Active Fleet Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">
                  {vehicle.id.split('-')[1].substring(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium">{vehicle.id} - {vehicle.driver}</p>
                  <p className="text-xs text-muted-foreground">{vehicle.route}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold
                  ${vehicle.status === 'Active' ? 'bg-emerald-500/15 text-emerald-500' : 
                    vehicle.status === 'Delayed' ? 'bg-amber-500/15 text-amber-500' : 
                    'bg-destructive/15 text-destructive'}
                `}>
                  {vehicle.status}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  ETA: {vehicle.eta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
