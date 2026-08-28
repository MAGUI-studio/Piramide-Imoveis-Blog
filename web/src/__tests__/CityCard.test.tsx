import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CityCard } from "@/src/components/blog/CityCard";
import type { CityRef } from "@/src/types/sanity";

const mockCity: CityRef = {
  _id: "city-1",
  name: "São José dos Campos",
  slug: { current: "sao-jose-dos-campos" },
  state: "SP",
  postCount: 12,
};

describe("CityCard", () => {
  it("should render city name, state, post count badge, and correct link", () => {
    render(<CityCard city={mockCity} />);

    expect(screen.getByText(/São José dos Campos - SP/i)).toBeInTheDocument();
    expect(screen.getByText("12 Artigos")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /são josé dos campos/i });
    expect(link).toHaveAttribute("href", "/cidade/sao-jose-dos-campos");
  });

  it("should render singular '1 Artigo' when postCount is 1", () => {
    render(<CityCard city={{ ...mockCity, postCount: 1 }} />);
    expect(screen.getByText("1 Artigo")).toBeInTheDocument();
  });

  it("should return null if city has no slug", () => {
    const { container } = render(
      <CityCard city={{ ...mockCity, slug: undefined }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
