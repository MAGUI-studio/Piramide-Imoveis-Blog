import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/src/components/Footer";

describe("Footer", () => {
  it("should render both navigation columns (Navegação and Pirâmide Imóveis) and social links", () => {
    render(<Footer />);

    expect(screen.getByText("Navegação")).toBeInTheDocument();
    expect(screen.getByText("Pirâmide Imóveis")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /todos os artigos/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /categorias/i })).toHaveAttribute("href", "/categorias");
    expect(screen.getByRole("link", { name: /cidades/i })).toHaveAttribute("href", "/cidades");
    expect(screen.getByRole("link", { name: /autores/i })).toHaveAttribute("href", "/autores");

    expect(screen.getByRole("link", { name: /buscar imóveis/i })).toHaveAttribute(
      "href",
      "https://www.piramideimoveissjc.com.br/",
    );
    expect(screen.getByRole("link", { name: /fale conosco/i })).toHaveAttribute(
      "href",
      "https://wa.me/5512991599801",
    );
  });
});
