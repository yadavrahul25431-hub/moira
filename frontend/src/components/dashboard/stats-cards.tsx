"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Route, Droplets, Clock } from "lucide-react";

const stats = [
  {
    title: "Today's Trips",
    value: "142",
    trend: "+12.5%",
    trendUp: true,
    icon: Route,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Active Vehicles",
    value: "428",
    trend: "+5.1%",
    trendUp: true,
    icon: Car,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    title: "Route Efficiency Score",
    value: "94.5",
    trend: "+2.1",
    trendUp: true,
    icon: Droplets, // Could change icon if we import Activity or Percent
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Avg Delivery Time",
    value: "4h 12m",
    trend: "-12m",
    trendUp: true, // down is good for time
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-full ${stat.bg} flex items-center justify-center`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.trendUp ? "text-emerald-500" : "text-destructive"}>
                  {stat.trend}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
