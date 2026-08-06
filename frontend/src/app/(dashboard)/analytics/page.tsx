"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { TrendingUp, AlertTriangle, Route, Leaf, Clock, Droplets, Car, Activity } from "lucide-react";

// Updated data for Indian context
const historicalData = [
  { date: "Aug 01", deliveries: 124, fuel: 840, co2: 195.6, trafficDensity: 65 },
  { date: "Aug 02", deliveries: 135, fuel: 910, co2: 210.2, trafficDensity: 72 },
  { date: "Aug 03", deliveries: 110, fuel: 750, co2: 172.8, trafficDensity: 58 },
  { date: "Aug 04", deliveries: 142, fuel: 960, co2: 224.0, trafficDensity: 81 },
  { date: "Aug 05", deliveries: 128, fuel: 860, co2: 198.4, trafficDensity: 68 },
  { date: "Aug 06", deliveries: 156, fuel: 1040, co2: 241.2, trafficDensity: 88 },
];

const delayReports = [
  { id: "REP-01", route: "Hyderabad-Bengaluru", vehicle: "KA-01-HC-1234 (Truck)", delayMin: 45, reason: "Anantapur Toll Congestion", date: "Aug 06" },
  { id: "REP-02", route: "Chennai-Tirupati", vehicle: "TN-22-BY-5678 (Cab)", delayMin: 20, reason: "Heavy Rain & Waterlogging", date: "Aug 06" },
  { id: "REP-03", route: "Mumbai-Pune", vehicle: "MH-12-PQ-9012 (EV Van)", delayMin: 15, reason: "Expressway Traffic", date: "Aug 05" },
];

const routeStats = [
  { route: "Hyderabad -> Kurnool -> Anantapur -> Bengaluru", avgTime: "8h 45m", efficiency: 94 },
  { route: "Delhi -> Ahmedabad", avgTime: "14h 20m", efficiency: 88 },
  { route: "Chennai -> Vijayawada -> Visakhapatnam", avgTime: "12h 10m", efficiency: 92 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-6 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fleet Analytics</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Historical data, predictions, and operational reports across India.
          </p>
        </div>
      </div>

      {/* KPI Trends */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Deliveries</CardTitle>
            <Route className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">795</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +14.2% this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
            <Leaf className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">A+</div>
              <span className="text-xs text-muted-foreground">Score: 92/100</span>
            </div>
            <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Travel Time</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4h 12m</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> -12m from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Consumed (L)</CardTitle>
            <Droplets className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,360</div>
            <p className="text-xs text-destructive flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +2.4% this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Density Analysis</CardTitle>
            <CardDescription>Network-wide congestion index across Indian routes (0-100 scale).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="trafficDensity" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carbon Emission Analysis</CardTitle>
            <CardDescription>Estimated total CO2 footprint (kg).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }} contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="co2" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Major Route Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routeStats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium text-sm">{stat.route}</div>
                    <div className="text-xs text-muted-foreground">Avg Travel Time: {stat.avgTime}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-500">{stat.efficiency}% Eff</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delay Reports & Predictors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {delayReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium text-sm text-destructive">{report.reason}</div>
                    <div className="text-xs text-muted-foreground">{report.route} • {report.vehicle} • {report.date}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-destructive/15 text-destructive">
                      +{report.delayMin} min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
