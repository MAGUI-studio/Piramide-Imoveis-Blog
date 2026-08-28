import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryCard } from "@/src/components/blog/CategoryCard";
import type { CategoryRef } from "@/src/types/sanity";

const mockCategory: CategoryRef = {
  _id: "cat-1",
  title: "Tendências & Arquitetura",
  slug: { current: "tendencias-arquitetura" },
  description: "Inspirações, projetos e tendências arquitetônicas.",
  postCount: 5,
};

describe("CategoryCard", () => {
  it("should render category title, description, article count badge, and correct link", () => {
    render(<CategoryCard category={mockCategory} />);

    expect(screen.getByText("Tendências & Arquitetura")).toBeInTheDocument();
    expect(
      screen.getByText("Inspirações, projetos e tendências arquitetônicas."),
    ).toBeInTheDocument();
    expect(screen.getByText("5 Artigos")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /tendências & arquitetura/i });
    expect(link).toHaveAttribute("href", "/categoria/tendencias-arquitetura");
  });

  it("should render singular '1 Artigo' when postCount is 1", () => {
    render(<CategoryCard category={{ ...mockCategory, postCount: 1 }} />);
    expect(screen.getByText("1 Artigo")).toBeInTheDocument();
  });

  it("should return null if category has no slug", () => {
    const { container } = render(
      <CategoryCard category={{ ...mockCategory, slug: undefined }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
