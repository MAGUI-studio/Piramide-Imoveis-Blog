import { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_TAGS_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { TagsExplorer } from "@/src/components/blog/TagsExplorer";
import { slugifyText } from "@/src/lib/blog-utils";
import { getBaseUrl } from "@/src/config/site";
import type { PostItem } from "@/src/types/sanity";

export const metadata: Metadata = {
  title: "Todos os Tópicos & Tags | Blog Pirâmide Imóveis",
  description:
    "Explore todos os tópicos, temas e palavras-chave de artigos do mercado imobiliário: análises de bairros, lançamentos, investimentos e finanças no Blog Pirâmide Imóveis.",
  alternates: {
    canonical: "/tags",
  },
  openGraph: {
    title: "Todos os Tópicos & Tags | Blog Pirâmide Imóveis",
    description:
      "Explore todos os tópicos, temas e palavras-chave de artigos do mercado imobiliário: análises de bairros, lançamentos, investimentos e finanças no Blog Pirâmide Imóveis.",
    url: "/tags",
  },
};

export default async function TagsPage() {
  const [{ data: rawTags = [] }, { data: allPostsRaw = [] }] =
    await Promise.all([
      sanityFetch({ query: ALL_TAGS_QUERY }),
      sanityFetch({ query: POSTS_QUERY }),
    ]);

  const uniqueTagNames = (rawTags as string[]) || [];
  const allPosts = (allPostsRaw as PostItem[]) || [];

  
  const tagsMap = new Map<string, { name: string; slug: string; postCount: number }>();

  uniqueTagNames.filter(Boolean).forEach((tag) => {
    const slug = slugifyText(tag);
    if (!slug) return;

    if (!tagsMap.has(slug)) {
      const count = allPosts.filter((p) =>
        p.tags?.some((t) => slugifyText(t) === slug),
      ).length;

      tagsMap.set(slug, {
        name: tag,
        slug,
        postCount: count,
      });
    }
  });

  
  allPosts.forEach((post) => {
    (post.tags || []).forEach((tag) => {
      const slug = slugifyText(tag);
      if (!slug || tagsMap.has(slug)) return;

      const count = allPosts.filter((p) =>
        p.tags?.some((t) => slugifyText(t) === slug),
      ).length;

      tagsMap.set(slug, {
        name: tag,
        slug,
        postCount: count,
      });
    });
  });

  const tagList = Array.from(tagsMap.values()).filter((t) => t.postCount > 0);

  const baseUrl = getBaseUrl();
  const tagsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Todos os Tópicos & Tags | Blog Pirâmide Imóveis",
    description:
      "Explore todos os tópicos e tags editoriais do Blog Pirâmide Imóveis.",
    url: `${baseUrl}/tags`,
  };

  const breadcrumbsItems = [{ label: "Tópicos & Tags" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tagsJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Índice de Tópicos"
          badgeIcon="ph:hash-bold"
          title="Todos os Tópicos & Tags"
          description="Explore todos os temas, palavras-chave e tópicos especializados do mercado imobiliário: encontre rapidamente artigos de seu interesse."
          meta={`${tagList.length} tópicos disponíveis`}
        />

        <Suspense
          fallback={
            <div className="py-12 text-center text-muted-foreground font-mono text-xs">
              Carregando tópicos...
            </div>
          }
        >
          <TagsExplorer tags={tagList} />
        </Suspense>
      </div>
    </>
  );
}
