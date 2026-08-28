"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";
import { calculateReadingTime } from "@/src/lib/blog-utils";
import { ScrollArea } from "@/src/components/ui/scrollArea/scrollArea";
import type { PostItem } from "@/src/types/sanity";

interface HeroCarouselProps {
  posts: PostItem[];
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

const AUTOPLAY_DURATION = 8; 

export function HeroCarousel({ posts = [] }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(AUTOPLAY_DURATION);

  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = posts.length;

  const handleSelectPost = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setTimeLeft(AUTOPLAY_DURATION);
  }, []);

  
  useEffect(() => {
    if (total <= 1) return;

    let seconds = AUTOPLAY_DURATION;

    const interval = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        clearInterval(interval);
        setCurrentIndex((prev) => (prev + 1) % total);
      } else {
        setTimeLeft(seconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, total]);

  
  useEffect(() => {
    const activeCard = cardRefs.current[currentIndex];
    if (activeCard) {
      activeCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [currentIndex]);

  if (total === 0) return null;

  const currentPost = posts[currentIndex] || posts[0];
  if (!currentPost || !currentPost.slug?.current) return null;

  const readingTime = calculateReadingTime(currentPost.body);
  const imageUrl = currentPost.mainImage
    ? urlForImage(currentPost.mainImage)?.width(2000).height(1200).fit("crop").url()
    : null;

  const marqueeItems = [
    {
      number: "01",
      title: currentPost.highlight1Title || "Mercado Imobiliário",
      description: currentPost.highlight1Description || "Análises de valorização e tendências em São José dos Campos",
    },
    {
      number: "02",
      title: currentPost.highlight2Title || "Crédito & Financiamento",
      description: currentPost.highlight2Description || "Planejamento e estratégias para economizar nos juros",
    },
    {
      number: "03",
      title: currentPost.highlight3Title || "Imóveis de Alto Padrão",
      description: currentPost.highlight3Description || "Arquitetura autoral e os bairros mais nobres da região",
    },
  ];

  const tickerList = [
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ];

  const authorLink = currentPost.author?.slug?.current
    ? `/autor/${currentPost.author.slug.current}`
    : "#";

  const hasSideMenu = total > 1;

  return (
    <section className="relative w-full overflow-hidden bg-black text-white select-none flex flex-col justify-between p-0 m-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] items-stretch p-0 m-0">
        
        <div
          className={`${
            hasSideMenu
              ? "lg:col-span-8 xl:col-span-8 2xl:col-span-9 border-b lg:border-b-0 lg:border-r border-white/10"
              : "lg:col-span-12"
          } relative overflow-hidden bg-zinc-950 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 min-h-[480px] lg:min-h-full`}
        >
          
          <div className="absolute inset-0 size-full pointer-events-none z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPost._id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 size-full"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={(typeof currentPost.mainImage === "object" && currentPost.mainImage?.alt) || currentPost.title}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                  />
                ) : (
                  <div className="size-full bg-zinc-950" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          
          <div className="relative z-10 space-y-4 sm:space-y-6 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPost._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-3 sm:space-y-4 w-full"
              >
                
                <div className="flex flex-wrap items-center gap-3">
                  {currentPost.categories?.[0] && (
                    <Link
                      href={`/categoria/${currentPost.categories[0].slug?.current || ""}`}
                      className="px-4 py-1.5 rounded-tr-3xl rounded-bl-3xl bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-md"
                    >
                      {currentPost.categories[0].title}
                    </Link>
                  )}

                  {currentPost.city && (
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-white inline-flex items-center gap-1.5">
                      <Icon icon="ph:map-pin-fill" className="size-3.5 text-white" />
                      {currentPost.city.name}
                    </span>
                  )}

                  <div className="flex items-center gap-3 text-xs font-mono text-white/90">
                    <span className="flex items-center gap-1.5">
                      <Icon icon="ph:calendar-blank-bold" className="size-3.5 text-white" />
                      <span>{formatDate(currentPost.publishedAt)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Icon icon="ph:clock-bold" className="size-3.5 text-white" />
                      <span>{readingTime} min de leitura</span>
                    </span>
                  </div>
                </div>

                
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black font-heading uppercase tracking-tight text-white leading-[1.1] drop-shadow-md max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
                  <Link
                    href={`/posts/${currentPost.slug.current}`}
                    className="transition-opacity hover:opacity-85"
                  >
                    {currentPost.title}
                  </Link>
                </h1>

                
                {currentPost.excerpt && (
                  <p className="text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed max-w-3xl xl:max-w-4xl 2xl:max-w-5xl drop-shadow-sm line-clamp-2 sm:line-clamp-3">
                    {currentPost.excerpt}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            
            <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link href={authorLink} className="group/author flex items-center gap-3 cursor-pointer">
                <div className="size-11 rounded-full bg-white/10 border-2 border-white/30 overflow-hidden relative shrink-0 shadow-md group-hover/author:border-primary transition-all">
                  {currentPost.author?.image ? (
                    <Image
                      src={urlForImage(currentPost.author.image)?.width(88).height(88).url() || ""}
                      alt={currentPost.author.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center font-bold text-sm font-mono text-white">
                      {currentPost.author?.name?.charAt(0) || "P"}
                    </div>
                  )}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white font-heading uppercase tracking-wide group-hover/author:text-primary transition-colors">
                    {currentPost.author?.name || "Redação Pirâmide"}
                  </p>
                  <p className="text-white/70 font-mono text-[11px]">
                    {currentPost.author?.role || "Consultoria Especializada"}
                    {currentPost.author?.creci ? ` • ${currentPost.author.creci}` : ""}
                  </p>
                </div>
              </Link>

              <Link
                href={`/posts/${currentPost.slug.current}`}
                className="group/cta inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary hover:bg-white text-white hover:text-zinc-950 font-mono font-bold text-xs uppercase tracking-widest rounded-none border border-transparent hover:border-white transition-all duration-300 shrink-0 cursor-pointer shadow-lg"
              >
                <span>Ler Artigo Completo</span>
                <Icon
                  icon="ph:arrow-right-bold"
                  className="size-3.5 group-hover/cta:translate-x-1.5 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>

        
        {hasSideMenu && (
          <div className="lg:col-span-4 xl:col-span-4 2xl:col-span-3 flex flex-col justify-between bg-[#161616] p-0 m-0 overflow-hidden">
            <ScrollArea className="h-full max-h-[580px] lg:max-h-[680px] w-full">
              <div className="flex flex-col divide-y divide-white/10">
                {posts.map((post, idx) => {
                  const isActive = idx === currentIndex;
                  const postImageUrl = post.mainImage
                    ? urlForImage(post.mainImage)?.width(700).height(400).fit("crop").url()
                    : null;

                  return (
                    <button
                      key={post._id}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      type="button"
                      onClick={() => handleSelectPost(idx)}
                      className={`group relative w-full text-left p-4 sm:p-5 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[170px] ${
                        isActive
                          ? "bg-[#161616] text-white"
                          : "bg-[#161616] text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      
                      {postImageUrl && (
                        <div className="absolute inset-0 size-full pointer-events-none z-0 overflow-hidden">
                          <Image
                            src={postImageUrl}
                            alt={post.title}
                            fill
                            className={`object-cover grayscale transition-all duration-500 group-hover:scale-105 ${
                              isActive
                                ? "opacity-40 brightness-110"
                                : "opacity-20 group-hover:opacity-30"
                            }`}
                          />
                          <div
                            className={`absolute inset-0 transition-colors ${
                              isActive
                                ? "bg-[#161616]/70 bg-gradient-to-r from-[#161616]/90 to-[#161616]/50"
                                : "bg-[#161616]/85 group-hover:bg-[#161616]/75"
                            }`}
                          />
                        </div>
                      )}

                      
                      <div className="relative z-10 flex items-center justify-between gap-1.5 mb-2">
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 truncate ${
                            isActive ? "text-white font-bold" : "text-zinc-400 group-hover:text-zinc-300 font-medium"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full shrink-0 ${
                              isActive ? "bg-white animate-pulse" : "bg-zinc-600"
                            }`}
                          />
                          {String(idx + 1).padStart(2, "0")} • {post.categories?.[0]?.title || "Destaque"}
                        </span>

                        {isActive && (
                          <span className="text-[10px] font-mono text-white/90 font-bold uppercase tracking-wider shrink-0">
                            {timeLeft}s
                          </span>
                        )}
                      </div>

                      
                      <h3
                        className={`relative z-10 text-xs sm:text-[13px] font-bold uppercase font-heading line-clamp-2 leading-snug transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white font-medium"
                        }`}
                      >
                        {post.title}
                      </h3>

                      
                      <div className="relative z-10 flex items-center justify-end text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300 mt-2">
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>

                      
                      <div className="relative z-10 w-full h-1 bg-white/15 overflow-hidden rounded-none mt-3">
                        {isActive ? (
                          <motion.div
                            key={currentIndex}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: AUTOPLAY_DURATION,
                              ease: "linear",
                            }}
                            className="h-full bg-white rounded-none shadow-xs"
                          />
                        ) : (
                          <div className="h-full bg-transparent" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      
      <div className="relative z-10 w-full border-t border-zinc-200 dark:border-white/10 bg-[#F1F1F1] dark:bg-[#161616] text-zinc-900 dark:text-zinc-100 py-3.5 overflow-hidden transition-colors select-none">
        <div className="flex items-center">
          <motion.div
            className="flex items-center gap-10 whitespace-nowrap shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {tickerList.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 shrink-0"
              >
                <span className="text-xs font-mono font-bold text-primary">
                  {item.number}
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
                  {item.title}
                </span>
                <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 font-sans">
                  — {item.description}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700 ml-6 font-bold text-sm">
                  /
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
