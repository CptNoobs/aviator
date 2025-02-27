"use client";

import { ThemeProvider } from "next-themes";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </ThemeProvider>
  );
} 