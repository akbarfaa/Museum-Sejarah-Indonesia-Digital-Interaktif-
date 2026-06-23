const fs = require('fs');
const path = require('path');

const artifactsFile = fs.readFileSync(path.join(__dirname, '../src/data/artifacts.ts'), 'utf-8');
const artifactsMatch = artifactsFile.match(/export const artifacts: Artifact\[] = (\[[\s\S]+?\]);/m);

if (!artifactsMatch) {
  console.log("No match found for artifacts array!");
} else {
  const matchStr = artifactsMatch[1];
  console.log("Match length:", matchStr.length);
  console.log("Match ends with:", JSON.stringify(matchStr.slice(-100)));
}
