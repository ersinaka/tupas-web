"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/cards/cards";
import type { IconName, ImageAsset } from "@/data/types";
import type { Href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type FilterProduct = {
  slug: string;
  subtype?: string;
  name: string;
  summary: string;
  href: Href;
  image?: ImageAsset;
  inHouse?: boolean;
};

export function ProductFilter({
  products,
  subtypes,
  icon,
  locale,
}: {
  products: FilterProduct[];
  subtypes: { slug: string; name: string }[];
  icon: IconName;
  locale: Locale;
}) {
  const t = useTranslations("Products");
  const tc = useTranslations("Common");
  const [active, setActive] = useState<string | null>(null);

  // Only offer filters that actually have products behind them.
  const available = useMemo(
    () => subtypes.filter((s) => products.some((p) => p.subtype === s.slug)),
    [subtypes, products],
  );
  const visible = active ? products.filter((p) => p.subtype === active) : products;

  return (
    <div>
      {available.length > 1 ? (
        <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
          {[{ slug: null, name: t("filterAll") }, ...available].map((s) => {
            const pressed = active === s.slug;
            return (
              <button
                key={s.slug ?? "all"}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(s.slug)}
                className={cn(
                  "h-9 rounded-full border px-4 text-sm font-medium transition-colors",
                  pressed
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-surface text-foreground hover:border-foreground/40",
                )}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      ) : null}

      <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        {t("results", { count: visible.length })}
      </p>

      {visible.length ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProductCard
                href={p.href}
                locale={locale}
                name={p.name}
                summary={p.summary}
                icon={icon}
                image={p.image}
                badge={p.inHouse ? tc("inHouse") : undefined}
                headingLevel="h3"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">{t("empty")}</p>
      )}
    </div>
  );
}
