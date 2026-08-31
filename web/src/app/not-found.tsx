import Link from "next/link";
import { Icon } from "@iconify/react";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";

export default function NotFound() {
  const breadcrumbItems = [{ label: "404 - Não Encontrado" }];

  const navigationLinks = [
    {
      title: "Página Inicial",
      description: "Acesse os artigos em destaque e as principais análises do mercado imobiliário.",
      href: "/",
      icon: "ph:house-bold",
    },
    {
      title: "Todos os Artigos",
      description: "Explore o acervo completo de matérias com filtros por bairro, tema e data.",
      href: "/artigos",
      icon: "ph:newspaper-bold",
    },
    {
      title: "Tours & Vídeos",
      description: "Assista a tours virtuais e apresentações exclusivas dos imóveis da região.",
      href: "/videos",
      icon: "ph:video-camera-bold",
    },
    {
      title: "Lançamentos",
      description: "Empreendimentos de alto padrão, condomínios fechados e bairros planejados.",
      href: "/lancamentos",
      icon: "ph:buildings-bold",
    },
    {
      title: "Categorias",
      description: "Explore temas como financiamento, decoração, investimentos e arquitetura.",
      href: "/categorias",
      icon: "ph:squares-four-bold",
    },
    {
      title: "Cidades & Regiões",
      description: "Guias dos principais bairros de São José dos Campos, Vale do Paraíba e Litoral.",
      href: "/cidades",
      icon: "ph:map-pin-bold",
    },
  ];

  return (
    <div className="w-full px-6 pt-6 pb-16 sm:pb-24 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />

      <PageHeroHeader
        badge="Erro 404"
        badgeIcon="ph:warning-circle-fill"
        title="Página Não Encontrada"
        description="O artigo, categoria ou página que você procurou pode ter sido alterado, renomeado ou não existe mais no acervo da Pirâmide Imóveis."
        meta="Código de Erro: 404 • URL Não Localizada"
      />

      
      <div className="w-full space-y-3">
        <label htmlFor="search-input" className="block text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
          Buscar no Acervo do Blog:
        </label>
        <form action="/busca" method="GET" className="relative w-full">
          <input
            id="search-input"
            type="text"
            name="q"
            placeholder="Digite palavras-chave (ex: Urbanova, Financiamento, Lançamentos, Aquarius...)"
            className="w-full h-13 pl-12 pr-32 bg-transparent border-b-2 border-zinc-300 dark:border-zinc-700 focus:border-primary text-foreground text-base sm:text-lg font-mono outline-none transition-colors rounded-none placeholder:text-muted-foreground/60 placeholder:text-sm"
          />
          <Icon
            icon="ph:magnifying-glass-bold"
            className="absolute left-1 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none"
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </form>
      </div>

      
      <div className="w-full space-y-6 pt-4">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground block">
          Navegue pelas principais seções do blog:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block space-y-1.5 p-4 rounded-xs border border-zinc-200/80 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-primary transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
                <Icon icon={item.icon} className="size-4 text-primary shrink-0" />
                <h3 className="text-sm sm:text-base font-bold font-heading uppercase tracking-tight">
                  {item.title}
                </h3>
                <Icon icon="ph:arrow-right-bold" className="size-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto" />
              </div>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
