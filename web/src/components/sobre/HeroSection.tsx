import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export function HeroSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/utils/piramide-imoveis-placa.webp"
          alt="Pirâmide Imóveis"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 dark:opacity-20 filter contrast-105 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-440 mx-auto px-6 md:px-12 space-y-12 sm:space-y-16">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          
          <div className="w-full sm:w-fit inline-flex items-center justify-center sm:justify-start py-2 px-8 rounded-tr-full rounded-bl-full bg-primary text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-md">
            <Icon icon="ph:shield-check-fill" className="size-4 mr-2" />
            <span>Tradição, Solidez e Inovação</span>
          </div>

          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase font-heading tracking-tight text-foreground leading-[1.02]">
            45 anos transformando projetos de vida em patrimônio e realidade.
          </h1>

          
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 font-light leading-relaxed max-w-3xl">
            Referência no mercado imobiliário do Vale do Paraíba e Litoral Norte. Conectamos você aos melhores lançamentos, imóveis de alto padrão e oportunidades exclusivas de investimento.
          </p>

          
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/#lancamentos"
              className="px-9 py-4 bg-primary hover:bg-primary/90 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 transition-all shadow-md rounded-none group cursor-pointer"
            >
              <span>Ver Lançamentos</span>
              <Icon icon="ph:arrow-right-bold" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#contato"
              className="px-9 py-4 bg-zinc-200/80 hover:bg-zinc-300/80 dark:bg-white/10 dark:hover:bg-white/15 text-foreground font-mono text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 transition-all rounded-none cursor-pointer border border-zinc-300 dark:border-white/20"
            >
              <span>Falar com um Consultor</span>
            </a>
          </div>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-6 sm:pt-10">
          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground block">
              45<span className="text-primary text-xl sm:text-2xl ml-1 font-mono">Anos</span>
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">
              História e Tradição
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light hidden sm:block">
              Solidez e credibilidade ininterrupta no mercado imobiliário.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground block">
              03<span className="text-primary text-xl sm:text-2xl ml-1 font-mono">Sedes</span>
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">
              Presença Estratégica
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light hidden sm:block">
              Jardim Esplanada, Urbanova e Litoral Norte.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground block">
              100%<span className="text-primary text-xl sm:text-2xl ml-1 font-mono">Suporte</span>
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">
              Assessoria Jurídica
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light hidden sm:block">
              Corpo jurídico e comercial de ponta a ponta.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground block">
              #1<span className="text-primary text-xl sm:text-2xl ml-1 font-mono">Top</span>
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">
              Liderança Regional
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light hidden sm:block">
              Pioneirismo nos maiores lançamentos do Vale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
