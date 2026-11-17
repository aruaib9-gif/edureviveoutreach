import Image from "next/image";
import Link from "next/link";

/**
 * EduREVIVE OUTREACH mark: the official logo artwork (cap, dove, flames and
 * open book) cropped from /brand/edurevive-logo.jpg with nothing redrawn or
 * recoloured. It keeps its own navy ground so the dove and cap stay cream on
 * any surface, light or dark.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`relative block overflow-hidden rounded-[22%] bg-[#151A1E] ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/brand/edurevive-mark.png"
        alt=""
        fill
        sizes="(max-width: 640px) 80px, 120px"
        className="object-contain"
      />
    </span>
  );
}

/** Full lock-up: mark + wordmark, as used in the header and footer. */
export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const onDark = variant === "light";
  return (
    <Link
      href="/"
      aria-label="EduREVIVE OUTREACH, home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark
        className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      {/* Both lines follow the logo artwork: a serif over a wide-tracked
          geometric sans, not the display face the headings use. */}
      <span className="flex flex-col leading-none">
        <span
          className={`font-wordmark text-[19px] font-bold leading-none ${
            onDark ? "text-cream-100" : "text-navy-800"
          }`}
        >
          Edu<span className="text-brand-400">REVIVE</span>
        </span>
        <span
          className={`mt-0.5 font-sans text-[10.5px] font-bold tracking-[0.2em] ${
            onDark ? "text-navy-300" : "text-navy-500"
          }`}
        >
          OUTREACH
        </span>
      </span>
    </Link>
  );
}
