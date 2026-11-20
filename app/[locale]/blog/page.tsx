import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta.blog" });
  return buildMetadata({ locale, href: "/blog", title: t("title"), description: t("description") });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const tc = await getTranslations("Common");
  const format = await getFormatter();
  const posts = await getAllPosts(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("eyebrow"), href: "/blog" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <section className="container-page py-16 sm:py-20">
        {posts.length ? (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <time dateTime={post.date}>{format.dateTime(new Date(post.date), { dateStyle: "long" })}</time>
                    <span aria-hidden="true"> · </span>
                    {t("readingTime", { minutes: post.readingMinutes })}
                  </p>
                  <h2 className="mt-3 text-xl leading-snug">
                    <Link
                      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                      className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                  <p aria-hidden="true" className="mt-auto pt-5 text-sm font-semibold text-brand-text">
                    {tc("readMore")} →
                  </p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">{t("empty")}</p>
        )}
      </section>
      <CtaBand />
    </>
  );
}
