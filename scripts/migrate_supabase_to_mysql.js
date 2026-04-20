require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');
const { createClient } = require('@supabase/supabase-js');

async function migrate() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://evwrcjstgonhrcqlnbpv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d3JjanN0Z29uaHJjcWxuYnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzU1ODMsImV4cCI6MjA5MTg1MTU4M30.zCk3HTDQEXJ-okxU76eFG3LswQ1avs_mbZTZDb4T1-c';

  const supabase = createClient(supabaseUrl, supabaseKey);

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  console.log('Connected to MySQL and Supabase');

  // Fetch Categories from Supabase
  const { data: categories, error: catError } = await supabase.from('categories').select('*');
  if (catError) {
    console.error('Error fetching categories from Supabase:', catError);
    return;
  }

  // Fetch Products from Supabase
  const { data: products, error: prodError } = await supabase.from('products').select('*');
  if (prodError) {
    console.error('Error fetching products from Supabase:', prodError);
    return;
  }

  console.log(`Found ${categories.length} categories and ${products.length} products in Supabase.`);

  // Insert Categories
  for (const cat of categories) {
    try {
      await connection.execute(
        'INSERT IGNORE INTO `categories` (`id`, `name`, `slug`, `description`, `image`) VALUES (?, ?, ?, ?, ?)',
        [cat.id, cat.name, cat.slug, cat.description || null, cat.image || null]
      );
    } catch (err) {
      console.error(`Error inserting category ${cat.name}:`, err);
    }
  }
  console.log(`Successfully checked/inserted ${categories.length} categories.`);

  // Insert Products
  for (const prod of products) {
    try {
      const images = prod.images ? (typeof prod.images === 'string' ? prod.images : JSON.stringify(prod.images)) : null;
      const benefits = prod.benefits ? (typeof prod.benefits === 'string' ? prod.benefits : JSON.stringify(prod.benefits)) : null;
      const specs = prod.specs ? (typeof prod.specs === 'string' ? prod.specs : JSON.stringify(prod.specs)) : null;
      const is_rupture = prod.is_rupture ? 1 : 0;

      await connection.execute(
        `INSERT IGNORE INTO \`products\` 
         (\`id\`, \`name\`, \`slug\`, \`brand\`, \`price\`, \`old_price\`, \`category\`, \`image\`, \`images\`, \`description\`, \`benefits\`, \`specs\`, \`is_rupture\`) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          prod.id, 
          prod.name, 
          prod.slug, 
          prod.brand || 'Unknown', 
          prod.price || 0, 
          prod.old_price || null, 
          prod.category || 'uncategorized', 
          prod.image || '/images/placeholder.jpg', 
          images, 
          prod.description || '', 
          benefits, 
          specs, 
          is_rupture
        ]
      );
    } catch (err) {
      console.error(`Error inserting product ${prod.name}:`, err);
    }
  }
  console.log(`Successfully checked/inserted ${products.length} products.`);

  console.log('Migration complete!');
  await connection.end();
}

migrate().catch(console.error);
