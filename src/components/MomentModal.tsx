import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiXMark, HiSpeakerWave, HiStop, HiCalendarDays } from "react-icons/hi2";
import type { TimelineMoment } from "@/data/artifacts";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  moment: TimelineMoment | null;
  onClose: () => void;
}

export function MomentModal({ moment, onClose }: Props) {
  const { t, lang } = useLanguage();
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!moment && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [moment]);

  const narrate = () => {
    if (!moment || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const titleText = lang === "id" ? moment.titleId : moment.titleEn;
    const bodyText = lang === "id" ? moment.bodyId : moment.bodyEn;
    const text = `${titleText}. ${moment.year}. ${bodyText}`;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "id" ? "id-ID" : "en-US";
    u.rate = 0.95;
    u.pitch = 1.05;
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

  const momentLabel = lang === "id" ? "Momen Sejarah" : "Historical Moment";

  return (
    <AnimatePresence>
      {moment && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
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
            className="relative w-full max-w-2xl bg-card border-gold-soft rounded-2xl overflow-hidden shadow-museum"
          >
            {/* Curated ambient glow in modal */}
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,rgba(201,161,74,0.15),transparent_60%)]" />

            <button
              onClick={onClose}
              aria-label={t.museum.close}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/60 hover:bg-primary/20 text-foreground flex items-center justify-center transition-colors"
            >
              <HiXMark className="text-lg" />
            </button>

            <div className="p-8 md:p-10 flex flex-col relative z-10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary mb-3">
                <HiCalendarDays className="text-sm" />
                {momentLabel} · {moment.year}
              </div>

              <h2 className="font-display text-3xl md:text-5xl text-gradient-gold leading-tight mt-1">
                {lang === "id" ? moment.titleId : moment.titleEn}
              </h2>

              <div className="my-6 h-px bg-gradient-to-r from-primary/30 to-transparent" />

              <p className="text-base md:text-lg text-foreground/90 font-serif leading-relaxed italic border-l-2 border-primary/50 pl-5 my-2">
                “{lang === "id" ? moment.bodyId : moment.bodyEn}”
              </p>

              <div className="mt-8 pt-6 flex flex-wrap gap-3">
                {!speaking ? (
                  <button
                    onClick={narrate}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium hover:shadow-gold-glow transition-all active:scale-95"
                  >
                    <HiSpeakerWave /> {t.museum.narrate}
                  </button>
                ) : (
                  <button
                    onClick={stop}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-gold-soft text-sm text-foreground/80 hover:bg-primary/10 transition-all active:scale-95"
                  >
                    <HiStop /> {t.museum.stop}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
                >
                  {t.museum.close}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
