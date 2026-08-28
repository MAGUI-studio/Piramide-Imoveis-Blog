import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/src/components/common/themeProvider";
import { CookieConsentBanner } from "@/src/components/common/CookieConsentBanner";
import { PrivacyModal } from "@/src/components/common/PrivacyModal";
import { WhatsAppWidget } from "@/src/components/common/WhatsAppWidget";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { BackToTop } from "@/src/components/common/BackToTop";
import { fontVariables } from "@/src/config/fonts";
import type { CategoryRef } from "@/src/types/sanity";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Blog Pirâmide Imóveis | Mercado Imobiliário, Tendências e Dicas",
    template: "%s | Blog Pirâmide Imóveis",
  },
  description:
    "Análises de mercado, dicas para compra e locação, lançamentos e tendências imobiliárias em São José dos Campos e Vale do Paraíba com a Pirâmide Imóveis.",
  keywords: [
    "imóveis",
    "São José dos Campos",
    "Urbanova",
    "Vale do Paraíba",
    "aluguel de imóveis",
    "compra de casas",
    "apartamentos de alto padrão",
    "lançamentos imobiliários",
    "Pirâmide Imóveis",
    "mercado imobiliário SJC",
  ],
  authors: [{ name: "Pirâmide Imóveis", url: "https://www.piramideimoveissjc.com.br" }],
  creator: "Pirâmide Imóveis",
  publisher: "Pirâmide Imóveis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
    types: {
      "application/rss+xml": `${baseUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    siteName: "Blog Pirâmide Imóveis",
    title: "Blog Pirâmide Imóveis | Mercado Imobiliário, Tendências e Dicas",
    description:
      "Análises de mercado, dicas para compra e locação, lançamentos e tendências imobiliárias em São José dos Campos e Vale do Paraíba.",
    images: [
      {
        url: `${baseUrl}/logos/piramide/logo_black.svg`,
        width: 1200,
        height: 630,
        alt: "Pirâmide Imóveis Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Pirâmide Imóveis",
    description:
      "Notícias, análises e tendências do mercado imobiliário em São José dos Campos.",
    creator: "@piramideimoveis",
    images: [`${baseUrl}/logos/piramide/logo_black.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Pirâmide Imóveis",
        url: "https://www.piramideimoveissjc.com.br",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logos/piramide/logo_black.svg`,
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://www.instagram.com/piramideimoveissjc",
          "https://www.facebook.com/piramideimoveissjc",
          "https://www.linkedin.com/company/piramide-imoveis-sjc",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+55-12-99159-9801",
          contactType: "customer service",
          areaServed: "BR",
          availableLanguage: ["Portuguese"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Blog Pirâmide Imóveis",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "pt-BR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`antialiased scroll-smooth scroll-pt-24 h-full ${fontVariables}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="mx-auto w-full max-w-440 bg-[#F1F1F1] dark:bg-[#161616] text-zinc-900 dark:text-zinc-100 transition-colors flex min-h-full flex-col font-sans overflow-x-clip">
        <ThemeProvider>
          <Header categories={categoryList} />
          <main className="flex-1 w-full overflow-x-clip">{children}</main>
          <Footer />
          <WhatsAppWidget />
          <CookieConsentBanner />
          <PrivacyModal />
          <BackToTop />
          <SanityLive />
        </ThemeProvider>
      </body>
    </html>
  );
}
