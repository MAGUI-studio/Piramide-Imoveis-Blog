"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";
import type { ReelItem } from "@/src/types/sanity";

interface VideoModalPlayerProps {
  reels: ReelItem[];
  selectedIdx: number | null;
  onClose: () => void;
  onSelectIdx: (idx: number) => void;
}

export function VideoModalPlayer({
  reels,
  selectedIdx,
  onClose,
  onSelectIdx,
}: VideoModalPlayerProps) {
  const isOpen = selectedIdx !== null && selectedIdx >= 0 && selectedIdx < reels.length;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && selectedIdx !== null && (
        <VideoModalShell
          reels={reels}
          selectedIdx={selectedIdx}
          onClose={onClose}
          onSelectIdx={onSelectIdx}
        />
      )}
    </AnimatePresence>
  );
}

function VideoModalShell({
  reels,
  selectedIdx,
  onClose,
  onSelectIdx,
}: {
  reels: ReelItem[];
  selectedIdx: number;
  onClose: () => void;
  onSelectIdx: (idx: number) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [countdownRemaining, setCountdownRemaining] = useState<number | null>(null);
  const [isAutoAdvanceDisabled, setIsAutoAdvanceDisabled] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentReel = reels[selectedIdx];
  const nextIdx = (selectedIdx + 1) % reels.length;
  const nextReel = reels.length > 1 ? reels[nextIdx] : null;

  const handleNext = useCallback(() => {
    if (reels.length === 0) return;
    const next = (selectedIdx + 1) % reels.length;
    setCountdownRemaining(null);
    setIsAutoAdvanceDisabled(false);
    setIsPlaying(true);
    onSelectIdx(next);
  }, [selectedIdx, reels.length, onSelectIdx]);

  const handlePrev = useCallback(() => {
    if (reels.length === 0) return;
    const prev = (selectedIdx - 1 + reels.length) % reels.length;
    setCountdownRemaining(null);
    setIsAutoAdvanceDisabled(false);
    setIsPlaying(true);
    onSelectIdx(prev);
  }, [selectedIdx, reels.length, onSelectIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;

    if (!duration || isNaN(duration) || reels.length <= 1) return;

    const remaining = duration - currentTime;

    if (remaining <= 10 && remaining > 0.2 && !isAutoAdvanceDisabled) {
      setCountdownRemaining(Math.ceil(remaining));
    } else {
      setCountdownRemaining(null);
    }
  };

  const handleVideoEnded = () => {
    if (!isAutoAdvanceDisabled && reels.length > 1) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setCountdownRemaining(null);
    setIsAutoAdvanceDisabled(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  if (!currentReel) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-lg"
      onClick={onClose}
    >
      
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl h-[92vh] max-h-[920px] bg-zinc-950 border border-white/15 shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-40 size-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl hover:scale-105"
          title="Fechar (Esc)"
        >
          <Icon icon="ph:x-bold" className="size-5" />
        </button>

        
        <div className="relative shrink-0 w-full md:w-auto h-[55vh] md:h-full aspect-[9/16] bg-black flex items-center justify-center overflow-hidden mx-auto md:mx-0">
          {currentReel.videoFileUrl || currentReel.videoUrl ? (
            <video
              ref={videoRef}
              key={currentReel._id}
              src={currentReel.videoFileUrl || currentReel.videoUrl}
              poster={
                currentReel.thumbnail
                  ? urlForImage(currentReel.thumbnail)?.width(720).height(1280).url()
                  : undefined
              }
              autoPlay
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onClick={togglePlay}
              className="size-full object-cover bg-black cursor-pointer select-none"
            />
          ) : (
            <div className="size-full flex flex-col items-center justify-center p-6 text-center text-zinc-400 space-y-3">
              <Icon icon="ph:video-camera-slash-fill" className="size-16 text-zinc-600" />
              <p className="text-sm font-light">Vídeo indisponível no momento.</p>
            </div>
          )}

          
          <div className="absolute top-3 left-3 flex items-center gap-2 z-30">
            <button
              type="button"
              onClick={togglePlay}
              className="size-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md hover:scale-105"
              title={isPlaying ? "Pausar" : "Reproduzir"}
            >
              <Icon
                icon={isPlaying ? "ph:pause-fill" : "ph:play-fill"}
                className="size-4"
              />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="size-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md hover:scale-105"
              title={isMuted ? "Ativar som" : "Desativar som"}
            >
              <Icon
                icon={isMuted ? "ph:speaker-slash-fill" : "ph:speaker-high-fill"}
                className="size-4"
              />
            </button>

            
            <button
              type="button"
              onClick={handleRestart}
              className="size-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md hover:scale-105"
              title="Reiniciar vídeo do início"
            >
              <Icon icon="ph:arrow-counter-clockwise-bold" className="size-4" />
            </button>
          </div>

          
          <AnimatePresence>
            {countdownRemaining !== null && !isAutoAdvanceDisabled && reels.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute bottom-16 md:bottom-6 right-3 sm:right-5 z-30 p-3 sm:p-4 bg-black/90 backdrop-blur-md border border-primary/40 shadow-2xl space-y-2 max-w-[270px]"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold text-white">
                  <span className="flex items-center gap-1.5 text-primary">
                    <Icon icon="ph:play-circle-bold" className="size-4 animate-pulse" />
                    Próximo Vídeo
                  </span>
                  <span className="text-primary tabular-nums font-bold">
                    {countdownRemaining}s
                  </span>
                </div>

                {nextReel && (
                  <p className="text-[11px] text-zinc-300 font-light line-clamp-1">
                    {nextReel.propertyTitle || nextReel.title}
                  </p>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-1.5 px-2.5 bg-primary hover:bg-primary/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Assistir Agora
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAutoAdvanceDisabled(true)}
                    className="py-1.5 px-2.5 bg-white/10 hover:bg-white/20 text-zinc-300 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    title="Cancelar avanço automático"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between md:hidden z-30 pointer-events-none">
            <button
              type="button"
              onClick={() => setShowMobileInfo((prev) => !prev)}
              className="px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 pointer-events-auto cursor-pointer shadow-lg backdrop-blur-md"
            >
              <Icon
                icon={showMobileInfo ? "ph:eye-slash-bold" : "ph:info-bold"}
                className="size-3.5 text-primary"
              />
              <span>{showMobileInfo ? "Ocultar Detalhes" : "Mostrar Detalhes"}</span>
            </button>

            
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                type="button"
                onClick={handlePrev}
                className="size-8 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/20 cursor-pointer shadow-md"
                title="Anterior"
              >
                <Icon icon="ph:caret-left-bold" className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="size-8 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/20 cursor-pointer shadow-md"
                title="Próximo"
              >
                <Icon icon="ph:caret-right-bold" className="size-4" />
              </button>
            </div>
          </div>
        </div>

        
        <div
          className={`flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto space-y-6 bg-zinc-950 text-white border-t md:border-t-0 md:border-l border-white/10 transition-all duration-300 ${
            showMobileInfo ? "block max-h-[50vh] md:max-h-none" : "hidden md:flex"
          }`}
        >
          <div key={currentReel._id} className="space-y-4 animate-in fade-in duration-200">
            
            {currentReel.propertyTitle && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/15 font-mono text-xs font-bold uppercase tracking-widest">
                <Icon icon="ph:buildings-fill" className="size-3.5 text-white" />
                <span>{currentReel.propertyTitle}</span>
              </div>
            )}

            
            <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight text-white leading-snug">
              {currentReel.title}
            </h3>

            
            {currentReel.description && (
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                {currentReel.description}
              </p>
            )}
          </div>

          
          <div className="space-y-3 pt-6 border-t border-white/10">
            
            {currentReel.propertyUrl && (
              <a
                href={currentReel.propertyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg cursor-pointer"
              >
                <Icon icon="ph:house-line-bold" className="size-4 sm:size-5" />
                <span>Ver Imóvel no Site</span>
                <Icon icon="ph:arrow-up-right-bold" className="size-4 ml-auto" />
              </a>
            )}

            
            {currentReel.instagramUrl && (
              <a
                href={currentReel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/15 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all border border-white/15 cursor-pointer"
              >
                <Icon icon="ph:instagram-logo-bold" className="size-4 sm:size-5 text-pink-400" />
                <span>Ver Post no Instagram</span>
                <Icon icon="ph:arrow-up-right-bold" className="size-4 ml-auto" />
              </a>
            )}

            
            <div className="hidden md:flex items-center justify-between pt-4 text-xs font-mono text-zinc-400">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <Icon icon="ph:arrow-left-bold" className="size-3.5" />
                <span>Vídeo Anterior</span>
              </button>
              <span className="font-bold">
                {selectedIdx + 1} de {reels.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <span>Próximo Vídeo</span>
                <Icon icon="ph:arrow-right-bold" className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
