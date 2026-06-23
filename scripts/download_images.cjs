const fs = require("fs");
const path = require("path");

// Wikipedia title overrides for key artifacts to ensure 100% accuracy
const WIKIPEDIA_OVERRIDES = {
  "meganthropus": "Meganthropus",
  "homo-erectus": "Java Man",
  "homo-soloensis": "Solo Man",
  "homo-floresiensis": "Homo floresiensis",
  "homo-wajakensis": "Wajak Man",
  "sangiran-site": "Sangiran",
  "stone-axe": "Hand axe",
  "neolithic-axe": "Beliung persegi",
  "nekara-pejeng": "Moon of Pejeng",
  "cave-painting-sulawesi": "Cave paintings of Maros-Pangkep",
  "cave-painting-kalimantan": "Lubang Jeriji Saléh",
  "moko-alor": "Moko (drum)",
  "megalith": "Megalith",
  "nias-megalith": "Fahombo",
  "gunung-padang": "Gunung Padang Megalithic Site",
  "waruga-minahasa": "Waruga",
  "austronesian-map": "Austronesian expansion",
  "outrigger-canoe": "Outrigger canoe",
  "yupa-kutai": "Yupa",
  "ciaruteun-taruma": "Ciaruteun inscription",
  "kalingga-shima": "Kalingga Kingdom",
  "canggal-inscription": "Canggal inscription",
  "galuh-kingdom": "Galuh Kingdom",
  "inscription": "Kedukan Bukit inscription",
  "muaro-jambi": "Muaro Jambi Temple Complex",
  "chola-raid": "Chola invasion of Srivijaya",
  "borobudur": "Borobudur",
  "prambanan": "Prambanan",
  "dieng-temple": "Dieng temples",
  "ganesha": "Ganesha",
  "kediri-bharatayudha": "Kakawin Bharatayuddha",
  "ken-dedes": "Prajnaparamita of Java",
  "keris": "Kris",
  "negarakertagama": "Nagarakretagama",
  "gajah-mada": "Gajah Mada",
  "sutasoma": "Kakawin Sutasoma",
  "crown": "Mataram Sultanate",
  "samudera-pasai": "Samudera Pasai Sultanate",
  "demak-mosque": "Demak Great Mosque",
  "aceh-iskandar-muda": "Iskandar Muda",
  "ternate-baabullah": "Babullah of Ternate",
  "banten-sultanate": "Banten Sultanate",
  "gowa-tallo": "Sultanate of Gowa",
  "banjar-sultanate": "Sultanate of Banjar",
  "cirebon-sultanate": "Sultanate of Cirebon",
  "pajajaran-siliwangi": "Sunda Kingdom",
  "voc-map": "Dutch East India Company",
  "diponegoro-kris": "Diponegoro",
  "old-photo": "Batavia, Dutch East Indies",
  "hasanuddin-helmet": "Hasanuddin of Gowa",
  "banda-spices": "Banda Islands",
  "proklamasi": "Proclamation of Indonesian Independence",
  "merah-putih": "Flag of Indonesia",
  "soekarno-speech": "Sukarno",
  "surabaya-spear": "Battle of Surabaya",
  "bung-tomo-radio": "Sutomo (military leader)",
  "monas": "National Monument (Indonesia)",
  "batik": "Batik",
  "satellite": "Palapa",
  "angklung": "Angklung",
  "wayang": "Wayang",
  "garuda": "National emblem of Indonesia",
};

// Parse artifactsData from TypeScript
const srcPath = path.resolve(__dirname, "../src/data/artifacts-data.ts");
let content = fs.readFileSync(srcPath, "utf8");

// Strip TypeScript annotations to parse as JS
content = content.replace(/import type \{[^}]+\} from "[^"]+";/g, "");
content = content.replace(/export const artifactsData:\s*Artifact\[\]\s*=\s*/g, "module.exports = ");

const tempPath = path.resolve(__dirname, "./temp-artifacts.cjs");
fs.writeFileSync(tempPath, content);

const artifacts = require(tempPath);
fs.unlinkSync(tempPath); // Clean up immediately

const assetsDir = path.resolve(__dirname, "../public/assets/artifacts");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Helper: Fetch image URL from Wikipedia article title
async function getWikiImage(title, lang = "en") {
  const endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail|original&pithumbsize=1000&redirects=1&titles=${encodeURIComponent(title)}`;
  try {
    const res = await fetch(endpoint, {
      headers: {
        "User-Agent": "MuseumVerseIndonesiaScraper/1.0 (contact: info@museumverse.id)"
      }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.query || !json.query.pages) return null;
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === "-1") return null;
    return pages[pageId].thumbnail?.source || pages[pageId].original?.source || null;
  } catch (err) {
    console.error(`  [${lang}] Error fetching image for "${title}":`, err.message);
    return null;
  }
}

// Helper: Search Wikipedia for a query and return top article title
async function searchWiki(query, lang = "en") {
  const endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=1`;
  try {
    const res = await fetch(endpoint, {
      headers: {
        "User-Agent": "MuseumVerseIndonesiaScraper/1.0 (contact: info@museumverse.id)"
      }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.query || !json.query.search || json.query.search.length === 0) return null;
    return json.query.search[0].title;
  } catch (err) {
    console.error(`  [${lang}] Search error for "${query}":`, err.message);
    return null;
  }
}

// Helper: Download image and save as PNG
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MuseumVerseIndonesiaScraper/1.0 (contact: info@museumverse.id)"
      }
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (err) {
    console.error(`  Failed download: ${url} -> ${err.message}`);
    return false;
  }
}

async function run() {
  console.log("=========================================");
  console.log("STARTING ARTIFACT IMAGE SCRAPER (.cjs)");
  console.log(`Total artifacts to process: ${artifacts.length}`);
  console.log("=========================================\n");

  let downloadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const art of artifacts) {
    const imagePath = path.join(assetsDir, `${art.id}.png`);
    
    // Check if valid local file already exists
    if (fs.existsSync(imagePath)) {
      const stat = fs.statSync(imagePath);
      if (stat.size > 2000) {
        console.log(`[SKIPPED] ${art.id} - Local image already exists (${(stat.size/1024).toFixed(1)} KB)`);
        skippedCount++;
        continue;
      }
    }

    console.log(`[PROCESSING] ${art.id} ("${art.name.en}")...`);
    
    // 1. Determine wiki article title
    let wikiTitle = WIKIPEDIA_OVERRIDES[art.id];
    let lang = "en";
    
    if (!wikiTitle) {
      // Clean query: remove parentheses contents
      const cleanName = art.name.en.replace(/\([^)]+\)/g, "").trim();
      wikiTitle = await searchWiki(cleanName, "en");
      if (!wikiTitle) {
        const cleanNameId = art.name.id.replace(/\([^)]+\)/g, "").trim();
        wikiTitle = await searchWiki(cleanNameId, "id");
        lang = "id";
      }
    }

    if (!wikiTitle) {
      console.warn(`  [WARNING] No wikipedia article found for: ${art.name.en}`);
      failedCount++;
      continue;
    }

    console.log(`  Wiki article: "${wikiTitle}" (${lang})`);

    // 2. Fetch image url
    let imageUrl = await getWikiImage(wikiTitle, lang);
    if (!imageUrl && lang === "en") {
      // Try ID wiki search as fallback
      const wikiTitleId = WIKIPEDIA_OVERRIDES[art.id] || await searchWiki(art.name.id.replace(/\([^)]+\)/g, "").trim(), "id");
      if (wikiTitleId) {
        imageUrl = await getWikiImage(wikiTitleId, "id");
        if (imageUrl) {
          lang = "id";
          wikiTitle = wikiTitleId;
        }
      }
    }

    if (!imageUrl) {
      console.warn(`  [WARNING] No image found on Wikipedia for "${wikiTitle}"`);
      failedCount++;
      continue;
    }

    console.log(`  Downloading image from: ${imageUrl}`);
    
    // 3. Download image
    const success = await downloadImage(imageUrl, imagePath);
    if (success) {
      console.log(`  [SUCCESS] Saved to ${art.id}.png`);
      downloadedCount++;
    } else {
      failedCount++;
    }

    // Wait a brief moment to respect Wikipedia API rate limits
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log("\n=========================================");
  console.log("UPDATE VALID_IMAGE_IDS REGISTRY");
  console.log("=========================================");

  // Read all files in public/assets/artifacts
  const files = fs.readdirSync(assetsDir);
  const validIds = files
    .filter(file => file.endsWith(".png"))
    .map(file => path.basename(file, ".png"))
    .sort();

  console.log(`Found ${validIds.length} valid local artifact images.`);

  // Update SceneUtils.ts
  const sceneUtilsPath = path.resolve(__dirname, "../src/components/museum/scene/SceneUtils.ts");
  if (fs.existsSync(sceneUtilsPath)) {
    let sceneUtilsContent = fs.readFileSync(sceneUtilsPath, "utf8");
    
    // Find and replace VALID_IMAGE_IDS array
    const regex = /export\s+const\s+VALID_IMAGE_IDS\s*=\s*\[[^\]]*\];/g;
    
    const formattedArray = `export const VALID_IMAGE_IDS = [\n  ${validIds.map(id => `"${id}"`).join(",\n  ")}\n];`;
    
    if (regex.test(sceneUtilsContent)) {
      sceneUtilsContent = sceneUtilsContent.replace(regex, formattedArray);
      fs.writeFileSync(sceneUtilsPath, sceneUtilsContent, "utf8");
      console.log(`Successfully updated VALID_IMAGE_IDS in ${path.basename(sceneUtilsPath)}!`);
    } else {
      console.error("ERROR: Could not find VALID_IMAGE_IDS array declaration in SceneUtils.ts!");
    }
  } else {
    console.error(`ERROR: SceneUtils.ts not found at ${sceneUtilsPath}`);
  }

  console.log("\n=========================================");
  console.log("SCRAPING COMPLETED");
  console.log(`Downloaded: ${downloadedCount} | Skipped: ${skippedCount} | Failed: ${failedCount}`);
  console.log(`Total Valid Images Registered: ${validIds.length}`);
  console.log("=========================================\n");
}

run();
