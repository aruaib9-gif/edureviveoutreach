import { Button } from "@/components/ui";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-28">
      <div className="bp-grid-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 text-center sm:px-6">
        <LogoMark className="h-20 w-20" />
        <p className="mt-6 font-display text-[13px] font-bold uppercase tracking-[0.2em] text-brand-400">
          404
        </p>
        <h1 className="mt-2 font-display text-[30px] font-extrabold text-cream-100">
          This page could not be found.
        </h1>
        <p className="mt-4 text-[14.5px] leading-relaxed text-navy-200">
          The page you are looking for may have moved. Try our outreaches, or
          get in touch and we will point you the right way.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="light">
            Back to home
          </Button>
          <Button href="/outreaches" variant="dark">
            Our outreaches
          </Button>
        </div>
      </div>
    </section>
  );
}
