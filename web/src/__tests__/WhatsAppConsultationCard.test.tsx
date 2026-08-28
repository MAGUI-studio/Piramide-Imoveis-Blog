import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatsAppConsultationCard } from "@/src/components/blog/WhatsAppConsultationCard";

describe("WhatsAppConsultationCard", () => {
  it("should render consultation invitation and whatsapp button with post context", () => {
    render(<WhatsAppConsultationCard postTitle="Guia do Jardim Aquarius" />);

    expect(screen.getByText("Consultoria Online")).toBeInTheDocument();
    expect(screen.getByText(/interessado em imóveis nesta região/i)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /conversar no whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me"));
    expect(link).toHaveAttribute("href", expect.stringContaining("Guia%20do%20Jardim%20Aquarius"));
  });
});
