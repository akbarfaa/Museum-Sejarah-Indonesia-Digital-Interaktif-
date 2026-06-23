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
  Mesh,
} from "@babylonjs/core";
import { doorHeaderH } from "./SceneUtils";

export function buildCinemaHall(
  scene: Scene,
  highlight: HighlightLayer,
  onEnterCinema: () => void,
  lang: "en" | "id"
) {
  // Grand Cinema Dimensions (Lebih Besar & Megah)
  const cz = 190;
  const cx = 0;
  const W = 28; // Diperlebar dari 20
  const D = 28; // Diperdalam dari 22
  const H = 9;  // Ketinggian langit-langit dinaikkan ke 9m agar megah

  // Materials Setup
  const cFloorMat = new StandardMaterial("cinemaFloorMat", scene);
  cFloorMat.diffuseColor = new Color3(0.12, 0.03, 0.04); // Navy/Burgundy peredam
  cFloorMat.specularColor = new Color3(0.05, 0.01, 0.01);
  
  const cFloor = MeshBuilder.CreateGround("cinema-floor", { width: W, height: D }, scene);
  cFloor.position = new Vector3(cx, 0, cz);
  cFloor.material = cFloorMat;
  cFloor.checkCollisions = true;

  const cCeilMat = new StandardMaterial("cinemaCeilMat", scene);
  cCeilMat.diffuseColor = new Color3(0.03, 0.02, 0.02); // Plafon bioskop hitam pekat
  
  const cCeil = MeshBuilder.CreateGround("cinema-ceil", { width: W, height: D }, scene);
  cCeil.position = new Vector3(cx, H, cz);
  cCeil.rotation.x = Math.PI;
  cCeil.material = cCeilMat;

  // Soundproofing Textured Walls (Acoustic Royal Red & Gold Trim)
  const darkWall = new StandardMaterial("cinemaAcousticWall", scene);
  darkWall.diffuseColor = new Color3(0.18, 0.05, 0.07); // Merah bioskop gelap
  darkWall.specularColor = new Color3(0.05, 0.02, 0.02);

  const goldMat = new StandardMaterial("cinemaGoldTrim", scene);
  goldMat.diffuseColor = new Color3(0.85, 0.68, 0.21); // Emas
  goldMat.specularColor = new Color3(1, 0.9, 0.65);

  const buildAcousticWall = (name: string, width: number, height: number, depth: number, pos: Vector3, rotY: number) => {
    const parent = new Mesh(`parent-${name}`, scene);
    parent.position = pos;
    parent.rotation.y = rotY;

    // Base wall
    const base = MeshBuilder.CreateBox(`base-${name}`, { width, height, depth }, scene);
    base.position = new Vector3(0, height / 2 - pos.y, 0);
    base.material = darkWall;
    base.checkCollisions = true;
    base.parent = parent;

    // Vertical acoustic panel stripes (Garis emas vertikal estetik bioskop IMAX)
    for (let x = -width / 2 + 3; x < width / 2; x += 4) {
      const goldStripe = MeshBuilder.CreateBox(`goldStripe-${name}-${x}`, { width: 0.08, height: height - 1.0, depth: depth + 0.03 }, scene);
      goldStripe.position = new Vector3(x, height / 2 - pos.y, 0);
      goldStripe.material = goldMat;
      goldStripe.parent = parent;
    }

    return parent;
  };

  // North wall (screen wall - solid acoustic black)
  const back = MeshBuilder.CreateBox("cinema-back", { width: W, height: H, depth: 0.4 }, scene);
  back.position = new Vector3(cx, H / 2, cz + D / 2);
  const screenWallMat = new StandardMaterial("screenWallMat", scene);
  screenWallMat.diffuseColor = new Color3(0.04, 0.04, 0.04);
  back.material = screenWallMat;
  back.checkCollisions = true;

  // West & East walls (Acoustic design)
  buildAcousticWall("cinema-left", D, H, 0.4, new Vector3(cx - W / 2, 0, cz), Math.PI / 2);
  buildAcousticWall("cinema-right", D, H, 0.4, new Vector3(cx + W / 2, 0, cz), -Math.PI / 2);

  // South wall split by entrance from corridor
  const doorW_cin = 5.5;
  const sideW_cin = (W - doorW_cin) / 2;
  
  buildAcousticWall("cinema-fL", sideW_cin, H, 0.4, new Vector3(cx - (doorW_cin / 2 + sideW_cin / 2), 0, cz - D / 2), 0);
  buildAcousticWall("cinema-fR", sideW_cin, H, 0.4, new Vector3(cx + (doorW_cin / 2 + sideW_cin / 2), 0, cz - D / 2), 0);

  const hd = MeshBuilder.CreateBox("cinema-hd", { width: doorW_cin, height: doorHeaderH, depth: 0.4 }, scene);
  hd.position = new Vector3(cx, H - doorHeaderH / 2, cz - D / 2);
  hd.material = darkWall;
  hd.checkCollisions = true;

  // BIOSKOP plaque above door
  const ptex = new DynamicTexture("cinemaPlaqueTex", { width: 1024, height: 256 }, scene, false);
  const pc = ptex.getContext() as CanvasRenderingContext2D;
  pc.fillStyle = "#160505";
  pc.fillRect(0, 0, 1024, 256);
  pc.fillStyle = "#e94560";
  pc.font = "bold 88px Georgia, serif";
  pc.textAlign = "center";
  pc.textBaseline = "middle";
  pc.fillText(lang === "id" ? "BIOSKOP MUSEUM" : "MUSEUM CINEMA", 512, 110);
  pc.font = "italic 34px Georgia, serif";
  pc.fillStyle = "#f5d6a3";
  pc.fillText("★  NOW SHOWING  ★", 512, 195);
  ptex.update();

  const pmat = new StandardMaterial("cinemaPMat", scene);
  pmat.diffuseTexture = ptex;
  pmat.emissiveTexture = ptex;
  pmat.emissiveColor = new Color3(0.9, 0.4, 0.4);
  pmat.specularColor = new Color3(0, 0, 0);

  const plaque = MeshBuilder.CreatePlane("cinema-plaque", { width: 5, height: 1.25 }, scene);
  plaque.position = new Vector3(cx, H - 0.8, cz - D / 2 - 0.21);
  plaque.material = pmat;

  // Giant IMAX Interactive Cinema Screen
  const screenW = 18, // Diperlebar dari 12
    screenH = 7.5;  // Dipertinggi dari 6
  const stex = new DynamicTexture("screenTex", { width: 1024, height: 576 }, scene, false);
  const sc = stex.getContext() as CanvasRenderingContext2D;
  const sg = sc.createLinearGradient(0, 0, 1024, 576);
  sg.addColorStop(0, "#111122");
  sg.addColorStop(0.5, "#161b2e");
  sg.addColorStop(1, "#0d2038");
  sc.fillStyle = sg;
  sc.fillRect(0, 0, 1024, 576);
  sc.fillStyle = "#e94560";
  sc.font = "bold 76px Georgia, serif";
  sc.textAlign = "center";
  sc.textBaseline = "middle";
  sc.fillText(lang === "id" ? "▶  KLIK UNTUK MENONTON" : "▶  CLICK TO WATCH", 512, 250);
  sc.font = "28px Georgia, serif";
  sc.fillStyle = "#f5d6a3";
  sc.fillText(lang === "id" ? "Dokumenter Sejarah Indonesia" : "Indonesian Heritage Documentaries", 512, 330);
  stex.update();

  const smat = new StandardMaterial("screenMat", scene);
  smat.diffuseTexture = stex;
  smat.emissiveTexture = stex;
  smat.emissiveColor = new Color3(0.95, 0.9, 1);
  smat.specularColor = new Color3(0, 0, 0);

  const screen = MeshBuilder.CreatePlane("cinema-screen", { width: screenW, height: screenH }, scene);
  screen.position = new Vector3(cx, H / 2 - 0.2, cz + D / 2 - 0.3);
  screen.material = smat;

  // Velvet Curtain Frame (Grand theater style)
  const curtainMat = new StandardMaterial("curtainMat", scene);
  curtainMat.diffuseColor = new Color3(0.48, 0.05, 0.05); // Deep crimson
  curtainMat.emissiveColor = new Color3(0.1, 0.01, 0.01);
  curtainMat.specularColor = new Color3(0.05, 0.02, 0.02);

  const cLb = MeshBuilder.CreateBox("cinema-cLb", { width: 1.2, height: H, depth: 0.6 }, scene);
  cLb.position = new Vector3(cx - screenW / 2 - 0.6, H / 2, cz + D / 2 - 0.28);
  cLb.material = curtainMat;

  const cRb = MeshBuilder.CreateBox("cinema-cRb", { width: 1.2, height: H, depth: 0.6 }, scene);
  cRb.position = new Vector3(cx + screenW / 2 + 0.6, H / 2, cz + D / 2 - 0.28);
  cRb.material = curtainMat;

  const cT = MeshBuilder.CreateBox("cinema-cT", { width: screenW + 2.4, height: 1.0, depth: 0.6 }, scene);
  cT.position = new Vector3(cx, H - 0.5, cz + D / 2 - 0.28);
  cT.material = curtainMat;

  // ============ Stadium Seating Riser Platforms (Tingkatan Tangga Bioskop) ============
  // Platform kiri dan kanan dipisahkan oleh koridor jalan tengah selebar 3.6m (X = -1.8 s/d 1.8)
  const platW = 10.0;
  const platD = 3.6;
  const platXL = -6.8;
  const platXR = 6.8;

  const buildRiser = (rowIdx: number, height: number, zPos: number) => {
    // Platform Kiri
    const platL = MeshBuilder.CreateBox(`riserL-${rowIdx}`, { width: platW, height, depth: platD }, scene);
    platL.position = new Vector3(platXL, height / 2, zPos);
    platL.material = cFloorMat;
    platL.checkCollisions = true;

    // Platform Kanan
    const platR = MeshBuilder.CreateBox(`riserR-${rowIdx}`, { width: platW, height, depth: platD }, scene);
    platR.position = new Vector3(platXR, height / 2, zPos);
    platR.material = cFloorMat;
    platR.checkCollisions = true;

    // Tangga akses ke platform diletakkan di depan (selatan) platform sisi dalam,
    // TIDAK di tengah koridor jalan utama (x = 0) agar bebas hambatan.
    // Lebar tangga: 0.9m, kedalaman: 0.5m.
    const stepW = 0.9;
    const stepD = 0.5;
    const numSteps = rowIdx; // Baris 1: 1 anak tangga, Baris 2: 2 anak tangga, Baris 3: 3 anak tangga
    const stepH = height / (numSteps + 1);

    for (let s = 1; s <= numSteps; s++) {
      const stepZ = zPos - platD / 2 - stepD * (numSteps - s + 1) + stepD / 2;
      const stepY = stepH * s;

      // Tangga Kiri (nempel di x = -2.2)
      const stepL = MeshBuilder.CreateBox(`stepL-${rowIdx}-${s}`, { width: stepW, height: stepY, depth: stepD }, scene);
      stepL.position = new Vector3(-2.25, stepY / 2, stepZ);
      stepL.material = cFloorMat;
      stepL.checkCollisions = true;

      // Tangga Kanan (nempel di x = 2.2)
      const stepR = MeshBuilder.CreateBox(`stepR-${rowIdx}-${s}`, { width: stepW, height: stepY, depth: stepD }, scene);
      stepR.position = new Vector3(2.25, stepY / 2, stepZ);
      stepR.material = cFloorMat;
      stepR.checkCollisions = true;
    }
  };

  // Baris Z Koordinat (Geser lebih ke depan/Utara agar di belakang dekat pintu masuk z=176 lapang & kosong)
  const zRows = [
    cz + 7.5,  // Baris 0 (Paling Depan - y = 0)
    cz + 3.0,  // Baris 1 (y = 0.5)
    cz - 1.5,  // Baris 2 (y = 1.0)
    cz - 6.0,  // Baris 3 (Paling Belakang - y = 1.5)
  ];

  // Buat riser platform untuk baris 1 s/d 3
  buildRiser(1, 0.5, zRows[1]);
  buildRiser(2, 1.0, zRows[2]);
  buildRiser(3, 1.5, zRows[3]);

  // ============ Cinema Seats (Dibenahi Arahnya Menghadap Layar) ============
  const seatMat = new StandardMaterial("cinemaSeatMat", scene);
  seatMat.diffuseColor = new Color3(0.58, 0.06, 0.08); // Red velvet seat
  seatMat.specularColor = new Color3(0.1, 0.02, 0.02);

  // Buat kursi bioskop di atas riser platform masing-masing
  for (let r = 0; r < 4; r++) {
    const sz = zRows[r];
    const yOffset = r * 0.5; // Ketinggian platform untuk baris tersebut

    // 8 Kursi per baris (4 di sisi kiri platform, 4 di sisi kanan platform)
    const xOffsets = [
      // Kiri
      -10.5, -9.0, -7.5, -6.0,
      // Kanan
      6.0, 7.5, 9.0, 10.5
    ];

    xOffsets.forEach((sx, sIdx) => {
      // Base seat cushion
      const seat = MeshBuilder.CreateBox(`seat-${r}-${sIdx}`, { width: 0.85, height: 0.6, depth: 0.85 }, scene);
      seat.position = new Vector3(sx, yOffset + 0.3, sz);
      seat.material = seatMat;
      seat.checkCollisions = true;

      // FIXED: Seat back diletakkan di sisi belakang (sz - 0.38) agar kursi menghadap layar (arah utara +Z)
      const sb = MeshBuilder.CreateBox(`seatBack-${r}-${sIdx}`, { width: 0.85, height: 0.95, depth: 0.16 }, scene);
      sb.position = new Vector3(sx, yOffset + 0.725, sz - 0.385);
      sb.material = seatMat;
      sb.checkCollisions = true;

      // Double Armrests (Kiri dan Kanan kursi)
      const armL = MeshBuilder.CreateBox(`seatArmL-${r}-${sIdx}`, { width: 0.1, height: 0.45, depth: 0.75 }, scene);
      armL.position = new Vector3(sx - 0.45, yOffset + 0.5, sz);
      armL.material = goldMat;
      armL.checkCollisions = true;

      const armR = MeshBuilder.CreateBox(`seatArmR-${r}-${sIdx}`, { width: 0.1, height: 0.45, depth: 0.75 }, scene);
      armR.position = new Vector3(sx + 0.45, yOffset + 0.5, sz);
      armR.material = goldMat;
      armR.checkCollisions = true;
    });
  }

  // Grand Studio Lighting
  const cl1 = new PointLight("cinemaL1", new Vector3(cx - W / 2 + 2.0, H - 2.0, cz - 6), scene);
  cl1.diffuse = new Color3(0.9, 0.4, 0.4);
  cl1.intensity = 0.85;
  cl1.range = 22;

  const cl2 = new PointLight("cinemaL2", new Vector3(cx + W / 2 - 2.0, H - 2.0, cz + 6), scene);
  cl2.diffuse = new Color3(0.9, 0.4, 0.4);
  cl2.intensity = 0.85;
  cl2.range = 22;

  const cl3 = new PointLight("cinemaL3", new Vector3(cx, H - 2.0, cz - 10), scene);
  cl3.diffuse = new Color3(0.95, 0.45, 0.45);
  cl3.intensity = 0.75;
  cl3.range = 20;

  // Projector Light beam (IMAX Projector Volumetric glow look)
  const proj = new PointLight("cinemaProj", new Vector3(cx, H - 1.0, cz - D / 2 + 2.0), scene);
  proj.diffuse = new Color3(0.8, 0.9, 1.0);
  proj.intensity = 2.0;
  proj.range = D + 6;

  // Register screen click triggers
  screen.actionManager = new ActionManager(scene);
  screen.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => highlight.addMesh(screen, Color3.FromHexString("#e94560")))
  );
  screen.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => highlight.removeMesh(screen))
  );
  screen.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPickTrigger, () => onEnterCinema())
  );

  // Screen glowing pulsation effect
  let pt = 0;
  scene.onBeforeRenderObservable.add(() => {
    pt += 0.025;
    const pulse = 0.85 + Math.sin(pt) * 0.15;
    smat.emissiveColor = new Color3(0.95 * pulse, 0.9 * pulse, 1 * pulse);
  });
}
