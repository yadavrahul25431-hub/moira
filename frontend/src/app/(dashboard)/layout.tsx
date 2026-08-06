"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Loader2, Zap } from "lucide-react";
import { EmergencyReroutingAlert } from "@/components/shared/emergency-rerouting-alert";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth({ requireAuth: true });
  const [mounted, setMounted] = useState(false);
  const [bootText, setBootText] = useState("Initializing MOIRA ...");

  useEffect(() => {
    setMounted(true);
    
    // Boot sequence simulation
    const sequence = [
      "Initializing MOIRA ...",
      "Loading M-CORE ...",
      "Loading ORION ...",
      "Launching RASMUS AI ..."
    ];
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      if (step < sequence.length) {
        setBootText(sequence[step]);
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full animate-pulse"></div>
          <Image 
            src="/logo.png" 
            alt="MOIRA Logo" 
            width={80} 
            height={80} 
            className="object-contain animate-pulse z-10"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground font-logo">MOIRA</h2>
          <p className="text-sm font-mono text-muted-foreground animate-pulse">{bootText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40 overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
          <EmergencyReroutingAlert />
        </main>
      </div>
    </div>
  );
}
