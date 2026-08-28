import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ShareButtons } from "@/src/components/blog/ShareButtons";

describe("ShareButtons", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it("should render social share buttons and copy link button", () => {
    render(<ShareButtons title="Título do Artigo" slug="titulo-do-artigo" />);

    expect(screen.getByTitle(/compartilhar no whatsapp/i)).toBeInTheDocument();
    expect(screen.getByTitle(/compartilhar no linkedin/i)).toBeInTheDocument();
    expect(screen.getByTitle(/compartilhar no x/i)).toBeInTheDocument();
    expect(screen.getByTitle(/compartilhar no facebook/i)).toBeInTheDocument();
    expect(screen.getByTitle(/copiar link do artigo/i)).toBeInTheDocument();
  });

  it("should copy link to clipboard and show feedback when clicked", async () => {
    render(<ShareButtons title="Título do Artigo" slug="titulo-do-artigo" />);

    const copyBtn = screen.getByTitle(/copiar link do artigo/i);
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText("Copiado!")).toBeInTheDocument();
    });
  });
});
