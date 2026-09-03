"use client";

import Image from "next/image";
import { SectionHeader } from "@/src/components/blog/SectionHeader";

interface LaunchBanner {
  id: string;
  title: string;
  image: string;
  href: string;
}

const launches: LaunchBanner[] = [
  {
    id: "parque-una",
    title: "Parque Una São José dos Campos",
    image: "/banners/banner-parque-una.webp",
    href: "https://parqueuna.piramideimoveissjc.com.br/pt",
  },
  {
    id: "le-monde",
    title: "Residencial Le Monde",
    image: "/banners/banner-le-monde.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/le-monde-vila-adyana-vila-adyana-sao-jose-dos-campos-sp?cond_id=644692&search_name=Le+Monde+-+Vila+Adyana&localidade=Vila+Adyana%2C+S%C3%A3o+Jos%C3%A9+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes",
  },
  {
    id: "amarilis",
    title: "Residencial Amarílis",
    image: "/banners/banner-amarilis.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/amarilis-urbanova-urbanova-sao-jose-dos-campos-sp?cond_id=635293&search_name=Amar%C3%ADlis+-+Urbanova&localidade=Urbanova%2C+S%C3%A3o+Jos%C3%A9+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes",
  },
  {
    id: "yvy",
    title: "YVY Residences Massaguaçu",
    image: "/banners/banner-YVY.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/yvy-residences-massaguacu-massaguacu-caraguatatuba-sp?cond_id=644732&search_name=Yvy+Residences+-++Massagua%C3%A7u&localidade=Massagua%C3%A7u%2C+Caraguatatuba%2C+SP&toggle_map=true&order=mais_relevantes",
  },
  {
    id: "easy-home",
    title: "Easy Home",
    image: "/banners/banner-easy-home.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/easy-home-jardim-aquarius-jardim-aquarius-sao-jose-dos-campos-sp?cond_id=644953&search_name=Easy+Home+-++Jardim+Aquarius&localidade=Jardim+Aquarius%2C+S%C3%A3o+Jos%C3%A9+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes",
  },
  {
    id: "blue-view",
    title: "Blue View",
    image: "/banners/banner-blue-view.webp",
    href: "https://www.piramideimoveissjc.com.br/imoveis/a-venda/blue-view-vila-industrial-vila-industrial-sao-jose-dos-campos-sp?cond_id=641742&search_name=Blue+View+-++Vila+Industrial&localidade=Vila+Industrial%2C+S%C3%A3o+Jos%C3%A9+dos+Campos%2C+SP&toggle_map=true&order=mais_relevantes",
  },
];

const infiniteBanners = [
  ...launches,
  ...launches,
  ...launches,
  ...launches,
];

export function LaunchesCarousel() {
  return (
    <section
      id="lancamentos"
      className="relative w-full py-6 sm:py-10 space-y-6 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <style>{`
        @keyframes launches-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-launches-marquee {
          display: flex;
          width: max-content;
          animation: launches-marquee 130s linear infinite;
        }
      `}</style>

      
      <SectionHeader
        eyebrow="Lançamentos Exclusivos"
        eyebrowIcon="ph:buildings-fill"
        title="Conheça Nossos Empreendimentos"
        action={{
          label: "Ver Todos os Lançamentos",
          href: "/lancamentos",
        }}
      />

      
      <div className="w-full overflow-hidden pt-2 select-none">
        <div className="animate-launches-marquee flex items-center gap-4 sm:gap-5 md:gap-6">
          {infiniteBanners.map((launch, idx) => (
            <a
              key={`${launch.id}-${idx}`}
              href={launch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 w-[200px] sm:w-[260px] md:w-[300px] lg:w-[320px] xl:w-[350px] aspect-square overflow-hidden bg-zinc-900 transition-transform duration-300 hover:scale-[1.02] block cursor-pointer"
              title={`Conhecer ${launch.title}`}
            >
              <Image
                src={launch.image}
                alt={launch.title}
                fill
                priority={idx < 6}
                className="object-cover object-center select-none pointer-events-none"
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 350px"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
