const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../src/data/artifacts.ts");
const content = fs.readFileSync(filePath, "utf-8");

// Extract the artifacts array block
const startIdx = content.indexOf("export const artifacts: Artifact[] = [");
const endIdx = content.indexOf("export const timeline: TimelineMoment[] = [");
if (startIdx !== -1 && endIdx !== -1) {
  const arrayBlock = content.substring(startIdx, endIdx);
  const ids = [];
  const matches = arrayBlock.matchAll(/"id":\s*"([^"]+)"/g);
  for (const m of matches) {
    ids.push(m[1]);
  }
  console.log("Total artifacts found:", ids.length);
  console.log("IDs:", ids.join(", "));
} else {
  console.log("Could not find artifacts array block");
}
