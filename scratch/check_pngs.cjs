const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/assets/artifacts');
const files = fs.readdirSync(dir);

console.log("Checking artifact image files:");
files.forEach(file => {
  const filePath = path.join(dir, file);
  const buffer = fs.readFileSync(filePath);
  
  // PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
  const isPng = buffer.length >= 8 &&
                buffer[0] === 0x89 &&
                buffer[1] === 0x50 &&
                buffer[2] === 0x4E &&
                buffer[3] === 0x47 &&
                buffer[4] === 0x0D &&
                buffer[5] === 0x0A &&
                buffer[6] === 0x1A &&
                buffer[7] === 0x0A;
                
  const preview = buffer.slice(0, 100).toString('utf-8').replace(/[\r\n]+/g, ' ');
  console.log(`- ${file}: Size = ${buffer.length} bytes, IsPNG = ${isPng}, Preview = "${preview.slice(0, 80)}"`);
});
