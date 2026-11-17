import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { CtaBand, Media, PageHero } from "@/components/ui";
import { programmePhoto } from "@/lib/photos";
import { programmes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "TRANSFORMATION, MDM, the G-LEAD Academic Club and the Excellence Award — the four flagship programmes of EduREVIVE OUTREACH.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        kicker="Programmes"
        title="Four Platforms Carrying"
        accent="One Mandate."
        lead="Named programmes through which EduREVIVE OUTREACH reaches students, schools and the wider public all year round."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 gap-6 px-4 sm:grid-cols-2 sm:px-6">
          {programmes.map((p, i) => (
            <article
              key={p.slug}
              data-reveal
              suppressHydrationWarning
              data-reveal-delay={(i % 2) + 1}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_60px_-30px_rgba(23,27,36,0.45)]"
            >
              <Media
                photo={programmePhoto[p.slug]}
                className="aspect-16/8"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority={i < 2}
              />
              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-[18px] font-extrabold uppercase tracking-tight text-navy-800">
                  {p.name}
                </h2>
                <p className="mt-1 text-[11.5px] font-semibold uppercase tracking-widest text-brand-600">
                  {p.kicker}
                </p>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-navy-500">
                  {p.blurb}
                </p>
                <Link
                  href={`/programmes/${p.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-600 transition-colors hover:text-navy-800"
                >
                  Explore this Programme
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-400 text-navy-900 transition-transform duration-200 group-hover:translate-x-0.5">
                    <Icon name="arrowRight" className="h-3 w-3" />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
