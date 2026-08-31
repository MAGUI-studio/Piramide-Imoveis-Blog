import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, ALL_TAGS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { ArticlesExplorer } from "@/src/components/blog/ArticlesExplorer";
import { slugifyText } from "@/src/lib/blog-utils";
import { getBaseUrl } from "@/src/config/site";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

export async function generateStaticParams() {
  const { data: rawTags = [] } = await sanityFetch({
    query: ALL_TAGS_QUERY,
    perspective: "published",
    stega: false,
  });

  const tags = (rawTags as string[]) || [];

  return tags.filter(Boolean).map((tag) => ({
    slug: slugifyText(tag),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data: rawPosts = [] } = await sanityFetch({
    query: POSTS_QUERY,
  });

  const allPosts = (rawPosts as PostItem[]) || [];
  const matchingPost = allPosts.find((p) =>
    p.tags?.some((t) => slugifyText(t) === slug),
  );

  const matchedTag = matchingPost?.tags?.find((t) => slugifyText(t) === slug) || slug;
  const title = `#${matchedTag} | Blog Pirâmide Imóveis`;
  const description = `Confira todas as análises, novidades e artigos marcados com #${matchedTag} no Blog Pirâmide Imóveis.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tag/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/tag/${slug}`,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: rawPosts = [] }, { data: rawCategories = [] }] =
    await Promise.all([
      sanityFetch({ query: POSTS_QUERY }),
      sanityFetch({ query: CATEGORIES_QUERY }),
    ]);

  const allPosts = (rawPosts as PostItem[]) || [];
  const categories = (rawCategories as CategoryRef[]) || [];

  const tagPosts = allPosts.filter((p) =>
    p.tags?.some((t) => slugifyText(t) === slug),
  );

  if (tagPosts.length === 0) {
    notFound();
  }

  const matchingPost = tagPosts[0];
  const tagTitle = matchingPost?.tags?.find((t) => slugifyText(t) === slug) || slug;

  const baseUrl = getBaseUrl();
  const tagUrl = `${baseUrl}/tag/${slug}`;

  const tagJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `#${tagTitle} | Blog Pirâmide Imóveis`,
    description: `Explore todos os artigos sobre #${tagTitle} no Blog Pirâmide Imóveis.`,
    url: tagUrl,
  };

  const breadcrumbsItems = [
    { label: "Tópicos & Tags", href: "/tags" },
    { label: `#${tagTitle}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tagJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Tópico em Foco"
          badgeIcon="ph:hash-bold"
          title={`#${tagTitle}`}
          description={`Explore todos os artigos, matérias e análises sobre #${tagTitle} no Blog Pirâmide Imóveis.`}
          meta={`${tagPosts.length} ${tagPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"}`}
        />

        <Suspense fallback={<div className="py-12 text-center text-muted-foreground font-mono text-xs">Carregando artigos...</div>}>
          <ArticlesExplorer allPosts={tagPosts} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
