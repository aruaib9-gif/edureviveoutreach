"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Releases anything marked `data-reveal` as it scrolls into view.
 *
 * Mounted once in the root layout rather than wrapping each section, so the
 * pages stay server components and the markup only has to carry an attribute.
 *
 * Two deliberate choices:
 *  - Elements reveal once and are then unobserved. Re-hiding on scroll-up makes
 *    a long page feel nervous and punishes anyone scrolling back to re-read.
 *  - Anyone who prefers reduced motion gets every element revealed immediately,
 *    with no transition, rather than a shorter animation.
 *
 * Every element carrying `data-reveal` also carries `suppressHydrationWarning`.
 * Streaming means a segment can still be hydrating when this observer marks an
 * element in it, and React would otherwise warn about the `data-revealed`
 * attribute it never rendered. The attribute is ours to manage, not React's.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-revealed])",
      ),
    );
    if (nodes.length === 0) return;

    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      {
        // Hold back until the element is a little way up from the bottom edge,
        // so the movement finishes about when the reader's eye arrives rather
        // than starting while it is still off-screen.
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
    // Re-scan on navigation: this component persists across route changes, so
    // the next page's markup would otherwise never be observed.
  }, [pathname]);

  return null;
}
