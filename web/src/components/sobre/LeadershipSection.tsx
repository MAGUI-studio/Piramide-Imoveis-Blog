import Image from "next/image";
import { Icon } from "@iconify/react";

export interface LeadershipMember {
  name: string;
  role: string;
  creci?: string;
  image: string;
}

interface LeadershipSectionProps {
  members: LeadershipMember[];
}

export function LeadershipSection({ members }: LeadershipSectionProps) {
  return (
    <section className="w-full py-16 sm:py-24 lg:py-28">
      <div className="w-full max-w-440 mx-auto px-6 md:px-12 space-y-12 sm:space-y-16">
        
        <div className="flex flex-col items-center text-center justify-center space-y-4">
          <div className="inline-flex items-center justify-center py-1.5 rounded-tr-full rounded-bl-full px-8 bg-primary text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-sm">
            <Icon icon="ph:users-three-fill" className="size-4 mr-2" />
            <span>Governança & Liderança</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase font-heading tracking-tight text-foreground leading-[1.03]">
            Nossa Diretoria & Liderança
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Governança ética, visão estratégica e compromisso contínuo com a realização dos melhores negócios.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-900 shadow-lg"
            >
              
              <Image
                src={member.image}
                alt={member.name}
                width={480}
                height={600}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-105"
              />

              
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-flex items-center border-none">
                  <span>{member.role}</span>
                </span>
              </div>

              
              <div className="absolute bottom-3 left-3 right-3 z-10">
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
          ))}
        </div>
      </div>
    </section>
  );
}
