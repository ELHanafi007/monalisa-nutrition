import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function restoreData() {
  console.log('--- Smart Data Recovery ---');
  
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
  });

  try {
    const scrapedProducts = JSON.parse(fs.readFileSync('scripts/scraped_products.json', 'utf8'));
    console.log(`Loaded ${scrapedProducts.length} products from JSON.`);

    const [dbProducts] = await connection.query('SELECT * FROM products');
    console.log(`Loaded ${dbProducts.length} products from database.`);

    let updatedCount = 0;

    for (const dbp of dbProducts) {
      // Find the best match in scrapedProducts
      let bestMatch = null;
      let highestScore = 0;

      const dbKeywords = dbp.name.toLowerCase().split(' ').filter(k => k.length > 2);

      for (const sp of scrapedProducts) {
        const spNameLower = sp.name.toLowerCase();
        let score = 0;

        for (const kw of dbKeywords) {
          if (spNameLower.includes(kw)) {
            score++;
          }
        }

        // Add bonus for matching brand
        if (dbp.brand && dbp.brand !== 'Monaliza House' && spNameLower.includes(dbp.brand.toLowerCase())) {
          score += 2;
        }

        if (score > highestScore) {
          highestScore = score;
          bestMatch = sp;
        }
      }

      // If we found a decent match
      if (bestMatch && highestScore >= 2) {
        const updates = {};
        
        // Restore Brand
        if (!dbp.brand || dbp.brand === 'Monaliza House' || dbp.brand === 'Monaliza') {
          updates.brand = bestMatch.brand;
        }

        // Restore Specs
        if (!dbp.specs || dbp.specs === '[]' || dbp.specs === '' || dbp.specs === '[{"label":"Poids","value":""}]') {
           updates.specs = JSON.stringify(bestMatch.specs || []);
        }

        // Restore Benefits
        if (!dbp.benefits || dbp.benefits === '[]' || dbp.benefits === '' || dbp.benefits === '["",""]') {
           updates.benefits = JSON.stringify(bestMatch.benefits || []);
        }

        // Restore Description
        if (!dbp.description || dbp.description.length < 100) {
           updates.description = bestMatch.description;
        }

        // Restore Image
        if (!dbp.image || dbp.image.includes('placeholder') || dbp.image === '') {
           updates.image = bestMatch.image;
        }

        // Apply updates
        if (Object.keys(updates).length > 0) {
          const keys = Object.keys(updates);
          const values = Object.values(updates);
          const setClause = keys.map(k => `\`${k}\` = ?`).join(', ');
          
          await connection.query(`UPDATE products SET ${setClause} WHERE id = ?`, [...values, dbp.id]);
          console.log(`✓ Linked "${dbp.name}" -> "${bestMatch.name}"`);
          updatedCount++;
        }
      }
    }

    console.log(`\n--- FINISHED ---`);
    console.log(`Successfully restored data for ${updatedCount} products.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

restoreData();
