import { ArrowRight, Download, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CategoryCard, ServiceCard } from "@/components/cards/cards";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Faq } from "@/data/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getFeaturedCategories,
  getProductCount,
  getQuoteInterestOptions,
  getSectors,
  getServices,
  loc,
} from "@/lib/content";
import { faqJsonLd } from "@/lib/jsonld";
import { fullAddress, siteConfig, telHref } from "@/lib/site-config";
import { QuoteForm } from "@/components/forms/quote-form";
import { SectionHeading } from "./section-heading";

export async function ServicesSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.services");
  const tc = await getTranslations("Common");
  const services = await getServices();

  return (
    <section aria-labelledby="services-title" className="container-page py-20 sm:py-24">
      <SectionHeading id="services-title" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal as="li" key={s.slug} delay={i * 0.04}>
            <ServiceCard
              href={{ pathname: "/hizmetler/[slug]", params: { slug: s.slug } }}
              icon={s.icon}
              name={loc(s.name, locale)}
              summary={loc(s.summary, locale)}
              cta={tc("learnMore")}
              index={i}
            />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export async function CategoriesSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.categories");
  const tc = await getTranslations("Common");
  const categories = await getFeaturedCategories();
  const counts = await Promise.all(categories.map((c) => getProductCount("fire", c.slug)));

  return (
    <section aria-labelledby="categories-title" className="border-y border-border bg-surface-2/60">
      <div className="container-page py-20 sm:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="categories-title" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/urunler">
                {t("all")} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <a href={siteConfig.catalogUrl} target="_blank" rel="noopener noreferrer">
                <Download aria-hidden="true" /> {tc("downloadCatalog")}
                <span className="sr-only">{tc("opensInNewTab")}</span>
              </a>
            </Button>
          </div>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={(i % 4) * 0.04}>
              <CategoryCard
                href={{ pathname: "/urunler/[kategori]", params: { kategori: c.slug } }}
                icon={c.icon}
                name={loc(c.name, locale)}
                summary={loc(c.summary, locale)}
                meta={tc("productCount", { count: counts[i] ?? 0 })}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function WhySection() {
  const t = await getTranslations("Home.why");
  const keys = ["manufacturer", "tested", "service", "tracking"] as const;

  return (
    <section aria-labelledby="why-title" className="container-page grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading id="why-title" eyebrow={t("eyebrow")} title={t("title")} />
      </div>
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {keys.map((k, i) => (
          <li key={k} className="bg-surface p-7">
            <span aria-hidden="true" className="text-sm font-bold tabular-nums text-brand-text">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg">{t(`items.${k}.title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`items.${k}.text`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export async function ProcessSection() {
  const t = await getTranslations("Home.process");
  const steps = ["survey", "quote", "install", "maintenance"] as const;

  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="container-page relative py-20 sm:py-24">
        <SectionHeading id="process-title" eyebrow={t("eyebrow")} title={t("title")} tone="ink" />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden="true" className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-white/15 md:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 0.06} className="relative flex gap-5 md:block">
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-accent/60 bg-ink text-sm font-bold text-accent">
                {i + 1}
              </span>
              <div className="md:mt-6">
                <h3 className="text-lg">{t(`steps.${s}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`steps.${s}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export async function SectorsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.sectors");
  const sectors = await getSectors();

  return (
    <section aria-labelledby="sectors-title" className="container-page py-20 sm:py-24">
      <SectionHeading id="sectors-title" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((s) => (
          <li key={s.slug} className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h3 className="text-base">{loc(s.name, locale)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{loc(s.note, locale)}</p>
          </li>
        ))}
      </ul>
      {/* TODO: müşteri onayı alınmış referans logoları eklenecek. */}
      <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-dashed border-border px-6 py-8 text-center">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">{t("referencesTitle")}</h3>
        <p className="text-sm text-muted-foreground">{t("referencesNote")}</p>
      </div>
    </section>
  );
}

export async function FaqSection({ locale, faqs, title }: { locale: Locale; faqs: Faq[]; title?: string }) {
  const t = await getTranslations("Home.faq");
  const tc = await getTranslations("Common");

  return (
    <section aria-labelledby="faq-title" className="border-t border-border bg-surface-2/60">
      <div className="container-page grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading id="faq-title" eyebrow={t("eyebrow")} title={title ?? t("title")} />
          <p className="mt-6 text-sm text-muted-foreground">
            {tc("callUs")}:{" "}
            <a href={telHref()} className="font-semibold text-foreground tabular-nums hover:underline">
              {siteConfig.phone.display}
            </a>
          </p>
        </div>
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-surface px-6 shadow-soft">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{loc(f.question, locale)}</AccordionTrigger>
              <AccordionContent>{loc(f.answer, locale)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <JsonLd data={faqJsonLd(faqs, locale)} />
    </section>
  );
}

export async function QuoteSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.quote");
  const tc = await getTranslations("Common");
  const options = await getQuoteInterestOptions(locale);

  return (
    <section id="teklif" aria-labelledby="quote-title" className="container-page py-20 sm:py-24">
      <div className="grid overflow-hidden rounded-2xl border border-border bg-surface shadow-soft lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative bg-ink p-8 text-ink-foreground sm:p-10">
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <SectionHeading id="quote-title" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} tone="ink" />
            <dl className="mt-8 grid gap-5 text-sm">
              <div>
                <dt className="text-ink-muted">{tc("phone")}</dt>
                <dd className="mt-1">
                  <a href={telHref()} className="inline-flex items-center gap-2 text-xl font-bold tabular-nums hover:underline">
                    <Phone aria-hidden="true" className="size-5 text-accent" />
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">{tc("address")}</dt>
                <dd className="mt-1">{fullAddress()}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">{tc("hours")}</dt>
                <dd className="mt-1">{siteConfig.openingHours ? siteConfig.openingHours.display[locale] : tc("hoursUnknown")}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <QuoteForm options={options} />
        </div>
      </div>
    </section>
  );
}
