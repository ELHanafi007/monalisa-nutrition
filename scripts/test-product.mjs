import axios from 'axios';
import * as cheerio from 'cheerio';

async function testProduct() {
  try {
    const url = 'https://maghrebnutrition.ma/produit/melatonin-extra-10mg-100-capsules-now-food/';
    console.log('Fetching product page:', url);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    const name = $('.product_title').text().trim();
    const price = $('.summary .price ins .woocommerce-Price-amount').text() || $('.summary .price .woocommerce-Price-amount').first().text();
    const oldPrice = $('.summary .price del .woocommerce-Price-amount').text();
    const description = $('.woocommerce-product-details__short-description').text().trim() || $('#tab-description').text().trim();
    const images = [];
    $('.woocommerce-product-gallery__image img').each((i, el) => {
      images.push($(el).attr('src'));
    });
    const categories = [];
    $('.posted_in a').each((i, el) => {
      categories.push($(el).text().trim());
    });
    const brand = $('.product_meta .brand a').text().trim(); // Might vary

    console.log('Data:', {
      name,
      price,
      oldPrice,
      description: description.substring(0, 100) + '...',
      images,
      categories,
      brand
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testProduct();
