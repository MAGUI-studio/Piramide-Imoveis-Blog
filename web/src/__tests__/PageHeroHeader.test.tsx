import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";

describe("PageHeroHeader", () => {
  it("should render badge, title, description and meta count", () => {
    render(
      <PageHeroHeader
        badge="Acervo Editorial"
        title="Todas as Categorias"
        description="Navegue pelos principais temas do mercado imobiliário."
        meta="8 categorias disponíveis"
      />,
    );

    expect(screen.getByText("Acervo Editorial")).toBeInTheDocument();
    expect(screen.getByText("Todas as Categorias")).toBeInTheDocument();
    expect(
      screen.getByText("Navegue pelos principais temas do mercado imobiliário."),
    ).toBeInTheDocument();
    expect(screen.getByText("8 categorias disponíveis")).toBeInTheDocument();
  });

  it("should render with ReactNode meta elements", () => {
    render(
      <PageHeroHeader
        badge="Busca"
        title="Resultados da Busca"
        meta={<span data-testid="custom-meta">4 itens encontrados</span>}
      />,
    );

    expect(screen.getByTestId("custom-meta")).toBeInTheDocument();
  });
});
