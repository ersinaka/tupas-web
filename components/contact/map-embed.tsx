"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { readConsent } from "@/components/layout/cookie-consent";
import { Button } from "@/components/ui/button";

/**
 * Google Maps sets third-party cookies, so the iframe loads only after an explicit click
 * or when the visitor has accepted all cookies.
 */
export function MapEmbed({
  query,
  title,
  loadLabel,
  note,
}: {
  query: string;
  title: string;
  loadLabel: string;
  note: string;
}) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (readConsent() === "all") setLoad(true);
    const onChange = (e: Event) => {
      if ((e as CustomEvent<string>).detail === "all") setLoad(true);
    };
    window.addEventListener("tupas:consent-changed", onChange);
    return () => window.removeEventListener("tupas:consent-changed", onChange);
  }, []);

  if (load) {
    return (
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-80 w-full rounded-2xl border border-border"
      />
    );
  }

  return (
    <div className="bg-hatch flex h-full min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface-2 p-6 text-center">
      <MapPin aria-hidden="true" className="size-8 text-brand-text" />
      <Button type="button" variant="secondary" onClick={() => setLoad(true)}>
        {loadLabel}
      </Button>
      <p className="max-w-sm text-xs text-muted-foreground">{note}</p>
    </div>
  );
}
