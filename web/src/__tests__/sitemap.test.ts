import { describe, it, expect, vi } from "vitest";
import sitemap from "@/src/app/sitemap";

vi.mock("@/sanity/lib/live", () => ({
  sanityFetch: vi.fn().mockResolvedValue({
    data: {
      posts: [
        {
          slug: "post-1",
          publishedAt: "2026-08-01T00:00:00Z",
          updatedAt: "2026-08-02T00:00:00Z",
        },
      ],
      categories: [{ slug: "mercado-imobiliario" }],
      cities: [{ slug: "sao-jose-dos-campos" }],
      authors: [{ slug: "carlos-eduardo" }],
      tags: ["urbanova", "alto-padrao"],
    },
  }),
}));

describe("sitemap", () => {
  it("should generate proper sitemap entries including hub pages, categories, cities, authors, tags, and posts", async () => {
    const urls = await sitemap();

    expect(urls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: "https://example.com", priority: 1.0 }),
        expect.objectContaining({ url: "https://example.com/categorias", priority: 0.8 }),
        expect.objectContaining({ url: "https://example.com/cidades", priority: 0.8 }),
        expect.objectContaining({ url: "https://example.com/autores", priority: 0.7 }),
        expect.objectContaining({ url: "https://example.com/tags", priority: 0.7 }),
        expect.objectContaining({ url: "https://example.com/categoria/mercado-imobiliario" }),
        expect.objectContaining({ url: "https://example.com/cidade/sao-jose-dos-campos" }),
        expect.objectContaining({ url: "https://example.com/autor/carlos-eduardo" }),
        expect.objectContaining({ url: "https://example.com/tag/urbanova" }),
        expect.objectContaining({ url: "https://example.com/tag/alto-padrao" }),
        expect.objectContaining({ url: "https://example.com/artigos/post-1" }),
      ]),
    );
  });
});
