const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../src/data/artifacts.ts");
const content = fs.readFileSync(filePath, "utf-8");

// Extract the artifacts array
const match = content.match(/export const artifacts: Artifact\[\] = (\[[\s\S]+?\]);/);
if (match) {
  const artifacts = JSON.parse(match[1]);
  console.log("Total artifacts in src/data/artifacts.ts:", artifacts.length);
  const rooms = {};
  artifacts.forEach(a => {
    if (!rooms[a.room]) rooms[a.room] = [];
    rooms[a.room].push({ id: a.id, shape: a.shape });
  });

  for (const [room, list] of Object.entries(rooms)) {
    console.log(`Room: ${room} (${list.length} items)`);
    list.forEach(item => {
      console.log(`  - ${item.id}: ${item.shape}`);
    });
  }
} else {
  console.log("Could not parse artifacts from src/data/artifacts.ts");
}
