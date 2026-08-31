"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

function CounterNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayVal(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, motionVal, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value < 10 && !prefix ? `0${displayVal}` : displayVal}
      {suffix}
    </span>
  );
}

export function TeamHeroSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/utils/piramide-imoveis-placa.webp"
          alt="Pirâmide Imóveis - Equipe"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 dark:opacity-20 filter contrast-105 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-440 mx-auto px-6 md:px-12 space-y-12 sm:space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl space-y-6 sm:space-y-8"
        >
          
          <div>
            <Link
              href="/sobre-nos"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-primary transition-colors"
            >
              <Icon icon="ph:arrow-left-bold" className="size-3.5" />
              <span>Voltar para Sobre Nós</span>
            </Link>
          </div>

          
          <div className="w-full sm:w-fit inline-flex items-center justify-center sm:justify-start py-2 px-8 rounded-tr-full rounded-bl-full bg-primary text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-md">
            <Icon icon="ph:users-three-fill" className="size-4 mr-2" />
            <span>Equipe de Especialistas</span>
          </div>

          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase font-heading tracking-tight text-foreground leading-[1.02]">
            Especialistas que conectam você às melhores oportunidades.
          </h1>

          
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 font-light leading-relaxed max-w-3xl">
            Nossa equipe de corretores e consultores credenciados reúne inteligência de mercado, atendimento consultivo de alto padrão e total segurança jurídica em São José dos Campos, Vale do Paraíba e Litoral Norte.
          </p>

          
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#equipe"
              className="px-9 py-4 bg-primary hover:bg-primary/90 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 transition-all shadow-md rounded-none group cursor-pointer"
            >
              <span>Conhecer Corretores</span>
              <Icon
                icon="ph:arrow-down-bold"
                className="size-4 transition-transform group-hover:translate-y-0.5"
              />
            </a>

            <Link
              href="/sobre-nos"
              className="px-9 py-4 bg-zinc-200/80 hover:bg-zinc-300/80 dark:bg-white/10 dark:hover:bg-white/15 text-foreground font-mono text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 transition-all rounded-none cursor-pointer border border-zinc-300 dark:border-white/20"
            >
              <span>Sobre a Imobiliária</span>
            </Link>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-6 sm:pt-10"
        >
          
          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground block">
              <CounterNumber value={55} suffix="+" />
              <span className="text-primary text-xl sm:text-2xl ml-1 font-mono">
                Especialistas
              </span>
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">
              Corretores Credenciados
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light hidden sm:block">
              Profissionais experientes atuando no Vale do Paraíba e Litoral.
            </p>
          </div>

          
          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground block">
              <CounterNumber value={100} suffix="%" />
              <span className="text-primary text-xl sm:text-2xl ml-1 font-mono">
                Credenciados
              </span>
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">
              Habilitação CRECI
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light hidden sm:block">
              Rigor ético, conformidade legal e segurança em cada contrato.
            </p>
          </div>

          
          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground block">
              <CounterNumber value={360} suffix="°" />
              <span className="text-primary text-xl sm:text-2xl ml-1 font-mono">
                Consultoria
              </span>
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">
              Assessoria Completa
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light hidden sm:block">
              Da prospecção à análise jurídica e entrega das chaves.
            </p>
          </div>

          
          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground block">
              <CounterNumber value={100} suffix="%" />
              <span className="text-primary text-xl sm:text-2xl ml-1 font-mono">
                Dedicado
              </span>
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">
              Atendimento Consultivo
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light hidden sm:block">
              Soluções personalizadas para o seu momento de vida e patrimônio.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
