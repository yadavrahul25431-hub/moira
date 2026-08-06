import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Banknote, AlertTriangle, Leaf, Zap, Train, Droplets, CloudRain } from "lucide-react";

export function CommuteResults({ results, isLoading }: { results: any, isLoading: boolean }) {
  if (isLoading) {
    return (
      <Card className="h-full border-white/10 glass flex items-center justify-center rounded-2xl">
        <div className="flex flex-col items-center gap-4 opacity-70">
          <Zap className="h-10 w-10 animate-pulse text-primary drop-shadow-[0_0_10px_rgba(79,140,255,0.8)]" />
          <p className="text-sm font-medium text-foreground">Running AI spatial models...</p>
        </div>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="h-full border-white/5 glass flex items-center justify-center rounded-2xl">
        <div className="flex flex-col items-center gap-4 opacity-50">
          <Train className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Generate a commute plan to see live AI insights.</p>
        </div>
      </Card>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 h-full flex flex-col">
      {/* Top Banner */}
      <motion.div variants={item}>
        <Card className="border-gradient glass overflow-hidden rounded-2xl relative shadow-[0_0_20px_rgba(79,140,255,0.1)]">
          <div className="absolute inset-0 bg-primary/5 blur-xl pointer-events-none" />
          <CardHeader className="pb-4 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary flex justify-between items-center">
              <span>AI Recommended Method</span>
              <span className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE
              </span>
            </CardTitle>
            <div className="text-3xl font-black text-foreground mt-2 font-heading tracking-tight">
              {results.recommendedMode}
            </div>
          </CardHeader>
          <CardContent className="pt-2 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono uppercase tracking-wider">
                  <Clock className="h-3 w-3 text-accent" /> Est. ETA
                </p>
                <motion.p 
                  key={results.eta}
                  initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold font-mono text-foreground"
                >
                  {results.eta} <span className="text-base text-muted-foreground">mins</span>
                </motion.p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono uppercase tracking-wider">
                  <Banknote className="h-3 w-3 text-emerald-400" /> Fuel Cost
                </p>
                <motion.p 
                  key={results.fuelCost}
                  initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold font-mono text-foreground"
                >
                  ₹{results.fuelCost}
                </motion.p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={container} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fuel Used */}
        <motion.div variants={item} className="card-gradient rounded-2xl p-4 border border-white/5 flex flex-col justify-center items-center text-center">
          <Droplets className="h-5 w-5 text-blue-400 mb-2" />
          <motion.span key={results.fuelUsed} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-2xl font-bold font-mono text-foreground">
            {results.fuelUsed}L
          </motion.span>
          <span className="text-[10px] uppercase text-muted-foreground tracking-wider mt-1">Consumption</span>
        </motion.div>

        {/* Carbon */}
        <motion.div variants={item} className="card-gradient rounded-2xl p-4 border border-white/5 flex flex-col justify-center items-center text-center">
          <Leaf className="h-5 w-5 text-emerald-500 mb-2" />
          <motion.span key={results.carbonEmission} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-2xl font-bold font-mono text-emerald-400">
            {results.carbonEmission}kg
          </motion.span>
          <span className="text-[10px] uppercase text-muted-foreground tracking-wider mt-1">CO2 Emission</span>
        </motion.div>

        {/* Congestion */}
        <motion.div variants={item} className="card-gradient rounded-2xl p-4 border border-white/5 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className={`absolute bottom-0 left-0 h-1 w-full ${results.trafficScore > 80 ? 'bg-rose-500' : 'bg-amber-500'}`} />
          <AlertTriangle className={`h-5 w-5 mb-2 ${results.trafficScore > 80 ? 'text-rose-500 animate-pulse' : 'text-amber-500'}`} />
          <motion.span key={results.trafficScore} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className={`text-2xl font-bold font-mono ${results.trafficScore > 80 ? 'text-rose-400' : 'text-amber-400'}`}>
            {results.trafficScore}
          </motion.span>
          <span className="text-[10px] uppercase text-muted-foreground tracking-wider mt-1">Congestion</span>
        </motion.div>

        {/* Weather */}
        <motion.div variants={item} className="card-gradient rounded-2xl p-4 border border-white/5 flex flex-col justify-center items-center text-center">
          <CloudRain className="h-5 w-5 text-cyan-400 mb-2" />
          <motion.span key={results.weatherScore} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-2xl font-bold font-mono text-cyan-400">
            {results.weatherScore}
          </motion.span>
          <span className="text-[10px] uppercase text-muted-foreground tracking-wider mt-1">Weather Impact</span>
        </motion.div>
      </motion.div>

      {/* Large Efficiency Score */}
      <motion.div variants={item} className="mt-auto">
        <Card className="bg-primary/10 border-primary/20 rounded-2xl">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl button-gradient flex items-center justify-center">
                <Zap className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground tracking-wide">ROUTE EFFICIENCY</p>
                <p className="text-xs text-muted-foreground">Calculated across 5 variables</p>
              </div>
            </div>
            <motion.div key={results.routeScore} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-5xl font-black font-mono text-primary mt-4 md:mt-0 drop-shadow-[0_0_10px_rgba(79,140,255,0.5)]">
              {results.routeScore}<span className="text-2xl text-primary/50">/100</span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
