import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function restoreData() {
  console.log('--- Data Recovery & Enhancement ---');
  
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

    let updatedCount = 0;

    for (const sp of scrapedProducts) {
      // Find the product in the DB by slug
      const [rows]: any = await connection.query('SELECT * FROM products WHERE slug = ?', [sp.slug]);
      
      if (rows.length > 0) {
        const dbProduct = rows[0];
        
        // Prepare updates
        const updates: any = {};
        
        // 1. Restore Brand if generic or missing
        if (!dbProduct.brand || dbProduct.brand === 'Monaliza House' || dbProduct.brand === 'Monaliza') {
          if (sp.brand && sp.brand !== 'Monaliza House') {
            updates.brand = sp.brand;
          }
        }

        // 2. Restore Specs if missing in DB
        if (!dbProduct.specs || dbProduct.specs === '[]' || dbProduct.specs === '') {
           updates.specs = JSON.stringify(sp.specs || []);
        }

        // 3. Restore Benefits if missing in DB
        if (!dbProduct.benefits || dbProduct.benefits === '[]' || dbProduct.benefits === '') {
           updates.benefits = JSON.stringify(sp.benefits || []);
        }

        // 4. Restore Description if DB version is too short (likely a placeholder)
        if (!dbProduct.description || dbProduct.description.length < 50) {
           if (sp.description && sp.description.length > (dbProduct.description?.length || 0)) {
             updates.description = sp.description;
           }
        }

        // 5. Restore Local Image path
        if (!dbProduct.image || dbProduct.image.startsWith('http') || dbProduct.image.includes('placeholder')) {
           updates.image = sp.image;
        }
        
        // 6. Restore Multiple Images
        if (!dbProduct.images || dbProduct.images === '[]' || dbProduct.images === '') {
           updates.images = JSON.stringify(sp.allImages || [sp.image]);
        }

        // Apply updates if any
        if (Object.keys(updates).length > 0) {
          const keys = Object.keys(updates);
          const values = Object.values(updates);
          const setClause = keys.map(k => `${k} = ?`).join(', ');
          
          await connection.query(`UPDATE products SET ${setClause} WHERE id = ?`, [...values, dbProduct.id]);
          console.log(`✓ Restored data for: ${sp.name}`);
          updatedCount++;
        }
      }
    }

    console.log(`\n--- FINISHED ---`);
    console.log(`Restored/Enhanced ${updatedCount} products in the database.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

restoreData();
