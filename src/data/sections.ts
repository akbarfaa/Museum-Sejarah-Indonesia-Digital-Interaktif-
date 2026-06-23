import type { RoomId } from "./artifacts";

export interface SectionRoom {
  id: string;
  hallId: RoomId;
  nameEn: string;
  nameId: string;
  descEn: string;
  descId: string;
  order: number;
  icon: string;
}

export const sectionRooms: SectionRoom[] = [
  // ═══════════════════════════════════════════════════
  // HALL 1: INDONESIA KUNO (ancient)
  // ═══════════════════════════════════════════════════
  {
    id: "ancient-fossils",
    hallId: "ancient",
    nameEn: "Early Humans & Fossils",
    nameId: "Manusia Purba & Fosil",
    descEn: "Discover the remarkable fossil evidence of early humans who walked the Indonesian archipelago over a million years ago.",
    descId: "Temukan bukti fosil luar biasa dari manusia purba yang berjalan di kepulauan Indonesia lebih dari satu juta tahun lalu.",
    order: 1,
    icon: "🦴",
  },
  {
    id: "ancient-tools",
    hallId: "ancient",
    nameEn: "Prehistoric Tools & Life",
    nameId: "Peralatan & Kehidupan Prasejarah",
    descEn: "Examine the stone tools, cave paintings, and bronze artifacts that reveal how prehistoric peoples lived and thrived.",
    descId: "Periksa peralatan batu, lukisan gua, dan artefak perunggu yang mengungkap kehidupan masyarakat prasejarah.",
    order: 2,
    icon: "🪓",
  },
  {
    id: "ancient-megalith",
    hallId: "ancient",
    nameEn: "Megalithic Traditions",
    nameId: "Tradisi Megalitik",
    descEn: "Explore the mysterious standing stones, burial sites, and monumental structures built by ancient Indonesians.",
    descId: "Jelajahi batu-batu berdiri misterius, situs pemakaman, dan struktur monumental yang dibangun oleh masyarakat Indonesia kuno.",
    order: 3,
    icon: "🪨",
  },
  {
    id: "ancient-migration",
    hallId: "ancient",
    nameEn: "Austronesian Migration",
    nameId: "Migrasi Austronesia",
    descEn: "Trace the epic maritime journey of the Austronesian peoples who settled the Indonesian archipelago.",
    descId: "Telusuri perjalanan maritim epik bangsa Austronesia yang mendiami kepulauan Indonesia.",
    order: 4,
    icon: "⛵",
  },

  // ═══════════════════════════════════════════════════
  // HALL 2: ERA KERAJAAN (kingdom)
  // ═══════════════════════════════════════════════════
  {
    id: "kingdom-hindu-early",
    hallId: "kingdom",
    nameEn: "First Hindu Kingdoms",
    nameId: "Kerajaan Hindu Pertama",
    descEn: "Witness the dawn of organized civilization with Indonesia's earliest Hindu kingdoms from the 4th to 8th centuries.",
    descId: "Saksikan awal peradaban terorganisir dengan kerajaan-kerajaan Hindu pertama Indonesia dari abad ke-4 hingga ke-8.",
    order: 1,
    icon: "🕉️",
  },
  {
    id: "kingdom-sriwijaya",
    hallId: "kingdom",
    nameEn: "Sriwijaya & Maritime Empires",
    nameId: "Sriwijaya & Kerajaan Maritim",
    descEn: "Explore the mighty Buddhist maritime empire that controlled the Strait of Malacca for centuries.",
    descId: "Jelajahi kerajaan maritim Buddha perkasa yang menguasai Selat Malaka selama berabad-abad.",
    order: 2,
    icon: "☸️",
  },
  {
    id: "kingdom-classical",
    hallId: "kingdom",
    nameEn: "Classical Hindu-Buddhist Temples",
    nameId: "Candi Hindu-Buddha Klasik",
    descEn: "Marvel at the magnificent temple complexes of Borobudur, Prambanan, and their contemporaries.",
    descId: "Kagumi kompleks candi megah Borobudur, Prambanan, dan candi-candi sezamannya.",
    order: 3,
    icon: "🛕",
  },
  {
    id: "kingdom-majapahit",
    hallId: "kingdom",
    nameEn: "Kediri, Singasari & Majapahit",
    nameId: "Kediri, Singasari & Majapahit",
    descEn: "Trace the rise and fall of Java's greatest empires, culminating in the golden age of Majapahit.",
    descId: "Telusuri bangkit dan jatuhnya kekaisaran-kekaisaran terbesar Jawa, berakhir pada masa keemasan Majapahit.",
    order: 4,
    icon: "👑",
  },
  {
    id: "kingdom-islamic",
    hallId: "kingdom",
    nameEn: "Islamic Sultanates of Nusantara",
    nameId: "Kesultanan Islam Nusantara",
    descEn: "Discover the rich tapestry of Islamic sultanates that transformed the spiritual and political landscape of the archipelago.",
    descId: "Temukan kekayaan kesultanan-kesultanan Islam yang mengubah lanskap spiritual dan politik Nusantara.",
    order: 5,
    icon: "🕌",
  },

  // ═══════════════════════════════════════════════════
  // HALL 3: ERA KOLONIAL (colonial)
  // ═══════════════════════════════════════════════════
  {
    id: "colonial-arrival",
    hallId: "colonial",
    nameEn: "European Arrival & Spice Trade",
    nameId: "Kedatangan Eropa & Perdagangan Rempah",
    descEn: "Understand how the pursuit of nutmeg, cloves, and pepper drew European powers to the Indonesian archipelago.",
    descId: "Pahami bagaimana perburuan pala, cengkih, dan lada menarik kekuatan Eropa ke kepulauan Indonesia.",
    order: 1,
    icon: "🌿",
  },
  {
    id: "colonial-voc",
    hallId: "colonial",
    nameEn: "VOC & Dutch Colonial Rule",
    nameId: "VOC & Pemerintahan Kolonial Belanda",
    descEn: "Examine the mechanisms of colonial exploitation from the VOC monopoly to the Cultivation System (Tanam Paksa).",
    descId: "Periksa mekanisme eksploitasi kolonial dari monopoli VOC hingga Sistem Tanam Paksa (Cultuurstelsel).",
    order: 2,
    icon: "⚓",
  },
  {
    id: "colonial-resistance",
    hallId: "colonial",
    nameEn: "People's Resistance & Wars",
    nameId: "Perlawanan Rakyat & Peperangan",
    descEn: "Honor the brave heroes who fought against colonial oppression across every corner of the archipelago.",
    descId: "Hormati para pahlawan berani yang melawan penindasan kolonial di setiap penjuru Nusantara.",
    order: 3,
    icon: "⚔️",
  },
  {
    id: "colonial-japan",
    hallId: "colonial",
    nameEn: "Japanese Occupation",
    nameId: "Pendudukan Jepang",
    descEn: "Learn about the brutal Japanese military occupation (1942-1945) and the resistance movements it sparked.",
    descId: "Pelajari pendudukan militer Jepang yang brutal (1942-1945) dan gerakan perlawanan yang ditimbulkannya.",
    order: 4,
    icon: "🏴",
  },

  // ═══════════════════════════════════════════════════
  // HALL 4: PERGERAKAN NASIONAL (national) — BARU
  // ═══════════════════════════════════════════════════
  {
    id: "national-awakening",
    hallId: "national",
    nameEn: "National Awakening (1908-1920)",
    nameId: "Kebangkitan Nasional (1908-1920)",
    descEn: "Witness the birth of modern Indonesian nationalism through education and organization.",
    descId: "Saksikan lahirnya nasionalisme Indonesia modern melalui pendidikan dan organisasi.",
    order: 1,
    icon: "🌅",
  },
  {
    id: "national-struggle",
    hallId: "national",
    nameEn: "Political Struggle & Ideology",
    nameId: "Perjuangan Politik & Ideologi",
    descEn: "Follow the political movements and ideological debates that shaped Indonesia's path to independence.",
    descId: "Ikuti gerakan politik dan perdebatan ideologi yang membentuk jalan Indonesia menuju kemerdekaan.",
    order: 2,
    icon: "✊",
  },
  {
    id: "national-preparation",
    hallId: "national",
    nameEn: "Preparing for Independence",
    nameId: "Persiapan Kemerdekaan",
    descEn: "Explore the critical final steps: BPUPKI, the birth of Pancasila, the Jakarta Charter, and PPKI.",
    descId: "Jelajahi langkah-langkah kritis terakhir: BPUPKI, lahirnya Pancasila, Piagam Jakarta, dan PPKI.",
    order: 3,
    icon: "📜",
  },

  // ═══════════════════════════════════════════════════
  // HALL 5: INDONESIA MODERN (modern) — Gabungan independence + modern
  // ═══════════════════════════════════════════════════
  {
    id: "modern-revolution",
    hallId: "modern",
    nameEn: "Proclamation & Revolution (1945-1949)",
    nameId: "Proklamasi & Revolusi (1945-1949)",
    descEn: "Relive the historic declaration of independence and the fierce struggle to defend it.",
    descId: "Hidupkan kembali proklamasi kemerdekaan yang bersejarah dan perjuangan sengit untuk mempertahankannya.",
    order: 1,
    icon: "🇮🇩",
  },
  {
    id: "modern-oldorder",
    hallId: "modern",
    nameEn: "Old Order / Guided Democracy (1950-1966)",
    nameId: "Orde Lama / Demokrasi Terpimpin (1950-1966)",
    descEn: "Understand Soekarno's era of nation-building, international leadership, and political turbulence.",
    descId: "Pahami era Soekarno dalam pembangunan bangsa, kepemimpinan internasional, dan gejolak politik.",
    order: 2,
    icon: "🏛️",
  },
  {
    id: "modern-neworder",
    hallId: "modern",
    nameEn: "New Order Era (1966-1998)",
    nameId: "Era Orde Baru (1966-1998)",
    descEn: "Examine Soeharto's 32-year rule: economic development, political control, and eventual downfall.",
    descId: "Periksa 32 tahun pemerintahan Soeharto: pembangunan ekonomi, kontrol politik, dan kejatuhannya.",
    order: 3,
    icon: "🏗️",
  },
  {
    id: "modern-reformasi",
    hallId: "modern",
    nameEn: "Reformation Era (1998-Present)",
    nameId: "Era Reformasi (1998-Sekarang)",
    descEn: "Follow Indonesia's democratic transformation from 1998 to the present day.",
    descId: "Ikuti transformasi demokrasi Indonesia dari tahun 1998 hingga saat ini.",
    order: 4,
    icon: "🗳️",
  },
  {
    id: "modern-symbols",
    hallId: "modern",
    nameEn: "National Symbols & Identity",
    nameId: "Simbol & Identitas Negara",
    descEn: "Celebrate the symbols that unite 270 million Indonesians: Pancasila, Garuda, and Bhinneka Tunggal Ika.",
    descId: "Rayakan simbol-simbol yang menyatukan 270 juta rakyat Indonesia: Pancasila, Garuda, dan Bhinneka Tunggal Ika.",
    order: 5,
    icon: "🦅",
  },

  // ═══════════════════════════════════════════════════
  // HALL 6: WARISAN BUDAYA (heritage) — BARU
  // ═══════════════════════════════════════════════════
  {
    id: "heritage-intangible",
    hallId: "heritage",
    nameEn: "UNESCO Intangible Heritage",
    nameId: "Warisan Budaya Takbenda UNESCO",
    descEn: "Discover Indonesia's living cultural traditions recognized by UNESCO as Masterpieces of Humanity.",
    descId: "Temukan tradisi budaya hidup Indonesia yang diakui UNESCO sebagai Mahakarya Kemanusiaan.",
    order: 1,
    icon: "🎭",
  },
  {
    id: "heritage-sites",
    hallId: "heritage",
    nameEn: "UNESCO World Heritage Sites",
    nameId: "Situs Warisan Dunia UNESCO",
    descEn: "Visit Indonesia's protected natural and cultural wonders inscribed on the UNESCO World Heritage List.",
    descId: "Kunjungi keajaiban alam dan budaya Indonesia yang terdaftar di Daftar Warisan Dunia UNESCO.",
    order: 2,
    icon: "🏔️",
  },
  {
    id: "heritage-arts",
    hallId: "heritage",
    nameEn: "Traditional Arts & Local Wisdom",
    nameId: "Seni Tradisional & Kearifan Lokal",
    descEn: "Explore the rich diversity of traditional arts, textiles, and cultural practices across the archipelago.",
    descId: "Jelajahi kekayaan seni tradisional, tekstil, dan praktik budaya di seluruh Nusantara.",
    order: 3,
    icon: "🎨",
  },
];

/** Get all sections belonging to a specific hall */
export function getSectionsByHall(hallId: RoomId): SectionRoom[] {
  return sectionRooms
    .filter((s) => s.hallId === hallId)
    .sort((a, b) => a.order - b.order);
}

/** Get a section by its ID */
export function getSectionById(sectionId: string): SectionRoom | undefined {
  return sectionRooms.find((s) => s.id === sectionId);
}
