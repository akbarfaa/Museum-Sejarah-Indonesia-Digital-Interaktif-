import { motion } from "framer-motion";

export function LoadingScreen({ label, progress }: { label: string; progress?: number }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background bg-hero">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-primary/40 flex items-center justify-center shadow-gold-glow">
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-gold"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="font-display text-2xl text-gradient-gold">{label}</p>
        <div className="mt-6 w-64 h-[2px] bg-border overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-gold"
            initial={{ width: "0%" }}
            animate={{ width: `${progress ?? 80}%` }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
