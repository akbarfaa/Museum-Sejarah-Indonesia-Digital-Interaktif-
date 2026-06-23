import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiCamera, HiArrowDownTray, HiSparkles, HiArrowPath, HiUser } from "react-icons/hi2";

interface PhotoboothModalProps {
  open: boolean;
  onClose: () => void;
  lang: "en" | "id";
  playerName: string;
  playerAvatar: string;
  onSaveProfile: (name: string, avatar: string) => void;
}

type AvatarType = "batik" | "kebaya" | "pangsi" | "casual";
type BackgroundType = "ancient" | "kingdom" | "colonial" | "national" | "modern" | "heritage" | "studio";

interface AvatarOption {
  id: AvatarType;
  nameEn: string;
  nameId: string;
  accent: string;
}

interface BackgroundOption {
  id: BackgroundType;
  nameEn: string;
  nameId: string;
  colors: string[]; // for gradients
}

const AVATARS: AvatarOption[] = [
  { id: "batik", nameEn: "(Batik)", nameId: "(Batik)", accent: "#a87a3d" },
  { id: "kebaya", nameEn: "(Kebaya)", nameId: "(Kebaya)", accent: "#c9a14a" },
  { id: "pangsi", nameEn: "(Pangsi)", nameId: "(Pangsi)", accent: "#7a8a9c" },
  { id: "casual", nameEn: "(Casual)", nameId: "(Kasual)", accent: "#c0392b" },
];

const BACKGROUNDS: BackgroundOption[] = [
  { id: "ancient", nameEn: "Ancient Ruins", nameId: "Candi Kuno", colors: ["#4e3d30", "#2c1e14"] },
  { id: "kingdom", nameEn: "Golden Kingdom", nameId: "Istana Kerajaan", colors: ["#c9a14a", "#5a4312"] },
  { id: "colonial", nameEn: "Old Batavia Harbor", nameId: "Pelabuhan Batavia", colors: ["#a08b70", "#423628"] },
  { id: "national", nameEn: "Youth Pledge Hall", nameId: "Gedung Sumpah Pemuda", colors: ["#d4a017", "#4a3306"] },
  { id: "modern", nameEn: "Jakarta Skyline", nameId: "Metropolitan Jakarta", colors: ["#0f3460", "#16213e"] },
  { id: "heritage", nameEn: "UNESCO Cultural Heritage", nameId: "Warisan Budaya UNESCO", colors: ["#1e6f47", "#09331e"] },
  { id: "studio", nameEn: "Classic Studio", nameId: "Studio Klasik", colors: ["#1e140d", "#0c0805"] },
];

export function PhotoboothModal({
  open,
  onClose,
  lang,
  playerName,
  playerAvatar,
  onSaveProfile,
}: PhotoboothModalProps) {
  const [name, setName] = useState(playerName || "");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>((playerAvatar as AvatarType) || "batik");
  const [selectedBg, setSelectedBg] = useState<BackgroundType>("studio");
  const [step, setStep] = useState<"setup" | "flash" | "preview">("setup");
  const [polaroidUrl, setPolaroidUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync with context props when opened
  useEffect(() => {
    if (open) {
      setName(playerName || "");
      setSelectedAvatar((playerAvatar as AvatarType) || "batik");
      setStep("setup");
      setPolaroidUrl(null);
    }
  }, [open, playerName, playerAvatar]);

  // Web Audio camera shutter click synthesizer
  const playShutterSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 2;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      /* ignore audio errors */
    }
  };

  const handleTakePhoto = () => {
    if (!name.trim()) {
      setName(lang === "id" ? "Pengunjung" : "Visitor");
    }

    // Save current profile to context
    onSaveProfile(name.trim() || (lang === "id" ? "Pengunjung" : "Visitor"), selectedAvatar);

    // Shutter animation sequence
    setStep("flash");
    playShutterSound();

    setTimeout(() => {
      generatePolaroid();
      setStep("preview");
    }, 600);
  };

  // Canvas drawing helper for vector avatars
  const drawAvatarOnCanvas = (
    ctx: CanvasRenderingContext2D,
    avatar: AvatarType,
    cx: number,
    cy: number,
    size: number
  ) => {
    ctx.save();

    // Skin Tone
    const skinColor = "#fcd5b5";
    ctx.fillStyle = skinColor;

    // Face (Circle)
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.05, size * 0.28, 0, Math.PI * 2);
    ctx.fill();

    // Neck
    ctx.fillStyle = "#e5c09e"; // shadow skin tone
    ctx.fillRect(cx - size * 0.06, cy + size * 0.1, size * 0.12, size * 0.1);

    // Eyes
    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.arc(cx - size * 0.09, cy - size * 0.06, size * 0.03, 0, Math.PI * 2);
    ctx.arc(cx + size * 0.09, cy - size * 0.06, size * 0.03, 0, Math.PI * 2);
    ctx.fill();

    // Eye reflections (cute white dots)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx - size * 0.08, cy - size * 0.07, size * 0.01, 0, Math.PI * 2);
    ctx.arc(cx + size * 0.1, cy - size * 0.07, size * 0.01, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = size * 0.012;
    ctx.lineCap = "round";
    ctx.beginPath();
    // left
    ctx.arc(cx - size * 0.09, cy - size * 0.12, size * 0.04, Math.PI * 1.15, Math.PI * 1.8);
    ctx.stroke();
    // right
    ctx.beginPath();
    ctx.arc(cx + size * 0.09, cy - size * 0.12, size * 0.04, Math.PI * 1.2, Math.PI * 1.85);
    ctx.stroke();

    // Smile
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = size * 0.015;
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.04, size * 0.07, 0, Math.PI);
    ctx.stroke();

    // Hair and Outfit Specifics
    if (avatar === "batik") {
      // Hair (Budi)
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.arc(cx, cy - size * 0.2, size * 0.22, Math.PI * 1.0, 0);
      ctx.fill();

      // Hair sideburns
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.22, cy - size * 0.2);
      ctx.lineTo(cx - size * 0.28, cy - size * 0.04);
      ctx.lineTo(cx - size * 0.2, cy - size * 0.04);
      ctx.closePath();
      ctx.moveTo(cx + size * 0.22, cy - size * 0.2);
      ctx.lineTo(cx + size * 0.28, cy - size * 0.04);
      ctx.lineTo(cx + size * 0.2, cy - size * 0.04);
      ctx.closePath();
      ctx.fill();

      // Clothing: Batik Shirt (Mahogany/Gold patterns)
      ctx.fillStyle = "#4a2d18"; // Dark brown base
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.35, cy + size * 0.4);
      ctx.lineTo(cx - size * 0.2, cy + size * 0.18);
      ctx.quadraticCurveTo(cx, cy + size * 0.22, cx + size * 0.2, cy + size * 0.18);
      ctx.lineTo(cx + size * 0.35, cy + size * 0.4);
      ctx.closePath();
      ctx.fill();

      // Collar trim
      ctx.fillStyle = "#c9a14a"; // Gold collar trim
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.08, cy + size * 0.18);
      ctx.lineTo(cx, cy + size * 0.28);
      ctx.lineTo(cx + size * 0.08, cy + size * 0.18);
      ctx.lineTo(cx + size * 0.12, cy + size * 0.22);
      ctx.lineTo(cx, cy + size * 0.34);
      ctx.lineTo(cx - size * 0.12, cy + size * 0.22);
      ctx.closePath();
      ctx.fill();

      // Batik patterns (dots & small gold stars)
      ctx.fillStyle = "#c9a14a";
      for (let i = -2; i <= 2; i++) {
        for (let j = 1; j <= 3; j++) {
          if (Math.abs(i) + j > 1) {
            ctx.beginPath();
            ctx.arc(cx + i * size * 0.08, cy + size * 0.18 + j * size * 0.06, size * 0.012, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    } else if (avatar === "kebaya") {
      // Hair Sanggul (Siti)
      ctx.fillStyle = "#1f2937";
      ctx.beginPath();
      // Back bun
      ctx.arc(cx + size * 0.24, cy - size * 0.14, size * 0.1, 0, Math.PI * 2);
      ctx.fill();
      // Flower ornament on bun
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(cx + size * 0.26, cy - size * 0.2, size * 0.03, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#eab308";
      ctx.beginPath();
      ctx.arc(cx + size * 0.26, cy - size * 0.2, size * 0.01, 0, Math.PI * 2);
      ctx.fill();

      // Main Hair (Front waves)
      ctx.fillStyle = "#1f2937";
      ctx.beginPath();
      ctx.arc(cx, cy - size * 0.2, size * 0.22, Math.PI * 0.95, 0);
      ctx.fill();
      // Fringe curls
      ctx.beginPath();
      ctx.arc(cx - size * 0.14, cy - size * 0.2, size * 0.08, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.14, cy - size * 0.2, size * 0.08, 0, Math.PI * 2);
      ctx.fill();

      // Clothing: Kebaya Dress (Elegant gold & yellow)
      ctx.fillStyle = "#d97706"; // Yellow/Orange base
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.35, cy + size * 0.4);
      ctx.lineTo(cx - size * 0.2, cy + size * 0.18);
      ctx.quadraticCurveTo(cx, cy + size * 0.24, cx + size * 0.2, cy + size * 0.18);
      ctx.lineTo(cx + size * 0.35, cy + size * 0.4);
      ctx.closePath();
      ctx.fill();

      // Neck lace trim
      ctx.fillStyle = "#fef08a"; // Yellow lace
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.12, cy + size * 0.18);
      ctx.lineTo(cx, cy + size * 0.3);
      ctx.lineTo(cx + size * 0.12, cy + size * 0.18);
      ctx.lineTo(cx + size * 0.15, cy + size * 0.2);
      ctx.lineTo(cx, cy + size * 0.34);
      ctx.lineTo(cx - size * 0.15, cy + size * 0.2);
      ctx.closePath();
      ctx.fill();

      // Brooch in the center (red gem, gold frame)
      ctx.fillStyle = "#c9a14a";
      ctx.beginPath();
      ctx.arc(cx, cy + size * 0.28, size * 0.03, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.arc(cx, cy + size * 0.28, size * 0.015, 0, Math.PI * 2);
      ctx.fill();
    } else if (avatar === "pangsi") {
      // Clothing: Black Pangsi Suit (High collar)
      ctx.fillStyle = "#111827"; // Black Pangsi
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.35, cy + size * 0.4);
      ctx.lineTo(cx - size * 0.2, cy + size * 0.18);
      ctx.quadraticCurveTo(cx, cy + size * 0.2, cx + size * 0.2, cy + size * 0.18);
      ctx.lineTo(cx + size * 0.35, cy + size * 0.4);
      ctx.closePath();
      ctx.fill();

      // Silver button lining
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = size * 0.02;
      ctx.beginPath();
      ctx.moveTo(cx, cy + size * 0.2);
      ctx.lineTo(cx, cy + size * 0.4);
      ctx.stroke();

      ctx.fillStyle = "#e5e7eb";
      for (let yOffset = 0.23; yOffset <= 0.38; yOffset += 0.06) {
        ctx.beginPath();
        ctx.arc(cx, cy + size * yOffset, size * 0.012, 0, Math.PI * 2);
        ctx.fill();
      }

      // Udeng / Blangkon headpiece (traditional batik hat - brown/gold wrapping)
      ctx.fillStyle = "#78350f"; // Brown fabric base
      ctx.beginPath();
      ctx.arc(cx, cy - size * 0.22, size * 0.24, Math.PI * 0.9, Math.PI * 0.1);
      ctx.lineTo(cx + size * 0.26, cy - size * 0.2);
      ctx.lineTo(cx - size * 0.26, cy - size * 0.2);
      ctx.closePath();
      ctx.fill();

      // Front cross wrap patterns on the hat
      ctx.strokeStyle = "#c9a14a";
      ctx.lineWidth = size * 0.018;
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.24, cy - size * 0.22);
      ctx.lineTo(cx + size * 0.24, cy - size * 0.18);
      ctx.moveTo(cx + size * 0.24, cy - size * 0.22);
      ctx.lineTo(cx - size * 0.24, cy - size * 0.18);
      ctx.stroke();

      // Udeng peak in the center (tie knot pointing upwards)
      ctx.fillStyle = "#78350f";
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.06, cy - size * 0.32);
      ctx.lineTo(cx, cy - size * 0.42);
      ctx.lineTo(cx + size * 0.06, cy - size * 0.32);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#c9a14a";
      ctx.stroke();
    } else {
      // Hair (Agus - Modern spikey)
      ctx.fillStyle = "#1f2937";
      ctx.beginPath();
      ctx.arc(cx, cy - size * 0.2, size * 0.22, Math.PI * 1.0, 0);
      ctx.fill();
      // Spikes
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.2, cy - size * 0.3);
      ctx.lineTo(cx - size * 0.15, cy - size * 0.38);
      ctx.lineTo(cx - size * 0.08, cy - size * 0.32);
      ctx.lineTo(cx, cy - size * 0.41);
      ctx.lineTo(cx + size * 0.08, cy - size * 0.32);
      ctx.lineTo(cx + size * 0.15, cy - size * 0.38);
      ctx.lineTo(cx + size * 0.2, cy - size * 0.3);
      ctx.closePath();
      ctx.fill();

      // Clothing: Modern Red and White Bomber Jacket
      ctx.fillStyle = "#dc2626"; // Red jacket body
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.35, cy + size * 0.4);
      ctx.lineTo(cx - size * 0.2, cy + size * 0.18);
      ctx.quadraticCurveTo(cx, cy + size * 0.2, cx + size * 0.2, cy + size * 0.18);
      ctx.lineTo(cx + size * 0.35, cy + size * 0.4);
      ctx.closePath();
      ctx.fill();

      // White sleeve inserts & shirt underlay
      ctx.fillStyle = "#ffffff";
      // Left arm stripe
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.32, cy + size * 0.4);
      ctx.lineTo(cx - size * 0.24, cy + size * 0.26);
      ctx.lineTo(cx - size * 0.2, cy + size * 0.28);
      ctx.lineTo(cx - size * 0.26, cy + size * 0.4);
      ctx.closePath();
      ctx.fill();
      // Right arm stripe
      ctx.beginPath();
      ctx.moveTo(cx + size * 0.32, cy + size * 0.4);
      ctx.lineTo(cx + size * 0.24, cy + size * 0.26);
      ctx.lineTo(cx + size * 0.2, cy + size * 0.28);
      ctx.lineTo(cx + size * 0.26, cy + size * 0.4);
      ctx.closePath();
      ctx.fill();

      // T-shirt underlay collar (white)
      ctx.beginPath();
      ctx.arc(cx, cy + size * 0.18, size * 0.08, 0, Math.PI);
      ctx.fill();
    }

    ctx.restore();
  };

  // Generate the Polaroid image onto an HTML5 Canvas
  const generatePolaroid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and Set size
    canvas.width = 600;
    canvas.height = 750;

    // 1. Polaroid White card body
    ctx.fillStyle = "#fcfbfa"; // Soft off-white paper
    ctx.fillRect(0, 0, 600, 750);

    // Smooth card shadow
    ctx.strokeStyle = "#e5e3dd";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 596, 746);

    // 2. Main Photo Rect (520x520 px, centered at x=40, y=40)
    const px = 40;
    const py = 40;
    const pw = 520;
    const ph = 520;

    ctx.save();
    ctx.beginPath();
    ctx.rect(px, py, pw, ph);
    ctx.clip(); // clip contents inside the photo frame

    // 3. Draw Themed Background
    const bgInfo = BACKGROUNDS.find((b) => b.id === selectedBg) || BACKGROUNDS[5];
    const grad = ctx.createRadialGradient(
      px + pw / 2,
      py + ph / 2,
      50,
      px + pw / 2,
      py + ph / 2,
      pw * 0.8
    );
    grad.addColorStop(0, bgInfo.colors[0]);
    grad.addColorStop(1, bgInfo.colors[1] || bgInfo.colors[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(px, py, pw, ph);

    // Dynamic background additions for premium design look
    if (selectedBg === "ancient") {
      // Draw simple glowing ancient stone carvings / silhouettes
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.moveTo(px, py + ph);
      ctx.lineTo(px + 100, py + ph - 120);
      ctx.lineTo(px + 220, py + ph - 80);
      ctx.lineTo(px + 290, py + ph - 210);
      ctx.lineTo(px + 360, py + ph - 70);
      ctx.lineTo(px + 450, py + ph - 150);
      ctx.lineTo(px + pw, py + ph);
      ctx.closePath();
      ctx.fill();
    } else if (selectedBg === "kingdom") {
      // Draw golden sunburst lines
      ctx.strokeStyle = "rgba(255, 215, 0, 0.08)";
      ctx.lineWidth = 3;
      const bx = px + pw / 2;
      const by = py + ph / 2;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(angle) * pw, by + Math.sin(angle) * ph);
        ctx.stroke();
      }
    } else if (selectedBg === "colonial") {
      // Draw vintage grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let i = px; i < px + pw; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, py); ctx.lineTo(i, py + ph); ctx.stroke();
      }
      for (let j = py; j < py + ph; j += 40) {
        ctx.beginPath(); ctx.moveTo(px, j); ctx.lineTo(px + pw, j); ctx.stroke();
      }
    } else if (selectedBg === "national") {
      // Draw a glowing sunburst/star silhouette in the background
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      const sx = px + pw / 2;
      const sy = py + 120;
      ctx.arc(sx, sy, 80, 0, Math.PI * 2);
      ctx.fill();
    } else if (selectedBg === "heritage") {
      // Draw organic leafy curves / batik-style waves in the background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let offset = -100; offset <= pw + 100; offset += 80) {
        ctx.moveTo(px + offset, py);
        ctx.quadraticCurveTo(px + offset + 40, py + ph / 2, px + offset - 40, py + ph);
      }
      ctx.stroke();
    } else if (selectedBg === "modern") {
      // Draw simple neon building silhouettes
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      ctx.fillRect(px + 40, py + ph - 240, 70, 240);
      ctx.fillRect(px + 150, py + ph - 310, 90, 310);
      ctx.fillRect(px + 280, py + ph - 210, 80, 210);
      ctx.fillRect(px + 400, py + ph - 270, 70, 270);
    } else if (selectedBg === "studio") {
      // Draw softbox light cones
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + pw * 0.4, py + ph);
      ctx.lineTo(px, py + ph * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(px + pw, py);
      ctx.lineTo(px + pw * 0.6, py + ph);
      ctx.lineTo(px + pw, py + ph * 0.7);
      ctx.closePath();
      ctx.fill();
    }

    // 4. Draw Avatar Character in the center of the photo
    drawAvatarOnCanvas(ctx, selectedAvatar, px + pw / 2, py + ph * 0.62, 330);

    // 5. Draw Polaroid Vignette shading
    const vig = ctx.createRadialGradient(
      px + pw / 2,
      py + ph / 2,
      pw * 0.35,
      px + pw / 2,
      py + ph / 2,
      pw * 0.7
    );
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.22)");
    ctx.fillStyle = vig;
    ctx.fillRect(px, py, pw, ph);

    ctx.restore(); // restore clipping context

    // 6. Draw Photo Inner Border Shadow
    ctx.strokeStyle = "#dbdad0";
    ctx.lineWidth = 3;
    ctx.strokeRect(px, py, pw, ph);

    // 7. Handwriting-style texts at the bottom
    // Name text
    ctx.fillStyle = "#1e1b18"; // charcoal black ink
    ctx.font = "italic bold 36px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(name, 300, 618);

    // Separator tiny dot/star
    ctx.fillStyle = "#c9a14a";
    ctx.font = "16px Arial";
    ctx.fillText("✦", 300, 650);

    // Date & Location Info
    const today = new Date();
    const dateOpts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const dateStr = today.toLocaleDateString(lang === "id" ? "id-ID" : "en-US", dateOpts);

    ctx.fillStyle = "#6b645b";
    ctx.font = "14px Courier, monospace";
    ctx.letterSpacing = "0.08em";
    ctx.fillText(`HISTORY OF INDONESIA VIRTUAL MUSEUM  |  ${dateStr.toUpperCase()}`, 300, 680);

    // Set preview URL
    setPolaroidUrl(canvas.toDataURL("image/png"));
  };

  const handleDownload = () => {
    if (!polaroidUrl) return;
    const link = document.createElement("a");
    link.download = `history_of_indonesia_photo_${name.replace(/\s+/g, "_")}.png`;
    link.href = polaroidUrl;
    link.click();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">

          {/* Main Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-background/95 border border-border/40 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row shadow-2xl relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-border/20 text-muted-foreground hover:text-foreground cursor-pointer shadow-sm transition-all z-20"
            >
              <HiXMark className="text-xl" />
            </button>

            {/* Hidden Drawing Canvas */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Step 1: Profile Setup Section */}
            {step === "setup" && (
              <div className="w-full flex flex-col md:flex-row overflow-y-auto">

                {/* Left Form Panel */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border/20">
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="text-[10px] text-primary uppercase font-bold tracking-[0.25em] flex items-center gap-1.5 mb-1">
                        <HiSparkles /> {lang === "id" ? "Studio Foto" : "Photo Studio"}
                      </span>
                      <h3 className="font-display text-2xl text-gradient-gold">
                        {lang === "id" ? "Personalisasikan Karakter Anda" : "Personalize Your Character"}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                        {lang === "id"
                          ? "Pilih busana tradisional Indonesia dan abadikan momen kunjungan Anda di ruangan studio ini!"
                          : "Choose traditional Indonesian attire and capture your visit moment in our custom studio!"}
                      </p>
                    </div>

                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-foreground/80 flex items-center gap-2">
                        <HiUser className="text-primary text-sm" />
                        {lang === "id" ? "Nama Pengunjung" : "Visitor Name"}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === "id" ? "Ketik nama Anda di sini..." : "Type your name here..."}
                        maxLength={22}
                        className="px-4 py-3 rounded-xl bg-muted/20 border border-border/40 focus:border-primary/50 text-foreground text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Avatar choice */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-bold text-foreground/80">
                        {lang === "id" ? "Pilih Pakaian & Karakter" : "Select Costume & Character"}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {AVATARS.map((av) => (
                          <button
                            key={av.id}
                            onClick={() => setSelectedAvatar(av.id)}
                            className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${selectedAvatar === av.id
                                ? "bg-primary/5 border-primary text-foreground shadow-md shadow-primary/5"
                                : "bg-muted/5 border-transparent text-muted-foreground hover:bg-muted/10"
                              }`}
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: av.accent }}
                            />
                            <span className="text-xs font-medium">
                              {lang === "id" ? av.nameId : av.nameEn}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Background choice */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-bold text-foreground/80">
                        {lang === "id" ? "Pilih Latar Belakang" : "Select Background"}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {BACKGROUNDS.map((bg) => (
                          <button
                            key={bg.id}
                            onClick={() => setSelectedBg(bg.id)}
                            className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${selectedBg === bg.id
                                ? "bg-primary/5 border-primary text-foreground shadow-md shadow-primary/5"
                                : "bg-muted/5 border-transparent text-muted-foreground hover:bg-muted/10"
                              }`}
                          >
                            <span className="text-xs font-medium">
                              {lang === "id" ? bg.nameId : bg.nameEn}
                            </span>
                            <div className="flex gap-1">
                              {bg.colors.map((c, i) => (
                                <span
                                  key={i}
                                  className="w-4 h-1.5 rounded-full"
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleTakePhoto}
                    className="w-full mt-6 py-3.5 rounded-full bg-gradient-gold hover:scale-[1.02] text-primary-foreground font-bold shadow-gold-glow transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                  >
                    <HiCamera className="text-lg" />
                    {lang === "id" ? "Ambil Foto Sekarang" : "Take Photo Now"}
                  </button>
                </div>

                {/* Right Preview Panel */}
                <div className="flex-1 p-6 md:p-8 bg-black/20 flex items-center justify-center min-h-[300px]">
                  <div className="flex flex-col items-center gap-3">
                    {/* Live styled card mockup preview */}
                    <div className="w-[260px] aspect-[6/7.5] bg-[#fcfbfa] p-4 rounded-xl shadow-xl flex flex-col justify-between border border-border/15 relative overflow-hidden text-black select-none pointer-events-none scale-105">

                      {/* Photo Area */}
                      <div
                        className="w-full aspect-square rounded border border-black/5 relative overflow-hidden flex items-end justify-center"
                        style={{
                          background: `radial-gradient(circle, ${BACKGROUNDS.find((b) => b.id === selectedBg)?.colors[0]
                            } 0%, ${BACKGROUNDS.find((b) => b.id === selectedBg)?.colors[1] ||
                            BACKGROUNDS.find((b) => b.id === selectedBg)?.colors[0]
                            } 100%)`,
                        }}
                      >
                        {/* Live CSS character render (mini scale) */}
                        <div className="w-full h-full flex items-end justify-center relative transform translate-y-3 scale-95">
                          {/* Skin Circle */}
                          <div className="w-16 h-16 rounded-full bg-[#fcd5b5] absolute top-12 shadow-sm border border-black/5" />

                          {/* Hair/Hat */}
                          {selectedAvatar === "batik" && (
                            <div className="w-[72px] h-[34px] rounded-t-full bg-[#111827] absolute top-[44px]" />
                          )}
                          {selectedAvatar === "kebaya" && (
                            <>
                              <div className="w-6 h-6 rounded-full bg-[#1f2937] absolute top-[45px] right-20" />
                              <div className="w-[72px] h-[34px] rounded-t-full bg-[#1f2937] absolute top-[44px]" />
                            </>
                          )}
                          {selectedAvatar === "pangsi" && (
                            <>
                              <div className="w-[74px] h-[28px] rounded-t-full bg-[#78350f] absolute top-[46px]" />
                              <div className="w-3 h-5 bg-[#78350f] absolute top-[36px] left-[122px] rotate-12" />
                            </>
                          )}
                          {selectedAvatar === "casual" && (
                            <div className="w-[72px] h-[34px] rounded-t-full bg-[#1f2937] absolute top-[44px]" />
                          )}

                          {/* Eyes */}
                          <div className="w-1.5 h-1.5 rounded-full bg-[#111827] absolute top-[58px] left-[110px]" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[#111827] absolute top-[58px] right-[110px]" />
                          {/* Smile */}
                          <div className="w-4 h-2 rounded-b-full border-b border-rose-500 absolute top-[66px]" />

                          {/* Neck */}
                          <div className="w-4 h-6 bg-[#e5c09e] absolute top-[74px]" />

                          {/* Outfit shoulders */}
                          {selectedAvatar === "batik" && (
                            <div className="w-[96px] h-10 rounded-t-2xl bg-[#4a2d18] absolute top-[80px]" />
                          )}
                          {selectedAvatar === "kebaya" && (
                            <div className="w-[96px] h-10 rounded-t-2xl bg-[#d97706] absolute top-[80px]" />
                          )}
                          {selectedAvatar === "pangsi" && (
                            <div className="w-[96px] h-10 rounded-t-2xl bg-[#111827] absolute top-[80px]" />
                          )}
                          {selectedAvatar === "casual" && (
                            <div className="w-[96px] h-10 rounded-t-2xl bg-[#dc2626] absolute top-[80px]" />
                          )}
                        </div>
                      </div>

                      {/* Polaroid text fields */}
                      <div className="text-center flex flex-col gap-0.5 pt-2">
                        <div className="font-display text-[13px] font-bold text-gray-900 truncate px-1">
                          {name || (lang === "id" ? "Nama Pengunjung" : "Visitor Name")}
                        </div>
                        <div className="text-[6px] tracking-wider font-mono text-gray-400 uppercase mt-0.5">
                          HISTORY OF INDONESIA
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] text-muted-foreground font-mono mt-2">
                      {lang === "id" ? "Tampilan Pratinjau Polaroid" : "Polaroid Souvenir Preview"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Screen Flash Overlay (shutter flash) */}
            {step === "flash" && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 bg-white z-50 flex items-center justify-center"
              >
                <div className="text-center text-black flex flex-col items-center gap-2">
                  <HiCamera className="text-5xl animate-bounce text-primary" />
                  <span className="font-bold text-sm tracking-widest uppercase">
                    {lang === "id" ? "CHEESE!" : "CHEESE!"}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Step 3: Printout Polaroid Preview */}
            {step === "preview" && (
              <div className="w-full flex flex-col md:flex-row overflow-y-auto">

                {/* Polaroid result */}
                <div className="flex-1 p-6 md:p-8 flex items-center justify-center bg-black/45 min-h-[400px]">
                  {polaroidUrl && (
                    <motion.div
                      initial={{ scale: 0.9, rotate: -2, y: 10 }}
                      animate={{ scale: 1, rotate: 1, y: 0 }}
                      className="relative max-w-[320px] shadow-2xl transition-all hover:rotate-0"
                    >
                      <img
                        src={polaroidUrl}
                        alt="Polaroid Souvenir"
                        className="w-full border-4 border-white/90 rounded bg-[#fcfbfa]"
                      />
                      {/* Interactive sparkles on complete */}
                      <div className="absolute top-0 right-0 w-8 h-8 text-yellow-400 animate-pulse pointer-events-none">
                        <HiSparkles className="w-full h-full" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Polaroid options and downloader panel */}
                <div className="w-full md:w-[350px] p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/20">
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="text-[10px] text-primary uppercase font-bold tracking-[0.25em] flex items-center gap-1.5 mb-1">
                        <HiSparkles /> {lang === "id" ? "Foto Anda Siap" : "Your Photo is Ready"}
                      </span>
                      <h3 className="font-display text-2xl text-gradient-gold">
                        {lang === "id" ? "Abadikan Kenangan Anda" : "Capture the Memory"}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                        {lang === "id"
                          ? "Unduh foto Polaroid cetakan eksklusif Anda sebagai suvenir virtual dari kunjungan museum virtual ini!"
                          : "Download your custom printed Polaroid photo as a virtual souvenir of your virtual museum visit!"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleDownload}
                        className="w-full py-3 rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                      >
                        <HiArrowDownTray className="text-lg" />
                        {lang === "id" ? "Unduh Foto PNG" : "Download PNG Photo"}
                      </button>

                      <button
                        onClick={() => setStep("setup")}
                        className="w-full py-3 rounded-full bg-muted/20 hover:bg-muted/30 text-foreground border border-border/30 font-medium transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                      >
                        <HiArrowPath className="text-base" />
                        {lang === "id" ? "Foto Ulang" : "Retake Photo"}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full mt-8 py-3 rounded-full bg-background border border-border/40 hover:bg-border/10 text-muted-foreground hover:text-foreground text-xs font-medium transition-colors cursor-pointer"
                  >
                    {lang === "id" ? "Kembali ke Museum" : "Back to Museum"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
