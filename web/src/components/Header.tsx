"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/src/components/common/themeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet/sheet";
import { ScrollArea } from "@/src/components/ui/scrollArea/scrollArea";
import { urlForImage } from "@/sanity/lib/image";
import type { CategoryRef } from "@/src/types/sanity";

interface HeaderProps {
  categories?: CategoryRef[];
}

export function Header({ categories = [] }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < 60) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false);
        setIsCategoriesOpen(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/piramideimoveis",
      icon: "ph:instagram-logo-bold",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@piramideimoveis9390/featured",
      icon: "ph:youtube-logo-bold",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/piramide-im%C3%B3veis-queops-ltda",
      icon: "ph:linkedin-logo-bold",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/imobiliariapiramide",
      icon: "ph:facebook-logo-bold",
    },
  ];

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 250);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setSearchQuery("");
    router.push(`/busca?q=${encodeURIComponent(query)}`);
    setIsMobileOpen(false);
    setIsCategoriesOpen(false);
  };

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = document.getElementById("header-search-input");
        if (input) input.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        y: isVisible ? 0 : "-100%",
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        isScrolled
          ? "bg-[#F8F9FA] dark:bg-[#141414] shadow-md border-b border-zinc-200/80 dark:border-white/10"
          : "bg-[#F8F9FA] dark:bg-[#141414] border-b border-zinc-200/80 dark:border-white/10 shadow-2xs"
      }`}
    >
      
      <div className="w-full bg-white dark:bg-[#111111] border-b border-zinc-200/80 dark:border-white/10 px-6 sm:px-10 md:px-14 lg:px-20 py-2.5 text-[11px] font-mono flex items-center justify-between text-muted-foreground transition-colors">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-foreground font-bold uppercase tracking-wider">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Pirâmide Editorial
          </span>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
          <span className="hidden sm:inline font-light text-zinc-600 dark:text-zinc-400">
            Mercado Imobiliário, Análises & Tendências
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.piramideimoveissjc.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors flex items-center gap-1 font-bold tracking-wide"
          >
            <span>Ver Imóveis à Venda</span>
            <Icon icon="ph:arrow-up-right-bold" className="size-3.5 text-primary" />
          </a>
        </div>
      </div>

      
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-4 flex items-center justify-between gap-6">
        
        <div className="flex items-center gap-6 shrink-0">
          <Link
            href="/"
            aria-label="Ir para a página inicial do Blog Pirâmide Imóveis"
            className="flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/logos/piramide/logo_black.svg"
              alt="Pirâmide Imóveis"
              width={220}
              height={55}
              priority
              className="h-10 sm:h-12 w-auto object-contain dark:hidden"
            />
            <Image
              src="/logos/piramide/logo_white.svg"
              alt="Pirâmide Imóveis"
              width={220}
              height={55}
              priority
              className="h-10 sm:h-12 w-auto object-contain hidden dark:block"
            />
          </Link>
        </div>

        
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
          <Link
            href="/"
            className="px-4 py-2 rounded-xs text-zinc-700 dark:text-zinc-300 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-white/5 font-bold uppercase tracking-wider transition-all"
          >
            Início
          </Link>

          <Link
            href="/sobre-nos"
            className="px-4 py-2 rounded-xs text-zinc-700 dark:text-zinc-300 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-white/5 font-bold uppercase tracking-wider transition-all"
          >
            Sobre Nós
          </Link>

          
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setIsCategoriesOpen((prev) => !prev)}
              aria-expanded={isCategoriesOpen}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                isCategoriesOpen
                  ? "bg-primary text-white shadow-xs"
                  : "text-zinc-700 dark:text-zinc-300 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-white/5"
              }`}
            >
              <Icon icon="ph:squares-four-bold" className="size-3.5" />
              <span>Categorias</span>
              <Icon
                icon="ph:caret-down-bold"
                className={`size-3 transition-transform duration-300 ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            
            <AnimatePresence>
              {isCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.97, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(2px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-2 w-[660px] bg-white dark:bg-[#181818] border border-zinc-200 dark:border-white/10 p-6 shadow-2xl z-50 rounded-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-3">
                    <div>
                      <h4 className="font-heading font-black text-sm uppercase text-foreground">
                        Explorar por Temas
                      </h4>
                      <p className="font-sans text-xs text-muted-foreground font-light">
                        Artigos e análises selecionados por especialistas
                      </p>
                    </div>

                    <span className="px-2 py-0.5 rounded-xs bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                      {categories.length} Categorias
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 8).map((cat, idx) => {
                      if (!cat.slug?.current) return null;
                      const imageUrl = cat.image
                        ? urlForImage(cat.image)?.width(200).height(200).fit("crop").url()
                        : null;

                      return (
                        <motion.div
                          key={cat._id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: idx * 0.02,
                            ease: "easeOut",
                          }}
                        >
                          <Link
                            href={`/categoria/${cat.slug.current}`}
                            onClick={() => setIsCategoriesOpen(false)}
                            className="group relative flex items-stretch h-[76px] rounded-xs bg-zinc-50/90 dark:bg-zinc-900/60 hover:bg-primary dark:hover:bg-primary border border-zinc-200/60 dark:border-white/5 hover:border-primary transition-all duration-200 overflow-hidden"
                          >
                            <div className="w-24 shrink-0 relative overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                              {imageUrl ? (
                                <Image
                                  src={imageUrl}
                                  alt={cat.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="flex size-full items-center justify-center bg-primary/10 text-primary">
                                  <Icon icon="ph:buildings-bold" className="size-5" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 p-2.5 flex flex-col justify-center min-w-0 pr-3">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-heading font-bold text-xs uppercase text-zinc-900 dark:text-white group-hover:text-white transition-colors truncate">
                                  {cat.title}
                                </span>
                                <Icon
                                  icon="ph:arrow-right-bold"
                                  className="size-3 text-muted-foreground group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                                />
                              </div>
                              {cat.description && (
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 group-hover:text-white/80 line-clamp-1 font-light leading-snug mt-0.5">
                                  {cat.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {categories.length > 8 && (
                    <div className="pt-3 border-t border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-light">
                        Exibindo 8 de {categories.length} categorias
                      </span>
                      <Link
                        href="/categorias"
                        onClick={() => setIsCategoriesOpen(false)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors rounded-xs shadow-xs"
                      >
                        <span>Ver todas as categorias</span>
                        <Icon icon="ph:arrow-right-bold" className="size-3.5" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/#lancamentos"
            className="px-4 py-2 rounded-xs text-zinc-700 dark:text-zinc-300 hover:text-foreground hover:bg-zinc-200/60 dark:hover:bg-white/5 font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
          >
            <span>Lançamentos</span>
            <span className="px-1.5 py-0.2 rounded-xs bg-primary text-white text-[9px] font-bold">
              Novos
            </span>
          </Link>
        </nav>

        
        <div className="flex items-center gap-3.5 shrink-0">
          
          <form
            onSubmit={handleSearchSubmit}
            className={`relative hidden sm:flex items-center transition-all duration-300 ${
              isSearchFocused ? "w-64 md:w-80" : "w-48 md:w-60"
            }`}
          >
            <input
              id="header-search-input"
              type="text"
              placeholder="Pesquisar artigos..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-12 rounded-xs bg-white dark:bg-zinc-900 border border-zinc-300/80 dark:border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 font-mono transition-all shadow-2xs"
            />
            <Icon
              icon="ph:magnifying-glass-bold"
              className="absolute left-3 size-3.5 text-muted-foreground pointer-events-none"
            />
            <kbd className="absolute right-2 top-2 px-1.5 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[9px] font-mono font-semibold text-muted-foreground pointer-events-none">
              ⌘K
            </kbd>
          </form>

          
          <div className="hidden xl:flex items-center gap-2.5 pl-2 pr-3 border-r border-zinc-300 dark:border-white/10">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="size-8 rounded-xs hover:bg-zinc-200/60 dark:hover:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all cursor-pointer"
              >
                <Icon icon={social.icon} className="size-4" />
              </a>
            ))}
          </div>

          
          <ThemeToggle isDarkOverlay={false} />

          
          <div className="lg:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir Menu Lateral"
                  className="p-2 rounded-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Icon icon="ph:list-bold" className="size-5" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" backdrop="blur" className="p-6">
                <SheetHeader className="pb-4 border-b border-zinc-200 dark:border-white/10">
                  <SheetTitle className="flex items-center gap-3">
                    <Image
                      src="/logos/piramide/logo_black.svg"
                      alt="Pirâmide Imóveis"
                      width={140}
                      height={35}
                      className="h-8 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src="/logos/piramide/logo_white.svg"
                      alt="Pirâmide Imóveis"
                      width={140}
                      height={35}
                      className="h-8 w-auto object-contain hidden dark:block"
                    />
                  </SheetTitle>
                </SheetHeader>

                
                <form onSubmit={handleSearchSubmit} className="relative w-full my-2">
                  <input
                    type="text"
                    placeholder="Pesquisar artigos ou cidades..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xs bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 text-xs text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary"
                  />
                  <Icon
                    icon="ph:magnifying-glass-bold"
                    className="absolute left-3 top-3 size-4 text-muted-foreground"
                  />
                </form>

                
                <ScrollArea className="flex-1 pr-3 -mr-3">
                  <div className="space-y-4 pb-4">
                    <div className="space-y-1">
                      <Link
                        href="/"
                        onClick={() => setIsMobileOpen(false)}
                        className="block p-2.5 rounded-xs font-heading font-bold text-sm uppercase text-foreground hover:bg-primary hover:text-white transition-colors"
                      >
                        Início
                      </Link>
                      <Link
                        href="/sobre-nos"
                        onClick={() => setIsMobileOpen(false)}
                        className="block p-2.5 rounded-xs font-heading font-bold text-sm uppercase text-foreground hover:bg-primary hover:text-white transition-colors"
                      >
                        Sobre Nós
                      </Link>
                      <Link
                        href="/categorias"
                        onClick={() => setIsMobileOpen(false)}
                        className="block p-2.5 rounded-xs font-heading font-bold text-sm uppercase text-foreground hover:bg-primary hover:text-white transition-colors"
                      >
                        Categorias
                      </Link>
                      <Link
                        href="/cidades"
                        onClick={() => setIsMobileOpen(false)}
                        className="block p-2.5 rounded-xs font-heading font-bold text-sm uppercase text-foreground hover:bg-primary hover:text-white transition-colors"
                      >
                        Cidades
                      </Link>
                      <Link
                        href="/autores"
                        onClick={() => setIsMobileOpen(false)}
                        className="block p-2.5 rounded-xs font-heading font-bold text-sm uppercase text-foreground hover:bg-primary hover:text-white transition-colors"
                      >
                        Autores
                      </Link>
                      <Link
                        href="/#lancamentos"
                        onClick={() => setIsMobileOpen(false)}
                        className="block p-2.5 rounded-xs font-heading font-bold text-sm uppercase text-foreground hover:bg-primary hover:text-white transition-colors"
                      >
                        Lançamentos
                      </Link>
                    </div>

                    
                    <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/10">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block">
                        Categorias ({categories.length})
                      </span>

                      <div className="space-y-2">
                        {categories.map((cat) => {
                          if (!cat.slug?.current) return null;
                          const imageUrl = cat.image
                            ? urlForImage(cat.image)?.width(160).height(160).fit("crop").url()
                            : null;

                          return (
                            <Link
                              key={cat._id}
                              href={`/categoria/${cat.slug.current}`}
                              onClick={() => setIsMobileOpen(false)}
                              className="group relative flex items-stretch h-[68px] rounded-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/5 hover:border-primary overflow-hidden transition-colors"
                            >
                              
                              <div className="w-20 shrink-0 relative overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                                {imageUrl ? (
                                  <Image
                                    src={imageUrl}
                                    alt={cat.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex size-full items-center justify-center bg-primary/10 text-primary">
                                    <Icon icon="ph:buildings-bold" className="size-5" />
                                  </div>
                                )}
                              </div>

                              
                              <div className="flex-1 p-2.5 flex items-center justify-between min-w-0 pr-3">
                                <span className="font-heading font-bold text-xs uppercase text-foreground group-hover:text-primary transition-colors truncate">
                                  {cat.title}
                                </span>
                                <Icon
                                  icon="ph:arrow-right-bold"
                                  className="size-3.5 text-muted-foreground group-hover:text-primary shrink-0 ml-2"
                                />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                
                <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between shrink-0">
                  <span className="font-mono text-xs font-bold text-muted-foreground uppercase">
                    Redes Sociais
                  </span>
                  <div className="flex items-center gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="p-2 rounded-xs border border-zinc-200 dark:border-zinc-800 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        <Icon icon={social.icon} className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
