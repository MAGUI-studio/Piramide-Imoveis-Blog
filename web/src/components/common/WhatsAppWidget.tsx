"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsOpen(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    leaveTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsHovered(false);
    }, 150);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-whatsapp-widget]")) {
        setIsOpen(false);
        setIsHovered(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  const whatsappOptions = [
    {
      id: "consultoria",
      title: "Consultoria Imobiliária",
      subtitle: "Falar com consultor sobre imóveis em SJC",
      tag: "Atendimento",
      message: "Olá! Gostaria de falar com um consultor da Pirâmide Imóveis para tirar dúvidas sobre o mercado imobiliário.",
      icon: "ph:chat-circle-dots-bold",
      colorClass: "bg-primary/10 text-primary",
    },
    {
      id: "lancamentos",
      title: "Lançamentos Exclusivos",
      subtitle: "Dúvidas sobre lançamentos e investimentos",
      tag: "Novidades",
      message: "Olá! Gostaria de receber informações e tabelas sobre os novos lançamentos imobiliários em São José dos Campos.",
      icon: "ph:buildings-bold",
      colorClass: "bg-primary/10 text-primary",
    },
    {
      id: "blog",
      title: "Dúvidas sobre o Blog",
      subtitle: "Conversar sobre os artigos e análises",
      tag: "Editorial",
      message: "Olá! Vi um artigo no Blog da Pirâmide Imóveis e gostaria de entender mais sobre o assunto.",
      icon: "ph:article-bold",
      colorClass: "bg-primary/10 text-primary",
    },
  ];

  const handleSelectOption = (message: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    const url = `https://wa.me/5512953699554?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
    setIsHovered(false);
  };

  const handleButtonClick = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 pointer-events-none">
      <div className="w-full max-w-440 mx-auto px-6 md:px-12 flex justify-end">
        <div
          data-whatsapp-widget
          className="relative pointer-events-auto size-14 sm:size-15"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="absolute bottom-full right-0 mb-3 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-zinc-900/95 p-3 shadow-xl backdrop-blur-xl origin-bottom-right border border-zinc-200/80 dark:border-zinc-800"
              >
                <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Online Agora
                      </p>
                      <p className="text-xs font-extrabold text-zinc-900 dark:text-white">
                        Atendimento Pirâmide
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (leaveTimerRef.current) {
                        clearTimeout(leaveTimerRef.current);
                      }
                      setIsOpen(false);
                      setIsHovered(false);
                    }}
                    className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    aria-label="Fechar"
                  >
                    <Icon icon="ph:x-bold" className="size-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {whatsappOptions.map((option, idx) => (
                    <motion.button
                      key={option.id}
                      type="button"
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 + 0.04 }}
                      onClick={() => handleSelectOption(option.message)}
                      className="w-full p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all flex items-center justify-between text-left group/item cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${option.colorClass} flex-shrink-0`}
                        >
                          <Icon icon={option.icon} className="size-4.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                              {option.title}
                            </span>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-none bg-primary/10 text-primary border border-primary/20">
                              {option.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5 truncate">
                            {option.subtitle}
                          </p>
                        </div>
                      </div>

                      <Icon
                        icon="ph:arrow-up-right-bold"
                        className="size-3.5 text-zinc-400 group-hover/item:text-primary group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform flex-shrink-0 ml-1.5"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={
              isHovered || isOpen
                ? { scale: 1.08, opacity: 1 }
                : { scale: [1, 1.08, 1], opacity: 1 }
            }
            transition={
              isHovered || isOpen
                ? { duration: 0.2 }
                : {
                    scale: {
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "easeInOut",
                    },
                    opacity: { duration: 0.5 },
                  }
            }
            whileTap={{ scale: 0.94 }}
            onClick={handleButtonClick}
            aria-label="Abrir atendimento no WhatsApp"
            className="relative size-14 sm:size-15 flex items-center justify-center bg-transparent cursor-pointer select-none drop-shadow-xl p-0.5"
          >
            <div className="relative size-full">
              <Image
                src="/utils/icons/whatsapp.svg"
                alt="WhatsApp Pirâmide Imóveis"
                fill
                sizes="60px"
                className="object-contain"
              />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
