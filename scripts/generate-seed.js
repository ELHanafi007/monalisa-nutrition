const fs = require('fs');

// We need to strip the imports and exports to evaluate the arrays directly
const pRaw = fs.readFileSync('./scripts/old_products.ts', 'utf8');
const cRaw = fs.readFileSync('./scripts/old_categories.ts', 'utf8');

// Use regex to extract the arrays
const pMatch = pRaw.match(/const defaultProducts(?:[\s\S]*?)=\s*(\[[\s\S]*?\]);\s*import/);
const cMatch = cRaw.match(/const defaultCategories(?:[\s\S]*?)=\s*(\[[\s\S]*?\]);\s*import/);

if (!pMatch || !cMatch) {
  console.error("Failed to parse data");
  process.exit(1);
}

// Evaluate as JS (we replace TS interface casting if any, though there shouldn't be much)
const productsStr = pMatch[1].replace(/ as any/g, '');
const categoriesStr = cMatch[1];

let products, categories;
try {
  products = eval('(' + productsStr + ')');
  categories = eval('(' + categoriesStr + ')');
} catch (e) {
  console.error("Eval error:", e);
  process.exit(1);
}

let sql = "-- =============================================\n";
sql += "-- Monalisa Nutrition — Data Migration Seed\n";
sql += "-- Run this in phpMyAdmin AFTER running schema.sql\n";
sql += "-- =============================================\n\n";

// Escape helper
const esc = (str) => {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/'/g, "''").replace(/\\/g, "\\\\") + "'";
};

sql += "-- ---------------------------------------------\n";
sql += "-- Insert Categories\n";
sql += "-- ---------------------------------------------\n";
categories.forEach(c => {
  sql += `INSERT IGNORE INTO \`categories\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`image\`) VALUES (${esc(c.id)}, ${esc(c.name)}, ${esc(c.slug)}, ${esc(c.description)}, ${esc(c.image)});\n`;
});

sql += "\n-- ---------------------------------------------\n";
sql += "-- Insert Products\n";
sql += "-- ---------------------------------------------\n";
products.forEach(p => {
  const images = p.images ? JSON.stringify(p.images) : '[]';
  const benefits = p.benefits ? JSON.stringify(p.benefits) : '[]';
  const specs = p.specs ? JSON.stringify(p.specs) : '[]';
  
  sql += `INSERT IGNORE INTO \`products\` (\`id\`, \`name\`, \`slug\`, \`brand\`, \`price\`, \`old_price\`, \`category\`, \`image\`, \`images\`, \`description\`, \`benefits\`, \`specs\`, \`is_rupture\`) VALUES (${esc(p.id)}, ${esc(p.name)}, ${esc(p.slug)}, ${esc(p.brand)}, ${p.price}, ${p.oldPrice || 'NULL'}, ${esc(p.category)}, ${esc(p.image)}, ${esc(images)}, ${esc(p.description)}, ${esc(benefits)}, ${esc(specs)}, ${p.isRupture ? 1 : 0});\n`;
});

fs.writeFileSync('./scripts/seed.sql', sql);
console.log("seed.sql generated successfully!");
