import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "./providers";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

export const metadata: Metadata = {
  title: "Aviator.ai - Your AI Co-Pilot",
  description: "AI-powered platform for Canadian pilots - Weather, Study Materials, and Community",
  keywords: ["aviation", "pilot training", "weather", "AI", "Canadian pilots"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <SmoothScroll />
          <Navbar />
          <main className="flex min-h-[calc(100vh-4rem)] flex-col">
            {children}
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
