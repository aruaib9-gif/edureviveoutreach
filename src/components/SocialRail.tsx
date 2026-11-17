import { SocialIcon } from "./Icons";
import { site } from "@/lib/site";

const tint: Record<string, string> = {
  facebook: "bg-[#1877F2]",
  instagram: "bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  tiktok: "bg-[#010101]",
  x: "bg-navy-800",
  youtube: "bg-[#FF0000]",
};

/** Fixed vertical social strip on the right edge, as on the reference site. */
export function SocialRail() {
  return (
    <div className="pointer-events-none fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col md:flex">
      {site.socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.shortName} on ${s.label}: ${s.handle}`}
          title={s.handle}
          className={`pointer-events-auto grid h-7.25 w-7.25 place-items-center text-white/95 transition-[width] duration-200 hover:w-9 ${tint[s.icon]}`}
        >
          <SocialIcon name={s.icon} className="h-3.75 w-3.75" />
        </a>
      ))}
    </div>
  );
}
