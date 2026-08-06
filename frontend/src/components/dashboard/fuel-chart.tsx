"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { day: "Mon", fuel: 400, optimized: 240 },
  { day: "Tue", fuel: 300, optimized: 139 },
  { day: "Wed", fuel: 520, optimized: 380 },
  { day: "Thu", fuel: 390, optimized: 290 },
  { day: "Fri", fuel: 480, optimized: 310 },
  { day: "Sat", fuel: 240, optimized: 190 },
  { day: "Sun", fuel: 210, optimized: 140 },
];

export function FuelChart() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Fuel Consumption</CardTitle>
        <CardDescription>
          Daily fuel usage vs. AI-optimized savings (Liters)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip 
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="fuel" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Actual Usage" />
              <Bar dataKey="optimized" fill="#10b981" radius={[4, 4, 0, 0]} name="Saved via AI" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
