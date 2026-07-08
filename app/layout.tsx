import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { ContentProvider } from "@/components/restaurant/ContentContext";
import { CartProvider } from "@/components/restaurant/CartContext";
import { UIProvider } from "@/components/restaurant/UIContext";
import "./globals.css";

/** Canonical production origin — used for absolute OG/canonical URLs. */
const SITE_URL = "https://curryespice.it";

// Body / UI sans — Inter (variable, self-hosted via next/font).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Secondary sans — Poppins (self-hosted).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

// Display serif — Playfair, full range for the masthead and headings.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

// Accent serif — Cormorant Garamond for the menu's elegant italics.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Curry & Spice — Cucina Indiana a Roma",
  description:
    "Autentica cucina indiana nel cuore di Roma. Prenoti un tavolo, ordini online o chatti con Bella, la nostra assistente AI.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Curry & Spice — Cucina indiana moderna nel cuore di Roma",
    description:
      "Autentica cucina indiana nel cuore di Roma. Prenoti, ordini ed esplori il nostro menu.",
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff8f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body className="bg-white font-body antialiased">
        <ContentProvider>
          <CartProvider>
            <UIProvider>{children}</UIProvider>
          </CartProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
