import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiLockClosed, HiXMark } from "react-icons/hi2";
import type { RoomId, Artifact } from "@/data/artifacts";
import { getSectionsByHall } from "@/data/sections";

interface MapModalProps {
  open: boolean;
  onClose: () => void;
  currentRoom: RoomId | "lobby" | null;
  playerPos: { x: number; z: number };
  playerRot: number;
  visitedRooms: string[];
  inspectedArtifacts: string[];
  lang: "en" | "id";
  totalCompletion: number;
  roomsList: Array<{ id: RoomId; nameEn: string; nameId: string; accent: string; descEn: string; descId: string }>;
  roomMap: Map<string, { id: RoomId; nameEn: string; nameId: string; accent: string; descEn: string; descId: string }>;
  artifacts: Artifact[];
}

export function MapModal({
  open,
  onClose,
  currentRoom,
  playerPos,
  playerRot,
  visitedRooms,
  inspectedArtifacts,
  lang,
  totalCompletion,
  roomsList,
  roomMap,
  artifacts,
}: MapModalProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<RoomId>("ancient");

  useEffect(() => {
    if (open && currentRoom && currentRoom !== "lobby") {
      const validRoom = roomsList.find((r) => r.id === currentRoom);
      if (validRoom) {
        setSelectedRoomId(currentRoom as RoomId);
      }
    }
  }, [currentRoom, open, roomsList]);
  // SVG coordinates converters
  const mapX = (x: number) => 80 + x * 3.5;
  const mapY = (z: number) => 437 - z * 2.1;

  const svgRooms = [
    { id: "ancient", nameEn: "Ancient", nameId: "Kuno", color: "#a87a3d", x: 17, y: 388.7, w: 126, h: 54.6 },
    { id: "kingdom", nameEn: "Kingdom", nameId: "Kerajaan", color: "#c9a14a", x: 17, y: 325.7, w: 126, h: 54.6 },
    { id: "colonial", nameEn: "Colonial", nameId: "Kolonial", color: "#7a8a9c", x: 17, y: 262.7, w: 126, h: 54.6 },
    { id: "national", nameEn: "National", nameId: "Nasional", color: "#d4a017", x: 17, y: 199.7, w: 126, h: 54.6 },
    { id: "modern", nameEn: "Modern", nameId: "Modern", color: "#4aa3c9", x: 17, y: 136.7, w: 126, h: 54.6 },
    { id: "heritage", nameEn: "Heritage", nameId: "Warisan", color: "#2ecc71", x: 17, y: 73.7, w: 126, h: 54.6 },
    { id: "studio", nameEn: "Studio", nameId: "Studio", color: "#9b5de5", x: 118.5, y: 59, w: 35, h: 16.8 },
    { id: "cinema", nameEn: "Cinema", nameId: "Bioskop", color: "#e94560", x: 45, y: 14.9, w: 70, h: 46.2 },
  ];

  const svgPassages = [
    // Lobby to Ancient passage
    { x: 70.375, y: 443.3, w: 19.25, h: 14.7 },
    // Ancient to Kingdom passage
    { x: 70.375, y: 380.3, w: 19.25, h: 8.4 },
    // Kingdom to Colonial passage
    { x: 70.375, y: 317.3, w: 19.25, h: 8.4 },
    // Colonial to National passage
    { x: 70.375, y: 254.3, w: 19.25, h: 8.4 },
    // National to Modern passage
    { x: 70.375, y: 191.3, w: 19.25, h: 8.4 },
    // Modern to Heritage passage
    { x: 70.375, y: 128.3, w: 19.25, h: 8.4 },
    // Heritage to Cinema passage
    { x: 70.375, y: 61.1, w: 19.25, h: 12.6 },
    // Side passage to Photo Studio
    { x: 89.625, y: 67.4, w: 28.875, h: 6.3 },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background/90 border border-border/50 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* Left Side: Info & Legend */}
            <div className="w-full md:w-[350px] border-b md:border-b-0 md:border-r border-border/30 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-gradient-gold">
                    {lang === "id" ? "Denah Museum" : "Museum Floorplan"}
                  </h2>
                  <button
                    onClick={onClose}
                    className="md:hidden p-1.5 rounded-full hover:bg-border/20 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <HiXMark className="text-xl" />
                  </button>
                </div>

                {/* Selected Room Details */}
                {(() => {
                  const selRoom = roomsList.find((r) => r.id === selectedRoomId);
                  if (!selRoom) return null;
                  const sections = getSectionsByHall(selectedRoomId);
                  const roomDetails = roomMap.get(selectedRoomId);
                  
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: selRoom.accent }} />
                        <h3 className="font-display text-lg font-bold" style={{ color: selRoom.accent }}>
                          {lang === "id" ? selRoom.nameId : selRoom.nameEn}
                        </h3>
                      </div>
                      
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-sans line-clamp-3">
                        {lang === "id" ? roomDetails?.descId : roomDetails?.descEn}
                      </p>

                      {/* Sections List */}
                      {sections.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/80 mb-2">
                            {lang === "id" ? "Bagian & Progress:" : "Sections & Progress:"}
                          </h4>
                          <div className="flex flex-col gap-1.5 max-h-[170px] overflow-y-auto pr-1 scrollbar-thin">
                            {sections.map((sec) => {
                              const secArtifacts = artifacts.filter((a) => a.section === sec.id);
                              const totalCount = secArtifacts.length;
                              const inspectedCount = secArtifacts.filter((a) =>
                                inspectedArtifacts.includes(a.id)
                              ).length;
                              const isCompleted = totalCount > 0 && inspectedCount === totalCount;
                              
                              return (
                                <div key={sec.id} className="flex items-center justify-between text-[11px] bg-secondary/15 border border-border/10 p-2 rounded-xl">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-sm shrink-0">{sec.icon}</span>
                                    <span className="truncate font-medium text-foreground/80">
                                      {lang === "id" ? sec.nameId : sec.nameEn}
                                    </span>
                                  </div>
                                  {isCompleted ? (
                                    <HiCheckCircle className="text-emerald-500 text-sm shrink-0" />
                                  ) : (
                                    <span className="font-mono text-[9px] shrink-0 font-semibold px-1.5 py-0.5 bg-black/25 rounded-md text-muted-foreground">
                                      {inspectedCount}/{totalCount}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Rooms Selector Grid */}
                <div className="mt-2 border-t border-border/20 pt-3">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">
                    {lang === "id" ? "Pilih Ruangan" : "Select Room"}
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {roomsList.map((r) => {
                      const isVisited = visitedRooms.includes(r.id);
                      const isSelected = selectedRoomId === r.id;
                      const isCurrent = currentRoom === r.id;
                      
                      return (
                        <button
                          key={r.id}
                          onClick={() => setSelectedRoomId(r.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] font-medium transition-all text-left cursor-pointer truncate ${
                            isSelected
                              ? "bg-primary/10 border-primary/40 text-foreground"
                              : "bg-secondary/10 border-transparent text-muted-foreground hover:bg-secondary/20"
                          }`}
                          style={{ borderColor: isSelected ? r.accent : undefined }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: r.accent }}
                          />
                          <span className="truncate flex-1">
                            {lang === "id" ? r.nameId.replace("Ruang ", "") : r.nameEn.replace(" Hall", "")}
                          </span>
                          {isCurrent && (
                            <span className="w-1 h-1 rounded-full bg-rose-500 animate-ping shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>


              {/* Exploration Progress */}
              <div className="mt-8 border-t border-border/20 pt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {lang === "id" ? "Total Eksplorasi" : "Total Progress"}
                  </span>
                  <span className="font-mono font-bold text-primary">{totalCompletion}%</span>
                </div>
                <div className="h-1.5 w-full bg-border/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-550"
                    style={{ width: `${totalCompletion}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Map Canvas */}
            <div className="flex-1 bg-black/20 p-6 flex items-center justify-center min-h-[400px] relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 hidden md:flex p-2 rounded-full bg-background/50 border border-border/30 hover:bg-border/20 text-muted-foreground hover:text-foreground cursor-pointer shadow-sm transition-all hover:scale-105"
              >
                <HiXMark className="text-lg" />
              </button>

              <div className="w-full max-w-[240px] aspect-[160/520] relative p-2 bg-black/35 rounded-2xl border border-border/20 max-h-[70vh]">
                <svg viewBox="0 0 160 520" className="w-full h-full">
                  {/* Passages */}
                  {svgPassages.map((p, idx) => (
                    <rect
                      key={`passage-big-${idx}`}
                      x={p.x}
                      y={p.y}
                      width={p.w}
                      height={p.h}
                      fill="#1f222e"
                      rx={2}
                    />
                  ))}

                  {/* Lobby */}
                  <rect
                    x={70.375}
                    y={458}
                    width={19.25}
                    height={62}
                    fill={currentRoom === "lobby" || !currentRoom ? "rgba(255,255,255,0.08)" : "#14161f"}
                    stroke={
                      currentRoom === "lobby" || !currentRoom
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.06)"
                    }
                    strokeWidth={1.5}
                    rx={2}
                  />
                  <text
                    x={80}
                    y={489}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(255,255,255,0.35)"
                    fontSize="7"
                    fontFamily="Georgia, serif"
                    letterSpacing="0.1em"
                  >
                    LOBBY
                  </text>

                  {/* Rooms */}
                  {svgRooms.map((r) => {
                    const isVisited = visitedRooms.includes(r.id);
                    const isCurrent = currentRoom === r.id;
                    const isSelected = selectedRoomId === r.id;
                    const sections = getSectionsByHall(r.id as RoomId);
                    const sectionsCount = sections.length;
                    
                    return (
                      <g
                        key={`room-big-${r.id}`}
                        className="cursor-pointer group"
                        onClick={() => setSelectedRoomId(r.id as RoomId)}
                      >
                        <rect
                          x={r.x}
                          y={r.y}
                          width={r.w}
                          height={r.h}
                          fill={isCurrent ? `${r.color}25` : isSelected ? "rgba(255,255,255,0.03)" : "#14161f"}
                          stroke={isSelected ? "#f5d6a3" : isCurrent ? r.color : isVisited ? `${r.color}65` : "rgba(255,255,255,0.08)"}
                          strokeWidth={isSelected ? 2 : isCurrent ? 1.5 : 1}
                          rx={4}
                          className="transition-all duration-300 group-hover:stroke-primary/50"
                        />
                        
                        {/* Section partition lines */}
                        {sectionsCount > 1 &&
                          Array.from({ length: sectionsCount - 1 }).map((_, i) => {
                            const lineY = r.y + ((i + 1) * r.h) / sectionsCount;
                            return (
                              <line
                                key={`div-${r.id}-${i}`}
                                x1={r.x}
                                y1={lineY}
                                x2={r.x + r.w}
                                y2={lineY}
                                stroke={isSelected ? "rgba(245,214,163,0.15)" : isCurrent ? `${r.color}20` : "rgba(255,255,255,0.03)"}
                                strokeWidth={0.75}
                                strokeDasharray="2,2"
                              />
                            );
                          })}

                        {/* Section icons inside room boxes */}
                        {sectionsCount > 1 &&
                          sections.map((sec, idx) => {
                            const iconY = r.y + ((idx + 0.5) * r.h) / sectionsCount;
                            return (
                              <text
                                key={`icon-${sec.id}`}
                                x={r.x + 6}
                                y={iconY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="6.5"
                                className="opacity-70 select-none pointer-events-none"
                              >
                                {sec.icon}
                              </text>
                            );
                          })}

                        <text
                          x={r.x + r.w / 2 + (sectionsCount > 1 ? 3 : 0)}
                          y={r.y + r.h / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={isSelected ? "#f5d6a3" : isCurrent ? r.color : isVisited ? "#ffffff80" : "#ffffff20"}
                          fontSize="7.5"
                          fontWeight="600"
                          fontFamily="Georgia, serif"
                          letterSpacing="0.08em"
                          className="select-none pointer-events-none"
                        >
                          {lang === "id" ? r.nameId.toUpperCase() : r.nameEn.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}

                  {/* Player Dot */}
                  <g transform={`translate(${mapX(playerPos.x)}, ${mapY(playerPos.z)})`}>
                    <path
                      d="M -6 -6 L 0 -18 L 6 -6 Z"
                      fill="rgba(244, 63, 94, 0.45)"
                      transform={`rotate(${(playerRot * 180) / Math.PI})`}
                    />
                    <circle
                      r={8}
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth={1.5}
                      className="animate-ping"
                      style={{ transformOrigin: "0 0" }}
                    />
                    <circle r={4.5} fill="#f43f5e" stroke="#ffffff" strokeWidth={1.5} />
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
