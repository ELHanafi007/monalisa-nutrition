import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const IMAGE_DIR = path.join(process.cwd(), 'public/images/products');

async function fixImages() {
  console.log('--- Database Image Fixer ---');
  
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
  });

  try {
    const [products] = await connection.query('SELECT id, name, slug, image FROM products');
    console.log(`Found ${products.length} products in database.`);

    const files = fs.readdirSync(IMAGE_DIR);
    console.log(`Found ${files.length} images in public/images/products.`);

    let updatedCount = 0;

    for (const p of products) {
      // If image is already local and exists, skip
      if (p.image && p.image.startsWith('/images/') && fs.existsSync(path.join(process.cwd(), 'public', p.image))) {
        continue;
      }

      // Try to find a matching file by slug
      const extensions = ['.webp', '.jpg', '.jpeg', '.png'];
      let foundFile = null;

      for (const ext of extensions) {
        const filename = `${p.slug}${ext}`;
        if (files.includes(filename)) {
          foundFile = `/images/products/${filename}`;
          break;
        }
      }

      if (foundFile) {
        await connection.query('UPDATE products SET image = ? WHERE id = ?', [foundFile, p.id]);
        console.log(`✓ Linked ${p.name} -> ${foundFile}`);
        updatedCount++;
      } else {
        // console.log(`✗ No match for ${p.name} (slug: ${p.slug})`);
      }
    }

    console.log(`\n--- FINISHED ---`);
    console.log(`Updated ${updatedCount} products with local image paths.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

fixImages();
