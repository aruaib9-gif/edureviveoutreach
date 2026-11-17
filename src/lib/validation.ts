/**
 * Tiny, dependency-free field validation for the site's two forms.
 * Returns a map of field name → human-readable error; empty means valid.
 */

export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

type Rule = {
  label: string;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
};

export function validate(
  form: FormData,
  rules: Record<string, Rule>,
): { errors: Errors; values: Record<string, string> } {
  const errors: Errors = {};
  const values: Record<string, string> = {};

  for (const [name, rule] of Object.entries(rules)) {
    const value = str(form, name);
    values[name] = value;

    if (!value) {
      if (rule.required) errors[name] = `${rule.label} is required.`;
      continue;
    }
    if (rule.email && !EMAIL.test(value)) {
      errors[name] = "Enter a valid email address.";
      continue;
    }
    if (rule.min && value.length < rule.min) {
      errors[name] = `${rule.label} must be at least ${rule.min} characters.`;
      continue;
    }
    if (rule.max && value.length > rule.max) {
      errors[name] = `${rule.label} must be under ${rule.max} characters.`;
    }
  }

  return { errors, values };
}

/**
 * Hidden field that real people never fill in. A submission that carries a
 * value here is almost certainly a bot, and is accepted silently.
 */
export const HONEYPOT = "website";

export function isBot(form: FormData): boolean {
  return str(form, HONEYPOT).length > 0;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
