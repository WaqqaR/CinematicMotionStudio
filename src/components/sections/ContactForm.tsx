"use client";

import { useActionState } from "react";
import { CheckCircle, ArrowUpRight } from "@phosphor-icons/react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { site } from "@/lib/site";

const initial: ContactState = { status: "idle" };

const fieldBase =
  "neu-inset w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-faint outline-none focus:ring-2 focus:ring-accent-2/40";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initial);

  if (state.status === "success") {
    return (
      <div className="neu mx-auto max-w-xl rounded-[24px] px-7 py-14 text-center md:px-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-2/12">
          <CheckCircle size={28} weight="fill" className="text-accent-2" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Got it — thank you.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your enquiry is on its way to the {site.brand} team. We&apos;ll come
          back with a creative direction and a scoped quote within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="neu mx-auto max-w-2xl rounded-[24px] px-6 py-10 md:px-10 md:py-12"
      noValidate
    >
      {/* Honeypot — hidden from people, catnip for bots */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Company URL
          <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Name <span className="text-accent-2">*</span>
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldBase}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Work email <span className="text-accent-2">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@brand.com"
            className={fieldBase}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Brand / company
          </span>
          <input
            name="company"
            autoComplete="organization"
            placeholder="Brand name"
            className={fieldBase}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Where will the ads run?
          </span>
          <input
            name="channels"
            placeholder="Meta, TikTok, site, retail…"
            className={fieldBase}
          />
        </label>
      </div>

      <label className="mt-5 flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          The product &amp; launch <span className="text-accent-2">*</span>
        </span>
        <textarea
          name="project"
          required
          rows={5}
          placeholder="What's the product, when does it launch, and what should the film do?"
          className={`${fieldBase} resize-none`}
        />
      </label>

      {state.status === "error" && state.message && (
        <p className="mt-5 rounded-xl bg-accent-3/10 px-4 py-3 text-sm text-accent-3">
          {state.message}
        </p>
      )}

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-semibold tracking-tight text-background transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : site.ctaLabel}
          {!pending && (
            <ArrowUpRight
              size={16}
              weight="bold"
              className="text-accent-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          )}
        </button>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          We reply within one business day
        </span>
      </div>
    </form>
  );
}
