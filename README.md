# EduREVIVE OUTREACH

Marketing site for **EduREVIVE OUTREACH** — a student and youth ministry
heralding transformation in the education sector and the society at large.

The information architecture, page structure and section rhythm mirror
[itserviceafrica.com](https://itserviceafrica.com); the content comes from the
*We are EduREVIVE OUTREACH* brief and the visual identity comes from the
official logo.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (theme tokens in `src/app/globals.css`)
- Fonts: **Unbounded** (display) + **Montserrat** (body), matching the reference site

## Brand palette

Sampled directly from the logo artwork:

| Token | Hex | Use |
| --- | --- | --- |
| Navy | `#171B24` | Primary surface, headings, dark sections |
| Cream | `#FFF9E3` | Light surface, text on navy |
| Orange | `#EF9A33` | Accent, CTAs, highlighted headline fragments |

Full scales (`--navy-*`, `--orange-*`, `--cream-*`) are declared on `:root` and
exposed to Tailwind as `navy-*`, `brand-*` and `cream-*`.

## Routes

| Route | Mirrors |
| --- | --- |
| `/` | Home |
| `/about` | About Us |
| `/outreaches`, `/outreaches/[slug]` | Our Solutions (9 items) |
| `/programmes`, `/programmes/[slug]` | Products (4 items) |
| `/contact` | Contact us |
| `/partners` | Partner with us |
| `/privacy-policy` | Privacy Policy |

## Content

All copy lives in [`src/lib/site.ts`](src/lib/site.ts) — nav, outreaches,
programmes, beliefs, core values, testimonials, FAQs and contact details. Edit that one file to change the site's text.

## Forms

The contact form posts to a React server action in
[`src/app/actions.ts`](src/app/actions.ts). Each submission is validated on the
server, screened with a honeypot field, rate limited to 5 per IP per 10
minutes, and handed to the transport layer in [`src/lib/mail.ts`](src/lib/mail.ts).

Pick a transport in `.env.local` (see [`.env.example`](.env.example)):

| Variables | Behaviour |
| --- | --- |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL` | Sends an HTML email via the Resend REST API, with the enquirer as Reply-To |
| `FORM_WEBHOOK_URL` | POSTs the submission as JSON — point it at Slack, Zapier, Make or a CRM |
| *(neither)* | Logs submissions to the server console in development; fails in production |

Resend is called over plain `fetch`, so there is no SDK to install. To use SMTP
instead, add a branch to `deliver()` in `src/lib/mail.ts`.

The rate limiter keeps its counters in process memory, which covers a single
long-running server. On serverless, add a platform or edge rate limit in front.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Before going live

- **Logo** — `src/components/Logo.tsx` holds a hand-traced SVG of the mark.
  Replace it with the designer's original vector when available. The supplied
  raster is kept at `public/brand/edurevive-logo.jpg` for reference and OG.
- **Imagery** — stock photography from Unsplash stands in for EduREVIVE's own
  event photos. Every slot resolves through [`src/lib/photos.ts`](src/lib/photos.ts),
  so swapping one in is a file copy plus an alt-text edit. See
  [IMAGE-CREDITS.md](IMAGE-CREDITS.md).
- **Placeholder details** — phone number, email, office addresses and social
  URLs in `src/lib/site.ts` are placeholders.
- **Forms** — wired and validated, but inert until you set `RESEND_API_KEY` or
  `FORM_WEBHOOK_URL` (see **Forms** above). No acknowledgement email is sent to
  the enquirer yet; add a second `deliver()` call in the action if you want one.
- **Partner and school names** in the logo strips are illustrative.
- **Privacy policy** — a starting template; have it reviewed against the
  Nigeria Data Protection Act before publication.
