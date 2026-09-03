import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/src/components/Header";
import type { CategoryRef } from "@/src/types/sanity";

const mockCategories: CategoryRef[] = [
  { _id: "cat-1", title: "Mercado Imobiliário", slug: { current: "mercado-imobiliario" }, postCount: 5 },
  { _id: "cat-2", title: "Lançamentos", slug: { current: "lancamentos" }, postCount: 3 },
  { _id: "cat-3", title: "Arquitetura", slug: { current: "arquitetura" }, postCount: 2 },
  { _id: "cat-4", title: "Financiamento", slug: { current: "financiamento" }, postCount: 4 },
];

describe("Header", () => {
  it("should render logos and main navigation links", () => {
    render(<Header categories={mockCategories} />);

    expect(screen.getAllByAltText(/pirâmide imóveis/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: /^início$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^sobre nós$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^artigos$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^vídeos$/i })).toBeInTheDocument();
  });

  it("should submit search form when input is filled", () => {
    render(<Header categories={mockCategories} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar artigos/i);
    fireEvent.change(searchInput, { target: { value: "Urbanova" } });
    expect(searchInput).toHaveValue("Urbanova");

    const form = searchInput.closest("form");
    if (form) {
      fireEvent.submit(form);
    }
  });

  it("should toggle categories dropdown on button click", () => {
    render(<Header categories={mockCategories} />);

    const categoriesButton = screen.getByRole("button", { name: /categorias/i });
    expect(categoriesButton).toBeInTheDocument();

    fireEvent.click(categoriesButton);
    expect(screen.getByText("Explorar por Temas")).toBeInTheDocument();
  });

  it("should display top 4 categories sorted by postCount descending in dropdown", () => {
    const extendedCategories: CategoryRef[] = [
      { _id: "c1", title: "Baixo Post", slug: { current: "baixo-post" }, postCount: 1 },
      { _id: "c2", title: "Mais Alto Post", slug: { current: "mais-alto-post" }, postCount: 50 },
      { _id: "c3", title: "Segundo Mais Alto", slug: { current: "segundo-mais-alto" }, postCount: 30 },
      { _id: "c4", title: "Terceiro Mais Alto", slug: { current: "terceiro-mais-alto" }, postCount: 20 },
      { _id: "c5", title: "Quarto Mais Alto", slug: { current: "quarto-mais-alto" }, postCount: 10 },
      { _id: "c6", title: "Quase Zero Post", slug: { current: "quase-zero" }, postCount: 2 },
    ];

    render(<Header categories={extendedCategories} />);
    const categoriesButton = screen.getByRole("button", { name: /categorias/i });
    fireEvent.click(categoriesButton);

    expect(screen.getByText("Mais Alto Post")).toBeInTheDocument();
    expect(screen.getByText("Segundo Mais Alto")).toBeInTheDocument();
    expect(screen.getByText("Terceiro Mais Alto")).toBeInTheDocument();
    expect(screen.getByText("Quarto Mais Alto")).toBeInTheDocument();
    expect(screen.queryByText("Baixo Post")).not.toBeInTheDocument();
  });
});
