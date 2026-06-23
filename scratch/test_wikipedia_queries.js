const titles = [
  { id: "stone-axe", en: "Hand axe", idLang: "Kapak genggam" },
  { id: "sangiran-site", en: "Sangiran", idLang: "Sangiran" },
  { id: "nias-megalith", en: "Nias people", idLang: "Lompat batu Nias" },
  { id: "voc-map", en: "Dutch East India Company", idLang: "Vereenigde Oostindische Compagnie" },
  { id: "bung-tomo-radio", en: "Sutomo", idLang: "Sutomo" }
];

async function testQueries() {
  for (const t of titles) {
    console.log(`\n=== Testing for ${t.id} ===`);
    // EN
    const urlEn = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=original&redirects=1&titles=${encodeURIComponent(t.en)}`;
    try {
      const res = await fetch(urlEn, { headers: { "User-Agent": "Mozilla/5.0" } });
      const json = await res.json();
      const pageId = Object.keys(json.query.pages)[0];
      const page = json.query.pages[pageId];
      if (pageId === "-1") {
        console.log(`  EN: NOT FOUND ("${t.en}")`);
      } else {
        console.log(`  EN Extract length: ${page.extract ? page.extract.length : "NO EXTRACT"}`);
        console.log(`  EN Extract snippet: ${page.extract ? page.extract.substring(0, 150) : ""}`);
      }
    } catch (e) {
      console.log(`  EN Error: ${e.message}`);
    }

    // ID
    const urlId = `https://id.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=original&redirects=1&titles=${encodeURIComponent(t.idLang)}`;
    try {
      const res = await fetch(urlId, { headers: { "User-Agent": "Mozilla/5.0" } });
      const json = await res.json();
      const pageId = Object.keys(json.query.pages)[0];
      const page = json.query.pages[pageId];
      if (pageId === "-1") {
        console.log(`  ID: NOT FOUND ("${t.idLang}")`);
      } else {
        console.log(`  ID Extract length: ${page.extract ? page.extract.length : "NO EXTRACT"}`);
        console.log(`  ID Extract snippet: ${page.extract ? page.extract.substring(0, 150) : ""}`);
      }
    } catch (e) {
      console.log(`  ID Error: ${e.message}`);
    }
  }
}

testQueries();
