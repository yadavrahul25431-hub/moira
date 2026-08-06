"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Car,
  Wrench,
  AlertTriangle,
  Activity,
  Zap,
  Leaf,
  Droplets,
  Cpu,
  Bot,
  UserCheck,
  ShieldAlert,
  Battery,
  Gauge,
  Thermometer,
} from "lucide-react";

// Dynamic map to avoid SSR issues
const DynamicVehicleMap = dynamic(
  () => import("@/components/vehicles/vehicle-map"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-card/40 animate-pulse rounded-2xl flex items-center justify-center border border-white/5">
        <span className="text-primary text-sm flex items-center gap-2">
          <Cpu className="h-4 w-4 animate-spin" />
          Initializing Geo-Spatial Engine...
        </span>
      </div>
    )
  }
);

// 1. Realistic Indian Vehicle Data
const mockVehicles = [
  { id: "v1", registrationNo: "MH-01-EV-4521", name: "Electric Bus - Route 4B", status: "ACTIVE", currentLat: 19.0760, currentLng: 72.8777, currentSpeed: 42, fuelLevel: 78, type: "Electric buses", driver: "Rajesh K.", fatigueScore: 92, maintenance: "Good" },
  { id: "v2", registrationNo: "KA-51-DV-8820", name: "Delivery Van - Koramangala", status: "ACTIVE", currentLat: 12.9716, currentLng: 77.5946, currentSpeed: 28, fuelLevel: 45, type: "Delivery vans", driver: "Suresh M.", fatigueScore: 85, maintenance: "Requires Service" },
  { id: "v3", registrationNo: "TS-09-TR-1102", name: "Heavy Truck - ORR", status: "IDLE", currentLat: 17.3850, currentLng: 78.4867, currentSpeed: 0, fuelLevel: 82, type: "Trucks", driver: "Prakash V.", fatigueScore: 98, maintenance: "Good" },
  { id: "v4", registrationNo: "TN-02-TW-9934", name: "Logistics 2-Wheeler", status: "ACTIVE", currentLat: 13.0827, currentLng: 80.2707, currentSpeed: 45, fuelLevel: 60, type: "Two-wheelers", driver: "Arun T.", fatigueScore: 88, maintenance: "Good" },
  { id: "v5", registrationNo: "DL-01-EV-0045", name: "Electric Bus - Ring Road", status: "MAINTENANCE", currentLat: 28.7041, currentLng: 77.1025, currentSpeed: 0, fuelLevel: 15, type: "Electric buses", driver: "Amit S.", fatigueScore: 100, maintenance: "Critical - Battery" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function AIFleetCommandCenter() {
  const [vehicles] = useState(mockVehicles);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const activeCount = vehicles.filter(v => v.status === "ACTIVE").length;
  const avgFuel = Math.round(vehicles.reduce((acc, v) => acc + v.fuelLevel, 0) / vehicles.length);

  if (!mounted) return null;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 space-y-6 h-full flex flex-col max-w-[1600px] mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-[800] tracking-tight font-heading uppercase text-foreground">
            AI Fleet Command Center
          </h2>
          <p className="text-muted-foreground mt-1 text-sm font-subheading">
            Live telemetry, predictive maintenance, and RASMUS AI diagnostics.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 glass px-4 py-2 rounded-full border border-primary/30 shadow-[0_0_15px_rgba(79,140,255,0.15)]">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-emerald-400 font-mono tracking-wider">SYSTEM OPTIMAL</span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* LEFT COLUMN: Map & Core Telemetry */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
          
          {/* Top KPI Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 shrink-0">
            <motion.div variants={itemVariants} className="card-gradient glass rounded-2xl p-4 border-gradient relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-muted-foreground">Total Fleet</span>
                <Car className="h-4 w-4 text-primary" />
              </div>
              <div className="text-3xl font-bold font-mono text-white">{vehicles.length}</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card-gradient glass rounded-2xl p-4 border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-muted-foreground">Active Units</span>
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold font-mono text-emerald-400">{activeCount}</div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-gradient glass rounded-2xl p-4 border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-muted-foreground">Energy Reserve</span>
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-3xl font-bold font-mono text-amber-400">{avgFuel}%</div>
            </motion.div>

            {/* Carbon Emissions Tracker */}
            <motion.div variants={itemVariants} className="bg-emerald-950/30 rounded-2xl p-4 border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />
              <div className="relative z-10 flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-emerald-300">CO2 Saved</span>
                <Leaf className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="relative z-10 text-3xl font-bold font-mono text-emerald-400 tracking-tighter">
                4.2<span className="text-lg">T</span>
              </div>
            </motion.div>
          </div>

          {/* 1. Live Fleet Tracking Map */}
          <motion.div variants={itemVariants} className="flex-1 bg-card rounded-2xl border border-white/10 shadow-2xl relative min-h-[350px] overflow-hidden group">
            <div className="absolute inset-0 -m-1 rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-0" />
            <DynamicVehicleMap vehicles={vehicles} />
            <div className="absolute top-4 left-4 z-[1000] glass px-3 py-2 rounded-lg border border-white/10 shadow-lg pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-primary tracking-widest block mb-1">M-CORE SAT-LINK</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-white">Live Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* 3. Vehicle Telemetry & 5. Fuel Analytics */}
          <div className="grid sm:grid-cols-2 gap-6 shrink-0">
            <motion.div variants={itemVariants} className="glass rounded-2xl p-5 border border-white/5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Gauge className="h-4 w-4 text-primary" /> Live Telemetry Overview
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Avg Fleet Speed", val: "38 km/h", progress: 40 },
                  { label: "Motor Temps", val: "72°C", progress: 65, alert: true },
                  { label: "Tyre Pressure", val: "Optimal", progress: 90 },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className={stat.alert ? "text-amber-400 font-bold" : "text-foreground font-mono"}>{stat.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: \`\${stat.progress}%\` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={\`h-full rounded-full \${stat.alert ? 'bg-amber-400' : 'button-gradient'}\`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass rounded-2xl p-5 border border-white/5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Droplets className="h-4 w-4 text-accent" /> Efficiency Analytics
              </h3>
              <div className="flex items-end gap-3 h-[110px] mt-4">
                {[45, 60, 35, 80, 50, 95, 75].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: \`\${h}%\` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-primary/80 to-accent/80 rounded-t-sm group-hover:from-primary group-hover:to-accent transition-colors relative"
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        {h}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-1">
                <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI & Operational Modules */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          
          {/* 2. AI Diagnostics Engine (RASMUS AI) */}
          <motion.div variants={itemVariants} className="glass rounded-2xl p-5 border border-primary/20 shadow-[0_0_20px_rgba(79,140,255,0.1)] relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Bot className="h-24 w-24" />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-4">
                <Bot className="h-4 w-4" /> RASMUS AI Engine
              </h3>
              <div className="bg-background/60 rounded-xl p-3 border border-white/5 mb-3 text-xs leading-relaxed">
                <span className="text-accent font-bold">Analysis complete:</span> Detected heavy congestion on ORR (Bengaluru). Rerouting Delivery Van (KA-51-DV-8820) via alternate path to save 14 mins.
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask RASMUS..." 
                  className="flex-1 bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary/50 text-white"
                  disabled
                />
                <button className="button-gradient rounded-lg px-3 py-2 text-xs font-bold text-white shadow-lg">
                  Send
                </button>
              </div>
            </div>
          </motion.div>

          {/* 6. Maintenance Prediction System */}
          <motion.div variants={itemVariants} className="glass rounded-2xl p-5 border border-white/5 flex-shrink-0">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-amber-400" /> Maintenance Predictions
            </h3>
            <div className="space-y-3">
              {vehicles.filter(v => v.status === "MAINTENANCE" || v.maintenance !== "Good").map((v) => (
                <div key={v.id} className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-amber-400">{v.registrationNo}</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded uppercase">Urgent</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{v.maintenance}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 8. Driver Information System */}
          <motion.div variants={itemVariants} className="glass rounded-2xl p-5 border border-white/5 flex-1 min-h-0 flex flex-col">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 shrink-0">
              <UserCheck className="h-4 w-4 text-secondary" /> Active Drivers
            </h3>
            <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 space-y-3">
              {vehicles.map((v) => (
                <div key={v.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center border border-white/10">
                      <span className="text-xs font-bold text-white">{v.driver.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">{v.driver}</div>
                      <div className="text-[10px] text-muted-foreground">{v.registrationNo}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground mb-0.5">Readiness</div>
                    <div className={\`text-xs font-mono font-bold \${v.fatigueScore > 90 ? 'text-emerald-400' : 'text-amber-400'}\`}>
                      {v.fatigueScore}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 7. Alert Center */}
          <motion.div variants={itemVariants} className="glass rounded-2xl p-4 border border-rose-500/20 flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-rose-500/5 animate-pulse" />
            <div className="relative z-10 flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-rose-500 animate-bounce" />
              <div>
                <p className="text-xs font-bold text-rose-400 uppercase tracking-wide">Live Alerts</p>
                <div className="h-[18px] overflow-hidden mt-0.5 relative">
                  <motion.div
                    animate={{ y: [0, -20, -40, -60, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col text-[11px] text-muted-foreground"
                  >
                    <span className="h-[20px] flex items-center">Weather warning: Heavy rain in Mumbai</span>
                    <span className="h-[20px] flex items-center text-amber-400">Traffic anomaly detected in Delhi</span>
                    <span className="h-[20px] flex items-center text-emerald-400">System update successfully deployed</span>
                    <span className="h-[20px] flex items-center">Weather warning: Heavy rain in Mumbai</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
