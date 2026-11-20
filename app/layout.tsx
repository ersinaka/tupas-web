import type { ReactNode } from "react";
import "./globals.css";

// The <html> and <body> tags live in app/[locale]/layout.tsx so the `lang` attribute
// matches the active locale. This root layout only exists to host global CSS.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
