"use client";

import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

const cities = [
  { name: "Mumbai", x: "25%", y: "45%" },
  { name: "Hyderabad", x: "45%", y: "55%" },
  { name: "Bengaluru", x: "40%", y: "75%" },
  { name: "Chennai", x: "55%", y: "70%" },
];

export function MapSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">Live Fleet Intelligence</p>
          <h2>Nationwide Operations</h2>
          <p className="mt-4 text-muted-foreground font-subheading text-lg max-w-2xl mx-auto">
            Real-time tracking and optimization across major Indian logistics hubs.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl glass border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(79,140,255,0.1)]">
          {/* Abstract Map Background Grid */}
          <div className="absolute inset-0 bg-dot opacity-30" />
          
          {/* SVG Map Lines connecting cities */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
              </linearGradient>
            </defs>
            
            {/* HYD to MUM */}
            <motion.path
              d="M 25% 45% Q 35% 40% 45% 55%"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* HYD to BLR */}
            <motion.path
              d="M 45% 55% Q 42% 65% 40% 75%"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* BLR to CHN */}
            <motion.path
              d="M 40% 75% Q 47% 72% 55% 70%"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>

          {/* Cities */}
          {cities.map((city, idx) => (
            <motion.div
              key={city.name}
              className="absolute z-10 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{ left: city.x, top: city.y }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, type: "spring" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 blur-md rounded-full animate-pulse_glow" />
                <div className="relative h-4 w-4 bg-primary rounded-full border-2 border-background z-20 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 bg-white rounded-full" />
                </div>
              </div>
              <span className="mt-2 text-xs font-mono font-medium text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                {city.name}
              </span>
            </motion.div>
          ))}

          {/* Moving Vehicles */}
          <motion.div
            className="absolute z-20 text-accent drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] -translate-x-1/2 -translate-y-1/2"
            animate={{
              left: ["25%", "45%", "25%"],
              top: ["45%", "55%", "45%"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Navigation className="h-5 w-5 rotate-45" />
          </motion.div>

          <motion.div
            className="absolute z-20 text-primary drop-shadow-[0_0_8px_rgba(79,140,255,0.8)] -translate-x-1/2 -translate-y-1/2"
            animate={{
              left: ["40%", "55%", "40%"],
              top: ["75%", "70%", "75%"],
            }}
            transition={{ duration: 5, delay: 2, repeat: Infinity, ease: "linear" }}
          >
            <Navigation className="h-5 w-5 rotate-90" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
