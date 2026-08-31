import { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { CATEGORIES_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { CategoriesExplorer } from "@/src/components/blog/CategoriesExplorer";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import type { CategoryRef, PostItem } from "@/src/types/sanity";

export const metadata: Metadata = {
  title: "Todas as Categorias | Blog Pirâmide Imóveis",
  description:
    "Explore todas as categorias editoriais do Blog Pirâmide Imóveis: análises de mercado, arquitetura, investimentos, financiamento e dicas de compra.",
  alternates: {
    canonical: "/categorias",
  },
  openGraph: {
    title: "Todas as Categorias | Blog Pirâmide Imóveis",
    description:
      "Explore todas as categorias editoriais do Blog Pirâmide Imóveis: análises de mercado, arquitetura, investimentos, financiamento e dicas de compra.",
    url: "/categorias",
  },
};

export default async function CategoriasPage() {
  const [{ data: rawCategories = [] }, { data: allPostsRaw = [] }] =
    await Promise.all([
      sanityFetch({ query: CATEGORIES_QUERY }),
      sanityFetch({ query: POSTS_QUERY }),
    ]);

  const categories = (rawCategories as CategoryRef[]) || [];
  const allPosts = (allPostsRaw as PostItem[]) || [];

  const categoryList = categories.map((cat) => {
    const matchedCount = allPosts.filter((p) =>
      p.categories?.some(
        (c) =>
          c.slug?.current === cat.slug?.current ||
          c._id === cat._id ||
          c.title?.toLowerCase() === cat.title?.toLowerCase(),
      ),
    ).length;

    return {
      ...cat,
      postCount: Math.max(matchedCount, cat.postCount || 0),
    };
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";

  const categoriesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Todas as Categorias | Blog Pirâmide Imóveis",
    description:
      "Explore todas as categorias editoriais do Blog Pirâmide Imóveis.",
    url: `${baseUrl}/categorias`,
  };

  const breadcrumbsItems = [{ label: "Categorias" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoriesJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Guia Temático"
          badgeIcon="ph:tag-fill"
          title="Todas as Categorias"
          description="Navegue pelas principais categorias e temas do mercado imobiliário: análises de bairros, lançamentos, tendências e guias práticos."
          meta={`${categoryList.length} categorias disponíveis`}
        />

        <Suspense
          fallback={
            <div className="py-12 text-center text-muted-foreground font-mono text-xs">
              Carregando categorias...
            </div>
          }
        >
          <CategoriesExplorer categories={categoryList} />
        </Suspense>
      </div>
    </>
  );
}
