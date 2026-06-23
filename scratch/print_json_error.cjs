const fs = require('fs');
const path = require('path');

const artifactsFile = fs.readFileSync(path.join(__dirname, '../src/data/artifacts.ts'), 'utf-8');
const artifactsMatch = artifactsFile.match(/export const artifacts: Artifact\[] = (\[[\s\S]+?\]);/m);

const jsonText = artifactsMatch[1]
  .replace(/[\u200B-\u200D\uFEFF]/g, '')
  .replace(/\/\/.*/g, '');

const pos = 18488;
const start = Math.max(0, pos - 150);
const end = Math.min(jsonText.length, pos + 150);

console.log("Characters around position 18488:");
console.log("================================");
console.log(jsonText.slice(start, end));
console.log("================================");
console.log("Specific character at 18488:", JSON.stringify(jsonText[pos]));
console.log("Code at pos:", jsonText.charCodeAt(pos));
