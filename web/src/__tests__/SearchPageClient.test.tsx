import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPageClient } from "@/src/components/blog/SearchPageClient";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

const mockPosts: PostItem[] = [
  {
    _id: "post-1",
    title: "Apartamentos de Alto Padrão no Aquarius",
    slug: { current: "apartamentos-alto-padrao-aquarius" },
    excerpt: "Guia completo de investimento no Jardim Aquarius.",
    tags: ["alto-padrao", "aquarius"],
    city: { _id: "city-1", name: "São José dos Campos", slug: { current: "sao-jose-dos-campos" } },
    author: { _id: "author-1", name: "Guilherme Bustamante", slug: { current: "guilherme-bustamante" } },
  },
  {
    _id: "post-2",
    title: "Casas em Condomínio Fechado no Urbanova",
    slug: { current: "casas-condominio-urbanova" },
    excerpt: "Conheça os melhores condomínios do Urbanova.",
    tags: ["urbanova", "casas"],
    city: { _id: "city-1", name: "São José dos Campos", slug: { current: "sao-jose-dos-campos" } },
    author: { _id: "author-2", name: "John Doe", slug: { current: "john-doe" } },
  },
];

const mockCategories: CategoryRef[] = [
  { _id: "cat-1", title: "Mercado Imobiliário", slug: { current: "mercado-imobiliario" } },
];

describe("SearchPageClient", () => {
  it("should show empty query state when query is empty", () => {
    render(
      <SearchPageClient
        initialQuery=""
        allPosts={mockPosts}
        categoryList={mockCategories}
      />,
    );

    expect(screen.getByText("Pronto para pesquisar?")).toBeInTheDocument();
  });

  it("should filter posts live when typing in the search input", () => {
    render(
      <SearchPageClient
        initialQuery=""
        allPosts={mockPosts}
        categoryList={mockCategories}
      />,
    );

    const input = screen.getByPlaceholderText(/buscar por temas/i);
    fireEvent.change(input, { target: { value: "Aquarius" } });

    expect(
      screen.getByRole("heading", { name: /Apartamentos de Alto Padrão no Aquarius/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Casas em Condomínio Fechado no Urbanova/i),
    ).not.toBeInTheDocument();
  });

  it("should show zero results message when no posts match query", () => {
    render(
      <SearchPageClient
        initialQuery="termoinexistente123"
        allPosts={mockPosts}
        categoryList={mockCategories}
      />,
    );

    expect(
      screen.getByText(/nenhum artigo encontrado para/i),
    ).toBeInTheDocument();
  });
});
