import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCategories, getServices, loc } from "@/lib/content";
import { siteConfig, telHref } from "@/lib/site-config";
import { DesktopNav } from "./desktop-nav";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import type { NavData } from "./nav-types";
import { ThemeToggle } from "./theme-toggle";

export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations("Common");
  const [fire, services] = await Promise.all([getCategories("fire"), getServices()]);

  const data: NavData = {
    fire: fire.map((c) => ({ slug: c.slug, name: loc(c.name, locale), icon: c.icon })),
    services: services.map((s) => ({ slug: s.slug, name: loc(s.name, locale), icon: s.icon })),
    catalogUrl: siteConfig.catalogUrl,
    phone: { display: siteConfig.phone.display, href: telHref() },
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-xl bg-brand px-4 py-2 font-semibold text-brand-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="container-page relative flex h-16 items-center gap-4 lg:h-[4.5rem]">
          <Link href="/" className="shrink-0 rounded-lg" aria-label={`${siteConfig.legalName} – ${t("home")}`}>
            <Logo priority className="h-8 lg:h-9" />
          </Link>

          <div className="flex flex-1 justify-center">
            <DesktopNav data={data} />
          </div>

          <div className="flex items-center gap-1">
            <LocaleSwitcher className="hidden sm:inline-flex" />
            <ThemeToggle />
            <a
              href={telHref()}
              className="hidden h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold tabular-nums hover:bg-surface-2 xl:inline-flex"
            >
              <Phone aria-hidden="true" className="size-4 text-brand-text" />
              {siteConfig.phone.display}
            </a>
            <a
              href={telHref()}
              aria-label={`${t("callUs")}: ${siteConfig.phone.display}`}
              className="inline-flex size-10 items-center justify-center rounded-xl hover:bg-surface-2 xl:hidden"
            >
              <Phone aria-hidden="true" className="size-[1.15rem] text-brand-text" />
            </a>
            <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
              <Link href="/teklif-al">{t("requestQuote")}</Link>
            </Button>
            <MobileNav data={data} />
          </div>
        </div>
      </header>
    </>
  );
}
