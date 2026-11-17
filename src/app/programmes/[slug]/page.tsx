import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icons";
import { Button, CtaBand, Media, PageHero } from "@/components/ui";
import { programmePhoto } from "@/lib/photos";
import { programmes } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

// Every slug is prerendered by generateStaticParams, so a blocking render is
// correct here; without this Next warns about params read outside <Suspense>.
export const instant = false;

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = programmes.find((p) => p.slug === slug);
  if (!item) return {};
  return { title: item.name, description: item.blurb };
}

export default async function ProgrammePage({ params }: Params) {
  const { slug } = await params;
  const item = programmes.find((p) => p.slug === slug);
  if (!item) notFound();

  const others = programmes.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHero
        kicker={item.kicker}
        title={item.name}
        lead={item.blurb}
        crumb={{ label: "All programmes", href: "/programmes" }}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-330 gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p
              data-reveal
              suppressHydrationWarning
              className="text-pretty text-[15px] leading-[1.8] text-navy-600"
            >
              {item.long}
            </p>

            <h2
              data-reveal
              suppressHydrationWarning
              className="mt-10 font-display text-[20px] font-extrabold text-navy-800"
            >
              At a glance
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {item.points.map((p, i) => (
                <li
                  key={p}
                  data-reveal
                  suppressHydrationWarning
                  data-reveal-delay={(i % 2) + 1}
                  className="flex gap-3 rounded-xl border border-navy-100 bg-cream-50/60 p-4 text-[13.5px] leading-relaxed text-navy-600"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-400 text-navy-900">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div
              data-reveal
              suppressHydrationWarning
              className="mt-10 flex flex-wrap gap-3"
            >
              <Button href="/contact" variant="dark">
                Bring {item.name} to our school
              </Button>
              <Button href="/programmes" variant="outline">
                See all programmes
              </Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Media
              photo={programmePhoto[item.slug]}
              className="aspect-4/3 rounded-2xl"
              priority
            />
            <div className="mt-6 rounded-2xl border border-navy-100 bg-cream-50/70 p-6">
              <h3 className="font-display text-[13px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
                Other programmes
              </h3>
              <ul className="mt-4 space-y-3">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/programmes/${p.slug}`}
                      className="group flex items-center justify-between gap-3 text-[13.5px] font-medium text-navy-700 transition-colors hover:text-brand-600"
                    >
                      {p.name}
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
