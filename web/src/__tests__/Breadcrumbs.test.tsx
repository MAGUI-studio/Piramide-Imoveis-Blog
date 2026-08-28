import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";

describe("Breadcrumbs", () => {
  it("should render Home link and sequence of navigation breadcrumbs", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Categorias", href: "/categorias" },
          { label: "Mercado Imobiliário" },
        ]}
      />,
    );

    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Categorias")).toBeInTheDocument();
    expect(screen.getByText("Mercado Imobiliário")).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /início/i });
    expect(homeLink).toHaveAttribute("href", "/");

    const categoriesLink = screen.getByRole("link", { name: /categorias/i });
    expect(categoriesLink).toHaveAttribute("href", "/categorias");
  });

  it("should render current page label without a link when href is omitted", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Busca", href: "/busca" },
          { label: '"Apartamento"' },
        ]}
      />,
    );

    expect(screen.getByText('"Apartamento"')).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /"apartamento"/i })).not.toBeInTheDocument();
  });
});
