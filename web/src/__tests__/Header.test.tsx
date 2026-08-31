import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
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

  it("should handle scroll event gracefully", () => {
    render(<Header categories={mockCategories} />);

    act(() => {
      window.scrollY = 150;
      window.dispatchEvent(new Event("scroll"));
    });

    act(() => {
      window.scrollY = 20;
      window.dispatchEvent(new Event("scroll"));
    });
  });
});
