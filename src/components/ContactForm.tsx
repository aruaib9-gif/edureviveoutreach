"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/actions";
import { idleState } from "@/lib/forms";
import { HONEYPOT } from "@/lib/validation";
import { Icon } from "./Icons";
import { outreaches } from "@/lib/site";
import { Select } from "./Select";

const interestOptions = [
  ...outreaches.map((o) => ({ value: o.slug, label: o.short })),
  { value: "other", label: "Something else" },
];

const base =
  "w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2";
const ok = "border-navy-200 focus:border-brand-400 focus:ring-brand-200";
const bad = "border-red-400 focus:border-red-500 focus:ring-red-200";
const labelCls = "mb-1.5 block text-[12.5px] font-semibold text-navy-700";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls} htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-800 px-6 py-3.5 text-[14px] font-semibold text-cream-100 transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending…" : "Send message"}
      {pending ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-cream-100/40 border-t-cream-100"
          aria-hidden="true"
        />
      ) : (
        <Icon name="arrowRight" className="h-4 w-4" />
      )}
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(submitContact, idleState);
  const err = state.errors ?? {};
  const prior = state.values ?? {};
  const invalid = (k: string) =>
    err[k]
      ? ({ "aria-invalid": true, "aria-describedby": `${k}-error` } as const)
      : {};

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-cream-50 p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-400 text-navy-900">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-[20px] font-extrabold text-navy-800">
          Thank you — we have your message.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-navy-500">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[0_2px_20px_rgba(23,27,36,0.05)] sm:p-8"
    >
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={err.name}>
          <input
            id="name"
            name="name"
            defaultValue={prior.name}
            className={`${base} ${err.name ? bad : ok}`}
            placeholder="Jane Okafor"
            {...invalid("name")}
          />
        </Field>

        <Field id="role" label="Your role" error={err.role}>
          <input
            id="role"
            name="role"
            defaultValue={prior.role}
            className={`${base} ${err.role ? bad : ok}`}
            placeholder="Principal, teacher, student…"
            {...invalid("role")}
          />
        </Field>

        <Field id="email" label="Email address" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={prior.email}
            className={`${base} ${err.email ? bad : ok}`}
            placeholder="you@school.edu.ng"
            {...invalid("email")}
          />
        </Field>

        <Field id="phone" label="Phone number" error={err.phone}>
          <input
            id="phone"
            name="phone"
            defaultValue={prior.phone}
            className={`${base} ${err.phone ? bad : ok}`}
            placeholder="080 0000 0000"
            {...invalid("phone")}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field id="school" label="School, campus or organisation" error={err.school}>
            <input
              id="school"
              name="school"
              defaultValue={prior.school}
              className={`${base} ${err.school ? bad : ok}`}
              placeholder="Grace Comprehensive College"
              {...invalid("school")}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="interest" label="What are you interested in?" error={err.interest}>
            <Select
              id="interest"
              name="interest"
              placeholder="Select an outreach…"
              defaultValue={prior.interest ?? ""}
              options={interestOptions}
              invalid={Boolean(err.interest)}
              describedBy={err.interest ? "interest-error" : undefined}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="message" label="Tell us about your students" error={err.message}>
            <textarea
              id="message"
              name="message"
              rows={5}
              defaultValue={prior.message}
              className={`${base} ${err.message ? bad : ok}`}
              placeholder="What challenges are you seeing, and what would you like to see change?"
              {...invalid("message")}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={HONEYPOT}>Leave this field empty</label>
        <input id={HONEYPOT} name={HONEYPOT} tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />
    </form>
  );
}
