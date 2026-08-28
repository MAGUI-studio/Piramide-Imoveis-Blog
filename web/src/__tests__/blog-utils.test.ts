import { describe, it, expect } from "vitest";
import { slugifyText, calculateReadingTime, extractHeadings } from "@/src/lib/blog-utils";

describe("blog-utils", () => {
  describe("slugifyText", () => {
    it("should correctly convert accented characters and special chars into url-safe slugs", () => {
      expect(slugifyText("São José dos Campos")).toBe("sao-jose-dos-campos");
      expect(slugifyText("Tendências do Mercado Imobiliário 2026!")).toBe(
        "tendencias-do-mercado-imobiliario-2026",
      );
      expect(slugifyText("   Espaços   Extras   ")).toBe("espacos-extras");
      expect(slugifyText("Decoração & Design de Interiores")).toBe(
        "decoracao-design-de-interiores",
      );
    });

    it("should handle empty or single character input", () => {
      expect(slugifyText("")).toBe("");
      expect(slugifyText("A")).toBe("a");
    });
  });

  describe("calculateReadingTime", () => {
    it("should calculate reading time from portable text blocks", () => {
      const words = Array(400).fill("palavra").join(" ");
      const blocks = [
        {
          _type: "block",
          children: [{ text: words }],
        },
      ];

      expect(calculateReadingTime(blocks)).toBe(2);
    });

    it("should return at least 1 minute for short content or fallback", () => {
      expect(calculateReadingTime(null)).toBe(3);
      expect(calculateReadingTime([])).toBe(1);
      expect(
        calculateReadingTime([
          {
            _type: "block",
            children: [{ text: "Artigo curto." }],
          },
        ]),
      ).toBe(1);
    });
  });

  describe("extractHeadings", () => {
    it("should extract h2 and h3 headings with generated slug IDs", () => {
      const blocks = [
        {
          _type: "block",
          style: "h2",
          children: [{ text: "Oportunidades em São José dos Campos" }],
        },
        {
          _type: "block",
          style: "normal",
          children: [{ text: "Parágrafo comum sem título." }],
        },
        {
          _type: "block",
          style: "h3",
          children: [{ text: "Bairro Urbanova e Aquarius" }],
        },
      ];

      const headings = extractHeadings(blocks);
      expect(headings).toHaveLength(2);
      expect(headings[0]).toEqual({
        id: "oportunidades-em-sao-jose-dos-campos",
        text: "Oportunidades em São José dos Campos",
        level: 2,
      });
      expect(headings[1]).toEqual({
        id: "bairro-urbanova-e-aquarius",
        text: "Bairro Urbanova e Aquarius",
        level: 3,
      });
    });

    it("should return empty array for non-array or blocks without headings", () => {
      expect(extractHeadings(null)).toEqual([]);
      expect(
        extractHeadings([
          {
            _type: "block",
            style: "normal",
            children: [{ text: "Texto comum" }],
          },
        ]),
      ).toEqual([]);
    });
  });
});
