"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  BarChart3,
  Radio,
  LineChart,
  ShieldAlert,
  Bot,
} from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Route optimization",
    description:
      "Neural networks analyze thousands of route permutations in real-time to deliver the fastest, most fuel-efficient paths.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: BarChart3,
    title: "Fleet management",
    description:
      "Comprehensive dashboards with real-time KPIs, driver performance scoring, and fuel consumption trends.",
    gradient: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: LineChart,
    title: "Predictive analytics",
    description:
      "Anticipate vehicle maintenance needs and optimize resource allocation based on historical performance data.",
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: ShieldAlert,
    title: "Dynamic incident simulation",
    description:
      "Instantly detect accidents, weather events, or road closures and automatically reroute affected vehicles.",
    gradient: "from-rose-500/20 to-red-500/10",
    iconColor: "text-rose-400",
  },
  {
    icon: Radio,
    title: "EV optimization",
    description:
      "Intelligent range anxiety management, charging station routing, and battery lifespan preservation algorithms.",
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Bot,
    title: "RASMUS AI",
    description:
      "Your intelligent mobility co-pilot. Ask questions, generate insights, and control your operations through conversation.",
    gradient: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-2xl border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />

      <div className="relative h-full rounded-2xl card-gradient p-6 sm:p-7 transition-all duration-500 border border-white/5 group-hover:border-primary/50">
        <div
          className={`mb-5 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} border border-white/[0.06]`}
        >
          <Icon className={`h-6 w-6 ${feature.iconColor}`} strokeWidth={1.8} />
        </div>

        <h3 className="text-foreground mb-2.5">
          {feature.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/50 via-accent/50 to-transparent transition-all duration-700" />
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden bg-secondary/5"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Powerful Architecture
          </p>
          <h2>
            Intelligence at every{" "}
            <span className="gradient-text">layer</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed font-subheading">
            A complete intelligent mobility toolkit designed to make your operations effortless and highly efficient.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
