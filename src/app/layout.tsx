import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  DM_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { ActiveSectionProvider } from "@/components/layout/ActiveSectionProvider";
import { Header, Footer } from "@/components/layout/Header";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { CustomScrollbar } from "@/components/layout/CustomScrollbar";
import { CursorOrb } from "@/components/layout/CursorOrb";
import { WhatsAppFloatingButton } from "@/components/contact/WhatsAppFloatingButton";
import { MotionPause } from "@/components/layout/MotionPause";
import { SITE } from "@/lib/constants";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

const siteTitle = `${SITE.name} — ${SITE.tagline}`;

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [{ url: "/ibs_logo.jpg", type: "image/jpeg" }],
    apple: [{ url: "/ibs_logo.jpg", type: "image/jpeg" }],
  },
  openGraph: {
    title: siteTitle,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/ibs_logo_fondo_claro.png",
        width: 1024,
        height: 1024,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: SITE.description,
    images: ["/ibs_logo_fondo_claro.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bodoni.variable} ${cormorant.variable} ${dmSans.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">
        <ActiveSectionProvider>
          <SiteBackground />
          <div className="relative flex min-h-full flex-1 flex-col">
            <Header />
            <main className="relative flex-1 overflow-x-hidden pt-[4.25rem] sm:pt-[4.5rem]">
              <CursorOrb />
              <div className="relative z-10">{children}</div>
            </main>
            <Footer />
          </div>
        </ActiveSectionProvider>
        <CustomScrollbar />
        <WhatsAppFloatingButton />
        <MotionPause />
      </body>
    </html>
  );
}
