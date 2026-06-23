import { motion, AnimatePresence } from "framer-motion";

interface RoomBannerProps {
  showRoomBanner: string | null;
  enterRoomLabel: string;
}

export function RoomBanner({ showRoomBanner, enterRoomLabel }: RoomBannerProps) {
  return (
    <AnimatePresence>
      {showRoomBanner && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center bg-background/30 backdrop-blur-sm px-12 py-6 rounded-2xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-2">
              {enterRoomLabel}
            </div>
            <div className="font-display text-4xl md:text-5xl text-gradient-gold">
              {showRoomBanner}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
