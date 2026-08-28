"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/sanity/lib/image";
import type { CategoryRef } from "@/src/types/sanity";

interface CategoryShowcaseProps {
  categories: CategoryRef[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [draggedDistance, setDraggedDistance] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !categories || categories.length === 0) return;
    const singleSetWidth = el.scrollWidth / 4;
    if (singleSetWidth > 0 && el.scrollLeft === 0) {
      el.scrollLeft = singleSetWidth;
    }
  }, [categories]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 4;
    if (singleSetWidth === 0) return;

    if (el.scrollLeft >= singleSetWidth * 2.5) {
      el.scrollLeft -= singleSetWidth;
    } else if (el.scrollLeft <= singleSetWidth * 0.5) {
      el.scrollLeft += singleSetWidth;
    }
  }, []);

  if (!categories || categories.length === 0) return null;

  const infiniteCategories = [...categories, ...categories, ...categories, ...categories];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setDraggedDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    containerRef.current.scrollLeft = scrollLeft - walk;
    setDraggedDistance((prev) => prev + Math.abs(x - startX));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (draggedDistance > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="w-full overflow-x-clip">
      
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-2 pr-0 select-none cursor-grab active:cursor-grabbing"
      >
        {infiniteCategories.map((cat, index) => {
          if (!cat.slug?.current) return null;
          const imageUrl = cat.image
            ? urlForImage(cat.image)?.width(700).height(500).fit("crop").url()
            : null;

          return (
            <Link
              key={`${cat._id}-${index}`}
              href={`/categoria/${cat.slug.current}`}
              onClickCapture={handleClickCapture}
              draggable={false}
              className="group relative shrink-0 w-[270px] sm:w-[320px] md:w-[360px] aspect-[4/3] overflow-hidden rounded-none border border-zinc-200 dark:border-white/10 bg-card flex flex-col justify-end p-6 hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-300 cursor-grab active:cursor-grabbing"
            >
              
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={cat.title}
                  fill
                  draggable={false}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  sizes="360px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />
              )}

              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              
              <div className="relative z-10 space-y-2 text-white pointer-events-none">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-none bg-primary text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                    {cat.postCount || 0} {cat.postCount === 1 ? "Artigo" : "Artigos"}
                  </span>
                  <Icon
                    icon="ph:arrow-up-right-bold"
                    className="size-4 text-white/70 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />
                </div>

                <h3 className="text-xl font-bold font-heading uppercase text-white leading-tight">
                  {cat.title}
                </h3>

                {cat.description && (
                  <p className="text-xs text-white/75 font-light line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
