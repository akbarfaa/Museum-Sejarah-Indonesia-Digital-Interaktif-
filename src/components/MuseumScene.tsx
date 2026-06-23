import { useEffect, useRef, useState } from "react";
import {
  Engine,
  Scene,
  Vector3,
  Color3,
  Color4,
  HemisphericLight,
  DirectionalLight,
  PointLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Mesh,
  UniversalCamera,
  HighlightLayer,
  GlowLayer,
  DynamicTexture,
  ActionManager,
} from "@babylonjs/core";
import {
  rooms,
  timeline,
  type Artifact,
  type RoomId,
  type TimelineMoment,
} from "@/data/artifacts";

// Modular Hall Builders
import {
  ROOM_WIDTH,
  ROOM_DEPTH,
  WALL_HEIGHT,
  ROOM_CENTERS,
  buildArtifactMesh,
} from "./museum/scene/SceneUtils";
import { buildLobby } from "./museum/scene/Lobby";
import { buildPassages } from "./museum/scene/Passages";
import { buildCinemaHall } from "./museum/scene/CinemaHall";
import { buildPhotoStudio } from "./museum/scene/PhotoStudio";
import { buildAncientHall } from "./museum/scene/AncientHall";
import { buildKingdomHall } from "./museum/scene/KingdomHall";
import { buildColonialHall } from "./museum/scene/ColonialHall";
import { buildNationalHall } from "./museum/scene/NationalHall";
import { buildModernHall } from "./museum/scene/ModernHall";
import { buildHeritageHall } from "./museum/scene/HeritageHall";

interface Props {
  artifacts: Artifact[];
  onArtifactClick: (a: Artifact) => void;
  onMomentClick: (m: TimelineMoment) => void;
  onEnterRoom: (id: RoomId) => void;
  onEnterCinema: () => void;
  lang: "en" | "id";
  onPlayerMove?: (position: { x: number; z: number }, rotationY: number) => void;
  ticketRedeemed?: boolean;
  onTicketDeskClick?: () => void;
  onPhotoboothClick?: () => void;
}

export function MuseumScene({
  artifacts,
  onArtifactClick,
  onMomentClick,
  onEnterRoom,
  onEnterCinema,
  lang,
  onPlayerMove,
  ticketRedeemed = false,
  onTicketDeskClick,
  onPhotoboothClick,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const cameraRef = useRef<UniversalCamera | null>(null);
  const lastAimedMeshRef = useRef<Mesh | null>(null);
  const [currentRoom, setCurrentRoom] = useState<RoomId | "lobby">("lobby");
  const [targeted, setTargeted] = useState(false);
  const [isNewMuseum, setIsNewMuseum] = useState(false);

  const ticketRedeemedRef = useRef(ticketRedeemed);
  const onTicketDeskClickRef = useRef(onTicketDeskClick);
  const onPhotoboothClickRef = useRef(onPhotoboothClick);

  useEffect(() => {
    ticketRedeemedRef.current = ticketRedeemed;
  }, [ticketRedeemed]);

  useEffect(() => {
    onTicketDeskClickRef.current = onTicketDeskClick;
  }, [onTicketDeskClick]);

  useEffect(() => {
    onPhotoboothClickRef.current = onPhotoboothClick;
  }, [onPhotoboothClick]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const engine = new Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true });
    engineRef.current = engine;
    
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.06, 0.05, 0.05, 1);
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogColor = new Color3(0.08, 0.06, 0.05);
    scene.fogDensity = 0.018;
    scene.gravity = new Vector3(0, -0.6, 0);
    scene.collisionsEnabled = true;

    // ============ Camera (First Person) ============
    const camera = new UniversalCamera("player", new Vector3(0, 1.7, -25), scene);
    cameraRef.current = camera;
    camera.setTarget(new Vector3(0, 1.7, -10));
    camera.attachControl(canvas, true);
    camera.speed = 0.35;
    camera.angularSensibility = 2800;
    camera.minZ = 0.1;
    camera.fov = 1.15;
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.ellipsoid = new Vector3(0.6, 0.85, 0.6);
    camera.keysUp = [87, 38]; // W, up
    camera.keysDown = [83, 40]; // S, down
    camera.keysLeft = [65, 37]; // A, left
    camera.keysRight = [68, 39]; // D, right

    const handleCanvasClick = (e: MouseEvent) => {
      if (document.pointerLockElement === canvas) {
        if (lastAimedMeshRef.current && lastAimedMeshRef.current.actionManager) {
          document.exitPointerLock?.();
          lastAimedMeshRef.current.actionManager.processTrigger(ActionManager.OnPickTrigger);
          e.preventDefault();
          e.stopPropagation();
        }
      } else {
        canvas.requestPointerLock?.();
      }
    };
    canvas.addEventListener("click", handleCanvasClick);

    // ============ Lighting & Atmosphere ============
    const hemi = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
    hemi.intensity = 0.55;
    hemi.groundColor = new Color3(0.12, 0.1, 0.08);
    hemi.diffuse = new Color3(0.95, 0.9, 0.8);

    const dir = new DirectionalLight("dir", new Vector3(-0.3, -1, 0.4), scene);
    dir.intensity = 0.5;

    const glow = new GlowLayer("glow", scene);
    glow.intensity = 0.35;

    const highlight = new HighlightLayer("hl", scene);
    highlight.blurHorizontalSize = 1.8;
    highlight.blurVerticalSize = 1.8;

    // ============ Shared Materials ============
    const floorTex = new DynamicTexture("floorTex", { width: 512, height: 512 }, scene, false);
    const fctx = floorTex.getContext() as CanvasRenderingContext2D;
    const grad = fctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, "#3a2f24");
    grad.addColorStop(0.5, "#2a221a");
    grad.addColorStop(1, "#3a2f24");
    fctx.fillStyle = grad;
    fctx.fillRect(0, 0, 512, 512);
    fctx.strokeStyle = "#1a140e";
    fctx.lineWidth = 2;
    for (let i = 0; i <= 8; i++) {
      fctx.beginPath();
      fctx.moveTo(0, i * 64);
      fctx.lineTo(512, i * 64);
      fctx.stroke();
      fctx.beginPath();
      fctx.moveTo(i * 64, 0);
      fctx.lineTo(i * 64, 512);
      fctx.stroke();
    }
    floorTex.update();

    const floorMat = new StandardMaterial("floorMat", scene);
    floorMat.diffuseTexture = floorTex;
    (floorMat.diffuseTexture as Texture).uScale = 6;
    (floorMat.diffuseTexture as Texture).vScale = 6;
    floorMat.specularColor = new Color3(0.15, 0.12, 0.08);

    const wallMat = new StandardMaterial("wallMat", scene);
    wallMat.diffuseColor = new Color3(0.78, 0.72, 0.6);
    wallMat.specularColor = new Color3(0.05, 0.05, 0.05);

    const trimMat = new StandardMaterial("trimMat", scene);
    trimMat.diffuseColor = new Color3(0.45, 0.34, 0.18);
    trimMat.emissiveColor = new Color3(0.05, 0.03, 0.01);

    const ceilingMat = new StandardMaterial("ceilingMat", scene);
    ceilingMat.diffuseColor = new Color3(0.25, 0.21, 0.16);
    ceilingMat.specularColor = new Color3(0, 0, 0);

    const materials = { floorMat, wallMat, trimMat, ceilingMat };

    // ============ Build Scene Components ============
    
    // 1. Lobby
    buildLobby(scene, materials, lang);

    // 2. Corridors (Passages), ticket counter & barriers
    const { rope } = buildPassages(scene, materials, lang, () => onTicketDeskClickRef.current?.(), highlight);

    // 3. Cinema Theater Room
    buildCinemaHall(scene, highlight, () => onEnterCinema(), lang);

    // 4. Photo Studio Booth
    buildPhotoStudio(scene, materials, highlight, () => onPhotoboothClickRef.current?.(), lang);

    // 4. Photo Studio Booth
    buildPhotoStudio(scene, materials, highlight, () => onPhotoboothClickRef.current?.(), lang);

    // 5. Build Exhibition Halls
    const handleArtifactClick = (a: Artifact) => onArtifactClick(a);
    const handleMomentClick = (m: TimelineMoment) => onMomentClick(m);

    rooms.forEach((r, idx) => {
      const hallArtifacts = artifacts.filter((a) => a.room === r.id);
      const hallMoments = timeline.filter((m) => m.room === r.id);

      if (r.id === "ancient") {
        buildAncientHall(scene, r as any, idx, materials, highlight, hallArtifacts, hallMoments, handleArtifactClick, handleMomentClick, lang);
      } else if (r.id === "kingdom") {
        buildKingdomHall(scene, r as any, idx, materials, highlight, hallArtifacts, hallMoments, handleArtifactClick, handleMomentClick, lang);
      } else if (r.id === "colonial") {
        buildColonialHall(scene, r as any, idx, materials, highlight, hallArtifacts, hallMoments, handleArtifactClick, handleMomentClick, lang);
      } else if (r.id === "national") {
        buildNationalHall(scene, r as any, idx, materials, highlight, hallArtifacts, hallMoments, handleArtifactClick, handleMomentClick, lang);
      } else if (r.id === "modern") {
        buildModernHall(scene, r as any, idx, materials, highlight, hallArtifacts, hallMoments, handleArtifactClick, handleMomentClick, lang);
      } else if (r.id === "heritage") {
        buildHeritageHall(scene, r as any, idx, materials, highlight, hallArtifacts, hallMoments, handleArtifactClick, handleMomentClick, lang);
      }
    });

    // ============ Game Loop & Position Tracking ============
    let lastX = 0,
      lastZ = -25,
      lastRot = 0;
    let lastRoom: RoomId | "lobby" | null = null;

    scene.onBeforeRenderObservable.add(() => {
      // Responsive Raycasting for Crosshair interaction under Pointer Lock
      if (scene.activeCamera) {
        const ray = scene.createPickingRay(
          canvas.width / 2,
          canvas.height / 2,
          null,
          scene.activeCamera
        );
        const hit = scene.pickWithRay(ray);
        let aimedMesh: Mesh | null = null;

        if (hit && hit.hit && hit.pickedMesh) {
          let curr = hit.pickedMesh;
          while (curr) {
            if (curr.actionManager) {
              aimedMesh = curr as Mesh;
              break;
            }
            curr = curr.parent as Mesh;
          }

          // Companion check: route sub-meshes or items back to their interactive parent/companion
          if (!aimedMesh && hit.pickedMesh.name) {
            const name = hit.pickedMesh.name;
            if (name.startsWith("item-")) {
              const id = name.replace("item-", "");
              const companion = scene.getMeshByName(`glass-${id}`) || scene.getMeshByName(`ped-${id}`);
              if (companion && companion.actionManager) {
                aimedMesh = companion as Mesh;
              }
            } else if (name.startsWith("innerFrame-")) {
              const id = name.replace("innerFrame-", "");
              const companion = scene.getMeshByName(`outerFrame-${id}`);
              if (companion && companion.actionManager) {
                aimedMesh = companion as Mesh;
              }
            }
          }
        }

        if (aimedMesh !== lastAimedMeshRef.current) {
          if (lastAimedMeshRef.current && lastAimedMeshRef.current.actionManager) {
            lastAimedMeshRef.current.actionManager.processTrigger(ActionManager.OnPointerOutTrigger);
          }
          if (aimedMesh && aimedMesh.actionManager) {
            aimedMesh.actionManager.processTrigger(ActionManager.OnPointerOverTrigger);
          }
          lastAimedMeshRef.current = aimedMesh;
          setTargeted(!!aimedMesh);
        }
      }

      const pos = camera.position;
      const rot = camera.rotation.y;

      // Vertical bounds clamp
      if (pos.y < 1.7) pos.y = 1.7;
      if (pos.y > 6.0) pos.y = 6.0;

      // Z boundary clamp
      if (pos.z < -28.5) pos.z = -28.5;
      if (pos.z > 200.5) pos.z = 200.5;

      // Control access to Cinema Hall via rope check
      if (ticketRedeemedRef.current) {
        if (rope.isEnabled()) {
          rope.setEnabled(false);
          rope.checkCollisions = false;
        }
      } else {
        if (!rope.isEnabled()) {
          rope.setEnabled(true);
          rope.checkCollisions = true;
        }
      }

      // Position update callbacks
      if (onPlayerMove) {
        if (Math.abs(pos.x - lastX) > 0.05 || Math.abs(pos.z - lastZ) > 0.05 || Math.abs(rot - lastRot) > 0.05) {
          lastX = pos.x;
          lastZ = pos.z;
          lastRot = rot;
          onPlayerMove({ x: pos.x, z: pos.z }, rot);
        }
      }

      // Check current active room
      let r: RoomId | "lobby" = "lobby";
      if (pos.x >= 10.8 && pos.x <= 21.2 && pos.z >= 171.8 && pos.z <= 180.2) {
        r = "studio";
      } else {
        for (const room of rooms) {
          const center = ROOM_CENTERS[room.id];
          const dx = Math.abs(pos.x - center.x);
          const dz = Math.abs(pos.z - center.z);
          const wLimit = room.id === "cinema" ? 10.5 : (ROOM_WIDTH / 2 + 0.5);
          const dLimit = room.id === "cinema" ? 11.5 : (ROOM_DEPTH / 2 + 0.5);
          if (dx <= wLimit && dz <= dLimit) {
            r = room.id;
            break;
          }
        }
      }

      if (r !== lastRoom) {
        lastRoom = r;
        setCurrentRoom(r);
        if (r !== "lobby") onEnterRoom(r);
      }
    });

    engine.runRenderLoop(() => scene.render());
    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("click", handleCanvasClick);
      if (lastAimedMeshRef.current && lastAimedMeshRef.current.actionManager) {
        lastAimedMeshRef.current.actionManager.processTrigger(ActionManager.OnPointerOutTrigger);
      }
      lastAimedMeshRef.current = null;
      scene.dispose();
      engine.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full outline-none" tabIndex={0} />
      {/* Premium Interactive Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
        {/* Outer Gold Ring pulsing when interactive */}
        <div
          className={`absolute w-6 h-6 rounded-full border border-amber-400/80 transition-all duration-300 ease-out ${
            targeted ? "scale-100 opacity-100 rotate-45" : "scale-0 opacity-0"
          }`}
        />
        {/* Center Dot - Glowing gold when aimed at interactive items, else semi-transparent white */}
        <div
          className={`rounded-full transition-all duration-200 ease-out ${
            targeted
              ? "w-2.5 h-2.5 bg-amber-400 border border-amber-300 shadow-[0_0_12px_rgba(251,191,36,1)] scale-110"
              : "w-1.5 h-1.5 bg-white/60 border border-black/20"
          }`}
        />
      </div>
    </div>
  );
}
