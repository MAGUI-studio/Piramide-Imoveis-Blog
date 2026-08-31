import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ArticlesExplorer } from "@/src/components/blog/ArticlesExplorer";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

const mockPosts: PostItem[] = [
  {
    _id: "post-1",
    title: "Casas em Condomínio no Urbanova",
    slug: { current: "casas-em-condominio-no-urbanova" },
    excerpt: "Guia completo de casas e sobrados no Urbanova.",
    publishedAt: "2026-08-10T10:00:00.000Z",
    categories: [
      { _id: "cat-1", title: "Mercado Imobiliário", slug: { current: "mercado-imobiliario" } },
    ],
    city: { _id: "city-1", name: "São José dos Campos", slug: { current: "sao-jose-dos-campos" } },
  },
  {
    _id: "post-2",
    title: "Apartamentos na Planta no Aquarius",
    slug: { current: "apartamentos-na-planta-no-aquarius" },
    excerpt: "Lançamentos e studios com alta rentabilidade.",
    publishedAt: "2026-08-12T10:00:00.000Z",
    categories: [
      { _id: "cat-2", title: "Lançamentos", slug: { current: "lancamentos" } },
    ],
    city: { _id: "city-1", name: "São José dos Campos", slug: { current: "sao-jose-dos-campos" } },
  },
  {
    _id: "post-3",
    title: "Investimento em Lotes em Jacareí",
    slug: { current: "investimento-em-lotes-em-jacarei" },
    excerpt: "Por que investir em terrenos e loteamentos.",
    publishedAt: "2026-08-15T10:00:00.000Z",
    categories: [
      { _id: "cat-1", title: "Mercado Imobiliário", slug: { current: "mercado-imobiliario" } },
    ],
    city: { _id: "city-2", name: "Jacareí", slug: { current: "jacarei" } },
  },
];

const mockCategories: CategoryRef[] = [
  { _id: "cat-1", title: "Mercado Imobiliário", slug: { current: "mercado-imobiliario" } },
  { _id: "cat-2", title: "Lançamentos", slug: { current: "lancamentos" } },
];

describe("ArticlesExplorer", () => {
  it("should render search input, category select, city select, and post cards", () => {
    render(<ArticlesExplorer allPosts={mockPosts} categories={mockCategories} />);

    expect(screen.getByPlaceholderText(/pesquisar por título/i)).toBeInTheDocument();
    expect(screen.getByText("Casas em Condomínio no Urbanova")).toBeInTheDocument();
    expect(screen.getByText("Apartamentos na Planta no Aquarius")).toBeInTheDocument();
    expect(screen.getByText("Investimento em Lotes em Jacareí")).toBeInTheDocument();
  });

  it("should filter articles live when typing in search input", () => {
    render(<ArticlesExplorer allPosts={mockPosts} categories={mockCategories} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por título/i);
    fireEvent.change(searchInput, { target: { value: "Aquarius" } });

    expect(screen.getByText(/Apartamentos na Planta/i)).toBeInTheDocument();
    expect(screen.queryByText(/Casas em Condomínio/i)).not.toBeInTheDocument();
  });

  it("should display empty state with reset button when no articles match filter", () => {
    render(<ArticlesExplorer allPosts={mockPosts} categories={mockCategories} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por título/i);
    fireEvent.change(searchInput, { target: { value: "termo-inexistente" } });

    expect(screen.getByText("Nenhum artigo encontrado")).toBeInTheDocument();
    const resetButton = screen.getByRole("button", { name: /resetar filtros/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.getByText("Casas em Condomínio no Urbanova")).toBeInTheDocument();
  });
});
