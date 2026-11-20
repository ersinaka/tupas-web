import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isDev = process.env.NODE_ENV !== "production";

// next-themes and JSON-LD rely on inline scripts; nonce-based CSP would force
// every page to render dynamically, which conflicts with the static-first setup.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const legacyRedirects: Array<{ source: string; destination: string }> = [
  { source: "/tr/tupas-anasayfa", destination: "/tr" },
  { source: "/tr/tupas-hakkimizda", destination: "/tr/hakkimizda" },
  { source: "/tr/tupas-iletisim-bilgileri", destination: "/tr/iletisim" },
  { source: "/tr/tupas-urunler", destination: "/tr/urunler" },
  { source: "/tr/tupas-urunler/:path*", destination: "/tr/urunler" },
  { source: "/tr/tupas-urun-detay/:path*", destination: "/tr/urunler" },
  { source: "/tr/tupas-is-guvenligi", destination: "/tr/is-guvenligi" },
  { source: "/tr/tupas-is-guvenligi/:path*", destination: "/tr/is-guvenligi" },
  { source: "/tr/tupas-guvenlik-detay/:path*", destination: "/tr/is-guvenligi" },
  { source: "/tr/tupas-hizmetler/1/:slug", destination: "/tr/hizmetler/ucretsiz-kesif" },
  { source: "/tr/tupas-hizmetler/2/:slug", destination: "/tr/hizmetler/yangin-tatbikati" },
  { source: "/tr/tupas-hizmetler/3/:slug", destination: "/tr/hizmetler/davlumbaz-sondurme-sistemleri" },
  { source: "/tr/tupas-hizmetler/5/:slug", destination: "/tr/hizmetler/itfaiye-ruhsati" },
  { source: "/tr/tupas-hizmetler/6/:slug", destination: "/tr/hizmetler/dolum-ve-bakim" },
  { source: "/tr/tupas-hizmetler/:path*", destination: "/tr/hizmetler" },
  { source: "/tr/tupas-haberler/:path*", destination: "/tr/blog" },
  { source: "/tr/tupas-insan-kaynaklari", destination: "/tr/iletisim" },
];

const nextConfig: NextConfig = {
  // A lockfile in a parent folder can otherwise be mistaken for the workspace root.
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default withNextIntl(nextConfig);
