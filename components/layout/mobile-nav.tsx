"use client";

import { ChevronDown, Menu, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, type Href } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import type { NavData } from "./nav-types";

export function MobileNav({ data }: { data: NavData }) {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("menu")}>
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={t("closeMenu")}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4 pr-16">
          <SheetTitle className="text-base font-bold">{t("menuTitle")}</SheetTitle>
          <SheetDescription className="sr-only">{t("mainLabel")}</SheetDescription>
          <LocaleSwitcher />
        </div>

        <nav aria-label={t("mainLabel")} className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="grid gap-1">
            <Group label={t("products")}>
              {data.fire.map((c) => (
                <Item key={c.slug} href={{ pathname: "/urunler/[kategori]", params: { kategori: c.slug } }} small>
                  {c.name}
                </Item>
              ))}
              <Item href="/urunler" small strong>
                {t("allProducts")}
              </Item>
            </Group>
            <Group label={t("services")}>
              {data.services.map((s) => (
                <Item key={s.slug} href={{ pathname: "/hizmetler/[slug]", params: { slug: s.slug } }} small>
                  {s.name}
                </Item>
              ))}
              <Item href="/hizmetler" small strong>
                {t("allServices")}
              </Item>
            </Group>
            <Item href="/is-guvenligi">{t("safetyLong")}</Item>
            <Item href="/hakkimizda">{t("about")}</Item>
            <Item href="/belgeler">{t("certificates")}</Item>
            <Item href="/blog">{t("blog")}</Item>
            <Item href="/iletisim">{t("contact")}</Item>
          </ul>
        </nav>

        <div className="grid gap-2 border-t border-border p-4">
          <Button asChild variant="secondary" size="lg">
            <a href={data.phone.href}>
              <Phone aria-hidden="true" /> {data.phone.display}
            </a>
          </Button>
          <SheetClose asChild>
            <Button asChild size="lg">
              <Link href="/teklif-al">{tc("requestQuote")}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-base font-semibold hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
          {label}
          <ChevronDown aria-hidden="true" className="size-5 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <ul className="mb-2 ml-3 grid gap-0.5 border-l border-border pl-2">{children}</ul>
      </details>
    </li>
  );
}

function Item({
  href,
  children,
  small,
  strong,
}: {
  href: Href;
  children: React.ReactNode;
  small?: boolean;
  strong?: boolean;
}) {
  return (
    <li>
      <SheetClose asChild>
        <Link
          href={href}
          className={
            small
              ? `block rounded-lg px-3 py-2 text-sm hover:bg-surface-2 ${strong ? "font-semibold text-brand-text" : "text-foreground/85"}`
              : "block rounded-xl px-3 py-3 text-base font-semibold hover:bg-surface-2"
          }
        >
          {children}
        </Link>
      </SheetClose>
    </li>
  );
}
