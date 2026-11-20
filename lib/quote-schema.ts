import * as z from "zod/mini";

/**
 * Shared between the client form (react-hook-form) and the `/api/quote` route handler.
 * Uses `zod/mini` to keep the client bundle small. Error messages are translation keys
 * under `QuoteForm.errors`.
 */

const digits = (v: string) => v.replace(/\D/g, "").length;

export const quoteSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, { error: "nameRequired" }), z.maxLength(80, { error: "tooLong" })),
  company: z.string().check(z.trim(), z.maxLength(120, { error: "tooLong" })),
  phone: z
    .string()
    .check(
      z.trim(),
      z.maxLength(25, { error: "tooLong" }),
      z.refine((v) => /^[+\d\s()-]+$/.test(v) && digits(v) >= 10 && digits(v) <= 15, { error: "phoneInvalid" }),
    ),
  email: z.union([
    z.literal(""),
    z.email({ error: "emailInvalid" }).check(z.maxLength(160, { error: "tooLong" })),
  ]),
  interest: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, { error: "interestRequired" }),
      z.maxLength(160, { error: "tooLong" }),
      z.regex(/^(other|(service|fire|safety):[a-z0-9-]+|product:(fire|safety)\/[a-z0-9-]+\/[a-z0-9-]+)$/, {
        error: "interestRequired",
      }),
    ),
  message: z.string().check(z.trim(), z.maxLength(2000, { error: "tooLong" })),
  kvkk: z.boolean({ error: "kvkkRequired" }).check(z.refine((v) => v === true, { error: "kvkkRequired" })),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

/** Honeypot field name. Real users never see or fill it. */
export const HONEYPOT_FIELD = "website";
