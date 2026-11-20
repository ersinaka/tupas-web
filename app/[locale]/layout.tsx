import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { routing } from "@/i18n/routing";
import { organizationJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

// Re-generate static pages daily so the experience-years counter and footer year stay current.
export const revalidate = 86400;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.legalName }],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1118" },
  ],
  colorScheme: "light dark",
};

/** Message namespaces needed by client components; keeps the client payload small. */
const CLIENT_NAMESPACES = ["Nav", "Common", "QuoteForm", "Cookie", "Products", "Error"] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]),
  ) as Pick<typeof messages, (typeof CLIENT_NAMESPACES)[number]>;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <Providers>
            <Header locale={locale} />
            <main id="main" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer locale={locale} />
            <WhatsappButton />
            <CookieConsent />
          </Providers>
        </NextIntlClientProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
