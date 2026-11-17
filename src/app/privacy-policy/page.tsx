import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
};

const LAST_UPDATED = "November 2026";

const sections = [
  {
    h: "Who we are",
    p: [
      `${site.name} is a student and youth ministry working with schools, campuses and fellowships in Nigeria and beyond. This policy explains how we handle personal information collected through this website and through our programmes.`,
    ],
  },
  {
    h: "What we collect",
    p: [
      "Information you give us directly: your name, role, school or organisation, email address, phone number and the content of any message you send through our forms.",
      "Information collected automatically: basic, non-identifying analytics about how this website is used, such as pages viewed and approximate region.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "To respond to enquiries and arrange programmes with your school, campus or fellowship.",
      "To administer academic clubs, coaching centres, competitions and the Excellence Award.",
    ],
  },
  {
    h: "Working with minors",
    p: [
      "Much of our work involves students under the age of eighteen. We collect the minimum information needed, we obtain consent from the school or guardian before a student takes part in mentoring or counselling, and every coordinator and mentor working with minors is vetted and supervised.",
    ],
  },
  {
    h: "Sharing",
    p: [
      "We do not sell personal information. We share it only with the partner school or fellowship concerned, with volunteer coordinators who need it to run a programme, and where we are required to do so by law.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You may ask us at any time for a copy of the information we hold about you, ask us to correct it, or ask us to delete it.",
    ],
  },
  {
    h: "Contact",
    p: [
      `Write to us at ${site.email} with any question about this policy or about information we hold.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        lead="How we collect, use and protect personal information — including the information of the students we serve."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {sections.map((s) => (
            <div key={s.h} className="mb-10">
              <h2 className="font-display text-[19px] font-extrabold text-navy-800">
                {s.h}
              </h2>
              {s.p.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-3 text-[14.5px] leading-[1.8] text-navy-600"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="border-t border-navy-100 pt-6 text-[12.5px] text-navy-400">
            Last updated {LAST_UPDATED}. This policy is a starting
            template — have it reviewed against the Nigeria Data Protection Act
            before publication.
          </p>
        </div>
      </section>
    </>
  );
}
