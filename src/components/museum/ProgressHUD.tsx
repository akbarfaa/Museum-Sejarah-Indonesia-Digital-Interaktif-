import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

interface ProgressHUDProps {
  visitedRoomsCount: number;
  inspectedArtifactsCount: number;
  totalArtifactsCount: number;
  totalCompletion: number;
  lang: "en" | "id";
}

export function ProgressHUD({
  visitedRoomsCount,
  inspectedArtifactsCount,
  totalArtifactsCount,
  totalCompletion,
  lang,
}: ProgressHUDProps) {
  return (
    <div className="absolute top-20 left-6 z-30 pointer-events-none flex flex-col gap-2 max-w-[260px] sm:max-w-[300px]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto bg-background/70 backdrop-blur-md border border-border/40 p-4 rounded-2xl flex flex-col gap-3 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
            <HiSparkles className="text-amber-400" />
            {lang === "id" ? "Eksplorasi" : "Exploration"}
          </span>
          <span className="text-xs font-mono font-bold text-amber-400">{totalCompletion}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-border/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalCompletion}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-[11px] border-t border-border/20 pt-2.5">
          <div>
            <div className="text-muted-foreground">{lang === "id" ? "Ruangan" : "Rooms"}</div>
            <div className="font-mono font-bold text-foreground">
              {visitedRoomsCount} / 8
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">{lang === "id" ? "Artefak" : "Artifacts"}</div>
            <div className="font-mono font-bold text-foreground">
              {inspectedArtifactsCount} / {totalArtifactsCount}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
