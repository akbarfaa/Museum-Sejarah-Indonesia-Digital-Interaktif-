const fs = require("fs");
const path = require("path");

// Seed configuration for Wikipedia articles to scrape
const artifactSeeds = [
  // ANCIENT INDONESIA
  {
    id: "homo-erectus",
    room: "ancient",
    shape: "texture",
    color: "#8b6f47",
    position: [-6, -4],
    wikipediaEn: "Java Man",
    wikipediaId: "Manusia Jawa",
    nameEn: "Java Man Skull",
    nameId: "Tengkorak Manusia Jawa",
    originEn: "Sangiran, Central Java",
    originId: "Sangiran, Jawa Tengah",
    eraEn: "c. 1.5 million years ago",
    eraId: "± 1,5 juta tahun lalu",
  },
  {
    id: "stone-axe",
    room: "ancient",
    shape: "sword",
    color: "#6b5a3a",
    position: [6, -4],
    wikipediaEn: "Hand axe",
    wikipediaId: "Kapak genggam",
    nameEn: "Neolithic Hand Axe",
    nameId: "Kapak Genggam Neolitik",
    originEn: "Pacitan, East Java",
    originId: "Pacitan, Jawa Timur",
    eraEn: "c. 8000 BCE",
    eraId: "± 8000 SM",
  },
  {
    id: "megalith",
    room: "ancient",
    shape: "tablet",
    color: "#7a7062",
    position: [-6, 4],
    wikipediaEn: "Menhir",
    wikipediaId: "Menhir",
    nameEn: "Megalithic Menhir",
    nameId: "Menhir Megalitik",
    originEn: "Lore Lindu, Central Sulawesi",
    originId: "Lore Lindu, Sulawesi Tengah",
    eraEn: "c. 1500 BCE",
    eraId: "± 1500 SM",
  },
  {
    id: "sangiran-site",
    room: "ancient",
    shape: "wall",
    color: "#7c5c3c",
    position: [-10.85, -2],
    wikipediaEn: "Sangiran",
    wikipediaId: "Sangiran",
    nameEn: "Sangiran Archaeological Site",
    nameId: "Situs Arkeologi Sangiran",
    originEn: "Sangiran Dome, Central Java",
    originId: "Kubah Sangiran, Jawa Tengah",
    eraEn: "Pleistocene Epoch",
    eraId: "Kala Pleistosen",
  },
  {
    id: "nias-megalith",
    room: "ancient",
    shape: "wall",
    color: "#8a8275",
    position: [10.85, -2],
    wikipediaEn: "Nias people",
    wikipediaId: "Lompat batu Nias",
    nameEn: "Nias Megalithic Site",
    nameId: "Situs Megalitik Nias",
    originEn: "Nias Island, North Sumatra",
    originId: "Pulau Nias, Sumatera Utara",
    eraEn: "c. 500 BCE - 1000 CE",
    eraId: "± 500 SM - 1000 M",
  },

  // KINGDOM ERA
  {
    id: "keris",
    room: "kingdom",
    shape: "texture",
    color: "#3a2e1f",
    position: [-6, -4],
    wikipediaEn: "Kris",
    wikipediaId: "Keris",
    nameEn: "Royal Keris",
    nameId: "Keris Pusaka",
    originEn: "Majapahit Empire, Java",
    originId: "Kekaisaran Majapahit, Jawa",
    eraEn: "14th Century",
    eraId: "Abad ke-14",
  },
  {
    id: "ganesha",
    room: "kingdom",
    shape: "texture",
    color: "#6e5a2f",
    position: [6, -4],
    wikipediaEn: "Ganesha",
    wikipediaId: "Ganesa",
    nameEn: "Ganesha Statue",
    nameId: "Arca Ganesha",
    originEn: "Singosari Temple, East Java",
    originId: "Candi Singosari, Jawa Timur",
    eraEn: "10th Century",
    eraId: "Abad ke-10",
  },
  {
    id: "inscription",
    room: "kingdom",
    shape: "tablet",
    color: "#4a3f2a",
    position: [-6, 4],
    wikipediaEn: "Kedukan Bukit inscription",
    wikipediaId: "Prasasti Kedukan Bukit",
    nameEn: "Kedukan Bukit Inscription",
    nameId: "Prasasti Kedukan Bukit",
    originEn: "Srivijaya, South Sumatra",
    originId: "Sriwijaya, Sumatera Selatan",
    eraEn: "682 CE",
    eraId: "682 M",
  },
  {
    id: "crown",
    room: "kingdom",
    shape: "texture",
    color: "#c9a14a",
    position: [6, 4],
    wikipediaEn: "Mataram Sultanate",
    wikipediaId: "Kesultanan Mataram",
    nameEn: "Mataram Royal Crown",
    nameId: "Mahkota Kerajaan Mataram",
    originEn: "Mataram Sultanate, Java",
    originId: "Kesultanan Mataram, Jawa",
    eraEn: "17th Century",
    eraId: "Abad ke-17",
  },
  {
    id: "borobudur",
    room: "kingdom",
    shape: "wall",
    color: "#706a58",
    position: [-10.85, 0],
    wikipediaEn: "Borobudur",
    wikipediaId: "Borobudur",
    nameEn: "Borobudur Temple Photo",
    nameId: "Foto Candi Borobudur",
    originEn: "Magelang, Central Java",
    originId: "Magelang, Jawa Tengah",
    eraEn: "9th Century",
    eraId: "Abad ke-9",
  },
  {
    id: "prambanan",
    room: "kingdom",
    shape: "wall",
    color: "#7e786b",
    position: [10.85, 0],
    wikipediaEn: "Prambanan",
    wikipediaId: "Candi Prambanan",
    nameEn: "Prambanan Temple Relief",
    nameId: "Relief Candi Prambanan",
    originEn: "Sleman, Yogyakarta",
    originId: "Sleman, Yogyakarta",
    eraEn: "10th Century",
    eraId: "Abad ke-10",
  },

  // COLONIAL HISTORY
  {
    id: "voc-map",
    room: "colonial",
    shape: "wall",
    color: "#a89373",
    position: [-10.85, -2],
    wikipediaEn: "Dutch East India Company",
    wikipediaId: "Vereenigde Oostindische Compagnie",
    nameEn: "VOC Trade Map",
    nameId: "Peta Dagang VOC",
    originEn: "Dutch East India Company",
    originId: "Vereenigde Oostindische Compagnie",
    eraEn: "1670",
    eraId: "1670",
  },
  {
    id: "diponegoro-kris",
    room: "colonial",
    shape: "sword",
    color: "#2f2418",
    position: [-6, -4],
    wikipediaEn: "Diponegoro",
    wikipediaId: "Diponegoro",
    nameEn: "Kiai Naga Siluman",
    nameId: "Kiai Naga Siluman",
    originEn: "Java War, Yogyakarta",
    originId: "Perang Jawa, Yogyakarta",
    eraEn: "1825–1830",
    eraId: "1825–1830",
  },
  {
    id: "old-photo",
    room: "colonial",
    shape: "wall",
    color: "#7a6a5a",
    position: [10.85, -2],
    wikipediaEn: "Batavia, Dutch East Indies",
    wikipediaId: "Batavia",
    nameEn: "Batavia Photograph",
    nameId: "Foto Batavia",
    originEn: "Batavia (Jakarta)",
    originId: "Batavia (Jakarta)",
    eraEn: "c. 1890",
    eraId: "± 1890",
  },
  {
    id: "hasanuddin-helmet",
    room: "colonial",
    shape: "texture",
    color: "#6b583f",
    position: [6, -4],
    wikipediaEn: "Hasanuddin of Gowa",
    wikipediaId: "Sultan Hasanuddin",
    nameEn: "Sultan Hasanuddin Helmet",
    nameId: "Helm Sultan Hasanuddin",
    originEn: "Kingdom of Gowa, South Sulawesi",
    originId: "Kerajaan Gowa, Sulawesi Selatan",
    eraEn: "17th Century",
    eraId: "Abad ke-17",
  },
  {
    id: "banda-spices",
    room: "colonial",
    shape: "texture",
    color: "#5c704f",
    position: [-6, 4],
    wikipediaEn: "Banda Islands",
    wikipediaId: "Kepulauan Banda",
    nameEn: "Banda Nutmeg Artifact",
    nameId: "Artefak Pala Banda",
    originEn: "Banda Islands, Maluku",
    originId: "Kepulauan Banda, Maluku",
    eraEn: "16th-18th Century",
    eraId: "Abad ke-16 - ke-18",
  },

  // INDEPENDENCE
  {
    id: "proklamasi",
    room: "independence",
    shape: "wall",
    color: "#e8d6a3",
    position: [-10.85, -2],
    wikipediaEn: "Proclamation of Indonesian Independence",
    wikipediaId: "Proklamasi Kemerdekaan Indonesia",
    nameEn: "Proclamation Text",
    nameId: "Teks Proklamasi",
    originEn: "Jakarta",
    originId: "Jakarta",
    eraEn: "17 August 1945",
    eraId: "17 Agustus 1945",
  },
  {
    id: "merah-putih",
    room: "independence",
    shape: "wall",
    color: "#c0392b",
    position: [10.85, -2],
    wikipediaEn: "Flag of Indonesia",
    wikipediaId: "Bendera Indonesia",
    nameEn: "Sang Saka Merah Putih",
    nameId: "Sang Saka Merah Putih",
    originEn: "Sewn by Fatmawati",
    originId: "Dijahit oleh Fatmawati",
    eraEn: "1945",
    eraId: "1945",
  },
  {
    id: "soekarno-speech",
    room: "independence",
    shape: "book",
    color: "#3a2a1a",
    position: [-6, -4],
    wikipediaEn: "Sukarno",
    wikipediaId: "Soekarno",
    nameEn: "Soekarno's Speeches",
    nameId: "Pidato Soekarno",
    originEn: "Office of the President",
    originId: "Kantor Presiden",
    eraEn: "1945–1965",
    eraId: "1945–1965",
  },
  {
    id: "surabaya-spear",
    room: "independence",
    shape: "texture",
    color: "#9c3b28",
    position: [6, -4],
    wikipediaEn: "Battle of Surabaya",
    wikipediaId: "Pertempuran Surabaya",
    nameEn: "Surabaya Bamboo Spear",
    nameId: "Bambu Runcing Surabaya",
    originEn: "Surabaya, East Java",
    originId: "Surabaya, Jawa Timur",
    eraEn: "November 1945",
    eraId: "November 1945",
  },
  {
    id: "bung-tomo-radio",
    room: "independence",
    shape: "texture",
    color: "#52433f",
    position: [-6, 4],
    wikipediaEn: "Sutomo",
    wikipediaId: "Sutomo",
    nameEn: "Bung Tomo's Radio Transceiver",
    nameId: "Pemancar Radio Bung Tomo",
    originEn: "Surabaya Broadcast Studio",
    originId: "Studio Siaran Surabaya",
    eraEn: "1945 Resistance",
    eraId: "Perjuangan 1945",
  },

  // MODERN INDONESIA
  {
    id: "monas",
    room: "modern",
    shape: "crown",
    color: "#d6c47a",
    position: [-6, -4],
    wikipediaEn: "National Monument (Indonesia)",
    wikipediaId: "Monumen Nasional",
    nameEn: "Monas Miniature",
    nameId: "Miniatur Monas",
    originEn: "Jakarta",
    originId: "Jakarta",
    eraEn: "1975",
    eraId: "1975",
  },
  {
    id: "batik",
    room: "modern",
    shape: "wall",
    color: "#8e5a2e",
    position: [-10.85, -2],
    wikipediaEn: "Batik",
    wikipediaId: "Batik",
    nameEn: "Batik Cloth",
    nameId: "Kain Batik",
    originEn: "UNESCO Heritage, 2009",
    originId: "Warisan UNESCO, 2009",
    eraEn: "Contemporary",
    eraId: "Kontemporer",
  },
  {
    id: "satellite",
    room: "modern",
    shape: "vase",
    color: "#7aa8d6",
    position: [6, -4],
    wikipediaEn: "Palapa",
    wikipediaId: "Satelit Palapa",
    nameEn: "Palapa Satellite Model",
    nameId: "Model Satelit Palapa",
    originEn: "PT Telkom Indonesia",
    originId: "PT Telkom Indonesia",
    eraEn: "1976",
    eraId: "1976",
  },
  {
    id: "angklung",
    room: "modern",
    shape: "texture",
    color: "#9c7f55",
    position: [-6, 4],
    wikipediaEn: "Angklung",
    wikipediaId: "Angklung",
    nameEn: "Bamboo Angklung Instrument",
    nameId: "Instrumen Musik Angklung",
    originEn: "UNESCO Heritage, 2010",
    originId: "Warisan UNESCO, 2010",
    eraEn: "Traditional & Modern",
    eraId: "Tradisional & Modern",
  },
  {
    id: "wayang",
    room: "modern",
    shape: "texture",
    color: "#b07358",
    position: [6, 4],
    wikipediaEn: "Wayang",
    wikipediaId: "Wayang",
    nameEn: "Wayang Kulit Shadow Puppet",
    nameId: "Wayang Kulit Warisan Dunia",
    originEn: "UNESCO Heritage, 2003",
    originId: "Warisan UNESCO, 2003",
    eraEn: "Classical & Modern",
    eraId: "Klasik & Modern",
  },
  {
    id: "garuda",
    room: "modern",
    shape: "wall",
    color: "#d6b158",
    position: [10.85, -2],
    wikipediaEn: "National emblem of Indonesia",
    wikipediaId: "Lambang Negara Indonesia",
    nameEn: "Garuda Pancasila",
    nameId: "Garuda Pancasila",
    originEn: "Designed by Sultan Hamid II",
    originId: "Dirancang oleh Sultan Hamid II",
    eraEn: "Adopted in 1950",
    eraId: "Diresmikan 1950",
  },
];

// YouTube seeds for the cinema
const cinemaSeeds = [
  {
    category: "general",
    query: "sejarah indonesia dokumenter",
    eraEn: "General Documentaries",
    eraId: "Dokumenter Sejarah",
  },
  {
    category: "war",
    query: "perang kemerdekaan indonesia dokumenter",
    eraEn: "Independence War",
    eraId: "Perjuangan Kemerdekaan",
  },
  {
    category: "culture",
    query: "warisan unesco budaya indonesia sejarah",
    eraEn: "Cultural Heritage",
    eraId: "Warisan Budaya & Seni",
  },
  {
    category: "kingdoms",
    query: "sejarah kerajaan majapahit sriwijaya",
    eraEn: "Ancient Kingdoms",
    eraId: "Kerajaan Nusantara Kuno",
  },
];

// Helper: Download image from URL and save to path
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MuseumVerseIndonesiaScraper/1.0 (contact: info@museumverse.id)"
      }
    });
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    console.log(`Successfully downloaded: ${filepath}`);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}
// Helper: Fetch Wikipedia extracts & image URLs
async function fetchWikipedia(title, lang) {
  const endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=thumbnail|original&pithumbsize=1000&redirects=1&titles=${encodeURIComponent(title)}`;
  try {
    const res = await fetch(endpoint, {
      headers: {
        "User-Agent": "MuseumVerseIndonesiaScraper/1.0 (contact: info@museumverse.id)"
      }
    });
    if (!res.ok) {
      console.warn(`  Wikipedia API returned status ${res.status} for "${title}" (${lang})`);
      return null;
    }
    const json = await res.json();
    if (!json.query || !json.query.pages) return null;
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === "-1") return null;
    const data = pages[pageId];
    return {
      title: data.title,
      extract: data.extract,
      imageUrl: data.thumbnail?.source || data.original?.source || null,
    };
  } catch (err) {
    console.error(`Error fetching Wikipedia (${lang}) for "${title}":`, err.message);
    return null;
  }
}

// Helper: Recursively find video Renderers in ytInitialData
function findVideos(obj, results = new Set(), list = []) {
  if (!obj || typeof obj !== "object") return;
  if (obj.videoId && typeof obj.videoId === "string" && !results.has(obj.videoId)) {
    results.add(obj.videoId);
    let title = "";
    if (obj.title && obj.title.runs && obj.title.runs[0]) {
      title = obj.title.runs[0].text;
    } else if (obj.title && typeof obj.title.simpleText === "string") {
      title = obj.title.simpleText;
    }
    let description = "";
    if (obj.descriptionSnippet && obj.descriptionSnippet.runs && obj.descriptionSnippet.runs[0]) {
      description = obj.descriptionSnippet.runs[0].text;
    } else if (obj.detailedMetadataSnippets && obj.detailedMetadataSnippets[0]) {
      description = obj.detailedMetadataSnippets[0].snippetText?.runs?.map(r => r.text).join("") || "";
    }
    if (title && title.length > 0) {
      list.push({
        id: obj.videoId,
        title,
        description,
      });
    }
    return;
  }
  for (const key of Object.keys(obj)) {
    findVideos(obj[key], results, list);
  }
}

// Helper: Fetch YouTube videos for a query
async function fetchYouTubeVideos(query) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    const html = await res.text();
    const match = html.match(/ytInitialData\s*=\s*({.+?});/);
    if (match) {
      const json = JSON.parse(match[1]);
      const list = [];
      findVideos(json, new Set(), list);
      return list.filter((v) => v.id.length === 11);
    }
  } catch (err) {
    console.error(`Error searching YouTube for "${query}":`, err.message);
  }
  return [];
}

const fallbackDescriptions = {
  "homo-erectus": {
    en: "Java Man (Homo erectus erectus) is an early human fossil discovered in 1891 and 1892 on the island of Java, Indonesia. Discovered by Eugène Dubois at Trinil on the banks of the Solo River, it was estimated to be between 700,000 and 1,490,000 years old, representing a major milestone in human evolutionary science.",
    id: "Manusia Jawa (Homo erectus erectus) adalah fosil manusia purba yang ditemukan pada tahun 1891 dan 1892 di Pulau Jawa, Indonesia. Ditemukan oleh Eugène Dubois di Trinil di tepi Sungai Solo, fosil ini diperkirakan berusia antara 700.000 hingga 1.490.000 tahun, mewakili tonggak penting dalam sejarah evolusi manusia."
  },
  "stone-axe": {
    en: "The Neolithic Hand Axe represents the Pacitanian culture of early human tools. Discovered in Pacitan, East Java, these stone tools date back to around 8000 BCE and highlight the sophisticated lithic industry developed by prehistoric communities for hunting and survival in the archipelago.",
    id: "Kapak Genggam Neolitik mewakili kebudayaan Pacitan dari peralatan manusia purba. Ditemukan di Pacitan, Jawa Timur, peralatan batu ini berasal dari sekitar 8000 SM dan menunjukkan teknologi pengolahan batu yang canggih oleh masyarakat prasejarah untuk berburu dan bertahan hidup."
  },
  "megalith": {
    en: "A Menhir is a large standing stone erected by humans during the Megalithic era, typically associated with ancestral worship and sacred community assembly. These structures found in Lore Lindu, Central Sulawesi, date back to around 1500 BCE, showcasing early spiritual beliefs and social coordination.",
    id: "Menhir adalah batu tegak besar yang didirikan oleh manusia pada zaman Megalitik, biasanya dikaitkan dengan pemujaan leluhur dan upacara adat. Ditemukan di Lore Lindu, Sulawesi Tengah, struktur ini berasal dari sekitar 1500 SM, menunjukkan kepercayaan spiritual awal di Nusantara."
  },
  "sangiran-site": {
    en: "Sangiran is a world-renowned archaeological site in Central Java, recognized by UNESCO as one of the most important locations for studying human fossils. Containing over half of the world's known hominid fossils, the site offers deep insights into human evolution, prehistoric fauna, and early environmental changes.",
    id: "Sangiran adalah situs arkeologi terkenal di Jawa Tengah, diakui oleh UNESCO sebagai salah satu lokasi terpenting untuk mempelajari fosil manusia. Menyimpan lebih dari setengah temuan fosil hominid dunia, situs ini memberikan wawasan mendalam tentang evolusi manusia purba dan fauna purbakala."
  },
  "nias-megalith": {
    en: "The Nias Megalithic tradition represents a living monument culture where massive stone structures were erected to honor chieftains and facilitate rites of passage. Dating from 500 BCE to 1000 CE, these stone platforms and pillars reflect a highly organized tribal structure famous for stone jumping (Fahombo) and defensive architecture.",
    id: "Tradisi Megalitik Nias mewakili kebudayaan monumen batu hidup di mana struktur batu besar didirikan untuk menghormati kepala suku dan ritual adat. Berasal dari 500 SM hingga 1000 M, meja dan pilar batu ini mencerminkan struktur sosial suku yang terorganisir, terkenal dengan tradisi lompat batu."
  },
  "keris": {
    en: "The Keris is a Javanese asymmetrical dagger featuring a distinctive wavy blade crafted with alternating layers of iron and nickel (pamor). Reaching its peak during the Majapahit Empire in the 14th century, the keris served both as a lethal weapon and a sacred spiritual object symbolizing social status and cosmic power.",
    id: "Keris adalah belati asimetris asal Jawa yang menampilkan bilah berlekuk khas dengan lapisan pamor besi dan nikel. Mencapai puncak perkembangannya di masa Kerajaan Majapahit pada abad ke-14, keris berfungsi sebagai senjata pertahanan diri sekaligus benda spiritual suci perlambang status sosial."
  },
  "ganesha": {
    en: "This volcanic stone statue of Ganesha, the elephant-headed Hindu deity of wisdom, intellect, and obstacle removal, is a masterpiece from Singosari Temple in East Java. Dating back to the 10th century, the statue exemplifies the exquisite religious stone carving art of the classic Hindu-Buddhist kingdoms in Java.",
    id: "Arca batu vulkanik Ganesha, dewa Hindu berkepala gajah lambang kebijaksanaan dan penghalau rintangan, adalah karya seni adiluhung dari Candi Singosari, Jawa Timur. Berasal dari abad ke-10, arca ini menunjukkan keindahan seni pahat batu kerajaan Hindu-Buddha klasik Jawa."
  },
  "inscription": {
    en: "The Kedukan Bukit Inscription is a small stone stela found in Palembang, South Sumatra, dated 682 CE. Written in Pallava script and Old Malay, it records the sacred victory march (siddhayatra) led by King Dapunta Hyang, establishing the earliest historical record of the rise of the Srivijaya maritime empire.",
    id: "Prasasti Kedukan Bukit adalah batu bertulis yang ditemukan di Palembang, Sumatera Selatan, bertarikh 682 M. Ditulis dalam aksara Pallawa dan bahasa Melayu Kuno, prasasti ini mencatat perjalanan suci (siddhayatra) Dapunta Hyang Sri Jayanasa, sebagai bukti sejarah awal berdirinya Kerajaan Sriwijaya."
  },
  "crown": {
    en: "The Royal Crown of the Mataram Sultanate is a gold-gilded ceremonial headpiece reflecting the splendor of Islamic kingdoms in 17th-century Java. Mataram unified major Javanese territories under Sultan Agung, and this crown represents the integration of Hindu-Javanese aesthetic heritage with Islamic royal authority.",
    id: "Mahkota Kerajaan Kesultanan Mataram adalah hiasan kepala seremonial berlapis emas yang mencerminkan kemegahan kerajaan Islam di Jawa abad ke-17. Mataram menyatukan wilayah Jawa di bawah Sultan Agung, dan mahkota ini melambangkan perpaduan estetika Hindu-Jawa dengan otoritas Islam."
  },
  "borobudur": {
    en: "Borobudur is a magnificent 9th-century Mahayana Buddhist temple in Central Java, Indonesia. Constructed under the Sailendra Dynasty, it consists of nine stacked platforms decorated with 2,672 relief panels and 504 Buddha statues, representing the cosmological path of enlightenment in Buddhist philosophy.",
    id: "Candi Borobudur adalah candi Buddha Mahayana megah abad ke-9 yang terletak di Magelang, Jawa Tengah. Dibangun pada masa Dinasti Syailendra, candi ini terdiri atas sembilan platform bertingkat yang dihiasi dengan 2.672 panel relief dan 504 arca Buddha, melambangkan perjalanan mencapai pencerahan."
  },
  "prambanan": {
    en: "Prambanan is the largest Hindu temple compound in Indonesia, built in the 9th century in Yogyakarta. Dedicated to the Trimurti (Shiva, Vishnu, and Brahma), its towering stone structures are adorned with detailed narrative reliefs illustrating the epic story of the Ramayana and Bhagavata Purana.",
    id: "Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia, dibangun pada abad ke-9 di Yogyakarta. Dipersembahkan untuk Trimurti (Siwa, Wisnu, dan Brahma), menara candinya yang menjulang tinggi dihiasi relief naratif rinci yang mengisahkan epik Ramayana dan Krishnayana."
  },
  "voc-map": {
    en: "The Dutch East India Company (VOC) trade map from 1670 depicts the maritime routes and strategic commercial networks established across Nusantara. The VOC monopolized the global spice trade, heavily colonizing parts of Indonesia and shaping the modern archipelago's geopolitical borders through commerce and military force.",
    id: "Peta dagang VOC dari tahun 1670 menggambarkan rute pelayaran maritim dan jaringan komersial strategis di seluruh Nusantara. VOC memonopoli perdagangan rempah-rempah global, menjajah sebagian wilayah Nusantara, dan membentuk batas wilayah geopolitik kepulauan melalui perdagangan."
  },
  "diponegoro-kris": {
    en: "Kiai Naga Siluman is the legendary royal keris belonging to Prince Diponegoro, who led the Java War (1825–1830) against Dutch colonial rule. Captured by colonial forces and sent to the Netherlands, the sacred weapon was officially returned to Indonesia in 2020, serving as a powerful symbol of national sovereignty.",
    id: "Kiai Naga Siluman adalah keris pusaka legendaris milik Pangeran Diponegoro yang memimpin Perang Jawa (1825–1830) melawan Belanda. Disita oleh pasukan kolonial dan dibawa ke Belanda, senjata pusaka ini dikembalikan secara resmi ke Indonesia pada tahun 2020 sebagai lambang kedaulatan."
  },
  "old-photo": {
    en: "This historic photograph captures the harbor area of Batavia around 1890. Established as the regional capital of the Dutch East Indies in 1619 on the ruins of Jayakarta, Batavia grew into a bustling multicultural port city, serving as the commercial and administrative center of colonial administration.",
    id: "Foto bersejarah ini menangkap kawasan pelabuhan Batavia sekitar tahun 1890. Didirikan sebagai ibu kota Hindia Belanda pada tahun 1619 di atas runtuhan Sunda Kelapa/Jayakarta, Batavia berkembang menjadi kota pelabuhan multikultural yang sibuk serta pusat administratif kolonial Belanda."
  },
  "hasanuddin-helmet": {
    en: "The Sultan Hasanuddin Helmet is a ceremonial iron headpiece from the 17th-century Kingdom of Gowa in South Sulawesi. Sultan Hasanuddin, known as the 'Rooster of the East' for his fierce resistance, wore protective gear like this during naval battles against the Dutch VOC spice monopoly in Makassar.",
    id: "Helm Sultan Hasanuddin adalah pelindung kepala seremonial besi dari Kerajaan Gowa abad ke-17 di Sulawesi Selatan. Sultan Hasanuddin, yang dijuluki 'Ayam Jantan dari Timur' karena perlawanannya yang gigih, mengenakan helm ini saat melawan monopoli dagang VOC di Makassar."
  },
  "banda-spices": {
    en: "This artifact displays nutmeg and mace specimens from the Banda Islands in Maluku. Known globally as the Spice Islands, Banda was the world's only source of nutmeg, which triggered intense European exploration, the arrival of Portuguese and Dutch powers, and subsequent colonial conflicts.",
    id: "Artefak ini menampilkan spesimen buah pala dan bunga pala dari Kepulauan Banda, Maluku. Dikenal dunia sebagai Kepulauan Rempah, Banda pernah menjadi satu-satunya penghasil pala di dunia yang memicu penjelajahan bangsa Eropa dan awal era kolonialisme di Indonesia."
  },
  "proklamasi": {
    en: "The typed Proclamation of Indonesian Independence was drafted by Sukarno, Mohammad Hatta, and Achmad Soebardjo on the night of 16 August 1945. Read aloud at Pegangsaan Timur on the morning of 17 August 1945, the historic declaration marked the birth of the Republic of Indonesia and the start of the revolutionary struggle.",
    id: "Naskah ketikan Proklamasi Kemerdekaan Indonesia dirumuskan oleh Soekarno, Mohammad Hatta, dan Achmad Soebardjo pada malam 16 Agustus 1945. Dibacakan pada pagi hari 17 Agustus 1945 di Pegangsaan Timur, deklarasi bersejarah ini menandai berdirinya Republik Indonesia."
  },
  "merah-putih": {
    en: "Sang Saka Merah Putih is the historic first national flag of Indonesia, sewn by First Lady Fatmawati in 1945. Raised during the proclamation of independence, its design is inspired by the red and white banner of the Majapahit Empire, representing courage (red) and purity (white).",
    id: "Sang Saka Merah Putih adalah bendera pusaka pertama Indonesia, dijahit oleh Ibu Fatmawati pada tahun 1945. Dikibarkan pertama kali saat Proklamasi Kemerdekaan, desain dwiwarna ini terinspirasi dari panji Majapahit, melambangkan keberanian (merah) dan kesucian (putih)."
  },
  "soekarno-speech": {
    en: "This document contains a collection of historic speeches delivered by Sukarno, the first president and founding father of Indonesia. Sukarno was a brilliant orator whose speeches, such as the birth of Pancasila on 1 June 1945, galvanized national unity, anti-colonial sentiment, and sovereign pride across the country.",
    id: "Dokumen ini berisi kumpulan pidato bersejarah yang disampaikan oleh Soekarno, presiden pertama sekaligus Proklamator Indonesia. Soekarno adalah orator ulung yang pidatonya, seperti Lahirnya Pancasila 1 Juni 1945, berhasil membakar semangat persatuan dan kemerdekaan nasional."
  },
  "surabaya-spear": {
    en: "The sharpened bamboo spear (Bambu Runcing) is a legendary improvised weapon used by Indonesian militia during the Battle of Surabaya in November 1945. Symbolizing grassroots determination and heroic resistance, this simple tool successfully opposed modern Allied military forces, leading to the annual commemoration of Heroes' Day.",
    id: "Bambu Runcing adalah senjata tradisional legendaris yang digunakan oleh laskar pejuang rakyat Indonesia selama Pertempuran Surabaya pada November 1945. Menjadi lambang perjuangan semesta, bambu runcing digunakan rakyat untuk melawan tentara sekutu modern demi mempertahankan kedaulatan."
  },
  "bung-tomo-radio": {
    en: "This radio transmitter represents the equipment used by revolutionary leader Bung Tomo to broadcast emotional, patriotic speeches in Surabaya. Through his broadcasts in late 1945, Bung Tomo rallied thousands of freedom fighters and civilians across East Java to stand firm against returning British and Dutch forces.",
    id: "Pemancar radio ini mewakili peralatan yang digunakan oleh tokoh perjuangan Bung Tomo untuk menyiarkan pidato patriotik yang membakar semangat pejuang di Surabaya. Melalui siaran radio akhir 1945, ia menyerukan perlawanan semesta melawan kembalinya pasukan kolonial."
  },
  "monas": {
    en: "The National Monument (Monas) is a 132-meter obelisk in Central Jakarta built to commemorate the struggle for Indonesian independence. Opened in 1975, Monas is topped by a bronze flame coated with gold leaf, symbolizing the enduring and burning spirit of the Indonesian nation's journey toward prosperity.",
    id: "Monumen Nasional (Monas) adalah tugu peringatan setinggi 132 meter di Jakarta Pusat yang didirikan untuk mengenang perjuangan kemerdekaan. Diresmikan pada tahun 1975, Monas dimahkotai oleh lidah api perunggu dilapisi emas murni sebagai simbol semangat perjuangan bangsa yang tak kunjung padam."
  },
  "batik": {
    en: "Batik is an exquisite textile art of Java created using wax-resist dyeing techniques, recognized by UNESCO as Intangible Cultural Heritage in 2009. Featuring diverse patterns that convey distinct philosophical meanings, batik is deeply integrated into Indonesian life, from traditional rituals to modern fashion.",
    id: "Batik adalah seni tekstil tradisional Jawa yang dibuat menggunakan teknik rintangan lilin malam, diakui oleh UNESCO sebagai Warisan Budaya Takbenda pada tahun 2009. Menampilkan beragam motif indah dengan makna filosofis mendalam, batik menjadi bagian dari pakaian adat hingga modern."
  },
  "satellite": {
    en: "The Palapa Satellite system was launched in July 1976, making Indonesia the first developing nation to operate its own domestic communications satellites. Named after Gajah Mada's famous Palapa Oath, this technological milestone successfully united the massive archipelago of over 17,000 islands through telecommunications.",
    id: "Satelit Palapa pertama kali diluncurkan pada Juli 1976, menjadikan Indonesia negara berkembang pertama yang mengoperasikan satelit komunikasi domestik sendiri. Dinamakan dari Sumpah Palapa Patih Gajah Mada, satelit ini berhasil menyatukan komunikasi di ribuan pulau Nusantara."
  },
  "angklung": {
    en: "The Angklung is a traditional Sundanese musical instrument made of tuned bamboo tubes sliding in a bamboo frame, shaken to produce resonant notes. Designated by UNESCO in 2010, the angklung teaches teamwork and harmony, as each performer shakes one note to build a complete melody collectively.",
    id: "Angklung adalah alat musik tradisional Sunda yang terbuat dari tabung bambu yang dipasang pada bingkai, dibunyikan dengan cara digoyang. Terdaftar di UNESCO sejak tahun 2010, angklung mengajarkan keharmonisan sosial karena setiap pemain harus saling bekerja sama memadukan nada."
  },
  "wayang": {
    en: "Wayang Kulit is a highly refined shadow puppet theater art that originated in Java and Bali, recognized by UNESCO in 2003. Driven by a master storyteller (Dalang) and a gamelan orchestra, performances depict episodes from the Ramayana, Mahabharata, and local folklore to convey deep moral and spiritual guidance.",
    id: "Wayang Kulit adalah seni pertunjukan bayangan tradisional yang berkembang di Jawa dan Bali, ditetapkan sebagai Warisan Dunia oleh UNESCO pada 2003. Dipimpin oleh dalang dan diiringi gamelan, pertunjukan wayang menceritakan kisah Mahabharata dan legenda lokal sebagai tuntunan hidup."
  },
  "garuda": {
    en: "The national emblem of Indonesia, Garuda Pancasila, features a mythical bird clutching a scroll inscribed with the motto 'Bhinneka Tunggal Ika' (Unity in Diversity). Adopted in 1950 and designed by Sultan Hamid II, the emblem holds a shield displaying five icons representing the Pancasila, the nation's core ideology.",
    id: "Lambang Negara Indonesia, Garuda Pancasila, menampilkan burung Garuda mitologis yang mencengkeram pita bertuliskan 'Bhinneka Tunggal Ika' (Berbeda-beda tapi tetap satu). Diresmikan pada tahun 1950 dan dirancang oleh Sultan Hamid II, lambang ini memuat perisai dengan simbol dasar ideologi Pancasila."
  }
};

async function run() {
  console.log("=========================================");
  console.log("STARTING ARTIFACT & CINEMA SCRAPER (.CJS)");
  console.log("=========================================\n");

  const finalArtifacts = [];
  const assetsDir = path.resolve(__dirname, "../public/assets/artifacts");
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // --- PART 1: Scrape Wikipedia for Artifacts ---
  for (const seed of artifactSeeds) {
    console.log(`Processing: [${seed.room}] ${seed.id}...`);

    let descEn = fallbackDescriptions[seed.id]?.en || `Explore the historical context of ${seed.nameEn}. Discover its origins and significance inside MuseumVerse Indonesia.`;
    let descId = fallbackDescriptions[seed.id]?.id || `Jelajahi konteks sejarah ${seed.nameId}. Temukan asal-usul dan signifikansinya di dalam MuseumVerse Indonesia.`;
    let downloadedImage = false;

    // Fetch EN Wikipedia
    const enWiki = await fetchWikipedia(seed.wikipediaEn, "en");
    if (enWiki) {
      if (enWiki.extract && enWiki.extract.trim().length > 30) {
        // Limit extract length to ~3-4 sentences
        const sentences = enWiki.extract.split(/(?<=\.)\s+/);
        descEn = sentences.slice(0, 4).join(" ");
      }
      // If textured, download the image
      if ((seed.shape === "texture" || seed.shape === "wall") && enWiki.imageUrl) {
        const imagePath = path.join(assetsDir, `${seed.id}.png`);
        // Download if file doesn't exist, or if it starts with SVG XML markers, or is too small
        let needsDownload = true;
        if (fs.existsSync(imagePath)) {
          const fileContent = fs.readFileSync(imagePath);
          const isSvg = fileContent.toString().trim().startsWith('<svg') || 
                        fileContent.toString().trim().startsWith('<?xml');
          if (!isSvg && fileContent.length > 5000) {
            console.log(`  Local valid image for ${seed.id}.png already exists.`);
            needsDownload = false;
            downloadedImage = true;
          }
        }
        if (needsDownload) {
          downloadedImage = await downloadImage(enWiki.imageUrl, imagePath);
        }
      }
    }

    // Fetch ID Wikipedia
    const idWiki = await fetchWikipedia(seed.wikipediaId, "id");
    if (idWiki && idWiki.extract && idWiki.extract.trim().length > 30) {
      const sentences = idWiki.extract.split(/(?<=\.)\s+/);
      descId = sentences.slice(0, 4).join(" ");
    }

    finalArtifacts.push({
      id: seed.id,
      room: seed.room,
      shape: seed.shape,
      color: seed.color,
      position: seed.position,
      name: { en: seed.nameEn, id: seed.nameId },
      origin: { en: seed.originEn, id: seed.originId },
      era: { en: seed.eraEn, id: seed.eraId },
      description: { en: descEn, id: descId },
    });
  }

  // --- PART 2: Scrape YouTube for Cinema Videos ---
  console.log("\nSearching YouTube for Cinema Documentaries...");
  const finalCinema = [];
  const addedYoutubeIds = new Set();

  for (const c of cinemaSeeds) {
    console.log(`  Searching for [${c.category}]: "${c.query}"...`);
    const results = await fetchYouTubeVideos(c.query);
    console.log(`    Found ${results.length} results.`);

    // Take top 5 relevant videos per category
    let count = 0;
    for (const v of results) {
      if (addedYoutubeIds.has(v.id)) continue;
      addedYoutubeIds.add(v.id);

      // Clean characters
      const cleanTitle = v.title.replace(/[|&;$%@"<>()+']/g, "").substring(0, 70);
      const cleanDesc = v.description.replace(/[|&;$%@"<>()+']/g, "").substring(0, 150) + "...";

      finalCinema.push({
        id: `${c.category}-${v.id}`,
        youtubeId: v.id,
        category: c.category,
        era: { en: c.eraEn, id: c.eraId },
        title: { en: cleanTitle, id: cleanTitle },
        year: { en: "Documentary", id: "Dokumenter" },
        synopsis: { en: cleanDesc, id: cleanDesc },
        narration: { en: `Watch this video: ${cleanTitle}`, id: `Tonton video ini: ${cleanTitle}` },
      });

      count++;
      if (count >= 5) break;
    }
  }

  // If YouTube yields no results, keep default baseline
  if (finalCinema.length === 0) {
    console.warn("WARNING: YouTube search yielded 0 results. Creating default mock records.");
    finalCinema.push(
      {
        id: "general-default-1",
        youtubeId: "iE389ahy7Mc",
        category: "general",
        era: { en: "General History", id: "Dokumenter Umum" },
        title: { en: "Origins of the Archipelago", id: "Asal Mula Nusantara" },
        year: { en: "Documentary", id: "Dokumenter" },
        synopsis: { en: "Prehistory of the Indonesian Islands.", id: "Prasejarah pulau-pulau Indonesia." },
        narration: { en: "Origins of the Archipelago.", id: "Asal Mula Nusantara." },
      },
      {
        id: "war-default-1",
        youtubeId: "qDFWzlYR0Lk",
        category: "war",
        era: { en: "Independence War", id: "Perang & Perjuangan" },
        title: { en: "The Spice Wars & Struggle", id: "Perang Rempah & Perjuangan" },
        year: { en: "Documentary", id: "Dokumenter" },
        synopsis: { en: "Three centuries of resistance.", id: "Tiga abad perlawanan Nusantara." },
        narration: { en: "The Spice Wars and Struggle.", id: "Perang Rempah dan Perjuangan." },
      }
    );
  }

  // --- PART 3: Write outputs to files ---
  console.log("\nGenerating src/data/artifacts.ts...");
  const artifactsFileContent = `export type RoomId = "ancient" | "kingdom" | "colonial" | "independence" | "modern" | "cinema" | "studio";

export interface TimelineMoment {
  year: string;
  titleEn: string;
  titleId: string;
  bodyEn: string;
  bodyId: string;
  room: RoomId;
}

export interface Artifact {
  id: string;
  room: RoomId;
  name: { en: string; id: string };
  era: { en: string; id: string };
  origin: { en: string; id: string };
  description: { en: string; id: string };
  color: string;
  shape: "bust" | "sword" | "scroll" | "flag" | "vase" | "tablet" | "crown" | "book" | "wall" | "texture";
  position: [number, number];
}

export const rooms: {
  id: RoomId;
  nameEn: string;
  nameId: string;
  accent: string;
  ambient: string;
  descEn: string;
  descId: string;
  objectivesEn: string[];
  objectivesId: string[];
}[] = [
  {
    id: "ancient",
    nameEn: "Ancient Indonesia Hall",
    nameId: "Ruang Indonesia Kuno",
    accent: "#a87a3d",
    ambient: "0.05 0.04 0.06",
    descEn: "Explore the prehistoric origins of early humans and ancient tools in the Indonesian archipelago.",
    descId: "Jelajahi asal-usul prasejarah manusia purba dan peralatan kuno di kepulauan Indonesia.",
    objectivesEn: [
      "Examine the Sangiran early human Java Man skull fossil",
      "Inspect the Pacitan Neolithic stone hand axe tool",
      "Discover the Megalithic Menhir standing stone from Sulawesi"
    ],
    objectivesId: [
      "Periksa fosil tengkorak manusia purba Sangiran (Manusia Jawa)",
      "Lihat alat kapak genggam batu Neolitik Pacitan",
      "Temukan batu berdiri Menhir Megalitik dari Sulawesi"
    ]
  },
  {
    id: "kingdom",
    nameEn: "Kingdom Era Hall",
    nameId: "Ruang Era Kerajaan",
    accent: "#c9a14a",
    ambient: "0.07 0.05 0.04",
    descEn: "Witness the golden age of Hindu-Buddhist maritime empires and Islamic sultanates across Nusantara.",
    descId: "Saksikan masa keemasan kerajaan maritim Hindu-Buddha dan Kesultanan Islam di Nusantara.",
    objectivesEn: [
      "Examine the sacred wavy-bladed Majapahit Royal Keris",
      "Read the stone Kedukan Bukit Inscription of Srivijaya",
      "Inspect the volcanic stone Ganesha Temple Statue",
      "View the gold gilded ceremonial Mataram Royal Crown"
    ],
    objectivesId: [
      "Periksa keris pusaka berlekuk peninggalan Majapahit",
      "Baca batu bersejarah Prasasti Kedukan Bukit dari Sriwijaya",
      "Lihat Arca Candi Ganesha dari batu vulkanik",
      "Saksikan Mahkota Emas seremonial Kerajaan Mataram"
    ]
  },
  {
    id: "colonial",
    nameEn: "Colonial History Hall",
    nameId: "Ruang Sejarah Kolonial",
    accent: "#7a8a9c",
    ambient: "0.05 0.05 0.06",
    descEn: "Understand the period of spice trade, European exploration, and the rise of local resistances.",
    descId: "Pahami masa perdagangan rempah, penjelajahan Eropa, dan bangkitnya perlawanan lokal.",
    objectivesEn: [
      "Examine the VOC Spice Trade Routes navigation map",
      "Inspect Prince Diponegoro's legendary Java War keris",
      "View historical albumen prints of the old harbor of Batavia"
    ],
    objectivesId: [
      "Periksa peta navigasi jalur perdagangan rempah-rempah VOC",
      "Lihat keris pusaka perang legendaris Pangeran Diponegoro",
      "Saksikan cetakan foto album kuno pelabuhan Batavia"
    ]
  },
  {
    id: "independence",
    nameEn: "Independence Hall",
    nameId: "Ruang Kemerdekaan",
    accent: "#c0392b",
    ambient: "0.07 0.04 0.04",
    descEn: "Relive the historic steps of the Indonesian struggle for sovereignty and national proclamation.",
    descId: "Ikuti langkah bersejarah perjuangan bangsa Indonesia merebut kedaulatan dan proklamasi nasional.",
    objectivesEn: [
      "Read the typed text of the Proclamation of Independence",
      "Examine the original Merah Putih flag sewn by Fatmawati",
      "Read historic speech logs of President Soekarno"
    ],
    objectivesId: [
      "Baca naskah ketikan teks Proklamasi Kemerdekaan RI",
      "Saksikan bendera pusaka merah-putih jepitan Fatmawati",
      "Baca kumpulan arsip pidato bersejarah Presiden Soekarno"
    ]
  },
  {
    id: "modern",
    nameEn: "Modern Indonesia Hall",
    nameId: "Ruang Indonesia Modern",
    accent: "#4aa3c9",
    ambient: "0.04 0.05 0.07",
    descEn: "Celebrate contemporary cultural heritage, national symbols, and modern technological integration.",
    descId: "Rayakan warisan budaya kontemporer, simbol negara, dan integrasi teknologi modern.",
    objectivesEn: [
      "View the gold-crowned miniature National Monument (Monas)",
      "Examine UNESCO-recognized wax-resist Batik cloth art",
      "Inspect the Palapa Satellite model that unified the islands"
    ],
    objectivesId: [
      "Saksikan miniatur Monumen Nasional (Monas) bermahkota emas",
      "Periksa kain kerajinan Batik warisan budaya UNESCO",
      "Lihat model Satelit Palapa pemersatu ribuan pulau"
    ]
  },
  {
    id: "cinema",
    nameEn: "Cinema Studio Hall",
    nameId: "Ruang Studio Bioskop",
    accent: "#e94560",
    ambient: "0.06 0.04 0.04",
    descEn: "Take a seat and watch beautifully produced audio-visual documentary films about the history and heritage of Indonesia.",
    descId: "Duduk dan tontonlah film dokumenter audio-visual yang mengisahkan sejarah dan warisan budaya Indonesia.",
    objectivesEn: [
      "Click the large cinema screen to open the theater player",
      "Select and watch historical documentary videos"
    ],
    objectivesId: [
      "Klik layar bioskop besar untuk membuka pemutar teater",
      "Pilih dan tonton video dokumenter sejarah Nusantara"
    ]
  },
  {
    id: "studio",
    nameEn: "Virtual Photo Studio",
    nameId: "Studio Foto Virtual",
    accent: "#9b5de5",
    ambient: "0.06 0.04 0.06",
    descEn: "Customize your profile and create a personalized Polaroid souvenir photograph of your journey inside the History Of Indonesia Virtual Museum.",
    descId: "Kustomisasi profil Anda dan buatlah foto suvenir Polaroid personal dari perjalanan Anda di History Of Indonesia Virtual Museum.",
    objectivesEn: [
      "Input your name and select from 4 traditional attire costumes",
      "Choose from 6 themed virtual background layouts",
      "Generate and download a free PNG Polaroid souvenir card"
    ],
    objectivesId: [
      "Masukkan nama Anda dan pilih dari 4 busana pakaian adat",
      "Pilih dari 6 desain latar belakang bertema",
      "Buat dan unduh kartu suvenir Polaroid gratis format PNG"
    ]
  }
];

export const artifacts: Artifact[] = ${JSON.stringify(finalArtifacts, null, 2)};

export const timeline: TimelineMoment[] = [
  {
    year: "1.5M BCE",
    titleEn: "Java Man",
    titleId: "Manusia Jawa",
    bodyEn: "Homo erectus walks the island of Java.",
    bodyId: "Homo erectus berjalan di Pulau Jawa.",
    room: "ancient",
  },
  {
    year: "682",
    titleEn: "Srivijaya Rises",
    titleId: "Sriwijaya Bangkit",
    bodyEn: "A Buddhist maritime empire controls the Strait of Malacca.",
    bodyId: "Kerajaan maritim Buddhis menguasai Selat Malaka.",
    room: "kingdom",
  },
  {
    year: "1293",
    titleEn: "Majapahit Founded",
    titleId: "Majapahit Berdiri",
    bodyEn: "The greatest Hindu-Buddhist empire of the archipelago begins.",
    bodyId: "Kekaisaran Hindu-Buddha terbesar Nusantara dimulai.",
    room: "kingdom",
  },
  {
    year: "1602",
    titleEn: "Arrival of the VOC",
    titleId: "Kedatangan VOC",
    bodyEn: "The Dutch East India Company begins three centuries of colonial trade.",
    bodyId: "VOC memulai tiga abad perdagangan kolonial.",
    room: "colonial",
  },
  {
    year: "1825",
    titleEn: "Java War",
    titleId: "Perang Jawa",
    bodyEn: "Prince Diponegoro leads a five-year rebellion against colonial rule.",
    bodyId: "Pangeran Diponegoro memimpin pemberontakan lima tahun.",
    room: "colonial",
  },
  {
    year: "1928",
    titleEn: "Youth Pledge",
    titleId: "Sumpah Pemuda",
    bodyEn: "One nation, one homeland, one language — Indonesia.",
    bodyId: "Satu bangsa, satu tanah air, satu bahasa — Indonesia.",
    room: "independence",
  },
  {
    year: "1945",
    titleEn: "Proclamation",
    titleId: "Proklamasi",
    bodyEn: "Independence is declared on the morning of 17 August.",
    bodyId: "Kemerdekaan diproklamasikan pagi 17 Agustus.",
    room: "independence",
  },
  {
    year: "1976",
    titleEn: "Palapa Satellite",
    titleId: "Satelit Palapa",
    bodyEn: "Indonesia unites its 17,000 islands by satellite.",
    bodyId: "Indonesia menyatukan 17.000 pulau melalui satelit.",
    room: "modern",
  },
  {
    year: "2009",
    titleEn: "Batik Heritage",
    titleId: "Warisan Batik",
    bodyEn: "UNESCO recognizes Batik as Intangible Cultural Heritage.",
    bodyId: "UNESCO mengakui Batik sebagai Warisan Budaya Takbenda.",
    room: "modern",
  },
];

export const quizQuestions = [
  {
    q: {
      en: "Which kingdom was one of the largest maritime powers of the archipelago?",
      id: "Kerajaan apakah yang menjadi salah satu kekuatan maritim terbesar Nusantara?",
    },
    options: [
      { en: "Srivijaya", id: "Sriwijaya" },
      { en: "Mataram", id: "Mataram" },
      { en: "Kutai", id: "Kutai" },
      { en: "Banten", id: "Banten" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "When was the Indonesian Independence proclaimed?",
      id: "Kapan kemerdekaan Indonesia diproklamasikan?",
    },
    options: [
      { en: "17 August 1945", id: "17 Agustus 1945" },
      { en: "28 October 1928", id: "28 Oktober 1928" },
      { en: "1 June 1945", id: "1 Juni 1945" },
      { en: "20 May 1908", id: "20 Mei 1908" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Which UNESCO-listed textile art uses wax-resist dyeing?",
      id: "Seni tekstil mana yang terdaftar di UNESCO dan menggunakan teknik canting lilin?",
    },
    options: [
      { en: "Songket", id: "Songket" },
      { en: "Batik", id: "Batik" },
      { en: "Ikat", id: "Ikat" },
      { en: "Tenun", id: "Tenun" },
    ],
    correct: 1,
  },
  {
    q: {
      en: "Where were the Homo erectus 'Java Man' fossils discovered?",
      id: "Di mana fosil Homo erectus 'Manusia Jawa' ditemukan?",
    },
    options: [
      { en: "Sangiran", id: "Sangiran" },
      { en: "Pacitan", id: "Pacitan" },
      { en: "Borobudur", id: "Borobudur" },
      { en: "Toraja", id: "Toraja" },
    ],
    correct: 0,
  },
  {
    q: {
      en: "Who led the Java War against colonial rule?",
      id: "Siapa yang memimpin Perang Jawa melawan penjajahan?",
    },
    options: [
      { en: "Prince Diponegoro", id: "Pangeran Diponegoro" },
      { en: "Sultan Agung", id: "Sultan Agung" },
      { en: "Cut Nyak Dhien", id: "Cut Nyak Dhien" },
      { en: "Imam Bonjol", id: "Imam Bonjol" },
    ],
    correct: 0,
  },
];

export const achievements = [
  {
    id: "ancient",
    titleEn: "Ancient Explorer",
    titleId: "Penjelajah Kuno",
    descEn: "Visited the Ancient Indonesia Hall.",
    descId: "Mengunjungi Ruang Indonesia Kuno.",
  },
  {
    id: "kingdom",
    titleEn: "Kingdom Historian",
    titleId: "Sejarawan Kerajaan",
    descEn: "Visited the Kingdom Era Hall.",
    descId: "Mengunjungi Ruang Era Kerajaan.",
  },
  {
    id: "colonial",
    titleEn: "Colonial Witness",
    titleId: "Saksi Kolonial",
    descEn: "Visited the Colonial History Hall.",
    descId: "Mengunjungi Ruang Sejarah Kolonial.",
  },
  {
    id: "independence",
    titleEn: "Independence Witness",
    titleId: "Saksi Kemerdekaan",
    descEn: "Visited the Independence Hall.",
    descId: "Mengunjungi Ruang Kemerdekaan.",
  },
  {
    id: "modern",
    titleEn: "Modern Citizen",
    titleId: "Warga Modern",
    descEn: "Visited the Modern Indonesia Hall.",
    descId: "Mengunjungi Ruang Indonesia Modern.",
  },
  {
    id: "cinema",
    titleEn: "Cinema Goer",
    titleId: "Penonton Bioskop",
    descEn: "Visited the Cinema Studio Hall.",
    descId: "Mengunjungi Ruang Studio Bioskop.",
  },
  {
    id: "quiz",
    titleEn: "Heritage Guardian",
    titleId: "Penjaga Warisan",
    descEn: "Completed the Heritage Quiz.",
    descId: "Menyelesaikan Kuis Warisan.",
  },
  {
    id: "master",
    titleEn: "Museum Master",
    titleId: "Maestro Museum",
    descEn: "Unlocked every other achievement.",
    descId: "Membuka semua pencapaian lain.",
  },
];
`;

  fs.writeFileSync(path.resolve(__dirname, "../src/data/artifacts.ts"), artifactsFileContent);
  console.log("Successfully wrote artifacts.ts");

  console.log("\nGenerating src/data/cinema.ts...");
  const cinemaFileContent = `export type CinemaEra = {
  id: string;
  youtubeId: string;
  category: string;
  era: { en: string; id: string };
  title: { en: string; id: string };
  synopsis: { en: string; id: string };
  narration: { en: string; id: string };
  year: { en: string; id: string };
};

export const cinemaEras: CinemaEra[] = ${JSON.stringify(finalCinema, null, 2)};
`;

  fs.writeFileSync(path.resolve(__dirname, "../src/data/cinema.ts"), cinemaFileContent);
  console.log("Successfully wrote cinema.ts");

  // --- PART 4: Write outputs to CSV ---
  console.log("\nGenerating CSV files...");

  function escapeCSV(val) {
    if (val === null || val === undefined) return '';
    let str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    str = str.replace(/"/g, '""');
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str}"`;
    }
    return str;
  }

  // Artifacts CSV
  const artifactHeaders = [
    "id", "room", "shape", "color", "position_x", "position_z",
    "name_en", "name_id", "origin_en", "origin_id", "era_en", "era_id",
    "description_en", "description_id"
  ];
  let artifactCsvContent = artifactHeaders.join(",") + "\n";
  for (const a of finalArtifacts) {
    const row = [
      a.id, a.room, a.shape, a.color, a.position[0], a.position[1],
      a.name.en, a.name.id, a.origin.en, a.origin.id, a.era.en, a.era.id,
      a.description.en, a.description.id
    ];
    artifactCsvContent += row.map(escapeCSV).join(",") + "\n";
  }
  fs.writeFileSync(path.resolve(__dirname, "../scraped_artifacts.csv"), artifactCsvContent);
  console.log("Successfully wrote scraped_artifacts.csv");

  // Cinema CSV
  const cinemaHeaders = [
    "id", "youtubeId", "category", "era_en", "era_id",
    "title_en", "title_id", "year_en", "year_id", "synopsis_en", "synopsis_id"
  ];
  let cinemaCsvContent = cinemaHeaders.join(",") + "\n";
  for (const c of finalCinema) {
    const row = [
      c.id, c.youtubeId, c.category, c.era.en, c.era.id,
      c.title.en, c.title.id, c.year.en, c.year.id, c.synopsis.en, c.synopsis.id
    ];
    cinemaCsvContent += row.map(escapeCSV).join(",") + "\n";
  }
  fs.writeFileSync(path.resolve(__dirname, "../scraped_cinema.csv"), cinemaCsvContent);
  console.log("Successfully wrote scraped_cinema.csv");

  console.log("\n=========================================");
  console.log("SCRAPING AND WRITE COMPLETIONS SUCCESSFUL");
  console.log("=========================================");
}

run().catch((err) => {
  console.error("FATAL ERROR IN RUN:", err);
});
