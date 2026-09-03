import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeadershipSection } from "@/src/components/sobre/LeadershipSection";
import { TeamGridFilter } from "@/src/components/sobre/TeamGridFilter";
import type { TeamMember } from "@/src/components/sobre/TeamMemberCard";

const mockMembers: TeamMember[] = [
  {
    name: "Rafael Marques",
    role: "Sócio-Proprietário",
    creci: "CRECI 83891F",
    image: "/utils/equipe/rafael-marques.webp",
    email: "rafael@piramideimoveissjc.com.br",
    whatsapps: [{ label: "(12) 98158-4103", url: "https://wa.me/5512981584103" }],
  },
  {
    name: "Amanda Souza",
    role: "Corretora",
    image: "/utils/equipe/amanda-souza.webp",
    email: "amanda@piramideimoveissjc.com.br",
  },
];

describe("LeadershipSection", () => {
  it("should render leadership section heading and members", () => {
    render(<LeadershipSection members={mockMembers} />);

    expect(screen.getByText("Nossa Diretoria & Liderança")).toBeInTheDocument();
    expect(screen.getByText("Rafael Marques")).toBeInTheDocument();
    expect(screen.getByText("Sócio-Proprietário")).toBeInTheDocument();
    expect(screen.getByText(/CRECI 83891F/i)).toBeInTheDocument();
  });
});

describe("TeamGridFilter", () => {
  it("should render all members initially", () => {
    render(<TeamGridFilter members={mockMembers} />);

    expect(screen.getByText("Rafael Marques")).toBeInTheDocument();
    expect(screen.getByText("Amanda Souza")).toBeInTheDocument();
  });

  it("should filter members live when typing search query", () => {
    render(<TeamGridFilter members={mockMembers} />);

    const searchInput = screen.getByPlaceholderText("Buscar por nome ou CRECI...");
    fireEvent.change(searchInput, { target: { value: "amanda" } });

    expect(screen.getByText("Amanda Souza")).toBeInTheDocument();
    expect(screen.queryByText("Rafael Marques")).not.toBeInTheDocument();
  });

  it("should display empty state with reset button when no members match", () => {
    render(<TeamGridFilter members={mockMembers} />);

    const searchInput = screen.getByPlaceholderText("Buscar por nome ou CRECI...");
    fireEvent.change(searchInput, { target: { value: "inexistente" } });

    expect(screen.getByText("Nenhum profissional encontrado")).toBeInTheDocument();

    const resetButton = screen.getByRole("button", { name: "Limpar Busca" });
    fireEvent.click(resetButton);

    expect(screen.getByText("Rafael Marques")).toBeInTheDocument();
    expect(screen.getByText("Amanda Souza")).toBeInTheDocument();
  });
});
