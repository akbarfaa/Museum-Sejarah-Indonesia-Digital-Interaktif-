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
    wikipediaEn: "Pacitanian",
    wikipediaId: "Kebudayaan Pacitan",
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
    wikipediaEn: "Megalith",
    wikipediaId: "Megalitikum",
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
    shape: "texture",
    color: "#7c5c3c",
    position: [6, 4],
    wikipediaEn: "Sangiran",
    wikipediaId: "Sangiran",
    nameEn: "Sangiran Early Human Fossil",
    nameId: "Fosil Manusia Purba Sangiran",
    originEn: "Sangiran Dome, Central Java",
    originId: "Kubah Sangiran, Jawa Tengah",
    eraEn: "Pleistocene Epoch",
    eraId: "Kala Pleistosen",
  },
  {
    id: "nias-megalith",
    room: "ancient",
    shape: "texture",
    color: "#8a8275",
    position: [-6, 0],
    wikipediaEn: "Nias",
    wikipediaId: "Nias",
    nameEn: "Nias Stone Pillar",
    nameId: "Lompat Batu Nias & Megalit",
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
    shape: "texture",
    color: "#706a58",
    position: [-6, 0],
    wikipediaEn: "Borobudur",
    wikipediaId: "Candi Borobudur",
    nameEn: "Borobudur Stone Relief",
    nameId: "Relief Candi Borobudur",
    originEn: "Magelang, Central Java",
    originId: "Magelang, Jawa Tengah",
    eraEn: "9th Century",
    eraId: "Abad ke-9",
  },
  {
    id: "prambanan",
    room: "kingdom",
    shape: "texture",
    color: "#7e786b",
    position: [6, 0],
    wikipediaEn: "Prambanan",
    wikipediaId: "Candi Prambanan",
    nameEn: "Prambanan Temple Carving",
    nameId: "Ukiran Candi Prambanan",
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
    wikipediaId: "Kongsi Dagang Hindia Timur Belanda",
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
    wikipediaId: "Sutomo (tokoh militer)",
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
    const response = await fetch(url);
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

async function run() {
  console.log("=========================================");
  console.log("STARTING ARTIFACT & CINEMA SCRAPER");
  console.log("=========================================\n");

  const finalArtifacts = [];
  const assetsDir = path.resolve(__dirname, "../public/assets/artifacts");
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // --- PART 1: Scrape Wikipedia for Artifacts ---
  for (const seed of artifactSeeds) {
    console.log(`Processing: [${seed.room}] ${seed.id}...`);

    let descEn = `Explore the historical context of ${seed.nameEn}. Discover its origins and significance inside MuseumVerse Indonesia.`;
    let descId = `Jelajahi konteks sejarah ${seed.nameId}. Temukan asal-usul dan signifikansinya di dalam MuseumVerse Indonesia.`;
    let downloadedImage = false;

    // Fetch EN Wikipedia
    const enWiki = await fetchWikipedia(seed.wikipediaEn, "en");
    if (enWiki) {
      if (enWiki.extract) {
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
    if (idWiki && idWiki.extract) {
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

      // Clean title and synopsis
      const cleanTitle = v.title.replace(/[|&;$%@"<>()+,]/g, "").substring(0, 70);
      const cleanDesc = v.description.replace(/[|&;$%@"<>()+,]/g, "").substring(0, 150) + "...";

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

  // If YouTube yields no results (e.g. rate limit), keep the default baseline
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
    descEn: "Customize your profile and create a personalized Polaroid souvenir photograph of your journey inside MuseumVerse Indonesia.",
    descId: "Kustomisasi profil Anda dan buatlah foto suvenir Polaroid personal dari perjalanan Anda di MuseumVerse Indonesia.",
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

  console.log("\n=========================================");
  console.log("SCRAPING AND WRITE COMPLETIONS SUCCESSFUL");
  console.log("=========================================");
}

run().catch((err) => {
  console.error("FATAL ERROR IN RUN:", err);
});
