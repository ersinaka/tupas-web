"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname, type Href } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Links to the same page in the other locale. Rendered as a real link so it works without JS.
 * Product/service slugs are shared between locales, so dynamic params carry over unchanged.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const target = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  const { locale: _ignored, ...routeParams } = params as Record<string, string>;
  void _ignored;
  const href = (Object.keys(routeParams).length ? { pathname, params: routeParams } : pathname) as Href;

  return (
    <Link
      href={href}
      locale={target}
      hrefLang={target}
      lang={target}
      aria-label={t("switchLocaleLabel")}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-xl px-2.5 text-sm font-semibold text-foreground/85 transition-colors hover:bg-surface-2 hover:text-foreground",
        className,
      )}
    >
      <Languages aria-hidden="true" className="size-4" />
      <span>{target.toUpperCase()}</span>
    </Link>
  );
}
