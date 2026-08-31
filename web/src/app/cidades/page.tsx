import { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { CITIES_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { CitiesExplorer } from "@/src/components/blog/CitiesExplorer";
import type { CityRef } from "@/src/types/sanity";

export const metadata: Metadata = {
  title: "Cidades & Regiões | Blog Pirâmide Imóveis",
  description:
    "Explore artigos, bairros e análises do mercado imobiliário em São José dos Campos, Caçapava, Jacareí, Taubaté, Caraguatatuba, Ubatuba, Campos do Jordão e região.",
  alternates: {
    canonical: "/cidades",
  },
  openGraph: {
    title: "Cidades & Regiões | Blog Pirâmide Imóveis",
    description:
      "Explore artigos, bairros e análises do mercado imobiliário em São José dos Campos, Caçapava, Jacareí, Taubaté, Caraguatatuba, Ubatuba, Campos do Jordão e região.",
    url: "/cidades",
  },
};

export default async function CidadesPage() {
  const { data: rawCities = [] } = await sanityFetch({
    query: CITIES_QUERY,
  });

  const cities = (rawCities as CityRef[]) || [];

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";

  const citiesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cidades & Regiões | Blog Pirâmide Imóveis",
    description:
      "Explore todas as cidades e regiões atendidas pelo Blog Pirâmide Imóveis.",
    url: `${baseUrl}/cidades`,
  };

  const breadcrumbsItems = [{ label: "Cidades" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(citiesJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Regiões Atendidas"
          badgeIcon="ph:map-pin-fill"
          title="Cidades & Regiões"
          description="Explore análises de valorização de bairros, oportunidades e infraestrutura no Vale do Paraíba, Litoral Norte e Serra da Mantiqueira."
          meta={`${cities.length} cidades disponíveis`}
        />

        <Suspense
          fallback={
            <div className="py-12 text-center text-muted-foreground font-mono text-xs">
              Carregando cidades...
            </div>
          }
        >
          <CitiesExplorer cities={cities} />
        </Suspense>
      </div>
    </>
  );
}
