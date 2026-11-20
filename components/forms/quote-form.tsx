"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useRef, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import type { QuoteInterestOptions } from "@/lib/content";
import { HONEYPOT_FIELD, quoteSchema, type QuoteData, type QuoteInput } from "@/lib/quote-schema";
import { cn } from "@/lib/utils";

type Props = {
  options: QuoteInterestOptions;
  defaultInterest?: string;
  /** Extra option shown on top, e.g. the product the visitor came from. */
  selectedOption?: { value: string; label: string };
  className?: string;
};

export function QuoteForm({ options, defaultInterest, selectedOption, className }: Props) {
  const t = useTranslations("QuoteForm");
  const locale = useLocale();
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      interest: defaultInterest ?? selectedOption?.value ?? "",
      message: "",
      kvkk: false,
    },
  });

  const errorText = (error?: FieldError) => {
    if (!error?.message) return undefined;
    const key = `errors.${error.message}`;
    return t.has(key as "errors.tooLong") ? t(key as "errors.tooLong") : t("errors.tooLong");
  };

  const onSubmit = async (data: QuoteData) => {
    setSent(false);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, [HONEYPOT_FIELD]: honeypotRef.current?.value ?? "" }),
      });

      if (res.status === 429) {
        toast.error(t("errorTitle"), { description: t("rateLimited") });
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast.success(t("successTitle"), { description: t("successText") });
      setSent(true);
      reset();
    } catch {
      toast.error(t("errorTitle"), { description: t("errorText") });
    }
  };

  const fieldError = (name: keyof QuoteInput) => {
    const message = errorText(errors[name]);
    return message ? (
      <p id={id(`${name}-error`)} className="text-sm font-medium text-brand-text">
        {message}
      </p>
    ) : null;
  };

  const a11y = (name: keyof QuoteInput) => ({
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? id(`${name}-error`) : undefined,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={t("title")}
      className={cn("grid gap-5", className)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={id("name")}>
            {t("name")} <span aria-hidden="true" className="text-brand-text">*</span>
          </Label>
          <Input autoComplete="name" aria-required="true" {...a11y("name")} {...register("name")} />
          {fieldError("name")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={id("company")}>
            {t("company")} <span className="font-normal text-muted-foreground">{t("optional")}</span>
          </Label>
          <Input autoComplete="organization" {...a11y("company")} {...register("company")} />
          {fieldError("company")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={id("phone")}>
            {t("phone")} <span aria-hidden="true" className="text-brand-text">*</span>
          </Label>
          <Input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-required="true"
            placeholder="05xx xxx xx xx"
            {...a11y("phone")}
            {...register("phone")}
          />
          {fieldError("phone")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={id("email")}>
            {t("email")} <span className="font-normal text-muted-foreground">{t("optional")}</span>
          </Label>
          <Input type="email" autoComplete="email" {...a11y("email")} {...register("email")} />
          {fieldError("email")}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={id("interest")}>
          {t("interest")} <span aria-hidden="true" className="text-brand-text">*</span>
        </Label>
        <Select aria-required="true" {...a11y("interest")} {...register("interest")}>
          <option value="">{t("interestPlaceholder")}</option>
          {selectedOption ? (
            <optgroup label={t("groups.selected")}>
              <option value={selectedOption.value}>{selectedOption.label}</option>
            </optgroup>
          ) : null}
          <optgroup label={t("groups.services")}>
            {options.services.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
          <optgroup label={t("groups.fire")}>
            {options.fire.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
          <optgroup label={t("groups.safety")}>
            {options.safety.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
          <option value="other">{t("other")}</option>
        </Select>
        {fieldError("interest")}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={id("message")}>
          {t("message")} <span className="font-normal text-muted-foreground">{t("optional")}</span>
        </Label>
        <Textarea rows={4} placeholder={t("messagePlaceholder")} {...a11y("message")} {...register("message")} />
        {fieldError("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech, often filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id(HONEYPOT_FIELD)}>{t("honeypot")}</label>
        <input ref={honeypotRef} id={id(HONEYPOT_FIELD)} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-border accent-[var(--brand)]"
            aria-required="true"
            {...a11y("kvkk")}
            {...register("kvkk")}
          />
          <label htmlFor={id("kvkk")} className="text-sm leading-relaxed text-muted-foreground">
            {t.rich("kvkk", {
              link: (chunks) => (
                <Link href="/kvkk" target="_blank" className="font-semibold text-brand-text underline underline-offset-4">
                  {chunks}
                </Link>
              ),
            })}
          </label>
        </div>
        {fieldError("kvkk")}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting} className="sm:min-w-48">
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="animate-spin" />
              {t("submitting")}
            </>
          ) : (
            t("submit")
          )}
        </Button>
        <p role="status" aria-live="polite" className="text-sm">
          {sent ? (
            <span className="inline-flex items-center gap-2 font-medium text-foreground">
              <CheckCircle2 aria-hidden="true" className="size-4 text-[#1f8a4c]" />
              {t("successText")}
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
}
