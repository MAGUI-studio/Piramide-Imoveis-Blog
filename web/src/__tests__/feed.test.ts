import { describe, it, expect, vi } from "vitest";
import { GET } from "@/src/app/feed.xml/route";

vi.mock("@/sanity/lib/live", () => ({
  sanityFetch: vi.fn().mockResolvedValue({
    data: [
      {
        _id: "post-1",
        title: "Tendências do Mercado Imobiliário & Inovações <2026>",
        slug: { current: "tendencias-do-mercado" },
        excerpt: "Análise 'exclusiva' com projeções de valorização & alta rentabilidade.",
        publishedAt: "2026-08-01T00:00:00Z",
        author: { name: "Guilherme Bustamante" },
        categories: [{ title: "Mercado Imobiliário" }],
      },
    ],
  }),
}));

describe("feed.xml route", () => {
  it("should generate RSS 2.0 XML with correct headers and status 200", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/xml; charset=utf-8");
  });

  it("should escape special XML characters and format article URL with /artigos/", async () => {
    const response = await GET();
    const xmlText = await response.text();

    expect(xmlText).toContain("<rss version=\"2.0\"");
    expect(xmlText).toContain("<title>Blog Pirâmide Imóveis</title>");
    expect(xmlText).toContain("Tendências do Mercado Imobiliário &amp; Inovações &lt;2026&gt;");
    expect(xmlText).toContain("https://example.com/artigos/tendencias-do-mercado");
    expect(xmlText).toContain("<author>Guilherme Bustamante</author>");
    expect(xmlText).toContain("<category>Mercado Imobiliário</category>");
  });
});
