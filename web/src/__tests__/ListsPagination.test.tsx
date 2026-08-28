import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoriesList } from "@/src/components/blog/CategoriesList";
import { CitiesList } from "@/src/components/blog/CitiesList";
import { AuthorsList } from "@/src/components/blog/AuthorsList";
import type { CategoryRef, CityRef, AuthorRef } from "@/src/types/sanity";

const mockCategories: CategoryRef[] = Array.from({ length: 14 }, (_, i) => ({
  _id: `cat-${i + 1}`,
  title: `Categoria ${i + 1}`,
  slug: { current: `categoria-${i + 1}` },
  postCount: i + 1,
}));

const mockCities: CityRef[] = Array.from({ length: 14 }, (_, i) => ({
  _id: `city-${i + 1}`,
  name: `Cidade ${i + 1}`,
  slug: { current: `cidade-${i + 1}` },
  state: "SP",
  postCount: i + 1,
}));

const mockAuthors: AuthorRef[] = Array.from({ length: 14 }, (_, i) => ({
  _id: `author-${i + 1}`,
  name: `Autor ${i + 1}`,
  slug: { current: `autor-${i + 1}` },
  role: "Consultor",
  postCount: i + 1,
}));

describe("ListsPagination", () => {
  it("CategoriesList should initially show 6 items and load 6 more upon clicking 'Carregar Mais'", () => {
    render(<CategoriesList categories={mockCategories} />);

    expect(screen.getByText("Categoria 1")).toBeInTheDocument();
    expect(screen.getByText("Categoria 6")).toBeInTheDocument();
    expect(screen.queryByText("Categoria 7")).not.toBeInTheDocument();

    const loadMoreBtn = screen.getByRole("button", { name: /carregar mais categorias/i });
    fireEvent.click(loadMoreBtn);

    expect(screen.getByText("Categoria 7")).toBeInTheDocument();
    expect(screen.getByText("Categoria 12")).toBeInTheDocument();
  });

  it("CitiesList should load more cities and show 'Mostrar Menos' when all loaded", () => {
    render(<CitiesList cities={mockCities} />);

    expect(screen.getByText(/Cidade 1 - SP/i)).toBeInTheDocument();
    expect(screen.queryByText(/Cidade 7 - SP/i)).not.toBeInTheDocument();

    const loadMoreBtn = screen.getByRole("button", { name: /carregar mais cidades/i });
    fireEvent.click(loadMoreBtn);
    fireEvent.click(loadMoreBtn);

    const showLessBtn = screen.getByRole("button", { name: /mostrar menos/i });
    expect(showLessBtn).toBeInTheDocument();
  });

  it("AuthorsList should paginate authors correctly", () => {
    render(<AuthorsList authors={mockAuthors} />);

    expect(screen.getByText("Autor 1")).toBeInTheDocument();
    expect(screen.queryByText("Autor 7")).not.toBeInTheDocument();

    const loadMoreBtn = screen.getByRole("button", { name: /carregar mais autores/i });
    fireEvent.click(loadMoreBtn);

    expect(screen.getByText("Autor 7")).toBeInTheDocument();
  });
});
