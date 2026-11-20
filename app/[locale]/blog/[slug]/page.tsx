import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPost, getPostSlugs } from "@/lib/blog";
import { articleJsonLd } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!hasLocale(routing.locales, params.locale)) return [];
  return (await getPostSlugs(params.locale)).map((slug) => ({ slug }));
}

const postHref = (slug: string) => ({ pathname: "/blog/[slug]", params: { slug } }) as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    href: postHref(slug),
    title: post.meta.title,
    description: post.meta.description,
    type: "article",
    publishedTime: post.meta.date,
    modifiedTime: post.meta.updated ?? post.meta.date,
    ogImage: `/${locale}/blog/${slug}/opengraph-image`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");
  const format = await getFormatter();
  const { meta, content } = post;
  const url = absoluteUrl(locale, postHref(slug));

  return (
    <>
      <article>
        <header className="border-b border-border bg-surface">
          <div className="container-page max-w-3xl py-10 sm:py-14">
            <Breadcrumbs
              locale={locale}
              items={[
                { label: t("eyebrow"), href: "/blog" },
                { label: meta.title, href: postHref(slug) },
              ]}
            />
            <h1 className="mt-8 text-3xl leading-tight sm:text-5xl">{meta.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{meta.description}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              <span className="sr-only">{t("published")}: </span>
              <time dateTime={meta.date}>{format.dateTime(new Date(meta.date), { dateStyle: "long" })}</time>
              <span aria-hidden="true"> · </span>
              {t("readingTime", { minutes: meta.readingMinutes })}
            </p>
          </div>
        </header>
        <div className="container-page max-w-3xl py-12">
          <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-brand-text">
            {content}
          </div>
          <Link
            href="/blog"
            className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand-text hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="size-4" /> {t("allPosts")}
          </Link>
        </div>
      </article>
      <CtaBand />
      <JsonLd
        data={articleJsonLd({
          title: meta.title,
          description: meta.description,
          url,
          datePublished: meta.date,
          dateModified: meta.updated ?? meta.date,
          locale,
        })}
      />
    </>
  );
}
