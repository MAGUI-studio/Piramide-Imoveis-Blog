import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ScrollToTop } from "@/src/components/common/ScrollToTop";

describe("ScrollToTop", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it("should call window.scrollTo with top 0 on render", () => {
    render(<ScrollToTop />);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  });

  it("should return null without rendering DOM elements", () => {
    const { container } = render(<ScrollToTop />);
    expect(container).toBeEmptyDOMElement();
  });
});
