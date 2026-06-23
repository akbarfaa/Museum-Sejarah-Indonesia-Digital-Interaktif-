import {
  Scene,
  Vector3,
  Color3,
  PointLight,
  MeshBuilder,
  StandardMaterial,
  DynamicTexture,
  ActionManager,
  ExecuteCodeAction,
  HighlightLayer,
  Material,
} from "@babylonjs/core";
import { doorHeaderH, WALL_HEIGHT } from "./SceneUtils";

export function buildPhotoStudio(
  scene: Scene,
  materials: Record<string, Material>,
  highlight: HighlightLayer,
  onPhotoboothClick: () => void,
  lang: "en" | "id"
) {
  const wallMat = materials.wallMat;
  const trimMat = materials.trimMat;
  const ceilingMat = materials.ceilingMat;

  // Center: (16.0, 0, 176.0), dimensions: width = 10, depth = 8
  const sRoomW = 10.0;
  const sRoomD = 8.0;
  const sRoomH = WALL_HEIGHT;
  const sRoomCX = 16.0;
  const sRoomCZ = 176.0;

  const sFloor = MeshBuilder.CreateGround("studioFloor", { width: sRoomW, height: sRoomD }, scene);
  sFloor.position = new Vector3(sRoomCX, 0, sRoomCZ);
  const sFloorMat = new StandardMaterial("studioFloorMat", scene);
  sFloorMat.diffuseColor = new Color3(0.18, 0.12, 0.08); // polished dark wood
  sFloorMat.specularColor = new Color3(0.5, 0.4, 0.3);
  sFloor.material = sFloorMat;
  sFloor.checkCollisions = true;

  const sCeil = MeshBuilder.CreateGround("studioCeil", { width: sRoomW, height: sRoomD }, scene);
  sCeil.position = new Vector3(sRoomCX, sRoomH, sRoomCZ);
  sCeil.rotation.x = Math.PI;
  sCeil.material = ceilingMat;

  // Studio Walls
  const sWallN = MeshBuilder.CreateBox("studioWallN", { width: sRoomW, height: sRoomH, depth: 0.4 }, scene);
  sWallN.position = new Vector3(sRoomCX, sRoomH / 2, sRoomCZ + sRoomD / 2);
  sWallN.material = wallMat;
  sWallN.checkCollisions = true;

  const sWallS = MeshBuilder.CreateBox("studioWallS", { width: sRoomW, height: sRoomH, depth: 0.4 }, scene);
  sWallS.position = new Vector3(sRoomCX, sRoomH / 2, sRoomCZ - sRoomD / 2);
  sWallS.material = wallMat;
  sWallS.checkCollisions = true;

  const sWallE = MeshBuilder.CreateBox("studioWallE", { width: 0.4, height: sRoomH, depth: sRoomD }, scene);
  sWallE.position = new Vector3(sRoomCX + sRoomW / 2, sRoomH / 2, sRoomCZ);
  sWallE.material = wallMat;
  sWallE.checkCollisions = true;

  const sWallWSouth = MeshBuilder.CreateBox("studioWallWSouth", { width: 0.4, height: sRoomH, depth: 2.5 }, scene);
  sWallWSouth.position = new Vector3(sRoomCX - sRoomW / 2, sRoomH / 2, 173.25);
  sWallWSouth.material = wallMat;
  sWallWSouth.checkCollisions = true;

  const sWallWNorth = MeshBuilder.CreateBox("studioWallWNorth", { width: 0.4, height: sRoomH, depth: 2.5 }, scene);
  sWallWNorth.position = new Vector3(sRoomCX - sRoomW / 2, sRoomH / 2, 178.75);
  sWallWNorth.material = wallMat;
  sWallWNorth.checkCollisions = true;

  const sWallWHeader = MeshBuilder.CreateBox("studioWallWHeader", { width: 0.4, height: doorHeaderH, depth: 3.0 }, scene);
  sWallWHeader.position = new Vector3(sRoomCX - sRoomW / 2, sRoomH - doorHeaderH / 2, 176.0);
  sWallWHeader.material = wallMat;
  sWallWHeader.checkCollisions = true;

  const sWallWTrim = MeshBuilder.CreateBox("studioWallWTrim", { width: 0.5, height: 0.15, depth: 3.2 }, scene);
  sWallWTrim.position = new Vector3(sRoomCX - sRoomW / 2, sRoomH - doorHeaderH, 176.0);
  sWallWTrim.material = trimMat;

  // Plaque above Studio Entrance
  const studioPlaqueTex = new DynamicTexture("studioPlaqueTex", { width: 1024, height: 256 }, scene, false);
  const spctx = studioPlaqueTex.getContext() as CanvasRenderingContext2D;
  spctx.fillStyle = "#1e140d";
  spctx.fillRect(0, 0, 1024, 256);
  spctx.fillStyle = "#c9a14a";
  spctx.font = "bold 60px Georgia, serif";
  spctx.textAlign = "center";
  spctx.textBaseline = "middle";
  spctx.fillText(lang === "id" ? "STUDIO FOTO VIRTUAL" : "VIRTUAL PHOTO STUDIO", 512, 128);
  spctx.strokeStyle = "#c9a14a";
  spctx.lineWidth = 6;
  spctx.strokeRect(12, 12, 1000, 232);
  studioPlaqueTex.update();

  const studioPlaqueMat = new StandardMaterial("studioPlaqueMat", scene);
  studioPlaqueMat.diffuseTexture = studioPlaqueTex;
  studioPlaqueMat.emissiveTexture = studioPlaqueTex;
  studioPlaqueMat.emissiveColor = new Color3(0.5, 0.4, 0.25);
  studioPlaqueMat.specularColor = new Color3(0, 0, 0);

  const studioPlaque = MeshBuilder.CreatePlane("studioPlaque", { width: 2.4, height: 0.6 }, scene);
  studioPlaque.position = new Vector3(sRoomCX - sRoomW / 2 + 0.05, WALL_HEIGHT - 0.8, 176.0); // corrected position relative to studio entrance
  studioPlaque.rotation.y = -Math.PI / 2;
  studioPlaque.material = studioPlaqueMat;

  // Backdrop Stands
  const standMat = new StandardMaterial("standMat", scene);
  standMat.diffuseColor = new Color3(0.12, 0.12, 0.12);
  standMat.specularColor = new Color3(0.3, 0.3, 0.3);

  const standL = MeshBuilder.CreateCylinder("standL", { height: 3.2, diameter: 0.06 }, scene);
  standL.position = new Vector3(19.8, 1.6, 173.5);
  standL.material = standMat;

  const standR = MeshBuilder.CreateCylinder("standR", { height: 3.2, diameter: 0.06 }, scene);
  standR.position = new Vector3(19.8, 1.6, 178.5);
  standR.material = standMat;

  const crossbar = MeshBuilder.CreateCylinder("crossbar", { height: 5.1, diameter: 0.05 }, scene);
  crossbar.position = new Vector3(19.8, 3.2, 176.0);
  crossbar.rotation.x = Math.PI / 2;
  crossbar.material = standMat;

  // Backdrop Canvas
  const backdropCanvas = MeshBuilder.CreatePlane("backdropCanvas", { width: 4.8, height: 3.0 }, scene);
  backdropCanvas.position = new Vector3(19.75, 1.5, 176.0);
  backdropCanvas.rotation.y = Math.PI / 2;
  
  const bdTex = new DynamicTexture("backdropTex", { width: 1024, height: 768 }, scene, false);
  const bdctx = bdTex.getContext() as CanvasRenderingContext2D;
  bdctx.fillStyle = "#4a0e17"; // Maroon base
  bdctx.fillRect(0, 0, 1024, 768);
  
  bdctx.strokeStyle = "rgba(201, 161, 74, 0.25)";
  bdctx.lineWidth = 6;
  for (let r = 120; r <= 720; r += 150) {
    bdctx.beginPath();
    bdctx.arc(512, 384, r, 0, Math.PI * 2);
    bdctx.stroke();
  }
  
  // Flag bands
  bdctx.fillStyle = "#c0392b";
  bdctx.fillRect(0, 0, 1024, 50);
  bdctx.fillStyle = "#ffffff";
  bdctx.fillRect(0, 50, 1024, 50);

  bdctx.fillStyle = "#f5d6a3";
  bdctx.font = "bold 42px Georgia, serif";
  bdctx.textAlign = "center";
  bdctx.fillText("M U S E U M V E R S E", 512, 260);
  bdctx.font = "italic 30px Georgia, serif";
  bdctx.fillStyle = "#ffffff";
  bdctx.fillText("INDONESIA VIRTUAL GALLERY", 512, 320);
  bdctx.strokeStyle = "#c9a14a";
  bdctx.lineWidth = 4;
  bdctx.strokeRect(30, 130, 964, 508);
  bdTex.update();

  const bdMat = new StandardMaterial("backdropMat", scene);
  bdMat.diffuseTexture = bdTex;
  bdMat.emissiveTexture = bdTex;
  bdMat.emissiveColor = new Color3(0.25, 0.18, 0.18);
  bdMat.specularColor = new Color3(0, 0, 0);
  backdropCanvas.material = bdMat;

  // Tripod-Mounted Studio Camera
  const camBody = MeshBuilder.CreateBox("camBody", { width: 0.3, height: 0.2, depth: 0.25 }, scene);
  camBody.position = new Vector3(14.5, 1.45, 176.0);
  camBody.material = standMat;

  const camLens = MeshBuilder.CreateCylinder("camLens", { height: 0.15, diameterTop: 0.12, diameterBottom: 0.12 }, scene);
  camLens.position = new Vector3(14.6, 1.45, 176.0);
  camLens.rotation.z = Math.PI / 2;
  
  const chromeMat = new StandardMaterial("chromeMat", scene);
  chromeMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
  chromeMat.specularColor = new Color3(0.9, 0.9, 0.9);
  camLens.material = chromeMat;

  const tripodLeg1 = MeshBuilder.CreateCylinder("tripodLeg1", { height: 1.5, diameter: 0.04 }, scene);
  tripodLeg1.position = new Vector3(14.4, 0.725, 175.85);
  tripodLeg1.rotation.z = 0.15;
  tripodLeg1.rotation.x = -0.15;
  tripodLeg1.material = standMat;

  const tripodLeg2 = MeshBuilder.CreateCylinder("tripodLeg2", { height: 1.5, diameter: 0.04 }, scene);
  tripodLeg2.position = new Vector3(14.4, 0.725, 176.15);
  tripodLeg2.rotation.z = 0.15;
  tripodLeg2.rotation.x = 0.15;
  tripodLeg2.material = standMat;

  const tripodLeg3 = MeshBuilder.CreateCylinder("tripodLeg3", { height: 1.5, diameter: 0.04 }, scene);
  tripodLeg3.position = new Vector3(14.65, 0.725, 176.0);
  tripodLeg3.rotation.z = -0.15;
  tripodLeg3.material = standMat;

  // Softbox light boxes
  const sbMat = new StandardMaterial("sbMat", scene);
  sbMat.diffuseColor = new Color3(0.1, 0.1, 0.1);

  const softbox1 = MeshBuilder.CreateBox("softbox1", { width: 0.4, height: 0.6, depth: 0.4 }, scene);
  softbox1.position = new Vector3(16.0, 2.2, 173.5);
  softbox1.rotation.y = -Math.PI / 4;
  softbox1.material = sbMat;

  const sbFace1 = MeshBuilder.CreatePlane("sbFace1", { width: 0.38, height: 0.58 }, scene);
  sbFace1.position = new Vector3(16.15, 2.2, 173.65);
  sbFace1.rotation.y = Math.PI - Math.PI / 4;
  
  const sbFaceMat = new StandardMaterial("sbFaceMat", scene);
  sbFaceMat.emissiveColor = new Color3(1, 0.95, 0.85);
  sbFaceMat.diffuseColor = new Color3(1, 0.95, 0.85);
  sbFace1.material = sbFaceMat;

  const sbStand1 = MeshBuilder.CreateCylinder("sbStand1", { height: 2.2, diameter: 0.04 }, scene);
  sbStand1.position = new Vector3(16.0, 1.1, 173.5);
  sbStand1.material = standMat;

  const softbox2 = MeshBuilder.CreateBox("softbox2", { width: 0.4, height: 0.6, depth: 0.4 }, scene);
  softbox2.position = new Vector3(16.0, 2.2, 178.5);
  softbox2.rotation.y = Math.PI / 4;
  softbox2.material = sbMat;

  const sbFace2 = MeshBuilder.CreatePlane("sbFace2", { width: 0.38, height: 0.58 }, scene);
  sbFace2.position = new Vector3(16.15, 2.2, 178.35);
  sbFace2.rotation.y = Math.PI + Math.PI / 4;
  sbFace2.material = sbFaceMat;

  const sbStand2 = MeshBuilder.CreateCylinder("sbStand2", { height: 2.2, diameter: 0.04 }, scene);
  sbStand2.position = new Vector3(16.0, 1.1, 178.5);
  sbStand2.material = standMat;

  const sbLight1 = new PointLight("sbLight1", new Vector3(17.5, 2.2, 174.5), scene);
  sbLight1.diffuse = new Color3(1, 0.95, 0.85);
  sbLight1.intensity = 0.55;
  sbLight1.range = 8;

  const sbLight2 = new PointLight("sbLight2", new Vector3(17.5, 2.2, 177.5), scene);
  sbLight2.diffuse = new Color3(1, 0.95, 0.85);
  sbLight2.intensity = 0.55;
  sbLight2.range = 8;

  // Kiosk Desk & Kiosk Controller
  const deskMat = new StandardMaterial("deskMat", scene);
  deskMat.diffuseColor = new Color3(0.22, 0.13, 0.07);
  deskMat.specularColor = new Color3(0.15, 0.1, 0.05);

  const kioskDesk = MeshBuilder.CreateBox("kioskDesk", { width: 0.6, height: 0.9, depth: 0.5 }, scene);
  kioskDesk.position = new Vector3(13.5, 0.45, 174.5);
  kioskDesk.material = deskMat;
  kioskDesk.checkCollisions = true;

  const kioskScreen = MeshBuilder.CreateBox("kioskScreen", { width: 0.4, height: 0.25, depth: 0.05 }, scene);
  kioskScreen.position = new Vector3(13.5, 0.98, 174.5);
  kioskScreen.rotation.y = Math.PI / 2;
  kioskScreen.rotation.x = -Math.PI / 6;

  const kioskScreenTex = new DynamicTexture("kioskScreenTex", { width: 512, height: 256 }, scene, false);
  const ksctx = kioskScreenTex.getContext() as CanvasRenderingContext2D;
  ksctx.fillStyle = "#0c1017";
  ksctx.fillRect(0, 0, 512, 256);
  ksctx.fillStyle = "#e94560";
  ksctx.font = "bold 34px Georgia, serif";
  ksctx.textAlign = "center";
  ksctx.textBaseline = "middle";
  ksctx.fillText(lang === "id" ? "STUDIO FOTO" : "PHOTO BOOTH", 256, 90);
  ksctx.font = "18px Georgia, serif";
  ksctx.fillStyle = "#c9a14a";
  ksctx.fillText(lang === "id" ? "▶ KLIK UNTUK MEMULAI ◀" : "▶ CLICK TO START ◀", 256, 170);
  ksctx.strokeStyle = "#e94560";
  ksctx.lineWidth = 4;
  ksctx.strokeRect(10, 10, 492, 236);
  kioskScreenTex.update();

  const kioskScreenMat = new StandardMaterial("kioskScreenMat", scene);
  kioskScreenMat.diffuseTexture = kioskScreenTex;
  kioskScreenMat.emissiveTexture = kioskScreenTex;
  kioskScreenMat.emissiveColor = new Color3(0.5, 0.4, 0.6);
  kioskScreen.material = kioskScreenMat;

  const kioskSpot = new PointLight("kioskSpot", new Vector3(13.5, 3.0, 174.5), scene);
  kioskSpot.diffuse = new Color3(1, 0.9, 1);
  kioskSpot.intensity = 0.5;
  kioskSpot.range = 6;

  const onKioskOver = () => {
    highlight.addMesh(kioskDesk, Color3.FromHexString("#e94560"));
    highlight.addMesh(kioskScreen, Color3.FromHexString("#e94560"));
  };
  const onKioskOut = () => {
    highlight.removeMesh(kioskDesk);
    highlight.removeMesh(kioskScreen);
  };
  const onKioskClick = () => {
    onPhotoboothClick();
  };

  [kioskDesk, kioskScreen].forEach((m) => {
    m.actionManager = new ActionManager(scene);
    m.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, onKioskOver));
    m.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, onKioskOut));
    m.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, onKioskClick));
  });
}
