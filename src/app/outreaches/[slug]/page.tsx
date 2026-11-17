import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icons";
import { Button, CtaBand, Media, PageHero } from "@/components/ui";
import { outreachPhoto } from "@/lib/photos";
import { outreaches } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

// Every slug is prerendered by generateStaticParams, so a blocking render is
// correct here; without this Next warns about params read outside <Suspense>.
export const instant = false;

export function generateStaticParams() {
  return outreaches.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = outreaches.find((o) => o.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.blurb };
}

export default async function OutreachPage({ params }: Params) {
  const { slug } = await params;
  const item = outreaches.find((o) => o.slug === slug);
  if (!item) notFound();

  const others = outreaches.filter((o) => o.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        kicker="Outreach"
        title={item.title}
        lead={item.blurb}
        crumb={{ label: "All outreaches", href: "/outreaches" }}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            {item.body.map((p, i) => (
              <p
                key={p.slice(0, 32)}
                data-reveal
                suppressHydrationWarning
                data-reveal-delay={(i % 3) + 1}
                className="mb-5 text-pretty text-[15px] leading-[1.8] text-navy-600"
              >
                {p}
              </p>
            ))}

            <h2
              data-reveal
              suppressHydrationWarning
              className="mt-10 font-display text-[20px] font-extrabold text-navy-800"
            >
              What this delivers
            </h2>
            <ul className="mt-5 space-y-3">
              {item.outcomes.map((o, i) => (
                <li
                  key={o}
                  data-reveal
                  suppressHydrationWarning
                  data-reveal-delay={(i % 3) + 1}
                  className="flex gap-3 text-[14px] leading-relaxed text-navy-600"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-400 text-navy-900">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>

            <div
              data-reveal
              suppressHydrationWarning
              className="mt-10 flex flex-wrap gap-3"
            >
              <Button href="/contact" variant="dark">
                Bring this to our school
              </Button>
              <Button href="/outreaches" variant="outline">
                See all outreaches
              </Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Media
              photo={outreachPhoto[item.slug]}
              className="aspect-4/3 rounded-2xl"
              priority
            />
            <div className="mt-6 rounded-2xl border border-navy-100 bg-cream-50/70 p-6">
              <h3 className="font-display text-[13px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
                Other outreaches
              </h3>
              <ul className="mt-4 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/outreaches/${o.slug}`}
                      className="group flex items-center justify-between gap-3 text-[13.5px] font-medium text-navy-700 transition-colors hover:text-brand-600"
                    >
                      {o.short}
                      <Icon
                        name="arrowRight"
                        className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
