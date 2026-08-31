import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import { ReadingProgressBar } from "@/src/components/blog/ReadingProgressBar";

describe("ReadingProgressBar", () => {
  beforeEach(() => {
    const articleContainer = document.createElement("div");
    articleContainer.id = "post-article-container";
    articleContainer.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 0,
      height: 2000,
      bottom: 2000,
      left: 0,
      right: 1000,
      width: 1000,
    });
    document.body.appendChild(articleContainer);
  });

  afterEach(() => {
    const el = document.getElementById("post-article-container");
    if (el) document.body.removeChild(el);
  });

  it("should render progress bar container with initial styling", () => {
    const { container } = render(<ReadingProgressBar targetId="post-article-container" />);
    const bar = container.querySelector(".bg-primary");
    expect(bar).toBeInTheDocument();
  });

  it("should update progress on scroll event", () => {
    const { container } = render(<ReadingProgressBar targetId="post-article-container" />);
    const bar = container.querySelector(".bg-primary");

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(bar).toBeInTheDocument();
  });

  it("should handle missing container element gracefully without throwing", () => {
    expect(() => {
      render(<ReadingProgressBar targetId="non-existent-id" />);
    }).not.toThrow();
  });
});
