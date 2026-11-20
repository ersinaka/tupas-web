/**
 * Content model. Shapes are intentionally CMS-friendly: plain serialisable objects,
 * localized fields as `{ tr, en }`, references by slug, icons by name.
 * Pages must read content only through `lib/content.ts`.
 */

import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

/** Product line: fire safety products vs. occupational safety (İSG) equipment. */
export type ProductLine = "fire" | "safety";

export type IconName =
  | "extinguisher"
  | "cabinet"
  | "reel"
  | "hose"
  | "foam"
  | "hydrant"
  | "tools"
  | "detection"
  | "suppression"
  | "lighting"
  | "sign"
  | "door"
  | "accessory"
  | "firstAid"
  | "garment"
  | "helmet"
  | "glove"
  | "boot"
  | "respiratory"
  | "chemical"
  | "eye"
  | "harness"
  | "blanket"
  | "flashlight"
  | "gauge"
  | "rescue"
  | "survey"
  | "refill"
  | "permit"
  | "drill"
  | "kitchen";

export type Subtype = {
  slug: string;
  name: Localized;
};

export type Category = {
  slug: string;
  line: ProductLine;
  icon: IconName;
  name: Localized;
  /** One-line summary for cards (≈ 90–140 chars). */
  summary: Localized;
  /** 1–3 short paragraphs for the category page intro. */
  description: Localized<string[]>;
  /** Shown on the home page grid (exactly 8 fire categories). */
  featured?: boolean;
  /** Filter chips on the category page. */
  subtypes?: Subtype[];
  /** Optional page title override when the name is too long for ≤60 chars. */
  seoTitle?: Localized;
  image?: ImageAsset;
};

export type ImageAsset = {
  src: string;
  alt: Localized;
  width: number;
  height: number;
};

export type SpecKey =
  | "agent"
  | "capacity"
  | "fireClasses"
  | "operation"
  | "body"
  | "dimensions"
  | "material"
  | "length"
  | "diameter"
  | "pressure"
  | "use"
  | "type"
  | "scope"
  | "size"
  | "power"
  | "protection";

export type Spec = {
  key: SpecKey;
  value: Localized;
};

export type Product = {
  slug: string;
  line: ProductLine;
  category: string;
  subtype?: string;
  name: Localized;
  summary: Localized;
  description: Localized<string[]>;
  features?: Localized<string[]>;
  specs?: Spec[];
  /** Standards / certificates that apply to this product. Only list verified ones. */
  standards?: string[];
  /** Produced in Tüpaş's own facility. */
  inHouse?: boolean;
  image?: ImageAsset;
};

export type ServiceSection = {
  heading: Localized;
  body: Localized<string[]>;
};

export type Service = {
  slug: string;
  icon: IconName;
  name: Localized;
  summary: Localized;
  seoTitle: Localized;
  seoDescription: Localized;
  intro: Localized<string[]>;
  sections: ServiceSection[];
  includes: Localized<string[]>;
  /** Related product categories (fire line) by slug. */
  relatedCategories?: string[];
  faqs?: Faq[];
};

export type Faq = {
  question: Localized;
  answer: Localized;
};

export type Sector = {
  slug: string;
  name: Localized;
  note: Localized;
};
