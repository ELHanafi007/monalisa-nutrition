import axios from 'axios';
import * as cheerio from 'cheerio';

async function testScrape() {
  try {
    console.log('Fetching shop page...');
    const response = await axios.get('https://maghrebnutrition.ma/boutique/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const products = [];
    
    // Attempt to find product links - Common WooCommerce selectors
    $('.product a.woocommerce-LoopProduct-link').each((i, el) => {
      products.push($(el).attr('href'));
    });

    console.log(`Found ${products.length} products on the first page.`);
    console.log('Sample URL:', products[0]);
    
    // Check for pagination
    const lastPage = $('.woocommerce-pagination .page-numbers').last().prev().text();
    console.log('Estimated total pages:', lastPage || '1 (no pagination found)');

  } catch (error) {
    console.error('Error fetching site:', error.message);
  }
}

testScrape();
