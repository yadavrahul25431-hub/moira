"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="relative border-t border-white/10 bg-background overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
        <Link href="/" className="flex items-center gap-4 mb-6 group">
          <Image 
            src="/logo.png" 
            alt="MOIRA Logo" 
            width={40} 
            height={40} 
            className="object-contain mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-logo text-foreground tracking-wider">
            MOIRA
          </span>
        </Link>
        
        <p className="text-lg font-subheading text-muted-foreground mb-8 tracking-wide">
          Move Smarter.
        </p>

        <div className="flex items-center gap-8 mb-8">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">
            <Youtube className="h-5 w-5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} MOIRA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
