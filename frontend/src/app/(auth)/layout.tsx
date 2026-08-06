"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex">
      {/* ── Left Panel: Branding ────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-background" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[120px]" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 shadow-lg shadow-blue-500/25">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Move<span className="gradient-text">Mind</span>
            </span>
          </Link>
        </div>

        {/* Tagline */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl xl:text-4xl font-bold tracking-tight leading-tight mb-4">
            Intelligent Mobility,{" "}
            <span className="gradient-text">Reimagined</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            AI-powered fleet management, route optimization, and traffic
            prediction — all in one platform. Join hundreds of companies
            transforming their operations.
          </p>

          {/* Trust indicators */}
          <div className="mt-8 flex items-center gap-6">
            {[
              { value: "150+", label: "Fleet Partners" },
              { value: "99.9%", label: "Uptime" },
              { value: "2.5M+", label: "Miles Optimized" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} MOIRA. All rights reserved.
        </p>
      </div>

      {/* ── Right Panel: Form ───────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}
