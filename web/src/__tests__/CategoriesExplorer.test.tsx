import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoriesExplorer } from "@/src/components/blog/CategoriesExplorer";
import type { CategoryRef } from "@/src/types/sanity";

const mockCategories: CategoryRef[] = [
  {
    _id: "cat-1",
    title: "Mercado Imobiliário",
    slug: { current: "mercado-imobiliario" },
    description: "Análises econômicas e valorização.",
    postCount: 10,
  },
  {
    _id: "cat-2",
    title: "Arquitetura & Design",
    slug: { current: "arquitetura-design" },
    description: "Tendências de decoração e projetos.",
    postCount: 6,
  },
  {
    _id: "cat-3",
    title: "Financiamento",
    slug: { current: "financiamento" },
    description: "Dicas de crédito e juros.",
    postCount: 3,
  },
];

describe("CategoriesExplorer", () => {
  it("should render search input and all category cards", () => {
    render(<CategoriesExplorer categories={mockCategories} />);

    expect(
      screen.getByPlaceholderText(/pesquisar por nome da categoria/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Mercado Imobiliário")).toBeInTheDocument();
    expect(screen.getByText("Arquitetura & Design")).toBeInTheDocument();
    expect(screen.getByText("Financiamento")).toBeInTheDocument();
  });

  it("should filter categories live when typing in search input", () => {
    render(<CategoriesExplorer categories={mockCategories} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por nome da categoria/i);
    fireEvent.change(searchInput, { target: { value: "crédito" } });

    expect(screen.getByText("Financiamento")).toBeInTheDocument();
    expect(screen.queryByText("Arquitetura & Design")).not.toBeInTheDocument();
  });

  it("should display empty state with reset button when no categories match", () => {
    render(<CategoriesExplorer categories={mockCategories} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por nome da categoria/i);
    fireEvent.change(searchInput, { target: { value: "categoria-fantasma" } });

    expect(screen.getByText("Nenhuma categoria encontrada")).toBeInTheDocument();
    const resetButton = screen.getByRole("button", { name: /resetar filtros/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.getByText("Mercado Imobiliário")).toBeInTheDocument();
  });
});
