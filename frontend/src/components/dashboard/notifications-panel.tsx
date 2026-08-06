import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const notifications = [
  {
    id: 1,
    title: "Route Optimized",
    desc: "AI rerouted MH-12-PQ-9012 avoiding Pune Expressway closure.",
    time: "2m ago",
    type: "success",
    color: "text-emerald-500",
  },
  {
    id: 2,
    title: "Traffic Alert",
    desc: "Heavy monsoon congestion predicted in Mumbai (Andheri) in 45m.",
    time: "15m ago",
    type: "warning",
    color: "text-amber-500",
  },
  {
    id: 3,
    title: "Maintenance Due",
    desc: "KA-01-HC-1234 requires scheduled brake inspection.",
    time: "1h ago",
    type: "info",
    color: "text-blue-500",
  },
  {
    id: 4,
    title: "Critical Delay",
    desc: "DL-14-CC-0084 delayed by 30m due to engine temp warning in Delhi NCR.",
    time: "2h ago",
    type: "critical",
    color: "text-destructive",
  },
];

export function NotificationsPanel() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>AI Insights &amp; Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {notifications.map((note) => {
            return (
              <div key={note.id} className="flex gap-4">
                <div className={`mt-0.5 h-2 w-2 rounded-full ${note.color} bg-current ring-4 ring-current/20 shrink-0`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{note.title}</p>
                    <span className="text-xs text-muted-foreground">{note.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{note.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
