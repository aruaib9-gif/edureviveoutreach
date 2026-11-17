import type { Metadata } from "next";
import { Icon } from "@/components/Icons";
import { Button, CtaBand, Media, PageHero, SectionHeading } from "@/components/ui";
import { beliefs, coreValues, site, stats, targets } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: site.description,
};

const pillars = [
  {
    label: "Mandate",
    icon: "flame" as const,
    body: "…motivate students for academic excellence through biblical principles.",
  },
  {
    label: "Mission",
    icon: "globe" as const,
    body: "To promote transformation, forestall vices and further decadence in the education sector by providing platforms for interaction, motivation, commitment, orientation, and re-orientation of students, academics, and other stakeholders in the sector.",
  },
  {
    label: "Vision",
    icon: "cap" as const,
    body: "To be the kingdom voice in the education sector restoration in Nigeria and beyond.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="We Are EduREVIVE OUTREACH —"
        accent="a student and youth ministry."
        lead={site.strapline}
      />

      {/* mandate / mission / vision */}
      <section className="relative -mt-10 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-330 gap-6 px-4 sm:px-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <article
              key={p.label}
              data-reveal
              suppressHydrationWarning
              data-reveal-delay={(i % 3) + 1}
              className="rounded-2xl border border-navy-100 bg-white p-7 shadow-[0_24px_60px_-40px_rgba(23,27,36,0.5)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-600">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-display text-[13px] font-extrabold uppercase tracking-[0.18em] text-brand-600">
                {p.label}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-navy-600">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* core values */}
      <section className="relative overflow-hidden bg-cream-50 py-16 sm:py-20">
        <div className="bp-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            kicker="Core values"
            title="G-LEAD"
            lead="Five values that govern how every programme is run and how every coordinator, mentor and ambassador is expected to carry themselves."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {coreValues.map((v, i) => (
              <article
                key={v.letter}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 5) + 1}
                className="rounded-2xl bg-white p-6 text-center shadow-[0_2px_20px_rgba(23,27,36,0.05)]"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy-800 font-display text-[22px] font-extrabold text-brand-400">
                  {v.letter}
                </span>
                <p className="mt-4 font-display text-[14px] font-bold text-navy-800">
                  {v.word}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-brand-200 bg-white p-6 text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
              Our core
            </p>
            <p className="mt-2 font-display text-[18px] font-extrabold text-navy-800 sm:text-[22px]">
              Motivation, Deliverance and Mentoring{" "}
              <span className="text-brand-400">(MDM)</span>
            </p>
          </div>
        </div>
      </section>

      {/* beliefs */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            kicker="What we believe"
            title="At EduREVIVE OUTREACH, we believe that…"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {beliefs.map((b, i) => (
              <article
                key={b.heading}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 2) + 1}
                className="flex gap-5 rounded-2xl border border-navy-100 bg-cream-50/60 p-6"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-800 font-display text-[13px] font-extrabold text-brand-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-bold text-navy-800">
                    {b.heading}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-navy-500">
                    {b.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-navy-900 p-8 text-center">
            <p className="mx-auto max-w-3xl text-pretty text-[14.5px] leading-relaxed text-navy-200">
              We believe God will use EduREVIVE OUTREACH to promote
              transformation; forestall vices and further decadence in the
              education sector by providing platforms for interactions,
              motivations, commitments, orientation and re-orientation of
              students, academics and other stakeholders in the sector.
            </p>
          </div>
        </div>
      </section>

      {/* targets */}
      <section className="relative overflow-hidden bg-linear-to-br from-navy-100 via-cream-50 to-cream-200 py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              kicker="Our targets"
              title="Who We Are Sent To"
              lead="The pursuit of excellence largely depends on students — but other stakeholders in the sector have vital roles to play. So we speak to all of them."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {targets.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-xl bg-white/90 px-4 py-3.5 text-[13.5px] font-semibold text-navy-700 shadow-[0_2px_14px_rgba(23,27,36,0.05)]"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-400 text-navy-900">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/partners" variant="dark" icon="arrowRight">
                Partner with us
              </Button>
            </div>
          </div>
          <Media
            photo="partners"
            className="aspect-4/3 rounded-[26px]"
          />
        </div>
      </section>

      {/* stats */}
      <section className="bg-white py-14">
        <dl className="mx-auto grid max-w-330 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              suppressHydrationWarning
              data-reveal-delay={(i % 4) + 1}
              className="rounded-2xl border border-navy-100 bg-cream-50/60 p-6 text-center"
            >
              <dt className="font-display text-[30px] font-extrabold text-navy-800">
                {s.value}
              </dt>
              <dd className="mt-1 text-[12.5px] text-navy-400">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CtaBand />
    </>
  );
}
