import type { Metadata } from "next";
import { Montserrat, Source_Serif_4, Unbounded } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialRail } from "@/components/SocialRail";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

// The logo artwork sets "EduREVIVE" in a serif; the wordmark follows it rather
// than the display face used for headings.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edurevive.org"),
  title: {
    default: `${site.name} | ${site.strapline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    images: ["/brand/edurevive-logo.jpg"],
  },
  icons: {
    icon: [{ url: "/brand/icon.png", type: "image/png", sizes: "64x64" }],
    apple: "/brand/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Without JavaScript nothing would ever add `data-revealed`, so the
            reveal styles must not be allowed to hide content. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body
        className={`${montserrat.variable} ${unbounded.variable} ${sourceSerif.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-cream-100"
        >
          Skip to content
        </a>
        <Header />
        <SocialRail />
        <main id="main">{children}</main>
        <Footer />
        <MobileBottomNav />
        <ScrollReveal />
      </body>
    </html>
  );
}
