require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function dumpSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://evwrcjstgonhrcqlnbpv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2d3JjanN0Z29uaHJjcWxuYnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzU1ODMsImV4cCI6MjA5MTg1MTU4M30.zCk3HTDQEXJ-okxU76eFG3LswQ1avs_mbZTZDb4T1-c';

  if (!supabaseKey) {
    console.error('Error: Supabase Anon Key not found in environment.');
    return;
  }

  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Fetching categories from Supabase...');
  const { data: categories, error: catError } = await supabase.from('categories').select('*');
  if (catError) throw catError;

  console.log('Fetching products from Supabase...');
  const { data: products, error: prodError } = await supabase.from('products').select('*');
  if (prodError) throw prodError;

  let sql = `-- =============================================\n`;
  sql += `-- SUPABASE DUMP\n`;
  sql += `-- Run this in phpMyAdmin to restore your live data\n`;
  sql += `-- =============================================\n\n`;

  sql += `SET FOREIGN_KEY_CHECKS = 0;\n`;
  sql += `TRUNCATE TABLE \`products\`;\n`;
  sql += `TRUNCATE TABLE \`categories\`;\n`;
  sql += `SET FOREIGN_KEY_CHECKS = 1;\n\n`;

  // Categories
  if (categories && categories.length > 0) {
    for (const cat of categories) {
      const id = mysqlEscape(cat.id);
      const name = mysqlEscape(cat.name);
      const slug = mysqlEscape(cat.slug);
      const desc = cat.description ? mysqlEscape(cat.description) : 'NULL';
      const img = cat.image ? mysqlEscape(cat.image) : 'NULL';
      
      sql += `INSERT INTO \`categories\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`image\`) VALUES (${id}, ${name}, ${slug}, ${desc}, ${img});\n`;
    }
  }

  sql += `\n`;

  // Products
  if (products && products.length > 0) {
    for (const prod of products) {
      const id = mysqlEscape(prod.id);
      const name = mysqlEscape(prod.name);
      const slug = mysqlEscape(prod.slug);
      const brand = prod.brand ? mysqlEscape(prod.brand) : mysqlEscape('Unknown');
      const price = prod.price || 0;
      const old_price = prod.old_price ? prod.old_price : 'NULL';
      const category = prod.category ? mysqlEscape(prod.category) : mysqlEscape('uncategorized');
      const image = prod.image ? mysqlEscape(prod.image) : mysqlEscape('/images/placeholder.jpg');
      
      let images = 'NULL';
      if (prod.images) {
         try {
            images = mysqlEscape(typeof prod.images === 'string' ? prod.images : JSON.stringify(prod.images));
         } catch(e) {}
      }

      const description = prod.description ? mysqlEscape(prod.description) : mysqlEscape('');
      
      let benefits = 'NULL';
      if (prod.benefits) {
         try {
            benefits = mysqlEscape(typeof prod.benefits === 'string' ? prod.benefits : JSON.stringify(prod.benefits));
         } catch(e) {}
      }

      let specs = 'NULL';
      if (prod.specs) {
         try {
            specs = mysqlEscape(typeof prod.specs === 'string' ? prod.specs : JSON.stringify(prod.specs));
         } catch(e) {}
      }

      const is_rupture = prod.is_rupture ? 1 : 0;
      
      sql += `INSERT INTO \`products\` (\`id\`, \`name\`, \`slug\`, \`brand\`, \`price\`, \`old_price\`, \`category\`, \`image\`, \`images\`, \`description\`, \`benefits\`, \`specs\`, \`is_rupture\`) VALUES (${id}, ${name}, ${slug}, ${brand}, ${price}, ${old_price}, ${category}, ${image}, ${images}, ${description}, ${benefits}, ${specs}, ${is_rupture});\n`;
    }
  }

  fs.writeFileSync('supabase_dump.sql', sql);
  console.log(`\nSuccess! Dumped ${categories?.length || 0} categories and ${products?.length || 0} products.`);
  console.log('File saved as: supabase_dump.sql');
}

function mysqlEscape(str) {
  if (str === null || str === undefined) return 'NULL';
  if (typeof str !== 'string') str = str.toString();
  return "'" + str.replace(/\\/g, '\\\\').replace(/'/g, "''").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
}

dumpSupabase().catch(console.error);
