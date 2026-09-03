import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { LaunchesExplorer, type LaunchItem } from "@/src/components/blog/LaunchesExplorer";
import { getBaseUrl } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Lançamentos Imobiliários | Pirâmide Imóveis",
  description:
    "Conheça os principais lançamentos e empreendimentos imobiliários no Vale do Paraíba e Litoral Norte: Parque Una, Le Monde, Amarílis, YVY Aquarius, Easy Home e Blue View.",
  alternates: {
    canonical: "/lancamentos",
  },
  openGraph: {
    title: "Lançamentos Imobiliários | Pirâmide Imóveis",
    description:
      "Empreendimentos de alto padrão, loteamentos fechados e lançamentos exclusivos selecionados pela Pirâmide Imóveis.",
    url: "/lancamentos",
  },
};

const launches: LaunchItem[] = [
  {
    id: "parque-una",
    title: "Parque Una São José dos Campos",
    description:
      "Bairro planejado completo com praças, lagos, lazer e infraestrutura de classe mundial em São José dos Campos.",
    image: "/banners/banner-parque-una.webp",
    href: "https://parqueuna.piramideimoveissjc.com.br/pt",
    tag: "Bairro Planejado",
  },
  {
    id: "le-monde",
    title: "Residencial Le Monde",
    description:
      "Alto padrão, sofisticação e localização privilegiada no melhor ponto da cidade, com plantas generosas e acabamentos nobres.",
    image: "/banners/banner-le-monde.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/le-monde-vila-adyana-vila-adyana-sao-jose-dos-campos-sp?cond_id=644692&search_name=Le+Monde+-+Vila+Adyana&localidade=Vila+Adyana%2C+S%C3%A3o+Jos%C3%A9+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes",
    tag: "Alto Padrão",
  },
  {
    id: "amarilis",
    title: "Residencial Amarílis",
    description:
      "Conforto, segurança e área de lazer completa pensada para o bem-estar e convivência da sua família.",
    image: "/banners/banner-amarilis.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/amarilis-urbanova-urbanova-sao-jose-dos-campos-sp?cond_id=635293&search_name=Amar%C3%ADlis+-+Urbanova&localidade=Urbanova%2C+S%C3%A3o+Jos%C3%A9+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes",
    tag: "Residencial",
  },
  {
    id: "yvy",
    title: "YVY Residences Massaguaçu",
    description:
      "Design moderno, sustentabilidade e tecnologia em um dos bairros mais valorizados e desejados da região.",
    image: "/banners/banner-YVY.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/yvy-residences-massaguacu-massaguacu-caraguatatuba-sp?cond_id=644732&search_name=Yvy+Residences+-++Massagua%C3%A7u&localidade=Massagua%C3%A7u%2C+Caraguatatuba%2C+SP&toggle_map=true&order=mais_relevantes",
    tag: "Aquarius",
  },
  {
    id: "easy-home",
    title: "Easy Home",
    description:
      "Praticidade, inovação e plantas inteligentes projetadas especialmente para o estilo de vida contemporâneo.",
    image: "/banners/banner-easy-home.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/easy-home-jardim-aquarius-jardim-aquarius-sao-jose-dos-campos-sp?cond_id=644953&search_name=Easy+Home+-++Jardim+Aquarius&localidade=Jardim+Aquarius%2C+S%C3%A3o+Jos%C3%A9+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes",
    tag: "Lançamento",
  },
  {
    id: "blue-view",
    title: "Blue View",
    description:
      "Vistas deslumbrantes, arquitetura diferenciada e acabamentos de altíssima qualidade com lazer exclusivo.",
    image: "/banners/banner-blue-view.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/blue-view-vila-industrial-vila-industrial-sao-jose-dos-campos-sp?cond_id=641742&search_name=Blue+View+-++Vila+Industrial&localidade=Vila+Industrial%2C+S%C3%A3o+Jos%C3%A9+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes",
    tag: "Exclusividade",
  },
];

export default function LancamentosPage() {
  const baseUrl = getBaseUrl();

  const launchesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lançamentos Imobiliários | Pirâmide Imóveis",
    description:
      "Explore os principais lançamentos e empreendimentos imobiliários no Vale do Paraíba e Litoral Norte.",
    url: `${baseUrl}/lancamentos`,
  };

  const breadcrumbsItems = [{ label: "Lançamentos" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(launchesJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Empreendimentos & Oportunidades"
          badgeIcon="ph:buildings-fill"
          title="Lançamentos Imobiliários"
          description="Explore os principais lançamentos, loteamentos e condomínios de alto padrão selecionados pela equipe da Pirâmide Imóveis no Vale do Paraíba e Litoral Norte."
          meta={`${launches.length} ${launches.length === 1 ? "empreendimento disponível" : "empreendimentos disponíveis"}`}
        />

        <Suspense
          fallback={
            <div className="py-12 text-center text-muted-foreground font-mono text-xs">
              Carregando lançamentos...
            </div>
          }
        >
          <LaunchesExplorer launches={launches} />
        </Suspense>
      </div>
    </>
  );
}
