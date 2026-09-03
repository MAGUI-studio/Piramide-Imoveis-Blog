"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useQueryState, parseAsString } from "nuqs";
import { SectionHeader } from "@/src/components/blog/SectionHeader";
import { VideoModalPlayer } from "@/src/components/blog/VideoModalPlayer";
import { urlForImage } from "@/sanity/lib/image";
import { slugifyText } from "@/src/lib/blog-utils";
import type { ReelItem } from "@/src/types/sanity";

interface ReelsSectionProps {
  reels: ReelItem[];
  totalCount?: number;
}

export function ReelsSection({ reels = [] }: ReelsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const totalDragDistanceRef = useRef(0);

  const displayReels = useMemo(() => reels.slice(0, 5), [reels]);

  const [videoParam, setVideoParam] = useQueryState(
    "video",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: true, throttleMs: 50 }),
  );

  const selectedIdx = useMemo(() => {
    if (!videoParam || displayReels.length === 0) return null;
    const cleanParam = videoParam.toLowerCase().trim();
    const matchIndex = displayReels.findIndex((r) => {
      const titleSlug = slugifyText(r.title);
      return titleSlug === cleanParam || r.title.toLowerCase().includes(cleanParam);
    });
    return matchIndex !== -1 ? matchIndex : null;
  }, [videoParam, displayReels]);

  const handleCardClick = (originalIndex: number) => {
    if (totalDragDistanceRef.current > 10) {
      return;
    }
    const targetReel = displayReels[originalIndex];
    if (targetReel) {
      setVideoParam(slugifyText(targetReel.title) || null);
    }
  };

  const handleClose = useCallback(() => {
    setVideoParam(null);
  }, [setVideoParam]);

  const handleSelectIdx = useCallback((idx: number) => {
    const targetReel = displayReels[idx];
    if (targetReel) {
      setVideoParam(slugifyText(targetReel.title) || null);
    }
  }, [displayReels, setVideoParam]);

  
  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.7; 

    const loop = () => {
      const container = scrollContainerRef.current;
      if (container && !isDraggingRef.current) {
        container.scrollLeft += speed;
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!displayReels || displayReels.length === 0) return null;

  
  const infiniteReels = [
    ...displayReels,
    ...displayReels,
    ...displayReels,
    ...displayReels,
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;
    totalDragDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    totalDragDistanceRef.current += Math.abs(walk);
    container.scrollLeft = startScrollLeftRef.current - walk;

    const halfWidth = container.scrollWidth / 2;
    if (halfWidth > 0) {
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
        startScrollLeftRef.current -= halfWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += halfWidth;
        startScrollLeftRef.current += halfWidth;
      }
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;
    totalDragDistanceRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    totalDragDistanceRef.current += Math.abs(walk);
    container.scrollLeft = startScrollLeftRef.current - walk;

    const halfWidth = container.scrollWidth / 2;
    if (halfWidth > 0) {
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
        startScrollLeftRef.current -= halfWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += halfWidth;
        startScrollLeftRef.current += halfWidth;
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="relative w-full py-12 sm:py-16 space-y-6 overflow-hidden border-y border-zinc-200 dark:border-white/10">
      
      <div className="w-full max-w-440 mx-auto px-6">
        <SectionHeader
          eyebrow="Vídeos & Bastidores"
          eyebrowIcon="ph:video-camera-fill"
          title="Tours & Vídeos Exclusivos"
          action={{
            label: "Ver todos os vídeos",
            href: "/videos",
          }}
        />
      </div>

      
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing py-2 select-none no-scrollbar flex items-center"
      >
        <div className="flex items-center gap-4 sm:gap-6 w-max shrink-0">
          {infiniteReels.map((reel, idx) => {
            const originalIndex = idx % displayReels.length;
            const thumbUrl = reel.thumbnail
              ? urlForImage(reel.thumbnail)?.width(500).height(888).fit("crop").url()
              : null;

            return (
              <div
                key={`${reel._id}-${idx}`}
                onClick={() => handleCardClick(originalIndex)}
                className="group/card relative shrink-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[380px] aspect-[9/16] overflow-hidden bg-zinc-900 cursor-pointer shadow-none"
              >
                
                {thumbUrl ? (
                  <Image
                    src={thumbUrl}
                    alt={reel.title}
                    fill
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 380px"
                    className="object-cover object-center select-none pointer-events-none transition-transform duration-700 group-hover/card:scale-105"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                    <Icon icon="ph:video-camera-fill" className="size-10" />
                  </div>
                )}

                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="size-12 sm:size-14 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-xl transition-all duration-300 group-hover/card:scale-115 group-hover/card:bg-black/60 group-hover/card:border-white/40">
                    <Icon icon="ph:play-fill" className="size-5 sm:size-6 ml-0.5 text-white" />
                  </div>
                </div>

                
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 space-y-2 z-10 pointer-events-none">
                  {reel.propertyTitle && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs border-none rounded-none max-w-full">
                      <Icon icon="ph:buildings-fill" className="size-3 text-white shrink-0" />
                      <span className="truncate">{reel.propertyTitle}</span>
                    </div>
                  )}
                  <h4 className="font-heading font-black text-sm sm:text-base uppercase text-white leading-tight line-clamp-2">
                    {reel.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      
      <VideoModalPlayer
        reels={displayReels}
        selectedIdx={selectedIdx}
        onClose={handleClose}
        onSelectIdx={handleSelectIdx}
      />
    </section>
  );
}
