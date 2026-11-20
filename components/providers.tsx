"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </MotionConfig>
      <Toaster position="bottom-center" richColors closeButton theme="system" />
    </ThemeProvider>
  );
}
