import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleCtaButton } from "@/src/components/blog/ArticleCtaButton";

describe("ArticleCtaButton", () => {
  it("should render default label 'Ler Artigo Completo' with link", () => {
    render(<ArticleCtaButton href="/artigos/meu-post" />);

    const button = screen.getByRole("link", { name: /ler artigo completo/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/artigos/meu-post");
  });

  it("should render custom label when provided", () => {
    render(<ArticleCtaButton href="/artigos/post-2" label="Acessar Conteúdo" />);

    expect(screen.getByText("Acessar Conteúdo")).toBeInTheDocument();
  });

  it("should render size variants correctly", () => {
    const { rerender } = render(
      <ArticleCtaButton href="/test" size="sm" />,
    );
    expect(screen.getByRole("link")).toHaveClass("text-[11px]");

    rerender(<ArticleCtaButton href="/test" size="lg" />);
    expect(screen.getByRole("link")).toHaveClass("px-7");
  });
});
