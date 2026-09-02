import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthorsExplorer } from "@/src/components/blog/AuthorsExplorer";
import type { AuthorRef } from "@/src/types/sanity";

const mockAuthors: AuthorRef[] = [
  {
    _id: "author-1",
    name: "Ana Silva",
    slug: { current: "ana-silva" },
    role: "Especialista em Urbanova e Alto Padrão",
    creci: "CRECI 12345-F",
    postCount: 15,
  },
  {
    _id: "author-2",
    name: "Carlos Ferreira",
    slug: { current: "carlos-ferreira" },
    role: "Consultor de Investimentos",
    creci: "CRECI 54321-F",
    postCount: 7,
  },
];

describe("AuthorsExplorer", () => {
  it("should render search input and author cards", () => {
    render(<AuthorsExplorer authors={mockAuthors} />);

    expect(
      screen.getByPlaceholderText(/pesquisar por nome do autor/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Ana Silva")).toBeInTheDocument();
    expect(screen.getByText("Carlos Ferreira")).toBeInTheDocument();
  });

  it("should filter authors by name or role", () => {
    render(<AuthorsExplorer authors={mockAuthors} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por nome do autor/i);
    fireEvent.change(searchInput, { target: { value: "investimentos" } });

    expect(screen.getByText("Carlos Ferreira")).toBeInTheDocument();
    expect(screen.queryByText("Ana Silva")).not.toBeInTheDocument();
  });

  it("should display empty state with reset button when no authors match", () => {
    render(<AuthorsExplorer authors={mockAuthors} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por nome do autor/i);
    fireEvent.change(searchInput, { target: { value: "autor-desconhecido" } });

    expect(screen.getByText("Nenhum autor encontrado")).toBeInTheDocument();
    const resetButton = screen.getByRole("button", { name: /resetar filtros/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.getByText("Ana Silva")).toBeInTheDocument();
  });
});
