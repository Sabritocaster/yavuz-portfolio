const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const posterDir = path.join(__dirname, '../public/images/Poster');
const publicDir = path.join(__dirname, '../public');

const posters = [
  {
    src: 'Family_Poster.png',
    dest: 'Family_Poster.jpg',
    publicDest: 'Family.jpg',
  },
  {
    src: 'Together_Poster.png',
    dest: 'Together_Poster.jpg',
    publicDest: 'Together.jpg',
  },
  {
    src: 'Syzmon_Poster.png',
    dest: 'Szymon_Poster.jpg',
    publicDest: 'Szymon.jpg',
  },
];

async function optimizePosters() {
  for (const item of posters) {
    const inputPath = path.join(posterDir, item.src);
    const outputPath = path.join(posterDir, item.dest);
    const publicOutputPath = path.join(publicDir, item.publicDest);

    if (!fs.existsSync(inputPath)) {
      console.log(`Source file not found: ${inputPath}`);
      continue;
    }

    const origStat = fs.statSync(inputPath);
    console.log(`Optimizing ${item.src} (${(origStat.size / 1024 / 1024).toFixed(2)} MB)...`);

    // Max 2000px from one side, JPEG format, quality 85, progressive
    const pipeline = sharp(inputPath)
      .resize({
        width: 2000,
        height: 2000,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .flatten({ background: '#ffffff' })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true,
      });

    await pipeline.toFile(outputPath);
    const newStat = fs.statSync(outputPath);
    const meta = await sharp(outputPath).metadata();
    console.log(`Saved ${item.dest}: ${meta.width}x${meta.height}, ${(newStat.size / 1024).toFixed(1)} KB (-${((1 - newStat.size / origStat.size) * 100).toFixed(1)}%)`);

    // Also copy / save to publicDir for fallback
    fs.copyFileSync(outputPath, publicOutputPath);

    // Remove the raw PNG
    fs.unlinkSync(inputPath);
    console.log(`Removed raw ${item.src}`);
  }
}

optimizePosters().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
