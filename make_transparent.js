const { Jimp } = require('./backend/node_modules/jimp');
const path = require('path');
const fs = require('fs');

async function processImage() {
  const inputPath = 'C:\\Users\\ACER\\.gemini\\antigravity\\brain\\41db8aa4-cae4-47bf-a631-e55aaf9135ac\\hero_athlete_transparent_1794198458964.jpg';
  const outPath1 = path.join(__dirname, 'frontend/src/assets/hero-athlete-transparent.png');
  const outPath2 = path.join(__dirname, 'frontend/public/hero-athlete-transparent.png');

  console.log('Reading image:', inputPath);
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  console.log(`Dimensions: ${width}x${height}`);

  // BFS Flood Fill from edges to remove only the background
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBackground(idx) {
    const r = image.bitmap.data[idx];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];
    // Background is near white/light grey
    return r > 215 && g > 215 && b > 215;
  }

  // Push all border pixels to queue
  for (let x = 0; x < width; x++) {
    const topIdx = (0 * width + x) * 4;
    const botIdx = ((height - 1) * width + x) * 4;
    if (isBackground(topIdx)) { queue.push([x, 0]); visited[0 * width + x] = 1; }
    if (isBackground(botIdx)) { queue.push([x, height - 1]); visited[(height - 1) * width + x] = 1; }
  }

  for (let y = 0; y < height; y++) {
    const leftIdx = (y * width + 0) * 4;
    const rightIdx = (y * width + (width - 1)) * 4;
    if (isBackground(leftIdx) && !visited[y * width + 0]) { queue.push([0, y]); visited[y * width + 0] = 1; }
    if (isBackground(rightIdx) && !visited[y * width + (width - 1)]) { queue.push([width - 1, y]); visited[y * width + (width - 1)] = 1; }
  }

  const dx = [1, -1, 0, 0, 1, 1, -1, -1];
  const dy = [0, 0, 1, -1, 1, -1, 1, -1];

  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const pIdx = (cy * width + cx) * 4;

    // Set alpha to 0 for background
    image.bitmap.data[pIdx + 3] = 0;

    for (let i = 0; i < 8; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIndex = ny * width + nx;
        if (!visited[nIndex]) {
          visited[nIndex] = 1;
          const neighborIdx = nIndex * 4;
          if (isBackground(neighborIdx)) {
            queue.push([nx, ny]);
          } else {
            // Edge smoothing: soften boundary pixels
            const r = image.bitmap.data[neighborIdx];
            const g = image.bitmap.data[neighborIdx + 1];
            const b = image.bitmap.data[neighborIdx + 2];
            const brightness = (r + g + b) / 3;
            if (brightness > 200) {
              const alpha = Math.max(0, Math.min(255, Math.floor((255 - brightness) * 4)));
              image.bitmap.data[neighborIdx + 3] = alpha;
            }
          }
        }
      }
    }
  }

  console.log(`Flood fill completed. Background pixels removed: ${head}`);

  await image.write(outPath1);
  console.log('Saved to:', outPath1);

  await image.write(outPath2);
  console.log('Saved to:', outPath2);

  console.log('Done!');
}

processImage().catch(console.error);
