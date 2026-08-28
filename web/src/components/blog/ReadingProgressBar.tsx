"use client";

import { useEffect, useState } from "react";

interface ReadingProgressBarProps {
  targetId?: string;
}

export function ReadingProgressBar({ targetId = "post-article-container" }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById(targetId);
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const headerOffset = 100;

      const start = rect.top - headerOffset;
      const totalScrollableDistance = rect.height - windowHeight + headerOffset;

      if (totalScrollableDistance <= 0) {
        setProgress(100);
        return;
      }

      if (start > 0) {
        setProgress(0);
      } else {
        const scrolled = -start;
        const currentProgress = Math.min(100, Math.max(0, (scrolled / totalScrollableDistance) * 100));
        setProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none w-full">
      <div className="mx-auto w-full max-w-440 relative h-[3px] bg-black/5 dark:bg-white/5">
        <div
          className="h-full bg-primary origin-left transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
