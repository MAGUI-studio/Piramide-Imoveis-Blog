"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ScrollTopLink } from "@/src/components/common/ScrollTopLink";
import { openPrivacyModal } from "@/src/components/common/PrivacyModal";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
    {
      label: "Portal Oficial",
      href: "https://www.piramideimoveissjc.com.br/",
      icon: "ph:globe-bold",
    },
  ];

  return (
    <footer className="relative w-full bg-[#161616] text-zinc-400 py-16 sm:py-20 px-6 md:px-12 border-t border-zinc-800 transition-colors overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      
      <div className="absolute -bottom-6 inset-x-0 flex justify-center pointer-events-none overflow-hidden select-none">
        <span className="text-7xl sm:text-9xl lg:text-[140px] font-black uppercase tracking-tighter text-white/[0.03] font-heading whitespace-nowrap leading-none">
          PIRÂMIDE IMÓVEIS
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-440 mx-auto space-y-12 sm:space-y-16"
      >
        
        <div className="pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <span className="text-xs text-zinc-300 font-medium leading-relaxed">
              Conteúdo exclusivo e atualizado sobre o mercado imobiliário do Vale do Paraíba e Litoral Norte
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 shrink-0 self-start md:self-auto">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white hover:text-primary transition-colors duration-300 cursor-pointer group"
              >
                <Icon
                  icon={social.icon}
                  className="size-[22px] transition-transform group-hover:scale-110 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <a
                href="https://www.piramideimoveissjc.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center transition-opacity hover:opacity-90"
              >
                <Image
                  src="/logos/piramide/logo_white.svg"
                  alt="Pirâmide Imóveis"
                  width={280}
                  height={70}
                  className="h-14 sm:h-18 w-auto object-contain"
                />
              </a>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-md">
              Mais de 40 anos de tradição, credibilidade e excelência no mercado imobiliário de São José dos Campos e região.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-zinc-900 border border-zinc-800 text-xs">
              <span className="font-mono font-bold text-primary">
                CRECI 3787-J
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-zinc-300 font-medium">
                Imobiliária Oficial
              </span>
            </div>
          </div>

          
          <div className="md:col-span-3 lg:col-span-2 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                  <span>Todos os Artigos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                  <span>Categorias</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cidades"
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                  <span>Cidades</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/autores"
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                  <span>Autores</span>
                </Link>
              </li>
            </ul>
          </div>

          
          <div className="md:col-span-3 lg:col-span-2 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
              Pirâmide Imóveis
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <a
                  href="https://www.piramideimoveissjc.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                  <span>Buscar Imóveis</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.piramideimoveissjc.com.br/sobre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                  <span>Sobre a Pirâmide</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5512991599801"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                  <span>Fale Conosco</span>
                </a>
              </li>
            </ul>
          </div>

          
          <div className="md:col-span-7 lg:col-span-4 space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
              Sede Principal
            </h4>
            <div className="space-y-3.5 text-xs font-light">
              <div className="flex items-start gap-2.5">
                <Icon icon="ph:map-pin-fill" className="text-primary shrink-0 mt-0.5 size-4" />
                <span className="leading-relaxed text-zinc-300">
                  Av. São João, 1301 - Jardim Esplanada, São José dos Campos - SP, 12242-840
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Icon icon="ph:clock-fill" className="text-primary shrink-0 mt-0.5 size-4" />
                <div className="space-y-0.5 text-zinc-300 font-mono">
                  <p>Segunda a Sexta: 08h às 18h</p>
                  <p className="text-zinc-400">Sábado: 09h às 13h</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                  <Icon icon="ph:buildings-fill" className="text-primary size-3.5" />
                  <span>Outras Unidades:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="https://www.google.com/search?q=Pir%C3%A2mide+im%C3%B3veis+unidade+Urbanova+SJC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>Unidade Urbanova</span>
                    <Icon icon="ph:magnifying-glass-bold" className="text-zinc-500 size-3" />
                  </a>
                  <a
                    href="https://www.google.com/search?q=Pir%C3%A2mide+im%C3%B3veis+unidade+caraguatatuba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>Unidade Litoral</span>
                    <Icon icon="ph:magnifying-glass-bold" className="text-zinc-500 size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="pt-8 border-t border-zinc-800 space-y-6">
          <p className="text-xs text-zinc-500 leading-relaxed font-light text-center mx-auto max-w-2xl">
            As informações contidas nos artigos do blog são de caráter informativo e podem sofrer alterações conforme as atualizações da legislação e do mercado imobiliário.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left pt-4 border-t border-zinc-900">
            <p>© {currentYear} Pirâmide Imóveis. Todos os direitos reservados.</p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openPrivacyModal()}
                className="text-zinc-400 hover:text-primary transition-colors cursor-pointer"
              >
                Privacidade & Termos (LGPD)
              </button>
              <span className="text-white/24">|</span>
              <ScrollTopLink className="text-white transition-colors hover:text-primary cursor-pointer inline-flex items-center gap-1 font-medium">
                <span>Voltar ao topo</span>
                <Icon icon="ph:caret-up-bold" className="size-3.5 shrink-0" />
              </ScrollTopLink>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
