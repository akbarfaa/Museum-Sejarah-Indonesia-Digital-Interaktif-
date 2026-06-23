const fs = require('fs');
const path = require('path');

const scrapeFile = fs.readFileSync(path.join(__dirname, '../scripts/scrape.cjs'), 'utf-8');

// Parse fallbackDescriptions from scrape.cjs manually
const fallbackMatch = scrapeFile.match(/const fallbackDescriptions = ({[\s\S]+?});/);
if (!fallbackMatch) {
  console.error("Could not find fallbackDescriptions in scrape.cjs");
  process.exit(1);
}

const fallbackDescriptions = Function('return ' + fallbackMatch[1])();

// Read generated artifacts.ts
const artifactsFile = fs.readFileSync(path.join(__dirname, '../src/data/artifacts.ts'), 'utf-8');

// Find start of artifacts array and start of timeline array
const startKeyword = 'export const artifacts: Artifact[] = ';
const endKeyword = 'export const timeline: TimelineMoment[] = ';

const startIndex = artifactsFile.indexOf(startKeyword);
const endIndex = artifactsFile.indexOf(endKeyword);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find start or end keyword in artifacts.ts");
  process.exit(1);
}

// Slice out the array text
let arrayText = artifactsFile.slice(startIndex + startKeyword.length, endIndex).trim();
if (arrayText.endsWith(';')) {
  arrayText = arrayText.slice(0, -1).trim();
}

const artifacts = JSON.parse(arrayText);

console.log(`Analyzing ${artifacts.length} artifacts in artifacts.ts:\n`);
let fromWiki = 0;
let fromFallback = 0;

artifacts.forEach(a => {
  const fb = fallbackDescriptions[a.id];
  const isFallbackEn = fb && a.description.en.trim() === fb.en.trim();
  const isFallbackId = fb && a.description.id.trim() === fb.id.trim();
  
  if (isFallbackEn && isFallbackId) {
    console.log(`- [Fallback/Curated] ${a.id}: "${a.name.en}"`);
    fromFallback++;
  } else {
    console.log(`- [Wikipedia Scraped] ${a.id}: "${a.name.en}"`);
    console.log(`  EN: "${a.description.en.slice(0, 80)}..."`);
    console.log(`  ID: "${a.description.id.slice(0, 80)}..."`);
    fromWiki++;
  }
});

console.log(`\nSummary:`);
console.log(`- From Wikipedia Scraped: ${fromWiki}`);
console.log(`- From Fallback/Curated: ${fromFallback}`);
