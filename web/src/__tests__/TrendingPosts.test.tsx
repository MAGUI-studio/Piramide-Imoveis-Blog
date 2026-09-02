import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrendingPosts } from "@/src/components/blog/TrendingPosts";
import type { PostItem } from "@/src/types/sanity";

const mockPosts: PostItem[] = [
  {
    _id: "post-1",
    title: "Apartamentos no Aquarius",
    slug: { current: "apartamentos-no-aquarius" },
    featured: false,
    views: 3120,
    categories: [{ _id: "cat-1", title: "Mercado Imobiliário" }],
  },
  {
    _id: "post-featured",
    title: "Artigo Super Destaque",
    slug: { current: "artigo-super-destaque" },
    featured: true,
    views: 9999,
    categories: [{ _id: "cat-3", title: "Destaque" }],
  },
  {
    _id: "post-2",
    title: "Financiamento Imobiliário",
    slug: { current: "financiamento-imobiliario" },
    featured: false,
    views: 2840,
    categories: [{ _id: "cat-2", title: "Financiamento" }],
  },
];

describe("TrendingPosts", () => {
  it("should filter out featured posts and render non-featured items", () => {
    render(<TrendingPosts posts={mockPosts} variant="sidebar" />);

    expect(screen.queryByText("Artigo Super Destaque")).not.toBeInTheDocument();
    expect(screen.getByText("Apartamentos no Aquarius")).toBeInTheDocument();
    expect(screen.getByText("Financiamento Imobiliário")).toBeInTheDocument();
  });

  it("should render sidebar variant with rank badges, titles and formatted views", () => {
    render(<TrendingPosts posts={mockPosts} variant="sidebar" />);

    expect(screen.getByText("Mais Lidos da Semana")).toBeInTheDocument();
    expect(screen.getByText("Apartamentos no Aquarius")).toBeInTheDocument();
    expect(screen.getByText("Financiamento Imobiliário")).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("3.1k views")).toBeInTheDocument();
  });

  it("should render home variant with Bento cards and links", () => {
    render(<TrendingPosts posts={mockPosts} variant="home" />);

    expect(screen.getByText("Os Artigos Mais Lidos da Semana")).toBeInTheDocument();
    expect(screen.getAllByText("Em Alta")).toHaveLength(2);
    expect(screen.getByText("#02")).toBeInTheDocument();
    expect(screen.getByText("Apartamentos no Aquarius")).toBeInTheDocument();
    expect(screen.getByText("Financiamento Imobiliário")).toBeInTheDocument();
  });
});
