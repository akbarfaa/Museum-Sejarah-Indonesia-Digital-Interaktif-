export type Lang = "en" | "id";

export const translations = {
  en: {
    brand: "History Of Indonesia Virtual Museum",
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
      welcome: "Welcome to the History Of Indonesia Virtual Museum",
      subtitle:
        "An immersive digital heritage experience. Walk through historically curated eras of Indonesian history, inspect interactive artifacts with Wikipedia integration, and live the story of an archipelago.",
      enter: "Enter Museum",
      explore: "Explore Halls",
      stats: [
        { value: "8", label: "Exhibition Zones" },
        { value: "150+", label: "Curated Artifacts" },
        { value: "2000+", label: "Years of History" },
      ],
      featuresTitle: "A museum reborn for the browser",
      features: [
        {
          title: "3D Walkable Halls",
          body: "Move freely through cinematic exhibition halls with realistic lighting and custom themes.",
        },
        {
          title: "Interactive Artifacts",
          body: "Explore detailed visual artifacts with Wikipedia links, text summaries, and voice narration.",
        },
        {
          title: "Traditional Photo Studio",
          body: "Try on local garments (Kebaya, Beskap) and download your custom Polaroid souvenir.",
        },
        {
          title: "Digital Passport & Quiz",
          body: "Test your historical knowledge and unlock badges for visiting various museum zones.",
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
    brand: "History Of Indonesia Virtual Museum",
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
      welcome: "Selamat Datang di History Of Indonesia Virtual Museum",
      subtitle:
        "Pengalaman warisan digital yang imersif. Jelajahi era sejarah Indonesia yang dikurasi secara historis, amati artefak dengan integrasi Wikipedia, dan hayati kisah Nusantara.",
      enter: "Masuk Museum",
      explore: "Jelajahi Ruangan",
      stats: [
        { value: "8", label: "Zona Pameran" },
        { value: "150+", label: "Artefak Kurasi" },
        { value: "2000+", label: "Tahun Sejarah" },
      ],
      featuresTitle: "Museum yang lahir kembali di peramban",
      features: [
        {
          title: "Ruangan 3D yang Dapat Dijelajahi",
          body: "Bergerak bebas melalui ruang pameran sinematik dengan pencahayaan dan suasana khas era sejarah.",
        },
        {
          title: "Artefak Interaktif",
          body: "Pelajari detail artefak visual lengkap dengan tautan Wikipedia dan narasi suara narator.",
        },
        {
          title: "Studio Foto Tradisional",
          body: "Kenakan pakaian adat daerah (Kebaya, Beskap) dan unduh suvenir foto Polaroid buatan Anda.",
        },
        {
          title: "Paspor Digital & Kuis",
          body: "Uji wawasan sejarah Anda untuk meraih lencana pencapaian di setiap area museum.",
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
