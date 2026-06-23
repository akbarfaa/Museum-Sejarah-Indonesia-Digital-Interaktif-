import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HiLockClosed, HiTrophy } from "react-icons/hi2";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/contexts/ProgressContext";
import { achievements, rooms } from "@/data/artifacts";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Digital Passport — History Of Indonesia Virtual Museum" },
      {
        name: "description",
        content: "Your museum achievements and progress across all five exhibition halls.",
      },
    ],
  }),
  component: PassportPage,
});

function PassportPage() {
  const { t, lang } = useLanguage();
  const {
    achievements: unlocked,
    quizScore,
    reset,
    visitedRooms,
    inspectedArtifacts,
  } = useProgress();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Passport</div>
          <h1 className="font-display text-5xl md:text-6xl text-gradient-gold">
            {t.passport.title}
          </h1>
          <p className="mt-4 text-muted-foreground">{t.passport.subtitle}</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          <Stat
            label={lang === "id" ? "Ruangan Dikunjungi" : "Rooms Visited"}
            value={`${visitedRooms.length}/${rooms.length}`}
          />
          <Stat
            label={lang === "id" ? "Artefak Diamati" : "Artifacts Inspected"}
            value={`${inspectedArtifacts.length}`}
          />
          <Stat
            label={lang === "id" ? "Skor Kuis" : "Quiz Score"}
            value={quizScore !== null ? `${quizScore}` : "—"}
          />
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => {
            const isUnlocked = unlocked.includes(a.id);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className={
                  "p-6 rounded-2xl border shadow-museum " +
                  (isUnlocked ? "bg-card border-gold-soft" : "bg-card/40 border-border opacity-70")
                }
              >
                <div
                  className={
                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 " +
                    (isUnlocked
                      ? "bg-gradient-gold text-primary-foreground shadow-gold-glow"
                      : "bg-muted text-muted-foreground")
                  }
                >
                  {isUnlocked ? <HiTrophy /> : <HiLockClosed />}
                </div>
                <h3 className="font-display text-xl">{lang === "id" ? a.titleId : a.titleEn}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lang === "id" ? a.descId : a.descEn}
                </p>
                <div
                  className={
                    "mt-4 text-[10px] uppercase tracking-[0.3em] " +
                    (isUnlocked ? "text-primary" : "text-muted-foreground")
                  }
                >
                  {isUnlocked ? t.passport.unlocked : t.passport.locked}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">{t.passport.hint}</p>
        <div className="mt-6 text-center">
          <button
            onClick={reset}
            className="px-5 py-2 rounded-full border-gold-soft text-xs uppercase tracking-[0.3em] hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition-colors"
          >
            {t.passport.reset}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 rounded-xl bg-card border-gold-soft shadow-museum text-center">
      <div className="font-display text-4xl text-gradient-gold">{value}</div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
