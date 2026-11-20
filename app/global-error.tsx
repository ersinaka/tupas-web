"use client";

// Last-resort boundary when the locale layout itself fails; must render its own <html>.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="tr">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100dvh", margin: 0 }}>
        <main style={{ maxWidth: 420, textAlign: "center", padding: 24 }}>
          <h1 style={{ fontSize: 24 }}>Bir şeyler ters gitti / Something went wrong</h1>
          <p style={{ color: "#525866" }}>Lütfen tekrar deneyin. / Please try again.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 16, padding: "10px 18px", borderRadius: 12, border: 0, background: "#d62828", color: "#fff", fontWeight: 600 }}
          >
            Tekrar dene / Retry
          </button>
        </main>
      </body>
    </html>
  );
}
