/**
 * Outbound delivery for form submissions.
 *
 * Transports are chosen from the environment, in order:
 *   1. RESEND_API_KEY        → email via the Resend REST API (no SDK needed)
 *   2. FORM_WEBHOOK_URL      → POST the payload as JSON (Slack, Zapier, a CRM…)
 *   3. nothing configured    → log to the server console in development,
 *                              and fail loudly in production
 */

export type Delivery = { ok: true } | { ok: false; reason: string };

export type Submission = {
  /** Short subject line, e.g. "New enquiry from Grace College". */
  subject: string;
  /** Field label → value, rendered into the email body and the webhook JSON. */
  fields: Record<string, string>;
  /** Where a reply should go, used as the email Reply-To. */
  replyTo?: string;
  /** Which form the submission came from. Kept in the webhook payload so a
      second form can be added later without changing its shape. */
  kind: "contact";
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function textBody(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}:\n${v}`)
    .join("\n\n");
}

function htmlBody(subject: string, fields: Record<string, string>): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr>
           <td style="padding:8px 16px 8px 0;vertical-align:top;color:#6b7794;font:600 12px/1.4 system-ui,sans-serif;white-space:nowrap">${esc(k)}</td>
           <td style="padding:8px 0;color:#171b24;font:400 14px/1.6 system-ui,sans-serif">${esc(v).replace(/\n/g, "<br>")}</td>
         </tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#fff9e3;padding:24px">
    <table role="presentation" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px">
      <tr><td>
        <p style="margin:0 0 4px;color:#ef9a33;font:700 11px/1.4 system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase">EduREVIVE OUTREACH</p>
        <h1 style="margin:0 0 20px;color:#171b24;font:800 20px/1.3 system-ui,sans-serif">${esc(subject)}</h1>
        <table role="presentation" style="width:100%;border-collapse:collapse">${rows}</table>
      </td></tr>
    </table>
  </body></html>`;
}

async function viaResend(sub: Submission): Promise<Delivery> {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !from) {
    return {
      ok: false,
      reason: "RESEND_API_KEY is set but CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL are missing.",
    };
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: sub.subject,
      text: textBody(sub.fields),
      html: htmlBody(sub.subject, sub.fields),
      ...(sub.replyTo ? { reply_to: sub.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    return { ok: false, reason: `Resend responded ${res.status}: ${await res.text()}` };
  }
  return { ok: true };
}

async function viaWebhook(url: string, sub: Submission): Promise<Delivery> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      kind: sub.kind,
      subject: sub.subject,
      replyTo: sub.replyTo,
      fields: sub.fields,
      receivedAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    return { ok: false, reason: `Webhook responded ${res.status}.` };
  }
  return { ok: true };
}

export async function deliver(sub: Submission): Promise<Delivery> {
  try {
    if (process.env.RESEND_API_KEY) return await viaResend(sub);

    const webhook = process.env.FORM_WEBHOOK_URL;
    if (webhook) return await viaWebhook(webhook, sub);

    if (process.env.NODE_ENV !== "production") {
      console.info(
        `\n[edurevive] ${sub.subject}\n${textBody(sub.fields)}\n` +
          "(No transport configured — set RESEND_API_KEY or FORM_WEBHOOK_URL. " +
          "See .env.example.)\n",
      );
      return { ok: true };
    }

    return {
      ok: false,
      reason: "No delivery transport configured in production.",
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Unknown delivery error.",
    };
  }
}
