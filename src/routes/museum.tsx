import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowLeft, HiMap } from "react-icons/hi2";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ArtifactModal } from "@/components/ArtifactModal";
import { CinemaTheater } from "@/components/CinemaTheater";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/contexts/ProgressContext";
import {
  rooms,
  type Artifact,
  type RoomId,
  type TimelineMoment,
} from "@/data/artifacts";
import { MomentModal } from "@/components/MomentModal";
import { fetchArtifacts, fetchCinema } from "@/lib/api-client";

// Modular Sub-components
import { ProgressHUD } from "@/components/museum/ProgressHUD";
import { Minimap } from "@/components/museum/Minimap";
import { MapModal } from "@/components/museum/MapModal";
import { RoomBanner } from "@/components/museum/RoomBanner";
import { TicketModal } from "@/components/museum/TicketModal";
import { PhotoboothModal } from "@/components/museum/PhotoboothModal";
import { RoomWelcomeModal } from "@/components/museum/RoomWelcomeModal";
import { SectionNavigator } from "@/components/museum/SectionNavigator";

const MuseumScene = lazy(() =>
  import("@/components/MuseumScene").then((m) => ({ default: m.MuseumScene })),
);

export const Route = createFileRoute("/museum")({
  loader: async () => {
    return {
      artifacts: await fetchArtifacts(),
      cinemaEras: await fetchCinema(),
    };
  },
  head: () => ({
    meta: [
      { title: "Virtual Museum — History Of Indonesia Virtual Museum" },
      {
        name: "description",
        content:
          "Walk through five 3D exhibition halls of Indonesian history. WASD to move, mouse to look, click any artifact.",
      },
    ],
  }),
  component: Museum,
});

function Museum() {
  const { artifacts, cinemaEras } = Route.useLoaderData();
  const { t, lang } = useLanguage();
  const {
    visitRoom,
    inspectArtifact,
    visitedRooms,
    inspectedArtifacts,
    quizScore,
    ticketRedeemed,
    redeemTicket,
    playerName,
    playerAvatar,
    setPlayerProfile,
  } = useProgress();
  const [active, setActive] = useState<Artifact | null>(null);
  const [activeMoment, setActiveMoment] = useState<TimelineMoment | null>(null);
  const [currentRoom, setCurrentRoom] = useState<RoomId | "lobby" | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showRoomBanner, setShowRoomBanner] = useState<string | null>(null);
  const [cinemaOpen, setCinemaOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [photoboothOpen, setPhotoboothOpen] = useState(false);
  const [welcomeRoomId, setWelcomeRoomId] = useState<RoomId | null>(null);
  const [dismissedRoomPopups, setDismissedRoomPopups] = useState<RoomId[]>([]);

  // Real-time camera position & rotation
  const [playerPos, setPlayerPos] = useState({ x: 0, z: -25 });
  const [playerRot, setPlayerRot] = useState(0);

  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  const roomMap = useMemo(() => {
    return new Map(rooms.map((r) => [r.id, r]));
  }, []);

  const handleEnterRoom = (id: RoomId | "lobby") => {
    setCurrentRoom(id);
    if (id !== "lobby") {
      visitRoom(id);

      // Trigger Welcome Pop-up if it's the first time visiting this room in the session
      if (!dismissedRoomPopups.includes(id)) {
        setWelcomeRoomId(id);
        setDismissedRoomPopups((prev) => [...prev, id]);
      }

      const r = roomMap.get(id);
      if (!r) return;
      const label = lang === "id" ? r.nameId : r.nameEn;
      setShowRoomBanner(label);
      if (bannerTimer.current) clearTimeout(bannerTimer.current);
      bannerTimer.current = setTimeout(() => setShowRoomBanner(null), 2800);
    }
  };

  const handleArtifactClick = (a: Artifact) => {
    setActive(a);
    inspectArtifact(a.id);
  };

  const getRoomAccent = (roomId: RoomId | "lobby" | null) => {
    if (!roomId || roomId === "lobby") return "#c9a14a";
    if (roomId === "studio") return "#9b5de5";
    return roomMap.get(roomId)?.accent || "#c9a14a";
  };

  const getRoomName = (roomId: RoomId | "lobby" | null) => {
    if (!roomId) return "";
    if (roomId === "lobby") return lang === "id" ? "Lobi Utama" : "Grand Lobby";
    if (roomId === "studio") return lang === "id" ? "Studio Foto Virtual" : "Virtual Photo Studio";
    const room = roomMap.get(roomId);
    return lang === "id" ? room?.nameId : room?.nameEn;
  };

  const primaryRoomsVisited = visitedRooms.filter((id) => id !== "studio").length;
  const totalCompletion = Math.round(
    (primaryRoomsVisited / 6) * 40 +
      (inspectedArtifacts.length / artifacts.length) * 40 +
      (quizScore !== null ? 20 : 0),
  );

  const visibleArtifacts = artifacts;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden select-none">
      {/* HUD top bar */}
      <div className="absolute top-0 inset-x-0 z-30 px-6 py-4 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/40 text-sm hover:bg-primary/20 transition-all shadow-md text-foreground"
        >
          <HiArrowLeft /> {t.nav.home}
        </Link>

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => setMapOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/80 backdrop-blur-md border border-primary text-sm text-primary-foreground hover:bg-primary hover:scale-105 transition-all shadow-md shadow-primary/20 cursor-pointer"
          >
            <HiMap /> {lang === "id" ? "Buka Denah" : "Open Map"}
          </button>

          <div className="hidden sm:block px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/40 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.museum.controls}
          </div>
        </div>
      </div>

      {/* Progress HUD Panel (top-left) */}
      <ProgressHUD
        visitedRoomsCount={visitedRooms.length}
        inspectedArtifactsCount={inspectedArtifacts.length}
        totalArtifactsCount={artifacts.length}
        totalCompletion={totalCompletion}
        lang={lang}
      />

      {/* Section Navigator Panel (top-right) */}
      <SectionNavigator
        currentRoom={currentRoom}
        playerPos={playerPos}
        lang={lang}
        artifacts={artifacts}
      />

      {/* Persistent Minimap Widget (bottom-right) */}
      <Minimap
        currentRoom={currentRoom}
        playerPos={playerPos}
        playerRot={playerRot}
        visitedRooms={visitedRooms}
        lang={lang}
        onClick={() => setMapOpen(true)}
      />

      {/* Room Indicator Bottom-Left */}
      <AnimatePresence>
        {currentRoom && (
          <motion.div
            key={currentRoom}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-6 left-6 z-30 px-5 py-3 rounded-xl bg-background/75 backdrop-blur-md border border-border/40 pointer-events-none"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: getRoomAccent(currentRoom) }}
              />
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {t.museum.enterRoom}
                </div>
                <div className="font-display text-lg text-gradient-gold">
                  {getRoomName(currentRoom)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Room Entrance Banner */}
      <RoomBanner showRoomBanner={showRoomBanner} enterRoomLabel={t.museum.enterRoom} />

      {/* Interactive Map Overlay Modal */}
      <MapModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        currentRoom={currentRoom}
        playerPos={playerPos}
        playerRot={playerRot}
        visitedRooms={visitedRooms}
        inspectedArtifacts={inspectedArtifacts}
        lang={lang}
        totalCompletion={totalCompletion}
        roomsList={rooms.filter((r) => r.id !== "studio")}
        roomMap={roomMap}
        artifacts={artifacts}
      />

      <Suspense fallback={<LoadingScreen label={t.museum.loading} progress={60} />}>
        {mounted && (
          <MuseumScene
            artifacts={artifacts}
            lang={lang}
            onArtifactClick={handleArtifactClick}
            onMomentClick={setActiveMoment}
            onEnterRoom={handleEnterRoom}
            onEnterCinema={() => setCinemaOpen(true)}
            onPlayerMove={(pos, rot) => {
              setPlayerPos(pos);
              setPlayerRot(rot);
            }}
            ticketRedeemed={ticketRedeemed}
            onTicketDeskClick={() => setTicketModalOpen(true)}
            onPhotoboothClick={() => setPhotoboothOpen(true)}
          />
        )}
      </Suspense>

      <ArtifactModal artifact={active} onClose={() => setActive(null)} />
      <MomentModal moment={activeMoment} onClose={() => setActiveMoment(null)} />
      <CinemaTheater open={cinemaOpen} onClose={() => setCinemaOpen(false)} cinemaEras={cinemaEras} />

      <TicketModal
        open={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        visitedRooms={visitedRooms}
        ticketRedeemed={ticketRedeemed}
        onRedeem={() => {
          redeemTicket();
          setTicketModalOpen(false);
        }}
        lang={lang}
        roomsList={rooms}
      />

      <PhotoboothModal
        open={photoboothOpen}
        onClose={() => setPhotoboothOpen(false)}
        lang={lang}
        playerName={playerName}
        playerAvatar={playerAvatar}
        onSaveProfile={setPlayerProfile}
        totalArtifacts={artifacts.length}
      />

      <RoomWelcomeModal
        open={welcomeRoomId !== null}
        onClose={() => setWelcomeRoomId(null)}
        room={welcomeRoomId ? rooms.find((r) => r.id === welcomeRoomId) || null : null}
        lang={lang}
      />

      <noscript className="absolute inset-0 flex items-center justify-center bg-background text-foreground p-8">
        {visibleArtifacts.length} artifacts
      </noscript>
    </div>
  );
}
