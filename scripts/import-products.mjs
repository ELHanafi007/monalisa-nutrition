import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://maghrebnutrition.ma/boutique/';
const DELAY = 800; // slightly faster delay

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getProductLinks() {
  console.log('--- Phase 1: Collecting Product Links ---');
  let links = [];
  try {
    const response = await axios.get(BASE_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    });
    const $ = cheerio.load(response.data);
    
    $('.product a.woocommerce-LoopProduct-link').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(href);
    });

    console.log(`Found ${links.length} products to process.`);
    return links;
  } catch (error) {
    console.error('Error fetching links:', error.message);
    return [];
  }
}

function cleanPrice(priceStr) {
  if (!priceStr) return 0;
  // WooCommerce often stacks prices in the HTML when on sale. 
  // We need to be careful to get the correct one.
  const numbers = priceStr.replace(/[^\d]/g, ' ').trim().split(/\s+/).filter(n => n.length > 0);
  if (numbers.length === 0) return 0;
  
  // Usually the last number in the string is the active price
  return parseInt(numbers[numbers.length - 1]);
}

async function scrapeProduct(url) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const $ = cheerio.load(response.data);

    const name = $('.product_title').text().trim();
    
    // Price logic refined
    let price = 0;
    let oldPrice = undefined;

    const priceEl = $('.summary .price');
    if (priceEl.find('ins').length > 0) {
      price = cleanPrice(priceEl.find('ins').text());
      oldPrice = cleanPrice(priceEl.find('del').text());
    } else {
      price = cleanPrice(priceEl.text());
    }

    // Clean description: Remove "Highlights :" and leading/trailing whitespace
    let shortDesc = $('.woocommerce-product-details__short-description').text().replace('Highlights :', '').trim();
    let fullDesc = $('#tab-description').text().trim() || shortDesc;
    
    const images = [];
    $('.woocommerce-product-gallery__image img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && !images.includes(src)) images.push(src);
    });

    const categoryList = [];
    $('.posted_in a').each((i, el) => {
      categoryList.push($(el).text().trim());
    });

    // Detect brand from name or meta if possible
    let brand = 'Monaliza House';
    const brands = ['Optimum Nutrition', 'MuscleTech', 'Dymatize', 'Biotech USA', 'Applied Nutrition', 'Now Foods', 'JNX Sports', 'Mutant', 'Cellucor', 'Scitec', 'Nutrend'];
    for (const b of brands) {
      if (name.toLowerCase().includes(b.toLowerCase())) {
        brand = b;
        break;
      }
    }

    return {
      id: `scraped-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      brand,
      price,
      oldPrice: oldPrice && oldPrice > price ? oldPrice : undefined,
      category: categoryList[0]?.toLowerCase() || 'vitamines',
      image: images[0] || '',
      description: fullDesc.substring(0, 500),
      benefits: shortDesc.split('\n').map(s => s.trim()).filter(line => line.length > 3).slice(0, 5),
      specs: [{ label: 'Format', value: 'Original' }],
      allImages: images
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

async function startImport() {
  const links = await getProductLinks();
  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < links.length; i++) {
    process.stdout.write(`[${i + 1}/${links.length}] Scraping... `);
    const data = await scrapeProduct(links[i]);
    
    if (data && data.name && data.price > 0) {
      results.push(data);
      successCount++;
      process.stdout.write(`✓ ${data.name.substring(0, 30)}... (${data.price} MAD)\n`);
    } else {
      failCount++;
      process.stdout.write(`✗ Failed\n`);
    }

    // Save every 10 items as a checkpoint
    if (i % 10 === 0) {
        fs.writeFileSync('scripts/scraped_products.json', JSON.stringify(results, null, 2));
    }

    await sleep(DELAY);
  }

  fs.writeFileSync('scripts/scraped_products.json', JSON.stringify(results, null, 2));

  console.log('\n--- FINAL SUMMARY ---');
  console.log(`Total Links Found: ${links.length}`);
  console.log(`Successfully Processed: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Data saved to: scripts/scraped_products.json`);
}

startImport();
