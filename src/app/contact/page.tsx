import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";
import { PageHero } from "@/components/ui";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Invite EduREVIVE OUTREACH into your school, campus or fellowship.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact us"
        title="Invite Us Into"
        accent="Your School."
        lead="Tell us about your students and the change you want to see. A coordinator will be in touch within two working days."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-[22px] font-extrabold text-navy-800">
              Reach the coordinating office
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-600">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-400">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[14px] font-medium text-navy-800 hover:text-brand-600"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-600">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-400">
                    Phone &amp; WhatsApp
                  </p>
                  <p className="text-[14px] font-medium text-navy-800">{site.phone}</p>
                </div>
              </li>
              {site.addresses.map((a) => (
                <li key={a} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-600">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-400">
                      Office
                    </p>
                    <p className="max-w-xs text-[14px] leading-relaxed text-navy-800">{a}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-navy-900 p-6">
              <h3 className="font-display text-[15px] font-bold text-cream-100">
                Who can invite us?
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-navy-200">
                Schools, campus fellowships, churches, parent bodies and
                government education offices. Primary, secondary and tertiary
                institutions are all welcome.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-display text-[26px] font-extrabold text-navy-800 sm:text-[32px]">
            Frequently asked questions
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 3) + 1}
                className="group rounded-2xl border border-navy-100 bg-white p-5 open:border-brand-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14.5px] font-semibold text-navy-800">
                  {f.q}
                  <Icon
                    name="chevronDown"
                    className="h-4 w-4 shrink-0 text-brand-500 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-[13.5px] leading-relaxed text-navy-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
