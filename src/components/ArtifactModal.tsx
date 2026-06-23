import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiXMark, HiSpeakerWave, HiStop } from "react-icons/hi2";
import type { Artifact } from "@/data/artifacts";
import { useLanguage } from "@/contexts/LanguageContext";

export function ArtifactModal({
  artifact,
  onClose,
}: {
  artifact: Artifact | null;
  onClose: () => void;
}) {
  const { t, lang } = useLanguage();
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!artifact && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [artifact]);

  const narrate = () => {
    if (!artifact || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const text = `${artifact.name[lang]}. ${artifact.description[lang]}`;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "id" ? "id-ID" : "en-US";
    u.rate = 0.95;
    u.pitch = 1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  const stop = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <AnimatePresence>
      {artifact && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-card border-gold-soft rounded-2xl overflow-hidden shadow-museum"
          >
            <button
              onClick={onClose}
              aria-label={t.museum.close}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/60 hover:bg-primary/20 text-foreground flex items-center justify-center"
            >
              <HiXMark className="text-lg" />
            </button>

            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <div
                className="relative h-64 md:h-full min-h-[300px] flex items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse at center, ${artifact.color}40, oklch(0.1 0.01 60) 70%)`,
                }}
              >
                <motion.div
                  className="absolute w-48 h-48 rounded-full blur-xl opacity-60"
                  style={{
                    background: `radial-gradient(circle, ${artifact.color}, transparent 70%)`,
                  }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                {/* Artifact Exhibit Image */}
                <motion.img
                  src={`/assets/artifacts/${artifact.id}.png`}
                  alt={artifact.name[lang]}
                  className="relative z-10 max-w-[80%] max-h-[80%] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />

                <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.3em] text-primary">
                  {artifact.era[lang]}
                </div>
              </div>

              <div className="p-7 md:p-9 flex flex-col">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  {artifact.origin[lang]}
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-gradient-gold leading-tight">
                  {artifact.name[lang]}
                </h2>
                <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {artifact.description[lang]}
                </p>

                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                  {!speaking ? (
                    <button
                      onClick={narrate}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium hover:shadow-gold-glow transition-shadow"
                    >
                      <HiSpeakerWave /> {t.museum.narrate}
                    </button>
                  ) : (
                    <button
                      onClick={stop}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-gold-soft text-sm hover:bg-primary/10"
                    >
                      <HiStop /> {t.museum.stop}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
