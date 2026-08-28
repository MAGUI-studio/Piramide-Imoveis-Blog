"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { openPrivacyModal } from "@/src/components/common/PrivacyModal";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookie_consent", "accepted");
      document.cookie =
        "cookie-consent=accepted; path=/; max-age=31536000; SameSite=Lax";
    } catch {
      
    }
    setIsVisible(false);
  };

  const handleOpenPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    openPrivacyModal();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 pointer-events-none">
          <div className="w-full max-w-440 mx-auto px-4 sm:px-6 md:px-12 flex justify-start">
            <motion.div
              initial={{ opacity: 0, y: 35, x: -15, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, x: -15, scale: 0.94 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
                mass: 0.8,
              }}
              className="pointer-events-auto relative w-full sm:max-w-[490px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 text-zinc-900 dark:text-zinc-100 rounded-none overflow-hidden"
            >
              <div className="absolute -right-5 -bottom-5 text-primary/[0.07] dark:text-primary/[0.12] pointer-events-none select-none -rotate-12">
                <Icon icon="ph:shield-check-fill" className="size-40" />
              </div>

              <div className="relative z-10 space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-black uppercase tracking-wider">
                    <Icon icon="ph:shield-check-bold" className="size-3.5" />
                    <span>LGPD & Cookies</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    aria-label="Fechar aviso"
                    className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-1 cursor-pointer shrink-0 -mr-1.5 -mt-1.5"
                  >
                    <Icon icon="ph:x-bold" className="size-4" />
                  </button>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                  Utilizamos cookies e tecnologias semelhantes para aprimorar sua experiência, analisar o tráfego e apresentar conteúdos personalizados sobre o mercado imobiliário. Ao continuar navegando, você concorda com nossos termos.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 pt-1">
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all hover:shadow-md cursor-pointer text-center whitespace-nowrap"
                  >
                    Concordar e Continuar
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenPrivacy}
                    className="w-full sm:w-auto text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary underline underline-offset-4 transition-colors cursor-pointer text-center sm:text-left py-1 sm:py-0 whitespace-nowrap"
                  >
                    Termos de Privacidade (LGPD)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
