"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: 12500,
    suffix: "+",
    label: "Active vehicles",
    description: "Live monitored vehicles",
  },
  {
    value: 12,
    suffix: "%",
    prefix: "-",
    label: "Average ETA",
    description: "Reduction in travel time",
  },
  {
    value: 40,
    suffix: "%",
    prefix: "-",
    label: "Traffic density",
    description: "Avoided congestion zones",
  },
  {
    value: 24,
    suffix: "%",
    prefix: "+",
    label: "Fuel savings",
    description: "Optimized consumption",
  },
  {
    value: 45,
    suffix: "k",
    label: "Carbon reduction",
    description: "Tons of CO2 saved",
  },
];

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
      <div className="absolute inset-0 -m-4 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative glass-subtle p-6 rounded-2xl h-full flex flex-col justify-center items-center shadow-lg shadow-black/20 hover:shadow-primary/10 transition-shadow">
        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stats text-white">
          <span className="text-primary">{stat.prefix}</span>
          {count}
          <span className="text-primary">{stat.suffix}</span>
        </div>
        <p className="mt-4 text-base font-semibold text-foreground font-subheading">
          {stat.label}
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute inset-0 bg-dot opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2>Platform Impact</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} inView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
