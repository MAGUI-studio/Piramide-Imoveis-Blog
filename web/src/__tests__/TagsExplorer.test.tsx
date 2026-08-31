import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TagsExplorer } from "@/src/components/blog/TagsExplorer";
import type { TagItemRef } from "@/src/components/blog/TagCard";

const mockTags: TagItemRef[] = [
  { name: "Urbanova", slug: "urbanova", postCount: 12 },
  { name: "Aquarius", slug: "aquarius", postCount: 8 },
  { name: "Alto Padrão", slug: "alto-padrao", postCount: 15 },
  { name: "Studios", slug: "studios", postCount: 5 },
];

describe("TagsExplorer", () => {
  it("should render search input and all tag cards", () => {
    render(<TagsExplorer tags={mockTags} />);

    expect(
      screen.getByPlaceholderText(/pesquisar por tópicos/i),
    ).toBeInTheDocument();
    expect(screen.getByText("#Urbanova")).toBeInTheDocument();
    expect(screen.getByText("#Aquarius")).toBeInTheDocument();
    expect(screen.getByText("#Alto Padrão")).toBeInTheDocument();
    expect(screen.getByText("#Studios")).toBeInTheDocument();
  });

  it("should filter tags live when typing in search input", () => {
    render(<TagsExplorer tags={mockTags} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por tópicos/i);
    fireEvent.change(searchInput, { target: { value: "studios" } });

    expect(screen.getByText("#Studios")).toBeInTheDocument();
    expect(screen.queryByText("#Urbanova")).not.toBeInTheDocument();
  });

  it("should display empty state with reset button when no tags match", () => {
    render(<TagsExplorer tags={mockTags} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por tópicos/i);
    fireEvent.change(searchInput, { target: { value: "tag-inexistente-xyz" } });

    expect(screen.getByText("Nenhum tópico encontrado")).toBeInTheDocument();
    const resetButton = screen.getByRole("button", { name: /resetar filtros/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.getByText("#Urbanova")).toBeInTheDocument();
  });

  it("should allow sorting tags via dropdown", () => {
    render(<TagsExplorer tags={mockTags} />);

    const sortSelect = screen.getByDisplayValue(/mais artigos primeiro/i);
    fireEvent.change(sortSelect, { target: { value: "title-asc" } });

    expect(screen.getByText("#Alto Padrão")).toBeInTheDocument();
  });
});
