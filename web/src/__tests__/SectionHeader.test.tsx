import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "@/src/components/blog/SectionHeader";

describe("SectionHeader", () => {
  it("should render eyebrow, icon, and main title", () => {
    render(
      <SectionHeader
        eyebrow="Destaques Exclusivos"
        eyebrowIcon="ph:star-fill"
        title="Últimos Lançamentos"
      />,
    );

    expect(screen.getByText("Destaques Exclusivos")).toBeInTheDocument();
    expect(screen.getByText("Últimos Lançamentos")).toBeInTheDocument();
  });

  it("should render action link when provided", () => {
    render(
      <SectionHeader
        eyebrow="Categorias"
        eyebrowIcon="ph:tag-fill"
        title="Explorar Temas"
        action={{
          label: "Ver Todas",
          href: "/categorias",
        }}
      />,
    );

    const actionLink = screen.getByRole("link", { name: /ver todas/i });
    expect(actionLink).toBeInTheDocument();
    expect(actionLink).toHaveAttribute("href", "/categorias");
  });

  it("should render meta text when no action or children is provided", () => {
    render(
      <SectionHeader
        eyebrow="Tópicos"
        eyebrowIcon="ph:hash-bold"
        title="Todos os Tópicos"
        meta="15 tópicos encontrados"
      />,
    );

    expect(screen.getByText("15 tópicos encontrados")).toBeInTheDocument();
  });

  it("should render custom children when provided", () => {
    render(
      <SectionHeader
        eyebrow="Custom Header"
        eyebrowIcon="ph:gear-fill"
        title="Configurações"
      >
        <button type="button">Botão Customizado</button>
      </SectionHeader>,
    );

    expect(screen.getByText("Botão Customizado")).toBeInTheDocument();
  });
});
