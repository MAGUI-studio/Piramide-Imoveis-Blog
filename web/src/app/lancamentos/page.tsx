import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { getBaseUrl } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Lançamentos Imobiliários | Pirâmide Imóveis",
  description:
    "Conheça os principais lançamentos e empreendimentos imobiliários no Vale do Paraíba e Litoral Norte: Parque Una, Le Monde, Amarílis, YVY Aquarius, Easy Home e Blue View.",
  alternates: {
    canonical: "/lancamentos",
  },
  openGraph: {
    title: "Lançamentos Imobiliários | Pirâmide Imóveis",
    description:
      "Empreendimentos de alto padrão, loteamentos fechados e lançamentos exclusivos selecionados pela Pirâmide Imóveis.",
    url: "/lancamentos",
  },
};

interface LaunchItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  tag: string;
}

const launches: LaunchItem[] = [
  {
    id: "parque-una",
    title: "Parque Una São José dos Campos",
    description:
      "Bairro planejado completo com praças, lagos, lazer e infraestrutura de classe mundial em São José dos Campos.",
    image: "/banners/banner-parque-una.webp",
    href: "https://parqueuna.piramideimoveissjc.com.br/pt",
    tag: "Bairro Planejado",
  },
  {
    id: "le-monde",
    title: "Residencial Le Monde",
    description:
      "Alto padrão, sofisticação e localização privilegiada no melhor ponto da cidade, com plantas generosas e acabamentos nobres.",
    image: "/banners/banner-le-monde.webp",
    href: "https://www.piramideimoveissjc.com.br/",
    tag: "Alto Padrão",
  },
  {
    id: "amarilis",
    title: "Residencial Amarílis",
    description:
      "Conforto, segurança e área de lazer completa pensada para o bem-estar e convivência da sua família.",
    image: "/banners/banner-amarilis.webp",
    href: "https://www.piramideimoveissjc.com.br/",
    tag: "Residencial",
  },
  {
    id: "yvy",
    title: "YVY Aquarius",
    description:
      "Design moderno, sustentabilidade e tecnologia em um dos bairros mais valorizados e desejados da região.",
    image: "/banners/banner-YVY.webp",
    href: "https://www.piramideimoveissjc.com.br/",
    tag: "Aquarius",
  },
  {
    id: "easy-home",
    title: "Easy Home",
    description:
      "Praticidade, inovação e plantas inteligentes projetadas especialmente para o estilo de vida contemporâneo.",
    image: "/banners/banner-easy-home.webp",
    href: "https://www.piramideimoveissjc.com.br/",
    tag: "Lançamento",
  },
  {
    id: "blue-view",
    title: "Blue View",
    description:
      "Vistas deslumbrantes, arquitetura diferenciada e acabamentos de altíssima qualidade com lazer exclusivo.",
    image: "/banners/banner-blue-view.webp",
    href: "https://www.piramideimoveissjc.com.br/",
    tag: "Exclusividade",
  },
];

export default function LancamentosPage() {
  const baseUrl = getBaseUrl();

  const launchesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lançamentos Imobiliários | Pirâmide Imóveis",
    description:
      "Explore os principais lançamentos e empreendimentos imobiliários no Vale do Paraíba e Litoral Norte.",
    url: `${baseUrl}/lancamentos`,
  };

  const breadcrumbsItems = [{ label: "Lançamentos" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(launchesJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Empreendimentos & Oportunidades"
          badgeIcon="ph:buildings-fill"
          title="Lançamentos Imobiliários"
          description="Explore os principais lançamentos, loteamentos e condomínios de alto padrão selecionados pela equipe da Pirâmide Imóveis no Vale do Paraíba e Litoral Norte."
          meta={`${launches.length} ${launches.length === 1 ? "empreendimento disponível" : "empreendimentos disponíveis"}`}
        />

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {launches.map((launch, idx) => (
            <article
              key={launch.id}
              className="group flex flex-col bg-transparent space-y-4 transition-all duration-300 overflow-hidden h-full"
            >
              
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <a
                  href={launch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block size-full relative"
                  aria-label={launch.title}
                >
                  <Image
                    src={launch.image}
                    alt={launch.title}
                    fill
                    priority={idx < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                
                <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap z-10 pointer-events-none">
                  <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-flex items-center gap-1.5 border-none">
                    <Icon icon="ph:buildings-bold" className="size-3 text-white" />
                    <span>{launch.tag}</span>
                  </span>
                </div>
              </div>

              
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <a
                    href={launch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group/title"
                  >
                    <h3 className="font-heading font-black text-lg sm:text-xl uppercase text-zinc-900 dark:text-white group-hover/title:text-primary transition-colors leading-tight line-clamp-2">
                      {launch.title}
                    </h3>
                  </a>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light line-clamp-3 leading-relaxed">
                    {launch.description}
                  </p>
                </div>

                
                <div className="pt-1">
                  <a
                    href={launch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Conhecer Empreendimento</span>
                    <Icon icon="ph:arrow-right-bold" className="size-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
