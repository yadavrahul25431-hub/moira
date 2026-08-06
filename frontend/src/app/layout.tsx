import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Inter, JetBrains_Mono, Syncopate } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-syncopate",
});

export const metadata: Metadata = {
  title: "MOIRA — Predict. Optimize. Move Smarter.",
  description:
    "MOIRA: Mobility Optimization Intelligence Routing Analytics. An AI-powered smart mobility platform for fleet management, route optimization, traffic prediction, and real-time analytics.",
  keywords: [
    "fleet management",
    "route optimization",
    "AI mobility",
    "traffic prediction",
    "smart transportation",
    "MOIRA",
  ],
  openGraph: {
    title: "MOIRA — Predict. Optimize. Move Smarter.",
    description:
      "Transform fleet operations with MOIRA's AI-powered route optimization, real-time analytics, and predictive traffic intelligence.",
    type: "website",
    siteName: "MOIRA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syncopate.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
