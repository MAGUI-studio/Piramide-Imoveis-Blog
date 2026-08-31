"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { VideoModalPlayer } from "@/src/components/blog/VideoModalPlayer";
import { urlForImage } from "@/sanity/lib/image";
import type { ReelItem } from "@/src/types/sanity";

interface VideosGridProps {
  reels: ReelItem[];
}

export function VideosGrid({ reels = [] }: VideosGridProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!reels || reels.length === 0) {
    return (
      <div className="w-full py-16 text-center text-zinc-500 border border-dashed border-zinc-200 dark:border-white/10">
        Nenhum vídeo disponível no momento.
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {reels.map((reel, idx) => {
          const thumbUrl = reel.thumbnail
            ? urlForImage(reel.thumbnail)?.width(600).height(1066).fit("crop").url()
            : null;

          return (
            <div
              key={reel._id}
              onClick={() => setSelectedIdx(idx)}
              className="group/card relative w-full aspect-[9/16] overflow-hidden bg-zinc-900 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              
              {thumbUrl ? (
                <Image
                  src={thumbUrl}
                  alt={reel.title}
                  fill
                  priority={idx < 4}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center select-none pointer-events-none transition-transform duration-700 group-hover/card:scale-105"
                />
              ) : (
                <div className="size-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                  <Icon icon="ph:video-camera-fill" className="size-12" />
                </div>
              )}

              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="size-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/card:scale-115">
                  <Icon icon="ph:play-fill" className="size-6 ml-0.5" />
                </div>
              </div>

              
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1.5 z-10 pointer-events-none">
                {reel.propertyTitle && (
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary line-clamp-1 block">
                    {reel.propertyTitle}
                  </span>
                )}
                <h4 className="font-heading font-black text-sm sm:text-base uppercase text-white leading-tight line-clamp-2">
                  {reel.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      
      <VideoModalPlayer
        reels={reels}
        selectedIdx={selectedIdx}
        onClose={() => setSelectedIdx(null)}
        onSelectIdx={setSelectedIdx}
      />
    </div>
  );
}
