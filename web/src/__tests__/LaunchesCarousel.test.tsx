import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LaunchesCarousel } from "@/src/components/blog/LaunchesCarousel";

describe("LaunchesCarousel", () => {
  it("should render launches section header and launch banners", () => {
    render(<LaunchesCarousel />);

    expect(screen.getByText("Lançamentos Exclusivos")).toBeInTheDocument();
    expect(screen.getByText("Conheça Nossos Empreendimentos")).toBeInTheDocument();

    const banners = screen.getAllByAltText("Parque Una São José dos Campos");
    expect(banners.length).toBeGreaterThanOrEqual(1);
  });
});
