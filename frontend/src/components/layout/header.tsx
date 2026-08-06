"use client";

import { useState, useEffect } from "react";
import { Bell, Search, User, Settings, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const { user } = useAuth();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b bg-card/80 backdrop-blur-md px-6 shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="MOIRA Logo" 
            width={40} 
            height={40} 
            className="object-contain"
          />
          <span className="text-3xl font-bold tracking-tight text-foreground font-logo">
            MOIRA
          </span>
        </Link>
        
        <div className="relative w-64 md:w-96 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search fleets, routes, or drivers..."
            className="w-full appearance-none bg-background pl-9 shadow-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Live Clock */}
        <div className="hidden sm:flex items-center text-sm font-mono font-medium text-muted-foreground mr-2 border border-border/50 bg-background/50 px-3 py-1.5 rounded-md">
          {time}
        </div>

        <button className="relative rounded-full p-2 text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
        </button>

        <button className="relative rounded-full p-2 text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors">
          <Settings className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-3 border-l pl-4 ml-1 border-border/50">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-medium leading-none">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {user?.role === "ADMIN" ? "Administrator" : "Fleet Manager"}
            </span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
