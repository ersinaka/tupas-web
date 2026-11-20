"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page py-24 sm:py-32">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-text">500</p>
      <h1 className="mt-4 max-w-2xl text-4xl leading-tight">{t("title")}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">{t("text")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset}>
          <RotateCcw aria-hidden="true" /> {t("retry")}
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/">{t("home")}</Link>
        </Button>
      </div>
    </section>
  );
}
