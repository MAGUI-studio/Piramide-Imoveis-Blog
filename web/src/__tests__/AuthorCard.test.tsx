import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthorCard } from "@/src/components/blog/AuthorCard";
import type { AuthorRef } from "@/src/types/sanity";

const mockAuthor: AuthorRef = {
  _id: "author-1",
  name: "Carlos Eduardo",
  slug: { current: "carlos-eduardo" },
  role: "Consultor de Investimentos",
  creci: "12345-F",
  postCount: 4,
};

describe("AuthorCard", () => {
  it("should render author name, role, CRECI, post count badge, and correct link", () => {
    render(<AuthorCard author={mockAuthor} />);

    expect(screen.getByText("Carlos Eduardo")).toBeInTheDocument();
    expect(screen.getByText(/consultor de investimentos/i)).toBeInTheDocument();
    expect(screen.getByText(/12345-F/i)).toBeInTheDocument();
    expect(screen.getByText("4 Artigos")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /carlos eduardo/i });
    expect(link).toHaveAttribute("href", "/autor/carlos-eduardo");
  });

  it("should render singular '1 Artigo' when postCount is 1", () => {
    render(<AuthorCard author={{ ...mockAuthor, postCount: 1 }} />);
    expect(screen.getByText("1 Artigo")).toBeInTheDocument();
  });

  it("should return null if author has no slug", () => {
    const { container } = render(
      <AuthorCard author={{ ...mockAuthor, slug: undefined }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
