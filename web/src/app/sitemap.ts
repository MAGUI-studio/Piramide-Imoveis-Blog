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
    cities?: Array<{ slug: string }>;
    authors?: Array<{ slug: string }>;
  } | null;

  const posts = sitemapData?.posts || [];
  const categories = sitemapData?.categories || [];
  const cities = sitemapData?.cities || [];
  const authors = sitemapData?.authors || [];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categoria/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const cityUrls: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/cidade/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const authorUrls: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}/autor/${author.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cidades`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/autores`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...categoryUrls,
    ...cityUrls,
    ...authorUrls,
    ...postUrls,
  ];
}
