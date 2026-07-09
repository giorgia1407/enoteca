import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { I18nProvider } from "@/components/enoteca/i18n";
import { CartProvider } from "@/components/enoteca/CartContext";
import { UIProvider } from "@/components/enoteca/UIContext";
import "./globals.css";

/** Canonical production origin — used for absolute OG/canonical URLs. */
const SITE_URL = "https://iltempiodivino.it";

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

// Display serif — Playfair for the masthead and headings.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

// Accent serif — Cormorant Garamond for elegant italics.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Il Tempio di Vino — Enoteca Roma",
  description:
    "Il Tempio di Vino — La tua enoteca di fiducia a Roma. Vini pregiati, bollicine e distillati selezionati. Consegna a domicilio.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Il Tempio di Vino — Enoteca Roma",
    description:
      "Il Tempio di Vino — La tua enoteca di fiducia a Roma. Vini pregiati, bollicine e distillati selezionati. Consegna a domicilio.",
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body className="bg-cream font-body antialiased">
        <I18nProvider>
          <CartProvider>
            <UIProvider>{children}</UIProvider>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
