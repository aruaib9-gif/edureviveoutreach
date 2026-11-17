import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { CtaBand, Media, PageHero } from "@/components/ui";
import { outreachPhoto } from "@/lib/photos";
import { outreaches } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Outreaches",
  description:
    "The nine avenues through which EduREVIVE OUTREACH reaches students, teachers, administrators and other stakeholders in the education sector.",
};

export default function OutreachesPage() {
  return (
    <>
      <PageHero
        kicker="Our outreaches"
        title="Nine Avenues for a"
        accent="Wider Reach."
        lead="EduREVIVE OUTREACH explores the following avenues to orient and re-orient students, academics and other stakeholders in the education sector."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {outreaches.map((o, i) => (
            <article
              key={o.slug}
              data-reveal
              suppressHydrationWarning
              data-reveal-delay={(i % 3) + 1}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_60px_-30px_rgba(23,27,36,0.45)]"
            >
              <Media
                photo={outreachPhoto[o.slug]}
                className="aspect-16/10"
                priority={i < 3}
              />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-[16px] font-bold leading-snug text-navy-800">
                  {o.title}
                </h2>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-navy-500">
                  {o.blurb}
                </p>
                <Link
                  href={`/outreaches/${o.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-600 transition-colors hover:text-navy-800"
                >
                  Explore this Outreach
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
