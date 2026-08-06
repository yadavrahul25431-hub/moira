"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: 98.5,
    suffix: "%",
    label: "Route Accuracy",
    description: "AI-optimized path precision across all fleet operations",
  },
  {
    value: 2.5,
    suffix: "M+",
    label: "Miles Optimized",
    description: "Total distance optimized for partners worldwide",
  },
  {
    value: 150,
    suffix: "+",
    label: "Fleet Partners",
    description: "Enterprise clients managing their fleets with us",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Platform Uptime",
    description: "Reliable infrastructure for mission-critical operations",
  },
];

// Animated counter hook that counts up when element scrolls into view
function useAnimatedCounter(
  end: number,
  duration: number = 2000,
  inView: boolean
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    const isDecimal = end % 1 !== 0;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return count;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function StatCard({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const count = useAnimatedCounter(stat.value, 2200, inView);

  return (
    <motion.div variants={itemVariants} className="group relative text-center">
      {/* Accent glow on hover */}
      <div className="absolute inset-0 -m-4 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="gradient-text">
            {count}
            {stat.suffix}
          </span>
        </div>
        <p className="mt-3 text-sm sm:text-base font-semibold text-foreground">
          {stat.label}
        </p>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-[200px] mx-auto leading-relaxed">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 bg-dot opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            By the Numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Trusted by fleets{" "}
            <span className="gradient-text">worldwide</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative">
              <StatCard stat={stat} inView={isInView} />
              {/* Vertical divider (desktop only) */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-2 h-16 w-px bg-gradient-to-b from-transparent via-border/60 to-transparent" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
