"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icons";

const items: { label: string; href: string; icon: IconName }[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Outreaches", href: "/outreaches", icon: "layers" },
  { label: "Programmes", href: "/programmes", icon: "box" },
  { label: "Contact", href: "/contact", icon: "chat" },
  { label: "More", href: "/about", icon: "menu" },
];

/** Bottom tab bar shown on small screens, mirroring the reference site. */
export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                  active ? "text-brand-500" : "text-navy-400"
                }`}
              >
                <span
                  className={`grid h-7 w-10 place-items-center rounded-full transition-colors ${
                    active ? "bg-brand-100" : ""
                  }`}
                >
                  <Icon name={item.icon} className="h-4.5 w-4.5" />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
