import Link from "next/link";

// Fallback for requests outside any locale (e.g. /foo without /tr or /en).
export default function GlobalNotFound() {
  return (
    <html lang="tr">
      <body className="grid min-h-dvh place-items-center bg-background p-6 font-sans text-foreground">
        <main className="max-w-md text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-text">404</p>
          <h1 className="mt-3 text-3xl font-bold">Sayfa bulunamadı</h1>
          <p className="mt-3 text-muted-foreground">Page not found.</p>
          <div className="mt-6 flex justify-center gap-3 text-sm font-semibold">
            <Link href="/tr" className="rounded-xl bg-brand px-4 py-2.5 text-brand-foreground">
              Ana sayfa
            </Link>
            <Link href="/en" className="rounded-xl border border-border px-4 py-2.5">
              Home (EN)
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
