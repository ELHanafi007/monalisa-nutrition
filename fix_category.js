const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  const pool = mysql.createPool(process.env.DATABASE_URL);
  await pool.query("UPDATE products SET category = 'accessoires' WHERE category = 'accessories'");
  console.log("Fixed categories!");
  process.exit(0);
}
fix();
