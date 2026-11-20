# Tüpaş Yangın Güvenlik Sistemleri – Web Sitesi

Tüpaş'ın kurumsal web sitesi. Next.js 15 (App Router) + TypeScript, Tailwind CSS v4, next-intl (TR/EN) ile geliştirildi; Vercel'e deploy edilmek üzere hazırlandı.

## Kurulum

Gereksinimler: Node.js 20+ ve pnpm.

```bash
pnpm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
pnpm dev                      # http://localhost:3000  →  /tr'ye yönlenir
```

| Komut | Açıklama |
| --- | --- |
| `pnpm dev` | Geliştirme sunucusu (Turbopack) |
| `pnpm build` | Üretim derlemesi (tüm sayfalar statik üretilir) |
| `pnpm start` | Derlenmiş siteyi çalıştırır |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript kontrolü |
| `pnpm audit:seo` | `pnpm build` sonrası tüm sayfalarda başlık ≤ 60, açıklama ≤ 155, tek `h1` ve tekrar eden başlık kontrolü |

> **Windows notu:** Derlemede `@next/swc-win32-x64-msvc ... DLL initialization routine failed` uyarısı görülürse [Microsoft Visual C++ Redistributable (x64)](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist) kurun. Uyarı derlemeyi durdurmaz (Next.js WASM'a düşer) ama yavaşlatır.

## Ortam değişkenleri

Hepsi `.env.example` içinde açıklamalı. Gerçek değerler **repoya girmez**; Vercel'de *Project Settings → Environment Variables* altına eklenir.

| Değişken | Zorunlu | Açıklama |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Evet | Kanonik adres, ör. `https://www.tupas.com.tr` (sonda `/` yok). Canonical, hreflang, sitemap ve JSON-LD bunu kullanır. |
| `RESEND_API_KEY` | Üretimde evet | [Resend](https://resend.com) API anahtarı. |
| `QUOTE_FROM_EMAIL` | Üretimde evet | Gönderen adresi; Resend'de doğrulanmış alan adında olmalı, ör. `Tüpaş Web <form@tupas.com.tr>`. |
| `QUOTE_TO_EMAIL` | Üretimde evet | Talepleri alacak adres(ler), virgülle ayrılmış. |

Resend değişkenleri yoksa geliştirmede form gönderimleri sunucu konsoluna yazılır; üretimde form hata döner (talep sessizce kaybolmasın diye).

## Proje yapısı

```
app/
  [locale]/            Tüm sayfalar (tr, en). Klasör adları Türkçe rota anahtarlarıdır.
  api/quote/route.ts   Teklif formu: sunucu tarafı doğrulama, honeypot, rate limit, Resend
  sitemap.ts robots.ts icon.png apple-icon.png
components/
  ui/                  shadcn/ui tabanlı temel bileşenler (button, input, accordion, sheet)
  sections/            Sayfa bölümleri (hero, page-header, CTA, SSS, yasal sayfa…)
  catalog/             Yangın ve iş güvenliği kataloğu için ortak görünümler + filtre
  layout/              Header, mega menü, mobil menü, footer, breadcrumb, çerez bildirimi
  cards/ forms/ blog/ contact/ media/ motion/ seo/
content/blog/{tr,en}/  Blog yazıları (MDX)
data/                  Tipli içerik: kategoriler, ürünler, hizmetler, SSS, yasal metinler
i18n/                  next-intl yönlendirme ve yerelleştirilmiş URL'ler
lib/
  site-config.ts       Firma bilgileri – TEK KAYNAK (telefon, adres, sosyal medya, belgeler…)
  content.ts           İçerik erişim katmanı (CMS'e geçişte yalnızca bu dosya değişir)
  seo.ts jsonld.ts og.tsx routes.ts quote-schema.ts rate-limit.ts blog.ts
messages/{tr,en}.json  Arayüz metinleri
public/brand/          Logolar ve ikon
```

## İçerik ekleme rehberi

### Firma bilgileri

Telefon, adres, e-posta, WhatsApp, çalışma saatleri, koordinat, sosyal medya ve belge bilgileri yalnızca `lib/site-config.ts` içinde tutulur. Değer `null` ise ilgili alan sitede otomatik gizlenir (ör. `whatsapp: null` → WhatsApp butonu görünmez). Deneyim yılı 1983'ten dinamik hesaplanır; sayfalar günde bir yeniden üretildiği için yıl değişince kendiliğinden güncellenir.

### Ürün eklemek

1. Yangın ürünleri `data/fire-products.ts`, iş güvenliği ürünleri `data/safety.ts` içindedir.
2. Yeni bir nesne ekleyin: `slug` (yalnızca küçük harf, rakam, `-`; Türkçe karakter yok), `category` (mevcut kategori slug'ı), isteğe bağlı `subtype` (kategori filtresindeki tip), `name`, `summary`, `description` alanlarının hem `tr` hem `en` değeri.
3. Yalnızca **doğrulanmış** standartları `standards` alanına yazın. Emin olmadığınız bilgi için `// TODO: doğrulanmalı` yorumu bırakın.
4. `pnpm build` – sayfa, sitemap kaydı, Product JSON-LD ve OG görseli otomatik oluşur.

Kategori eklemek için `data/fire-categories.ts` veya `data/safety.ts` içindeki kategori listesine ekleme yapın. Ana sayfadaki 8 kategori `featured: true` ile seçilir.

### Görsel eklemek

1. Dosyayı `public/images/...` altına koyun (JPEG/PNG yeterli; Next.js AVIF/WebP'ye kendisi çevirir). Ürün görselleri için 4:3 oran önerilir (ör. 1200×900).
2. İlgili ürün/kategoriye `image` alanını ekleyin:

```ts
image: {
  src: "/images/urunler/6-kg-kkt.jpg",
  alt: { tr: "6 kg ABC kuru kimyevi tozlu yangın söndürme cihazı", en: "6 kg ABC dry powder fire extinguisher" },
  width: 1200,
  height: 900,
},
```

Görsel olmayan yerlerde nötr bir yer tutucu gösterilir. Hero ve Hakkımızda'daki tesis fotoğrafı için ilgili bileşenlerdeki `TODO` yorumlarına bakın.

### Blog yazısı eklemek

`content/blog/tr/<slug>.mdx` ve aynı slug ile `content/blog/en/<slug>.mdx` oluşturun:

```mdx
---
title: "60 karakteri aşmayan başlık"
description: "155 karakteri aşmayan özet."
date: "2026-11-20"
tags: ["bakım"]
---

Metin… Tablolar (GFM) ve `<Callout>` bileşeni kullanılabilir.
```

Liste, sitemap, Article JSON-LD ve OG görseli otomatik oluşur. Yasal/teknik iddialar yayından önce doğrulanmalıdır.

### Arayüz metinleri ve URL'ler

- Arayüz metinleri `messages/tr.json` ve `messages/en.json` içindedir; iki dosyadaki anahtarlar aynı olmalıdır (TypeScript kontrol eder).
- İngilizce sayfa adresleri (`/en/products`, `/en/services`…) `i18n/routing.ts` içindeki `pathnames` ile tanımlıdır. Ürün/kategori slug'ları iki dilde ortaktır.
- Eski sitenin adresleri (`/tr/tupas-urunler/...` vb.) `next.config.ts` içinde kalıcı (308) yönlendirmeyle yeni sayfalara bağlanır.

### CMS'e geçiş

Sayfalar içeriği yalnızca `lib/content.ts` (ve blog için `lib/blog.ts`) üzerinden okur. Fonksiyonlar zaten `async` olduğundan bir headless CMS'e (Sanity, Payload, Strapi…) geçişte bu dosyaların gövdesini değiştirmek yeterlidir; `data/types.ts` içindeki tipler CMS şeması için başlangıç noktasıdır.

## Güvenlik

- Form verisi istemcide ve **sunucuda** aynı zod şemasıyla doğrulanır (`lib/quote-schema.ts`).
- API: aynı köken kontrolü, 10 KB gövde sınırı, honeypot alanı, IP başına 10 dakikada 5 istek sınırı. Not: sınırlayıcı bellek içidir; Vercel'de her sunucusuz örnek ayrı sayar. Kalıcı koruma için Upstash Redis / Vercel KV önerilir.
- `next.config.ts`: CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`.
- Google Haritalar yalnızca tıklamayla veya "Kabul et" çerez tercihiyle yüklenir.

## Deploy (Vercel)

1. Repoyu Vercel'e bağlayın (framework otomatik algılanır, kurulum `pnpm install`).
2. Ortam değişkenlerini ekleyin.
3. Alan adını bağlayın ve `NEXT_PUBLIC_SITE_URL` ile aynı olduğundan emin olun.
4. Yayından sonra Google Search Console'a `https://www.tupas.com.tr/sitemap.xml` gönderin.
