import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlay, HiOutlineStop, HiOutlineFilm } from "react-icons/hi2";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchCinema } from "@/lib/api-client";

export const Route = createFileRoute("/cinema")({
  loader: async () => {
    return {
      cinemaEras: await fetchCinema(),
    };
  },
  head: () => ({
    meta: [
      { title: "Museum Cinema — History Of Indonesia Virtual Museum" },
      {
        name: "description",
        content:
          "Sit in the museum theater and stream curated documentaries for every era of Indonesian history, with bilingual narration.",
      },
      { property: "og:title", content: "Museum Cinema — History Of Indonesia Virtual Museum" },
      {
        property: "og:description",
        content: "Curated documentaries for every era of Indonesian history.",
      },
    ],
  }),
  component: CinemaPage,
});

function CinemaPage() {
  const { cinemaEras } = Route.useLoaderData();
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState(cinemaEras[0]?.id || "");
  const [speaking, setSpeaking] = useState(false);

  const active = useMemo(
    () => cinemaEras.find((e) => e.id === activeId) ?? cinemaEras[0],
    [activeId, cinemaEras],
  );

  // Stop narration when leaving page or switching era.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [activeId, lang]);

  const playNarration = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(active.narration[lang]);
    u.lang = lang === "id" ? "id-ID" : "en-US";
    u.rate = 0.95;
    u.pitch = 1;
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
    eyebrow: lang === "id" ? "Bioskop Museum" : "Museum Cinema",
    title: lang === "id" ? "Teater Warisan Nusantara" : "Heritage Theater of the Archipelago",
    subtitle:
      lang === "id"
        ? "Pilih satu era dan saksikan dokumenter pilihan kurator, lengkap dengan narasi dwibahasa."
        : "Pick an era and watch a curator-selected documentary, with bilingual narration.",
    nowShowing: lang === "id" ? "Sedang diputar" : "Now showing",
    play: lang === "id" ? "Putar Narasi" : "Play Narration",
    stop: lang === "id" ? "Hentikan" : "Stop",
    chooseFilm: lang === "id" ? "Pilih Dokumenter" : "Choose a Documentary",
    openYoutube: lang === "id" ? "Buka di YouTube" : "Open on YouTube",
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient cinema backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,theme(colors.primary/10),transparent_55%)]" />
      </div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-primary">
            <HiOutlineFilm /> {tt.eyebrow}
          </div>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-gradient-gold">{tt.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">{tt.subtitle}</p>
        </motion.div>

        {/* Theater stage */}
        <motion.div layout className="mt-14 mx-auto max-w-5xl relative">
          {/* Velvet curtains */}
          <div
            aria-hidden
            className="absolute -inset-x-6 -top-6 -bottom-10 rounded-[2.5rem] border-gold-soft bg-gradient-to-b from-primary/10 via-background/40 to-background pointer-events-none"
          />
          <div className="relative rounded-2xl overflow-hidden border-gold-soft shadow-gold-glow bg-black">
            <div className="aspect-video">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?rel=0&modestbranding=1`}
                  title={active.title[lang]}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Stage lights */}
          <div className="absolute -bottom-3 inset-x-10 h-3 bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-md" />
        </motion.div>

        {/* Now-showing card */}
        <motion.div
          key={active.id + "-info"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid md:grid-cols-[1.4fr_1fr] gap-8 max-w-5xl mx-auto"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-primary">
              {tt.nowShowing} · {active.era[lang]}
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-foreground">
              {active.title[lang]}
            </h2>
            <div className="mt-1 text-sm text-muted-foreground">{active.year[lang]}</div>
            <p className="mt-5 text-muted-foreground leading-relaxed">{active.synopsis[lang]}</p>
            <blockquote className="mt-6 border-l-2 border-primary/60 pl-4 italic text-foreground/80">
              “{active.narration[lang]}”
            </blockquote>
          </div>

          <div className="flex flex-col gap-3 self-start rounded-2xl border-gold-soft bg-background/40 backdrop-blur p-6">
            <button
              onClick={speaking ? stopNarration : playNarration}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-gradient-gold text-primary-foreground font-medium shadow-gold-glow hover:opacity-90 transition"
            >
              {speaking ? <HiOutlineStop /> : <HiOutlinePlay />}
              {speaking ? tt.stop : tt.play}
            </button>
            <a
              href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 border-gold-soft text-sm text-foreground/80 hover:bg-primary/10 transition"
            >
              {tt.openYoutube}
            </a>
            <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground text-center">
              {lang === "id" ? "Narasi dwibahasa · EN / ID" : "Bilingual narration · EN / ID"}
            </div>
          </div>
        </motion.div>

        {/* Film picker */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl text-foreground">{tt.chooseFilm}</h3>
            <div className="h-px flex-1 ml-6 bg-gradient-to-r from-primary/40 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cinemaEras.map((era, i) => {
              const isActive = era.id === active.id;
              return (
                <motion.button
                  key={era.id}
                  onClick={() => setActiveId(era.id)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className={
                    "group relative text-left rounded-xl overflow-hidden border transition-all " +
                    (isActive
                      ? "border-primary shadow-gold-glow"
                      : "border-border hover:border-primary/60")
                  }
                >
                  <div className="aspect-video bg-black relative">
                    <img
                      src={`https://i.ytimg.com/vi/${era.youtubeId}/hqdefault.jpg`}
                      alt={era.title[lang]}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                        {era.era[lang]}
                      </div>
                      <div className="text-sm font-display text-white line-clamp-1">
                        {era.title[lang]}
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-primary">
                      <HiOutlinePlay />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
