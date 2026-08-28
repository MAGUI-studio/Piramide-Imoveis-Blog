"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";

interface LaunchBanner {
  id: string;
  title: string;
  image: string;
}

const launches: LaunchBanner[] = [
  {
    id: "parque-una",
    title: "Parque Una São José dos Campos",
    image: "/banners/Banner-Una.png",
  },
  {
    id: "le-monde",
    title: "Residencial Le Monde",
    image: "/banners/Banner-Le-Monde.png",
  },
  {
    id: "amarilis",
    title: "Residencial Amarílis",
    image: "/banners/Banner-Amarilis.png",
  },
  {
    id: "yvy",
    title: "YVY Aquarius",
    image: "/banners/Banner-YVY-2.png",
  },
  {
    id: "easy-home",
    title: "Easy Home",
    image: "/banners/Banner-Easy-Home-2.png",
  },
  {
    id: "blue-view",
    title: "Blue View",
    image: "/banners/Blue-View.png",
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
    <section className="relative w-full py-6 sm:py-10 space-y-6 overflow-hidden select-none">
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
        .group-marquee:hover .animate-launches-marquee {
          animation-play-state: paused;
        }
      `}</style>

      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 mb-1">
            <Icon icon="ph:buildings-fill" className="size-3.5" />
            Lançamentos Exclusivos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground font-heading uppercase">
            Conheça Nossos Empreendimentos
          </h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground uppercase">
          Passe o mouse para pausar
        </span>
      </div>

      
      <div className="w-full overflow-hidden group-marquee cursor-grab active:cursor-grabbing pt-2">
        <div className="animate-launches-marquee flex items-center gap-5 sm:gap-7 md:gap-9">
          {infiniteBanners.map((launch, idx) => (
            <div
              key={`${launch.id}-${idx}`}
              className="relative shrink-0 w-[580px] sm:w-[820px] md:w-[1050px] lg:w-[1300px] xl:w-[1500px] h-[240px] sm:h-[320px] md:h-[380px] lg:h-[440px] xl:h-[480px] overflow-hidden rounded-xs bg-zinc-900 border border-zinc-200/50 dark:border-white/10 transition-transform duration-300 hover:scale-[1.01] shadow-sm"
            >
              <Image
                src={launch.image}
                alt={launch.title}
                fill
                priority={idx < 2}
                className="object-cover object-center select-none pointer-events-none"
                sizes="(max-width: 768px) 820px, (max-width: 1200px) 1300px, 1500px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
