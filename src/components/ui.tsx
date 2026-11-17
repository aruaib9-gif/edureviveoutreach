import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icons";
import { photos, type PhotoName } from "@/lib/photos";

/* -------------------------------------------------------------- button -- */

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "outline" | "light";
  className?: string;
  icon?: IconName;
}) {
  const styles = {
    primary:
      "bg-brand-400 text-navy-900 hover:bg-brand-300 shadow-[0_10px_30px_-10px_rgba(239,154,51,0.8)]",
    dark: "bg-navy-800 text-cream-100 hover:bg-navy-700",
    outline:
      "border border-navy-200 bg-white text-navy-800 hover:border-navy-800 hover:bg-navy-800 hover:text-cream-100",
    light: "bg-cream-100 text-navy-900 hover:bg-white",
  }[variant];

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-semibold transition-all duration-200 ${styles} ${className}`}
    >
      {children}
      {icon && (
        <Icon
          name={icon}
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

/* ------------------------------------------------------------- heading -- */

export function SectionHeading({
  kicker,
  title,
  accent,
  lead,
  align = "center",
  tone = "light",
}: {
  kicker?: string;
  title: ReactNode;
  accent?: string;
  lead?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  return (
    <div
      data-reveal
      suppressHydrationWarning
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}
    >
      {kicker && (
        <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-500">
          {kicker}
        </p>
      )}
      <h2
        className={`text-balance text-[26px] font-extrabold leading-[1.15] sm:text-[34px] lg:text-[40px] ${
          tone === "dark" ? "text-cream-100" : "text-navy-800"
        }`}
      >
        {title}
        {accent && <span className="text-brand-400"> {accent}</span>}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-pretty text-[14.5px] leading-relaxed ${
            tone === "dark" ? "text-navy-200" : "text-navy-500"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- media -- */

/**
 * Photographic panel. Every image on the site goes through here, so the navy
 * wash stays consistent and alt text always comes from the registry in
 * src/lib/photos.ts. Photographs carry no caption — the surrounding copy says
 * what they are.
 */
export function Media({
  photo,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px",
}: {
  photo: PhotoName;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { src, alt } = photos[photo];
  return (
    <div
      data-reveal="zoom"
      suppressHydrationWarning
      className={`relative overflow-hidden bg-navy-800 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {/* A light navy wash ties the photography to the brand. It used to be far
          heavier to keep caption text legible; with the captions gone it only
          needs to grade the lower edge. */}
      <div
        className="absolute inset-0 bg-linear-to-t from-navy-950/30 via-navy-950/5 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

/* ------------------------------------------------------------ marquee --- */

export function LogoMarquee({
  items,
  slow = false,
}: {
  items: readonly string[];
  slow?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden="true"
    >
      <div className={`marquee-track gap-4 ${slow ? "marquee-slow" : ""}`}>
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="grid h-14.5 shrink-0 place-items-center whitespace-nowrap rounded-xl border border-navy-100 bg-white px-7 font-display text-[12.5px] font-semibold tracking-tight text-navy-400"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- page header -- */

export function PageHero({
  kicker,
  title,
  accent,
  lead,
  crumb,
}: {
  kicker?: string;
  title: string;
  accent?: string;
  lead?: string;
  crumb?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pb-16 pt-16 sm:pb-20 sm:pt-20">
      <div className="bp-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-400/15 blur-[90px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-330 px-4 sm:px-6">
        {crumb && (
          <Link
            href={crumb.href}
            className="mb-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-navy-300 transition-colors hover:text-brand-300"
          >
            <Icon name="arrowRight" className="h-3.5 w-3.5 rotate-180" />
            {crumb.label}
          </Link>
        )}
        {kicker && (
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-400">
            {kicker}
          </p>
        )}
        <h1 className="max-w-4xl text-balance text-[30px] font-extrabold leading-[1.1] text-cream-100 sm:text-[42px] lg:text-[52px]">
          {title}
          {accent && <span className="text-brand-400"> {accent}</span>}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-navy-200">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- cta band -- */

export function CtaBand({
  title = "Let's Raise a Generation That Will Not Compromise",
  lead = "Invite EduREVIVE OUTREACH into your school, campus or fellowship. Let's build students who pursue excellence, walk in godliness and lead well.",
  action = { label: "Invite us to your school", href: "/contact" },
}: {
  title?: string;
  lead?: string;
  action?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-navy-800 via-navy-900 to-[#2a2010]">
      <div className="bp-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-400/20 blur-[80px]"
        aria-hidden="true"
      />
      <div
        data-reveal
        suppressHydrationWarning
        className="relative mx-auto flex max-w-330 flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20"
      >
        <h2 className="max-w-3xl text-balance text-[24px] font-extrabold leading-tight text-cream-100 sm:text-[34px]">
          {title}
        </h2>
        <p className="max-w-2xl text-pretty text-[14.5px] leading-relaxed text-navy-200">
          {lead}
        </p>
        <Button href={action.href} variant="light" icon="arrowRight">
          {action.label}
        </Button>
      </div>
    </section>
  );
}
