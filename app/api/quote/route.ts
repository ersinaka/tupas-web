import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { routing, type Locale } from "@/i18n/routing";
import { getCategory, getProduct, getService } from "@/lib/content";
import { HONEYPOT_FIELD, quoteSchema, type QuoteData } from "@/lib/quote-schema";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";
import { escapeHtml } from "@/lib/utils";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;

function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // Non-browser clients; still validated and rate limited.
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

/** Resolves the machine value of the "interest" select to a human-readable label (TR, for the team). */
async function interestLabel(value: string): Promise<string | null> {
  if (value === "other") return "Diğer / emin değil";
  const [kind, rest = ""] = value.split(":");
  if (kind === "service") {
    const s = await getService(rest);
    return s ? `Hizmet: ${s.name.tr}` : null;
  }
  if (kind === "fire" || kind === "safety") {
    const c = await getCategory(kind, rest);
    return c ? `Kategori: ${c.name.tr}` : null;
  }
  if (kind === "product") {
    const [line, category, slug] = rest.split("/");
    if ((line !== "fire" && line !== "safety") || !category || !slug) return null;
    const p = await getProduct(line, category, slug);
    return p ? `Ürün: ${p.name.tr}` : null;
  }
  return null;
}

function buildEmail(data: QuoteData, interest: string, locale: Locale) {
  const rows: Array<[string, string]> = [
    ["Ad soyad", data.name],
    ["Firma", data.company || "—"],
    ["Telefon", data.phone],
    ["E-posta", data.email || "—"],
    ["İlgi alanı", interest],
    ["Dil", locale.toUpperCase()],
    ["Mesaj", data.message || "—"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:sans-serif">Yeni teklif / keşif talebi</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top">${escapeHtml(k)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
  return { text, html };
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const limited = rateLimit(`quote:${clientIp(req)}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots don't learn anything.
  const trap = body[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = quoteSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: result.error.issues.map((i) => ({ path: i.path, message: i.message })) },
      { status: 422 },
    );
  }

  const data = result.data;
  const interest = await interestLabel(data.interest);
  if (!interest) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: [{ path: ["interest"], message: "interestRequired" }] },
      { status: 422 },
    );
  }

  const locale: Locale = routing.locales.includes(body.locale as Locale) ? (body.locale as Locale) : routing.defaultLocale;
  const { text, html } = buildEmail(data, interest, locale);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const to = process.env.QUOTE_TO_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean);

  if (!apiKey || !from || !to?.length) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[quote] Resend not configured – submission logged instead:\n" + text);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[quote] Missing RESEND_API_KEY / QUOTE_FROM_EMAIL / QUOTE_TO_EMAIL");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    ...(data.email ? { replyTo: data.email } : {}),
    subject: `Web teklif talebi: ${data.name}${data.company ? ` (${data.company})` : ""} – ${siteConfig.shortName}`,
    text,
    html,
  });

  if (error) {
    console.error("[quote] Resend error", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
}
