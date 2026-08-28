"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 pointer-events-none">
      <div className="w-full max-w-440 mx-auto px-6 md:px-12 flex justify-start">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto"
            >
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Voltar ao topo da página"
                className="size-11 sm:size-12 rounded-none bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all cursor-pointer group"
              >
                <Icon
                  icon="ph:arrow-up-bold"
                  className="size-4.5 text-zinc-600 dark:text-zinc-300 group-hover:text-primary group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
