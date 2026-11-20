import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BlogIcon, FacebookIcon, InstagramIcon, LinkedinIcon, Logo, XIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getFeaturedCategories, getServices, loc } from "@/lib/content";
import { fullAddress, siteConfig, telHref } from "@/lib/site-config";
import { CookiePreferencesButton } from "./cookie-consent";

const linkClass = "rounded text-ink-muted transition-colors hover:text-ink-foreground hover:underline";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("Footer");
  const tn = await getTranslations("Nav");
  const tc = await getTranslations("Common");
  const [categories, services] = await Promise.all([getFeaturedCategories(), getServices()]);

  const socials = [
    { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: siteConfig.social.x, label: "X (Twitter)", Icon: XIcon },
    { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: siteConfig.social.blog, label: t("oldBlog"), Icon: BlogIcon },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block rounded-lg" aria-label={siteConfig.legalName}>
            <Logo variant="onDark" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">{t("tagline")}</p>

          <address className="mt-6 grid gap-3 text-sm not-italic">
            <p className="font-semibold">{siteConfig.legalName}</p>
            <p className="flex gap-2.5 text-ink-muted">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{fullAddress()}</span>
            </p>
            <p className="flex gap-2.5">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={telHref()} className="font-semibold tabular-nums hover:underline">
                {siteConfig.phone.display}
              </a>
            </p>
            {siteConfig.email ? (
              <p className="flex gap-2.5">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            ) : null}
            <p className="flex gap-2.5 text-ink-muted">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{siteConfig.openingHours ? siteConfig.openingHours.display[locale] : tc("hoursUnknown")}</span>
            </p>
          </address>

          {socials.length ? (
            <ul className="mt-6 flex gap-2" aria-label={t("social")}>
              {socials.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-xl border border-white/15 text-ink-muted transition-colors hover:border-white/40 hover:text-ink-foreground"
                  >
                    <Icon className="size-[1.1rem]" />
                    <span className="sr-only">
                      {label} {tc("opensInNewTab")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <FooterColumn title={t("products")}>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={{ pathname: "/urunler/[kategori]", params: { kategori: c.slug } }} className={linkClass}>
                {loc(c.name, locale)}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/is-guvenligi" className={linkClass}>
              {tn("safetyLong")}
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title={t("services")}>
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={{ pathname: "/hizmetler/[slug]", params: { slug: s.slug } }} className={linkClass}>
                {loc(s.name, locale)}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t("corporate")}>
          <li>
            <Link href="/hakkimizda" className={linkClass}>
              {tn("about")}
            </Link>
          </li>
          <li>
            <Link href="/belgeler" className={linkClass}>
              {tn("certificates")}
            </Link>
          </li>
          <li>
            <Link href="/blog" className={linkClass}>
              {tn("blog")}
            </Link>
          </li>
          <li>
            <Link href="/iletisim" className={linkClass}>
              {tn("contact")}
            </Link>
          </li>
          <li>
            <Link href="/teklif-al" className={linkClass}>
              {tc("requestQuote")}
            </Link>
          </li>
          <li>
            <a href={siteConfig.catalogUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {tc("downloadCatalog")}
              <span className="sr-only"> {tc("opensInNewTab")}</span>
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>{t("rights", { year: new Date().getFullYear(), name: siteConfig.legalName })}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/kvkk" className={linkClass}>
                {t("kvkk")}
              </Link>
            </li>
            <li>
              <Link href="/gizlilik" className={linkClass}>
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/cerez" className={linkClass}>
                {t("cookies")}
              </Link>
            </li>
            <li>
              <CookiePreferencesButton>{t("cookiePrefs")}</CookiePreferencesButton>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink-foreground">{title}</h2>
      <ul className="mt-4 grid gap-2.5 text-sm">{children}</ul>
    </div>
  );
}
