import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HiArrowRight, HiSparkles, HiBookOpen, HiAcademicCap, HiTrophy } from "react-icons/hi2";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "History Of Indonesia Virtual Museum — Walk Through History" },
      {
        name: "description",
        content:
          "An immersive 3D virtual museum of Indonesian history, culture and heritage. Explore eight historical zones in your browser.",
      },
      { property: "og:title", content: "History Of Indonesia Virtual Museum" },
      { property: "og:description", content: "Walk through history. Experience the heritage." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, lang } = useLanguage();
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (heroTitleRef.current) {
      gsap.from(heroTitleRef.current, { y: 40, opacity: 0, duration: 1.4, ease: "power3.out" });
    }
  }, []);

  const featureIcons = [HiSparkles, HiBookOpen, HiAcademicCap, HiTrophy];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar floating />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 bg-hero">
        {/* particle dust */}
        <div ref={particlesRef} className="pointer-events-none absolute inset-0 overflow-hidden">
          {mounted && Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              className="absolute block w-1 h-1 rounded-full bg-primary/60 animate-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>

        {/* museum arch backdrop (SVG) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center">
          <svg viewBox="0 0 1200 500" className="w-full max-w-7xl opacity-30">
            <defs>
              <linearGradient id="col" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.76 0.13 80)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="oklch(0.18 0.02 50)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[150, 350, 550, 750, 950].map((x) => (
              <g key={x}>
                <rect x={x} y={120} width="60" height="380" fill="url(#col)" />
                <rect x={x - 10} y={100} width="80" height="22" fill="url(#col)" />
                <rect x={x - 10} y={480} width="80" height="20" fill="url(#col)" />
              </g>
            ))}
            <path d="M120 120 Q600 -40 1080 120 L1080 140 Q600 0 120 140 Z" fill="url(#col)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl text-center pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-gold-soft bg-primary/5 text-xs uppercase tracking-[0.3em] text-primary mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t.tagline}
          </motion.div>

          <h1
            ref={heroTitleRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-gradient-gold"
          >
            {t.landing.welcome}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            {t.landing.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/museum"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold-glow hover:shadow-museum transition-shadow"
            >
              {t.landing.enter}
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-gold-soft text-foreground hover:bg-primary/10 transition-colors"
            >
              {t.landing.explore}
            </Link>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-20 grid grid-cols-3 max-w-2xl mx-auto gap-6"
          >
            {t.landing.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl text-gradient-gold">
                  {s.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ZONE SHOWCASE */}
      <section className="relative py-24 px-6 border-y border-border/40 bg-card/5">
        {/* Subtle decorative background blur orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl text-gradient-gold">
              {lang === "id" ? "Jelajahi Zona Sejarah" : "Explore the Historical Zones"}
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              {lang === "id"
                ? "Masuki setiap lorong waktu untuk menjelajahi artefak interaktif, mempelajari kearifan lokal, dan mendengarkan kisah sejarah peradaban Nusantara."
                : "Step into each corridor of time to discover interactive artifacts, study local wisdom, and listen to the rich history of the Indonesian archipelago."}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "lobby",
                titleEn: "Grand Lobby",
                titleId: "Lobi Utama",
                descEn: "The grand entrance hall where you begin your virtual historical tour.",
                descId: "Ruang masuk megah tempat awal Anda memulai perjalanan sejarah virtual.",
                color: "from-stone-900/50 to-slate-900/50 border-stone-500/20 hover:border-stone-500/50",
                textColor: "text-stone-300",
                badgeEn: "Start",
                badgeId: "Mulai",
              },
              {
                id: "ancient",
                titleEn: "Ancient Indonesia",
                titleId: "Indonesia Purbakala",
                descEn: "Prehistoric human origins, early stone tool cultures, and megalithic standing monuments.",
                descId: "Asal-usul prasejarah manusia purba, peralatan batu Neolitik, dan monumen batu Megalitik.",
                color: "from-emerald-950/40 to-slate-950/40 border-emerald-500/20 hover:border-emerald-500/50",
                textColor: "text-emerald-400",
                badgeEn: "Era 1",
                badgeId: "Era 1",
              },
              {
                id: "kingdom",
                titleEn: "Golden Kingdoms",
                titleId: "Kejayaan Kerajaan",
                descEn: "The glorious peak of Hindu-Buddhist maritime empires (Majapahit, Srivijaya) and Islamic sultanates.",
                descId: "Masa keemasan kerajaan Hindu-Buddha (Majapahit, Sriwijaya) dan perkembangan Kesultanan Islam.",
                color: "from-amber-950/40 to-slate-950/40 border-amber-500/20 hover:border-amber-500/50",
                textColor: "text-amber-400",
                badgeEn: "Era 2",
                badgeId: "Era 2",
              },
              {
                id: "colonial",
                titleEn: "Colonial Struggle",
                titleId: "Masa Penjajahan",
                descEn: "The global spice trade monopolies, European exploration, and rise of localized national resistances.",
                descId: "Monopoli perdagangan rempah dunia, pendudukan VOC Belanda, dan bangkitnya perang perlawanan daerah.",
                color: "from-blue-950/40 to-slate-950/40 border-blue-500/20 hover:border-blue-500/50",
                textColor: "text-blue-400",
                badgeEn: "Era 3",
                badgeId: "Era 3",
              },
              {
                id: "national",
                titleEn: "National Awakening",
                titleId: "Kebangkitan Nasional",
                descEn: "The heroic revolutionary struggle, the sacred Youth Pledge, and the Proclamation of Sovereignty.",
                descId: "Perjuangan revolusi kemerdekaan yang heroik, Sumpah Pemuda, dan proklamasi kedaulatan bangsa.",
                color: "from-red-950/40 to-slate-950/40 border-red-500/20 hover:border-red-500/50",
                textColor: "text-red-400",
                badgeEn: "Era 4",
                badgeId: "Era 4",
              },
              {
                id: "modern",
                titleEn: "Modern Integration",
                titleId: "Indonesia Modern",
                descEn: "UNESCO Intangible Batik heritage, domestic space integration, and iconic contemporary monuments.",
                descId: "Warisan budaya takbenda Batik UNESCO, peluncuran Satelit Palapa, dan tugu Monumen Nasional.",
                color: "from-cyan-950/40 to-slate-950/40 border-cyan-500/20 hover:border-cyan-500/50",
                textColor: "text-cyan-400",
                badgeEn: "Era 5",
                badgeId: "Era 5",
              },
              {
                id: "heritage",
                titleEn: "Cultural & Nature Heritage",
                titleId: "Warisan Budaya & Alam",
                descEn: "Celebrate extraordinary Indonesian cultural diversity (UNESCO Batik & Wayang) and natural wonders.",
                descId: "Rayakan keberagaman warisan budaya takbenda UNESCO (Batik, Wayang) dan keajaiban alam Nusantara.",
                color: "from-teal-950/40 to-slate-950/40 border-teal-500/20 hover:border-teal-500/50",
                textColor: "text-teal-400",
                badgeEn: "Era 6",
                badgeId: "Era 6",
              },
              {
                id: "cinema",
                titleEn: "Cinema Theater",
                titleId: "Teater Bioskop",
                descEn: "Bilingual documentary catalog covering key historical events, streamed directly on a theater screen.",
                descId: "Katalog video dokumenter sejarah dwi-bahasa yang ditayangkan langsung pada layar bioskop virtual.",
                color: "from-rose-950/40 to-slate-950/40 border-rose-500/20 hover:border-rose-500/50",
                textColor: "text-rose-400",
                badgeEn: "Media",
                badgeId: "Media",
              },
              {
                id: "studio",
                titleEn: "Virtual Photo Studio",
                titleId: "Studio Foto Virtual",
                descEn: "Try on traditional costumes (Kebaya, Pangsi, Batik), customize your avatar, and print a Polaroid souvenir.",
                descId: "Kenakan busana adat Nusantara (Kebaya, Pangsi, Batik) dan unduh cetakan foto Polaroid suvenir virtual Anda.",
                color: "from-violet-950/40 to-slate-950/40 border-violet-500/20 hover:border-violet-500/50",
                textColor: "text-violet-400",
                badgeEn: "Custom",
                badgeId: "Kustom",
              },
            ].map((zone, idx) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className={`p-6 rounded-2xl border bg-gradient-to-br ${zone.color} backdrop-blur-sm transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:translate-y-[-2px] group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 ${zone.textColor}`}>
                      {lang === "id" ? zone.badgeId : zone.badgeEn}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">
                    {lang === "id" ? zone.titleId : zone.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {lang === "id" ? zone.descId : zone.descEn}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                  <Link
                    to="/museum"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    {lang === "id" ? "Masuk Zona" : "Enter Zone"} &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl text-center text-gradient-gold"
          >
            {t.landing.featuresTitle}
          </motion.h2>

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {t.landing.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-card border-gold-soft shadow-museum hover:translate-y-[-4px] transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold text-primary-foreground flex items-center justify-center text-xl mb-5">
                    <Icon />
                  </div>
                  <h3 className="font-display text-2xl">{f.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{f.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <Link
              to="/museum"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold-glow"
            >
              {t.landing.enter}
              <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-border text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {t.landing.footer}
      </footer>
    </div>
  );
}
