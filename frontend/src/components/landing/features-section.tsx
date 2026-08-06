"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  BarChart3,
  Radio,
  MessageSquareText,
  MapPinned,
  Leaf,
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
    title: "AI Route Optimization",
    description:
      "Neural networks analyze thousands of route permutations in real-time to deliver the fastest, most fuel-efficient paths for your entire fleet.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: BarChart3,
    title: "Fleet Analytics",
    description:
      "Comprehensive dashboards with real-time KPIs, driver performance scoring, fuel consumption trends, and predictive maintenance alerts.",
    gradient: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: Radio,
    title: "Traffic Prediction",
    description:
      "Machine learning models trained on historical and live data forecast congestion patterns up to 4 hours ahead with 98% accuracy.",
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: MessageSquareText,
    title: "AI Assistant",
    description:
      "Natural language interface powered by Gemini AI. Ask questions, get insights, generate reports, and control your fleet through conversation.",
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: MapPinned,
    title: "Interactive Maps",
    description:
      "Real-time vehicle tracking on beautiful interactive maps with live traffic layers, geofencing, and customizable alert zones.",
    gradient: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: Leaf,
    title: "Eco Intelligence",
    description:
      "Track and reduce your fleet's carbon footprint with AI-driven eco-routing, emissions reporting, and sustainability scorecards.",
    gradient: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-400",
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
      {/* Glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative h-full rounded-2xl glass p-6 sm:p-7 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/5">
        {/* Icon */}
        <div
          className={`mb-5 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} border border-white/[0.06]`}
        >
          <Icon className={`h-6 w-6 ${feature.iconColor}`} strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2.5 tracking-tight">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom accent line */}
        <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-primary/50 via-violet-500/50 to-transparent transition-all duration-700" />
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
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Powerful Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="gradient-text">move smarter</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            A complete intelligent mobility toolkit. From route planning to
            emissions tracking, every feature is designed to make your fleet
            operations effortless.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
