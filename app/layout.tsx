import type { Metadata, Viewport } from "next";
import { Archivo_Black, Hanken_Grotesk, Space_Mono } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import CursorGlow from "@/components/cursor-glow";
import LayersBreadcrumb from "@/components/layers-breadcrumb";
import EntrySplash from "@/components/system/entry-splash";
import { TooltipProvider } from "@/components/ui/tooltip";
import { site } from "@/lib/content";
import "./globals.css";

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

// One family for body and display — headings differentiate by weight.
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const wordmark = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: `${site.fullName} — ${site.role}, designing and building user-centered digital interfaces. Based in ${site.location}.`,
  // No og title/description/url here: pages don't declare their own openGraph
  // blocks (shallow merge would drop siteName), so og:* must fall back to each
  // page's resolved title/description instead of freezing the homepage's.
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111210",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${wordmark.variable}`}
    >
      <body className="bg-ink font-sans text-paper antialiased">
        <EntrySplash />
        <SmoothScroll />
        <CursorGlow />
        <LayersBreadcrumb />
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <TooltipProvider delayDuration={150}>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
