import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CitiesExplorer } from "@/src/components/blog/CitiesExplorer";
import type { CityRef } from "@/src/types/sanity";

const mockCities: CityRef[] = [
  {
    _id: "city-1",
    name: "São José dos Campos",
    slug: { current: "sao-jose-dos-campos" },
    state: "SP",
    description: "Maior polo tecnológico do Vale do Paraíba.",
    postCount: 20,
  },
  {
    _id: "city-2",
    name: "Jacareí",
    slug: { current: "jacarei" },
    state: "SP",
    description: "Excelente custo-benefício e proximidade com a Dutra.",
    postCount: 8,
  },
];

describe("CitiesExplorer", () => {
  it("should render search input and all city cards", () => {
    render(<CitiesExplorer cities={mockCities} />);

    expect(
      screen.getByPlaceholderText(/pesquisar por nome da cidade/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/São José dos Campos/i)).toBeInTheDocument();
    expect(screen.getByText(/Jacareí/i)).toBeInTheDocument();
  });

  it("should filter cities by query string", () => {
    render(<CitiesExplorer cities={mockCities} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por nome da cidade/i);
    fireEvent.change(searchInput, { target: { value: "jacareí" } });

    expect(screen.getByText(/Jacareí/i)).toBeInTheDocument();
    expect(screen.queryByText(/São José dos Campos/i)).not.toBeInTheDocument();
  });

  it("should display empty state with reset button when no cities match", () => {
    render(<CitiesExplorer cities={mockCities} />);

    const searchInput = screen.getByPlaceholderText(/pesquisar por nome da cidade/i);
    fireEvent.change(searchInput, { target: { value: "cidade-desconhecida" } });

    expect(screen.getByText("Nenhuma cidade encontrada")).toBeInTheDocument();
    const resetButton = screen.getByRole("button", { name: /resetar filtros/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.getByText(/São José dos Campos/i)).toBeInTheDocument();
  });
});
