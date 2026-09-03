"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { CategoryCard } from "@/src/components/blog/CategoryCard";
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

  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    return [...categories].sort((a, b) => (b.postCount ?? 0) - (a.postCount ?? 0));
  }, [categories]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !sortedCategories || sortedCategories.length === 0) return;
    const singleSetWidth = el.scrollWidth / 4;
    if (singleSetWidth > 0 && el.scrollLeft === 0) {
      el.scrollLeft = singleSetWidth;
    }
  }, [sortedCategories]);

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

  if (!sortedCategories || sortedCategories.length === 0) return null;

  const infiniteCategories = [
    ...sortedCategories,
    ...sortedCategories,
    ...sortedCategories,
    ...sortedCategories,
  ];

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
    <section id="categorias" className="relative w-full overflow-x-clip scroll-mt-24 sm:scroll-mt-28">
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#F1F1F1] dark:from-[#161616] to-transparent z-10 opacity-75" />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-2 pr-0 select-none cursor-grab active:cursor-grabbing"
      >
        {infiniteCategories.map((cat, index) => (
          <CategoryCard
            key={`${cat._id}-${index}`}
            category={cat}
            onClickCapture={handleClickCapture}
            draggable={false}
            className="shrink-0 w-[270px] sm:w-[320px] md:w-[360px]"
          />
        ))}
      </div>
    </section>
  );
}
