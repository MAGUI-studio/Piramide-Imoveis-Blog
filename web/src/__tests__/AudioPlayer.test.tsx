import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AudioPlayer } from "@/src/components/blog/AudioPlayer";

describe("AudioPlayer", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    class MockSpeechSynthesisUtterance {
      text: string;
      lang = "pt-BR";
      rate = 1;
      voice: SpeechSynthesisVoice | null = null;
      onend: (() => void) | null = null;
      onerror: ((e: unknown) => void) | null = null;

      constructor(text: string) {
        this.text = text;
      }
    }

    global.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance as unknown as typeof SpeechSynthesisUtterance;

    Object.defineProperty(window, "speechSynthesis", {
      writable: true,
      value: {
        speak: vi.fn(),
        cancel: vi.fn(),
        pause: vi.fn(),
        resume: vi.fn(),
        getVoices: vi.fn().mockReturnValue([
          { name: "Luciana", lang: "pt-BR", default: true },
        ]),
        onvoiceschanged: null,
        speaking: false,
        paused: false,
      },
    });
  });

  it("should render audio player button with reading time", () => {
    render(
      <AudioPlayer
        title="Financiamento Imobiliário em 2026"
        excerpt="Entenda como funcionam as taxas e o FGTS."
        readingTime={5}
        body={[
          {
            _type: "block",
            children: [{ _type: "span", text: "Primeiro parágrafo do artigo." }],
          },
        ]}
      />
    );

    expect(screen.getByText(/ouvir \(5 min\)/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ouvir/i })).toBeInTheDocument();
  });

  it("should start speech synthesis and show pause button when clicking Ouvir", () => {
    render(
      <AudioPlayer
        title="Mercado Imobiliário"
        excerpt="Resumo do artigo"
        readingTime={3}
        body={[]}
      />
    );

    const playButton = screen.getByRole("button", { name: /ouvir/i });
    fireEvent.click(playButton);

    expect(window.speechSynthesis.speak).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /pausar/i })).toBeInTheDocument();
  });

  it("should stop audio when clicking stop button", () => {
    render(
      <AudioPlayer
        title="Tendências 2026"
        excerpt="Resumo"
        readingTime={4}
        body={[]}
      />
    );

    const playButton = screen.getByRole("button", { name: /ouvir/i });
    fireEvent.click(playButton);

    const stopButton = screen.getByRole("button", { name: /parar/i });
    expect(stopButton).toBeInTheDocument();
    fireEvent.click(stopButton);

    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });
});
