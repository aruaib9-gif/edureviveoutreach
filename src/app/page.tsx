import Link from "next/link";
import { Icon } from "@/components/Icons";
import {
  Button,
  CtaBand,
  LogoMarquee,
  Media,
  SectionHeading,
} from "@/components/ui";
import {
  challengeIcon,
  outcomeIcon,
  programmeIcon,
  whyIcon,
} from "@/lib/icons";
import { outreachPhoto } from "@/lib/photos";
import {
  challenges,
  coreValues,
  outcomes,
  outreaches,
  partnerLogos,
  process,
  programmes,
  schoolLogos,
  testimonials,
  whyUs,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-white via-cream-50 to-cream-200">
        <div className="bp-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-330 items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
          <div className="rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-brand-600">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              A student &amp; youth ministry
            </p>
            <h1 className="text-balance font-display text-[32px] font-extrabold leading-[1.08] text-navy-800 sm:text-[46px] lg:text-[54px]">
              When a Generation Loses Its Standard, a Nation Loses Its Future.
              <span className="block text-brand-400">
                We Are Raising That Standard Back.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-navy-500">
              EduREVIVE OUTREACH motivates students for{" "}
              <strong className="font-semibold text-navy-800">
                academic excellence through biblical principles
              </strong>
              {" "}— forestalling vices and heralding transformation in the
              education sector and the society at large.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="dark">
                Invite Us to Your School
              </Button>
              <Button href="/outreaches" variant="outline">
                Explore Our Outreaches
              </Button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-navy-100 pt-6">
              {[
                { v: "9", l: "Outreach avenues" },
                { v: "G-LEAD", l: "Five core values" },
                { v: "MDM", l: "Our method" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-[20px] font-extrabold text-navy-800">
                    {s.v}
                  </dt>
                  <dd className="mt-0.5 text-[11.5px] leading-tight text-navy-400">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* hero visual */}
          <div className="relative">
            <Media
              photo="hero"
              priority
              sizes="(max-width: 1024px) 100vw, 620px"
              className="aspect-square rounded-[28px] shadow-[0_40px_90px_-40px_rgba(23,27,36,0.6)]"
            />
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(23,27,36,0.4)] sm:block">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy-400">
                Academic excellence
              </p>
              <p className="font-display text-[17px] font-extrabold leading-tight text-navy-800">
                A necessity,
                <br />
                not an option
              </p>
              <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-navy-100">
                <div className="h-full w-full rounded-full bg-brand-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- partner strip */}
      <section className="border-y border-navy-100 bg-white py-14">
        <div className="mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            title="Our Ministry Partners"
            lead="We work alongside fellowships, chaplaincies, churches and campus bodies whose labour among students runs parallel to our own."
          />
          <div className="mt-10">
            <LogoMarquee items={partnerLogos} />
          </div>
        </div>
      </section>

      {/* --------------------------------------------- trusted by schools */}
      <section className="bg-linear-to-b from-cream-50 to-white py-16">
        <div className="mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            title="Trusted by Schools Across Nigeria"
            lead="From rural secondary schools to university campuses, institutions invite EduREVIVE OUTREACH to walk with their students through the full school year."
          />
          <div className="mt-10">
            <LogoMarquee items={schoolLogos} slow />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- about us */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              kicker="About us"
              title="About EduREVIVE OUTREACH"
            />
            <p
              data-reveal
              suppressHydrationWarning
              data-reveal-delay="1"
              className="mt-5 text-pretty text-[14.5px] leading-relaxed text-navy-500"
            >
              EduREVIVE OUTREACH is a student and youth ministry with a single
              mandate: to motivate students for academic excellence through
              biblical principles. We promote transformation, forestall vices
              and further decadence in the education sector by providing
              platforms for interaction, motivation, commitment, orientation and
              re-orientation of students, academics and other stakeholders in
              the sector.
            </p>
            <p
              data-reveal
              suppressHydrationWarning
              data-reveal-delay="2"
              className="mt-4 text-pretty text-[14.5px] leading-relaxed text-navy-500"
            >
              Our vision is to be the kingdom voice in the restoration of the
              education sector in Nigeria and beyond — because the posterity and
              prosperity of any nation are greatly tied to good leadership, and
              good leadership begins in a classroom.
            </p>
            <div
              data-reveal
              suppressHydrationWarning
              data-reveal-delay="3"
              className="mt-7"
            >
              <Button href="/about" variant="dark" icon="arrowRight">
                Learn More About Us
              </Button>
            </div>
          </div>

          <div className="relative">
            <Media
              photo="mandate"
              className="aspect-4/3 rounded-[26px]"
            />
            {/* The acrostic is only worth showing if the words are on screen —
                the letters alone say nothing. */}
            <div className="absolute -left-4 bottom-6 hidden rounded-2xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(23,27,36,0.35)] sm:block">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy-400">
                Core values
              </p>
              <p className="mt-1 font-display text-[15px] font-extrabold text-navy-800">
                G-LEAD
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {coreValues.map((v) => (
                  <li key={v.letter} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-navy-800 font-display text-[11px] font-extrabold text-brand-400"
                    >
                      {v.letter}
                    </span>
                    <span className="text-[12.5px] font-medium text-navy-600">
                      {v.word}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ challenges */}
      <section className="relative overflow-hidden bg-cream-50 py-16 sm:py-20">
        <div className="bp-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            kicker="The challenges facing our schools"
            title="The Problem May Not Be Your Students."
            accent="Sometimes It Is the Standard Around Them."
          />
          <p className="mx-auto mt-4 max-w-3xl text-center text-[14.5px] leading-relaxed text-navy-500">
            The cost of a compromised education sector goes far beyond poor
            results. It shapes character, forms habits and decides what kind of
            leaders a nation inherits.{" "}
            <em className="font-semibold not-italic text-navy-800">
              If these challenges sound familiar, we are here to help.
            </em>
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((c, i) => (
              <article
                key={c.title}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 3) + 1}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgba(23,27,36,0.05)] transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: `${c.accent}18`, color: c.accent }}
                >
                  <Icon name={challengeIcon[i]} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[16px] font-bold leading-snug text-navy-800">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-navy-500">
                  {c.body}
                </p>
                <span
                  className="absolute inset-x-0 bottom-0 h-0.75 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: c.accent }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- outcomes */}
      <section className="relative overflow-hidden bg-linear-to-br from-navy-100 via-cream-50 to-cream-200 py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {outcomes.map((o, i) => (
              <article
                key={o.title}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 2) + 1}
                className="rounded-2xl bg-white/90 p-6 shadow-[0_2px_20px_rgba(23,27,36,0.06)] backdrop-blur"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-600">
                  <Icon name={outcomeIcon[i]} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[15.5px] font-bold text-navy-800">
                  {o.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-navy-500">
                  {o.body}
                </p>
              </article>
            ))}
          </div>
          <div className="relative">
            <div className="dashed-rule rounded-[26px] p-3">
              <Media
                photo="outcomes"
                className="aspect-square rounded-[20px]"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ outreaches */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            title="OUR CORE OUTREACH AVENUES"
            lead="Nine avenues through which EduREVIVE OUTREACH reaches students, teachers, administrators, government and other stakeholders in the sector."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[16px] font-bold leading-snug text-navy-800">
                    {o.short}
                  </h3>
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
        </div>
      </section>

      {/* ------------------------------------------------------ programmes */}
      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
        <div className="bp-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            tone="dark"
            title="Our Flagship Programmes"
            lead="Four named platforms through which the mandate is carried into schools, campuses and the wider public."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((p, i) => (
              <article
                key={p.slug}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 4) + 1}
                className="group flex flex-col rounded-2xl border border-white/10 bg-navy-800/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-400/15 text-brand-300">
                  <Icon name={programmeIcon[p.slug]} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[15px] font-extrabold uppercase tracking-tight text-cream-100">
                  {p.name}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-brand-400">
                  {p.kicker}
                </p>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-navy-200">
                  {p.blurb}
                </p>
                <Link
                  href={`/programmes/${p.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-300 transition-colors hover:text-cream-100"
                >
                  Explore {p.name.split(" ")[0]}
                  <Icon
                    name="arrowRight"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- why us */}
      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            kicker="Why EduREVIVE?"
            title="We're more than a visiting speaker."
            accent="We're a ministry that stays."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyUs.map((w, i) => (
              <article
                key={w.title}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 3) + 1}
                className="rounded-2xl bg-white p-7 shadow-[0_2px_20px_rgba(23,27,36,0.05)] transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-600">
                  <Icon name={whyIcon[i]} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[16px] font-bold text-navy-800">
                  {w.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-navy-500">
                  {w.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- process */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div className="bp-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            title={
              <>
                Partnering With{" "}
                <span className="text-brand-400">EduREVIVE</span> Is Simple
              </>
            }
            lead="We have kept the process light, so your school can focus on its students while we bring the programme."
          />
          <div className="relative mt-14 grid gap-6 lg:grid-cols-4">
            <div
              className="absolute left-0 right-0 top-6.5 hidden border-t-2 border-dashed border-navy-200 lg:block"
              aria-hidden="true"
            />
            {process.map((p, i) => (
              <article
                key={p.title}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 4) + 1}
                className="relative"
              >
                <span className="relative z-10 grid h-13 w-13 place-items-center rounded-2xl bg-navy-800 font-display text-[18px] font-extrabold text-brand-400 ring-8 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-[16px] font-bold text-navy-800">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-navy-500">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- testimonials */}
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading kicker="Testimonials" title="What Our Schools Say" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 3) + 1}
                className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_2px_20px_rgba(23,27,36,0.05)]"
              >
                <div className="flex gap-1 text-brand-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[13.5px] leading-relaxed text-navy-500">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-800 font-display text-[12px] font-bold text-brand-400">
                    {t.name
                      .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-navy-800">
                      {t.name}
                    </span>
                    <span className="block text-[11.5px] text-navy-400">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
