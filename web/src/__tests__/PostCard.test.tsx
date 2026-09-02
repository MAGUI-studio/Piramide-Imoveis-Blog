import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostCard } from "@/src/components/blog/PostCard";
import type { PostItem } from "@/src/types/sanity";

const mockPost: PostItem = {
  _id: "post-1",
  title: "Mercado Imobiliário em Alta no Vale do Paraíba",
  slug: { current: "mercado-imobiliario-em-alta-no-vale-do-paraiba" },
  excerpt: "Análise completa sobre valorização de imóveis em São José dos Campos.",
  publishedAt: "2026-08-15T10:00:00.000Z",
  categories: [
    {
      _id: "cat-1",
      title: "Mercado Imobiliário",
      slug: { current: "mercado-imobiliario" },
    },
  ],
  city: {
    _id: "city-1",
    name: "São José dos Campos",
    slug: { current: "sao-jose-dos-campos" },
  },
  author: {
    _id: "author-1",
    name: "Carlos Eduardo",
    slug: { current: "carlos-eduardo" },
  },
};

describe("PostCard", () => {
  it("should render title, excerpt, category badge, city badge, author, and reading time", () => {
    render(<PostCard post={mockPost} />);

    expect(
      screen.getByText("Mercado Imobiliário em Alta no Vale do Paraíba"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Análise completa sobre valorização de imóveis em São José dos Campos."),
    ).toBeInTheDocument();
    expect(screen.getByText("Mercado Imobiliário")).toBeInTheDocument();
    expect(screen.getByText("São José dos Campos")).toBeInTheDocument();
    expect(screen.getByText("Carlos Eduardo")).toBeInTheDocument();
    expect(screen.getByText(/min de leitura/i)).toBeInTheDocument();
    expect(screen.getByText("Ler Artigo")).toBeInTheDocument();
  });

  it("should render fallback author name if author is missing", () => {
    const postWithoutAuthor: PostItem = {
      ...mockPost,
      author: undefined,
    };

    render(<PostCard post={postWithoutAuthor} />);
    expect(screen.getByText("Redação Pirâmide")).toBeInTheDocument();
  });

  it("should return null if slug is not defined", () => {
    const { container } = render(<PostCard post={{ ...mockPost, slug: undefined }} />);
    expect(container).toBeEmptyDOMElement();
  });
});
