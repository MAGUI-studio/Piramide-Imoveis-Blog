import type { Metadata } from "next";
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
  ] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY }),
    sanityFetch({ query: FEATURED_POSTS_QUERY }),
  ]);

  const allPosts = (posts as PostItem[]) || [];
  const rawCategories = (categories as CategoryRef[]) || [];
  const featuredList = (featured as PostItem[]) || [];

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

        <PostsList posts={allPosts} />

        <ContactSection />
      </div>
    </div>
  );
}
