"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Battery, BatteryCharging, Zap, MapPin, Activity, ShieldAlert, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const chargers = [
  { id: 1, name: "Hyderabad Central EV Hub", distance: "2.4 km", available: 4, type: "DC Fast (150kW)", cost: "₹18/kWh" },
  { id: 2, name: "Secunderabad Supercharger", distance: "5.1 km", available: 1, type: "DC Fast (150kW)", cost: "₹20/kWh" },
  { id: 3, name: "Gachibowli Tech Park Charge", distance: "8.7 km", available: 6, type: "AC (22kW)", cost: "₹12/kWh" },
];

export default function EVDashboardPage() {
  return (
    <div className="flex-1 space-y-6 flex flex-col min-h-0">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">EV Intelligence</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor battery health, find charging stations, and optimize EV routing.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 shrink-0">
        <Card className="bg-gradient-to-br from-card to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Avg Battery</CardTitle>
            <Battery className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="h-2 mt-3 bg-emerald-500/20" indicatorColor="bg-emerald-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-blue-500/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Battery Health Score</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.4</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              Optimal operating condition
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-amber-500/5 border-amber-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicles Charging</CardTitle>
            <BatteryCharging className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              Est. completion: 45 mins
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-destructive/5 border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-destructive flex items-center mt-1">
              Vehicles below 15% charge
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 flex-1 min-h-0">
        <Card className="lg:col-span-2 overflow-y-auto custom-scrollbar">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> Nearest Charging Stations
            </CardTitle>
            <CardDescription>AI-recommended stations based on current fleet locations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chargers.map((station) => (
                <div key={station.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background hover:border-primary/30 transition-colors group cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{station.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {station.distance} away • {station.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-500 text-sm">{station.available} Available</p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">{station.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20 flex flex-col justify-center items-center text-center p-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Zap className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <h3 className="text-xl font-bold mb-2">Smart Charging Plan</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            RASMUS AI recommends delaying charging for 18 non-critical vehicles until off-peak hours (11:00 PM), saving an estimated ₹4,200 tonight.
          </p>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
            Apply Smart Schedule <ArrowRight className="h-4 w-4" />
          </button>
        </Card>
      </div>
    </div>
  );
}
