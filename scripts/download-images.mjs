import fs from 'fs';
import path from 'path';
import axios from 'axios';

const products = JSON.parse(fs.readFileSync('scripts/scraped_products.json', 'utf8'));
const IMAGE_DIR = path.join(process.cwd(), 'public/images/products');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadImage(url, filename) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const writer = fs.createWriteStream(path.join(IMAGE_DIR, filename));
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`   ✗ Error downloading ${url}:`, error.message);
    return null;
  }
}

async function startDownloads() {
  console.log(`--- Starting download of ${products.length} images ---`);
  
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (p.image) {
      const ext = path.extname(new URL(p.image).pathname) || '.webp';
      const filename = `${p.slug}${ext}`;
      
      process.stdout.write(`[${i + 1}/${products.length}] Downloading image for: ${p.name.substring(0, 30)}... `);
      
      await downloadImage(p.image, filename);
      p.image = `/images/products/${filename}`;
      
      process.stdout.write(`✓ Done\n`);
      await sleep(200); // quick delay
    }
  }

  // Update JSON with local paths
  fs.writeFileSync('scripts/scraped_products.json', JSON.stringify(products, null, 2));
  console.log('\n--- ALL IMAGES DOWNLOADED AND PATHS UPDATED ---');
}

startDownloads();
