import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiLockClosed, HiXMark, HiTicket } from "react-icons/hi2";
import type { RoomId } from "@/data/artifacts";

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
  visitedRooms: string[];
  ticketRedeemed: boolean;
  onRedeem: () => void;
  lang: "en" | "id";
  roomsList: Array<{ id: RoomId; nameEn: string; nameId: string; accent: string }>;
}

export function TicketModal({
  open,
  onClose,
  visitedRooms,
  ticketRedeemed,
  onRedeem,
  lang,
  roomsList,
}: TicketModalProps) {
  const mainRooms = roomsList.filter((r) => r.id !== "cinema" && r.id !== "studio");
  const visitedMainCount = mainRooms.filter((r) => visitedRooms.includes(r.id)).length;
  const hasAllStamps = visitedMainCount === mainRooms.length;

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background/95 border border-border/50 rounded-3xl w-full max-w-md p-6 shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-border/20 text-muted-foreground hover:text-foreground cursor-pointer shadow-sm transition-all"
            >
              <HiXMark className="text-lg" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-gold text-primary-foreground flex items-center justify-center text-3xl shadow-gold-glow animate-pulse">
                <HiTicket />
              </div>
            </div>

            {/* Ticket Redeemed State */}
            {ticketRedeemed ? (
              <div className="text-center">
                <h3 className="font-display text-2xl text-gradient-gold mb-2">
                  {lang === "id" ? "Tiket Emas Aktif" : "Golden Ticket Active"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {lang === "id"
                    ? "Tiket Anda telah berhasil ditukarkan! Pembatas jalan teater bioskop kini telah diturunkan. Selamat menonton dokumenter!"
                    : "Your ticket has been successfully redeemed! The cinema theater barrier has been lowered. Enjoy the documentaries!"}
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/95 font-medium transition-colors cursor-pointer"
                >
                  {lang === "id" ? "Masuk Teater" : "Enter Theater"}
                </button>
              </div>
            ) : hasAllStamps ? (
              /* Ready to Redeem State */
              <div className="text-center">
                <h3 className="font-display text-2xl text-gradient-gold mb-2">
                  {lang === "id" ? "Tukarkan Tiket Emas" : "Redeem Golden Ticket"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {lang === "id"
                    ? "Selamat! Anda telah mengumpulkan kelima cap paspor sejarah Indonesia. Klik di bawah untuk menukarkan Tiket Emas Anda dan membuka bioskop!"
                    : "Congratulations! You have collected all five Indonesian history passport stamps. Click below to redeem your Golden Ticket and unlock the cinema!"}
                </p>

                <button
                  onClick={onRedeem}
                  className="w-full py-3 rounded-full bg-gradient-gold text-primary-foreground font-bold shadow-gold-glow hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <HiTicket />
                  {lang === "id" ? "Tukarkan Tiket Sekarang" : "Redeem Ticket Now"}
                </button>
              </div>
            ) : (
              /* Locked / Collecting Stamps State */
              <div>
                <h3 className="font-display text-2xl text-center text-gradient-gold mb-2">
                  {lang === "id" ? "Tiket Bioskop Terkunci" : "Cinema Ticket Locked"}
                </h3>
                <p className="text-xs text-center text-muted-foreground leading-relaxed mb-6">
                  {lang === "id"
                    ? "Untuk memasuki teater bioskop, Anda memerlukan Tiket Emas. Kumpulkan cap paspor dengan menjelajahi seluruh era sejarah:"
                    : "To enter the cinema theater, you need a Golden Ticket. Collect passport stamps by exploring all historical eras:"}
                </p>

                {/* Stamps grid */}
                <div className="flex flex-col gap-2 mb-6">
                  {mainRooms.map((r) => {
                    const isVisited = visitedRooms.includes(r.id);
                    return (
                      <div
                        key={r.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                          isVisited
                            ? "bg-primary/5 border-primary/20 text-foreground"
                            : "bg-muted/5 border-transparent text-muted-foreground/45"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: r.accent }}
                          />
                          <span className="font-medium">
                            {lang === "id" ? r.nameId : r.nameEn}
                          </span>
                        </div>

                        {isVisited ? (
                          <div className="flex items-center gap-1 text-primary text-[10px] uppercase font-bold">
                            <span>{lang === "id" ? "Tercap" : "Stamped"}</span>
                            <HiCheckCircle className="text-sm" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-muted-foreground/30 text-[10px] uppercase font-bold">
                            <span>{lang === "id" ? "Terkunci" : "Locked"}</span>
                            <HiLockClosed className="text-xs" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  {lang === "id" ? "Cap Dikumpulkan: " : "Stamps Collected: "}
                  <span className="font-mono font-bold text-foreground">
                    {visitedMainCount} / {mainRooms.length}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
