import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "@/src/components/blog/SearchInput";

describe("SearchInput", () => {
  it("should render input with placeholder and allow typing", () => {
    render(<SearchInput placeholder="Buscar artigos..." />);

    const input = screen.getByPlaceholderText("Buscar artigos...") as HTMLInputElement;
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Apartamento" } });
    expect(input.value).toBe("Apartamento");
  });

  it("should show clear button when there is text and clear upon clicking", () => {
    render(<SearchInput initialQuery="Urbanova" />);

    const input = screen.getByDisplayValue("Urbanova") as HTMLInputElement;
    expect(input).toBeInTheDocument();

    const clearBtn = screen.getByRole("button", {
      name: /limpar campo de pesquisa/i,
    });
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(input.value).toBe("");
  });
});
