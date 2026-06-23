import { motion } from "framer-motion";
import { HiMap } from "react-icons/hi2";
import type { RoomId } from "@/data/artifacts";
import { getSectionsByHall } from "@/data/sections";

interface MinimapProps {
  currentRoom: RoomId | "lobby" | null;
  playerPos: { x: number; z: number };
  playerRot: number;
  visitedRooms: string[];
  lang: "en" | "id";
  onClick: () => void;
}

export function Minimap({
  currentRoom,
  playerPos,
  playerRot,
  visitedRooms,
  lang,
  onClick,
}: MinimapProps) {
  // SVG coordinates converters
  const mapX = (x: number) => 80 + x * 3.5;
  const mapY = (z: number) => 437 - z * 2.1;

  const svgRooms = [
    { id: "ancient", color: "#a87a3d", x: 17, y: 388.7, w: 126, h: 54.6 },
    { id: "kingdom", color: "#c9a14a", x: 17, y: 325.7, w: 126, h: 54.6 },
    { id: "colonial", color: "#7a8a9c", x: 17, y: 262.7, w: 126, h: 54.6 },
    { id: "national", color: "#d4a017", x: 17, y: 199.7, w: 126, h: 54.6 },
    { id: "modern", color: "#4aa3c9", x: 17, y: 136.7, w: 126, h: 54.6 },
    { id: "heritage", color: "#2ecc71", x: 17, y: 73.7, w: 126, h: 54.6 },
    { id: "studio", color: "#9b5de5", x: 118.5, y: 59, w: 35, h: 16.8 },
    { id: "cinema", color: "#e94560", x: 45, y: 14.9, w: 70, h: 46.2 },
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
    <div className="absolute bottom-6 right-6 z-30 hidden md:flex flex-col gap-3 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pointer-events-auto bg-background/75 backdrop-blur-md border border-border/40 p-3 rounded-2xl flex flex-col gap-2 shadow-xl w-[180px] cursor-pointer hover:border-primary/50 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center justify-between border-b border-border/20 pb-1.5 text-[10px] uppercase font-bold tracking-[0.25em] text-muted-foreground">
          <span>{lang === "id" ? "DENAH MINI" : "MINIMAP"}</span>
          <HiMap className="text-primary text-xs" />
        </div>

        {/* Minimap Render */}
        <div className="w-full aspect-[160/520] bg-black/40 rounded-lg overflow-hidden relative border border-border/10 p-1 max-h-[300px]">
          <svg viewBox="0 0 160 520" className="w-full h-full">
            {/* Passages */}
            {svgPassages.map((p, idx) => (
              <rect
                key={`p-${idx}`}
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                fill="#1a1c23"
                rx={1}
              />
            ))}

            {/* Lobby */}
            <rect
              x={70.375}
              y={458}
              width={19.25}
              height={62}
              fill={currentRoom === "lobby" || !currentRoom ? "rgba(255,255,255,0.06)" : "#16181f"}
              stroke={currentRoom === "lobby" || !currentRoom ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.05)"}
              strokeWidth={1}
              rx={1}
            />

            {/* Rooms */}
            {svgRooms.map((r) => {
              const isVisited = visitedRooms.includes(r.id);
              const isCurrent = currentRoom === r.id;
              const sections = getSectionsByHall(r.id as RoomId);
              const sectionsCount = sections.length;
              
              return (
                <g key={r.id}>
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    fill={isCurrent ? `${r.color}25` : "#16181f"}
                    stroke={isCurrent ? r.color : isVisited ? `${r.color}75` : "rgba(255,255,255,0.05)"}
                    strokeWidth={isCurrent ? 1.5 : 1}
                    rx={3}
                  />
                  
                  {/* Mini section partition lines */}
                  {sectionsCount > 1 &&
                    Array.from({ length: sectionsCount - 1 }).map((_, i) => {
                      const lineY = r.y + ((i + 1) * r.h) / sectionsCount;
                      return (
                        <line
                          key={`mdiv-${r.id}-${i}`}
                          x1={r.x}
                          y1={lineY}
                          x2={r.x + r.w}
                          y2={lineY}
                          stroke={isCurrent ? `${r.color}20` : "rgba(255,255,255,0.02)"}
                          strokeWidth={0.5}
                          strokeDasharray="1,1"
                        />
                      );
                    })}

                  {/* Mini section icons */}
                  {sectionsCount > 1 &&
                    sections.map((sec, idx) => {
                      const iconY = r.y + ((idx + 0.5) * r.h) / sectionsCount;
                      return (
                        <text
                          key={`micon-${sec.id}`}
                          x={r.x + 5}
                          y={iconY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="5"
                          className="opacity-50 select-none pointer-events-none"
                        >
                          {sec.icon}
                        </text>
                      );
                    })}
                </g>
              );
            })}

            {/* Player Indicator */}
            <g transform={`translate(${mapX(playerPos.x)}, ${mapY(playerPos.z)})`}>
              <path
                d="M -5 -5 L 0 -15 L 5 -5 Z"
                fill="rgba(244, 63, 94, 0.4)"
                transform={`rotate(${(playerRot * 180) / Math.PI})`}
              />
              <circle r={6} fill="none" stroke="#f43f5e" strokeWidth={1} className="animate-ping" style={{ transformOrigin: "0 0" }} />
              <circle r={3.5} fill="#f43f5e" stroke="#ffffff" strokeWidth={1} />
            </g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
