import mysql from 'mysql2/promise';

const poolConfig = {
  host: process.env.MYSQL_HOST!,
  user: process.env.MYSQL_USER!,
  password: process.env.MYSQL_PASSWORD!,
  database: process.env.MYSQL_DATABASE!,
  waitForConnections: true,
  connectionLimit: 5, // Reduced to be safer on Hostinger
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
};

// Singleton pattern to prevent multiple pools in Next.js
const globalForPool = global as unknown as { pool: any };
const pool = globalForPool.pool || mysql.createPool(poolConfig);

if (process.env.NODE_ENV !== 'production') globalForPool.pool = pool;

export default pool;
