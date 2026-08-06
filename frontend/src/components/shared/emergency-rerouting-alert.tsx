"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, MapPin, Clock, ArrowRight, X } from "lucide-react";

export function EmergencyReroutingAlert() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate AI detection after 8 seconds of user session
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-80 shadow-2xl animate-in slide-in-from-bottom-5 duration-500 rounded-xl overflow-hidden border border-destructive/30 bg-card">
      <div className="bg-destructive/10 p-4 border-b border-destructive/20 relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 rounded-md text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 text-destructive font-bold mb-1">
          <AlertTriangle className="h-5 w-5 animate-pulse" />
          AI Emergency Rerouting
        </div>
        <p className="text-sm font-medium text-foreground">
          Heavy traffic detected near Bengaluru.
        </p>
      </div>
      <div className="p-4 bg-background/50 space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-emerald-500 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Alternative route available.</p>
            <p className="text-xs text-muted-foreground">Via NH44 Service Road</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-500">
            <Clock className="h-4 w-4" />
            Saved: 18 mins
          </div>
          <button className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-md flex items-center gap-1 font-semibold transition-colors">
            Apply <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
