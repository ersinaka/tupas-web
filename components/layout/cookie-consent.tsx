"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export const CONSENT_KEY = "tupas-cookie-consent-v1";
export const CONSENT_EVENT = "tupas:cookie-preferences";

export type ConsentValue = "all" | "essential";

export function readConsent(): ConsentValue | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const t = useTranslations("Cookie");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  const choose = (value: ConsentValue) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Storage may be unavailable (private mode); the banner simply closes for this visit.
    }
    window.dispatchEvent(new CustomEvent("tupas:consent-changed", { detail: value }));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <section
      role="region"
      aria-label={t("label")}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-4 shadow-lift motion-safe:animate-[rise-in_220ms_ease-out] sm:inset-x-6 sm:bottom-6 sm:p-5"
    >
      <p className="text-sm leading-relaxed text-foreground">
        {t("text")}{" "}
        <Link href="/cerez" className="font-semibold text-brand-text underline underline-offset-4">
          {t("policy")}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={() => choose("essential")}>
          {t("reject")}
        </Button>
        <Button size="sm" onClick={() => choose("all")}>
          {t("accept")}
        </Button>
      </div>
    </section>
  );
}

export function CookiePreferencesButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
      className="rounded hover:text-ink-foreground hover:underline"
    >
      {children}
    </button>
  );
}
