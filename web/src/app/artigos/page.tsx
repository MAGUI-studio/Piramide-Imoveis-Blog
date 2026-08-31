import { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { ArticlesExplorer } from "@/src/components/blog/ArticlesExplorer";
import { getBaseUrl } from "@/src/config/site";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

export const metadata: Metadata = {
  title: "Todos os Artigos & Análises | Blog Pirâmide Imóveis",
  description:
    "Explore todas as publicações, guias de bairros, análises de mercado imobiliário, lançamentos e dicas exclusivas da Pirâmide Imóveis.",
  alternates: {
    canonical: "/artigos",
  },
  openGraph: {
    title: "Todos os Artigos & Análises | Blog Pirâmide Imóveis",
    description:
      "Acervo editorial completo com análises imobiliárias, lançamentos e tendências no Vale do Paraíba e Litoral Norte.",
    url: "/artigos",
  },
};

export default async function ArtigosPage() {
  const [{ data: rawPosts = [] }, { data: rawCategories = [] }] =
    await Promise.all([
      sanityFetch({ query: POSTS_QUERY }),
      sanityFetch({ query: CATEGORIES_QUERY }),
    ]);

  const allPosts = (rawPosts as PostItem[]) || [];
  const categories = (rawCategories as CategoryRef[]) || [];
  const baseUrl = getBaseUrl();

  const artigosJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Todos os Artigos & Análises | Blog Pirâmide Imóveis",
    description:
      "Acervo editorial completo de artigos e notícias imobiliárias da Pirâmide Imóveis.",
    url: `${baseUrl}/artigos`,
  };

  const breadcrumbsItems = [{ label: "Artigos" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(artigosJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Acervo Editorial Completo"
          badgeIcon="ph:newspaper-clipping-bold"
          title="Todos os Artigos & Análises"
          description="Explore o acervo completo de artigos, guias de bairros, análises de mercado imobiliário, lançamentos e tendências da Pirâmide Imóveis no Vale do Paraíba e Litoral Norte."
          meta={`${allPosts.length} artigos publicados`}
        />

        <Suspense fallback={<div className="py-12 text-center text-muted-foreground font-mono text-xs">Carregando artigos...</div>}>
          <ArticlesExplorer allPosts={allPosts} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
