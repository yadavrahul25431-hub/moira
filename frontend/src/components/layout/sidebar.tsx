"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Car, 
  BarChart3, 
  Bot, 
  Settings, 
  LogOut,
  Zap,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Zap, label: "Smart Commute", href: "/smart-commute" },
  { icon: Map, label: "M-CORE", href: "/routes" },
  { icon: Truck, label: "Fleet Management", href: "/vehicles" },
  { icon: BarChart3, label: "ORION", href: "/analytics" },
  { icon: Bot, label: "RASMUS AI", href: "/assistant" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-card/95 backdrop-blur-md shadow-sm h-[calc(100vh-4rem)]">
      {/* Navigation */}
      <div className="flex-1 overflow-auto py-6 flex flex-col gap-1 px-3 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="border-t border-border/50 p-3 bg-background/30">
        <Link
          href="/settings"
          className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors"
        >
          <Settings className="h-5 w-5 shrink-0" />
          Settings
        </Link>
        <button
          onClick={() => logout()}
          className="w-full group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors mt-1"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
