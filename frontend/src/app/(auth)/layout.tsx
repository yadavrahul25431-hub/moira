"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex bg-background selection:bg-primary/30 selection:text-primary-foreground">
      {/* ── Left Panel: Branding ────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-[#0F172A]" />
        
        {/* Dynamic Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[150px] mix-blend-screen" />
        
        {/* Tech Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Image 
                src="/logo.png" 
                alt="MOIRA" 
                width={32} 
                height={32} 
                className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              />
            </div>
            <span className="text-[42px] font-bold tracking-tight text-white font-heading uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              MOIRA
            </span>
          </Link>
        </div>

        {/* Tagline & Floating Card */}
        <div className="relative z-10 max-w-lg mt-12">
          <h2 className="text-4xl xl:text-5xl font-black tracking-tight leading-tight mb-6 font-heading text-white drop-shadow-md">
            Predict.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Optimize.</span><br/>
            Move Smarter.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-body">
            Access the world's most advanced AI fleet command center. Real-time telemetry, predictive maintenance, and autonomous routing at your fingertips.
          </p>

          {/* Floating Glass Metric Card */}
          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden transform transition-all hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 opacity-50" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-emerald-400 mb-1 uppercase tracking-wider flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  System Status
                </p>
                <p className="text-2xl font-bold text-white">AI Engine Online</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <p className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} MOIRA NEXUS
          </p>
        </div>
      </div>

      {/* ── Right Panel: Form ───────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-hidden">
        {/* Subtle background glow for the form side */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-[420px] relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
