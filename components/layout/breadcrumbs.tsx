import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/json-ld";
import { Link, type Href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href: Href };

/** Visual breadcrumb + BreadcrumbList JSON-LD. The last item is the current page. */
export async function Breadcrumbs({
  locale,
  items,
  tone = "default",
}: {
  locale: Locale;
  items: Crumb[];
  tone?: "default" | "ink";
}) {
  const t = await getTranslations("Breadcrumb");
  const tc = await getTranslations("Common");
  const all: Crumb[] = [{ label: tc("home"), href: "/" }, ...items];

  return (
    <>
      <nav aria-label={t("label")} className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {last ? (
                  <span
                    aria-current="page"
                    className={cn("font-medium", tone === "ink" ? "text-ink-foreground" : "text-foreground")}
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded hover:underline",
                        tone === "ink" ? "text-ink-muted hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                    <ChevronRight
                      aria-hidden="true"
                      className={cn("size-3.5", tone === "ink" ? "text-ink-muted" : "text-muted-foreground")}
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all.map((c) => ({ name: c.label, url: absoluteUrl(locale, c.href) })))} />
    </>
  );
}
