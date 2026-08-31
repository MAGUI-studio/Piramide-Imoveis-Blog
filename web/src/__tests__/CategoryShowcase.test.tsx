import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryShowcase } from "@/src/components/blog/CategoryShowcase";
import type { CategoryRef } from "@/src/types/sanity";

const mockCategories: CategoryRef[] = [
  { _id: "cat-1", title: "Mercado Imobiliário", slug: { current: "mercado-imobiliario" }, postCount: 5 },
  { _id: "cat-2", title: "Lançamentos", slug: { current: "lancamentos" }, postCount: 8 },
];

describe("CategoryShowcase", () => {
  it("should render infinite category carousel with category cards", () => {
    render(<CategoryShowcase categories={mockCategories} />);

    const titles = screen.getAllByText("Mercado Imobiliário");
    expect(titles.length).toBeGreaterThanOrEqual(1);
  });

  it("should return null when categories list is empty", () => {
    const { container } = render(<CategoryShowcase categories={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
