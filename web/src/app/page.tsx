import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import {
  POSTS_QUERY,
  CATEGORIES_QUERY,
  FEATURED_POSTS_QUERY,
  REELS_QUERY,
  TOP_TRENDING_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { HeroCarousel } from "@/src/components/blog/HeroCarousel";
import { CategoryShowcase } from "@/src/components/blog/CategoryShowcase";
import { TrendingPosts } from "@/src/components/blog/TrendingPosts";
import { ReelsSection } from "@/src/components/blog/ReelsSection";
import { PostsList } from "@/src/components/blog/PostsList";
import { LaunchesCarousel } from "@/src/components/blog/LaunchesCarousel";
import type { PostItem, CategoryRef, ReelItem } from "@/src/types/sanity";

export const metadata: Metadata = {
  title: "Blog Pirâmide Imóveis | Mercado Imobiliário, Tendências e Dicas",
  description:
    "Explore análises exclusivas do mercado imobiliário, dicas para compra e locação, lançamentos e tendências em São José dos Campos e Vale do Paraíba.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br",
  },
};

export default async function HomePage() {
  const [
    { data: posts = [] },
    { data: categories = [] },
    { data: featured = [] },
    { data: reels = [] },
    { data: trending = [] },
  ] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY }),
    sanityFetch({ query: FEATURED_POSTS_QUERY }),
    sanityFetch({ query: REELS_QUERY }),
    sanityFetch({ query: TOP_TRENDING_POSTS_QUERY }),
  ]);

  const allPosts = (posts as PostItem[]) || [];
  const rawCategories = (categories as CategoryRef[]) || [];
  const featuredList = (featured as PostItem[]) || [];
  const reelsList = (reels as ReelItem[]) || [];
  const trendingList = (trending as PostItem[]) || [];

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
      {heroPosts.length > 0 && <HeroCarousel posts={heroPosts} />}

      <div className="w-full">
        {categoryList.length > 0 && (
          <div className="pt-10 sm:pt-14 pb-4 sm:pb-6 pl-6">
            <CategoryShowcase categories={categoryList} />
          </div>
        )}

        
        {trendingList.length > 0 && (
          <div className="px-6 pt-4 pb-8 sm:pt-6 sm:pb-12">
            <TrendingPosts posts={trendingList} variant="home" />
          </div>
        )}

        
        {reelsList.length > 0 && (
          <div className="w-full overflow-hidden pb-8 sm:pb-12">
            <ReelsSection reels={reelsList} />
          </div>
        )}

        
        <PostsList posts={allPosts} />

        
        <div className="px-6 py-4 sm:py-8">
          <LaunchesCarousel />
        </div>
      </div>
    </div>
  );
}
