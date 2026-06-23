import {
  Scene,
  Vector3,
  Color3,
  PointLight,
  MeshBuilder,
  StandardMaterial,
  DynamicTexture,
  Material,
  Mesh,
} from "@babylonjs/core";
import { WALL_HEIGHT, doorW } from "./SceneUtils";

export function buildLobby(
  scene: Scene,
  materials: Record<string, Material>,
  lang: "en" | "id"
) {
  // Materials Setup
  const woodMat = new StandardMaterial("lobbyWoodMat", scene);
  woodMat.diffuseColor = new Color3(0.24, 0.15, 0.1); // Mahogany
  woodMat.specularColor = new Color3(0.35, 0.28, 0.2);

  const goldMat = new StandardMaterial("lobbyGoldMat", scene);
  goldMat.diffuseColor = new Color3(0.85, 0.68, 0.21); // Emas
  goldMat.specularColor = new Color3(1.0, 0.9, 0.65);
  goldMat.specularPower = 32;

  const wallIvoryMat = new StandardMaterial("lobbyWallIvory", scene);
  wallIvoryMat.diffuseColor = new Color3(0.85, 0.82, 0.78); // Royal Ivory
  wallIvoryMat.specularColor = new Color3(0.02, 0.02, 0.02);

  const floorMat = materials.floorMat;
  const ceilingMat = materials.ceilingMat;

  // 1. Lobby Floor
  const lobbyFloor = MeshBuilder.CreateGround("lobbyFloor", { width: doorW, height: 20 }, scene);
  lobbyFloor.position = new Vector3(0, 0, -20);
  lobbyFloor.material = floorMat;
  lobbyFloor.checkCollisions = true;

  // 2. Royal Red Carpet along the center of the lobby
  const lobbyCarpet = MeshBuilder.CreateGround("lobbyCarpet", { width: 5.5, height: 20 }, scene);
  lobbyCarpet.position = new Vector3(0, 0.012, -20);
  const carpetMat = new StandardMaterial("lobbyCarpetMat", scene);
  carpetMat.diffuseColor = new Color3(0.48, 0.08, 0.12);
  carpetMat.specularColor = new Color3(0.05, 0.01, 0.01);
  lobbyCarpet.material = carpetMat;

  // 3. Lobby Ceiling
  const lobbyCeil = MeshBuilder.CreateGround("lobbyCeil", { width: doorW, height: 20 }, scene);
  lobbyCeil.position = new Vector3(0, WALL_HEIGHT, -20);
  lobbyCeil.rotation.x = Math.PI;
  lobbyCeil.material = ceilingMat;

  // Helper function to build 3D paneled walls locally for Lobby
  const buildLobbyDecoratedWall = (name: string, width: number, height: number, depth: number, pos: Vector3, rotY: number) => {
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

  // 4. Lobby Walls (Left & Right Decorated)
  buildLobbyDecoratedWall("lobbyLeftWall", 20, WALL_HEIGHT, 0.4, new Vector3(-doorW / 2, 0, -20), Math.PI / 2);
  buildLobbyDecoratedWall("lobbyRightWall", 20, WALL_HEIGHT, 0.4, new Vector3(doorW / 2, 0, -20), -Math.PI / 2);
  buildLobbyDecoratedWall("lobbyBackWall", doorW, WALL_HEIGHT, 0.4, new Vector3(0, 0, -30), 0);

  // 5. Lobby Title Plaque (Ornate wood panel with gold trim)
  const lobbyTex = new DynamicTexture("lobbyTex", { width: 1024, height: 384 }, scene, false);
  const lctx = lobbyTex.getContext() as CanvasRenderingContext2D;
  lctx.fillStyle = "#16110b";
  lctx.fillRect(0, 0, 1024, 384);
  lctx.fillStyle = "#c9a14a";
  lctx.font = "bold 90px Georgia, serif";
  lctx.textAlign = "center";
  lctx.fillText("History Of Indonesia", 512, 130);
  lctx.font = "italic 52px Georgia, serif";
  lctx.fillText("Virtual Museum", 512, 220);
  lctx.font = "36px Georgia, serif";
  lctx.fillStyle = "#e8d6a3";
  lctx.fillText(lang === "id" ? "Berjalan Menelusuri Sejarah" : "Walk Through History", 512, 310);
  lobbyTex.update();

  const lobbyMat = new StandardMaterial("lobbyMat", scene);
  lobbyMat.diffuseTexture = lobbyTex;
  lobbyMat.emissiveTexture = lobbyTex;
  lobbyMat.emissiveColor = new Color3(0.5, 0.4, 0.25);
  lobbyMat.specularColor = new Color3(0, 0, 0);

  // Double Frame for Lobby Plaque
  const plaqueFrameOuter = MeshBuilder.CreateBox("lobbyPlaqueFrameOuter", { width: 5.24, height: 2.14, depth: 0.1 }, scene);
  plaqueFrameOuter.position = new Vector3(0, 3.2, -29.74);
  plaqueFrameOuter.material = woodMat;

  const plaqueFrameInner = MeshBuilder.CreateBox("lobbyPlaqueFrameInner", { width: 5.08, height: 1.98, depth: 0.11 }, scene);
  plaqueFrameInner.position = new Vector3(0, 3.2, -29.72);
  plaqueFrameInner.material = goldMat;

  const lobbyPlaque = MeshBuilder.CreatePlane("lobbyPlaque", { width: 5, height: 1.9 }, scene);
  lobbyPlaque.position = new Vector3(0, 3.2, -29.68);
  lobbyPlaque.material = lobbyMat;

  // 6. Classical Columns at the entry passage (Left and Right)
  const buildLobbyColumn = (x: number, z: number, name: string) => {
    const col = MeshBuilder.CreateCylinder(`col-${name}`, { height: WALL_HEIGHT - 0.6, diameter: 0.35 }, scene);
    col.position = new Vector3(x, WALL_HEIGHT / 2, z);
    col.material = woodMat;
    col.checkCollisions = true;

    const base = MeshBuilder.CreateCylinder(`base-${name}`, { height: 0.3, diameter: 0.55 }, scene);
    base.position = new Vector3(x, 0.15, z);
    const marbleBaseMat = new StandardMaterial(`marbleBase-${name}`, scene);
    marbleBaseMat.diffuseColor = new Color3(0.06, 0.06, 0.06);
    base.material = marbleBaseMat;

    const top = MeshBuilder.CreateCylinder(`top-${name}`, { height: 0.3, diameter: 0.55 }, scene);
    top.position = new Vector3(x, WALL_HEIGHT - 0.15, z);
    top.material = goldMat;
  };

  buildLobbyColumn(-2.4, -12, "lobbyCol1");
  buildLobbyColumn(2.4, -12, "lobbyCol2");
  buildLobbyColumn(-2.4, -26, "lobbyCol3");
  buildLobbyColumn(2.4, -26, "lobbyCol4");

  // 7. Lobby Chandelier Lights (Gold Chandeliers)
  for (let i = 0; i < 3; i++) {
    const z = -28 + i * 8;
    const lp = new PointLight(`cl-${i}`, new Vector3(0, WALL_HEIGHT - 1.8, z), scene);
    lp.diffuse = new Color3(1, 0.88, 0.72);
    lp.intensity = 1.3;
    lp.range = 18;

    // Chandelier frame
    const rod = MeshBuilder.CreateCylinder(`rod-lobby-${i}`, { height: 1.2, diameter: 0.05 }, scene);
    rod.position = new Vector3(0, WALL_HEIGHT - 0.6, z);
    rod.material = goldMat;

    const ring = MeshBuilder.CreateTorus(`ring-lobby-${i}`, { diameter: 0.9, thickness: 0.08 }, scene);
    ring.position = new Vector3(0, WALL_HEIGHT - 1.2, z);
    ring.material = goldMat;

    const bulb = MeshBuilder.CreateSphere(`bulb-${i}`, { diameter: 0.24 }, scene);
    bulb.position = new Vector3(0, WALL_HEIGHT - 1.2, z);
    
    const bm = new StandardMaterial(`bm-${i}`, scene);
    bm.emissiveColor = new Color3(1, 0.88, 0.72);
    bm.diffuseColor = new Color3(1, 0.88, 0.72);
    bulb.material = bm;
  }
}
