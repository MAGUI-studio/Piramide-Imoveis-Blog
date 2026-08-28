import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/src/components/common/themeProvider";
import { CookieConsentBanner } from "@/src/components/common/CookieConsentBanner";
import { PrivacyModal } from "@/src/components/common/PrivacyModal";
import { WhatsAppWidget } from "@/src/components/common/WhatsAppWidget";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { fontVariables } from "@/src/config/fonts";
import type { CategoryRef } from "@/src/types/sanity";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Blog Pirâmide Imóveis | Mercado Imobiliário, Tendências e Dicas",
    template: "%s | Blog Pirâmide Imóveis",
  },
  description: "Notícias, dicas para compra e locação, tendências e análises do mercado imobiliário com a Pirâmide Imóveis.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: categories = [] } = await sanityFetch({
    query: CATEGORIES_QUERY,
  });

  const categoryList = (categories as CategoryRef[]) || [];

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`antialiased scroll-smooth scroll-pt-24 h-full ${fontVariables}`}
    >
      <body className="mx-auto w-full max-w-440 bg-[#F1F1F1] dark:bg-[#161616] text-zinc-900 dark:text-zinc-100 transition-colors flex min-h-full flex-col font-sans overflow-x-hidden">
        <ThemeProvider>
          <Header categories={categoryList} />
          <main className="flex-1 w-full overflow-x-hidden">{children}</main>
          <Footer />
          <WhatsAppWidget />
          <CookieConsentBanner />
          <PrivacyModal />
          <SanityLive />
        </ThemeProvider>
      </body>
    </html>
  );
}
