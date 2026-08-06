"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

// Stagger children animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Floating badge component used around the dashboard preview
function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 1.2 + delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass rounded-xl px-4 py-2.5 text-xs font-medium text-foreground/80 shadow-xl shadow-black/20"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* ── Animated Background ────────────────────── */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/12 blur-[120px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[150px] animate-pulse [animation-delay:2s]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-60" />

        {/* Radial fade at edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      {/* ── Content ────────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                AI-Powered Smart Mobility
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08]"
            >
              Intelligent
              <br />
              Mobility,{" "}
              <span className="gradient-text">Reimagined</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Optimize every route, predict traffic patterns, and manage your
              entire fleet with the power of AI. Move smarter. Move faster.
              Move with confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_100%] shadow-2xl shadow-blue-500/25 transition-all duration-500 hover:bg-right hover:shadow-blue-500/40 hover:scale-[1.03] active:scale-[0.98]"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <button className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-foreground/80 rounded-xl border border-border/60 hover:bg-white/5 hover:border-border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/15">
                  <Play className="h-3 w-3 text-foreground/80 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Trust */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-6 justify-center lg:justify-start text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                14-day free trial
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column — Dashboard Preview Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
            style={{ perspective: "1200px" }}
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-cyan-500/20 blur-3xl" />

            {/* Dashboard Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative glass-subtle rounded-2xl p-1 shadow-2xl shadow-black/40"
              style={{ transformStyle: "preserve-3d", transform: "rotateY(-4deg) rotateX(2deg)" }}
            >
              <div className="rounded-xl bg-background/80 p-5">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <div className="ml-3 h-6 flex-1 rounded-lg bg-white/5 flex items-center px-3">
                    <span className="text-[10px] text-muted-foreground/50 font-mono">
                      app.movemind.ai/dashboard
                    </span>
                  </div>
                </div>

                {/* Mini dashboard content */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Active Vehicles", value: "24", color: "text-emerald-400", trend: "+12%" },
                    { label: "Routes Today", value: "156", color: "text-blue-400", trend: "+8%" },
                    { label: "Fuel Saved", value: "340L", color: "text-violet-400", trend: "+23%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3"
                    >
                      <p className="text-[10px] text-muted-foreground mb-1">{stat.label}</p>
                      <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-[9px] text-emerald-400 mt-0.5">{stat.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-muted-foreground font-medium">Fleet Performance</span>
                    <span className="text-[9px] text-primary font-medium">Live</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                        className="flex-1 rounded-sm bg-gradient-to-t from-blue-600/60 to-violet-500/40"
                      />
                    ))}
                  </div>
                </div>

                {/* Route trace */}
                <div className="mt-3 rounded-lg bg-white/[0.03] border border-white/[0.06] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-muted-foreground font-medium">Active Routes</span>
                    <span className="text-[9px] text-emerald-400 font-medium">3 vehicles en route</span>
                  </div>
                  {/* Simplified route visualization */}
                  <div className="relative h-12">
                    <svg className="w-full h-full" viewBox="0 0 300 40" fill="none">
                      <motion.path
                        d="M10 30 Q75 5 150 20 Q225 35 290 10"
                        stroke="url(#routeGrad)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
                      />
                      <defs>
                        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                          <stop offset="50%" stopColor="hsl(263, 70%, 58%)" />
                          <stop offset="100%" stopColor="hsl(192, 91%, 45%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Animated dot along path */}
                    <motion.div
                      className="absolute top-0 left-0 h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/50"
                      animate={{
                        x: [10, 75, 150, 225, 280],
                        y: [28, 3, 18, 33, 8],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <FloatingBadge
              className="absolute -top-4 -right-4"
              delay={0}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                98.5% Accuracy
              </span>
            </FloatingBadge>

            <FloatingBadge
              className="absolute -bottom-2 -left-6"
              delay={0.3}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                Real-time GPS
              </span>
            </FloatingBadge>

            <FloatingBadge
              className="absolute top-1/3 -right-10"
              delay={0.6}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                AI Optimized
              </span>
            </FloatingBadge>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 gradient-line" />
    </section>
  );
}
