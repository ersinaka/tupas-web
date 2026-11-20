"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const t = useTranslations("Nav");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={t("themeToggle")}
      className="inline-flex size-10 items-center justify-center rounded-xl text-foreground/80 transition-colors hover:bg-surface-2 hover:text-foreground"
    >
      {/* Both icons are rendered and toggled with CSS to avoid a hydration mismatch. */}
      <Moon aria-hidden="true" className="size-[1.15rem] dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-[1.15rem] dark:block" />
    </button>
  );
}
