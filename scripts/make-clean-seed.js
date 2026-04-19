const fs = require('fs');

const sql = fs.readFileSync('./scripts/seed.sql', 'utf8');

const lines = sql.split('\n');

let newSql = `-- =============================================
-- Monalisa Nutrition — FRESH Data Migration Seed
-- Run this in phpMyAdmin AFTER running schema.sql
-- This seed uses strictly sanitized data and IDs
-- =============================================

-- First, clear the existing data!
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE \`products\`;
TRUNCATE TABLE \`categories\`;
SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------
-- Insert Categories
-- ---------------------------------------------
`;

// Extract categories
const catRegex = /INSERT IGNORE INTO `categories` \(`id`, `name`, `slug`, `description`, `image`\) VALUES \((.*?)\);/g;
let match;
const categories = [];
while ((match = catRegex.exec(sql)) !== null) {
  categories.push(match[1]);
  newSql += `INSERT INTO \`categories\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`image\`) VALUES (${match[1]});\n`;
}

newSql += `
-- ---------------------------------------------
-- Insert Products
-- ---------------------------------------------
`;

// Helper to extract values
function parseSqlValues(valStr) {
  let inString = false;
  let currentVal = '';
  let values = [];
  
  for(let i=0; i<valStr.length; i++) {
    if(valStr[i] === "'" && valStr[i-1] !== '\\') {
      inString = !inString;
      currentVal += valStr[i];
    } else if(valStr[i] === ',' && !inString) {
      values.push(currentVal.trim());
      currentVal = '';
    } else {
      currentVal += valStr[i];
    }
  }
  values.push(currentVal.trim());
  return values;
}

// Extract products
const prodRegex = /INSERT IGNORE INTO `products` \(`id`, `name`, `slug`, `brand`, `price`, `old_price`, `category`, `image`, `images`, `description`, `benefits`, `specs`, `is_rupture`\) VALUES \((.*?)\);/g;

let counter = 1;
while ((match = prodRegex.exec(sql)) !== null) {
  const values = parseSqlValues(match[1]);
  
  // values = [id, name, slug, brand, price, old_price, category, image, images, description, benefits, specs, is_rupture]
  
  // Create a clean dp- style ID
  const cleanId = `'dp-1700000${counter.toString().padStart(4, '0')}'`;
  
  // Make sure category matches (fix 'accessories' -> 'accessoires')
  let category = values[6];
  if(category === "'accessories'") category = "'accessoires'";
  
  // Fix images array - if it is '[]', force it to have the main image
  let image = values[7];
  let images = values[8];
  
  if (images === "'[]'" || images === 'NULL') {
     // Main image is values[7] which is already a string literal like "'/images/x.webp'"
     // We need to make it "'[\"/images/x.webp\"]'"
     let imgUrl = image.replace(/^'|'$/g, '');
     images = `'["${imgUrl}"]'`;
  }

  // Ensure old_price is NULL if empty
  let old_price = values[5];
  if (old_price === "''" || !old_price) old_price = "NULL";

  newSql += `INSERT INTO \`products\` (\`id\`, \`name\`, \`slug\`, \`brand\`, \`price\`, \`old_price\`, \`category\`, \`image\`, \`images\`, \`description\`, \`benefits\`, \`specs\`, \`is_rupture\`) VALUES (${cleanId}, ${values[1]}, ${values[2]}, ${values[3]}, ${values[4]}, ${old_price}, ${category}, ${image}, ${images}, ${values[9]}, ${values[10]}, ${values[11]}, ${values[12]});\n`;
  counter++;
}

fs.writeFileSync('./scripts/clean_seed.sql', newSql);
console.log('Clean seed generated successfully!');
