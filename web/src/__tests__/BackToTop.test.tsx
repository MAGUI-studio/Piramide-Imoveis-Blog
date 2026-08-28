import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BackToTop } from "@/src/components/common/BackToTop";

describe("BackToTop", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it("should not be visible initially when window.scrollY <= 600", () => {
    window.scrollY = 0;
    render(<BackToTop />);
    expect(
      screen.queryByRole("button", { name: /voltar ao topo da página/i }),
    ).not.toBeInTheDocument();
  });

  it("should appear after scrolling down and trigger window.scrollTo when clicked", async () => {
    render(<BackToTop />);

    act(() => {
      window.scrollY = 800;
      window.dispatchEvent(new Event("scroll"));
    });

    const button = await screen.findByRole("button", {
      name: /voltar ao topo da página/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
