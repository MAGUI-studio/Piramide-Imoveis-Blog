import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { getBaseUrl } from "@/src/config/site";
import type { PostItem } from "@/src/types/sanity";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const baseUrl = getBaseUrl();

  const { data: posts = [] } = await sanityFetch({
    query: POSTS_QUERY,
    perspective: "published",
    stega: false,
  });

  const postList = (posts as PostItem[]) || [];

  const rssItemsXml = postList
    .filter((post) => post.slug?.current)
    .map((post) => {
      const postUrl = `${baseUrl}/posts/${post.slug?.current}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date().toUTCString();
      const imageUrl = post.mainImage
        ? urlForImage(post.mainImage)?.width(1200).height(630).url()
        : null;

      return `
    <item>
      <title>${escapeXml(post.title || "Artigo")}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt || post.title || "")}</description>
      ${post.author?.name ? `<author>${escapeXml(post.author.name)}</author>` : ""}
      ${post.categories?.[0]?.title ? `<category>${escapeXml(post.categories[0].title)}</category>` : ""}
      ${
        imageUrl
          ? `<enclosure url="${escapeXml(imageUrl)}" length="0" type="image/jpeg" />`
          : ""
      }
    </item>`;
    })
    .join("");

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Pirâmide Imóveis</title>
    <link>${baseUrl}</link>
    <description>Notícias, análises e tendências do mercado imobiliário em São José dos Campos e Vale do Paraíba.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(rssFeedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
