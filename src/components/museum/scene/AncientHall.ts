import { Scene, HighlightLayer, Material } from "@babylonjs/core";
import { Artifact, TimelineMoment } from "@/data/artifacts";
import { buildBaseHall, layoutRoomArtifacts } from "./SceneUtils";

export function buildAncientHall(
  scene: Scene,
  room: { id: "ancient"; nameEn: string; nameId: string; accent: string },
  idx: number,
  materials: Record<string, Material>,
  highlight: HighlightLayer,
  hallArtifacts: Artifact[],
  hallMoments: TimelineMoment[],
  onArtifactClick: (a: Artifact) => void,
  onMomentClick: (m: TimelineMoment) => void,
  lang: "en" | "id"
) {
  // 1. Build base hall geometry
  buildBaseHall(scene, room, idx, materials, lang);

  // 2. Position artifacts dynamically using the slot layout engine (hides missing images, prevents overlaps)
  layoutRoomArtifacts(scene, "ancient", hallArtifacts, highlight, onArtifactClick);
}
