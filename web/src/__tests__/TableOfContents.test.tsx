import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TableOfContents } from "@/src/components/blog/TableOfContents";
import type { TocHeading } from "@/src/lib/blog-utils";

const mockHeadings: TocHeading[] = [
  { id: "visao-geral", text: "Visão Geral do Mercado", level: 2 },
  { id: "bairros-valorizados", text: "Bairros Mais Valorizados", level: 2 },
  { id: "urbanova-e-aquarius", text: "Urbanova e Aquarius", level: 3 },
];

describe("TableOfContents", () => {
  it("should render sidebar variant with all section headings", () => {
    render(<TableOfContents headings={mockHeadings} variant="sidebar" />);

    expect(screen.getByText("Neste Artigo")).toBeInTheDocument();
    expect(screen.getByText("3 seções")).toBeInTheDocument();
    expect(screen.getByText("Visão Geral do Mercado")).toBeInTheDocument();
    expect(screen.getByText("Bairros Mais Valorizados")).toBeInTheDocument();
    expect(screen.getByText("Urbanova e Aquarius")).toBeInTheDocument();
  });

  it("should render inline mobile variant with collapsible trigger", () => {
    render(<TableOfContents headings={mockHeadings} variant="inline" />);

    const toggleBtn = screen.getByRole("button", { name: /índice do artigo/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(screen.getByText("Visão Geral do Mercado")).toBeInTheDocument();

    
    fireEvent.click(toggleBtn);
  });

  it("should return null if there are fewer than 2 headings", () => {
    const { container } = render(
      <TableOfContents
        headings={[{ id: "intro", text: "Introdução", level: 2 }]}
        variant="sidebar"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
