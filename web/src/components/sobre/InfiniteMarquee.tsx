"use client";

import { motion } from "framer-motion";

export function InfiniteMarquee() {
  const marqueeItems = [
    { title: "45 Anos de História", detail: "Tradição e Solidez" },
    { title: "Alto Padrão", detail: "Lançamentos Exclusivos" },
    { title: "03 Sedes Próprias", detail: "Vale & Litoral" },
    { title: "Segurança Jurídica", detail: "Assessoria 100%" },
    { title: "Consultoria Patrimonial", detail: "Atendimento Personalizado" },
    { title: "São José dos Campos", detail: "Jardim Esplanada & Urbanova" },
    { title: "Litoral Norte", detail: "Caraguatatuba" },
  ];

  const fullList = [
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ];

  return (
    <div className="relative z-20 w-full bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-sm text-foreground py-3.5 sm:py-4 overflow-hidden select-none transition-colors">
      <div className="flex items-center">
        <motion.div
          className="flex items-center gap-8 sm:gap-12 whitespace-nowrap shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {fullList.map((item, index) => (
            <div key={index} className="flex items-center gap-3 shrink-0">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground font-heading">
                {item.title}
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 uppercase font-mono">
                — {item.detail}
              </span>
              <span className="text-primary font-bold text-sm ml-4 sm:ml-6">
                /
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
