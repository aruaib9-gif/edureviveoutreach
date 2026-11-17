import type { Metadata } from "next";
import { Icon } from "@/components/Icons";
import {
  Button,
  CtaBand,
  LogoMarquee,
  Media,
  PageHero,
  SectionHeading,
} from "@/components/ui";
import { partnerLogos, process, schoolLogos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Partner with EduREVIVE OUTREACH as a school, a church, a volunteer coordinator or a supporter.",
};

const ways = [
  {
    icon: "cap" as const,
    title: "Partner as a school",
    body: "Open your school to the School of Motivation, host an academic club and join the yearly competitions and Excellence Award.",
    points: [
      "Termly motivation sessions on your campus",
      "A weekly G-LEAD academic club",
      "Access to weekend coaching centres",
    ],
  },
  {
    icon: "flame" as const,
    title: "Partner as a church or fellowship",
    body: "Host a campus crusade, sponsor a convocation or release members to serve as mentors and coordinators in nearby schools.",
    points: [
      "Campus crusades and convocations",
      "Mentors drawn from your congregation",
      "Joint follow-up with local schools",
    ],
  },
  {
    icon: "users" as const,
    title: "Serve as a volunteer",
    body: "Teachers, graduates and professionals coordinate clubs, teach at weekend centres and mentor students one to one.",
    points: [
      "Club and centre coordinators",
      "Subject tutors for weekend coaching",
      "Counsellors and prayer partners",
    ],
  },
  {
    icon: "heart" as const,
    title: "Support the work",
    body: "Sponsor a convocation, fund a tutorial centre, underwrite the Excellence Award or support the mass media publications.",
    points: [
      "Sponsor an edition of TRANSFORMATION",
      "Fund a weekend coaching centre",
      "Underwrite the yearly Excellence Award",
    ],
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        kicker="Partner with us"
        title="The Sector Will Not Be Transformed"
        accent="by One Ministry Alone."
        lead="Students, teachers, administrators, government and other stakeholders all have vital roles to play. Here is how you can take yours."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 gap-6 px-4 sm:grid-cols-2 sm:px-6">
          {ways.map((w, i) => (
            <article
              key={w.title}
              data-reveal
              suppressHydrationWarning
              data-reveal-delay={(i % 3) + 1}
              className="flex flex-col rounded-2xl border border-navy-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_60px_-30px_rgba(23,27,36,0.4)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-600">
                <Icon name={w.icon} className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-display text-[17px] font-bold text-navy-800">
                {w.title}
              </h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-navy-500">
                {w.body}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {w.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-navy-600"
                  >
                    <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-brand-400 text-navy-900">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href="/contact" variant="outline" className="w-full">
                  Start the conversation
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-50 py-16 sm:py-20">
        <div className="bp-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading
            title="How Partnership Works"
            lead="Four steps from the first conversation to a club that meets every week."
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
                <span className="relative z-10 grid h-13 w-13 place-items-center rounded-2xl bg-navy-800 font-display text-[18px] font-extrabold text-brand-400 ring-8 ring-cream-50">
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

      <section className="bg-white py-16">
        <div className="mx-auto max-w-330 px-4 sm:px-6">
          <SectionHeading title="Those Already Walking With Us" />
          <div className="mt-10 space-y-4">
            <LogoMarquee items={partnerLogos} />
            <LogoMarquee items={schoolLogos} slow />
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-16">
        <div className="mx-auto grid max-w-330 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Media
            photo="reach"
            className="aspect-4/3 rounded-[26px]"
          />
          <div>
            <SectionHeading
              align="left"
              kicker="Our vision"
              title="The kingdom voice in education sector restoration"
              lead="Our reach today is Nigeria. Our mandate is Nigeria and beyond. Every school that partners with us moves that boundary a little further out."
            />
            <div className="mt-7">
              <Button href="/contact" variant="dark" icon="arrowRight">
                Become a partner
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Take Your Role in the Sector"
        lead="Whether you lead a school, pastor a church, teach a class or simply carry a burden for students — there is a place for you here."
        action={{ label: "Partner with us", href: "/contact" }}
      />
    </>
  );
}
