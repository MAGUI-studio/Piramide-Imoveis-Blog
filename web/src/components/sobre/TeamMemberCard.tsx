"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/src/types/sanity";

export interface TeamMember {
  name: string;
  role: string;
  tier?: string;
  order?: number;
  creci?: string;
  image?: SanityImage;
  email?: string;
  whatsapps?: { label: string; url: string }[];
  instagram?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  priority?: boolean;
  isSquare?: boolean;
}

export function TeamMemberCard({
  member,
  priority = false,
  isSquare = true,
}: TeamMemberCardProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  let imageUrl: string | null = null;
  if (typeof member.image === "string") {
    imageUrl = member.image;
  } else if (member.image) {
    imageUrl = urlForImage(member.image)?.width(800).height(800).url() || null;
  }

  const isPlaceholder = !imageUrl || imageUrl.includes("placeholder");
  const hasContacts = Boolean(
    member.email ||
      (member.whatsapps && member.whatsapps.length > 0) ||
      member.instagram
  );

  const handleCopy = (e: React.MouseEvent, key: string, textToCopy: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div
      className={`relative group overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-900 shadow-lg w-full ${
        isSquare ? "aspect-square" : ""
      }`}
    >
      {isPlaceholder || !imageUrl ? (
        <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center bg-zinc-800/90 text-zinc-500 p-6 text-center">
          <Icon
            icon="ph:user-circle-thin"
            className="size-20 sm:size-24 text-zinc-600 dark:text-zinc-500 mb-2"
          />
          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
            Pirâmide Imóveis
          </span>
        </div>
      ) : isSquare ? (
        <Image
          src={imageUrl}
          alt={member.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <Image
          src={imageUrl}
          alt={member.name}
          width={480}
          height={600}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-105"
        />
      )}

      
      {hasContacts && (
        <div className="absolute inset-0 z-20 bg-black/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-0.5">
            Contato Direto
          </span>

          
          {member.whatsapps?.map((wa, wIdx) => {
            const key = `wa-${wIdx}`;
            const isCopied = copiedKey === key;
            const cleanNumber = wa.label.replace(/\D/g, "");

            return (
              <div
                key={wIdx}
                className="w-full max-w-[210px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 flex items-center justify-between transition-colors shadow-xs"
              >
                <a
                  href={wa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center gap-2 px-3 py-1.5 text-white font-mono text-[11px] font-medium tracking-wide truncate hover:text-primary transition-colors cursor-pointer"
                  title={`Conversar com ${member.name} no WhatsApp`}
                >
                  <Icon
                    icon="ph:whatsapp-logo-bold"
                    className="size-3.5 shrink-0 text-white"
                  />
                  <span className="truncate">{wa.label}</span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, key, cleanNumber || wa.label)}
                  className="px-2.5 py-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors border-l border-white/10 cursor-pointer flex items-center justify-center"
                  title={isCopied ? "Copiado!" : "Copiar número"}
                >
                  <Icon
                    icon={isCopied ? "ph:check-bold" : "ph:copy-simple-bold"}
                    className={`size-3.5 ${
                      isCopied ? "text-emerald-400 animate-pulse" : ""
                    }`}
                  />
                </button>
              </div>
            );
          })}

          
          {member.email &&
            (() => {
              const key = "email";
              const isCopied = copiedKey === key;

              return (
                <div className="w-full max-w-[210px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 flex items-center justify-between transition-colors shadow-xs">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex-1 flex items-center gap-2 px-3 py-1.5 text-white font-mono text-[11px] font-medium tracking-wide truncate hover:text-primary transition-colors cursor-pointer"
                    title={member.email}
                  >
                    <Icon
                      icon="ph:envelope-simple-bold"
                      className="size-3.5 shrink-0 text-white"
                    />
                    <span className="truncate text-[10px] lowercase">
                      {member.email}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, key, member.email!)}
                    className="px-2.5 py-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors border-l border-white/10 cursor-pointer flex items-center justify-center"
                    title={isCopied ? "Copiado!" : "Copiar e-mail"}
                  >
                    <Icon
                      icon={isCopied ? "ph:check-bold" : "ph:copy-simple-bold"}
                      className={`size-3.5 ${
                        isCopied ? "text-emerald-400 animate-pulse" : ""
                      }`}
                    />
                  </button>
                </div>
              );
            })()}

          
          {member.instagram &&
            (() => {
              const key = "instagram";
              const isCopied = copiedKey === key;
              const instagramHandle =
                member.instagram.replace(/\/$/, "").split("/").pop() ||
                "Instagram";

              return (
                <div className="w-full max-w-[210px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 flex items-center justify-between transition-colors shadow-xs">
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center gap-2 px-3 py-1.5 text-white font-mono text-[11px] font-medium tracking-wide truncate hover:text-primary transition-colors cursor-pointer"
                    title={`Ver Instagram de ${member.name}`}
                  >
                    <Icon
                      icon="ph:instagram-logo-bold"
                      className="size-3.5 shrink-0 text-white"
                    />
                    <span className="truncate text-[10px]">
                      @{instagramHandle}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, key, member.instagram!)}
                    className="px-2.5 py-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors border-l border-white/10 cursor-pointer flex items-center justify-center"
                    title={isCopied ? "Copiado!" : "Copiar link do Instagram"}
                  >
                    <Icon
                      icon={isCopied ? "ph:check-bold" : "ph:copy-simple-bold"}
                      className={`size-3.5 ${
                        isCopied ? "text-emerald-400 animate-pulse" : ""
                      }`}
                    />
                  </button>
                </div>
              );
            })()}
        </div>
      )}

      
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-flex items-center border-none">
          <span>{member.role}</span>
        </span>
      </div>

      
      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
        <span className="px-2.5 py-1.5 bg-black/40 backdrop-blur-md font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-white shadow-xs inline-flex items-center gap-1.5 border-none max-w-full flex-wrap">
          <span>{member.name}</span>
          {member.creci && (
            <span className="font-mono text-[10px] font-normal text-white/80 shrink-0">
              • {member.creci}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
