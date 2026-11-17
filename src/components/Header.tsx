"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // Desktop dropdowns open on hover/focus. After a click the pointer is still
  // over the panel and focus is still inside it, so CSS alone would keep it
  // open; this hides that panel until the pointer leaves the menu item.
  const [dismissed, setDismissed] = useState<string | null>(null);
  const dismissDropdown = (href: string) => {
    setDismissed(href);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // The drawer closes from the links themselves (see `closeMenu` below) rather
  // than from a pathname effect, which would cause a cascading render.
  const closeMenu = () => {
    setOpen(false);
    setExpanded(null);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_24px_rgba(23,27,36,0.09)]" : ""
      }`}
    >
      <div className="mx-auto flex h-17 max-w-330 items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="group relative"
                onMouseLeave={() =>
                  dismissed === item.href && setDismissed(null)
                }
              >
                <Link
                  href={item.href}
                  onClick={() => dismissDropdown(item.href)}
                  className={`flex items-center gap-1 rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-brand-500"
                      : "text-navy-700 hover:text-brand-500"
                  }`}
                >
                  {item.label}
                  <Icon
                    name="chevronDown"
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      dismissed === item.href ? "" : "group-hover:rotate-180"
                    }`}
                  />
                </Link>
                <div
                  className={`invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 ${
                    // Long menus (Our Outreaches has nine entries) split into
                    // two columns so the panel stays within the viewport.
                    item.children.length > 5 ? "w-160" : "w-95"
                  } ${
                    dismissed === item.href
                      ? ""
                      : "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                  }`}
                >
                  <div
                    className={`grid max-h-[calc(100dvh-5.5rem)] gap-0.5 overflow-y-auto overscroll-contain rounded-2xl border border-navy-100 bg-white p-2 shadow-[0_24px_60px_rgba(23,27,36,0.16)] ${
                      item.children.length > 5 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => dismissDropdown(item.href)}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-cream-100"
                      >
                        <span className="block text-[13px] font-semibold text-navy-800">
                          {child.label}
                        </span>
                        {child.blurb && (
                          <span className="mt-0.5 block line-clamp-2 text-[11.5px] leading-snug text-navy-400">
                            {child.blurb}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-brand-500"
                    : "text-navy-700 hover:text-brand-500"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-xl border border-navy-100 text-navy-800 xl:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-x-0 top-17 bottom-0 z-40 overflow-y-auto border-t border-navy-100 bg-white px-4 pb-28 pt-4 xl:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href} className="border-b border-navy-100/80 py-1">
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((v) => (v === item.href ? null : item.href))
                    }
                    aria-expanded={expanded === item.href}
                    className="flex w-full items-center justify-between px-2 py-3 text-left text-[15px] font-semibold text-navy-800"
                  >
                    {item.label}
                    <Icon
                      name="chevronDown"
                      className={`h-4 w-4 transition-transform ${
                        expanded === item.href ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expanded === item.href && (
                    <div className="flex flex-col pb-2 pl-3">
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="rounded-lg px-2 py-2 text-[13.5px] font-semibold text-brand-500"
                      >
                        All {item.label.toLowerCase()}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className="rounded-lg px-2 py-2 text-[13.5px] text-navy-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-navy-100/80 px-2 py-4 text-[15px] font-semibold text-navy-800"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-5 py-3.5 text-[14px] font-semibold text-cream-100"
          >
            Invite us to your school
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
