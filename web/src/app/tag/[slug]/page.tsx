import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, ALL_TAGS_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { PostsList } from "@/src/components/blog/PostsList";
import { ContactSection } from "@/src/components/blog/ContactSection";
import { slugifyText } from "@/src/lib/blog-utils";
import type { PostItem } from "@/src/types/sanity";

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

  const { data: rawPosts = [] } = await sanityFetch({
    query: POSTS_QUERY,
  });

  const allPosts = (rawPosts as PostItem[]) || [];

  const tagPosts = allPosts.filter((p) =>
    p.tags?.some((t) => slugifyText(t) === slug),
  );

  if (tagPosts.length === 0) {
    notFound();
  }

  const matchingPost = tagPosts[0];
  const tagTitle = matchingPost?.tags?.find((t) => slugifyText(t) === slug) || slug;

  const breadcrumbsItems = [
    { label: "Tópicos" },
    { label: `#${tagTitle}` },
  ];

  return (
    <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
      <Breadcrumbs items={breadcrumbsItems} />

      <PageHeroHeader
        badge="Tópico em Foco"
        badgeIcon="ph:hash-bold"
        title={`#${tagTitle}`}
        description={`Explore todos os artigos, matérias e análises sobre #${tagTitle} no Blog Pirâmide Imóveis.`}
        meta={`${tagPosts.length} ${tagPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"} com esta tag`}
      />

      <PostsList posts={tagPosts} hideHeader />

      <ContactSection />
    </div>
  );
}
