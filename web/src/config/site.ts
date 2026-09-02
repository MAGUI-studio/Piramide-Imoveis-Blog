export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }
  return "https://blogpiramide.magui.studio";
}

export const siteConfig = {
  name: "Blog Pirâmide Imóveis",
  title: "Blog Pirâmide Imóveis | Mercado Imobiliário, Tendências e Dicas",
  description:
    "Análises de mercado, dicas para compra e locação, lançamentos e tendências imobiliárias em São José dos Campos e Vale do Paraíba com a Pirâmide Imóveis.",
  url: getBaseUrl(),
  ogImage: "/utils/SEO/og-image.jpg",
  authors: [
    {
      name: "Equipe Editorial Pirâmide Imóveis",
      url: "https://www.piramideimoveissjc.com.br",
    },
  ],
  creator: "Pirâmide Imóveis",
  publisher: "Pirâmide Imóveis",
};
