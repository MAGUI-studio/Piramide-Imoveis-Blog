"use client";

import { useEffect, useState, useRef, useCallback, useSyncExternalStore } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  title: string;
  excerpt?: string;
  body?: unknown[];
  readingTime?: number;
}

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}

function extractTextFromBlocks(body?: unknown[]): string {
  if (!Array.isArray(body)) return "";

  const textParts: string[] = [];

  for (const block of body) {
    if (
      block &&
      typeof block === "object" &&
      "_type" in block &&
      block._type === "block" &&
      "children" in block &&
      Array.isArray((block as { children?: unknown[] }).children)
    ) {
      const blockChildren = (block as { children: { text?: string }[] }).children;
      const blockText = blockChildren
        .map((child) => child.text || "")
        .join(" ")
        .trim();
      if (blockText) {
        textParts.push(blockText);
      }
    }
  }

  return textParts.join(". ");
}

export function AudioPlayer({ title, excerpt, body, readingTime }: AudioPlayerProps) {
  const mounted = useIsMounted();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const sentencesRef = useRef<string[]>([]);
  const currentIndexRef = useRef<number>(0);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const speakNextRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const ptVoice =
          voices.find((v) => v.lang === "pt-BR" || v.lang === "pt_BR") ||
          voices.find((v) => v.lang.startsWith("pt")) ||
          null;
        selectedVoiceRef.current = ptVoice;
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
      }
    };
  }, []);

  const prepareSentences = useCallback(() => {
    const fullText = [
      title,
      excerpt || "",
      extractTextFromBlocks(body),
    ]
      .filter(Boolean)
      .join(". ");

    const matches = fullText.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [fullText];
    sentencesRef.current = matches.map((s) => s.trim()).filter(Boolean);
  }, [title, excerpt, body]);

  const speakNextSentence = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (currentIndexRef.current >= sentencesRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      currentIndexRef.current = 0;
      if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
      return;
    }

    const sentence = sentencesRef.current[currentIndexRef.current];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "pt-BR";
    utterance.rate = 1.5; 

    if (selectedVoiceRef.current) {
      utterance.voice = selectedVoiceRef.current;
    }

    utterance.onend = () => {
      currentIndexRef.current += 1;
      speakNextRef.current();
    };

    utterance.onerror = (e) => {
      console.warn("[AudioPlayer] Speech synthesis error:", e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    speakNextRef.current = speakNextSentence;
  }, [speakNextSentence]);

  const handlePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    prepareSentences();
    currentIndexRef.current = 0;
    setIsPlaying(true);
    setIsPaused(false);

    if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
    keepAliveIntervalRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);

    speakNextSentence();
  };

  const handlePause = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
    setIsPlaying(false);
    setIsPaused(false);
    currentIndexRef.current = 0;
  };

  return (
    <div className="inline-flex items-center gap-2 select-none">
      
      <button
        type="button"
        onClick={!isPlaying ? handlePlay : handlePause}
        disabled={!mounted}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-2xs group shrink-0 ${
          isPlaying || isPaused
            ? "bg-primary/15 text-primary hover:bg-primary/25"
            : "bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white"
        }`}
        title="Ouvir narração do artigo (velocidade 1.5x)"
      >
        <Icon
          icon={
            isPlaying
              ? "ph:pause-fill"
              : isPaused
              ? "ph:play-fill"
              : "ph:headphones-bold"
          }
          className="size-3.5 shrink-0 transition-transform group-hover:scale-110"
        />
        <span>
          {isPlaying
            ? "Pausar"
            : isPaused
            ? "Continuar"
            : `Ouvir (${readingTime || 4} min)`}
        </span>
      </button>

      
      {isPlaying && (
        <div className="flex items-center gap-0.5 h-3 px-0.5 shrink-0">
          {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
            <motion.span
              key={i}
              className="w-[2px] bg-primary rounded-full"
              animate={{ height: ["3px", "13px", "3px"] }}
              transition={{
                repeat: Infinity,
                duration: 0.5 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      
      {(isPlaying || isPaused) && (
        <button
          type="button"
          onClick={handleStop}
          className="p-1 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
          title="Parar áudio"
        >
          <Icon icon="ph:stop-fill" className="size-3.5" />
        </button>
      )}
    </div>
  );
}
