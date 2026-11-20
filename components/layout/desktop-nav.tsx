"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContentIcon } from "@/components/icons";
import { Link, usePathname, type Href } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { NavData } from "./nav-types";

const triggerClass =
  "group inline-flex h-10 items-center gap-1 rounded-xl px-3 text-sm font-semibold text-foreground/85 transition-colors hover:bg-surface-2 hover:text-foreground data-[state=open]:bg-surface-2 data-[active=true]:text-brand-text";

const panelClass =
  "absolute top-full z-40 mt-2 rounded-2xl border border-border bg-surface p-3 shadow-lift data-[state=open]:animate-[rise-in_160ms_ease-out]";

export function DesktopNav({ data }: { data: NavData }) {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const pathname = usePathname();
  const isActive = (prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`);

  return (
    // Radix wraps the list in an inline `position: relative` div; neutralising it lets the mega
    // panel span the header container while the small dropdowns anchor to their own item.
    <NavigationMenu.Root className="hidden lg:block [&>div]:static!" aria-label={t("mainLabel")} delayDuration={80}>
      <NavigationMenu.List className="flex items-center gap-0.5">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={triggerClass} data-active={isActive("/urunler")}>
            {t("products")}
            <ChevronDown
              aria-hidden="true"
              className="size-4 opacity-60 transition-transform group-data-[state=open]:rotate-180"
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={cn(panelClass, "inset-x-8")}>
            <div className="grid grid-cols-[1fr_17rem] gap-3">
              <ul className="grid grid-cols-3 gap-1">
                {data.fire.map((c) => (
                  <li key={c.slug}>
                    <NavLink href={{ pathname: "/urunler/[kategori]", params: { kategori: c.slug } }}>
                      <ContentIcon name={c.icon} className="size-4 shrink-0 text-brand-text" />
                      <span>{c.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col justify-between rounded-xl bg-ink p-5 text-ink-foreground">
                <div>
                  <p className="text-base font-bold">{t("megaTitle")}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t("megaText")}</p>
                </div>
                <div className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                  <NavigationMenu.Link asChild>
                    <Link href="/urunler" className="inline-flex items-center gap-2 hover:text-accent">
                      {t("allProducts")} <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild>
                    <Link href="/is-guvenligi" className="inline-flex items-center gap-2 hover:text-accent">
                      {t("safetyLong")} <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </NavigationMenu.Link>
                  <a
                    href={data.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline"
                  >
                    <Download aria-hidden="true" className="size-4" /> {tc("downloadCatalog")}
                    <span className="sr-only">{tc("opensInNewTab")}</span>
                  </a>
                </div>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className={triggerClass} data-active={isActive("/hizmetler")}>
            {t("services")}
            <ChevronDown
              aria-hidden="true"
              className="size-4 opacity-60 transition-transform group-data-[state=open]:rotate-180"
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={cn(panelClass, "left-0 w-[34rem]")}>
            <ul className="grid grid-cols-2 gap-1">
              {data.services.map((s) => (
                <li key={s.slug}>
                  <NavLink href={{ pathname: "/hizmetler/[slug]", params: { slug: s.slug } }}>
                    <ContentIcon name={s.icon} className="size-4 shrink-0 text-brand-text" />
                    <span>{s.name}</span>
                  </NavLink>
                </li>
              ))}
              <li className="col-span-2 mt-1 border-t border-border pt-1">
                <NavLink href="/hizmetler">
                  <span className="font-semibold">{t("allServices")}</span>
                  <ArrowRight aria-hidden="true" className="ml-auto size-4" />
                </NavLink>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link asChild active={isActive("/is-guvenligi")}>
            <Link href="/is-guvenligi" className={triggerClass} data-active={isActive("/is-guvenligi")}>
              {t("safety")}
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger
            className={triggerClass}
            data-active={isActive("/hakkimizda") || isActive("/belgeler") || isActive("/blog")}
          >
            {t("corporate")}
            <ChevronDown
              aria-hidden="true"
              className="size-4 opacity-60 transition-transform group-data-[state=open]:rotate-180"
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={cn(panelClass, "left-0 w-64")}>
            <ul className="grid gap-1">
              <li>
                <NavLink href="/hakkimizda">{t("about")}</NavLink>
              </li>
              <li>
                <NavLink href="/belgeler">{t("certificates")}</NavLink>
              </li>
              <li>
                <NavLink href="/blog">{t("blog")}</NavLink>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link asChild active={isActive("/iletisim")}>
            <Link href="/iletisim" className={triggerClass} data-active={isActive("/iletisim")}>
              {t("contact")}
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function NavLink({ href, children }: { href: Href; children: React.ReactNode }) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={href}
        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-foreground/90 transition-colors hover:bg-surface-2 hover:text-foreground"
      >
        {children}
      </Link>
    </NavigationMenu.Link>
  );
}
