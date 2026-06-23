import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { timeline, rooms } from "@/data/artifacts";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — MuseumVerse Indonesia" },
      {
        name: "description",
        content: "Two millennia of Indonesian history distilled into key moments.",
      },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  const { t, lang } = useLanguage();
  const roomMap = new Map(rooms.map((r) => [r.id, r]));

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="text-xs uppercase tracking-[0.4em] text-primary mb-4">
            {lang === "id" ? "Garis Waktu" : "Timeline"}
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-gradient-gold">
            {t.timeline.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">{t.timeline.subtitle}</p>
        </motion.div>

        <div className="relative mt-20 pl-8 md:pl-0">
          {/* center line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

          {timeline.map((e, i) => {
            const r = roomMap.get(e.room);
            const left = i % 2 === 0;
            return (
              <motion.div
                key={e.year + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
                className={
                  "relative mb-10 md:flex md:items-center " +
                  (left ? "md:flex-row" : "md:flex-row-reverse")
                }
              >
                <div className="md:w-1/2 md:px-10">
                  <div
                    className="p-6 rounded-xl bg-card border-gold-soft shadow-museum"
                    style={{ borderLeft: `3px solid ${r?.accent ?? "#c9a14a"}` }}
                  >
                    <div className="text-xs uppercase tracking-[0.3em] text-primary">{e.year}</div>
                    <h3 className="font-display text-2xl mt-1">
                      {lang === "id" ? e.titleId : e.titleEn}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {lang === "id" ? e.bodyId : e.bodyEn}
                    </p>
                    <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {lang === "id" ? r?.nameId : r?.nameEn}
                    </div>
                  </div>
                </div>
                {/* dot */}
                <div className="absolute left-3 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-gradient-gold shadow-gold-glow ring-4 ring-background" />
                <div className="md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
