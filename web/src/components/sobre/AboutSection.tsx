"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export interface ValueItem {
  number: string;
  title: string;
  icon: string;
}

interface AboutSectionProps {
  values: ValueItem[];
}

export function AboutSection({ values }: AboutSectionProps) {
  return (
    <section className="w-full py-16 sm:py-24 lg:py-28">
      <div className="w-full max-w-440 mx-auto px-6 md:px-12 space-y-16 sm:space-y-20">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 sm:space-y-12"
        >
          <div className="flex flex-col items-center text-center justify-center space-y-4">
            <div className="inline-flex items-center justify-center py-1.5 rounded-tr-full rounded-bl-full px-8 bg-primary text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-sm">
              <Icon icon="ph:buildings-fill" className="size-4 mr-2" />
              <span>Sobre a Pirâmide Imóveis</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase font-heading tracking-tight text-foreground leading-[1.03]">
              Solidez, Confiança e Inovação.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-foreground leading-snug">
                A Pirâmide Imóveis construiu uma história pautada na ética, transparência e relacionamento de longo prazo.
              </p>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                Somos mais que uma imobiliária: atuamos como consultores estratégicos especializados em cada etapa da jornada imobiliária — seja para comprar, vender, alugar ou investir.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4 pt-1">
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                Nossa presença consolidada no Vale do Paraíba e no Litoral Norte une o conhecimento profundo de mercado à inovação digital constante, proporcionando negociações seguras, ágeis e personalizadas para famílias e investidores.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-primary">
                  <span className="size-2 rounded-full bg-primary" />
                  <span>Vale do Paraíba & Litoral Norte</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 pt-4"
        >
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block">
              Cultura & Conduta
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-wider text-foreground">
              Nossos Valores
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {values.map((val, idx) => (
              <motion.div
                key={val.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden p-6 sm:p-7 border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/60 flex flex-col justify-between min-h-[140px] hover:border-primary/60 transition-all duration-300 group"
              >
                
                <Icon
                  icon={val.icon}
                  className="absolute -bottom-6 -right-6 size-36 sm:size-40 text-foreground/[0.08] dark:text-white/[0.06] group-hover:text-primary/20 dark:group-hover:text-primary/25 transition-all duration-500 pointer-events-none group-hover:scale-110 group-hover:-translate-y-1"
                />

                <div className="relative z-10 space-y-3">
                  <span className="text-xs font-mono font-bold text-primary block">
                    {val.number}
                  </span>
                  <h4 className="font-heading font-black text-sm sm:text-base uppercase text-foreground leading-snug group-hover:text-primary transition-colors">
                    {val.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start pt-2"
        >
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block">
              Pirâmide Imóveis
            </span>
            <p className="text-xl sm:text-2xl font-heading font-black uppercase tracking-wide text-foreground italic leading-snug">
              Experiência que gera confiança. Inovação que move o futuro.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-widest">
              <Icon icon="ph:target-bold" className="size-5" />
              <span>Missão</span>
            </div>
            <p className="text-sm sm:text-base text-foreground font-light leading-relaxed">
              Atuar com excelência no mercado imobiliário, oferecendo soluções seguras, transparentes e eficientes em locação, administração, vendas e lançamentos imobiliários, promovendo confiança nas relações, valorização patrimonial e experiência de qualidade para clientes, parceiros e colaboradores.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-widest">
              <Icon icon="ph:eye-bold" className="size-5" />
              <span>Visão</span>
            </div>
            <p className="text-sm sm:text-base text-foreground font-light leading-relaxed">
              Ser reconhecida como a principal referência imobiliária do Vale do Paraíba e Litoral Norte, destacando-se pela solidez, inovação em processos, segurança operacional e desenvolvimento contínuo das pessoas e dos serviços prestados.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
