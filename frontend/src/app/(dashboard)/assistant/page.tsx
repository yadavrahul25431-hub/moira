"use client";

import { ChatInterface } from "@/components/assistant/chat-interface";
import { Sparkles, Route, Wrench, BarChart3, Zap, Clock } from "lucide-react";

const suggestedPrompts = [
  {
    title: "Route Optimization",
    prompt: "Show the fastest route.",
    icon: Route,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Traffic Insights",
    prompt: "Predict traffic conditions.",
    icon: BarChart3,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Eco-Friendly Routing",
    prompt: "Suggest a fuel-efficient route.",
    icon: Sparkles,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Time Management",
    prompt: "Estimate travel time.",
    icon: Clock,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    title: "EV Operations",
    prompt: "Find nearby charging stations.",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
  }
];

export default function AssistantPage() {
  return (
    <div className="flex-1 space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2 font-heading">
            RASMUS AI <Sparkles className="h-6 w-6 text-primary" />
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Chat with RASMUS AI to generate insights, optimize operations, and troubleshoot issues.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Left Column: Quick Suggestions */}
        <div className="hidden lg:flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Suggested Prompts
          </h3>
          
          {suggestedPrompts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:bg-muted/30 transition-all cursor-pointer group shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-8 w-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <h4 className="font-medium text-sm">{item.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  &quot;{item.prompt}&quot;
                </p>
              </div>
            );
          })}

          <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
            <h4 className="text-sm font-semibold text-primary mb-2">Powered by MOIRA</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              RASMUS AI uses advanced Gemini models to rapidly process complex routing permutations and natural language queries, allowing you to manage your fleet conversationally.
            </p>
          </div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-3 h-full min-h-[500px]">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
