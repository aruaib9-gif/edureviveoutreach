import Link from "next/link";
import { Logo } from "./Logo";
import { Icon, SocialIcon } from "./Icons";
import { nav, site } from "@/lib/site";

const COPYRIGHT_YEAR = 2026;

const tint: Record<string, string> = {
  facebook: "bg-[#1877F2]",
  instagram: "bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  tiktok: "bg-[#010101]",
  x: "bg-navy-700",
  youtube: "bg-[#FF0000]",
};

export function Footer() {
  return (
    <footer className="relative bg-navy-900 pb-24 pt-14 text-navy-200 md:pb-14">
      <div className="bp-grid-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-330 gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.7fr_1fr]">
        {/* brand */}
        <div>
          <div className="inline-flex rounded-xl bg-navy-800/80 px-3 py-2.5 ring-1 ring-white/5">
            <Logo variant="light" />
          </div>

          <p className="mt-5 max-w-sm text-[12.5px] leading-relaxed text-navy-300">
            {site.description}
          </p>

          <div className="mt-5 flex max-w-sm items-start gap-3 rounded-xl border border-white/10 bg-navy-800/60 p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-400/15 text-brand-300">
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <p className="text-[11px] leading-relaxed text-navy-300">
              <span className="block text-[12px] font-semibold text-cream-100">
                Safeguarding first
              </span>
              Every coordinator and mentor working with minors is vetted and
              supervised. Read our{" "}
              <Link href="/privacy-policy" className="underline hover:text-cream-100">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* links */}
        <nav aria-label="Footer">
          <ul className="space-y-3 text-[13px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-navy-200 transition-colors hover:text-brand-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy-policy"
                className="text-navy-200 transition-colors hover:text-brand-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        {/* contact */}
        <div className="space-y-4">
          {site.addresses.map((a) => (
            <p key={a} className="max-w-xs text-[13px] leading-relaxed text-navy-200">
              {a}
            </p>
          ))}

          <ul className="space-y-1 text-[13px] text-navy-200">
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="hover:text-brand-300">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-300">
                {site.email}
              </a>
            </li>
          </ul>

          <div className="flex gap-2 pt-1">
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white"
            >
              <SocialIcon name="whatsapp" className="h-4.5 w-4.5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email us"
              className="grid h-9 w-9 place-items-center rounded-full bg-navy-700 text-cream-100"
            >
              <Icon name="mail" className="h-4 w-4" />
            </a>
          </div>

          <div className="flex gap-2">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.shortName} on ${s.label}: ${s.handle}`}
                title={s.handle}
                className={`grid h-9 w-9 place-items-center rounded-full text-white ${tint[s.icon]}`}
              >
                <SocialIcon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-330 border-t border-white/10 px-4 pt-5 sm:px-6">
        <p className="text-[11.5px] text-navy-400">
          © {COPYRIGHT_YEAR} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
