import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiXCircle, HiArrowPath } from "react-icons/hi2";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/contexts/ProgressContext";
import { quizQuestions } from "@/data/artifacts";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Heritage Quiz — MuseumVerse Indonesia" },
      {
        name: "description",
        content: "Test what you've learned in the museum with the bilingual Heritage Quiz.",
      },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { t, lang } = useLanguage();
  const { setQuizScore } = useProgress();
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quizQuestions[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= quizQuestions.length) {
      const finalScore = score + (picked === q.correct && picked !== null ? 0 : 0); // already counted
      setDone(true);
      setQuizScore(score + (picked === q.correct ? 0 : 0));
      // record final
      setQuizScore(finalScore || score);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const restart = () => {
    setStarted(false);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Quiz</div>
          <h1 className="font-display text-5xl md:text-6xl text-gradient-gold">{t.quiz.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.quiz.subtitle}</p>
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {!started && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <button
                  onClick={() => setStarted(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold-glow"
                >
                  {t.quiz.start}
                </button>
              </motion.div>
            )}

            {started && !done && (
              <motion.div
                key={`q-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 rounded-2xl bg-card border-gold-soft shadow-museum"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {idx + 1} / {quizQuestions.length}
                  </div>
                  <div className="text-xs text-primary">
                    {t.quiz.score}: {score}
                  </div>
                </div>
                <h2 className="font-display text-2xl md:text-3xl">{q.q[lang]}</h2>
                <div className="mt-8 grid gap-3">
                  {q.options.map((o, i) => {
                    const isPicked = picked === i;
                    const isCorrect = i === q.correct;
                    const reveal = picked !== null;
                    const cls = reveal
                      ? isCorrect
                        ? "border-emerald-500/60 bg-emerald-500/10"
                        : isPicked
                          ? "border-destructive/60 bg-destructive/10"
                          : "border-border opacity-70"
                      : "border-border hover:border-primary/60 hover:bg-primary/5";
                    return (
                      <button
                        key={i}
                        onClick={() => pick(i)}
                        disabled={picked !== null}
                        className={`flex items-center gap-3 px-5 py-4 rounded-xl border text-left transition-colors ${cls}`}
                      >
                        <span className="w-7 h-7 rounded-full bg-background/50 flex items-center justify-center text-xs">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{o[lang]}</span>
                        {reveal && isCorrect && (
                          <HiCheckCircle className="text-emerald-400 text-xl" />
                        )}
                        {reveal && isPicked && !isCorrect && (
                          <HiXCircle className="text-destructive text-xl" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {picked !== null && (
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm">
                      {picked === q.correct ? (
                        <span className="text-emerald-400">{t.quiz.correct}</span>
                      ) : (
                        <span className="text-destructive">{t.quiz.wrong}</span>
                      )}
                    </div>
                    <button
                      onClick={next}
                      className="px-6 py-2.5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium"
                    >
                      {idx + 1 >= quizQuestions.length ? t.quiz.finish : t.quiz.next}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {done && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-10 rounded-2xl bg-card border-gold-soft shadow-museum"
              >
                <div className="text-xs uppercase tracking-[0.3em] text-primary">
                  {t.quiz.score}
                </div>
                <div className="mt-2 font-display text-7xl text-gradient-gold">
                  {score}
                  <span className="text-2xl text-muted-foreground">/{quizQuestions.length}</span>
                </div>
                <p className="mt-4 text-muted-foreground">
                  {t.quiz.result(score, quizQuestions.length)}
                </p>
                <button
                  onClick={restart}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border-gold-soft hover:bg-primary/10"
                >
                  <HiArrowPath /> {t.quiz.restart}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
