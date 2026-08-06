"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, clearError } = useAuth({ redirectIfAuth: "/dashboard" });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData);
      router.push("/dashboard");
    } catch (err) {
      // Error is handled by store
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full relative"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-[2rem] blur-xl -z-10" />
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-500/30 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-violet-500/30 rounded-br-3xl" />

        <div className="text-center mb-8 relative z-10">
          <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Fingerprint className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2 font-heading text-white drop-shadow-sm">Authenticate</h1>
          <p className="text-sm text-slate-400 font-mono">
            Enter your credentials to access the Nexus.
          </p>
          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono animate-pulse">
            Demo Mode Active: Use ANY email/password
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg font-mono">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300 font-mono text-xs uppercase tracking-wider">Terminal ID (Email)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="commander@moira.ai"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-black/50 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/50 text-white placeholder:text-slate-600 rounded-xl h-12 transition-all hover:bg-black/60 font-mono"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-300 font-mono text-xs uppercase tracking-wider">Passcode</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-mono"
              >
                Reset Access?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-black/50 border-white/10 focus:border-violet-500/50 focus:ring-violet-500/50 text-white placeholder:text-slate-600 rounded-xl h-12 transition-all hover:bg-black/60 font-mono"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 mt-6 bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_100%] transition-all hover:bg-right hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] group rounded-xl text-white font-bold tracking-wide uppercase font-heading text-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <>
                Initialize Link
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 font-mono relative z-10">
          No active clearance?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Request Access
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
