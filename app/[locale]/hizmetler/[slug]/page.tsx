import { Check, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CategoryCard } from "@/components/cards/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/home-sections";
import { PageHeader } from "@/components/sections/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCategory, getService, getServices, loc } from "@/lib/content";
import { serviceJsonLd } from "@/lib/jsonld";
import { catalogRoutes, quoteHref } from "@/lib/routes";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { siteConfig, telHref } from "@/lib/site-config";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    href: { pathname: "/hizmetler/[slug]", params: { slug } },
    title: loc(service.seoTitle, locale),
    description: loc(service.seoDescription, locale),
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = await getService(slug);
  if (!service) notFound();

  const t = await getTranslations("Services");
  const tc = await getTranslations("Common");
  const name = loc(service.name, locale);
  const href = { pathname: "/hizmetler/[slug]", params: { slug } } as const;
  const [related, others] = await Promise.all([
    Promise.all((service.relatedCategories ?? []).map((c) => getCategory("fire", c))),
    getServices().then((all) => all.filter((s) => s.slug !== slug)),
  ]);

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[
          { label: t("title"), href: "/hizmetler" },
          { label: name, href },
        ]}
        eyebrow={t("eyebrow")}
        title={name}
        lead={loc(service.summary, locale)}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={quoteHref(`service:${service.slug}`)}>{tc("requestQuote")}</Link>
          </Button>
          <Button asChild size="lg" variant="outlineInk">
            <a href={telHref()}>
              <Phone aria-hidden="true" /> <span className="tabular-nums">{siteConfig.phone.display}</span>
            </a>
          </Button>
        </div>
      </PageHeader>

      <div className="container-page grid gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_20rem]">
        <article className="max-w-2xl">
          <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
            {loc(service.intro, locale).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {service.sections.map((s, i) => (
            <section key={i} className="mt-10">
              <h2 className="text-2xl">{loc(s.heading, locale)}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                {loc(s.body, locale).map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <section aria-labelledby="includes-title" className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h2 id="includes-title" className="text-base">
              {t("includes")}
            </h2>
            <ul className="mt-4 grid gap-3">
              {loc(service.includes, locale).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-text" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full">
              <Link href={quoteHref(`service:${service.slug}`)}>{tc("freeSurvey")}</Link>
            </Button>
          </section>

          <nav aria-labelledby="other-services" className="mt-8">
            <h2 id="other-services" className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {t("otherServices")}
            </h2>
            <ul className="mt-3 grid gap-1">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={{ pathname: "/hizmetler/[slug]", params: { slug: s.slug } }}
                    className="block rounded-lg py-1.5 text-sm text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {loc(s.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      {related.some(Boolean) ? (
        <section aria-labelledby="related-title" className="border-t border-border bg-surface-2/60">
          <div className="container-page py-14">
            <h2 id="related-title" className="text-2xl">
              {t("relatedProducts")}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) =>
                c ? (
                  <li key={c.slug}>
                    <CategoryCard
                      href={catalogRoutes.fire.category(c.slug)}
                      icon={c.icon}
                      name={loc(c.name, locale)}
                      summary={loc(c.summary, locale)}
                    />
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </section>
      ) : null}

      {service.faqs?.length ? <FaqSection locale={locale} faqs={service.faqs} title={t("faq")} /> : null}
      <CtaBand />
      <JsonLd data={serviceJsonLd(service, locale, absoluteUrl(locale, href))} />
    </>
  );
}
