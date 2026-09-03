import { Icon } from "@iconify/react";

interface PropertySearchBannerProps {
  className?: string;
}

export function PropertySearchBanner({ className = "" }: PropertySearchBannerProps) {
  return (
    <section
      aria-label="Encontre seu imóvel na Pirâmide Imóveis"
      className={`w-full ${className}`}
    >
      <div className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 lg:gap-12 items-end">
          
          <div className="md:col-span-6 lg:col-span-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase font-heading tracking-tight text-foreground leading-tight max-w-md lg:max-w-lg">
              Está procurando imóveis para comprar ou alugar?
            </h2>
          </div>

          
          <div className="md:col-span-6 lg:col-span-6 flex justify-start md:justify-end">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Acesse nosso portal oficial e encontre milhares de opções de apartamentos, casas, terrenos, imóveis comerciais e lançamentos para comprar ou alugar em São José dos Campos e região.
            </p>
          </div>
        </div>

        
        <div>
          <a
            href="https://www.piramideimoveissjc.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn w-full py-3.5 sm:py-4 px-6 bg-primary hover:bg-primary/90 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer text-center"
          >
            <span>Ver Imóveis à Venda</span>
            <Icon
              icon="ph:arrow-up-right-bold"
              className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}



