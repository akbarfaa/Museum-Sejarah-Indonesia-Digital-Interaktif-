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
      { title: "MuseumVerse Indonesia — Walk Through History" },
      {
        name: "description",
        content:
          "An immersive 3D virtual museum of Indonesian history, culture and heritage. Explore five eras in your browser.",
      },
      { property: "og:title", content: "MuseumVerse Indonesia" },
      { property: "og:description", content: "Walk through history. Experience the heritage." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t } = useLanguage();
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
