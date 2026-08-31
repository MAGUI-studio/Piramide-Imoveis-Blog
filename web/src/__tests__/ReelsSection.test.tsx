import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReelsSection } from "@/src/components/blog/ReelsSection";
import type { ReelItem } from "@/src/types/sanity";

const mockReels: ReelItem[] = [
  {
    _id: "reel-1",
    title: "Tour em Mansão Exclusiva no Urbanova",
    propertyTitle: "Mansão Alphaville",
    videoUrl: "https://example.com/video1.mp4",
  },
  {
    _id: "reel-2",
    title: "Apartamento Decorado no Aquarius",
    propertyTitle: "Residencial Infinity",
    videoUrl: "https://example.com/video2.mp4",
  },
];

describe("ReelsSection", () => {
  it("should render video reel items and section title", () => {
    render(<ReelsSection reels={mockReels} />);

    expect(screen.getByText("Vídeos & Bastidores")).toBeInTheDocument();
    expect(screen.getByText("Tours & Vídeos Exclusivos")).toBeInTheDocument();
    const reelTitles = screen.getAllByText("Tour em Mansão Exclusiva no Urbanova");
    expect(reelTitles.length).toBeGreaterThanOrEqual(1);
  });

  it("should return null when reels list is empty", () => {
    const { container } = render(<ReelsSection reels={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
