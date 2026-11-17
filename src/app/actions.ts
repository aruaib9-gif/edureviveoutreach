"use server";

import { headers } from "next/headers";
import { deliver } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";
import { isBot, validate } from "@/lib/validation";
import type { FormState } from "@/lib/forms";
import { outreaches } from "@/lib/site";

async function clientKey(scope: string): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  return `${scope}:${ip}`;
}

const GENERIC_ERROR =
  "Sorry — we could not send that just now. Please try again, or email us directly.";

/* ------------------------------------------------------------- contact -- */

export async function submitContact(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  // Bots fill the honeypot; let them think it worked.
  if (isBot(form)) return { status: "success" };

  const { errors, values } = validate(form, {
    name: { label: "Full name", required: true, max: 120 },
    role: { label: "Your role", max: 120 },
    email: { label: "Email address", required: true, email: true, max: 200 },
    phone: { label: "Phone number", max: 40 },
    school: { label: "School or organisation", max: 160 },
    interest: { label: "Area of interest", max: 80 },
    message: { label: "Message", required: true, min: 10, max: 4000 },
  });

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const limit = rateLimit(await clientKey("contact"), {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) {
    return {
      status: "error",
      message: `That is a lot of messages in a short time. Please try again in about ${Math.ceil(
        limit.retryAfterSeconds / 60,
      )} minute(s).`,
      values,
    };
  }

  const interest =
    outreaches.find((o) => o.slug === values.interest)?.short ??
    (values.interest === "other" ? "Something else" : values.interest);

  const result = await deliver({
    kind: "contact",
    subject: `New enquiry from ${values.school || values.name}`,
    replyTo: values.email,
    fields: {
      Name: values.name,
      Role: values.role,
      Email: values.email,
      Phone: values.phone,
      "School / organisation": values.school,
      "Interested in": interest,
      Message: values.message,
    },
  });

  if (!result.ok) {
    console.error("[edurevive] contact delivery failed:", result.reason);
    return { status: "error", message: GENERIC_ERROR, values };
  }

  return {
    status: "success",
    message: "Thank you — a coordinator will be in touch within two working days.",
  };
}
