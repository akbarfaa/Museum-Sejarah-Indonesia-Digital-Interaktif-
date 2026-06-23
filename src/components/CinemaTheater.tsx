import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlay, HiOutlineStop, HiOutlineFilm, HiXMark } from "react-icons/hi2";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CinemaEra } from "@/data/cinema";

interface Props {
  open: boolean;
  onClose: () => void;
  cinemaEras: CinemaEra[];
}

export function CinemaTheater({ open, onClose, cinemaEras }: Props) {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [activeId, setActiveId] = useState(cinemaEras[0]?.id || "");
  const [speaking, setSpeaking] = useState(false);

  const categories = [
    { id: "general", name: { en: "General History", id: "Sejarah Umum" } },
    { id: "war", name: { en: "Struggle & War", id: "Perjuangan & Perang" } },
    { id: "culture", name: { en: "Heritage & Art", id: "Warisan & Seni" } },
    { id: "kingdoms", name: { en: "Ancient Kingdoms", id: "Kerajaan Kuno" } },
  ];

  const filteredFilms = useMemo(
    () => cinemaEras.filter((e) => e.category === activeCategory),
    [activeCategory]
  );

  const active = useMemo(
    () => cinemaEras.find((e) => e.id === activeId) ?? cinemaEras[0],
    [activeId, cinemaEras],
  );

  // Auto-select the first film in the selected category
  useEffect(() => {
    if (filteredFilms.length > 0) {
      // Avoid resetting if the currently active video is already in this category
      const currentIsInCategory = filteredFilms.some((f) => f.id === activeId);
      if (!currentIsInCategory) {
        setActiveId(filteredFilms[0].id);
      }
    }
  }, [activeCategory, filteredFilms, activeId]);

  // Stop narration on close / era switch / language change
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [activeId, lang, open]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const playNarration = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(active.narration[lang]);
    u.lang = lang === "id" ? "id-ID" : "en-US";
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  const stopNarration = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const tt = {
    eyebrow: lang === "id" ? "Studio Bioskop Museum" : "Museum Cinema Studio",
    nowShowing: lang === "id" ? "Sedang diputar" : "Now showing",
    play: lang === "id" ? "Putar Narasi" : "Play Narration",
    stop: lang === "id" ? "Hentikan" : "Stop",
    chooseFilm: lang === "id" ? "Pilih Era / Film" : "Choose Era / Film",
    exit: lang === "id" ? "Keluar Studio" : "Exit Studio",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm overflow-y-auto"
        >
          {/* Theater ambient glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-red-900/40 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-red-950/60 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-red-950/60 to-transparent" />
          </div>

          {/* Velvet curtains */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-[repeating-linear-gradient(90deg,#4a0a0a,#7a1414_18px,#4a0a0a_36px)] opacity-80 shadow-[inset_-40px_0_60px_rgba(0,0,0,0.7)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-[repeating-linear-gradient(90deg,#4a0a0a,#7a1414_18px,#4a0a0a_36px)] opacity-80 shadow-[inset_40px_0_60px_rgba(0,0,0,0.7)]"
          />

          {/* Exit */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border-gold-soft text-sm hover:bg-primary/20 transition"
          >
            <HiXMark /> {tt.exit}
          </button>

          <div className="relative max-w-6xl mx-auto px-6 py-12">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-primary">
                <HiOutlineFilm /> {tt.eyebrow}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.3em] text-red-300/70">
                {tt.nowShowing} · {active.era[lang]}
              </div>
            </div>

            {/* Screen */}
            <motion.div layout className="mt-8 mx-auto max-w-5xl relative">
              {/* Top curtain valance */}
              <div
                aria-hidden
                className="absolute -top-6 left-0 right-0 h-8 bg-[repeating-linear-gradient(90deg,#7a1414,#a51d1d_24px,#7a1414_48px)] rounded-t-xl shadow-lg"
              />
              <div className="relative rounded-xl overflow-hidden border-4 border-red-900/80 shadow-[0_0_120px_rgba(233,69,96,0.4)] bg-black ring-1 ring-primary/30">
                <div className="aspect-video">
                  <AnimatePresence mode="wait">
                    <motion.iframe
                      key={active.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                      title={active.title[lang]}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </AnimatePresence>
                </div>
              </div>
              {/* Stage glow */}
              <div className="absolute -bottom-4 inset-x-16 h-4 bg-gradient-to-r from-transparent via-primary/70 to-transparent blur-xl" />
            </motion.div>

            {/* Info + Narration */}
            <motion.div
              key={active.id + "-info"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-12 grid md:grid-cols-[1.4fr_1fr] gap-6 max-w-5xl mx-auto"
            >
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-gradient-gold">
                  {active.title[lang]}
                </h2>
                <div className="mt-1 text-xs text-muted-foreground">{active.year[lang]}</div>
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                  {active.synopsis[lang]}
                </p>
              </div>
              <div className="flex flex-col gap-3 self-start rounded-2xl border-gold-soft bg-background/50 backdrop-blur p-5">
                <button
                  onClick={speaking ? stopNarration : playNarration}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-gradient-gold text-primary-foreground font-medium shadow-gold-glow hover:opacity-90 transition"
                >
                  {speaking ? <HiOutlineStop /> : <HiOutlinePlay />}
                  {speaking ? tt.stop : tt.play}
                </button>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
                  {lang === "id" ? "Narasi dwibahasa · EN / ID" : "Bilingual narration · EN / ID"}
                </div>
              </div>
            </motion.div>

            {/* Category tabs switcher */}
            <div className="mt-12 max-w-5xl mx-auto flex flex-wrap gap-2.5 justify-center border-b border-border/20 pb-5">
              {categories.map((cat) => {
                const isCatActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isCatActive
                        ? "bg-gradient-gold text-primary-foreground font-bold shadow-gold-glow scale-105"
                        : "bg-secondary/40 border border-border/20 text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                    }`}
                  >
                    {cat.name[lang]}
                  </button>
                );
              })}
            </div>

            {/* Film picker */}
            <div className="mt-8 max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="font-display text-lg text-foreground">{tt.chooseFilm}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {filteredFilms.map((era) => {
                  const isActive = era.id === active.id;
                  return (
                    <button
                      key={era.id}
                      onClick={() => setActiveId(era.id)}
                      className={
                        "group relative text-left rounded-lg overflow-hidden border transition-all " +
                        (isActive
                          ? "border-primary shadow-gold-glow scale-[1.02]"
                          : "border-border/60 hover:border-primary/60")
                      }
                    >
                      <div className="aspect-video bg-black relative">
                        <img
                          src={`https://i.ytimg.com/vi/${era.youtubeId}/hqdefault.jpg`}
                          alt={era.title[lang]}
                          loading="lazy"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                        <div className="absolute bottom-1.5 left-2 right-2">
                          <div className="text-[9px] uppercase tracking-[0.3em] text-primary">
                            {era.era[lang]}
                          </div>
                          <div className="text-[11px] font-display text-white line-clamp-1">
                            {era.title[lang]}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
