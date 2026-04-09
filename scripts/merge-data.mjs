import fs from 'fs';
import path from 'path';

const SCRAPED_FILE = 'scripts/scraped_products.json';
const PRODUCTS_TS = 'src/data/products.ts';

const scrapedProducts = JSON.parse(fs.readFileSync(SCRAPED_FILE, 'utf8'));
let currentTsContent = fs.readFileSync(PRODUCTS_TS, 'utf8');

// Function to map scraped categories to existing slugs
function mapCategory(scraped) {
  const s = scraped.toLowerCase();
  if (s.includes('whey') || s.includes('protéine')) return 'whey-proteine';
  if (s.includes('creatine') || s.includes('créatine')) return 'creatine';
  if (s.includes('vitamin')) return 'multivitamines';
  if (s.includes('gainer')) return 'gainers';
  if (s.includes('amino') || s.includes('bcaa')) return 'acides-amines';
  if (s.includes('eaa')) return 'eaa';
  if (s.includes('pre-workout') || s.includes('entraînement')) return 'pre-workout';
  if (s.includes('accessoire') || s.includes('shaker')) return 'accessoires';
  if (s.includes('pack') || s.includes('promo')) return 'packs';
  return 'supplements';
}

// Prepare products for injection
const newProducts = scrapedProducts.map(p => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  brand: p.brand,
  price: p.price,
  oldPrice: p.oldPrice,
  category: mapCategory(p.category),
  image: p.image,
  description: p.description,
  benefits: p.benefits,
  specs: p.specs
}));

// Find the end of the current array
const arrayEndIndex = currentTsContent.lastIndexOf('];');

if (arrayEndIndex === -1) {
  console.error("Could not find the end of defaultProducts array in TS file.");
  process.exit(1);
}

// Construct the new content string
const formattedNewProducts = newProducts.map(p => `  {
    id: "${p.id}",
    name: "${p.name.replace(/"/g, '\\"')}",
    slug: "${p.slug}",
    brand: "${p.brand}",
    price: ${p.price},
    ${p.oldPrice ? `oldPrice: ${p.oldPrice},` : ''}
    category: "${p.category}",
    image: "${p.image}",
    description: "${p.description.replace(/"/g, '\\"').replace(/\n/g, ' ')}",
    benefits: ${JSON.stringify(p.benefits)},
    specs: ${JSON.stringify(p.specs)}
  }`).join(',\n');

const updatedTsContent = 
  currentTsContent.slice(0, arrayEndIndex - 1) + 
  ',\n\n  // --- SCRAPED PRODUCTS ---\n' + 
  formattedNewProducts + 
  '\n' + 
  currentTsContent.slice(arrayEndIndex);

fs.writeFileSync(PRODUCTS_TS, updatedTsContent);

console.log(`--- SUCCESS ---`);
console.log(`Injected ${newProducts.length} products into ${PRODUCTS_TS}`);
