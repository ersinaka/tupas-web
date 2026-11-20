import { ArrowRight, BadgeCheck, Download, FileText, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CategoryCard, ProductCard } from "@/components/cards/cards";
import { MediaFrame } from "@/components/media/media-frame";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { Category, Product, ProductLine } from "@/data/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCategories, getProductCount, getProducts, getRelatedProducts, loc } from "@/lib/content";
import { productJsonLd } from "@/lib/jsonld";
import { catalogRoutes, quoteHref } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig, telHref } from "@/lib/site-config";
import { ProductFilter } from "./product-filter";

async function sectionText(line: ProductLine) {
  const tp = await getTranslations("Products");
  const ts = await getTranslations("Safety");
  return line === "fire"
    ? {
        eyebrow: tp("eyebrow"),
        title: tp("title"),
        lead: tp("lead"),
        teaserTitle: tp("safetyTeaserTitle"),
        teaserText: tp("safetyTeaserText"),
        teaserCta: tp("safetyTeaserCta"),
      }
    : {
        eyebrow: ts("eyebrow"),
        title: ts("title"),
        lead: ts("lead"),
        teaserTitle: ts("fireTeaserTitle"),
        teaserText: ts("fireTeaserText"),
        teaserCta: ts("fireTeaserCta"),
      };
}

export async function CatalogIndex({ line, locale }: { line: ProductLine; locale: Locale }) {
  const t = await sectionText(line);
  const tc = await getTranslations("Common");
  const categories = await getCategories(line);
  const counts = await Promise.all(categories.map((c) => getProductCount(line, c.slug)));
  const routes = catalogRoutes[line];
  const other = line === "fire" ? catalogRoutes.safety.index : catalogRoutes.fire.index;

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t.title, href: routes.index }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={quoteHref()}>{tc("requestQuote")}</Link>
          </Button>
          <Button asChild size="lg" variant="outlineInk">
            <a href={siteConfig.catalogUrl} target="_blank" rel="noopener noreferrer">
              <Download aria-hidden="true" /> {tc("downloadCatalog")}
              <span className="sr-only">{tc("opensInNewTab")}</span>
            </a>
          </Button>
        </div>
      </PageHeader>

      <section className="container-page py-16 sm:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <CategoryCard
                href={routes.category(c.slug)}
                icon={c.icon}
                name={loc(c.name, locale)}
                summary={loc(c.summary, locale)}
                meta={tc("productCount", { count: counts[i] ?? 0 })}
                headingLevel="h2"
              />
            </li>
          ))}
        </ul>

        <aside className="mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-surface-2/60 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg">{t.teaserTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.teaserText}</p>
          </div>
          <Button asChild variant="secondary">
            <Link href={other}>
              {t.teaserCta} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </aside>
      </section>

      <CtaBand />
    </>
  );
}

export async function CategoryView({
  line,
  category,
  locale,
}: {
  line: ProductLine;
  category: Category;
  locale: Locale;
}) {
  const t = await sectionText(line);
  const tp = await getTranslations("Products");
  const tc = await getTranslations("Common");
  const routes = catalogRoutes[line];
  const [products, categories] = await Promise.all([getProducts(line, category.slug), getCategories(line)]);
  const name = loc(category.name, locale);

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[
          { label: t.title, href: routes.index },
          { label: name, href: routes.category(category.slug) },
        ]}
        eyebrow={t.eyebrow}
        title={name}
        lead={loc(category.summary, locale)}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={quoteHref(`${line}:${category.slug}`)}>{tc("requestQuote")}</Link>
          </Button>
          <Button asChild size="lg" variant="outlineInk">
            <a href={telHref()}>
              <Phone aria-hidden="true" /> <span className="tabular-nums">{siteConfig.phone.display}</span>
            </a>
          </Button>
        </div>
      </PageHeader>

      <div className="container-page grid gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_17rem]">
        <div>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            {loc(category.description, locale).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <section aria-labelledby="category-products" className="mt-12">
            <h2 id="category-products" className="mb-6 text-2xl">
              {tp("categoryProducts")}
            </h2>
            <ProductFilter
              locale={locale}
              icon={category.icon}
              subtypes={(category.subtypes ?? []).map((s) => ({ slug: s.slug, name: loc(s.name, locale) }))}
              products={products.map((p) => ({
                slug: p.slug,
                subtype: p.subtype,
                name: loc(p.name, locale),
                summary: loc(p.summary, locale),
                href: routes.product(category.slug, p.slug),
                image: p.image,
                inHouse: p.inHouse,
              }))}
            />
          </section>
        </div>

        <aside aria-labelledby="other-categories" className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="other-categories" className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {tp("otherCategories")}
          </h2>
          <ul className="mt-4 grid gap-0.5 border-l border-border">
            {categories.map((c) => {
              const current = c.slug === category.slug;
              return (
                <li key={c.slug}>
                  <Link
                    href={routes.category(c.slug)}
                    aria-current={current ? "page" : undefined}
                    className={
                      current
                        ? "-ml-px block border-l-2 border-brand py-1.5 pl-4 text-sm font-semibold text-foreground"
                        : "-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground hover:border-border hover:text-foreground"
                    }
                  >
                    {loc(c.name, locale)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      <CtaBand />
    </>
  );
}

export async function ProductView({
  line,
  category,
  product,
  locale,
}: {
  line: ProductLine;
  category: Category;
  product: Product;
  locale: Locale;
}) {
  const t = await sectionText(line);
  const tp = await getTranslations("Products");
  const ts = await getTranslations("Specs");
  const tc = await getTranslations("Common");
  const routes = catalogRoutes[line];
  const related = await getRelatedProducts(product);
  const name = loc(product.name, locale);
  const categoryName = loc(category.name, locale);
  const href = routes.product(category.slug, product.slug);
  const features = product.features ? loc(product.features, locale) : [];

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 sm:py-10">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: t.title, href: routes.index },
              { label: categoryName, href: routes.category(category.slug) },
              { label: name, href },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <MediaFrame
              image={product.image}
              locale={locale}
              label={name}
              icon={category.icon}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3]"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-text">{categoryName}</p>
              <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{name}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{loc(product.summary, locale)}</p>
              {product.inHouse ? (
                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5 text-sm font-semibold text-accent-text">
                  <BadgeCheck aria-hidden="true" className="size-4" /> {tc("inHouse")}
                </p>
              ) : null}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={quoteHref(`product:${line}/${category.slug}/${product.slug}`)}>{tp("requestQuote")}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href={telHref()}>
                    <Phone aria-hidden="true" /> <span className="tabular-nums">{siteConfig.phone.display}</span>
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{tp("priceNote")}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-12">
          <div className="max-w-2xl space-y-4 leading-relaxed text-muted-foreground">
            {loc(product.description, locale).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {features.length ? (
            <section aria-labelledby="features-title">
              <h2 id="features-title" className="text-xl">
                {tp("features")}
              </h2>
              <ul className="mt-4 grid gap-3">
                {features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed">
                    <BadgeCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-text" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {product.specs?.length ? (
            <section aria-labelledby="specs-title">
              <h2 id="specs-title" className="text-xl">
                {tp("specs")}
              </h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {product.specs.map((s) => (
                      <tr key={s.key} className="border-b border-border last:border-b-0">
                        <th scope="row" className="w-2/5 bg-surface-2/70 px-4 py-3 font-semibold">
                          {ts(s.key)}
                        </th>
                        <td className="px-4 py-3">{loc(s.value, locale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          {product.standards?.length ? (
            <section aria-labelledby="standards-title" className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <h2 id="standards-title" className="flex items-center gap-2 text-base">
                <FileText aria-hidden="true" className="size-4 text-brand-text" />
                {tp("standards")}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.standards.map((s) => (
                  <li key={s} className="rounded-lg border border-border px-2.5 py-1 text-sm font-semibold">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">{tp("standardsNote")}</p>
              <Link href="/belgeler" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text hover:underline">
                {tc("learnMore")} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </section>
          ) : null}
        </aside>
      </div>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-border bg-surface-2/60">
          <div className="container-page py-14">
            <h2 id="related-title" className="text-2xl">
              {tp("related")}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProductCard
                    href={routes.product(category.slug, r.slug)}
                    locale={locale}
                    name={loc(r.name, locale)}
                    summary={loc(r.summary, locale)}
                    icon={category.icon}
                    image={r.image}
                    badge={r.inHouse ? tc("inHouse") : undefined}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
      <JsonLd data={productJsonLd(product, locale, { url: absoluteUrl(locale, href), categoryName })} />
    </>
  );
}
