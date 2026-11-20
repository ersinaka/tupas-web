/**
 * Minimal in-memory sliding-window rate limiter.
 * On serverless platforms each instance has its own memory, so this is a best-effort guard;
 * for stricter limits swap it for a shared store (e.g. Upstash Redis) behind the same API.
 */

type Bucket = number[];

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5_000;

export function rateLimit(key: string, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    const oldest = recent[0] ?? now;
    return { ok: false as const, retryAfter: Math.ceil((oldest + windowMs - now) / 1000) };
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > MAX_KEYS) {
    for (const [k, times] of buckets) {
      if (times.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { ok: true as const, remaining: limit - recent.length };
}
