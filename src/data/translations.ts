export type Lang = "en" | "id";

export const translations = {
  en: {
    brand: "MuseumVerse Indonesia",
    tagline: "Walk Through History, Experience The Heritage",
    nav: {
      home: "Home",
      museum: "Virtual Museum",
      cinema: "Cinema",
      timeline: "Timeline",
      quiz: "Quiz",
      passport: "Passport",
    },
    landing: {
      welcome: "Welcome to MuseumVerse Indonesia",
      subtitle:
        "An immersive digital heritage experience. Walk through five eras of Indonesian history, inspect ancient artifacts, and live the story of an archipelago.",
      enter: "Enter Museum",
      explore: "Explore Halls",
      stats: [
        { value: "6", label: "Exhibition Halls" },
        { value: "40+", label: "Heritage Artifacts" },
        { value: "2000+", label: "Years of History" },
      ],
      featuresTitle: "A museum reborn for the browser",
      features: [
        {
          title: "3D Walkable Halls",
          body: "Move freely through five cinematic exhibition halls with realistic lighting and ambience.",
        },
        {
          title: "Interactive Artifacts",
          body: "Click any artifact to focus the camera, read its story, and hear curated narration.",
        },
        {
          title: "Cinematic Documentaries",
          body: "Sit in the museum theater and watch curated documentaries on each era.",
        },
        {
          title: "Digital Passport",
          body: "Unlock achievements as you visit halls and complete the heritage quiz.",
        },
      ],
      footer: "A digital heritage project · Crafted with care for Indonesia",
    },
    museum: {
      loading: "Preparing the museum…",
      controls: "WASD to walk · Mouse to look · Click an artifact",
      enterRoom: "Now entering",
      rooms: {
        lobby: "Grand Lobby",
        ancient: "Ancient Indonesia Hall",
        kingdom: "Kingdom Era Hall",
        colonial: "Colonial History Hall",
        independence: "Independence Hall",
        modern: "Modern Indonesia Hall",
        cinema: "Cinema Studio Hall",
      },
      close: "Close",
      learnMore: "Read Full Story",
      narrate: "Play Narration",
      stop: "Stop",
    },
    timeline: {
      title: "Timeline of the Archipelago",
      subtitle: "Two millennia of Indonesian history, distilled into key moments.",
    },
    quiz: {
      title: "Heritage Quiz",
      subtitle: "Test what you've learned in the museum.",
      start: "Start Quiz",
      next: "Next",
      finish: "Finish",
      restart: "Try Again",
      score: "Your score",
      correct: "Correct!",
      wrong: "Not quite.",
      result: (s: number, t: number) => `You scored ${s} out of ${t}`,
    },
    passport: {
      title: "Digital Museum Passport",
      subtitle: "Your achievements across the halls.",
      locked: "Locked",
      unlocked: "Unlocked",
      hint: "Visit halls and complete the quiz to unlock badges.",
      reset: "Reset Progress",
    },
  },
  id: {
    brand: "MuseumVerse Indonesia",
    tagline: "Berjalan Menelusuri Sejarah, Rasakan Warisan Budaya",
    nav: {
      home: "Beranda",
      museum: "Museum Virtual",
      cinema: "Bioskop",
      timeline: "Garis Waktu",
      quiz: "Kuis",
      passport: "Paspor",
    },
    landing: {
      welcome: "Selamat Datang di MuseumVerse Indonesia",
      subtitle:
        "Pengalaman warisan digital yang imersif. Jelajahi lima era sejarah Indonesia, amati artefak kuno, dan hayati kisah Nusantara.",
      enter: "Masuk Museum",
      explore: "Jelajahi Ruangan",
      stats: [
        { value: "6", label: "Ruang Pameran" },
        { value: "40+", label: "Artefak Pusaka" },
        { value: "2000+", label: "Tahun Sejarah" },
      ],
      featuresTitle: "Museum yang lahir kembali di peramban",
      features: [
        {
          title: "Ruangan 3D yang Dapat Dijelajahi",
          body: "Bergerak bebas melalui lima ruang pameran sinematik dengan pencahayaan dan suasana realistis.",
        },
        {
          title: "Artefak Interaktif",
          body: "Klik artefak apa pun untuk memfokuskan kamera, baca ceritanya, dan dengarkan narasi kurasi.",
        },
        {
          title: "Dokumenter Sinematik",
          body: "Duduklah di teater museum dan tonton dokumenter pilihan setiap era.",
        },
        {
          title: "Paspor Digital",
          body: "Buka pencapaian saat Anda mengunjungi ruangan dan menyelesaikan kuis warisan.",
        },
      ],
      footer: "Proyek warisan digital · Dibuat dengan cinta untuk Indonesia",
    },
    museum: {
      loading: "Menyiapkan museum…",
      controls: "WASD untuk berjalan · Mouse untuk melihat · Klik artefak",
      enterRoom: "Memasuki",
      rooms: {
        lobby: "Lobi Utama",
        ancient: "Ruang Indonesia Kuno",
        kingdom: "Ruang Era Kerajaan",
        colonial: "Ruang Sejarah Kolonial",
        independence: "Ruang Kemerdekaan",
        modern: "Ruang Indonesia Modern",
        cinema: "Ruang Studio Bioskop",
      },
      close: "Tutup",
      learnMore: "Baca Cerita Lengkap",
      narrate: "Putar Narasi",
      stop: "Berhenti",
    },
    timeline: {
      title: "Garis Waktu Nusantara",
      subtitle: "Dua milenium sejarah Indonesia, dirangkum dalam momen-momen kunci.",
    },
    quiz: {
      title: "Kuis Warisan",
      subtitle: "Uji apa yang telah Anda pelajari di museum.",
      start: "Mulai Kuis",
      next: "Berikutnya",
      finish: "Selesai",
      restart: "Coba Lagi",
      score: "Skor Anda",
      correct: "Benar!",
      wrong: "Belum tepat.",
      result: (s: number, t: number) => `Skor Anda ${s} dari ${t}`,
    },
    passport: {
      title: "Paspor Museum Digital",
      subtitle: "Pencapaian Anda di seluruh ruangan.",
      locked: "Terkunci",
      unlocked: "Terbuka",
      hint: "Kunjungi ruangan dan selesaikan kuis untuk membuka lencana.",
      reset: "Atur Ulang",
    },
  },
};

export type Translations = (typeof translations)["en"];
