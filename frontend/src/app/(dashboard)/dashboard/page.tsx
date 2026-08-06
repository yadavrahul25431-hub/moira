import { StatsCards } from "@/components/dashboard/stats-cards";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { FuelChart } from "@/components/dashboard/fuel-chart";
import { DeliveryChart } from "@/components/dashboard/delivery-chart";
import { ActiveVehicles } from "@/components/dashboard/active-vehicles";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import { RouteSummary } from "@/components/dashboard/route-summary";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { AIRecommendations } from "@/components/dashboard/ai-recommendations";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Fleet Overview</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground bg-background border px-3 py-1.5 rounded-md">
            Last 24 Hours
          </span>
        </div>
      </div>
      
      {/* 4 Stats Cards */}
      <StatsCards />
      
      {/* Traffic & Route Summary Grid */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-8">
        <div className="lg:col-span-4">
          <TrafficChart />
        </div>
        <div className="lg:col-span-4">
          <RouteSummary />
        </div>
      </div>
      
      {/* Analytics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <FuelChart />
        <DeliveryChart />
      </div>

      {/* Smart Features Grid */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <WeatherWidget />
        <AIRecommendations />
      </div>
      
      {/* Fleet Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <ActiveVehicles />
        <NotificationsPanel />
      </div>
    </div>
  );
}
