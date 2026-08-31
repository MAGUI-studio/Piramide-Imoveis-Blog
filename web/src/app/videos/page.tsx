import { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { REELS_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { VideosExplorer } from "@/src/components/blog/VideosExplorer";
import { getBaseUrl } from "@/src/config/site";
import type { ReelItem } from "@/src/types/sanity";

export const metadata: Metadata = {
  title: "Tours & Vídeos de Imóveis | Blog Pirâmide Imóveis",
  description:
    "Assista a tours virtuais completos, bastidores e apresentações em vídeo dos imóveis e lançamentos mais exclusivos de São José dos Campos e Vale do Paraíba.",
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "Tours & Vídeos de Imóveis | Blog Pirâmide Imóveis",
    description:
      "Tours em vídeo e apresentações exclusivas de imóveis no Vale do Paraíba e Litoral Norte.",
    url: "/videos",
  },
};

export default async function VideosPage() {
  const { data: rawReels = [] } = await sanityFetch({
    query: REELS_QUERY,
  });

  const reels = (rawReels as ReelItem[]) || [];
  const baseUrl = getBaseUrl();

  const videosJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tours & Vídeos de Imóveis | Blog Pirâmide Imóveis",
    description:
      "Explore tours em vídeo de imóveis e lançamentos selecionados pela Pirâmide Imóveis.",
    url: `${baseUrl}/videos`,
  };

  const breadcrumbsItems = [{ label: "Vídeos" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videosJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Tours & Imóveis em Vídeo"
          badgeIcon="ph:video-camera-fill"
          title="Tours & Vídeos Exclusivos"
          description="Assista a tours virtuais completos, detalhes arquitetônicos e apresentações exclusivas dos imóveis e lançamentos da Pirâmide Imóveis no Vale do Paraíba e Litoral Norte."
          meta={`${reels.length} ${reels.length === 1 ? "vídeo disponível" : "vídeos disponíveis"}`}
        />

        <Suspense fallback={<div className="py-12 text-center text-muted-foreground font-mono text-xs">Carregando vídeos...</div>}>
          <VideosExplorer reels={reels} />
        </Suspense>
      </div>
    </>
  );
}
