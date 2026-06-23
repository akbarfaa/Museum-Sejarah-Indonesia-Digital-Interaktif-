import {
  Scene,
  Vector3,
  Color3,
  PointLight,
  MeshBuilder,
  StandardMaterial,
  DynamicTexture,
  Mesh,
  ActionManager,
  ExecuteCodeAction,
  HighlightLayer,
  Material,
  Texture,
} from "@babylonjs/core";
import { WALL_HEIGHT, doorW, doorHeaderH } from "./SceneUtils";

export function buildPassages(
  scene: Scene,
  materials: Record<string, Material>,
  lang: "en" | "id",
  onTicketDeskClick: () => void,
  highlight: HighlightLayer
): { rope: Mesh } {
  // Materials Setup
  const woodMat = new StandardMaterial("passageWoodMat", scene);
  woodMat.diffuseColor = new Color3(0.24, 0.15, 0.1); // Mahogany
  woodMat.specularColor = new Color3(0.35, 0.28, 0.2);

  const goldMat = new StandardMaterial("passageGoldMat", scene);
  goldMat.diffuseColor = new Color3(0.85, 0.68, 0.21); // Emas
  goldMat.specularColor = new Color3(1.0, 0.9, 0.65);
  goldMat.specularPower = 32;

  const wallIvoryMat = new StandardMaterial("passageWallIvory", scene);
  wallIvoryMat.diffuseColor = new Color3(0.85, 0.82, 0.78); // Royal Ivory
  wallIvoryMat.specularColor = new Color3(0.02, 0.02, 0.02);

  const floorMat = materials.floorMat;
  const ceilingMat = materials.ceilingMat;

  // Local helper to build 3D paneled walls for passages
  const buildPassageDecoratedWall = (name: string, width: number, height: number, depth: number, pos: Vector3, rotY: number) => {
    const parent = new Mesh(`parent-${name}`, scene);
    parent.position = pos;
    parent.rotation.y = rotY;

    // Top wall
    const top = MeshBuilder.CreateBox(`top-${name}`, { width, height: height - 1.4, depth }, scene);
    top.position = new Vector3(0, 1.4 + (height - 1.4) / 2 - pos.y, 0);
    top.material = wallIvoryMat;
    top.checkCollisions = true;
    top.parent = parent;

    // Bottom wood panel
    const bottom = MeshBuilder.CreateBox(`bottom-${name}`, { width: width + 0.01, height: 1.4, depth: depth + 0.04 }, scene);
    bottom.position = new Vector3(0, 0.7 - pos.y, 0);
    bottom.material = woodMat;
    bottom.checkCollisions = true;
    bottom.parent = parent;

    // Gold Rail
    const gold = MeshBuilder.CreateBox(`gold-${name}`, { width: width + 0.02, height: 0.06, depth: depth + 0.06 }, scene);
    gold.position = new Vector3(0, 1.43 - pos.y, 0);
    gold.material = goldMat;
    gold.parent = parent;

    // Crown molding
    const crown = MeshBuilder.CreateBox(`crown-${name}`, { width: width + 0.01, height: 0.16, depth: depth + 0.02 }, scene);
    crown.position = new Vector3(0, height - 0.08 - pos.y, 0);
    crown.material = woodMat;
    crown.parent = parent;

    return parent;
  };

  const buildPassageZ = (zStart: number, zEnd: number, xCenter: number, widthX: number) => {
    const len = zEnd - zStart;
    const zCenter = (zStart + zEnd) / 2;

    const floor = MeshBuilder.CreateGround(`pFloorZ-${zCenter}`, { width: widthX, height: len }, scene);
    floor.position = new Vector3(xCenter, 0, zCenter);
    floor.material = floorMat;
    floor.checkCollisions = true;

    // Royal carpet in the middle of passage
    const pCarpet = MeshBuilder.CreateGround(`pCarpetZ-${zCenter}`, { width: 5.5, height: len }, scene);
    pCarpet.position = new Vector3(xCenter, 0.012, zCenter);
    const pCarpetMat = new StandardMaterial(`pCarpetMat-${zCenter}`, scene);
    pCarpetMat.diffuseColor = new Color3(0.48, 0.08, 0.12);
    pCarpetMat.specularColor = new Color3(0.05, 0.01, 0.01);
    pCarpet.material = pCarpetMat;

    const ceil = MeshBuilder.CreateGround(`pCeilZ-${zCenter}`, { width: widthX, height: len }, scene);
    ceil.position = new Vector3(xCenter, WALL_HEIGHT, zCenter);
    ceil.rotation.x = Math.PI;
    ceil.material = ceilingMat;

    // Left and Right walls decorated with wainscoting
    buildPassageDecoratedWall(`pWallZE-${zCenter}`, len, WALL_HEIGHT, 0.4, new Vector3(xCenter + widthX / 2, 0, zCenter), Math.PI / 2);
    buildPassageDecoratedWall(`pWallZW-${zCenter}`, len, WALL_HEIGHT, 0.4, new Vector3(xCenter - widthX / 2, 0, zCenter), -Math.PI / 2);

    // Chandelier hanging light for corridor
    const pLight = new PointLight(`pLight-${zCenter}`, new Vector3(xCenter, WALL_HEIGHT - 1.6, zCenter), scene);
    pLight.diffuse = new Color3(1, 0.88, 0.72);
    pLight.intensity = 1.0;
    pLight.range = 14;

    const rod = MeshBuilder.CreateCylinder(`rod-corr-${zCenter}`, { height: 1.0, diameter: 0.04 }, scene);
    rod.position = new Vector3(xCenter, WALL_HEIGHT - 0.5, zCenter);
    rod.material = goldMat;

    const fixture = MeshBuilder.CreateSphere(`fixture-corr-${zCenter}`, { diameter: 0.28 }, scene);
    fixture.position = new Vector3(xCenter, WALL_HEIGHT - 1.0, zCenter);
    
    const bulbMat = new StandardMaterial(`bulbMat-corr-${zCenter}`, scene);
    bulbMat.emissiveColor = new Color3(1, 0.88, 0.72);
    bulbMat.diffuseColor = new Color3(1, 0.88, 0.72);
    fixture.material = bulbMat;
  };

  // 1. Lobby to Ancient (Z: -10 to -3)
  buildPassageZ(-10, -3, 0, doorW);
  // 2. Ancient to Kingdom (Z: 23 to 27)
  buildPassageZ(23, 27, 0, doorW);
  // 3. Kingdom to Colonial (Z: 53 to 57)
  buildPassageZ(53, 57, 0, doorW);
  // 4. Colonial to National (Z: 83 to 87)
  buildPassageZ(83, 87, 0, doorW);
  // 5. National to Modern (Z: 113 to 117)
  buildPassageZ(113, 117, 0, doorW);
  // 6. Modern to Heritage (Z: 143 to 147)
  buildPassageZ(143, 147, 0, doorW);

  // 7. Heritage to Cinema Passage (Z: 173 to 179)
  const corrLen = 6;
  const corrZCenter = 176;
  const corrWidthX = doorW;

  const corrFloor = MeshBuilder.CreateGround("corrStudioFloor", { width: corrWidthX, height: corrLen }, scene);
  corrFloor.position = new Vector3(0, 0, corrZCenter);
  corrFloor.material = floorMat;
  corrFloor.checkCollisions = true;

  const corrCarpet = MeshBuilder.CreateGround("corrStudioCarpet", { width: 5.5, height: corrLen }, scene);
  corrCarpet.position = new Vector3(0, 0.012, corrZCenter);
  const corrCarpetMat = new StandardMaterial("corrStudioCarpetMat", scene);
  corrCarpetMat.diffuseColor = new Color3(0.48, 0.08, 0.12);
  corrCarpet.material = corrCarpetMat;

  const corrCeil = MeshBuilder.CreateGround("corrStudioCeil", { width: corrWidthX, height: corrLen }, scene);
  corrCeil.position = new Vector3(0, WALL_HEIGHT, corrZCenter);
  corrCeil.rotation.x = Math.PI;
  corrCeil.material = ceilingMat;

  // West wall (solid decorated)
  buildPassageDecoratedWall("corrStudioWallW", corrLen, WALL_HEIGHT, 0.4, new Vector3(-corrWidthX / 2, 0, corrZCenter), -Math.PI / 2);

  // Ceiling light
  const corrLight = new PointLight("corrLight", new Vector3(0, WALL_HEIGHT - 1.5, corrZCenter), scene);
  corrLight.diffuse = new Color3(1, 0.88, 0.72);
  corrLight.intensity = 1.0;
  corrLight.range = 14;

  const corrRod = MeshBuilder.CreateCylinder("corrRod", { height: 1.0, diameter: 0.04 }, scene);
  corrRod.position = new Vector3(0, WALL_HEIGHT - 0.5, corrZCenter);
  corrRod.material = goldMat;

  const corrBulb = MeshBuilder.CreateSphere("corrBulb", { diameter: 0.28 }, scene);
  corrBulb.position = new Vector3(0, WALL_HEIGHT - 1.0, corrZCenter);
  const corrBulbMat = new StandardMaterial("corrBulbMat", scene);
  corrBulbMat.emissiveColor = new Color3(1, 0.88, 0.72);
  corrBulbMat.diffuseColor = new Color3(1, 0.88, 0.72);
  corrBulb.material = corrBulbMat;

  // East wall split by doorway (from z = 174.5 to 177.5)
  buildPassageDecoratedWall("corrStudioWallESouth", 1.5, WALL_HEIGHT, 0.4, new Vector3(corrWidthX / 2, 0, 173.75), Math.PI / 2);
  buildPassageDecoratedWall("corrStudioWallENorth", 1.5, WALL_HEIGHT, 0.4, new Vector3(corrWidthX / 2, 0, 178.25), Math.PI / 2);

  const corrWallEHeader = MeshBuilder.CreateBox("corrStudioWallEHeader", { width: 0.45, height: doorHeaderH, depth: 3.0 }, scene);
  corrWallEHeader.position = new Vector3(corrWidthX / 2, WALL_HEIGHT - doorHeaderH / 2, corrZCenter);
  corrWallEHeader.material = woodMat;
  corrWallEHeader.checkCollisions = true;

  const corrWallETrim = MeshBuilder.CreateBox("corrStudioWallETrim", { width: 0.55, height: 0.15, depth: 3.2 }, scene);
  corrWallETrim.position = new Vector3(corrWidthX / 2, WALL_HEIGHT - doorHeaderH, corrZCenter);
  corrWallETrim.material = goldMat;

  // 8. Photo Studio Entrance Passage (Z = 176.0)
  const passXStart = 2.75;
  const passXEnd = 11.0;
  const passZCenter = 176.0;
  const passWidthZ = 3.0;
  const passLenX = passXEnd - passXStart;
  const passXCenter = (passXStart + passXEnd) / 2;

  const passFloor = MeshBuilder.CreateGround("passStudioFloor", { width: passLenX, height: passWidthZ }, scene);
  passFloor.position = new Vector3(passXCenter, 0, passZCenter);
  passFloor.material = floorMat;
  passFloor.checkCollisions = true;

  const passCarpet = MeshBuilder.CreateGround("passStudioCarpet", { width: passLenX, height: 2.0 }, scene);
  passCarpet.position = new Vector3(passXCenter, 0.012, passZCenter);
  const passCarpetMat = new StandardMaterial("passStudioCarpetMat", scene);
  passCarpetMat.diffuseColor = new Color3(0.48, 0.08, 0.12);
  passCarpet.material = passCarpetMat;

  const passCeil = MeshBuilder.CreateGround("passStudioCeil", { width: passLenX, height: passWidthZ }, scene);
  passCeil.position = new Vector3(passXCenter, WALL_HEIGHT, passZCenter);
  passCeil.rotation.x = Math.PI;
  passCeil.material = ceilingMat;

  buildPassageDecoratedWall("passStudioWallN", passLenX, WALL_HEIGHT, 0.4, new Vector3(passXCenter, 0, passZCenter + passWidthZ / 2), 0);
  buildPassageDecoratedWall("passStudioWallS", passLenX, WALL_HEIGHT, 0.4, new Vector3(passXCenter, 0, passZCenter - passWidthZ / 2), 0);

  const passLight = new PointLight("passLight", new Vector3(passXCenter, WALL_HEIGHT - 1.5, passZCenter), scene);
  passLight.diffuse = new Color3(1, 0.88, 0.72);
  passLight.intensity = 1.0;
  passLight.range = 16;

  const passRod = MeshBuilder.CreateCylinder("passRod", { height: 1.0, diameter: 0.04 }, scene);
  passRod.position = new Vector3(passXCenter, WALL_HEIGHT - 0.5, passZCenter);
  passRod.material = goldMat;

  const passBulb = MeshBuilder.CreateSphere("passBulb", { diameter: 0.28 }, scene);
  passBulb.position = new Vector3(passXCenter, WALL_HEIGHT - 1.0, passZCenter);
  passBulb.material = corrBulbMat;

  // ============ Ticket Counter and Barrier (Royal Desk styling) ============
  const deskFrame = MeshBuilder.CreateBox("ticketDeskFrame", { width: 1.42, height: 1.02, depth: 0.92 }, scene);
  deskFrame.position = new Vector3(-1.8, 0.5, 174.5);
  deskFrame.material = woodMat;
  deskFrame.checkCollisions = true;

  const ticketDesk = MeshBuilder.CreateBox("ticketDesk", { width: 1.3, height: 1.0, depth: 0.8 }, scene);
  ticketDesk.position = new Vector3(-1.8, 0.5, 174.5);
  const ticketDeskWallMat = new StandardMaterial("ticketDeskWallMat", scene);
  ticketDeskWallMat.diffuseColor = new Color3(0.08, 0.08, 0.08); // Black polished panel inside wood frame
  ticketDeskWallMat.specularColor = new Color3(0.8, 0.8, 0.8);
  ticketDeskWallMat.specularPower = 32;
  ticketDesk.material = ticketDeskWallMat;
  ticketDesk.checkCollisions = true;

  const deskTop = MeshBuilder.CreateBox("deskTop", { width: 1.5, height: 0.08, depth: 1.0 }, scene);
  deskTop.position = new Vector3(-1.8, 1.04, 174.5);
  const deskTopMat = new StandardMaterial("deskTopMat", scene);
  deskTopMat.diffuseColor = new Color3(0.24, 0.15, 0.1); // Polished Mahogany
  deskTopMat.specularColor = new Color3(0.4, 0.3, 0.2);
  deskTop.material = deskTopMat;

  // Desk Gold Trim
  const deskTrim = MeshBuilder.CreateBox("deskTrim", { width: 1.46, height: 0.05, depth: 0.96 }, scene);
  deskTrim.position = new Vector3(-1.8, 0.98, 174.5);
  deskTrim.material = goldMat;

  // Ticket Counter Plaque
  const deskPlaqueTex = new DynamicTexture("deskPlaqueTex", { width: 512, height: 256 }, scene, false);
  const dpctx = deskPlaqueTex.getContext() as CanvasRenderingContext2D;
  dpctx.fillStyle = "#160f0a";
  dpctx.fillRect(0, 0, 512, 256);
  dpctx.fillStyle = "#c9a14a";
  dpctx.font = "bold 32px Georgia, serif";
  dpctx.textAlign = "center";
  dpctx.textBaseline = "middle";
  dpctx.fillText(lang === "id" ? "PENUKARAN TIKET" : "TICKET COUNTER", 256, 95);
  dpctx.font = "italic 22px Georgia, serif";
  dpctx.fillStyle = "#ffffff";
  dpctx.fillText(lang === "id" ? "★ Klik untuk Tukar ★" : "★ Click to Exchange ★", 256, 175);
  dpctx.strokeStyle = "#c9a14a";
  dpctx.lineWidth = 6;
  dpctx.strokeRect(12, 12, 488, 232);
  deskPlaqueTex.update();

  const deskPlaqueMat = new StandardMaterial("deskPlaqueMat", scene);
  deskPlaqueMat.diffuseTexture = deskPlaqueTex;
  deskPlaqueMat.emissiveTexture = deskPlaqueTex;
  deskPlaqueMat.emissiveColor = new Color3(0.4, 0.35, 0.25);
  deskPlaqueMat.specularColor = new Color3(0, 0, 0);
  deskPlaqueMat.backFaceCulling = false;

  const deskPlaque = MeshBuilder.CreatePlane("deskPlaque", { width: 1.0, height: 0.5 }, scene);
  deskPlaque.position = new Vector3(-1.8, 0.55, 174.01);
  deskPlaque.material = deskPlaqueMat;

  // Ticket Box
  const ticketBox = MeshBuilder.CreateBox("ticketBox", { width: 0.45, height: 0.25, depth: 0.35 }, scene);
  ticketBox.position = new Vector3(-1.8, 1.2, 174.5);
  ticketBox.material = goldMat;
  
  // Ticket Globe/Orb
  const ticketGlobe = MeshBuilder.CreateSphere("ticketGlobe", { diameter: 0.16 }, scene);
  ticketGlobe.position = new Vector3(-1.8, 1.4, 174.5);
  const ticketGlobeMat = new StandardMaterial("ticketGlobeMat", scene);
  ticketGlobeMat.emissiveColor = new Color3(1, 0.85, 0.3);
  ticketGlobeMat.diffuseColor = new Color3(1, 0.9, 0.5);
  ticketGlobe.material = ticketGlobeMat;

  const deskSpot = new PointLight("deskSpot", new Vector3(-1.8, 3.5, 174.5), scene);
  deskSpot.diffuse = new Color3(1, 0.92, 0.8);
  deskSpot.intensity = 1.0;
  deskSpot.range = 8;

  // Highlight action registry
  const onDeskOver = () => {
    highlight.addMesh(deskFrame, Color3.FromHexString("#f5d6a3"));
    highlight.addMesh(ticketBox, Color3.FromHexString("#f5d6a3"));
    highlight.addMesh(ticketGlobe, Color3.FromHexString("#f5d6a3"));
  };
  const onDeskOut = () => {
    highlight.removeMesh(deskFrame);
    highlight.removeMesh(ticketBox);
    highlight.removeMesh(ticketGlobe);
  };
  const onDeskClick = () => {
    onTicketDeskClick();
  };

  [deskFrame, ticketBox, ticketGlobe].forEach((m) => {
    m.actionManager = new ActionManager(scene);
    m.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, onDeskOver));
    m.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, onDeskOut));
    m.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, onDeskClick));
  });

  // Velvet Rope Barrier (Post styling match Chandelier)
  const postL = MeshBuilder.CreateCylinder("postL", { height: 1.2, diameter: 0.08 }, scene);
  postL.position = new Vector3(-2.5, 0.6, 178);
  const postR = MeshBuilder.CreateCylinder("postR", { height: 1.2, diameter: 0.08 }, scene);
  postR.position = new Vector3(2.5, 0.6, 178);

  postL.material = goldMat;
  postR.material = goldMat;
  postL.checkCollisions = true;
  postR.checkCollisions = true;

  const postBaseL = MeshBuilder.CreateCylinder("postBaseL", { height: 0.06, diameter: 0.3 }, scene);
  postBaseL.position = new Vector3(-2.5, 0.03, 178);
  postBaseL.material = goldMat;
  const postBaseR = MeshBuilder.CreateCylinder("postBaseR", { height: 0.06, diameter: 0.3 }, scene);
  postBaseR.position = new Vector3(2.5, 0.03, 178);
  postBaseR.material = goldMat;

  const postTopL = MeshBuilder.CreateSphere("postTopL", { diameter: 0.16 }, scene);
  postTopL.position = new Vector3(-2.5, 1.28, 178);
  postTopL.material = goldMat;
  const postTopR = MeshBuilder.CreateSphere("postTopR", { diameter: 0.16 }, scene);
  postTopR.position = new Vector3(2.5, 1.28, 178);
  postTopR.material = goldMat;

  const rope = MeshBuilder.CreateCylinder("rope", { height: 5.0, diameter: 0.06 }, scene);
  rope.position = new Vector3(0, 0.9, 178);
  rope.rotation.z = Math.PI / 2;

  const ropeMat = new StandardMaterial("ropeMat", scene);
  ropeMat.diffuseColor = new Color3(0.65, 0.06, 0.08); // Red Velvet
  ropeMat.specularColor = new Color3(0.1, 0.02, 0.02);
  rope.material = ropeMat;
  rope.checkCollisions = true;

  return { rope };
}
