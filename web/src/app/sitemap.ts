import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { SITEMAP_DATA_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";

  const { data } = await sanityFetch({
    query: SITEMAP_DATA_QUERY,
    perspective: "published",
    stega: false,
  });

  const sitemapData = data as {
    posts?: Array<{ slug: string; publishedAt?: string; updatedAt?: string }>;
    categories?: Array<{ slug: string }>;
  } | null;

  const posts = sitemapData?.posts || [];
  const categories = sitemapData?.categories || [];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categoria/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...categoryUrls,
    ...postUrls,
  ];
}
