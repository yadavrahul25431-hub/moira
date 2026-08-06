"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench, AlertCircle, Activity } from "lucide-react";

const DynamicVehicleMap = dynamic(
  () => import("@/components/vehicles/vehicle-map"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-muted/20 animate-pulse rounded-xl border border-border/50 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading map engine...</span>
      </div>
    )
  }
);

// Mock data based on schema/seed
const mockVehicles = [
  { id: "v1", registrationNo: "MM-EV-001", name: "Tesla Model 3 #1", status: "ACTIVE", currentLat: 40.7128, currentLng: -74.0060, currentSpeed: 45, fuelLevel: 82, type: "EV" },
  { id: "v2", registrationNo: "MM-HY-002", name: "Toyota Camry Hybrid", status: "ACTIVE", currentLat: 40.7589, currentLng: -73.9851, currentSpeed: 32, fuelLevel: 67, type: "HYBRID" },
  { id: "v3", registrationNo: "MM-VN-003", name: "Ford Transit #1", status: "IDLE", currentLat: 40.7484, currentLng: -73.9857, currentSpeed: 0, fuelLevel: 55, type: "DIESEL" },
  { id: "v4", registrationNo: "MM-EV-004", name: "Rivian R1T", status: "ACTIVE", currentLat: 40.7306, currentLng: -73.9352, currentSpeed: 28, fuelLevel: 91, type: "EV" },
  { id: "v5", registrationNo: "MM-BUS-005", name: "Mercedes Sprinter", status: "MAINTENANCE", currentLat: null, currentLng: null, currentSpeed: null, fuelLevel: 30, type: "DIESEL" },
];

export default function VehiclesPage() {
  const [vehicles] = useState(mockVehicles);

  const activeCount = vehicles.filter(v => v.status === "ACTIVE").length;
  const maintenanceCount = vehicles.filter(v => v.status === "MAINTENANCE").length;
  const avgFuel = Math.round(vehicles.reduce((acc, v) => acc + v.fuelLevel, 0) / vehicles.length);

  return (
    <div className="flex-1 space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fleet Management</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Live vehicle tracking, fuel status, and dispatch monitoring.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 shrink-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active on Route</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{activeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{maintenanceCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fuel/Charge</CardTitle>
            <AlertCircle className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgFuel}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left: Map */}
        <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-4 relative min-h-[400px]">
          <DynamicVehicleMap vehicles={vehicles} />
          <div className="absolute top-8 left-8 z-[1000] bg-background/80 backdrop-blur-md border border-border/50 rounded-lg p-3 shadow-lg pointer-events-none">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Live Tracking</p>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium">System Online</span>
            </div>
          </div>
        </div>

        {/* Right: Vehicle List */}
        <Card className="flex flex-col h-full overflow-hidden">
          <CardHeader className="shrink-0 pb-4">
            <CardTitle className="text-lg">Fleet Status</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-4">
              {vehicles.map((v) => (
                <div key={v.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium text-sm">{v.name}</div>
                    <div className="text-xs text-muted-foreground">{v.registrationNo} • {v.type}</div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold
                      ${v.status === 'ACTIVE' ? 'bg-emerald-500/15 text-emerald-500' : 
                        v.status === 'MAINTENANCE' ? 'bg-amber-500/15 text-amber-500' : 
                        'bg-muted text-muted-foreground'}
                    `}>
                      {v.status}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {v.currentSpeed !== null ? `${v.currentSpeed} km/h` : 'Offline'}
                    </div>
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
