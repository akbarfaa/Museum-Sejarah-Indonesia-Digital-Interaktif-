import {
  Scene,
  Vector3,
  Color3,
  PointLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  DynamicTexture,
  Mesh,
  ActionManager,
  ExecuteCodeAction,
  HighlightLayer,
  Material,
} from "@babylonjs/core";
import {
  Artifact,
  RoomId,
  TimelineMoment,
} from "@/data/artifacts";

// Room Dimensions
export const ROOM_WIDTH = 36;
export const ROOM_DEPTH = 26;
export const WALL_HEIGHT = 7;
export const doorW = 7.5;
export const doorHeaderH = 2.0;

// Layout centers along Z-axis
export const ROOM_CENTERS: Record<RoomId, Vector3> = {
  ancient: new Vector3(0, 0, 10),
  kingdom: new Vector3(0, 0, 40),
  colonial: new Vector3(0, 0, 70),
  national: new Vector3(0, 0, 100),
  modern: new Vector3(0, 0, 130),
  heritage: new Vector3(0, 0, 160),
  studio: new Vector3(16, 0, 176),
  cinema: new Vector3(0, 0, 193),
};

export const ROOM_DOORWAYS: Record<RoomId, string[]> = {
  ancient: ["south", "north"],
  kingdom: ["south", "north"],
  colonial: ["south", "north"],
  national: ["south", "north"],
  modern: ["south", "north"],
  heritage: ["south", "north"],
  studio: ["west"],
  cinema: ["south"],
};

export const isWallArtifact = (a: Artifact) => {
  return a.shape === "wall";
};

export const VALID_IMAGE_IDS = [
  "aceh-iskandar-muda",
  "angklung",
  "asmat-carving",
  "austronesian-map",
  "banda-spices",
  "banjar-sultanate",
  "banten-sultanate",
  "batavia-founding",
  "batik",
  "borobudur",
  "bpupki-pancasila",
  "budi-utomo",
  "bung-tomo-radio",
  "canggal-inscription",
  "cave-painting-kalimantan",
  "chola-raid",
  "ciaruteun-taruma",
  "cirebon-sultanate",
  "crown",
  "cut-nyak-dhien",
  "daendels-road",
  "demak-mosque",
  "dieng-temple",
  "diponegoro-kris",
  "g30s",
  "gajah-mada",
  "galuh-kingdom",
  "gamelan",
  "ganesha",
  "garuda",
  "gowa-tallo",
  "gunung-padang",
  "habibie-reformasi",
  "hasanuddin-helmet",
  "homo-erectus",
  "homo-floresiensis",
  "homo-soloensis",
  "homo-wajakensis",
  "ikn-nusantara",
  "imam-bonjol",
  "indische-partij",
  "indonesia-raya",
  "inscription",
  "kaa-bandung",
  "kalingga-shima",
  "kediri-bharatayudha",
  "ken-dedes",
  "keris",
  "kmb",
  "komodo-national-park",
  "lorentz-park",
  "megalith",
  "meganthropus",
  "merah-putih",
  "moko-alor",
  "monas",
  "nahdlatul-ulama",
  "negarakertagama",
  "nekara-pejeng",
  "nias-megalith",
  "noken-papua",
  "old-photo",
  "outrigger-canoe",
  "pajajaran-siliwangi",
  "palapa-satellite",
  "pattimura",
  "pencak-silat",
  "peta-formation",
  "pni-soekarno",
  "politik-etis",
  "portuguese-malacca",
  "prambanan",
  "proklamasi",
  "puputan-bali",
  "rengasdengklok",
  "romusha",
  "samudera-pasai",
  "sangiran-site",
  "santa-cruz",
  "sarekat-islam",
  "sisingamangaraja",
  "soekarno-speech",
  "stone-axe",
  "subak-bali",
  "sudirman",
  "sumpah-pemuda",
  "supersemar",
  "surabaya-spear",
  "sutasoma",
  "taman-siswa",
  "tan-malaka",
  "tanam-paksa",
  "tari-kecak",
  "tari-saman",
  "tenun-ikat",
  "ternate-baabullah",
  "toraja-tongkonan",
  "tragedi-1998",
  "tsunami-aceh",
  "voc-map",
  "waruga-minahasa",
  "wayang",
  "yupa-kutai"
];

export const getArtifactTexture = (art: Artifact, sc: Scene, onLoad?: () => void) => {
  if (VALID_IMAGE_IDS.includes(art.id)) {
    const tex = new Texture(`/assets/artifacts/${art.id}.png?v=2`, sc, false, true, Texture.BILINEAR_SAMPLINGMODE, onLoad);
    tex.hasAlpha = true;
    return tex;
  }
  
  // Dynamic fallback texture for missing scraped images (Gold-framed mahogany velvet placard)
  const tex = new DynamicTexture(`graphic-${art.id}`, { width: 512, height: 512 }, sc, false);
  const ctx = tex.getContext() as CanvasRenderingContext2D;
  
  const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 280);
  grad.addColorStop(0, "#2a1c12");
  grad.addColorStop(1, "#0a0806");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = "#c9a14a";
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, 472, 472);

  ctx.strokeStyle = "rgba(201, 161, 74, 0.4)";
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, 452, 452);

  const drawCorner = (x: number, y: number, dx: number, dy: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 40);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 40, y);
    ctx.stroke();
  };
  ctx.strokeStyle = "#f5d6a3";
  ctx.lineWidth = 4;
  drawCorner(40, 40, 1, 1);
  drawCorner(472, 40, -1, 1);
  drawCorner(40, 472, 1, -1);
  drawCorner(472, 472, -1, -1);

  ctx.fillStyle = art.color || "#c9a14a";
  ctx.font = "140px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let icon = "🏺";
  if (art.shape === "sword") icon = "⚔️";
  else if (art.shape === "scroll") icon = "📜";
  else if (art.shape === "flag") icon = "🇮🇩";
  else if (art.shape === "crown") icon = "👑";
  else if (art.shape === "book") icon = "📖";
  else if (art.shape === "bust") icon = "🗿";
  else if (art.shape === "tablet") icon = "🪪";

  const nameLower = art.name.en.toLowerCase();
  if (nameLower.includes("fossil") || nameLower.includes("skull") || nameLower.includes("man")) icon = "💀";
  else if (nameLower.includes("axe") || nameLower.includes("tool")) icon = "🪓";
  else if (nameLower.includes("stone") || nameLower.includes("megalith") || nameLower.includes("menhir") || nameLower.includes("waruga") || nameLower.includes("padang")) icon = "🪨";
  else if (nameLower.includes("boat") || nameLower.includes("canoe") || nameLower.includes("migration") || nameLower.includes("outrigger")) icon = "⛵";
  else if (nameLower.includes("temple") || nameLower.includes("candi")) icon = "🛕";
  else if (nameLower.includes("inscription") || nameLower.includes("yupa") || nameLower.includes("prasasti") || nameLower.includes("charter")) icon = "📜";
  else if (nameLower.includes("king") || nameLower.includes("queen") || nameLower.includes("sultan") || nameLower.includes("empire")) icon = "👑";
  else if (nameLower.includes("weapon") || nameLower.includes("spear") || nameLower.includes("keris") || nameLower.includes("kris") || nameLower.includes("rencong") || nameLower.includes("peta")) icon = "⚔️";
  else if (nameLower.includes("map") || nameLower.includes("peta") || nameLower.includes("trade")) icon = "🗺️";
  else if (nameLower.includes("photo") || nameLower.includes("picture") || nameLower.includes("batavia")) icon = "🖼️";
  else if (nameLower.includes("text") || nameLower.includes("treaty") || nameLower.includes("pledge") || nameLower.includes("speech") || nameLower.includes("proklamasi")) icon = "📜";
  else if (nameLower.includes("money") || nameLower.includes("coin") || nameLower.includes("trade") || nameLower.includes("satellite") || nameLower.includes("monas")) icon = "🪙";

  ctx.fillText(icon, 256, 190);

  ctx.fillStyle = "#f5d6a3";
  ctx.font = "bold 26px Georgia, serif";
  const words = art.name.en.split(" ");
  let line = "";
  const lines = [];
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > 380 && line !== "") {
      lines.push(line.trim());
      line = w + " ";
    } else {
      line = test;
    }
  }
  lines.push(line.trim());

  const startY = 320;
  lines.slice(0, 2).forEach((l, idx) => {
    ctx.fillText(l, 256, startY + idx * 34);
  });

  ctx.fillStyle = "#c9a14a";
  ctx.font = "italic 18px Georgia, serif";
  ctx.fillText(art.era.en, 256, startY + lines.slice(0, 2).length * 34 + 15);

  ctx.fillStyle = "rgba(245, 214, 163, 0.7)";
  ctx.font = "14px sans-serif";
  ctx.fillText(art.origin.en.toUpperCase(), 256, 450);

  tex.update();
  tex.hasAlpha = true;
  return tex;
};

// Helper to get era-themed royal gallery wall colors
export const getHallColors = (roomId: RoomId) => {
  switch (roomId) {
    case "ancient":
      return {
        wallColor: new Color3(0.12, 0.20, 0.15), // Deep sage / forest green (purbakala)
        accentColor: "#2b382d",
      };
    case "kingdom":
      return {
        wallColor: new Color3(0.32, 0.06, 0.08), // Imperial burgundy / wine red (kejayaan kerajaan)
        accentColor: "#800020",
      };
    case "colonial":
      return {
        wallColor: new Color3(0.08, 0.15, 0.26), // Royal Navy / Maritime blue (kolonial)
        accentColor: "#152238",
      };
    case "national":
      return {
        wallColor: new Color3(0.65, 0.65, 0.65), // Gallery Warm Grey / White Marble (perjuangan suci)
        accentColor: "#d2d2d2",
      };
    case "modern":
      return {
        wallColor: new Color3(0.16, 0.16, 0.18), // Carbon Grey / Midnight black (modern & kini)
        accentColor: "#212121",
      };
    case "heritage":
      return {
        wallColor: new Color3(0.38, 0.16, 0.11), // Antique Terracotta / Clay red (warisan budaya & alam)
        accentColor: "#8b4513",
      };
    default:
      return {
        wallColor: new Color3(0.4, 0.35, 0.28),
        accentColor: "#c9a14a",
      };
  }
};

// Builder for ornate 3D panel walls (wood wainscoting bottom, gold rail middle, colored wall top, crown molding)
function createDecoratedWall(
  name: string,
  scene: Scene,
  width: number,
  depth: number,
  position: Vector3,
  rotationY: number,
  wallColor: Color3,
  woodMat: StandardMaterial,
  goldMat: StandardMaterial
) {
  const parent = new Mesh(`parent-${name}`, scene);
  parent.position = position;
  parent.rotation.y = rotationY;

  // 1. Top Wall (Gallery Colored Cat) - Height: 5.6m, y center at 4.2
  const topWall = MeshBuilder.CreateBox(`top-${name}`, { width, height: 5.6, depth }, scene);
  topWall.position = new Vector3(0, 4.2, 0);
  const topMat = new StandardMaterial(`topMat-${name}`, scene);
  topMat.diffuseColor = wallColor;
  topMat.specularColor = new Color3(0.04, 0.04, 0.04);
  topWall.material = topMat;
  topWall.checkCollisions = true;
  topWall.parent = parent;

  // 2. Bottom Wood Wall (Wainscoting) - Height: 1.4m, y center at 0.7
  const bottomWall = MeshBuilder.CreateBox(`bottom-${name}`, { width: width + 0.01, height: 1.4, depth: depth + 0.04 }, scene);
  bottomWall.position = new Vector3(0, 0.7, 0);
  bottomWall.material = woodMat;
  bottomWall.checkCollisions = true;
  bottomWall.parent = parent;

  // 3. Gold Chair Rail Accent - Height: 0.06m, y center at 1.43
  const goldRail = MeshBuilder.CreateBox(`gold-${name}`, { width: width + 0.02, height: 0.06, depth: depth + 0.06 }, scene);
  goldRail.position = new Vector3(0, 1.43, 0);
  goldRail.material = goldMat;
  goldRail.parent = parent;

  // 4. Wood Crown Molding - Height: 0.16m, y center at 6.92
  const crown = MeshBuilder.CreateBox(`crown-${name}`, { width: width + 0.01, height: 0.16, depth: depth + 0.02 }, scene);
  crown.position = new Vector3(0, 6.92, 0);
  crown.material = woodMat;
  crown.parent = parent;
  
  return parent;
}

// ============================================================
// Majestic Ornate 3D Gapura (Traditional Indonesian Archway)
// Covers the entire entrance gate with stepped pillars,
// decorative wing walls, layered crowns, relief panels,
// curved arch segments, torch lights, and a golden finial.
// ============================================================
function createGapuraEntrance(
  scene: Scene,
  roomId: RoomId,
  center: Vector3,
  nameId: string,
  nameEn: string,
  accentColor: string,
  woodMat: StandardMaterial,
  goldMat: StandardMaterial,
  lang: "en" | "id"
) {
  const zPos = center.z - ROOM_DEPTH / 2; // South wall plane

  // -- Accent material for hall-specific colour touches --
  const accentMat = new StandardMaterial(`accentMat-${roomId}`, scene);
  accentMat.diffuseColor = Color3.FromHexString(accentColor);
  accentMat.specularColor = new Color3(0.3, 0.25, 0.15);
  accentMat.emissiveColor = Color3.FromHexString(accentColor).scale(0.15);

  // -- Stone material for the base and pillar steps --
  const stoneMat = new StandardMaterial(`stoneMat-${roomId}`, scene);
  stoneMat.diffuseColor = new Color3(0.35, 0.3, 0.25);
  stoneMat.specularColor = new Color3(0.08, 0.08, 0.06);

  // Parent node
  const g = new Mesh(`gapura-${roomId}`, scene);
  g.position = new Vector3(center.x, 0, zPos);

  // pillar x-center offset from doorway center
  const px = doorW / 2 + 1.0; // pillars sit beside the doorway opening

  // =====================================================
  // HELPER: Build one massive stepped pillar (mirrored)
  // =====================================================
  const buildPillar = (side: "L" | "R") => {
    const sign = side === "L" ? -1 : 1;
    const xc = sign * px;

    // Step 1 — Grand Plinth / Pedestal (wide base)
    const plinth = MeshBuilder.CreateBox(`plinth${side}-${roomId}`, { width: 2.4, height: 0.6, depth: 2.0 }, scene);
    plinth.position = new Vector3(xc, 0.3, 0);
    plinth.material = stoneMat;
    plinth.parent = g;
    plinth.checkCollisions = true;

    // Step 2 — Second tier step
    const step2 = MeshBuilder.CreateBox(`step2${side}-${roomId}`, { width: 2.0, height: 0.5, depth: 1.7 }, scene);
    step2.position = new Vector3(xc, 0.85, 0);
    step2.material = woodMat;
    step2.parent = g;
    step2.checkCollisions = true;

    // Gold trim ring between step 2 and main shaft
    const trimLow = MeshBuilder.CreateBox(`trimLow${side}-${roomId}`, { width: 1.85, height: 0.12, depth: 1.55 }, scene);
    trimLow.position = new Vector3(xc, 1.16, 0);
    trimLow.material = goldMat;
    trimLow.parent = g;

    // Step 3 — Main pillar shaft (tall)
    const shaft = MeshBuilder.CreateBox(`shaft${side}-${roomId}`, { width: 1.5, height: 3.2, depth: 1.3 }, scene);
    shaft.position = new Vector3(xc, 2.82, 0);
    shaft.material = woodMat;
    shaft.parent = g;
    shaft.checkCollisions = true;

    // Decorative carved relief panel on front face of shaft
    const reliefTex = new DynamicTexture(`reliefTex${side}-${roomId}`, { width: 256, height: 512 }, scene, false);
    const rctx = reliefTex.getContext() as CanvasRenderingContext2D;
    rctx.fillStyle = "#1a120a";
    rctx.fillRect(0, 0, 256, 512);
    // Gold border
    rctx.strokeStyle = "#c9a14a";
    rctx.lineWidth = 8;
    rctx.strokeRect(20, 20, 216, 472);
    // Inner border
    rctx.strokeStyle = "#8b6914";
    rctx.lineWidth = 3;
    rctx.strokeRect(35, 35, 186, 442);
    // Ornamental lotus / floral motif (stylised)
    rctx.fillStyle = "#c9a14a";
    rctx.font = "bold 72px Georgia, serif";
    rctx.textAlign = "center";
    rctx.textBaseline = "middle";
    rctx.fillText("✦", 128, 128);
    rctx.font = "60px Georgia, serif";
    rctx.fillText("❖", 128, 256);
    rctx.font = "bold 72px Georgia, serif";
    rctx.fillText("✦", 128, 384);
    reliefTex.update();

    const reliefMat = new StandardMaterial(`reliefMat${side}-${roomId}`, scene);
    reliefMat.diffuseTexture = reliefTex;
    reliefMat.emissiveTexture = reliefTex;
    reliefMat.emissiveColor = new Color3(0.35, 0.28, 0.15);
    reliefMat.specularColor = new Color3(0, 0, 0);

    const reliefPanel = MeshBuilder.CreatePlane(`reliefPanel${side}-${roomId}`, { width: 1.1, height: 2.6 }, scene);
    reliefPanel.position = new Vector3(xc, 2.82, -0.66);
    reliefPanel.material = reliefMat;
    reliefPanel.parent = g;

    // Gold trim ring mid-shaft
    const trimMid = MeshBuilder.CreateBox(`trimMid${side}-${roomId}`, { width: 1.65, height: 0.1, depth: 1.45 }, scene);
    trimMid.position = new Vector3(xc, 2.8, 0);
    trimMid.material = goldMat;
    trimMid.parent = g;

    // Gold trim ring top of shaft
    const trimTop = MeshBuilder.CreateBox(`trimTop${side}-${roomId}`, { width: 1.65, height: 0.12, depth: 1.45 }, scene);
    trimTop.position = new Vector3(xc, 4.48, 0);
    trimTop.material = goldMat;
    trimTop.parent = g;

    // Pillar Capital — wider shelf at top of shaft
    const capital = MeshBuilder.CreateBox(`capital${side}-${roomId}`, { width: 2.0, height: 0.35, depth: 1.7 }, scene);
    capital.position = new Vector3(xc, 4.77, 0);
    capital.material = woodMat;
    capital.parent = g;

    // Gold crown molding on capital
    const capGold = MeshBuilder.CreateBox(`capGold${side}-${roomId}`, { width: 2.1, height: 0.1, depth: 1.8 }, scene);
    capGold.position = new Vector3(xc, 4.99, 0);
    capGold.material = goldMat;
    capGold.parent = g;

    // ---- Torch / Lamp on Pillar (illuminated) ----
    // Torch bracket
    const bracket = MeshBuilder.CreateBox(`bracket${side}-${roomId}`, { width: 0.12, height: 0.08, depth: 0.6 }, scene);
    bracket.position = new Vector3(xc, 3.8, -0.85);
    bracket.material = goldMat;
    bracket.parent = g;

    // Torch flame bowl
    const bowl = MeshBuilder.CreateCylinder(`bowl${side}-${roomId}`, { height: 0.3, diameterTop: 0.35, diameterBottom: 0.15, tessellation: 8 }, scene);
    bowl.position = new Vector3(xc, 3.95, -1.1);
    bowl.material = goldMat;
    bowl.parent = g;

    // Flame glow (emissive sphere)
    const flame = MeshBuilder.CreateSphere(`flame${side}-${roomId}`, { diameter: 0.28 }, scene);
    flame.position = new Vector3(xc, 4.15, -1.1);
    const flameMat = new StandardMaterial(`flameMat${side}-${roomId}`, scene);
    flameMat.diffuseColor = new Color3(1, 0.7, 0.2);
    flameMat.emissiveColor = new Color3(1, 0.65, 0.15);
    flameMat.specularColor = new Color3(0, 0, 0);
    flame.material = flameMat;
    flame.parent = g;

    // Torch point light
    const torchLight = new PointLight(`torchLight${side}-${roomId}`, new Vector3(center.x + xc, 4.2, zPos - 1.1), scene);
    torchLight.diffuse = new Color3(1, 0.8, 0.45);
    torchLight.intensity = 0.65;
    torchLight.range = 8;

    // ---- Wing Wall (connects pillar outward to main hall wall) ----
    const sideW = (ROOM_WIDTH - doorW) / 2;
    const wingW = sideW / 2 - 0.2;
    if (wingW > 0.5) {
      // Decorative angled wing wall stepping out from pillar
      const wing = MeshBuilder.CreateBox(`wing${side}-${roomId}`, { width: wingW, height: 4.5, depth: 0.5 }, scene);
      wing.position = new Vector3(xc + sign * (0.75 + wingW / 2), 2.25, 0);
      wing.material = woodMat;
      wing.parent = g;
      wing.checkCollisions = true;

      // Wing gold top trim
      const wingGold = MeshBuilder.CreateBox(`wingGold${side}-${roomId}`, { width: wingW + 0.1, height: 0.12, depth: 0.55 }, scene);
      wingGold.position = new Vector3(xc + sign * (0.75 + wingW / 2), 4.56, 0);
      wingGold.material = goldMat;
      wingGold.parent = g;

      // Wing accent color stripe
      const wingAccent = MeshBuilder.CreateBox(`wingAccent${side}-${roomId}`, { width: wingW - 0.2, height: 0.8, depth: 0.52 }, scene);
      wingAccent.position = new Vector3(xc + sign * (0.75 + wingW / 2), 3.6, 0);
      wingAccent.material = accentMat;
      wingAccent.parent = g;
    }
  };

  buildPillar("L");
  buildPillar("R");

  // =====================================================
  // ARCH & LINTEL STRUCTURE (spans over the doorway)
  // =====================================================

  // Main lintel beam
  const lintelW = doorW + 2.0;
  const lintel = MeshBuilder.CreateBox(`lintel-${roomId}`, { width: lintelW, height: 0.5, depth: 1.4 }, scene);
  lintel.position = new Vector3(0, 5.2, 0);
  lintel.material = woodMat;
  lintel.parent = g;

  // Gold trim under lintel
  const lintelTrimBot = MeshBuilder.CreateBox(`lintelTrimBot-${roomId}`, { width: lintelW + 0.15, height: 0.1, depth: 1.5 }, scene);
  lintelTrimBot.position = new Vector3(0, 4.9, 0);
  lintelTrimBot.material = goldMat;
  lintelTrimBot.parent = g;

  // Curved arch segments under the lintel (stepped arching inward)
  // Creates a subtle arch illusion using stepped boxes
  const archSteps = 6;
  for (let i = 0; i < archSteps; i++) {
    const frac = i / archSteps;
    const archW = doorW * (1 - frac * 0.12);
    const archH = 0.12;
    const yPos = 4.9 - i * 0.14;
    const archD = 0.6 - frac * 0.25;
    const arch = MeshBuilder.CreateBox(`arch${i}-${roomId}`, { width: archW, height: archH, depth: archD }, scene);
    arch.position = new Vector3(0, yPos, 0);
    arch.material = i % 2 === 0 ? goldMat : woodMat;
    arch.parent = g;
  }

  // =====================================================
  // LAYERED CROWN (stacked tiers above lintel)
  // =====================================================

  // Tier 1: Wide cornice
  const crown1 = MeshBuilder.CreateBox(`crown1-${roomId}`, { width: lintelW + 0.8, height: 0.3, depth: 1.6 }, scene);
  crown1.position = new Vector3(0, 5.6, 0);
  crown1.material = woodMat;
  crown1.parent = g;

  // Tier 1 gold edge
  const crown1Gold = MeshBuilder.CreateBox(`crown1Gold-${roomId}`, { width: lintelW + 0.9, height: 0.08, depth: 1.7 }, scene);
  crown1Gold.position = new Vector3(0, 5.79, 0);
  crown1Gold.material = goldMat;
  crown1Gold.parent = g;

  // Tier 2: Narrower step up
  const crown2 = MeshBuilder.CreateBox(`crown2-${roomId}`, { width: lintelW - 0.4, height: 0.35, depth: 1.3 }, scene);
  crown2.position = new Vector3(0, 6.0, 0);
  crown2.material = woodMat;
  crown2.parent = g;

  // Tier 2 accent band (hall color)
  const crown2Accent = MeshBuilder.CreateBox(`crown2Accent-${roomId}`, { width: lintelW - 0.6, height: 0.12, depth: 1.35 }, scene);
  crown2Accent.position = new Vector3(0, 6.23, 0);
  crown2Accent.material = accentMat;
  crown2Accent.parent = g;

  // Tier 3: Small crown peak
  const crown3 = MeshBuilder.CreateBox(`crown3-${roomId}`, { width: lintelW - 1.8, height: 0.3, depth: 1.0 }, scene);
  crown3.position = new Vector3(0, 6.45, 0);
  crown3.material = woodMat;
  crown3.parent = g;

  // Tier 3 gold cap
  const crown3Gold = MeshBuilder.CreateBox(`crown3Gold-${roomId}`, { width: lintelW - 1.6, height: 0.08, depth: 1.1 }, scene);
  crown3Gold.position = new Vector3(0, 6.64, 0);
  crown3Gold.material = goldMat;
  crown3Gold.parent = g;

  // ---- Golden Finial (puncak gapura) ----
  // Sphere base
  const finialBase = MeshBuilder.CreateSphere(`finialBase-${roomId}`, { diameter: 0.6, segments: 12 }, scene);
  finialBase.position = new Vector3(0, 6.98, 0);
  finialBase.material = goldMat;
  finialBase.parent = g;

  // Spire on top
  const spire = MeshBuilder.CreateCylinder(`spire-${roomId}`, { height: 0.5, diameterTop: 0.02, diameterBottom: 0.2, tessellation: 8 }, scene);
  spire.position = new Vector3(0, 7.48, 0);
  spire.material = goldMat;
  spire.parent = g;

  // ---- Decorative corner ornaments on crown ----
  for (const sx of [-1, 1]) {
    const cornerOrn = MeshBuilder.CreateBox(`cornerOrn${sx > 0 ? "R" : "L"}-${roomId}`, { width: 0.4, height: 0.4, depth: 0.4 }, scene);
    cornerOrn.position = new Vector3(sx * (lintelW / 2 + 0.2), 5.8, 0);
    cornerOrn.rotation.y = Math.PI / 4;
    cornerOrn.material = goldMat;
    cornerOrn.parent = g;
  }

  // =====================================================
  // SIGNBOARD with HALL NAME (centered on the lintel)
  // =====================================================

  // Wider signboard to accommodate long hall names
  const signW = 6.4;

  // Signboard backing
  const signBacking = MeshBuilder.CreateBox(`signBacking-${roomId}`, { width: signW, height: 1.2, depth: 0.18 }, scene);
  signBacking.position = new Vector3(0, 5.25, -0.72);
  signBacking.material = woodMat;
  signBacking.parent = g;

  // Signboard gold frame
  const signFrame = MeshBuilder.CreateBox(`signFrame-${roomId}`, { width: signW + 0.2, height: 1.35, depth: 0.1 }, scene);
  signFrame.position = new Vector3(0, 5.25, -0.73);
  signFrame.material = goldMat;
  signFrame.parent = g;

  // Dynamic Texture for Hall Name (wider canvas for longer text)
  const texW = 1536;
  const texH = 384;
  const plaqueTex = new DynamicTexture(`plaqueTex-${roomId}`, { width: texW, height: texH }, scene, false);
  const pctx = plaqueTex.getContext() as CanvasRenderingContext2D;

  // Background
  pctx.fillStyle = "#16110b";
  pctx.fillRect(0, 0, texW, texH);

  // Ornate double gold border
  pctx.strokeStyle = "#c9a14a";
  pctx.lineWidth = 10;
  pctx.strokeRect(12, 12, texW - 24, texH - 24);
  pctx.strokeStyle = "#8b6914";
  pctx.lineWidth = 4;
  pctx.strokeRect(28, 28, texW - 56, texH - 56);

  // Corner ornaments
  pctx.fillStyle = "#c9a14a";
  pctx.font = "32px Georgia, serif";
  pctx.textAlign = "center";
  pctx.textBaseline = "middle";
  pctx.fillText("✦", 55, 55);
  pctx.fillText("✦", texW - 55, 55);
  pctx.fillText("✦", 55, texH - 55);
  pctx.fillText("✦", texW - 55, texH - 55);

  // Hall Name (main title) — adaptive font size for long names
  const hallTitle = lang === "id" ? nameId.toUpperCase() : nameEn.toUpperCase();
  const titleLen = hallTitle.length;
  const titleFontSize = titleLen > 28 ? 62 : titleLen > 22 ? 72 : 82;
  pctx.fillStyle = accentColor;
  pctx.font = `bold ${titleFontSize}px Georgia, serif`;
  pctx.fillText(hallTitle, texW / 2, texH * 0.38);

  // Subtitle
  pctx.font = "italic 38px Georgia, serif";
  pctx.fillStyle = "#c9a14a";
  pctx.fillText(lang === "id" ? "⸻  SILAKAN MASUK  ⸻" : "⸻  ENTER HALL  ⸻", texW / 2, texH * 0.68);

  plaqueTex.update();

  const plaqueMat = new StandardMaterial(`plaqueMat-${roomId}`, scene);
  plaqueMat.diffuseTexture = plaqueTex;
  plaqueMat.emissiveTexture = plaqueTex;
  plaqueMat.emissiveColor = new Color3(0.7, 0.6, 0.4);
  plaqueMat.specularColor = new Color3(0, 0, 0);

  // Signboard face plane
  const signFace = MeshBuilder.CreatePlane(`signFace-${roomId}`, { width: signW - 0.15, height: 1.1 }, scene);
  signFace.position = new Vector3(0, 5.25, -0.83);
  signFace.material = plaqueMat;
  signFace.parent = g;

  // ---- Decorative hanging chains for signboard (gold rods) ----
  for (const sx of [-1.9, 1.9]) {
    const chain = MeshBuilder.CreateCylinder(`chain${sx > 0 ? "R" : "L"}-${roomId}`, { height: 0.6, diameter: 0.05 }, scene);
    chain.position = new Vector3(sx, 5.95, -0.78);
    chain.material = goldMat;
    chain.parent = g;
  }
}

// Generic Base Hall setup - Completely overhauled for grand royal aesthetic
export function buildBaseHall(
  scene: Scene,
  room: { id: RoomId; nameEn: string; nameId: string; accent: string },
  idx: number,
  materials: Record<string, Material>,
  lang: "en" | "id"
) {
  const center = ROOM_CENTERS[room.id];
  const doorways = ROOM_DOORWAYS[room.id] || [];
  const hallColors = getHallColors(room.id);

  // Materials setup
  const woodMat = new StandardMaterial(`woodMat-${room.id}`, scene);
  woodMat.diffuseColor = new Color3(0.24, 0.15, 0.1); // Rich dark mahogany wood
  woodMat.specularColor = new Color3(0.35, 0.28, 0.2);
  woodMat.specularPower = 16;

  const goldMat = new StandardMaterial(`goldMat-${room.id}`, scene);
  goldMat.diffuseColor = new Color3(0.85, 0.68, 0.21); // Shiny brass gold
  goldMat.specularColor = new Color3(1.0, 0.9, 0.65);
  goldMat.specularPower = 32;
  goldMat.emissiveColor = new Color3(0.08, 0.06, 0.02);

  // Floor: Luxury Calacatta White-Gold Marble
  const marbleTex = new DynamicTexture(`marbleTex-${room.id}`, { width: 1024, height: 1024 }, scene, false);
  const mctx = marbleTex.getContext() as CanvasRenderingContext2D;
  mctx.fillStyle = "#faf7f2"; // Warm marble ivory base
  mctx.fillRect(0, 0, 1024, 1024);
  mctx.lineWidth = 3;
  // Dynamic Calacatta veins
  for (let v = 0; v < 14; v++) {
    mctx.beginPath();
    let x = Math.random() * 1024;
    let y = 0;
    mctx.moveTo(x, y);
    mctx.strokeStyle = Math.random() > 0.4 ? "rgba(165, 155, 142, 0.28)" : "rgba(201, 161, 74, 0.24)"; // Grey and gold veins
    while (y < 1024) {
      x += (Math.random() - 0.5) * 55;
      y += Math.random() * 65 + 10;
      mctx.lineTo(x, y);
    }
    mctx.stroke();
  }
  marbleTex.update();

  const floorMat = new StandardMaterial(`floorMat-${room.id}`, scene);
  floorMat.diffuseTexture = marbleTex;
  (floorMat.diffuseTexture as Texture).uScale = 4;
  (floorMat.diffuseTexture as Texture).vScale = 4;
  floorMat.specularColor = new Color3(0.9, 0.85, 0.72);
  floorMat.specularPower = 32;

  const ceilingMat = materials.ceilingMat;

  // Floor Mesh
  const floor = MeshBuilder.CreateGround(`floor-${room.id}`, { width: ROOM_WIDTH, height: ROOM_DEPTH }, scene);
  floor.position = new Vector3(center.x, 0, center.z);
  floor.material = floorMat;
  floor.checkCollisions = true;

  // Ceiling Mesh
  const ceiling = MeshBuilder.CreateGround(`ceiling-${room.id}`, { width: ROOM_WIDTH, height: ROOM_DEPTH }, scene);
  ceiling.position = new Vector3(center.x, WALL_HEIGHT, center.z);
  ceiling.rotation.x = Math.PI;
  ceiling.material = ceilingMat;

  // Royal Red Carpet along the center walkway
  const carpet = MeshBuilder.CreateGround(`carpet-${room.id}`, { width: 5.5, height: ROOM_DEPTH }, scene);
  carpet.position = new Vector3(center.x, 0.015, center.z);
  const carpetMat = new StandardMaterial(`carpetMat-${room.id}`, scene);
  carpetMat.diffuseColor = new Color3(0.48, 0.08, 0.12); // Velvet Crimson red
  carpetMat.specularColor = new Color3(0.06, 0.02, 0.02);
  carpet.material = carpetMat;

  // Wall widths helpers
  const sideW = (ROOM_WIDTH - doorW) / 2;
  const sideD = (ROOM_DEPTH - doorW) / 2;

  // --- North Wall ---
  if (doorways.includes("north")) {
    createDecoratedWall(`northL-${room.id}`, scene, sideW, 0.4, new Vector3(center.x - (doorW / 2 + sideW / 2), 0, center.z + ROOM_DEPTH / 2), 0, hallColors.wallColor, woodMat, goldMat);
    createDecoratedWall(`northR-${room.id}`, scene, sideW, 0.4, new Vector3(center.x + (doorW / 2 + sideW / 2), 0, center.z + ROOM_DEPTH / 2), 0, hallColors.wallColor, woodMat, goldMat);
    
    const header = MeshBuilder.CreateBox(`northHeader-${room.id}`, { width: doorW, height: doorHeaderH, depth: 0.45 }, scene);
    header.position = new Vector3(center.x, WALL_HEIGHT - doorHeaderH / 2, center.z + ROOM_DEPTH / 2);
    header.material = woodMat;
    header.checkCollisions = true;

    const trim = MeshBuilder.CreateBox(`northTrim-${room.id}`, { width: doorW + 0.2, height: 0.15, depth: 0.55 }, scene);
    trim.position = new Vector3(center.x, WALL_HEIGHT - doorHeaderH, center.z + ROOM_DEPTH / 2);
    trim.material = goldMat;
  } else {
    createDecoratedWall(`northWall-${room.id}`, scene, ROOM_WIDTH, 0.4, new Vector3(center.x, 0, center.z + ROOM_DEPTH / 2), 0, hallColors.wallColor, woodMat, goldMat);
  }

  // --- South Wall ---
  if (doorways.includes("south")) {
    createDecoratedWall(`southL-${room.id}`, scene, sideW, 0.4, new Vector3(center.x - (doorW / 2 + sideW / 2), 0, center.z - ROOM_DEPTH / 2), 0, hallColors.wallColor, woodMat, goldMat);
    createDecoratedWall(`southR-${room.id}`, scene, sideW, 0.4, new Vector3(center.x + (doorW / 2 + sideW / 2), 0, center.z - ROOM_DEPTH / 2), 0, hallColors.wallColor, woodMat, goldMat);
    
    const header = MeshBuilder.CreateBox(`southHeader-${room.id}`, { width: doorW, height: doorHeaderH, depth: 0.45 }, scene);
    header.position = new Vector3(center.x, WALL_HEIGHT - doorHeaderH / 2, center.z - ROOM_DEPTH / 2);
    header.material = woodMat;
    header.checkCollisions = true;

    const trim = MeshBuilder.CreateBox(`southTrim-${room.id}`, { width: doorW + 0.2, height: 0.15, depth: 0.55 }, scene);
    trim.position = new Vector3(center.x, WALL_HEIGHT - doorHeaderH, center.z - ROOM_DEPTH / 2);
    trim.material = goldMat;
  } else {
    createDecoratedWall(`southWall-${room.id}`, scene, ROOM_WIDTH, 0.4, new Vector3(center.x, 0, center.z - ROOM_DEPTH / 2), 0, hallColors.wallColor, woodMat, goldMat);
  }

  // --- East Wall ---
  if (doorways.includes("east")) {
    createDecoratedWall(`eastL-${room.id}`, scene, sideD, 0.4, new Vector3(center.x + ROOM_WIDTH / 2, 0, center.z - (doorW / 2 + sideD / 2)), Math.PI / 2, hallColors.wallColor, woodMat, goldMat);
    createDecoratedWall(`eastR-${room.id}`, scene, sideD, 0.4, new Vector3(center.x + ROOM_WIDTH / 2, 0, center.z + (doorW / 2 + sideD / 2)), Math.PI / 2, hallColors.wallColor, woodMat, goldMat);
    
    const header = MeshBuilder.CreateBox(`eastHeader-${room.id}`, { width: 0.45, height: doorHeaderH, depth: doorW }, scene);
    header.position = new Vector3(center.x + ROOM_WIDTH / 2, WALL_HEIGHT - doorHeaderH / 2, center.z);
    header.material = woodMat;
    header.checkCollisions = true;

    const trim = MeshBuilder.CreateBox(`eastTrim-${room.id}`, { width: 0.55, height: 0.15, depth: doorW + 0.2 }, scene);
    trim.position = new Vector3(center.x + ROOM_WIDTH / 2, WALL_HEIGHT - doorHeaderH, center.z);
    trim.material = goldMat;
  } else {
    createDecoratedWall(`eastWall-${room.id}`, scene, ROOM_DEPTH, 0.4, new Vector3(center.x + ROOM_WIDTH / 2, 0, center.z), Math.PI / 2, hallColors.wallColor, woodMat, goldMat);
  }

  // --- West Wall ---
  if (doorways.includes("west")) {
    createDecoratedWall(`westL-${room.id}`, scene, sideD, 0.4, new Vector3(center.x - ROOM_WIDTH / 2, 0, center.z - (doorW / 2 + sideD / 2)), -Math.PI / 2, hallColors.wallColor, woodMat, goldMat);
    createDecoratedWall(`westR-${room.id}`, scene, sideD, 0.4, new Vector3(center.x - ROOM_WIDTH / 2, 0, center.z + (doorW / 2 + sideD / 2)), -Math.PI / 2, hallColors.wallColor, woodMat, goldMat);
    
    const header = MeshBuilder.CreateBox(`westHeader-${room.id}`, { width: 0.45, height: doorHeaderH, depth: doorW }, scene);
    header.position = new Vector3(center.x - ROOM_WIDTH / 2, WALL_HEIGHT - doorHeaderH / 2, center.z);
    header.material = woodMat;
    header.checkCollisions = true;

    const trim = MeshBuilder.CreateBox(`westTrim-${room.id}`, { width: 0.55, height: 0.15, depth: doorW + 0.2 }, scene);
    trim.position = new Vector3(center.x - ROOM_WIDTH / 2, WALL_HEIGHT - doorHeaderH, center.z);
    trim.material = goldMat;
  } else {
    createDecoratedWall(`westWall-${room.id}`, scene, ROOM_DEPTH, 0.4, new Vector3(center.x - ROOM_WIDTH / 2, 0, center.z), -Math.PI / 2, hallColors.wallColor, woodMat, goldMat);
  }

  // Coffered Grid Ceiling Architecture
  const beamMat = new StandardMaterial(`beamMat-${room.id}`, scene);
  beamMat.diffuseColor = new Color3(0.24, 0.15, 0.1); // Mahogany
  beamMat.specularColor = new Color3(0.12, 0.1, 0.08);

  for (let bx = -ROOM_WIDTH / 2 + 6; bx < ROOM_WIDTH / 2; bx += 6) {
    const beam = MeshBuilder.CreateBox(`beamZ-${room.id}-${bx}`, { width: 0.38, height: 0.45, depth: ROOM_DEPTH }, scene);
    beam.position = new Vector3(center.x + bx, WALL_HEIGHT - 0.225, center.z);
    beam.material = beamMat;
  }
  for (let bz = -ROOM_DEPTH / 2 + 5; bz < ROOM_DEPTH / 2; bz += 5) {
    const beam = MeshBuilder.CreateBox(`beamX-${room.id}-${bz}`, { width: ROOM_WIDTH, height: 0.45, depth: 0.38 }, scene);
    beam.position = new Vector3(center.x, WALL_HEIGHT - 0.225, center.z + bz);
    beam.material = beamMat;
  }

  // Ornate 3D Gapura (Archway) at the entrance doorway
  if (doorways.includes("south")) {
    createGapuraEntrance(
      scene,
      room.id,
      center,
      room.nameId,
      room.nameEn,
      room.accent,
      woodMat,
      goldMat,
      lang
    );
  }

  // Ambient lights in corners
  const p1 = new PointLight(`p1-${room.id}`, new Vector3(center.x - ROOM_WIDTH / 2 + 1.5, WALL_HEIGHT - 1.5, center.z - 3), scene);
  p1.diffuse = new Color3(1, 0.9, 0.78);
  p1.intensity = 0.75;
  p1.range = 16;

  const p2 = new PointLight(`p2-${room.id}`, new Vector3(center.x + ROOM_WIDTH / 2 - 1.5, WALL_HEIGHT - 1.5, center.z + 3), scene);
  p2.diffuse = new Color3(1, 0.9, 0.78);
  p2.intensity = 0.75;
  p2.range = 16;

  // Center ceiling chandelier (Golden Imperial Chandelier)
  const ceilingLight = new PointLight(`c-${room.id}`, new Vector3(center.x, WALL_HEIGHT - 2.0, center.z), scene);
  ceilingLight.diffuse = new Color3(1, 0.93, 0.82);
  ceilingLight.intensity = 2.2;
  ceilingLight.range = 28;

  const brassMat = new StandardMaterial(`brassMat-chand-${room.id}`, scene);
  brassMat.diffuseColor = new Color3(0.85, 0.68, 0.21);
  brassMat.specularColor = new Color3(1, 0.9, 0.6);
  brassMat.emissiveColor = new Color3(0.08, 0.06, 0.02);

  const rod = MeshBuilder.CreateCylinder(`rod-${room.id}`, { height: 1.8, diameter: 0.08 }, scene);
  rod.position = new Vector3(center.x, WALL_HEIGHT - 0.9, center.z);
  rod.material = brassMat;

  const ring = MeshBuilder.CreateTorus(`ring-${room.id}`, { diameter: 1.6, thickness: 0.15 }, scene);
  ring.position = new Vector3(center.x, WALL_HEIGHT - 1.8, center.z);
  ring.material = brassMat;

  const bulbMat = new StandardMaterial(`bulbMat-chand-${room.id}`, scene);
  bulbMat.emissiveColor = new Color3(1, 0.95, 0.8);
  bulbMat.diffuseColor = new Color3(1, 0.95, 0.8);

  for (let i = 0; i < 6; i++) {
    const angle = (i * 2 * Math.PI) / 6;
    const bx = center.x + 0.8 * Math.cos(angle);
    const bz = center.z + 0.8 * Math.sin(angle);
    
    const bulb = MeshBuilder.CreateSphere(`bulb-${room.id}-${i}`, { diameter: 0.3 }, scene);
    bulb.position = new Vector3(bx, WALL_HEIGHT - 1.7, bz);
    bulb.material = bulbMat;

    const holder = MeshBuilder.CreateCylinder(`holder-${room.id}-${i}`, { height: 0.18, diameter: 0.14 }, scene);
    holder.position = new Vector3(bx, WALL_HEIGHT - 1.82, bz);
    holder.material = brassMat;
  }

  // Four corner pillars/columns (Round Corinthian columns with marble/gold trim)
  const dx = ROOM_WIDTH / 2 - 1.5;
  const dz = ROOM_DEPTH / 2 - 1.5;
  const cornerOffsets = [
    new Vector3(-dx, 0, -dz),
    new Vector3(dx, 0, -dz),
    new Vector3(-dx, 0, dz),
    new Vector3(dx, 0, dz),
  ];
  cornerOffsets.forEach((offset, pIdx) => {
    // Round Column Body (Sewarna dinding, check collisions)
    const pillar = MeshBuilder.CreateCylinder(`pillar-${room.id}-${pIdx}`, { height: WALL_HEIGHT - 0.6, diameter: 0.8 }, scene);
    pillar.position = new Vector3(center.x + offset.x, WALL_HEIGHT / 2, center.z + offset.z);
    pillar.material = woodMat;
    pillar.checkCollisions = true;

    // Black marble base
    const pillarBase = MeshBuilder.CreateCylinder(`pillarBase-${room.id}-${pIdx}`, { height: 0.3, diameter: 1.1 }, scene);
    pillarBase.position = new Vector3(center.x + offset.x, 0.15, center.z + offset.z);
    const marbleBaseMat = new StandardMaterial(`marbleBase-${room.id}-${pIdx}`, scene);
    marbleBaseMat.diffuseColor = new Color3(0.08, 0.08, 0.08); // Black Marble
    marbleBaseMat.specularColor = new Color3(0.6, 0.6, 0.6);
    pillarBase.material = marbleBaseMat;

    // Golden capital at the top
    const pillarTop = MeshBuilder.CreateCylinder(`pillarTop-${room.id}-${pIdx}`, { height: 0.3, diameter: 1.1 }, scene);
    pillarTop.position = new Vector3(center.x + offset.x, WALL_HEIGHT - 0.15, center.z + offset.z);
    pillarTop.material = goldMat;

    // Sconce lights on each pillar
    const posX = center.x + offset.x;
    const posZ = center.z + offset.z;
    const dirX = -Math.sign(offset.x);
    const dirZ = -Math.sign(offset.z);

    const sconceBack = MeshBuilder.CreateBox(`sconceBack-${room.id}-${pIdx}`, { width: 0.15, height: 0.4, depth: 0.15 }, scene);
    sconceBack.position = new Vector3(posX + dirX * 0.42, 3.8, posZ + dirZ * 0.42);
    sconceBack.material = goldMat;

    const sconceBulb = MeshBuilder.CreateSphere(`sconceBulb-${room.id}-${pIdx}`, { diameter: 0.24 }, scene);
    sconceBulb.position = new Vector3(posX + dirX * 0.55, 3.9, posZ + dirZ * 0.55);
    sconceBulb.material = bulbMat;

    const sconceLight = new PointLight(`sconceLight-${room.id}-${pIdx}`, sconceBulb.position, scene);
    sconceLight.diffuse = new Color3(1, 0.9, 0.72);
    sconceLight.intensity = 0.6;
    sconceLight.range = 11;
  });

  // Sofa Chesterfield Leather Bench
  const sofaX = center.x + (ROOM_WIDTH / 2 - 2.5);
  const sofa = MeshBuilder.CreateBox(`sofaBase-${room.id}`, { width: 1.6, height: 0.45, depth: 4.2 }, scene);
  sofa.position = new Vector3(sofaX, 0.225, center.z);
  
  const leatherMat = new StandardMaterial(`sofaLeatherMat-${room.id}`, scene);
  leatherMat.diffuseColor = new Color3(0.28, 0.12, 0.08); // Dark maroon leather
  leatherMat.specularColor = new Color3(0.35, 0.25, 0.2);
  leatherMat.specularPower = 8;
  sofa.material = leatherMat;
  sofa.checkCollisions = true;

  // Armrests (arms)
  const armL = MeshBuilder.CreateCylinder(`sofaArmL-${room.id}`, { height: 1.6, diameter: 0.45 }, scene);
  armL.position = new Vector3(sofaX, 0.45, center.z - 2.1);
  armL.rotation.x = Math.PI / 2;
  armL.material = leatherMat;
  armL.checkCollisions = true;

  const armR = MeshBuilder.CreateCylinder(`sofaArmR-${room.id}`, { height: 1.6, diameter: 0.45 }, scene);
  armR.position = new Vector3(sofaX, 0.45, center.z + 2.1);
  armR.rotation.x = Math.PI / 2;
  armR.material = leatherMat;
  armR.checkCollisions = true;

  // Backrest
  const backrest = MeshBuilder.CreateBox(`sofaBack-${room.id}`, { width: 0.35, height: 0.75, depth: 3.8 }, scene);
  backrest.position = new Vector3(sofaX + 0.65, 0.6, center.z);
  backrest.material = leatherMat;
  backrest.checkCollisions = true;

  // Luxury potted plants in corners
  const buildLuxuryPlant = (px: number, pz: number, name: string) => {
    // Pot
    const pot = MeshBuilder.CreateCylinder(`pot-${name}`, { height: 0.7, diameterTop: 0.6, diameterBottom: 0.45 }, scene);
    pot.position = new Vector3(px, 0.35, pz);
    const potMat = new StandardMaterial(`potMat-${name}`, scene);
    potMat.diffuseColor = new Color3(0.08, 0.08, 0.08); // Black gloss
    potMat.specularColor = new Color3(0.8, 0.8, 0.8);
    potMat.specularPower = 32;
    pot.material = potMat;

    const potGoldTrim = MeshBuilder.CreateTorus(`potGold-${name}`, { diameter: 0.61, thickness: 0.05 }, scene);
    potGoldTrim.position = new Vector3(px, 0.68, pz);
    potGoldTrim.material = goldMat;

    // Wood stem
    const trunk = MeshBuilder.CreateCylinder(`trunk-${name}`, { height: 1.2, diameter: 0.08 }, scene);
    trunk.position = new Vector3(px, 1.1, pz);
    const trunkMat = new StandardMaterial(`trunkMat-${name}`, scene);
    trunkMat.diffuseColor = new Color3(0.35, 0.25, 0.15);
    trunk.material = trunkMat;

    // Palm leaves
    for (let d = 0; d < 5; d++) {
      const leaf = MeshBuilder.CreatePlane(`leaf-${name}-${d}`, { width: 1.1, height: 0.5 }, scene);
      leaf.position = new Vector3(px, 1.65, pz);
      leaf.rotation.y = (d * Math.PI) / 5;
      leaf.rotation.x = 0.35; 
      const leafMat = new StandardMaterial(`leafMat-${name}-${d}`, scene);
      leafMat.diffuseColor = new Color3(0.12, 0.32, 0.16); // Forest Green
      leafMat.specularColor = new Color3(0.1, 0.15, 0.1);
      leafMat.backFaceCulling = false;
      leaf.material = leafMat;
    }
  };

  buildLuxuryPlant(center.x - ROOM_WIDTH / 2 + 2.8, center.z - ROOM_DEPTH / 2 + 2.8, `plant1-${room.id}`);
  buildLuxuryPlant(center.x - ROOM_WIDTH / 2 + 2.8, center.z + ROOM_DEPTH / 2 - 2.8, `plant2-${room.id}`);
}

// Unified Artifact Mesh Builder - Overhauled with Ornate 3D Frames, Picture Lights, Octagonal Marble/Gold Pedestals, and Crystal Glass Cases
export function buildArtifactMesh(
  scene: Scene,
  a: Artifact,
  posOverride: [number, number] | null,
  highlight: HighlightLayer,
  onArtifactClick: (a: Artifact) => void
) {
  const center = ROOM_CENTERS[a.room];
  if (!center) return;

  const coords = posOverride || a.position;
  const baseX = center.x + coords[0];
  const baseZ = center.z + coords[1];

  const isWall = isWallArtifact(a);

  // Ornate Materials
  const goldMat = new StandardMaterial(`goldMat-art-${a.id}`, scene);
  goldMat.diffuseColor = new Color3(0.85, 0.68, 0.21); // Brass Gold
  goldMat.specularColor = new Color3(1.0, 0.9, 0.6);
  goldMat.specularPower = 32;

  const darkWoodMat = new StandardMaterial(`darkWoodMat-art-${a.id}`, scene);
  darkWoodMat.diffuseColor = new Color3(0.18, 0.11, 0.07); // Antique dark teak wood
  darkWoodMat.specularColor = new Color3(0.2, 0.15, 0.1);

  if (isWall) {
    const isLeft = coords[0] < 0;
    const posX = center.x + (isLeft ? -(ROOM_WIDTH / 2 - 0.26) : (ROOM_WIDTH / 2 - 0.26));
    const rotY = isLeft ? -Math.PI / 2 : Math.PI / 2;

    let width = 2.2;
    let height = 1.6;
    if (a.id === "proklamasi") { width = 1.8; height = 2.4; }
    else if (a.id === "merah-putih") { width = 2.8; height = 1.8; }
    else if (a.id === "batik") { width = 2.2; height = 2.2; }

    const wconf = {
      pos: new Vector3(posX, 2.3, baseZ),
      rot: new Vector3(0, rotY, 0),
      width,
      height
    };

    // Double Ornate Frame (Outer wood frame, inner gold bevel)
    // 1. Outer Frame (Wood)
    const outerFrame = MeshBuilder.CreateBox(`outerFrame-${a.id}`, { width: wconf.width + 0.24, height: wconf.height + 0.24, depth: 0.1 }, scene);
    outerFrame.position = wconf.pos;
    outerFrame.rotation = wconf.rot;
    outerFrame.material = darkWoodMat;
    outerFrame.checkCollisions = true;

    // 2. Inner Frame (Gold)
    const offsetDirection = isLeft ? 1 : -1;
    const innerFrame = MeshBuilder.CreateBox(`innerFrame-${a.id}`, { width: wconf.width + 0.08, height: wconf.height + 0.08, depth: 0.11 }, scene);
    innerFrame.position = new Vector3(wconf.pos.x + offsetDirection * 0.01, wconf.pos.y, wconf.pos.z);
    innerFrame.rotation = wconf.rot;
    innerFrame.material = goldMat;
    innerFrame.parent = outerFrame;

    // Display plane
    const item = MeshBuilder.CreatePlane(`item-${a.id}`, { width: wconf.width, height: wconf.height }, scene);
    item.position = new Vector3(wconf.pos.x + offsetDirection * 0.062, wconf.pos.y, wconf.pos.z);
    item.rotation = wconf.rot;

    const itemMat = new StandardMaterial(`itemMat-${a.id}`, scene);
    const texture = getArtifactTexture(a, scene, () => {
      const size = texture.getSize();
      if (size.width && size.height) {
        const aspect = size.width / size.height;
        const frameAspect = wconf.width / wconf.height;
        if (aspect > frameAspect) {
          // Image is wider than frame aspect ratio
          item.scaling.x = 1;
          item.scaling.y = frameAspect / aspect;
        } else {
          // Image is taller than frame aspect ratio
          item.scaling.y = 1;
          item.scaling.x = aspect / frameAspect;
        }
      }
    });
    itemMat.diffuseTexture = texture;
    itemMat.emissiveTexture = texture;
    itemMat.emissiveColor = new Color3(0.8, 0.8, 0.8);
    itemMat.specularColor = new Color3(0.12, 0.12, 0.12);
    itemMat.backFaceCulling = false;
    item.material = itemMat;

    // Picture lamp above frame (Elegant Brass Picture Spot)
    const arm = MeshBuilder.CreateCylinder(`arm-${a.id}`, { height: 0.45, diameter: 0.045 }, scene);
    arm.rotation.x = Math.PI / 2;
    arm.rotation.y = wconf.rot.y;
    const armPos = wconf.pos.add(new Vector3(0, wconf.height / 2 + 0.22, 0));
    arm.position = new Vector3(armPos.x + offsetDirection * 0.2, armPos.y, armPos.z);
    arm.material = goldMat;

    const head = MeshBuilder.CreateCylinder(`head-${a.id}`, { height: wconf.width * 0.55, diameter: 0.08 }, scene);
    head.rotation.z = Math.PI / 2;
    head.rotation.y = wconf.rot.y;
    head.position = new Vector3(armPos.x + offsetDirection * 0.42, armPos.y, armPos.z);
    head.material = goldMat;

    // Spotlight pointing down directly onto painting
    const spot = new PointLight(`spot-${a.id}`, head.position.add(new Vector3(offsetDirection * 0.12, -0.2, 0)), scene);
    const baseColor = Color3.FromHexString(a.color);
    spot.diffuse = new Color3(1, 0.95, 0.85).add(baseColor.scale(0.18));
    spot.intensity = 1.6;
    spot.range = 7.0;

    item.actionManager = new ActionManager(scene);
    outerFrame.actionManager = new ActionManager(scene);

    const onOver = () => highlight.addMesh(item, Color3.FromHexString("#ffd700"));
    const onOut = () => highlight.removeMesh(item);
    const onClick = () => onArtifactClick(a);

    [item, outerFrame].forEach((m) => {
      m.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, onOver));
      m.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, onOut));
      m.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, onClick));
    });

    return;
  }

  // Standing Pedestal (Luxury Black Marble Octagonal Column with Gold Accent Rings)
  const ped = MeshBuilder.CreateCylinder(`ped-${a.id}`, { height: 1.1, diameterTop: 0.95, diameterBottom: 1.15, tessellation: 8 }, scene);
  ped.position = new Vector3(baseX, 0.55, baseZ);
  
  const pedMat = new StandardMaterial(`pedMat-${a.id}`, scene);
  pedMat.diffuseColor = new Color3(0.05, 0.05, 0.05); // High-gloss black marble
  pedMat.specularColor = new Color3(0.8, 0.8, 0.8);
  pedMat.specularPower = 32;
  ped.material = pedMat;
  ped.checkCollisions = true;

  // Bottom Gold Ring
  const bottomRing = MeshBuilder.CreateTorus(`bottomRing-${a.id}`, { diameter: 1.12, thickness: 0.08 }, scene);
  bottomRing.position = new Vector3(baseX, 0.1, baseZ);
  bottomRing.material = goldMat;
  bottomRing.parent = ped;

  // Top Gold Ring
  const topRing = MeshBuilder.CreateTorus(`topRing-${a.id}`, { diameter: 0.97, thickness: 0.06 }, scene);
  topRing.position = new Vector3(baseX, 1.05, baseZ);
  topRing.material = goldMat;
  topRing.parent = ped;

  // Top Pedestal Plate
  const top = MeshBuilder.CreateCylinder(`top-${a.id}`, { height: 0.08, diameter: 1.0, tessellation: 8 }, scene);
  top.position = new Vector3(baseX, 1.13, baseZ);
  top.material = darkWoodMat;

  // Internal Gold Plate for item display
  const itemPlate = MeshBuilder.CreateCylinder(`plate-${a.id}`, { height: 0.02, diameter: 0.75 }, scene);
  itemPlate.position = new Vector3(baseX, 1.18, baseZ);
  itemPlate.material = goldMat;

  let item: Mesh;
  const c = Color3.FromHexString(a.color);
  const isTextured = a.shape === "texture" || VALID_IMAGE_IDS.includes(a.id);

  if (isTextured) {
    const planeWidth = 0.7;
    const planeHeight = 0.7;
    item = MeshBuilder.CreatePlane(`item-${a.id}`, { width: planeWidth, height: planeHeight }, scene);
    item.position = new Vector3(baseX, 1.6, baseZ);
    item.billboardMode = Mesh.BILLBOARDMODE_Y;

    const texMat = new StandardMaterial(`itemMat-${a.id}`, scene);
    const texture = getArtifactTexture(a, scene, () => {
      const size = texture.getSize();
      if (size.width && size.height) {
        const aspect = size.width / size.height;
        if (aspect > 1) {
          // Image is wider than tall
          item.scaling.x = 1;
          item.scaling.y = 1 / aspect;
        } else {
          // Image is taller than wide
          item.scaling.y = 1;
          item.scaling.x = aspect;
        }
      }
    });
    texture.uScale = -1; // Prevent mirror billboard
    texMat.diffuseTexture = texture;
    texMat.emissiveTexture = texture;
    texMat.emissiveColor = new Color3(0.55, 0.55, 0.55);
    texMat.specularColor = new Color3(0, 0, 0);
    texMat.backFaceCulling = false;
    item.material = texMat;
  } else {
    const itemMat = new StandardMaterial(`itemMat-${a.id}`, scene);
    itemMat.diffuseColor = c;
    itemMat.specularColor = new Color3(0.5, 0.45, 0.35);
    itemMat.specularPower = 16;
    itemMat.emissiveColor = c.scale(0.18);

    switch (a.shape) {
      case "bust":
        item = MeshBuilder.CreateSphere(`item-${a.id}`, { diameter: 0.7, segments: 24 }, scene);
        item.position = new Vector3(baseX, 1.55, baseZ);
        item.scaling = new Vector3(1, 1.2, 1);
        break;
      case "sword":
        item = MeshBuilder.CreateBox(`item-${a.id}`, { width: 0.1, height: 1.2, depth: 0.04 }, scene);
        item.position = new Vector3(baseX, 1.82, baseZ);
        item.rotation.z = 0.2;
        break;
      case "scroll":
        item = MeshBuilder.CreateCylinder(`item-${a.id}`, { height: 0.85, diameter: 0.18 }, scene);
        item.position = new Vector3(baseX, 1.65, baseZ);
        item.rotation.z = Math.PI / 2;
        break;
      case "flag":
        item = MeshBuilder.CreatePlane(`item-${a.id}`, { width: 1.1, height: 0.7 }, scene);
        item.position = new Vector3(baseX, 1.9, baseZ);
        break;
      case "vase":
        item = MeshBuilder.CreateCylinder(`item-${a.id}`, { height: 0.9, diameterTop: 0.28, diameterBottom: 0.48 }, scene);
        item.position = new Vector3(baseX, 1.65, baseZ);
        break;
      case "tablet":
        item = MeshBuilder.CreateBox(`item-${a.id}`, { width: 0.7, height: 0.85, depth: 0.12 }, scene);
        item.position = new Vector3(baseX, 1.65, baseZ);
        break;
      case "crown":
        item = MeshBuilder.CreateTorus(`item-${a.id}`, { diameter: 0.52, thickness: 0.16 }, scene);
        item.position = new Vector3(baseX, 1.55, baseZ);
        break;
      case "book":
        item = MeshBuilder.CreateBox(`item-${a.id}`, { width: 0.7, height: 0.16, depth: 0.48 }, scene);
        item.position = new Vector3(baseX, 1.38, baseZ);
        break;
      default:
        item = MeshBuilder.CreateSphere(`item-${a.id}`, { diameter: 0.5 }, scene);
        item.position = new Vector3(baseX, 1.55, baseZ);
    }
    item.material = itemMat;
  }

  // Glass Case (Crystal Glass box with fine golden structural frame edges)
  const glass = MeshBuilder.CreateBox(`glass-${a.id}`, { width: 1.25, height: 1.6, depth: 1.25 }, scene);
  glass.position = new Vector3(baseX, 1.9, baseZ);
  
  const glassMat = new StandardMaterial(`glassMat-${a.id}`, scene);
  glassMat.diffuseColor = new Color3(0.75, 0.8, 0.9);
  glassMat.alpha = 0.14;
  glassMat.specularColor = new Color3(1, 1, 1);
  glassMat.specularPower = 64;
  glass.material = glassMat;

  // Delicate golden corner pillars for the glass case to make it look structurally physical
  for (let gx = -1; gx <= 1; gx += 2) {
    for (let gz = -1; gz <= 1; gz += 2) {
      const edge = MeshBuilder.CreateCylinder(`edge-${a.id}-${gx}-${gz}`, { height: 1.6, diameter: 0.02 }, scene);
      edge.position = new Vector3(baseX + gx * 0.61, 1.9, baseZ + gz * 0.61);
      edge.material = goldMat;
      edge.parent = glass;
    }
  }

  // Spotlight fixture directly on the ceiling
  const trackFixture = MeshBuilder.CreateCylinder(`track-${a.id}`, { height: 0.35, diameter: 0.18 }, scene);
  trackFixture.position = new Vector3(baseX, WALL_HEIGHT - 0.18, baseZ);
  trackFixture.material = goldMat;

  // Spotlight pointing directly downwards onto the pedestal
  const spot = new PointLight(`spot-${a.id}`, new Vector3(baseX, WALL_HEIGHT - 0.6, baseZ), scene);
  spot.diffuse = new Color3(1, 0.96, 0.88).add(c.scale(0.2));
  spot.intensity = 1.5;
  spot.range = 7.0;

  // Continuous elegant rotation animation
  scene.onBeforeRenderObservable.add(() => {
    item.rotation.y += 0.005;
  });

  ped.actionManager = new ActionManager(scene);
  glass.actionManager = new ActionManager(scene);

  const onOver = () => highlight.addMesh(ped, Color3.FromHexString("#ffd700"));
  const onOut = () => highlight.removeMesh(ped);
  const onClick = () => onArtifactClick(a);

  [ped, glass].forEach((m) => {
    m.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, onOver));
    m.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, onOut));
    m.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, onClick));
  });
}

// Dynamic Slot-based Layout Engine
// Standard industry approach: hide artifacts without assets, and layout valid ones without overlaps
export function layoutRoomArtifacts(
  scene: Scene,
  hallId: RoomId,
  hallArtifacts: Artifact[],
  highlight: HighlightLayer,
  onArtifactClick: (a: Artifact) => void
) {
  // 1. Filter out artifacts that do not have valid downloaded images
  const validArtifacts = hallArtifacts.filter(a => VALID_IMAGE_IDS.includes(a.id));

  // 2. Separate into wall paintings and standing pedestals
  const wallItems = validArtifacts.filter(a => a.shape === "wall");
  const standingItems = validArtifacts.filter(a => a.shape !== "wall");

  // 3. Define safe non-overlapping Z coordinates (longitudinal spacing: 4.75 units)
  const zSlots = [-9.5, -4.75, 0, 4.75, 9.5];

  // 4. Position wall paintings alternatingly on West (Left) and East (Right) walls
  wallItems.forEach((a, idx) => {
    const isLeft = idx % 2 === 0;
    const slotIdx = Math.floor(idx / 2);
    if (slotIdx < zSlots.length) {
      const z = zSlots[slotIdx];
      const x = isLeft ? -(ROOM_WIDTH / 2) : (ROOM_WIDTH / 2);
      buildArtifactMesh(scene, a, [x, z], highlight, onArtifactClick);
    } else {
      console.warn(`[Layout Warning] Wall slots full in ${hallId} for artifact ${a.id}`);
    }
  });

  // 5. Position standing pedestals distributed on 4 columns (aisles)
  // Walkway center (X between -4.5 and 4.5) is kept completely empty.
  const columns = [
    -8.5,  // Left-Inner Aisle
     8.5,  // Right-Inner Aisle
    -12.5, // Left-Outer Aisle
     12.5  // Right-Outer Aisle
  ];

  standingItems.forEach((a, idx) => {
    const colIdx = idx % columns.length;
    const rowIdx = Math.floor(idx / columns.length);
    if (rowIdx < zSlots.length) {
      const x = columns[colIdx];
      const z = zSlots[rowIdx];
      buildArtifactMesh(scene, a, [x, z], highlight, onArtifactClick);
    } else {
      console.warn(`[Layout Warning] Standing slots full in ${hallId} for artifact ${a.id}`);
    }
  });
}
