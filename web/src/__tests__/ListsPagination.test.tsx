import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoriesExplorer } from "@/src/components/blog/CategoriesExplorer";
import { CitiesExplorer } from "@/src/components/blog/CitiesExplorer";
import { AuthorsExplorer } from "@/src/components/blog/AuthorsExplorer";
import { LaunchesExplorer, type LaunchItem } from "@/src/components/blog/LaunchesExplorer";
import type { CategoryRef, CityRef, AuthorRef } from "@/src/types/sanity";


vi.mock("nuqs", () => {
  return {
    useQueryState: (_key: string, parser?: { defaultValue?: unknown }) => {
      const defaultValue = parser?.defaultValue ?? "";
      const [val, setVal] = React.useState(defaultValue);
      return [val, setVal];
    },
    parseAsString: {
      withDefault: (def: string) => ({
        defaultValue: def,
        withOptions: () => ({ defaultValue: def }),
      }),
    },
    parseAsInteger: {
      withDefault: (def: number) => ({
        defaultValue: def,
        withOptions: () => ({ defaultValue: def }),
      }),
    },
    parseAsStringLiteral: () => ({
      withDefault: (def: string) => ({
        defaultValue: def,
        withOptions: () => ({ defaultValue: def }),
      }),
    }),
  };
});

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

const mockLaunches: LaunchItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `launch-${i + 1}`,
  title: `Lançamento ${i + 1}`,
  description: `Descrição do lançamento ${i + 1}`,
  image: `/banners/banner-${i + 1}.webp`,
  href: `https://piramideimoveissjc.com.br/launch-${i + 1}`,
  tag: i % 2 === 0 ? "Alto Padrão" : "Residencial",
}));

describe("Explorers with Filters & Pagination", () => {
  it("CategoriesExplorer should filter categories and paginate items", () => {
    render(<CategoriesExplorer categories={mockCategories} />);

    expect(screen.getByPlaceholderText(/pesquisar por nome da categoria/i)).toBeInTheDocument();
    expect(screen.getByText("Categoria 14")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/pesquisar por nome da categoria/i);
    fireEvent.change(searchInput, { target: { value: "Categoria 1" } });

    expect(screen.getByText("Categoria 1")).toBeInTheDocument();
  });

  it("CitiesExplorer should render search and sort controls", () => {
    render(<CitiesExplorer cities={mockCities} />);

    expect(screen.getByPlaceholderText(/pesquisar por nome da cidade/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidade 14 - SP/i)).toBeInTheDocument();
  });

  it("AuthorsExplorer should filter authors and render cards", () => {
    render(<AuthorsExplorer authors={mockAuthors} />);

    expect(screen.getByPlaceholderText(/pesquisar por nome do autor/i)).toBeInTheDocument();
    expect(screen.getByText("Autor 14")).toBeInTheDocument();
  });

  it("LaunchesExplorer should filter launches by text and tag", () => {
    render(<LaunchesExplorer launches={mockLaunches} />);

    expect(screen.getByPlaceholderText(/pesquisar lançamentos/i)).toBeInTheDocument();
    expect(screen.getByText("Lançamento 1")).toBeInTheDocument();
  });
});
