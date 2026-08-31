import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TagCard, type TagItemRef } from "@/src/components/blog/TagCard";

const mockTag: TagItemRef = {
  name: "Studios",
  slug: "studios",
  postCount: 4,
};

describe("TagCard", () => {
  it("should render tag name with hashtag, article count badge, and link to /tag/[slug]", () => {
    render(<TagCard tag={mockTag} />);

    expect(screen.getByText("#Studios")).toBeInTheDocument();
    expect(screen.getByText("4 Artigos")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /#studios/i });
    expect(link).toHaveAttribute("href", "/tag/studios");
  });

  it("should render singular '1 Artigo' when postCount is 1", () => {
    render(<TagCard tag={{ ...mockTag, postCount: 1 }} />);
    expect(screen.getByText("1 Artigo")).toBeInTheDocument();
  });

  it("should return null if tag has no slug", () => {
    const { container } = render(
      <TagCard tag={{ ...mockTag, slug: "" }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
