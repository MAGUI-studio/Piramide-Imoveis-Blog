import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PortableText } from "@/src/components/PortableText";

describe("PortableText", () => {
  it("should return null if value is empty or null", () => {
    const { container } = render(<PortableText value={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render callout block with custom title and content", () => {
    const value = [
      {
        _type: "callout",
        type: "tip",
        title: "Dica Especial",
        content: "Esta é uma dica importante sobre valorização.",
      },
    ];

    render(<PortableText value={value} />);

    expect(screen.getByText("Dica Especial")).toBeInTheDocument();
    expect(
      screen.getByText("Esta é uma dica importante sobre valorização."),
    ).toBeInTheDocument();
  });

  it("should render table block with headers and cell values", () => {
    const value = [
      {
        _type: "table",
        title: "Comparativo de Bairros",
        headers: ["Bairro", "Preço Médio m²", "Valorização Anual"],
        rows: [
          { cells: ["Urbanova", "R$ 11.500", "+14.5%"] },
          { cells: ["Aquarius", "R$ 10.200", "+11.2%"] },
        ],
      },
    ];

    render(<PortableText value={value} />);

    expect(screen.getByText("Comparativo de Bairros")).toBeInTheDocument();
    expect(screen.getByText("Preço Médio m²")).toBeInTheDocument();
    expect(screen.getByText("Urbanova")).toBeInTheDocument();
    expect(screen.getByText("R$ 11.500")).toBeInTheDocument();
    expect(screen.getByText("Aquarius")).toBeInTheDocument();
  });

  it("should render FAQ block with questions and answers", () => {
    const value = [
      {
        _type: "faqBlock",
        title: "Dúvidas Frequentes",
        items: [
          {
            question: "Qual o melhor bairro de São José dos Campos?",
            answer: "Bairros como Urbanova, Aquarius e Vila Ema oferecem alta qualidade de vida.",
          },
        ],
      },
    ];

    render(<PortableText value={value} />);

    expect(screen.getByText("Dúvidas Frequentes")).toBeInTheDocument();
    expect(screen.getByText("Qual o melhor bairro de São José dos Campos?")).toBeInTheDocument();
    expect(screen.getByText(/bairros como urbanova/i)).toBeInTheDocument();
  });

  it("should render CTA block with button and external/whatsapp link", () => {
    const value = [
      {
        _type: "ctaBlock",
        title: "Agende sua Visita Guiada",
        description: "Conheça as melhores casas no Urbanova com corretores credenciados.",
        buttonText: "Falar com Corretor",
        link: "https://wa.me/5512991599801",
      },
    ];

    render(<PortableText value={value} />);

    expect(screen.getByText("Oportunidade Especial")).toBeInTheDocument();
    expect(screen.getByText("Agende sua Visita Guiada")).toBeInTheDocument();
    expect(screen.getByText("Falar com Corretor")).toBeInTheDocument();
  });
});
