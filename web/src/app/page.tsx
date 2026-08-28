import Link from "next/link";
import { Icon } from "@iconify/react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  POSTS_QUERY,
  CATEGORIES_QUERY,
  FEATURED_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { HeroCarousel } from "@/src/components/blog/HeroCarousel";
import { CategoryShowcase } from "@/src/components/blog/CategoryShowcase";
import { PostsList } from "@/src/components/blog/PostsList";
import { ContactSection } from "@/src/components/blog/ContactSection";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const searchFilter = resolvedSearchParams?.search?.toLowerCase().trim() || "";

  const [
    { data: posts = [] },
    { data: categories = [] },
    { data: featured = [] },
  ] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY }),
    sanityFetch({ query: FEATURED_POSTS_QUERY }),
  ]);

  const allPosts = (posts as PostItem[]) || [];
  const rawCategories = (categories as CategoryRef[]) || [];
  const featuredList = (featured as PostItem[]) || [];

  const postList = searchFilter
    ? allPosts.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchFilter) ||
          p.excerpt?.toLowerCase().includes(searchFilter) ||
          p.tags?.some((t) => t.toLowerCase().includes(searchFilter)) ||
          p.categories?.some((c) =>
            c.title?.toLowerCase().includes(searchFilter),
          ),
      )
    : allPosts;

  const heroPosts =
    featuredList.length > 0 ? featuredList : allPosts.slice(0, 3);

  const categoryList = rawCategories.map((cat) => {
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

  return (
    <div className="w-full">
      {!searchFilter && heroPosts.length > 0 && (
        <HeroCarousel posts={heroPosts} />
      )}

      <div className="w-full">
        {searchFilter && (
          <div className="m-5 p-6 border border-zinc-200 dark:border-zinc-800 bg-card flex items-center justify-between gap-4 font-mono text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <Icon
                icon="ph:magnifying-glass-bold"
                className="size-4 text-primary"
              />
              <span>
                Resultados da busca por:{" "}
                <strong>&ldquo;{searchFilter}&rdquo;</strong> ({postList.length}{" "}
                artigos encontrados)
              </span>
            </div>
            <Link href="/" className="text-primary font-bold hover:underline">
              Limpar busca
            </Link>
          </div>
        )}

        {categoryList.length > 0 && !searchFilter && (
          <div className="py-5 pl-5">
            <CategoryShowcase categories={categoryList} />
          </div>
        )}

        <PostsList posts={postList} />

        <ContactSection />
      </div>
    </div>
  );
}
