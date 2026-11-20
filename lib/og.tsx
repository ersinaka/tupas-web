import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Fetches an Inter subset containing exactly the glyphs we render (incl. Turkish letters). */
async function loadInter(weight: 600 | 800, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

async function logoDataUri() {
  const file = await readFile(path.join(process.cwd(), "public", siteConfig.logoOnDark));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export async function renderOgImage({
  locale,
  eyebrow: rawEyebrow,
  title,
  footer,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  footer: string;
}) {
  // Uppercased here rather than via CSS so the font subset contains the right glyphs (İ vs I).
  const eyebrow = rawEyebrow.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US");
  const [logo, bold, semi] = await Promise.all([
    logoDataUri(),
    loadInter(800, title),
    loadInter(600, `${eyebrow}${footer}`),
  ]);
  const fonts = [
    ...(bold ? [{ name: "Inter", data: bold, weight: 800 as const, style: "normal" as const }] : []),
    ...(semi ? [{ name: "Inter", data: semi, weight: 600 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#111722",
          color: "#f4f2ee",
          fontFamily: "Inter",
          borderBottom: "14px solid #d62828",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img> only */}
        <img src={logo} width={258} height={80} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: "#f0a63a", letterSpacing: 2 }}>
            {eyebrow}
          </div>
          <div style={{ marginTop: 18, fontSize: title.length > 48 ? 58 : 68, fontWeight: 800, lineHeight: 1.08, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, color: "#a9b0bc" }}>{footer}</div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  );
}
