import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi2";
import type { RoomId } from "@/data/artifacts";
import { getSectionsByHall } from "@/data/sections";

interface RoomWelcomeModalProps {
  open: boolean;
  onClose: () => void;
  room: {
    id: RoomId;
    nameEn: string;
    nameId: string;
    accent: string;
    descEn: string;
    descId: string;
    objectivesEn: string[];
    objectivesId: string[];
  } | null;
  lang: "en" | "id";
}

export function RoomWelcomeModal({ open, onClose, room, lang }: RoomWelcomeModalProps) {
  if (!room) return null;

  const sections = getSectionsByHall(room.id);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          {/* Backdrop Click Dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-transparent"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="bg-background/90 border border-border/50 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden z-10"
          >
            {/* Background Glow matching Room Accent */}
            <div
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full filter blur-[80px] opacity-25 pointer-events-none transition-all duration-500"
              style={{ backgroundColor: room.accent }}
            />
            <div
              className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full filter blur-[80px] opacity-15 pointer-events-none transition-all duration-500"
              style={{ backgroundColor: room.accent }}
            />

            {/* Header Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold mb-4 border"
              style={{
                color: room.accent,
                borderColor: `${room.accent}40`,
                backgroundColor: `${room.accent}10`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: room.accent }} />
              <span>{lang === "id" ? "Eksplorasi Baru" : "New Hall Discovered"}</span>
            </div>

            {/* Room Title */}
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-gradient-gold">
              {lang === "id" ? room.nameId : room.nameEn}
            </h2>

            {/* Room Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-sans">
              {lang === "id" ? room.descId : room.descEn}
            </p>

            {/* Sections Listing */}
            {sections.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-foreground/80 mb-2">
                  {lang === "id" ? "Bagian Ruangan (Sections):" : "Section Rooms:"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sections.map((sec) => (
                    <div
                      key={sec.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-secondary/35 border border-border/20 text-muted-foreground font-sans hover:text-foreground hover:border-primary/20 transition-all cursor-default"
                    >
                      <span className="text-sm">{sec.icon}</span>
                      <span className="font-medium">{lang === "id" ? sec.nameId : sec.nameEn}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Objectives / Targets checklist */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-foreground/80 mb-3">
                {lang === "id" ? "Objek Pembelajaran:" : "Learning Objectives:"}
              </h3>
              <div className="flex flex-col gap-2.5">
                {(lang === "id" ? room.objectivesId : room.objectivesEn).map((obj, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="flex items-start gap-3 text-xs sm:text-sm text-foreground bg-secondary/20 border border-border/20 rounded-xl p-3"
                  >
                    <HiCheckCircle
                      className="text-lg shrink-0 mt-0.5"
                      style={{ color: room.accent }}
                    />
                    <span className="leading-tight text-muted-foreground/90 font-sans">{obj}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Explore Button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-gradient-gold text-primary-foreground font-bold shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group text-xs sm:text-sm uppercase tracking-wider font-sans"
            >
              <span>{lang === "id" ? "Mulai Eksplorasi" : "Start Exploring"}</span>
              <HiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
