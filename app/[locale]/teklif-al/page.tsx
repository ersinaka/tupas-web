import { Check, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHeader } from "@/components/sections/page-header";
import type { ProductLine } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { getProduct, getQuoteInterestOptions, loc } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, telHref } from "@/lib/site-config";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ ilgi?: string | string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.quote" });
  return buildMetadata({ locale, href: "/teklif-al", title: t("title"), description: t("description") });
}

const PRODUCT_INTEREST = /^product:(fire|safety)\/([a-z0-9-]+)\/([a-z0-9-]+)$/;

/** Turns `?ilgi=` into a preselected option; unknown values are ignored. */
async function resolveInterest(raw: string | undefined, locale: Locale) {
  const options = await getQuoteInterestOptions(locale);
  if (!raw) return { options };

  const match = PRODUCT_INTEREST.exec(raw);
  if (match) {
    const [, line, kategori, slug] = match as unknown as [string, ProductLine, string, string];
    const product = await getProduct(line, kategori, slug);
    return product
      ? { options, selectedOption: { value: raw, label: loc(product.name, locale) } }
      : { options };
  }

  const known = [...options.services, ...options.fire, ...options.safety].some((o) => o.value === raw);
  return known || raw === "other" ? { options, defaultInterest: raw } : { options };
}

export default async function QuotePage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ilgi } = await searchParams;
  const t = await getTranslations("Quote");
  const tc = await getTranslations("Common");
  const { options, selectedOption, defaultInterest } = await resolveInterest(
    Array.isArray(ilgi) ? ilgi[0] : ilgi,
    locale,
  );

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("eyebrow"), href: "/teklif-al" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <div className="container-page grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
          <QuoteForm options={options} selectedOption={selectedOption} defaultInterest={defaultInterest} />
        </section>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-xl">{t("benefitsTitle")}</h2>
          <ol className="mt-5 grid gap-4">
            {(["call", "survey", "offer"] as const).map((key, i) => (
              <li key={key} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-accent dark:bg-surface-2">
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed">{t(`benefits.${key}`)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl bg-surface-2/70 p-5">
            <p className="text-sm text-muted-foreground">{tc("callUs")}</p>
            <a href={telHref()} className="mt-1 inline-flex items-center gap-2 text-xl font-bold tabular-nums hover:underline">
              <Phone aria-hidden="true" className="size-5 text-brand-text" />
              {siteConfig.phone.display}
            </a>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Check aria-hidden="true" className="size-4 text-brand-text" /> {tc("freeSurvey")}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
