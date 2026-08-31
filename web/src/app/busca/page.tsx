import { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { SearchPageClient } from "@/src/components/blog/SearchPageClient";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; search?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawQuery = resolvedSearchParams?.q || resolvedSearchParams?.search || "";
  const query = rawQuery.trim();

  const title = query
    ? `Busca por "${query}" | Blog Pirâmide Imóveis`
    : "Buscar Artigos & Análises | Blog Pirâmide Imóveis";

  const description = query
    ? `Resultados da pesquisa por "${query}" no Blog Pirâmide Imóveis.`
    : "Pesquise por artigos, bairros, tendências de mercado e lançamentos no Blog Pirâmide Imóveis.";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: "/busca",
    },
    openGraph: {
      title,
      description,
      url: "/busca",
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; search?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawQuery = resolvedSearchParams?.q || resolvedSearchParams?.search || "";

  const [{ data: rawPosts = [] }, { data: rawCategories = [] }] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY }),
  ]);

  const allPosts = (rawPosts as PostItem[]) || [];
  const categories = (rawCategories as CategoryRef[]) || [];

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

  const breadcrumbsItems = [
    { label: "Busca", href: "/busca" },
    ...(rawQuery.trim() ? [{ label: `"${rawQuery.trim()}"` }] : []),
  ];

  return (
    <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
      <Breadcrumbs items={breadcrumbsItems} />

      <Suspense fallback={<div className="h-64 animate-pulse bg-zinc-100 dark:bg-zinc-800" />}>
        <SearchPageClient
          key={rawQuery.trim()}
          initialQuery={rawQuery.trim()}
          allPosts={allPosts}
          categoryList={categoryList}
        />
      </Suspense>
    </div>
  );
}
