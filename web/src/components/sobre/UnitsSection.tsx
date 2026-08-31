"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export interface UnitItem {
  name: string;
  city: string;
  tag?: string;
  image: string;
  address: string;
  phones: { label: string; href: string; isWhatsApp: boolean }[];
  mapUrl: string;
  schedule?: string;
}

interface UnitsSectionProps {
  units: UnitItem[];
}

function GoogleMapsIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z"
        fill="#EA4335"
      />
      <path
        d="M12 2C7.58 2 4 5.58 4 10c0 2.21.9 4.21 2.34 5.66L12 2z"
        fill="#4285F4"
      />
      <path d="M12 2c2.21 0 4.21.9 5.66 2.34L12 10V2z" fill="#FBBC05" />
      <path
        d="M12 22s8-6.75 8-12c0-1.05-.2-2.05-.57-2.97L12 22z"
        fill="#34A853"
      />
      <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
    </svg>
  );
}

export function UnitsSection({ units }: UnitsSectionProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyAddress = (address: string, idx: number) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(address);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="w-full max-w-440 mx-auto px-6 md:px-12 space-y-12 sm:space-y-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center justify-center space-y-4"
        >
          <div className="inline-flex items-center justify-center py-1.5 rounded-tr-full rounded-bl-full px-8 bg-primary text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-sm">
            <Icon icon="ph:buildings-fill" className="size-4 mr-2" />
            <span>Presença Regional</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-heading tracking-tight text-foreground leading-tight">
            Nossas Unidades de Atendimento
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Estrutura física e atendimento presencial em pontos estratégicos de São José dos Campos e do Litoral Norte.
          </p>
        </motion.div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {units.map((unit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-200 dark:bg-zinc-800 shadow-md group">
                  <Image
                    src={unit.image}
                    alt={unit.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {unit.tag && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-flex items-center gap-1.5 border-none">
                        <Icon icon="ph:buildings-fill" className="size-3 text-white" />
                        <span>{unit.tag}</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-foreground leading-tight">
                    {unit.name}
                  </h3>
                  <p className="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400">
                    {unit.city}
                  </p>
                </div>

                
                <div className="pt-2 flex items-start justify-between gap-3">
                  <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed min-w-0">
                    <div className="flex items-start gap-2">
                      <Icon icon="ph:map-pin-fill" className="size-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-snug">{unit.address}</span>
                    </div>
                    {unit.schedule && (
                      <div className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
                        <Icon icon="ph:clock-fill" className="size-4 text-primary shrink-0 mt-0.5" />
                        <span>{unit.schedule}</span>
                      </div>
                    )}
                  </div>

                  
                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                    <button
                      type="button"
                      onClick={() => handleCopyAddress(unit.address, idx)}
                      className="inline-flex items-center justify-center size-9 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground transition-colors cursor-pointer border border-zinc-200 dark:border-white/10 rounded-none group"
                      title={copiedIdx === idx ? "Endereço copiado!" : "Copiar endereço"}
                      aria-label="Copiar endereço"
                    >
                      {copiedIdx === idx ? (
                        <Icon icon="ph:check-bold" className="size-4 text-emerald-500" />
                      ) : (
                        <Icon icon="ph:copy-bold" className="size-4 text-zinc-600 dark:text-zinc-300 group-hover:text-foreground" />
                      )}
                    </button>

                    <a
                      href={unit.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center size-9 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-foreground transition-colors cursor-pointer border border-zinc-200 dark:border-white/10 rounded-none group"
                      title="Abrir no Google Maps"
                      aria-label="Abrir no Google Maps"
                    >
                      <GoogleMapsIcon className="size-4.5 transition-transform group-hover:scale-110" />
                    </a>
                  </div>
                </div>
              </div>

              
              <div className="pt-2">
                <div className={`grid gap-2 ${unit.phones.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                  {unit.phones.map((phone, pIdx) => (
                    <a
                      key={pIdx}
                      href={phone.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800/60 dark:hover:bg-zinc-700/80 text-foreground font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors border border-zinc-200 dark:border-white/10"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon
                          icon={phone.isWhatsApp ? "ph:whatsapp-logo-bold" : "ph:phone-bold"}
                          className={`size-4 shrink-0 ${phone.isWhatsApp ? "text-emerald-500" : "text-primary"}`}
                        />
                        <span className="truncate text-[11px]">{phone.label}</span>
                      </div>
                      <Icon icon="ph:arrow-up-right-bold" className="size-3 text-zinc-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
