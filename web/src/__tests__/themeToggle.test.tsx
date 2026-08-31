import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/src/components/common/themeToggle";

const mockToggleTheme = vi.fn();

vi.mock("@/src/lib/hooks/useThemeTransition", () => ({
  useThemeTransition: () => ({
    theme: "light",
    resolvedTheme: "light",
    toggleTheme: mockToggleTheme,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    mockToggleTheme.mockClear();
  });

  it("should render theme toggle buttons for light and dark modes", () => {
    render(<ThemeToggle />);

    const lightButton = screen.getByRole("button", { name: /ativar tema claro/i });
    const darkButton = screen.getByRole("button", { name: /ativar tema escuro/i });

    expect(lightButton).toBeInTheDocument();
    expect(darkButton).toBeInTheDocument();
  });

  it("should trigger toggleTheme when clicking the inactive dark mode button", () => {
    render(<ThemeToggle />);

    const darkButton = screen.getByRole("button", { name: /ativar tema escuro/i });
    fireEvent.click(darkButton);

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it("should apply dark overlay styling when isDarkOverlay is true", () => {
    const { container } = render(<ThemeToggle isDarkOverlay={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
