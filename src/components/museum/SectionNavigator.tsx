import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiChevronDown, HiChevronUp, HiMapPin } from "react-icons/hi2";
import type { RoomId, Artifact } from "@/data/artifacts";
import { getSectionsByHall } from "@/data/sections";
import { useProgress } from "@/contexts/ProgressContext";

interface SectionNavigatorProps {
  currentRoom: RoomId | "lobby" | null;
  playerPos: { x: number; z: number };
  lang: "en" | "id";
  artifacts: Artifact[];
}

const ROOM_CENTERS_Z: Record<string, number> = {
  ancient: 10,
  kingdom: 40,
  colonial: 70,
  national: 100,
  modern: 130,
  heritage: 160,
};

export function SectionNavigator({ currentRoom, playerPos, lang, artifacts }: SectionNavigatorProps) {
  const { inspectedArtifacts } = useProgress();
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  if (!currentRoom || currentRoom === "lobby" || currentRoom === "cinema" || currentRoom === "studio") {
    return null;
  }

  const sections = getSectionsByHall(currentRoom);
  if (sections.length === 0) return null;

  // Calculate which section the player is physically in based on Z position
  const centerZ = ROOM_CENTERS_Z[currentRoom] ?? 0;
  const localZ = playerPos.z - centerZ; // goes from -13 to +13 typically
  
  // Normalize localZ to [0, 26] range and clamp
  const normalizedZ = Math.max(0, Math.min(26, localZ + 13));
  const activeIndex = Math.min(
    Math.floor((normalizedZ / 26) * sections.length),
    sections.length - 1
  );
  
  const activeSectionId = sections[activeIndex]?.id;

  return (
    <div className="absolute top-20 right-6 z-30 pointer-events-none flex flex-col gap-2 max-w-[280px] w-full">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="pointer-events-auto bg-background/70 backdrop-blur-md border border-border/40 p-4 rounded-2xl flex flex-col gap-3 shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-border/20 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
            <HiMapPin className="text-primary animate-pulse" />
            {lang === "id" ? "Bagian Ruangan" : "Room Sections"}
          </span>
          <span className="text-[9px] px-2 py-0.5 bg-secondary/50 rounded-full text-muted-foreground font-semibold">
            {sections.length} {lang === "id" ? "Bagian" : "Zones"}
          </span>
        </div>

        {/* Section List */}
        <div className="flex flex-col gap-1.5 max-h-[350px] overflow-y-auto pr-1 select-none scrollbar-thin">
          {sections.map((sec, idx) => {
            const isCurrentPhysicalSection = sec.id === activeSectionId;
            const secArtifacts = artifacts.filter((a) => a.section === sec.id);
            const totalCount = secArtifacts.length;
            const inspectedCount = secArtifacts.filter((a) =>
              inspectedArtifacts.includes(a.id)
            ).length;
            const isCompleted = totalCount > 0 && inspectedCount === totalCount;
            const isExpanded = expandedSectionId === sec.id;

            return (
              <div
                key={sec.id}
                className={`rounded-xl border transition-all duration-300 ${
                  isCurrentPhysicalSection
                    ? "bg-primary/10 border-primary/30 text-foreground"
                    : "bg-secondary/20 border-border/10 text-muted-foreground hover:bg-secondary/40 hover:border-border/30"
                }`}
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedSectionId(isExpanded ? null : sec.id)}
                  className="flex items-center justify-between p-2.5 cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm shrink-0">{sec.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[11px] font-semibold truncate leading-tight ${
                        isCurrentPhysicalSection ? "text-primary" : "text-foreground/90"
                      }`}>
                        {lang === "id" ? sec.nameId : sec.nameEn}
                      </span>
                      {isCurrentPhysicalSection && (
                        <span className="text-[9px] text-primary/80 font-medium flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-primary animate-ping" />
                          {lang === "id" ? "Posisi Anda" : "You are here"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-1.5">
                    {/* Completion Check or Fraction */}
                    {isCompleted ? (
                      <HiCheckCircle className="text-emerald-500 text-sm" />
                    ) : (
                      <span className="font-mono text-[10px] font-bold text-muted-foreground bg-black/20 px-1.5 py-0.5 rounded-md">
                        {inspectedCount}/{totalCount}
                      </span>
                    )}
                    {isExpanded ? (
                      <HiChevronUp className="text-[10px]" />
                    ) : (
                      <HiChevronDown className="text-[10px]" />
                    )}
                  </div>
                </div>

                {/* Expanded Description */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-border/10"
                    >
                      <p className="p-2.5 text-[10px] text-muted-foreground leading-relaxed bg-black/10 font-sans">
                        {lang === "id" ? sec.descId : sec.descEn}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
